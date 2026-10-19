// Offline checks on the actual Grok Bot archive, never on tutorial fixtures.
// Usage: node scripts/review-p0-artifacts.mjs /path/to/extracted/archive [/path/to/followup]
// The archive remains private; stdout contains checks, not private session text.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { parse } from 'parse5';

assert(process.argv[2], 'Supply the extracted original Grok Bot archive directory');
const directory = resolve(process.argv[2]);
const bytes = file => readFileSync(resolve(directory, file));
const json = file => JSON.parse(bytes(file).toString('utf8'));
const sha256 = value => createHash('sha256').update(value).digest('hex');
const checks = [];
function check(name, verify) { verify(); checks.push({ name, result: 'pass' }); }
const run = json('run.json');
const doc = json('document-result.json');
const site = json('website-result.json');
const pr = json('pr-result.json');
const readme = bytes('raw/readme.body');
const source = readme.toString('utf8');
check('Pinned real README, complete bytes and independently observed hash', () => {
	assert.equal(doc.source_url, 'https://raw.githubusercontent.com/JeffShanCha/grokbotguide/920a60eb055bac5845d88dded694c9eb684f554f/README.md');
	assert.equal(readme.length, 23189);
	assert.equal(doc.bytes, readme.length);
	assert.equal(doc.sha256, sha256(readme));
	assert.equal(doc.sha256, 'de133e0737a1fc5528155bbd7b4ff259c368ca8de0dab7199e5342427d0ad366');
});
check('All real README H2 headings and source line positions', () => {
	const headings = source.split('\n').flatMap((line, index) => line.startsWith('## ') ? [{ title: line.slice(3), start_line: index + 1 }] : []);
	assert.equal(headings.length, 15);
	assert.deepEqual(doc.h2_headings.map(({ title, start_line }) => ({ title, start_line })), headings);
});
check('Five points, actions with unknown owners/deadlines, and exact source excerpts', () => {
	assert.equal(doc.key_points.length, 5);
	for (const item of [...doc.key_points, ...doc.todo_and_participation]) {
		assert(item.evidence?.quote && source.includes(item.evidence.quote));
		if (Object.hasOwn(item, 'owner')) assert(item.owner.includes('未明确') && item.deadline.includes('未明确'));
	}
});
const text = node => node.nodeName === '#text' ? node.value : (node.childNodes || []).map(text).join('');
const attr = (node, name) => node.attrs?.find(item => item.name === name)?.value;
const find = (node, predicate) => [...(predicate(node) ? [node] : []), ...(node.childNodes || []).flatMap(child => find(child, predicate))];
check('Three real HTTP responses, including an intentional 404 control', () => {
	assert.equal(site.pages.length, 3);
	for (const [index, name] of ['site-zh', 'site-gmail', 'site-404'].entries()) {
		const page = site.pages[index];
		const meta = Object.fromEntries(bytes(`raw/${name}.meta`).toString('utf8').trim().split('\n').map(line => line.split(/=(.*)/s).slice(0, 2)));
		assert.equal(page.status_code, index === 2 ? 404 : 200);
		assert.equal(Number(meta.http_code), page.status_code);
		assert.equal(meta.url_effective, page.final_url);
		assert.equal(Number(meta.size_download), bytes(`raw/${name}.body`).length);
		assert.equal(page.bytes, bytes(`raw/${name}.body`).length);
		assert.equal(meta.exit, '0');
		assert.equal(page.negative_check, index === 2);
	}
});
check('Boundary anchor and all three headings in the actual Gmail HTML section', () => {
	const tree = parse(bytes('raw/site-gmail.body').toString('utf8'));
	const sections = find(tree, node => attr(node, 'id') === 'automation-boundaries');
	assert.equal(sections.length, 1);
	assert.deepEqual(find(sections[0], node => node.tagName === 'h3').map(text), ['可自动执行', '需要确认', '失败后接管']);
});
check('Real PR state, current-head check identities and independent review data', () => {
	const raw = json('raw/pr3.body');
	assert.equal(raw.number, 3);
	assert.equal(pr.head_sha, raw.head.sha);
	assert.equal(pr.state, raw.state);
	assert.equal(pr.merged, raw.merged);
	assert.equal(pr.draft, raw.draft);
	const rawChecks = json('raw/head-checkruns.body').check_runs;
	assert.deepEqual(pr.check_runs.runs.map(item => [item.name, item.head_sha, item.conclusion]), rawChecks.map(item => [item.name, item.head_sha, item.conclusion]));
	assert(pr.check_runs.runs.every(item => item.head_sha === raw.head.sha && item.matches_pr_head));
	assert.equal(pr.reviews.count, json('raw/pr3-reviews.body').length);
	assert.equal(pr.commit_status.total_count, json('raw/head-status.body').total_count);
	assert.equal(pr.mergeable, null);
});
const transcript = bytes('raw/session-transcript-export.txt').toString('utf8');
const messages = transcript.split('\n').flatMap(line => { try { return [JSON.parse(line)]; } catch { return []; } });
const start = messages.findIndex(item => item.role === 'user' && JSON.stringify(item).includes('gbg-p0-20261018-2235'));
assert(start >= 0, 'Current instruction must be present in the original export');
const calls = messages.slice(start).flatMap(item => item.message?.content || []).filter(item => item.type === 'tool_use');
check('No delegation tool calls in the available current-run transcript excerpt', () => {
	assert(calls.length > 0);
	assert(calls.every(item => ['SendToUser', 'Shell', 'Read'].includes(item.name)));
	assert.equal(run.delegated, false);
});
if (process.argv[3]) {
	const followup = resolve(process.argv[3]);
	const followBytes = file => readFileSync(resolve(followup, file));
	const followJson = file => JSON.parse(followBytes(file).toString('utf8'));
	check('Follow-up source references: all 27 excerpts match their exact README lines', () => {
		const report = followJson('doc-followup.json');
		const lines = source.split('\n');
		let count = 0;
		for (const row of [...report.first_round_review, ...report.participation_steps_corrected]) {
			for (const support of row.support) {
				assert(lines[support.line - 1]?.includes(support.quote));
				count++;
			}
		}
		assert.equal(count, 27);
		assert(report.participation_steps_corrected.some(item => item.nature.includes('非强制')));
	});
	check('Real product responses, source hashes and changed-model redirect', () => {
		const report = followJson('shopping-result.json');
		for (const source of Object.values(report.sources)) {
			const body = followBytes(source.raw_body);
			assert.equal(source.http_code, '200');
			assert.equal(source.sha256, sha256(body));
			assert.equal(Number(source.size_download), body.length);
		}
		assert.equal(report.sources.buy_page.url_effective, 'https://www.apple.com.cn/shop/buy-airpods/airpods-5');
		assert(report.models.every(item => item.list_price_on_official_page.startsWith('未知') && item.shipping_fee === '未知' && item.tax.startsWith('未知')));
	});
}
console.log(JSON.stringify({
	schemaVersion: 1, reviewer: 'Codex', reviewedAt: new Date().toISOString(),
	kind: 'offline_review_of_actual_grok_bot_artifacts', runId: run.run_id,
	checks, sourceBytes: readme.length, sourceSha256: sha256(readme),
	availableToolCallNames: calls.map(item => item.name),
	limits: [
		'Exact excerpt matches do not establish semantic support for every clause; a human-readable review is required.',
		'The original transcript export truncates long tool arguments/results. It ends before packaging and is not a complete execution trace.',
		'No delegation was observed in the available excerpt; this does not prove unseen activity absent.',
		'These supporting checks do not promote any case to a full workflow pass. Browser, login, writes and Routines require separate evidence.'
	]
}, null, 2));
