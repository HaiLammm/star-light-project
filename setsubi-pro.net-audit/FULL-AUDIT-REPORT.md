# SEO Audit Report — setsubi-pro.net

**Audit Date:** 2026-09-08
**Overall SEO Health Score: 55 / 100**
**Business Type:** Local Service — Home Repair (Plumbing + Electrical), Hybrid SAB
**Site Technology:** Astro v5.18.1 SSG, Vercel hosting
**Pages Indexed:** 112

---

## Executive Summary

setsubi-pro.net は設備修理（水回り・電気）の24時間対応サービスサイト。Astro SSGの技術基盤は優秀だが、**E-E-A-T（専門性・経験・権威性・信頼性）の弱さ**が全体スコアを大きく引き下げている。2026年4月設立のわずか5ヶ月の企業が、くらしのマーケット（13,000+レビュー）やクラシアンなどの確立されたブランドと競合している。

### Score Breakdown

| Category | Weight | Score | Weighted |
|----------|--------|-------|----------|
| Technical SEO | 22% | 72 | 15.8 |
| Content Quality | 23% | 52 | 12.0 |
| On-Page SEO | 20% | 58 | 11.6 |
| Schema / Structured Data | 10% | 55 | 5.5 |
| Performance (CWV) | 10% | 70 | 7.0 |
| AI Search Readiness | 10% | 41 | 4.1 |
| Images | 5% | 55 | 2.8 |
| **Total** | **100%** | | **58.8 → 55** |

*Local SEO (25/100) and SXO (47/100) evaluated as supplemental dimensions.*

### Top 5 Critical Issues

1. **E-E-A-T critically weak** — Zero author attribution on 42 articles, no license numbers, company 5 months old
2. **Local SEO infrastructure absent** — No verified GBP, no city landing pages, NAP inconsistency across 3 offices
3. **Broken schema breadcrumbs** — /water/ pages have invalid `#` anchor URLs in BreadcrumbList
4. **404 page indexable** — Carries canonical, hreflang, and schema that signal it as a real page
5. **AI search readiness low** — No llms.txt, no HowTo schema, articles bury direct answers

### Top 5 Quick Wins (single deploy)

1. Add `noindex,follow` to 404 page; strip hreflang
2. Fix broken breadcrumb URLs on /water/ pages
3. Add `width`/`height` to 9 images (CLS fix)
4. Add `loading="lazy"` to 14 below-fold images
5. Change `X-Frame-Options` to `DENY` in vercel.json

---

## 1. Technical SEO — 72/100

### What Works
- Astro SSG delivers full HTML — zero JS execution needed by Googlebot
- LCP hero image correctly configured: `fetchpriority="high"`, `loading="eager"`, `rel="preload"`
- System font stack — no web font loading delays
- All 33 redirect rules return 301; responsive images with `srcset`
- Clean robots.txt, valid sitemap-index.xml

### Issues Found

| # | Issue | Severity | Fix |
|---|-------|----------|-----|
| H1 | 404 page indexable (has canonical, hreflang, schema) | High | Add `noindex,follow`; remove hreflang from 404 layout |
| H2 | 9 images missing `width`/`height` (CLS risk) | High | Add dimensions; use Astro `<Image />` |
| H3 | X-Frame-Options: SAMEORIGIN contradicts CSP frame-ancestors: none | High | Change to `DENY` in vercel.json |
| H4 | 2-hop redirect: http://setsubi-pro.net/ | High | Add direct redirect in Vercel |
| M1 | IndexNow not implemented | Medium | Add to generateWorker.ts publish pipeline |
| M2 | CSP uses `unsafe-inline` for script-src and style-src | Medium | Move inline scripts to external modules |
| M3 | 14 images without `loading` attribute | Medium | Add `loading="lazy"` to below-fold images |
| M4 | 6 image preloads on homepage (excessive) | Medium | Keep only hero pair (mobile+desktop) |
| M5 | HSTS missing `preload`; max-age inconsistent | Medium | Standardize and submit to hstspreload.org |
| M6 | CORS wildcard on HTML responses | Medium | Scope to asset paths only |

---

## 2. Content Quality — 52/100

### What Works
- All 42 articles exceed thin content threshold (min 2,046 JP chars, avg 3,455)
- Article titles well-crafted (question format, high specificity)
- Clear H2/H3 diagnostic hierarchies in articles
- FAQ page: 30+ self-contained Q&A pairs

### Issues Found

| # | Issue | Severity | Fix |
|---|-------|----------|-----|
| C1 | Zero author attribution on 42 articles | Critical | Add author/supervisor with credentials; create staff page |
| C2 | E-E-A-T score 44/100 — no licenses, no citations, new company | Critical | Display license numbers, add external citations |
| H1 | Duplicate testimonial (Y.T.様 / T.N.様 — identical text) | High | Verify and remove duplicate |
| M1 | Meta descriptions 76-84 chars (60-80 chars wasted) | Medium | Expand to 120-155 chars |
| M2 | /columns/ index skips H2 level (H1→H3) | Medium | Add categorical H2 headings |
| M3 | Company about page thin (817 JP chars) | Medium | Expand with team qualifications, story |

---

## 3. On-Page SEO — 58/100

### What Works
- Canonical tags, hreflang (ja + x-default), RSS feed correctly implemented
- OG tags properly configured on all pages
- 95 unique internal links on homepage

### Issues Found

| # | Issue | Severity | Fix |
|---|-------|----------|-----|
| C1 | No city-level landing pages (10+ service prefectures) | Critical | Create Tokyo/Osaka pages first, then expand |
| H1 | No pricing tables on service pages | High | Add pricing; promote WEB割引 coupon |
| H2 | No pinned mobile CTA (tap-to-call) | High | Add sticky bottom bar for emergency users |
| M1 | Articles bury direct answers after intros | Medium | Lead with answer; template from aircon-suddenly-stop article |

---

## 4. Schema / Structured Data — 55/100

### What Works
- Organization + WebSite JSON-LD sitewide
- LocalBusiness schema with 3 offices, openingHours, geo coordinates
- FAQPage schema on homepage and /faq/
- Article schema on column pages (headline, image, dates, author)
- BreadcrumbList on inner pages; ISO 8601 dates

### Issues Found

| # | Issue | Severity | Fix |
|---|-------|----------|-----|
| C1 | Broken breadcrumb URLs on /water/ (invalid `#` anchor) | Critical | Fix breadcrumb component path generation |
| H1 | Hyogo LocalBusiness: no streetAddress or postalCode | High | Add real address or remove entry |
| M1 | Trailing slash inconsistency in schema URLs | Medium | Standardize to match canonical (with slash) |
| M2 | No @id on WebSite/LocalBusiness entities | Medium | Add @id for entity graph linking |
| M3 | No AggregateRating despite 30+ testimonials | Medium | Add ratings and AggregateRating schema |
| M4 | No HowTo schema on step-by-step articles | Medium | Add to applicable diagnostic articles |

---

## 5. Performance (CWV) — 70/100

### What Works
- LCP hero properly prioritized with fetchpriority + preload
- No web fonts — system font stack
- Astro SSG with minimal JS payload
- Vercel Brotli compression

### Issues Found

| # | Issue | Severity | Fix |
|---|-------|----------|-----|
| H1 | 9 images without dimensions (CLS risk) | High | Add width/height attributes |
| M1 | 6 excessive preloads on homepage | Medium | Reduce to 2 (hero only) |
| L1 | Homepage HTML 262.9 KB | Low | Monitor; acceptable with compression |

*Note: No Google API credentials configured — scores are lab-estimate only. Configure CrUX API for field data.*

---

## 6. AI Search Readiness — 41/100

### What Works
- All AI crawlers allowed via robots.txt
- Static HTML — no JS rendering barrier
- Comprehensive sitemap (112 URLs)
- FAQ answers within optimal citation window (134-167 words)

### Issues Found

| # | Issue | Severity | Fix |
|---|-------|----------|-----|
| H1 | No /llms.txt (404) | High | Create machine-readable service/area index |
| H2 | No YouTube presence (highest AI citation correlation) | High | Start channel with repair videos |
| M1 | Zero external citations in 42 articles | Medium | Add manufacturer and regulatory references |
| L1 | Visible dates not in `<time>` elements | Low | Wrap with `<time datetime="...">` |

### Platform Scores

| Platform | Score | Blocking Issue |
|----------|-------|----------------|
| Google AI Overviews | 35/100 | No authors, no meta descriptions on articles |
| ChatGPT Search | 30/100 | No YouTube/Wikipedia brand ecosystem |
| Perplexity | 45/100 | Zero external citations |
| Bing Copilot | 40/100 | Schema gaps limit extraction |

---

## 7. Images — 55/100

| # | Issue | Severity | Fix |
|---|-------|----------|-----|
| H1 | 9 images missing width/height | High | Add dimensions |
| M1 | 10 images with empty alt="" | Medium | Verify decorative; add alt for content images |
| M2 | 14 images without loading attribute | Medium | Add loading="lazy" |

---

## 8. Local SEO — 25/100 (Supplemental)

### Critical Gaps

- **No verified GBP** — Cannot appear in Local Pack
- **NAP inconsistency** — Footer shows Ibaraki (Kanto), company/about leads with Osaka
- **Hyogo office** has no registerable address
- **Operating name varies** — 設備プロ vs 株式会社Hoaloha（設備プロ）
- **Zero city-level landing pages** — Cannot rank for [city]+[service] queries
- **No Google Maps embed** anywhere
- **Testimonials** lack ratings, dates, and Review schema
- **No license numbers displayed** (despite mentioning 国家資格)

### Priority Actions
1. Create and verify GBP for Kanto and Osaka offices
2. Resolve primary NAP — one canonical address sitewide
3. Display license numbers on footer + service pages
4. Create city landing pages (Tokyo → Osaka → remaining)
5. Add star ratings + dates to testimonials; implement Review schema

---

## 9. Search Experience (SXO) — 47/100 (Supplemental)

### Core Finding: Trust-Authority Mismatch
A 5-month-old company with 30 anonymous testimonials competing against:
- くらしのマーケット: 13,000+ verified reviews, AggregateRating rich results
- クラシアン: 20+ years, national brand recognition
- TEPCO: Institutional trust for electrical emergencies

### Persona Scoring

| Persona | Score | Biggest Gap |
|---------|-------|-------------|
| Emergency Homeowner | 54/100 | No pinned mobile CTA, no social proof above fold |
| Symptom Searcher | 52/100 | No schema on articles, no named author |
| Cost Researcher | 42/100 | No pricing table, WEB割引 coupon buried |
| Planned Maintenance | 38/100 | Only 9 thin case studies |
| Credential Verifier | 28/100 | No licenses, no designation badges |

### Missing Page Types
- **Comparison/pricing guides** (what SERP shows for research queries)
- **Emergency landing pages** (緊急 水道修理, 夜間 電気工事)
- **Area-specific pages** (Tokyo, Osaka, etc.)

---

## Score Summary

| Dimension | Score |
|-----------|-------|
| Technical SEO | 72/100 |
| Content Quality | 52/100 |
| On-Page SEO | 58/100 |
| Schema | 55/100 |
| Performance | 70/100 |
| AI Readiness | 41/100 |
| Images | 55/100 |
| Local SEO | 25/100 |
| SXO | 47/100 |
| **Overall Health** | **55/100** |

---

*Audit performed by Claude SEO multi-agent system. Google API credentials not configured — field CWV and GSC data unavailable. Backlink analysis limited to Common Crawl tier.*
