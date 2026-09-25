# Deferred Work — Keiba Pivot (ウマノミカタ)

> The full deferred-work log of the retired home-services product (star-light) is archived at
> `archive-star-light/deferred-work.md`. Most of its items concern routes, components, and
> dependencies that Epic 1's retirement pass deletes outright and are therefore moot.
> The items below are the only ones that still apply to the keiba product, because they live in
> code the conversion RETAINS (BaseLayout, Header, `src/utils/schema.ts`, `src/utils/formatters.ts`).

## Carried over from star-light (2026-08-26 sprint planning)

- **`formatDate` uses runtime timezone, not JST** (`src/utils/formatters.ts`) — may produce off-by-one dates on non-JST build servers. The keiba product is explicitly JST-sensitive (AR19: ledger timestamps `+09:00`, `M/D HH:mm` JST display). Fix with `Intl.DateTimeFormat` + `timeZone: 'Asia/Tokyo'` — natural home: Story 2.1 (schemas/utils) or Story 6.1 (ledger lifecycle).
- **`generateBreadcrumb([])` emits an invalid empty schema array** (`src/utils/schema.ts`) — Google requires ≥2 items for BreadcrumbList. The generator is retained by AR9. Add a minimum-length guard — natural home: Story 5.1 (structured data site-wide). (`generateFAQ([])` half RESOLVED 2026-09-25 by `spec-column-faq-and-speakable-schema.md`: the generator now returns `null` for an empty array.)
- **JSON-LD scripts render in `<body>` not `<head>`** — valid per Google but the old pattern; when Epic 5 rewires JSON-LD through central generators, emit via the BaseLayout `<head>` slot.
- **`BaseLayout.astro` `ogImage ?? SITE_CONFIG.defaultOgImage` passes empty string through** (`??` only guards null/undefined) — a page with `ogImage=""` makes `og:image` point at the site root; switch to `||`. Natural home: Story 5.3 (OGP correctness).
- **Header scroll listener never removed** (`Header.astro`) — safe in MPA mode, leaks if view transitions are ever enabled. Header is retained/re-skinned (UX-DR7); note for Story 1.4.

Everything else in the archived log (contact form, company pages, columns/blog routes, MegaMenu,
carousels/Embla/Swiper, Decap CMS, service data, privacy hardcode, `siteConfig.ts` doc pointers)
is resolved by deletion in Stories 1.1–1.3 (AR8/AR9) and needs no tracking here.

## Deferred from AIO infrastructure intent (2026-09-25)

- source_spec: none
  summary: Generate `public/llms.txt` automatically from content collections instead of maintaining it as a hand-written static file.
  evidence: Split from the AIO intent as an independently shippable goal — it is a build-time generator plus a public output file, sharing no code with the column-article structured-data work (`src/utils/schema.ts`, `src/pages/columns/[...slug].astro`). Current risk it addresses: the static `public/llms.txt` drifts out of date whenever the CMS publishes a new article.
- source_spec: none
  summary: Replace the hard-coded Organization `author` on Article schema with a real Person 監修者 carrying verifiable credentials, plus on-page display.
  evidence: Dropped from the AIO intent by user decision on 2026-09-25 — no real reviewer exists yet to stand behind the content. Fabricating a Person with credentials would be a false E-E-A-T signal, so `author` stays Organization (`src/utils/schema.ts:509`) until a named reviewer with real qualifications (e.g. 第二種電気工事士, 給水装置工事主任技術者) is available.

## Surfaced by review of spec-column-faq-and-speakable-schema.md (2026-09-25)

- source_spec: `_bmad-output/implementation-artifacts/spec-column-faq-and-speakable-schema.md`
  summary: Teach the upstream article generator to emit a `faq` block, and backfill the 68 existing column articles that still have none.
  evidence: Highest-value gap of the whole change. Only the canary article carries `faq`, so the FAQPage path ships working but unused, and every newly published article silently lacks it because the generator (`generateWorker.ts` in `~/Projects/auto_workflow/seo-cockpit`) does not know the field exists. The rendering and schema side is now done, so this is purely upstream content-pipeline work plus a backfill pass. Answers must be grounded in each article's own body, per the rule now documented in `CONTENT_GUIDE.md`.
- source_spec: `_bmad-output/implementation-artifacts/spec-column-faq-and-speakable-schema.md`
  summary: Point `speakable` at a real answer-first summary element (`#article-summary`) once articles carry one, instead of the `<h1>`.
  evidence: `speakable` currently resolves to the article title only, which the spec's own Design Notes acknowledge is close to zero value. It was kept as the hook for the answer-first summary work in `generateWorker.ts`. Until that lands the property sits on all 69 articles doing nothing; when it lands this is a one-line change in two places (`src/pages/columns/[...slug].astro` selector + the new element's id).
- source_spec: `_bmad-output/implementation-artifacts/spec-column-faq-and-speakable-schema.md`
  summary: Add a `scripts/check-jsonld.mjs` to `npm run verify` that asserts every emitted `speakable.cssSelector` resolves to exactly one element, and that FAQPage/Question counts match each article's frontmatter `faq` length.
  evidence: The repo has no test suite; the only automated gates are `check-csp.mjs` (which skips `application/ld+json`) and `check-trailing-slash.mjs` (which only inspects values under `URL_KEYS`, not `cssSelector` or `name`/`text`). So renaming or dropping `id="article-title"` on the `<h1>` — a styling hot spot rewritten on every responsive pass — ships `speakable` pointing at nothing while `npm run verify` stays green. Same for dropping the FAQ render guard. The repo already has exactly this dist-scanning script pattern to copy.
- source_spec: `_bmad-output/implementation-artifacts/spec-column-faq-and-speakable-schema.md`
  summary: Link the emitted `FAQPage` node into the page's schema graph with `@id`, `url`, and `inLanguage`.
  evidence: Every other schema on these URLs participates in the `@id` graph (`/#organization`, `/#website`) or sets `mainEntityOfPage`, but `generateFAQ` emits a floating node, so engines cannot relate the Q&A to the article containing it — weak for the entity linking this change exists to improve. Deferred because `url` requires a signature change to `generateFAQ`, which has four other call sites (`index.astro:180`, `[category]/index.astro:110`, `[category]/[service].astro:268`, `faq.astro:34`).
- source_spec: `_bmad-output/implementation-artifacts/spec-column-faq-and-speakable-schema.md`
  summary: Add a もっと見る link from the column FAQ section to the `/faq/` hub, matching the service-page pattern.
  evidence: `src/pages/[category]/[service].astro:433-445` renders the same heading plus a link to `/faq/`; the column version omits it, forgoing an internal link to the FAQ hub from what will eventually be 69 article pages.
- source_spec: `_bmad-output/implementation-artifacts/spec-column-faq-and-speakable-schema.md`
  summary: `FAQAccordion` puts a `<p>` inside `<summary>` and renders questions as non-headings.
  evidence: `<summary>` permits phrasing content plus an optional heading, so a `<p>` child is invalid markup; and because the questions are not headings they never enter the document outline, which also costs AI engines a heading-level cue for each Q&A passage. Pre-existing in the component, but it now also affects article pages, and the component was just given a variant prop so a heading-level option is cheap to add.
- source_spec: `_bmad-output/implementation-artifacts/spec-column-faq-and-speakable-schema.md`
  summary: `FAQAccordion.astro` keeps a local `interface FAQItem` duplicating the exported one in `src/utils/schema.ts`.
  evidence: Pre-existing duplication, now more exposed: the column page imports the canonical type while the component declares its own, so the two drift the moment the canonical type gains a field.
- source_spec: `_bmad-output/implementation-artifacts/spec-column-faq-and-speakable-schema.md`
  summary: Builds are nondeterministic on service pages — `allTestimonials` in `src/pages/[category]/[service].astro` comes from `getCollection` with no `.sort()`, so the 「お客様の声」 swiper and its Review JSON-LD change order between builds.
  evidence: Found incidentally while diffing built output to prove an unrelated change was inert. Building the UNMODIFIED tree twice (clearing `node_modules/.astro/data-store.json` in between) produces pages that differ from each other: same testimonials, different order. Pre-existing and harmless to users, but it makes build output undiffable, which defeats exactly the kind of "prove this change touched nothing else" check used here, and it churns `Review` JSON-LD order on every deploy. Fix by sorting the collection explicitly.
