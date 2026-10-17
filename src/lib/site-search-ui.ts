import { searchTutorials, searchTerms, normalizeSearch, searchResultHref, type SearchResult, type SearchTutorial } from './tutorial-search';

export async function createSiteSearch(container: HTMLElement, options: {
	bundlePath: string; baseUrl: string; translations: Record<string, string>; chinese: boolean;
	pagefindConfig: Record<string, unknown>;
}) {
	const { bundlePath, translations: t, chinese } = options;
	const [pagefind, response] = await Promise.all([
		import(/* @vite-ignore */ `${bundlePath}pagefind.js`),
		fetch(`${bundlePath}tutorials.json`),
	]);
	if (!response.ok) throw new Error(`Tutorial search: HTTP ${response.status}`);
	const locale = chinese ? 'zh' : 'en';
	const tutorials: SearchTutorial[] = (await response.json()).filter((tutorial: SearchTutorial) => tutorial.url.startsWith(`/${locale}/`));
	const { mergeIndex, ...config } = options.pagefindConfig;
	await pagefind.options({ ...config, baseUrl: options.baseUrl });
	if (Array.isArray(mergeIndex)) {
		for (const { bundlePath: path, ...indexOptions } of mergeIndex) await pagefind.mergeIndex(path, indexOptions);
	}
	const tutorialUrls = new Set(tutorials.map(tutorial => tutorial.url));
	const element = <K extends keyof HTMLElementTagNameMap>(tag: K, className: string) => {
		const node = document.createElement(tag); node.className = className; return node;
	};
	const form = element('form', 'pagefind-ui__form');
	form.setAttribute('role', 'search'); form.setAttribute('aria-label', t.search_label || t.placeholder);
	const input = element('input', 'pagefind-ui__search-input');
	input.type = 'search'; input.placeholder = t.placeholder;
	input.setAttribute('aria-label', t.placeholder); input.autocomplete = 'off';
	input.setAttribute('enterkeyhint', 'search');
	const clear = element('button', 'pagefind-ui__search-clear pagefind-ui__suppressed');
	clear.type = 'button'; clear.textContent = t.clear_search || 'Clear search';
	const message = element('p', 'pagefind-ui__message');
	message.setAttribute('role', 'status'); message.setAttribute('aria-live', 'polite');
	const list = element('ol', 'pagefind-ui__results');
	const more = element('button', 'pagefind-ui__button');
	more.type = 'button'; more.textContent = t.load_more || 'Load more results'; more.hidden = true;
	form.append(input, clear, message, list, more);
	const wrapper = element('div', 'pagefind-ui'); wrapper.append(form); container.replaceChildren(wrapper);
	let generation = 0;
	let timer: ReturnType<typeof setTimeout>;
	let results: SearchResult[] = [];
	let shown = 5;
	let query = '';
	const plainText = (html: string) => new DOMParser().parseFromString(html, 'text/html').body.textContent || '';
	const highlight = (node: HTMLElement, text: string) => {
		const terms = searchTerms(query).sort((a, b) => b.length - a.length).map(term => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
		if (!terms.length) { node.textContent = text; return; }
		const pattern = new RegExp(terms.join('|'), 'giu');
		let offset = 0;
		for (const match of text.matchAll(pattern)) {
			node.append(document.createTextNode(text.slice(offset, match.index)));
			const mark = document.createElement('mark'); mark.textContent = match[0]; node.append(mark);
			offset = match.index! + match[0].length;
		}
		node.append(document.createTextNode(text.slice(offset)));
	};
	const link = (title: string, url: string) => {
		const p = element('p', 'pagefind-ui__result-title');
		const a = element('a', 'pagefind-ui__result-link'); a.href = searchResultHref(url, query, location.href); highlight(a, title); p.append(a); return p;
	};
	const render = () => {
		list.replaceChildren();
		for (const result of results.slice(0, shown)) {
			const item = element('li', 'pagefind-ui__result');
			const inner = element('div', 'pagefind-ui__result-inner');
			inner.append(link(result.meta.title, result.url));
			const sections = result.sub_results.length ? result.sub_results.slice(0, 3) : [{ url: result.url, title: '', excerpt: result.excerpt }];
			for (const section of sections) {
				const nested = element('div', 'pagefind-ui__result-nested');
				if (section.title) nested.append(link(section.title, section.url));
				const excerpt = element('p', 'pagefind-ui__result-excerpt'); highlight(excerpt, section.excerpt); nested.append(excerpt); inner.append(nested);
			}
			item.append(inner); list.append(item);
		}
		more.hidden = results.length <= shown;
	};
	const search = async (current: number) => {
		message.textContent = (t.searching || 'Searching…').replace('[SEARCH_TERM]', query);
		list.setAttribute('aria-busy', 'true');
		try {
			const literal = searchTutorials(tutorials, query);
			const native = await pagefind.search(query);
			const data = await Promise.all(native.results.map((result: { data: () => Promise<any> }) => result.data()));
			if (current !== generation) return;
			const other: SearchResult[] = data.filter(result => {
				const path = new URL(result.url, location.href).pathname;
				return path.startsWith(`/${locale}/`) && !tutorialUrls.has(path) && (!chinese || searchTerms(query).every(term => normalizeSearch(`${result.meta.title} ${result.content}`).includes(normalizeSearch(term))));
			}).map(result => ({
				url: result.url, meta: result.meta, excerpt: plainText(result.excerpt),
				sub_results: result.sub_results.map((section: { url: string; title: string; excerpt: string }) => ({ ...section, excerpt: plainText(section.excerpt) })),
			}));
			results = [...literal, ...other];
			shown = 5;
			message.textContent = (results.length ? (results.length === 1 ? t.one_result : t.many_results) : t.zero_results)
				.replace('[SEARCH_TERM]', query).replace('[COUNT]', String(results.length));
			render();
		} catch (error) {
			if (current !== generation) return;
			results = searchTutorials(tutorials, query);
			message.textContent = chinese ? '部分搜索内容暂时未能加载，请稍后重试。' : 'Some search results could not be loaded. Please try again.';
			render(); console.error(error);
		} finally {
			if (current === generation) list.setAttribute('aria-busy', 'false');
		}
	};
	input.addEventListener('input', () => {
		clearTimeout(timer); generation++; query = input.value.trim();
		clear.classList.toggle('pagefind-ui__suppressed', !query);
		if (!query) { results = []; message.textContent = ''; list.setAttribute('aria-busy', 'false'); render(); return; }
		const current = generation;
		timer = setTimeout(() => { void search(current); }, 180);
	});
	clear.addEventListener('click', () => { input.value = ''; input.dispatchEvent(new Event('input')); input.focus(); });
	more.addEventListener('click', () => { shown += 5; render(); });
	form.addEventListener('submit', event => event.preventDefault());
}
