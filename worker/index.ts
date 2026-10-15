/**
 * GrokBotGuide Worker
 *
 * 静态页面全部由 Cloudflare 静态资源直接返回（不经过这里、不计 Worker 调用）。
 * 只有 wrangler.jsonc 里 run_worker_first 列出的路径会进入这个 Worker：
 *   /            根路径语言路由：Cookie > 地区 > 浏览器语言 > 英文
 *   /api/submit  投稿表单 → 校验 Turnstile → 创建 GitHub Issue → 邮件通知
 *   /api/copy    模板复制计数 +1（D1）
 *   /api/copies  批量读取模板复制次数（D1）
 *   /api/newsletter    GET：订阅功能是否可用（没绑定 D1 时前端隐藏订阅框）
 *   /api/subscribe     POST：邮件订阅，存进 D1 并邮件通知维护者
 *   /api/unsubscribe   GET：退订链接（?token=…）
 *
 * D1 和邮件绑定都是可选的：没配置时站点照常运行，计数接口返回空、投稿只建 Issue 不发邮件。
 */

export interface Env {
	ASSETS: Fetcher;
	/** 可选：没绑定 D1 时，复制计数功能自动关闭 */
	DB?: D1Database;
	NOTIFY?: SendEmail;
	/** GitHub 仓库，形如 owner/repo（wrangler.jsonc 的 vars） */
	GITHUB_REPO: string;
	/** 通知邮件的收件地址（必须是 Email Routing 里已验证的目标地址） */
	NOTIFY_TO: string;
	/** 通知邮件的发件地址（必须在启用了 Email Routing 的域名下） */
	NOTIFY_FROM: string;
	/** Secret：有 issues:write 权限的 GitHub fine-grained token */
	GITHUB_TOKEN?: string;
	/** Secret：Turnstile 服务端密钥 */
	TURNSTILE_SECRET?: string;
}

const ZH_REGIONS = new Set(['CN', 'HK', 'MO', 'TW']);
const SUBMIT_TYPES = new Set(['article', 'bot', 'template', 'resource', 'fix']);
const ID_RE = /^[a-z0-9][a-z0-9-]{0,79}$/;

export default {
	async fetch(req: Request, env: Env): Promise<Response> {
		const url = new URL(req.url);

		if (url.pathname === '/') return routeLanguage(req, url);
		if (url.pathname === '/api/submit' && req.method === 'POST') return handleSubmit(req, env);
		if (url.pathname === '/api/copy' && req.method === 'POST') return handleCopy(req, env);
		if (url.pathname === '/api/copies' && req.method === 'GET') return handleCopies(url, env);
		if (url.pathname === '/api/newsletter' && req.method === 'GET') return json({ enabled: Boolean(env.DB) }, 200, { 'cache-control': 'public, max-age=300' });
		if (url.pathname === '/api/subscribe' && req.method === 'POST') return handleSubscribe(req, env);
		if (url.pathname === '/api/unsubscribe' && req.method === 'GET') return handleUnsubscribe(url, env);
		if (url.pathname.startsWith('/api/')) return json({ error: 'not_found' }, 404);

		return env.ASSETS.fetch(req);
	},
} satisfies ExportedHandler<Env>;

/* ---------------- 语言路由 ---------------- */

export function pickLanguage(cookie: string, country: string, acceptLanguage: string): 'zh' | 'en' {
	const saved = cookie.match(/(?:^|;\s*)lang=(zh|en)(?:;|$)/)?.[1] as 'zh' | 'en' | undefined;
	if (saved) return saved;
	if (ZH_REGIONS.has(country.toUpperCase())) return 'zh';
	if (acceptLanguage.trim().toLowerCase().startsWith('zh')) return 'zh';
	return 'en';
}

function routeLanguage(req: Request, url: URL): Response {
	const lang = pickLanguage(
		req.headers.get('cookie') ?? '',
		String((req as Request & { cf?: { country?: string } }).cf?.country ?? ''),
		req.headers.get('accept-language') ?? ''
	);
	// 302 而不是 301，避免浏览器和搜索引擎永久缓存某一种语言
	return new Response(null, {
		status: 302,
		headers: {
			location: `${url.origin}/${lang}/${url.search}`,
			'cache-control': 'private, no-store',
			vary: 'cookie, accept-language',
		},
	});
}

/* ---------------- 投稿 ---------------- */

interface Submission {
	type?: string;
	title?: string;
	url?: string;
	body?: string;
	name?: string;
	contact?: string;
	lang?: string;
	agree?: string;
	'cf-turnstile-response'?: string;
}

async function handleSubmit(req: Request, env: Env): Promise<Response> {
	let data: Submission;
	try {
		data = await req.json();
	} catch {
		return json({ error: 'invalid_json' }, 400);
	}

	const type = String(data.type ?? '');
	const title = clean(data.title, 120);
	const link = clean(data.url, 500);
	const body = clean(data.body, 20000);
	const name = clean(data.name, 60);
	const contact = clean(data.contact, 120);
	const lang = data.lang === 'en' ? 'en' : 'zh';

	if (!SUBMIT_TYPES.has(type)) return json({ error: 'invalid_type' }, 400);
	if (!title) return json({ error: 'title_required' }, 400);
	if (!data.agree) return json({ error: 'agreement_required' }, 400);
	if ((type === 'resource' || type === 'fix') && !/^https?:\/\//.test(link)) {
		return json({ error: 'url_required' }, 400);
	}

	const captcha = await verifyTurnstile(env, data['cf-turnstile-response'], req.headers.get('cf-connecting-ip'));
	if (captcha === 'error') return json({ error: 'captcha_unavailable' }, 503);
	if (captcha === 'fail') return json({ error: 'captcha_failed' }, 403);

	if (!env.GITHUB_TOKEN) return json({ error: 'not_configured' }, 503);

	// Issue 公开可见，不写入联系方式；联系方式只出现在发给维护者的邮件里
	const issueBody = [
		`**类型 / Type**: ${type}`,
		`**语言 / Language**: ${lang}`,
		name ? `**署名 / Credit**: ${name}` : '',
		link ? `**链接 / Link**: ${link}` : '',
		'',
		body || '_（无正文 / no body）_',
		'',
		'---',
		'_通过 grokbotguide.ai 投稿表单提交 / Submitted via the grokbotguide.ai form_',
	]
		.filter((l) => l !== '')
		.join('\n');

	let gh: Response;
	try {
		gh = await fetch(`https://api.github.com/repos/${env.GITHUB_REPO}/issues`, {
			method: 'POST',
			headers: {
				authorization: `Bearer ${env.GITHUB_TOKEN}`,
				accept: 'application/vnd.github+json',
				'content-type': 'application/json',
				'user-agent': 'grokbotguide-worker',
				'x-github-api-version': '2022-11-28',
			},
			body: JSON.stringify({ title: `[${type}] ${title}`, body: issueBody, labels: ['submission', type] }),
		});
	} catch (err) {
		console.error('github_unreachable', err);
		return json({ error: 'github_unreachable' }, 502);
	}
	if (!gh.ok) {
		console.error('github_issue_failed', gh.status, await gh.text());
		return json({ error: 'github_failed' }, 502);
	}
	const issue = (await gh.json()) as { html_url: string; number: number };

	if (env.NOTIFY) {
		try {
			await env.NOTIFY.send({
				from: { name: 'GrokBotGuide', email: env.NOTIFY_FROM },
				to: env.NOTIFY_TO,
				replyTo: contact || undefined,
				subject: `[GrokBotGuide 投稿 #${issue.number}] ${title}`,
				text: [
					`新投稿：${issue.html_url}`,
					'',
					`类型：${type}`,
					`语言：${lang}`,
					`署名：${name || '（未填）'}`,
					`联系方式：${contact || '（未填）'}`,
					link ? `链接：${link}` : '',
					'',
					body,
				].join('\n'),
			});
		} catch (err) {
			// 邮件失败不影响投稿本身
			console.error('notify_failed', err);
		}
	}

	return json({ ok: true, issueUrl: issue.html_url });
}

async function verifyTurnstile(
	env: Env,
	token: string | undefined,
	ip: string | null
): Promise<'ok' | 'fail' | 'error'> {
	if (!env.TURNSTILE_SECRET) return 'error';
	if (!token) return 'fail';
	const form = new FormData();
	form.append('secret', env.TURNSTILE_SECRET);
	form.append('response', token);
	if (ip) form.append('remoteip', ip);
	try {
		const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: form });
		if (!res.ok) return 'error';
		const result = (await res.json()) as { success: boolean };
		return result.success === true ? 'ok' : 'fail';
	} catch (err) {
		console.error('turnstile_unreachable', err);
		return 'error';
	}
}

/* ---------------- 模板复制计数 ---------------- */

// 首次使用时自动建表（和 worker/migrations/0001 相同），不需要手动跑迁移
let schemaReady: Promise<unknown> | undefined;
function ensureSchema(db: D1Database) {
	schemaReady ??= db
		.prepare(
			`CREATE TABLE IF NOT EXISTS template_copies (
				id TEXT PRIMARY KEY,
				count INTEGER NOT NULL DEFAULT 0,
				updated_at INTEGER NOT NULL DEFAULT (unixepoch())
			)`
		)
		.run()
		.catch((err) => {
			schemaReady = undefined;
			throw err;
		});
	return schemaReady;
}

async function handleCopy(req: Request, env: Env): Promise<Response> {
	if (!env.DB) return json({ error: 'counter_disabled' }, 503);
	let id = '';
	try {
		id = String(((await req.json()) as { id?: string }).id ?? '');
	} catch {
		return json({ error: 'invalid_json' }, 400);
	}
	if (!ID_RE.test(id)) return json({ error: 'invalid_id' }, 400);

	await ensureSchema(env.DB);
	const row = await env.DB.prepare(
		`INSERT INTO template_copies (id, count, updated_at) VALUES (?1, 1, unixepoch())
		 ON CONFLICT(id) DO UPDATE SET count = count + 1, updated_at = unixepoch()
		 RETURNING count`
	)
		.bind(id)
		.first<{ count: number }>();

	return json({ id, count: row?.count ?? 1 });
}

async function handleCopies(url: URL, env: Env): Promise<Response> {
	if (!env.DB) return json({});
	const ids = (url.searchParams.get('ids') ?? '')
		.split(',')
		.map((s) => s.trim())
		.filter((s) => ID_RE.test(s))
		.slice(0, 50);
	if (ids.length === 0) return json({});

	await ensureSchema(env.DB);
	const placeholders = ids.map((_, i) => `?${i + 1}`).join(',');
	const { results } = await env.DB.prepare(`SELECT id, count FROM template_copies WHERE id IN (${placeholders})`)
		.bind(...ids)
		.all<{ id: string; count: number }>();

	const counts: Record<string, number> = {};
	for (const r of results) counts[r.id] = r.count;
	return json(counts, 200, { 'cache-control': 'public, max-age=60' });
}

/* ---------------- 邮件订阅 ---------------- */

const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,190}\.[a-z]{2,24}$/i;
let subscribersReady: Promise<unknown> | undefined;
function ensureSubscribers(db: D1Database) {
	// 和 worker/migrations/0002 相同
	subscribersReady ??= db
		.prepare(
			`CREATE TABLE IF NOT EXISTS subscribers (
				email TEXT PRIMARY KEY,
				lang TEXT NOT NULL DEFAULT 'en',
				source TEXT,
				token TEXT NOT NULL,
				status TEXT NOT NULL DEFAULT 'active',
				created_at INTEGER NOT NULL DEFAULT (unixepoch()),
				updated_at INTEGER NOT NULL DEFAULT (unixepoch())
			)`
		)
		.run()
		.catch((err) => {
			subscribersReady = undefined;
			throw err;
		});
	return subscribersReady;
}

async function handleSubscribe(req: Request, env: Env): Promise<Response> {
	if (!env.DB) return json({ error: 'not_configured' }, 503);
	let data: { email?: string; lang?: string; source?: string; website?: string };
	try {
		data = await req.json();
	} catch {
		return json({ error: 'invalid_json' }, 400);
	}
	// 蜜罐字段：真人看不到这个输入框，机器人会填
	if (data.website) return json({ ok: true });
	const email = clean(data.email, 254).toLowerCase();
	if (!EMAIL_RE.test(email)) return json({ error: 'invalid_email' }, 400);
	const lang = data.lang === 'zh' ? 'zh' : 'en';
	const source = clean(data.source, 120);

	await ensureSubscribers(env.DB);
	const token = crypto.randomUUID();
	const row = await env.DB.prepare(
		`INSERT INTO subscribers (email, lang, source, token) VALUES (?1, ?2, ?3, ?4)
		 ON CONFLICT(email) DO UPDATE SET status = 'active', updated_at = unixepoch()
		 RETURNING created_at = updated_at AS is_new`
	)
		.bind(email, lang, source, token)
		.first<{ is_new: number }>();

	if (env.NOTIFY && row?.is_new) {
		try {
			await env.NOTIFY.send({
				from: { name: 'GrokBotGuide', email: env.NOTIFY_FROM },
				to: env.NOTIFY_TO,
				subject: `[GrokBotGuide] 新订阅：${email}`,
				text: `新的邮件订阅\n\n邮箱：${email}\n语言：${lang}\n来源页面：${source || '（未知）'}`,
			});
		} catch (err) {
			console.error('notify_failed', err);
		}
	}
	return json({ ok: true });
}

async function handleUnsubscribe(url: URL, env: Env): Promise<Response> {
	const token = url.searchParams.get('token') ?? '';
	let ok = false;
	if (env.DB && /^[0-9a-f-]{36}$/.test(token)) {
		await ensureSubscribers(env.DB);
		const res = await env.DB.prepare(`UPDATE subscribers SET status = 'unsubscribed', updated_at = unixepoch() WHERE token = ?1`)
			.bind(token)
			.run();
		ok = (res.meta.changes ?? 0) > 0;
	}
	const msg = ok
		? 'You have been unsubscribed from GrokBotGuide emails. / 已退订 GrokBotGuide 邮件。'
		: 'This unsubscribe link is invalid or has already been used. / 退订链接无效或已使用。';
	return new Response(
		`<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>GrokBotGuide</title><body style="font:16px system-ui;max-width:32rem;margin:4rem auto;padding:0 1rem"><p>${msg}</p><p><a href="/">grokbotguide.ai</a></p></body>`,
		{ status: ok ? 200 : 404, headers: { 'content-type': 'text/html; charset=utf-8', 'x-robots-tag': 'noindex' } }
	);
}

/* ---------------- 工具 ---------------- */

function clean(v: unknown, max: number): string {
	return String(v ?? '')
		.replace(/\r\n/g, '\n')
		.trim()
		.slice(0, max);
}

function json(data: unknown, status = 200, headers: Record<string, string> = {}): Response {
	return new Response(JSON.stringify(data), {
		status,
		headers: { 'content-type': 'application/json; charset=utf-8', ...headers },
	});
}
