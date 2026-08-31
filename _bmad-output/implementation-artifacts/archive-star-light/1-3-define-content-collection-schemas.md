# Story 1.3: Define Content Collection Schemas

Status: review

## Story

As a content manager,
I want validated content schemas for all 6 content types,
so that invalid content is caught at build time before reaching production.

## Acceptance Criteria

1. **Given** the project with utilities configured **When** `src/content.config.ts` is created **Then** Zod schemas are defined for: services (with serviceName, startingPrice, serviceArea, imageAlt, isEmergency fields), cases, testimonials, faq, blog, and company collections
2. **And** sample content files exist for each collection (at least 1 per type) with valid data
3. **And** `astro build` validates content against schemas and fails on invalid data
4. **And** content collection directory structure matches architecture spec: `services/electricity/`, `services/water/`, `cases/`, `testimonials/`, `faq/`, `blog/`, `company/`

## Tasks / Subtasks

- [x] Task 1: Create `src/content.config.ts` with all 6 collection schemas (AC: #1)
  - [x] 1.1 Define `services` collection with glob loader for `**/*.json` under `./src/content/services`
  - [x] 1.2 Define `cases` collection with glob loader for `**/*.md` under `./src/content/cases`
  - [x] 1.3 Define `testimonials` collection with glob loader for `**/*.json` under `./src/content/testimonials`
  - [x] 1.4 Define `faq` collection with glob loader for `**/*.json` under `./src/content/faq`
  - [x] 1.5 Define `blog` collection with glob loader for `**/*.md` under `./src/content/blog`
  - [x] 1.6 Define `company` collection with glob loader for `**/*.json` under `./src/content/company`
  - [x] 1.7 Export all collections in a single `collections` object
- [x] Task 2: Create directory structure and sample content files (AC: #2, #4)
  - [x] 2.1 Create `src/content/services/electricity/breaker.json` (sample)
  - [x] 2.2 Create `src/content/services/water/toilet.json` (sample)
  - [x] 2.3 Create `src/content/cases/case-001.md` (sample)
  - [x] 2.4 Create `src/content/testimonials/testimonial-001.json` (sample)
  - [x] 2.5 Create `src/content/faq/faq-001.json` (sample)
  - [x] 2.6 Create `src/content/blog/sample-post.md` (sample)
  - [x] 2.7 Create `src/content/company/offices.json` (sample)
- [x] Task 3: Validate build (AC: #3)
  - [x] 3.1 Run `astro build` and verify it passes with valid sample data
  - [x] 3.2 Temporarily introduce invalid data in one file, verify build fails with descriptive Zod error
  - [x] 3.3 Revert the invalid data

## Dev Notes

### CRITICAL: Astro 5 Content Collections API

**Config file location:** `src/content.config.ts` (NOT `src/content/config.ts` — the old Astro 4 path is deprecated in Astro 5).

**Imports:**
```typescript
import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';
```

**Loader patterns:**
- Markdown collections: `glob({ pattern: '**/*.md', base: './src/content/<name>' })`
- JSON collections (individual files): `glob({ pattern: '**/*.json', base: './src/content/<name>' })`
- JSON collections (single file): `file('src/content/<name>/data.json')` — NOT needed here, use glob for individual files

**Querying (for later stories):**
```typescript
import { getCollection, render } from 'astro:content';
const services = await getCollection('services');
const posts = await getCollection('blog');
const { Content } = await render(post); // Markdown only
```

### Schema Field Specifications

**services** collection (JSON per service):
```typescript
z.object({
  serviceName: z.string(),              // e.g. "ブレーカー修理・交換"
  serviceNameShort: z.string(),         // e.g. "ブレーカー"
  category: z.enum(['electricity', 'water', 'pest-control']),
  slug: z.string(),                     // e.g. "breaker"
  description: z.string(),
  startingPrice: z.number().positive(), // in JPY, tax-included
  serviceArea: z.array(z.string()),     // prefectures served
  imageAlt: z.string(),                 // Japanese alt text REQUIRED
  isEmergency: z.boolean().default(false),
  hasFreeEstimate: z.boolean().default(true),
  pricingTiers: z.array(z.object({
    name: z.string(),
    price: z.number(),
    description: z.string(),
    imageAlt: z.string(),
  })).optional(),
  faqEntries: z.array(z.object({
    question: z.string(),
    answer: z.string(),
  })).optional(),
})
```

**cases** collection (Markdown — frontmatter schema):
```typescript
z.object({
  title: z.string(),
  serviceCategory: z.enum(['electricity', 'water', 'pest-control']),
  serviceSlug: z.string(),
  location: z.string(),                 // e.g. "大阪市北区"
  duration: z.string(),                 // e.g. "約2時間"
  cost: z.number(),                     // in JPY
  imageAlt: z.string(),
  publishedDate: z.coerce.date(),
})
```

**testimonials** collection (JSON):
```typescript
z.object({
  serviceType: z.string(),             // e.g. "トイレ修理"
  serviceCategory: z.enum(['electricity', 'water', 'pest-control']),
  cost: z.number(),
  message: z.string(),
  authorInitial: z.string(),           // e.g. "T.K.様"
  location: z.string().optional(),
  rating: z.number().min(1).max(5).optional(),
})
```

**faq** collection (JSON):
```typescript
z.object({
  question: z.string(),
  answer: z.string(),
  category: z.enum(['general', 'electricity', 'water', 'pest-control', 'pricing', 'process']),
  sortOrder: z.number().int().default(0),
})
```

**blog** collection (Markdown — frontmatter schema):
```typescript
z.object({
  title: z.string(),
  description: z.string(),
  publishedDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  category: z.string(),
  imageAlt: z.string().optional(),
})
```

**company** collection (JSON):
```typescript
z.object({
  type: z.enum(['office', 'philosophy', 'history']),
  // Office-specific fields
  officeName: z.string().optional(),
  address: z.string().optional(),
  region: z.string().optional(),
  areaServed: z.array(z.string()).optional(),
})
```

### Content Field Naming Convention

- camelCase for all fields: `serviceName`, `startingPrice`, `serviceArea`, `imageAlt`
- Boolean fields prefixed with `is`/`has`: `isEmergency`, `hasFreeEstimate`
- Date fields as ISO strings parsed with `z.coerce.date()`
- Japanese text for user-facing fields (serviceName, description, imageAlt)
- English slug values for programmatic use (slug, category)

### Directory Structure to Create

```
src/content/
├── services/
│   ├── electricity/    # breaker.json, outlet.json, lighting.json, antenna.json, water-heater.json
│   └── water/          # toilet.json, kitchen.json, bath.json, washroom.json
├── cases/              # case-001.md, case-002.md, ...
├── testimonials/       # testimonial-001.json, ...
├── faq/                # faq-001.json, ...
├── blog/               # sample-post.md, ...
└── company/            # offices.json, philosophy.json
```

### Existing Code to Reuse (DO NOT Reinvent)

- `src/utils/siteConfig.ts` — Already has `ServiceCategoryKey` type (`'electricity' | 'water' | 'pest-control'`), service items with slugs and startingPrice, regional offices with areaServed arrays. Use these as reference for sample data values.
- `src/utils/formatters.ts` — `formatPrice()`, `formatDate()` already exist for display formatting.
- `src/utils/schema.ts` — JSON-LD generators already expect specific field shapes. Content schemas MUST produce data compatible with `generateService()`, `generateFAQ()`, `generateReview()`, `generateArticle()`.

### Anti-Patterns

- DO NOT put config in `src/content/config.ts` — Astro 5 uses `src/content.config.ts` at project root of `src/`
- DO NOT use `type: 'content'` or `type: 'data'` — Astro 5 uses loaders instead
- DO NOT hardcode phone number or company data in sample content — reference `siteConfig.ts` patterns
- DO NOT use English alt text — all `imageAlt` must be Japanese
- DO NOT use kebab-case for schema field names — use camelCase per project convention
- DO NOT create a pest-control subdirectory in services yet — architecture shows it but epics AC only mentions electricity and water directories

### Previous Story Intelligence

**From Story 1.1:** Node.js v20.20.2, Astro v5.18.1, Tailwind v4 via `@tailwindcss/vite`. Build command: `astro build`.

**From Story 1.2:** `siteConfig.ts` exports `SERVICE_CATEGORIES` with all service slugs, labels, and starting prices. Schema utility functions in `schema.ts` expect specific data shapes — align content collection output with these.

### Project Structure Notes

- `src/content.config.ts` — NEW file (Astro 5 convention)
- `src/content/**` — NEW directory tree
- No existing files are modified in this story

### References

- [Source: _bmad-output/planning-artifacts/architecture.md — Data Architecture, lines 164-171]
- [Source: _bmad-output/planning-artifacts/architecture.md — Directory Structure, lines 265-277]
- [Source: _bmad-output/planning-artifacts/architecture.md — Content Field Naming, lines 247-250]
- [Source: _bmad-output/planning-artifacts/epics.md — Story 1.3, lines 245-258]
- [Source: _bmad-output/implementation-artifacts/1-2-create-site-configuration-and-utility-modules.md — Learnings]
- [Source: Astro Docs — Content Collections](https://docs.astro.build/en/guides/content-collections/)

## Dev Agent Record

### Agent Model Used

openai/gpt-5.4

### Debug Log References

- `npm run build` — passed with valid content collections and sample data.
- `npm run build` — failed as expected after setting `services/breaker.startingPrice` to `-1`, producing `InvalidContentEntryDataError` with `startingPrice: Number must be greater than 0`.
- `npm run build` — passed again after restoring valid sample data.

### Completion Notes List

- Created `src/content.config.ts` using Astro 5 loaders with Zod schemas for `services`, `cases`, `testimonials`, `faq`, `blog`, and `company`.
- Added the `src/content/` directory tree and one valid sample entry per collection type, matching the story's required folder layout.
- Verified build-time content validation by forcing a negative `startingPrice` in `breaker.json`, confirming Astro surfaced a descriptive schema error, then restoring the valid data.
- Kept the services sample directories to `electricity/` and `water/` only, matching this story's acceptance criteria.

### File List

- `src/content.config.ts`
- `src/content/services/electricity/breaker.json`
- `src/content/services/water/toilet.json`
- `src/content/cases/case-001.md`
- `src/content/testimonials/testimonial-001.json`
- `src/content/faq/faq-001.json`
- `src/content/blog/sample-post.md`
- `src/content/company/offices.json`

### Change Log

- 2026-05-08: Implemented Story 1.3 content collection schemas, sample content, and build-time schema validation checks.
