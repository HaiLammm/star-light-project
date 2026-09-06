---
baseline_commit: bcf754a0387ef97620b4df9098b71f2e85b44b7a
---

# Story 1.4: Branded Global Shell — Header, Footer, Top Page & 404

Status: done

## Story

As a reader,
I want a consistent keiba-branded header, footer, minimal top page, and styled 404,
so that every first-deploy page presents the new brand, pillar navigation, and standing compliance notice.

## Acceptance Criteria

1. `BaseLayout.astro` renders `lang="ja"`, `SITE_CONFIG`-derived title/description/canonical/OG defaults, semantic landmarks, the skip link as the first focusable element, and no analytics beacon (analytics is Epic 7).
2. `Header.astro` is sticky and 56px high on mobile / 64px on desktop; it renders the configured logo, a mobile hamburger with `aria-expanded` and `aria-controls`, and inline pillar links at the `md:` breakpoint. Navigation labels/hrefs come only from `src/config/navigation.ts`.
3. `MobileMenu.astro` retains vanilla-script behavior: full-screen overlay, Escape and overlay close, focus trap, body-scroll lock, focus return to trigger, and correct `aria-expanded`; it uses the four current pillars plus trust links and does not add a React island.
4. `Footer.astro` renders four information groups (pillars, trust pages, channels, compliance) as desktop columns and stacked mobile lists, using `FOOTER_NAV`; channel links use `SITE_CONFIG.socialLinks` and include RSS/newsletter touchpoints where configured.
5. Every page footer includes the centralized short notice from `COMPLIANCE` (including 「馬券の購入は20歳になってから」 and a `/responsible-gambling/` link) and copyright. No notice text is duplicated in components.
6. `src/pages/index.astro` composes `BaseLayout` into the stage-2 minimal branded top page: pillar-chip row, placeholder hero on `--color-paper-warm`, and footer. It must leave explicit composition points for Epic 3's RaceWeekModule, BeginnerOnrampBox, featured hero, and latest rows without implementing those modules now.
7. `src/pages/404.astro` is a styled recovery page with apology text, links to all four pillars, and a top-page link. It does not use a dead search/form, modal, or `BeginnerOnrampBox` (deferred until the component exists in Epic 3).
8. Branded trust stubs exist and resolve at `/about/`, `/editorial-policy/`, `/responsible-gambling/`, and `/privacy/`; each uses `BaseLayout`, has one sequential `h1`, and contains clearly marked placeholder copy for Epic 4 content.
9. Interactive elements have visible 2px brand focus outlines and at least 44×44px touch targets; the layout has no horizontal overflow at 320px, and manual checks pass at 375px and 1240px+.
10. `npm run build` exits successfully with strict TypeScript/content validation and all generated shell routes resolve.

## Tasks / Subtasks

- [x] Rebuild the shared shell (AC 1–5)
  - [x] Read and extend the existing `BaseLayout.astro`, `Header.astro`, `Footer.astro`, and `MobileMenu.astro`; preserve JSON-LD generators, OGP defaults, `lang="ja"`, and current vanilla menu mechanics.
  - [x] Add the mobile trigger and desktop/mobile navigation branches using `PILLAR_NAVIGATION`, `TRUST_MENU`, `FOOTER_NAV`, and `SITE_CONFIG`.
  - [x] Add the centralized compliance notice and verify all links resolve.
- [x] Replace the top page (AC 6)
  - [x] Add pillar chips and warm-paper placeholder hero with calm Japanese copy and a single primary action at most.
  - [x] Keep future Epic 3 module order documented in composition comments/markup without adding fake content routes.
- [x] Replace 404 and add trust stubs (AC 7–8)
  - [x] Implement recovery links for all pillars and `/`.
  - [x] Add four branded stub routes with canonical URLs and concise placeholder copy.
- [x] Accessibility/responsive verification (AC 9)
  - [x] Keyboard-walk skip link, hamburger, menu links, footer links; verify focus visibility and focus return.
  - [x] Inspect 320px/375px/1240px renders for JP wrapping and overflow.
- [x] Run `npm run build` and record results (AC 10).

## Dev Notes

### Architecture and implementation guardrails

- Astro `^5.18`, static output, TypeScript strict, Tailwind `^4.2` CSS `@theme`; do not add dependencies, webfonts, analytics, or server endpoints.
- Every page must wrap `BaseLayout.astro`; route files compose components rather than duplicating shell markup. Components remain flat under `src/components/`.
- Use config imports via `@config/*`: `SITE_CONFIG`, `PILLAR_NAVIGATION`, `TRUST_MENU`, `FOOTER_NAV`, and `COMPLIANCE`. Never hardcode brand URLs, hex colors, or notice wording.
- Use existing token utilities/CSS variables; hex values belong only in `src/styles/global.css`'s `@theme`. Respect JP system fonts, `overflow-wrap` helpers, `md:` as the structural breakpoint, and 44px touch targets.
- Keep content pages zero-JS by default. The only shell script is the existing vanilla mobile-menu toggle. Do not add `client:load`; no React island is needed.
- Preserve `generateOrganization()`/`generateWebSite()` JSON-LD and `serializeJsonLd()` in `BaseLayout`; do not inline JSON-LD. Canonicals use `SITE_CONFIG.siteUrl`.
- The footer's standing notice is the short form only. In-content betting notices and full policy copy belong to Epic 4/templates; do not implement them here.
- `BeginnerOnrampBox`, RaceWeekModule, article templates, and real content are future stories. Do not create “coming soon” routes for them.

### Current files to update (read before editing)

- `src/layouts/BaseLayout.astro`: already provides head/meta/OGP, site JSON-LD, `lang="ja"`, skip link, `<main id="main-content">`, Header, and Footer. Preserve these behaviors while tightening semantics and defaults.
- `src/components/Header.astro`: currently logo-only and has no trigger/nav. Add the responsive navigation and trigger while retaining sticky shell and configured logo.
- `src/components/MobileMenu.astro`: already implements focus trap, Escape/overlay close, body lock, and focus return, but expects `#mobile-menu-trigger`; wire the trigger and new navigation without replacing the script with React.
- `src/components/Footer.astro`: currently logo/copyright only. Extend it from `FOOTER_NAV` and `COMPLIANCE.notices.footer`.
- `src/pages/index.astro`: current “準備中” placeholder. Replace with the minimal top composition; retain `SITE_CONFIG` as the source of metadata.
- `src/pages/404.astro`: current single home-link recovery page. Add pillar links and preserve a valid branded fallback.
- `src/pages/privacy.astro`: existing branded stub; align it with the trust-stub pattern and add the three missing trust routes.
- `src/config/navigation.ts`, `src/config/site.ts`, `src/config/compliance.ts`, `src/styles/global.css`: authoritative data/tokens already created by Story 1.1; consume rather than duplicate or rename their exports.

### Project structure and integration notes

Expected new files: `src/pages/about/index.astro`, `src/pages/editorial-policy/index.astro`, `src/pages/responsible-gambling/index.astro`. Keep `/privacy/` at its existing route unless the implementation standardizes all trust pages to directory indexes without changing the public URL. No new top-level directories.

The current worktree contains unrelated in-progress Story 1.3 verification edits (`tests/deploymentConfig.test.ts`, `src/utils/sitemap.mjs`, and modified deployment/spec files). Do not revert or broaden those changes. `sprint-status.yaml` is workflow-owned; update only the target story status as part of finalization.

### Testing requirements

- Primary gate: `npm run build` (must remain green; warnings about intentionally empty future content loaders are not a reason to weaken schemas/config).
- Manual responsive QA at 320px, 375px, and 1240px+; verify no horizontal overflow, sequential headings, Japanese labels, and calm single-column mobile layout.
- Keyboard QA: skip link first, menu open/close/focus trap/Escape/focus return, all nav/footer links, visible 2px focus outline. Confirm no overlay other than MobileMenu and no 100vh-dependent layout.
- Smoke-check built routes `/`, `/404/`, `/about/`, `/editorial-policy/`, `/responsible-gambling/`, `/privacy/`; removed legacy routes must not be reintroduced.

### References

- [Source: `_bmad-output/planning-artifacts/epics.md` — Epic 1, Story 1.4]
- [Source: `_bmad-output/planning-artifacts/architecture.md` — D2/D5 shell, route map, AR8/AR16/AR18, project structure]
- [Source: `_bmad-output/planning-artifacts/ux-design-specification.md` — header/footer/navigation, responsive, accessibility, 404 guidance]
- [Source: `_bmad-output/project-context.md` — Astro/Tailwind/static-first/import/testing rules]
- [Source: `_bmad-output/implementation-artifacts/spec-1-3-deployment-config-and-infra-cleanup.md` — current Epic 1 baseline and deployment constraints]
- [Latest technical reference: Tailwind CSS theme variables and `@theme` custom colors](https://tailwindcss.com/docs/theme) — keep token-driven utilities in CSS rather than adding a JS config.

## Dev Agent Record

### Agent Model Used

GPT-5 (Codex)

### Debug Log References

### Completion Notes List

- Ultimate context engine analysis completed - comprehensive developer guide created.
- Implemented config-driven branded header, vanilla mobile menu, grouped footer, and centralized Japanese compliance notice.
- Added stage-2 branded home composition, pillar-aware 404 recovery, and `/about/`, `/editorial-policy/`, `/responsible-gambling/`, and `/privacy/` trust stubs.
- Validation passed: `npm test` (2 tests) and `npm run build` (6 static routes, strict type/content validation).
- Review remediation passed: `npm test` (3 tests) and `npm run build` (6 static routes, strict type/content validation); all 11 review patches applied.

### File List

- `_bmad-output/implementation-artifacts/1-4-branded-global-shell-header-footer-top-page-and-404.md`
- `src/layouts/BaseLayout.astro`
- `src/components/Header.astro`
- `src/components/MobileMenu.astro`
- `src/components/Footer.astro`
- `src/config/compliance.ts`
- `src/pages/index.astro`
- `src/pages/404.astro`
- `src/pages/privacy.astro`
- `src/pages/about/index.astro`
- `src/pages/editorial-policy/index.astro`
- `src/pages/responsible-gambling/index.astro`
- `src/config/navigation.ts`
- `src/config/site.ts`
- `src/utils/sitemap.mjs`
- `astro.config.mjs`
- `package.json`
- `tests/deploymentConfig.test.ts`
- `tests/raceCalendar.test.ts`
- `tests/shellContract.test.ts`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`
- `_bmad-output/implementation-artifacts/spec-1-3-deployment-config-and-infra-cleanup.md`
- `_bmad-output/implementation-artifacts/deferred-work.md`

### Change Log

- 2026-09-06: Implemented branded global shell, top page, 404 recovery, trust stubs, and validation updates.
- 2026-09-06: Applied all code-review patches for mobile-menu behavior, accessibility targets, config-driven metadata/channels, shell contract tests, and sprint tracking.

### Review Findings

- [x] [Review][Patch] Restore a functional mobile overlay and overlay-close path — AC3 requires a full-screen overlay with overlay close, but `MobileMenu.astro` mounts both the overlay and a later `fixed inset-0` dialog as siblings; the dialog covers the overlay and the menu is mounted inside the header's `backdrop-blur` containing block, so the overlay is not reliably viewport-wide or clickable (`src/components/MobileMenu.astro:13-22,89`).
- [x] [Review][Patch] Add a visible mobile-menu close control — Once open, the trigger is hidden behind the full-screen panel and there is no in-menu close button, leaving touch users without an explicit close affordance (`src/components/MobileMenu.astro:15-38`).
- [x] [Review][Patch] Clean up mobile-menu state when the viewport crosses the breakpoint — `md:hidden` can hide an open menu without calling `close()`, leaving body scrolling locked, the Escape listener attached, and stale `isOpen` state (`src/components/MobileMenu.astro:41-90`).
- [x] [Review][Patch] Complete focus and touch-target coverage for shell links — AC9 requires visible 2px focus outlines and 44×44px targets; the 404 top-page CTA has no focus-visible outline, and footer compliance/social links lack a 44px minimum width/height (`src/pages/404.astro:22`, `src/components/Footer.astro:16,29`).
- [x] [Review][Patch] Add the required apology to the 404 page — AC7 explicitly requires apology text, but the current copy only describes a moved/deleted page (`src/pages/404.astro:15-17`).
- [x] [Review][Patch] Derive the 404 title from `SITE_CONFIG` — The title hardcodes `ウマノミカタ`, violating centralized branding and allowing stale metadata after a config rename (`src/pages/404.astro:8`).
- [x] [Review][Patch] Remove or properly configure dead social-channel links — `FOOTER_NAV` provides `#` for X and LINE, so the rendered footer exposes controls that only jump to the current page; channel destinations should come from configured social links or be omitted until configured (`src/config/navigation.ts:11-12`, `src/components/Footer.astro:14-17`).
- [x] [Review][Patch] Provide configured RSS/newsletter touchpoints when available — AC4 requires RSS/newsletter touchpoints where configured, but the footer has no RSS/newsletter entries or configuration path despite `SITE_CONFIG.rssTitle` (`src/config/navigation.ts:11-12`, `src/config/site.ts:10`).
- [x] [Review][Patch] Add executable verification for Story 1.4 shell behavior — Current tests do not render routes or exercise header/footer composition, compliance copy, trust stubs, 404 recovery, responsive targets, or mobile-menu keyboard/overlay behavior; `npm test` can pass while these regress (`package.json:5-9`, `tests/deploymentConfig.test.ts`, `tests/raceCalendar.test.ts`).
- [x] [Review][Patch] Do not roll Story 1.3 back to backlog in this story’s patch — The diff changes `1-3-deployment-config-and-infra-cleanup` from `review` to `backlog` while advancing 1.4, contrary to the story note to update only the target story status (`_bmad-output/implementation-artifacts/sprint-status.yaml:59-60`).
- [x] [Review][Patch] Keep the story File List complete — The recorded File List omits modified implementation/deployment files bundled in this diff, including `package.json`, `astro.config.mjs`, tests/utilities, sprint status, and the Story 1.3 artifact (`_bmad-output/implementation-artifacts/1-4-branded-global-shell-header-footer-top-page-and-404.md:118-132`).
