---
project_name: 'star-light'
user_name: 'Luonghailam'
date: '2026-08-25'
sections_completed:
  [
    'technology_stack',
    'language_rules',
    'framework_rules',
    'testing_rules',
    'quality_rules',
    'workflow_rules',
    'anti_patterns',
  ]
existing_patterns_found: 14
status: 'complete'
rule_count: 62
optimized_for_llm: true
---

# Project Context for AI Agents

_This file contains critical rules and patterns that AI agents must follow when implementing code in this project. Focus on unobvious details that agents might otherwise miss._

---

## Technology Stack & Versions

**Core:**
- Astro ^5.18.1 — static output (`output: 'static'`), Content Layer API (`glob()` loaders), sharp image service
- Tailwind CSS ^4.2.4 — via `@tailwindcss/vite` plugin (v4: NO `tailwind.config.js`; theme lives in CSS `@theme` in `src/styles/global.css`)
- TypeScript — extends `astro/tsconfigs/strict`; path alias `@config/*` → `src/config/*`
- React ^19.2.6 + @astrojs/react ^4.4.2 — ONLY for interactive islands (currently just `ServiceSlider.tsx`); everything else is `.astro` with zero client JS

**Key dependencies:**
- @astrojs/sitemap ^3.7.2 — custom `serialize()` injects per-page `lastmod` from blog frontmatter (see `astro.config.mjs`)
- @astrojs/rss ^4.0.19 — RSS feed for blog
- @formspree/react ^3.0.0 — contact form submission backend
- embla-carousel-react ^8.6.0 + swiper ^12.1.4 — carousels
- Playwright ^1.60.0 (dev) — E2E tests
- Decap CMS — admin UI under `/admin`, GitHub-backed (cms-auth/ folder)

**Version constraints agents must respect:**
- Tailwind v4 syntax only — `@import "tailwindcss"`, `@theme` blocks. Never generate v3-style `tailwind.config.js` or `@tailwind base/components/utilities` directives.
- Astro 5 Content Layer — collections defined with `glob()` loader in `src/content.config.ts` (root-level, NOT the legacy `src/content/config.ts` pattern). Zod imported from `astro/zod`.
- React 19 — `@types/react` ^19; islands use `client:*` directives from Astro, never rendered by default.
- Node built-ins are used in `astro.config.mjs` (build-time only) — never in component/page code that ships to the client.

## Critical Implementation Rules

### Language-Specific Rules (TypeScript / Astro)

- TypeScript strict mode (`astro/tsconfigs/strict`) — no `any`, no implicit returns. Type errors fail the build.
- Import config via alias: `import { SITE_CONFIG } from '@config/site'` — NOT relative paths like `../config/site`. Alias covers `src/config/*` only; other imports (components, assets, utils) stay relative.
- Astro components declare an inline `interface Props` in frontmatter; destructure with defaults for optional props: `const { variant, showBadge = true } = Astro.props;`. Required props get no default.
- Variant props are string enum unions (`variant: 'full-width' | 'compact' | 'sticky'`), never multiple booleans for mutually exclusive states.
- Content collection types come from `astro:content` (`CollectionEntry<'services'>`) — never hand-write shapes that duplicate Zod schemas.
- Formatters in `src/utils/formatters.ts` throw `TypeError` on invalid dates — call sites pass validated frontmatter dates; do not wrap in try/catch, let the build fail loudly.
- Money/date formatting is Japanese-locale: `formatPrice()` → `¥1,100` (via `toLocaleString('ja-JP')`), `formatDate()` → `2026年5月7日`. Never format inline — always use these utilities.
- Build-time-only code (Node `fs`, `URL` from `node:`) is allowed ONLY in `astro.config.mjs` and `.mjs` build utilities — never in `src/pages` or components.

### Framework-Specific Rules (Astro / Tailwind v4 / React Islands)

**Astro:**
- Static-first: components ship ZERO client JS by default. Add interactivity only via React islands with `client:visible` (the only hydration directive used in this codebase — prefer it over `client:load`).
- Small interactive behaviors (mobile menu toggle, FAQ accordion) use vanilla `<script>` tags in `.astro` files — do NOT create a React island for trivial DOM toggling.
- Dynamic routes use `getStaticPaths()` reading from content collections (`src/pages/[category]/[service].astro`). New page types follow this pattern — no SSR, no server endpoints.
- Layout: every page wraps in `BaseLayout.astro` (handles `<head>`, meta, OG tags, JSON-LD slot, Header/Footer).

**Tailwind v4 + design tokens:**
- Hex colors exist in exactly ONE place: the `@theme` block in `src/styles/global.css`. Tailwind generates utilities (`bg-navy`, `text-water`) from it.
- In TS/JSX/inline styles, use `THEME` from `@config/theme` (exposes `var(--color-*)` strings) — NEVER hardcode hex values anywhere else.
- Real-world styling is a hybrid (deviation from architecture.md): Tailwind utilities for layout + inline `style` with CSS vars for precise pixel work. Mobile fluid sizing uses the `--u` unit trick: `style="--u:min(2.6667vw,11px)"` then `calc(var(--u)*N)`. Follow this pattern for pixel-perfect mobile sections.
- A few custom classes exist in `global.css` for Japanese typography and auto-numbered article headings (`.article-numbered`) — extend there, never with `@apply`.

**React islands:**
- React 19 function components only, `.tsx` in `src/components/`. Keep islands leaf-level and presentation-focused; data is passed as props from `.astro` (islands never fetch).

**Content & images:**
- New content types = new collection in `src/content.config.ts` with Zod schema + `glob()` loader. Structured data (JSON) vs prose (Markdown) — match existing split.
- Content images live in `src/assets/images/` and go through Astro `<Image>` (sharp, webp). Raw `<img>` is allowed ONLY for decorative SVGs served from `/public` (empty `alt`, `aria-hidden` where applicable).
- Hero/LCP image: `loading="eager"` + `fetchpriority="high"`; everything else lazy. Every image needs explicit width/height (CLS).

**SEO plumbing:**
- JSON-LD only via generator functions in `src/utils/schema.ts` — never inline JSON-LD in pages.
- Sitemap lastmod comes from blog frontmatter via `astro.config.mjs` `serialize()` — adding dated content types means extending that map.

### Testing Rules

- There is NO automated test suite (no unit tests, no Playwright config, no spec files). Playwright in devDependencies is used ad-hoc for screenshots/Lighthouse audits only.
- The de-facto quality gate is `npm run build`: TypeScript strict errors and Zod content-schema violations fail the build. ALWAYS run `npm run build` to verify changes before declaring work done — do not rely on `npm run dev` alone (dev server skips full content validation and prerendering of all routes).
- Content changes: build failure output names the offending file/field via Zod — fix the content or schema, never loosen a schema just to make the build pass without flagging it.
- Visual/behavioral verification is manual: check both mobile (375px) and desktop (1240px+) breakpoints — most components have separate mobile/desktop markup branches (`md:hidden` / `hidden md:block`).
- Performance is a protected budget: mobile Lighthouse is 99–100 (story 6.3). Any change adding client JS, webfonts, or unoptimized images must be justified — re-run a Lighthouse audit when touching hero, layout, or adding an island.
- If a real E2E suite is introduced later, use the already-installed Playwright and place specs outside `src/` (e.g. `tests/`), with `playwright.config.ts` at repo root.

### Code Quality & Style Rules

**Naming:**
- Components: PascalCase (`ServiceCard.astro`, `CTABlock.astro`); React islands: PascalCase `.tsx`.
- Pages & content files: kebab-case (`[service].astro`, `case-001.md`); utils/config: camelCase (`formatters.ts`, `site.ts`).
- Content collection fields: camelCase; booleans prefixed `is`/`has`; dates as ISO strings in frontmatter.

**Formatting/linting:**
- NO ESLint/Prettier/Biome configured. Match surrounding code style manually: 2-space indent, single quotes in TS, trailing semicolons. Do not add linter configs unprompted.

**Language conventions (trilingual codebase — follow strictly):**
- Code comments: Vietnamese (existing convention throughout `site.ts`, `theme.ts`, `global.css`, `astro.config.mjs`).
- User-facing strings, alt text, form errors, aria-labels: Japanese (this is a Japanese-market site).
- Documentation files, commit messages, BMad artifacts: English.

**Organization:**
- `src/components/` is FLAT — no subfolders. `src/config/` is the single source of truth for site data (site.ts), navigation (navigation.ts), service definitions (services.ts), design tokens (theme.ts). Never hardcode phone numbers, company names, or URLs in components.
- Legacy note: `src/data/*.ts` (blogData, caseVoiceData, companyData) predates the config refactor — when touching these, prefer migrating data toward `src/config/` or content collections rather than growing them.
- Comments explain WHY (constraints, gotchas), not WHAT. Notable existing style: comments document CSS tricks and Japanese-typography reasoning in place.

**Commit style (from git history):**
- Conventional commits: `feat:`, `fix:`, `perf:`, `refactor:`, `docs:` + concise imperative summary in English.

### Development Workflow Rules

**Deployment (Vercel):**
- Production is Vercel static hosting, domain `www.setsubi-pro.net` (apex 301s to www via `vercel.json`). Story 6-4 originally targeted Cloudflare Pages — Vercel is the current reality; `vercel.json` is the deploy config source of truth.
- `vercel.json` carries: security headers (HSTS, X-Frame-Options, etc.), a strict CSP, and a large SEO 301-redirect map (old slugs → new slugs, Japanese-encoded category URLs). When renaming/removing a published URL, ADD a 301 redirect entry — never delete published routes silently.
- CSP allowlist is minimal: scripts `'self' 'unsafe-inline'`; connect/form-action only `'self'` + `https://formspree.io`; fonts from Google Fonts hosts only. Adding ANY external script, analytics, or API call requires updating the CSP in `vercel.json` in the same change, or it will silently break in production (works fine in dev).
- `/admin` (Decap CMS) is CSP-exempt by pattern `/((?!admin).*)` and excluded from sitemap. CMS GitHub OAuth runs as a separate Cloudflare Worker in `cms-auth/` (wrangler.toml) — deployed independently, not part of the Astro build.

**Git:**
- Trunk-based: work lands on `main` via direct conventional commits; feature branches (`feat/...`) used occasionally.
- Never commit build output (`dist/`), `node_modules/`, or `test-results/`.

**Local dev:**
- `npm run dev` for iteration; `npm run build` before finishing (the true validation gate); `npm run preview` to smoke-test the built output including redirects/headers behavior locally (note: `vercel.json` headers/redirects do NOT apply in preview — verify those on a Vercel preview deploy).

**BMad process:**
- Planning artifacts in `_bmad-output/planning-artifacts/`, story specs and sprint status in `_bmad-output/implementation-artifacts/` (`sprint-status.yaml` tracks story states: backlog → review → done).

### Critical Don't-Miss Rules

**Anti-patterns (DO NOT):**
- ❌ Hardcode the phone number, company name, or site URL — always `SITE_CONFIG` from `@config/site`.
- ❌ Re-add webfont loading. Story 6.3 deliberately dropped Google Fonts for a JP system font stack (`--font-sans` in `@theme`) to eliminate CLS — the CSP still allowlists Google Fonts hosts, but that is legacy; do not reintroduce webfonts.
- ❌ Resurrect the `pest` service category. It was removed by spec (`spec-remove-pest-control.md`); valid categories are exactly `'electricity' | 'water'` (Zod enum in `src/content.config.ts`).
- ❌ Edit `src/content/config.ts` — it is a LEGACY duplicate. The live schema file is root-level `src/content.config.ts`. (Cleanup candidate.)
- ❌ Treat `src/assets/images/hero/.astro/` and `src/assets/images/hero/node_modules/` as source — they are stray build artifacts accidentally nested under assets. Never import from them. (Cleanup candidate.)
- ❌ Add client-side JS to components that don't need interactivity; ❌ inline JSON-LD; ❌ `@apply`; ❌ boolean props for variants; ❌ English alt text on content images.

**Edge cases agents must handle:**
- Japanese text wrapping: use existing `global.css` helpers (`overflow-wrap-anywhere`, `.article-numbered` overrides) — Japanese has no spaces, naive CSS causes horizontal overflow on mobile.
- Forms: suppress submit during IME composition (`compositionstart`/`compositionend`); inputs keep `font-size: 16px` (prevents iOS auto-zoom); error messages in Japanese with 「必須」 badge pattern.
- New anchor-linked sections: add the section `id` to the `scroll-margin-top: 140px` selector list in `global.css`, or the sticky header will cover the anchor target.
- URLs with Japanese characters must have BOTH raw and percent-encoded redirect entries in `vercel.json` (see existing pairs).

**Security:**
- Static site — no secrets in the repo or client code. The only runtime endpoints are Formspree (contact) and the `cms-auth` Cloudflare Worker (OAuth). Any new external endpoint must be added to CSP `connect-src`/`form-action`.
- Do not weaken `vercel.json` security headers; `/admin` stays out of the sitemap and behind GitHub OAuth.

**Performance gotchas:**
- Mobile Lighthouse 99–100 is the protected baseline. Biggest regression risks: adding webfonts, eager-loading below-fold images, adding heavy islands, unoptimized new images (use Astro `<Image>` + webp; slider image quality is deliberately trimmed).
- Only ONE island hydration directive is in use: `client:visible`. `client:load` would delay LCP — justify any exception.

**Pivot note (racing-analysis direction):**
- Rules above marked as Japanese-market/domain-specific (JP alt text, 「必須」 forms, service categories, redirect map, Formspree) belong to the CURRENT star-light product. The structural rules (config centralization, tokens-in-`@theme`, content collections + Zod, static-first islands, CSP discipline, build-as-quality-gate) are the reusable foundation for any future product built on this codebase.

---

## Usage Guidelines

**For AI Agents:**

- Read this file before implementing any code
- Follow ALL rules exactly as documented
- When in doubt, prefer the more restrictive option
- Update this file if new patterns emerge

**For Humans:**

- Keep this file lean and focused on agent needs
- Update when technology stack changes
- Review quarterly for outdated rules
- Remove rules that become obvious over time

Last Updated: 2026-08-25
