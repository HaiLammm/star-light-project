# Story 6.1: Implement Schema.org Structured Data on All Pages

Status: done

## Story

As a search engine,
I want valid Schema.org JSON-LD structured data on every page,
so that rich snippets appear in Google Japan search results.

## Acceptance Criteria

1. **Given** any page on the site **When** Google Rich Results Test validates the page **Then** zero errors are reported
2. **Given** the homepage or company pages render **Then** `generateLocalBusiness()` outputs valid LocalBusiness JSON-LD for all 4 regional offices (Tokyo, Nagoya, Osaka, Hyogo) with NAP consistency
3. **Given** a service detail page renders **Then** `generateService()` outputs valid Service JSON-LD with pricing, area served **And** `generateFAQ()` outputs valid FAQPage JSON-LD from page FAQ entries **And** `generateBreadcrumb()` outputs valid BreadcrumbList JSON-LD
4. **Given** the voice/testimonials page renders **Then** `generateReview()` outputs valid Review/AggregateRating JSON-LD
5. **Given** a blog post renders **Then** `generateArticle()` outputs valid Article JSON-LD with publishedDate
6. **And** all structured data generated via `src/utils/schema.ts` functions — never inline JSON-LD in page templates

## Tasks / Subtasks

- [x] Task 1: Audit all pages and identify missing JSON-LD (AC: #1, #6)
  - [x] 1.1 Map each page type to required schema types
  - [x] 1.2 Verify existing JSON-LD injection (homepage, office, breadcrumb)
- [x] Task 2: Add Service + FAQ + Breadcrumb JSON-LD to service detail pages (AC: #3)
  - [x] 2.1 Import and call `generateService()` in `src/pages/[category]/[service].astro`
  - [x] 2.2 Import and call `generateFAQ()` for service page FAQ entries
  - [x] 2.3 Verify Breadcrumb component already injects BreadcrumbList JSON-LD (it does)
- [x] Task 3: Add LocalBusiness JSON-LD to company pages (AC: #2)
  - [x] 3.1 Add JSON-LD to `src/pages/company/index.astro` (about page)
  - [x] 3.2 Verify `src/pages/company/office.astro` already has it (it does)
  - [x] 3.3 Add JSON-LD to `src/pages/company/philosophy.astro`
- [x] Task 4: Add Review JSON-LD to voice/testimonials pages (AC: #4)
  - [x] 4.1 Import and call `generateReview()` in `src/pages/voice/[...page].astro`
  - [x] 4.2 Consider adding AggregateRating schema (not yet in schema.ts — may need new function)
- [x] Task 5: Add Article JSON-LD to blog/column detail pages (AC: #5)
  - [x] 5.1 Import and call `generateArticle()` in `src/pages/columns/[...slug].astro`
- [x] Task 6: Add FAQ JSON-LD to standalone FAQ page (AC: #1)
  - [x] 6.1 Import and call `generateFAQ()` in `src/pages/faq.astro`
- [x] Task 7: Add JSON-LD to category hub pages (AC: #1)
  - [x] 7.1 Add LocalBusiness + FAQ JSON-LD to `src/pages/[category]/index.astro`
- [x] Task 8: Validate all pages with structured data testing (AC: #1)
  - [x] 8.1 Run `astro build` to confirm no build errors
  - [x] 8.2 Inspect HTML output for each page type to verify JSON-LD presence and validity

## Dev Notes

### Current State Analysis

**Already implemented:**
- `src/pages/index.astro` — Has `LocalBusiness` + `FAQPage` JSON-LD ✅
- `src/pages/company/office.astro` — Has `LocalBusiness` JSON-LD for all 4 offices ✅
- `src/components/Breadcrumb.astro` — Injects `BreadcrumbList` JSON-LD on every page that uses it ✅

**Missing (must add):**
- `src/pages/[category]/[service].astro` — Needs `Service` + `FAQPage` JSON-LD
- `src/pages/voice/[...page].astro` — Needs `Review` JSON-LD
- `src/pages/columns/[...slug].astro` — Needs `Article` JSON-LD
- `src/pages/faq.astro` — Needs `FAQPage` JSON-LD
- `src/pages/company/index.astro` — Needs `LocalBusiness` JSON-LD
- `src/pages/company/philosophy.astro` — Needs `LocalBusiness` JSON-LD
- `src/pages/[category]/index.astro` — Needs service-related JSON-LD

### Implementation Pattern

Follow the existing pattern in `src/pages/index.astro` — generate schema in frontmatter, inject via `<script type="application/ld+json">`.

### Architecture Constraints

- All JSON-LD MUST be generated via `src/utils/schema.ts` — never inline
- Site config data comes from `src/utils/siteConfig.ts`
- Content data comes from Astro content collections
- NAP consistency via `REGIONAL_OFFICES` from siteConfig

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 6.1]
- [Source: _bmad-output/planning-artifacts/architecture.md — Schema.org JSON-LD Pattern section]
- [Source: src/utils/schema.ts — all 6 generator functions]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (1M context)

### Debug Log References

- Build succeeded with no errors (only sitemap warning for missing `site` config)
- Verified JSON-LD counts: service page=3, company index=5, voice=11, homepage=2, blog detail=1+breadcrumb, faq=1+breadcrumb, category hub=5+FAQ+breadcrumb

### Completion Notes List

- Added Service + FAQPage JSON-LD to service detail pages via `generateService()` and `generateFAQ()`
- Added LocalBusiness JSON-LD (4 offices) to company/index, company/philosophy, and category hub pages
- Added Review JSON-LD for each testimonial on voice listing pages
- Added Article JSON-LD to blog detail pages with publishedDate and optional modifiedDate
- Added FAQPage JSON-LD to standalone FAQ page aggregating all categories
- Added LocalBusiness + FAQPage JSON-LD to category hub pages
- Task 4.2: Used individual Review JSON-LD per testimonial (not AggregateRating) as schema.ts only has generateReview()
- All JSON-LD generated via schema.ts utility functions — no inline JSON-LD
- Breadcrumb JSON-LD already handled by Breadcrumb.astro component on all pages

### Change Log

- 2026-05-22: Implemented Schema.org structured data across all page types (7 files modified)

### File List

- src/pages/[category]/[service].astro (modified — added Service + FAQ JSON-LD)
- src/pages/company/index.astro (modified — added LocalBusiness JSON-LD)
- src/pages/company/philosophy.astro (modified — added LocalBusiness JSON-LD)
- src/pages/voice/[...page].astro (modified — added Review JSON-LD)
- src/pages/columns/[...slug].astro (modified — added Article JSON-LD)
- src/pages/faq.astro (modified — added FAQPage JSON-LD)
- src/pages/[category]/index.astro (modified — added LocalBusiness + FAQ JSON-LD)

### Review Findings

_Code review 2026-05-29 (diff = commit 06b32c0, story's 7 files). 3 layers: Blind Hunter, Edge Case Hunter, Acceptance Auditor._

- [x] [Review][Patch] AC#4 Review schema not eligible for rich results — voice page emits up to 10 standalone `Review` nodes with no parent item / AggregateRating. RESOLVED via decision: add `generateAggregateRating()` to schema.ts and nest reviews under an item with aggregateRating. [src/utils/schema.ts, src/pages/voice/[...page].astro:1006]
- [x] [Review][Patch] JSON-LD `</script>` not escaped at injection sites — every `<script type="application/ld+json" set:html={JSON.stringify(...)} />` is unescaped; `JSON.stringify` does not escape `<`. Any FAQ answer, testimonial message, service description or article title containing `</script` breaks out of the tag (XSS / breaks all page JSON-LD). No guard in schema.ts either. [src/pages/[category]/[service].astro:263, src/pages/voice/[...page].astro:1024, all set:html sites]
- [x] [Review][Patch] Review schema drops the rating value — page never passes `ratingValue` to `generateReview()`, though testimonials carry a `rating` field; emitted Reviews have no `reviewRating` and produce no star snippet. [src/pages/voice/[...page].astro:1006]
- [x] [Review][Patch] Unguarded non-null assertion can crash the build — `philosophyEntry!.data` (added in this commit) throws if no company entry has `type === 'philosophy'`. Add a guard/fallback. [src/pages/company/philosophy.astro:32]
- [x] [Review][Defer] Homepage emits only Tokyo office (`REGIONAL_OFFICES[0]`) not all 4 — weakens AC#2 on homepage. Pre-existing, outside this story's diff. [src/pages/index.astro:132] — deferred, pre-existing
- [x] [Review][Defer] Tokyo & Hyogo LocalBusiness lack `postalCode`/`streetAddress` — may trigger Rich Results warnings (AC#1). siteConfig data, by-design/pre-existing. [src/utils/siteConfig.ts] — deferred, pre-existing
- [x] [Review][Defer] Empty `voice` collection would 404 `/voice/` — `paginate` emits no routes for an empty array; masked by fixtures. Latent, not caused by this change. [src/pages/voice/[...page].astro] — deferred, pre-existing
- [x] [Review][Defer] Canonical trailing-slash inconsistency across pages — `trailingSlash` unset (Astro default `ignore`) so low impact; pre-existing pattern. [multiple pages] — deferred, pre-existing
