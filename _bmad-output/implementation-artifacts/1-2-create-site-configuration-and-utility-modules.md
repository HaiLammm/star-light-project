# Story 1.2: Create Site Configuration and Utility Modules

Status: done

## Story

As a developer,
I want centralized site configuration and utility functions,
So that phone numbers, company data, and formatters are never hardcoded across components.

## Acceptance Criteria

1. **Given** the initialized project **When** `src/utils/siteConfig.ts` is created **Then** it exports phone number (0120-219-695), company name, regional office addresses (Tokyo, Nagoya, Osaka, Hyogo), navigation structure, and service categories
2. **And** `src/utils/formatters.ts` exports price formatting (¥1,100) and Japanese date formatting functions
3. **And** `src/utils/schema.ts` exports Schema.org JSON-LD generator functions (generateLocalBusiness, generateService, generateFAQ, generateReview, generateBreadcrumb, generateArticle)
4. **And** all functions are typed with TypeScript strict mode

## Tasks / Subtasks

- [x] Task 1: Create `src/utils/siteConfig.ts` (AC: #1)
  - [x] Define and export `SITE_CONFIG` object with phone number, company name, site URL
  - [x] Define and export regional office data (Tokyo, Nagoya, Osaka, Hyogo) with addresses, phone numbers, contact details
  - [x] Define and export navigation structure matching mega-menu layout (electricity 5 subs, water 4 subs, pest-control, company, flow, case, voice, column, faq)
  - [x] Define and export service categories (electricity, water, pest-control) with sub-service lists
  - [x] Type all exports with TypeScript interfaces
- [x] Task 2: Create `src/utils/formatters.ts` (AC: #2)
  - [x] Export `formatPrice(amount: number): string` — outputs `¥1,100` format with comma separator
  - [x] Export `formatPriceRange(amount: number): string` — outputs `¥1,100~` with tilde suffix
  - [x] Export `formatDate(date: string | Date): string` — outputs Japanese date format (YYYY年MM月DD日)
  - [x] Type all function signatures strictly
- [x] Task 3: Create `src/utils/schema.ts` (AC: #3)
  - [x] Export `generateLocalBusiness(office)` — valid LocalBusiness JSON-LD for regional offices
  - [x] Export `generateService(service)` — valid Service JSON-LD with pricing, area served
  - [x] Export `generateFAQ(items)` — valid FAQPage JSON-LD from FAQ entries
  - [x] Export `generateReview(testimonial)` — valid Review JSON-LD
  - [x] Export `generateBreadcrumb(crumbs)` — valid BreadcrumbList JSON-LD
  - [x] Export `generateArticle(post)` — valid Article JSON-LD with publishedDate
  - [x] Type all input parameters and return types
- [x] Task 4: Verify TypeScript strict mode compliance (AC: #4)
  - [x] Run `npx astro check` or `npx tsc --noEmit` with zero errors
  - [x] Ensure all exports have explicit types, no `any`

### Review Findings

- [x] [Review][Defer] formatDate uses runtime timezone (not JST) — may produce off-by-one dates on non-JST build servers [src/utils/formatters.ts:10] — deferred, pre-existing JS Date behavior
- [x] [Review][Defer] generateFAQ([]) and generateBreadcrumb([]) produce empty schema arrays — Google requires ≥1 Question for FAQPage and ≥2 items for BreadcrumbList [src/utils/schema.ts] — deferred, caller responsibility

## Dev Notes

### Directory Structure

Create these 3 files — the `src/utils/` directory does not exist yet:

```
src/utils/
├── siteConfig.ts     # Single source of truth for all company/site data
├── formatters.ts     # Price and date formatting utilities
└── schema.ts         # Schema.org JSON-LD generator functions
```

### siteConfig.ts — Exact Data Requirements

**Phone number:** `0120-219-695` (toll-free, format with hyphens for display, `0120219695` for tel: links)

**Company name:** 設備人 (Setsubit)

**Regional offices (4):**
- Tokyo (東京), Nagoya (名古屋), Osaka (大阪), Hyogo (兵庫)
- Each office needs: name, address, phone, region/prefectures served

**Navigation structure must match the mega-menu layout from architecture:**
- 電気工事 (5 services): breaker, outlet, lighting, antenna, water-heater
- 水道工事 (4 services): toilet, kitchen, bath, washroom
- 害虫駆除 (pest-control): cockroach, termite, rodent, general-pest
- Other nav items: company, flow, case, voice, column, faq, contact

**Service categories** with sub-services, Japanese labels, URL slugs, and starting prices.

### formatters.ts — Implementation Details

```typescript
// Price formatting — Japanese yen with comma separator
export function formatPrice(amount: number): string {
  return `¥${amount.toLocaleString('ja-JP')}`;
}

// Price range — append tilde for "starting from" pricing
export function formatPriceRange(amount: number): string {
  return `¥${amount.toLocaleString('ja-JP')}~`;
}

// Japanese date — YYYY年MM月DD日 format
export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}
```

Note: Use `toLocaleString('ja-JP')` for comma separation. Do NOT use Intl.NumberFormat with currency style — the original site shows `¥1,100~` not `￥1,100`.

### schema.ts — Schema.org JSON-LD Requirements

All functions return a plain object (not a string). Pages will serialize via `JSON.stringify()` in a `<script type="application/ld+json">` tag.

**Key Schema.org types needed:**

1. `generateLocalBusiness(office)` — returns `LocalBusiness` with `@type`, `name`, `address` (PostalAddress), `telephone`, `areaServed`, `openingHours` (24/7)
2. `generateService(service)` — returns `Service` with `@type`, `name`, `description`, `provider` (ref to LocalBusiness), `areaServed`, `offers` (pricing)
3. `generateFAQ(items)` — returns `FAQPage` with `mainEntity` array of `Question` items
4. `generateReview(testimonial)` — returns `Review` with `reviewBody`, `itemReviewed`, `author`
5. `generateBreadcrumb(crumbs)` — returns `BreadcrumbList` with `itemListElement` array
6. `generateArticle(post)` — returns `Article` with `headline`, `datePublished`, `author`, `publisher`

All must include `@context: "https://schema.org"`.

**Input types** — define interfaces for each generator's params. These interfaces will be reused by content collection schemas in Story 1.3, so design them to align with the content data shape:
- Office: `{ name, address, phone, areaServed, ... }`
- Service: `{ serviceName, description, startingPrice, serviceArea, ... }`
- FAQ: `{ question, answer }[]`
- Testimonial: `{ serviceType, cost, message, author, ... }`
- Breadcrumb: `{ name, url }[]`
- Article: `{ title, publishedDate, author, description, url, ... }`

### Architecture Compliance — CRITICAL

- **Never hardcode** phone numbers or company data in any component — always import from `siteConfig.ts`
- **Naming:** camelCase for utility files (`siteConfig.ts`, `formatters.ts`, `schema.ts`)
- **TypeScript strict mode** — no `any`, explicit return types on all exported functions
- **No default exports** — use named exports only (Astro convention)
- **Schema.org functions** generate objects — pages handle serialization to `<script>` tags
- **Content field naming:** camelCase for all fields (`serviceName`, `startingPrice`, `serviceArea`, `imageAlt`)
- **Boolean fields** prefix with `is`/`has`: `isEmergency`, `hasFreeEstimate`

### Anti-Patterns — DO NOT

- Do NOT hardcode `0120-219-695` anywhere except `siteConfig.ts`
- Do NOT use `Intl.NumberFormat` with `style: 'currency'` — it produces `￥` (full-width) instead of `¥` (half-width)
- Do NOT inline JSON-LD in page templates — always use `schema.ts` generator functions
- Do NOT create React components or Astro components in this story — utils only
- Do NOT add testing frameworks — post-MVP per architecture spec
- Do NOT create content collection schemas — that's Story 1.3
- Do NOT create any pages or layouts — this story is utility files only

### Previous Story Intelligence (Story 1.1)

**Key learnings from Story 1.1:**
- Node.js v20.20.2 required Astro v5.18.1 (not v6+)
- Tailwind v4 installed via `@tailwindcss/vite` plugin, NOT legacy `@astrojs/tailwind`
- Root `vite` pinned to `^6.4.2` for Astro 5 / Vite 6 compatibility
- `@import "tailwindcss"` is the v4 syntax (not `@tailwind base/components/utilities`)
- `package.json` name is `star-light`, no engines constraint
- `src/pages/index.astro` imports `src/styles/global.css`
- `astro.config.mjs` uses `output: 'static'` with `@tailwindcss/vite` in `vite.plugins`

**Existing files from Story 1.1:**
- `astro.config.mjs`, `tailwind.config.mjs`, `tsconfig.json`
- `src/styles/global.css`, `src/pages/index.astro`
- `.env.example`, `package.json`

**What does NOT exist yet:** `src/utils/` directory — must create it.

### Project Structure Notes

- Files must be placed in `src/utils/` per architecture spec
- All 3 files are TypeScript (.ts extension)
- These utilities will be imported by every subsequent component and page
- siteConfig.ts is the single source of truth — Story 1.4+ (Header, Footer, CTABlock) will import from it
- schema.ts interfaces should align with content collection types defined in Story 1.3

### References

- [Source: _bmad-output/planning-artifacts/architecture.md — Utility Organization, Site Configuration Pattern, Schema.org JSON-LD Pattern, Naming Patterns, Enforcement Guidelines]
- [Source: _bmad-output/planning-artifacts/epics.md — Epic 1, Story 1.2]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md — Regional offices (Tokyo, Nagoya, Osaka, Hyogo), Navigation structure, Service categories]
- [Source: _bmad-output/planning-artifacts/architecture.md — Content Collection Field Naming (camelCase), Anti-Patterns]

## Dev Agent Record

### Agent Model Used

openai/gpt-5.4

### Debug Log References

- `npx astro check` requested installing `@astrojs/check`, so validation was completed with `npx tsc --noEmit`.
- `npx tsc --noEmit`

### Completion Notes List

- Created `src/utils/siteConfig.ts` as the single source of truth for site metadata, shared phone data, office records, navigation, and service categories.
- Added `src/utils/formatters.ts` with strict yen formatting helpers and Japanese date formatting with invalid-date guards.
- Added `src/utils/schema.ts` with typed JSON-LD generators for LocalBusiness, Service, FAQPage, Review, BreadcrumbList, and Article schemas.
- Used source navigation labels and starting-price patterns from `star-light15.net`; Tokyo and Hyogo office records use regional coverage labels where no street-level planning data existed.

### File List

- `src/utils/siteConfig.ts`
- `src/utils/formatters.ts`
- `src/utils/schema.ts`

### Change Log

- 2026-05-08: Implemented Story 1.2 utility modules and validated strict TypeScript compilation with `npx tsc --noEmit`.
