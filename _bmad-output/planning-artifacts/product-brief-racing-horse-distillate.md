---
title: 'Product Brief Distillate: Keiba Media Pivot (ウマノミカタ)'
type: llm-distillate
source: 'product-brief-racing-horse.md'
created: '2026-08-25'
purpose: 'Token-efficient context for downstream PRD creation'
---

# Product Brief Distillate — Keiba Media Pivot

## Product decision summary (session 2026-08-25)

- User decision: convert the ENTIRE existing star-light site (JP home-services, www.setsubi-pro.net) into a Japanese horse-racing (keiba) media site. Reuse codebase, replace all content/identity.
- Chosen content pillars (user-selected, multi): (1) beginner education hub 初心者向け, (2) G1/重賞 analysis magazine, (3) transparent AI prediction blog. NAR regional coverage NOT chosen for phase 1 (deferred to Phase 2 as expansion).
- Monetization: user chose "no monetization yet" — build traffic/brand first; affiliate (Oddspark/Rakuten Keiba/SPAT4) is the validated future path; display ads conflict with the clean-site positioning.
- Brand: user chose NEW domain + NEW brand (not reusing setsubi-pro.net). Working name ウマノミカタ (wordplay 見方 "how to read" / 味方 "ally"); alternatives 競馬コンパス, ウマガイド. Name NOT validated yet (trademark/domain/SNS handles) — pre-MVP gate.
- Positioning thesis (from review integration): "the graduation path from Uma Musume to real racing" — own the beginner journey end-to-end; NOT "a cleaner netkeiba".

## Rejected ideas (do not re-propose)

- Live odds / real-time results / comprehensive horse-jockey databases — JRA-VAN standard terms prohibit redistribution on monetized sites; commercial JRADB contracts are corporate-priced; also incompatible with static architecture. Deliberately OUT.
- Paid tips / selling predictions — 予想サイト category is scam-associated, JRA publishes warnings; 景品表示法/特商法 exposure. Ledger must never claim profitability.
- Head-on portal competition with netkeiba — unwinnable on SEO/brand/app scale.
- Scraping netkeiba/JRA for data — ToS/copyright violation.
- Uma Musume game assets/character imagery — Cygames IP; only factual real-horse history is safe.
- Display ads as primary model — contradicts core differentiator.
- Reusing setsubi-pro.net domain — home-services SEO history harms topical E-E-A-T.
- Webfonts — story 6.3 dropped them for JP system font stack to hold Lighthouse 99-100 (protected budget).
- Cloudflare Pages — Vercel is the deployment reality; vercel.json is source of truth.

## Requirements hints (for PRD)

- New content collections replacing services/cases/testimonials/faq/company: likely articles (beginner guides, glossary entries, G1 deep-dives, horse profiles, prediction posts), race/hub pages. Keep pattern: JSON for structured data, Markdown for prose, Zod schemas in root-level src/content.config.ts (NOT legacy src/content/config.ts).
- MVP content: ~20 beginner + Uma-Musume-bridge articles + glossary + pillar hub pages + 2-3 G1 deep-dives. Article list committed only after keyword-gap research (volume, SERP owners, AI-Overview presence per candidate keyword).
- Trust/editorial pages required at launch: named author about page, editorial policy, AI-assistance disclosure, responsible-gambling + under-20 notice.
- Prediction ledger: private dry-run 8-12 race weeks BEFORE public launch; public version needs immutable entries, ROI including losses, methodology page; entertainment/process framing.
- Distribution in MVP: X (Twitter) account with G1-week threads; LINE official account and/or weekend newsletter (Saturday-morning cadence matching JRA calendar).
- Data boundary rules (write into content guidelines): OK = race facts in prose, hand-curated history, publicly announced info; NOT OK = sortable cross-race results tables, bulk data reproduction, scraping.
- Phase 2: public ledger, client-side interactive tools (bet-type payout simulator, annotated 出馬表 reader — backlink magnets), affiliate integration, NAR coverage, creator (YouTuber/VTuber) citation partnerships, video/short-form repurposing of article content.
- Retire: Formspree contact flow, 「必須」form patterns, electricity/water Zod enum + service routes, home-services redirect map (but keep 301 discipline for any published URL), Decap CMS decision open (keep or drop for new product).

## Technical context (existing codebase — reusable foundation)

- Astro ^5.18.1 static output, Content Layer API glob() loaders, sharp/webp images; Tailwind v4 (@theme tokens in src/styles/global.css, NO config js); TS strict; React 19 islands with client:visible ONLY; vanilla <script> for trivial interactivity.
- Config centralization: src/config/{site,navigation,services,theme}.ts via @config/* alias; never hardcode brand/phone/URL. Legacy src/data/*.ts to migrate, not grow.
- Deploy: Vercel static; vercel.json = CSP + security headers + 301 map. Any new external script/endpoint requires same-change CSP edit. /admin (Decap) CSP-exempt; cms-auth Cloudflare Worker deployed separately.
- Quality gate: `npm run build` (TS strict + Zod). No test suite. Mobile Lighthouse 99-100 protected baseline — regression risks: webfonts, eager below-fold images, heavy islands, client:load.
- SEO plumbing to reuse: src/utils/schema.ts JSON-LD generators (absolute URLs mandatory), BaseLayout Organization/WebSite JSON-LD, Breadcrumb.astro, sitemap serialize() driven by frontmatter updatedDate, RSS.
- NOTE.md SEO invariants: Article.image array ≥1200px long edge (1200x675 share webp + 800x450 hero), images in BOTH public/images/SEO/<slug>/ and src/assets/images/SEO/<slug>/, Organization @id <site>/#organization, inLanguage ja, meta robots max-image-preview:large, title ≤24 chars + brand suffix, 全角｜ separator, description front-load 70 chars, required frontmatter: title/description/publishedDate/updatedDate/category/subcategory/image/imageAlt.
- External content pipeline: ~/Projects/auto_workflow/seo-cockpit/generateWorker.ts — retarget for keiba articles; title/description length fixes belong there, not per-file.
- Known landmines to fix during conversion: empty collections 404 paginated routes; columns/[...page] vs [...slug] catch-all collision; duplicate carousel libs (Embla + Swiper — conversion is the moment to pick one); placeholder email 'abcxyz@gmail.com' in old config; dead 'cockroach' branch in [category]/[service].astro.
- Trilingual convention: code comments Vietnamese, user-facing strings Japanese, docs/commits English. Conventional commits, trunk-based main.

## Competitive intelligence (research 2026-08-25)

- netkeiba (#1 JP): full portal, ads + Premium tiers + per-race pick sales. Weaknesses users cite: layout-shifting ads causing mis-taps, clunky horse-comparison navigation, paywalled basics (favorites, 出走予定), jargon-heavy for beginners.
- JRA official: authoritative free data, dated UX, no editorial depth. Umanity: tipster-ranking SNS marketplace, aging UI, variable quality. keibalab: editorial+data hybrid, weaker DB, limited brand.
- International models (Racing Post subscription+bookmaker affiliate; Timeform premium ratings; Equibase official data monopoly; DRF per-card PP sales): all expert-oriented, weak beginner layer — pattern confirms beginner gap is global.
- Market: JRA turnover ¥3.506T in 2025 (+5.2%, 14th straight growth year); online betting dominates (NAR ~90% online); 20-29 cohort fastest-growing (57% bet weekly+); Uma Musume = durable fan pipeline incl. into NAR; attendance 5.23M (+1.8%).
- Trust vacuum: deep user distrust of 予想サイト; JRA publishes scam warnings — transparent methodology + honest records is an explicitly sought differentiator.

## Success criteria & risk register (as finalized)

- 6mo: 5-10k organic sessions/mo; top-10 for 15-20 researched keywords; Article rich results. Pivot threshold: <2k sessions/mo at month 6.
- 12mo: 30-50k sessions/mo; monetization decision from real traffic. Trust proxies: return-visitor rate, branded search, X/LINE followers, direct-traffic share.
- Ops: minimum viable cadence = 1 deep-dive per G1 week; evergreen pausable; explicit fallback mode.
- Top risks: AI Overviews absorbing definitional queries (high); solo burnout, no off-season (high); ledger backfire + 景品表示法 exposure once affiliate links exist (med); differentiators replicable — durable assets are ledger history/owned audience/brand (med); Uma Musume popularity-cycle dependency (med).

## Open questions (unresolved — PRD must address or escalate)

1. Named author persona + who performs Japanese-language QA on AI-assisted content (operator's JP proficiency unconfirmed; comments convention suggests Vietnamese-speaking operator).
2. Launch date, hours/week capacity, content production cost per article type.
3. Final brand name + domain (pre-MVP validation gate: J-PlatPat, domain, SNS handles).
4. Prediction pipeline inputs: exact public data sources for weekly 出馬表/results, manual-entry workflow and weekly time cost, legal basis once site monetizes.
5. Keep or drop Decap CMS (/admin + cms-auth Worker) for the new product.
6. Fate of setsubi-pro.net and the old site (separate concern, but redirects/identity must be handled deliberately).
7. Uma Musume bridge content: confirm safe editorial boundary (real-horse facts OK; monitor Cygames guideline changes).
