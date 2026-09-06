import { z } from 'astro/zod';

const isoDate = z.preprocess(
  (value) => value instanceof Date && !Number.isNaN(value.getTime()) ? value.toISOString().slice(0, 10) : value,
  z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Expected ISO date (YYYY-MM-DD)').pipe(z.coerce.date()),
);
const requiredText = z.string().trim().min(1);

export const articleBase = z.object({
  title: requiredText.max(40),
  description: requiredText.min(50).max(160),
  publishedDate: isoDate,
  updatedDate: isoDate.optional(),
  image: requiredText,
  imageAlt: requiredText,
  relatedTerms: z.array(z.string()).default([]),
  relatedRace: z.string().optional(),
  draft: z.boolean().default(false),
}).strict();

export const guideSchema = articleBase.extend({
  series: requiredText.optional(),
  seriesOrder: z.number().int().positive().optional(),
  faqEntries: z.array(z.object({ question: requiredText, answer: requiredText }).strict()).default([]),
}).strict();

export const glossarySchema = z.object({
  term: requiredText,
  reading: requiredText,
  category: z.enum(['baken', 'race', 'pedigree', 'course']),
  shortGloss: requiredText.max(60),
  relatedTerms: z.array(z.string()).default([]),
}).strict();

export const bridgeSchema = articleBase.extend({
  horseName: requiredText,
  horseNameEn: requiredText.optional(),
  era: requiredText,
  umaCharacter: requiredText.optional(),
  keyRaces: z.array(z.string()).default([]),
}).strict();

export const raceSchema = z.object({
  raceId: requiredText,
  name: requiredText,
  grade: z.enum(['G1', 'G2', 'G3']),
  course: requiredText,
  distance: requiredText,
  month: z.number().int().min(1).max(12),
  description: requiredText,
  heroImage: requiredText.optional(),
  heroImageAlt: requiredText.optional(),
}).strict();

export const raceArticleSchema = articleBase.extend({
  race: requiredText,
  edition: z.number().int(),
  articleType: z.enum(['deep-dive', 'preview', 'recap']),
}).strict();
