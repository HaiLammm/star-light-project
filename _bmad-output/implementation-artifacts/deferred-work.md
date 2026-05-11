# Deferred Work

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
