# Story 3.5: Build Service Hub Pages

Status: review

## Story

As a visitor,
I want hub pages for each service category showing all available sub-services,
so that I can browse and compare options within water, electrical, or pest control categories.

## Acceptance Criteria

1. `/electricity` displays all 5 electrical services as ServiceCard grid with photo, name, starting price, and WEB discount badge; cards link to detail pages (`/electricity/breaker`, etc.)
2. `/water` displays all 4 water services as ServiceCard grid (FR11)
3. `/pest-control` displays all pest control services as ServiceCard grid (FR13)
4. All hub pages include Breadcrumb, CTABlock sections, and Footer
5. Card grid responsive: 1 col (mobile) -> 2 col (tablet) -> 3-4 col (desktop)
6. Each hub page has unique title tag with keyword + region for SEO
7. 24/7 availability messaging visible on all service pages (FR10)

## Current State

**IMPORTANT:** The hub page already exists at `src/pages/[category]/index.astro` (302 lines), created in commit `0c439e7`. This story is about **refining** the existing implementation to fully meet all ACs, not building from scratch.

### Gaps Between Current Implementation and ACs

| AC | Current State | Required Change |
|---|---|---|
| AC1: WEB discount badge on cards | Cards show price but NO WEB badge | Add WEB割引 badge to each service card |
| AC5: Responsive 1/2/3-4 cols | Currently `grid-cols-2 sm:grid-cols-3 md:grid-cols-5` | Change to `grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4` |
| AC6: SEO title with region | Title: `${label}のトラブルなら${company}【年中無休・即対応】` | Add region keywords (e.g., 東京・名古屋・広島) |
| AC7: 24/7 messaging visible | Only in meta title, not visible on page | Add visible 24時間365日対応 element |

## Tasks / Subtasks

- [x] Task 1: Fix service card grid responsiveness (AC: #5)
  - [x] Change grid classes from `grid-cols-2 sm:grid-cols-3 md:grid-cols-5` to `grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`
- [x] Task 2: Add WEB discount badge to service cards (AC: #1, #2, #3)
  - [x] Add a small WEB割引 badge (red/pink) to each service card, matching the style used in the price bar section
  - [x] Reference original site at star-light15.net for exact badge design
- [x] Task 3: Add region keywords to SEO title (AC: #6)
  - [x] Update `pageTitle` to include region: e.g., `${serviceLabel}のトラブルなら${companyName}｜東京・名古屋・広島【年中無休・即対応】`
  - [x] Update `pageDescription` similarly
- [x] Task 4: Add visible 24/7 availability messaging (AC: #7)
  - [x] Add `24時間365日・年中無休` badge/text in a prominent position (near KV or intro section)
  - [x] Reference original site for placement and style
- [x] Task 5: Visual QA against original site
  - [x] Fetch actual hub pages from star-light15.net to verify layout matches
  - [x] Run dev server and verify all 3 hub pages render correctly
  - [x] Test responsive behavior at mobile/tablet/desktop breakpoints

## Dev Notes

### File to Modify

- `src/pages/[category]/index.astro` — the only file that needs changes (all fixes are in this single file)

### Architecture Compliance

- **Stack:** Astro 6 SSG + Tailwind CSS v4 + TypeScript strict
- **Routing:** Dynamic `[category]/index.astro` with `getStaticPaths()` returning electricity, water, pest-control
- **Data source:** Service arrays from `src/utils/siteConfig.ts` (`ELECTRICITY_SERVICES`, `WATER_SERVICES`, `PEST_CONTROL_SERVICES`)
- **Components:** Uses `BaseLayout`, `Breadcrumb`, `FAQAccordion`, `CTABlock` — all already imported
- **Styling:** Tailwind utilities only, no custom CSS classes. Follow existing responsive patterns using `sm:`, `md:`, `lg:` prefixes

### Key Patterns from Existing Code

- Service objects have: `slug`, `label`, `href`, `description`, `startingPrice`
- Image mapping in `serviceImages` record keyed by category then slug
- Category-specific colors in `categoryColors` record
- Price bar already shows WEB割引 styling — reuse same badge pattern for cards
- Card styling: rounded corners (`rounded-[20px]`), shadow (`shadow-[0_8px_0_0_rgba(0,0,0,0.16)]`), hover transition

### UX Specs

- Card hover: subtle shadow increase, `transition: box-shadow 0.2s ease`, no transform/scale (already implemented)
- Colors: navy #1B2A4A, orange CTA #FF6B00, red badges #E53935, gray sections #F5F5F5
- Typography: Noto Sans JP, prices in Roboto
- Responsive breakpoints: 320px mobile → 768px md → 1024px lg → 1440px xl

### CRITICAL: Reference Original Site

Per project conventions, always fetch CSS/HTML from star-light15.net before implementing UI changes. Do NOT guess from spec. Check:
- `https://star-light15.net/electricity/` for electrical hub
- `https://star-light15.net/water/` for water hub

### Previous Story Intelligence

Story 3-4 established content collection schemas and dynamic routing. All 13 service JSON files exist in `src/content/services/`. The `[category]/[service].astro` detail pages are complete. Hub pages link to these detail pages via `s.href` from siteConfig.

### Project Structure Notes

- All changes are within the existing `src/pages/[category]/index.astro` file
- No new files or components needed
- No conflicts with project structure

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Epic-3, Story 3.5]
- [Source: _bmad-output/planning-artifacts/architecture.md#Routing, #Components]
- [Source: _bmad-output/planning-artifacts/ux-design.md#ServiceCard]

## Dev Agent Record

### Agent Model Used
Claude Opus 4.6 (1M context)

### Debug Log References
None needed — all changes applied cleanly.

### Completion Notes List
- Task 1: Changed grid from `grid-cols-2 sm:grid-cols-3 md:grid-cols-5` to `grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4` for proper responsive 1→2→3→4 column layout
- Task 2: Added red WEB割引 badge (#E53935) inline with price on each service card, using flex layout
- Task 3: Added region keywords (東京・名古屋・広島) to both pageTitle and pageDescription for SEO
- Task 4: Added visible 24/7 availability bar (navy #1B2A4A background) between KV and price bar sections with orange 24時間 badge and 365日年中無休 text
- Task 5: Verified against star-light15.net, build passes for all 3 hub pages (electricity, water, pest-control)

### File List
- `src/pages/[category]/index.astro` (modified)
