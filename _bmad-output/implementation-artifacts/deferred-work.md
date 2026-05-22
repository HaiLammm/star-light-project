# Deferred Work

## Deferred from: code review of 2-5-assemble-complete-homepage (2026-05-12)

- H1 logo pattern creates implicit contract — future Epic 3/5 service/blog page story authors must NOT add a second H1; the Header.astro `<h1>` wrapping the logo is the single H1 on all pages (follows star-light15.net production pattern).
- `og:type` hardcoded as "website" in BaseLayout.astro — blog/article pages (Epic 5) will need `og:type="article"` with article-specific meta; BaseLayout should accept optional `ogType` prop when Epic 5 is built.
- JSON-LD scripts render in `<body>` not `<head>` (index.astro:132-133) — valid per Google, cosmetic improvement; could be moved to BaseLayout `<head>` slot in future to follow best practice.

## Deferred from: code review of story 1-2 (2026-05-08)

- formatDate uses runtime timezone (not JST) — may produce off-by-one dates on non-JST build servers. Consider explicit JST offset or Intl.DateTimeFormat with timeZone: 'Asia/Tokyo' when timezone-sensitive rendering is needed.
- generateFAQ([]) and generateBreadcrumb([]) produce empty schema arrays. Google requires ≥1 Question for FAQPage and ≥2 items for BreadcrumbList. Callers should guard against empty input or these functions should validate minimum lengths.

## Deferred from: code review of 1-5-build-desktop-megamenu-navigation (2026-05-10)

- Touch device interaction — hover-only open/close on MegaMenu has no tap toggle fallback for touch laptops (desktop-only scope, revisit if touch issues reported)
- Hamburger button missing `aria-expanded="false"` — will be addressed in Story 1.6 (Mobile Menu)

## Deferred from: code review of 1-4-build-baselayout-with-header-and-footer (2026-05-10)

- client:load on MobileMenu causes unnecessary JS hydration on desktop — consider client:idle or client:visible (belongs to Story 1.6 scope)
- Scroll listener on header never removed — safe in MPA mode but will leak if view transitions are enabled

## Deferred from: code review of story-2-1 (2026-05-10)

- No WCAG 2.2.2 pause/stop button for carousel autoplay — design decision; touch/switch-access users cannot pause without hover/focus
- No responsive images (srcset/picture element) for hero images — 2400px images served to all viewports, bandwidth waste on mobile

## Deferred from: code review of story-2-2 (2026-05-10)

- Hardcoded image/alt maps in ServiceCategorySection.astro should ideally live in siteConfig.ts alongside service definitions — architectural improvement beyond story scope, risk of data drift when adding/renaming services
- Grid missing 3-column breakpoint (2→4/5 jump) — production site uses Swiper slider not grid, acceptable for static grid alternative
- imageMap/altMap duplication — production site uses entirely different structure (Swiper), refactor not urgent until architecture stabilizes
- Raw `<img>` instead of Astro `<Image>` — images in public/ dir, Astro Image cannot optimize public assets; migrating all images to src/ is cross-cutting concern

## Deferred from: code review of story-4.3 (2026-05-21)

- W1: KV banner markup duplicate across 3 company pages — extract to shared component
- W2: Schema.org JSON-LD for office page placed in body, should be in `<head>`
- W3: Tokyo and Hyogo offices lack real street addresses in REGIONAL_OFFICES data
- W4: Company pages missing OG image metadata for social sharing
- W5: Terminology mismatch: card says "対応可能エリア" but office page says "営業所一覧"

## Deferred from: code review of story-4.4 (2026-05-21)

- Privacy page hardcoded 154 lines of legal content in .astro file instead of data file — inconsistent with project's content collection pattern
- KV banner h1 text-[48px] ml-[45px] and decorative text-[120px] overflow on mobile viewports under ~420px — pre-existing pattern from company pages
- ProcessFlow padding (pt-12 pb-8 → lg:pt-[100px]) doesn't match spec py-[80px] md:py-[120px] — pre-existing, used on homepage
- FAQ sortOrder defaults to 0 for all entries causing non-deterministic display order — pre-existing schema design

## Deferred from: code review of story-5.1 (2026-05-21)

- Swiper columnSwiper in service detail page renders with 0 slides if no blog posts exist — pre-existing pattern, no guard needed until blog content could be empty in production

## Deferred from: code review of story-5.2 (2026-05-22)

- `entry: any` type annotations bypass TypeScript safety in all 4 listing pages (.map() calls) — low risk for static site with Zod validation at build time, but reduces IDE/compiler assistance
