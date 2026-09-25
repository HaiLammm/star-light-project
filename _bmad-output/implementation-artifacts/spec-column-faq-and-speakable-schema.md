---
title: 'Column article FAQ schema and speakable markup'
type: 'feature'
created: '2026-09-25'
status: 'done'
review_loop_iteration: 0
baseline_commit: 'd425483d18903aeee8c8be085a9a3e6c9c45bb57'
context: ['{project-root}/_bmad-output/project-context.md']
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** All 69 column articles emit only `Article` (+ conditional `HowTo`) structured data. They carry no `FAQPage` markup and no `speakable` specification, so AI answer engines have no question-scoped passage to lift and cite — the single largest AIO gap on the site, since column articles are what catch question-shaped long-tail queries.

**Approach:** Add an optional `faq` array to the `blog` collection schema, render it through the existing `FAQAccordion` component, and emit a guarded `FAQPage` JSON-LD alongside the existing `Article` JSON-LD. Add an optional `speakable` specification to `Article`. Articles without a `faq` block keep their current output exactly.

## Boundaries & Constraints

**Always:**
- A `FAQPage` with an empty `mainEntity` is invalid to Google. The emptiness guard lives inside `generateFAQ` so no caller can bypass it.
- Every FAQ answer added to a markdown file must be supported by that article's own body text. Do not invent facts, prices, procedures, or safety claims.
- JSON-LD reaches the page only through generator functions in `src/utils/schema.ts` — never inline.
- Rendered FAQ text and all user-facing strings are Japanese. Code comments are Vietnamese.
- Any frontmatter field editors must set has to exist in `public/admin/config.yml`, or Decap CMS cannot write it.
- `npm run build` must stay green; mobile Lighthouse 99–100 is a protected budget, so the FAQ section ships with zero client JS (`<details>`/`<summary>`, as `FAQAccordion` already does).

**Ask First:**
- Authoring FAQ content for more than the one canary article.
- Changing the shape or return type of any generator other than `generateFAQ`.
- Moving existing JSON-LD scripts from `<body>` into the `<head>` slot (tracked separately in `deferred-work.md`).

**Never:**
- No `Person` author / 監修者 — `author` stays `Organization`. Deferred; fabricating credentials is a false E-E-A-T signal.
- No auto-generated `llms.txt` (deferred, separate goal).
- No changes to article prose, heading structure, or answer-first rewriting — that belongs to `generateWorker.ts` in `~/Projects/auto_workflow/seo-cockpit`.
- No heuristic parsing of Q&A out of markdown bodies.
- Do not touch the legacy dead file `src/content/config.ts`.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|---|---|---|---|
| Article with FAQ | `faq` has ≥1 `{question, answer}` | FAQ section renders after prose, before `RelatedPosts`; one `FAQPage` script emitted with all items | N/A |
| Article without FAQ | `faq` absent | No FAQ section, no `FAQPage` script; `Article` output byte-identical to today | N/A |
| Empty FAQ array | `faq: []` in frontmatter | No FAQ section, no script | `generateFAQ([])` returns `null`, never an empty `FAQPage` |
| Malformed FAQ entry | item missing `answer` | Build fails naming the file and field | Zod error; fix the content, never loosen the schema |
| Speakable | any column article | `Article` carries `speakable` with a selector that resolves in the rendered DOM | Selector and its DOM `id` change together or not at all |

</frozen-after-approval>

## Code Map

- `src/content.config.ts:84-97` -- `blog` collection, `glob()` loader + Zod schema. Fields: `title`, `description`, `excerpt`, `publishedDate`, `updatedDate?`, `category` (enum electricity|water), `subcategory`, `image`, `imageAlt`. New optional `faq` goes last.
- `src/utils/schema.ts:48-51` -- exported `FAQItem { question, answer }`. Reuse; do not redefine.
- `src/utils/schema.ts:131-135` -- `FAQPageSchema` (`mainEntity: QuestionSchema[]`, no `speakable`).
- `src/utils/schema.ts:359-372` -- `generateFAQ(items): FAQPageSchema`, **no empty guard** (known issue in `deferred-work.md`). Existing callers already use `items.length > 0 ? … : null`, so widening the return to `| null` is type-safe for all four of them.
- `src/utils/schema.ts:69-78,182-211,501-532` -- `ArticleInput`, `ArticleSchema`, `generateArticle`. Neither type has `speakable`.
- `src/utils/schema.ts:269` -- `serializeJsonLd(schema): string`.
- `src/components/FAQAccordion.astro:7-9` -- `Props { items: FAQItem[] }`, no variant prop, renders `<details>/<summary>` with the question in a `<p>`, emits no JSON-LD. Reuse as-is.
- `src/pages/[category]/[service].astro:264-273,433-445` -- **the pattern to copy**: build `faqSchemaItems`, guard with `.length > 0`, emit script as a direct `<BaseLayout>` child, render `<h2>よくいただくご質問</h2>` + `<FAQAccordion>` in a `<section id="faq">`.
- `src/pages/columns/[...slug].astro:86-87` -- `articleSchema` + `howToSchemas` scripts, direct `<BaseLayout>` children. Add the FAQ script here.
- `src/pages/columns/[...slug].astro:126-128` -- `<h1>` with the article title, no `id` yet — the `speakable` selector target.
- `src/pages/columns/[...slug].astro:167-170` -- `<Content />` closes at 168, `<RelatedPosts>` at 170. Insert the FAQ section between them.
- `src/layouts/BaseLayout.astro:60` -- `<slot name="head" />` exists but no page uses it; default-slot scripts land in `<body>`. Read-only here — keep the current convention.
- `public/admin/config.yml:98-112` -- Decap `blog` fields. Note `updatedDate` is already missing from this list (pre-existing gap, out of scope). `faq` must be added as an optional list widget.
- `CONTENT_GUIDE.md` -- author-facing frontmatter reference; documents the field for whoever writes articles.

## Tasks & Acceptance

**Execution:**
- [x] `src/utils/schema.ts` -- add an emptiness guard to `generateFAQ` (return `null` for an empty array, widening the return type) and add an optional `speakable` property to `ArticleSchema` plus an optional input on `ArticleInput` so callers can supply selectors -- prevents invalid empty `FAQPage` output and carries the speakable signal.
- [x] `src/content.config.ts` -- add `faq: z.array(z.object({ question: z.string(), answer: z.string() })).optional()` to the `blog` schema -- typed, validated source of Q&A data.
- [x] `src/pages/columns/[...slug].astro` -- map `post.data.faq` to `FAQItem[]`, emit the guarded `FAQPage` script beside the existing scripts, render the FAQ section between prose and `RelatedPosts`, add a stable `id` to the `<h1>`, and pass the matching `speakable` selector into `generateArticle` -- makes the data render and become citable.
- [x] `src/content/blog/air-conditioner-cleaning-guide.md` -- add a `faq` block of 3 Q&A pairs whose answers restate that article's own body content -- canary proving the whole path end to end.
- [x] `public/admin/config.yml` -- add an optional `faq` list widget (fields: question string, answer text) to the `blog` collection -- without it CMS editors cannot use the feature.
- [x] `CONTENT_GUIDE.md` -- document the optional `faq` field and the rule that answers must be grounded in the article body.

**Acceptance Criteria:**
- Given the canary article, when the site is built, then its HTML contains exactly one `FAQPage` script whose `mainEntity` has 3 `Question` entries, and the questions are visible on the page after the prose and before the related posts.
- Given any article without a `faq` block, when the site is built, then its HTML contains no `FAQPage` script and its `Article` script differs from the previous build only by the added `speakable` property.
- Given the rendered column page, when the `speakable` selector is queried in the DOM, then it matches exactly one element.
- Given the FAQ section, when the page is loaded, then expanding an answer requires no JavaScript and adds no client bundle.
- Given a mobile (375px) and desktop (1240px) viewport, when the FAQ section renders, then long Japanese questions wrap without horizontal overflow.

## Design Notes

`speakable` is deliberately minimal: Google restricts it to news-type content, and these articles have no answer-first summary element in the DOM to point at, so the only selector that honestly resolves today is the `<h1>`. This is close to zero value on its own — it is worth keeping only as the hook that the deferred `generateWorker.ts` work (answer-first summary blocks) extends to a real `#article-summary` target. If the implementer finds the selector cannot be made stable, flag it rather than inventing one.

The four existing `generateFAQ` callers (`index.astro:180`, `[category]/index.astro:110`, `[category]/[service].astro:268`, `faq.astro:34`) all already ternary-guard on length, so their redundant guards may stay — do not refactor them in this change.

## Verification

**Commands:**
- `npm run build` -- expected: exits 0, no TypeScript strict or Zod content errors (this is the project's only real quality gate).
- `grep -c '"@type":"FAQPage"' dist/columns/air-conditioner-cleaning-guide/index.html` -- expected: `1`.
- `grep -c 'FAQPage' dist/columns/antenna-lifespan/index.html` -- expected: `0` (article without a `faq` block).
- `grep -o 'speakable' dist/columns/antenna-lifespan/index.html | head -1` -- expected: one hit, confirming `Article` carries it site-wide.

**Manual checks (if no CLI):**
- Paste the canary page's `FAQPage` JSON-LD into Google's Rich Results Test -- expected: valid, zero errors.
- Load the canary page at 375px and 1240px -- expected: FAQ heading matches the site's section-heading style, accordion opens/closes, no horizontal scroll.

## Suggested Review Order

**The single source of truth**

- Start here: one derived value gates the JSON-LD, the section, and the TOC entry.
  [`[...slug].astro:30`](../../src/pages/columns/%5B...slug%5D.astro#L30)

- The emptiness guard that makes that gate trustworthy — no caller can emit an empty FAQPage.
  [`schema.ts:371`](../../src/utils/schema.ts#L371)

**Validated content source**

- Optional `faq` array; `.trim().min(1)` makes blank Q&A fail the build gate, not ship as invalid markup.
  [`content.config.ts:100`](../../src/content.config.ts#L100)

- Canary article proving the whole path; answers restate the body, `updatedDate` bumped accordingly.
  [`air-conditioner-cleaning-guide.md:11`](../../src/content/blog/air-conditioner-cleaning-guide.md#L11)

**Rendering and the shared-component boundary**

- Opt-in variant; the `default` entries reproduce the old classes byte-for-byte, protecting 5 other call sites.
  [`FAQAccordion.astro:14`](../../src/components/FAQAccordion.astro#L14)

- FAQ section between prose and related posts, using the article variant.
  [`[...slug].astro:188`](../../src/pages/columns/%5B...slug%5D.astro#L188)

- TOC entry added by hand because the FAQ heading lives outside the markdown body.
  [`[...slug].astro:51`](../../src/pages/columns/%5B...slug%5D.astro#L51)

**The speakable coupling (highest-risk stop)**

- Selector is hard-coded here and enforced only by a comment — nothing fails if the id disappears.
  [`[...slug].astro:93`](../../src/pages/columns/%5B...slug%5D.astro#L93)

- Its only anchor in the DOM; these two must always change together.
  [`[...slug].astro:143`](../../src/pages/columns/%5B...slug%5D.astro#L143)

- Conditional spread keeps `Article` output byte-identical for callers that pass no selectors.
  [`schema.ts:547`](../../src/utils/schema.ts#L547)

**Authoring surfaces**

- CMS widget carrying the grounding rule as a hint, since editors never read the repo.
  [`config.yml:113`](../../public/admin/config.yml#L113)

- Author-facing rules: grounding, YAML quoting, 2–4 pairs.
  [`CONTENT_GUIDE.md:237`](../../CONTENT_GUIDE.md#L237)
