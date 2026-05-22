# Story 6.2: Implement Technical SEO (Sitemap, Robots, Meta Tags, Canonical URLs)

Status: review

## Story

As a search engine,
I want a complete sitemap, robots.txt, canonical URLs, and proper language/region tags,
so that all pages are discoverable and correctly indexed for Google Japan.

## Acceptance Criteria

1. **Given** the site is built **When** `sitemap.xml` is generated via `@astrojs/sitemap` **Then** it includes all pages with correct lastmod dates (FR35, NFR26)
2. **Given** `robots.txt` exists in `public/` **Then** it contains proper crawler directives allowing full site indexing and a `Sitemap:` directive pointing to `sitemap.xml`
3. **Given** any page renders **Then** `<link rel="canonical">` points to the correct absolute URL (FR38)
4. **Given** any page renders **Then** `<html lang="ja">` with UTF-8 charset is set (FR37)
5. **Given** any page renders **Then** `hreflang` tag for Japanese content is present: `<link rel="alternate" hreflang="ja" href="{canonical}" />` (FR37)
6. **Given** any page renders **Then** unique `<title>` tag with keyword + region (e.g. 「東京の水漏れ修理｜24時間対応」)
7. **Given** any page renders **Then** `<meta name="description">` under 120 characters with CTA
8. **Given** any page renders **Then** single `<h1>` per page with sequential heading hierarchy
9. **Given** any page renders **Then** clean URL structure: `/electricity/breaker`, `/pest-control/cockroach`
10. **Given** any page renders **Then** `<link rel="preconnect">` for Google Fonts and Maps

## Tasks / Subtasks

- [x] Task 1: Add `site` property to `astro.config.mjs` (AC: #1)
  - [x] 1.1 Add `site: 'https://star-light15.net'` to the defineConfig — this is REQUIRED for `@astrojs/sitemap` to generate absolute URLs in sitemap.xml
  - [x] 1.2 Verify `astro build` generates `dist/sitemap-index.xml` and `dist/sitemap-0.xml` with all pages listed
- [x] Task 2: Create `public/robots.txt` (AC: #2)
  - [x] 2.1 Create robots.txt with `User-agent: *`, `Allow: /`, and `Sitemap: https://star-light15.net/sitemap-index.xml`
- [x] Task 3: Ensure canonical URLs on ALL pages (AC: #3)
  - [x] 3.1 Audit every page file in `src/pages/` — most already pass `canonicalUrl` to BaseLayout. Find any that DON'T
  - [x] 3.2 For dynamic route pages (`[category]/[service].astro`, `[category]/index.astro`, `columns/[...slug].astro`, `voice/[...page].astro`, `case/[...page].astro`), verify canonical URL is constructed correctly with the resolved slug
  - [x] 3.3 Make canonical URL REQUIRED (not optional) in BaseLayout — remove the `?` from `canonicalUrl?: string` and ensure the conditional rendering `{canonicalUrl && ...}` becomes unconditional
- [x] Task 4: Add hreflang tag to BaseLayout (AC: #5)
  - [x] 4.1 Add `<link rel="alternate" hreflang="ja" href={canonicalUrl} />` in BaseLayout `<head>` — since this is a Japanese-only site, a single self-referencing hreflang is sufficient
  - [x] 4.2 Add `<link rel="alternate" hreflang="x-default" href={canonicalUrl} />` as fallback
- [x] Task 5: Audit page titles and meta descriptions (AC: #6, #7)
  - [x] 5.1 Review ALL page files for unique, keyword-rich `<title>` values — service pages should include service name + region (e.g. 「ブレーカー修理｜電気工事｜設備人」)
  - [x] 5.2 Check meta descriptions are under 120 chars with CTA (e.g. ending with 「24時間対応・お見積り無料」)
  - [x] 5.3 Fix any pages with generic or duplicate titles/descriptions
- [x] Task 6: Audit heading hierarchy (AC: #8)
  - [x] 6.1 Spot-check key page types (homepage, service detail, blog detail, company) to verify single H1 + sequential H2/H3
- [x] Task 7: Add preconnect for Google Maps (AC: #10)
  - [x] 7.1 BaseLayout already has preconnect for Google Fonts — add `<link rel="preconnect" href="https://maps.googleapis.com" />` if Google Maps embed is used on any page
- [x] Task 8: Build and validate (AC: #1, #2, #3)
  - [x] 8.1 Run `astro build` — verify sitemap-index.xml generated with all pages
  - [x] 8.2 Inspect a sample of built HTML files for canonical, hreflang, meta tags
  - [x] 8.3 Verify robots.txt is copied to dist/

## Dev Notes

### Current State Analysis

**Already implemented (DO NOT break):**
- `BaseLayout.astro` (line 27): Conditional canonical URL rendering — `{canonicalUrl && <link rel="canonical" href={canonicalUrl} />}`
- `BaseLayout.astro` (line 18): `<html lang="ja">` ✅
- `BaseLayout.astro` (lines 28-34): OG meta tags (locale, site_name, type, title, description, url, image) ✅
- `BaseLayout.astro` (lines 35-37): Google Fonts preconnect ✅
- Most pages already pass `canonicalUrl` using `SITE_CONFIG.siteUrl` + path pattern ✅
- `SITE_CONFIG.siteUrl` = `'https://star-light15.net'` in `src/utils/siteConfig.ts` ✅

**Missing (must add):**
- `astro.config.mjs`: No `site` property → sitemap generation produces relative URLs or warnings
- `public/robots.txt`: Does not exist
- `BaseLayout.astro`: No hreflang tags
- `BaseLayout.astro`: No preconnect for Google Maps
- Some pages may not pass `canonicalUrl` — needs audit

### Architecture Constraints

- Site URL MUST come from `SITE_CONFIG.siteUrl` (`src/utils/siteConfig.ts`) — never hardcode
- `astro.config.mjs` `site` property should match `SITE_CONFIG.siteUrl` exactly: `https://star-light15.net`
- `@astrojs/sitemap` is already installed as integration — just needs `site` property to work
- Static output mode (`output: 'static'`) means all pages are pre-rendered — sitemap can enumerate them all
- robots.txt goes in `public/` for static copy to `dist/`

### Key Files to Modify

| File | Action | What Changes |
|------|--------|-------------|
| `astro.config.mjs` | UPDATE | Add `site: 'https://star-light15.net'` |
| `public/robots.txt` | NEW | Create with User-agent, Allow, Sitemap directives |
| `src/layouts/BaseLayout.astro` | UPDATE | Add hreflang tags, make canonicalUrl required, add Maps preconnect |
| `src/pages/**/*.astro` | AUDIT | Verify all pass canonicalUrl; fix any missing |

### Previous Story Intelligence (6-1)

- Story 6-1 modified 7 page files to add Schema.org JSON-LD
- Pattern: import schema generator in frontmatter, inject via `<script type="application/ld+json">`
- Build succeeded with only sitemap warning about missing `site` config — this is exactly what Task 1 fixes
- All JSON-LD generated via `src/utils/schema.ts` — no inline
- Agent model: Claude Opus 4.6 (1M context)

### Testing Approach

1. `astro build` must succeed with zero errors
2. Check `dist/sitemap-index.xml` exists and references `sitemap-0.xml`
3. Check `dist/sitemap-0.xml` contains absolute URLs for all pages
4. Check `dist/robots.txt` exists with correct content
5. Inspect HTML of key pages (homepage, service detail, blog detail) for: canonical, hreflang, meta tags
6. Verify no duplicate or generic titles across pages

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 6.2]
- [Source: _bmad-output/planning-artifacts/architecture.md — SEO/NFR sections]
- [Source: src/layouts/BaseLayout.astro — current head tag implementation]
- [Source: astro.config.mjs — current integrations config]
- [Source: src/utils/siteConfig.ts — SITE_CONFIG.siteUrl]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (1M context)

### Debug Log References

- Build succeeded with zero errors after all changes
- Validation: 68 pages, 68 unique titles, 0 missing canonical, 0 missing hreflang
- sitemap-index.xml + sitemap-0.xml generated with absolute URLs for all pages
- robots.txt correctly copied to dist/

### Completion Notes List

- Added `site: 'https://star-light15.net'` to astro.config.mjs enabling proper sitemap generation
- Created public/robots.txt with User-agent, Allow, and Sitemap directives
- Added canonical URLs to 9 pages that were missing them (category hubs, service details, case/voice/columns listing+filter pages)
- Made canonicalUrl required (not optional) in BaseLayout Props interface
- Added hreflang="ja" and hreflang="x-default" self-referencing tags to BaseLayout
- Made og:url unconditional (was conditional on canonicalUrl presence)
- Added Google Maps preconnect to BaseLayout
- Fixed duplicate titles on paginated pages (columns, voice, case) by appending page number suffix

### Change Log

- 2026-05-22: Implemented technical SEO — sitemap, robots.txt, canonical URLs, hreflang, Maps preconnect, unique titles

### File List

- astro.config.mjs (modified — added site property)
- public/robots.txt (new — crawler directives + sitemap reference)
- src/layouts/BaseLayout.astro (modified — required canonicalUrl, hreflang tags, Maps preconnect, unconditional og:url)
- src/pages/[category]/index.astro (modified — added canonicalUrl)
- src/pages/[category]/[service].astro (modified — added canonicalUrl)
- src/pages/case/[...page].astro (modified — added SITE_CONFIG import, canonicalUrl, page number in title)
- src/pages/case/category/[...filter].astro (modified — added SITE_CONFIG import, canonicalUrl)
- src/pages/columns/[...page].astro (modified — added SITE_CONFIG import, canonicalUrl, page number in title)
- src/pages/columns/[...slug].astro (modified — added canonicalUrl)
- src/pages/columns/category/[...filter].astro (modified — added SITE_CONFIG import, canonicalUrl)
- src/pages/voice/[...page].astro (modified — added SITE_CONFIG import, canonicalUrl, page number in title)
- src/pages/voice/category/[...filter].astro (modified — added SITE_CONFIG import, canonicalUrl)
