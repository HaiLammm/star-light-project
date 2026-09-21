# SEO Action Plan — setsubi-pro.net

**Current Score: 55/100 → Target: 75/100**
**Generated:** 2026-09-08

---

## Phase 1: Critical Fixes — Week 1

*Estimated impact: +5-8 points*

| # | Action | Effort | Files to Change |
|---|--------|--------|-----------------|
| 1.1 | Fix broken breadcrumb URLs on /water/ pages (replace `#` with correct path) | 1h | Breadcrumb Astro component |
| 1.2 | Add `<meta name="robots" content="noindex,follow">` to 404 layout; remove hreflang | 30min | 404 layout file |
| 1.3 | Resolve NAP: set one canonical primary address in footer + schema sitewide | 2h | Footer component, schema config |
| 1.4 | Change `X-Frame-Options` to `DENY` in vercel.json | 10min | vercel.json |
| 1.5 | Remove duplicate testimonial (Y.T.様 / T.N.様 on /voice/) | 30min | Voice content files |
| 1.6 | Add 301 redirects for dead column slugs | 15min | vercel.json |

---

## Phase 2: High-Impact Improvements — Weeks 2-3

*Estimated impact: +8-12 points*

### E-E-A-T (highest priority)
| # | Action | Effort | Impact |
|---|--------|--------|--------|
| 2.1 | Add author/supervisor attribution to all 42 column articles | 4h | Critical — E-E-A-T |
| 2.2 | Create staff credentials page with qualification details | 4h | Critical — E-E-A-T |
| 2.3 | Display contractor license numbers (電気工事士, 給水装置工事主任技術者) in footer + service pages | 2h | Critical — Trust |

### Technical Performance
| # | Action | Effort | Impact |
|---|--------|--------|--------|
| 2.4 | Add `width`/`height` to 9 images missing dimensions | 2h | High — CLS |
| 2.5 | Add `loading="lazy"` to 14 below-fold images | 1h | Medium — LCP |
| 2.6 | Reduce homepage preloads from 6 to 2 (hero only) | 30min | Medium — Performance |

### Schema Enhancement
| # | Action | Effort | Impact |
|---|--------|--------|--------|
| 2.7 | Add AggregateRating + star ratings to testimonials | 4h | High — SERP stars |
| 2.8 | Add HowTo schema to step-by-step diagnostic articles | 3h | High — Featured snippets |
| 2.9 | Fix trailing slash inconsistency in schema URLs | 1h | Medium — Schema health |
| 2.10 | Add @id to all schema entities for graph linking | 2h | Medium — Entity graph |

### UX / Conversion
| # | Action | Effort | Impact |
|---|--------|--------|--------|
| 2.11 | Add pinned mobile CTA bar (tap-to-call) | 4h | High — Conversion |
| 2.12 | Add pricing tables to service pages; promote WEB割引 | 4h | High — Conversion |

### AI Readiness
| # | Action | Effort | Impact |
|---|--------|--------|--------|
| 2.13 | Create `/llms.txt` with service/area/content index | 2h | High — AI visibility |

---

## Phase 3: Content & Authority — Month 2

*Estimated impact: +5-10 points*

### Location Pages
| # | Action | Effort | Impact |
|---|--------|--------|--------|
| 3.1 | Create Tokyo city landing page | 8h | Critical — Local ranking |
| 3.2 | Create Osaka city landing page | 8h | Critical — Local ranking |
| 3.3 | Create remaining prefecture pages (8 more) | 40h | High — Coverage |

### GBP & Citations
| # | Action | Effort | Impact |
|---|--------|--------|--------|
| 3.4 | Create and verify GBP for Kanto office | 4h | Critical — Local Pack |
| 3.5 | Create and verify GBP for Osaka office | 4h | Critical — Local Pack |
| 3.6 | Register on くらしのマーケット, ユアマイスター, Yahoo!ロコ | 8h | High — Citations |

### Content Improvements
| # | Action | Effort | Impact |
|---|--------|--------|--------|
| 3.7 | Expand company/about page (from 817 → 2,000+ JP chars) | 3h | Medium |
| 3.8 | Add external citations to articles (manufacturer refs, stats) | 8h | Medium — E-E-A-T |
| 3.9 | Rewrite article intros to lead with direct answers | 16h | Medium — AI citation |
| 3.10 | Expand meta descriptions to 120-155 chars on non-article pages | 3h | Medium — CTR |

### Technical
| # | Action | Effort | Impact |
|---|--------|--------|--------|
| 3.11 | Implement IndexNow in generateWorker.ts | 4h | Medium — Crawl speed |
| 3.12 | Add Google Maps embed to /contact/ and /company/office/ | 2h | Medium — Local signal |

---

## Phase 4: Monitoring & Iteration — Ongoing

*Estimated impact: +3-5 points per quarter*

| # | Action | Effort | Impact |
|---|--------|--------|--------|
| 4.1 | Start YouTube channel with repair demonstration videos | Ongoing | High — AI citation |
| 4.2 | Create LINE Official Account | 4h setup | High — Japan conversion |
| 4.3 | Tighten CSP from unsafe-inline to nonce-based | 8h | Medium — Security |
| 4.4 | Standardize HSTS with preload; submit to hstspreload.org | 2h | Low — Security |
| 4.5 | Configure Google API credentials (CrUX, GSC, GA4) | 4h | High — Monitoring |
| 4.6 | Create emergency landing pages (緊急 水道修理, 夜間 電気工事) | 16h | High — Intent match |
| 4.7 | Build drift baseline for ongoing SEO monitoring | 2h | Medium — Regression detection |
| 4.8 | Scope CORS wildcard to asset paths only | 1h | Low — Security |

---

## Projected Score Trajectory

| Milestone | Timeline | Projected Score |
|-----------|----------|-----------------|
| Phase 1 complete | Week 1 | 60/100 |
| Phase 2 complete | Week 3 | 68/100 |
| Phase 3 complete | Month 2 | 75/100 |
| Phase 4 ongoing | Month 3+ | 80+/100 |

---

## Dependencies & Blockers

1. **GBP verification** requires real physical addresses — Hyogo office needs a verifiable address
2. **License numbers** need to be provided by the business owner
3. **Author attribution** requires deciding: use real staff names or a professional persona?
4. **Google API setup** requires GCP project + API keys (free tier sufficient for CrUX + PageSpeed)
5. **YouTube channel** requires video production capability

---

## Metrics to Track

| Metric | Tool | Frequency |
|--------|------|-----------|
| Organic impressions/clicks | GSC | Weekly |
| Core Web Vitals (field) | CrUX / GSC | Monthly |
| Local Pack appearance | Manual search / DataForSEO | Bi-weekly |
| AI citation mentions | Perplexity / ChatGPT manual checks | Monthly |
| Review count + rating | GBP dashboard | Weekly |
| Page index coverage | GSC | Weekly |

---

*Action plan generated from SEO audit dated 2026-09-08. Priorities assume no Google API credentials and no paid SEO tools.*
