---
title: 'Centralize site config into src/config/'
type: 'refactor'
created: '2026-08-24'
status: 'done'
baseline_commit: '35ca5cd93ba386923f05ea0cadc6d1722b966488'
context: []
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** Site-wide info is scattered and drifting: identity/nav live in `src/utils/siteConfig.ts` (34 importers), Footer defines its own 50-line nav, the site URL is hardcoded in 4 places, the phone re-hardcoded in 2 components, and theme colors are duplicated across the Tailwind v4 `@theme` block, a dead v3 `tailwind.config.mjs`, and inline hex in ~8 components.

**Approach:** Make `src/config/` the single source of truth — `site.ts` (identity, URL, phone, offices, socials, default meta), `navigation.ts` (header/mega/mobile + footer nav), `services.ts` (service catalog), `theme.ts` (tokens as CSS-var references). Add a `@config/*` tsconfig alias, rewrite all importers, route hardcoded duplicates through config, delete `src/utils/siteConfig.ts` and `tailwind.config.mjs`. Rendered HTML stays equivalent except where a duplicate is replaced by the identical config value.

## Boundaries & Constraints

**Always:** Hex values exist in exactly one place — the `@theme` block in `global.css`; `theme.ts` exposes only `var(--color-*)` strings. Replace inline hex only on exact case-insensitive token match. Keep `public/admin/config.yml` and `src/content/` untouched. Preserve all exported symbol names — the move is import-path-only for consumers.

**Ask First:** Changing visible text, labels, or colors beyond substituting an identical value; renaming/reshaping any exported symbol; touching content or CMS config.

**Never:** Rewriting hardcoded 設備プロ page titles/copy or the ~163 name/phone references in `src/content/*` (editorial — separate effort); normalizing hex variants `#FBC101`/`#1FB5E6` in CTABlock; touching `public/robots.txt`, `sitemap.astro` inline page lists, or legacy `src/content/config.ts`; CSS-token codegen; leaving a re-export shim at `utils/siteConfig.ts`.

</frozen-after-approval>

## Code Map

- `src/utils/siteConfig.ts` -- 301-line monolith to split and delete: types + `SITE_CONFIG`, `REGIONAL_OFFICES`, `ELECTRICITY/WATER_SERVICES`, `SERVICE_CATEGORIES`, `NAVIGATION`.
- `src/components/Footer.astro:6-56` -- independent inline footer-nav array (own labels/grouping).
- `src/styles/global.css` -- `@theme` hex tokens lines 3-21 (source of truth); html font stack line 34; raw `#e0e0e0`/`#f5f5f5` lines 109/115.
- `tailwind.config.mjs` -- dead v3 config (v4 runs via `@tailwindcss/vite`, no `@config` directive); stale colors/font.
- `astro.config.mjs:23,31` -- hardcoded `https://www.setsubi-pro.net` (blog sitemap prefix + `site:`).
- `src/layouts/BaseLayout.astro:19,43` -- hardcoded default ogImage `/images/staff_bg.jpg`, RSS title.
- Hardcoded phone: `ContactFormSection.astro:144,153` (client-JS fallback), `pages/company/about.astro:16,66` (profile table).
- Importers of `utils/siteConfig` (34 files: 12 components, BaseLayout, 20 pages incl. `rss.xml.js`, `utils/schema.ts`) -- find via `grep -rl "utils/siteConfig" src`.
- Inline hex to swap: `Header.astro:88`, `MobileMenu.astro:19,50`, `CTABlock.astro:25,54` (navy only), `CategorySidebar.astro` (~10 spots), `ContactFormSection.astro` (5 spots), `BlogCard.astro:18`.

## Tasks & Acceptance

**Execution:**
- [x] `tsconfig.json` -- add `baseUrl` + `paths {"@config/*": ["src/config/*"]}` (Astro resolves tsconfig aliases natively).
- [x] `src/config/site.ts` -- move `SITE_CONFIG`, `REGIONAL_OFFICES` + types verbatim; extend with `defaultDescription`, `defaultOgImage`, `rssTitle`, `socialLinks: []`.
- [x] `src/config/services.ts` -- move `ELECTRICITY_SERVICES`, `WATER_SERVICES`, `SERVICE_CATEGORIES` + service types.
- [x] `src/config/navigation.ts` -- move `NAVIGATION` + nav types; absorb Footer's array verbatim as `FOOTER_NAV` (no derivation layer).
- [x] `src/config/theme.ts` -- export `THEME` (semantic name → `var(--color-*)`) + `FONT_SANS`; header comment: hex lives only in `@theme`.
- [x] `src/styles/global.css` -- add `--font-sans` (current JP stack) to `@theme`; `html { font-family: var(--font-sans) }`; swap lines 109/115 raw hex for existing vars.
- [x] `tailwind.config.mjs` -- delete after `grep -rn "tailwind.config" . --exclude-dir={node_modules,dist,.git}` shows no references.
- [x] 34 importer files -- rewrite relative imports to `@config/site` / `@config/services` / `@config/navigation` per symbols used (mechanical, grep-driven).
- [x] `src/components/Footer.astro` -- drop inline nav, import `FOOTER_NAV`.
- [x] Inline-hex files (Code Map) -- replace exact matches with `var(--color-*)` (style attrs, CSS, SVG fill/stroke).
- [x] `ContactFormSection.astro` + `company/about.astro` -- source phone from `SITE_CONFIG.phone` (client-JS string interpolated in frontmatter).
- [x] `src/layouts/BaseLayout.astro` -- default ogImage + RSS title from `SITE_CONFIG`.
- [x] `astro.config.mjs` -- import site URL from `./src/config/site`; if config load rejects the TS import, keep literal + `// keep in sync with src/config/site.ts` and report.
- [x] `src/utils/siteConfig.ts` -- delete; confirm zero references remain.

**Acceptance Criteria:**
- Given the refactor, when `npm run build` runs, then it exits 0 and emits the same page set as before.
- Given the change of one value (e.g. phone) in `site.ts`, when rebuilding, then header/footer/CTA/contact-fallback/company-about all reflect it.
- Given `src`, when grepping `utils/siteConfig`, then zero matches; all consumers use `@config/*`.
- Given components/layouts/pages, when grepping `#1B2A4A|#0277BD|#FBC02D|#E53935`, then zero matches outside `@theme` and the two whitelisted CTABlock variants.
- Given `public/admin/` and `src/content/`, when diffing, then unchanged.

## Spec Change Log

- 2026-08-25 (review round 1, three-reviewer pass): correction — the implementation notes' "All 14 tasks done" overstated: the ContactFormSection half of the phone task had covered only the `!response.ok` branch; the `catch` branch still shipped the hardcoded phone (AC2 fail, found independently by all three reviewers). Patched in place (no spec loopback — the spec already named both baseline lines; execution slip, not spec ambiguity): both failure branches now read `data-error-html` with a static text fallback (no phone) instead of `?? ''`; the frontmatter interpolation is HTML-escaped before entering the `innerHTML` pipe; astro.config.mjs builds blogDateMap keys via `new URL(...)` so a future trailing-slash edit of `siteUrl` cannot silently drop sitemap lastmod. Six pre-existing/out-of-scope findings appended to deferred-work.md (alert stacking, ogImage `??` empty-string, about.astro legalName/address dup, placeholder email + 'Setsubit' + phantom 'nagoya' OfficeKey, non-token hexes, stale doc pointers NOTE.md:155/change.md:8). Verified post-patch: build 92 pages, AC greps clean, hardcoded phone digits gone from source.
- 2026-08-25 (implementation notes): All 14 tasks done; `npm run build` exits 0 with an identical 94-file dist page inventory; all four verification commands pass. `astro.config.mjs` took the **import branch** (TS import of `SITE_CONFIG` loads fine — no literal fallback needed). Deviations/notes: (1) importer sweep covered 36 files (the grep-visible 35 + `utils/schema.ts` via its relative `./siteConfig` import); (2) Tailwind arbitrary-value hexes were swapped to the semantic utilities the `@theme` block already generates (`bg-navy`, `outline-navy`, `accent-water`, `border-red`, `text-water`, `bg-red`) — these compile to `var(--color-*)` declarations, matching existing codebase convention; style-attr/`<style>`/JS-inline-style hexes became literal `var(--color-*)`; (3) `rss.xml.js` feed title also routed through `SITE_CONFIG.rssTitle` (byte-identical output) so it can't drift from the `<link rel="alternate">` title; (4) Footer's unused `NAVIGATION` import was dropped; `FOOTER_NAV` values verbatim with a new `FooterNavSection` type; (5) `#e0e0e0` Tailwind-arbitrary borders in `ContactFormSection`/`about` left as-is (only the two global.css greys were in scope); (6) an orphan `.bg-\[\#E53935\]` utility remains in dist CSS because Tailwind v4 auto-scans `_bmad-output/implementation-artifacts/4-1-build-contact-form-page.md` (pre-existing, unused by any page, content untouched); (7) `npx astro check` skipped — it requires installing `@astrojs/check` + `typescript` (not set up at baseline either).

## Design Notes

Tailwind v4 is CSS-first: `@theme` *is* the token engine (generates `bg-navy` etc.), so a TS file exporting hex would create a second source of truth — `theme.ts` therefore exports `var()` references only, and the dead v3 config is deleted rather than synced. `FOOTER_NAV` stays a sibling of `NAVIGATION` because its labels/grouping differ editorially.

## Verification

**Commands:**
- `npm run build` -- expected: exit 0; `dist` page set unchanged vs. pre-refactor baseline.
- `grep -rn "utils/siteConfig" src astro.config.mjs` -- expected: no output.
- `grep -rniE "#(1B2A4A|0277BD|FBC02D|E53935)" src/components src/layouts src/pages` -- expected: no output.
- `git diff --stat public/admin src/content` -- expected: empty.

**Manual checks:**
- `npm run dev`: mega-menu, mobile menu, footer sections render identically; contact-form fallback shows correct phone.

## Suggested Review Order

**Nguồn sự thật mới (src/config/)**

- Entry point: toàn bộ identity chuyển nguyên trạng + 4 trường mới (defaultDescription/defaultOgImage/rssTitle/socialLinks)
  [`site.ts:64`](../../src/config/site.ts#L64)

- Interface mở rộng — chỉ bổ sung trường, không đổi trường cũ
  [`site.ts:35`](../../src/config/site.ts#L35)

- FOOTER_NAV hút về từ 50 dòng inline của Footer, giá trị byte-identical, thêm type FooterNavSection
  [`navigation.ts:93`](../../src/config/navigation.ts#L93)

- Catalog dịch vụ (drive các route động) tách module riêng
  [`services.ts:88`](../../src/config/services.ts#L88)

- Token chỉ là tham chiếu `var(--color-*)` — hex sống duy nhất trong `@theme`
  [`theme.ts:9`](../../src/config/theme.ts#L9)

**Theme một nguồn (Tailwind v4 CSS-first)**

- `--font-sans` vào `@theme`, JP system stack giữ nguyên
  [`global.css:22`](../../src/styles/global.css#L22)

- `html` tiêu thụ token thay vì chuỗi font lặp
  [`global.css:35`](../../src/styles/global.css#L35)

- `tailwind.config.mjs` (xóa — không link được): config v3 chết, không được v4 load, giá trị đã lệch

**Client fallback + patch từ review (rủi ro cao nhất)**

- Phone nội suy lúc build, có escape vì đích đến là innerHTML
  [`ContactFormSection.astro:17`](../../src/components/ContactFormSection.astro#L17)

- Patch AC2: nhánh `catch` cũng đọc `data-error-html` — hết hardcode phone (cả 3 reviewer hội tụ)
  [`ContactFormSection.astro:161`](../../src/components/ContactFormSection.astro#L161)

- Patch: key blogDateMap dựng bằng `new URL()` — trailing slash trong siteUrl không thể âm thầm rơi lastmod
  [`astro.config.mjs:25`](../../astro.config.mjs#L25)

- `site:` đọc từ config qua import TS (esbuild bundling của Astro xử lý được)
  [`astro.config.mjs:33`](../../astro.config.mjs#L33)

**Wiring cơ học (36 file import)**

- Alias `@config/*` — Astro resolve tsconfig paths native
  [`tsconfig.json:15`](../../tsconfig.json#L15)

- Footer giờ chỉ import — khối inline biến mất
  [`Footer.astro:3`](../../src/components/Footer.astro#L3)

- Schema.org đọc identity từ module mới
  [`schema.ts:1`](../../src/utils/schema.ts#L1)

- Default ogImage + RSS title hết hardcode
  [`BaseLayout.astro:19`](../../src/layouts/BaseLayout.astro#L19)

- `src/utils/siteConfig.ts` (xóa — không link được): monolith 301 dòng, không để shim; grep `utils/siteConfig` = 0
