#!/usr/bin/env node
// Quét dist/ tìm inline <script> thực thi được mà CSP trong vercel.json không cho phép.
//
// script-src KHÔNG có 'unsafe-inline' (R19): script của component được Vite tách ra
// file (assetsInlineLimit trong astro.config.mjs), chỉ còn runtime <astro-island>
// là inline và được cho phép bằng hash. Đổi phiên bản Astro hoặc thêm island mới
// có thể đổi nội dung runtime → hash lệch → menu/slider chết im lặng trên production.
// Script này chạy sau `astro build` để chặn deploy đó.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { createHash } from 'node:crypto';

const ROOT = new URL('..', import.meta.url).pathname;
const DIST = join(ROOT, 'dist');
const SITE_CSP_SOURCE = '/((?!admin).*)';

const vercel = JSON.parse(readFileSync(join(ROOT, 'vercel.json'), 'utf8'));
const cspValue = vercel.headers
  .find((h) => h.source === SITE_CSP_SOURCE)
  ?.headers.find((h) => h.key.toLowerCase() === 'content-security-policy')?.value;

if (!cspValue) {
  console.error(`✗ Không tìm thấy Content-Security-Policy cho source "${SITE_CSP_SOURCE}" trong vercel.json`);
  process.exit(1);
}

const scriptSrc = cspValue
  .split(';')
  .map((d) => d.trim().split(/\s+/))
  .find(([name]) => name === 'script-src');

if (!scriptSrc) {
  console.error('✗ CSP thiếu directive script-src');
  process.exit(1);
}
if (scriptSrc.includes("'unsafe-inline'")) {
  console.error("✗ script-src đang có 'unsafe-inline' — xem R19 trong NOTE.md");
  process.exit(1);
}

const allowed = new Set(scriptSrc.filter((t) => t.startsWith("'sha256-")).map((t) => t.slice(1, -1)));

const htmlFiles = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) {
      if (relative(DIST, path) !== 'admin') walk(path);
    } else if (name.endsWith('.html')) {
      htmlFiles.push(path);
    }
  }
})(DIST);

const EXECUTABLE_TYPES = new Set(['', 'module', 'text/javascript', 'application/javascript']);
const missing = new Map();
const used = new Set();

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  for (const [, attrs, body] of html.matchAll(/<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/g)) {
    const type = attrs.match(/\btype=["']?([^"'\s>]+)/)?.[1] ?? '';
    if (!EXECUTABLE_TYPES.has(type)) continue;

    const hash = `sha256-${createHash('sha256').update(body).digest('base64')}`;
    if (allowed.has(hash)) {
      used.add(hash);
      continue;
    }
    const entry = missing.get(hash) ?? { files: [], preview: body.slice(0, 80).replace(/\s+/g, ' ') };
    entry.files.push(relative(DIST, file));
    missing.set(hash, entry);
  }
}

for (const hash of allowed) {
  if (!used.has(hash)) console.warn(`⚠ Hash không còn dùng trong dist/, có thể gỡ khỏi vercel.json: '${hash}'`);
}

if (missing.size > 0) {
  console.error(`✗ ${missing.size} inline script bị CSP chặn trên production:\n`);
  for (const [hash, { files, preview }] of missing) {
    console.error(`  '${hash}'  (${files.length} trang, vd. ${files[0]})\n    ${preview}…\n`);
  }
  console.error('Nếu là script của component: nó phải được tách ra file — kiểm tra assetsInlineLimit trong astro.config.mjs.');
  console.error('Nếu là runtime <astro-island> (sau khi nâng Astro): thêm hash mới vào script-src trong vercel.json.');
  process.exit(1);
}

console.log(`OK — ${htmlFiles.length} trang, mọi inline script đều được CSP cho phép (${used.size} hash).`);
