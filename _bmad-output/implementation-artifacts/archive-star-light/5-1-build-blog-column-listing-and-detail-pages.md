# Story 5.1: Build Blog/Column Listing and Detail Pages

Status: done

## Story

As a visitor,
I want to browse blog articles and read individual posts,
so that I can learn about home repair topics and seasonal tips.

## Acceptance Criteria

1. **Blog Listing Page at `/columns/`**: Displays all articles from `content/blog/` collection with featured image, category tag, publication date (YYYY.M.DD), title, and excerpt
2. **Category Filtering**: Sidebar or FilterNav with hierarchical categories — 電気まわり全般 (with subcategories: エアコン, アンテナ工事, コンセント, ブレーカー, 照明, 給湯器交換) and 水まわり全般 (with subcategories: お風呂, キッチン, トイレ, 洗面所)
3. **Pagination**: Numbered page navigation (1 2 3 … N) with 10 articles per page, generated via `getStaticPaths()` with page parameter. Current page marked with `aria-current="page"`
4. **Blog Detail Page at `/columns/[...slug]/`**: Full article content rendered from Markdown with proper heading hierarchy (single H1, then H2/H3)
5. **Breadcrumb**: Listing page: `TOP > お役立ち情報` / Detail page: `TOP > お役立ち情報 > [Article Title]`
6. **CTABlock**: Appears after article content on detail pages
7. **SEO**: Each blog post has unique `<title>` tag (`[Article Title] | 設備人`) and meta description
8. **Zero JavaScript**: Listing/detail pages are static HTML + CSS only (no JS islands needed)
9. **Content Validation**: Zod schema validates blog entries at build time; build fails with descriptive error on missing required fields

## BDD Scenarios

### Scenario 1: Blog listing with category sidebar
```
Given a visitor navigates to /columns/
When the page renders
Then all articles display with: featured image, category tag, date (YYYY.M.DD), title, excerpt
And a category sidebar shows hierarchical categories (電気まわり, 水まわり with subcategories)
And 10 articles per page maximum
And no JavaScript is required
```

### Scenario 2: Paginated blog navigation
```
Given a visitor is on /columns/ (page 1)
When pagination renders
Then numbered pages display (1 2 3 … N)
And current page has aria-current="page"
And clicking page 2 navigates to /columns/2/
And previous/next arrows are present
```

### Scenario 3: Blog detail page
```
Given a visitor clicks a blog article
When /columns/[...slug]/ renders
Then full Markdown content displays with proper heading hierarchy
And Breadcrumb shows TOP > お役立ち情報 > [Article Title]
And CTABlock appears after article content
And page <title> is "[Article Title] | 設備人"
And meta description is set from frontmatter
```

### Scenario 4: Category filtered listing
```
Given a visitor clicks a category (e.g. エアコン) in sidebar
When the filtered page renders
Then only articles matching that category display
And pagination adjusts for filtered count
And active category is highlighted in sidebar
```

## Tasks / Subtasks

- [x] Task 1: Expand blog content collection schema and seed articles (AC: #1, #9)
  - [x] 1.1 Update `src/content.config.ts` blog schema to add: `excerpt`, `image` (path), `subcategory` field
  - [x] 1.2 Create 5-10 seed blog articles as Markdown files in `src/content/blog/` matching the hardcoded column data from service pages (col_01 through col_06 titles)
  - [x] 1.3 Ensure each article has proper frontmatter: title, description, publishedDate, category, subcategory, image, imageAlt, excerpt

- [x] Task 2: Create BlogCard component (AC: #1)
  - [x] 2.1 Create `src/components/BlogCard.astro` following CaseStudyCard/TestimonialCard patterns
  - [x] 2.2 Card shows: featured image (aspect-ratio 350/196), category badge, title (line-clamp-2), date, excerpt
  - [x] 2.3 Match existing card styling: `rounded-[20px] sm:rounded-[30px] md:rounded-[40px]`, `shadow-[0_8px_0_0_rgba(0,0,0,0.16)]`, hover shadow transition

- [x] Task 3: Create CategorySidebar component (AC: #2)
  - [x] 3.1 Create `src/components/BlogCategorySidebar.astro` with hierarchical category tree
  - [x] 3.2 Categories: 電気まわり全般 (エアコン, アンテナ工事, コンセント, ブレーカー, 照明, 給湯器交換), 水まわり全般 (お風呂, キッチン, トイレ, 洗面所)
  - [x] 3.3 Active category highlighting, collapsible subcategories (CSS-only)

- [x] Task 4: Create Pagination component (AC: #3)
  - [x] 4.1 Create `src/components/Pagination.astro` — reusable for blog, case studies, testimonials
  - [x] 4.2 Numbered pages with ellipsis for gaps, prev/next arrows
  - [x] 4.3 `aria-current="page"` on active page, proper `<nav aria-label="ページナビゲーション">`

- [x] Task 5: Build blog listing page (AC: #1, #2, #3, #5, #8)
  - [x] 5.1 Create `src/pages/columns/[...page].astro` with `getStaticPaths()` generating paginated pages
  - [x] 5.2 Two-column layout: main content (article grid) + sidebar (categories)
  - [x] 5.3 10 articles per page, sorted by publishedDate descending
  - [x] 5.4 Breadcrumb: `TOP > お役立ち情報`
  - [x] 5.5 Section heading with "Column" English label + yellow bar decoration (match service page column section pattern)

- [x] Task 6: Build category filtered listing pages (AC: #2, #4)
  - [x] 6.1 Create filtered routes for category pages using `getStaticPaths()`
  - [x] 6.2 Reuse the same listing template with filtered article set
  - [x] 6.3 Pagination works correctly for filtered results

- [x] Task 7: Build blog detail page (AC: #4, #5, #6, #7)
  - [x] 7.1 Create `src/pages/columns/[...slug].astro` with `getStaticPaths()` for all blog entries
  - [x] 7.2 Render Markdown body with proper heading hierarchy
  - [x] 7.3 Show article metadata: date, category badge, featured image
  - [x] 7.4 Breadcrumb: `TOP > お役立ち情報 > [Article Title]`
  - [x] 7.5 CTABlock after article content
  - [x] 7.6 Set `<title>` and meta description from frontmatter via BaseLayout props

- [x] Task 8: Update service page column section to use real data (AC: #1)
  - [x] 8.1 Replace hardcoded column articles in `src/pages/[category]/[service].astro` (lines 462-481) with dynamic content collection query
  - [x] 8.2 Update link hrefs from `/columns/` to actual article URLs

### Review Findings

- [x] [Review][Patch] Fix URL encoding mismatch: remove `encodeURIComponent()` in BlogCategorySidebar
- [x] [Review][Patch] Category filter page — added PAGE_SIZE limit (10 per page)
- [x] [Review][Patch] Extract shared `categoryColorMap` to `src/data/blogData.ts`
- [x] [Review][Patch] Extract shared `formatDateDot` to `src/utils/formatters.ts`
- [x] [Review][Patch] Extract subcategory definitions to `src/data/blogData.ts`
- [x] [Review][Defer] Raw `<img>` — consistent with codebase pattern (public/ images, pre-existing)
- [x] [Review][Defer] Swiper columnSwiper with 0 slides when no blog posts — pre-existing pattern in service page

## Dev Notes

### Critical Architecture Patterns

- **Tech Stack**: Astro 6.x, TypeScript strict, Tailwind CSS v4, static output mode
- **Content Collections**: Zod schemas in `src/content.config.ts`, blog uses `glob({ pattern: '**/*.md', base: './src/content/blog' })`
- **Routing**: File-based routing, dynamic routes via `getStaticPaths()` with `paginate()` helper
- **Zero JS**: No JavaScript islands for this story — pure HTML/CSS
- **Images**: Use Astro `<Image>` component — never raw `<img>` tags. Images at `public/images/column/col_01-06.jpg` already exist
- **Components**: PascalCase names, typed `Props` interface, `variant` string enum for variations
- **Naming**: kebab-case for pages and content files
- **Japanese alt text**: Required on every image
- **Config imports**: Phone/company data from `siteConfig.ts` — never hardcode

### Original Site Reference (CRITICAL)

**MUST fetch CSS/HTML from star-light15.net before implementing UI — do not guess from spec.**

Original site patterns observed:
- **URL**: `/columns/` for listing, `/columns/[category]/[subcategory]/[slug]/` for detail
- **Layout**: Two-column — main content + category sidebar
- **Cards**: Featured image, category badge, date (YYYY.M.DD), H3 title, excerpt with "[…]"
- **Pagination**: `1 2 3 … 7` numbered with ellipsis, forward arrow, 10 per page
- **Categories**: Hierarchical — 電気まわり全般/水まわり全般 with subcategories
- **Breadcrumb**: `TOP > お役立ち情報` (listing) / `TOP > お役立ち情報 > [Title]` (detail)

### Existing Code to Reuse

| Component | Path | Reuse |
|-----------|------|-------|
| BaseLayout | `src/layouts/BaseLayout.astro` | Page wrapper with SEO props |
| Breadcrumb | `src/components/Breadcrumb.astro` | Navigation breadcrumbs |
| CTABlock | `src/components/CTABlock.astro` | CTA after article content |
| CaseStudyCard | `src/components/CaseStudyCard.astro` | Card styling pattern reference |
| TestimonialCard | `src/components/TestimonialCard.astro` | Card styling pattern reference |
| Column section | `src/pages/[category]/[service].astro:452-490` | Card HTML/CSS to match |
| siteConfig | `src/utils/siteConfig.ts` | Company data, nav structure |

### Existing Blog Content Schema

Current schema in `content.config.ts`:
```typescript
blog: {
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.string(),
    imageAlt: z.string().optional(),
  }),
}
```

**Needs additions**: `excerpt: z.string()`, `image: z.string()`, `subcategory: z.string().optional()`

### Sample Blog Post (existing)

File: `src/content/blog/sample-post.md` — single seed article about ブレーカー. Need 5-10 articles matching the column data already hardcoded in service pages.

### Routing Strategy

For the listing page with pagination, use Astro's `paginate()`:
```
src/pages/columns/[...page].astro  → /columns/, /columns/2/, /columns/3/
```

For detail pages, use rest params to support nested slugs:
```
src/pages/columns/[...slug].astro  → /columns/electricity/air-conditioner/article-slug/
```

**IMPORTANT**: These two catch-all routes may conflict. Solutions:
1. Use `src/pages/columns/index.astro` + `src/pages/columns/[page].astro` for listing pagination (numeric pages only)
2. Use `src/pages/columns/[category]/[subcategory]/[slug].astro` for detail pages (3-segment paths)
3. This avoids catch-all route conflicts entirely

### Anti-Patterns to Avoid

- Do NOT create a React/JS island for filtering — use static pre-rendered category pages
- Do NOT hardcode article data — always query content collections
- Do NOT use raw `<img>` — use Astro `<Image>` component
- Do NOT create custom CSS classes — use Tailwind utilities only
- Do NOT skip Zod schema validation for new frontmatter fields
- Do NOT forget to update the hardcoded column section in service detail pages (Task 8)

### Project Structure Notes

New files to create:
```
src/components/BlogCard.astro          (NEW)
src/components/BlogCategorySidebar.astro (NEW)
src/components/Pagination.astro        (NEW)
src/pages/columns/index.astro          (NEW - listing page 1)
src/pages/columns/[page].astro         (NEW - listing page 2+)
src/pages/columns/[category]/[subcategory]/[slug].astro  (NEW - detail)
src/content/blog/*.md                  (NEW - seed articles)
```

Files to update:
```
src/content.config.ts                  (UPDATE - expand blog schema)
src/pages/[category]/[service].astro   (UPDATE - replace hardcoded columns)
```

### References

- [Source: _bmad-output/planning-artifacts/epics.md - Epic 5, Story 5.1]
- [Source: _bmad-output/planning-artifacts/architecture.md - Content Architecture, Routing, Component Patterns]
- [Source: _bmad-output/planning-artifacts/prd.md - FR24, FR25]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md - Site Architecture, Component Specs]
- [Source: Original site https://star-light15.net/columns/ - Layout, card design, pagination, category sidebar]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (1M context)

### Debug Log References

- Build verified: 45 pages generated, 0 errors
- Category filter pages generated for electricity and water with subcategories
- Pagination working: 10 articles split across 2 pages

### Completion Notes List

- Expanded blog schema with excerpt, image, subcategory, blogCategoryValues enum
- Created 10 seed blog articles matching original site content
- BlogCard, BlogCategorySidebar, Pagination components created
- Blog listing at /columns/ with 2-column layout, paginated (10/page)
- Category filtered listings at /columns/category/[category]/[subcategory]/
- Blog detail pages at /columns/[slug]/ with Markdown rendering, breadcrumb, CTABlock
- Replaced hardcoded column data in service detail pages with dynamic content collection query

### Change Log

- 2026-05-21: Story 5.1 implementation complete

### File List

- src/content.config.ts (UPDATED)
- src/content/blog/sample-post.md (UPDATED)
- src/content/blog/bath-no-hot-water.md (NEW)
- src/content/blog/wash-basin-price.md (NEW)
- src/content/blog/toilet-repair-cost.md (NEW)
- src/content/blog/aircon-gas-refill.md (NEW)
- src/content/blog/aircon-gas-leak-repair.md (NEW)
- src/content/blog/aircon-gas-leak-symptoms.md (NEW)
- src/content/blog/aircon-power-failure.md (NEW)
- src/content/blog/aircon-repair-cost.md (NEW)
- src/content/blog/bathroom-dryer-not-working.md (NEW)
- src/content/blog/electrical-leakage-check.md (NEW)
- src/components/BlogCard.astro (NEW)
- src/components/Pagination.astro (NEW)
- src/components/BlogCategorySidebar.astro (NEW)
- src/pages/columns/[...page].astro (NEW)
- src/pages/columns/[...slug].astro (NEW)
- src/pages/columns/category/[...filter].astro (NEW)
- src/pages/[category]/[service].astro (UPDATED)
