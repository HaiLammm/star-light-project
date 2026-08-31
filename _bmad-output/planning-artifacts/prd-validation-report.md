---
validationTarget: '_bmad-output/planning-artifacts/prd.md'
validationDate: '2026-08-25'
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/product-brief-racing-horse.md
  - _bmad-output/planning-artifacts/product-brief-racing-horse-distillate.md
  - _bmad-output/project-context.md
validationStepsCompleted: ['step-v-01-discovery', 'step-v-02-format-detection', 'step-v-03-density-validation', 'step-v-04-brief-coverage-validation', 'step-v-05-measurability-validation', 'step-v-06-traceability-validation', 'step-v-07-implementation-leakage-validation', 'step-v-08-domain-compliance-validation', 'step-v-09-project-type-validation', 'step-v-10-smart-validation', 'step-v-11-holistic-quality-validation', 'step-v-12-completeness-validation']
validationStatus: COMPLETE
holisticQualityRating: '4/5 - Good'
overallStatus: 'Pass with Warnings'
---

# PRD Validation Report

**PRD Being Validated:** _bmad-output/planning-artifacts/prd.md
**Validation Date:** 2026-08-25

## Input Documents

- PRD: prd.md (Keiba Media Pivot — ウマノミカタ)
- Product Brief: product-brief-racing-horse.md
- Product Brief Distillate: product-brief-racing-horse-distillate.md
- Project Context: project-context.md

## Validation Findings

## Format Detection

**PRD Structure (Level 2 headers, in order):**
1. Executive Summary
2. Project Classification
3. Success Criteria
4. Product Scope
5. User Journeys
6. Web Application Specific Requirements
7. Project Scoping & Phased Development
8. Functional Requirements
9. Non-Functional Requirements
10. Open Decisions (inherited from Product Brief)

**BMAD Core Sections Present:**
- Executive Summary: Present
- Success Criteria: Present
- Product Scope: Present
- User Journeys: Present
- Functional Requirements: Present
- Non-Functional Requirements: Present

**Format Classification:** BMAD Standard
**Core Sections Present:** 6/6

**Frontmatter metadata:** classification.projectType: web_app; classification.domain: general; complexity: low; projectContext: brownfield; releaseMode: phased; 13 creation steps completed (step-05-domain and step-06-innovation intentionally skipped); 3 inputDocuments tracked.

## Information Density Validation

**Anti-Pattern Violations:**

**Conversational Filler:** 0 occurrences
(Scanned: "The system will allow users to...", "It is important to note that...", "In order to", "For the purpose of", "With regard to", "please note", "it should be noted")

**Wordy Phrases:** 0 occurrences
(Scanned: "Due to the fact that", "In the event of", "At this point in time", "In a manner that")

**Redundant Phrases:** 0 occurrences
(Scanned: "Future plans", "Past history", "Absolutely essential", "Completely finish")

**Total Violations:** 0

**Severity Assessment:** Pass

**Recommendation:** PRD demonstrates good information density with minimal violations. Prose is compressed (e.g., "Monetization is deferred by design; the near-zero cost base makes traffic-first a strategy"), FR/NFR statements are direct capability statements ("Readers can...", "The operator can..."), and tables are used where prose would be wordier. One stylistic note (not a violation): some Executive Summary sentences are long em-dash chains carrying marketing tone, but each clause carries real information — density is preserved.

## Product Brief Coverage

**Product Brief:** product-brief-racing-horse.md (+ product-brief-racing-horse-distillate.md)

### Coverage Map

**Vision Statement:** Fully Covered — "graduation path from Uma Musume to real racing" thesis appears verbatim in Executive Summary; 2-3-year vision in Product Scope › Vision.

**Target Users:** Fully Covered — primary (20s-30s mobile beginners) and secondary (casual-to-intermediate fans) in Executive Summary; personified in Journeys 1-3; operator persona added (J4).

**Problem Statement:** Fully Covered (condensed) — the brief's three bad options (netkeiba ad-density, JRA utilitarianism, scam 予想サイト) are compressed into the Executive Summary. Condensation is appropriate for a PRD.

**Key Features:** Fully Covered with one asymmetry —
- Beginner hub → FR1, FR2, FR6, FR7
- G1/重賞 magazine → FR4, FR5
- Uma Musume bridge vertical → FR3, NFR12
- Prediction ledger (private dry-run → public) → FR13-FR18, NFR10
- Trust & editorial standards → FR8-FR12, NFR8-NFR11
- Distribution (X, LINE/newsletter, RSS, OGP) → FR19-FR22
- Codebase conversion / identity retirement → FR31-FR32
- Phase-2 interactive tools (payout simulator, 出馬表 reader) and creator partnerships → present in Growth Features scope but have NO contracted FRs, while the ledger's Phase-2 items do (FR16-18). Asymmetric contracting — Informational.

**Goals/Objectives:** Fully Covered — 6-month and 12-month targets, pivot threshold (<2k sessions/mo), trust proxies, and cadence commitments transfer exactly from brief to PRD (no silent number drift detected).

**Differentiators:** Fully Covered — all four brief differentiators map 1:1 to "What Makes This Special"; the brief's fifth honesty point ("speed is replicable; durable assets are ledger history + owned audience") is preserved in Risk Mitigation › Market Risks.

**Risks:** Partially Covered — brief lists 5 top risks; PRD Risk Mitigation covers AI-Overview erosion (High), solo burnout (High), and netkeiba replication (Med). Missing from Risk Mitigation: (a) ledger backfire / 景品表示法 exposure once affiliate links exist (Med) — only implicitly mitigated via the private dry-run and NFR9; (b) Uma Musume popularity-cycle dependency (Med) — the brief's mitigation (beginner hub standing on generic 初心者 intent) appears nowhere in the PRD. Moderate.

**Open Decisions/Questions:** Partially Covered — brief's 3 open decisions transfer 1:1 to PRD Open Decisions. However, the distillate lists 7 open questions the PRD "must address or escalate"; two are neither addressed nor escalated: (a) keep-or-drop Decap CMS (/admin + cms-auth Worker) — absent from the PRD entirely, though it directly affects FR31/FR32 conversion scope; (b) prediction pipeline inputs (exact public data sources for weekly 出馬表/results, manual-entry time cost, legal basis once monetized) — FR13/FR29 assume the workflow exists but the sourcing question is dropped. Moderate.

### Coverage Summary

**Overall Coverage:** ~90% — all core vision, users, features, goals, and differentiators fully covered.
**Critical Gaps:** 0
**Moderate Gaps:** 3
1. Two brief risks (ledger backfire/景品表示法 exposure; Uma Musume dependency) absent from Risk Mitigation Strategy.
2. Decap CMS keep/drop decision (open question 5 in distillate) not addressed or escalated — affects conversion scope (FR31/32) and the operator workflow (J4).
3. Prediction data-sourcing open question (distillate Q4) not carried into Open Decisions — blocks FR13/FR29 operability sizing.

**Informational Gaps:** 1 — Phase-2 FR contracting is asymmetric (ledger contracted, interactive tools/creator partnerships not).

**Recommendation:** Consider addressing moderate gaps for complete coverage: add the two missing risks to Risk Mitigation, and either decide or add Open Decisions entries for Decap CMS and prediction data sourcing.

## Measurability Validation

### Functional Requirements

**Total FRs Analyzed:** 34 (FR1-FR34)

**Format Violations:** 1
- FR19 (line 287) is a compound requirement: "Readers can follow the site's X account, **and** each G1 deep-dive has a thread version for X publication" — two distinct capabilities (reader-facing follow touchpoint; operator publishing artifact) fused into one FR. Split recommended so downstream stories map cleanly.
- Note (not counted as violations): FR11, FR12, FR22-FR25, FR28 are constraint/system-style statements rather than "[Actor] can" — acceptable BMAD practice for compliance/SEO invariants, and each remains objectively verifiable.

**Subjective Adjectives Found:** 1
- FR34 (line 314): "no **invasive** tracking that undermines the trust brand" — "invasive" is subjective; partially rescued by "cookieless/privacy-light" definition in NFR15, but the FR itself should reference the measurable definition.

**Vague Quantifiers Found:** 0

**Implementation Leakage:** 2 (mild, brownfield-mitigated)
- FR28 (line 302): "Content schemas enforce ... at build time" — mechanism (build-time schema enforcement) rather than pure capability; tolerable in a brownfield PRD where the build gate is an inherited constraint.
- FR31 (line 308): "from a single configuration source" — implementation approach embedded in the capability; the capability is "no home-services remnants reachable," the config-source part is the how.

**FR Violations Total:** 4

### Non-Functional Requirements

**Total NFRs Analyzed:** 19 (NFR1-NFR19)

**Missing Metrics:** 1
- NFR16 (line 347): the weekly loop must fit "the operator's declared weekly hour budget (see Open Decisions)" — the metric is a forward reference to an unresolved Open Decision (#2). Until the hour budget is declared, NFR16 is unmeasurable. This is an honest deferral, but it makes an NFR conditional on a decision outside the document.

**Incomplete Template:** 0 — remaining NFRs carry criterion + metric + verification method (e.g., NFR1 Lighthouse ≥99 verified before deploy; NFR2 LCP <1.5s / CLS <0.02 / INP <200ms on mid-range Android over 4G; NFR8/NFR9 100% with publish-checklist verification; NFR14 ≥90% draft pass rate; NFR15 <5KB).

**Missing Context:** 0 — context is strong throughout (each NFR states who it protects or why it exists).

**NFR Violations Total:** 1

### Overall Assessment

**Total Requirements:** 53 (34 FR + 19 NFR)
**Total Violations:** 5

**Severity:** Warning (borderline — 5 violations, all minor; no Critical-class violations)

**Recommendation:** Some requirements need refinement for measurability. Split FR19; anchor FR34's "invasive" to the NFR15 definition; restate FR28/FR31 as capabilities; NFR16 becomes fully measurable the moment Open Decision 2 lands — resolve it before architecture.

## Traceability Validation

### Chain Validation

**Executive Summary → Success Criteria:** Intact — each differentiator has a matching success dimension (SEO weapon → rankings/CWV criteria; trust brand → trust proxies + ledger-reading behavior; solo economics → operational-health cadence criteria; cost asymmetry → deferred-monetization business criteria).

**Success Criteria → User Journeys:** Intact — beginner "aha" → J1; return-visitor/retention → J1+J3; ledger trust → J2; zero user harm → J2; operational health → J4. Technical success criteria are correctly carried by NFRs rather than journeys.

**User Journeys → Functional Requirements:** Intact — the PRD's own "Journey Requirements Summary" table pre-builds this mapping, and it verifies: FR1-7 ← J1/J3; FR8-12 ← J2; FR13-18 ← J2/J4; FR19-22 ← J1/J3; FR27-30 ← J4; FR33-34 ← J4 + Success Criteria.

**Scope → FR Alignment:** Two minor gaps —
1. "Growth Features" lists interactive tools (payout simulator, annotated 出馬表 reader) and creator partnerships/video repurposing, but the FR preamble declares "UX design, architecture, and epic breakdown implement only what is listed here" and no FR contracts these items — unlike the ledger, whose Phase-2 items got FR16-18. As written, Phase-2 tools cannot be built without a PRD amendment. Either intentional (amend later) or an omission — should be stated explicitly.
2. MVP Feature Set says "all items there (… analytics baseline) are must-have" citing Product Scope › MVP, but the Product Scope › MVP bullet list does not actually contain an analytics item (analytics enters via Web-App Requirements › Implementation Considerations and FR33-34). Cross-reference mismatch; trivially fixed by adding an analytics bullet to Product Scope › MVP.

### Orphan Elements

**Orphan Functional Requirements:** 0 — FR31/FR32 (identity/migration) trace to the business objective and MVP scope rather than a user journey, which is legitimate (crawler/brand integrity is a business need).

**Unsupported Success Criteria:** 0

**User Journeys Without FRs:** 0

### Traceability Matrix (summary)

| FR group | Source |
|---|---|
| FR1-FR7 (content library) | J1, J3; Success › User |
| FR8-FR12 (trust/compliance) | J2; Success › zero user harm |
| FR13-FR18 (ledger) | J2, J4; Success › trust proxies |
| FR19-FR22 (distribution) | J1, J3; Business › trust proxies |
| FR23-FR26 (SEO) | All journeys; Business › rankings/sessions |
| FR27-FR30 (operations) | J4; Success › operational health |
| FR31-FR32 (identity/migration) | Business objective + MVP scope |
| FR33-FR34 (analytics) | J4; Success › Measurable Outcomes |

**Total Traceability Issues:** 2 (both minor scope-alignment gaps; no broken chains, no orphans)

**Severity:** Warning (minor)

**Recommendation:** Traceability is fundamentally intact and better than typical (the Journey Requirements Summary table is exemplary). Close the two scope-alignment gaps: state explicitly that Phase-2 interactive tools/creator features require a PRD amendment (or contract them as FRs now), and add the analytics-baseline bullet to Product Scope › MVP.

## Implementation Leakage Validation

Scope of scan: FR section (lines 254-314) and NFR section (lines 316-350). Technology mentions elsewhere (Project Classification, Web Application Specific Requirements) are the correct home for platform constraints and were not counted.

### Leakage by Category

**Frontend Frameworks:** 0 counted as violations — NFR3's "`client:visible`" names an Astro hydration directive, but it declares an inherited protected-budget constraint (the codebase's one allowed hydration mode); ruled constraint-relevant for a brownfield conversion, noted for awareness.

**Backend Frameworks:** 0

**Databases:** 0

**Cloud Platforms:** 0 counted as violations — NFR6 ("vercel.json") and NFR19 ("git push → Vercel build; recovery is a git revert") name the deploy platform, but the near-zero-cost static deployment IS the business requirement (cost-structure asymmetry differentiator) and the platform is an inherited brownfield fact; ruled constraint-relevant, noted.

**Infrastructure:** 1 violation
- FR28 (line 302): "Content schemas enforce required editorial metadata ... **at build time**" — the enforcement mechanism (build-time schema validation) is HOW; the capability is "invalid content cannot be published." (Also flagged in Measurability.)

**Libraries:** 1 violation
- NFR14 (line 342): "The content pipeline (**seo-cockpit**) produces frontmatter that passes the **Zod schemas** ... length rules are enforced **in the pipeline, not per-file**" — names a specific internal tool and validation library and prescribes where logic lives. The requirement could state "≥90% of AI drafts pass content validation without manual fixes" and leave tooling to architecture. Brownfield-mitigated (both already exist), but this is the clearest leakage in the document.

**Data Formats:** 1 violation
- NFR4 (line 323): "All images are optimized (**webp** via build pipeline)" — format choice is implementation; the capability is "images optimized to budget." (JSON-LD mentions in FR23 are capability-relevant — Google's rich-results contract is literally JSON-LD.)

**Other Implementation Details:** 0 counted — NFR17 ("`npm run build` ... TS strict + Zod violations block publish") names tools, but "the existing single quality gate must remain the quality gate" is itself the operational requirement being protected in this brownfield conversion; ruled deliberate constraint declaration, noted.

### Summary

**Total Implementation Leakage Violations:** 3 (plus 4 tech mentions ruled constraint/capability-relevant with justification above)

**Severity:** Warning

**Recommendation:** Some implementation leakage detected. FR28, NFR4, and NFR14 should be reworded to capability form. The remaining tech mentions are defensible in this brownfield PRD because the inherited stack is itself a binding constraint (protected Lighthouse budget, CSP discipline, build-as-gate) — but consider moving tool names into a "Constraints" preamble so requirements stay implementation-free.

## Domain Compliance Validation

**Domain:** general (sports media / content publishing)
**Complexity:** Low (per domain-complexity.csv: "general" → low)
**Assessment:** N/A - No special domain compliance requirements mandated by the domain matrix.

**Note:** This PRD is for a standard domain without formal regulatory compliance sections. However, the PRD itself correctly identifies gambling-adjacent special concerns that sit outside the CSV taxonomy, and — despite the creation workflow's domain step being skipped (frontmatter: step-05-domain-skipped) — it self-imposes the relevant obligations inline:
- Under-20 betting notice + responsible-gambling posture (FR10, NFR9) — Japanese law: betting under 20 is illegal.
- 景品表示法 (Premiums and Representations Act)-safe language, no profitability claims (FR12, NFR9).
- JRA-VAN/JRADB licensed-data boundary (FR11, NFR8, explicit out-of-scope list).
- Cygames IP boundary for Uma Musume content with quarterly re-check (NFR12).
- Quasi-YMYL E-E-A-T posture: named author, editorial policy, AI-disclosure (FR8-FR9, NFR11).

**Advisory (Low severity):** One compliance surface named in the brief is not explicitly carried into the PRD: 特商法 (Specified Commercial Transactions Act) exposure was noted in the distillate's rejected-ideas rationale for paid tips; since paid tips are out of scope, this is acceptable, but if affiliate monetization (Phase 2) proceeds, an affiliate-disclosure requirement (ステマ規制 / stealth-marketing rules under 景品表示法, effective 2023) will need to be added at that decision point. Recommend a one-line note in Growth Features so the Phase-2 trigger includes the disclosure obligation.

**Severity:** Pass (with the Phase-2 advisory above)

## Project-Type Compliance Validation

**Project Type:** web_app (multi-page static website, SEO-critical)

### Required Sections (per project-types.csv)

**browser_matrix:** Present — "Browser & Device Matrix": Priority 1 Mobile Safari iOS 16+ / Android Chrome; Priority 2 desktop evergreen; in-app browsers (X, LINE) explicitly included — an audience-accurate addition most PRDs miss.
**responsive_design:** Present — 375px/1240px baselines, mobile-first branching pattern, Japanese typography constraints.
**performance_targets:** Present — Lighthouse ≥99 budget, LCP/CLS specifics, zero-JS default, tied to strategy (CWV as ranking weapon).
**seo_strategy:** Present — binding NOTE.md playbook spec: JSON-LD invariants, title/description length rules, sitemap lastmod, 301 policy incl. percent-encoded Japanese URLs, AI-Overview-resilient keyword strategy.
**accessibility_level:** Present — "Pragmatic WCAG 2.1 AA" with concrete conventions; honest about no formal audit (no regulatory driver).

### Excluded Sections (Should Not Be Present)

**native_features:** Absent ✓ (explicitly skipped in Implementation Considerations)
**cli_commands:** Absent ✓ (explicitly skipped)

### Compliance Summary

**Required Sections:** 5/5 present
**Excluded Sections Present:** 0
**Compliance Score:** 100%

**Severity:** Pass

**Recommendation:** All required sections for web_app are present and adequately documented; no excluded sections found. The web-app section is one of the strongest in the document — each required topic is specified with testable detail and tied back to strategy.

## SMART Requirements Validation

**Total Functional Requirements:** 34

### Scoring Summary

**All scores ≥ 3:** 100% (34/34)
**All scores ≥ 4:** 85% (29/34)
**Overall Average Score:** 4.6/5.0

### Scoring Table

| FR # | Specific | Measurable | Attainable | Relevant | Traceable | Average | Flag |
|------|----------|------------|------------|----------|-----------|---------|------|
| FR1 | 5 | 4 | 5 | 5 | 5 | 4.8 | |
| FR2 | 4 | 4 | 4 | 5 | 5 | 4.4 | |
| FR3 | 5 | 4 | 5 | 5 | 5 | 4.8 | |
| FR4 | 5 | 4 | 5 | 5 | 5 | 4.8 | |
| FR5 | 5 | 4 | 5 | 5 | 5 | 4.8 | |
| FR6 | 4 | 4 | 5 | 5 | 5 | 4.6 | |
| FR7 | 4 | 3 | 5 | 5 | 5 | 4.4 | |
| FR8 | 5 | 5 | 5 | 5 | 5 | 5.0 | |
| FR9 | 5 | 5 | 5 | 5 | 5 | 5.0 | |
| FR10 | 5 | 5 | 5 | 5 | 5 | 5.0 | |
| FR11 | 4 | 4 | 4 | 5 | 5 | 4.4 | |
| FR12 | 4 | 3 | 4 | 5 | 5 | 4.2 | |
| FR13 | 5 | 5 | 5 | 5 | 5 | 5.0 | |
| FR14 | 5 | 5 | 5 | 5 | 5 | 5.0 | |
| FR15 | 5 | 5 | 4 | 5 | 5 | 4.8 | |
| FR16 | 5 | 5 | 5 | 5 | 5 | 5.0 | |
| FR17 | 5 | 5 | 5 | 5 | 5 | 5.0 | |
| FR18 | 5 | 4 | 4 | 5 | 5 | 4.6 | |
| FR19 | 3 | 4 | 5 | 5 | 5 | 4.4 | |
| FR20 | 4 | 4 | 5 | 5 | 5 | 4.6 | |
| FR21 | 5 | 5 | 5 | 5 | 5 | 5.0 | |
| FR22 | 5 | 5 | 4 | 5 | 5 | 4.8 | |
| FR23 | 5 | 5 | 5 | 5 | 5 | 5.0 | |
| FR24 | 5 | 5 | 5 | 5 | 5 | 5.0 | |
| FR25 | 5 | 5 | 5 | 5 | 5 | 5.0 | |
| FR26 | 4 | 4 | 4 | 5 | 5 | 4.4 | |
| FR27 | 4 | 4 | 4 | 5 | 5 | 4.4 | |
| FR28 | 4 | 5 | 5 | 5 | 5 | 4.8 | |
| FR29 | 4 | 3 | 4 | 5 | 5 | 4.2 | |
| FR30 | 4 | 4 | 4 | 5 | 5 | 4.4 | |
| FR31 | 4 | 4 | 5 | 5 | 5 | 4.6 | |
| FR32 | 4 | 4 | 5 | 5 | 5 | 4.6 | |
| FR33 | 4 | 4 | 4 | 5 | 5 | 4.4 | |
| FR34 | 3 | 3 | 5 | 5 | 5 | 4.2 | |

**Legend:** 1=Poor, 3=Acceptable, 5=Excellent
**Flag:** X = Score < 3 in one or more categories — none flagged.

### Improvement Suggestions (scores of 3)

- **FR7 (M:3):** "discover related content" — define the minimum ("each article surfaces ≥3 related items by topic/race/horse") so it is pass/fail testable.
- **FR12 (M:3):** references 景品表示法-safe patterns; make it testable by pointing at the wording list NFR9 says the editorial policy maintains ("passes the editorial-policy prohibited-wording check").
- **FR19 (S:3):** compound requirement — split reader-facing "follow the X account" from operator-facing "each G1 deep-dive has a thread version."
- **FR29 (M:3):** "documented fallback mode" is verifiable, but "can execute a defined weekly workflow" needs the workflow's definition-of-done (the checklist steps) referenced for testability.
- **FR34 (S:3, M:3):** "no invasive tracking" — replace with the measurable posture already in NFR15 (cookieless, <5KB, CSP-compatible).

### Overall Assessment

**Severity:** Pass (0% flagged; 100% of FRs score ≥3 on every criterion)

**Recommendation:** Functional Requirements demonstrate good SMART quality overall. Traceability and relevance are uniformly excellent (journey-mapped); the five suggestions above are refinements, not defects.

## Holistic Quality Assessment

(Multi-perspective evaluation performed in-context: skeptical reviewer, downstream architect, UX designer, and LLM-consumer lenses.)

### Document Flow & Coherence

**Assessment:** Excellent

**Strengths:**
- Coherent narrative spine: market fact → thesis ("graduation path") → users → journeys → requirements; every later section can be traced to the thesis.
- The four user journeys are written as stories with an explicit "Reveals requirements for" coda, then rolled up in the Journey Requirements Summary table — a model handoff to UX and epics.
- Phase gating is decision-quality: Phase 2 is trigger-gated with a table of triggers, and the riskiest feature (public ledger) is explicitly de-risked via the private dry-run.
- Open Decisions are cross-referenced to the exact FRs/NFRs they block — rare and valuable.

**Areas for Improvement:**
- Heavy cross-referencing ("see Product Scope › MVP", "see Open Decisions") saves repetition but creates indirection; the one cross-reference mismatch found (analytics baseline) is the cost of that style.
- The Executive Summary carries mild pitch-deck tone ("ranking weapon", "cannot be backfilled") — acceptable for stakeholders, slightly below the clinical register of the rest.
- Designer-facing gap: brand identity (name, logo, palette direction) is pending Open Decision 3, so UX design can start on structure but not identity — worth stating explicitly as a UX-workflow dependency.

### Dual Audience Effectiveness

**For Humans:**
- Executive-friendly: Strong — vision, market numbers, differentiators, and pivot threshold readable in two minutes.
- Developer clarity: Strong — brownfield constraints, protected budgets, and quality gates are explicit.
- Designer clarity: Good — journeys and device matrix are rich; visual identity blocked on Open Decision 3 (flagged above).
- Stakeholder decision-making: Strong — success metrics with a pivot threshold, trigger-gated phases, and honest open decisions.

**For LLMs:**
- Machine-readable structure: Strong — consistent ## sections, numbered FR/NFRs, tables, frontmatter classification.
- UX readiness: Good — journeys → flows is direct; content-type inventory (guides, glossary, bridge, deep-dives, hubs, ledger) is enumerable from FRs.
- Architecture readiness: Strong — NFRs give hard budgets; the deliberate constraint declarations (static-only, CSP, build-as-gate) bound the solution space precisely.
- Epic/Story readiness: Strong — FR groups map naturally to epics; Phase tags prevent premature story creation.

**Dual Audience Score:** 4.5/5

### BMAD PRD Principles Compliance

| Principle | Status | Notes |
|-----------|--------|-------|
| Information Density | Met | 0 filler violations; compact tables |
| Measurability | Partial | NFR16 defers its metric to an unresolved Open Decision; FR34 "invasive" subjective |
| Traceability | Met | Intact chains; 0 orphans; journey-mapping table |
| Domain Awareness | Met | Gambling-adjacent obligations self-imposed despite "general" classification |
| Zero Anti-Patterns | Met | No subjective-adjective or vague-quantifier pattern violations beyond FR34 |
| Dual Audience | Met | Reads well for stakeholders; extracts cleanly for LLMs |
| Markdown Format | Met | Proper structure, frontmatter, L2 headers |

**Principles Met:** 6/7 (1 partial)

### Overall Quality Rating

**Rating:** 4/5 - Good: Strong with minor improvements needed

### Top 3 Improvements

1. **Close the escalation gap on the distillate's open questions.** Add Open Decisions entries (or resolutions) for Decap CMS keep/drop and prediction data sourcing/legal basis, and get the operator hour budget declared — it is the metric for NFR16 and the sizing input for the whole cadence commitment. These are the only items that block downstream work.

2. **Complete the risk register.** Port the brief's two missing risks (ledger backfire / 景品表示法-affiliate exposure; Uma Musume popularity-cycle dependency) into Risk Mitigation Strategy with their mitigations, so architecture and content policy inherit them.

3. **One wording pass over flagged requirements.** Split FR19; restate FR28/FR31/FR34 in capability form (FR34 pointing at NFR15's measurable definition); reword NFR4/NFR14 to remove tool/format prescriptions; state explicitly whether Phase-2 interactive tools require a PRD amendment.

### Summary

**This PRD is:** a dense, well-traced, strategically coherent brownfield PRD that is ready to feed UX and architecture once its three open decisions and two dropped open questions are escalated or resolved.

**To make it great:** Focus on the top 3 improvements above.

## Completeness Validation

### Template Completeness

**Template Variables Found:** 0 — No template variables, placeholders, TODO/TBD markers remaining ✓

### Content Completeness by Section

**Executive Summary:** Complete — vision, market context, differentiators, target users, core insight.
**Success Criteria:** Complete — user/business/technical dimensions + Measurable Outcomes table with 6/12-month targets and a pivot threshold.
**Product Scope:** Complete — MVP, Growth, Vision, and an explicit all-phases exclusion list.
**User Journeys:** Complete — 4 journeys (primary happy path, primary edge case, secondary, admin/ops) + requirements summary table.
**Functional Requirements:** Complete — 34 FRs across 7 capability groups, phase-tagged.
**Non-Functional Requirements:** Complete — 19 NFRs across performance, security, compliance, integration, operability.
**Additional sections present:** Project Classification, Web Application Specific Requirements, Project Scoping & Phased Development, Open Decisions — all populated.

### Section-Specific Completeness

**Success Criteria Measurability:** Some (nearly all) — two soft cells in the Measurable Outcomes table: return-visitor rate at 6 months = "baseline established" (acceptable: it IS the measurement act) and X/LINE followers at 12 months = "meaningful G1-week engagement" (no number; "meaningful" is unmeasurable — set a follower/engagement floor or mark it explicitly as a tracked-not-targeted metric).
**User Journeys Coverage:** Yes — primary beginner, skeptic/trust edge case, secondary casual fan, and operator all covered.
**FRs Cover MVP Scope:** Yes — every MVP scope bullet maps to FRs (see Traceability); the only scope items without FRs are Growth-phase (documented there).
**NFRs Have Specific Criteria:** All except NFR16 (metric deferred to Open Decision 2, flagged in Measurability).

### Frontmatter Completeness

**stepsCompleted:** Present (13 steps; two documented as intentionally skipped)
**classification:** Present (projectType, domain, complexity, projectContext)
**inputDocuments:** Present (3 documents, all loadable)
**date:** Present (completedAt: 2026-08-25)

**Frontmatter Completeness:** 4/4

### Completeness Summary

**Overall Completeness:** 100% (10/10 sections complete)

**Critical Gaps:** 0
**Minor Gaps:** 2 — the "meaningful G1-week engagement" unmeasured target cell; NFR16's deferred metric.

**Severity:** Pass

**Recommendation:** PRD is complete with all required sections and content present. Address the two minor measurability cells when Open Decision 2 is resolved.

## Validation Summary

**Overall Status:** PASS WITH WARNINGS — no critical findings; the PRD is fit to feed UX design and architecture once the flagged open-decision escalations are acknowledged.

### Quick Results

| Check | Result |
|---|---|
| Format Detection | BMAD Standard (6/6 core sections) |
| Information Density | Pass (0 violations) |
| Product Brief Coverage | ~90% — 0 critical, 3 moderate gaps |
| Measurability | Warning (5 minor violations across 53 requirements) |
| Traceability | Warning (minor) — chains intact, 0 orphans, 2 scope-alignment gaps |
| Implementation Leakage | Warning (3 violations, brownfield-mitigated) |
| Domain Compliance | Pass (general/low; gambling-adjacent obligations self-imposed) |
| Project-Type Compliance | 100% (web_app 5/5 required, 0 excluded present) |
| SMART Quality | Pass (100% ≥3; avg 4.6/5) |
| Holistic Quality | 4/5 — Good |
| Completeness | Pass (100% sections; 0 template variables) |

### Critical Issues

None.

### Warnings (consolidated, ordered by impact)

1. **Two open questions from the brief distillate are neither addressed nor escalated:** Decap CMS keep/drop (affects FR31/FR32 conversion scope and J4 workflow) and prediction data sourcing/legal basis (blocks FR13/FR29 operability sizing). Add them to Open Decisions or resolve them.
2. **NFR16 has no metric until Open Decision 2 (operator hour budget) is resolved** — the only requirement whose testability depends on an out-of-document decision.
3. **Risk register incomplete vs brief:** ledger backfire / 景品表示法-affiliate exposure and Uma Musume popularity-cycle dependency are missing from Risk Mitigation Strategy.
4. **Phase-2 contracting asymmetry:** interactive tools and creator partnerships appear in Growth scope but have no FRs, while the FR preamble says only listed FRs get implemented — state the amendment intent explicitly.
5. **Requirement wording refinements:** FR19 compound; FR34 "invasive" subjective; FR28/FR31 mechanism-flavored; NFR4 (webp) and NFR14 (seo-cockpit/Zod placement) prescribe implementation.
6. **Minor editorial:** "analytics baseline" cross-reference mismatch in MVP Feature Set; "meaningful G1-week engagement" target cell unmeasured.

### Strengths

- Exemplary traceability: journey → requirement mapping table built into the PRD; zero orphan FRs.
- Zero information-density anti-patterns across the whole document.
- Web-app project-type coverage is complete and audience-accurate (in-app browser matrix, Japanese typography constraints).
- Domain awareness beyond its classification: under-20/responsible-gambling, 景品表示法, JRA-VAN data boundary, Cygames IP boundary all self-imposed with verification hooks.
- Phase gating is decision-grade: trigger-gated Phase 2, private ledger dry-run, explicit pivot threshold.
- Open Decisions cross-referenced to the exact FRs/NFRs they block.

### Top 3 Improvements

1. Escalate/resolve the dropped open questions (Decap CMS; prediction data sourcing) and declare the operator hour budget (unblocks NFR16).
2. Port the two missing risks into Risk Mitigation Strategy.
3. One wording pass over the flagged requirements (split FR19; capability-form FR28/FR31/FR34; de-tool NFR4/NFR14; state Phase-2 amendment policy).

**Recommendation:** PRD is usable as-is for downstream planning; address the warnings — ideally via the edit-PRD workflow — before or alongside UX/architecture kickoff, prioritizing the open-decision escalations that block sizing.

## Resolution Log (2026-08-26)

All moderate and low-severity findings were resolved by targeted edits to prd.md:

1. **Decap CMS keep/drop not escalated** — Resolved as a decision: dropped (config is 100% home-services-bound; J4 workflow is pipeline→git→build). Recorded under Open Decisions › Resolved with rationale; FR32 now explicitly retires /admin + cms-auth Worker.
2. **Prediction data-sourcing question dropped** — Added as Open Decision 4 (public data sources, manual-entry time cost, legal basis once monetized; must be answered before the dry-run starts; feeds FR13/FR29/NFR16).
3. **NFR16 unmeasurable (deferred metric)** — Declared a concrete working budget of 10 hours/week in NFR16 (Open Decision 2 now confirms/revises rather than supplies it); MVP Strategy resource paragraph aligned.
4. **Missing risk: ledger backfire / 景品表示法-affiliate exposure** — Added a Compliance Risks paragraph to Risk Mitigation Strategy (dry-run gate, NFR9/NFR10 enforcement, framing decision, Phase-2 ステマ規制 disclosure hook).
5. **Missing risk: Uma Musume popularity-cycle dependency** — Added to Market Risks with the brief's mitigation (beginner hub stands on generic 初心者 search intent; bridge is accelerant, not foundation).
6. **Phase-2 contracting asymmetry** — Added an explicit "Phase-2 contracting policy" to Post-MVP Features (ledger pre-contracted via FR16-18; all other Growth items require a PRD amendment adding FRs before implementation) and referenced it from the FR preamble.
7. **FR19 compound requirement** — Split into FR19a (reader follows X account) and FR19b (operator publishes deep-dive thread); numbering scheme preserved to avoid breaking FR20+ references.
8. **FR34 subjective "invasive"** — Reworded to anchor on NFR15's measurable posture (cookieless, CSP-compatible, <5KB).
9. **FR28 mechanism-flavored** — Restated as capability: content missing required metadata cannot be published; enforcement automatic.
10. **FR31 config-source leakage** — Restated as outcome: brand consistent on every page/metadata surface; "single configuration source" removed.
11. **NFR4 prescribes webp** — Restated outcome-based: images size/format-optimized to hold NFR1/NFR2 budgets, explicit dimensions.
12. **NFR14 names seo-cockpit/Zod** — De-tooled: ≥90% of AI-pipeline drafts pass content validation without per-file fixes; recurring failures fixed at pipeline level.
13. **Analytics-baseline cross-reference mismatch** — Added an analytics-baseline bullet to Product Scope › MVP so the MVP Feature Set citation now resolves.
14. **"Meaningful G1-week engagement" unmeasured** — Replaced with a measurable 12-month target: ≥1,000 combined X/LINE followers with X-thread referral sessions recorded every G1 week.
15. **Phase-2 affiliate disclosure advisory (Domain Compliance)** — Affiliate trigger row now requires adding a ステマ規制/景品表示法 affiliate-disclosure requirement to the PRD at the decision point.

**Deliberately unchanged:** tech mentions the validation ruled constraint-relevant (NFR3 client:visible, NFR6/NFR19 Vercel, NFR17 npm run build, FR23 JSON-LD) and tool names outside the FR/NFR sections (Executive Summary, Journeys, Web-App Requirements) — the report explicitly identified those as the correct home for brownfield platform constraints. FR7/FR12/FR29 SMART suggestions (score-3 refinements, "not defects" per the report) were left as-is since FR12 already binds to NFR9's wording list and FR29 to the documented fallback mode.
