import { readdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import * as pagefind from 'pagefind';
import { extractTutorial } from './lib/tutorial-search.mjs';

// The production index is built by Starlight. In dev, use the same engine on
// rendered pages so custom Astro tutorials and MDX components are indexed too.
export default function localSearch() {
	let root;
	return {
		name: 'local-pagefind-search',
		hooks: {
			'astro:config:done': ({ config }) => { root = config.root; },
			'astro:build:done': async ({ dir }) => {
				const tutorials = [];
				for (const locale of ['zh', 'en']) for (const item of await readdir(new URL(`${locale}/recipes/`, dir), { withFileTypes: true })) {
					if (!item.isDirectory()) continue;
					const tutorial = extractTutorial(`/${locale}/recipes/${item.name}/`, await readFile(new URL(`${locale}/recipes/${item.name}/index.html`, dir), 'utf8'));
					if (tutorial) tutorials.push(tutorial);
				}
				await writeFile(new URL('pagefind/tutorials.json', dir), JSON.stringify(tutorials));
			},
			'astro:server:setup': ({ server, logger }) => {
				let revision = 0;
				let indexedRevision = -1;
				let pending;
				const assets = new Map();
				const sourceRoot = fileURLToPath(new URL('src/', root));
				server.watcher.on('all', (_event, path) => {
					if (path.startsWith(sourceRoot) || /[/\\](?:site|locales)\.config\.mjs$/.test(path)) revision++;
				});

				async function ensureIndex() {
					if (indexedRevision === revision) return;
					if (pending) return pending;
					pending = (async () => {
						do {
							const currentRevision = revision;
							const address = server.httpServer.address();
							if (!address || typeof address === 'string') throw new Error('Local server is not listening.');
							const origin = `http://${address.family === 'IPv6' ? '[::1]' : '127.0.0.1'}:${address.port}`;
							const paths = await docPaths(new URL('src/content/docs/', root));
							const files = await renderIndex(origin, paths);
							// Keep old hashed fragments for tabs that loaded an earlier index.
							for (const file of files) assets.set(file.path, file.content);
							indexedRevision = currentRevision;
							logger.info(`Search index ready (${paths.size} pages).`);
						} while (indexedRevision !== revision);
					})().finally(() => { pending = undefined; });
					return pending;
				}

				server.middlewares.use(async (req, res, next) => {
					const path = new URL(req.url || '/', 'http://localhost').pathname;
					if (!path.startsWith('/pagefind/')) return next();
					if (req.method !== 'GET' && req.method !== 'HEAD') return next();
					try {
						await ensureIndex();
						const name = path.slice('/pagefind/'.length);
						const content = assets.get(name);
						if (!content) { res.statusCode = 404; res.end(); return; }
						const type = name.endsWith('.js') ? 'text/javascript' : name.endsWith('.json') ? 'application/json' : 'application/octet-stream';
						res.setHeader('Content-Type', `${type}; charset=utf-8`);
						res.setHeader('Cache-Control', 'no-store');
						res.setHeader('X-Robots-Tag', 'noindex');
						res.end(req.method === 'HEAD' ? undefined : content);
					} catch (error) {
						logger.error(`Search indexing failed: ${error.message}`);
						res.statusCode = 503;
						res.end(`Search index could not be prepared: ${error.message}`);
					}
				});
			},
		},
	};
}

async function docPaths(directory, prefix = '/') {
	const paths = new Set();
	for (const item of await readdir(directory, { withFileTypes: true })) {
		if (item.isDirectory()) {
			for (const path of await docPaths(new URL(`${item.name}/`, directory), `${prefix}${item.name}/`)) paths.add(path);
		} else if (/\.mdx?$/.test(item.name)) {
			paths.add(`${prefix}${item.name.replace(/\.mdx?$/, '').replace(/^index$/, '')}`.replace(/\/?$/, '/'));
		}
	}
	return paths;
}

function assertResponse(result) {
	if (result.errors.length) throw new Error(result.errors.join('\n'));
	return result;
}

async function renderIndex(origin, paths) {
	try {
		const { index } = assertResponse(await pagefind.createIndex());
		const tutorials = [];
		const visited = new Set();
		while (visited.size < paths.size) {
			const batch = [...paths].filter(path => !visited.has(path)).slice(0, 6);
			const pages = await Promise.all(batch.map(async path => {
				visited.add(path);
				const response = await fetch(`${origin}${path}`, { signal: AbortSignal.timeout(30_000) });
				if (!response.ok) throw new Error(`${path}: HTTP ${response.status}`);
				return { path, html: await response.text() };
			}));
			for (const { path, html } of pages) {
				if (!html.includes('data-pagefind-body')) continue;
				assertResponse(await index.addHTMLFile({ url: path, content: html }));
				const tutorial = extractTutorial(path, html);
				if (tutorial) tutorials.push(tutorial);
				// Docs already supply all article paths, including the canonical
				// tutorial routes. Discover their additional topic pages from links.
				for (const [, , href] of html.matchAll(/href=(['"])(.*?)\1/g)) {
					const url = new URL(href, origin);
					if (url.origin === origin && /^\/(?:zh|en)\/recipes\/topics\/(?:[^/.]+\/)?$/.test(url.pathname)) paths.add(url.pathname);
				}
			}
		}
		return [...assertResponse(await index.getFiles()).files, { path: 'tutorials.json', content: new TextEncoder().encode(JSON.stringify(tutorials)) }];
	} finally {
		await pagefind.close();
	}
}
