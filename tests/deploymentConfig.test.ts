import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { SITE_CONFIG } from '../src/config/site.ts';
import { serializeSitemapItem } from '../src/utils/sitemap.mjs';

const vercel = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8')) as {
  redirects: Array<{ has?: Array<{ type: string; value: string }>; destination: string; statusCode: number }>;
  headers: Array<{ source: string }>;
};

test('canonical redirect follows SITE_CONFIG.siteUrl', () => {
  assert.equal(vercel.redirects.length, 1);
  const [redirect] = vercel.redirects;
  const configuredHost = new URL(SITE_CONFIG.siteUrl).hostname;
  assert.equal(redirect.statusCode, 301);
  assert.equal(redirect.has?.find((condition) => condition.type === 'host')?.value, configuredHost);
  assert.equal(new URL(redirect.destination).hostname, `www.${configuredHost}`);
  assert.equal(vercel.headers.length, 1);
  assert.equal(vercel.headers[0].source, '/(.*)');
});

test('sitemap serializer preserves entries without inventing lastmod', () => {
  const item = { url: `${SITE_CONFIG.siteUrl}/`, changefreq: undefined, priority: undefined };
  assert.strictEqual(serializeSitemapItem(item), item);
  assert.equal('lastmod' in item, false);
});

test('retired admin surface is absent before sitemap generation', () => {
  assert.equal(existsSync(new URL('../public/admin', import.meta.url)), false);
  assert.equal(existsSync(new URL('../src/pages/admin', import.meta.url)), false);
});
