# Story 6.4: Security Headers and Vercel Production Deployment

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->
<!-- DEPLOYMENT PLATFORM CORRECTION: The epic/architecture docs say "Cloudflare Pages". The project actually deploys to VERCEL via GitHub-connected CI/CD. All deployment + headers guidance below targets Vercel. -->

## Story

As a site owner,
I want the site deployed to production with proper security headers,
so that the site is live, secure, and serving visitors from Vercel's edge network.

## Acceptance Criteria

1. **Given** the site is deployed to Vercel **When** any page is requested **Then** HTTPS is enforced via Vercel automatic SSL (NFR9)
2. **And** Content-Security-Policy is configured whitelisting `fonts.googleapis.com`, `fonts.gstatic.com`, `maps.googleapis.com`, `formspree.io` (NFR12), and the CSP does NOT break the existing inline/module scripts shipped by Astro + React islands
3. **And** no sensitive data is stored on the website (NFR11) — verify no secrets are committed, all secrets come from env vars
4. **Given** the Git repository `main` branch **When** a push is made **Then** Vercel auto-builds and deploys the production deployment **And** non-main branch pushes / PRs generate automatic Vercel preview deployments
5. **Given** environment configuration **Then** `PUBLIC_FORMSPREE_ID` and any Maps embed key are set as Vercel environment variables **And** `.env.example` documents all required variables
6. **And** baseline security response headers are present in production: `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `X-Frame-Options` (or CSP `frame-ancestors`), and a least-privilege `Permissions-Policy`

## Tasks / Subtasks

- [x] Task 1: Choose CSP delivery mechanism after auditing built output (AC: #2, #6)
  - [x] 1.1 Audited `dist/*.html`: homepage has 6 inline `<script>` blocks (Astro island bootstrap + component scripts), 1 inline `<style>`, **110 inline `style=` attributes**, and **1 inline `onload=` handler** (the BaseLayout font-preload swap, present on all 69 pages).
  - [x] 1.2 Determined Astro `experimental.csp` is NOT viable here: its `CspDirective` allow-list excludes `script-src`/`style-src`/`style-src-attr`, so script/style are managed only by auto-generated hashes. Hashed `style-src` nullifies `'unsafe-inline'`, which would block all 110 inline `style=` attributes and the 69 `onload=` handlers — no config escape hatch. Pivoted to a hand-written CSP in `vercel.json`.
  - [x] 1.3 CSP whitelist delivered in `vercel.json` for public routes: `script-src 'self' 'unsafe-inline'` (required — inline island scripts cannot be hashed in a static header), `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`, `font-src 'self' https://fonts.gstatic.com`, `connect-src 'self' https://formspree.io`, `form-action 'self' https://formspree.io`, `img-src 'self' data:`, plus `default-src 'self'`, `base-uri 'self'`, `object-src 'none'`, `frame-ancestors 'none'`, `upgrade-insecure-requests`. `maps.googleapis.com` intentionally OMITTED (no Maps embed exists — see Task 4.2).
  - [x] 1.4 CSP is scoped to `"/((?!admin).*)"` so it does NOT apply to `/admin/*` (Decap CMS + Looker Studio iframe + Google APIs from Epic 7 would otherwise break). Verified route-matching with a regex test: public routes get CSP, `/admin` + `/admin/analytics` skip it. Build still succeeds (70 pages).
- [x] Task 2: Add `vercel.json` with transport + frame headers (AC: #1, #6)
  - [x] 2.1 Created `vercel.json` at repo root. Transport/frame headers apply to ALL routes (`"source": "/(.*)"`): `Strict-Transport-Security: max-age=31536000; includeSubDomains`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: SAMEORIGIN`, `Permissions-Policy: geolocation=(), camera=(), microphone=()`. Did NOT create `public/_headers` (Vercel ignores it).
  - [x] 2.2 CSP lives in exactly ONE place (`vercel.json`, public-route-scoped); transport/frame headers in the global `vercel.json` block. No Astro meta CSP (mechanism rejected in 1.2), so no duplication risk.
- [x] Task 3: HTTPS enforcement + auto-deploy config (AC: #1, #4)
  - [x] 3.1 Documented Vercel project settings (dashboard, not repo files): framework preset = Astro, build command = `npm run build`, output dir = `dist` (auto-detected; no `@astrojs/vercel` adapter since `output: 'static'`), production branch = `main`. HTTPS/SSL is automatic on Vercel; HSTS header added in Task 2. (No code/repo change beyond `vercel.json`.)
  - [x] 3.2 GitHub ↔ Vercel integration relies on Vercel's native Git connection: push to `main` → production deploy; other branches / PRs → automatic preview deployments. No `.github/workflows/` exists, so native Git integration is assumed (not a custom Actions pipeline). `vercel.json` is committed so headers apply to every deploy.
- [x] Task 4: Environment variable hygiene (AC: #3, #5)
  - [x] 4.1 Confirmed `PUBLIC_FORMSPREE_ID` is the ONLY env var consumed (`src/components/ContactFormSection.astro:9`); grep of all `import.meta.env.*` usage returned only that one reference.
  - [x] 4.2 No Google Maps embed exists — AreaMap renders a static SVG (`/images/map/japan-areas.svg`); the only `maps.googleapis.com` reference was a dead `preconnect` in BaseLayout. Removed that preconnect; dropped `maps.googleapis.com` from the CSP; no Maps key added to `.env.example`.
  - [x] 4.3 Updated `.env.example` with explanatory comments for `PUBLIC_FORMSPREE_ID`. Confirmed `.env` and `.env.production` are git-ignored (`.gitignore:17-18`).
  - [x] 4.4 No secrets committed — only env var is the public Formspree form ID (prefixed `PUBLIC_`, safe to expose); real value set in Vercel dashboard.
- [~] Task 5: Verify (AC: #1, #2, #6) — local verification done; live-deploy acceptance pending operator
  - [x] 5.1 Verified CSP correctness by static analysis: enumerated ALL external origins on public pages (`fonts.googleapis.com`, `fonts.gstatic.com`, Formspree via `fetch`; `schema.org` is only a JSON-LD string, not a fetched resource) — every one is covered by the policy; inline scripts/styles covered by `'unsafe-inline'`. NOTE: `npm run preview` (Astro) does NOT emit `vercel.json` headers, so the live in-browser CSP console check can only be observed on a Vercel deployment / `vercel dev` — see 5.2.
  - [ ] 5.2 POST-DEPLOY (operator): after the first Vercel deploy, run `curl -I https://<deployment-url>/` and a non-root path to confirm all Task-2 headers + the CSP (on public routes, absent on `/admin`) are present. Cannot be executed from the dev environment (no Vercel deployment available here).
  - [ ] 5.3 POST-DEPLOY (operator): submit the contact form on the deployed URL (with a real `PUBLIC_FORMSPREE_ID`) to confirm CSP `form-action`/`connect-src` permits the Formspree POST.

### Review Findings

- [x] [Review][Patch] Anchor the `/admin` CSP exclusion regex [vercel.json:30] — `"source": "/((?!admin).*)"` stripped the CSP from ANY path whose first segment merely *starts with* `admin` (e.g. `/administration`, `/admin-guide`), not just the `/admin` tree. Fixed to `"/((?!admin(/|$)).*)"` so the lookahead is scoped to a full path segment. (sources: blind+edge)
- [x] [Review][Defer] Post-deploy live verification (curl headers + Formspree submission) [Task 5.2/5.3] — deferred, requires a live Vercel deployment; cannot run from dev env. Already tracked as unchecked Tasks 5.2/5.3.

## Dev Notes

### CRITICAL: Astro version mismatch with the epic text
- The epic/architecture text says "Astro 6 CSP API". **This project is on Astro `^5.18.1`** (see `package.json`). Astro 5.18 ships CSP as `experimental.csp` (stabilized later in v6). Use the experimental flag — do NOT attempt to upgrade Astro to 6 for this story.
- Why the CSP API (and not just a hand-written CSP in `_headers`): the built pages contain **inline `<script>` and `<script type="module">` tags** emitted by Astro's island hydration (HeroCarousel, ContactFormSection, MobileMenu). A hand-written `script-src 'self'` CSP would **break the site** by blocking those inline scripts. Astro's CSP API computes per-build SHA-256 hashes for every inline script/style and injects them, so the site keeps working without `'unsafe-inline'`. This is the single most likely way to break production — get it right.
- Astro static-mode CSP is delivered as a `<meta http-equiv="content-security-policy">` tag. Meta-CSP cannot express `frame-ancestors`, HSTS, or `report-uri`. Therefore split responsibilities: **CSP → Astro meta** (for inline-hash correctness), **HSTS / X-Frame-Options / X-Content-Type-Options / Referrer-Policy / Permissions-Policy → `vercel.json` `headers`**.

### Current state of files this story touches
- `astro.config.mjs` (UPDATE) — currently: `site: 'https://www.setsubi-pro.net'`, `output: 'static'`, `compressHTML: true`, integrations `[sitemap(), react()]`, sharp image service. Add `experimental: { csp: { ... } }`. Preserve everything else. Note: static output means NO `@astrojs/vercel` adapter is required — Vercel serves the prerendered `dist/` directly.
- `vercel.json` (NEW) — does not exist yet. Lives at repo root; Vercel reads its `headers` array and applies them to the static deployment. **Do NOT create `public/_headers`** — that is a Cloudflare/Netlify convention and Vercel ignores it.
- `.env.example` (UPDATE) — currently only `PUBLIC_FORMSPREE_ID=your_formspree_id_here`. Add comments; add Maps key only if Maps is actually used. Production values are set in the Vercel dashboard (Project → Settings → Environment Variables), not committed.
- `public/robots.txt` (NO CHANGE — already correct) — already allows all, disallows `/admin/`, points to `https://www.setsubi-pro.net/sitemap-index.xml`. Do not regress this.
- No `vercel.json`, `wrangler.toml`, `_redirects`, or `.github/workflows/` exist yet. Deployment is **Vercel via GitHub-connected CI/CD** (the epic/architecture text saying "Cloudflare Pages" is outdated — follow Vercel here).

### External origins actually in use (basis for the CSP whitelist)
- **Google Fonts** (Noto Sans JP) — referenced in `src/layouts/BaseLayout.astro`. Needs `style-src fonts.googleapis.com`, `font-src fonts.gstatic.com`.
- **Formspree** — `src/components/ContactFormSection.astro` reads `import.meta.env.PUBLIC_FORMSPREE_ID` and POSTs to Formspree. Needs `form-action`/`connect-src formspree.io` (verify exact endpoint host — Formspree posts to `https://formspree.io/f/{id}`).
- **Google Maps** — the epic lists `maps.googleapis.com`, but `src/components/AreaMap.astro` currently has **no `<iframe>`/maps embed** (the area map appears to be a static image/SVG). Verify before adding Maps to the CSP — including an origin you don't use is harmless but documenting a key you don't need is misleading. Resolve in Task 4.2.

### Deployment / CI-CD (Vercel via GitHub)
- Auto-build on push to `main` → production deploy; pushes to other branches / PRs → automatic preview deployments — default Vercel Git integration behavior, no config file required for the build itself (Task 3 documents dashboard settings; `vercel.json` is only for headers).
- Build command `npm run build` → `astro build` → output `dist/`. Static output, so Vercel serves prerendered files from its edge/CDN — no serverless adapter. Previous story confirmed build time ~3.4–3.6s.
- HTTPS: Vercel provisions automatic SSL for all deployments and custom domains — no toggle, no code change (NFR9). HSTS header is added in Task 2.
- Git remote: `git@github.com:HaiLammm/star-light-project.git`.

### Scope boundaries (do NOT do these here)
- WCAG/accessibility work is Story 6.5 — out of scope.
- Sitemap/robots/meta/canonical are Story 6.2 (`robots.txt` already exists) — do not rework SEO here.
- Performance/image optimization is Story 6.3 (done) — do not touch the image pipeline.
- Do not add reCAPTCHA — architecture explicitly chose Formspree honeypot only (NFR, JS-payload reasons).

### Testing standards
- This is a static Astro site; there is no unit-test harness in the repo. Verification is build + manual browser check (Task 5). The decisive test is **zero CSP console violations** with all islands functional, plus `curl -I` showing the headers.

### Project Structure Notes
- `vercel.json` lives at the repo root (Vercel's config location). `public/robots.txt` is served verbatim from `dist/` root by Vercel — consistent with how `robots.txt` already works.
- CSP config lives in `astro.config.mjs` alongside existing config; this is the canonical Astro location, no new module needed.
- Two intentional variances from the planning docs, both documented above: (1) "Astro 6 CSP API" → Astro 5.18 `experimental.csp`; (2) "Cloudflare Pages" → Vercel (`vercel.json` headers, not `public/_headers`).

### References
- [Source: _bmad-output/planning-artifacts/epics.md#Story 6.4] — acceptance criteria, CSP whitelist
- [Source: _bmad-output/planning-artifacts/architecture.md#Authentication & Security (lines 174-183)] — CSP whitelist, HTTPS, no sensitive data
- [Source: _bmad-output/planning-artifacts/architecture.md#Infrastructure & Deployment (lines 201-209)] — Cloudflare Pages, branch previews, env vars
- [Source: package.json] — Astro `^5.18.1` (NOT 6); build scripts
- [Source: astro.config.mjs] — current config to extend
- [Source: src/components/ContactFormSection.astro:9] — `PUBLIC_FORMSPREE_ID` consumption
- [Source: public/robots.txt] — existing, correct; do not regress
- [Source: _bmad-output/implementation-artifacts/6-3-performance-optimization-and-core-web-vitals.md] — React runtime ~56.9KB JS island cost; build ~3.5s

## Dev Agent Record

### Agent Model Used

Claude Opus 4.7

### Debug Log References

- `npm run build` → 70 pages, ~4.5s, zero errors (after changes).
- Built-output audit (homepage): 6 inline `<script>` blocks, 1 inline `<style>`, 110 inline `style=` attributes, 1 inline `onload=` handler; `onload=` present on all 69 HTML pages.
- `CspDirective` allow-list in `node_modules/astro/dist/core/csp/config.d.ts` excludes `script-src`/`style-src`/`style-src-attr` → Astro CSP cannot allow inline styles/handlers → mechanism rejected.
- External origins on public pages (enumerated from `dist`, excl `/admin`): `fonts.googleapis.com`, `fonts.gstatic.com`, `setsubi-pro.net` (self), `schema.org` (JSON-LD string only), `maps.googleapis.com` (dead preconnect, removed). No GA/GTM on public pages.
- CSP route-scope regex test: `/`, `/water/`, `/contact/`, `/electricity/breaker/` → CSP applied; `/admin`, `/admin/analytics` → CSP skipped.
- `.gitignore:17-18` ignores `.env` and `.env.production`.

### Completion Notes List

- **CSP delivery pivoted from the planned Astro `experimental.csp` to a hand-written CSP in `vercel.json`.** Reason: Astro's CSP API only manages `script-src`/`style-src` via auto-generated hashes, and its `CspDirective` allow-list has no `style-src-attr`/`script-src-attr`. Hashed `style-src` voids `'unsafe-inline'`, which would block this codebase's 110 inline `style=` attributes and 69 `onload=` handlers with no config escape. `vercel.json` gives full control of the CSP string.
- **Security tradeoff (needs reviewer awareness):** `script-src` uses `'unsafe-inline'` because Astro's inline island-bootstrap scripts cannot be hashed in a static header (hashes change per build). Mitigated by locking down `default-src`, `connect-src`, `form-action`, `frame-ancestors 'none'`, `object-src 'none'`, `base-uri 'self'` — so even with inline scripts allowed, exfiltration/clickjacking/base-hijack vectors are constrained. The site has no user-generated content, so the inline-script injection surface is minimal.
- **CSP scoped to `/((?!admin).*)`** to avoid breaking Epic 7's `/admin` (Decap CMS loaded from CDN) and `/admin/analytics` (Looker Studio iframe + `apis.google.com`). Transport/frame headers still apply to `/admin` (harmless: `X-Frame-Options: SAMEORIGIN` only restricts the admin page being framed, not it framing Google).
- **`maps.googleapis.com` omitted from the CSP** (AC #2 lists it, but no Maps embed exists — AreaMap uses a static SVG). Removed the dead `maps.googleapis.com` preconnect from BaseLayout. This is an intentional, documented deviation from AC #2's literal whitelist.
- **Deviations from planning docs, both intentional & documented:** (1) "Astro 6 CSP API" → not used (infeasible, see above); (2) "Cloudflare Pages" → Vercel.
- **Open (deploy-time acceptance, operator):** 5.2 `curl -I` header check and 5.3 contact-form Formspree submission require a live Vercel deployment, which cannot be performed from this dev environment. The CSP is verified correct by static origin enumeration + route-match test; the in-browser CSP console check (5.1 live) likewise needs the Vercel runtime since `astro preview` does not emit `vercel.json` headers.

### File List

- `vercel.json` (NEW) — security headers: global transport/frame headers + public-route-scoped Content-Security-Policy
- `.env.example` (MODIFIED) — documented `PUBLIC_FORMSPREE_ID` with comments
- `src/layouts/BaseLayout.astro` (MODIFIED) — removed dead `maps.googleapis.com` preconnect

### Change Log

- 2026-05-29: Added production security headers via `vercel.json` (HSTS, X-Content-Type-Options, Referrer-Policy, X-Frame-Options, Permissions-Policy) and a public-route CSP whitelisting Google Fonts + Formspree. CSP excludes `/admin` to preserve Epic 7 CMS/analytics. Documented env vars; removed dead Maps preconnect.
