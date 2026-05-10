# Story 1.6: Build Mobile Menu and Sticky CTA Bar

Status: review

## Story

As a mobile visitor,
I want a hamburger menu and a sticky phone CTA bar,
so that I can navigate the site and call immediately from any scroll position.

## Acceptance Criteria

1. **Given** a mobile visitor (viewport < 768px), **When** the page loads, **Then** hamburger icon is visible in the header (top-right)
2. **Given** the hamburger is tapped, **When** the menu opens, **Then** a slide-from-right full-screen menu appears with same links as mega-menu + phone CTA
3. **Given** the mobile menu is open, **When** focus is inside, **Then** focus trap is active (`aria-modal="true"`), Escape closes it, body scroll is locked
4. **Given** any mobile page, **When** scrolling, **Then** a sticky bottom CTA bar with phone number `0120-219-695` is always visible (UX-DR4)
5. **Given** any phone link on mobile, **When** tapped, **Then** `tel:0120219695` initiates one-tap calling (FR6)
6. **Given** any interactive element, **When** touched, **Then** minimum touch target is 44x44px

## Tasks / Subtasks

- [x] Task 1: Create `MobileMenu.tsx` React island (AC: #2, #3)
  - [x] 1.1 Import `NAVIGATION` from `siteConfig.ts` — render all nav items including service sub-categories
  - [x] 1.2 Slide-from-right animation: `transform: translateX(100%)` → `translateX(0)`, 300ms ease
  - [x] 1.3 Semi-transparent black backdrop overlay, dismiss on backdrop tap
  - [x] 1.4 Focus trap: on open, trap Tab/Shift+Tab within menu; on close, return focus to hamburger trigger
  - [x] 1.5 Body scroll lock: `document.body.style.overflow = 'hidden'` on open, restore on close
  - [x] 1.6 Dismiss triggers: X button, backdrop tap, Escape key, swipe right (optional)
  - [x] 1.7 ARIA: `aria-modal="true"`, `role="dialog"`, `aria-label="ナビゲーションメニュー"`
  - [x] 1.8 Phone CTA inside menu using `SITE_CONFIG.phone`
  - [x] 1.9 Respect `prefers-reduced-motion`: disable slide animation, use instant show/hide
- [x] Task 2: Create `CTABlock.astro` with sticky variant (AC: #4, #5, #6)
  - [x] 2.1 Component with `variant` prop: `'full-width' | 'compact' | 'sticky'`
  - [x] 2.2 Sticky variant: `fixed bottom-0 left-0 right-0 z-40`, phone from `SITE_CONFIG.phone`
  - [x] 2.3 Show sticky bar only on mobile (`lg:hidden`), hide on desktop
  - [x] 2.4 Display: phone number + "通話無料" label + WEB割引 badge (rotated ~-5deg, red/orange bg)
  - [x] 2.5 `aria-label="無料電話 0120-219-695"` on phone link, 44x44px min touch target
  - [x] 2.6 Full-width and compact variants: basic structure (will be refined in Story 1.7)
- [x] Task 3: Update `Header.astro` to wire hamburger button (AC: #1)
  - [x] 3.1 Add `id="mobile-menu-trigger"` and `aria-controls="mobile-menu"` to hamburger button
  - [x] 3.2 Add `aria-expanded="false"` to hamburger button (MobileMenu.tsx toggles this)
  - [x] 3.3 Import and render `<MobileMenu client:load />` island
- [x] Task 4: Update `BaseLayout.astro` to include sticky CTA (AC: #4)
  - [x] 4.1 Add `<CTABlock variant="sticky" />` before closing `</body>` (after Footer)
  - [x] 4.2 Add bottom padding to `<main>` or `<body>` to prevent sticky bar from covering content (~60-70px)
- [x] Task 5: Verify build and test (AC: all)
  - [x] 5.1 `astro build` passes with no errors
  - [ ] 5.2 Manual test: hamburger open/close, focus trap, Escape, backdrop dismiss
  - [ ] 5.3 Manual test: sticky CTA visible on scroll, tel: link works
  - [ ] 5.4 Keyboard test: Tab through menu items, focus trapped, focus returns on close

## Dev Notes

### MobileMenu.tsx — Architecture Decision

Architecture specifies MobileMenu as a **React island** (`.tsx`), not vanilla JS. Use `client:load` directive since the menu must be interactive immediately. The ~1KB JS budget is tight — keep the component lean:

- NO external focus-trap libraries — implement manually with `keydown` listener on Tab
- NO animation libraries — CSS `transform` + `transition` only
- NO state management libraries — React `useState` for open/close state

**Focus trap implementation pattern:**
```tsx
function trapFocus(e: KeyboardEvent) {
  const focusable = menuRef.current?.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );
  if (!focusable?.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (e.key === 'Tab') {
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  }
  if (e.key === 'Escape') setIsOpen(false);
}
```

**Body scroll lock pattern:**
```tsx
useEffect(() => {
  if (isOpen) {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }
}, [isOpen]);
```

### Data Access in MobileMenu.tsx

MobileMenu is a React component — it CANNOT import from `.astro` files or use Astro APIs. Pass navigation data as props from Header.astro:

```astro
<!-- In Header.astro -->
<MobileMenu client:load navigation={NAVIGATION} phone={SITE_CONFIG.phone} />
```

The `NAVIGATION` and `SITE_CONFIG.phone` types are exported from `siteConfig.ts` (pure TS, no Astro dependency) — the React component CAN import types from there.

### CTABlock.astro — Sticky Variant Specifics

- Position: `fixed bottom-0 left-0 right-0 z-40` (below header z-50)
- Visible only on mobile: wrap in `lg:hidden`
- Background: white with top border or subtle shadow for separation
- Phone number from `SITE_CONFIG.phone.href` and `SITE_CONFIG.phone.display`
- WEB割引 badge: `bg-red text-white text-xs font-bold px-2 py-1 rounded transform -rotate-[5deg]`
- Bottom safe area for iOS: `pb-[env(safe-area-inset-bottom)]`

### Header.astro Modification

Current state (line 26-34): hamburger button exists but has no `aria-controls`, `aria-expanded`, or connected menu panel.

**Changes required:**
1. Add `id="mobile-menu-trigger"`, `aria-controls="mobile-menu"`, `aria-expanded="false"` to the `<button>`
2. Import `MobileMenu` from `./MobileMenu.tsx`
3. Render `<MobileMenu client:load navigation={NAVIGATION} phone={SITE_CONFIG.phone} />` after the header
4. MobileMenu.tsx will querySelector `#mobile-menu-trigger` to toggle `aria-expanded`

**Preserve:** scroll shadow script (`[data-header]`), MegaMenu import, phone CTA, all existing classes and structure.

### Files to Create/Modify

| File | Action | Notes |
|------|--------|-------|
| `src/components/MobileMenu.tsx` | NEW | React island ~1KB, focus trap, slide menu |
| `src/components/CTABlock.astro` | NEW | 3 variants, sticky for this story |
| `src/components/Header.astro` | MODIFY | Wire hamburger to MobileMenu, add ARIA |
| `src/layouts/BaseLayout.astro` | MODIFY | Add sticky CTABlock, bottom padding |

### Breakpoint Behavior

| Component | Mobile (<768px) | md (768px+) | lg (1024px+) |
|-----------|----------------|-------------|--------------|
| Hamburger button | Visible | Visible | Hidden (`lg:hidden`) |
| MobileMenu panel | Available | Available | Hidden |
| Sticky CTA bar | Visible | Hidden (`md:hidden`) | Hidden |
| Desktop MegaMenu | Hidden | Hidden | Visible |

### Anti-Patterns — DO NOT

- DO NOT use `will-change: transform` — breaks iOS Safari z-index stacking
- DO NOT hardcode phone number — use `SITE_CONFIG.phone`
- DO NOT add `@apply` or scoped `<style>` blocks — Tailwind utilities only
- DO NOT use animation libraries — CSS transitions only
- DO NOT add scroll-triggered animations, parallax, or decorative effects
- DO NOT import Astro-specific APIs in `.tsx` files
- DO NOT use `outline: none` — global `:focus-visible` handles focus rings
- DO NOT use boolean props for variants — use string enum `variant` prop
- DO NOT add external focus-trap packages — implement with manual keydown handler

### Previous Story Intelligence

**From Story 1.4 (BaseLayout + Header + Footer):**
- Header uses `sticky top-0 z-50` — MobileMenu overlay must use z-50+ to appear above
- `[data-header]` selector used for scroll shadow — do not conflict
- Phone CTA pattern established: `SITE_CONFIG.phone.href` + `SITE_CONFIG.phone.ariaLabel`
- Skip-nav is first focusable element — keep it before Header
- Footer uses `NAVIGATION`, `REGIONAL_OFFICES` from siteConfig

**From Story 1.5 (MegaMenu):**
- Desktop nav is `hidden lg:flex` — appears at 1024px breakpoint
- Hamburger button is `lg:hidden` — visible below 1024px
- MegaMenu uses `data-menu-group`, `data-menu-trigger`, `data-menu-panel` attributes — do not conflict
- Dropdown z-index is z-40 — sticky CTA should also be z-40 (non-overlapping position)

### Testing Requirements

- `astro build` must pass with no errors
- Manual browser test at 375px viewport (iPhone SE):
  - Hamburger tap → menu slides from right
  - All nav items visible including service sub-categories
  - Phone CTA inside menu works
  - X button / backdrop tap / Escape all close menu
  - Focus trapped inside menu when open
  - Sticky bottom bar visible, phone number tappable
- Keyboard test: Tab cycles within menu, Escape closes
- `prefers-reduced-motion`: verify animations disabled
- Verify desktop (1024px+): hamburger hidden, sticky CTA hidden, MegaMenu visible

### Project Structure Notes

- Components in flat `src/components/` directory (no sub-folders)
- React islands use `.tsx` extension
- Astro components use `.astro` extension
- All shared data from `src/utils/siteConfig.ts`
- Tailwind v4 via `@tailwindcss/vite` — design tokens in `global.css` `@theme` block

### References

- [Source: _bmad-output/planning-artifacts/epics.md — Epic 1, Story 1.6]
- [Source: _bmad-output/planning-artifacts/architecture.md — Frontend Architecture, Component Boundaries, Island Boundary]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md — MobileMenu spec, Sticky CTA, Navigation Patterns]
- [Source: _bmad-output/implementation-artifacts/1-4-build-baselayout-with-header-and-footer.md — Header patterns]
- [Source: _bmad-output/implementation-artifacts/1-5-build-desktop-megamenu-navigation.md — MegaMenu patterns]

## Dev Agent Record

### Agent Model Used
Claude Opus 4.6

### Debug Log References
- Build passed with no errors on first attempt

### Completion Notes List
- MobileMenu.tsx: React island with useState, focus trap (manual keydown), body scroll lock, backdrop dismiss, Escape key, prefers-reduced-motion support, ARIA dialog attributes. Navigation data passed as props from Header.astro.
- CTABlock.astro: 3 variants (sticky/full-width/compact). Sticky uses fixed positioning, md:hidden, safe-area-inset-bottom for iOS, WEB割引 badge with -rotate-[5deg].
- Header.astro: Added id, aria-controls, aria-expanded to hamburger button. Imported and rendered MobileMenu with client:load.
- BaseLayout.astro: Added CTABlock sticky after Footer, pb-[60px] md:pb-0 on main to prevent content overlap.
- Manual testing (5.2-5.4) requires browser verification by developer.

### File List
- src/components/MobileMenu.tsx (NEW)
- src/components/CTABlock.astro (NEW)
- src/components/Header.astro (MODIFIED)
- src/layouts/BaseLayout.astro (MODIFIED)
