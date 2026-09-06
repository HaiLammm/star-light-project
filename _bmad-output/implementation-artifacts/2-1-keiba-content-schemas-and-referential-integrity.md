---
baseline_commit: dce15cd
---

# Story 2.1: Keiba Content Schemas & Referential Integrity

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As the operator,
I want the five article-side content collections defined with strict Zod schemas and cross-collection reference checking,
so that content missing required editorial metadata cannot build, and broken internal references fail loudly at build time (FR28, AR3, AR4, NFR14, NFR17).

## Acceptance Criteria

1. **Legacy content layer is gone.** `src/content.config.ts` defines no home-services collection (`services`, `cases`, `testimonials`, `faq`, `blog`, `company`), and the resurrected legacy content/assets are deleted: `src/content/blog/**` (12 md files) and `public/images/SEO/**`. No file under `src/` references a deleted collection.
2. **Five collections defined** in root `src/content.config.ts` with `glob()` loaders on the architecture's directories and formats: `guides` (md, `src/content/guides/`), `glossary` (md, `src/content/glossary/`), `bridge` (md, `src/content/bridge/`), `races` (json, `src/content/races/`), `raceArticles` (md, `src/content/race-articles/`). `predictions` is **out of scope** (Story 6.1).
3. **Shared `articleBase` contract** is enforced on `guides` / `bridge` / `raceArticles`: `title` ≤40, `description` 50–160, `publishedDate` (coerced date), optional `updatedDate`, `image` (string), `imageAlt` (string, Japanese copy required by convention), `relatedTerms` (array, default `[]`), optional `relatedRace`, `draft` (boolean, default `false`).
4. **Collection-specific fields match Architecture D1 exactly:**
   - `guides`: optional `series`, optional `seriesOrder` (positive int), `faqEntries: {question, answer}[]` default `[]`. `seriesTotal` is **never stored** — it is derived by counting the collection.
   - `glossary`: `term`, `reading`, `category: 'baken'|'race'|'pedigree'|'course'`, `shortGloss` ≤60, `relatedTerms` default `[]`. No hero image required, and `glossary` does **not** extend `articleBase`.
   - `bridge`: `articleBase` + `horseName`, optional `horseNameEn`, `era` (prose string), optional `umaCharacter` (stored for internal linking/search intent only — never rendered as an image/asset reference, NFR12), `keyRaces: string[]` default `[]` (race ids).
   - `races` (JSON): `raceId` (= filename slug), `name` (日本語), `grade: 'G1'|'G2'|'G3'`, `course`, `distance` (prose string, e.g. `芝2400m` — **string, not number**), `month` (int 1–12), `description`, optional `heroImage` / `heroImageAlt`.
   - `raceArticles`: `articleBase` + `race` (must match a `races` id), `edition` (int, e.g. 2026), `articleType: 'deep-dive'|'preview'|'recap'`.
5. **`src/utils/contentGraph.ts` exists** and asserts referential integrity for `relatedTerms` → `glossary`, `relatedRace` → `races`, `raceArticles.race` → `races`, and `bridge.keyRaces` → `races`. An unknown reference throws an `Error` whose message names **both the offending entry file/id and the field** (e.g. `guides/shutsubahyo-guide.md: relatedRace "tenno-sho" not found in collection "races"`). The helper is a pure function that receives already-loaded collection entries as arguments so it can be unit-tested without the Astro runtime — route files (`getStaticPaths`/hub pages, Stories 2.2+) call `getCollection()` and pass the results in.
6. **Seed fixtures build green** — one reviewed seed entry per collection, using the slugs the later Epic-2/3 stories will build on, with valid frontmatter and cross-references that resolve:
   - `src/content/glossary/fukusho.md` (`term: 複勝`, `category: 'baken'`)
   - `src/content/guides/shutsubahyo-guide.md` (`relatedTerms: ['fukusho']`, `relatedRace: 'japan-cup'`)
   - `src/content/races/japan-cup.json` (`raceId: 'japan-cup'`, id matching `RACE_CALENDAR`)
   - `src/content/race-articles/japan-cup/2026-preview.md` (`race: 'japan-cup'`, `articleType: 'preview'`)
   - `src/content/bridge/special-week.md` (`keyRaces: ['japan-cup']`)
7. **Invalid content is provably rejected.** `tests/contentSchemas.test.ts` asserts, without mutating repo content, that each of these fails validation with a message naming the offending field: missing `imageAlt`; `description` over 160 chars; `title` over 40; `shortGloss` over 60; `month: 13`; unknown `category`; and that `contentGraph` throws for an unknown `relatedRace`, an unknown `relatedTerms` slug, an unknown `raceArticles.race`, and an unknown `keyRaces` id — each message naming the file and field.
8. **`formatDate` is JST-correct** (carried deferred-work item): `src/utils/formatters.ts` `formatDate`/`formatDateDot` format via `Intl.DateTimeFormat` with `timeZone: 'Asia/Tokyo'` so a non-JST build server cannot emit off-by-one publication dates. Invalid input still throws `TypeError` (existing contract, existing call sites rely on it). Covered by a test.
9. **Gates green:** `npm run build` exits 0 with strict TypeScript + Zod validation, and `npm test` passes (existing 3 tests plus the new ones). No new npm dependency is added.

## Tasks / Subtasks

- [x] Task 1 — Remove the resurrected legacy content layer (AC: 1)
  - [x] `git rm -r src/content/blog public/images/SEO` (re-added by merge `dce15cd`; see Dev Notes › Git intelligence).
  - [x] Rewrite `src/content.config.ts` so it exports only the new collection map — delete the six legacy `defineCollection` blocks and their helper schemas.
  - [x] Grep for stale consumers before finishing: `grep -rn "getCollection\|getEntry" src` must return only new-collection usages (currently zero).
- [x] Task 2 — Author the schema module (AC: 2, 3, 4)
  - [x] Create `src/utils/contentSchemas.ts` exporting the pure Zod building blocks (`articleBase`, `guideSchema`, `glossarySchema`, `bridgeSchema`, `raceSchema`, `raceArticleSchema`) using `import { z } from 'astro/zod'` — no `astro:content` import, so `node --experimental-strip-types` tests can import it.
  - [x] `src/content.config.ts` composes them: `defineCollection({ loader: glob({ pattern, base }), schema })` per AC 2, and exports `collections`.
  - [x] Match D1 field-for-field; do not invent extra fields, do not store `seriesTotal`, do not widen `distance` to a number.
- [x] Task 3 — Build the referential-integrity helper (AC: 5)
  - [x] Create `src/utils/contentGraph.ts` with a pure `assertContentGraph({ guides, glossary, bridge, races, raceArticles })` (entries typed structurally, not via `astro:content`) that collects **all** violations and throws one `Error` listing each as `<file/id>: <field> "<value>" not found in collection "<target>"`.
  - [x] Export a narrow single-entry variant if route files need per-page checks; keep both paths throwing the same message shape.
  - [x] Never `try/catch` around validation — the build must fail loudly (Architecture › Process Patterns).
- [x] Task 4 — Seed one entry per collection (AC: 6)
  - [x] Write the five seed files with ASCII kebab-case romaji filenames and root-relative internal links with trailing slash.
  - [x] Japanese `imageAlt` / body copy; Vietnamese code comments only in code files, never in content.
  - [x] `image` paths follow D10: `/images/articles/<collection>/<slug>/hero.webp`. Image binaries are **not** required by this story (no route renders them yet); do not add placeholder binaries or `<Image>` imports.
  - [x] No Markdown table of race results/odds/times in any body (NFR8 data-boundary rule); no `COMPLIANCE.bannedWords` terms.
- [x] Task 5 — Fix `formatDate` timezone (AC: 8)
  - [x] Reimplement with `Intl.DateTimeFormat('ja-JP'|'en-CA', { timeZone: 'Asia/Tokyo', … })`, preserving the exact output shapes `2026年11月29日` and `2026.11.29` and the `TypeError` on invalid input.
- [x] Task 6 — Tests and gates (AC: 7, 9)
  - [x] Add `tests/contentSchemas.test.ts` (node:test + `assert/strict`, matching `tests/raceCalendar.test.ts` style) covering the AC-7 negative cases and at least one positive parse per collection.
  - [x] Add `formatDate` JST cases (e.g. a UTC instant that is the next day in Tokyo) — run with `TZ=UTC` to prove independence from the machine timezone.
  - [x] Run `npm test` and `npm run build`; record both results in Completion Notes.

## Dev Notes

### ⚠️ Baseline reality check — read this first

The working tree is **not** what Epic 1's story files claim. Verified at `dce15cd`:

- `src/content.config.ts` still defines all six home-services collections (`services`, `cases`, `testimonials`, `faq`, `blog`, `company`) — `git log -- src/content.config.ts` shows it was last touched by `06b32c0`, i.e. Story 1.2's retirement never actually landed on this file even though `spec-1-2-…md` claims an empty collection map.
- `src/content/blog/**` (12 legacy articles) and `public/images/SEO/**` were re-added by merge `dce15cd` ("Merge remote-tracking branch 'origin/main'"), which pulled in CMS "Publish:" commits from the pre-pivot branch. That merge added **nothing else** — verified with `git diff --name-status 47a74b7 dce15cd`.
- `npm run build` is currently green (6 routes) only because no page consumes those collections. Do not treat "build is green" as "the retirement happened".

Cleaning this up is in scope here (AC 1) because `content.config.ts` is the file this story owns. It is remediation, not scope creep — but call it out in the Change Log.

Also still legacy but **out of scope** (do not touch): `src/utils/schema.ts` (still imports `./siteConfig`, still exports service/testimonial/LocalBusiness generators) and `src/utils/siteConfig.ts` — pruning them is Story 5.1's territory per deferred-work. `src/utils/rehypeArticleImages.mjs` stays wired in `astro.config.mjs`; the glossary rehype plugin is Story 2.2, not this story.

### Files being modified (current state → what changes)

| File | Now | This story |
|---|---|---|
| `src/content.config.ts` | 6 legacy collections, Zod from `astro/zod`, `glob()` loaders | Replaced by the 5 keiba collections composed from `contentSchemas.ts` |
| `src/utils/formatters.ts` | `formatPrice*`, `formatDate`, `formatDateDot`; throws `TypeError` on invalid dates; uses runtime TZ | `formatDate`/`formatDateDot` become JST-pinned; price helpers untouched (still used by future ledger) |
| `src/content/blog/**`, `public/images/SEO/**` | legacy blog corpus | Deleted |
| `astro.config.mjs` | `site` from `SITE_CONFIG`, sitemap `serializeSitemapItem` passthrough, `rehypeArticleImages` | **Unchanged** — lastmod map is Story 5.2, glossary rehype is Story 2.2 |
| `tests/*.test.ts` | 3 suites (deploymentConfig, raceCalendar, shellContract) | One new suite added; existing suites must keep passing |

New files: `src/utils/contentSchemas.ts`, `src/utils/contentGraph.ts`, `tests/contentSchemas.test.ts`, the five seed content files. **No new top-level directories.**

### Architecture guardrails

- **Astro 5.18.1 Content Layer only.** Collections live in root `src/content.config.ts` (never the legacy `src/content/config.ts` path — it is already deleted, keep it that way), defined with `defineCollection({ loader: glob({ pattern, base }), schema })`. Zod comes from `astro/zod`, never from a standalone `zod` package.
- **Structured data = JSON, prose = Markdown.** MDX is not introduced. Glossary links inside bodies stay plain Markdown links.
- **Zod at build time is the only validation layer.** There is no runtime. Never loosen a schema to make content pass — if seed content fails, fix the content.
- **Naming (Architecture › Naming Patterns):** collection keys plural English camelCase (`raceArticles`); directories kebab-case (`src/content/race-articles/`); content filenames = URL slugs, ASCII kebab-case romaji; race-article files `<edition>-<type>.md` under `src/content/race-articles/<raceId>/`; frontmatter fields camelCase; dates as ISO `YYYY-MM-DD` strings coerced by Zod.
- **Internal links in Markdown bodies:** root-relative with trailing slash (`[複勝](/glossary/fukusho/)`) — never absolute, never extension-suffixed.
- **`races` ids must line up with `src/config/raceCalendar.ts`** (`RACE_CALENDAR` already contains `japan-cup`, `arima-kinen`, … with the same kebab-case ids). The calendar drives ordering later (Story 3.1); a mismatch would silently split the two sources.
- **JSON content files:** camelCase keys, UTF-8, no comments, 2-space indent.
- **Trilingual convention:** code comments Vietnamese; user-facing/content strings Japanese; this story file and commit messages English.
- **Config boundary:** identity/compliance/calendar constants come from `@config/*` (`SITE_CONFIG`, `AUTHOR_CONFIG`, `COMPLIANCE`, `RACE_CALENDAR`). Do not hardcode brand strings in schemas or seeds.
- **Zero dependencies added** (D9). No client JS, no islands, no webfonts — this story ships no UI at all.

### Why `contentSchemas.ts` is split out

Architecture calls `src/content.config.ts` "THE schema file". It stays the single place collections are declared; the split exists purely so the Zod objects are importable from a `node --experimental-strip-types` test (importing `content.config.ts` would pull the `astro:content` virtual module and fail outside the Astro build). Verified importable: `astro/package.json` exposes `"./zod": "./dist/zod.js"`. If that import path misbehaves under Node 22.23.2 strip-types, fall back to asserting schema behavior through `contentGraph` + a build-based check and record the deviation in the Change Log — do **not** add a `zod` dependency.

### Testing requirements

- Harness is `node:test` via `npm test` → `node --experimental-strip-types --test tests/*.test.ts` (Node 22.23.2). No vitest, no jest. Follow the terse style of `tests/raceCalendar.test.ts`: `import test from 'node:test'; import assert from 'node:assert/strict';`, relative `../src/...` imports **with the `.ts` extension**.
- `npm run build` remains the primary gate (NFR17). Run it *after* deleting legacy content — a stale collection reference surfaces there.
- The AC-7 "deliberately broken fixture" is exercised **in tests against in-memory objects**, not by committing a broken file. Never leave a knowingly-invalid file in `src/content/` — that would poison the build gate for every later story.
- Manual QA is not applicable (no rendered surface). Do not add Playwright work here.

### Previous story intelligence (Story 1.4, reviewed & done)

- The code review of 1.4 rejected "tests that can pass while the feature regresses" — `tests/shellContract.test.ts` was added specifically to make contracts executable. Expect the same standard: your tests must actually fail if a schema constraint is dropped.
- 1.4's review also penalized an incomplete **File List** and touching sprint-status entries other than the target story. Record every file you touch, and change only `2-1-…` in `sprint-status.yaml`.
- Config modules from Story 1.1 are frozen objects with exact export names — consume, never re-declare: `SITE_CONFIG` (`@config/site`), `AUTHOR_CONFIG` (`@config/author`), `COMPLIANCE` (`@config/compliance`), `PILLAR_NAVIGATION`/`TRUST_MENU`/`FOOTER_NAV` (`@config/navigation`), `RACE_CALENDAR`/`getRaceWeek` (`@config/raceCalendar`).
- `raceCalendar.ts` shows the house style for build-time validation of hand-typed data: validate at module load and `throw` immediately. `contentGraph.ts` should feel like a sibling of it.

### Git intelligence

Recent commits: `dce15cd` (merge, re-added legacy blog/images), `47a74b7` (branded global shell, Story 1.4), `bcf754a` (docs: cms auth worker teardown), `94bd11a` (deployment infra cleanup, Story 1.3), `a5065f7` (keiba foundation, Stories 1.1–1.2). Conventional commits are the rule; pure content additions use `content:`. Suggested commit for this story: `feat: define keiba content schemas and referential integrity`.

Working tree at story creation: clean except `_bmad-output/implementation-artifacts/sprint-status.yaml` (workflow-owned).

### Latest technical notes (pinned versions)

- `astro@5.18.1`, `@astrojs/sitemap@^3.7.2`, `@astrojs/rss@^4.0.19`, `tailwindcss@^4.2.4`, Node `v22.23.2`.
- Astro 5 Content Layer: `glob()` is imported from `astro/loaders`; `base` is a path relative to the project root (`'./src/content/guides'`), `pattern` is a glob (`'**/*.md'`). Entry `id` is derived from the file path minus extension — for `race-articles/japan-cup/2026-preview.md` the id is `japan-cup/2026-preview`, which is what `contentGraph` error messages should print.
- Node 22's `--experimental-strip-types` executes TypeScript without type-checking; type errors are caught by `npm run build` (`astro check` via strict tsconfig), not by `npm test`. Both gates are required.

### Project Structure Notes

Target paths are exactly those in Architecture › Complete Project Directory Structure: `src/content/{guides,glossary,bridge,races,race-articles}/`, `src/utils/{contentGraph.ts,contentSchemas.ts}`, `tests/`. `src/components/` stays flat and is untouched by this story. No route files are created here — routes ship with their templates in Stories 2.2–2.4 and 3.1–3.2 (AR18).

Known variance to record: the architecture tree does not list `src/utils/contentSchemas.ts`; it is introduced only to keep `content.config.ts` testable (rationale above). `src/utils/{schema.ts,siteConfig.ts,rehypeArticleImages.mjs}` remain in their legacy state by design — their cleanup belongs to Stories 2.2 and 5.1.

### References

- [Source: `_bmad-output/planning-artifacts/epics.md` — Epic 2, Story 2.1 acceptance criteria; AR3, AR4, AR18]
- [Source: `_bmad-output/planning-artifacts/architecture.md` — D1 Data Architecture (collection table, `articleBase`, per-collection fields, validation & migration strategy), D10 image conventions, Implementation Patterns (naming/format/process/enforcement), Project Structure]
- [Source: `_bmad-output/planning-artifacts/prd.md` — FR28, NFR8, NFR12, NFR14, NFR17]
- [Source: `_bmad-output/project-context.md` — Astro 5 Content Layer rules, `astro/zod`, build-as-quality-gate, trilingual conventions, anti-patterns]
- [Source: `_bmad-output/implementation-artifacts/deferred-work.md` — `formatDate` JST item assigned to Story 2.1]
- [Source: `_bmad-output/implementation-artifacts/1-4-branded-global-shell-header-footer-top-page-and-404.md` — review standards, config export names, test harness precedent]

## Dev Agent Record

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

- Task 1 red/green: retirement contract failed against legacy content, then `npm test` passed after removing 12 Markdown files, 23 images, and all six legacy schema declarations. No `getCollection`/`getEntry` consumers remain.
- Implementation approach: pure schema module, structural graph validator, Japanese seed content, then JST formatters; schemas, graph, and seeds used test-first checks. The collection map is temporarily empty during retirement and populated in Task 2.

### Completion Notes List

- Implemented five Astro Content Layer schemas, shared article contract, structural referential-integrity validation with aggregated file/field diagnostics, and five Japanese seed fixtures. Race ids are checked against filenames; the seed aligns with RACE_CALENDAR.
- Retired 12 resurrected legacy articles and 23 SEO images. No stale collection consumers remain. No new dependencies, routes, or image binaries were added.
- JST formatters preserve output shapes and TypeError behavior. Process deviation: formatter code preceded its regression test; the UTC regression test now passes.
- Validation: `TZ=UTC npm test` passed all four test files; `TZ=UTC npm run build` passed (six routes); `node_modules/.bin/tsc --noEmit` passed. No lint configuration exists.
- Build script runs Astro build, not astro check as assumed by the story; TypeScript was checked separately with the existing compiler. Schema module remains separate for Node tests. Graph route wiring is intentionally deferred to Stories 2.2+; no single-entry variant is needed without route consumers.
- Seed prose and image-alt conventions were inspected; fixture tests verify schema parsing, resolved references, image paths, internal-link shape, and banned wording.
- Code review patches applied: build-hook graph validation, strict schemas, ISO date guard, and sprint-status hygiene. Follow-up verification passed `TZ=UTC npm test`, `TZ=UTC npm run build`, `tsc --noEmit`, and `git diff --check`.

### File List

- `astro.config.mjs`
- `_bmad-output/implementation-artifacts/2-1-keiba-content-schemas-and-referential-integrity.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`
- `public/images/SEO/air-conditioner-suddenly-stop-working/2.jpg`
- `public/images/SEO/air-conditioner-suddenly-stop-working/3.jpg`
- `public/images/SEO/air-conditioner-suddenly-stop-working/4.jpg`
- `public/images/SEO/air-conditioner-suddenly-stop-working/thumbnail.jpg`
- `public/images/SEO/antenna-felldown/thumbnail.jpg`
- `public/images/SEO/antenna-lifespan/thumbnail.jpg`
- `public/images/SEO/antenna-removal/thumbnail.jpg`
- `public/images/SEO/antenna-tv-not-receive-signal/thumbnail.jpg`
- `public/images/SEO/electrical-panel-replacement-scam/thumbnail.jpg`
- `public/images/SEO/shower-hot-water-not-working/2.jpg`
- `public/images/SEO/shower-hot-water-not-working/3.jpg`
- `public/images/SEO/shower-hot-water-not-working/thumbnail.jpg`
- `public/images/SEO/shower-water-leak-causes-solutions/2.jpg`
- `public/images/SEO/shower-water-leak-causes-solutions/3.jpg`
- `public/images/SEO/shower-water-leak-causes-solutions/thumbnail.jpg`
- `public/images/SEO/shower-water-leak/4.jpg`
- `public/images/SEO/shower-water-leak/5.jpg`
- `public/images/SEO/shower-water-leak/6.jpg`
- `public/images/SEO/shower-water-pressure-weak/2.jpg`
- `public/images/SEO/shower-water-pressure-weak/thumbnail.jpg`
- `public/images/SEO/toilet-not-flushing/thumbnail.jpg`
- `public/images/SEO/toilet-poor-flushing/thumbnail.jpg`
- `public/images/SEO/toilet-tank-water-leak/thumbnail.jpg`
- `src/content.config.ts`
- `src/content/blog/air-conditioner-suddenly-stop-working.md`
- `src/content/blog/antenna-felldown.md`
- `src/content/blog/antenna-lifespan.md`
- `src/content/blog/antenna-removal.md`
- `src/content/blog/antenna-tv-not-receive-signal.md`
- `src/content/blog/electrical-panel-replacement-scam.md`
- `src/content/blog/shower-hot-water-not-working.md`
- `src/content/blog/shower-water-leak.md`
- `src/content/blog/shower-water-pressure-weak.md`
- `src/content/blog/toilet-not-flushing.md`
- `src/content/blog/toilet-poor-flushing.md`
- `src/content/blog/toilet-tank-water-leak.md`
- `src/content/bridge/special-week.md`
- `src/content/glossary/fukusho.md`
- `src/content/guides/shutsubahyo-guide.md`
- `src/content/race-articles/japan-cup/2026-preview.md`
- `src/content/races/japan-cup.json`
- `src/utils/contentGraph.ts`
- `src/utils/contentSchemas.ts`
- `src/utils/formatters.ts`
- `tests/contentSchemas.test.ts`

### Change Log

- 2026-09-06: Implemented Keiba content schemas, graph integrity, seed content, JST date formatting, and regression tests; remediated legacy blog/image resurrection from the merge. Story and sprint tracking moved to review.

### Review Findings

- [x] [Review][Patch] Wire `assertContentGraph` into the build-time content flow [src/utils/contentGraph.ts:23] — added an Astro build hook that discovers and validates every on-disk entry.
- [x] [Review][Patch] Make schemas reject unknown keys [src/utils/contentSchemas.ts:3] — all collection schemas are now strict, rejecting forbidden and misspelled frontmatter.
- [x] [Review][Patch] Enforce the ISO date metadata contract [src/utils/contentSchemas.ts:6] — dates now require `YYYY-MM-DD` while accepting Astro's parsed Date value.
- [x] [Review][Patch] Make the on-disk content test discover all entries [tests/contentSchemas.test.ts:30] — build-time validation now dynamically discovers every content entry; seed tests continue to verify representative positive and negative cases.
- [x] [Review][Patch] Restore strict diff hygiene [_bmad-output/implementation-artifacts/sprint-status.yaml:59] — removed the unrelated trailing space.
- [x] [Review][Patch] Revert unrelated sprint-status mutations [_bmad-output/implementation-artifacts/sprint-status.yaml:59-68] — sprint tracking now changes only the target story entry.
- [x] [Review][Defer] Retired publishing documentation still references legacy collections [CONTENT_GUIDE.md:56] — pre-existing documentation cleanup is outside Story 2.1 and should be handled by a dedicated documentation task.
