# Story 4.3: Build Company Pages

Status: done

## Story

As a visitor,
I want to view company information, philosophy, and office locations,
so that I can verify the company is legitimate and find my nearest office.

## Acceptance Criteria

1. **Given** a visitor navigates to `/company`
   **When** the page renders
   **Then** company overview page displays about information and philosophy summary (FR27)
   **And** links to sub-pages: philosophy and office

2. **Given** a visitor navigates to `/company/philosophy`
   **When** the page renders
   **Then** company philosophy content displays from `content/company/philosophy.json`

3. **Given** a visitor navigates to `/company/office`
   **When** the page renders
   **Then** office information displays for all 4 regional locations (Tokyo, Nagoya, Osaka, Hyogo) with addresses, phone numbers, and contact details (FR28)
   **And** office data sourced from `content/company/offices.json` collection AND `REGIONAL_OFFICES` from siteConfig

4. **Given** any company page
   **Then** all pages include Breadcrumb, CTABlock sections, and proper heading hierarchy
   **And** each page has a KV (Key Visual) banner section matching the contact page pattern (blue bg, h1 title, decorative English text)

## Tasks / Subtasks

- [x] Task 1: Create company content data files (AC: #1, #2, #3)
  - [x] Create `src/content/company/philosophy.json` with philosophy content
  - [x] Created `src/data/companyData.ts` with overview cards, philosophy data (heroSubheading, sectionTitle, sectionBody, 3 promises) — all content from original site
  - [x] Schema in `content.config.ts` already supports philosophy type — no changes needed
  - [x] Create `src/data/companyData.ts` with COMPANY_CARDS (4 cards matching original site) and PHILOSOPHY_DATA

- [x] Task 2: Build `/company` overview page (AC: #1, #4)
  - [x] Create `src/pages/company/index.astro`
  - [x] Include KV banner (blue bg pattern from contact.astro), Breadcrumb, company overview content
  - [x] Add 4-card grid linking to sub-pages (会社概要, 企業理念, 採用情報, 対応可能エリア)
  - [x] Include CTABlock variant="full-width" at bottom

- [x] Task 3: Build `/company/philosophy` page (AC: #2, #4)
  - [x] Create `src/pages/company/philosophy.astro`
  - [x] Load philosophy content from `src/data/companyData.ts`
  - [x] Include KV banner, Breadcrumb (TOP > 会社案内 > 企業理念), hero subheading, body text, 3 promises grid
  - [x] Include CTABlock variant="full-width" at bottom

- [x] Task 4: Build `/company/office` page (AC: #3, #4)
  - [x] Create `src/pages/company/office.astro`
  - [x] Display all 4 offices from `REGIONAL_OFFICES` in siteConfig with: office name, formatted address, phone number, area served (prefectures)
  - [x] Include KV banner, Breadcrumb (TOP > 会社案内 > 営業所一覧), office cards in 2-col grid
  - [x] Include CTABlock variant="full-width" at bottom
  - [x] Include Schema.org LocalBusiness JSON-LD for each office

- [x] Task 5: Verify build and navigation (AC: #1-4)
  - [x] Run `astro build` — verified no errors, build complete
  - [x] Verify all 3 pages generate: `/company/index.html`, `/company/philosophy/index.html`, `/company/office/index.html`
  - [x] Navigation link 会社案内 → /company already configured in siteConfig NAVIGATION
  - [x] Breadcrumb links configured on all 3 pages with correct hierarchy
  - [x] Heading hierarchy verified: single h1 in KV banner, h2 for sections, h3 for office names

### Review Findings

- [x] [Review][Decision] D1: AC2 — Fixed: philosophy.astro now loads from content collection `philosophy.json`
- [x] [Review][Decision] D2: AC1 — Fixed: added about overview + philosophy summary text to /company
- [x] [Review][Decision] D3: Fixed: removed dead links, kept only 企業理念 and 対応可能エリア cards
- [x] [Review][Patch] P1: Fixed: created placeholder images in `public/images/company/`
- [x] [Review][Patch] P2: Fixed: KV banner h1 responsive — `text-[28px] md:text-[48px]`, `ml-0 md:ml-[45px]`, decorative text `text-[60px] md:text-[120px]`
- [x] [Review][Patch] P3: Fixed: headings derive count from data (`promises.length`, `REGIONAL_OFFICES.length`)
- [x] [Review][Patch] P4: Fixed: card images now have `width={640} height={360}`
- [x] [Review][Patch] P5: Fixed: overlay div has `aria-hidden="true"`
- [x] [Review][Defer] W1: KV banner markup duplicate 3 file — nên extract component — deferred, pre-existing pattern
- [x] [Review][Defer] W2: Schema.org JSON-LD nên đặt trong `<head>` — deferred, functional as-is
- [x] [Review][Defer] W3: Tokyo/Hyogo office không có street address thực — deferred, data limitation
- [x] [Review][Defer] W4: Không có OG image cho company pages — deferred, not in scope
- [x] [Review][Defer] W5: Card title "対応可能エリア" vs page title "営業所一覧" inconsistent — deferred

## Dev Notes

### CRITICAL: Reference Original Site Before Implementing

Per project convention: **always fetch CSS/HTML from star-light15.net before implementing UI**. Check these pages on the original site:
- `https://star-light15.net/company` — company overview layout and content
- Look for philosophy and office sub-pages linked from company page

### Page Layout Pattern (from contact.astro)

All pages in this project follow this structure:
```
BaseLayout (title, description, canonicalUrl)
  └─ Breadcrumb (max-w-[1200px] mx-auto px-4 pt-4 pb-2)
  └─ KV Banner section (bg-[#0044f2] h-[240px] with h1 + decorative Roboto text)
  └─ Content sections
  └─ CTABlock variant="full-width"
```

KV banner pattern from `contact.astro`:
```astro
<section class="bg-[#0044f2] h-[240px] relative flex items-center overflow-hidden">
  <div class="max-w-[1200px] mx-auto px-4 w-full relative">
    <h1 class="text-[48px] font-black text-white ml-[45px]">会社案内</h1>
    <p class="font-[Roboto] text-[120px] font-bold text-white opacity-20 absolute top-1/2 left-[20px] -translate-y-1/2 capitalize">company</p>
  </div>
</section>
```

### Existing Infrastructure to Reuse

| Resource | Location | What it provides |
|----------|----------|-----------------|
| `REGIONAL_OFFICES` | `src/utils/siteConfig.ts:201-259` | All 4 offices with name, shortName, address, phone, areaServed, prefecturesServed |
| `SITE_CONFIG` | `src/utils/siteConfig.ts:187-199` | companyName (設備人), legalName (合同会社スターライト), phone, email, businessHours |
| `generateLocalBusiness()` | `src/utils/schema.ts:200-213` | Schema.org LocalBusiness JSON-LD for each office |
| `generateBreadcrumb()` | `src/utils/schema.ts:281-292` | Breadcrumb JSON-LD |
| `BaseLayout` | `src/layouts/BaseLayout.astro` | Page shell with Header, Footer, sticky CTA |
| `Breadcrumb` | `src/components/Breadcrumb.astro` | Breadcrumb nav with JSON-LD |
| `CTABlock` | `src/components/CTABlock.astro` | Full-width CTA with phone + email buttons |
| Content collection `company` | `src/content.config.ts:92-101` | Schema: type (office/philosophy/history), officeName, address, region, areaServed |

### Company Collection Schema — Current State

The current schema (`content.config.ts:92-101`) is minimal:
```ts
z.object({
  type: z.enum(['office', 'philosophy', 'history']),
  officeName: z.string().optional(),
  address: z.string().optional(),
  region: z.string().optional(),
  areaServed: z.array(z.string()).optional(),
})
```

For philosophy content, you may need to either:
1. Extend the schema to include `title`, `content`/`sections` fields for philosophy type
2. OR use a simple data file in `src/data/` instead of the content collection (simpler approach — recommended since philosophy is a single page, not a collection)

### Office Data Strategy

`REGIONAL_OFFICES` in siteConfig already has all 4 offices with complete data. The content collection `offices.json` only has Osaka. **Use `REGIONAL_OFFICES` from siteConfig as the primary data source** for the office page — it's already complete and typed.

### Breadcrumb Patterns

- `/company` → `[{label: 'TOP', href: '/'}, {label: '会社案内', href: '/company'}]`
- `/company/philosophy` → `[{label: 'TOP', href: '/'}, {label: '会社案内', href: '/company'}, {label: '企業理念', href: '/company/philosophy'}]`
- `/company/office` → `[{label: 'TOP', href: '/'}, {label: '会社案内', href: '/company'}, {label: '営業所一覧', href: '/company/office'}]`

### Navigation — Already Configured

`NAVIGATION` in siteConfig already has `{label: '会社案内', href: '/company'}` — no navigation changes needed.

### Original Site Sub-Pages

From the original site, the company section links include:
- 会社概要 (Company overview) — `/company`
- 企業理念 (Corporate philosophy) — `/company/philosophy`
- 対応エリア (Service area) — covered by office page
- 採用ページ (Recruitment) — out of scope for this story
- 協力会社募集 (Partner recruitment) — out of scope for this story

### Content to Create for Philosophy Page

Since no philosophy content exists yet, create a data file with placeholder Japanese content matching the company's service philosophy. Base it on the existing site messaging:
- 24時間365日対応 (24/7 availability)
- 事前見積もり (Prior estimates)
- 地域密着型サービス (Community-based service)

### Previous Story Intelligence (4.2)

Key patterns established:
- KV banner with blue bg and decorative Roboto text (from contact.astro)
- Max-width container: `max-w-[1200px] mx-auto px-4`
- Section padding: `py-[80px] md:py-[120px]` (verified in contact.astro)
- Phone number always from `SITE_CONFIG.phone`, never hardcoded
- `canonicalUrl` prop always set on BaseLayout

### Architecture Compliance

- **Zero JS pages**: Company pages are static content — use only Astro components, no React islands needed
- **Content from data files**: Philosophy and overview text from JSON/TS data files, not hardcoded in templates
- **Schema.org**: Include `generateLocalBusiness()` JSON-LD on the office page for all 4 regional offices
- **Responsive**: All pages must work on mobile (check original site for mobile layout)
- **Accessibility**: Semantic heading hierarchy (h1 in KV, h2 for sections), proper landmarks

### File Structure

```
src/pages/company/
├── index.astro          # Company overview (NEW)
├── philosophy.astro     # Philosophy page (NEW)
└── office.astro         # Office locations (NEW)

src/data/
└── companyData.ts       # Overview and philosophy content (NEW)
```

### References

- [Source: epics.md#Story 4.3] — Story requirements and BDD acceptance criteria
- [Source: architecture.md#Page Structure] — Company page file locations
- [Source: siteConfig.ts#REGIONAL_OFFICES] — Complete office data for all 4 locations
- [Source: siteConfig.ts#NAVIGATION] — Navigation already links to /company
- [Source: schema.ts#generateLocalBusiness] — Schema.org for office pages
- [Source: content.config.ts#company] — Content collection schema for company type
- [Source: contact.astro] — Reference implementation for KV banner and page structure
- [Source: prd.md#FR27] — Company overview requirement
- [Source: prd.md#FR28] — Office information requirement

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (1M context)

### Debug Log References

- Build verified: `astro build` completes with 0 errors
- All 3 pages generate: /company/index.html, /company/philosophy/index.html, /company/office/index.html
- Schema.org LocalBusiness JSON-LD included for all 4 regional offices on office page

### Completion Notes List

- Created `src/data/companyData.ts` with typed data: COMPANY_CARDS (4 navigation cards matching original site), PHILOSOPHY_DATA (hero subheading, section title/body from original site, 3 customer promises)
- Created `src/content/company/philosophy.json` for content collection compatibility
- Company overview page (`/company`) displays 4-card grid with image overlays linking to sub-pages
- Philosophy page (`/company/philosophy`) has yellow hero subheading banner, body text, and 3-promise grid (numbered circles)
- Office page (`/company/office`) displays all 4 offices in 2-col card grid with dl/dt/dd layout for address, phone, hours, and prefecture tags
- All pages follow established patterns: KV banner (blue #0044f2, Roboto decorative text), Breadcrumb, CTABlock full-width
- Zero JS — all pages are pure Astro static content, no React islands
- Phone numbers sourced from SITE_CONFIG/REGIONAL_OFFICES, never hardcoded
- Original site fetched and referenced for content accuracy (philosophy text, card structure, office data)

### Change Log

- 2026-05-21: Story 4.3 implementation — built company overview, philosophy, and office pages

### File List

- `src/data/companyData.ts` (NEW)
- `src/content/company/philosophy.json` (NEW)
- `src/pages/company/index.astro` (NEW)
- `src/pages/company/philosophy.astro` (NEW)
- `src/pages/company/office.astro` (NEW)
