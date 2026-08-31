---
stepsCompleted:
  [
    step-01-validate-prerequisites,
    step-02-design-epics,
    step-03-create-stories,
    step-04-final-validation,
  ]
completedAt: '2026-08-26'
project_name: 'racing-horse (ウマノミカタ working name)'
totalEpics: 8
totalStories: 28
mvpStories: 25
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/architecture.md
  - _bmad-output/planning-artifacts/ux-design-specification.md
  - _bmad-output/project-context.md
---

# Keiba Media Pivot (ウマノミカタ) - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for the Keiba Media Pivot (ウマノミカタ), decomposing the requirements from the PRD, UX Design Specification, and Architecture Decision Document into implementable stories. This is a brownfield conversion of the existing Astro 5 static site (star-light heritage); epic ordering follows the architecture's six-stage build-green conversion sequence so `npm run build` stays green at every stage boundary.

## Requirements Inventory

### Functional Requirements

**Content Library & Reading Experience**

- FR1: Readers can browse and read beginner guides (出馬表 reading, bet types, first track day, online betting onboarding) without registration or payment.
- FR2: Readers can look up keiba terminology in a glossary, and encounter jargon terms explained inline wherever they appear in articles.
- FR3: Readers can read Uma Musume bridge articles — factual profiles of the real horses behind characters — and follow links from them into beginner guides and race content.
- FR4: Readers can read G1/重賞 deep-dive articles (history, course characteristics, pedigree stories, horse profiles) organized around the JRA race calendar.
- FR5: Readers can visit a per-race hub page for each covered G1 that accumulates and surfaces that race's content across years.
- FR6: Readers can navigate by content pillar (beginner hub, magazine, glossary) from any page.
- FR7: Readers can discover related content from any article (internal linking by topic, race, and horse).

**Trust & Compliance Infrastructure**

- FR8: Readers can view the named author's profile page, credentials, and the site's editorial policy.
- FR9: Readers can see an AI-assistance disclosure explaining how content is produced and reviewed.
- FR10: Readers see responsible-gambling and under-20 notices on every prediction-related and betting-related page.
- FR11: All published race facts stay within the documented data boundary (prose facts, hand-curated history; no bulk data tables, no scraped content) — verifiable per article.
- FR12: Prediction-related content contains no profitability claims and uses 景品表示法-safe language patterns.

**Prediction Ledger**

- FR13: The operator can record a prediction entry (picks + reasoning) with a pre-race timestamp before the race runs. *(MVP: private)*
- FR14: The operator can record each prediction's actual result and computed outcome after the race, with entries immutable once recorded.
- FR15: The operator can view the accumulated hit-rate/ROI record across all entries to evaluate the dry run. *(MVP: private)*
- FR16: Readers can view the public ledger — every published prediction with its result, including losses, and honest aggregate ROI. *(Phase 2)*
- FR17: Readers can read the prediction methodology page explaining how predictions are made and framed. *(Phase 2)*
- FR18: Readers can read weekly prediction articles for graded races, published before the race. *(Phase 2)*

**Distribution & Audience Channels**

- FR19a: Readers can follow the site's X account from touchpoints on the site.
- FR19b: The operator can publish a thread version of each G1 deep-dive to X.
- FR20: Readers can subscribe to a weekend newsletter and/or LINE channel from any page, timed to the JRA calendar.
- FR21: Readers can subscribe to the site's RSS feed.
- FR22: Shared links render correct OGP previews (title, 1200×675 image) on X and LINE, including in-app browsers.

**Search Discovery & SEO**

- FR23: Every content page carries complete structured data (Article JSON-LD, BreadcrumbList, Organization identity) per the site's SEO playbook, rendering as rich results.
- FR24: Search engines receive an accurate sitemap with per-page last-modified dates driven by content update dates.
- FR25: Every published URL remains stable; renamed or removed URLs 301-redirect (raw + percent-encoded forms for Japanese URLs).
- FR26: The launch article set targets keywords committed via the pre-MVP keyword-gap research.

**Content Operations (Operator)**

- FR27: The operator can produce articles via the AI pipeline and pass each through a mandatory human review checklist (fact-check, Japanese QA, tone/policy check) before publish.
- FR28: Content missing required editorial metadata (title/description within length rules, dates, category, images, alt text) cannot be published — enforcement is automatic, not a manual checklist step.
- FR29: The operator can execute a defined weekly race-cadence workflow (deep-dive, thread, ledger entry, result recording) and a documented fallback mode when capacity is reduced.
- FR30: The operator can verify SEO/rich-results compliance per release via a repeatable publish checklist.

**Site Identity & Migration**

- FR31: The site presents the new keiba brand (validated name, logo, theme) consistently on every page and in every metadata surface — no home-services remnants reachable by users or crawlers.
- FR32: The conversion retires all home-services routes, categories, the contact flow, and the Decap CMS surface (/admin plus its auth worker), with deliberate handling of legacy URLs and site identity.

**Analytics & Measurement**

- FR33: The operator can measure the success-criteria metrics: organic sessions, return-visitor rate, ranking positions, subscriber counts, and G1-week cadence adherence.
- FR34: Measurement stays within the privacy-light posture defined in NFR15 (cookieless, CSP-compatible, <5KB page-weight impact) — no tracking beyond it, protecting the trust brand.

### NonFunctional Requirements

**Performance**

- NFR1: Mobile Lighthouse Performance ≥99 on every page type (article, hub, glossary, top) at every release; verified before deploy whenever hero, layout, fonts, images, or islands change.
- NFR2: Core Web Vitals on real mobile devices: LCP <1.5s, CLS <0.02, INP <200ms on a mid-range Android over 4G.
- NFR3: Content pages ship zero client-side JS by default; any island must use `client:visible` and be justified against the performance budget in its PR/commit.
- NFR4: All images are delivered in a size- and format-optimized form that holds the NFR1/NFR2 budgets, with explicit dimensions (CLS ≈ 0); only the LCP hero loads eagerly.

**Security**

- NFR5: The site remains fully static — no server endpoints, no secrets in the repository or client code; the only external runtime calls are the newsletter/LINE signup and analytics endpoints, each allowlisted in CSP in the same change that introduces it.
- NFR6: Security headers (HSTS, X-Frame-Options, strict CSP) are never weakened; header config is reviewed whenever `vercel.json` changes.
- NFR7: Subscriber data (newsletter/LINE) lives only in the chosen provider — the site never stores personal data itself.

**Compliance & Content Integrity**

- NFR8: 100% of published pages pass the data-boundary rule (prose facts and hand-curated history only; no bulk results tables, no scraped or licensed-feed data) — checked in the publish checklist.
- NFR9: 100% of prediction/betting-related pages carry the responsible-gambling + under-20 notice and contain no profitability claims (景品表示法-safe wording list maintained in the editorial policy).
- NFR10: Ledger integrity: prediction entries are timestamped before race start and never edited or deleted after results are recorded; corrections append, never overwrite.
- NFR11: Every AI-assisted article records that a human review pass (fact-check + Japanese QA) occurred before publish; the AI-assistance disclosure stays accurate to the actual process.
- NFR12: Uma Musume bridge content uses only factual real-horse information — no game assets, character names in titles kept within nominative fair-use framing, re-checked against Cygames guidelines quarterly.

**Integration**

- NFR13: Newsletter/LINE provider integration must work under the strict CSP, add no render-blocking scripts, and degrade gracefully (a failed signup widget never breaks the page).
- NFR14: ≥90% of AI-pipeline article drafts pass content validation (required metadata, title/description length rules) without manual per-file fixes; recurring validation failures are corrected at the pipeline level, not article by article.
- NFR15: Analytics collection is cookieless/privacy-light, CSP-compatible, and adds <5KB to page weight.

**Operability (Solo Operator)**

- NFR16: The weekly race-cadence loop (deep-dive review + thread + ledger entry + result recording) fits within the declared weekly hour budget of 10 hours/week; if a step routinely pushes the loop over budget, the workflow — not the operator — is adjusted.
- NFR17: `npm run build` remains the single quality gate: TS strict + Zod violations block publish; a failed build can never partially deploy.
- NFR18: The fallback mode is documented and executable: reduced race-week output (deep-dive only) without breaking site integrity, cadence promises, or ledger continuity.
- NFR19: Content publishing requires no infrastructure beyond git push → Vercel build; recovery from any bad deploy is a git revert.

### Additional Requirements

**From Architecture — conversion strategy (binding):**

- AR1: No starter template — this is a brownfield conversion-in-place of the existing `racing-horse` codebase on a feature branch; the first implementation work is the identity/token rewrite followed by the retirement pass, not scaffolding.
- AR2: The conversion follows the six-stage build-green implementation sequence: (1) identity & tokens, (2) retirement pass, (3) schema & routing + seeded content, (4) SEO & distribution, (5) ledger, (6) analytics & launch. Each stage must leave `npm run build` green.
- AR3: Six new content collections defined with Zod + `glob()` loaders in root `src/content.config.ts`: `guides` (md), `glossary` (md), `bridge` (md), `races` (json), `raceArticles` (md), `predictions` (json) — with the shared `articleBase` frontmatter contract (title ≤40, description 50–160, dates, image/imageAlt, relatedTerms, relatedRace, draft) and collection-specific fields as specified in Architecture D1/D2.
- AR4: Cross-collection referential integrity (`relatedTerms`, `relatedRace`, `race`, `keyRaces`) enforced by a build-time assertion helper `src/utils/contentGraph.ts` used from `getStaticPaths`/hub pages; unknown reference → thrown error naming file and field.
- AR5: Prediction ledger model (D2): one JSON file per entry at `src/content/predictions/<year>/<date>-<race-slug>.json`; schema with picks (fixed ¥100 stake), `entryPostedAt` ISO+09:00, status pending/recorded, result outcomes, append-only `annotations`; git commit lifecycle (`ledger: entry` / `ledger: result` / `ledger: annotate`); aggregates computed at build time by `src/utils/ledger.ts`, never stored. MVP: no `/yosou/*` route files exist.
- AR6: URL scheme with ASCII kebab-case romaji slugs only (no Japanese characters in paths): `/guide/`, `/uma-musume/`, `/races/[race]/[slug]/`, `/glossary/[term]/`, trust pages, `/rss.xml`; Phase-2 `/yosou/*` routes designed but absent from MVP builds.
- AR7: Redirect strategy: the old 33-entry setsubi-pro.net redirect map is deleted (new domain, old SEO history deliberately left behind); `vercel.json` keeps exactly one redirect at launch (apex ↔ www); FR25 301-discipline applies to new-domain URLs from launch day.
- AR8: Config refactor (D4): `site.ts` rewritten (SITE_CONFIG, placeholder brand/domain — one-line change at cutover), `navigation.ts` rewritten (4 pillars + menu-only trust links, 5th slot 予想 commented for Phase 2), `theme.ts` re-tokened, `services.ts` deleted; NEW modules `author.ts` (AUTHOR_CONFIG), `raceCalendar.ts` (graded-race calendar + `getRaceWeek()`), `compliance.ts` (notices, banned-wording list, disclosure-link registry).
- AR9: Retirement scope (D5) is exhaustive: home-services routes/pages, 6 old collections + `src/content/*` dirs + legacy `src/content/config.ts`, 19 named components + ServiceSlider.tsx island, `src/data/*.ts` modules, dependencies (`@formspree/react`, `embla-carousel*`, `swiper`), `cms-auth/` worker dir, `/admin` CSP exemption, Formspree + Google Fonts CSP hosts, Decap sitemap filter, stray asset dirs, home-services images, `docs/admin-guide.md`; schema.ts pruned (LocalBusiness/Service/Review/AggregateRating out).
- AR10: React/`@astrojs/react` are RETAINED (zero islands in MVP; Phase-2 tools pre-contracted); the conversion adds ZERO new npm dependencies.
- AR11: SEO plumbing (D6): JSON-LD via `schema.ts` generators only — Article (+FAQPage when `faqEntries`) + BreadcrumbList per article template, `DefinedTerm` for glossary (new `generateDefinedTerm()`), `Person` author node from AUTHOR_CONFIG; `buildLastmodMap()` (`src/utils/lastmod.mjs`) generalizing sitemap lastmod over all four dated collections; RSS rebuilt over guides+bridge+raceArticles; title ≤24 display chars + 全角｜ brand suffix; description front-loaded ≤70 chars; `max-image-preview:large`.
- AR12: Analytics (D7): Vercel Web Analytics beacon in BaseLayout (first-party, cookieless, no cookie banner); ~15-line first-party visitor-type snippet (localStorage marker → `visitor_type: new|returning` custom event); Google Search Console verified via DNS record; cadence/subscriber metrics operator-tracked.
- AR13: Newsletter (D8): Buttondown via plain HTML form POST (zero JS); CSP `form-action` gains `https://buttondown.com` in the same change; graceful degradation to hosted subscribe-page link; X/LINE as plain links only — no widgets/SDKs/embeds ever.
- AR14: Image/OGP conventions (D10): dual-location rule — `src/assets/images/articles/<collection>/<slug>/hero.webp` (≥1200px source, renders 800×450) + `public/images/articles/<collection>/<slug>/share.webp` (1200×675 OGP); `og:image` 1200×675 + `twitter:card summary_large_image` per article; hub/trust pages fall back to `SITE_CONFIG.defaultOgImage`; bridge imagery rights-cleared only.
- AR15: Glossary-link mechanism: rehype plugin `rehypeGlossaryLinks.mjs` tags `/glossary/`-prefixed anchors with `.glossary-term`; authoring rule — first occurrence carries a written parenthetical gloss matching `glossary.shortGloss`; never inside headings. MDX is NOT introduced.
- AR16: Post-conversion CSP baseline: `default-src 'self'`; `script-src 'self' 'unsafe-inline'`; `style-src 'self' 'unsafe-inline'`; `img-src 'self' data:`; `connect-src 'self'`; `form-action 'self' https://buttondown.com`; `object-src 'none'`; `base-uri 'self'`; single `/(.*)` scope; CSP-change protocol: any new external URL modifies `vercel.json` in the same PR.
- AR17: Operator docs live in `docs/`: `publish-checklist.md` (FR30) and `operations.md` (weekly loop + fallback mode, FR29/NFR18) — created during implementation.
- AR18: Routes ship in the same PR as their first real content (empty-collection 404 landmine); no "coming soon" pages.
- AR19: Ledger timestamps stored as ISO 8601 with explicit `+09:00` offset; display `M/D HH:mm` JST with full-ISO `datetime` attribute; ledger/KPI numerals use `tabular-nums`; money via ja-JP locale formatting with explicit 円.

### UX Design Requirements

- UX-DR1: New `@theme` token palette in `src/styles/global.css` — ink/ink-soft/brand/brand-tint/turf/turf-tint/accent/bridge/paper/paper-warm/line/win/loss/notice with exact hex values and semantic mapping per the UX spec; `src/config/theme.ts` mirrors as CSS-var strings; all pairs used for text ≥4.5:1; single light theme (dark mode out of scope).
- UX-DR2: Typography system: JP system font stack only (no webfonts — protected), mobile-first type scale (H1 24/32, body 16/17 at 1.9 line-height, tabular-nums display numbers), JP rules (letter-spacing 0.03em headings, bold-only emphasis, no italic JP, 16px form inputs).
- UX-DR3: Layout foundation: article body max 680px, hub content max 1080px, 16px mobile side padding, 56px/64px sticky header, section rhythm 48/72px, single-column article pages at all sizes (no sidebars), `md:` as the only structural breakpoint.
- UX-DR4: Design direction: D2 "Quiet Magazine" base + D5 race-week module & beginner on-ramp box (homepage above the fold) + D4 record-book ledger treatment; homepage composition order (mobile): header → pillar chips → RaceWeekModule → BeginnerOnrampBox → featured deep-dive hero → latest-article rows → footer with standing notices.
- UX-DR5: Eight page templates: Top, Pillar hub (guide/uma-musume/races/glossary variants), Article (guide/bridge/deep-dive/prediction variants), Race hub, Glossary entry, Ledger, Trust page, 404.
- UX-DR6: New components (each with the anatomy/states/accessibility specified in the UX spec): GlossaryTerm, ContinuationBlock (variants guide/bridge/deep-dive/prediction; ONE primary next step + 2–3 secondary), SeriesNav/SeriesMarker, AuthorByline, AuthorCard, RaceWeekModule (off-week "next upcoming" variant — never empty), BeginnerOnrampBox, KeyFactsBox/SummaryBox, TableOfContents, NoticeFooter/ComplianceNotice, SubscribeBlock, ArticleListRow/ArticleCard, HorseStoryCard (bridge hub only, CSS scroll-snap, no JS), LedgerTable (full/recent-5 variants) + LedgerKPIs.
- UX-DR7: Retained/re-skinned components: BaseLayout, Header, MobileMenu (vanilla toggle, focus-trapped, aria-expanded), Footer (new IA columns + standing short compliance notice on every page), Breadcrumb (+JSON-LD, 375px middle-truncation), Pagination (held), FAQAccordion (`<details>`).
- UX-DR8: Navigation: pillar chips + hamburger (mobile) / inline pillar links (≥768px); MVP nav = 初心者向け・レース分析・ウマ娘×競馬・用語集 + menu-only サイトについて/編集方針; nav designed for a 5th 予想 slot (Phase 2); footer 4 columns: pillars, trust pages, channels, compliance notice.
- UX-DR9: Trust furniture repeats identically on every page: byline block (avatar+name+dates+AI-disclosure link), disclosure links, footer notices — same position, same styling; entry is always an article, so every article template carries full orientation (breadcrumb, pillar tag, byline).
- UX-DR10: Button hierarchy: one solid-accent primary per viewport max; outlined-brand secondary; underlined-brand tertiary links; no red CTAs (red reserved for ledger losses); calm-imperative copy, urgency words banned.
- UX-DR11: Feedback patterns: inline newsletter success/failure (fallback plain link — page never breaks); styled 404 with BeginnerOnrampBox + pillar links; 「結果待ち」 ledger pending rows; no spinners, no toasts, no modals (MobileMenu is the single overlay), no cookie banner.
- UX-DR12: Forms: single subscription form class; visible label, `type="email" required`, 16px input, IME composition guard on any JS enhancement, Japanese inline errors, privacy line naming the provider.
- UX-DR13: Accessibility (pragmatic WCAG 2.1 AA): skip-link, landmarks, one h1/sequential headings, visible 2px brand focus outline, ≥44×44px touch targets, no color-only meaning (○/× on ledger, text in chips), JP alt text, `lang="ja"`, `prefers-reduced-motion` respected, LedgerTable as true `<table>` with caption/scoped headers in `overflow-x-auto` wrapper.
- UX-DR14: Responsive strategy: 375px baseline (safe to 320px), `md:` 2-col hub grids + inline nav, `xl:` 1080px cap + optional margin ToC; in-app browsers (X/LINE) are Priority 1 mobile — no 100vh dependencies; per-template QA: keyboard walkthrough, VoiceOver pass, axe scan, 375/1240 visual QA, 320px JP-overflow check, OGP render check in X and LINE.
- UX-DR15: Content-discovery rules: no search/filtering in MVP (hubs/series/internal links navigate the ~25-article corpus); glossary index grouped by theme (馬券/レース/血統/コース) with 五十音 anchor row; hubs curate rather than list chronologically; visited-link styling in article bodies.

### FR Coverage Map

| FR | Epic(s) | Coverage |
|---|---|---|
| FR1 | Epic 2 | Guide article template + beginner hub + seeded guide series, no registration/payment anywhere |
| FR2 | Epic 2 | Glossary collection, index + entry pages, GlossaryTerm inline pattern + rehype plugin |
| FR3 | Epic 3 | Bridge hub + article template + seeded bridge articles linking into guides/races |
| FR4 | Epic 3 | Race-article template (deep-dive/preview/recap) + magazine hub calendar organization |
| FR5 | Epic 3 | `races` collection + permanent `/races/[race]/` hub template accumulating editions |
| FR6 | Epic 1 (nav shell), Epics 2–3 (pillar chips on hubs/top) | Pillar navigation from every page |
| FR7 | Epics 2–3 | ContinuationBlock variants, relatedTerms/relatedRace frontmatter routing, latest/related rows |
| FR8 | Epic 4 | /about/ author profile + /editorial-policy/ |
| FR9 | Epic 4 | AI-assistance disclosure on /editorial-policy/ + AuthorByline disclosure link |
| FR10 | Epic 1 (footer short form), Epic 4 (in-content band), Epic 8 (public prediction pages) | Standing responsible-gambling + under-20 notices |
| FR11 | Epic 4 (checklist enforcement), Epic 3 (authoring rule in content stories) | Data-boundary rule verifiable per article |
| FR12 | Epic 4 | compliance.ts banned-word list + safe-wording patterns wired into review checklist |
| FR13 | Epic 6 | Prediction entry schema + pre-race timestamp lifecycle (private) |
| FR14 | Epic 6 | Result recording + immutability (append-only annotations) |
| FR15 | Epic 6 | Build-time hit-rate/ROI aggregation + LedgerKPIs/LedgerTable (private) |
| FR16 | Epic 8 *(Phase 2, trigger-gated)* | Public ledger page /yosou/record/ |
| FR17 | Epic 8 *(Phase 2, trigger-gated)* | Methodology page /yosou/about/ |
| FR18 | Epic 8 *(Phase 2, trigger-gated)* | Prediction article template /yosou/[slug]/ |
| FR19a | Epic 5 | X follow touchpoints (SubscribeBlock, footer channels) |
| FR19b | Epic 4 | X-thread repurposing workflow in operations doc |
| FR20 | Epic 5 | Buttondown newsletter form + LINE link, calendar-timed copy |
| FR21 | Epic 5 | RSS rebuilt over guides+bridge+raceArticles |
| FR22 | Epic 5 | OGP conventions per template, 1200×675, X/LINE in-app verification |
| FR23 | Epic 5 | JSON-LD wiring (Article/FAQPage/Person/DefinedTerm/Breadcrumb/Organization) |
| FR24 | Epic 5 | buildLastmodMap() sitemap lastmod over all dated collections |
| FR25 | Epic 1 (old map removal), Epic 5 (301 discipline from launch) | URL stability |
| FR26 | Epic 7 (launch audit), Epics 2–3 (seeded keyword-targeted content) | Launch article set per keyword-gap research |
| FR27 | Epic 4 | Human review checklist + pipeline contract |
| FR28 | Epic 2 | Zod schemas as automatic metadata enforcement |
| FR29 | Epic 4 (workflow + fallback doc), Epic 6 (ledger loop rehearsal) | Weekly cadence workflow |
| FR30 | Epic 4 | Repeatable publish checklist doc; executed in Epic 7 launch story |
| FR31 | Epic 1 (identity/config/shell), Epic 7 (final brand/domain swap) | New brand everywhere, zero remnants |
| FR32 | Epic 1 | Full retirement pass (routes, collections, components, CMS, worker, deps, CSP) |
| FR33 | Epic 7 | Analytics beacon + visitor-type events + Search Console |
| FR34 | Epic 7 | Cookieless/CSP-compatible/<5KB posture verified |

**Deliberately deferred (per PRD Phase-2 contracting policy):** FR16–FR18 are contracted now and fully designed (Architecture D2/D3), but implemented only when the 8–12-week dry-run trigger fires — they form Epic 8, which MUST NOT be scheduled into the MVP sprint plan. All other Growth-scope items (interactive tools, affiliate, partnerships) have no FRs and no stories by design; they require a PRD amendment first.

## Epic List

### Epic 1: New Brand Foundation & Home-Services Retirement
The site builds and deploys as a clean, fully keiba-branded shell — new identity, tokens, navigation, and compliance footer on every page — with every home-services route, collection, component, dependency, and admin surface removed and no remnant reachable by users or crawlers. (Architecture stages 1–2; build stays green.)
**FRs covered:** FR6, FR10 (footer short form), FR25 (old map removal), FR31, FR32

### Epic 2: Beginner Guides & Glossary — the Core Reading Loop
Readers can read beginner guides end-to-end on a phone with jargon decoded inline (glossary entries + GlossaryTerm links), navigate guide series in order, and always get a designed next step — without registration or payment. Zod schemas make invalid content unpublishable. (Architecture stage 3, part 1.)
**FRs covered:** FR1, FR2, FR6 (pillar chips), FR7, FR26 (seeded keyword-targeted content), FR28

### Epic 3: Race Magazine & Uma Musume Bridge
Readers can read G1/重賞 deep-dives organized on the JRA calendar, visit permanent per-race hub pages, read factual Uma Musume bridge articles that route into guides and races, and land on a complete homepage with the race-week module and beginner on-ramp. (Architecture stage 3, part 2.)
**FRs covered:** FR3, FR4, FR5, FR6, FR7, FR11 (authoring), FR26 (seeded content)

### Epic 4: Trust, Compliance & Operator Workflow
Readers can verify who writes the site, how AI is used, and see responsible-gambling/under-20 notices on every betting-adjacent surface; the operator has an enforceable review checklist, publish checklist, weekly cadence workflow, and fallback mode in writing.
**FRs covered:** FR8, FR9, FR10, FR11, FR12, FR19b, FR27, FR29, FR30

### Epic 5: Search Discovery & Distribution
Search engines receive complete structured data, accurate sitemaps, and stable URLs; readers can subscribe (newsletter/LINE/RSS), follow on X, and share any page with correct OGP previews in X/LINE in-app browsers. (Architecture stage 4.)
**FRs covered:** FR19a, FR20, FR21, FR22, FR23, FR24, FR25

### Epic 6: Private Prediction Ledger — Dry Run
The operator can record pre-race prediction entries with timestamps, record immutable results after each race, and view honest hit-rate/ROI aggregates — entirely privately (no public route exists), building the data and components the Phase-2 public debut will reuse unchanged. (Architecture stage 5.)
**FRs covered:** FR13, FR14, FR15, FR29 (ledger loop)

### Epic 7: Analytics, Launch Readiness & Cutover
The operator can measure all success-criteria metrics within the privacy-light posture, and the site launches on the validated brand/domain with the keyword-committed article set, Lighthouse ≥99 verified on all eight templates, and the publish checklist executed. (Architecture stage 6.)
**FRs covered:** FR26, FR31 (final swap), FR33, FR34

### Epic 8: Public Prediction Ledger (Phase 2 — trigger-gated, DO NOT schedule in MVP)
Readers can audit the full public prediction record — every pick, every loss, honest ROI — read the methodology page, and read pre-race prediction articles; the 予想 pillar joins the navigation. **Gate: implemented only after the 8–12-week dry-run evaluation decides the public framing (PRD Phase-2 trigger).**
**FRs covered:** FR10 (prediction pages), FR12 (prediction pages), FR16, FR17, FR18

## Epic 1: New Brand Foundation & Home-Services Retirement

The site becomes a clean keiba-branded shell with the complete retirement of the home-services product. Every story leaves `npm run build` green. After this epic: the top page, 404, and global chrome present ウマノミカタ (placeholder constants); no home-services route, collection, component, image, dependency, or admin surface remains; CSP and vercel.json are at the new minimal baseline.

### Story 1.1: Keiba Identity Configuration & Design Tokens

As the operator,
I want the site's identity, theme tokens, and configuration modules rewritten for the keiba brand,
So that every page and future component draws brand, palette, navigation, author, calendar, and compliance data from single sources of truth and the final brand/domain swap is a one-line change (FR31, AR8, UX-DR1, UX-DR2).

**Acceptance Criteria:**

**Given** the existing `src/config/` and `src/styles/global.css`
**When** the identity pass is complete
**Then** `site.ts` exports the rewritten `SITE_CONFIG` (siteName ウマノミカタ placeholder, siteNameKana, siteUrl placeholder, logoPath, defaultDescription, defaultOgImage, rssTitle, socialLinks) with all physical-business fields (phone, email, hours, REGIONAL_OFFICES) removed
**And** `navigation.ts` exports the 4-pillar nav (初心者向け・レース分析・ウマ娘×競馬・用語集) plus menu-only trust links and footer columns, with the 5th 予想 slot present but commented for Phase 2 (UX-DR8)
**And** new modules exist: `author.ts` (AUTHOR_CONFIG with placeholder persona per Open Decision 1), `raceCalendar.ts` (typed graded-race array + `getRaceWeek()` returning current or next-upcoming race), `compliance.ts` (footer/in-content notice strings, banned-wording array 絶対・確実・儲かる・的中保証…, disclosure-link registry)
**And** `services.ts` is deleted.

**Given** the `@theme` block in `src/styles/global.css`
**When** tokens are replaced
**Then** the block defines exactly the UX palette (`--color-ink`, `--color-ink-soft`, `--color-brand`, `--color-brand-tint`, `--color-turf`, `--color-turf-tint`, `--color-accent`, `--color-bridge`, `--color-paper`, `--color-paper-warm`, `--color-line`, `--color-win`, `--color-loss`, `--color-notice`) with the spec's hex values and the JP system `--font-sans` stack (no webfonts)
**And** `theme.ts` mirrors all tokens as `var(--color-*)` strings
**And** no hex color exists outside `@theme`
**And** JP typography helpers (`overflow-wrap` utilities, `.article-numbered`, `scroll-margin-top` registry) are retained.

**Given** the completed changes
**When** `npm run build` runs
**Then** it exits green with no TypeScript or content errors.

### Story 1.2: Retire the Home-Services Content Layer & Components

As the operator,
I want every home-services route, collection, component, data module, image set, and unused dependency removed,
So that no home-services content is reachable by users or crawlers and the codebase contains only what the keiba product needs (FR32, AR9, AR10).

**Acceptance Criteria:**

**Given** the home-services routes and content
**When** the retirement pass completes
**Then** these pages are deleted: `src/pages/[category]/` (incl. cockroach branch), `services/`, `case/`, `voice/`, `company/`, `columns/`, `contact.astro`, `faq.astro`, `flow.astro`, `sitemap.astro`, `admin/`, and old `index.astro`/`404.astro`/`privacy.astro` are replaced by minimal branded placeholders that keep the build green
**And** the collections `services`, `cases`, `testimonials`, `faq`, `blog`, `company` are removed from schema config along with their `src/content/*` directories and the legacy duplicate `src/content/config.ts`
**And** `src/data/*.ts` (blogData, caseVoiceData, companyData) are deleted.

**Given** the component and asset inventory
**When** the pass completes
**Then** all 19 retired components (PriceBar, PricingTier, AreaMap, ContactFormSection, ProcessFlow, ServiceKV, ServiceCard, ServiceCategorySection, ComparisonTable, TestimonialCard, CaseStudyCard, CtaFeatures, ReasonsGrid, HeroSection, MegaMenu, FilterNav, CategorySidebar, BlogCategorySidebar, AnchorMenu) plus `ServiceSlider.tsx` are deleted
**And** home-services images under `src/assets/images/` and `public/images/`, the stray `src/assets/images/hero/.astro/` and `src/assets/images/hero/node_modules/` artifacts, and `docs/admin-guide.md` are deleted
**And** `src/utils/schema.ts` no longer contains `generateLocalBusiness`, `generateService`, `generateReview`, `generateAggregateRating` while retaining `serializeJsonLd`, `absoluteUrl`, `generateArticle`, `generateBreadcrumb`, `generateFAQ`, `generateWebSite`, `generateOrganization` re-pointed at the new `SITE_CONFIG`.

**Given** `package.json`
**When** dependencies are pruned
**Then** `@formspree/react`, `embla-carousel`, `embla-carousel-react`, `swiper` are removed; `react`, `react-dom`, `@astrojs/react`, `@types/react*` are retained; zero new dependencies are added; package `name` becomes `umanomikata`
**And** `npm run build` exits green
**And** `grep -ri` for home-services identifiers (setsubi, formspree, service categories electricity/water) in `src/` returns no functional references.

### Story 1.3: Deployment Config & Infra Cleanup

As the operator,
I want `vercel.json`, `astro.config.mjs`, and the CMS auth infrastructure reduced to the new product's minimal baseline,
So that the deploy surface carries no legacy redirects, no admin exemptions, and a strict CSP matching the architecture baseline (FR32, FR25, AR7, AR16).

**Acceptance Criteria:**

**Given** `vercel.json`
**When** the cleanup completes
**Then** the 33-entry setsubi-pro.net redirect map is deleted and exactly one redirect remains (apex ↔ www placeholder, matching `SITE_CONFIG.siteUrl` canonical host)
**And** the CSP header scope collapses from `/((?!admin).*)` to `/(.*)`
**And** the CSP equals the architecture baseline: `default-src 'self'`; `script-src 'self' 'unsafe-inline'`; `style-src 'self' 'unsafe-inline'`; `img-src 'self' data:`; `connect-src 'self'`; `form-action 'self'` (Buttondown added later in the same change that introduces the form, per protocol); `object-src 'none'`; `base-uri 'self'` — with Formspree and Google Fonts hosts removed
**And** security headers (HSTS, X-Frame-Options, etc.) are preserved unweakened (NFR6).

**Given** the CMS infrastructure
**When** the cleanup completes
**Then** the `cms-auth/` directory is deleted from the repo and the operator task to tear down its Cloudflare deployment is recorded in the story's completion notes
**And** the Decap admin sitemap-exclusion filter is removed from `astro.config.mjs` and the sitemap `serialize()` blog-frontmatter map is reduced to a stub ready for the new lastmod builder
**And** `npm run build` exits green and `npm run preview` serves the shell with no `/admin` route.

### Story 1.4: Branded Global Shell — Header, Footer, Top Page & 404

As a reader,
I want a consistent keiba-branded header, footer, minimal top page, and styled 404 on the new design tokens,
So that from the very first deploy every page presents the new brand, pillar navigation, and the standing compliance notice (FR6, FR31, FR10 short form, UX-DR3, UX-DR7, UX-DR8, UX-DR11).

**Acceptance Criteria:**

**Given** `BaseLayout.astro`
**When** the re-skin completes
**Then** it renders `lang="ja"`, new-brand head/meta defaults from `SITE_CONFIG`, a skip-to-content link as the first focusable element, semantic landmarks, and the analytics-free baseline (beacon comes in Epic 7)
**And** `Header.astro` renders the 56px (mobile) / 64px (desktop) sticky header with logo and hamburger at base, inline pillar links at `md:` (UX-DR8)
**And** `MobileMenu.astro` keeps the vanilla-script toggle, focus trap, and `aria-expanded` behavior with the new nav content
**And** `Footer.astro` renders the four-column IA (pillars, trust pages, channels, notice) with the standing short compliance notice from `compliance.ts` (「馬券の購入は20歳になってから。…」 + /responsible-gambling/ link) on every page.

**Given** the top page and 404
**When** this story completes
**Then** `index.astro` renders a minimal branded top page (header, pillar chips row, placeholder hero section on `--color-paper-warm`, footer) awaiting content modules from Epic 3
**And** `404.astro` renders the styled recovery page with apology line, pillar links, and top-page link (BeginnerOnrampBox is added in Story 3.1 when the component exists)
**And** minimal branded trust-page stubs exist at `/about/`, `/editorial-policy/`, `/responsible-gambling/`, and `/privacy/` (per the architecture's stage-2 "empty-but-branded shell") so that every nav/footer/byline link resolves from day one — full content lands in Epic 4
**And** all interactive elements have visible 2px brand focus outlines and ≥44×44px touch targets
**And** both pages verify at 375px and 1240px+ with no horizontal overflow at 320px
**And** `npm run build` exits green.

## Epic 2: Beginner Guides & Glossary — the Core Reading Loop

Readers get the product's defining interaction: read a guide, understand every term inline, follow a designed next step. Ships the article-side content schemas (with automatic metadata enforcement), the glossary system, the guide article template, and the beginner hub — each route landing with its first real content in the same story (AR18).

### Story 2.1: Keiba Content Schemas & Referential Integrity

As the operator,
I want the five article-side content collections defined with strict Zod schemas and cross-collection reference checking,
So that content missing required editorial metadata cannot build, and broken internal references fail loudly at build time (FR28, AR3, AR4, NFR14, NFR17).

**Acceptance Criteria:**

**Given** root `src/content.config.ts`
**When** the schema pass completes
**Then** collections `guides`, `glossary`, `bridge`, `races`, `raceArticles` are defined with `glob()` loaders on the architecture's directories and formats (md/md/md/json/md)
**And** the shared `articleBase` contract is enforced on guides/bridge/raceArticles: `title` ≤40, `description` 50–160 chars, `publishedDate`, optional `updatedDate`, `image`, `imageAlt` (Japanese, required), `relatedTerms` (default []), optional `relatedRace`, `draft` (default false)
**And** collection-specific fields match Architecture D1 exactly: guides (`series`, `seriesOrder`, `faqEntries`; `seriesTotal` never stored), glossary (`term`, `reading`, `category` enum baken/race/pedigree/course, `shortGloss` ≤60, no required hero image), bridge (`horseName`, `horseNameEn?`, `era`, `umaCharacter?` never rendered as asset reference, `keyRaces`), races (`raceId`, `name`, `grade` G1/G2/G3, `course`, `distance` as prose string, `month` 1–12, `description`, optional hero), raceArticles (`race`, `edition`, `articleType` deep-dive/preview/recap).

**Given** `src/utils/contentGraph.ts`
**When** any route's `getStaticPaths` or hub page runs at build time
**Then** every `relatedTerms` slug, `relatedRace` id, `raceArticles.race` id, and `keyRaces` id is asserted to exist in its target collection
**And** an unknown reference throws an error naming the offending file and field
**And** a fixture entry per collection (real launch content or reviewed seed) builds green, and a deliberately broken fixture (missing `imageAlt`, over-length `description`, unknown `relatedRace`) fails `npm run build` with a message naming the file.

### Story 2.2: Glossary — Term Lookup & the Inline Decode Pattern

As a beginner reader,
I want a glossary of keiba terms with a browsable index and per-term pages, and a consistent inline marker for glossary links in articles,
So that I can understand jargon at the exact point of confusion without leaving the page, and go one tap deeper when I want (FR2, AR15, UX-DR6, UX-DR15).

**Acceptance Criteria:**

**Given** seeded glossary content (the launch term set, each with `term`, `reading`, `category`, `shortGloss`, body)
**When** the build runs
**Then** `/glossary/` renders the index grouped by theme (馬券/レース/血統/コース) with a 五十音 anchor row (anchor targets registered in `scroll-margin-top`)
**And** `/glossary/[term]/` renders each entry: term + reading, shortGloss lede, long body, related terms links, breadcrumb — using ASCII romaji slugs (e.g. `/glossary/fukusho/`).

**Given** the rehype pipeline
**When** any Markdown article body contains a link whose href starts with `/glossary/`
**Then** `rehypeGlossaryLinks.mjs` adds `class="glossary-term"` to the anchor
**And** `.glossary-term` styles render the dotted underline (`underline dotted`, `text-underline-offset: 3px`, `--color-brand`) with visited and focus states, tap target padded to ≥44px height, and no layout shift or JP line-wrap breakage at 320–375px
**And** the authoring rule (first occurrence carries a written parenthetical gloss matching `shortGloss`; never inside headings) is documented in the content authoring notes for the pipeline
**And** glossary pages ship zero client JS and `npm run build` is green.

### Story 2.3: Beginner Guide Articles — Read, Decode, Continue

As a beginner reader,
I want to read beginner guide articles with named authorship, series orientation, FAQs, and a designed continuation at the end,
So that I can go from curiosity to decoding a real 出馬表 across a linked series without registration, payment, or dead ends (FR1, FR7, UX-DR5, UX-DR6, UX-DR9).

**Acceptance Criteria:**

**Given** seeded guide content (the launch guide series: 出馬表 reading, bet types, first track day, online betting onboarding — keyword-targeted per FR26)
**When** the build runs
**Then** `/guide/[slug]/` renders the guide article template: Breadcrumb + pillar tag, H1, SeriesMarker (第n回／全N回 with N derived from the collection, never stored), AuthorByline (avatar, name, published/updated `<time>` dates, AI-disclosure link), lede, TableOfContents (`<details>` 目次) for long guides, article body at 680px max measure with 1.9 line-height, FAQAccordion (`<details>`) fed from `faqEntries`, SeriesNav prev/next (plain text when at ends, never dead links)
**And** glossary links in the body render with the `.glossary-term` treatment from Story 2.2
**And** the guide-end 「この記事でわかったこと」 recap renders via the `summary` variant of KeyFactsBox (the UX spec's SummaryBox — one component, not a separate file).

**Given** the end of any guide article
**When** the reader reaches the ContinuationBlock
**Then** it renders the `guide` variant: divider + 「次はこれ」 label, ONE primary card (next in series, accent-bordered, title + why-line), 2–3 secondary text links (race hub via `relatedRace` when present, pillar hub, glossary), then AuthorCard (avatar 48px, name, 2-line bio, links to /about/ and /editorial-policy/) — inside `<nav aria-label="次の記事">`
**And** the final guide in a series points outward (「今週のレースで試す」 style link) instead of a dead end.

**Given** the whole guide surface
**When** verified
**Then** no registration, payment, or interstitial exists anywhere on the path; pages ship zero client JS; hero image is eager+`fetchpriority=high` with explicit dimensions and all others lazy; 375px/1240px visual QA passes; `npm run build` is green.

### Story 2.4: Beginner Hub — the Curated Learning Path

As a beginner reader,
I want a beginner hub page that presents guides as an ordered learning path,
So that I always know where to start and where I am in the curriculum (FR1, FR6, UX-DR5, UX-DR15).

**Acceptance Criteria:**

**Given** the seeded guide series
**When** `/guide/` builds
**Then** it renders as a curated hub (intro copy normalizing not-knowing, learning-path sections listing series in reading order with series markers, then other guides) — not a chronological dump
**And** entries render as ArticleListRow (64px thumb, pillar tag chip, 2-line title, date) with the whole row as one link
**And** the pillar chip row renders under the header for one-tap pillar switching (FR6)
**And** the hub uses the 1080px content cap with 2-column grid at `md:` and passes 375px/1240px QA
**And** breadcrumb + BreadcrumbList are present, and `npm run build` is green.

## Epic 3: Race Magazine & Uma Musume Bridge

The magazine and bridge pillars ship with their hubs, templates, and launch content; the homepage becomes the full "Quiet Magazine" composition. After this epic all four MVP pillars are live and internally linked.

### Story 3.1: Race Hubs & the Calendar-Organized Magazine

As a casual-to-intermediate fan,
I want a magazine hub organized on the JRA calendar and a permanent hub page per covered race,
So that I can find this week's race and everything the site has ever written about each G1 from one stable URL (FR4, FR5, FR6, UX-DR6).

**Acceptance Criteria:**

**Given** seeded `races` JSON entries (the launch set of covered G1s) and `raceCalendar.ts`
**When** the build runs
**Then** `/races/` renders the magazine hub organized by the race calendar (upcoming/current graded races first via `getRaceWeek()`, then races by `month`), with pillar chips and breadcrumb
**And** `/races/[race]/` renders the evergreen race hub template: race name, grade chip, course/distance/month as prose (data-boundary safe), description, articles grouped by `edition` (newest first), RaceWeekModule where the race is current, and BeginnerOnrampBox (「競馬、はじめてですか？」 turf-tint box linking to guide series 第1回)
**And** `RaceWeekModule` renders the brand-bordered card (「今週の重賞」 header bar, race name, hook, single accent CTA) and its off-week variant shows the next upcoming race (「次の重賞」) — it never renders empty
**And** a race hub with no articles yet still renders meaningfully (description + calendar info + on-ramp) — no empty-state gap
**And** `404.astro` is retrofitted with BeginnerOnrampBox now that the component exists (closing the deferral from Story 1.4)
**And** `contentGraph` assertions verify every article's `race` reference, and `npm run build` is green.

### Story 3.2: G1 Deep-Dive Articles — the Magazine Format

As a casual-to-intermediate fan,
I want feature-quality deep-dive articles (history, course quirks, pedigree stories) attached to race hubs,
So that race weekends are richer because I know the stories — with every race fact inside the data boundary (FR4, FR11, FR26, UX-DR5, UX-DR6).

**Acceptance Criteria:**

**Given** 2–3 seeded launch deep-dives (keyword-targeted per FR26) under `src/content/race-articles/<raceId>/`
**When** the build runs
**Then** `/races/[race]/[slug]/` renders the deep-dive template: Breadcrumb, pillar tag, H1, AuthorByline, standfirst, KeyFactsBox (`--color-brand-tint`, `dl` semantics, race/course/date/distance in prose — no results tables), TableOfContents for long pieces, section rhythm per the type scale, glossary-term links active
**And** the ContinuationBlock renders the `deep-dive` variant (primary = that race's hub; secondary = relevant explainer guide + pillar hub) and AuthorCard
**And** filenames follow `<edition>-<type>.md` and `articleType` renders appropriate labeling for deep-dive/preview/recap
**And** no Markdown table of results/odds/times exists in any article body (data-boundary rule — review-blocking)
**And** hero image conventions hold (eager LCP hero with explicit dimensions, others lazy) and `npm run build` is green.

### Story 3.3: Uma Musume Bridge — Hub & Real-Horse Stories

As an Uma Musume fan,
I want factual profiles of the real horses behind characters, with a designed path into race cards and guides,
So that my fandom becomes a guided entry into real racing — with zero game assets and IP-safe framing (FR3, NFR12, UX-DR6).

**Acceptance Criteria:**

**Given** seeded bridge articles under `src/content/bridge/` (launch set, keyword-targeted 「馬名+実在」 long-tail per FR26)
**When** the build runs
**Then** `/uma-musume/` renders the bridge hub with the HorseStoryCard horizontal CSS scroll row (`overflow-x-auto` + scroll-snap, no JS) plus list rows for all profiles
**And** `/uma-musume/[slug]/` renders the bridge article template (slug = horse name romaji): Breadcrumb, bridge pillar tag (`--color-bridge`), H1, AuthorByline, real-horse story body with glossary links, era line
**And** the ContinuationBlock renders the `bridge` variant: primary = the race-card guide (出馬表の読み方) or the featured race via `keyRaces`/`relatedRace`; secondary = bridge hub + glossary
**And** `umaCharacter` frontmatter is used only for search/linking metadata — never rendered as an image or asset reference; all imagery is rights-cleared (checked in review, no Cygames asset in the repo)
**And** `keyRaces` references are contentGraph-verified and `npm run build` is green.

### Story 3.4: The Complete Top Page — Quiet Magazine Composition

As a reader,
I want the homepage to orient me instantly: this weekend's race, where to start as a beginner, the featured story, and the latest articles,
So that whether I'm new or returning on the calendar rhythm, my next read is one tap away (FR6, FR7, UX-DR4).

**Acceptance Criteria:**

**Given** all pillar content from Epics 2–3
**When** `/` builds
**Then** the mobile composition order is exactly: compact header → pillar chips → RaceWeekModule → BeginnerOnrampBox → featured deep-dive hero (on `--color-paper-warm`, D2 register) → latest-article rows (merged newest-first across guides/bridge/raceArticles) → footer with standing notices
**And** at `xl:` the RaceWeekModule and BeginnerOnrampBox render side by side; content caps at 1080px
**And** exactly one accent-colored primary element is visible per viewport (UX-DR10)
**And** the featured hero image is the only eager-loaded image (LCP) with explicit dimensions; CLS ≈ 0
**And** 375px/1240px QA and a 320px JP-overflow check pass, and `npm run build` is green.

## Epic 4: Trust, Compliance & Operator Workflow

Trust becomes structural: named authorship pages, disclosures, standing notices, safe wording, and the operator's written workflow — the anti-scam positioning delivered as pages, components, and documents.

### Story 4.1: Trust Pages — Author, Editorial Policy & Notices

As a skeptical reader,
I want to see who writes this site, how AI is used, and the site's stance on responsible gambling,
So that I can verify legitimacy instead of being asked to assume it (FR8, FR9, NFR11, UX-DR5).

**Acceptance Criteria:**

**Given** the trust-page template
**When** the build runs
**Then** `/about/` renders the author profile (from AUTHOR_CONFIG: name, kana, bio, avatar, sameAs links) and the site mission
**And** `/editorial-policy/` renders the editorial policy including the AI-assistance disclosure (how content is produced, the mandatory human review pass: fact-check + Japanese QA + tone check) and the 景品表示法-safe wording commitment with the banned-word list sourced from `compliance.ts`
**And** `/responsible-gambling/` renders the canonical responsible-gambling + under-20 page that the site-wide notices link to
**And** `/privacy/` renders the rewritten privacy policy (placeholder analytics/newsletter sections completed in Epics 5/7)
**And** every article's AuthorByline 「AI利用について」 link resolves to the disclosure section, and AuthorCard links to /about/ and /editorial-policy/ work from every article template
**And** all four pages use the trust template (breadcrumb, 680px measure, quiet styling) and `npm run build` is green.

### Story 4.2: Standing Compliance Notices & Safe-Wording Enforcement

As a reader on any betting-adjacent page,
I want calm, consistent responsible-gambling and under-20 notices, and zero hype language anywhere,
So that the site never triggers the scam reflex and no reader can mistake it for a paid-tips service (FR10, FR12, NFR9, UX-DR6, UX-DR10).

**Acceptance Criteria:**

**Given** `NoticeFooter.astro` and `compliance.ts`
**When** the build runs
**Then** the site footer short-form notice appears on every page (already wired in Story 1.4, verified here) and the in-content notice band (`--color-notice` text on `--color-paper-warm`, small type, dignified) renders above the ContinuationBlock on every betting-related template (bet-type guides, race articles, and — when Epic 8 lands — all prediction pages), driven by template type/frontmatter, never hand-placed per page
**And** notice text comes exclusively from `compliance.ts` — no notice string is retyped inline anywhere.

**Given** the banned-wording list
**When** content or UI copy is reviewed
**Then** the review checklist step verifies no `COMPLIANCE.bannedWords` term (絶対・確実・儲かる・的中保証・今すぐ・限定…) appears in published content or UI chrome
**And** button/CTA copy across the site is calm-imperative with no urgency words
**And** a documented check method exists (grep-based script or documented manual step in the publish checklist) making the verification repeatable.

### Story 4.3: Operator Workflow — Review Checklist, Publish Checklist & Fallback Mode

As the solo operator,
I want the weekly cadence workflow, human-review checklist, publish checklist, and fallback mode in writing,
So that every article passes mandatory review, every release is SEO-verified, the X-thread step is defined, and a bad week degrades gracefully instead of breaking promises (FR19b, FR27, FR29, FR30, NFR8, NFR14, NFR16, NFR18, AR17).

**Acceptance Criteria:**

**Given** `docs/operations.md`
**When** the document is complete
**Then** it defines the weekly race-cadence loop (Tue pipeline draft → human review pass: fact-check against publicly announced data, Japanese QA, tone/policy check → frontmatter/Zod gate → build/deploy → X-thread cut from article sections (FR19b) → pre-race ledger entry → Sun result recording → Mon metrics check) sized against the 10 h/week budget
**And** it defines the fallback mode: deep-dive only, evergreen queue paused, cadence promise and ledger continuity intact (NFR18)
**And** it documents the pipeline↔schema frontmatter contract (the `articleBase` fields seo-cockpit must emit) with the NFR14 rule: recurring validation failures are fixed at the pipeline level.

**Given** `docs/publish-checklist.md`
**When** the document is complete
**Then** it lists the repeatable per-release checks: rich-results test, OGP render in X and LINE, heading hierarchy, JP alt text presence, data-boundary check (no results tables — NFR8/FR11), banned-wording check, title/description length, Lighthouse spot-check trigger conditions, and the 301 rule for any renamed URL
**And** both documents live in `docs/` per the architecture tree and the human-review pass requirement (NFR11) is stated as mandatory before publish.

## Epic 5: Search Discovery & Distribution

The SEO playbook and distribution channels go live: complete structured data, accurate sitemap/RSS, correct OGP everywhere, and subscribe/follow touchpoints — the acquisition engine for the traffic-first strategy.

### Story 5.1: Structured Data Site-Wide — Rich Results Compliance

As the operator,
I want every page to emit complete, playbook-compliant JSON-LD from central generators,
So that articles render as rich results in Google.jp and the site's E-E-A-T signals (named Person author, Organization identity) are machine-readable (FR23, AR11).

**Acceptance Criteria:**

**Given** `src/utils/schema.ts` and the page templates
**When** the build runs
**Then** every article template (guide/bridge/race article) emits `Article` JSON-LD with absolute URLs, `image` array sourced from the 1200×675 original, `inLanguage: 'ja'`, `isPartOf`, publisher logo ImageObject, and `author` as a `Person` node from AUTHOR_CONFIG
**And** guides with `faqEntries` additionally emit `FAQPage`
**And** every page below top level emits `BreadcrumbList` matching its visible breadcrumb
**And** BaseLayout emits site-wide `Organization` (with `@id` = `<site>/#organization`) and `WebSite`
**And** glossary entries emit `DefinedTerm` via the new `generateDefinedTerm()` generator
**And** zero inline JSON-LD exists in any page (generators only), sample pages of each template pass Google's Rich Results Test, and `npm run build` is green.

### Story 5.2: Sitemap, RSS & URL Stability

As the operator,
I want an accurate sitemap with real lastmod dates, a combined RSS feed, and the 301 discipline in force,
So that search engines always see fresh, stable, correctly-dated URLs (FR21, FR24, FR25, AR11).

**Acceptance Criteria:**

**Given** `src/utils/lastmod.mjs`
**When** the build runs
**Then** `buildLastmodMap()` scans all four dated collections with their URL prefixes (guides→/guide/, bridge→/uma-musume/, race-articles→/races/<race>/ with race read from frontmatter, glossary→/glossary/) and feeds `astro.config.mjs` sitemap `serialize()`
**And** pages with `updatedDate` carry it as lastmod, pages without omit lastmod (never fake dates)
**And** `/sitemap-index.xml` validates and contains every public route and no retired route.

**Given** `src/pages/rss.xml.js`
**When** the build runs
**Then** the feed merges guides + bridge + raceArticles sorted by `publishedDate` desc with title/site from `SITE_CONFIG`, and `/rss.xml` validates
**And** the RSS link renders in the footer channels column (FR21).

**Given** the 301 discipline
**When** any published URL is renamed or removed from this point on
**Then** the same change adds a `vercel.json` 301 (single ASCII entry; raw+encoded pair rule documented for any future Japanese URL), verified as a stated rule in the publish checklist and exercised by at least one test redirect on a Vercel preview.

### Story 5.3: OGP & Share Correctness on X and LINE

As a reader sharing an article,
I want every shared link to unfurl with the right title and a 1200×675 image on X and LINE,
So that the distribution loop through SNS and in-app browsers works on every page type (FR22, AR14).

**Acceptance Criteria:**

**Given** the image conventions
**When** any article builds
**Then** its hero exists in both locations (`src/assets/images/articles/<collection>/<slug>/hero.webp` ≥1200px source rendering 800×450, and `public/images/articles/<collection>/<slug>/share.webp` at 1200×675) and `og:image` points at the 1200×675 share original with `twitter:card summary_large_image`
**And** hub, glossary, and trust pages fall back to the branded `SITE_CONFIG.defaultOgImage` (1200×675 template image created in this story)
**And** `og:title`/`og:description` follow the meta rules (title ≤24 display chars + 全角｜ brand suffix, description front-loaded ≤70 chars).

**Given** the verification pass
**When** one URL per page template is shared
**Then** the OGP card renders correctly in X and LINE (in-app browsers included), and the check procedure is recorded in the publish checklist
**And** pages render correctly inside X/LINE webviews (no 100vh dependencies) and `npm run build` is green.

### Story 5.4: Subscribe & Follow — Newsletter, LINE, X Touchpoints

As a reader at a natural pause point,
I want one-action ways to follow on X, add the LINE account, or subscribe to the weekend newsletter,
So that a good session converts into a calendar habit — without any widget ever breaking the page (FR19a, FR20, NFR5, NFR7, NFR13, AR13, UX-DR12).

**Acceptance Criteria:**

**Given** `SubscribeBlock.astro`
**When** it renders at pause points (ContinuationBlock tail on articles, hub ends — never mid-content, never modal)
**Then** it shows the honest pitch (「土曜の朝、今週のG1の物語を1通で」), a plain HTML Buttondown form POST (visible label, `type="email" required`, 16px input font), X follow and LINE add-friend plain links from `SITE_CONFIG.socialLinks` (no widgets/SDKs/embeds), and a privacy line naming the provider with the unsubscribe promise
**And** the same change adds `https://buttondown.com` to `form-action` in `vercel.json` CSP (protocol AR16) with the PR text naming the directive
**And** on submit success an inline Japanese confirmation renders via the `?subscribed=1`-style param read by a tiny deferred vanilla script; without JS the provider's hosted confirmation shows instead (progressive)
**And** a standing fallback link to the hosted Buttondown subscribe page renders beneath the form so a failed widget never breaks the page (NFR13)
**And** any JS enhancement suppresses submit during IME composition, no render-blocking script is added, subscriber data lives only in Buttondown (NFR7), and `npm run build` is green.

## Epic 6: Private Prediction Ledger — Dry Run

The riskiest, most distinctive asset is built privately: the append-only ledger data model, build-time honest aggregation, and the record-book components — exercised by the real dry run, with no public route in existence. Phase 2 reuses all of it unchanged.

### Story 6.1: Prediction Entry Schema & the Append-Only Lifecycle

As the operator,
I want a strict predictions collection with pre-race timestamps and an enforced append-only lifecycle,
So that I can record picks with reasoning before each race and the record is structurally impossible to quietly rewrite (FR13, NFR10, AR5, AR19).

**Acceptance Criteria:**

**Given** `src/content.config.ts`
**When** the `predictions` collection is added
**Then** it loads `**/*.json` from `src/content/predictions/` with the Architecture D2 schema exactly: picks (betType enum of the 7 types, selection string, `stake: z.literal(100)`, required `reasoning`), `raceId`, `raceName`, `raceDate`, `grade`, `entryPostedAt` ISO datetime, `status: pending|recorded`, optional `result` (recordedAt + per-pick outcomes with hit/payout), append-only `annotations` (default [])
**And** the refinements enforce: `status='recorded'` requires `result`, and `result.outcomes.length === picks.length`
**And** all `*At` timestamps are ISO 8601 with explicit `+09:00` offset, and the file convention is `<YYYY>/<YYYY-MM-DD>-<race-slug>.json`.

**Given** the lifecycle conventions
**When** documented in `docs/operations.md` (ledger section)
**Then** the three commit types are specified (`ledger: entry` pre-race with status pending and no result; `ledger: result` post-race adding only result+status flip with picks/reasoning/entryPostedAt frozen; `ledger: annotate` appending annotations only), entries are never deleted, and corrections append
**And** a valid pending fixture and a valid recorded fixture build green while an invalid fixture (recorded without result, or outcome-count mismatch) fails the build with a named error
**And** no `/yosou/*` route file exists and the build output contains no prediction page.

### Story 6.2: Honest Aggregation & the Record-Book Components

As the operator,
I want build-time hit-rate/ROI aggregation and the ledger display components,
So that I can evaluate the dry run against an honest, never-stored, never-desynced record — and Phase 2 can unveil the exact same components (FR14, FR15, UX-DR6, UX-DR13, AR19).

**Acceptance Criteria:**

**Given** `src/utils/ledger.ts`
**When** it aggregates the full predictions collection at build time
**Then** hit rate and ROI (回収率 = total payout ÷ total stake, stake = picks × ¥100) are computed from entries only — never stored — with pending entries excluded from ROI
**And** its results are verified against a hand-computed fixture set (wins, losses, pending mixed).

**Given** `LedgerTable.astro` and `LedgerKPIs.astro`
**When** rendered (in dev/preview verification — no public route)
**Then** LedgerKPIs shows hit rate / 回収率 / entry count in display-size `tabular-nums`
**And** LedgerTable is a true `<table>` with `<caption>` and scoped headers inside an `overflow-x-auto` wrapper, rows show race / pick / result (○的中 in `--color-win`, ×不的中 in `--color-loss` — equal visual weight, never color-only) / pre-race timestamp (`M/D HH:mm` JST display with full-ISO `datetime`), pending rows show 「結果待ち」 in `--color-ink-soft`, annotations render as appended rows never edits, and the standing integrity note (immutability + no-guarantee + under-20 from `compliance.ts`) renders beneath
**And** both full and recent-5 variants exist, money renders ja-JP formatted with 円, both components pass 375px/1240px checks, and `npm run build` remains green with no public ledger URL in the output.

### Story 6.3: Dry Run Live — First Entries & the Weekly Ledger Loop

As the operator,
I want the dry run actually running: real pre-race entries and post-race results recorded through the defined workflow,
So that the 8–12-week evaluation window starts producing the data that gates the Phase-2 public debut (FR13, FR14, FR15, FR29, NFR16).

**Acceptance Criteria:**

**Given** the next graded race week after this story starts
**When** the operator executes the ledger loop
**Then** at least one real prediction entry is committed pre-race (`ledger: entry`, `entryPostedAt` before race start, reasoning included) and its result committed post-race (`ledger: result`) within the same weekend
**And** the aggregate output of `ledger.ts` reflects the recorded entries correctly on the next build
**And** the round-trip (entry + result) fits the time budget expectations recorded in `docs/operations.md`, with any workflow friction noted for adjustment (NFR16: the workflow, not the operator, is adjusted)
**And** the dry-run evaluation criteria and 8–12-week window (what will be reviewed to decide the public debut and framing) are recorded in `docs/operations.md`.

## Epic 7: Analytics, Launch Readiness & Cutover

Measurement goes live within the privacy-light posture and the site launches: final brand/domain constants, keyword-committed launch content verified, Lighthouse ≥99 on all eight templates, publish checklist executed.

### Story 7.1: Privacy-Light Analytics — Sessions & Return Visitors

As the operator,
I want cookieless analytics with a return-visitor signal, inside CSP and under 5KB,
So that I can measure sessions and the first-class return-visitor metric without any tracking that would betray the trust brand (FR33, FR34, NFR15, AR12).

**Acceptance Criteria:**

**Given** BaseLayout
**When** analytics is enabled
**Then** the Vercel Web Analytics beacon (`<script defer src="/_vercel/insights/script.js">`) is injected and the feature enabled in the Vercel project, with no cookie set and no cookie banner added
**And** a ~15-line first-party vanilla snippet sets a `localStorage` marker and reports `visitor_type: new|returning` as a custom event via `window.va`, degrading silently when `localStorage` throws
**And** total added page weight is <5KB and no CSP change is required beyond existing `'self'` allowances (verified against the deployed CSP)
**And** `/privacy/` is updated to disclose the analytics approach and the localStorage marker
**And** page-view and visitor-type events verify on a Vercel preview deploy, and `npm run build` is green.

### Story 7.2: Search Console & the Measurement Baseline

As the operator,
I want Google Search Console verified and the metric-tracking routine documented,
So that ranking positions, organic sessions, and the monthly trust proxies are measurable from launch day (FR33, AR12).

**Acceptance Criteria:**

**Given** the launch domain
**When** verification completes
**Then** Search Console is verified via DNS record (no HTML tag, no script — CSP and page weight untouched) and the sitemap is submitted
**And** `docs/operations.md` gains the Monday metrics-check section: where each success-criteria metric is read (Search Console for rankings/organic sessions, Vercel Analytics for sessions/return-visitor rate, provider dashboards for subscribers, calendar for cadence adherence) and the monthly trust-proxy review list
**And** the pivot-threshold and 6/12-month targets from the PRD are recorded in the doc as the evaluation frame.

### Story 7.3: Launch Cutover — Brand, Content Set & Performance Verification

As the operator,
I want the validated brand/domain swapped in, the keyword-committed launch content verified complete, and every template performance-checked,
So that the site launches whole: right name, right content, Lighthouse ≥99 everywhere, checklist passed (FR26, FR31, NFR1, NFR2).

**Acceptance Criteria:**

**Given** the pre-MVP gates are decided (validated brand name + domain, J-PlatPat/SNS checks done; author persona named)
**When** cutover executes
**Then** `SITE_CONFIG` (siteName, siteUrl), `AUTHOR_CONFIG`, `package.json` name, and the `vercel.json` apex redirect are updated to final values in one change, and all absolute URLs (JSON-LD, OGP, sitemap, RSS) reflect the final domain on the next build.

**Given** the launch content audit
**When** performed against the keyword-gap research commitment
**Then** the launch set (~20 beginner + bridge articles, glossary term set, 2–3 G1 deep-dives, hub pages, trust pages) is confirmed present and mapped to its target keywords (FR26), with gaps listed and closed before launch.

**Given** the performance gate
**When** Lighthouse runs on mobile for all eight templates (Top, pillar hub, article×3 variants, race hub, glossary entry, trust page, 404)
**Then** Performance ≥99 and accessibility ≥95 on every one, CWV sanity-checked on one real mid-range Android over 4G (LCP <1.5s, CLS <0.02)
**And** the full publish checklist (Story 4.3) is executed and its results recorded, and `npm run build` is green on the launch commit.

## Epic 8: Public Prediction Ledger (Phase 2 — trigger-gated)

**GATE: Do not implement until the 8–12-week dry run is evaluated and the public framing (entertainment/process) is decided (PRD Phase-2 trigger). This epic must not be scheduled in the MVP sprint plan.** The data model, components, and aggregation from Epic 6 are reused unchanged; this epic adds the four `/yosou/` route files and the fifth nav pillar — nothing else (Architecture D2).

### Story 8.1: Prediction Pillar Goes Public — Hub, Methodology & Navigation

As a skeptical fan,
I want a prediction pillar with a plain-spoken methodology page,
So that before reading a single pick I can see exactly how predictions are made, framed, and disclosed (FR17, FR10, FR12).

**Acceptance Criteria:**

**Given** the dry-run evaluation has decided the public framing
**When** this story completes
**Then** `/yosou/` renders the prediction pillar hub (intro with the decided framing, links to record/methodology/latest prediction articles) and `/yosou/about/` renders the methodology page (how predictions are made, AI's role, the honest-record commitment, 景品表示法-safe framing)
**And** the commented 5th nav slot (予想) is activated in `navigation.ts` — header, mobile menu, footer, and pillar chips all show five pillars with no structural change
**And** both pages carry the in-content compliance notice band and the footer notice (FR10), contain no banned-wording terms (FR12), emit BreadcrumbList, and follow the trust-template register
**And** `npm run build` is green and both URLs appear in the sitemap.

### Story 8.2: The Public Ledger — Every Pick, Every Loss, Honest ROI

As a skeptical fan,
I want the complete prediction record public — wins, losses, timestamps, and aggregate ROI,
So that I can audit the site's honesty myself, including checking that yesterday's miss is already recorded (FR16, FR10, FR12, NFR10).

**Acceptance Criteria:**

**Given** the Epic 6 components and dry-run + live entries
**When** `/yosou/record/` builds
**Then** it renders LedgerKPIs (hit rate, 回収率, entry count) above the full-variant LedgerTable showing every entry ever recorded — losses with equal visual weight, `entryPostedAt` visible per row, annotations rendered append-only, pending entries as 「結果待ち」
**And** the standing integrity note (immutability statement + no-guarantee wording + under-20 notice) renders beneath the table and the in-content notice band is present
**And** the page's OGP is shareable as the trust artifact (title + default or KPI-bearing 1200×675 image) and the URL emits BreadcrumbList
**And** no entry is ever edited or removed to produce this page — the build renders exactly what the collection contains — and `npm run build` is green.

### Story 8.3: Weekly Prediction Articles — Published Before the Race

As a weekend bettor,
I want weekly prediction articles for graded races published before post time, with reasoning and a live link to the record,
So that I can read the analysis for its reasoning and verify the pre-race timestamp myself (FR18, FR10, FR12, NFR10).

**Acceptance Criteria:**

**Given** a prediction entry committed for the week's graded race
**When** `/yosou/[slug]/` builds
**Then** the prediction article template renders: Breadcrumb, 予想 pillar tag, H1, AuthorByline, the pre-race timestamp displayed prominently (`M/D HH:mm` JST from `entryPostedAt`), picks with reasoning, the recent-5 LedgerTable excerpt linking to `/yosou/record/`, the in-content compliance notice band, and the ContinuationBlock `prediction` variant (primary = the ledger)
**And** publication happens before race start (the article's public timestamp + the pre-race X thread are the external proof, per Architecture D2), and after the race the page reflects the recorded result on rebuild without any edit to picks/reasoning/entryPostedAt
**And** no profitability claim or banned-wording term appears (FR12), Article JSON-LD + OGP follow the site conventions, the weekly workflow in `docs/operations.md` is extended with the publish step, and `npm run build` is green.
