// Independent public reads only. These checks never certify a Grok Bot workflow.
import { createHash } from 'node:crypto';
import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { workflowGuides, caseSlug } from '../src/data/workflow-topics/index.ts';
import { officialSources } from '../src/data/office-preview.ts';

const root = fileURLToPath(new URL('../', import.meta.url));
const slugs = ['summarize-a-document', 'gmail-inbox-triage', 'website-daily-check', 'google-calendar-meeting-brief', 'slack-daily-standup', 'github-pr-watch', 'stripe-refunds', 'zendesk-support-queue', 'shopping-compare'];
const cases = slugs.map(slug => ({ slug, sources: workflowGuides.find(guide => caseSlug(guide) === slug)?.sources ?? officialSources }));
const supplemental = ['https://cursor.com/docs/grok-bot/get-started', 'https://cursor.com/help/grok-bot/connect-plugins', 'https://cursor.com/help/grok-bot/routines', 'https://cursor.com/docs/grok-bot/security', 'https://docs.slack.dev/reference/methods/conversations.replies/'];
const urls = [...new Set([...cases.flatMap(item => item.sources.map(source => source.url)), ...supplemental])];
const bodies = new Map();
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
async function read(url) {
	const startedAt = new Date().toISOString();
	try {
		const response = await fetch(url, { signal: AbortSignal.timeout(20000), headers: { 'User-Agent': 'GrokBotGuide-P0-Verification/1.0', Accept: 'text/html,application/json,text/plain,*/*' } });
		const bytes = Buffer.from(await response.arrayBuffer());
		const body = bytes.toString('utf8'); bodies.set(url, body);
		return { url, startedAt, finishedAt: new Date().toISOString(), status: response.status, finalUrl: response.url, bytes: bytes.length, sha256: hash(bytes), contentType: response.headers.get('content-type'), title: body.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.replace(/\s+/g, ' ').trim() ?? null };
	} catch (error) { return { url, startedAt, finishedAt: new Date().toISOString(), status: null, error: error.name + ': ' + error.message }; }
}
const retrievals = [];
for (let i = 0; i < urls.length; i += 4) retrievals.push(...await Promise.all(urls.slice(i, i + 4).map(read)));
const pinnedReadme = 'https://raw.githubusercontent.com/JeffShanCha/grokbotguide/920a60eb055bac5845d88dded694c9eb684f554f/README.md';
const readme = await read(pinnedReadme);
readme.headings = (bodies.get(pinnedReadme) || '').split('\n').filter(line => line.startsWith('## ')).map(line => line.slice(3));
const website = await Promise.all(['https://grokbotguide.ai/zh/', 'https://grokbotguide.ai/zh/recipes/gmail-inbox-triage/', 'https://grokbotguide.ai/zh/p0-audit-not-found-20261018/'].map(read));
for (const item of website) {
	const body = bodies.get(item.url) || '';
	item.negativeControl = item.url.includes('p0-audit-not-found-20261018');
	if (item.url.includes('gmail-inbox-triage')) item.boundaries = { anchor: /id="automation-boundaries"/.test(body), headings: ['可自动执行', '需要确认', '失败后接管'].map(text => ({ text, present: body.includes(text) })) };
}
const prUrl = 'https://api.github.com/repos/JeffShanCha/grokbotguide/pulls/3';
const prRead = await read(prUrl);
const prBody = bodies.get(prUrl);
let pr = { retrieval: prRead };
if (prRead.status === 200) {
	const data = JSON.parse(prBody);
	const base = 'https://api.github.com/repos/JeffShanCha/grokbotguide';
	const endpoints = [`${base}/commits/${data.head.sha}/check-runs`, `${base}/commits/${data.head.sha}/status`, `${base}/pulls/3/reviews`];
	const requests = await Promise.all(endpoints.map(read));
	const parsed = url => { try { return JSON.parse(bodies.get(url)); } catch { return null; } };
	pr = { retrieval: prRead, number: data.number, state: data.state, draft: data.draft, headSha: data.head.sha, mergeCommitSha: data.merge_commit_sha, merged: data.merged, mergedAt: data.merged_at, mergeable: data.mergeable, requests, checks: parsed(endpoints[0])?.check_runs?.map(check => ({ name: check.name, headSha: check.head_sha, status: check.status, conclusion: check.conclusion })), combinedStatus: parsed(endpoints[1])?.state, reviews: parsed(endpoints[2])?.map(review => ({ id: review.id, state: review.state, commitId: review.commit_id })) };
}
const report = { schemaVersion: 1, checkedAt: new Date().toISOString(), dateTimezone: 'Asia/Shanghai', executor: 'Codex', kind: 'independent_public_reads', limitation: 'HTTP availability, source hashes and public API observations only. Not a Grok Bot execution, not a login/write/Routine test, and not a substitute for semantic source review.', cases: cases.map(item => ({ slug: item.slug, sourceUrls: item.sources.map(source => source.url) })), retrievals, readme, website, pr };
const observedDate = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
const directory = root + 'public/verification/p0-' + observedDate;
mkdirSync(directory, { recursive: true });
writeFileSync(directory + '/codex-public-checks.json', JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify({ sources: retrievals.length, accessible: retrievals.filter(item => item.status === 200).length, failed: retrievals.filter(item => item.status !== 200).map(item => ({ url: item.url, status: item.status, error: item.error })), readme: { status: readme.status, bytes: readme.bytes, sha256: readme.sha256, headings: readme.headings.length }, website: website.map(item => ({ url: item.url, status: item.status })), pr: { status: pr.retrieval.status, state: pr.state, merged: pr.merged, headSha: pr.headSha } }, null, 2));
