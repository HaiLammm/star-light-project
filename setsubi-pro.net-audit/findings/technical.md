# Technical SEO Audit — setsubi-pro.net
**Audited:** 2026-09-08  
**Tool:** claude-seo render_page.py + sitemap_discovery.py + curl header analysis  
**Scope:** Homepage, article pages, 404 page, redirect chains, vercel.json

---

## Technical Score: 72 / 100

### Category Scores

| Category | Score | Status |
|---|---|---|
| Crawlability | 90/100 | Pass |
| Indexability | 70/100 | Warning |
| Security Headers | 65/100 | Warning |
| URL Structure & Redirects | 78/100 | Warning |
| Mobile Friendliness | 88/100 | Pass |
| Core Web Vitals Indicators | 72/100 | Warning |
| Structured Data | 85/100 | Pass |
| JavaScript Rendering | 95/100 | Pass |
| IndexNow Protocol | 0/100 | Fail |

---

## Prioritized Issues

### Critical

None identified. The site is fundamentally sound — HTTPS enforced, robots.txt clean, sitemap valid, static SSG output, and structured data present.

---

### High

#### H1 — 404 Page Is Indexable (No noindex Directive)

The custom 404 page at `/404/` is served with HTTP 404 status (correct) but contains no `noindex` robots directive. Its `<head>` includes:

- `canonical` pointing to `https://www.setsubi-pro.net/404/`
- `hreflang ja` and `x-default` pointing to `/404/`
- `BreadcrumbList` JSON-LD treating it as a real page
- No `<meta name="robots" content="noindex,follow">`

Google may index `/404/` as a valid page since it receives signals that identify it as a canonical destination. This is a low-probability crawl path but a configuration error worth fixing.

**Fix:** Add `<meta name="robots" content="noindex,follow">` to the 404 layout. In Astro, this is in `src/layouts/` or wherever the 404 page head is rendered. Also remove hreflang alternates from the 404 template.

---

#### H2 — 9 Images Missing Width/Height Attributes (CLS Risk)

On the homepage, 9 `<img>` elements have no `width` or `height` attributes. Without explicit dimensions, the browser cannot reserve space before the image loads, causing layout shifts (CLS). This is a direct contributor to poor CLS scores.

Affected image types include slider/carousel images and some section images.

**Fix:** Add `width` and `height` to every `<img>` tag. For images where dimensions vary by breakpoint, use CSS `aspect-ratio` as a fallback. Astro's `<Image />` component outputs dimensions automatically — prefer it over raw `<img>` tags.

---

#### H3 — X-Frame-Options Contradicts CSP frame-ancestors

`vercel.json` sets both:
- `X-Frame-Options: SAMEORIGIN` (allows framing from same origin)
- CSP `frame-ancestors 'none'` (blocks all framing)

These are contradictory. In modern browsers, CSP `frame-ancestors` takes precedence, making `X-Frame-Options: SAMEORIGIN` a false signal. In older browsers that only read `X-Frame-Options`, the site can be framed from the same origin even though the intent appears to be "no framing at all."

**Fix:** Decide on intent. If no framing is desired:
- Change `X-Frame-Options` to `DENY` to match `frame-ancestors 'none'`

If same-origin framing is needed:
- Change CSP `frame-ancestors` to `'self'` and keep `X-Frame-Options: SAMEORIGIN`

---

#### H4 — 2-Hop Redirect Chain for HTTP Non-www

`http://setsubi-pro.net/` traverses two hops before reaching the canonical URL:

```
http://setsubi-pro.net/   →308→   https://setsubi-pro.net/   →308→   https://www.setsubi-pro.net/
```

While each hop is a 308 (permanent) and link equity is preserved, crawlers and browsers incur two round-trips. The chain for `http://www.setsubi-pro.net/` is a clean single hop (308 → HTTPS www), so the non-www HTTP variant is the outlier.

**Fix:** Configure Vercel to redirect `http://setsubi-pro.net/` directly to `https://www.setsubi-pro.net/` in one step, bypassing the intermediate HTTPS non-www hop.

---

### Medium

#### M1 — IndexNow Protocol Not Implemented

The site actively publishes new articles via a CMS pipeline (recent publishes on 2026-09-05 and 2026-09-06). IndexNow allows near-instant URL submission to Bing, Yandex, and Naver on publish, complementing Google Search Console's URL Inspection tool.

No IndexNow key file exists at any common path (`/indexnow.txt`, `/indexnow-key.txt`). Vercel.json has no IndexNow-related configuration.

**Fix:**
1. Generate a key at https://www.bing.com/indexnow
2. Place the key file at `https://www.setsubi-pro.net/<key>.txt`
3. Integrate a POST to `https://api.indexnow.org/indexnow` in the content pipeline (`generateWorker.ts`) on each publish, submitting the new URL.

---

#### M2 — CSP Uses `unsafe-inline` for Both Scripts and Styles

The Content Security Policy allows `'unsafe-inline'` in both `script-src` and `style-src`. This negates most XSS protection the CSP header provides, since an attacker who can inject inline scripts or styles bypasses the policy.

```
script-src 'self' 'unsafe-inline'
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com
```

Astro's build outputs Tailwind as a single bundled stylesheet and deferred module scripts, making `'unsafe-inline'` potentially removable. The inline `<script>` blocks in the navigation and header are the current blocker.

**Fix (incremental):**
1. Audit all inline `<script>` blocks in Astro components. The navigation menu script and header scroll script are candidates to move to external module files.
2. Once inline scripts are eliminated, replace `'unsafe-inline'` with `'nonce-{random}'` or `'strict-dynamic'` in script-src.
3. For style-src, if no runtime inline styles are needed: remove `'unsafe-inline'` and use Astro's stylesheet link.

Note: Some inline `style=` attributes are used in the HTML (e.g., `style="background:var(--color-water)"`). These would need to also be moved to CSS classes before removing `'unsafe-inline'` from style-src.

---

#### M3 — 14 Images Without Explicit `loading` Attribute

14 `<img>` elements on the homepage have no `loading` attribute. Browsers default to eager loading for images without this attribute, meaning below-fold images load immediately and compete with above-fold resources for bandwidth.

**Fix:** Add `loading="lazy"` to all images that are not in the initial viewport. Use `loading="eager"` (or omit it) only for the LCP hero image. Astro's `<Image />` component adds `loading="lazy"` by default.

---

#### M4 — HSTS Missing `preload` Directive and Max-Age Inconsistency

Current HSTS on the canonical URL: `max-age=31536000; includeSubDomains`

Two issues:
1. No `preload` directive — the site is not submitted to (or eligible for) the HSTS preload list, meaning first-time visitors who type the domain without HTTPS can still hit an HTTP hop before being upgraded.
2. The redirect response from `https://setsubi-pro.net/` sends a different HSTS: `max-age=63072000` (no `includeSubDomains`). This inconsistency means subdomains may not receive HSTS coverage when accessed via the non-www path.

**Fix:**
1. Standardize: set `max-age=63072000; includeSubDomains` on all responses (2 years minimum for preload eligibility).
2. Add `preload` to the HSTS value, then submit to https://hstspreload.org/.
3. Ensure Vercel's HSTS header in `vercel.json` covers both the www and non-www redirect response.

---

#### M5 — Excessive Image Preloads on Homepage (6 Preloads)

The homepage `<head>` has 6 `<link rel="preload" as="image">` declarations. While preloading the LCP image is correct best practice, preloading 5 additional images can:
- Saturate bandwidth budget before render-critical CSS/JS loads
- Trigger browser warnings about unused preloads (if some images never render in the given viewport)

The two mobile/desktop variants of the hero image are correctly conditionalised with `media=` attributes, which is good. The 4 service section images (sanitary_01–04) may not be above the fold on mobile.

**Fix:** Limit preloads to the single LCP hero image pair (mobile + desktop variants with `media=` queries). Remove preloads for sanitary_01–04 and rely on `loading="eager"` with explicit dimensions instead.

---

#### M6 — Large Homepage HTML Payload (262.9 KB)

The homepage HTML document is 262.9 KB. This is large for a static page and is partly due to:
- Tailwind utility classes inlined throughout
- Navigation with full dropdown markup duplicated for desktop and mobile
- Inline JSON-LD blocks (3 blocks)
- Inline `<script>` blocks for menu behavior

While the page uses Brotli/gzip compression (Vercel handles this), the uncompressed size contributes to Time to First Byte on low-bandwidth connections.

**Fix (low priority but worth tracking):**
- Consider moving the mobile and desktop navigation into a single shared component instead of duplicating markup
- Extract the inline navigation scripts to an external file (also helps with CSP)
- Enable Brotli on Vercel — this is enabled by default; confirm it's active via `content-encoding` header

---

#### M7 — `access-control-allow-origin: *` on HTML Responses

Every HTML response includes `access-control-allow-origin: *`. This header is typically appropriate for public assets (fonts, images, JS/CSS) but is unusual on HTML documents. It exposes the HTML content to cross-origin JavaScript fetch requests, which is unnecessary for a marketing site.

**Fix:** Remove the CORS wildcard from HTML responses in `vercel.json`. This header is likely set globally by Vercel's default behavior and may need an override. If specific assets (images, fonts) need CORS, scope it to those paths only.

---

### Low

#### L1 — Non-Article Pages Missing `lastmod` in Sitemap

Service pages (`/water/`, `/electricity/`, etc.), company pages, and the homepage have no `lastmod` tag in `sitemap-0.xml`. Article pages correctly have `lastmod`. Google uses `lastmod` to prioritize recrawling; without it, Googlebot decides independently.

**Fix:** Set `lastmod` to the last build/deploy timestamp for static pages. In Astro's sitemap integration config, use `lastmod: new Date()` for pages without content-derived dates, or tie it to the last git commit date.

---

#### L2 — Sitemap Pagination Pages Lack `lastmod`

`/columns/2/`, `/columns/3/`, etc. are present in the sitemap but have no `lastmod`. Since pagination pages change every time a new article is published, they should carry a `lastmod` reflecting the publish date of the newest article on that page.

---

#### L3 — No `changefreq` in Sitemap

No `changefreq` tags are present. Google officially ignores this field, so this is not an actionable issue — but some third-party crawl tools report it as missing.

---

#### L4 — 33 Redirects in vercel.json (Maintenance Overhead)

33 URL redirect rules exist in `vercel.json`. Each rule is paired with a trailing-slash and non-trailing-slash variant. This is currently clean and correct (all return 301), but the file will become unwieldy as content grows.

**Observation:** Some redirects consolidate multiple old slugs into a single destination (e.g., three aircon gas refill variants all redirect to `air-conditioner-not-cooling/`). This is good canonicalization practice.

**Recommendation:** Document the redirect inventory and consider a comment-annotated format or a separate redirect log to track the business reason for each redirect.

---

## Passing Checks

### 1. Crawlability

- `robots.txt`: Clean — `Allow: /`, `Disallow: /admin/`, Sitemap declared and validated.
- `sitemap-index.xml`: Valid sitemapindex with one child sitemap (`sitemap-0.xml`). 112 URLs, all HTTPS, all with trailing slashes, no duplicates observed.
- Sitemap discovery: robots.txt declaration resolves to a valid, parseable sitemap. PASS (via sitemap_discovery.py).
- No `noindex` directives on service or article pages.
- No crawl traps detected in URL structure.

### 2. Indexability

- Canonical tags present and self-referencing on all checked pages.
- Paginated pages (`/columns/2/`) have unique titles ("お役立ち情報（2ページ目）"), unique descriptions, and self-referencing canonicals — correct approach.
- All hreflang alternates are `ja` + `x-default` pointing to the same URL — correct for a JP-only monolingual site.

### 3. HTTPS / SSL

- HTTP to HTTPS upgrade enforced via 308 Permanent Redirect.
- HSTS present on all responses (see M4 for improvement notes).
- CSP `upgrade-insecure-requests` directive present.

### 4. URL Structure

- URLs are clean, descriptive, and in English (SEO-friendly for international signals).
- Trailing slashes are consistent across the site and sitemap.
- URL depth: maximum 3 levels (`/columns/category/water/bath/`) — acceptable.
- No query-string parameters observed in the sitemap.
- 301 redirects in place for all known old slugs.

### 5. Mobile Friendliness

- Viewport meta tag: `width=device-width, initial-scale=1.0` — PASS.
- Dedicated mobile layout with hamburger navigation.
- Touch targets in mobile nav: `min-h-[44px]` — meets Google's 44px minimum.
- Responsive images with `srcset` and `media=` attribute on hero.
- No horizontal overflow detected in markup.

### 6. Core Web Vitals — Positive Signals

- LCP image: Correct `fetchpriority="high"`, `loading="eager"`, and `<link rel="preload">` — strong LCP optimization.
- JavaScript: Only 2 script tags on the page — Vercel Analytics (`defer`) and a module script (`type="module"`). No synchronous render-blocking scripts.
- Single CSS file: Astro bundles all styles into `/_astro/_service_.L7N4Gxt1.css` — no render-blocking stylesheet chains.
- No external web fonts: System font stack used throughout. Eliminates font-related LCP/CLS from web font loading.
- 39 of 64 homepage images have `loading="lazy"` — good lazy loading coverage.
- Fixed header uses `transition-shadow` on scroll — minimal layout impact.

### 7. Structured Data

- Homepage: `Organization` + `WebSite` (block 1), `LocalBusiness` (block 2), `FAQPage` (block 3). Comprehensive.
- Article pages: `Organization` + `WebSite`, `Article` (with `headline`, `description`, `datePublished`, `dateModified`, `author`, `publisher`, `image`, `mainEntityOfPage`), `BreadcrumbList`. Complete and valid structure.
- `LocalBusiness` on homepage includes telephone — eligible for rich result in local search.
- `FAQPage` on homepage eligible for FAQ rich result.
- All JSON-LD parsed without errors.

### 8. JavaScript Rendering

- Astro static site generation: full HTML is in the raw HTTP response — no client-side rendering required for indexable content.
- `is_spa` detection: not triggered (raw HTML contains complete page content).
- Googlebot does not need to execute JavaScript to index any content.

### 9. 404 Page Behavior

- Non-existent paths (`/blog/`, `/columns/aircon-blinking-operation-lamp/`) correctly return HTTP 404.
- The custom 404 page has descriptive content and navigation links back to service pages — good user experience.
- Issue: lacks `noindex` (see H1 above).

---

## Summary Table

| Issue | Priority | Effort | Impact |
|---|---|---|---|
| 404 page missing noindex | High | Low | Medium |
| 9 images missing dimensions | High | Low | High (CLS) |
| X-Frame-Options vs frame-ancestors conflict | High | Low | Medium |
| 2-hop redirect for http non-www | High | Low | Low |
| IndexNow not implemented | Medium | Medium | Medium |
| CSP unsafe-inline | Medium | High | Medium |
| 14 images without loading attr | Medium | Low | Medium |
| HSTS no preload, inconsistent max-age | Medium | Low | Low |
| 6 image preloads (excess) | Medium | Low | Low |
| Homepage HTML 262.9 KB | Medium | High | Low |
| CORS wildcard on HTML | Medium | Low | Low |
| Non-article pages missing lastmod | Low | Low | Low |
| Pagination missing lastmod | Low | Low | Low |

---

## Implementation Notes

**Quickest wins (can ship in one deploy):**
1. Add `<meta name="robots" content="noindex,follow">` to 404 layout, remove hreflang from 404 template.
2. Fix `X-Frame-Options: DENY` in `vercel.json` to match `frame-ancestors 'none'`.
3. Add `width` and `height` to the 9 images missing dimensions.
4. Add `loading="lazy"` to the 14 images missing the attribute.
5. Reduce preloads from 6 to 2 (mobile + desktop hero variants only).

**Next sprint:**
6. Implement IndexNow key file and post-publish API call in `generateWorker.ts`.
7. Set HSTS to `max-age=63072000; includeSubDomains; preload` in `vercel.json` and submit to hstspreload.org.
8. Investigate whether CORS wildcard is set by Vercel platform or `vercel.json` and scope to assets only.

**Longer term:**
9. Migrate inline navigation scripts to external module files to enable a stricter CSP (remove `unsafe-inline`).
10. Add `lastmod` to static pages using build-time timestamps.
