import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { LLMS, LLMS_SECTIONS, isLlmsExcluded } from '../../../llms.config.mjs';
import { SITE } from '../../../site.config.mjs';

export const prerender = true;

export const GET: APIRoute = async () => {
	const docs = (await getCollection('docs', ({ id, data }) => id.startsWith('zh/') && !data.draft && !isLlmsExcluded(id)))
		.sort((a, b) => (a.data.sidebar?.order ?? 999) - (b.data.sidebar?.order ?? 999) || a.id.localeCompare(b.id, 'zh-CN'));
	const link = ({ id, data }: (typeof docs)[number]) => {
		const label = data.title.replace(/([\\\[\]])/g, '\\$1');
		const description = data.description?.replace(/\s+/g, ' ').trim();
		return `- [${label}](${SITE.url}/${id}/)${description ? `: ${description}` : ''}`;
	};
	const parts = [`# ${LLMS.projectName}`, `> ${LLMS.description.zh}`, LLMS.details.zh];
	for (const section of LLMS_SECTIONS) {
		parts.push(`## ${section.zh}`, docs.filter(({ id }) => section.paths.includes(id.split('/')[1])).map(link).join('\n'));
	}
	parts.push('## Optional', [
		...docs.filter(({ id }) => ['community', 'news', 'resources'].includes(id.split('/')[1])).map(link),
		`- [英文完整文档（纯文本）](${SITE.url}/llms-full.txt)`,
		`- [英文精简文档（纯文本）](${SITE.url}/llms-small.txt)`,
	].join('\n'));
	return new Response(parts.join('\n\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
