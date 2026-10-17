export const workflowsBase = '/zh/recipes/topics/';
export interface TopicFile { name: string; title: string; description: string; mime: string; content: string; inline?: boolean }
export interface TopicStep { id: string; title: string; paragraphs: string[]; prompt: string; expected: string; check: string; note?: string }
export interface TopicQuickCase { id: string; title: string; apps: string; summary: string; input: string; output: string; prompt: string; check: string; original: string; guide?: boolean }
export interface WorkflowGuide {
	id: string; number: string; title: string; eyebrow: string; summary: string;
	guideSlug: string; guideTitle: string; guideLead: string; scope: string;
	caseId?: string; original?: string; verificationNote?: string;
	prepare: Array<{ title: string; items: string[] }>;
	lab: { title: string; caption: string; input: Array<{ title: string; body: string }>; columns: string[]; rows: string[][]; cards: Array<{ title: string; body: string; badge: string }>; report: string };
	steps: TopicStep[]; checks: string[];
	problems: Array<[string, string]>; sources: Array<{ title: string; url: string; note: string }>;
	files: TopicFile[];
}
export interface WorkflowTopic extends WorkflowGuide {
	deskTitle: string; deskRows: Array<{ title: string; detail: string; tag: string }>;
	flow: string[]; deliverables: Array<{ title: string; description: string; format: string }>;
	quickCases: TopicQuickCase[];
}
export const commonSources = [
	{ title: 'Grok Bot：应用与共享电脑', url: 'https://docs.x.ai/grok-bot/computer-and-apps', note: '核对连接方式、可见范围与账号内共享状态。' },
	{ title: 'Grok Bot：Skills 与 Routines', url: 'https://docs.x.ai/grok-bot/skills-routines-and-automations', note: '先验证一次手动任务，再保存与安排重复运行。' },
];
export const jsonFile = (name: string, title: string, description: string, data: unknown): TopicFile => ({ name, title, description, mime: 'application/json; charset=utf-8', content: JSON.stringify(data, null, 2) + '\n' });
export const textFile = (name: string, title: string, description: string, content: string): TopicFile => ({ name, title, description, content, mime: name.endsWith('.md') ? 'text/markdown; charset=utf-8' : 'text/plain; charset=utf-8' });
export const csv = (headers: string[], rows: string[][]) => '\uFEFF' + [headers, ...rows].map(row => row.map(cell => {
	const safe = /^[=+@\-\t\r]/.test(cell) ? `'${cell}` : cell;
	return `"${safe.replaceAll('"', '""')}"`;
}).join(',')).join('\r\n') + '\r\n';
export function completeTopic(topic: WorkflowTopic): WorkflowTopic {
	return { ...topic, files: [...topic.files, textFile('practice-prompts.txt', '全部分阶段提示词', `${topic.steps.length} 段指令，使用前填写自己的范围`, topic.steps.map((step, i) => `## ${i + 1}. ${step.title}\n\n${step.prompt}\n\n验收：${step.check}`).join('\n\n'))] };
}
const legacySlugs: Record<string, string> = { 'content-growth': 'typefully-repurpose', engineering: 'website-daily-check', 'customer-support': 'zendesk-support-queue', purchasing: 'gmail-drive-invoices' };
export const caseSlug = (topic: Pick<WorkflowGuide, 'id' | 'guideSlug' | 'caseId'>) => topic.caseId || legacySlugs[topic.id] || topic.guideSlug;
export const topicHref = (topic: Pick<WorkflowGuide, 'id'>) => `${workflowsBase}${topic.id}/`;
export const guideHref = (topic: Pick<WorkflowGuide, 'id' | 'guideSlug' | 'caseId'>) => `/zh/recipes/${caseSlug(topic)}/`;
export const fileHref = (topic: WorkflowGuide, name: string) => `${guideHref(topic)}files/${name}`;
