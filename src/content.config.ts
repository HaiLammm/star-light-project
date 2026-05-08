import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const serviceCategoryValues = ['electricity', 'water', 'pest-control'] as const;
const faqCategoryValues = ['general', 'electricity', 'water', 'pest-control', 'pricing', 'process'] as const;

const pricingTierSchema = z.object({
  name: z.string(),
  price: z.number(),
  description: z.string(),
  imageAlt: z.string(),
});

const faqEntrySchema = z.object({
  question: z.string(),
  answer: z.string(),
});

const services = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/services' }),
  schema: z.object({
    serviceName: z.string(),
    serviceNameShort: z.string(),
    category: z.enum(serviceCategoryValues),
    slug: z.string(),
    description: z.string(),
    startingPrice: z.number().positive(),
    serviceArea: z.array(z.string()),
    imageAlt: z.string(),
    isEmergency: z.boolean().default(false),
    hasFreeEstimate: z.boolean().default(true),
    pricingTiers: z.array(pricingTierSchema).optional(),
    faqEntries: z.array(faqEntrySchema).optional(),
  }),
});

const cases = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/cases' }),
  schema: z.object({
    title: z.string(),
    serviceCategory: z.enum(serviceCategoryValues),
    serviceSlug: z.string(),
    location: z.string(),
    duration: z.string(),
    cost: z.number(),
    imageAlt: z.string(),
    publishedDate: z.coerce.date(),
  }),
});

const testimonials = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/testimonials' }),
  schema: z.object({
    serviceType: z.string(),
    serviceCategory: z.enum(serviceCategoryValues),
    cost: z.number(),
    message: z.string(),
    authorInitial: z.string(),
    location: z.string().optional(),
    rating: z.number().min(1).max(5).optional(),
  }),
});

const faq = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/faq' }),
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    category: z.enum(faqCategoryValues),
    sortOrder: z.number().int().default(0),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.string(),
    imageAlt: z.string().optional(),
  }),
});

const company = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/company' }),
  schema: z.object({
    type: z.enum(['office', 'philosophy', 'history']),
    officeName: z.string().optional(),
    address: z.string().optional(),
    region: z.string().optional(),
    areaServed: z.array(z.string()).optional(),
  }),
});

export const collections = {
  services,
  cases,
  testimonials,
  faq,
  blog,
  company,
};
