import { parse } from 'parse5';

const attribute = (node, name) => node.attrs?.find(attr => attr.name === name)?.value;
function find(node, predicate) {
	return [...(predicate(node) ? [node] : []), ...(node.childNodes || []).flatMap(child => find(child, predicate))];
}
function text(node) {
	if (attribute(node, 'data-pagefind-ignore') !== undefined || ['script', 'style', 'button'].includes(node.tagName)) return '';
	return node.nodeName === '#text' ? node.value : (node.childNodes || []).map(text).join(' ');
}

// Use the rendered canonical tutorial, including all prompt code blocks and
// practice panels. No copies of the original Markdown or hand-written summaries.
export function extractTutorial(url, html) {
	if (!/^\/(?:zh|en)\/recipes\/[^/]+\/$/.test(url)) return null;
	const page = parse(html);
	const prompts = find(page, node => node.tagName === 'pre' && attribute(node, 'id')?.startsWith('wf-'));
	if (!prompts.length) return null;
	const article = find(page, node => node.tagName === 'article')[0];
	const title = text(find(page, node => node.tagName === 'h1')[0]).trim();
	const sections = (article.childNodes || []).filter(node => node.tagName === 'section').map(section => {
		const heading = find(section, node => node.tagName === 'h2')[0];
		return {
			id: attribute(heading, 'id') || attribute(section, 'id'),
			title: text(heading).trim(),
			text: text(section).replace(/\s+/g, ' ').trim(),
			prompts: find(section, node => node.tagName === 'pre' && attribute(node, 'id')?.startsWith('wf-')).map(text),
		};
	});
	const shell = find(page, node => attribute(node, 'class')?.split(' ').includes('wf-shell'))[0];
	return { url, title, text: text(shell).replace(/\s+/g, ' ').trim(), sections };
}
