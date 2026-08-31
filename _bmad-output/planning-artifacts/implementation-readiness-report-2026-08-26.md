---
stepsCompleted: ['step-01-document-discovery', 'step-02-prd-analysis', 'step-03-epic-coverage-validation', 'step-04-ux-alignment', 'step-05-epic-quality-review', 'step-06-final-assessment']
documentsIncluded:
  prd: '_bmad-output/planning-artifacts/prd.md'
  prdValidationReport: '_bmad-output/planning-artifacts/prd-validation-report.md'
  architecture: '_bmad-output/planning-artifacts/architecture.md'
  epics: '_bmad-output/planning-artifacts/epics.md'
  ux: '_bmad-output/planning-artifacts/ux-design-specification.md'
  supporting:
    - '_bmad-output/planning-artifacts/product-brief-racing-horse-distillate.md'
    - '_bmad-output/planning-artifacts/product-brief-racing-horse.md'
    - '_bmad-output/project-context.md'
excluded:
  - '_bmad-output/planning-artifacts/archive-star-light/ (retired star-light product)'
  - '_bmad-output/implementation-artifacts/ (old-product implementation; superseded by upcoming sprint plan)'
---

# Implementation Readiness Assessment Report

**Date:** 2026-08-26
**Project:** racing-horse (post-pivot planning cycle)

## Document Inventory

**PRD Documents (whole):**
- prd.md (34,149 bytes, modified 2026-08-26 00:04) — SELECTED
- prd-validation-report.md (37,013 bytes, 2026-08-26 00:04) — supporting validation evidence with Resolution Log

**Architecture Documents (whole):**
- architecture.md (60,944 bytes, modified 2026-08-26 00:27) — SELECTED

**Epics & Stories Documents (whole):**
- epics.md (72,833 bytes, modified 2026-08-26 00:36) — SELECTED

**UX Design Documents (whole):**
- ux-design-specification.md (73,769 bytes, modified 2026-08-26 00:19) — SELECTED
- ux-design-directions.html / ux-color-themes.html — supporting visual explorations

**Supporting Context:**
- product-brief-racing-horse-distillate.md, product-brief-racing-horse.md
- ../project-context.md (62 implementation rules)

**Duplicates:** None. No sharded versions exist for any selected document.

**Excluded (deliberate):** `archive-star-light/` (whole prior-product planning set, archived) and `_bmad-output/implementation-artifacts/` (retired product; a new sprint plan will supersede sprint-status.yaml). These are not duplicates of the current documents.

**Missing Documents:** None — all four required document types present as single whole files.

## PRD Analysis

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

Total FRs: 35 (FR1–FR34; FR19 split into FR19a/FR19b). Of these, 3 are Phase-2 contracted (FR16–FR18); 32 are MVP-scope.

### Non-Functional Requirements

**Performance**
- NFR1: Mobile Lighthouse Performance ≥99 on every page type (article, hub, glossary, top) at every release; verified before deploy whenever hero, layout, fonts, images, or islands change.
- NFR2: Core Web Vitals on real mobile devices: LCP <1.5s, CLS <0.02, INP <200ms on a mid-range Android over 4G.
- NFR3: Content pages ship zero client-side JS by default; any island must use `client:visible` and be justified against the performance budget in its PR/commit.
- NFR4: All images are delivered in a size- and format-optimized form that holds the NFR1/NFR2 budgets, with explicit dimensions (CLS ≈ 0); only the LCP hero loads eagerly.

**Security**
- NFR5: The site remains fully static — no server endpoints, no secrets in repo or client code; only external runtime calls are newsletter/LINE signup and analytics endpoints, each allowlisted in CSP in the same change that introduces it.
- NFR6: Security headers (HSTS, X-Frame-Options, strict CSP) are never weakened; header config reviewed whenever `vercel.json` changes.
- NFR7: Subscriber data (newsletter/LINE) lives only in the chosen provider — the site never stores personal data itself.

**Compliance & Content Integrity**
- NFR8: 100% of published pages pass the data-boundary rule (prose facts and hand-curated history only; no bulk results tables, no scraped or licensed-feed data) — checked in the publish checklist.
- NFR9: 100% of prediction/betting-related pages carry the responsible-gambling + under-20 notice and contain no profitability claims (景品表示法-safe wording list maintained in the editorial policy).
- NFR10: Ledger integrity: prediction entries are timestamped before race start and never edited or deleted after results are recorded; corrections append, never overwrite.
- NFR11: Every AI-assisted article records that a human review pass (fact-check + Japanese QA) occurred before publish; the AI-assistance disclosure stays accurate to the actual process.
- NFR12: Uma Musume bridge content uses only factual real-horse information — no game assets, character names in titles kept within nominative fair-use framing, re-checked against Cygames guidelines quarterly.

**Integration**
- NFR13: Newsletter/LINE provider integration must work under the strict CSP, add no render-blocking scripts, and degrade gracefully (a failed signup widget never breaks the page).
- NFR14: ≥90% of AI-pipeline article drafts pass content validation (required metadata, title/description length rules) without manual per-file fixes; recurring validation failures corrected at the pipeline level.
- NFR15: Analytics collection is cookieless/privacy-light, CSP-compatible, and adds <5KB to page weight.

**Operability (Solo Operator)**
- NFR16: The weekly race-cadence loop fits within the declared weekly hour budget of 10 hours/week (working assumption; Open Decision 2 confirms or revises); if a step routinely pushes the loop over budget, the workflow — not the operator — is adjusted.
- NFR17: `npm run build` remains the single quality gate: TS strict + Zod violations block publish; a failed build can never partially deploy.
- NFR18: The fallback mode is documented and executable: reduced race-week output (deep-dive only) without breaking site integrity, cadence promises, or ledger continuity.
- NFR19: Content publishing requires no infrastructure beyond git push → Vercel build; recovery from any bad deploy is a git revert.

Total NFRs: 19

### Additional Requirements

- **Pre-MVP gates (constraints before build):** (1) brand/domain validation — J-PlatPat trademark, domain + SNS handles; (2) keyword-gap research driving the launch article list.
- **Explicit out-of-scope (all phases):** live odds, real-time results, horse/jockey databases, paid tips, JRA-VAN/JRADB data redistribution, betting-account handling, Uma Musume game assets.
- **Phase-2 contracting policy:** public ledger pre-contracted (FR16–FR18); all other Growth items (interactive tools, affiliate, creator partnerships, video) require a PRD amendment before implementation; affiliate trigger carries a mandatory ステマ規制 disclosure requirement.
- **Browser/device matrix:** Mobile Safari iOS 16+ and Android Chrome priority 1 (375px baseline); desktop evergreen browsers priority 2 (1240px+); X/LINE in-app browsers must render correctly (OGP testing).
- **Accessibility:** pragmatic WCAG 2.1 AA via component conventions and publish checklist; no formal audit in MVP.
- **Open Decisions 1–4 (tracked, deliberate):** author persona/JP-QA ownership; launch date + hour budget confirmation; final brand name + domain; prediction pipeline inputs. Each is mapped to affected FRs/NFRs with placeholder strategies. Resolved: Decap CMS dropped (FR32).

### PRD Completeness Assessment

The PRD is complete and internally consistent: every FR traces to a user journey or strategic pillar; NFRs are measurable (numeric budgets where applicable); phasing is explicit with trigger-gated Phase 2 and a contracting policy that prevents scope ambiguity; a separate prd-validation-report.md with a Resolution Log documents prior validation and corrections. Open Decisions are explicitly tracked with owner impact (FR/NFR references) rather than latent gaps. Clarity is high — requirements use testable "can/does" phrasing and MVP/Phase-2 tags are unambiguous.

## Epic Coverage Validation

### Requirements Inventory Fidelity

The epics document reproduces the PRD's FR and NFR lists **verbatim** (all 35 FRs incl. the FR19a/19b split; all 19 NFRs incl. NFR16's 10 h/week figure). No drift, no paraphrase-induced scope change, no FRs present in epics that are absent from the PRD. The epics additionally inventory 19 architecture requirements (AR1–AR19) and 15 UX design requirements (UX-DR1–UX-DR15) — traceability beyond the minimum.

### Coverage Matrix

| FR | Requirement (abbrev.) | Epic Coverage | Status |
|---|---|---|---|
| FR1 | Beginner guides readable without registration | Epic 2 (Stories 2.3, 2.4) | ✓ Covered |
| FR2 | Glossary + inline jargon decode | Epic 2 (Stories 2.1, 2.2) | ✓ Covered |
| FR3 | Uma Musume bridge articles → guides/races | Epic 3 (Story 3.3) | ✓ Covered |
| FR4 | G1 deep-dives on the JRA calendar | Epic 3 (Stories 3.1, 3.2) | ✓ Covered |
| FR5 | Per-race hub pages accumulating across years | Epic 3 (Story 3.1) | ✓ Covered |
| FR6 | Pillar navigation from every page | Epic 1 (1.4 shell) + Epics 2–3 (2.4, 3.1, 3.4 chips) | ✓ Covered |
| FR7 | Related-content discovery from any article | Epics 2–3 (2.3 ContinuationBlock, 3.4 latest rows) | ✓ Covered |
| FR8 | Author profile + editorial policy | Epic 4 (Story 4.1) | ✓ Covered |
| FR9 | AI-assistance disclosure | Epic 4 (Story 4.1) | ✓ Covered |
| FR10 | RG/under-20 notices on betting-adjacent pages | Epic 1 (1.4 footer) + Epic 4 (4.2 band) + Epic 8 (prediction pages) | ✓ Covered |
| FR11 | Data-boundary rule verifiable per article | Epic 4 (4.3 checklist) + Epic 3 (3.2 review-blocking AC) | ✓ Covered |
| FR12 | No profitability claims, 景表法-safe wording | Epic 4 (Story 4.2 compliance.ts + check method) | ✓ Covered |
| FR13 | Pre-race timestamped prediction entry (private) | Epic 6 (Stories 6.1, 6.3) | ✓ Covered |
| FR14 | Immutable result recording | Epic 6 (Stories 6.1, 6.2, 6.3) | ✓ Covered |
| FR15 | Private hit-rate/ROI view | Epic 6 (Story 6.2) | ✓ Covered |
| FR16 | Public ledger *(Phase 2)* | Epic 8 (Story 8.2) — trigger-gated | ✓ Covered (gated) |
| FR17 | Methodology page *(Phase 2)* | Epic 8 (Story 8.1) — trigger-gated | ✓ Covered (gated) |
| FR18 | Weekly prediction articles *(Phase 2)* | Epic 8 (Story 8.3) — trigger-gated | ✓ Covered (gated) |
| FR19a | X follow touchpoints | Epic 5 (Story 5.4) | ✓ Covered |
| FR19b | X-thread repurposing per deep-dive | Epic 4 (Story 4.3 operations doc) | ✓ Covered |
| FR20 | Newsletter/LINE subscription | Epic 5 (Story 5.4) | ✓ Covered |
| FR21 | RSS feed | Epic 5 (Story 5.2) | ✓ Covered |
| FR22 | OGP previews on X/LINE incl. in-app | Epic 5 (Story 5.3) | ✓ Covered |
| FR23 | Complete structured data / rich results | Epic 5 (Story 5.1) | ✓ Covered |
| FR24 | Sitemap with real lastmod | Epic 5 (Story 5.2) | ✓ Covered |
| FR25 | URL stability + 301 discipline | Epic 1 (1.3 old-map removal) + Epic 5 (5.2 discipline) | ✓ Covered |
| FR26 | Keyword-committed launch article set | Epics 2–3 (seeded content) + Epic 7 (7.3 launch audit) | ✓ Covered |
| FR27 | AI pipeline + mandatory human review | Epic 4 (Story 4.3) | ✓ Covered |
| FR28 | Automatic metadata enforcement | Epic 2 (Story 2.1 Zod schemas) | ✓ Covered |
| FR29 | Weekly cadence workflow + fallback mode | Epic 4 (4.3 docs) + Epic 6 (6.3 rehearsal) | ✓ Covered |
| FR30 | Repeatable publish checklist | Epic 4 (4.3) + Epic 7 (7.3 execution) | ✓ Covered |
| FR31 | New brand everywhere, zero remnants | Epic 1 (1.1, 1.4) + Epic 7 (7.3 final swap) | ✓ Covered |
| FR32 | Retirement of home-services + CMS surface | Epic 1 (Stories 1.2, 1.3) | ✓ Covered |
| FR33 | Success-metric measurement | Epic 7 (Stories 7.1, 7.2) | ✓ Covered |
| FR34 | Privacy-light measurement posture | Epic 7 (Story 7.1) | ✓ Covered |

### Missing Requirements

None. Every PRD FR has a traceable epic and story home. No orphan FRs exist in the epics that are absent from the PRD. The three Phase-2 FRs (FR16–FR18) are correctly quarantined in Epic 8 with an explicit DO-NOT-SCHEDULE gate matching the PRD's trigger-gated contracting policy.

### Coverage Statistics

- Total PRD FRs: 35 (32 MVP + 3 Phase-2 contracted)
- FRs covered in epics: 35
- Coverage percentage: **100%** (MVP FRs in Epics 1–7; Phase-2 FRs in gated Epic 8)
- NFR traceability: all 19 NFRs are referenced from story ACs or story rationale lines (spot-verified: NFR6→1.3, NFR8/14/16/18→4.3, NFR10→6.1/8.2, NFR13→5.4, NFR15→7.1, NFR1/NFR2→7.3, NFR17 enforced as the per-story "build green" AC pattern)

## UX Alignment Assessment

### UX Document Status

**Found:** `ux-design-specification.md` (complete, 14/14 workflow steps, completed 2026-08-26), plus supporting visual explorations (`ux-design-directions.html`, `ux-color-themes.html`). The UX spec explicitly consumed the PRD, both product briefs, and project-context.md as inputs; the architecture in turn consumed the UX spec. The dependency chain PRD → UX → Architecture → Epics is intact and each document's frontmatter confirms its inputs.

### UX ↔ PRD Alignment

- All four PRD user journeys (Yui/Kenta/Aoi/Operator) are designed as concrete screen-level flows with mermaid diagrams; each journey's PRD "reveals requirements for" list is addressed (bridge format, inline glossary, ledger presentation, hub/newsletter/X patterns, operator guardrails).
- Every reader-facing FR has a UX surface: FR1–FR7 (templates, GlossaryTerm, ContinuationBlock, hubs, pillar chips), FR8–FR12 (trust furniture, NoticeFooter, banned-wording pattern), FR13–FR18 (LedgerTable/LedgerKPIs designed NOW for Phase-2 unveiling — matching the PRD's dry-run strategy), FR19–FR22 (SubscribeBlock, OGP conventions), FR31 (token palette, brand direction).
- PRD constraints honored structurally: no registration/payment walls, no cookie banner, zero-JS default, JP system fonts, 375px baseline, in-app browsers first-class, pragmatic WCAG 2.1 AA (matching PRD's declared level), performance budget treated as a hard constraint on every pattern.
- UX additions beyond PRD (visited-link styling, ToC, series markers, D2/D4/D5 design direction synthesis, no-search decision) are design elaborations, not scope expansions; the no-search-in-MVP decision is consistent with the PRD's ~20-article corpus.

### UX ↔ Architecture Alignment

- Component inventory maps essentially 1:1: every UX custom component (GlossaryTerm, ContinuationBlock, SeriesNav, AuthorByline/Card, RaceWeekModule, BeginnerOnrampBox, KeyFactsBox, TableOfContents, NoticeFooter, SubscribeBlock, ArticleListRow/Card, HorseStoryCard, LedgerTable, LedgerKPIs) exists in the architecture's post-conversion tree; retire lists are identical (19 components + ServiceSlider + both carousel libs).
- The IA site map (8 templates, 5 pillars, /yosou/ absent in MVP) is implemented exactly by the architecture's route tree; the zero-JS glossary interaction is realized as the rehypeGlossaryLinks build-time mechanism; the ledger's record-book design is realized as the D2 append-only JSON model + build-time aggregation.
- Performance posture is enforced by architecture decisions (zero new dependencies, no islands in MVP, HTML-form newsletter, first-party analytics beacon <5KB) — the UX budget is architecturally guaranteed, not aspirational.

### Alignment Issues (all LOW severity — none blocks implementation)

1. **`seriesTotal` drift (LOW):** UX spec (SeriesNav anatomy) says data comes from frontmatter "(`series`, `seriesOrder`, `seriesTotal`)", while Architecture D1 and Epics Story 2.3 explicitly derive `seriesTotal` at build time and forbid storing it. Architecture is the binding contract and the epics follow it — no story-level ambiguity, but the UX spec sentence is stale.
2. **UX prose field names (LOW):** UX Component Implementation Strategy references schema fields "`pillar`, `predictionTimestamp`"; the architecture schema uses `entryPostedAt` and derives pillar from collection membership. Epics use the architecture names throughout.
3. **RaceWeekModule data source naming (LOW):** UX says "a `race-weeks` config/collection entry"; architecture implements it as `raceCalendar.ts` + `getRaceWeek()`. Epics follow architecture.
4. **/privacy/ missing from the UX site-map block (LOW):** the UX IA site map omits `/privacy/`, though the UX footer pattern lists it among trust pages; architecture (D3 URL scheme) and Epics (Stories 1.4, 4.1, 7.1) all include it. No implementation ambiguity.
5. **SummaryBox not a distinct file (LOW):** UX names "KeyFactsBox / SummaryBox" (guide-end 「この記事でわかったこと」 recap); the architecture tree contains only `KeyFactsBox.astro` and no story AC mandates the guide-end SummaryBox recap. If desired in guide articles, it is a trivial variant — recommend treating it as a KeyFactsBox variant during Story 2.3, or accepting its absence.
6. **FR count phrasing (COSMETIC):** architecture says "34 FRs"; the PRD enumerates 35 labeled items due to the FR19a/19b split. Pure counting semantics — every individual FR is covered in both documents.

### Warnings

None. UX documentation exists, is complete, and the architecture demonstrably supports every UX requirement (the architecture document even contains its own UX-coverage validation). No UI capability is designed that the architecture cannot deliver, and no architectural constraint contradicts a UX commitment.

## Epic Quality Review

### Epic Structure Validation

**User-value focus:**
- Epics 2–8 are unambiguously user/operator-outcome epics (readable goals stated from the reader's or operator's perspective, each with "FRs covered").
- Epic 1 ("New Brand Foundation & Home-Services Retirement") is the closest to a "technical milestone" epic — but it directly implements two binding PRD FRs (FR31 brand consistency, FR32 retirement) whose value statement is user/crawler-facing ("no remnants reachable by users or crawlers"), and this is a brownfield conversion where the retirement IS the product change. Verdict: acceptable, not a violation.

**Epic independence (Epic N never requires Epic N+1):**
- E1 stands alone (branded shell, build green). E2 uses only E1 output. E3 uses E1+E2 (GlossaryTerm from 2.2). E4 uses E1 stubs. E5 uses E1–E4 content surfaces. E6 uses E2's schema-file pattern but adds its own collection (created when needed — correct). E7 uses everything before it. E8 (Phase 2) reuses E6 unchanged — backward only.
- Epic ordering matches the architecture's six-stage build-green sequence (E1=stages 1–2, E2–E3=stage 3, E5=stage 4, E6=stage 5, E7=stage 6); Epic 4 (docs + trust pages) slots between with no stage conflict. Every story carries the "npm run build exits green" AC — the NFR17 gate is enforced per story, not per epic.
- No circular dependencies. No epic requires a later epic to function.

**Forward-dependency audit (story level):**
- Story 1.4's "BeginnerOnrampBox is added in Epic 3 when the component exists" is a correctly-handled deferral (the 404 ships functional without it), not a forward dependency.
- Story 2.3 consumes Story 2.2's `.glossary-term` treatment — backward, correct order.
- Story 4.2's parenthetical "(and — when Epic 8 lands — all prediction pages)" is informational future-proofing; the AC is implementable entirely without Epic 8 (template-type-driven notice band).
- Stories 3.1→3.4, 6.1→6.3, 8.1→8.3 are strictly sequential within their epics. **Zero forward dependencies found.**

### Story Quality Assessment

- **Format:** all 28 stories use role/want/so-that plus Given/When/Then ACs. ACs are concrete to the file/field/token level (exact CSP directives, exact schema fields, exact composition order, named components), which is the right altitude for AI-agent implementation.
- **Testability:** strong — negative-path fixtures required (Story 2.1: deliberately broken fixture must fail the build naming the file; Story 6.1: invalid recorded-without-result fixture must fail), grep-based remnant verification (1.2), hand-computed aggregation fixtures (6.2), Lighthouse thresholds with template enumeration (7.3), empty-state coverage (3.1 race hub with no articles; RaceWeekModule off-week variant "never renders empty").
- **Sizing:** stories are implementable increments. Story 1.2 (retirement pass) is the largest but is a single coherent deletion pass with an exhaustive AR9 inventory — splitting it would break the build-green invariant. Story 6.3 is partly an operational rehearsal (real race-week entries) rather than pure code — appropriate for this product's ops-heavy nature.
- **"Tables created when needed" analog (collections):** `predictions` is correctly deferred to Story 6.1 (its first use). Story 2.1 defines five collections (guides, glossary, bridge, races, raceArticles) although bridge/races/raceArticles are first routed in Epic 3 — a mild "schema upfront" deviation, but justified: one shared `articleBase` contract, one schema file, and `contentGraph.ts` cross-collection assertions require the referenced collections to exist. Fixtures per collection keep the build verifiable. Accepted with note.

### Special Implementation Checks

- **Starter template:** Architecture explicitly declares none (AR1: brownfield conversion-in-place); Epic 1 Story 1.1 correctly begins with the identity/token rewrite per the architecture's stated first priority — compliant.
- **Brownfield indicators:** present and strong — retirement/migration stories (1.2, 1.3), legacy-landmine handling (empty-collection 404s via AR18 routes-ship-with-content, legacy `src/content/config.ts` deletion, stray asset dirs, CSP exemption collapse), deliberate legacy-URL decision (old redirect map removed with rationale).
- **Phase-2 quarantine:** Epic 8 carries an explicit DO-NOT-SCHEDULE gate consistent with PRD policy — correctly prevents accidental sprint inclusion.

### Findings by Severity

**🔴 Critical Violations:** none.

**🟠 Major Issues:** none.

**🟡 Minor Concerns:**
1. **404 on-ramp retrofit unassigned:** Story 1.4 defers adding BeginnerOnrampBox to the 404 page "in Epic 3", but no Epic-3 story AC explicitly performs that retrofit (Story 3.1 adds the component on race hubs; 3.4 on the top page). Recommendation: fold "add BeginnerOnrampBox to 404.astro" into Story 3.1 or 3.4 ACs during sprint planning, or accept as an implied task.
2. **Epic 2 header omits FR26:** the FR Coverage Map credits "Epics 2–3 (seeded keyword-targeted content)" for FR26 and Story 2.3 references FR26, but Epic 2's "FRs covered" list omits it (Epic 3's includes it). Labeling inconsistency only; coverage is real.
3. **Story 2.1 collection-upfront deviation** (as analyzed above) — accepted, no action needed.
4. **SummaryBox** (UX guide-end recap) has no story AC — see UX Alignment finding 5; decide during implementation as a KeyFactsBox variant or drop.
5. **NFR19 not explicitly cited in any story** — it is the pre-existing deploy reality (git push → Vercel), inherently satisfied; no story change needed.

### Best Practices Compliance Summary

| Check | Result |
|---|---|
| Epics deliver user value | PASS (Epic 1 accepted as FR-mandated brownfield conversion) |
| Epic independence (no Epic N → N+1) | PASS |
| Story sizing appropriate | PASS |
| No forward dependencies | PASS |
| Collections/tables created when needed | PASS with minor accepted deviation (Story 2.1) |
| Clear, testable acceptance criteria | PASS |
| FR traceability maintained | PASS (100% map + per-story FR tags) |

## Summary and Recommendations

### Overall Readiness Status

**READY** — the planning artifact set (PRD, UX Design Specification, Architecture Decision Document, Epics & Stories) is complete, mutually consistent, and implementable. No critical or major gaps were found. 100% FR coverage with story-level traceability; the dependency graph is strictly backward; Phase-2 scope is correctly quarantined; every story terminates in the project's single quality gate (`npm run build`).

Known accepted conditions (deliberate, not blockers): PRD Open Decisions 1–4 (author persona, hour-budget confirmation, brand name/domain, prediction data sources) are explicitly tracked with architected placeholders — only Story 7.3 (launch cutover) hard-depends on their resolution; Phase-2 items are trigger-gated by written policy; there is no automated test suite by explicit project posture (`npm run build` + manual QA + Lighthouse are the gates).

### Critical Issues Requiring Immediate Action

None.

### Recommended Next Steps

1. **Run sprint planning** (`bmad-sprint-planning`) over Epics 1–7, excluding Epic 8 per its gate; the new sprint plan supersedes the retired product's `sprint-status.yaml`.
2. **During sprint planning or Story 3.1/3.4 creation,** assign the "add BeginnerOnrampBox to 404.astro" retrofit explicitly (Minor Concern 1) and decide the SummaryBox question (UX finding 5 — implement as a KeyFactsBox variant or drop).
3. **Optionally tidy the three stale UX-spec sentences** (`seriesTotal` in frontmatter, `pillar`/`predictionTimestamp` field names, `race-weeks` naming, `/privacy/` in the site map) so the UX spec matches the binding architecture wording — cosmetic; the architecture already governs.
4. **Track Open Decisions 1–4 against their earliest consumers:** OD1 (author persona) before content publishing begins in Epic 2 seeding; OD4 (prediction data sources) before the Epic 6 dry run starts; OD2/OD3 before Story 7.3 cutover.
5. **Add FR26 to Epic 2's "FRs covered" header line** on the next epics.md touch (labeling consistency only).

### Final Note

This assessment identified **11 low-severity notes** (6 UX-alignment LOW/cosmetic findings + 5 epic-quality minor concerns) across 3 categories (UX-document staleness, epics labeling, deferred-task assignment) — and **0 critical, 0 major issues**. Nothing blocks Phase 4 implementation; the notes can be absorbed during sprint planning and normal story creation. Proceeding as-is is a defensible choice.

**Assessment date:** 2026-08-26
**Assessor:** BMad Implementation Readiness workflow (autonomous run), on behalf of Luonghailam

## Resolution Log (2026-08-26)

1. **`seriesTotal` drift (UX finding 1):** FIXED — UX spec SeriesNav anatomy now states `seriesTotal` is derived at build time from the collection, never stored in frontmatter (per architecture D1).
2. **UX prose field names (UX finding 2):** FIXED — UX Component Implementation Strategy now uses `entryPostedAt` (was `predictionTimestamp`) and notes pillar is derived from collection membership, not a frontmatter field.
3. **RaceWeekModule data source naming (UX finding 3):** FIXED — UX spec now names the data source as the `raceCalendar.ts` config (`getRaceWeek()`), replacing the stale "`race-weeks` config/collection entry".
4. **/privacy/ missing from UX site map (UX finding 4):** FIXED — `/privacy/` added to the UX IA site-map block (already present in the UX footer, architecture D3, and epics).
5. **SummaryBox (UX finding 5 + Minor Concern 4):** DECIDED & FIXED — SummaryBox is implemented as the `summary` variant of `KeyFactsBox.astro` (one component, no separate file); stated in the UX spec component entry, the architecture source-tree note for KeyFactsBox.astro, and a new Story 2.3 AC line (guide-end 「この記事でわかったこと」 recap).
6. **FR count phrasing (UX finding 6):** FIXED — architecture.md now says "35 FR items (FR1–FR34, with FR19 split into FR19a/FR19b)" in both the Requirements Overview header and the Requirements Coverage Validation line.
7. **404 on-ramp retrofit unassigned (Minor Concern 1):** FIXED — Story 3.1 gains an AC retrofitting BeginnerOnrampBox onto `404.astro` (closing the Story 1.4 deferral); Story 1.4's deferral note now points to Story 3.1 instead of "Epic 3".
8. **Epic 2 header omits FR26 (Minor Concern 2):** FIXED — FR26 (seeded keyword-targeted content) added to Epic 2's "FRs covered" line in the Epic List.
9. **Story 2.1 collection-upfront deviation (Minor Concern 3):** ACCEPTED AS-IS — deliberate, justified deviation; no change.
10. **NFR19 not cited in any story (Minor Concern 5):** ACCEPTED AS-IS — pre-existing deploy reality, inherently satisfied; no change.
11. **Epic 1 as FR-mandated brownfield conversion (best-practices acceptance):** ACCEPTED AS-IS — deliberate framing per FR31/FR32; no change.
