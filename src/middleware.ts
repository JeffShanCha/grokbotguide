import { defineMiddleware } from 'astro:middleware';
import { getCollection } from 'astro:content';
import { isLlmsExcluded, LLMS_PAGE_SEPARATOR } from '../llms.config.mjs';

export const onRequest = defineMiddleware(async ({ url, rewrite }, next) => {
	// Built downloads are files. Astro dev applies trailingSlash to dynamic endpoints,
	// so serve the same file URL internally without changing the address the user sees.
	if (import.meta.env.DEV && /^\/(?:zh|en)\/recipes\/[^/]+\/files\/[^/]+$/.test(url.pathname)) {
		return rewrite(new URL(`${url.pathname}/${url.search}`, url));
	}
	if (!['/llms.txt', '/llms-full.txt', '/llms-small.txt', '/zh/llms.txt'].includes(url.pathname) && !url.pathname.startsWith('/_llms-txt/')) return next();
	const response = await next();
	if (!response.ok) return response;
	let body = await response.text();
	if (url.pathname === '/llms.txt') {
		// 插件的固定 Notes 将本站误称为官方文档；上方 details 已给出本站的真实声明。
		body = body.replace(/## Notes\n\n[\s\S]*?(?=\n\n## |$)/, '').replace(/\n{3,}/g, '\n\n');
	}
	if (url.pathname === '/llms-full.txt') {
		// 插件按此分隔符逐篇输出，首行标题直接来自文档 frontmatter。
		const excluded = await getCollection('docs', ({ id, data }) => id.startsWith('en/') && !data.draft && isLlmsExcluded(id));
		const headings = new Set(excluded.map(({ data }) => `# ${data.hero?.title || data.title}`));
		body = body.split(LLMS_PAGE_SEPARATOR).filter((page) => !headings.has(page.split('\n')[0])).join(LLMS_PAGE_SEPARATOR);
	}
	const headers = new Headers(response.headers);
	headers.set('Content-Type', 'text/plain; charset=utf-8');
	headers.delete('Content-Length');
	return new Response(body, { status: response.status, statusText: response.statusText, headers });
});
