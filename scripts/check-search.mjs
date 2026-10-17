import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { gunzipSync } from 'node:zlib';
import { parse } from 'parse5';
import { searchTutorials } from '../src/lib/tutorial-search.ts';

// Run after `npm run build`. Exercises the real built index and WASM search
// without starting a second server or relying on the original Markdown stubs.
const dist = new URL('../dist/', import.meta.url);
const tutorialIndex = JSON.parse(await readFile(new URL('pagefind/tutorials.json', dist), 'utf8'));
const normalize = text => text.normalize('NFKC').replace(/[\s\u200b]/gu, '');
const attr = (node, name) => node.attrs?.find(attribute => attribute.name === name)?.value;
const text = node => node.nodeName === '#text' ? node.value : (node.childNodes || []).map(text).join('');
function nodes(node, predicate) {
	return [...(predicate(node) ? [node] : []), ...(node.childNodes || []).flatMap(child => nodes(child, predicate))];
}
const fragments = new Map();
for (const name of await readdir(new URL('pagefind/fragment/', dist))) {
	const bytes = gunzipSync(await readFile(new URL(`pagefind/fragment/${name}`, dist)));
	const fragment = JSON.parse(bytes.subarray(bytes.indexOf('{')).toString());
	assert(!fragments.has(fragment.url), `Duplicate search result: ${fragment.url}`);
	assert(!fragment.url.includes('/preview/'), `Legacy preview in index: ${fragment.url}`);
	fragments.set(fragment.url, { ...fragment, id: name.replace('.pf_fragment', '') });
}

const cases = [];
let prompts = 0;
let paragraphs = 0;
// Reader queries use words from the body and prompts, rather than page titles.
const queries = {
	'call-transcripts-review': ['末尾片段', 'K1 K3'],
	'composio-many-apps': ['回显凭据', 'capability.md'],
	'cursor-cloud-agent': ['任务书', '月费不变'],
	'github-pr-watch': ['观察时间', '当前 head'],
	'gmail-drive-invoices': ['开具日期', 'filing-rules.md'],
	'gmail-inbox-triage': ['Review 兜底', 'classification.csv'],
	'google-calendar-meeting-brief': ['全天事件', '显示时区'],
	'google-docs-positioning-brief': ['来源缺页', 'source-map.md'],
	'google-ads-scoreboard': ['微单位', 'CVR 分母'],
	'marketplace-watch': ['用户选定', '300USD'],
	'mobile-voice': ['错误上下文', '麦克风'],
	'notion-personal-crm': ['来源越明确', 'account_id'],
	'sheets-audience-tracker': ['付费订阅者', 'metric-index.md'],
	'shopping-compare': ['含糖 无糖', '待确认项'],
	'slack-daily-standup': ['可见频道', 'coverage.md'],
	'slack-team-bot': ['共享凭据', '快照期间'],
	'stripe-refunds': ['法律结论', 'POL1'],
	'summarize-a-document': ['声明章节', '不要补写缺页'],
	'typefully-repurpose': ['唯一事实来源', 'facts.md'],
	'website-daily-check': ['后台 外链', 'site-fixture.json'],
	'x-bookmarks-demo': ['关键调查', '费用'],
	'x-personal-portrait-site': ['逐字原帖', 'intake.md'],
	'x-tag-bot': ['公开指令', '私聊文件练习'],
	'youtube-competitor-watch': ['旧热门视频', '长视频规则'],
	'zendesk-support-queue': ['本地整理', 'triage-rules.md'],
};
const englishQueries = {
 'call-transcripts-review':['personnel evaluation','evidence.csv'],
 'composio-many-apps':['expired connections','capability.md'],
 'cursor-cloud-agent':['synthetic change','implementation-brief.md'],
 'github-pr-watch':['stale check results','new-b'],
 'gmail-drive-invoices':['month boundaries','filing-rules.md'],
 'gmail-inbox-triage':['permission isolation','classification.csv'],
 'google-calendar-meeting-brief':['exclusive all-day end date','normalized.csv'],
 'google-docs-positioning-brief':['market outcome','source-map.md'],
 'google-ads-scoreboard':['currency micros','metric-contract.md'],
 'marketplace-watch':['seller condition claims','listing_id'],
 'mobile-voice':['dictation','280'],
 'notion-personal-crm':['unpublished locations','tag-map.csv'],
 'sheets-audience-tracker':['rounded strings','metric-index.md'],
 'shopping-compare':['mandatory fee','45.60'],
 'slack-daily-standup':['unread private content','standup.md'],
 'slack-team-bot':['shared credentials','answers.md'],
 'stripe-refunds':['financial action','POL1'],
 'summarize-a-document':['missing section','coverage.md'],
 'typefully-repurpose':['sole factual source','facts.md'],
 'website-daily-check':['static page','site-fixture.json'],
 'x-bookmarks-demo':['technical bookmarks','prototype-brief.md'],
 'x-personal-portrait-site':['verbatim posts','intake.md'],
 'x-tag-bot':['public triggers','coverage.csv'],
 'youtube-competitor-watch':['unequal time','observations.csv'],
 'zendesk-support-queue':['knowledge evidence','triage-rules.md'],
};
for (const locale of ['zh','en']) for (const item of await readdir(new URL(`${locale}/recipes/`, dist), { withFileTypes: true })) {
	if (!item.isDirectory()) continue;
	const url = `/${locale}/recipes/${item.name}/`;
	const page = parse(await readFile(new URL(`${locale}/recipes/${item.name}/index.html`, dist), 'utf8'));
	const blocks = nodes(page, node => node.tagName === 'pre' && attr(node, 'id')?.startsWith('wf-'));
	if (!blocks.length) continue;
	const fragment = fragments.get(url);
	assert(fragment, `Missing full tutorial: ${url}`);
	const literal = tutorialIndex.find(tutorial => tutorial.url === url);
	assert(literal, `Missing literal tutorial: ${url}`);
	for (const block of blocks) {
		assert(normalize(fragment.content).includes(normalize(text(block))), `Incomplete prompt ${attr(block, 'id')}: ${url}`);
		assert(normalize(literal.sections.map(section => section.text).join(' ')).includes(normalize(text(block))), `Incomplete literal prompt ${attr(block, 'id')}: ${url}`);
		prompts++;
	}
	const ids = new Set(nodes(page, node => attr(node, 'id') !== undefined).map(node => attr(node, 'id')));
	assert.equal(ids.size, nodes(page, node => attr(node, 'id') !== undefined).length, `Duplicate anchor: ${url}`);
	const headings = fragment.anchors.filter(anchor => /^h[2-6]$/.test(anchor.element));
	assert(headings.length > 5, `Missing chapter search links: ${url}`);
	for (const anchor of headings) assert(ids.has(anchor.id), `Broken search anchor: ${url}#${anchor.id}`);
	const article = nodes(page, node => node.tagName === 'article')[0];
	for (const paragraph of nodes(article, node => node.tagName === 'p')) {
		assert(normalize(fragment.content).includes(normalize(text(paragraph))), `Missing paragraph: ${url}: ${text(paragraph)}`);
		assert(normalize(literal.text).includes(normalize(text(paragraph))), `Missing literal paragraph: ${url}: ${text(paragraph)}`);
		paragraphs++;
	}
	const readerQueries = locale === 'zh' ? queries : englishQueries;
	assert(readerQueries[item.name], `Missing reader query coverage: ${locale}/${item.name}`);
	cases.push({ url, id: fragment.id, body: readerQueries[item.name][0], prompt: readerQueries[item.name][1] });
}
assert.equal(cases.length, 50, 'All 25 tutorials in both languages must be searchable.');
assert.equal(prompts, 302, 'All 302 complete prompts must be indexed.');
assert.equal(tutorialIndex.length, 50, 'All full tutorials must have literal matching.');
for (const tutorial of cases) {
	for (const [kind, query] of [['body', tutorial.body], ['prompt', tutorial.prompt]]) {
		assert(searchTutorials(tutorialIndex.filter(item => item.url.startsWith(tutorial.url.startsWith('/en/') ? '/en/' : '/zh/')), query).some(result => result.url === tutorial.url), `${kind} query missed ${tutorial.url}: ${query}`);
	}
}

// Pagefind is browser code, but its main-thread WASM engine can run in Node.
// Supply file reads for its static bundles instead of starting a web server.
const nativeFetch = globalThis.fetch;
const originalDocument = globalThis.document;
let language = 'zh-cn';
// Pagefind detects the query segmenter from <html lang>, even when options
// contain a language. Mirror that language signal in this Node-only harness.
globalThis.document = { currentScript: null, querySelector: () => ({ getAttribute: () => language }) };
globalThis.fetch = async (input, init) => {
	const url = input instanceof Request ? input.url : input.toString();
	if (!url.startsWith('file:')) return nativeFetch(input, init);
	try { return new Response(await readFile(new URL(url))); }
	catch { return new Response(null, { status: 404 }); }
};
const search = await import(new URL('pagefind/pagefind.js', dist));
try {
	await search.options({ basePath: new URL('pagefind/', dist).href, baseUrl: '/', language: 'zh-cn' });
	for (const [query, url] of [
		['message_id', '/zh/recipes/gmail-inbox-triage/'],
		['classification.csv', '/zh/recipes/gmail-inbox-triage/'],
		['连接 Gmail', '/zh/answers/how-to-connect-grok-bot-to-gmail/'],
	]) {
		const results = await search.search(query);
		assert(results.results.some(result => result.id === fragments.get(url)?.id), `Search regression: ${query}`);
	}
	assert.equal((await search.search('"zzzxqvnotfound94183"')).results.length, 0);
	await search.destroy();
	language = 'en';
	await search.options({ basePath: new URL('pagefind/', dist).href, baseUrl: '/', language: 'en' });
	for (const [query,url] of [['Gmail','/en/recipes/gmail-inbox-triage/'],['message_id','/en/recipes/gmail-inbox-triage/'],['connect Gmail','/en/answers/how-to-connect-grok-bot-to-gmail/']]) {
		assert((await search.search(query)).results.some(result=>result.id===fragments.get(url)?.id), `English search regression: ${query}`);
	}
	console.log(`Search verified: ${cases.length} full tutorials, ${paragraphs} body paragraphs, ${prompts} complete prompts, 100 body/prompt queries, FAQ and English search.`);
} finally {
	await search.destroy();
	globalThis.fetch = nativeFetch;
	if (originalDocument === undefined) delete globalThis.document;
	else globalThis.document = originalDocument;
}
