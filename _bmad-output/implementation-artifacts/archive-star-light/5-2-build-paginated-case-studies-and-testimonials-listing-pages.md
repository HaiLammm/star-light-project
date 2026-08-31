# Story 5.2: Build Paginated Case Studies and Testimonials Listing Pages

Status: done

## Story

As a visitor,
I want to browse all case studies and testimonials with pagination and filtering,
so that I can find relevant examples for my specific service need.

## Acceptance Criteria

1. **Case Studies Listing at `/case/`**: Displays all case studies from `content/cases/` collection using `CaseStudyCard` with photo, category tag, location, duration, and cost
2. **Testimonials Listing at `/voice/`**: Displays all testimonials from `content/testimonials/` using `TestimonialCard` with service type, cost, customer message, and `<blockquote>`+`<cite>` semantic markup
3. **FilterNav**: Category filter links on both pages — 電気まわり全般 (ブレーカー, コンセント, 照明, アンテナ工事, 給湯器交換) + 水まわり全般 (トイレ, キッチン, お風呂, 洗面所) with `aria-current="page"` on active filter
4. **Pagination**: Numbered pages (1 2 3 … N) via `getStaticPaths()` + `paginate()`, reusing existing `Pagination.astro` component
5. **Card Hover**: Subtle shadow increase only, `transition: box-shadow 0.2s ease`, no transform/scale (UX-DR11)
6. **Breadcrumb**: Case: `TOP > 施工事例` / Voice: `TOP > お客様の声`
7. **Page Heading**: Case page h1 = "施工事例" with decorative English subtitle "Case" / Voice page h1 = "お客様の声" with subtitle "Voice"
8. **SEO**: Proper `<title>` and meta description for both listing pages
9. **Zero JavaScript**: Static HTML + CSS only, no JS islands
10. **Content Validation**: Existing Zod schemas validate entries at build time

## BDD Scenarios

### Scenario 1: Case studies listing with filter
```
Given a visitor navigates to /case/
When the page renders
Then CaseStudyCards display all cases with: photo, category tag, location, duration, cost
And FilterNav shows category filters (電気まわり, 水まわり with subcategories)
And pagination appears if more than PAGE_SIZE items
And no JavaScript is required
```

### Scenario 2: Testimonials listing with filter
```
Given a visitor navigates to /voice/
When the page renders
Then TestimonialCards display all testimonials with: service type, cost, message
And testimonial content uses <blockquote> with <cite>
And FilterNav and Pagination work identically to case studies
```

### Scenario 3: Category filtered listing
```
Given a visitor clicks a category filter (e.g. トイレ) on /case/
When the filtered page renders
Then only case studies matching that serviceSlug display
And pagination adjusts for filtered count
And active filter has aria-current="page"
```

### Scenario 4: Paginated navigation
```
Given more than PAGE_SIZE items exist
When pagination renders
Then numbered pages display (1 2 3 … N)
And current page has aria-current="page"
And clicking page 2 navigates to /case/2/ (or /voice/2/)
```

## Tasks / Subtasks

- [x] Task 1: Create FilterNav component (AC: #3)
  - [x] 1.1 Create `src/components/FilterNav.astro` with props: `baseUrl`, `filterBasePath`, `activeFilter?`, `categories`
  - [x] 1.2 Category structure: 電気まわり全般 (subcategories mapped to serviceSlug values) + 水まわり全般 (subcategories mapped to serviceSlug values)
  - [x] 1.3 "すべて" (All) link as first filter option, links to base listing URL
  - [x] 1.4 Active filter highlighted with `aria-current="page"`
  - [x] 1.5 Style as horizontal pill/tab navigation matching original site pattern

- [x] Task 2: Update testimonials schema for missing fields (AC: #2)
  - [x] 2.1 Add `title: z.string().optional()` and `duration: z.string().optional()` to testimonials schema in `content.config.ts`
  - [x] 2.2 Verify all 7 existing testimonial JSON files pass validation with updated schema

- [x] Task 3: Add case study images for cases 6-9 (AC: #1)
  - [x] 3.1 Only `case_01.jpg` through `case_05.jpg` existed in `public/images/cases/`
  - [x] 3.2 Created placeholder images for case_06 through case_09 (copied from case_01.jpg)
  - [x] 3.3 Image mapping: `getCaseImageSrc()` in `src/data/caseVoiceData.ts` converts case-001 → case_01.jpg

- [x] Task 4: Build case studies listing page (AC: #1, #3, #4, #6, #7, #8, #9)
  - [x] 4.1 Create `src/pages/case/[...page].astro` with `getStaticPaths()` + `paginate()`
  - [x] 4.2 Query `getCollection('cases')` sorted by `publishedDate` descending
  - [x] 4.3 Layout: `BaseLayout` > `Breadcrumb (TOP > 施工事例)` > heading section > FilterNav > card grid > Pagination
  - [x] 4.4 Heading: h1 "施工事例" with decorative English "Case" ghost text
  - [x] 4.5 Card grid: responsive 2-col grid matching blog listing layout
  - [x] 4.6 Pass `baseUrl="/case"` to Pagination component
  - [x] 4.7 Set page title: `施工事例 | 設備人` and meta description

- [x] Task 5: Build case studies category filter pages (AC: #3)
  - [x] 5.1 Create `src/pages/case/category/[...filter].astro` with `getStaticPaths()`
  - [x] 5.2 Filter by `serviceSlug` field from case frontmatter
  - [x] 5.3 Generate pages for each serviceSlug value (toilet, bath, washroom, lighting, antenna, water-heater)
  - [x] 5.4 Reuse same layout template, pass active filter to FilterNav
  - [x] 5.5 Pagination works for filtered results

- [x] Task 6: Build testimonials listing page (AC: #2, #3, #4, #6, #7, #8, #9)
  - [x] 6.1 Create `src/pages/voice/[...page].astro` with `getStaticPaths()` + `paginate()`
  - [x] 6.2 Query `getCollection('testimonials')` — uses insertion order
  - [x] 6.3 Layout identical to case studies: BaseLayout > Breadcrumb (TOP > お客様の声) > heading > FilterNav > card grid > Pagination
  - [x] 6.4 Heading: h1 "お客様の声" with decorative English "Voice" ghost text
  - [x] 6.5 Pass `baseUrl="/voice"` to Pagination
  - [x] 6.6 Set page title: `お客様の声 | 設備人`

- [x] Task 7: Build testimonials category filter pages (AC: #3)
  - [x] 7.1 Create `src/pages/voice/category/[...filter].astro` with `getStaticPaths()`
  - [x] 7.2 Filter by `serviceCategory` field (electricity, water)
  - [x] 7.3 Reuse same layout, pass active filter to FilterNav
  - [x] 7.4 Pagination works for filtered results

- [x] Task 8: Verify build and cross-check (AC: all)
  - [x] 8.1 Run `astro build` — all pages generate without errors
  - [x] 8.2 CaseStudyCard and TestimonialCard render correctly with collection data
  - [x] 8.3 FilterNav active state works on category pages
  - [x] 8.4 Pagination baseUrl generates correct hrefs

### Review Findings

- [x] [Review][Decision] Missing case filter subcategories — Added breaker, outlet, kitchen to CASE_FILTER_CATEGORIES and CASE_SLUG_LABEL_MAP [src/data/caseVoiceData.ts]
- [x] [Review][Patch] TestimonialCard missing `<blockquote>`+`<cite>` semantic markup — Replaced `<p>` with `<blockquote>`+`<cite>` for customer messages [src/components/TestimonialCard.astro]
- [x] [Review][Patch] Category filter pages — Removed manual slice, showing all filtered items (matches blog category pattern); removed orphaned pest-control page [src/pages/case/category/[...filter].astro, src/pages/voice/category/[...filter].astro]
- [x] [Review][Patch] `pest-control` voice category page removed — Only electricity and water categories generated [src/pages/voice/category/[...filter].astro]
- [x] [Review][Dismiss] Voice listing sort — Testimonials have no publishedDate field, insertion order is correct behavior
- [x] [Review][Defer] `entry: any` type annotations bypass TypeScript safety — all 4 listing pages use `any` in `.map()` calls, losing compile-time checking [multiple files] — deferred, low risk for static site with Zod validation

## Dev Notes

### Critical Architecture Patterns

- **Tech Stack**: Astro 6.x, TypeScript strict, Tailwind CSS v4, static output mode
- **Content Collections**: Zod schemas in `src/content.config.ts`; cases use `.md` files, testimonials use `.json` files
- **Routing**: File-based, dynamic routes via `getStaticPaths()` with `paginate()` helper
- **Zero JS**: No JavaScript islands — pure HTML/CSS
- **Components**: PascalCase names, typed `Props` interface
- **Config imports**: Phone/company data from `siteConfig.ts`

### Original Site Reference (CRITICAL)

**MUST fetch CSS/HTML from star-light15.net before implementing UI — do not guess from spec.**

Original site patterns observed:
- **Case URL**: `/case` with pagination `/case/page/2/`
- **Voice URL**: `/voice` with pagination `/voice/page/2/`
- **Heading**: "施工事例" (Case) / "お客様の声" (Voice) with descriptive subtitle
- **Filter**: Horizontal category pills — 電気まわり全般 / 水まわり全般 with subcategory buttons
- **Cards**: Image thumbnail + category/location badges + title + stats bar (作業時間 / 作業料金)
- **Pagination**: `1 2 3` numbered with forward arrow
- **Breadcrumb**: `TOP > 施工事例` / `HOME > お客様の声`

### Existing Components to Reuse

| Component | Path | Usage |
|-----------|------|-------|
| BaseLayout | `src/layouts/BaseLayout.astro` | Page wrapper with SEO props |
| Breadcrumb | `src/components/Breadcrumb.astro` | Navigation breadcrumbs |
| CaseStudyCard | `src/components/CaseStudyCard.astro` | Case study cards — accepts: title, serviceCategory, categoryLabel, location, duration, cost, description, imageSrc, imageAlt, slug |
| TestimonialCard | `src/components/TestimonialCard.astro` | Testimonial cards — accepts: serviceType, serviceCategory, title?, duration?, cost, message, authorInitial, location?, imageSrc, imageAlt |
| Pagination | `src/components/Pagination.astro` | Numbered pagination — accepts: currentPage, totalPages, baseUrl |
| CTABlock | `src/components/CTABlock.astro` | CTA section (optional, add at bottom) |

### Content Collection Schemas (Current State)

**Cases** (`src/content/cases/*.md`): title, serviceCategory (enum), serviceSlug, location, duration (string), cost (number), imageAlt, publishedDate
- 9 files exist: case-001.md through case-009.md
- Images: `public/images/cases/case_01.jpg` through `case_05.jpg` (only 5 images for 9 cases)

**Testimonials** (`src/content/testimonials/*.json`): serviceType, serviceCategory (enum), cost, message, authorInitial, location?, rating?
- 7 files exist: testimonial-001.json through testimonial-007.json
- **Schema gap**: Data files include `title` and `duration` fields not in schema — update schema to add these as optional fields
- No dedicated testimonial images exist

### CaseStudyCard Image Mapping

Cards require `imageSrc` prop. Cases don't have `imageSrc` in schema. Derive from case file ID:
- case-001.md → `/images/cases/case_01.jpg`
- case-002.md → `/images/cases/case_02.jpg`
- Pattern: replace `case-` prefix, zero-pad to 2 digits with underscore format

For cases 006-009 without images: use a generic placeholder or duplicate an existing image.

### TestimonialCard Image Mapping

TestimonialCard also requires `imageSrc` prop. Testimonials have no image field.
- Use a generic customer avatar/placeholder image for all testimonials
- Or use case images as fallbacks based on matching serviceCategory

### FilterNav Category-to-ServiceSlug Mapping

The FilterNav must map display categories to content collection filter values:

| Display Name | Filter Field (cases) | Filter Field (testimonials) |
|---|---|---|
| すべて | (no filter) | (no filter) |
| トイレ | serviceSlug: "toilet" | serviceCategory: "water" |
| キッチン | serviceSlug: "kitchen" | serviceCategory: "water" |
| お風呂 | serviceSlug: "bath" | serviceCategory: "water" |
| 洗面所 | serviceSlug: "washbasin" | serviceCategory: "water" |
| ブレーカー | serviceSlug: "breaker" | serviceCategory: "electricity" |
| コンセント | serviceSlug: "outlet" | serviceCategory: "electricity" |
| 照明 | serviceSlug: "lighting" | serviceCategory: "electricity" |
| アンテナ工事 | serviceSlug: "antenna" | serviceCategory: "electricity" |
| 給湯器交換 | serviceSlug: "water-heater" | serviceCategory: "electricity" |

Note: Testimonials only have `serviceCategory` (broad), not `serviceSlug` (specific). Filter at category level for testimonials.

### Listing Page Pattern (from Story 5.1)

Follow `src/pages/columns/[...page].astro` exactly:
- `getStaticPaths()` with `paginate(allItems, { pageSize: PAGE_SIZE })`
- `const PAGE_SIZE = 10;`
- Destructure `const { page } = Astro.props;`
- `page.data` contains current page items
- `page.currentPage` and `page.lastPage` for Pagination props
- Two-column layout not needed here (no sidebar like blog) — just card grid + FilterNav above

### Anti-Patterns to Avoid

- Do NOT create React/JS islands for filtering — use static pre-rendered filter pages
- Do NOT hardcode case/testimonial data — always query content collections
- Do NOT create new card components — reuse existing CaseStudyCard and TestimonialCard
- Do NOT use raw `<img>` — derive image paths and pass as props
- Do NOT forget to handle the image mapping for cases without images (006-009)
- Do NOT create a separate listing + detail page — this story is listing only (detail pages already linked from homepage/service pages)
- Do NOT change the existing CaseStudyCard/TestimonialCard link hrefs from `/case` and `/voice` — those are correct for the listing pages

### Previous Story (5.1) Intelligence

- Blog listing pattern established at `src/pages/columns/[...page].astro` — follow this exact pattern
- Category filter pages use `/columns/category/[...filter].astro` — follow same structure for `/case/category/` and `/voice/category/`
- `Pagination.astro` component already created and working — reuse directly
- `BlogCategorySidebar.astro` was created for blog — FilterNav for case/voice is different (horizontal pills, not sidebar tree)
- `formatPrice` utility exists in `src/utils/formatters.ts` — already used by CaseStudyCard
- Review findings: `encodeURIComponent` removed from category filter URLs, shared data extracted to `src/data/blogData.ts`

### Project Structure Notes

New files to create:
```
src/components/FilterNav.astro                    (NEW)
src/pages/case/[...page].astro                    (NEW)
src/pages/case/category/[...filter].astro         (NEW)
src/pages/voice/[...page].astro                   (NEW)
src/pages/voice/category/[...filter].astro        (NEW)
```

Files to update:
```
src/content.config.ts                             (UPDATE - add title, duration to testimonials schema)
```

### References

- [Source: _bmad-output/planning-artifacts/epics.md - Epic 5, Story 5.2]
- [Source: _bmad-output/planning-artifacts/architecture.md - Content Architecture, Pages, Components]
- [Source: _bmad-output/planning-artifacts/prd.md - FR20, FR21, FR40, FR41]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md - CaseStudyCard, TestimonialCard, FilterNav, Pagination specs]
- [Source: Original site https://star-light15.net/case - Case listing layout, filter, pagination]
- [Source: Original site https://star-light15.net/voice - Voice listing layout, filter, pagination]
- [Source: Story 5.1 - Blog listing pattern, Pagination component, category filter routing]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (1M context)

### Debug Log References

- Build verified: all pages generated, 0 errors
- Case listing: /case/ with 9 cases, filter pages for 6 serviceSlug values
- Voice listing: /voice/ with 7 testimonials, filter pages for electricity and water categories

### Completion Notes List

- Created FilterNav.astro reusable component with horizontal pill-style category filters
- Created caseVoiceData.ts shared data module with filter categories, label maps, and image mapping functions
- Updated testimonials schema: added optional title and duration fields
- Created placeholder images for cases 06-09
- Built case listing at /case/ with pagination (10/page), FilterNav, breadcrumb, CTABlock
- Built case category filters at /case/category/[serviceSlug]/
- Built voice listing at /voice/ with pagination, FilterNav, breadcrumb, CTABlock
- Built voice category filters at /voice/category/[serviceCategory]/

### Change Log

- 2026-05-22: Story 5.2 implementation complete

### File List

- src/components/FilterNav.astro (NEW)
- src/data/caseVoiceData.ts (NEW)
- src/pages/case/[...page].astro (NEW)
- src/pages/case/category/[...filter].astro (NEW)
- src/pages/voice/[...page].astro (NEW)
- src/pages/voice/category/[...filter].astro (NEW)
- src/content.config.ts (UPDATED)
- public/images/cases/case_06.jpg (NEW - placeholder)
- public/images/cases/case_07.jpg (NEW - placeholder)
- public/images/cases/case_08.jpg (NEW - placeholder)
- public/images/cases/case_09.jpg (NEW - placeholder)
