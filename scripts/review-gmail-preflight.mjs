// Review the actual, private GBG/Test label-preflight archive. Never publish raw inputs.
// Usage: node scripts/review-gmail-preflight.mjs /path/to/extracted/archive
// Emits only an allowlisted, sanitized record. This is not a mail-classification pass.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

assert(process.argv[2], 'Supply the extracted original archive directory');
const root = resolve(process.argv[2]);
const read = path => readFileSync(resolve(root, path), 'utf8');
const json = path => JSON.parse(read(path));
const run = json('run.json');
const reported = json('public-result.json');
const raw = read('private/raw/01-list_labels.txt');
const labels = JSON.parse(raw.slice(raw.indexOf('{'), raw.lastIndexOf('}') + 1)).labels;
assert(Array.isArray(labels) && labels.length > 0, 'Need a complete nonempty label response');
assert(labels.every(item => typeof item.name === 'string' && typeof item.labelId === 'string'));
const targetFound = labels.some(item => item.name === 'GBG/Test');
assert.equal(targetFound, false, 'This historical attempt must be reviewed as a missing-label preflight');
assert.equal(reported.label, 'GBG/Test');
assert.equal(reported.limit, 5);
assert.equal(reported.actual_message_count, 0);
assert.equal(reported.result, 'blocked_label_not_found');
assert.equal(run.result, reported.result);
assert.equal(run.started_at, read('private/raw/start.txt').trim());
assert.equal(run.ended_at, read('private/raw/end.txt').trim());

const messages = read('private/session-transcript-export.txt').split('\n').flatMap(line => {
	try { return [JSON.parse(line)]; } catch { return []; }
});
const calls = messages.flatMap(item => item.message?.content || []).filter(item => item.type === 'tool_use');
const input = item => typeof item.input === 'string' ? JSON.parse(item.input) : item.input;
const gmailCalls = calls.filter(item => item.name === 'CallDynamicTool').map(input);
assert.equal(gmailCalls.length, 1, 'Expected exactly one service call in this available excerpt');
assert.equal(gmailCalls[0].namespace, 'user-Gmail');
assert.equal(gmailCalls[0].toolName, 'list_labels');
assert.deepEqual(gmailCalls[0].arguments, {});
assert(calls.every(item => ['SendToUser', 'GetDynamicTools', 'Shell', 'CallDynamicTool', 'Read'].includes(item.name)), 'Unexpected tool or delegation call in the excerpt');
assert.equal(run.delegated, false);
assert.equal(run.subagents, 0);
for (const item of calls.filter(item => item.name === 'Shell')) {
	const command = input(item).command;
	assert(!/https?:|\bcurl\b|\bwget\b|\bgit\b|\bssh\b|\bscp\b/.test(command), 'Unexpected network or repository operation');
}

// Never copy label names/ids/counts, mailbox counts, original tool results or assistant analysis.
console.log(JSON.stringify({
	schemaVersion: 1,
	case: 'gmail-inbox-triage',
	runId: run.run_id,
	date: '2026-10-19',
	timezone: 'Asia/Shanghai',
	startedAt: run.started_at,
	endedAt: run.ended_at,
	reviewer: 'Codex',
	productActor: '二丫头 (existing Grok Bot, same private conversation)',
	status: 'unverified',
	verifiedOn: null,
	lastAttemptOn: '2026-10-19',
	result: 'blocked_label_not_found',
	fullWorkflowVerified: false,
	scope: {
		label: 'GBG/Test', maxUniqueMessages: 5,
		actualMessagesRead: 0, classifiedMessages: 0,
		allowed: 'Exact-label metadata lookup, followed by bounded read-only classification if the target exists.',
		forbidden: ['Read-state changes', 'Label writes', 'Draft creation', 'Sending/replying/forwarding', 'Archive/delete', 'Attachments/links', 'OAuth or permission expansion', 'Skills/Routines', 'Delegation']
	},
	observations: {
		exactLabelPresentInReturnedMetadata: false,
		gmailCallsInAvailableOriginalExcerpt: [{ tool: 'list_labels', arguments: {}, count: 1 }],
		messageReadsInAvailableOriginalExcerpt: 0,
		writeCallsInAvailableOriginalExcerpt: 0,
		delegationCallsInAvailableOriginalExcerpt: 0,
		mailboxIdentityVerified: false,
		bodyCoverage: 'untested', classification: 'untested',
		unreadStateBeforeAfter: 'untested',
		mailboxUnchangedIndependentlyVerified: false
	},
	finding: {
		zh: '本次已连接 Gmail 返回的标签元数据中未找到完整名称 GBG/Test，因此停止；没有搜索、读取或分类邮件。此结果仅限该连接和该次查询，不能说明其他账号或之后是否有此标签。',
		en: 'The returned metadata from this connected Gmail did not contain the exact label GBG/Test, so the task stopped before searching, reading or classifying messages. This finding is limited to that connection and observation; it does not establish absence in another account or at a later time.'
	},
	evidenceReview: {
		rawLabelResponseParsedCompletely: true,
		exactNameComparedAgainstEveryReturnedLabel: true,
		runTimesMatchSavedClockOutputs: true,
		observedServiceCallMatchesReportedStop: true,
		originalArchiveRetainedLocally: true,
		originalArchivePublished: false,
		publicEvidenceContainsUnrelatedMailboxMetadata: false,
		limits: [
			'The available original transcript starts with the acknowledgement/schema lookup, not the user instruction. The instruction and final stop were observed separately in the native UI.',
			'The excerpt ends at the label-response read. Artifact construction, packaging and attachment delivery are outside it; it is not a full end-to-end trace.',
			'The long schema/read outputs in the transcript are truncated. Label absence was checked against the complete separate raw response file.',
			'No write call observed does not establish an independently measured unchanged mailbox state. No message-state snapshots were taken.',
			'The presence of search_threads/get_message in a schema is not a successful bounded-message read test. No empty-query, fixture or catalog check counts as a classification pass.'
		]
	},
	unverifiedStages: ['Real message reads', 'Classification', 'Message-level scope enforcement', 'Body completeness', 'Before/after unread state', 'Labels/drafts/sending', 'Deduplication/reruns', 'Skills/Routines'],
	nextUserAction: {
		zh: '确认 GBG/Test 位于二丫头当前连接的 Gmail 账号，并把测试邮件加入该标签，准备好后再告知；不需要提供邮箱地址、正文或凭据。',
		en: 'Confirm GBG/Test exists in the Gmail account currently connected to this Bot and contains test messages, then report readiness. No address, message text or credentials are needed.'
	},
	previousEvidence: '/verification/p0-2026-10-18/execution-attempt.json',
	documentationContext: {
		reviewedOn: '2026-10-19',
		purpose: 'API semantics only; official documentation does not prove connector behavior or mailbox state.',
		sources: [
			{ url: 'https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.messages/list', finding: 'Message-level label filtering and limits are distinct from thread membership; a message list returns identities before fetching details.' },
			{ url: 'https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.messages/get', finding: 'GET can retrieve one specified message; metadata and full-body formats are separate.' },
			{ url: 'https://developers.google.com/workspace/gmail/api/guides/filtering', finding: 'API search supports label filtering; Gmail UI and API searches have different behavior.' }
		]
	}
}, null, 2));
