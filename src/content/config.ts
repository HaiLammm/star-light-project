import { defineCollection, z } from 'astro:content';

const pricingTierSchema = z.object({
  name: z.string(),
  price: z.number(),
  imageUrl: z.string(),
  imageAlt: z.string(),
}).passthrough();

const faqEntrySchema = z.object({
  question: z.string(),
  answer: z.string(),
});

const servicesCollection = defineCollection({
  type: 'data',
  schema: z.object({
    serviceName: z.string(),
    serviceNameShort: z.string(),
    category: z.enum(['electricity', 'water', 'pest-control']),
    slug: z.string(),
    description: z.string(),
    startingPrice: z.number(),
    originalPrice: z.number(),
    webDiscountAmount: z.number(),
    serviceArea: z.array(z.string()),
    imageAlt: z.string(),
    isEmergency: z.boolean().default(false),
    hasFreeEstimate: z.boolean().default(true),
    kvImageDesktop: z.string().optional(),
    kvImageMobile: z.string().optional(),
    pricingTiers: z.array(pricingTierSchema).min(1),
    faqEntries: z.array(faqEntrySchema).min(1),
  }),
});

export const collections = {
  services: servicesCollection,
};
