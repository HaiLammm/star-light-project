// @ts-check
import { defineConfig } from 'astro/config';
import { readFileSync, readdirSync } from 'node:fs';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

// Build a URL→lastmod map from blog frontmatter so sitemap entries get
// per-page dates instead of a single build timestamp.
const blogDir = new URL('./src/content/blog/', import.meta.url);
/** @type {Map<string, string>} */
const blogDateMap = new Map();
for (const file of readdirSync(blogDir).filter(f => f.endsWith('.md') || f.endsWith('.mdx'))) {
  const content = readFileSync(new URL(file, blogDir), 'utf-8');
  const m = content.match(/publishedDate:\s*(\d{4}-\d{2}-\d{2})/);
  if (m) {
    const slug = file.replace(/\.mdx?$/, '');
    blogDateMap.set(
      `https://www.setsubi-pro.net/columns/${slug}/`,
      new Date(m[1]).toISOString(),
    );
  }
}

// https://astro.build/config
export default defineConfig({
  site: 'https://www.setsubi-pro.net',
  output: 'static',
  compressHTML: true,
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
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