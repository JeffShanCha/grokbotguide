import { commonSources, csv, jsonFile, textFile, type WorkflowGuide, type TopicFile } from '../types.ts';
export type GroupId = 'office' | 'content-growth' | 'engineering' | 'customer-support' | 'purchasing';
export const groups: Record<GroupId, { number: string; title: string }> = {
	office: { number: '01', title: '办公与信息整理' },
	'content-growth': { number: '02', title: '内容创作与增长' },
	engineering: { number: '03', title: '开发与网站维护' },
	'customer-support': { number: '04', title: '客户经营与客服' },
	purchasing: { number: '05', title: '生活采购与票据' },
};
// Each stage carries its own explanation, executable instruction and acceptance evidence.
export type Stage = [title: string, explanation: string, prompt: string, expected: string, check: string];
export interface CaseSpec {
	slug: string; group: GroupId; title: string; lead: string; scope: string;
	input: unknown; rules: string; blocks?: Array<{ title: string; body: string }>;
	prepare: [string[], string[]]; caption: string;
	columns: string[]; rows: string[][]; cards: Array<{ title: string; body: string; badge: string }>; report: string;
	stages: [Stage, Stage, Stage, Stage, Stage, Stage];
	problems: Array<[string, string]>;
	sources: Array<{ title: string; url: string; note: string }>;
	artifacts?: TopicFile[]; verificationNote?: string;
}
export function buildCase(s: CaseSpec): WorkflowGuide {
	const steps = s.stages.map(([title, explanation, prompt, expected, check], i) => ({ id: `stage-${i + 1}`, title, paragraphs: explanation.split('\n\n'), prompt, expected, check }));
	const input = { synthetic: true, case: s.slug, data: s.input };
	return {
		id: s.group, ...groups[s.group], caseId: s.slug, original: `/zh/recipes/${s.slug}/`,
		eyebrow: '完整教程', summary: s.lead, guideSlug: s.slug, guideTitle: s.title, guideLead: s.lead, scope: s.scope, verificationNote: s.verificationNote,
		prepare: [{ title: '先用材料练习', items: s.prepare[0] }, { title: '接入真实环境时', items: s.prepare[1] }],
		lab: { title: `${s.title.split('：')[0]}练习台`, caption: s.caption, input: [...(s.blocks || [{ title: '原始合成材料', body: JSON.stringify(input, null, 2) }]), { title: '本次处理规则', body: s.rules }], columns: s.columns, rows: s.rows, cards: s.cards, report: s.report },
		steps, checks: steps.map(step => step.check), problems: s.problems, sources: [...s.sources, ...commonSources],
		files: [
			jsonFile('source-data.json', '原始练习材料', '只有输入，第一次不交参考答案', input),
			textFile('workflow-rules.md', '处理规则与范围', '口径、例外和交付约定', `# ${s.title}\n\n${s.rules}\n\n${s.scope}`),
			{ name: 'expected-results.csv', title: '逐项参考答案', description: '处理完输入后逐行对照', mime: 'text/csv; charset=utf-8', content: csv(s.columns, s.rows) },
			textFile('reference-report.md', '完整交付报告', '结果、依据和待补信息', s.report),
			textFile('practice-prompts.txt', '全部分阶段提示词', '6 段指令与对应检查点', steps.map((step, i) => `## ${i + 1}. ${step.title}\n\n${step.prompt}\n\n应拿到：${step.expected}\n检查：${step.check}`).join('\n\n')),
			...(s.artifacts || []),
		],
	};
}
