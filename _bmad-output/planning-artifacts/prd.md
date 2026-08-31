---
stepsCompleted: [step-01-init, step-02-discovery, step-02b-vision, step-02c-executive-summary, step-03-success, step-04-journeys, step-05-domain-skipped, step-06-innovation-skipped, step-07-project-type, step-08-scoping, step-09-functional, step-10-nonfunctional, step-11-polish, step-12-complete]
completedAt: '2026-08-25'
releaseMode: phased
classification:
  projectType: web_app
  domain: general
  complexity: low
  projectContext: brownfield
inputDocuments:
  - _bmad-output/planning-artifacts/product-brief-racing-horse.md
  - _bmad-output/planning-artifacts/product-brief-racing-horse-distillate.md
  - _bmad-output/project-context.md
workflowType: 'prd'
documentCounts:
  briefs: 2
  research: 0
  brainstorming: 0
  projectDocs: 1
---

# Product Requirements Document - Keiba Media Pivot (ウマノミカタ)

**Author:** Luonghailam
**Date:** 2026-08-25

## Executive Summary

**ウマノミカタ** (working name) converts an existing high-performance static-site codebase into a Japanese horse-racing (keiba) media brand positioned as *the graduation path from Uma Musume to real racing*. Japan's keiba market is the world's largest betting market — JRA turnover ¥3.5T in 2025, 14 consecutive growth years, growth driven almost entirely online — and its fastest-growing cohort is 20-something, mobile-first fans arriving via Uma Musume and SNS. Those fans are served today by 20-year-old, ad-saturated portals (netkeiba), a utilitarian official site (JRA), and a scam-ridden tip-site category that JRA itself warns against.

The product owns the beginner journey end-to-end — curiosity → first race card (出馬表) → first small bet → first G1 weekend — through three content pillars: a beginner education hub (初心者向け), a G1/重賞 analysis magazine, and (after a private 8-12-week dry run) a transparent AI prediction ledger with an immutable public hit/ROI record. A signature Uma Musume → real-horse bridge vertical (factual horse histories only; no Cygames IP assets) threads through pillars 1-2. All content is static publishing: no databases, no real-time feeds, no licensed-data redistribution — deliberately avoiding the JRA-VAN/JRADB licensing wall and the incumbents' home turf.

Target users: **primary** — new-generation beginners (20s-30s, mobile, weekend reading before races) who need plain-language guidance and proof they're not being scammed; **secondary** — casual-to-intermediate fans who want G1 context deeper than headlines without premium data subscriptions. Monetization is deferred by design; the near-zero cost base makes traffic-first a strategy, with Oddspark/Rakuten Keiba affiliate as the validated future path.

### What Makes This Special

1. **Performance as an SEO weapon** — the inherited Lighthouse 99-100 mobile baseline plus a proven Japanese rich-results playbook wins Core Web Vitals ranking signals in mobile SERPs where every incumbent is slow, before content quality is even compared.
2. **Trust as brand, with receipts** — named authorship, disclosed AI assistance, 景品表示法-safe language, and a prediction ledger whose credibility compounds with every honestly recorded loss: a first-mover asset that cannot be backfilled by late arrivals.
3. **Solo-operator content economics** — an existing AI content pipeline (seo-cockpit) plus the codebase's SEO plumbing enables the dual cadence (evergreen library + weekly race coverage) that would break any other one-person operation.
4. **Cost-structure asymmetry** — no data licensing, no infrastructure, no payroll; incumbents' fixed costs force the ad saturation that makes them beatable, while this operation can wait out the SEO ramp indefinitely.

Core insight: the gap in the world's biggest racing market is not *data* (locked behind licensing) but *trustworthy, comprehensible, fast content* for its newest fans — exactly what a static site with an AI pipeline can deliver.

## Project Classification

- **Project Type:** Web application (multi-page static website, SEO-critical)
- **Domain:** General — sports media / content publishing, with gambling-adjacent special concerns (quasi-YMYL for Google; JRA-VAN data boundary; 景品表示法-compliant language; under-20 betting notice)
- **Complexity:** Low (technical) — static content site, no backend; operational complexity lives in content cadence and compliance, addressed via NFRs
- **Project Context:** Brownfield — full product-layer conversion on the existing Astro 5 foundation (content collections, design tokens, SEO plumbing, Vercel deploy retained; home-services identity retired)

## Success Criteria

### User Success

- **The beginner "aha" moment:** a first-time visitor reads one guide and can decode a real 出馬表 unaided — measured by guide-page scroll-depth ≥70% and glossary/internal-link follow-through.
- A beginner completes the journey the site promises: finds the site via search or SNS → reads 2+ articles in a session → returns for the next race weekend (return-visitor rate is a first-class metric, not vanity traffic).
- Fans trust the ledger: prediction articles are read *after* results are known (post-race traffic to ledger pages) — evidence readers value honesty over hit-rate hype.
- Zero user harm: no reader can mistake the site for a paid-tips service; responsible-gambling and under-20 notices visible on every prediction-related page.

### Business Success

- **6 months post-launch:** 5-10k organic sessions/month; top-10 Google.jp rankings for 15-20 keyword targets selected by the pre-MVP keyword-gap research; Article rich results rendering site-wide. **Pivot threshold: <2k sessions/month at month 6 → strategy revisit.**
- **12 months:** 30-50k organic sessions/month; monetization decision (Oddspark/Rakuten Keiba affiliate) made from real traffic data.
- **Trust proxies (tracked monthly):** return-visitor rate, branded-search volume, X/LINE follower growth, direct-traffic share by month 12.
- **Operational health:** minimum viable cadence holds — 1 G1 deep-dive every G1 week without missed weeks; evergreen production pausable without breaking the calendar commitment.

### Technical Success

- Mobile Lighthouse 99-100 maintained on every page type (protected budget inherited from the codebase; regression gate on hero/layout/island changes).
- `npm run build` remains the quality gate: TypeScript strict + Zod content-schema validation pass on all keiba collections.
- Full JSON-LD/rich-results compliance per the NOTE.md playbook (absolute URLs, Article.image ≥1200px array, Organization @id, breadcrumbs, sitemap lastmod from updatedDate).
- CSP discipline preserved: any new external endpoint ships with a same-change vercel.json CSP update.

### Measurable Outcomes

| Metric | 6 months | 12 months |
|---|---|---|
| Organic sessions/month | 5-10k (floor: 2k) | 30-50k |
| Top-10 rankings (researched keywords) | 15-20 | 40+ |
| Return-visitor rate | baseline established | ≥20% |
| X/LINE followers | present, growing | ≥1,000 combined, with X-thread referral sessions recorded every G1 week |
| G1-week cadence hit rate | 100% | 100% |
| Mobile Lighthouse | 99-100 | 99-100 |

## Product Scope

### MVP - Minimum Viable Product

**Pre-MVP gates (decided before build):** (1) brand/domain validation — J-PlatPat trademark, domain + SNS handles (working name ウマノミカタ); (2) keyword-gap research driving the launch article list.

- Codebase conversion: keiba content collections/schemas/routes replace home-services ones; new brand identity on existing design tokens; Formspree flow and home-services baggage retired; 301/redirect and identity handling done deliberately.
- ~20 beginner + Uma-Musume-bridge articles + glossary, full SEO plumbing; pillar hub pages.
- 2-3 G1 deep-dive articles establishing the magazine format.
- Trust & editorial pages: named author, editorial policy, AI-assistance disclosure, responsible-gambling + under-20 notice.
- Distribution shell: X account (G1-week threads), LINE and/or newsletter signup.
- Private prediction dry-run begins (internal ledger, unpublished).
- Analytics baseline: privacy-light measurement of the success-criteria metrics (sessions, return-visitor rate, rankings) live at launch.

### Growth Features (Post-MVP)

- Public prediction ledger (only after 8-12-week dry-run evaluation; immutable entries, methodology page, entertainment/process framing).
- Client-side interactive tools: bet-type payout simulator, annotated 出馬表 reader (backlink magnets, static-friendly).
- Affiliate monetization (Oddspark/Rakuten Keiba); relationship-building starts earlier.
- NAR regional-racing coverage; creator (YouTuber/VTuber) citation partnerships; video/short-form repurposing.

### Vision (Future)

- Default first bookmark for Japan's new keiba fans; the recognized Uma Musume → real racing graduation path.
- Beginner library owning its search space; G1 magazine with an SNS-recognizable voice; the category's most auditable prediction record.
- Affiliate revenue funding NAR expansion and data-visual storytelling — still fast, still clean, still honest.

**Explicitly out (all phases):** live odds, real-time results, horse/jockey databases, paid tips, JRA-VAN/JRADB data redistribution, betting-account handling, Uma Musume game assets.

## User Journeys

### Journey 1 — Yui, 25: From Uma Musume to a first bet (primary, happy path)

**Opening:** Yui plays Uma Musume and just learned her favorite character is based on a real horse. On a Saturday morning train she googles the horse's name plus 「実在」. Every result is either a dense netkeiba database page that shifts under her thumb with ads, or a wiki stub.

**Rising action:** She lands on ウマノミカタ's bridge article — the real horse's story, told plainly, loading instantly. At the end: "want to see this weekend's race featuring her descendants? Here's how to read a race card." She taps into the 出馬表 guide, then the bet-types guide. Jargon terms are explained inline; nothing asks her to register or pay.

**Climax:** Sunday, at the track's paddock via the first-trackday guide, she reads a real race card unaided and places a ¥100 複勝 bet — and understands *why* she chose it.

**Resolution:** She bookmarks the site, follows the X account, and returns the next G1 weekend. The site's promise — plain language, no scam smell, no clutter — was kept at every step.

**Reveals requirements for:** bridge-article format, inline glossary/tooltip pattern, guide-to-guide internal linking, mobile reading experience, X follow touchpoints, no-registration reading.

### Journey 2 — Kenta, 29: The skeptic who checks the ledger (primary, edge case)

**Opening:** Kenta bets small most weekends and has been burned by a 予想サイト that deleted its losing picks. He finds a ウマノミカタ prediction article via search and his guard is up: "another scam blog."

**Rising action:** He looks for the trick — and instead finds a methodology page, an AI-assistance disclosure, a named author, and a ledger listing every published pick including last month's losing streak, with ROI computed honestly. No "絶対的中," no LINE-DM sales funnel, an under-20/responsible-gambling notice in the footer.

**Climax:** After Sunday's races he returns *to check whether the site records its own miss* — it already has. That moment converts him.

**Resolution:** Kenta doesn't follow the picks blindly; he reads the analysis for its reasoning and cites the ledger on X as "the one honest one." He is the trust flywheel working.

**Reveals requirements for:** immutable ledger data model, methodology/disclosure pages, post-race result recording workflow, compliance language patterns, footer notices, shareable ledger presentation.

### Journey 3 — Aoi, 34: The G1-week habit (secondary user)

**Opening:** Aoi has followed racing casually for years — watches every G1, bets a few times a season, finds netkeiba exhausting and Racing-Post-style paywalls not worth it. Tuesday before the Japan Cup, an X thread — "the 5 stories that decide this year's Japan Cup" — crosses her feed.

**Rising action:** The thread links to the full deep-dive: race history, course quirks at 東京2400m, pedigree narratives, star-horse profiles. It reads like a magazine feature, not a data dump.

**Climax:** By race day she knows the narratives; watching the race is richer. Afterwards she returns for the recap and next week's preview.

**Resolution:** The G1 calendar becomes her reading rhythm; she subscribes to the Saturday newsletter. Each season, the same hub pages deepen — and so does her habit.

**Reveals requirements for:** G1 hub pages (evergreen, annually refreshed), deep-dive article format, X-thread repurposing workflow, newsletter/LINE signup, race-calendar-driven content organization, RSS.

### Journey 4 — Luonghailam: A race week in the operator's seat (admin/ops)

**Opening:** It's Tuesday of a G1 week. The operator has limited hours and three jobs: this week's deep-dive, the private prediction entry, and keeping the evergreen queue moving.

**Rising action:** The pipeline (seo-cockpit, retargeted) drafts the deep-dive from a structured outline; the operator does the human review pass — fact-check against publicly announced data, Japanese-language QA, tone check against editorial policy. Frontmatter is validated by Zod; `npm run build` is the gate. The X thread is cut from the article's sections. The prediction goes into the internal ledger with its reasoning, before the race.

**Climax:** Sunday evening: results are in. The operator records the outcome in the ledger — win or lose — in minutes, not hours. Monday: metrics check (Search Console, return-visitor rate) against the success criteria.

**Resolution:** The weekly loop closes inside the hour budget. When life collides with a race week, the fallback mode (deep-dive only, evergreen paused) keeps the cadence promise without burnout.

**Reveals requirements for:** content-pipeline integration + human-review checklist, Zod schemas as editorial guardrails, ledger entry/result workflow (pre-race timestamping), publish checklist (SEO/rich-results verification), fallback-mode definition, analytics touchpoints.

### Journey Requirements Summary

| Capability area | Revealed by |
|---|---|
| Beginner guide system: inline glossary, internal linking, no-registration reading | J1 |
| Uma Musume bridge article format (factual, IP-safe) | J1 |
| Trust infrastructure: methodology, disclosures, named author, footer notices | J2 |
| Prediction ledger: immutable entries, pre-race timestamps, honest ROI, post-race recording | J2, J4 |
| G1 magazine: hub pages, deep-dive format, annual refresh model | J3 |
| Distribution: X-thread repurposing, newsletter/LINE signup, RSS | J1, J3 |
| Operator workflow: pipeline + human QA, build-as-gate, publish checklist, fallback mode | J4 |
| Performance & SEO plumbing on every page type | All |

## Web Application Specific Requirements

### Project-Type Overview

Multi-page static website (MPA) — Astro 5 static output, zero client JS by default, React 19 islands (`client:visible` only) for the rare interactive component. No SPA behavior, no server rendering, no real-time features (explicitly out of scope by strategy). Every page is prerendered at build time; content lives in Git-versioned content collections.

### Browser & Device Matrix

- **Priority 1 (the audience):** Mobile Safari (iOS 16+) and Chrome on Android — the 20s-30s target reads on phones; mobile is the design and testing default (375px baseline).
- **Priority 2:** Desktop Chrome/Edge/Safari/Firefox, current and previous major versions (1240px+ breakpoint).
- No legacy browser support (no IE, no old WebView targets); static HTML degrades gracefully anyway.
- In-app browsers (X, LINE) must render correctly — the distribution strategy funnels traffic through them; test share-link rendering (OGP) in both.

### Responsive Design

- Mobile-first with separate mobile/desktop markup branches where needed (`md:hidden` / `hidden md:block` pattern from the codebase); manual verification at 375px and 1240px+.
- Japanese typography rules inherited: JP system font stack (no webfonts — protected decision), `overflow-wrap` helpers for space-less Japanese text, 16px minimum input font-size, `scroll-margin-top` registry for anchor links under the sticky header.

### Performance Targets

- **Mobile Lighthouse 99-100 on every page type** — inherited protected budget; regression gate for any change touching hero, layout, or islands.
- LCP: hero image `loading="eager"` + `fetchpriority="high"`, everything else lazy; explicit width/height on all images (CLS ≈ 0); Astro `<Image>` + webp for content images.
- Zero client JS on content pages remains the default; each new island requires justification against the budget.
- This is a strategic requirement, not hygiene: CWV superiority over slow incumbents is a ranking weapon (see What Makes This Special).

### SEO Strategy

- Organic Google.jp search is the primary acquisition channel; the NOTE.md playbook is the binding spec: JSON-LD via `src/utils/schema.ts` generators only (absolute URLs, Article.image array ≥1200px, Organization `@id`, BreadcrumbList, `inLanguage: ja`), `max-image-preview:large`, title ≤24 chars + brand suffix with 全角｜ separator, description front-loaded in first 70 chars, sitemap `lastmod` driven by `updatedDate`, RSS feed.
- URL strategy: clean slugs; any published URL that later changes gets a 301 in `vercel.json` (both raw and percent-encoded entries for Japanese URLs).
- Article list and keyword targets come from the pre-MVP keyword-gap research; structured to survive AI-Overview erosion (long-tail bridge content, formats beyond definitional queries).

### Accessibility Level

- **Pragmatic WCAG 2.1 AA:** semantic HTML, correct heading hierarchy, Japanese alt text on content images (decorative SVGs get empty alt/`aria-hidden`), visible focus states, color contrast via the design-token palette, keyboard-operable navigation and accordion patterns.
- No formal audit/certification in MVP (no regulatory driver); accessibility is enforced through component conventions and the publish checklist.

### Implementation Considerations

- Skip sections (per project type): native device features, CLI commands — not applicable.
- Content collections are the data layer: new keiba schemas (guides, glossary, g1-races, horses/bridge, predictions/ledger) defined with Zod in root `src/content.config.ts`; `npm run build` is the enforcement gate.
- CSP in `vercel.json` is strict and must be updated in the same change as any new external endpoint (e.g., newsletter provider); Formspree entries retired with the contact flow.
- Analytics: privacy-light, CSP-compatible measurement for the success metrics (return-visitor rate, sessions) — provider choice deferred to architecture, but the requirement is declared here.

## Project Scoping & Phased Development

### MVP Strategy & Philosophy

**MVP Approach:** Experience-and-learning MVP — prove two hypotheses before deeper investment: (1) *SERP hypothesis*: a fast, E-E-A-T-clean new domain can win researched beginner/bridge keywords; (2) *retention hypothesis*: beginner readers return on the race calendar's rhythm. The prediction ledger — the riskiest, most distinctive element — runs privately during MVP so its public debut is a data-backed decision, not a gamble.

**Resource Requirements:** Solo operator + AI content pipeline (seo-cockpit, retargeted) + existing codebase. No hires, no infrastructure spend, no licensed data. The binding constraint is operator hours/week — declared at 10 hours/week as a working assumption (NFR16; Open Decision 2 confirms or revises it) — and scope is sized so the weekly G1 cadence survives contact with real life via the defined fallback mode.

### MVP Feature Set (Phase 1)

**Core User Journeys Supported:** J1 (Yui — beginner happy path) end-to-end; J3 (Aoi — G1 habit) in article + X-thread + newsletter-signup form; J4 (operator loop) fully; J2 (Kenta — ledger skeptic) deliberately NOT yet public — his journey gates Phase 2.

**Capability list:** see Product Scope › MVP — all items there (pre-MVP gates, codebase conversion, ~20 articles + glossary + hubs, 2-3 G1 deep-dives, trust pages, distribution shell, private dry-run, analytics baseline) are must-have; nothing in MVP is optional.

### Post-MVP Features

Feature lists live in Product Scope › Growth Features and › Vision. What this section adds: **Phase 2 is trigger-gated, not date-gated.**

| Phase 2 feature | Trigger |
|---|---|
| Public prediction ledger | 8-12-week dry-run evaluated, framing decided |
| Interactive tools (payout simulator, 出馬表 reader) | Organic traffic trending toward the 6-month target |
| Affiliate monetization (Oddspark/Rakuten Keiba) | 12-month decision point with real traffic (relationship-building may start anytime). Proceeding requires adding an affiliate-disclosure requirement (ステマ規制 stealth-marketing rules under 景品表示法, effective 2023) to this PRD at the decision point. |
| Creator partnerships; video/short-form repurposing | Opportunistic once cadence is stable |

**Phase-2 contracting policy:** the public ledger is pre-contracted (FR16-FR18) because the MVP dry-run builds directly toward it. All other Growth-scope items — interactive tools (payout simulator, annotated 出馬表 reader), affiliate monetization, creator partnerships, video repurposing — are scoped here but deliberately NOT contracted as FRs; each requires a PRD amendment adding its FRs before implementation, made when its trigger fires and real data can shape the requirements.

Phase 3 (NAR coverage, data-visual storytelling) follows only after Phase 2 economics are proven.

### Risk Mitigation Strategy

**Technical Risks:** Lowest-risk layer — static conversion of a proven codebase. Known landmines are enumerated (catch-all route collision, empty-collection 404s, carousel-lib duplication, legacy config cleanup) and resolved during conversion, not discovered later. Lighthouse budget enforced per change.

**Market Risks:** AI-Overview/zero-click erosion → keyword-gap research screens for AI-Overview presence before committing articles; bridge long-tail + owned channels (X/LINE/newsletter) hedge Google dependency. netkeiba replication risk → accepted; durable assets (ledger history, owned audience) are the answer, which is why their foundations ship in MVP. Uma Musume popularity-cycle dependency → the beginner hub stands on generic 初心者 search intent that exists independently of the game's cycle; the bridge vertical is an acquisition accelerant, not the foundation, so a fading cycle slows growth without breaking the model.

**Compliance Risks:** Ledger backfire / 景品表示法 exposure (rises once affiliate links exist) → the private 8-12-week dry-run gates the public debut on real data; NFR9/NFR10 enforce no profitability claims, safe wording, and immutable entries including losses; entertainment/process framing is decided before publication; the Phase-2 affiliate trigger carries a mandatory ステマ規制 disclosure requirement (see Post-MVP table).

**Resource Risks:** Solo burnout → minimum viable cadence (1 deep-dive per G1 week) + evergreen pausable + written fallback mode; pipeline automates drafting so operator time concentrates on review/QA. If capacity collapses: site degrades gracefully to evergreen library + hubs (static content doesn't rot on a weekly clock — only the ledger does, and it's private in MVP).

## Functional Requirements

The following FR list is the binding capability contract: UX design, architecture, and epic breakdown implement only what is listed here. FRs tagged *(Phase 2)* are contracted now but built only when their trigger fires. Growth-scope items without FRs here require a PRD amendment before implementation (see Project Scoping › Post-MVP Features › Phase-2 contracting policy).

### Content Library & Reading Experience

- FR1: Readers can browse and read beginner guides (出馬表 reading, bet types, first track day, online betting onboarding) without registration or payment.
- FR2: Readers can look up keiba terminology in a glossary, and encounter jargon terms explained inline wherever they appear in articles.
- FR3: Readers can read Uma Musume bridge articles — factual profiles of the real horses behind characters — and follow links from them into beginner guides and race content.
- FR4: Readers can read G1/重賞 deep-dive articles (history, course characteristics, pedigree stories, horse profiles) organized around the JRA race calendar.
- FR5: Readers can visit a per-race hub page for each covered G1 that accumulates and surfaces that race's content across years.
- FR6: Readers can navigate by content pillar (beginner hub, magazine, glossary) from any page.
- FR7: Readers can discover related content from any article (internal linking by topic, race, and horse).

### Trust & Compliance Infrastructure

- FR8: Readers can view the named author's profile page, credentials, and the site's editorial policy.
- FR9: Readers can see an AI-assistance disclosure explaining how content is produced and reviewed.
- FR10: Readers see responsible-gambling and under-20 notices on every prediction-related and betting-related page.
- FR11: All published race facts stay within the documented data boundary (prose facts, hand-curated history; no bulk data tables, no scraped content) — verifiable per article.
- FR12: Prediction-related content contains no profitability claims and uses 景品表示法-safe language patterns.

### Prediction Ledger

- FR13: The operator can record a prediction entry (picks + reasoning) with a pre-race timestamp before the race runs. *(MVP: private)*
- FR14: The operator can record each prediction's actual result and computed outcome after the race, with entries immutable once recorded.
- FR15: The operator can view the accumulated hit-rate/ROI record across all entries to evaluate the dry run. *(MVP: private)*
- FR16: Readers can view the public ledger — every published prediction with its result, including losses, and honest aggregate ROI. *(Phase 2)*
- FR17: Readers can read the prediction methodology page explaining how predictions are made and framed. *(Phase 2)*
- FR18: Readers can read weekly prediction articles for graded races, published before the race. *(Phase 2)*

### Distribution & Audience Channels

- FR19a: Readers can follow the site's X account from touchpoints on the site.
- FR19b: The operator can publish a thread version of each G1 deep-dive to X.
- FR20: Readers can subscribe to a weekend newsletter and/or LINE channel from any page, timed to the JRA calendar.
- FR21: Readers can subscribe to the site's RSS feed.
- FR22: Shared links render correct OGP previews (title, 1200×675 image) on X and LINE, including in-app browsers.

### Search Discovery & SEO

- FR23: Every content page carries complete structured data (Article JSON-LD, BreadcrumbList, Organization identity) per the site's SEO playbook, rendering as rich results.
- FR24: Search engines receive an accurate sitemap with per-page last-modified dates driven by content update dates.
- FR25: Every published URL remains stable; renamed or removed URLs 301-redirect (raw + percent-encoded forms for Japanese URLs).
- FR26: The launch article set targets keywords committed via the pre-MVP keyword-gap research.

### Content Operations (Operator)

- FR27: The operator can produce articles via the AI pipeline and pass each through a mandatory human review checklist (fact-check, Japanese QA, tone/policy check) before publish.
- FR28: Content missing required editorial metadata (title/description within length rules, dates, category, images, alt text) cannot be published — enforcement is automatic, not a manual checklist step.
- FR29: The operator can execute a defined weekly race-cadence workflow (deep-dive, thread, ledger entry, result recording) and a documented fallback mode when capacity is reduced.
- FR30: The operator can verify SEO/rich-results compliance per release via a repeatable publish checklist.

### Site Identity & Migration

- FR31: The site presents the new keiba brand (validated name, logo, theme) consistently on every page and in every metadata surface — no home-services remnants reachable by users or crawlers.
- FR32: The conversion retires all home-services routes, categories, the contact flow, and the Decap CMS surface (/admin plus its auth worker — see Open Decisions › Resolved), with deliberate handling of legacy URLs and site identity.

### Analytics & Measurement

- FR33: The operator can measure the success-criteria metrics: organic sessions, return-visitor rate, ranking positions, subscriber counts, and G1-week cadence adherence.
- FR34: Measurement stays within the privacy-light posture defined in NFR15 (cookieless, CSP-compatible, <5KB page-weight impact) — no tracking beyond it, protecting the trust brand.

## Non-Functional Requirements

### Performance

- NFR1: Mobile Lighthouse Performance ≥99 on every page type (article, hub, glossary, top) at every release; verified before deploy whenever hero, layout, fonts, images, or islands change.
- NFR2: Core Web Vitals on real mobile devices: LCP <1.5s, CLS <0.02, INP <200ms on a mid-range Android over 4G.
- NFR3: Content pages ship zero client-side JS by default; any island must use `client:visible` and be justified against the performance budget in its PR/commit.
- NFR4: All images are delivered in a size- and format-optimized form that holds the NFR1/NFR2 budgets, with explicit dimensions (CLS ≈ 0); only the LCP hero loads eagerly.

### Security

- NFR5: The site remains fully static — no server endpoints, no secrets in the repository or client code; the only external runtime calls are the newsletter/LINE signup and analytics endpoints, each allowlisted in CSP in the same change that introduces it.
- NFR6: Security headers (HSTS, X-Frame-Options, strict CSP) are never weakened; header config is reviewed whenever `vercel.json` changes.
- NFR7: Subscriber data (newsletter/LINE) lives only in the chosen provider — the site never stores personal data itself.

### Compliance & Content Integrity

- NFR8: 100% of published pages pass the data-boundary rule (prose facts and hand-curated history only; no bulk results tables, no scraped or licensed-feed data) — checked in the publish checklist.
- NFR9: 100% of prediction/betting-related pages carry the responsible-gambling + under-20 notice and contain no profitability claims (景品表示法-safe wording list maintained in the editorial policy).
- NFR10: Ledger integrity: prediction entries are timestamped before race start and never edited or deleted after results are recorded; corrections append, never overwrite.
- NFR11: Every AI-assisted article records that a human review pass (fact-check + Japanese QA) occurred before publish; the AI-assistance disclosure stays accurate to the actual process.
- NFR12: Uma Musume bridge content uses only factual real-horse information — no game assets, character names in titles kept within nominative fair-use framing, re-checked against Cygames guidelines quarterly.

### Integration

- NFR13: Newsletter/LINE provider integration must work under the strict CSP, add no render-blocking scripts, and degrade gracefully (a failed signup widget never breaks the page).
- NFR14: ≥90% of AI-pipeline article drafts pass content validation (required metadata, title/description length rules) without manual per-file fixes; recurring validation failures are corrected at the pipeline level, not article by article.
- NFR15: Analytics collection is cookieless/privacy-light, CSP-compatible, and adds <5KB to page weight.

### Operability (Solo Operator)

- NFR16: The weekly race-cadence loop (deep-dive review + thread + ledger entry + result recording) fits within the declared weekly hour budget of **10 hours/week** (working assumption from the solo-operator, side-project context; Open Decision 2 confirms or revises the number); if a step routinely pushes the loop over budget, the workflow — not the operator — is adjusted.
- NFR17: `npm run build` remains the single quality gate: TS strict + Zod violations block publish; a failed build can never partially deploy.
- NFR18: The fallback mode is documented and executable: reduced race-week output (deep-dive only) without breaking site integrity, cadence promises, or ledger continuity.
- NFR19: Content publishing requires no infrastructure beyond git push → Vercel build; recovery from any bad deploy is a git revert.

## Open Decisions (inherited from Product Brief)

1. **Named author persona + Japanese-language QA ownership** — blocks content production (FR27, NFR11).
2. **Launch date + operator hours/week budget** — confirms or revises the 10 hours/week working assumption declared in NFR16 and sizes the cadence commitment (FR29).
3. **Final brand name + domain** — pre-MVP validation gate (FR31); working name ウマノミカタ pending J-PlatPat/domain/SNS-handle checks.
4. **Prediction pipeline inputs** — exact public data sources for the weekly 出馬表/results workflow, the manual-entry time cost per race week, and the legal basis for prediction publication once the site monetizes — sizes FR13/FR29 operability and feeds the NFR16 budget; must be answered before the private dry-run starts.

### Resolved

- **Decap CMS: dropped.** The existing /admin (Decap) + cms-auth Cloudflare Worker are retired in the conversion (FR32). Rationale: the CMS config is bound entirely to the home-services collections and legacy repo identity; the operator workflow (J4) is pipeline → git → build with no CMS in the loop; keeping it would maintain a CSP-exempt admin surface and a separately deployed auth worker that no requirement uses. Reinstatement would be a new decision with a new config, not a carry-over.
