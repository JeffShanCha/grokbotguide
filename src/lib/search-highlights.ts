import { searchHighlightRanges } from './tutorial-search';

const skip = 'script, style, noscript, svg, button, input, textarea, select, nav, [contenteditable], [data-pagefind-ignore], [data-search-highlight-bar], .wf-toc, .wf-mobile-toc, .gbg-footer, [role="tablist"], [role="status"]';
const blockSelector = 'p, li, pre, h1, h2, h3, h4, h5, h6, td, th, summary, figcaption, dt, dd, blockquote';

function wrapMatches(root: HTMLElement, query: string) {
	const groups = new Map<Element, Text[]>();
	const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
		acceptNode(node) { return node.parentElement?.closest(skip) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT; },
	});
	let node: Node | null;
	while ((node = walker.nextNode())) {
		const parent = node.parentElement!;
		const block = parent.closest(blockSelector) || parent;
		const group = groups.get(block) || []; group.push(node as Text); groups.set(block, group);
	}
	const hits: HTMLElement[][] = [];
	for (const texts of groups.values()) {
		const ranges = searchHighlightRanges(texts.map(text => text.data).join(''), query);
		const groupHits = ranges.map(() => [] as HTMLElement[]);
		let offset = 0;
		for (const text of texts) {
			const parts = ranges.map((range, hit) => ({ start: Math.max(0, range.start - offset), end: Math.min(text.length, range.end - offset), hit })).filter(range => range.start < range.end);
			offset += text.length;
			if (!parts.length) continue;
			const fragment = document.createDocumentFragment();
			let cursor = 0;
			for (const part of parts) {
				fragment.append(document.createTextNode(text.data.slice(cursor, part.start)));
				const mark = document.createElement('mark'); mark.dataset.searchHit = '';
				mark.textContent = text.data.slice(part.start, part.end);
				groupHits[part.hit]!.push(mark); fragment.append(mark); cursor = part.end;
			}
			fragment.append(document.createTextNode(text.data.slice(cursor))); text.replaceWith(fragment);
		}
		hits.push(...groupHits);
	}
	return hits.filter(hit => hit.length);
}

function reveal(mark: HTMLElement) {
	const ancestors: HTMLElement[] = [];
	for (let parent = mark.parentElement; parent; parent = parent.parentElement) ancestors.unshift(parent);
	for (const parent of ancestors) {
		if (parent instanceof HTMLDetailsElement) parent.open = true;
		if (parent.matches('[role="tabpanel"][hidden]')) {
			const tab = document.getElementById(parent.getAttribute('aria-labelledby') || '');
			if (tab instanceof HTMLButtonElement) tab.click();
		}
	}
}

export function setupSearchHighlights() {
	let activeQuery: string | null = null;
	let dispose: (() => void) | undefined;
	const update = () => {
		const query = new URL(location.href).searchParams.get('highlight')?.trim() || '';
		if (query === activeQuery) return;
		dispose?.(); dispose = undefined; activeQuery = query;
		if (!query) return;
		const root = document.querySelector<HTMLElement>('.wf-content') || document.querySelector<HTMLElement>('.sl-markdown-content');
		if (!root) return;
		const chinese = document.documentElement.lang.startsWith('zh');
		const hits = wrapMatches(root, query);
		const bar = document.createElement('div'); bar.className = 'search-highlight-bar not-content';
		bar.dataset.searchHighlightBar = ''; bar.setAttribute('data-pagefind-ignore', '');
		bar.setAttribute('role', 'region'); bar.setAttribute('aria-label', chinese ? '搜索关键词高亮' : 'Search highlights');
		const label = document.createElement('span'); label.className = 'search-highlight-query';
		label.textContent = `${chinese ? '搜索高亮：' : 'Search highlights: '}${query}`; label.title = query;
		const status = document.createElement('span'); status.className = 'search-highlight-status'; status.setAttribute('role', 'status'); status.setAttribute('aria-live', 'polite');
		const controls = document.createElement('div'); controls.className = 'search-highlight-controls';
		const button = (name: string, action: () => void) => {
			const element = document.createElement('button'); element.type = 'button'; element.className = 'search-highlight-button';
			element.textContent = name; element.addEventListener('click', action); controls.append(element); return element;
		};
		let current = -1;
		const move = (index: number) => {
			if (!hits.length) return;
			for (const mark of hits[current] || []) mark.removeAttribute('data-search-current');
			current = (index + hits.length) % hits.length;
			const hit = hits[current]!;
			for (const mark of hit) mark.setAttribute('data-search-current', '');
			reveal(hit[0]!);
			status.textContent = chinese ? `第 ${current + 1} / ${hits.length} 处` : `${current + 1} of ${hits.length}`;
			hit[0]!.scrollIntoView({ block: 'center', inline: 'center', behavior: 'instant' });
		};
		const previous = button(chinese ? '上一处' : 'Previous', () => move(current - 1));
		const next = button(chinese ? '下一处' : 'Next', () => move(current + 1));
		previous.disabled = next.disabled = !hits.length;
		const clear = button(chinese ? '清除高亮' : 'Clear highlights', () => {
			const url = new URL(location.href); url.searchParams.delete('highlight');
			history.replaceState(history.state, '', `${url.pathname}${url.search}${url.hash}`);
			const destination = document.querySelector<HTMLElement>('.wf-guide-hero h1, main h1, main');
			dispose?.(); dispose = undefined; activeQuery = '';
			// Keep keyboard focus in the article when its clear button is removed.
			if (destination) { destination.setAttribute('tabindex', '-1'); destination.focus({ preventScroll: true }); }
		});
		clear.dataset.clearSearchHighlights = '';
		bar.append(label, status, controls);
		const shell = root.querySelector('.wf-shell') || root;
		shell.prepend(bar);
		const resize = new ResizeObserver(() => document.documentElement.style.setProperty('--search-highlight-bar-height', `${bar.getBoundingClientRect().height}px`));
		resize.observe(bar);
		dispose = () => {
			resize.disconnect(); document.documentElement.style.removeProperty('--search-highlight-bar-height');
			for (const hit of hits) for (const mark of hit) {
				const parent = mark.parentNode; mark.replaceWith(document.createTextNode(mark.textContent || '')); parent?.normalize();
			}
			bar.remove();
		};
		if (!hits.length) { status.textContent = chinese ? '正文中没有匹配项' : 'No matches in the article'; return; }
		let anchor: HTMLElement | null = null;
		try { anchor = document.getElementById(decodeURIComponent(location.hash.slice(1))); } catch {}
		const section = anchor?.closest('section');
		let first = section ? hits.findIndex(hit => section.contains(hit[0]!)) : 0;
		if (!section && anchor && root.contains(anchor) && /^H[1-6]$/.test(anchor.tagName)) {
			// Markdown headings do not have section wrappers. Keep the search hit
			// within this heading's following content, up to the next peer heading.
			const level = Number(anchor.tagName[1]);
			const boundary = [...root.querySelectorAll('h1, h2, h3, h4, h5, h6')].find(heading => Number(heading.tagName[1]) <= level && !!(anchor!.compareDocumentPosition(heading) & Node.DOCUMENT_POSITION_FOLLOWING));
			first = hits.findIndex(hit => (anchor!.contains(hit[0]!) || !!(anchor!.compareDocumentPosition(hit[0]!) & Node.DOCUMENT_POSITION_FOLLOWING)) && (!boundary || !!(boundary.compareDocumentPosition(hit[0]!) & Node.DOCUMENT_POSITION_PRECEDING)));
		}
		requestAnimationFrame(() => { if (bar.isConnected) move(first >= 0 ? first : 0); });
	};
	if (document.readyState === 'complete') update();
	else document.addEventListener('DOMContentLoaded', update, { once: true });
	window.addEventListener('popstate', update);
	document.addEventListener('astro:page-load', () => { activeQuery = null; update(); });
}
