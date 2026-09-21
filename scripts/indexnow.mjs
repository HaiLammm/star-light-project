#!/usr/bin/env node
// Báo IndexNow các URL bài viết thay đổi giữa hai commit, để Bing / Yandex / Naver /
// Seznam crawl lại ngay thay vì chờ đọc sitemap. Google KHÔNG dùng IndexNow — phía
// Google vẫn dựa vào sitemap + Search Console.
//
// Chạy từ .github/workflows/indexnow.yml SAU KHI Vercel báo deploy Production thành
// công, nên URL gửi đi đã phục vụ nội dung mới.
//
//   node scripts/indexnow.mjs <baseSha> [headSha] [--dry-run]
import { execFileSync } from 'node:child_process';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const SITE = 'https://www.setsubi-pro.net';
const ENDPOINT = 'https://api.indexnow.org/indexnow';
const BLOG_FILE_RE = /^src\/content\/blog\/(.+)\.mdx?$/;

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const [base, head = 'HEAD'] = args.filter((a) => !a.startsWith('--'));

if (!base) {
  console.error('Dùng: node scripts/indexnow.mjs <baseSha> [headSha] [--dry-run]');
  process.exit(1);
}

const ROOT = new URL('..', import.meta.url).pathname;
const keyFile = readdirSync(join(ROOT, 'public')).find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
if (!keyFile) {
  console.error('✗ Không tìm thấy file key IndexNow public/<32 hex>.txt');
  process.exit(1);
}
const key = readFileSync(join(ROOT, 'public', keyFile), 'utf8').trim();

// Rename (R100) có 2 path: gửi cả URL cũ (giờ là 301) lẫn URL mới.
const diff = execFileSync('git', ['diff', '--name-status', '-M', base, head, '--', 'src/content/blog'], {
  cwd: ROOT,
  encoding: 'utf8',
});
const urls = new Set();
for (const line of diff.split('\n').filter(Boolean)) {
  for (const path of line.split('\t').slice(1)) {
    const slug = path.match(BLOG_FILE_RE)?.[1];
    if (slug) urls.add(`${SITE}/columns/${slug}/`);
  }
}

if (urls.size === 0) {
  console.log(`Không có bài viết nào đổi giữa ${base.slice(0, 7)}..${head.slice(0, 7)} — bỏ qua.`);
  process.exit(0);
}

// Trang chủ và /columns/ liệt kê bài mới nhất nên cũng đổi theo.
urls.add(`${SITE}/`);
urls.add(`${SITE}/columns/`);

const payload = {
  host: new URL(SITE).host,
  key,
  keyLocation: `${SITE}/${keyFile}`,
  urlList: [...urls],
};

console.log(`${urls.size} URL:\n  ${payload.urlList.join('\n  ')}`);
if (dryRun) {
  console.log('--dry-run: không gửi.');
  process.exit(0);
}

const res = await fetch(ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(payload),
});
// 200 = đã nhận, 202 = đã nhận nhưng key đang chờ xác minh.
if (res.status !== 200 && res.status !== 202) {
  console.error(`✗ IndexNow trả ${res.status}: ${await res.text()}`);
  process.exit(1);
}
console.log(`OK — IndexNow ${res.status}`);
