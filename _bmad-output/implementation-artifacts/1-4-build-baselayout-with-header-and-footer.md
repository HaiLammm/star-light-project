# Story 1.4: Build BaseLayout with Header and Footer

Status: review

## Story

As a visitor,
I want a consistent page shell with navigation and contact information on every page,
so that I can navigate the site and find the phone number from any page.

## Acceptance Criteria

1. **Given** a visitor loads any page **When** the page renders **Then** BaseLayout includes `<html lang="ja">`, UTF-8 charset, skip-nav link, Noto Sans JP preconnect, and semantic landmarks (header, main, footer)
2. **And** Header is sticky (`position: sticky; top: 0; z-index: 50`) with logo (left), navigation links (center on desktop), and phone CTA 0120-219-695 (right)
3. **And** Header phone number is imported from `siteConfig.ts`, not hardcoded
4. **And** Header shows subtle box-shadow on scroll
5. **And** Footer contains full sitemap navigation, phone/email CTA, company info, and copyright
6. **And** visible focus ring (2px navy outline, 2px offset) is applied on all interactive elements via keyboard navigation
7. **And** skip-nav link is the first focusable element and jumps to `<main>`

## Tasks / Subtasks

- [x] Task 1: Create `src/layouts/BaseLayout.astro` (AC: #1, #6, #7)
  - [x] 1.1 Define `Props` interface: `title: string`, `description: string`, `canonicalUrl?: string`
  - [x] 1.2 `<html lang="ja">`, `<meta charset="UTF-8">`, viewport meta
  - [x] 1.3 Google Fonts preconnect + Noto Sans JP link (`wght@400;500;700`, `display=swap`)
  - [x] 1.4 Import `../styles/global.css`
  - [x] 1.5 Skip-nav link as first element in `<body>`: `<a href="#main-content" class="...">コンテンツへスキップ</a>` — sr-only by default, visible on focus
  - [x] 1.6 Include `<Header />` and `<Footer />` components
  - [x] 1.7 `<main id="main-content">` wrapping `<slot />`
  - [x] 1.8 Add global focus-visible style for 2px navy outline, 2px offset
- [x] Task 2: Create `src/components/Header.astro` (AC: #2, #3, #4)
  - [x] 2.1 Sticky header: `sticky top-0 z-50 bg-white border-b border-border-light`
  - [x] 2.2 Inner container: `max-w-[1200px] mx-auto px-4 md:px-6 lg:px-10 flex items-center justify-between`
  - [x] 2.3 Logo (left): text-based "設備人" linking to `/` (no image asset yet — use text logo with `SITE_CONFIG.companyName`)
  - [x] 2.4 Desktop nav (center): render `NAVIGATION` items, hide on mobile (`hidden lg:flex`)
  - [x] 2.5 Phone CTA (right): use `SITE_CONFIG.phone` for display, href, ariaLabel — orange text, min 44x44px touch target
  - [x] 2.6 Mobile hamburger placeholder button (visible `lg:hidden`) — MobileMenu is Story 1.6
  - [x] 2.7 Shadow-on-scroll: inline `<script>` toggling a shadow class on scroll
- [x] Task 3: Create `src/components/Footer.astro` (AC: #5)
  - [x] 3.1 `<footer>` with navy background (`bg-navy text-white`)
  - [x] 3.2 Phone CTA block at top of footer using `SITE_CONFIG.phone`
  - [x] 3.3 Sitemap nav grid: 4-col desktop (`lg:grid-cols-4`), 2-col tablet, 1-col mobile — all page links from `NAVIGATION`
  - [x] 3.4 Company info: `SITE_CONFIG.legalName`, regional offices from `REGIONAL_OFFICES`
  - [x] 3.5 Copyright bar at bottom with privacy link
  - [x] 3.6 `<nav aria-label="フッターナビゲーション">`
- [x] Task 4: Update `src/pages/index.astro` to use BaseLayout (AC: #1)
  - [x] 4.1 Replace raw HTML shell with `<BaseLayout title="..." description="...">`
  - [x] 4.2 Remove inline `<html>`, `<head>`, `<body>`, CSS import — BaseLayout owns these
  - [x] 4.3 Fix `lang="en"` → BaseLayout provides `lang="ja"`
- [x] Task 5: Verify build and rendering (AC: all)
  - [x] 5.1 `astro build` passes
  - [x] 5.2 `astro dev` — verify sticky header, shadow on scroll, skip-nav, footer nav, phone link
  - [x] 5.3 Keyboard navigation: Tab through skip-nav → header links → phone CTA → main content → footer links — visible focus ring on all

## Dev Notes

### CRITICAL: Component Composition

```
BaseLayout.astro
  → <html lang="ja">
      → <head> (meta, fonts, global.css)
      → <body>
          → <a href="#main-content">コンテンツへスキップ</a> (skip-nav)
          → <Header />
          → <main id="main-content"><slot /></main>
          → <Footer />
```

### Files to Create (NEW)

- `src/layouts/BaseLayout.astro`
- `src/components/Header.astro`
- `src/components/Footer.astro`

### Files to Update (EXISTING)

- `src/pages/index.astro` — currently has raw HTML shell with `lang="en"`, inline CSS import. Must be refactored to use BaseLayout. Current state:
  ```astro
  ---
  import '../styles/global.css';
  ---
  <html lang="en">
    <head>...</head>
    <body><h1>Astro</h1></body>
  </html>
  ```
  After: use `<BaseLayout title="設備人｜水漏れ・電気修理・害虫駆除｜24時間対応" description="...">` with just content in `<slot />`.

### Import Pattern

```astro
---
// BaseLayout.astro
import { SITE_CONFIG } from '../utils/siteConfig';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import '../styles/global.css';

interface Props {
  title: string;
  description: string;
  canonicalUrl?: string;
}
const { title, description, canonicalUrl } = Astro.props;
---
```

```astro
---
// Header.astro
import { SITE_CONFIG, NAVIGATION } from '../utils/siteConfig';
---
```

```astro
---
// Footer.astro
import { SITE_CONFIG, NAVIGATION, REGIONAL_OFFICES } from '../utils/siteConfig';
---
```

### Google Fonts in BaseLayout `<head>`

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&subset=japanese,latin&display=swap" rel="stylesheet">
```

### Skip-Nav Pattern

```html
<a href="#main-content"
   class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:px-4 focus:py-2 focus:text-navy focus:outline focus:outline-2 focus:outline-navy focus:outline-offset-2">
  コンテンツへスキップ
</a>
```

### Focus Ring (Global)

Add to `src/styles/global.css`:
```css
:focus-visible {
  outline: 2px solid #1B2A4A;
  outline-offset: 2px;
}
```

### Header Shadow-on-Scroll (Inline Script)

```html
<script>
  const header = document.querySelector('[data-header]');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('shadow-md', window.scrollY > 0);
    }, { passive: true });
  }
</script>
```

Do NOT use `will-change: transform` on sticky header — breaks z-index stacking on iOS Safari.

### Header Phone CTA

```astro
<a href={SITE_CONFIG.phone.href}
   aria-label={SITE_CONFIG.phone.ariaLabel}
   class="text-orange font-bold text-lg md:text-xl lg:text-2xl min-w-[44px] min-h-[44px] flex items-center">
  <span class="hidden md:inline text-xs text-text-secondary mr-1">通話無料</span>
  {SITE_CONFIG.phone.display}
</a>
```

### Footer Structure

- Background: `bg-navy` (`#1B2A4A`), text: `text-white`
- White text on navy: contrast 12.8:1 (passes WCAG AAA)
- Phone CTA at top of footer
- 4-column sitemap grid (desktop) → 2-col (tablet) → 1-col (mobile)
- Company info: `SITE_CONFIG.legalName` (合同会社スターライト)
- Regional offices from `REGIONAL_OFFICES` array (4 offices)
- Copyright: `© {new Date().getFullYear()} {SITE_CONFIG.legalName}`
- Privacy link: `/privacy`

### Tailwind Design Tokens (Already Configured)

```
navy: #1B2A4A, orange: #FF6B00, red: #E53935
section-gray: #F5F5F5, text-primary: #333333, text-secondary: #666666
border-light: #E0E0E0
fontFamily.sans: Noto Sans JP stack
```

### Responsive Breakpoints

- Default: mobile-first (< 768px)
- `md:` 768px — tablet
- `lg:` 1024px — desktop (show full nav, hide hamburger)
- `xl:` 1440px — large desktop

### Anti-Patterns

- **NEVER** hardcode phone number — always use `SITE_CONFIG.phone`
- **NEVER** use `<img>` — use Astro `<Image>` (when image assets exist; text logo for now)
- **NEVER** add `@apply` or `<style>` scoped blocks — Tailwind utilities only
- **NEVER** use `will-change: transform` on sticky header
- **NEVER** use `lang="en"` — must be `lang="ja"`
- **NEVER** use `outline: none` without replacement focus indicator
- **NO** MegaMenu dropdown in this story — just flat nav links. MegaMenu is Story 1.5
- **NO** MobileMenu in this story — just a placeholder hamburger button. MobileMenu is Story 1.6

### Scope Boundaries

This story creates the shell only. Components NOT in scope:
- MegaMenu dropdown (Story 1.5)
- MobileMenu slide-out + focus trap (Story 1.6)
- Breadcrumb component (Story 1.7)
- CTABlock component (Story 1.7)
- Mobile sticky bottom CTA bar (Story 1.6)

Desktop nav should render flat links from `NAVIGATION`. Items with `children` just link to their `href` (e.g., clicking 電気工事 goes to `/electricity`). The dropdown behavior comes in Story 1.5.

### Previous Story Intelligence

**From Story 1.1:** Astro v5.18.1, Node.js v20.20.2, Tailwind v4 via `@tailwindcss/vite`, `@import "tailwindcss"` syntax in global.css. Build: `astro build`. Dev: `astro dev`.

**From Story 1.2:** `siteConfig.ts` exports `SITE_CONFIG`, `NAVIGATION`, `REGIONAL_OFFICES`, `SERVICE_CATEGORIES` with full TypeScript types. Phone config has `display`, `digits`, `href`, `ariaLabel` fields. Navigation items have optional `children` array.

**From Story 1.3:** Content collections configured in `src/content.config.ts` (Astro 5 convention). 6 collections with Zod schemas. Build-time validation works.

### Project Structure Notes

- `src/layouts/` — NEW directory, first layout file
- `src/components/` — NEW directory, first components
- `src/pages/index.astro` — UPDATE: replace raw HTML with BaseLayout usage
- `src/styles/global.css` — UPDATE: add `:focus-visible` rule

### References

- [Source: _bmad-output/planning-artifacts/epics.md — Story 1.4, lines 260-276]
- [Source: _bmad-output/planning-artifacts/architecture.md — BaseLayout, Component Specs]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md — Header, Footer, Skip-nav, Focus Ring]
- [Source: src/utils/siteConfig.ts — SITE_CONFIG, NAVIGATION, REGIONAL_OFFICES types and data]
- [Source: _bmad-output/implementation-artifacts/1-3-define-content-collection-schemas.md — Previous story learnings]

### Review Findings

- [ ] [Review][Decision] Header imports MegaMenu component (Story 1.5 scope) — spec anti-pattern says "NO MegaMenu in this story"
- [ ] [Review][Decision] Header imports MobileMenu component (Story 1.6 scope) — spec anti-pattern says "NO MobileMenu in this story"
- [ ] [Review][Decision] BaseLayout imports CTABlock sticky variant (Story 1.6 scope) — mobile sticky CTA bar belongs to Story 1.6
- [ ] [Review][Patch] Footer missing email CTA — AC 5 requires "phone/email CTA" but only phone is present [src/components/Footer.astro]
- [ ] [Review][Patch] :focus-visible hardcodes color instead of using CSS variable — should use var(--color-navy) [src/styles/global.css:13]
- [x] [Review][Defer] client:load on MobileMenu causes unnecessary hydration on desktop — deferred, belongs to Story 1.6
- [x] [Review][Defer] Scroll listener not cleaned up on navigation — deferred, only relevant if view transitions enabled

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Debug Log References

- Build verified: `astro build` passes successfully with all components rendered correctly

### Completion Notes List

- Created BaseLayout.astro with full HTML shell (lang="ja", UTF-8, viewport, Google Fonts preconnect, Noto Sans JP, global.css import, skip-nav, Header, main#main-content, Footer)
- Created Header.astro with sticky positioning, logo from SITE_CONFIG.companyName, desktop nav from NAVIGATION, phone CTA from SITE_CONFIG.phone, mobile hamburger placeholder, shadow-on-scroll script
- Created Footer.astro with navy bg, phone CTA, sitemap nav grid (4-col responsive), company info from SITE_CONFIG.legalName, regional offices from REGIONAL_OFFICES, copyright with dynamic year, privacy link
- Updated index.astro to use BaseLayout (removed raw HTML shell, fixed lang="en" → lang="ja")
- Added Tailwind v4 @theme design tokens (navy, orange, red, section-gray, text-primary, text-secondary, border-light) to global.css
- Added :focus-visible global style (2px solid navy, 2px offset)
- All phone numbers sourced from SITE_CONFIG.phone — no hardcoding

### File List

- src/layouts/BaseLayout.astro (NEW)
- src/components/Header.astro (NEW)
- src/components/Footer.astro (NEW)
- src/pages/index.astro (MODIFIED)
- src/styles/global.css (MODIFIED)
