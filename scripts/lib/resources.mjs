import { createHash } from 'node:crypto';

export const CATEGORIES = ['start', 'advanced', 'recipes', 'bots', 'templates', 'news', 'resources'];
export const SOURCES = ['official', 'media', 'blog', 'video', 'x', 'github', 'wechat', 'forum', 'paper'];
export const EVIDENCE = ['official', 'author-reported', 'research', 'editorial'];
export const chinaDate = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Shanghai' }).format(new Date());

// Preserve case-sensitive paths/IDs and meaningful query parameters.
export function normalizeUrl(value) {
	const u = new URL(value);
	if (!['http:', 'https:'].includes(u.protocol) || u.username || u.password) throw new Error('Only public HTTP(S) URLs are allowed');
	if (!u.hostname.includes('.') || /^(localhost|127\.|10\.|192\.168\.|169\.254\.|172\.(1[6-9]|2\d|3[01])\.)/i.test(u.hostname) || u.hostname.includes(':')) throw new Error('Local URLs are not allowed');
	u.protocol = 'https:';
	u.hash = '';
	u.hostname = u.hostname.replace(/^www\./, '');
	if (['twitter.com', 'mobile.twitter.com', 'mobile.x.com'].includes(u.hostname)) u.hostname = 'x.com';
	if (['m.youtube.com', 'youtube.com', 'youtu.be'].includes(u.hostname)) {
		const id = u.hostname === 'youtu.be' ? u.pathname.slice(1) : u.searchParams.get('v') || u.pathname.match(/^\/(?:shorts|embed)\/([^/]+)/)?.[1];
		if (id) return `https://youtube.com/watch?v=${encodeURIComponent(id)}`;
	}
	if (['old.reddit.com', 'new.reddit.com', 'm.reddit.com'].includes(u.hostname)) u.hostname = 'reddit.com';
	if (u.hostname === 'github.com') {
		const parts = u.pathname.replace(/\.git\/?$/, '').split('/');
		u.pathname = parts.map((p, i) => i <= 2 ? p.toLowerCase() : p).join('/');
	}
	for (const key of [...u.searchParams.keys()]) {
		if (/^utm_|^(ref|ref_src|fbclid|gclid|si|spm_id_from|vd_source)$/i.test(key) || (u.hostname === 'x.com' && ['s', 't'].includes(key)) || (u.hostname === 'linux.do' && key === 'tl')) u.searchParams.delete(key);
	}
	u.searchParams.sort();
	u.pathname = u.pathname.replace(/\/+$/, '') || '/';
	return u.toString().replace(/\/$/, '');
}

export function identity(value) {
	const url = normalizeUrl(value);
	const u = new URL(url);
	const post = u.hostname === 'x.com' && u.pathname.match(/\/status\/(\d+)/);
	if (post) return `x:${post[1]}`;
	const reddit = u.hostname === 'reddit.com' && u.pathname.match(/\/comments\/([a-z0-9]+)/i);
	if (reddit) return `reddit:${reddit[1].toLowerCase()}`;
	const topic = u.hostname === 'linux.do' && u.pathname.match(/\/t\/(?:[^/]+\/)?(\d+)/);
	if (topic) return `linuxdo:${topic[1]}`;
	return url;
}

export function platformOf(value) {
	const h = new URL(normalizeUrl(value)).hostname;
	return ({ 'x.com': 'x', 'github.com': 'github', 'youtube.com': 'youtube', 'reddit.com': 'reddit', 'bilibili.com': 'bilibili', 'linux.do': 'linuxdo', 'mp.weixin.qq.com': 'wechat', 'arxiv.org': 'arxiv', 'news.ycombinator.com': 'hackernews', 'zhihu.com': 'zhihu', 'v2ex.com': 'v2ex' })[h] || (['x.ai', 'docs.x.ai', 'help.x.com', 'cursor.com'].includes(h) ? 'official' : 'web');
}

const normalizedText = (v) => v.normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]/gu, '');
export function fingerprint(r) {
	return createHash('sha256').update(normalizedText(`${r.title}|${r.summary_zh}|${r.summary_en}`)).digest('hex');
}
export function similarTitle(a, b) {
	const left = normalizedText(a), right = normalizedText(b);
	if (Math.min(left.length, right.length) < 12) return false;
	const grams = (s) => new Set(Array.from({ length: s.length - 2 }, (_, i) => s.slice(i, i + 3)));
	const x = grams(left), y = grams(right);
	const shared = [...x].filter((g) => y.has(g)).length;
	return 2 * shared / (x.size + y.size) >= 0.9;
}

export function validateResource(r, { strict = false, today = chinaDate() } = {}) {
	const errors = [];
	for (const key of ['id', 'url', 'title', 'author', 'summary_zh', 'summary_en', 'added']) {
		if (typeof r[key] !== 'string' || !r[key].trim()) errors.push(`missing ${key}`);
	}
	if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(r.id || '')) errors.push('invalid id');
	for (const key of ['url', 'author_url', 'archive', 'original_url']) if (r[key]) {
		try { normalizeUrl(r[key]); } catch { errors.push(`invalid ${key}`); }
	}
	for (const key of ['summary_zh', 'summary_en']) if (r[key]?.length > 220) errors.push(`${key} exceeds 220 characters`);
	if (!SOURCES.includes(r.source)) errors.push('invalid source');
	if (!['zh', 'en'].includes(r.lang)) errors.push('invalid lang');
	if (r.status && !['alive', 'broken'].includes(r.status)) errors.push('invalid status');
	for (const key of ['added', 'published', 'checked_at']) if (r[key]) {
		if (!/^\d{4}-\d{2}-\d{2}$/.test(r[key]) || Number.isNaN(Date.parse(r[key])) || new Date(r[key]).toISOString().slice(0, 10) !== r[key] || r[key] > today) errors.push(`invalid or future ${key}`);
	}
	if (r.categories !== undefined && (!Array.isArray(r.categories) || !r.categories.length || r.categories.some((c) => !CATEGORIES.includes(c)) || new Set(r.categories).size !== r.categories.length)) errors.push('invalid categories');
	if (r.evidence && !EVIDENCE.includes(r.evidence)) errors.push('invalid evidence');
	if (r.source === 'official' || r.evidence === 'official') {
		try { if (platformOf(r.url) !== 'official') errors.push('official requires a recognized official host'); } catch { /* URL error above */ }
	}
	for (const key of ['tags', 'roles']) if (r[key] !== undefined && (!Array.isArray(r[key]) || r[key].some((v) => typeof v !== 'string'))) errors.push(`invalid ${key}`);
	if (r.apps !== undefined && (!Array.isArray(r.apps) || r.apps.some((v) => typeof v !== 'string' || !v.trim()) || new Set(r.apps.map((v) => typeof v === 'string' ? v.trim().toLowerCase() : v)).size !== r.apps.length)) errors.push('invalid apps');
	if (strict) {
		for (const key of ['categories', 'evidence', 'checked_at', 'verification_note_zh', 'verification_note_en']) if (!r[key]?.length) errors.push(`missing ${key}`);
		if (r.status !== 'alive') errors.push('new collection entries must be accessible');
		const allowed = ['id', 'url', 'title', 'author', 'author_url', 'source', 'platform', 'lang', 'published', 'added', 'checked_at', 'summary_zh', 'summary_en', 'tags', 'apps', 'roles', 'status', 'archive', 'submitted_by', 'sponsored', 'ugc', 'categories', 'evidence', 'verification_note_zh', 'verification_note_en', 'collection_batch', 'original_url'];
		if (Object.keys(r).some((k) => !allowed.includes(k))) errors.push('unknown resource fields (raw source bodies are not stored)');
	}
	return errors;
}

export function processBatch(existing, batch, { today = chinaDate() } = {}) {
	if (!/^[a-z0-9-]+$/.test(batch.id || '') || !Array.isArray(batch.candidates)) throw new Error('Invalid batch');
	const resources = structuredClone(existing);
	const report = { batch_id: batch.id, date: today, added: [], updated: [], duplicates: [], held: [], rejected: [] };
	for (const candidate of batch.candidates) {
		const r = candidate.resource || {};
		const item = { url: r.url, title: r.title };
		if (['hold', 'reject'].includes(candidate.decision)) {
			report[candidate.decision === 'hold' ? 'held' : 'rejected'].push({ ...item, reason: candidate.reason || 'No reason provided' });
			continue;
		}
		const errors = validateResource(r, { strict: true, today });
		if (candidate.decision !== 'publish') errors.push('publish decision required');
		if (!candidate.relevance || !candidate.reason) errors.push('relevance and editorial reason required');
		if (!['page', 'video-description', 'abstract'].includes(candidate.verified_via)) errors.push('unsupported verification: snippets alone are insufficient');
		if (errors.length) { report.held.push({ ...item, reason: errors.join('; ') }); continue; }
		const clean = { ...r, url: normalizeUrl(r.url), platform: platformOf(r.url), collection_batch: batch.id };
		const exact = resources.find((e) => identity(e.url) === identity(clean.url) || identity(e.original_url || e.url) === identity(clean.original_url || clean.url));
		if (candidate.update_id) {
			if (!exact || exact.id !== candidate.update_id || exact.id !== clean.id || identity(exact.url) !== identity(clean.url)) {
				report.held.push({ ...item, reason: 'update_id must match the same existing URL and id' }); continue;
			}
			const replacement = { ...exact, ...clean, id: exact.id, added: exact.added };
			const comparable = ({ collection_batch, ...rest }) => JSON.stringify(rest);
			if (comparable(replacement) === comparable(exact)) report.duplicates.push({ ...item, existing_id: exact.id, reason: 'unchanged update' });
			else { resources[resources.indexOf(exact)] = replacement; report.updated.push(clean.id); }
			continue;
		}
		const duplicate = exact || resources.find((e) => fingerprint(e) === fingerprint(clean));
		if (duplicate) { report.duplicates.push({ ...item, existing_id: duplicate.id, reason: 'same source identity, original or content' }); continue; }
		if (resources.some((e) => e.id === clean.id)) { report.held.push({ ...item, reason: 'id collision with a different URL' }); continue; }
		const similar = resources.find((e) => similarTitle(e.title, clean.title));
		if (similar && candidate.distinct_from !== similar.id) {
			report.held.push({ ...item, reason: `similar title to ${similar.id}; verify whether this is a repost` }); continue;
		}
		resources.push(clean);
		report.added.push(clean.id);
	}
	resources.sort((a, b) => b.added.localeCompare(a.added) || a.id.localeCompare(b.id));
	return { resources, report };
}
