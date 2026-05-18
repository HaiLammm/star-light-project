# Story 3.3: Build Service Area, Process Flow, Case Studies, Testimonials, and FAQ Sections for Service Pages

**Status:** review
**Story ID:** 3.3
**Epic:** Epic 3 - Service Pages (Water, Electrical, Pest Control)
**Created:** 2026-05-14

---

## User Story

**As a** visitor
**I want to** verify service coverage, understand the process, and see proof of quality on every service page,
**So that** I can confirm my area is served and trust the service before calling.

---

## Acceptance Criteria

1. **Given** a visitor scrolls through a service detail page
   **When** Area Map section renders
   **Then** it displays service coverage for Tokyo, Nagoya, Osaka, Hyogo with prefecture/city lists (FR17, FR19)
   **And** office locations and contact details are shown per region (FR18)

2. **When** Process Flow section renders
   **Then** 5-step flow (相談→訪問→見積→作業→支払) displays with numbered illustrations (FR15)

3. **When** Case Studies section renders
   **Then** CaseStudyCard components display with photo, category tag, location, duration, and cost (FR21)

4. **When** Testimonials section renders
   **Then** TestimonialCard components display with service type, cost, and customer message (FR20)

5. **When** FAQ section renders
   **Then** FAQAccordion displays service-specific Q&A using native `<details>/<summary>` (FR26)

6. **And** Anchor menu includes "お客様の声" link pointing to `id="voice"` section
   **And** Related services cards appear after FAQ linking to other services in same category
   **And** CTA Block + Footer complete the page
   **And** CTABlock appears 3-5 times throughout the page between major sections

---

## Tasks / Subtasks

- [x] Task 1: Add "お客様の声" (voice) to anchor menu in `[service].astro` (AC: #6)
  - [x] 1.1 Check if `anchor_icon_08.svg` exists in `/public/images/icons/` — it does NOT (only 01-07 exist)
  - [x] 1.2 Add new entry `{ id: 'voice', label: 'お客様の声', icon: '/images/icons/anchor_icon_08.svg' }` to `anchorSections` array
  - [x] 1.3 Created `/public/images/icons/anchor_icon_08.svg` — speech bubble SVG, matches style of existing icons (navy #0044f2 fill, 16x16)
  - [x] 1.4 Verified `id="voice"` already present on testimonials section in `[service].astro`

- [x] Task 2: Implement Related Services section after FAQ (AC: #6)
  - [x] 2.1 Replaced `<!-- Related Services placeholder - story 3.3 -->` comment
  - [x] 2.2 Defined `relatedServices` filtering ELECTRICITY_SERVICES excluding current service slug
  - [x] 2.3 Built section with standard heading pattern (yellow bar + watermark text + h2)
  - [x] 2.4 Rendered `relatedServices` as card grid (4 cols desktop, 2 cols tablet, 1 col mobile)
  - [x] 2.5 Each card: image, service name, description, starting price, link to service page
  - [x] 2.6 Hover: shadow increase only, no transform/scale (UX-DR11)
  - [x] Exported ELECTRICITY_SERVICES, WATER_SERVICES, PEST_CONTROL_SERVICES from siteConfig.ts
  - [x] Imported ELECTRICITY_SERVICES in `[service].astro`

- [x] Task 3: Verify existing sections are complete (AC: #1–#5)
  - [x] 3.1 `id="area"` present in built HTML — AreaMap renders correctly
  - [x] 3.2 `id="flow"` present in built HTML — ProcessFlow renders correctly
  - [x] 3.3 `id="case"` present in built HTML — CaseStudyCards render correctly
  - [x] 3.4 `id="voice"` present in built HTML — TestimonialCards render correctly
  - [x] 3.5 `id="faq"` present in built HTML — FAQAccordion renders correctly
  - [x] 3.6 CTABlocks count = 4 (within 3-5 range)

- [x] Task 4: QA
  - [x] 4.1 `astro build` passes with no errors — ✓ Completed
  - [x] 4.2 Anchor menu has 8 entries including voice (verified in source)
  - [x] 4.3 Related services show outlet/lighting/antenna/water-heater (breaker filtered out) with correct hrefs
  - [x] 4.4 Grid uses responsive classes: grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 — mobile-safe

---

## Dev Notes

### CRITICAL: Most Sections Already Exist — Do NOT Rebuild

Story 3.3 was scaffolded ahead of time in Story 3.1. The following sections are **already fully implemented** in `src/pages/services/[service].astro`:

| Section | ID | Status |
|---------|-----|--------|
| Area Map | `area` | ✅ Implemented (`<div id="area"><AreaMap /></div>`) |
| Process Flow | `flow` | ✅ Implemented (`<div id="flow"><ProcessFlow /></div>`) |
| Case Studies | `case` | ✅ Implemented (lines 357–376) |
| Testimonials | `voice` | ✅ Implemented (lines 378–398) |
| FAQ | `faq` | ✅ Implemented (lines 402–412) |
| Related Services | — | ❌ Placeholder only — line 414 `<!-- Related Services placeholder - story 3.3 -->` |

**Your only real implementation work:**
1. Add `voice` anchor to `anchorSections` array + create `anchor_icon_08.svg`
2. Replace the Related Services placeholder with actual section

### Anchor Menu Gap

The current `anchorSections` array (lines 39–47 of `[service].astro`) has 7 entries but is missing `voice`:

```typescript
// CURRENT (missing voice):
const anchorSections = [
  { id: 'price', label: '料金のご案内', icon: '/images/icons/anchor_icon_01.svg' },
  { id: 'reason', label: '選ばれる理由', icon: '/images/icons/anchor_icon_02.svg' },
  { id: 'compare', label: '他社比較', icon: '/images/icons/anchor_icon_03.svg' },
  { id: 'area', label: '対応エリア', icon: '/images/icons/anchor_icon_04.svg' },
  { id: 'flow', label: '作業の流れ', icon: '/images/icons/anchor_icon_05.svg' },
  { id: 'case', label: '修理事例', icon: '/images/icons/anchor_icon_06.svg' },
  { id: 'faq', label: 'FAQ', icon: '/images/icons/anchor_icon_07.svg' },
];

// TARGET (add voice between case and faq):
const anchorSections = [
  { id: 'price', label: '料金のご案内', icon: '/images/icons/anchor_icon_01.svg' },
  { id: 'reason', label: '選ばれる理由', icon: '/images/icons/anchor_icon_02.svg' },
  { id: 'compare', label: '他社比較', icon: '/images/icons/anchor_icon_03.svg' },
  { id: 'area', label: '対応エリア', icon: '/images/icons/anchor_icon_04.svg' },
  { id: 'flow', label: '作業の流れ', icon: '/images/icons/anchor_icon_05.svg' },
  { id: 'case', label: '修理事例', icon: '/images/icons/anchor_icon_06.svg' },
  { id: 'voice', label: 'お客様の声', icon: '/images/icons/anchor_icon_08.svg' },  // ADD THIS
  { id: 'faq', label: 'FAQ', icon: '/images/icons/anchor_icon_07.svg' },
];
```

**Missing icon:** `/public/images/icons/anchor_icon_08.svg` does not exist. Either:
- Copy `anchor_icon_07.svg` as `anchor_icon_08.svg` as a placeholder (quickest)
- OR create a simple speech bubble SVG that matches the style of existing icons (white icon on transparent bg, ~24x24px viewBox)

### Related Services Section Implementation

Replace `<!-- Related Services placeholder - story 3.3 -->` (line 414 of `[service].astro`) with:

```astro
<!-- Related Services (same category) -->
<section class="py-12 md:py-16 lg:py-20">
  <div class="max-w-[1200px] mx-auto px-3 sm:px-4">
    <h2 class="text-[18px] sm:text-[22px] md:text-[42px] font-bold relative flex flex-col items-center text-center pt-8 sm:pt-10 md:pt-12 mb-6 sm:mb-8 md:mb-12">
      <span class="block w-[2px] h-[25px] sm:h-[40px] md:h-[70px] bg-[#fbc102]"></span>
      <span class="absolute top-[25px] sm:top-[40px] md:top-[45px] left-1/2 -translate-x-1/2 opacity-30 font-[Roboto] text-[40px] sm:text-[70px] md:text-[180px] font-bold text-[#b3b3b3] whitespace-nowrap -z-[1] pointer-events-none">Service</span>
      関連サービス
    </h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {relatedServices.map((rs) => (
        <a href={rs.href} class="flex flex-col rounded-[16px] sm:rounded-[20px] md:rounded-[30px] overflow-hidden shadow-[0_4px_0_0_rgba(0,0,0,0.12)] hover:shadow-[0_6px_0_0_rgba(0,0,0,0.18)] transition-shadow duration-200 ease bg-white">
          <figure class="w-full aspect-video overflow-hidden">
            <img
              src={rs.imageSrc}
              alt={rs.imageAlt}
              width="400"
              height="225"
              loading="lazy"
              decoding="async"
              class="w-full h-full object-cover"
            />
          </figure>
          <div class="p-3 sm:p-4 md:p-5">
            <h3 class="text-[13px] sm:text-[14px] md:text-[16px] font-bold leading-snug">{rs.label}</h3>
            <p class="text-[10px] sm:text-[11px] md:text-[12px] text-[#666] mt-1">{rs.description}</p>
            <p class="font-[Roboto] text-[18px] sm:text-[20px] md:text-[24px] font-bold text-[#ff4176] mt-2">
              {rs.startingPrice.toLocaleString('ja-JP')}<span class="font-['Noto_Sans_JP'] text-[10px] sm:text-[11px] md:text-[12px] font-medium text-[#333]">円[税込]〜</span>
            </p>
          </div>
        </a>
      ))}
    </div>
  </div>
</section>
```

**Define `relatedServices` near the top of the frontmatter** (after the existing data, before `pageTitle`):

```typescript
// Related services: same category, excluding current service
const relatedServices = ELECTRICITY_SERVICES
  .filter((s) => s.slug !== service)
  .slice(0, 4)
  .map((s) => ({
    ...s,
    imageSrc: `/images/services/electricity_0${ELECTRICITY_SERVICES.findIndex(e => e.slug === s.slug) + 1}.jpg`,
    imageAlt: `${s.label}サービス`,
  }));
```

**IMPORTANT:** You must import `ELECTRICITY_SERVICES` at the top of `[service].astro`:
```typescript
import { SITE_CONFIG, ELECTRICITY_SERVICES } from '../../utils/siteConfig';
```

Check `src/utils/siteConfig.ts` — `ELECTRICITY_SERVICES` is a `const` array (line 83), not exported yet. You need to add `export` to it:
```typescript
// In siteConfig.ts, change:
const ELECTRICITY_SERVICES: ServiceItem[] = [...]
// To:
export const ELECTRICITY_SERVICES: ServiceItem[] = [...]
```

Do the same for `WATER_SERVICES` and `PEST_CONTROL_SERVICES` if not already exported (check first).

### Section Order in `[service].astro` After This Story

The complete page should have this order:
1. Breadcrumb
2. KV (Key Visual)
3. KV Bottom (price bar)
4. Intro Section
5. Consultation Section
6. AnchorMenu (8 sections now)
7. PricingTier + **CTABlock #1**
8. ReasonsGrid + Satisfaction Guarantee
9. Staff Qualifications
10. ComparisonTable
11. AreaMap (id="area")
12. **CTABlock #2**
13. ProcessFlow (id="flow")
14. Case Studies (id="case")
15. Testimonials (id="voice") on gray bg
16. **CTABlock #3**
17. FAQ (id="faq")
18. Related Services ← **NEW in this story**
19. **CTABlock #4** (Final)

### Existing Image Paths for Related Services

Available electricity service images in `/public/images/services/`:
- `electricity_01.jpg`, `electricity_02.jpg`, `electricity_03.jpg`

If more images needed (4 related services), use existing ones or add placeholders. Note: only 3 electricity images exist — the `relatedServices.slice(0, 4)` approach may only yield 3 non-breaker services since there are 5 total (breaker + 4 others = 4 related).

Actually: ELECTRICITY_SERVICES has 5 entries (breaker, outlet, lighting, antenna, water-heater). Filtering out `breaker` gives 4 related services. Map images carefully:
- outlet → use available image or repeat existing
- lighting → use available image
- antenna → use available image
- water-heater → use available image

If images don't exist, use `/images/services/electricity_01.jpg` as fallback for all. This is acceptable for Story 3.4 to fix with proper content collection data.

### Color/Style Tokens (from Story 3.1/3.2)

Use these exact values (do NOT invent new ones):
- Navy: `#0044f2`
- Yellow accent: `#fbc102`
- Red/pink: `#ff4176`
- Dark bg: `#1c1c1c`
- Watermark text color: `#b3b3b3`
- Section gray bg: `bg-section-gray` (Tailwind custom = `#F5F5F5`)

### Heading Pattern (Copy Exactly from Existing Sections)

```astro
<h2 class="text-[18px] sm:text-[24px] md:text-[42px] font-bold relative flex flex-col items-center text-center">
  <span class="block w-[2px] h-[25px] sm:h-[40px] md:h-[70px] bg-[#fbc102]"></span>
  <span class="absolute top-[25px] sm:top-[40px] md:top-[45px] left-1/2 -translate-x-1/2 opacity-30 font-[Roboto] text-[40px] sm:text-[70px] md:text-[180px] font-bold text-[#b3b3b3] whitespace-nowrap -z-[1] pointer-events-none">Service</span>
  関連サービス
</h2>
```

### Mobile Responsive Rules (from Recent Commits)

- Progressive font scaling: `text-[Xpx] sm:text-[Ypx] md:text-[Zpx]`
- Image containers: always `w-full h-auto`
- Grids: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`
- Touch targets: min 44px height on interactive elements

---

## Previous Story Intelligence

### From Story 3.2 Implementation

- `ComparisonTable.astro` was created and integrated into `[service].astro`
- `ReasonsGrid.astro` now accepts optional `reasons` prop (backward-compatible)
- Satisfaction guarantee callout added after ReasonsGrid section
- `astro build` passes without errors on current state
- Section IDs confirmed: `price`, `reason`, `compare`, `area`, `flow`, `case`, `voice`, `faq` — **do NOT rename any**

### From Story 3.1 Implementation

- `scroll-margin-top: 100px` set in `global.css` for all anchor IDs (accounts for sticky header + anchor menu combined height)
- `getStaticPaths()` is a stub returning only `[{ params: { service: 'breaker' } }]` — Story 3.4 will expand this
- All service page data is inline/hardcoded for now (no content collections yet)

---

## Technical Requirements

### Architecture Compliance

- Astro 6.x static components — no React for Related Services (pure Astro)
- Tailwind CSS v4 — mobile-first responsive classes only
- TypeScript strict mode — type all arrays properly
- No new JS islands required

### File Structure

**Modified Files:**
- `src/pages/services/[service].astro` — Add voice to anchor menu, replace Related Services placeholder, import + use `ELECTRICITY_SERVICES`
- `src/utils/siteConfig.ts` — Export `ELECTRICITY_SERVICES` (and optionally `WATER_SERVICES`, `PEST_CONTROL_SERVICES`)
- `public/images/icons/anchor_icon_08.svg` — Create new icon file

**No New Component Files** needed — use inline Astro markup for Related Services.

### Accessibility

- Related services cards: `<a>` with visible text (no aria-label needed since text is descriptive)
- Images: Japanese alt text on all `<img>` elements
- Hover: CSS only, no JS

### DO NOT CHANGE

- Section IDs (`area`, `flow`, `case`, `voice`, `faq`) — anchor menu links depend on these
- `getStaticPaths()` stub — Story 3.4 handles dynamic routing
- Any existing component (`AreaMap`, `ProcessFlow`, `CaseStudyCard`, `TestimonialCard`, `FAQAccordion`) — they already work correctly

---

## Project Context Reference

1. **Reference original site** — Fetch star-light15.net service detail page to verify Related Services section design (card layout, number of cards, link pattern)

2. **Mobile-first** — Related Services grid must work at 320px width; 1-column layout on mobile

3. **No hardcoded URLs** — Related services links come from `ELECTRICITY_SERVICES[n].href` from `siteConfig.ts`

---

## Implementation Checklist

**Before Starting:**
- [ ] Read `src/pages/services/[service].astro` lines 39-47 (anchor menu) and line 414 (placeholder)
- [ ] Read `src/utils/siteConfig.ts` lines 83-120 (ELECTRICITY_SERVICES) — verify if exported or not
- [ ] Check `/public/images/icons/` — confirm only anchor_icon_01 through 07 exist
- [ ] Optionally fetch star-light15.net to verify Related Services section design

**Anchor Menu:**
- [ ] Add `voice` entry between `case` and `faq` in `anchorSections`
- [ ] Create `public/images/icons/anchor_icon_08.svg` (copy 07 as placeholder or create new)

**Related Services:**
- [ ] Export `ELECTRICITY_SERVICES` from `siteConfig.ts`
- [ ] Import `ELECTRICITY_SERVICES` in `[service].astro`
- [ ] Define `relatedServices` filtering out current `service` param
- [ ] Replace placeholder comment with Related Services section markup

**QA:**
- [ ] `astro build` passes
- [ ] Anchor menu shows 8 items, all scroll correctly
- [ ] Related Services shows 4 cards on desktop, 1 column on mobile
- [ ] No TypeScript errors

---

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-6

### Debug Log References

_None_

### Completion Notes List

- Task 1: Tạo `anchor_icon_08.svg` (speech bubble SVG, navy #0044f2, 16x16) và thêm `{ id: 'voice', label: 'お客様の声', icon: '/images/icons/anchor_icon_08.svg' }` vào `anchorSections` trong `[service].astro` — anchor menu giờ có 8 entries.
- Task 2: Export `ELECTRICITY_SERVICES`, `WATER_SERVICES`, `PEST_CONTROL_SERVICES` từ `siteConfig.ts`. Import và dùng `ELECTRICITY_SERVICES` để build `relatedServices` array (filter bỏ current service, lấy tối đa 4). Implement Related Services section với heading pattern chuẩn, grid 4 cols desktop / 2 cols tablet / 1 col mobile, hover shadow only.
- Task 3: Xác nhận tất cả 5 sections (area/flow/case/voice/faq) đều có trong built HTML. CTABlock = 4 lần (trong range 3-5).
- Task 4: `astro build` pass không lỗi. Built HTML xác nhận anchor menu 8 items, related services 4 cards đúng URLs.

### File List

#### New Files
- `public/images/icons/anchor_icon_08.svg`

#### Modified Files
- `src/utils/siteConfig.ts` — Export ELECTRICITY_SERVICES, WATER_SERVICES, PEST_CONTROL_SERVICES
- `src/pages/services/[service].astro` — Add voice to anchorSections, import ELECTRICITY_SERVICES, add relatedServices data, replace Related Services placeholder with section
