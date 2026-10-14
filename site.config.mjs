// 站点全局配置：上线前只需要改这里。
export const SITE = {
	url: 'https://grokbotguide.ai',
	repo: 'https://github.com/JeffShanCha/grokbotguide',
	x: 'https://x.com/shancha103',
	// 知识星球的加入链接
	zsxq: 'https://t.zsxq.com/REPLACE_ME',
	email: {
		hello: 'hello@grokbotguide.ai',
		sponsor: 'sponsor@grokbotguide.ai',
		takedown: 'takedown@grokbotguide.ai',
	},
	// Cloudflare Turnstile 的站点公钥（公开）。默认值是官方测试 key，总是通过。
	turnstileSiteKey: '1x00000000000000000000AA',
	// Google Analytics 4 的衡量 ID（G- 开头，在 GA4 → 管理 → 数据流 里查看）。留空则不加载 GA4。
	ga4MeasurementId: '',
};
