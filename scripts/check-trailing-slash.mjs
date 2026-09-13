#!/usr/bin/env node
/**
 * Quét dist/ tìm URL nội bộ thiếu dấu "/" cuối.
 *
 * Site phục vụ mỗi trang tại đúng một URL canonical (dạng có "/" cuối, do
 * `trailingSlash: true` trong vercel.json). Một internal link thiếu "/" vẫn tới
 * đúng trang nhưng qua một hop 308 — tốn crawl budget và là thứ đã khiến 4 URL
 * bị Google xếp vào "Alternate page with proper canonical tag".
 *
 * Không chạy trong `npm run build`: một link thiếu slash không được phép làm
 * hỏng deploy. Chạy riêng qua `npm run check:slashes` (hoặc `npm run verify`).
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = fileURLToPath(new URL('../dist/', import.meta.url));
const ORIGIN = 'https://www.setsubi-pro.net';

const SKIP_HREF = /^(?:#|mailto:|tel:|javascript:|data:|https?:|\/\/)/;
/** Đuôi file — path có đuôi là asset, không bao giờ được thêm "/". */
const HAS_EXT = /\.[a-zA-Z0-9]{2,5}$/;
/** Các key trong JSON-LD mang giá trị là URL. */
const URL_KEYS = new Set(['url', 'item', '@id', 'mainEntityOfPage', 'contentUrl']);

function walkHtml(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) walkHtml(p, out);
    else if (p.endsWith('.html')) out.push(p);
  }
  return out;
}

/** Đi đệ quy JSON-LD, gọi onUrl cho mọi giá trị chuỗi nằm ở key URL-like. */
function walkJsonLd(node, onUrl) {
  if (Array.isArray(node)) return void node.forEach((n) => walkJsonLd(n, onUrl));
  if (node && typeof node === 'object') {
    for (const [k, v] of Object.entries(node)) {
      if (typeof v === 'string' && URL_KEYS.has(k)) onUrl(k, v);
      else walkJsonLd(v, onUrl);
    }
  }
}

const problems = [];
const add = (file, kind, detail) =>
  problems.push({ file: relative(DIST, file) || relative(process.cwd(), file), kind, detail });

/** URL tuyệt đối nội bộ thiếu "/" cuối? Bỏ qua asset và URL chỉ là fragment (@id). */
function absNeedsSlash(value) {
  if (!value.startsWith(ORIGIN)) return false;
  const u = new URL(value);
  if (u.hash) return false;
  if (HAS_EXT.test(u.pathname)) return false;
  return !u.pathname.endsWith('/');
}

for (const file of walkHtml(DIST)) {
  const html = readFileSync(file, 'utf-8');

  // 1) double slash — regression nguy hiểm nhất khi sửa hàng loạt href
  for (const m of html.matchAll(/(?:href|src)="(\/[^"]*\/\/[^"]*)"/g)) {
    add(file, 'DOUBLE_SLASH', m[1]);
  }

  // 2) internal href thiếu trailing slash
  for (const m of html.matchAll(/href="([^"]+)"/g)) {
    const href = m[1];
    if (!href.startsWith('/') || SKIP_HREF.test(href)) continue;
    const path = href.split(/[?#]/)[0];
    if (!path || path.endsWith('/') || HAS_EXT.test(path)) continue;
    add(file, 'HREF_NO_SLASH', href);
  }

  // 3) canonical + og:url
  const canonical = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i)?.[1];
  const ogUrl = html.match(/<meta[^>]+property="og:url"[^>]+content="([^"]+)"/i)?.[1];
  for (const [label, value] of [['CANONICAL', canonical], ['OG_URL', ogUrl]]) {
    if (!value) continue;
    if (!value.startsWith(ORIGIN)) add(file, `${label}_BAD_ORIGIN`, value);
    else if (absNeedsSlash(value)) add(file, `${label}_NO_SLASH`, value);
  }

  // 4) JSON-LD
  const scripts = html.matchAll(
    /<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
  );
  for (const m of scripts) {
    let data;
    try {
      // serializeJsonLd escape "<" thành < để không đóng sớm thẻ script
      data = JSON.parse(m[1].replace(/\\u003c/g, '<'));
    } catch {
      add(file, 'JSONLD_PARSE_ERROR', m[1].slice(0, 80));
      continue;
    }
    walkJsonLd(data, (key, value) => {
      if (absNeedsSlash(value)) add(file, `JSONLD_${key}_NO_SLASH`, value);
    });
  }
}

// 5) sitemap: mọi <loc> phải là URL canonical
for (const name of readdirSync(DIST).filter((f) => /^sitemap.*\.xml$/.test(f))) {
  const xml = readFileSync(join(DIST, name), 'utf-8');
  for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const u = new URL(m[1]);
    if (!HAS_EXT.test(u.pathname) && !u.pathname.endsWith('/')) {
      add(join(DIST, name), 'SITEMAP_LOC_NO_SLASH', m[1]);
    }
    if (u.pathname.includes('//')) add(join(DIST, name), 'SITEMAP_DOUBLE_SLASH', m[1]);
  }
}

if (problems.length === 0) {
  console.log('OK — không có URL nội bộ nào thiếu trailing slash.');
  process.exit(0);
}

const byFile = new Map();
for (const p of problems) {
  if (!byFile.has(p.file)) byFile.set(p.file, []);
  byFile.get(p.file).push(p);
}
for (const [file, list] of byFile) {
  console.log(`\n${file}`);
  for (const p of list) console.log(`  [${p.kind}] ${p.detail}`);
}

const byKind = new Map();
for (const p of problems) byKind.set(p.kind, (byKind.get(p.kind) ?? 0) + 1);
console.log('\n--- Tổng hợp ---');
for (const [kind, count] of [...byKind].sort((a, b) => b[1] - a[1])) {
  console.log(`  ${String(count).padStart(5)}  ${kind}`);
}
console.error(`\n${problems.length} vấn đề trên ${byFile.size} file.`);
process.exit(1);
