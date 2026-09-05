# Epic 1 Context: New Brand Foundation & Home-Services Retirement

<!-- Generated from planning artifacts. Regenerate with compile-epic-context if planning docs change. -->

## Goal

Convert the brownfield Astro site into a clean, keiba-branded foundation for ウマノミカタ (working name). Identity, navigation, design tokens, compliance copy, and global chrome must come from centralized configuration, while every home-services route, asset, dependency, CMS surface, and legacy redirect is retired. The top page, 404, and trust-link destinations should already build as a coherent branded shell; each stage must keep `npm run build` green.

## Stories

- Story 1.1: Keiba Identity Configuration & Design Tokens
- Story 1.2: Retire the Home-Services Content Layer & Components
- Story 1.3: Deployment Config & Infra Cleanup
- Story 1.4: Branded Global Shell — Header, Footer, Top Page & 404

## Requirements & Constraints

- Present the keiba brand consistently in page chrome and metadata, with no home-services remnants reachable by users or crawlers (FR31).
- Retire all home-services routes, collections, contact flow, data modules, images, Decap `/admin` and `cms-auth` infrastructure (FR32). Do not migrate old content.
- Global navigation exposes four pillars (初心者向け, レース分析, ウマ娘×競馬, 用語集), menu-only trust links, and a reserved but commented 予想 slot for Phase 2. Footer carries the standing responsible-gambling/under-20 short notice (FR6, FR10).
- Remove the old setsubi-pro redirect map; launch keeps one apex↔www canonical-host redirect. New URL changes require same-change 301 discipline (FR25).
- Preserve static-only delivery, strict security headers/CSP, no secrets, no webfonts, and zero hydrated islands in MVP. Add no npm dependencies; retain React integration only for future Phase-2 islands.
- `npm run build` is the sole quality gate; TypeScript/Zod failures block publishing. Keep Lighthouse/CWV and zero-client-JS performance posture intact.

## Technical Decisions

- This is conversion-in-place on Astro 5 static output with Tailwind CSS v4 tokens in `src/styles/global.css`, TypeScript strict, `@config/*` aliases, Vercel hosting, and no starter template.
- `src/config/` is the identity boundary. Rewrite `SITE_CONFIG` (placeholder site name/domain, logo, defaults, RSS title, social links), `navigation.ts`, and `theme.ts`; delete `services.ts`; add `AUTHOR_CONFIG`, typed `raceCalendar.ts`/`getRaceWeek()`, and `compliance.ts` (notices, banned wording, disclosure links). Final domain/name is a one-constant cutover in `site.ts`.
- The `@theme` palette is exactly the UX contract: ink/ink-soft, brand/brand-tint, turf/turf-tint, accent, bridge, paper/paper-warm, line, win, loss, notice, plus the Japanese system-font stack. `theme.ts` mirrors tokens as CSS-variable strings; no hex values elsewhere. Retain overflow-wrap, article numbering, and anchor scroll-margin helpers.
- Retirement is exhaustive: remove legacy route trees and collections, 19 named home-service components plus `ServiceSlider.tsx`, legacy `src/data`, home-service assets/build artifacts, admin docs, carousel/Formspree packages, and old schema generators. Keep only generic SEO generators and repoint Organization data to `SITE_CONFIG`.
- `vercel.json` uses one `/(.*)` security-header scope and baseline CSP (`default-src 'self'`, inline self script/style, self/data images and connections, `form-action 'self'`, `object-src 'none'`, `base-uri 'self'`); remove Formspree/Google Fonts allowances. `astro.config.mjs` loses Decap sitemap filtering and is prepared for future lastmod plumbing.

## UX & Interaction Patterns

Use the Quiet Magazine visual base: deep ink-navy authority, restrained light palette, Japanese system typography, and no dark theme. Header is sticky (~56px mobile/~64px desktop); mobile uses a vanilla-script hamburger with focus trap and `aria-expanded`, while pillar links are inline at `md:`. Footer is a four-column IA (pillars, trust, channels, compliance) with the same calm notice on every page. The shell uses semantic `lang="ja"`, skip link as the first focusable element, one h1/sequential headings, visible 2px brand focus outlines, ≥44px touch targets, and no horizontal overflow at 320–375px. Initial top/404 pages are minimal branded placeholders; `/about/`, `/editorial-policy/`, `/responsible-gambling/`, and `/privacy/` stubs must resolve so navigation never dead-ends.

## Cross-Story Dependencies

Identity/token modules (1.1) are the source of truth consumed by retirement cleanup, deployment configuration, and the global shell (1.2–1.4). Infrastructure cleanup (1.3) must occur before shell verification so redirects, CSP scope, and admin removal are tested together. Shell placeholders and trust routes established in 1.4 are prerequisites for later content, SEO, compliance, and distribution epics; future launch work changes only the placeholder brand/domain constants after external validation.
