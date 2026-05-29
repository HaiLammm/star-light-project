// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

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
        item.lastmod = new Date().toISOString();
        return item;
      },
    }),
    react(),
  ]
});