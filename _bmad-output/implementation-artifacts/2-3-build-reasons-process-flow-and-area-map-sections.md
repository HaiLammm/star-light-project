# Story 2.3: Build Reasons, Process Flow, and Area Map Sections

Status: review

## Story

As a visitor,
I want to see why I should choose this service, how the process works, and which areas are covered,
So that I feel confident about the service quality, know what to expect, and can verify my area is served.

## Acceptance Criteria

1. **Given** a visitor scrolls through the homepage **When** the reasons section renders **Then** ReasonsGrid displays 4 columns (desktop) / 2 (tablet) / 1 (mobile) with SVG icon + heading + description per cell (speed, free estimates, 24/7, qualified staff)
2. SVG icons have `aria-hidden="true"`, meaning conveyed by text only
3. 24/7 availability messaging (「24時間365日対応」) is visible (FR10)
4. **When** the process flow section renders **Then** ProcessFlow displays 5 numbered steps (相談→訪問→見積→作業→支払) with illustrations and descriptions
5. Layout is horizontal on desktop, vertical on mobile
6. Uses `<ol>` with step numbers in text for accessibility
7. **When** the area map section renders **Then** AreaMap displays static map image + prefecture/city lists for Tokyo, Nagoya, Osaka, Hyogo
8. Map image has detailed Japanese alt text describing service coverage
9. Google Maps embed (if used) loads without blocking page render (NFR24)

## Tasks / Subtasks

- [x] Task 1: Download/create assets from star-light15.net (AC: #1, #4, #7)
  - [x] Fetch reasons section from production site — extract SVG icons (speed, free estimates, 24/7, qualified staff)
  - [x] Save SVG icons to `public/images/icons/` directory
  - [x] Fetch process flow section — download step illustration images
  - [x] Save step images to `public/images/icons/` or `public/images/process/`
  - [x] Download static area map image from production site
  - [x] Save map to `public/images/map/` directory
- [x] Task 2: Create ReasonsGrid.astro component (AC: #1, #2, #3)
  - [x] Define reasons data array: 4 items (speed, free estimates, 24/7, qualified staff) with icon path, heading, description
  - [x] Render 4-column grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`
  - [x] Each cell: SVG icon (aria-hidden="true") + heading + description text
  - [x] Include 「24時間365日対応」 messaging prominently
  - [x] Alternating section background (`--bg-section`: #F5F5F5 ~ #F8F8F8)
- [x] Task 3: Create ProcessFlow.astro component (AC: #4, #5, #6)
  - [x] Define 5 steps data: 相談(consultation)→訪問(visit)→見積(estimate)→作業(work)→支払(payment)
  - [x] Use semantic `<ol>` with step numbers visible in text
  - [x] Horizontal layout desktop (flex-row), vertical mobile (flex-col)
  - [x] Step illustration image + number + title + description per step
  - [x] Arrow/connector between steps (CSS only, hidden on mobile or replaced with vertical line)
- [x] Task 4: Create AreaMap.astro component (AC: #7, #8, #9)
  - [x] Static map PNG image with Japanese alt text (e.g., "設備人のサービス対応エリア：東京・名古屋・大阪・兵庫")
  - [x] Prefecture/city lists from `REGIONAL_OFFICES` in siteConfig.ts — 4 regions
  - [x] Each region: office name + list of `prefecturesServed` and `areaServed` cities
  - [x] Optional: Google Maps embed via `<iframe>` with `loading="lazy"` to not block render
- [x] Task 5: Integrate into index.astro (AC: all)
  - [x] Import ReasonsGrid, ProcessFlow, AreaMap
  - [x] Add below ServiceCategorySection blocks in order: ReasonsGrid → ProcessFlow → AreaMap
  - [x] Section spacing: 60-80px vertical padding (UX-DR17)
- [x] Task 6: Visual QA against star-light15.net (AC: all)
  - [x] Compare reasons grid layout, icons, text against production
  - [x] Compare process flow layout and step illustrations
  - [x] Compare area map section layout and city lists

## Dev Notes

### Architecture Compliance

- **Component type:** Astro `.astro` (server-rendered, zero JS) — NOT React islands
- **Data source:** ReasonsGrid and ProcessFlow use local data arrays (no content collection). AreaMap imports `REGIONAL_OFFICES` from `src/utils/siteConfig.ts`
- **Styling:** Tailwind utilities only, no `@apply`, no scoped `<style>` blocks
- **Images:** Use `<img>` with explicit `width`, `height`, `alt` for public/ assets (Astro `<Image>` cannot optimize public/ dir images — deferred concern from Story 2.2)
- **Phone number:** If any CTA appears, import from `SITE_CONFIG.phone` — never hardcode
- **Section backgrounds:** Use alternating bg colors for visual separation: `--bg-section` (#F5F5F5) for reasons and process flow sections

### Component Reusability

These components are reused across the site (not just homepage):
- `ReasonsGrid` — homepage + all service detail pages
- `ProcessFlow` — homepage + service detail pages + `/flow` page
- `AreaMap` — service detail pages + `/company/office` page

Design props for reuse. Consider optional props like `compact` variant if service detail pages need smaller layout.

### Production Site Reference (star-light15.net)

**IMPORTANT:** Fetch actual CSS/layout from star-light15.net before implementing — do not guess from spec.

**Reasons Grid:** 4 items in a row on desktop. Each has an SVG icon above, bold heading, and description paragraph. Background is light gray (#F5F5F5-ish).

**Process Flow:** 5 numbered steps in a horizontal row on desktop. Each step has a circular number badge or illustration, title, and description. Arrows connect steps.

**Area Map:** Static map image showing Kansai/national coverage. Below or beside: prefecture city lists organized by region.

### Data Sources

**ReasonsGrid data** — hardcode in component (4 items):
1. Speed: スピード対応 — 最短30分で駆けつけます
2. Free estimate: 見積無料 — お見積もりは無料です
3. 24/7: 24時間365日対応 — いつでもお電話ください
4. Qualified: 有資格者対応 — 経験豊富なスタッフが対応

**ProcessFlow data** — hardcode in component (5 steps):
1. ご相談 (Consultation) — お電話またはメールでご相談ください
2. ご訪問 (Visit) — スタッフがお伺いします
3. お見積 (Estimate) — 作業内容と料金をご説明します
4. 作業 (Work) — ご了承いただけましたら作業開始
5. お支払 (Payment) — 作業完了後にお支払い

**AreaMap data** — import `REGIONAL_OFFICES` from siteConfig.ts (already has 4 offices with `prefecturesServed` and `areaServed` arrays)

### Anti-Patterns (DO NOT)

- No `will-change: transform` (breaks iOS Safari z-index — from Story 1.6)
- No `@apply` or scoped styles
- No transform/scale on hover (UX-DR11 — shadow only)
- No scroll animations or parallax (UX-DR16)
- No lazy-load for above-fold images
- No hardcoded phone numbers
- No client-side JS — these are pure Astro server components

### Section Spacing (UX-DR17)

- 60-80px vertical padding between sections (`py-16` or `py-20`)
- 24-32px heading-to-content gap (`mb-6` or `mb-8`)
- Content max-width 1100-1200px centered (`max-w-[1200px] mx-auto px-4`)

### Previous Story Intelligence (Story 2.2)

- Images in `public/` dir use raw `<img>` tags (Astro `<Image>` can't optimize public/ assets) — follow same pattern
- `decoding="auto"` preferred over `"sync"` for images
- Responsive grid pattern: `grid-cols-1 md:grid-cols-2 lg:grid-cols-N`
- Commit message pattern: `feat: build [component] (story X.Y)`
- Service data imported from siteConfig.ts — follow same import pattern for REGIONAL_OFFICES

### Git Intelligence

Recent commits:
- `feat: build hero carousel with blurred background and responsive images (story 2.1)`
- `feat: build mobile menu and sticky CTA bar (story 1.6)`
- `feat: build desktop MegaMenu navigation (story 1.5)`

Pattern: components in `src/components/`, pages in `src/pages/`.

### Project Structure

```
src/components/ReasonsGrid.astro       # NEW — 4-column reasons grid with SVG icons
src/components/ProcessFlow.astro       # NEW — 5-step numbered process flow
src/components/AreaMap.astro           # NEW — static map + prefecture city lists
src/pages/index.astro                  # UPDATE — add 3 new sections below service cards
public/images/icons/                   # NEW — SVG icons for reasons grid
public/images/map/                     # NEW — static area map image
```

### Existing Files Being Modified

**src/pages/index.astro** — Currently contains BaseLayout + HeroCarousel + 3x ServiceCategorySection (electricity, water, pest-control). This story adds ReasonsGrid, ProcessFlow, and AreaMap sections below the service category sections. Must preserve all existing content.

### References

- [Source: epics.md#Story 2.3] — acceptance criteria and user story
- [Source: architecture.md] — component boundary rules, Tailwind-only styling, project structure
- [Source: architecture.md] — Google Maps embed as `<iframe>` in AreaMap.astro, no API key needed
- [Source: ux-design-specification.md] — 4-column reasons grid, 5-step process flow, section spacing
- [Source: ux-design-specification.md] — alternating section backgrounds (#F5F5F5)
- [Source: prd.md#FR10] — 24/7 availability messaging
- [Source: prd.md#FR17-FR19] — service area coverage display
- [Source: siteConfig.ts] — REGIONAL_OFFICES with 4 offices (Tokyo, Nagoya, Osaka, Hyogo)

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Debug Log References

None

### Completion Notes List

- Fetched all assets (4 SVG icons, 5 flow JPGs, 1 area map PNG) from star-light15.net production site
- Used actual production text content (headings, descriptions) from star-light15.net instead of spec placeholders
- ReasonsGrid: 4-column responsive grid with SVG icons (aria-hidden="true"), #F5F5F5 background, "Reason" English label
- ProcessFlow: semantic `<ol>`, horizontal desktop / vertical mobile, arrow connectors (▶/▼), CTA buttons using SITE_CONFIG.phone
- AreaMap: static map image with Japanese alt text, imports REGIONAL_OFFICES from siteConfig.ts, 4 office regions with prefectures/cities
- All components are pure Astro (zero JS), Tailwind-only styling, no @apply or scoped styles
- Section spacing uses py-16 md:py-20 (64-80px) per UX-DR17
- Google Maps embed deferred (optional per story spec)
- Build passes with no errors

### Change Log

- 2026-05-10: Implemented ReasonsGrid, ProcessFlow, AreaMap components and integrated into homepage
- 2026-05-11: Multiple layout rewrites to match production site (star-light15.net):
  - ReasonsGrid: changed from 4-column vertical cards to 2-column horizontal layout (icon left, text right), bg-[#f7f7f7], number badge #0044f2 Roboto Condensed, title highlight #ff4176
  - ProcessFlow: rewrote twice — first horizontal arrows, then vertical, final: horizontal (image left 400px, text right) with vertical connector lines #979bf3, step number badge overlay
  - AreaMap: 2-column layout (map left, office list right)
  - All text content updated from actual production site content

### File List

- public/images/icons/reason_01.svg (NEW)
- public/images/icons/reason_02.svg (NEW)
- public/images/icons/reason_03.svg (NEW)
- public/images/icons/reason_04.svg (NEW)
- public/images/process/flow_01.jpg (NEW)
- public/images/process/flow_02.jpg (NEW)
- public/images/process/flow_03.jpg (NEW)
- public/images/process/flow_04.jpg (NEW)
- public/images/process/flow_05.jpg (NEW)
- public/images/map/area_2026.png (NEW)
- src/components/ReasonsGrid.astro (NEW)
- src/components/ProcessFlow.astro (NEW)
- src/components/AreaMap.astro (NEW)
- src/pages/index.astro (MODIFIED)
