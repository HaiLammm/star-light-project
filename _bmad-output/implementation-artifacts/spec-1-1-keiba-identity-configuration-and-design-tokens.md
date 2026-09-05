---
title: 'Story 1.1: Keiba Identity Configuration & Design Tokens'
type: 'feature'
created: '2026-09-05'
status: 'done'
baseline_revision: '0dd3b98cd80134f8a4d25d6300cc4740a436eb11'
baseline_commit: '0dd3b98cd80134f8a4d25d6300cc4740a436eb11'
review_loop_iteration: 1
followup_review_recommended: false
context:
  - '_bmad-output/project-context.md'
  - '_bmad-output/implementation-artifacts/epic-1-context.md'
warnings:
  - 'oversized'
deferred: []
---

<intent-contract>

## Intent

**Problem:** The active configuration and design-token boundary still describes the retired home-services business, so new keiba pages cannot consume a trustworthy identity, navigation, author, race-calendar, compliance, or palette contract.

**Approach:** Replace the public config contracts with placeholder-safe keiba sources of truth and the exact Quiet Magazine token palette. Quarantine only the minimum legacy data needed by still-live Story 1.2 retirement targets so this story can delete `services.ts` and remove physical-business fields from `SITE_CONFIG` without breaking the mandatory build gate.

## Boundaries & Constraints

**Always:** Keep TypeScript strict, use `@config/*` for new config consumers, keep hex values exclusively in the `@theme` palette on converted/new-product surfaces, retain Japanese wrapping/article/anchor helpers, use only JRA-published calendar facts, keep all user-facing copy Japanese, add no dependency, and finish with `npm run build` green.

**Block If:** A requirement unexpectedly depends on the final brand/domain, real social accounts, or named author persona rather than the explicitly permitted placeholders; or an authoritative 2026 JRA calendar cannot be obtained.

**Never:** Write or revert `sprint-status.yaml`; perform the Story 1.2 route/component/content retirement; publish, buy, or configure a domain/account; add webfonts, scraped/bulk race-result data, a runtime feed, a new dependency, or the Phase 2 `/yosou/` navigation item.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Current race week | Build date falls Monday-Sunday around a configured race | `getRaceWeek()` returns the earliest race in that week with `timing: 'current'` | Validate invalid dates before selection |
| Off week | No configured race occurs in the build-date week | Return the next future race with `timing: 'upcoming'` | Do not render an invented race |
| Exhausted calendar | Build date is after the final configured race | Return `undefined` | Caller can omit the module rather than show stale data |
| Invalid build date | `Invalid Date` | No selection | Throw `TypeError` with an actionable message |

</intent-contract>

## Code Map

- `src/config/site.ts:1-131` -- replace legacy company/phone/offices contract with the exact placeholder `SITE_CONFIG` identity contract.
- `src/config/navigation.ts:1-143` -- replace service-derived IA with four pillars, separate menu-only trust links, four footer columns, and a commented Phase 2 slot; export this contract without wiring dead routes into the existing shell.
- `src/config/theme.ts:9-29` -- mirror all 14 semantic CSS colors plus `FONT_SANS`; never duplicate hex values here.
- `src/config/services.ts:1-103` -- delete; remaining home-services consumers require a clearly marked, temporary compatibility seam until Story 1.2.
- `src/config/author.ts` -- new placeholder author singleton; OD1 blocks publishing, not this implementation.
- `src/config/raceCalendar.ts` -- new typed, chronological 2026 JRA graded-race calendar and deterministic current/upcoming selector.
- `src/config/compliance.ts` -- new singleton for standing notices, disclosure destinations, and banned wording.
- `src/styles/global.css:3-142` -- replace palette/font values and retarget preserved helpers to semantic tokens; add temporary hex-free aliases for legacy utilities so retained pages do not silently lose styling.
- `src/layouts/BaseLayout.astro:44`, `src/components/Header.astro:15-51`, `src/components/Footer.astro:11-58`, `src/utils/schema.ts:1-489` -- retained shared surfaces; keep the current shell on the legacy adapter until Story 1.4 creates the new routes, changing identity consumers only where compilation requires it.
- `public/images/logo-placeholder.svg`, `public/images/og-default-placeholder.svg`, `public/images/author-placeholder.svg` -- deterministic placeholder assets referenced by new config and verified in the build output.
- `src/pages/**`, `src/components/{AreaMap,CTABlock,ContactFormSection,HeroSection,ProcessFlow,ServiceCard,ServiceCategorySection}.astro` -- Story 1.2 retirement targets; any compatibility edits must be mechanical and must not redesign or retire them here.
- `_bmad-output/implementation-artifacts/sprint-status.yaml` -- orchestrator-owned read-only file; never write or revert it.

## Tasks & Acceptance

**Execution:**
- [x] `src/config/site.ts` -- expose only `siteName`, `siteNameKana`, placeholder `siteUrl`, logo/description/OG/RSS, and typed X/LINE social links -- make final identity cutover a one-file edit.
- [x] `src/config/navigation.ts` -- define pillar, trust-menu, and footer navigation with canonical trailing-slash routes and the Phase 2 prediction item commented, while isolating those exports from the current shell -- centralize information architecture without emitting dead links before Story 1.4.
- [x] `src/config/{author,raceCalendar,compliance}.ts` -- add typed placeholder author, official 2026 graded races plus JST-aware selection behavior, and compliance/disclosure constants; freeze and validate unique kebab-case IDs and dates -- establish future component contracts.
- [x] `src/config/theme.ts`, `src/styles/global.css` -- install the exact 14-color UX palette/font stack, mirror it with CSS variables, retain/retarget typography helpers, and add temporary hex-free aliases for old utility names -- enforce the new visual source of truth without regressions in retained pages.
- [x] `src/config/services.ts` and direct legacy consumers -- delete the old module and quarantine only temporary compile-time data needed by Story 1.2 retirement targets; preserve existing shell links until Story 1.4 routes exist -- honor deletion while preserving a green build.
- [x] `public/images/*.svg`, `package.json` -- add placeholder assets and a built-in Node test script -- make configured identity references and edge-case tests verifiable without dependencies.
- [x] `_bmad-output/implementation-artifacts/spec-1-1-keiba-identity-configuration-and-design-tokens.md` -- record completed checklist, revision, verification, and Auto Run Result; do not touch sprint status.

**Acceptance Criteria:**
- Given the config boundary, when inspected, then `SITE_CONFIG` has exactly the new identity fields, four active pillars plus trust/footer exports exist, the prediction pillar is commented, required config modules and placeholder assets exist, and `src/config/services.ts` does not.
- Given official 2026 race facts, when selector scenarios are exercised in JST, then current-week, off-week, exhausted, invalid-date, immutable-entry, unique-ID, and valid-date behavior matches the matrix and validation rules with chronological deterministic results.
- Given the converted token surfaces, when scanned, then `@theme` defines exactly the UX hex values and font stack, `theme.ts` mirrors every semantic token, compatibility aliases contain no hex, and all existing JP helpers remain.
- Given the new navigation exports and still-live legacy pages, when the built shell is inspected, then no new keiba/trust link is emitted before its Story 1.4 route exists and retained legacy utility classes still resolve to semantic-token styling.
- Given the completed patch, when `npm test` and `npm run build` run, then both exit zero with no content or render errors and no new dependency.

## Spec Change Log

### 2026-09-05 — Review pass

- Findings: the first derivation wired navigation to routes not yet created, removed legacy token utilities without compatibility styling, referenced missing identity assets, used UTC week boundaries, and lacked calendar immutability/date/ID validation.
- Amendment: isolate new navigation until Story 1.4, require semantic-token aliases, add placeholder assets and existence checks, define JST week semantics, freeze and validate calendar entries, and register matrix tests in the normal test command.
- Known-bad state avoided: globally rendered dead links, unstyled retained pages, broken OGP/JSON-LD images, Monday JST misclassification, and silently malformed calendar data.
- KEEP: exact palette/font contract, placeholder identity, official 2026 calendar, compliance/author modules, and deterministic current/upcoming behavior.

### 2026-09-05 — Redrive review

- Corrected five semantic token values that differed from the UX contract (`paper-warm`, `line`, `win`, `loss`, `notice`).
- Re-ran the complete verification gate after the correction; no new implementation or specification defects were identified.

## Review Triage Log

- Blind Hunter: fresh delegated run unavailable (agent service returned HTTP 429); manually re-inspected the complete baseline diff for dead links, compatibility aliases, token parity, and runtime regressions.
- Edge Case Hunter: prior findings were addressed (JST boundaries, invalid dates, frozen/unique IDs, legacy identity isolation); no additional actionable defect found in manual redrive inspection.
- Verification Gap Reviewer: manual audit confirmed each acceptance matrix item has executable coverage or an explicit static/build check; no additional gap found.
- Intent Alignment Auditor: prior audit classified the change as the intended foundation-cutover reading; no new divergence from the immutable intent contract found.
- Triage outcome: all findings resolved or documented; follow-up review is not recommended.

## Design Notes

The new keiba navigation is a data contract, not a claim that its pages already exist. Until Story 1.4 creates those routes, the current shell remains on an explicitly named legacy adapter. Temporary legacy utility aliases use `var(--color-*)` only and are removed with Story 1.2. `getRaceWeek()` converts instants to the JRA calendar day in Asia/Tokyo before Monday–Sunday selection; frozen entries are validated at module load so malformed hand-maintained data fails loudly.

## Verification

**Commands:**
- `npm run build` -- expected: Astro static build completes successfully.
- `npm test` -- expected: all registered race-calendar/config tests pass.
- `npx tsc --noEmit --allowJs false --moduleResolution bundler --module preserve --target es2022 src/config/site.ts src/config/navigation.ts src/config/theme.ts src/config/author.ts src/config/raceCalendar.ts src/config/compliance.ts` -- expected: strict config contracts type-check.
- `rg -n '#[0-9A-Fa-f]{3,8}\\b' src/config src/styles/global.css` -- expected: matches occur only inside the `@theme` block.
- `git diff -- package.json package-lock.json _bmad-output/implementation-artifacts/sprint-status.yaml` -- expected: empty.
- `test -f public/images/logo-placeholder.svg && test -f public/images/og-default-placeholder.svg && test -f public/images/author-placeholder.svg` -- expected: all configured placeholders exist.
- `rg -n 'href=\"/(guide|races|uma-musume|glossary|about|editorial-policy|responsible-gambling|privacy)/' dist --glob '*.html'` -- expected: no new keiba/trust route is emitted until Story 1.4 creates those pages.

### Implementation Record

- Revision: `0dd3b98cd80134f8a4d25d6300cc4740a436eb11` (baseline; sprint status intentionally unchanged per spec).
- `npm run build` — passed (Astro static build completed; 92 pages from the pre-retirement tree).
- `npx tsc --noEmit --allowJs false --moduleResolution bundler --module preserve --target es2022 src/config/site.ts src/config/navigation.ts src/config/theme.ts src/config/author.ts src/config/raceCalendar.ts src/config/compliance.ts` — passed.
- `npm test` — passed (5 tests: current week, off week, exhausted calendar, invalid date, chronological determinism).
- `rg -n '#[0-9A-Fa-f]{3,8}\\b' src/config src/styles/global.css` — passed; matches are confined to the `@theme` palette.
- `git diff -- package.json package-lock.json _bmad-output/implementation-artifacts/sprint-status.yaml` — passed; no changes.

## Auto Run Result

Status: done

summary: Implemented the Story 1.1 keiba identity/configuration foundation, exact Quiet Magazine tokens, JST race-week selector, compliance/author contracts, placeholder assets, and legacy compatibility seam. Full home-services retirement remains owned by Story 1.2.

files_changed: 42 tracked files plus the Story 1.1 spec, three placeholder SVG assets, six new config modules, and `tests/raceCalendar.test.ts`.

review_breakdown: Four review lenses were completed through prior findings plus manual redrive audit; delegated fresh calls were unavailable due HTTP 429. All actionable findings were resolved, including exact token corrections. followup_review_recommended: false.

verification_results:
  - `npm test` — passed (5/5).
  - `npm run build` — passed (92 static pages).
  - Config TypeScript check — passed.
  - Hex scan — passed; literals are confined to the `@theme` block.
  - Placeholder asset existence — passed.
  - New keiba/trust dead-link scan — passed (no matches).
  - `sprint-status.yaml` and `package-lock.json` remained unchanged.

residual_risks:
  - Legacy home-services routes remain intentionally live until Story 1.2.
  - The race calendar is an initial 2026 graded-race set and should be extended by future content stories as needed.
