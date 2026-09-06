// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import { rehypeArticleImages } from './src/utils/rehypeArticleImages.mjs';
import { serializeSitemapItem } from './src/utils/sitemap.mjs';
import { SITE_CONFIG } from './src/config/site';
import { readdir, readFile } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import { parseFrontmatter } from '@astrojs/markdown-remark';
import { guideSchema, glossarySchema, bridgeSchema, raceSchema, raceArticleSchema } from './src/utils/contentSchemas';
import { assertContentGraph } from './src/utils/contentGraph';

/** @template T @param {string} directory @param {string} extension @param {{ parse: (value: unknown) => T }} schema @returns {Promise<Array<{id: string, filePath: string, data: T}>>} */
async function readContentEntries(directory, extension, schema) {
  const root = join(process.cwd(), 'src/content', directory);
  /** @type {string[]} */
  const files = [];
  /** @param {string} folder */
  async function walk(folder) {
    for (const name of await readdir(folder, { withFileTypes: true })) {
      const path = join(folder, name.name);
      if (name.isDirectory()) await walk(path);
      else if (name.name.endsWith(extension)) files.push(path);
    }
  }
  await walk(root);
  return Promise.all(files.map(async (path) => {
    const id = relative(root, path).replaceAll(sep, '/').replace(new RegExp(`${extension.replace('.', '\\.')}$`), '');
    const source = await readFile(path, 'utf8');
    const data = extension === '.json' ? schema.parse(JSON.parse(source)) : schema.parse(parseFrontmatter(source).frontmatter);
    return { id, filePath: `src/content/${directory}/${relative(root, path).replaceAll(sep, '/')}`, data };
  }));
}

async function validateContentGraphAtBuild() {
  assertContentGraph({
    guides: await readContentEntries('guides', '.md', guideSchema),
    glossary: await readContentEntries('glossary', '.md', glossarySchema),
    bridge: await readContentEntries('bridge', '.md', bridgeSchema),
    races: await readContentEntries('races', '.json', raceSchema),
    raceArticles: await readContentEntries('race-articles', '.md', raceArticleSchema),
  });
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
      serialize(item) {
        return serializeSitemapItem(item);
      },
    }),
    react(),
    {
      name: 'content-graph-validation',
      hooks: {
        'astro:build:done': validateContentGraphAtBuild,
      },
    },
  ]
});
