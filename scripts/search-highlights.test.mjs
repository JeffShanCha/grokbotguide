import test from 'node:test';
import assert from 'node:assert/strict';
import { searchHighlightRanges, searchResultHref } from '../src/lib/tutorial-search.ts';

test('search links preserve canonical path, existing parameters, and chapter anchors', () => {
	const origin = 'http://localhost:4321/zh/recipes/';
	const href = searchResultHref('/zh/recipes/gmail-inbox-triage/?view=full#read-only-heading', 'message_id', origin);
	assert.equal(href, '/zh/recipes/gmail-inbox-triage/?view=full&highlight=message_id#read-only-heading');
	const chinese = new URL(searchResultHref('/zh/recipes/summarize-a-document/#step-stage-1-heading', '不要补写缺页', origin), origin);
	assert.equal(chinese.searchParams.get('highlight'), '不要补写缺页');
	assert.equal(chinese.hash, '#step-stage-1-heading');
	assert.equal(searchResultHref(href, '', origin), '/zh/recipes/gmail-inbox-triage/?view=full#read-only-heading');
	assert.equal(searchResultHref('https://example.com/reference/', 'private query', origin), 'https://example.com/reference/');
});

test('Chinese text, identifiers, and punctuation return the original characters', () => {
	for (const keyword of ['不要补写缺页', 'message_id', 'source-invoices.json', '<Customers>', 'a+b[0]']) {
		const text = `开始 ${keyword}，然后 ${keyword}。`;
		const ranges = searchHighlightRanges(text, keyword);
		assert.deepEqual(ranges.map(range => text.slice(range.start, range.end)), [keyword, keyword]);
	}
});

test('normalization handles full-width text, combining marks, whitespace, and emoji offsets', () => {
	const text = '🧭 Ｍｅｓｓａｇｅ＿ｉｄ / Cafe\u0301 / 不要\n补写缺页';
	for (const [query, expected] of [['MESSAGE_ID', 'Ｍｅｓｓａｇｅ＿ｉｄ'], ['Café', 'Cafe\u0301'], ['不要补写缺页', '不要\n补写缺页']]) {
		const ranges = searchHighlightRanges(text, query);
		assert.equal(ranges.length, 1);
		assert.equal(text.slice(ranges[0].start, ranges[0].end), expected);
	}
});

test('overlapping terms count as one hit and quoted phrases remain together', () => {
	assert.deepEqual(searchHighlightRanges('Gmail and forwarding mail', 'Gmail'), [{ start: 0, end: 5 }]);
	assert.deepEqual(searchHighlightRanges('message_id message_id', 'message message_id'), [{ start: 0, end: 10 }, { start: 11, end: 21 }]);
	const text = 'a daily\nbrief to review';
	assert.equal(text.slice(...Object.values(searchHighlightRanges(text, '"daily brief"')[0])), 'daily\nbrief');
	assert.deepEqual(searchHighlightRanges('没有这段内容', 'message_id'), []);
	assert.deepEqual(searchHighlightRanges('normal text', '""'), []);
});
