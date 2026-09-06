/**
 * Keep sitemap entries unchanged until a keiba content collection owns lastmod data.
 * @param {import('@astrojs/sitemap').SitemapItem} item
 */
export function serializeSitemapItem(item) {
  return item;
}
