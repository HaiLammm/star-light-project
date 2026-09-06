import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (path: string) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('global shell keeps accessibility and config contracts', () => {
  const header = read('src/components/Header.astro');
  const menu = read('src/components/MobileMenu.astro');
  const footer = read('src/components/Footer.astro');
  const notFound = read('src/pages/404.astro');
  assert.match(header, /PILLAR_NAVIGATION/);
  assert.match(header, /aria-expanded="false"/);
  assert.match(menu, /data-menu-close/);
  assert.match(menu, /matchMedia\('\(min-width: 768px\)'\)/);
  assert.match(footer, /COMPLIANCE\.notices\.footer/);
  assert.match(footer, /min-w-11/);
  assert.match(notFound, /申し訳ありません/);
  assert.match(notFound, /SITE_CONFIG\.siteName/);
});
