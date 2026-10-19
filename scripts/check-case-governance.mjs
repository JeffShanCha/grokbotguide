import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { parse } from 'parse5';

const root = fileURLToPath(new URL('../', import.meta.url));
const records = JSON.parse(readFileSync(root + 'src/data/case-governance.json', 'utf8'));
const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
const slugs = Object.keys(records).sort();
const langs = ['zh', 'en'];
const liveIndex = process.argv.indexOf('--live');
const liveOrigin = liveIndex === -1 ? undefined : new URL(process.argv[liveIndex + 1]).origin;
const keys = ['automatic', 'confirmation', 'takeover'];
const headings = {
	zh: ['可自动执行', '需要确认', '失败后接管'],
	en: ['Can run automatically', 'Requires confirmation', 'Take over after a failure'],
};
const date = (value, label) => {
	assert.equal(typeof value, 'string', `${label}: date is required`);
	assert.match(value, /^\d{4}-\d{2}-\d{2}$/, `${label}: use YYYY-MM-DD`);
	const parsed = new Date(value + 'T00:00:00Z');
	assert(!Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value, `${label}: invalid date`);
	assert(value <= today, `${label}: future verification or update date`);
};
const localized = (value, label) => {
	for (const lang of langs) assert(typeof value?.[lang] === 'string' && value[lang].trim(), `${label}: missing ${lang} text`);
};
for (const lang of langs) {
	const expected = readdirSync(root + `src/content/docs/${lang}/recipes`)
		.filter(name => /\.mdx?$/.test(name) && !name.startsWith('index.'))
		.map(name => name.replace(/\.mdx?$/, '')).sort();
	assert.deepEqual(slugs, expected, `${lang}: every case needs its own governance record, without orphan records`);
}
for (const [slug, record] of Object.entries(records)) {
	assert(['workflow', 'handbook'].includes(record.format || 'workflow'), `${slug}: invalid case format`);
	date(record.updatedOn, `${slug}.updatedOn`);
	for (const key of keys) localized(record.boundaries?.[key], `${slug}.boundaries.${key}`);
	const { documentation, execution } = record;
	assert(documentation && execution, `${slug}: separate documentation and execution records required`);
	assert(Object.hasOwn(documentation, 'checkedOn'), `${slug}: explicitly use null for an unrecorded documentation review`);
	if (documentation.checkedOn !== null) date(documentation.checkedOn, `${slug}.documentation.checkedOn`);
	const documentationStatus = documentation.status ?? (documentation.checkedOn ? 'recorded' : 'unverified');
	assert(['unverified', 'recorded', 'partial', 'verified'].includes(documentationStatus), `${slug}: invalid documentation status`);
	if (documentationStatus === 'unverified') assert.equal(documentation.checkedOn, null, `${slug}: unverified documentation cannot have a review date`);
	else date(documentation.checkedOn, `${slug}.documentation.checkedOn`);
	if (['partial', 'verified'].includes(documentationStatus)) assert(documentation.evidenceUrl, `${slug}: documentation review needs evidence and scope`);
	if (documentation.evidenceUrl) assert(documentation.evidenceUrl.startsWith('/') && !documentation.evidenceUrl.includes('..') && existsSync(root + 'public' + documentation.evidenceUrl), `${slug}: missing public documentation evidence`);
	localized(documentation.note, `${slug}.documentation.note`);
	if (record.format === 'handbook') for (const lang of langs) {
		const source = readFileSync(root + `src/content/docs/${lang}/recipes/${slug}.mdx`, 'utf8');
		const checkedOn = source.match(/^last_checked:\s*(\d{4}-\d{2}-\d{2})\s*$/m)?.[1] || null;
		assert.equal(checkedOn, documentation.checkedOn, `${lang}/${slug}: frontmatter and documentation review dates disagree`);
	}
	assert(['unverified', 'partial', 'verified'].includes(execution.status), `${slug}: invalid execution status`);
	localized(execution.note, `${slug}.execution.note`);
	if (execution.lastAttemptOn) {
		date(execution.lastAttemptOn, `${slug}.execution.lastAttemptOn`);
		assert(execution.evidenceUrl, `${slug}: execution attempts need an evidence record, not just a date`);
	}
	if (execution.status === 'unverified') assert.equal(execution.verifiedOn, null, `${slug}: unverified execution cannot have a verification date`);
	else {
		date(execution.verifiedOn, `${slug}.execution.verifiedOn`);
		assert(execution.evidenceUrl, `${slug}: partial/verified execution needs a public evidence record`);
	}
	for (const field of ['evidenceUrl', 'auditUrl']) {
		const url = execution[field];
		if (!url) continue;
		assert(url.startsWith('/') && !url.includes('..') && existsSync(root + 'public' + url), `${slug}: missing local public ${field}`);
	}
}

if (process.argv.includes('--built') || liveOrigin) {
	const attr = (node, name) => node.attrs?.find(item => item.name === name)?.value;
	const find = (node, predicate) => [...(predicate(node) ? [node] : []), ...(node.childNodes || []).flatMap(child => find(child, predicate))];
	const text = node => node.nodeName === '#text' ? node.value : (node.childNodes || []).map(text).join('');
	for (const lang of langs) {
		const actual = liveOrigin ? slugs : readdirSync(root + `dist/${lang}/recipes`, { withFileTypes: true })
			.filter(entry => entry.isDirectory() && entry.name !== 'topics' && existsSync(root + `dist/${lang}/recipes/${entry.name}/index.html`))
			.map(entry => entry.name).sort();
		assert.deepEqual(actual, slugs, `${lang}: built case routes do not match the maintained records`);
		for (const slug of slugs) {
			const record = records[slug];
			const label = `${lang}/${slug}`;
			let html;
			if (liveOrigin) {
				const response = await fetch(`${liveOrigin}/${lang}/recipes/${slug}/`, { signal: AbortSignal.timeout(20000), headers: { 'Cache-Control': 'no-cache' } });
				assert.equal(response.status, 200, `${label}: live page failed`);
				html = await response.text();
			} else html = readFileSync(root + `dist/${lang}/recipes/${slug}/index.html`, 'utf8');
			const tree = parse(html);
			const boundaries = find(tree, node => attr(node, 'data-case-boundaries') === slug);
			assert.equal(boundaries.length, 1, `${label}: expected one boundary section`);
			const blocks = find(boundaries[0], node => attr(node, 'data-boundary') !== undefined);
			assert.deepEqual(blocks.map(node => attr(node, 'data-boundary')), keys, `${label}: missing or duplicated boundary blocks`);
			assert.deepEqual(find(boundaries[0], node => node.tagName === 'h3').map(text), headings[lang], `${label}: boundary headings missing`);
			keys.forEach((key, i) => assert(text(blocks[i]).includes(record.boundaries[key][lang]), `${label}: wrong case-specific boundary text`));
			const article = boundaries[0].parentNode;
			const firstStep = (article.childNodes || []).find(node => record.format === 'handbook'
				? node !== boundaries[0] && find(node, child => child.tagName === 'h2').length
				: attr(node, 'class')?.split(' ').includes('wf-stage'));
			assert(firstStep && article.childNodes.indexOf(boundaries[0]) < article.childNodes.indexOf(firstStep), `${label}: show boundaries before the execution steps`);
			if (record.format !== 'handbook') assert(find(tree, node => node.tagName === 'a' && attr(node, 'href') === '#automation-boundaries').length, `${label}: missing boundary navigation`);
			const verification = find(tree, node => attr(node, 'data-case-verification') === slug);
			assert.equal(verification.length, 1, `${label}: expected one verification record`);
			const box = verification[0];
			assert.equal(find(box, node => attr(node, 'data-documentation-status') === (record.documentation.status ?? (record.documentation.checkedOn ? 'recorded' : 'unverified'))).length, 1, `${label}: wrong documentation status`);
			if (record.documentation.evidenceUrl) assert(find(box, node => node.tagName === 'a' && attr(node, 'href') === record.documentation.evidenceUrl).length, `${label}: documentation evidence link missing`);
			assert.equal(find(box, node => attr(node, 'data-execution-status') === record.execution.status).length, 1, `${label}: wrong execution status`);
			assert.deepEqual(find(box, node => node.tagName === 'time').map(node => attr(node, 'datetime')), [record.updatedOn, record.documentation.checkedOn, record.execution.verifiedOn, record.execution.lastAttemptOn].filter(Boolean), `${label}: dates must come from this case's independent records`);
			assert(text(box).includes(record.documentation.note[lang]) && text(box).includes(record.execution.note[lang]), `${label}: verification limits missing`);
		}
	}
	console.log(`Case pages verified${liveOrigin ? ' on ' + liveOrigin : ''}: ${slugs.length * langs.length} pages, three boundary blocks before execution, independent dates and explicit verification status.`);
}
console.log(`Case governance verified: ${slugs.length} bilingual records, explicit dates or unverified status, scoped evidence for execution checks.`);
