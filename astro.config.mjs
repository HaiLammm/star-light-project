// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import { rehypeArticleImages } from './src/utils/rehypeArticleImages.mjs';
import { serializeSitemapItem } from './src/utils/sitemap.mjs';
import { SITE_CONFIG } from './src/config/site';

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
      serialize(item) {
        return serializeSitemapItem(item);
      },
    }),
    react(),
  ]
});
