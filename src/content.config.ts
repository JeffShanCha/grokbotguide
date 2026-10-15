import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { file } from 'astro/loaders';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';

/**
 * 文章额外的 frontmatter 字段。
 * - grade：内容分级。official = 整理自官方文档；community = 整理自社区分享（他人实测，本站未复现）；tested = 本站或投稿者亲测；opinion = 个人观点/评测
 * - needs_testing：true 时页面顶部提示「根据官方文档整理，尚待亲测」
 * - last_verified：最后一次有人按文中步骤验证的日期
 * - 角色卡 / 模板专用：role、apps、permissions、difficulty、share_url
 */
const docsExtension = z.object({
	grade: z.enum(['official', 'community', 'tested', 'opinion']).optional(),
	needs_testing: z.boolean().default(false),
	last_verified: z.coerce.date().optional(),
	author: z.string().optional(),
	sources: z.array(z.object({ title: z.string(), url: z.url() })).default([]),
	// 角色卡与模板
	role: z
		.enum(['sales', 'marketing', 'support', 'recruiting', 'finance', 'engineering', 'operations', 'assistant'])
		.optional(),
	apps: z.array(z.string()).default([]),
	permissions: z.array(z.string()).default([]),
	difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
	// 实战案例摘要格：风险（low 只读或只写进你自己的文档；medium 会改你账号里的数据；high 涉及钱或直接面对客户）和运行频率
	risk: z.enum(['low', 'medium', 'high']).optional(),
	cadence: z.enum(['once', 'daily', 'weekly', 'monthly', 'scheduled', 'event', 'on-demand']).optional(),
	kind: z.enum(['skill', 'routine', 'prompt', 'bot']).optional(),
	share_url: z.url().optional(),
});

/** 外部收录条目：只存标题、摘要、链接和署名，不存原文。 */
const resource = z.object({
	id: z.string(),
	url: z.url(),
	title: z.string(),
	author: z.string(),
	author_url: z.url().optional(),
	source: z.enum(['official', 'media', 'blog', 'video', 'x', 'github', 'wechat', 'forum', 'paper']),
	platform: z.string().optional(),
	categories: z.array(z.enum(['start', 'advanced', 'recipes', 'bots', 'templates', 'news', 'resources'])).default(['resources']),
	evidence: z.enum(['official', 'author-reported', 'research', 'editorial']).optional(),
	checked_at: z.coerce.date().optional(),
	verification_note_zh: z.string().optional(),
	verification_note_en: z.string().optional(),
	collection_batch: z.string().optional(),
	original_url: z.url().optional(),
	lang: z.enum(['zh', 'en']),
	published: z.coerce.date().optional(),
	added: z.coerce.date(),
	summary_zh: z.string(),
	summary_en: z.string(),
	tags: z.array(z.string()).default([]),
	apps: z.array(z.string().trim().min(1)).default([]),
	roles: z.array(z.string()).default([]),
	status: z.enum(['alive', 'broken']).default('alive'),
	archive: z.url().optional(),
	submitted_by: z.string().optional(),
	sponsored: z.boolean().default(false),
	ugc: z.boolean().default(false),
});

const contributor = z.object({
	id: z.string(), // GitHub 用户名
	name: z.string(),
	url: z.url().optional(),
	articles: z.number().default(0),
});

const changelogEntry = z.object({
	id: z.string(),
	date: z.coerce.date(),
	zh: z.string(),
	en: z.string(),
	url: z.url(),
});

export const collections = {
	docs: defineCollection({ loader: docsLoader(), schema: docsSchema({ extend: docsExtension }) }),
	// Starlight 界面文字的覆盖（按需添加键值，见 Starlight 文档「i18n」）
	i18n: defineCollection({ loader: i18nLoader(), schema: i18nSchema() }),
	resources: defineCollection({ loader: file('src/data/resources.yaml'), schema: resource }),
	contributors: defineCollection({ loader: file('src/data/contributors.yaml'), schema: contributor }),
	changelog: defineCollection({ loader: file('src/data/changelog.yaml'), schema: changelogEntry }),
};
