---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/ux-design-specification.md
  - _bmad-output/planning-artifacts/product-brief-racing-horse-distillate.md
  - _bmad-output/project-context.md
  - _bmad-output/planning-artifacts/archive-star-light/architecture.md (retired-product reference only)
workflowType: 'architecture'
project_name: 'racing-horse (ウマノミカタ working name)'
user_name: 'Luonghailam'
date: '2026-08-26'
lastStep: 8
status: 'complete'
completedAt: '2026-08-26'
---

# Architecture Decision Document — Keiba Media Pivot (ウマノミカタ)

_This document is the binding technical contract for converting the star-light codebase into the keiba media product. It covers what is KEPT, what is RETIRED, and what is NEW. Implementation AI agents follow this document plus `_bmad-output/project-context.md`; where the two conflict on pivot-specific matters, this document wins (project-context.md rules marked "star-light product-specific" are superseded)._

---

## Project Context Analysis

### Requirements Overview

**Functional Requirements (35 FR items in 8 categories — FR1–FR34, with FR19 split into FR19a/FR19b):**

- **Content Library & Reading (FR1–FR7):** four reader-facing content types (beginner guides, glossary, Uma Musume bridge articles, G1 deep-dives) + per-race hub pages + pillar navigation + topic-based internal linking. Architecturally: this is the content-collection data model — everything renders statically from Zod-validated collections.
- **Trust & Compliance (FR8–FR12):** author/editorial/disclosure pages, standing notices on betting-adjacent pages, data-boundary and 景品表示法 wording enforcement. Architecturally: static trust pages + a compliance config module + template-level notice components; enforcement is editorial-process plus schema, not runtime code.
- **Prediction Ledger (FR13–FR18):** private in MVP, public in Phase 2. The only genuinely novel data model in the product: append-oriented prediction entries with pre-race timestamps, post-race results, computed hit-rate/ROI aggregates, immutability guarantees (NFR10). Architecturally: a content collection with a strict lifecycle convention + build-time aggregation — no database.
- **Distribution (FR19a–FR22):** X touchpoints, newsletter/LINE signup, RSS, OGP correctness. Architecturally: one external form endpoint (newsletter provider) under CSP, RSS reuse, OGP image conventions per template.
- **SEO (FR23–FR26):** the inherited NOTE.md playbook is binding — JSON-LD generators, sitemap lastmod, 301 discipline, keyword-driven launch set.
- **Content Ops (FR27–FR30):** pipeline → human review → Zod-gated build. Architecturally: schemas ARE the enforcement layer (FR28); no CMS.
- **Identity & Migration (FR31–FR32):** full brand replacement; retire home-services routes/collections, contact flow, Decap CMS /admin + cms-auth worker.
- **Analytics (FR33–FR34):** cookieless, CSP-compatible, <5KB measurement of sessions/return-rate.

**Non-Functional Requirements that drive architecture:**

- NFR1–NFR4: mobile Lighthouse ≥99 on every page type; zero client JS on content pages; `client:visible` only; image discipline. This eliminates component libraries, client-side search, and carousels — and did, in the UX spec.
- NFR5–NFR7: fully static, no secrets, CSP updated in the same change as any new endpoint, subscriber data lives only in the provider.
- NFR8–NFR12: data boundary (prose facts only — no bulk tables, no scraped/licensed data), ledger integrity (pre-race timestamps, append-only corrections), IP safety for bridge content.
- NFR13–NFR15: newsletter integration degrades gracefully; ≥90% of pipeline drafts pass validation without per-file fixes; analytics cookieless/<5KB.
- NFR16–NFR19: 10 h/week operator budget; `npm run build` as the single quality gate; git push → Vercel is the entire deployment; recovery = git revert.

**Scale & Complexity:**

- Primary domain: static multi-page web publishing (Astro MPA), Japanese market, SEO-critical.
- Complexity level: **low technical / high discipline** — no backend, no auth, no realtime; the difficulty lives in schema design, compliance conventions, migration hygiene, and the performance budget.
- Estimated architectural components: 6 content collections, ~8 page templates, ~20 components (9 retained/re-skinned + 12 new), 5 config modules, 1 external endpoint (newsletter), 1 analytics beacon.

### Technical Constraints & Dependencies

- **Brownfield foundation (KEEP, non-negotiable):** Astro ^5.18 static output + Content Layer `glob()` collections + Zod in root `src/content.config.ts`; Tailwind v4 `@theme` tokens in `src/styles/global.css`; TypeScript strict; `@config/*` alias; `src/config/` as single source of truth; JSON-LD only via `src/utils/schema.ts`; sitemap lastmod via `astro.config.mjs` `serialize()`; `vercel.json` for headers/CSP/redirects; JP system font stack; React 19 islands `client:visible` only; `npm run build` gate.
- **Brand/domain not final:** working name ウマノミカタ; domain pending pre-MVP validation. All identity must flow through `SITE_CONFIG` so the final name/domain is a one-file change.
- **New domain ≠ old domain:** the product launches on a NEW domain; setsubi-pro.net and its SEO history are deliberately left behind (brief decision). This dissolves the "redirect the old URLs" problem into a different shape — see Core Decisions › URL & Redirect Strategy.
- **External content pipeline:** `~/Projects/auto_workflow/seo-cockpit` produces drafts; frontmatter contract between pipeline and schemas must be explicit (NFR14).
- **Data boundary:** no JRA-VAN/JRADB data, no scraping, no bulk results tables — the data model must make storing such data structurally awkward (prose fields, not stat tables).

### Cross-Cutting Concerns Identified

1. **Compliance surface** — notices, wording rules, and disclosures cut across every prediction/betting-adjacent template: centralized in `src/config/compliance.ts` + `NoticeFooter` component, rendered by template type, never hand-placed per page.
2. **SEO plumbing** — JSON-LD, OGP, sitemap lastmod, breadcrumbs apply to all 8 templates: centralized in `BaseLayout` + `schema.ts` + one sitemap date-map builder covering all dated collections.
3. **Internal-linking metadata** — the ContinuationBlock/GlossaryTerm/SeriesNav routing is frontmatter-driven; every content schema carries the relational fields (`relatedTerms`, `relatedRace`, `series*`, `pillar`).
4. **Performance budget** — constrains every component and every image across all collections; enforced by convention + Lighthouse spot checks, not tooling.
5. **Migration hygiene** — retired routes/collections/dependencies must be fully removed (FR31: no remnants reachable by users or crawlers), including known landmines (legacy `src/content/config.ts`, stray asset dirs, placeholder email, carousel libs).

## Starter Template Evaluation

### Primary Technology Domain

Static content web application (Astro MPA). **This is a brownfield conversion — no starter template is used or needed.** The existing codebase IS the starter: it already embodies every foundational decision a starter would provide, in production-proven form (Lighthouse 99–100 live on Vercel).

### Starter Options Considered

Considered and rejected: fresh `create astro` (would discard the proven token pipeline, SEO plumbing, JP typography helpers, and deploy config for zero benefit); Astro blog/content themes (all would fight the bespoke design system and performance posture). The correct move is conversion-in-place on a new git branch of this repository.

### Selected Foundation: existing `racing-horse` codebase (star-light heritage)

**Rationale:** the PRD's entire premise (What Makes This Special #1) is inheriting this codebase's performance and SEO assets. Versions below are pinned by the existing `package.json` — they are the deployed reality, not researched candidates. Policy: stay on current major lines (Astro 5.x, Tailwind 4.x, React 19.x); routine minor/patch updates allowed; major upgrades are deliberate post-MVP decisions.

**Architectural decisions provided by the foundation:**

- **Language & Runtime:** TypeScript (strict, `astro/tsconfigs/strict`), Node build-time only; Astro ^5.18.1 `output: 'static'`, `compressHTML`, sharp image service.
- **Styling:** Tailwind CSS ^4.2.4 via `@tailwindcss/vite`; tokens exclusively in `@theme` (`src/styles/global.css`); `src/config/theme.ts` mirrors tokens as CSS-var strings; no config-file Tailwind, no `@apply`.
- **Interactivity model:** zero client JS default; vanilla `<script>` for trivial toggles; React ^19.2.6 islands with `client:visible` only (MVP ships **zero** islands).
- **Build tooling:** Vite ^6.4.2 (via Astro), `npm run build` as the quality gate; no linter configs (match surrounding style).
- **Testing:** no automated suite; Playwright ^1.60.0 (dev) for ad-hoc Lighthouse/screenshot audits; manual 375px/1240px QA (per UX spec Testing Strategy).
- **Code organization:** flat `src/components/`, `src/config/` centralization with `@config/*` alias, root `src/content.config.ts`, `src/utils/` for formatters/schema/image helpers.
- **Deployment:** Vercel static hosting; `vercel.json` = security headers + CSP + redirects; git push → build → deploy; rollback = revert.

**Initialization command:** none. First implementation story is the **conversion/retirement pass** (see Decision Impact Analysis › Implementation Sequence), executed on a feature branch of this repo.

## Core Architectural Decisions

### Decision Priority Analysis

**Critical (block implementation):** content collection data model (D1); prediction ledger model & immutability (D2); URL strategy & redirect handling (D3); identity/config refactor (D4); retirement scope (D5).

**Important (shape architecture):** SEO plumbing extension (D6); analytics (D7); newsletter provider integration (D8); dependency changes (D9); image/OGP conventions (D10).

**Deferred (post-MVP, pre-contracted):** Phase 2 public ledger routes (designed here, built at trigger); interactive-tool islands (payout simulator, 出馬表 reader — React 19 `client:visible`, tokens via `THEME`, no further architecture needed now); client-side search (only if corpus outgrows browsing); affiliate integration (requires PRD amendment + ステマ規制 disclosure).

### D1 — Data Architecture: Content Collections

All content lives in Git-versioned collections defined with Zod + `glob()` loaders in root `src/content.config.ts` (legacy `src/content/config.ts` is deleted). The home-services collections (`services`, `cases`, `testimonials`, `faq`, `blog`, `company`) are removed and replaced by **six keiba collections**:

| Collection | Loader | Format | Purpose (FR) |
|---|---|---|---|
| `guides` | `glob md` in `src/content/guides/` | Markdown | Beginner guide articles, series-aware (FR1) |
| `glossary` | `glob md` in `src/content/glossary/` | Markdown | Term entries with short gloss + long body (FR2) |
| `bridge` | `glob md` in `src/content/bridge/` | Markdown | Uma Musume real-horse profiles (FR3) |
| `races` | `glob json` in `src/content/races/` | JSON | G1/重賞 race hub definitions — one file per race (FR5) |
| `raceArticles` | `glob md` in `src/content/race-articles/` | Markdown | Deep-dives / previews / recaps attached to a race (FR4) |
| `predictions` | `glob json` in `src/content/predictions/` | JSON | Ledger entries (FR13–FR16) — see D2 |

Structured data = JSON, prose = Markdown (inherited split). MDX is NOT introduced — glossary-term links inside article bodies are plain Markdown links (see Implementation Patterns › GlossaryTerm authoring rule).

**Shared article frontmatter contract** (the pipeline ↔ schema contract, NFR14) — required on every `guides`/`bridge`/`raceArticles` entry:

```ts
// Trường chung cho mọi bài viết — pipeline seo-cockpit phải xuất đúng các trường này
const articleBase = z.object({
  title: z.string().max(40),            // SEO title ≤24 ký tự hiển thị + brand suffix tự thêm ở layout
  description: z.string().min(50).max(160), // 70 ký tự đầu chứa ý chính (playbook NOTE.md)
  publishedDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  image: z.string(),                    // '/images/articles/<collection>/<slug>/hero.webp'
  imageAlt: z.string(),                 // tiếng Nhật, bắt buộc
  relatedTerms: z.array(z.string()).default([]),  // slug của glossary — nạp ContinuationBlock/nội dung liên quan
  relatedRace: z.string().optional(),   // id của races — liên kết tới race hub
  draft: z.boolean().default(false),    // draft=true bị loại khỏi build ở getStaticPaths
});
```

Collection-specific fields:

- `guides`: `series: z.string().optional()`, `seriesOrder: z.number().int().positive().optional()`, `seriesTotal` derived at build (never stored — counted from the collection, so adding a part can't desync the total), `faqEntries: z.array({question, answer}).default([])` (feeds FAQAccordion + FAQPage JSON-LD).
- `glossary`: `term` (表記), `reading` (かな — drives 五十音 index grouping), `category: z.enum(['baken','race','pedigree','course'])` (馬券/レース/血統/コース), `shortGloss: z.string().max(60)` (the inline-gloss text, reused everywhere the term is decoded), `relatedTerms`. No hero image required (glossary entries use the site default OGP).
- `bridge`: `horseName`, `horseNameEn: optional`, `era: z.string()` (活躍年代 as prose), `umaCharacter: z.string().optional()` — **character name stored for internal linking/search intent only; never rendered as an image/asset reference (NFR12)**; `keyRaces: z.array(z.string()).default([])` (race-collection ids).
- `races` (JSON hub): `raceId` (= filename slug, e.g. `japan-cup`), `name` (日本語), `grade: z.enum(['G1','G2','G3'])`, `course` (e.g. 東京), `distance: z.string()` (prose, e.g. '芝2400m' — string not number, by data-boundary design), `month: z.number().int().min(1).max(12)` (calendar ordering), `description`, `heroImage`/`heroImageAlt` optional.
- `raceArticles`: `race: z.string()` (must match a `races` id — verified at build in `getStaticPaths` with an explicit throw), `edition: z.number().int()` (開催年, e.g. 2026), `articleType: z.enum(['deep-dive','preview','recap'])`.

**Validation strategy:** Zod at build time is the only validation layer — content that fails schema fails `npm run build` (FR28, NFR17). Cross-collection referential integrity (`relatedTerms`, `relatedRace`, `race`, `keyRaces` pointing at real entries) is enforced by a build-time assertion helper `src/utils/contentGraph.ts` used in `getStaticPaths`/hub pages: unknown reference → thrown error naming the file and field. No runtime validation exists (nothing runs at runtime).

**Migration approach:** old collections and their content directories are deleted in the conversion commit, not migrated — no home-services content survives (FR31). New collections start with launch content only; **routes ship in the same PR as their first real content** (empty-collection 404 landmine).

**Caching:** none needed beyond Vercel's CDN — static files, immutable asset hashes from Astro build.

### D2 — Prediction Ledger: Data Model & Immutability

The riskiest design in the product; decided fully now so the Phase-2 public debut reuses the MVP-private structure unchanged.

**Storage:** one JSON file per prediction entry in `src/content/predictions/<year>/<race-date>-<race-slug>.json` (e.g. `2026/2026-06-28-takarazuka-kinen.json`). Git is the ledger's database AND its audit trail.

**Schema (`predictions` collection):**

```ts
const pick = z.object({
  betType: z.enum(['tansho','fukusho','umaren','wide','umatan','sanrenpuku','sanrentan']),
  selection: z.string(),            // ngựa/tổ hợp, dạng chữ: '5 レガレイラ' / '5-12'
  stake: z.literal(100),            // đơn vị cược danh nghĩa cố định ¥100 — ROI trung thực, không trọng số
  reasoning: z.string().min(1),     // lý do PHẢI ghi trước khi đua
});

const predictions = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/predictions' }),
  schema: z.object({
    raceId: z.string(),                       // tham chiếu collection races (hoặc slug race ngoài danh sách hub)
    raceName: z.string(),
    raceDate: z.coerce.date(),
    grade: z.enum(['G1', 'G2', 'G3']),
    entryPostedAt: z.string().datetime(),     // ISO — thời điểm chốt dự đoán, PHẢI trước giờ đua
    picks: z.array(pick).min(1),
    status: z.enum(['pending', 'recorded']),
    result: z.object({
      recordedAt: z.string().datetime(),
      outcomes: z.array(z.object({
        pickIndex: z.number().int().min(0),
        hit: z.boolean(),
        payout: z.number().min(0),            // tiền trả cho ¥100 (0 nếu trượt) — số công bố công khai, ghi tay
      })),
    }).optional(),
    annotations: z.array(z.object({           // đính chính CHỈ ĐƯỢC THÊM, không bao giờ sửa result
      appendedAt: z.string().datetime(),
      note: z.string(),
    })).default([]),
  }).refine(e => e.status === 'pending' || e.result !== undefined,
    { message: 'status=recorded yêu cầu phải có result' })
    .refine(e => !e.result || e.result.outcomes.length === e.picks.length,
    { message: 'result.outcomes phải đủ cho mọi pick' }),
});
```

**Immutability model (NFR10) — a lifecycle convention enforced by schema + git, not by infrastructure:**

1. **Entry commit (pre-race):** file created with `status:'pending'`, no `result`. The git commit timestamp + `entryPostedAt` together are the pre-race proof. Commit message convention: `ledger: entry <race-slug> <date>`.
2. **Result commit (post-race, the only permitted edit):** adds `result`, flips `status` to `'recorded'`. Commit message: `ledger: result <race-slug> <date>`. Nothing else in the file may change in this commit — `picks`, `reasoning`, `entryPostedAt` are frozen from commit 1.
3. **After `status:'recorded'`:** the file is append-only — only new `annotations[]` items may be added (commit `ledger: annotate <race-slug>`). Entries are NEVER deleted; a wrong entry gets an annotation, its result stands.
4. **Public verifiability (Phase 2):** the ledger page renders `entryPostedAt` per row; the strongest external proof is the pre-race prediction article/X thread (crawlable, archivable timestamps). Git history is the internal audit trail. No cryptographic mechanism — over-engineering for this trust model; honesty is demonstrated by the pre-race publication pattern, not hashes.

**Aggregation:** hit rate and ROI (回収率 = total payout ÷ total stake, stake = picks × ¥100) are computed at build time by `src/utils/ledger.ts` from the full collection — never stored, so they can never disagree with the entries. `LedgerTable`/`LedgerKPIs` consume this util. Pending entries render 「結果待ち」 and are excluded from ROI until recorded.

**MVP privacy:** the collection and components exist and are exercised by the dry run, but **no `/yosou/*` route file exists in MVP** — Astro builds no page, nothing is crawlable, no "coming soon" page (UX rule). The repository is private, so entries are not publicly visible pre-launch. Phase 2 = adding the four `/yosou/` route files + nav slot 5, nothing else.

### D3 — URL Strategy & Redirect Handling

**Canonical URL scheme (all slugs ASCII kebab-case romaji — no Japanese characters in paths, which eliminates the dual raw/percent-encoded redirect burden for all new URLs):**

```
/                                   Top
/guide/                             Beginner hub
/guide/[slug]/                      Guide article
/uma-musume/                        Bridge hub
/uma-musume/[slug]/                 Bridge article (slug = horse name romaji, e.g. /uma-musume/special-week/)
/races/                             Magazine hub (calendar-organized)
/races/[race]/                      Race hub (e.g. /races/japan-cup/ — permanent, accumulates years)
/races/[race]/[slug]/               Race article (slug = <edition>-<type>, e.g. 2026-preview, 2026-deep-dive)
/glossary/                          Glossary index (五十音 + theme groups)
/glossary/[term]/                   Glossary entry (romaji slug, e.g. /glossary/fukusho/)
/about/                             Author profile + site mission
/editorial-policy/                  Editorial policy + AI disclosure
/responsible-gambling/              Responsible-gambling + under-20 canonical page
/privacy/                           Privacy policy (rewritten: analytics + newsletter disclosure)
/404                                Styled recovery page
/rss.xml                            RSS (all article collections, newest first)
/sitemap-index.xml                  @astrojs/sitemap output
--- Phase 2 only (no files in MVP) ---
/yosou/                             Prediction pillar hub
/yosou/record/                      Public ledger
/yosou/about/                       Methodology
/yosou/[slug]/                      Prediction article
```

Trailing-slash canonical form (Astro default + existing convention). Pagination, if a hub ever needs it, uses `/page/2/` suffix via existing `Pagination.astro` — but MVP corpus (~25 articles) needs none.

**Redirect strategy for retired URLs — decision: the old redirect map is removed, not extended.**

- The product launches on a **new domain**; the existing 33-entry redirect map in `vercel.json` targets `https://www.setsubi-pro.net/...` absolute URLs and is meaningless on the new domain. It is deleted along with all home-services routes.
- **setsubi-pro.net's fate is explicitly out of this codebase's scope** (brief Open Question 6): this repo/Vercel project becomes the new-domain site. If the old domain stays live during transition, it is served by the pre-pivot commit as a separate Vercel project/branch — decision for the operator at cutover, outside this architecture. No old-domain URL is expected to resolve to the new site, and no cross-domain redirects are configured here (deliberate: home-services SEO history must not bleed into the keiba domain's E-E-A-T).
- **Going forward, FR25 discipline applies from launch day:** any published new-domain URL that is renamed/removed gets a 301 entry in `vercel.json` in the same change. Because all slugs are ASCII, single-entry redirects suffice (the raw+encoded pair rule is retired with Japanese URLs — but retained in the checklist should a Japanese-character URL ever ship).
- `vercel.json` keeps exactly one redirect at launch: apex → `www` (or the reverse, fixed when the domain is chosen; the chosen canonical host must match `SITE_CONFIG.siteUrl`).

### D4 — Site Identity & Configuration Refactor

`src/config/` remains the single source of truth; the module set changes:

| Module | Fate | Contents after conversion |
|---|---|---|
| `site.ts` | **Rewritten** | `SITE_CONFIG`: `siteName` (ウマノミカタ placeholder), `siteNameKana`, `siteUrl` (placeholder `https://www.example.jp` until domain validation — one-line change at cutover), `logoPath`, `defaultDescription`, `defaultOgImage`, `rssTitle`, `socialLinks` (X URL, LINE URL when created). **Removed:** phone, email, business hours, `REGIONAL_OFFICES`, placeholder Gmail — no physical-business identity exists (FR31). |
| `navigation.ts` | **Rewritten** | Pillar nav (初心者向け・レース分析・ウマ娘×競馬・用語集 + menu-only trust links), footer columns, designed with the 5th slot (予想) commented for Phase 2. |
| `theme.ts` | **Re-tokened** | Mirrors the new `@theme` palette (ink/brand/turf/accent/bridge/paper/line/win/loss/notice per UX spec) as `var(--color-*)` strings. |
| `services.ts` | **Deleted** | — |
| `author.ts` | **New** | `AUTHOR_CONFIG`: name (pending Open Decision 1 — placeholder constant), kana, bio short/long, avatar path, sameAs links. Feeds AuthorByline/AuthorCard and Article JSON-LD `author`. |
| `raceCalendar.ts` | **New** | Typed array of the season's graded races (`raceId`, name, grade, date, course) — hand-maintained from public JRA calendar (prose-level facts, data-boundary safe). `getRaceWeek(buildDate)` selects the current/next race for `RaceWeekModule`. "This weekend" freshness is guaranteed by the weekly publish cadence: every content push rebuilds the site (correct-by-cadence; an off-week never renders empty thanks to the "next upcoming" fallback). |
| `compliance.ts` | **New** | The standing notice strings (footer short form, in-content band form), the banned-wording list (絶対・確実・儲かる・的中保証…) as an exported array used by the editorial checklist, and the disclosure-link registry. Single source for FR10/FR12/NFR9 text. |

`src/data/*.ts` legacy modules (blogData, caseVoiceData, companyData) are **deleted** with their consuming pages.

### D5 — Retirement Scope (FR32) — exhaustive list

**Routes/pages deleted:** `src/pages/[category]/` (incl. dead `cockroach` branch), `services/`, `case/`, `voice/`, `company/`, `columns/`, `contact.astro`, `faq.astro`, `flow.astro`, `sitemap.astro` (HTML sitemap page — rebuilt only if the new IA wants one; default: not rebuilt), `admin/` (Decap CMS), old `index.astro`/`404.astro`/`privacy.astro` (replaced by new-brand versions).

**Collections deleted:** `services`, `cases`, `testimonials`, `faq`, `blog`, `company` + their `src/content/*` directories + legacy duplicate `src/content/config.ts`.

**Components deleted:** PriceBar, PricingTier, AreaMap, ContactFormSection, ProcessFlow, ServiceKV, ServiceCard, ServiceCategorySection, ComparisonTable, TestimonialCard, CaseStudyCard, CtaFeatures, ReasonsGrid, HeroSection, MegaMenu, FilterNav, CategorySidebar, BlogCategorySidebar, AnchorMenu, ServiceSlider.tsx.

**Dependencies removed from `package.json`:** `@formspree/react`, `embla-carousel`, `embla-carousel-react`, `swiper`. React/`@astrojs/react` are RETAINED (zero islands in MVP, but Phase-2 tools are pre-contracted React islands; keeping the integration costs nothing at runtime in a static build). Package `name` → `umanomikata` (or final brand at cutover).

**Infra retired:** `cms-auth/` Cloudflare Worker directory deleted from the repo (its Cloudflare deployment is torn down by the operator); `/admin` CSP exemption pattern `/((?!admin).*)` in `vercel.json` collapses to `/(.*)`; Formspree hosts removed from CSP `connect-src`/`form-action`; Google Fonts hosts removed from CSP `style-src`/`font-src` (legacy allowance — webfonts are banned anyway); Decap admin excluded-from-sitemap filter removed from `astro.config.mjs`; `docs/admin-guide.md` deleted.

**Codebase hygiene in the same pass:** delete stray `src/assets/images/hero/.astro/` and `src/assets/images/hero/node_modules/` build artifacts; delete home-services images under `src/assets/images/` and `public/images/` (logo, staff, service KVs, SEO article images); `docs/seo-*.md` drafts archived or deleted.

**Schema.ts pruning:** `generateLocalBusiness`, `generateService`, `generateReview`, `generateAggregateRating` and their types are deleted. Retained: `serializeJsonLd`, `absoluteUrl`, `generateArticle`, `generateBreadcrumb`, `generateFAQ`, `generateWebSite`, `generateOrganization` (re-pointed at new `SITE_CONFIG`; `Organization @id` = `<new-site>/#organization`).

### D6 — SEO Plumbing Extension

- **JSON-LD per template** (generators only, never inline — inherited rule): every article template (guide/bridge/race article) → `Article` (+ `FAQPage` when `faqEntries` present) + `BreadcrumbList`; hubs/glossary/trust pages → `BreadcrumbList` + site-wide `Organization`/`WebSite` from BaseLayout. Glossary entries additionally get `DefinedTerm` via a new small `generateDefinedTerm()` generator (cheap, semantically correct; no rich-result dependency). Article `author` becomes a `Person` node from `AUTHOR_CONFIG` (E-E-A-T; replaces the old publisher-only pattern). All NOTE.md playbook rules stay binding: absolute URLs, `image` array with 1200×675 source, `inLanguage:'ja'`, `isPartOf`, publisher logo ImageObject.
- **Sitemap lastmod:** the `astro.config.mjs` frontmatter-scan map builder is generalized to a small pure function `buildLastmodMap()` (in `src/utils/` build scope) scanning **all four dated collections** with their URL prefixes: `guides→/guide/`, `bridge→/uma-musume/`, `race-articles→/races/<race>/` (race read from frontmatter), glossary→/glossary/ (uses `updatedDate` when present, else omitted — Google prefers omission to fake dates, inherited rule).
- **RSS:** `rss.xml.js` rebuilt over `guides` + `bridge` + `raceArticles` merged by `publishedDate` desc; title/site from `SITE_CONFIG`.
- **Meta rules:** title ≤24 display chars + `｜ウマノミカタ` suffix (全角｜), description front-loaded ≤70 chars, `max-image-preview:large` — enforced by BaseLayout props + schema max-lengths + publish checklist.

### D7 — Analytics (FR33/FR34, NFR15)

**Decision: Vercel Web Analytics** (platform-native, no new vendor, no package needed for a static Astro site — inject the beacon `<script defer src="/_vercel/insights/script.js">` in BaseLayout, enable in the Vercel project).

- Cookieless by design; identifiers are daily-rotating hashes — satisfies the privacy-light posture; **no cookie banner** (UX written rule).
- First-party endpoint (`/_vercel/insights/*`): CSP change is a single same-origin `connect-src 'self'` allowance (already present) + `script-src 'self'` (already present) — the cleanest possible CSP story; beacon is ~1–2KB, well under the 5KB budget.
- **Return-visitor rate** (a first-class PRD metric that cookieless tools cannot natively provide): a ~15-line first-party vanilla snippet in BaseLayout sets a `localStorage` marker and reports a custom event (`visitor_type: new|returning`) via `window.va('event', …)`. localStorage never leaves the browser except as this coarse label; documented on `/privacy/`.
- Ranking positions & organic sessions attribution: **Google Search Console** (site verified at launch via DNS record — no HTML-tag/script addition, keeping CSP and page weight untouched).
- Cadence adherence & subscriber counts: operator-tracked (provider dashboards + calendar), no site instrumentation.

### D8 — Newsletter / LINE / X Integration (FR19a, FR20, NFR13)

- **X:** plain links/buttons to the account (`SITE_CONFIG.socialLinks`) — no widgets, no embeds, ever (embeds destroy the JS budget).
- **LINE:** plain link to the official-account add-friend URL. No LINE SDK.
- **Newsletter: Buttondown** — chosen because it supports a **plain HTML `<form action="https://buttondown.com/api/emails/embed-subscribe/<user>" method="post">`** — zero JS, static-friendly, free tier adequate for MVP scale, English-admin friendly for the operator.
  - CSP: add `https://buttondown.com` to `form-action` in the same change (the only external endpoint the site gains).
  - Degradation (NFR13): the SubscribeBlock is a pure HTML form; on any failure the standing fallback link to the hosted Buttondown subscribe page renders beneath it. Success = provider redirect back to `/?subscribed=1`-style param rendered as inline confirmation by a tiny deferred vanilla script (progressive: without JS the provider's hosted confirmation shows instead).
  - Subscriber data lives only in Buttondown (NFR7); the privacy line under the form names the provider.
  - _Provider swap tolerance:_ SubscribeBlock isolates the endpoint in one component + one CSP entry; swapping providers later is a two-file change.

### D9 — Dependency Decisions (full delta)

| Change | Package | Rationale |
|---|---|---|
| Remove | `@formspree/react` | Contact flow retired (FR32) |
| Remove | `embla-carousel`, `embla-carousel-react`, `swiper` | No carousel exists in the new design (UX decision); duplicate-lib landmine resolved by deleting both |
| Keep | `astro`, `@astrojs/sitemap`, `@astrojs/rss`, `tailwindcss`, `@tailwindcss/vite`, `sharp` (transitive) | Foundation |
| Keep | `react`, `react-dom`, `@astrojs/react`, `@types/react*` | Phase-2 islands pre-contracted; zero runtime cost while unused |
| Keep (dev) | `playwright`, `vite` | Ad-hoc Lighthouse audits; build tooling |
| Add | — none — | The conversion adds **zero** new npm dependencies. Analytics is a platform beacon; newsletter is an HTML form. |

### D10 — Image & OGP Conventions

- Content images: `src/assets/images/articles/<collection>/<slug>/hero.webp` (Astro `<Image>`, sharp/webp pipeline) **and** the share-size original at `public/images/articles/<collection>/<slug>/share.webp` — the NOTE.md dual-location rule carried forward with new paths. Hero renders 800×450; OGP/JSON-LD uses the 1200×675 source (`sized()` pattern from `columns/[...slug].astro` is ported to the new article templates). Source images must be ≥1200px wide at creation time (the old site's under-sized-image debt is a lesson, not an inheritance).
- Every article template sets `og:image` 1200×675, `twitter:card summary_large_image`; hub/trust pages fall back to `SITE_CONFIG.defaultOgImage` (a branded 1200×675 template image).
- Bridge-article imagery: rights-cleared photos or commissioned illustration only; **no Cygames assets can enter the repo** (NFR12) — checked in the publish checklist, not tooling.
- LCP: hero `loading="eager" fetchpriority="high"`; all else lazy; explicit dimensions everywhere (inherited, unchanged).

### Decision Impact Analysis

**Implementation sequence (conversion order — each stage leaves `npm run build` green):**

1. **Identity & tokens:** rewrite `site.ts`/`theme.ts`/`navigation.ts`, new `@theme` palette in `global.css`, new `author.ts`/`compliance.ts`/`raceCalendar.ts`; placeholder brand values.
2. **Retirement pass (D5):** delete routes, collections, components, data modules, images, cms-auth, dependencies; prune `schema.ts`; clean `vercel.json` (redirect map out, CSP simplified, /admin pattern collapsed) and `astro.config.mjs` (admin filter out, lastmod map generalized to a stub). Site builds as an empty-but-branded shell (top page + 404 + trust-page stubs).
3. **Schema & routing pass (D1/D3):** new `content.config.ts`, `contentGraph.ts`, new route files with `getStaticPaths`, article/hub templates composed from re-skinned + new components, seeded with initial real content in the same PR.
4. **SEO & distribution pass (D6/D8):** JSON-LD wiring, sitemap lastmod map, RSS, OGP conventions, SubscribeBlock + CSP `form-action` entry.
5. **Ledger pass (D2):** predictions schema + `ledger.ts` + LedgerTable/LedgerKPIs, exercised against dry-run entries (no public route).
6. **Analytics & launch pass (D7):** beacon + visitor-type snippet, Search Console DNS verification, final domain/brand constants swap, Lighthouse verification across all 8 templates.

**Cross-component dependencies:** `SITE_CONFIG.siteUrl` feeds astro.config `site`, schema.ts absolute URLs, RSS, sitemap, and OGP — the domain swap at cutover is one constant. `compliance.ts` feeds Footer, NoticeFooter band, and the editorial checklist. `raceCalendar.ts` feeds RaceWeekModule and the races hub ordering. `glossary.shortGloss` feeds both the glossary entry page and any future tooltip-like surfacing — the gloss is written once.

## Implementation Patterns & Consistency Rules

_These rules exist to prevent AI agents from making divergent choices. They extend (and where marked, supersede) `_bmad-output/project-context.md`._

### Naming Patterns

**Content & routes:**

- Collection names: plural English camelCase in code (`raceArticles`), kebab-case directories (`src/content/race-articles/`).
- Content filenames = URL slugs: ASCII kebab-case romaji, e.g. `shutsubahyo-guide.md`, `special-week.md`, `fukusho.md`. Race article files: `<edition>-<type>.md` (`2026-preview.md`) inside `src/content/race-articles/<raceId>/`.
- Prediction files: `<YYYY>/<YYYY-MM-DD>-<race-slug>.json`.
- Frontmatter fields: camelCase; booleans `is*/has*` or bare adjectives per Zod schema above; dates ISO `YYYY-MM-DD` strings in frontmatter (coerced by Zod).
- Route params: `[slug]`, `[race]`, `[term]` — named for what they are, singular.

**Code:**

- Components PascalCase `.astro` (`GlossaryTerm.astro`, `RaceWeekModule.astro`); future islands PascalCase `.tsx`.
- Utils/config camelCase (`ledger.ts`, `raceCalendar.ts`, `contentGraph.ts`).
- Config exports: SCREAMING_SNAKE for singleton configs (`SITE_CONFIG`, `AUTHOR_CONFIG`, `COMPLIANCE`), functions camelCase.
- Token names: as defined in the UX spec palette (`--color-ink`, `--color-brand`, `--color-turf`, `--color-accent`, `--color-bridge`, `--color-paper`, `--color-paper-warm`, `--color-line`, `--color-win`, `--color-loss`, `--color-notice`, + `-tint` variants, `--font-sans`). Tailwind utilities derive from these (`bg-brand`, `text-ink-soft`). No other color names may be introduced without a token.

### Structure Patterns

- `src/components/` stays **flat** — no subfolders (inherited rule; at ~20 components flat remains navigable).
- Page templates are thin: route files in `src/pages/` fetch collections + compose components; **no layout markup lives in route files beyond composition**. Shared page anatomy lives in `BaseLayout.astro` (unchanged role) and template-level components.
- Tests (if a real E2E suite ever lands): `tests/` at repo root + `playwright.config.ts` at root — never inside `src/` (inherited rule).
- Build-time-only Node code: `astro.config.mjs` and `.mjs`/build-scope utils only — never in components/pages (inherited rule).
- No new top-level directories without an architecture amendment; the tree in Project Structure below is exhaustive.

### Format Patterns

- **Dates:** frontmatter ISO strings → `formatDate()` (`2026年11月29日`) for display, `<time datetime>` always. Ledger timestamps display as `M/D HH:mm` JST with `datetime` attribute in full ISO. **All ledger `*At` fields are stored as ISO 8601 with explicit `+09:00` offset** (races run in JST; ambiguity here would corrupt the pre-race proof).
- **Numbers:** ledger money via `formatPrice()`-style `toLocaleString('ja-JP')` with explicit `円`; percentages one decimal max with `％`; `tabular-nums` class on all ledger/KPI numerals.
- **JSON content files:** camelCase keys, UTF-8, no comments (JSON), 2-space indent — matching what Zod schemas expect.
- **Internal links in Markdown bodies:** root-relative with trailing slash (`[複勝](/glossary/fukusho/)`) — never absolute (breaks preview), never extension-suffixed.

### Content Authoring Patterns (the pipeline contract)

- **GlossaryTerm authoring rule:** in Markdown bodies, a glossary link is a plain link to `/glossary/<term>/`; the **first occurrence** in an article must be immediately followed by the written parenthetical gloss in the sentence (「複勝（3着以内に入れば当たりの買い方）」style — the gloss text should match `glossary.shortGloss`). The `GlossaryTerm.astro` component styling (dotted underline) is applied by a rehype step: `rehypeGlossaryLinks.mjs` adds `class="glossary-term"` to any anchor whose href starts with `/glossary/` (replaces the old `rehypeArticleImages`-style transform pattern — same mechanism, new concern). Never place glossary links inside headings.
- **ContinuationBlock routing is frontmatter, not prose:** primary next step derives from template variant + frontmatter (`seriesOrder`→next in series; `relatedRace`→race hub; bridge→race-card guide constant). Agents never hand-author "related articles" HTML in content bodies.
- **Data-boundary rule for agents (NFR8):** no Markdown tables of race results/odds/times may be authored in any content body; race facts appear as prose sentences. The only `<table>` in the product is the LedgerTable component. A content PR containing a results-style Markdown table is a review-blocking violation.
- **Compliance wording:** UI copy and content must not contain any term in `COMPLIANCE.bannedWords`; notices are rendered by components from `compliance.ts`, never retyped inline.
- **Trilingual convention (inherited, unchanged):** code comments Vietnamese; user-facing strings Japanese; docs/commits English.

### Process Patterns

- **Error handling:** build-time errors are the error model. Formatters and `contentGraph.ts` throw loudly; never try/catch around content validation (let the build fail and name the file). Runtime has almost no code to fail; the newsletter form's failure path is the rendered fallback link (no JS error UI).
- **Loading states:** none exist (nothing loads asynchronously). Do not introduce spinners/skeletons anywhere.
- **Vanilla scripts:** inline `<script>` in `.astro`, progressive (page fully functional if script never runs), no modules imported into client scripts, no event-library. Current inventory after conversion: mobile menu toggle, optional subscribe-confirmation param reader, analytics beacon + visitor-type snippet. Anything beyond this list requires justification against NFR3 in the PR description.
- **Git/deploy:** trunk-based on `main`, conventional commits (`feat:`, `fix:`, `perf:`, `content:` for pure content additions, `ledger:` per D2), Vercel auto-deploy from `main`; rollback = `git revert` (NFR19). Never commit `dist/`, `node_modules/`, `test-results/`.
- **CSP change protocol (NFR5/NFR6):** any PR introducing an external request URL must modify `vercel.json` CSP in the same PR, and the PR description must name the directive changed. Post-conversion CSP baseline: `default-src 'self'`; `script-src 'self' 'unsafe-inline'`; `style-src 'self' 'unsafe-inline'`; `img-src 'self' data:`; `connect-src 'self'`; `form-action 'self' https://buttondown.com`; `object-src 'none'`; `base-uri 'self'`; single `/(.*)` scope (no admin exemption).

### Enforcement Guidelines

**All AI agents MUST:**

- Run `npm run build` before declaring any change done — it is the only gate (NFR17).
- Add/modify content only through the Zod schemas; never loosen a schema to make content pass without flagging it (inherited rule).
- Respect the ledger lifecycle: never edit `picks`/`reasoning`/`entryPostedAt` after the entry commit; never edit `result` after the result commit; only append `annotations`.
- Keep every hex color in `@theme`; every brand/name/URL in `src/config/`; every JSON-LD object in `schema.ts` generators.
- Add a `vercel.json` 301 in the same change when renaming/removing any published route.
- Justify any new client JS, island, webfont, or eager image against NFR1–NFR3 in the commit/PR text.

**Pattern violations** are recorded in the story file's change log during implementation and corrected before story completion; recurring pipeline-side frontmatter failures are fixed in seo-cockpit, not per-article (NFR14).

### Pattern Examples

**Good — new guide article frontmatter:**

```yaml
---
title: '出馬表の読み方'
description: '出馬表の見方を初心者向けに解説。枠番・馬番・斤量など、レース前に読み取れる情報を順番に整理します。'
publishedDate: 2026-10-03
image: '/images/articles/guides/shutsubahyo-guide/hero.webp'
imageAlt: '出馬表の各項目をハイライトした解説図'
series: 'keiba-basics'
seriesOrder: 2
relatedTerms: ['wakuban', 'kinryo', 'umaban']
relatedRace: 'tenno-sho-autumn'
---
```

**Anti-patterns (reject on sight):** inline JSON-LD in a page; a Markdown table of finishing times; `<div style="color:#16324F">`; a React island for an accordion; `client:load`; editing a recorded prediction's `picks`; a new fetch URL without a CSP diff; Japanese characters in a new URL slug; `@apply`; re-adding a webfont or carousel; hand-written "related articles" lists in content bodies.

## Project Structure & Boundaries

### Complete Project Directory Structure (post-conversion)

```
racing-horse/
├── package.json                      # name: umanomikata; deps per D9 (no formspree/embla/swiper)
├── astro.config.mjs                  # site from SITE_CONFIG; sitemap serialize() ← buildLastmodMap(); rehypeGlossaryLinks
├── tsconfig.json                     # strict + @config/* alias (unchanged)
├── vercel.json                       # headers + minimal CSP + apex→www redirect only (D3)
├── NOTE.md                           # SEO playbook (kept, binding; update examples to new routes)
├── .gitignore
├── docs/                             # operator docs only (publish checklist, fallback-mode doc live here)
│   ├── publish-checklist.md          # FR30 — created during implementation
│   └── operations.md                 # weekly loop + fallback mode (FR29/NFR18)
├── public/
│   ├── favicon.svg                   # new brand favicon set
│   └── images/
│       ├── brand/                    # logo, default OGP template image (1200×675)
│       └── articles/<collection>/<slug>/share.webp   # 1200×675 OGP originals (D10 dual-location)
├── src/
│   ├── content.config.ts             # THE schema file: guides/glossary/bridge/races/raceArticles/predictions (D1, D2)
│   ├── assets/
│   │   └── images/
│   │       ├── brand/                # logo sources for Astro <Image>
│   │       ├── articles/<collection>/<slug>/hero.webp  # ≥1200px sources (D10)
│   │       └── horses/<slug>/        # bridge imagery (rights-cleared only)
│   ├── content/
│   │   ├── guides/*.md
│   │   ├── glossary/*.md
│   │   ├── bridge/*.md
│   │   ├── races/*.json              # one hub file per covered race
│   │   ├── race-articles/<raceId>/<edition>-<type>.md
│   │   └── predictions/<year>/*.json # ledger (MVP: private data, no route)
│   ├── config/
│   │   ├── site.ts                   # SITE_CONFIG (rewritten, D4)
│   │   ├── navigation.ts             # pillars + footer (rewritten)
│   │   ├── theme.ts                  # new tokens mirror
│   │   ├── author.ts                 # NEW — AUTHOR_CONFIG
│   │   ├── raceCalendar.ts           # NEW — graded-race calendar + getRaceWeek()
│   │   └── compliance.ts             # NEW — notices, banned words, disclosure links
│   ├── styles/
│   │   └── global.css                # @theme new palette; JP helpers kept; .glossary-term style; .article-numbered kept
│   ├── layouts/
│   │   └── BaseLayout.astro          # head/meta/OGP/JSON-LD(Org+WebSite)/skip-link/Header/Footer/analytics beacon
│   ├── components/                   # FLAT — retained(re-skinned) + new
│   │   ├── Header.astro              # kept: 56px sticky, logo + pillar links / hamburger
│   │   ├── MobileMenu.astro          # kept: vanilla toggle, focus-trapped
│   │   ├── Footer.astro              # kept: new IA columns + standing compliance notice
│   │   ├── Breadcrumb.astro          # kept: + BreadcrumbList JSON-LD
│   │   ├── Pagination.astro          # kept (unused until a hub needs it)
│   │   ├── FAQAccordion.astro        # kept: <details> pattern for guide FAQs
│   │   ├── ArticleListRow.astro      # from BlogCard: SmartNews-density row
│   │   ├── ArticleCard.astro         # featured card variant
│   │   ├── SubscribeBlock.astro      # from CTABlock pattern: Buttondown form + fallback (D8)
│   │   ├── ContinuationBlock.astro   # NEW — universal next-step router (variants: guide/bridge/deep-dive/prediction)
│   │   ├── GlossaryTerm.astro        # NEW — styling contract for .glossary-term links (used by rehype output)
│   │   ├── SeriesNav.astro           # NEW — 第n回／全N回 marker + prev/next
│   │   ├── AuthorByline.astro        # NEW — compact byline (avatar/name/dates/AI-disclosure link)
│   │   ├── AuthorCard.astro          # NEW — article-end card → /about/, /editorial-policy/
│   │   ├── RaceWeekModule.astro      # NEW — 今週の重賞 card ← raceCalendar.ts (off-week: next upcoming)
│   │   ├── BeginnerOnrampBox.astro   # NEW — 競馬、はじめてですか？ box
│   │   ├── KeyFactsBox.astro         # NEW — deep-dive standfirst facts (dl, prose values); `summary` variant = guide-end 「この記事でわかったこと」 recap (UX "SummaryBox")
│   │   ├── TableOfContents.astro     # NEW — <details> 目次 + xl: margin variant
│   │   ├── NoticeFooter.astro        # NEW — in-content compliance band ← compliance.ts
│   │   ├── HorseStoryCard.astro      # NEW — bridge-hub CSS-scroll story cards
│   │   ├── LedgerTable.astro         # NEW — record table (full / recent-5 variants) ← ledger.ts
│   │   └── LedgerKPIs.astro          # NEW — hit rate / 回収率 / entry count strip
│   ├── pages/
│   │   ├── index.astro               # Top: header→chips→RaceWeekModule→OnrampBox→featured hero→latest rows
│   │   ├── guide/
│   │   │   ├── index.astro           # beginner hub (curated learning paths)
│   │   │   └── [slug].astro          # guide article template
│   │   ├── uma-musume/
│   │   │   ├── index.astro           # bridge hub (HorseStoryCard rows)
│   │   │   └── [slug].astro          # bridge article template
│   │   ├── races/
│   │   │   ├── index.astro           # magazine hub (calendar-organized ← raceCalendar + races)
│   │   │   └── [race]/
│   │   │       ├── index.astro       # race hub (evergreen; accumulates raceArticles by edition)
│   │   │       └── [slug].astro      # deep-dive/preview/recap template
│   │   ├── glossary/
│   │   │   ├── index.astro           # 五十音 + theme-grouped index
│   │   │   └── [term].astro          # glossary entry (+ DefinedTerm JSON-LD)
│   │   ├── about.astro               # author + mission (trust template)
│   │   ├── editorial-policy.astro    # policy + AI disclosure (trust template)
│   │   ├── responsible-gambling.astro# canonical notice page (trust template)
│   │   ├── privacy.astro             # rewritten: analytics + newsletter disclosure
│   │   ├── 404.astro                 # styled recovery: OnrampBox + pillar links
│   │   └── rss.xml.js                # merged article feed
│   │   └── (Phase 2 only, not in MVP): yosou/index.astro, yosou/record.astro,
│   │       yosou/about.astro, yosou/[slug].astro
│   ├── utils/
│   │   ├── formatters.ts             # kept: formatDate/formatPrice (ja-JP)
│   │   ├── schema.ts                 # pruned + generateDefinedTerm + Person author (D5/D6)
│   │   ├── imageImports.ts           # kept: resolveImage() glob over src/assets/images/**
│   │   ├── rehypeGlossaryLinks.mjs   # NEW — tags /glossary/ links with .glossary-term
│   │   ├── contentGraph.ts           # NEW — cross-collection reference assertions (D1)
│   │   ├── ledger.ts                 # NEW — build-time hit-rate/ROI aggregation (D2)
│   │   └── lastmod.mjs               # NEW — buildLastmodMap() for astro.config sitemap serialize
│   └── (deleted: src/data/, src/content/config.ts, src/pages/{admin,columns,services,case,voice,company,[category]}, cms-auth/)
└── tests/                            # reserved for future Playwright suite (empty in MVP)
```

### Architectural Boundaries

- **Content boundary:** components never fetch or import content directly; route files (`getStaticPaths`/page frontmatter) read collections via `astro:content` and pass typed props (`CollectionEntry<'guides'>` etc.) down. Islands (Phase 2) receive plain serializable props only.
- **Config boundary:** identity, navigation, calendar, compliance text flow only from `@config/*`; components take them as imports (config modules are the one exception to "no direct imports in components" — they are constants, not content).
- **Build/runtime boundary:** Node APIs and `.mjs` utils exist only in build scope (`astro.config.mjs`, rehype plugins, `lastmod.mjs`); zero server code, zero API routes, zero middleware.
- **External boundary (complete list of external touchpoints):** Buttondown form POST (`form-action`), Vercel Analytics beacon (first-party path), X/LINE outbound links, Google Search Console via DNS. Nothing else may call out without a CSP amendment PR.
- **Data boundary (legal):** the only structured race data in the repo is `raceCalendar.ts` (hand-typed public calendar facts) and `races/*.json` hub prose — no feeds, no scraped tables, no odds. The ledger stores only the operator's own picks and publicly announced payouts.

### Requirements to Structure Mapping

| FR cluster | Lives in |
|---|---|
| FR1 guides | `content/guides/` + `pages/guide/` + SeriesNav/FAQAccordion/ContinuationBlock |
| FR2 glossary | `content/glossary/` + `pages/glossary/` + `rehypeGlossaryLinks.mjs` + GlossaryTerm |
| FR3 bridge | `content/bridge/` + `pages/uma-musume/` + HorseStoryCard |
| FR4–FR5 magazine/hubs | `content/races/` + `content/race-articles/` + `pages/races/**` + KeyFactsBox + RaceWeekModule |
| FR6–FR7 navigation/linking | `config/navigation.ts` + Header/Footer/Breadcrumb + ContinuationBlock + `contentGraph.ts` |
| FR8–FR12 trust/compliance | `about/editorial-policy/responsible-gambling` pages + `config/{author,compliance}.ts` + AuthorByline/AuthorCard/NoticeFooter |
| FR13–FR18 ledger | `content/predictions/` + `utils/ledger.ts` + LedgerTable/LedgerKPIs (+ Phase-2 `pages/yosou/`) |
| FR19–FR22 distribution | SubscribeBlock + `rss.xml.js` + OGP conventions in article templates + `SITE_CONFIG.socialLinks` |
| FR23–FR26 SEO | `utils/schema.ts` + `utils/lastmod.mjs` + BaseLayout meta + `vercel.json` 301 discipline |
| FR27–FR30 ops | seo-cockpit (external) + Zod schemas + `docs/publish-checklist.md` + `docs/operations.md` |
| FR31–FR32 identity/migration | `config/site.ts` + retirement pass D5 + `vercel.json` cleanup |
| FR33–FR34 analytics | BaseLayout beacon + visitor-type snippet + Search Console (external) |

### Integration Points & Data Flow

git push → Vercel build: content collections + config → Zod validation → `getStaticPaths` route generation (+ `contentGraph` assertions) → templates compose components → sharp image pipeline → JSON-LD/OGP/meta from `schema.ts`+`SITE_CONFIG` → sitemap (lastmod map) + RSS → static output on Vercel CDN with `vercel.json` headers. Reader-side runtime consists of: HTML/CSS, the menu toggle script, the analytics beacon, and one form POST. There is no other data flow.

### Development Workflow Integration

- `npm run dev` for iteration (remember: dev skips full validation); `npm run build` before completion — the gate; `npm run preview` for built-output smoke tests (headers/redirects verify only on Vercel previews).
- Weekly cadence maps to git: content commits (`content:`), ledger commits (`ledger:`) per D2 lifecycle, each push rebuilds — which also refreshes `RaceWeekModule` (correct-by-cadence).
- Lighthouse spot-check via installed Playwright on template-affecting changes; publish checklist (`docs/publish-checklist.md`) per release covers rich-results test, OGP render in X/LINE, heading/alt audit.

## Architecture Validation Results

### Coherence Validation ✅

- **Decision compatibility:** all decisions sit inside the static/zero-JS posture — no decision introduces a server, a database, a client framework dependency, or a webfont. The two runtime additions (analytics beacon, form POST) are the minimum implementations of their FRs and both respect CSP/performance budgets. Versions are pinned by the working lockfile; no version risk.
- **Pattern consistency:** naming/format/authoring patterns extend the proven project-context.md conventions; new patterns (ledger lifecycle, glossary-link rehype, ASCII slugs) conflict with nothing inherited. The UX spec's component inventory maps 1:1 onto the component tree.
- **Structure alignment:** the tree implements the UX IA exactly (5 pillars, 8 templates); Phase-2 routes are pre-designed but absent from MVP builds, matching the "no coming-soon pages" rule.

### Requirements Coverage Validation ✅

- **FR coverage:** all 35 FR items (FR1–FR34, with FR19 split into FR19a/FR19b) mapped to concrete locations (table above). Phase-2 FRs (FR16–FR18) have their data model, components, and routes fully designed; only route files are withheld.
- **NFR coverage:** NFR1–4 (budget: zero islands, system fonts, image rules, beacon <5KB); NFR5–7 (static, CSP protocol, provider-held subscriber data); NFR8–12 (data-boundary authoring rule, ledger lifecycle, compliance config, IP-safe imagery rule); NFR13–15 (HTML-form degradation, pipeline frontmatter contract, cookieless analytics); NFR16–19 (correct-by-cadence design, build gate, documented fallback in `docs/operations.md`, git-revert recovery).
- **Journeys:** J1 (guided reading loop: rehype gloss + ContinuationBlock + SeriesNav), J2 (ledger model + trust furniture), J3 (race hubs + SubscribeBlock + OGP), J4 (schemas-as-guardrails + weekly git loop) — all architecturally supported.

### Implementation Readiness Validation ✅

- Decisions carry concrete versions, file paths, schema code, and CSP baselines; patterns include positive and negative examples; the tree is exhaustive (agents should not create files outside it without amendment).
- The conversion is sequenced into six build-green stages, each independently verifiable by `npm run build`.

### Gap Analysis Results

**Critical gaps:** none.

**Important (external to architecture, tracked in PRD Open Decisions — placeholders architected so none blocks implementation start):**
1. Final brand name + domain (OD3) — one-constant swap in `site.ts`; stage 6 dependency only.
2. Author persona (OD1) — `author.ts` placeholder; blocks content publishing, not code.
3. Prediction data sources & weekly time cost (OD4) — affects `predictions` content, not its schema.

**Nice-to-have (deliberately deferred):** automated link checking (contentGraph covers frontmatter refs; body links rely on review), OGP-image generation automation, real E2E suite (`tests/` reserved), client-side glossary search.

### Architecture Completeness Checklist

**Requirements Analysis**
- [x] Project context thoroughly analyzed
- [x] Scale and complexity assessed
- [x] Technical constraints identified
- [x] Cross-cutting concerns mapped

**Architectural Decisions**
- [x] Critical decisions documented with versions
- [x] Technology stack fully specified
- [x] Integration patterns defined
- [x] Performance considerations addressed

**Implementation Patterns**
- [x] Naming conventions established
- [x] Structure patterns defined
- [x] Communication patterns specified
- [x] Process patterns documented

**Project Structure**
- [x] Complete directory structure defined
- [x] Component boundaries established
- [x] Integration points mapped
- [x] Requirements to structure mapping complete

### Architecture Readiness Assessment

**Overall Status:** READY FOR IMPLEMENTATION

**Confidence Level:** high — the technical layer is a conversion of a proven codebase with explicit retirement/keep/new scoping; the genuinely novel parts (ledger lifecycle, glossary rehype, redirect strategy) are specified to the field level.

**Key strengths:** zero new dependencies; ledger immutability achieved with git + schema conventions instead of infrastructure; the pivot's identity concentrated in `src/config/` so pending brand decisions don't block engineering; every FR traceable to a file path.

**Areas for future enhancement:** automated content-link checking; OGP template automation; Playwright regression suite when Phase-2 islands raise the interaction surface; ledger-page OGP with live KPI numbers (Phase 2 polish).

### Implementation Handoff

**AI Agent Guidelines:** follow this document + `project-context.md` (this document supersedes its star-light-specific rules); run `npm run build` as the gate for every change; respect the ledger lifecycle and CSP protocol absolutely; keep all identity in config, all colors in tokens, all JSON-LD in generators.

**First implementation priority:** Stage 1–2 of the Implementation Sequence — identity/token rewrite followed by the full retirement pass (D5), landing as the conversion's first epic. No scaffolding command exists; the work begins by editing this repository on a feature branch.
