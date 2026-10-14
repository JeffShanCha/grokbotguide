import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeUrl, identity, processBatch, validateResource } from './lib/resources.mjs';

const today = '2026-10-15';
const resource = {
	id: 'bot-skills', url: 'https://github.com/author/grok-bot-skills', title: 'Grok Bot writing skills catalog', author: 'Author',
	source: 'github', lang: 'en', added: today, checked_at: today, status: 'alive', categories: ['templates'], evidence: 'author-reported',
	summary_zh: '作者分享的写作技能库，需自行验证。', summary_en: 'A writing skill catalog shared by its author; not independently tested.',
	verification_note_zh: '已阅读项目说明。', verification_note_en: 'Read the project README.',
};
const candidate = (changes = {}) => ({ decision: 'publish', reason: 'Original author resource', relevance: 'Explicitly supports xAI Grok Bot', verified_via: 'page', resource: { ...resource, ...changes } });
const run = (existing, candidates) => processBatch(existing, { id: '2026-10-15-test', candidates }, { today });

test('normalizes tracking, query order, social aliases and video share links', () => {
	assert.equal(normalizeUrl('http://www.example.com/Path/?z=2&utm_source=x&a=1#top'), 'https://example.com/Path?a=1&z=2');
	assert.equal(identity('https://twitter.com/old/status/123?s=20'), identity('https://x.com/new/status/123'));
	assert.equal(identity('https://youtu.be/AbC123?si=123'), identity('https://www.youtube.com/watch?v=AbC123&t=10'));
	assert.equal(identity('https://old.reddit.com/r/GrokBot/comments/abc/title/'), identity('https://reddit.com/r/Other/comments/abc/other/'));
	assert.equal(identity('https://linux.do/t/topic/123?tl=en'), identity('https://linux.do/t/topic/123'));
});
test('preserves case-sensitive paths and distinct content parameters', () => {
	assert.notEqual(identity('https://example.com/AbC'), identity('https://example.com/abc'));
	assert.notEqual(identity('https://youtube.com/watch?v=AbC'), identity('https://youtube.com/watch?v=abc'));
	assert.notEqual(identity('https://example.com/post?id=1'), identity('https://example.com/post?id=2'));
	assert.notEqual(identity('https://github.com/Author/Repo/blob/main/README.md'), identity('https://github.com/author/repo/blob/main/readme.md'));
});
test('unsafe schemes and local addresses fail validation', () => {
	for (const url of ['javascript:alert(1)', 'file:///tmp/a', 'http://localhost/x', 'https://127.0.0.1', 'https://user:pass@example.com']) assert.throws(() => normalizeUrl(url));
});
test('app metadata survives ingestion and rejects malformed or repeated labels', () => {
	const valid = run([], [candidate({ apps: ['Notion', 'Composio'] })]);
	assert.deepEqual(valid.resources[0].apps, ['Notion', 'Composio']);
	for (const apps of ['Notion', [1], [' '], ['Notion', 'notion']]) assert.equal(run([], [candidate({ apps })]).report.held.length, 1);
});
test('duplicate URLs and repeated runs do not grow the catalog', () => {
	const first = run([], [candidate(), candidate({ id: 'another-id', url: resource.url + '?utm_source=test' })]);
	assert.equal(first.report.added.length, 1);
	assert.equal(first.report.duplicates.length, 1);
	const next = run(first.resources, [candidate()]);
	assert.equal(next.resources.length, 1);
	assert.equal(next.report.added.length, 0);
});
test('reposts with original URL and identical metadata collapse across domains', () => {
	const first = run([], [candidate()]);
	const next = run(first.resources, [candidate({ id: 'mirror', url: 'https://example.com/translated', original_url: resource.url, title: '译文' })]);
	assert.equal(next.report.duplicates.length, 1);
	assert.equal(run(first.resources, [candidate({ id: 'copied', url: 'https://example.com/copy' })]).report.duplicates.length, 1);
});
test('similar titles and id collisions stay in the review queue', () => {
	const existing = run([], [candidate()]).resources;
	assert.equal(run(existing, [candidate({ id: 'similar', url: 'https://example.com/other', summary_en: 'A different summary.' })]).report.held.length, 1);
	assert.equal(run(existing, [candidate({ url: 'https://example.com/other', title: 'A totally different thing', summary_en: 'Different.' })]).report.held.length, 1);
});
test('held, rejected, snippets, missing evidence and future dates never publish', () => {
	const next = run([], [
		{ ...candidate(), decision: 'hold' }, { ...candidate(), decision: 'reject' },
		{ ...candidate(), verified_via: 'search-snippet' }, candidate({ checked_at: '2026-10-16' }), candidate({ categories: [] }),
		candidate({ evidence: 'official' }), candidate({ verification_note_zh: '' }),
	]);
	assert.equal(next.report.added.length, 0);
	assert.equal(next.report.held.length, 6);
	assert.equal(next.report.rejected.length, 1);
	assert.ok(validateResource({ ...resource, added: '2026-02-30' }, { today }).length);
});
test('explicit updates preserve original id and added date', () => {
	const existing = run([], [candidate({ added: '2026-10-14' })]).resources;
	const update = { ...candidate({ summary_en: 'Updated summary based on a new read.' }), update_id: resource.id };
	const next = run(existing, [update]);
	assert.equal(next.report.updated.length, 1);
	assert.equal(next.resources[0].added, '2026-10-14');
	assert.equal(next.resources[0].id, resource.id);
	assert.equal(run(existing, [{ ...update, update_id: 'wrong' }]).report.held.length, 1);
});
