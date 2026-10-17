import { SITE } from './site.config.mjs';

export const LLMS = {
	projectName: 'GrokBotGuide',
	description: {
		en: 'GrokBotGuide is a community playbook for Grok Bot, with English and Chinese guides to setup, Skills and Routines, automation recipes, role cards and reusable templates.',
		zh: 'GrokBotGuide 是社区共建的 Grok Bot 实战手册，提供中英文入门教程、Skills 与 Routines、自动化案例、角色卡和可复用模板。',
	},
	details: {
		en: [
			'- GrokBotGuide is an independent, unofficial community project, with no affiliation with or authorization from xAI, SpaceXAI or Cursor.',
			'- Consult each article’s original sources, verification status and last checked date. Community reports are not equivalent to tests reproduced by this site; current official documentation takes precedence for changing product details.',
			`- Our articles are licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). When quoting or adapting, credit the author, link to the original article and license, indicate changes, and share adaptations under the same license. External works remain subject to their authors’ rights; see our [content license](${SITE.repo}/blob/main/CONTENT_LICENSE.md).`,
			`- Chinese edition: [GrokBotGuide 中文版](${SITE.url}/zh/), with a [Chinese llms.txt index](${SITE.url}/zh/llms.txt).`,
		].join('\n'),
		zh: [
			'- GrokBotGuide 是独立、社区共建的非官方项目，与 xAI、SpaceXAI、Cursor 没有隶属或授权关系。',
			'- 请查看每篇文章的原始来源、核验状态和最后核对日期。社区作者分享不等同于本站亲测；产品变化信息以当前官方文档为准。',
			`- 本站文章采用 [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/deed.zh-hans)。引用或改编请署名作者、链接原文与许可协议、注明修改，并以相同协议发布改编作品；外部收录作品的权利仍归原作者，详见[内容许可](${SITE.repo}/blob/main/CONTENT_LICENSE.md)。`,
			`- 中文版地址：[GrokBotGuide 中文版](${SITE.url}/zh/)；本文件为[中文 llms.txt 索引](${SITE.url}/zh/llms.txt)。`,
		].join('\n'),
	},
};

// 同时用于插件的分组/正文排序，以及中文版索引，避免两套顺序发生漂移。
export const LLMS_SECTIONS = [
	{ paths: ['start'], en: 'Get started', zh: '快速上手' },
	{ paths: ['answers'], en: 'Common questions', zh: '常见问题' },
	{ paths: ['advanced'], en: 'Advanced', zh: '进阶' },
	{ paths: ['recipes'], en: 'Recipes', zh: '实战案例' },
	{ paths: ['bots', 'templates'], en: 'Bot cards and templates', zh: '角色卡与模板' },
];

export const LLMS_EXCLUDED = ['community/sponsor', 'community/submit'];
export const LLMS_PAGE_SEPARATOR = '\n\n<!-- grokbotguide:page -->\n\n';

export const isLlmsExcluded = (id) => LLMS_EXCLUDED.includes(id.replace(/^(en|zh)\//, '').replace(/\/$/, ''));
