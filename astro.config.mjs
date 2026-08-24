// @ts-check
import { defineConfig } from 'astro/config';
import { readFileSync, readdirSync } from 'node:fs';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import { rehypeArticleImages } from './src/utils/rehypeArticleImages.mjs';
import { SITE_CONFIG } from './src/config/site';

// Build a URL→lastmod map from blog frontmatter so sitemap entries get
// per-page dates instead of a single build timestamp.
const blogDir = new URL('./src/content/blog/', import.meta.url);
/** @type {Map<string, string>} */
const blogDateMap = new Map();
for (const file of readdirSync(blogDir).filter(f => f.endsWith('.md') || f.endsWith('.mdx'))) {
  const content = readFileSync(new URL(file, blogDir), 'utf-8');
  const updated = content.match(/updatedDate:\s*(\d{4}-\d{2}-\d{2})/);
  const published = content.match(/publishedDate:\s*(\d{4}-\d{2}-\d{2})/);
  const m = updated ?? published;
  if (m) {
    const slug = file.replace(/\.mdx?$/, '');
    // new URL để key khớp URL đã chuẩn hóa của @astrojs/sitemap, kể cả khi siteUrl có "/" cuối
    blogDateMap.set(
      new URL(`/columns/${slug}/`, SITE_CONFIG.siteUrl).href,
      new Date(m[1]).toISOString(),
    );
  }
}

// https://astro.build/config
export default defineConfig({
  site: SITE_CONFIG.siteUrl,
  output: 'static',
  compressHTML: true,
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
  markdown: {
    rehypePlugins: [rehypeArticleImages],
  },
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/admin/') && !/\/404\/?$/.test(page),
      serialize(item) {
        const blogDate = blogDateMap.get(item.url);
        if (blogDate) {
          item.lastmod = blogDate;
        }
        // Non-blog pages: no lastmod (Google prefers omission over a fake date)
        return item;
      },
    }),
    react(),
  ]
});