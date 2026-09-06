import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { guideSchema, glossarySchema, bridgeSchema, raceSchema, raceArticleSchema } from './utils/contentSchemas';

const guides = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guides' }),
  schema: guideSchema,
});

const glossary = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/glossary' }),
  schema: glossarySchema,
});

const bridge = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/bridge' }),
  schema: bridgeSchema,
});

const races = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/races' }),
  schema: raceSchema,
});

const raceArticles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/race-articles' }),
  schema: raceArticleSchema,
});

export const collections = { guides, glossary, bridge, races, raceArticles };
