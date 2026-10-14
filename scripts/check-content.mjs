#!/usr/bin/env node
/**
 * 内容检查（CI 和本地都能跑）：npm run check:content
 *
 * 错误（会让 CI 失败）：
 *   - 角色卡 / 模板 / 实战案例缺少 author、grade 或 difficulty
 *   - grade: tested 却没有 last_verified
 *   - resources.yaml 里 id 或 URL 重复、摘要缺失或过长
 * 警告（不阻塞）：
 *   - 只有一种语言的页面（维护者会补翻译）
 *   - last_verified 超过 60 天（需要复验）
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { parse } from 'yaml';

const ROOT = new URL('..', import.meta.url).pathname;
const DOCS = join(ROOT, 'src/content/docs');
const LANGS = ['zh', 'en'];
const STRICT_SECTIONS = ['bots', 'templates', 'recipes'];
const STALE_DAYS = 60;

const errors = [];
const warnings = [];
const isCI = !!process.env.GITHUB_ACTIONS;
const report = (level, file, msg) => {
	(level === 'error' ? errors : warnings).push(`${file}: ${msg}`);
	if (isCI) console.log(`::${level} file=${file}::${msg}`);
};

function walk(dir) {
	return readdirSync(dir).flatMap((name) => {
		const p = join(dir, name);
		return statSync(p).isDirectory() ? walk(p) : /\.mdx?$/.test(name) ? [p] : [];
	});
}

function frontmatter(file) {
	const m = readFileSync(file, 'utf8').match(/^---\n([\s\S]*?)\n---/);
	return m ? parse(m[1]) ?? {} : {};
}

// 1. 双语对照
const pages = Object.fromEntries(LANGS.map((l) => [l, new Set(walk(join(DOCS, l)).map((f) => relative(join(DOCS, l), f)))]));
for (const lang of LANGS) {
	const other = LANGS.find((l) => l !== lang);
	for (const p of pages[lang]) {
		if (!pages[other].has(p)) report('warning', `src/content/docs/${lang}/${p}`, `missing ${other} translation`);
	}
}

// 2. frontmatter 规则
const now = Date.now();
for (const lang of LANGS) {
	for (const p of pages[lang]) {
		const file = `src/content/docs/${lang}/${p}`;
		const fm = frontmatter(join(ROOT, file));
		if (!fm.title) report('error', file, 'missing title');
		const section = p.split('/')[0];
		const isIndex = /(^|\/)index\.mdx?$/.test(p);
		if (STRICT_SECTIONS.includes(section) && !isIndex) {
			for (const key of ['author', 'grade', 'difficulty']) {
				if (!fm[key]) report('error', file, `missing "${key}" (required for ${section})`);
			}
		}
		if (fm.grade === 'tested' && !fm.last_verified) report('error', file, 'grade "tested" requires last_verified');
		if (fm.last_verified) {
			const days = (now - new Date(fm.last_verified).getTime()) / 86400000;
			if (days > STALE_DAYS) report('warning', file, `last verified ${Math.floor(days)} days ago, needs re-verification`);
		}
	}
}

// 3. 外部收录
const resFile = 'src/data/resources.yaml';
const resources = parse(readFileSync(join(ROOT, resFile), 'utf8')) ?? [];
const ids = new Set();
const urls = new Set();
const norm = (u) => {
	try {
		const x = new URL(u);
		x.hash = '';
		for (const k of [...x.searchParams.keys()]) if (/^utm_|^ref$|^s$/.test(k)) x.searchParams.delete(k);
		return `${x.hostname.replace(/^www\./, '')}${x.pathname.replace(/\/$/, '')}${x.search}`.toLowerCase();
	} catch {
		return u;
	}
};
for (const r of resources) {
	const where = `${resFile} (${r.id ?? r.url})`;
	if (ids.has(r.id)) report('error', where, `duplicate id "${r.id}"`);
	ids.add(r.id);
	const n = norm(r.url ?? '');
	if (urls.has(n)) report('error', where, `duplicate url ${r.url}`);
	urls.add(n);
	for (const key of ['summary_zh', 'summary_en']) {
		if (!r[key]) report('error', where, `missing ${key}`);
		else if (r[key].length > 220) report('error', where, `${key} is too long (${r[key].length} > 220); write a short summary, do not copy the original`);
	}
}

console.log(`\ncheck-content: ${errors.length} error(s), ${warnings.length} warning(s)`);
if (!isCI) [...errors.map((e) => `✗ ${e}`), ...warnings.map((w) => `! ${w}`)].forEach((l) => console.log(l));
process.exit(errors.length ? 1 : 0);
