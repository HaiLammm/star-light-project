# Story 3.4: Create Service Content Data and Dynamic Route Generation

Status: review

## Story

As a content manager,
I want all service data defined in content collections with dynamic page generation,
so that adding or updating a service only requires editing a JSON file.

## Acceptance Criteria

1. **Given** content collection files exist for all services  
   **When** `astro build` runs  
   **Then** `[service].astro` uses `getStaticPaths()` to generate pages for all electricity services (breaker, outlet, lighting, antenna, water-heater) from `content/services/electricity/`

2. **And** `[service].astro` generates pages for all water services (toilet, kitchen, bath, washroom) from `content/services/water/`

3. **And** `[service].astro` generates pages for cockroach, termite, rodent, general-pest from `content/services/pest-control/`

4. **And** each generated page follows the identical 13-section template with data sourced from content collections

5. **And** Zod schema validation in `src/content/config.ts` catches missing or invalid fields at build time (build fails with a clear error)

6. **And** all service JSON files contain: serviceName, serviceNameShort, category, slug, description, startingPrice, originalPrice, webDiscountAmount, serviceArea, imageAlt, pricingTiers, faqEntries

## Tasks / Subtasks

- [x] Task 1: Create `src/content/config.ts` with Zod schemas (AC: #5)
  - [x] Define `pricingTierSchema` with name, price, imageUrl, imageAlt
  - [x] Define `faqEntrySchema` with question, answer
  - [x] Define `serviceSchema` with all required fields
  - [x] Register collection in `defineCollection()` for `services/electricity`, `services/water`, `services/pest-control`

- [x] Task 2: Create missing electricity service JSON files (AC: #1)
  - [x] `src/content/services/electricity/outlet.json`
  - [x] `src/content/services/electricity/lighting.json`
  - [x] `src/content/services/electricity/antenna.json`
  - [x] `src/content/services/electricity/water-heater.json`
  - [x] Update existing `breaker.json` to add `originalPrice`, `webDiscountAmount`, and `imageUrl` in each pricingTier

- [x] Task 3: Create missing water service JSON files (AC: #2)
  - [x] `src/content/services/water/kitchen.json`
  - [x] `src/content/services/water/bath.json`
  - [x] `src/content/services/water/washroom.json`
  - [x] Update existing `toilet.json` to add `originalPrice`, `webDiscountAmount`, and `imageUrl` in each pricingTier

- [x] Task 4: Create pest-control service JSON files (AC: #3)
  - [x] Create directory `src/content/services/pest-control/`
  - [x] `src/content/services/pest-control/cockroach.json`
  - [x] `src/content/services/pest-control/termite.json`
  - [x] `src/content/services/pest-control/rodent.json`
  - [x] `src/content/services/pest-control/general-pest.json`

- [x] Task 5: Restructure page routes to match intended URL pattern (AC: #4)
  - [x] Create `src/pages/[category]/[service].astro` with `getStaticPaths()` using `getCollection('services')`
  - [x] Update template data bindings to use `serviceData` from content collection (name, pricing, FAQ, prices)
  - [x] Update `relatedServices` logic to use the correct category service list
  - [x] Delete `src/pages/services/[service].astro`

- [x] Task 6: Verify build passes (AC: #5, #6)
  - [x] Run `astro build` and confirm all 13 pages generated without errors
  - [x] Confirm Zod validation errors are caught (test by temporarily removing a required field)

## Dev Notes

### CRITICAL: URL Structure Issue

The current `src/pages/services/[service].astro` generates URLs like `/services/breaker`, but `siteConfig.ts` navigation links point to `/electricity/breaker`, `/water/toilet`, `/pest-control/cockroach`. These URLs **do not match**.

**Solution:** Create `src/pages/[category]/[service].astro` (Astro nested dynamic route). This generates the correct URLs. Then **delete** `src/pages/services/[service].astro`.

Astro supports nested dynamic routes — `[category]/[service].astro` is the correct pattern here. The `getStaticPaths()` returns all 13 combinations:
```typescript
export async function getStaticPaths() {
  const services = await getCollection('services');
  return services.map((entry) => ({
    params: { category: entry.data.category, service: entry.data.slug },
    props: { serviceData: entry.data },
  }));
}
```

### Content Collection Architecture

`src/content/config.ts` does not yet exist — create it. Astro v5 uses `defineCollection()` with Zod schemas. Since service files are in nested directories, register one collection named `services` that covers all three subdirectories:

```typescript
import { defineCollection, z } from 'astro:content';

const pricingTierSchema = z.object({
  name: z.string(),
  price: z.number(),
  imageUrl: z.string(),
  imageAlt: z.string(),
});

const faqEntrySchema = z.object({
  question: z.string(),
  answer: z.string(),
});

const servicesCollection = defineCollection({
  type: 'data',
  schema: z.object({
    serviceName: z.string(),          // e.g. "ブレーカー修理・交換" (long/page title name)
    serviceNameShort: z.string(),     // e.g. "ブレーカー" (breadcrumb/heading short name)
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
    pricingTiers: z.array(pricingTierSchema).min(1),
    faqEntries: z.array(faqEntrySchema).min(1),
  }),
});

export const collections = {
  services: servicesCollection,
};
```

**Note on collection path:** Astro resolves `src/content/services/electricity/breaker.json` under a collection named `services`. The `id` will be `electricity/breaker` — extract slug from `entry.data.slug`, not from `entry.id`.

### Existing JSON Files — Fields to Update

Both `breaker.json` and `toilet.json` already exist but are **incomplete**. They need:
1. `originalPrice` (number) — the before-discount price shown in the KV price bar
2. `webDiscountAmount` (number) — the WEB割引 discount amount
3. Each `pricingTier` needs `imageUrl` added (currently has `imageAlt` and `description` but no `imageUrl`)

Existing `breaker.json` pricingTier `description` field: the Zod schema defined above does not include `description` in pricingTier (the page template does not use it). Either add it as `z.string().optional()` or remove from the JSON — choose consistency.

### Template Data Binding Changes

In the new `[category]/[service].astro`, replace all hardcoded variables with content collection data:

| Current hardcoded variable | Replace with |
|---|---|
| `const serviceName = 'ブレーカー'` | `serviceData.serviceNameShort` |
| `const serviceLongName = 'ブレーカー修理・交換'` | `serviceData.serviceName` |
| `const categorySlug = 'electricity'` | `serviceData.category` (`Astro.params.category`) |
| `const originalPrice = 2600` | `serviceData.originalPrice` |
| `const discountedPrice = 1100` | `serviceData.startingPrice` |
| `const webDiscountAmount = 1500` | `serviceData.webDiscountAmount` |
| `const pricingTiers = [...]` | `serviceData.pricingTiers` |
| `const faqItems = [...]` | `serviceData.faqEntries` |
| KV image src (hardcoded to breaker path) | See KV Image section below |
| `relatedServices` (hardcoded to ELECTRICITY_SERVICES) | See Related Services section below |

**Keep static (do not move to JSON):**
- `anchorSections` array — same for all services, stays in template
- `comparisonData` — same for all services in this phase, stays in template
- `serviceReasons` — same for all services, stays in template (or pass `undefined` to use ReasonsGrid defaults)
- `stubCaseStudies`, `stubTestimonials` — remain as stub data, dynamic loading is out of scope for 3.4

### Japanese Category Label Mapping

The template uses `serviceCategory` ('電気まわり') as a Japanese display string. Derive it in the template from the slug, not from JSON:

```typescript
const categoryLabels: Record<string, string> = {
  electricity: '電気まわり',
  water: '水まわり',
  'pest-control': '害虫駆除',
};
const serviceCategory = categoryLabels[Astro.params.category];
```

### KV Image Handling

Currently hardcoded to `/images/services/electricity/breaker/kv.png`. Only breaker has a dedicated KV image at `public/images/services/electricity/breaker/`. Other services do not have dedicated KV images.

**Strategy:** Use per-service KV if the path follows `/images/services/[category]/[slug]/kv.png`, else fall back to a category-level image. The simplest correct approach is to define the KV image path directly in the template with a fallback:

```typescript
// Attempt service-specific KV, fall back to category default
const kvImageBase = `/images/services/${serviceData.category}/${serviceData.slug}`;
// These will 404 if files don't exist — use known fallbacks instead
const categoryKvFallback: Record<string, string> = {
  electricity: '/images/services/electricity_01.jpg',
  water: '/images/services/sanitary_01.jpg',
  'pest-control': '/images/services/pest_01.jpg',
};
```

Simplest safe approach for this story: use the category fallback image for all services EXCEPT breaker (which has dedicated KV). The `[service].astro` can check `serviceData.slug === 'breaker'` for now, or add an optional `kvImageDesktop`/`kvImageMobile` field to the JSON schema. **Recommended:** add optional fields to the JSON:

```
kvImageDesktop: z.string().optional(),
kvImageMobile: z.string().optional(),
```

Then in breaker.json:
```json
"kvImageDesktop": "/images/services/electricity/breaker/kv.png",
"kvImageMobile": "/images/services/electricity/breaker/kv_sp.png",
```

All other JSON files omit these fields, template falls back to category default.

### Related Services Logic

Currently uses `ELECTRICITY_SERVICES` hardcoded. In the dynamic template, derive from `siteConfig.ts` using the category:

```typescript
import { ELECTRICITY_SERVICES, WATER_SERVICES, PEST_CONTROL_SERVICES } from '../../utils/siteConfig';

const categoryServices: Record<string, typeof ELECTRICITY_SERVICES> = {
  electricity: ELECTRICITY_SERVICES,
  water: WATER_SERVICES,
  'pest-control': PEST_CONTROL_SERVICES,
};

const relatedServices = (categoryServices[serviceData.category] ?? [])
  .filter((s) => s.slug !== serviceData.slug)
  .slice(0, 4)
  .map((s) => ({
    ...s,
    imageSrc: relatedServiceImages[s.slug]?.src ?? categoryKvFallback[serviceData.category],
    imageAlt: relatedServiceImages[s.slug]?.alt ?? `${s.label}サービス`,
  }));
```

The `relatedServiceImages` map currently only has electricity slugs. Extend it to include all 13 service slugs using existing images:

```typescript
const relatedServiceImages: Record<string, { src: string; alt: string }> = {
  // electricity (5)
  'breaker':      { src: '/images/services/electricity_01.jpg', alt: 'ブレーカー修理・交換サービス' },
  'outlet':       { src: '/images/services/electricity_02.jpg', alt: 'コンセント修理・交換サービス' },
  'lighting':     { src: '/images/services/electricity_03.jpg', alt: '照明修理・交換サービス' },
  'antenna':      { src: '/images/services/electricity_04.jpg', alt: 'アンテナ工事サービス' },
  'water-heater': { src: '/images/services/electricity_05.jpg', alt: '給湯器交換サービス' },
  // water (4)
  'toilet':       { src: '/images/services/sanitary_01.jpg', alt: 'トイレ修理サービス' },
  'kitchen':      { src: '/images/services/sanitary_02.jpg', alt: 'キッチン修理サービス' },
  'bath':         { src: '/images/services/sanitary_03.jpg', alt: 'お風呂修理サービス' },
  'washroom':     { src: '/images/services/sanitary_04.jpg', alt: '洗面所修理サービス' },
  // pest-control (4)
  'cockroach':    { src: '/images/services/pest_01.jpg', alt: 'ゴキブリ駆除サービス' },
  'termite':      { src: '/images/services/pest_02.jpg', alt: 'シロアリ駆除サービス' },
  'rodent':       { src: '/images/services/pest_03.jpg', alt: 'ネズミ駆除サービス' },
  'general-pest': { src: '/images/services/pest_01.jpg', alt: '一般害虫駆除サービス' },
};
```

### Service JSON Data Reference

Use the existing `breaker.json` and `toilet.json` as data patterns. For service-specific content (pricing tiers, FAQ, description), mirror the realistic service details from star-light15.net. Key values to use per category:

**Electricity services** (`startingPrice: 1100`, `originalPrice: 2600`, `webDiscountAmount: 1500`):
- outlet: コンセント修理・増設・交換 (3 tiers using sanitary/electricity images)
- lighting: 照明器具取付・交換 (3 tiers)
- antenna: アンテナ工事（設置・交換・修理）(3 tiers)
- water-heater: 給湯器交換・修理 (3 tiers)

**Water services** (`startingPrice: 5500`, `originalPrice: 8800`, `webDiscountAmount: 3300`):
- kitchen: キッチンつまり・水漏れ修理 (3 tiers using sanitary images)
- bath: お風呂つまり・水漏れ修理 (3 tiers)
- washroom: 洗面所つまり・水漏れ修理 (3 tiers)

**Pest control services** (`startingPrice: 5500`, `originalPrice: 8800`, `webDiscountAmount: 3300`):
- cockroach: ゴキブリ駆除 (3 tiers using pest images)
- termite: シロアリ駆除 (3 tiers)
- rodent: ネズミ駆除 (3 tiers)
- general-pest: 一般害虫駆除 (3 tiers)

Each service needs **minimum 3 pricing tiers** and **minimum 4 FAQ entries** to match the breaker page.

### Service Area Data

From existing JSON and siteConfig `REGIONAL_OFFICES`:
- Electricity (eastern Japan): `["東京都", "神奈川県", "埼玉県", "千葉県"]`
- Water / Pest control (western Japan): `["大阪府", "京都府", "奈良県", "和歌山県"]`

Use these per category for consistency with the AreaMap component.

### Astro Build Import Path

The new page is at `src/pages/[category]/[service].astro`. Adjust relative import paths:
- From `../../layouts/BaseLayout.astro` → `../../layouts/BaseLayout.astro` ✓ (same depth)
- From `../../utils/siteConfig` → `../../utils/siteConfig` ✓ (same depth)
- From `astro:content` import `getCollection` (Astro built-in, no relative path)

### Project Structure Notes

**Files to create:**
- `src/content/config.ts` — Zod schemas (NEW)
- `src/content/services/electricity/outlet.json` (NEW)
- `src/content/services/electricity/lighting.json` (NEW)
- `src/content/services/electricity/antenna.json` (NEW)
- `src/content/services/electricity/water-heater.json` (NEW)
- `src/content/services/water/kitchen.json` (NEW)
- `src/content/services/water/bath.json` (NEW)
- `src/content/services/water/washroom.json` (NEW)
- `src/content/services/pest-control/cockroach.json` (NEW)
- `src/content/services/pest-control/termite.json` (NEW)
- `src/content/services/pest-control/rodent.json` (NEW)
- `src/content/services/pest-control/general-pest.json` (NEW)
- `src/pages/[category]/[service].astro` (NEW — migrated from `services/[service].astro`)

**Files to update:**
- `src/content/services/electricity/breaker.json` — add `originalPrice`, `webDiscountAmount`, `imageUrl` in pricingTiers, optional `kvImageDesktop`/`kvImageMobile`
- `src/content/services/water/toilet.json` — add `originalPrice`, `webDiscountAmount`, `imageUrl` in pricingTiers

**Files to delete:**
- `src/pages/services/[service].astro` — replaced by `[category]/[service].astro`

**No changes to:**
- `src/utils/siteConfig.ts` — navigation hrefs already correct (`/electricity/breaker` etc.)
- Any component files (AnchorMenu, PricingTier, ReasonsGrid, etc.) — no interface changes
- `src/content/config.ts` does not exist yet so no merge conflicts

### References

- Architecture: data architecture & content collections → `_bmad-output/planning-artifacts/architecture.md` § "Content Collections"
- Architecture: dynamic routes pattern → `_bmad-output/planning-artifacts/architecture.md` § "Dynamic Routes"
- Story 3.1 dev notes: anchor sections & getStaticPaths stub → `_bmad-output/implementation-artifacts/3-1-build-service-detail-page-template-with-anchor-menu-and-pricing.md`
- Story 3.3 dev notes: related services implementation → `_bmad-output/implementation-artifacts/3-3-build-service-area-process-flow-case-studies-testimonials-and-faq-sections-for-service-pages.md`
- Existing breaker.json pattern: `src/content/services/electricity/breaker.json`
- Existing toilet.json pattern: `src/content/services/water/toilet.json`
- siteConfig service lists: `src/utils/siteConfig.ts` (ELECTRICITY_SERVICES, WATER_SERVICES, PEST_CONTROL_SERVICES)

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-6

### Debug Log References

### Completion Notes List

- ✅ Updated `src/content.config.ts` (Astro 5 Content Layer API config) — root cause of build error: old pricingTierSchema had `description: required` instead of `imageUrl`. Fixed to match JSON data.
- ✅ Created `src/content/config.ts` (legacy format) as secondary schema reference.
- ✅ All 13 service JSON files created/updated with correct pricingTiers (imageUrl, no description).
- ✅ `src/pages/[category]/[service].astro` generates correct `/electricity/breaker`, `/water/toilet`, `/pest-control/cockroach` URLs.
- ✅ `src/pages/services/[service].astro` deleted.
- ✅ `astro build` passes — 13 pages generated without errors.

### File List

- src/content.config.ts (UPDATED — fixed pricingTierSchema, added originalPrice/webDiscountAmount/kvImage fields)
- src/content/config.ts (CREATED — legacy format Zod schema)
- src/content/services/electricity/outlet.json (CREATED)
- src/content/services/electricity/lighting.json (CREATED)
- src/content/services/electricity/antenna.json (CREATED)
- src/content/services/electricity/water-heater.json (CREATED)
- src/content/services/electricity/breaker.json (UPDATED)
- src/content/services/water/kitchen.json (CREATED)
- src/content/services/water/bath.json (CREATED)
- src/content/services/water/washroom.json (CREATED)
- src/content/services/water/toilet.json (UPDATED)
- src/content/services/pest-control/cockroach.json (CREATED)
- src/content/services/pest-control/termite.json (CREATED)
- src/content/services/pest-control/rodent.json (CREATED)
- src/content/services/pest-control/general-pest.json (CREATED)
- src/pages/[category]/[service].astro (CREATED)
- src/pages/services/[service].astro (DELETED)
