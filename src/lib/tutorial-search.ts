export interface TutorialSection { id: string; title: string; text: string; prompts: string[] }
export interface SearchTutorial { url: string; title: string; text: string; sections: TutorialSection[] }
export interface SearchResult {
	url: string;
	meta: { title: string };
	excerpt: string;
	sub_results: Array<{ url: string; title: string; excerpt: string }>;
}
export const normalizeSearch = (text: string) => text.normalize('NFKC').toLocaleLowerCase().replace(/[\s\u200b]/gu, '');
export const searchTerms = (query: string) => (query.match(/"[^"]+"|\S+/g) || []).map(term => term.replace(/^"|"$/g, '')).filter(Boolean);

export function searchResultHref(href: string, query: string, origin: string) {
	const url = new URL(href, origin);
	if (url.origin !== new URL(origin).origin) return href;
	if (query.trim()) url.searchParams.set('highlight', query.trim());
	else url.searchParams.delete('highlight');
	return `${url.pathname}${url.search}${url.hash}`;
}

// Map normalized matches back to the original UTF-16 offsets. The DOM can then
// wrap the original characters without changing code, whitespace, or clipboard text.
export function searchHighlightRanges(text: string, query: string) {
	const literal = (value: string) => value.normalize('NFKC').toLocaleLowerCase().replace(/\u200b/gu, '').replace(/\s+/gu, ' ').trim().replace(/(\p{Script=Han}) +(?=\p{Script=Han})/gu, '$1');
	let normalized = '';
	const starts: number[] = [];
	const ends: number[] = [];
	for (const part of new Intl.Segmenter(undefined, { granularity: 'grapheme' }).segment(text)) {
		const folded = normalizeSearch(part.segment);
		normalized += folded;
		for (let i = 0; i < folded.length; i++) { starts.push(part.index); ends.push(part.index + part.segment.length); }
	}
	const ranges: Array<{ start: number; end: number }> = [];
	const terms = searchTerms(query).map(term => ({ compact: normalizeSearch(term), literal: literal(term) })).filter(term => term.compact);
	for (const term of terms) {
		let from = 0;
		while (from < normalized.length) {
			const index = normalized.indexOf(term.compact, from);
			if (index < 0) break;
			const range = { start: starts[index]!, end: ends[index + term.compact.length - 1]! };
			// Do not turn an English word ending in “g” followed by “mail”
			// into a Gmail hit when mapping compact search text back to the article.
			if (literal(text.slice(range.start, range.end)) === term.literal) ranges.push(range);
			from = index + term.compact.length;
		}
	}
	const merged: typeof ranges = [];
	for (const range of ranges.sort((a, b) => a.start - b.start || b.end - a.end)) {
		const previous = merged.at(-1);
		if (previous && range.start < previous.end) previous.end = Math.max(previous.end, range.end);
		else merged.push({ ...range });
	}
	return merged;
}

export function excerptFor(text: string, terms: string[]) {
	const lower = text.toLocaleLowerCase();
	const first = Math.min(...terms.map(term => lower.indexOf(term.toLocaleLowerCase())).filter(index => index >= 0));
	const start = Number.isFinite(first) ? Math.max(0, first - 24) : 0;
	return `${start ? '…' : ''}${text.slice(start, start + 180)}${text.length > start + 180 ? '…' : ''}`;
}

// Literal matching supplements Pagefind's language segmentation for the full
// tutorials, including Chinese phrases, identifiers, and hyphenated filenames.
export function searchTutorials(tutorials: SearchTutorial[], query: string): SearchResult[] {
	const terms = searchTerms(query);
	const normalized = terms.map(normalizeSearch);
	if (!normalized.length) return [];
	return tutorials.flatMap(tutorial => {
		const fullText = normalizeSearch(`${tutorial.title} ${tutorial.text}`);
		if (!normalized.every(term => fullText.includes(term))) return [];
		const sections = tutorial.sections.map(section => {
			const body = normalizeSearch(section.text);
			const heading = normalizeSearch(section.title);
			const prompts = normalizeSearch(section.prompts.join(' '));
			const score = normalized.reduce((sum, term) => sum + (body.includes(term) ? 1 : 0) + (heading.includes(term) ? 5 : 0) + (prompts.includes(term) ? 2 : 0), 0);
			return { section, score };
		}).filter(item => item.score > 0).sort((a, b) => b.score - a.score);
		const title = normalizeSearch(tutorial.title);
		const score = normalized.reduce((sum, term) => sum + (title.includes(term) ? 20 : 0), 0) + (sections[0]?.score || 0);
		return [{
			score,
			url: tutorial.url,
			meta: { title: tutorial.title },
			excerpt: excerptFor(sections[0]?.section.text || tutorial.text, terms),
			sub_results: sections.map(({ section }) => ({ url: `${tutorial.url}#${section.id}`, title: section.title, excerpt: excerptFor(section.text, terms) })),
		}];
	}).sort((a, b) => b.score - a.score);
}
