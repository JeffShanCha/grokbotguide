import { workflowGuides, guideHref, caseSlug } from './index.ts';
import { groups } from './cases/factory.ts';
import { gmailGuideUrl } from '../office-preview.ts';

const tools: Record<string,string> = {
	'gmail-inbox-triage':'Gmail · 邮件', 'google-calendar-meeting-brief':'Google Calendar · 日历', 'summarize-a-document':'文档 · 文件', 'slack-daily-standup':'Slack · 群聊', 'mobile-voice':'手机 · 语音 · 照片', 'slack-team-bot':'Slack · Team Bot · 指标',
	'typefully-repurpose':'Typefully · X · LinkedIn', 'sheets-audience-tracker':'Google Sheets · 粉丝 · 订阅', 'youtube-competitor-watch':'YouTube · 竞品', 'google-ads-scoreboard':'Google Ads · 广告', 'google-docs-positioning-brief':'Google Docs · 定位', 'x-tag-bot':'X · 提及 · 阅读', 'x-personal-portrait-site':'X · 画像 · 网站',
	'website-daily-check':'网站 · 巡检', 'cursor-cloud-agent':'Cursor · 编码代理', 'github-pr-watch':'GitHub · Notion · PR', 'x-bookmarks-demo':'X · 书签 · 原型', 'composio-many-apps':'Composio · Airtable · Slack',
	'zendesk-support-queue':'Zendesk · 客服', 'notion-personal-crm':'Notion · 人脉', 'call-transcripts-review':'通话 · 转写 · 复盘', 'stripe-refunds':'Stripe · 退款', 'gmail-drive-invoices':'Gmail · Drive · 票据', 'shopping-compare':'购物 · 比价', 'marketplace-watch':'二手 · 商品观察',
};
export const caseCatalog = [
	{ slug:'gmail-inbox-triage', group:'office', groupTitle:groups.office.title, title:'Gmail 收件箱整理：从分类到每日简报', lead:'8 封合成邮件，6 类标签与待确认，分类、回复草稿和每日简报逐步验收。', href:gmailGuideUrl, stages:5, prompts:7, files:5 },
	...workflowGuides.map(guide => ({ slug:caseSlug(guide), group:guide.id, groupTitle:guide.title, title:guide.guideTitle, lead:guide.guideLead, href:guideHref(guide), stages:guide.steps.length, prompts:guide.steps.length, files:guide.files.length })),
].map(entry => ({...entry,tools:tools[entry.slug]})).sort((a,b) => Number(groups[a.group as keyof typeof groups].number) - Number(groups[b.group as keyof typeof groups].number));
export const caseBySlug = new Map(caseCatalog.map(entry => [entry.slug,entry]));
