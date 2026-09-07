# Deferred Work — Keiba Pivot (ウマノミカタ)

> The full deferred-work log of the retired home-services product (star-light) is archived at
> `archive-star-light/deferred-work.md`. Most of its items concern routes, components, and
> dependencies that Epic 1's retirement pass deletes outright and are therefore moot.
> The items below are the only ones that still apply to the keiba product, because they live in
> code the conversion RETAINS (BaseLayout, Header, `src/utils/schema.ts`, `src/utils/formatters.ts`).

## Carried over from star-light (2026-08-26 sprint planning)

- **`formatDate` uses runtime timezone, not JST** (`src/utils/formatters.ts`) — may produce off-by-one dates on non-JST build servers. The keiba product is explicitly JST-sensitive (AR19: ledger timestamps `+09:00`, `M/D HH:mm` JST display). Fix with `Intl.DateTimeFormat` + `timeZone: 'Asia/Tokyo'` — natural home: Story 2.1 (schemas/utils) or Story 6.1 (ledger lifecycle).
- **`generateFAQ([])` / `generateBreadcrumb([])` emit invalid empty schema arrays** (`src/utils/schema.ts`) — Google requires ≥1 Question for FAQPage and ≥2 items for BreadcrumbList. Both generators are retained by AR9. Add minimum-length guards — natural home: Story 5.1 (structured data site-wide).
- **JSON-LD scripts render in `<body>` not `<head>`** — valid per Google but the old pattern; when Epic 5 rewires JSON-LD through central generators, emit via the BaseLayout `<head>` slot.
- **`BaseLayout.astro` `ogImage ?? SITE_CONFIG.defaultOgImage` passes empty string through** (`??` only guards null/undefined) — a page with `ogImage=""` makes `og:image` point at the site root; switch to `||`. Natural home: Story 5.3 (OGP correctness).
- **Header scroll listener never removed** (`Header.astro`) — safe in MPA mode, leaks if view transitions are ever enabled. Header is retained/re-skinned (UX-DR7); note for Story 1.4.

Everything else in the archived log (contact form, company pages, columns/blog routes, MegaMenu,
carousels/Embla/Swiper, Decap CMS, service data, privacy hardcode, `siteConfig.ts` doc pointers)
is resolved by deletion in Stories 1.1–1.3 (AR8/AR9) and needs no tracking here.

## Deferred from: code review of spec-1-3-deployment-config-and-infra-cleanup (2026-09-06)

- Refresh `public/robots.txt`: ~~update the sitemap URL from the retired `www.setsubi-pro.net` host to the current placeholder deployment contract~~ (done 2026-09-07 — now `https://example.com/sitemap-index.xml`, matching `SITE_CONFIG.siteUrl`). Still open: remove the stale `Disallow: /admin/` directive now that the admin surface is retired. This predates the reviewed patch and was deferred rather than attributed to Story 1.3.
