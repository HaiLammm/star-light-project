# Story 1.7: Build Breadcrumb and CTABlock Components

Status: review

## Story

As a visitor,
I want breadcrumb navigation and prominent CTA blocks throughout the site,
so that I know where I am and can always contact the service easily.

## Acceptance Criteria

1. **Breadcrumb Display** — On any sub-page, Breadcrumb shows `TOP > [Category] > [Service Name]` with `>` separator. Current page is bold and not linked. Parent items are linked.
2. **Breadcrumb Schema.org** — Breadcrumb generates valid BreadcrumbList JSON-LD markup via `generateBreadcrumb()` from `src/utils/schema.ts`.
3. **CTABlock full-width variant** — Spans full content width between sections. Contains: phone number (0120-219-695), "通話無料", WEB割引 badge (rotated ~-5deg), secondary email button (navy). Phone is orange primary.
4. **CTABlock compact variant** — Inline/smaller sizing with same phone + email + badge elements. Suitable for embedding within content sections.
5. **CTABlock sticky variant** — Already exists (`src/components/CTABlock.astro`). Verify it still works correctly after changes.
6. **Touch targets** — All phone/email links have minimum 44x44px touch target. Phone link has `aria-label="無料電話 0120-219-695"`.
7. **Button hierarchy** — Primary orange (#FF6B00) for phone CTA, secondary navy (#1B2A4A) for email/form button (UX-DR13).

## Tasks / Subtasks

- [x] Task 1: Create `src/components/Breadcrumb.astro` (AC: #1, #2)
  - [x] Implement Props interface: `items: Array<{ label: string; href: string }>` (last item = current page)
  - [x] Render `<nav aria-label="パンくずリスト">` with `<ol>` list
  - [x] Link all items except last; last item is `<span>` bold, not linked, with `aria-current="page"`
  - [x] Separator: `>` character between items
  - [x] Inject BreadcrumbList JSON-LD via `generateBreadcrumb()` from `src/utils/schema.ts`
- [x] Task 2: Enhance `src/components/CTABlock.astro` full-width and compact variants (AC: #3, #4, #5, #6, #7)
  - [x] Fetch reference CSS/HTML from star-light15.net CTA sections before implementing
  - [x] Full-width: match production site layout — logo, heading, phone number, "通話無料" label, WEB割引 badge, email button
  - [x] Full-width: orange bg for phone CTA area, navy secondary for email button
  - [x] Full-width: WEB割引 badge with `bg-red text-white text-xs font-bold px-2 py-1 rounded -rotate-[5deg]`
  - [x] Compact: smaller padding, inline sizing, same content elements
  - [x] Preserve existing sticky variant behavior — DO NOT break it
  - [x] Ensure all tappable elements meet 44x44px minimum
- [x] Task 3: Verify build and manual test (AC: all)
  - [x] `astro build` passes with no errors
  - [x] Add temporary test page or use index.astro to render Breadcrumb and all CTABlock variants
  - [x] Verify Breadcrumb Schema.org JSON-LD in page source
  - [x] Keyboard test: all links focusable with visible focus ring
  - [x] Responsive check: 375px, 768px, 1024px, 1440px

## Dev Notes

### Breadcrumb Component — Implementation Guide

**File:** `src/components/Breadcrumb.astro` (NEW)

**Props interface:**
```typescript
interface Props {
  items: Array<{ label: string; href: string }>;
}
```

The `items` array includes ALL breadcrumb entries including the current page. The last item in the array is the current page (rendered bold, not linked).

**Schema.org integration:**
- Import `generateBreadcrumb` and `type BreadcrumbItem` from `../utils/schema`
- The function accepts `Array<{ name: string; url: string }>` — map `items` prop to this shape
- For the current (last) page, use the full URL: `SITE_CONFIG.siteUrl + item.href`
- Render JSON-LD in a `<script type="application/ld+json">` tag

**HTML structure:**
```html
<nav aria-label="パンくずリスト">
  <ol class="flex items-center gap-1 text-sm text-text-secondary">
    <!-- For each item except last -->
    <li><a href={item.href} class="text-navy hover:underline">{item.label}</a></li>
    <li aria-hidden="true" class="mx-1">&gt;</li>
    <!-- Last item (current page) -->
    <li><span class="font-bold text-text-primary" aria-current="page">{item.label}</span></li>
  </ol>
</nav>
```

**Position:** Below header, above page title. Consumers pass the breadcrumb data — the component doesn't auto-generate it.

**Reference from production site:** Breadcrumb on star-light15.net uses format `TOP > 電気まわりサービス > ブレーカーサービス` with linked parent items.

### CTABlock Component — Enhancement Guide

**File:** `src/components/CTABlock.astro` (UPDATE — exists at 63 lines)

**Current state:** Has 3 variants (sticky, full-width, compact). Sticky variant is complete and working. Full-width and compact variants are minimal placeholders — need enhancement to match production site.

**What must be preserved:**
- Sticky variant (lines 12-31) — DO NOT modify
- Props interface `variant: 'full-width' | 'compact' | 'sticky'` — keep as-is
- Import of `SITE_CONFIG` from `../utils/siteConfig`

**Production site CTA pattern (from star-light15.net):**
Each CTA block on the production site contains:
- Company logo (`site_logo.svg`)
- Heading text
- Subtext: "電話相談無料！年中無休で対応"
- Phone number: `0120-219-695` as `tel:0120219695` link
- "WEB割引 1,500円割引!" badge
- Secondary button: "メールで無料相談" linking to contact page
- Decorative image: `cta_deco.png` (skip if not available in public/images)

**Full-width variant redesign:**
- Background: white or light gray section with navy heading
- Phone number: large, orange, bold (`text-2xl font-bold text-orange`)
- "通話無料" label near phone
- WEB割引 badge: `bg-red text-white text-xs font-bold px-2 py-1 rounded -rotate-[5deg]`
- Email button: `bg-navy text-white` secondary style, links to `/contact`
- Phone link: `aria-label={phone.ariaLabel}`, `min-h-[44px] min-w-[44px]`
- Vertical padding: `py-12 md:py-16` (60-80px equivalent)

**Compact variant:**
- Same elements as full-width but with reduced padding (`py-6 md:py-8`)
- Inline/horizontal layout, smaller text sizes
- Suitable for embedding between content sections

**Button hierarchy (UX-DR13):**
- Phone CTA: `bg-orange text-white` (primary)
- Email/form: `bg-navy text-white` (secondary)

### Anti-Patterns — DO NOT

- DO NOT hardcode phone number — use `SITE_CONFIG.phone`
- DO NOT use `@apply` or scoped `<style>` blocks — Tailwind utilities only
- DO NOT use boolean props for variants — keep string enum `variant` prop
- DO NOT modify the sticky variant — it works correctly from Story 1.6
- DO NOT use `outline: none` — global `:focus-visible` in global.css handles focus rings
- DO NOT add decorative animations or parallax effects
- DO NOT import Astro-specific APIs in `.tsx` files (not applicable here, both are `.astro`)

### Project Structure Notes

- `src/components/Breadcrumb.astro` — NEW file, flat in components directory (no sub-folders)
- `src/components/CTABlock.astro` — UPDATE existing file
- `src/utils/schema.ts` — READ ONLY, `generateBreadcrumb()` already exists (line 281)
- `src/utils/siteConfig.ts` — READ ONLY, `SITE_CONFIG.phone` and `SITE_CONFIG.siteUrl` already exist
- `src/layouts/BaseLayout.astro` — No changes needed (sticky CTA already included)

### Previous Story Intelligence (Story 1.6)

**Patterns established:**
- CTABlock sticky variant uses `SITE_CONFIG.phone.href`, `SITE_CONFIG.phone.display`, `SITE_CONFIG.phone.ariaLabel`
- WEB割引 badge pattern: `bg-red text-white text-xs font-bold px-2 py-1 rounded -rotate-[5deg] shrink-0`
- Touch target pattern: `min-w-[44px] min-h-[44px]`
- iOS safe area: `pb-[env(safe-area-inset-bottom)]` (sticky variant only)

**Anti-patterns confirmed:**
- `will-change: transform` breaks iOS Safari z-index stacking — avoid
- No animation libraries, no external packages for simple UI

**Files created/modified in recent stories:**
- Header.astro (modified — hamburger button added)
- MobileMenu.tsx (created — React island)
- CTABlock.astro (created — 3 variants, sticky is complete)
- BaseLayout.astro (modified — includes sticky CTABlock, 60px bottom padding on main)
- MegaMenu.astro (created — desktop dropdown nav)
- Footer.astro (created)

### References

- [Source: _bmad-output/planning-artifacts/epics.md — Epic 1, Story 1.7]
- [Source: _bmad-output/planning-artifacts/architecture.md — Component Patterns, File Structure]
- [Source: _bmad-output/planning-artifacts/architecture.md — CTABlock variant pattern, CSS conventions]
- [Source: src/utils/schema.ts#L281 — generateBreadcrumb() function]
- [Source: src/utils/schema.ts#L63-66 — BreadcrumbItem interface { name, url }]
- [Source: src/components/CTABlock.astro — current implementation, 63 lines]
- [Source: star-light15.net/electricity/breaker — production breadcrumb and CTA reference]

## Dev Agent Record

### Agent Model Used
Claude Opus 4.6

### Debug Log References
- Build verified: `astro build` passes with 0 errors
- BreadcrumbList JSON-LD verified in page source with correct schema.org structure
- Sticky variant preserved unchanged (lines 12-31)
- All touch targets use min-h-[44px] min-w-[44px]

### Completion Notes List
- Created Breadcrumb.astro with full Schema.org BreadcrumbList JSON-LD support
- Enhanced CTABlock full-width variant: heading, phone CTA (orange), email button (navy), WEB割引 badge, 通話無料 label
- Enhanced CTABlock compact variant: same elements with reduced padding and inline layout
- Sticky variant untouched and verified working
- Referenced star-light15.net for CTA structure before implementing
- All phone/email links meet 44x44px touch target requirement

### File List
- src/components/Breadcrumb.astro (NEW)
- src/components/CTABlock.astro (MODIFIED)
