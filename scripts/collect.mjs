#!/usr/bin/env node
import { readFileSync, writeFileSync, renameSync, mkdirSync, existsSync, rmSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse, stringify } from 'yaml';
import { processBatch } from './lib/resources.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const args = process.argv.slice(2);
const input = args.find((a) => !a.startsWith('--'));
if (!input || args.some((a) => a.startsWith('--') && a !== '--write')) {
	console.error('Usage: npm run collect -- data/collection/batches/<batch>.json [--write]');
	process.exit(1);
}
const file = resolve(root, 'src/data/resources.yaml');
const lock = resolve(root, '.collection.lock');
const write = args.includes('--write');
let locked = false;
try {
	if (write) { mkdirSync(lock); locked = true; }
	const batch = JSON.parse(readFileSync(resolve(input), 'utf8'));
	const reportFile = resolve(root, `data/collection/reports/${batch.id}.json`);
	if (write && existsSync(reportFile)) throw new Error('This batch was already applied; use a new batch id for corrections.');
	const { resources, report } = processBatch(parse(readFileSync(file, 'utf8')) || [], batch);
	if (write) {
		mkdirSync(dirname(reportFile), { recursive: true });
		writeFileSync(`${file}.tmp`, '# 外部收录：仅存原创摘要、链接、署名与核验记录，不存原文。\n' + stringify(resources, { lineWidth: 0 }));
		renameSync(`${file}.tmp`, file);
		writeFileSync(reportFile, JSON.stringify(report, null, 2) + '\n');
	}
	console.log(JSON.stringify({ mode: write ? 'written' : 'preview', ...report }, null, 2));
} catch (error) {
	console.error(error.message);
	process.exitCode = 1;
} finally {
	if (locked) rmSync(lock, { recursive: true });
}
