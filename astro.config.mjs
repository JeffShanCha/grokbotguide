// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';

import { SITE } from './site.config.mjs';
const REPO = SITE.repo;

// 欧洲经济区、英国、瑞士：默认不写 GA4 Cookie（只发无 Cookie 的匿名请求），其他地区正常统计。
// 广告相关的存储全部关闭（本站不投放 Google 广告）。
const CONSENT_DENIED_REGIONS = [
	'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU',
	'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'IS', 'LI', 'NO', 'GB', 'CH',
];
const ga4 = SITE.ga4MeasurementId.trim();
if (ga4 && !/^G-[A-Z0-9]+$/.test(ga4)) {
	throw new Error('site.config.mjs: ga4MeasurementId 必须是 G- 开头的 GA4 衡量 ID。');
}
/** @type {import('@astrojs/starlight/types').StarlightUserConfig['head']} */
const ga4Head = ga4
	? [
			{
				tag: 'script',
				content: [
					'window.dataLayer = window.dataLayer || [];',
					'function gtag(){dataLayer.push(arguments);}',
					"gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'granted'});",
					`gtag('consent','default',{analytics_storage:'denied',region:${JSON.stringify(CONSENT_DENIED_REGIONS)}});`,
					"gtag('js', new Date());",
					`gtag('config','${ga4}',{allow_google_signals:false});`,
				].join(''),
			},
			{ tag: 'script', attrs: { async: true, src: `https://www.googletagmanager.com/gtag/js?id=${ga4}` } },
		]
	: [];

export default defineConfig({
	site: SITE.url,
	trailingSlash: 'always',
	integrations: [
		starlight({
			title: 'GrokBotGuide',
			description: 'The community playbook for Grok Bot · 社区共建的 Grok Bot 实战手册',
			logo: { src: './src/assets/logo.svg', alt: 'GrokBotGuide' },
			favicon: '/favicon.svg',
			// 默认语言设为 en：hreflang 的 x-default 指向英文版（面向海外搜索）。中英两套内容都完整维护。
			defaultLocale: 'en',
			locales: {
				zh: { label: '简体中文', lang: 'zh-CN' },
				en: { label: 'English', lang: 'en' },
			},
			social: [
				{ icon: 'github', label: 'GitHub', href: REPO },
				{ icon: 'x.com', label: 'X', href: SITE.x },
			],
			editLink: { baseUrl: `${REPO}/edit/main/` },
			lastUpdated: true,
			credits: false,
			disable404Route: true,
			customCss: ['./src/styles/custom.css'],
			components: {
				LanguageSelect: './src/components/overrides/LanguageSelect.astro',
				PageTitle: './src/components/overrides/PageTitle.astro',
				Footer: './src/components/overrides/Footer.astro',
			},
			head: [
				{ tag: 'meta', attrs: { property: 'og:image', content: 'https://grokbotguide.ai/og-default.png' } },
				{ tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
				// GSC 的 HTML 验证适用于 URL 前缀资源；网域资源需在 DNS 添加 TXT 记录。
				...(SITE.googleSiteVerification.trim()
					? [{ tag: 'meta', attrs: { name: 'google-site-verification', content: SITE.googleSiteVerification.trim() } }]
					: []),
				// Cloudflare Web Analytics：在 Cloudflare 后台创建站点后，把 token 填进来再取消注释
				// { tag: 'script', attrs: { defer: true, src: 'https://static.cloudflareinsights.com/beacon.min.js', 'data-cf-beacon': '{"token": "YOUR_TOKEN"}' } },
				// Google Analytics 4：在 site.config.mjs 填 ga4MeasurementId 后自动加载
				...ga4Head,
			],
			sidebar: [
				{
					label: '快速上手',
					translations: { en: 'Get started' },
					items: [{ autogenerate: { directory: 'start' } }],
				},
				{
					label: '进阶教程',
					translations: { en: 'Advanced' },
					items: [{ autogenerate: { directory: 'advanced' } }],
				},
				{
					label: '实战案例',
					translations: { en: 'Recipes' },
					items: [{ autogenerate: { directory: 'recipes' } }],
				},
				{
					label: '角色库',
					translations: { en: 'Bot library' },
					items: [{ autogenerate: { directory: 'bots' } }],
				},
				{
					label: '模板库',
					translations: { en: 'Templates' },
					items: [{ autogenerate: { directory: 'templates' } }],
				},
				{
					label: '更新与资源',
					translations: { en: 'News & resources' },
					items: [
						{ label: '更新日志', translations: { en: 'Changelog' }, slug: 'news/changelog' },
						{ label: '资源导航', translations: { en: 'Resources' }, slug: 'resources' },
					],
				},
				{
					label: '社区',
					translations: { en: 'Community' },
					items: [{ autogenerate: { directory: 'community' } }],
				},
			],
		}),
		// 显式配置 sitemap：排除只负责跳转的根路径 /
		sitemap({
			filter: (page) => page !== `${SITE.url}/`,
			i18n: { defaultLocale: 'en', locales: { zh: 'zh-CN', en: 'en' } },
		}),
	],
});
