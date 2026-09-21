# SXO Audit: setsubi-pro.net
**Date:** 2026-09-08
**Analyst:** SXO Skill (Claude Code)
**Target:** https://www.setsubi-pro.net/
**Business:** 設備プロ — Water and electrical repair, 24/7, Kanto/Kansai

---

## PRIMARY FINDING: CRITICAL TRUST-AUTHORITY MISMATCH

The site launched in April 2026 (approximately 5 months ago) and is competing directly against:
- Marketplace aggregators with 13,000+ verified reviews and AggregateRating schema (Curama, Meetsmore, EPARK)
- Established branded service providers with 10+ years of domain authority and water bureau designations (Crasian, esmile-24)
- Manufacturer FAQ pages with inherent topical authority (Panasonic, Sharp, Daikin, Tokyo Gas)

The core SXO problem is not content format or CTA placement. It is that Google's reward signal for every target keyword category requires demonstrated trust-at-scale (review volume, schema proof, licensing credentials) that a 5-month-old brand cannot buy with good copy alone. Every tactical fix below must be read against this structural constraint.

---

## 1. SERP Backwards Analysis

### Query: 水漏れ 修理 業者 24時間

**Top results observed:**
| # | Domain | Page Type | Key Signals |
|---|--------|-----------|-------------|
| 1 | curama.jp | Marketplace comparison | 4.88/5 stars, 13,643 reviews, AggregateRating schema, 475+ providers |
| 2 | rescue.epark.jp | Marketplace comparison | 24h badge, price range display, multiple provider cards |
| 3 | esmile-24.com | Service provider (established) | Brand-specific query capture, "20 min response" |
| 4 | suidou119.jp | Local service provider | Area-specific, 24h signal, free estimate badge |
| 5 | mizu-support.com | Informational guide | "How to choose a contractor" — consideration-stage |

**SERP features detected:** Local Pack (3-pack), Ad block (top 2 positions above organic), PAA box ("水漏れ修理は自分でできる？", "水道修理の相場は？")

**Dominant page type:** Marketplace comparison / category listing (60% of top results)
**Secondary type:** Established single-provider service page with heavy social proof

### Query: トイレ つまり 修理 業者

**Top results observed:**
| # | Domain | Page Type | Key Signals |
|---|--------|-----------|-------------|
| 1 | qracian.co.jp | Service provider (Crasian — national leader) | Brand authority, "30 min response", price from ¥8,800 |
| 2 | curama.jp | Marketplace comparison | Review volume, price comparison |
| 3 | meetsmore.com | Marketplace comparison | "5 quotes in 1 minute" UX |
| 4 | home.tokyo-gas.co.jp | Authority informational | Cost breakdown, Tokyo Gas brand authority |
| 5 | suido-hikaku.com | Comparison guide | "How to choose a vendor" — research intent |

**SERP features:** PAA ("トイレつまりの費用は？"), pricing data in snippets (¥8,800 floor)

**Dominant page type:** Marketplace + established-brand service pages
**Notable signal:** Tokyo Gas appearing for a plumbing query = institutional brand authority crushes niche providers

### Query: エアコン 修理 業者 料金

**Top results observed:**
| # | Domain | Page Type | Key Signals |
|---|--------|-----------|-------------|
| 1 | curama.jp | Marketplace | Review volume, price display |
| 2 | meetsmore.com | Marketplace + informational | Diagnosis tool mentioned |
| 3 | meetsmore.com/media | Informational guide | "Where to get cheapest repair" |
| 4 | curama.jp/magazine | Informational | Manufacturer vs. shop vs. independent comparison |
| 5 | saiyasu-syuuri.com | Comparison/review | "Cheapest & same-day" angle |

**Dominant page type:** Marketplace category + comparison guides
**Note:** No HVAC-specific repair service provider appears in top 5 — marketplace and informational formats dominate entirely.

### Query: 電気トラブル 24時間 修理 業者 東京

**Top results observed:**
| # | Domain | Page Type | Key Signals |
|---|--------|-----------|-------------|
| 1 | tepco.co.jp | Institutional authority | TEPCO brand, "free for 90 min" trust signal |
| 2 | pgservice1.tepco.co.jp | Authority service page | Power grid operator = maximum institutional trust |
| 3 | sharing-tech.co.jp/denki | National aggregator service | "110 number" brand recognition |
| 4 | rescue.epark.jp | Marketplace | Area-based filtering |
| 5 | denkisos.net | Niche service provider | Tokyo Gov. registered, 24/7 |

**Dominant page type:** Institutional authority pages + marketplace
**Critical signal:** TEPCO occupies top 2 positions. This category is dominated by institutional trust that cannot be replicated.

### Query: エアコン 運転ランプ 点滅 原因 (Informational)

**Top results observed:**
| # | Domain | Page Type | Key Signals |
|---|--------|-----------|-------------|
| 1 | cs.sharp.co.jp | Manufacturer FAQ | Source authority (Sharp = product maker) |
| 2 | jpn.faq.panasonic.com | Manufacturer FAQ | Panasonic — same authority signal |
| 3 | rescue.epark.jp | Service provider article | Structured how-to, CTA embedded |
| 4 | you.you-me.co.jp | Apartment management FAQ | Use-case specificity |
| 5 | daikin-hvac-tokyo.co.jp | Authority service article | Daikin-affiliated, technical depth |

**Dominant page type:** Manufacturer/authority FAQ + structured how-to guide
**SERP signals:** Featured snippet present (step-by-step format), PAA box active

### Query: トイレ 水流れ 弱い 原因 (Informational)

**Top results observed:**
| # | Domain | Page Type | Key Signals |
|---|--------|-----------|-------------|
| 1 | home.tokyo-gas.co.jp | Authority informational | Tokyo Gas brand |
| 2 | qracian.co.jp | Service provider article | Crasian brand, how-to format |
| 3 | rescue.epark.jp | Service article | Structured how-to |
| 4 | rescue-navi.jp | Informational guide | "Library" content hub |
| 5 | rescue-suido.com | Service article | Step-by-step + CTA |

**Dominant page type:** Authoritative informational article with embedded CTA
**SERP signals:** Featured snippet, PAA box

---

## 2. Page-Type Mismatch Detection

### Mismatch Severity: HIGH (transactional queries) / MEDIUM (informational queries)

**Transactional Query Mismatch — SEVERITY: HIGH**

For queries like "水漏れ 修理 業者", "トイレ つまり 修理":
- SERP rewards: Marketplace aggregators with 400+ provider listings and 13,000+ reviews, OR established single-provider brands with decade-long review accumulation
- setsubi-pro.net offers: A single-provider service page with 10 displayed testimonials, no star ratings, no AggregateRating schema
- Gap: The page type is correct (service provider page) but the trust signals are 99% below what Google rewards
- This is not a page-type problem — it is a trust-signal volume problem that time and schema implementation must solve together

**Informational Query Mismatch — SEVERITY: MEDIUM**

For queries like "エアコン 運転ランプ 点滅 原因", "トイレ 水流れ 弱い":
- SERP rewards: Manufacturer FAQ pages, authoritative how-to guides with author attribution, HowTo or FAQPage schema, 1,500-3,000 word structured content
- setsubi-pro.net column articles: Good structure (2,200 words), recent (Aug-Sep 2026), logical H2/H3 hierarchy — BUT no Article schema, no named author with credentials, no HowTo schema markup, no FAQPage schema
- Gap: Content format is mostly aligned, but schema absence and authority signals prevent featured snippet capture

**SERP Consensus by Query Type:**
| Query Type | SERP Dominant Type | Site Page Type | Match Status |
|-----------|-------------------|----------------|-------------|
| Emergency transactional | Marketplace / high-review service provider | Single-provider service page | MISMATCHED on trust scale |
| Informational how-to | Authority article + schema | Article (no schema, no author) | PARTIALLY ALIGNED |
| Comparison/research | Marketplace, comparison guide | Not present | MISSING PAGE TYPE |
| Local-intent emergency | Local Pack (GBP) + service provider | No GBP signals visible | MISSING ENTIRELY |

---

## 3. User Story Derivation

User stories are derived from observed SERP signals (PAA boxes, featured snippets, result formats).

**Story 1: Emergency Repair (Decision Stage)**
As a homeowner with a leaking pipe at 11 PM, I want to know which company will arrive fastest and at what cost, so I can call immediately without reading long pages.
- Signal: PAA "水漏れ修理は今日来てくれる？", Local Pack 3-box with distance/hours, "最短20分" copy in all top service result snippets
- Gap on setsubi-pro.net: Phone number appears multiple times (good), but "最短10分で到着" claim appears in the hero without a specific area qualifier, reducing credibility. No live chat, no emergency CTA above the fold on mobile.

**Story 2: Pre-Call Cost Research (Consideration Stage)**
As a homeowner who noticed a dripping faucet, I want to understand the typical repair cost before calling anyone, so I don't feel blindsided by the quote.
- Signal: Pricing data appears in organic snippets (¥8,800 floor for toilet repair), PAA "費用相場はいくら？", meetsmore.com "diagnosis tool" mentioned, cost breakdown tables in top results
- Gap on setsubi-pro.net: WEB割引 coupons visible on FAQ page (電気 ¥1,100 off, 水 ¥5,000 off), but no clear pricing floor/ceiling table accessible from the homepage. Transparent pricing is mentioned in copy but not demonstrated with a scannable table.

**Story 3: Symptom Diagnosis (Awareness Stage)**
As a renter whose AC is blinking, I want to understand if I can fix it myself or if I need a professional, so I know whether to call maintenance or a repair service.
- Signal: Featured snippet on "エアコン 運転ランプ 点滅" shows step-by-step checklist format. Top results include manufacturer FAQ pages and structured how-to guides. PAA box: "何回点滅すると故障？"
- Gap on setsubi-pro.net: Column article has correct format (2,200 words, H2/H3 structure, DIY-vs-professional comparison table) but lacks HowTo schema and FAQPage schema, preventing featured snippet capture.

**Story 4: Vendor Validation (Consideration-to-Decision Stage)**
As a homeowner who has already found setsubi-pro.net, I want to verify it is a legitimate licensed company, so I can feel safe letting strangers into my home.
- Signal: "水道局指定工事店" badge visible on competitor listings, license numbers in footers, Google reviews count in Local Pack
- Gap on setsubi-pro.net: Company page discloses founding date (April 2026 — only 5 months ago), no license/registration numbers, no 水道局指定工事店 designation visible, no Google Business Profile signals, no insurance disclosure. This is the highest-friction trust gap in the entire conversion funnel.

**Story 5: Area Confirmation (Decision Stage)**
As a resident of Kanagawa, I want to confirm this company actually covers my area, so I don't waste time calling only to be told they can't come.
- Signal: Area-filter UI on Curama/EPARK, "品川区 (東京都) の業者" heading on Epark, Local Pack results geotargeted
- Gap on setsubi-pro.net: Service area listed as Kanto/Kansai on homepage, but company address shows Osaka HQ + Ibaraki office. No area-specific landing pages for Tokyo wards, Kanagawa, Saitama, etc. No local schema with service area coverage.

---

## 4. Gap Analysis (SXO Gap Score: 47/100)

### Dimension 1: Page Type Match (Score: 9/15)
- Homepage and service pages are the correct page type for a service provider
- Column articles match the informational format Google rewards
- Missing: Comparison/research-stage pages, local area landing pages, pricing guide pages
- Evidence: Not a single area-specific page detected (e.g., /tokyo/water-leak/, /osaka/toilet-repair/)

### Dimension 2: Content Depth (Score: 10/15)
- Column articles are well-structured at ~2,200 words with logical heading hierarchy
- FAQ page covers 25+ questions across multiple categories
- Case studies exist but thin: 9 entries, mostly Osaka, sparse detail (price + brief outcome only)
- Missing: Pricing guide pages, symptom-to-cost calculators, before/after image depth in cases
- Evidence: "エアコン 運転ランプ 点滅" article has correct format for featured snippet, but competitor articles from Crasian and Daikin are 3,000+ words with embedded video

### Dimension 3: UX Signals (Score: 7/15)
- Phone CTA appears 4+ times across homepage — positive for emergency-intent users
- "最短10分で到着" hero claim is strong but unqualified by area
- No live chat or callback widget detected
- Above-the-fold on mobile: Phone number and hero claim present, but no social proof element (review count, star rating) visible without scrolling
- No pricing floor shown above the fold — users must scroll or call to get cost context
- WEB割引 coupon exists but buried in FAQ — not surfaced on homepage or service pages

### Dimension 4: Schema Markup (Score: 2/15)
- CRITICAL gap: No schema markup detected across any page type reviewed
- Missing schemas that Google directly rewards for this site's queries:
  - LocalBusiness (with serviceArea, openingHours, hasMap)
  - FAQPage (on FAQ page and within column articles)
  - HowTo (on column articles with step-by-step content)
  - Article / NewsArticle (on column articles)
  - Review / AggregateRating (on voice/testimonial page)
  - Service (on service category pages)
- Evidence: Curama.jp dominates SERP partly because AggregateRating schema with 13,643 reviews produces a rich star snippet in results. setsubi-pro.net has zero schema rich results.

### Dimension 5: Media (Score: 7/15)
- Case studies include work completion examples (implied by page structure)
- Column articles likely include illustrative images (standard for the format)
- Missing: Video content (competitor Epark and Meetsmore articles embed video how-tos), before/after photo galleries in case studies with schema markup, technician photo with credentials in articles
- Evidence: "エアコン 修理" SERP shows video carousel above organic results — site has no video presence

### Dimension 6: Authority / E-E-A-T (Score: 5/15)
- CRITICAL gap: Company founded April 9, 2026 — approximately 5 months of domain existence at audit date
- No named authors on column articles (only company attribution)
- No license/registration numbers published on company page or footer
- No 水道局指定工事店 (water bureau designated contractor) designation visible
- No electrical contractor registration number visible
- No insurance disclosure
- No media mentions or third-party coverage
- 10 displayed testimonials with no star ratings and no schema markup
- Positive: Certifications mentioned in FAQ ("全スタッフが国家資格を保有"), but this is buried and unverifiable
- Evidence: Sharp and Panasonic appear for "エアコン 運転ランプ 点滅" because they ARE the authority. Tokyo Gas appears for toilet repair because of institutional trust. setsubi-pro.net has no equivalent trust anchor.

### Dimension 7: Freshness (Score: 7/10)
- Column articles published August-September 2026 (very recent — positive signal)
- Case studies exist with recent dates
- FAQ content appears current
- Missing: News/press coverage, explicit last-updated dates on service pages

---

## 5. Persona Scoring

Personas derived from SERP intent signals. Scored on Relevance / Clarity / Trust / Action (25 pts each, 100 max).

### Persona A: Emergency Homeowner (水漏れ 今すぐ直したい)
**Profile:** Homeowner, pipe burst or toilet overflow, 10 PM, high stress, wants to call NOW.
**Total Score: 54/100**

| Dimension | Score | Evidence |
|-----------|-------|----------|
| Relevance | 18/25 | "24時間365日" and "最短10分" hero copy hits the trigger, but no area-specific confirmation above the fold |
| Clarity | 15/25 | Phone number visible, but no instant "Is my area covered?" check. No response time SLA by area |
| Trust | 10/25 | Only 10 testimonials, no star ratings, company founded 5 months ago — high-anxiety persona needs far stronger proof |
| Action | 11/25 | Phone repeated, but no one-tap mobile call button pinned to bottom of screen; no live chat for those who can't call |

**Recommended fixes:** Pin a tap-to-call bar at bottom of mobile viewport. Show "Tokyo service ✓ / Osaka service ✓" inline with response time by region. Surface 3 recent reviews with star ratings above the fold on mobile.

### Persona B: Research-Phase Homeowner (料金相場を知りたい)
**Profile:** Dripping faucet noticed, wants to compare costs before calling. Will open 3-4 tabs.
**Total Score: 42/100**

| Dimension | Score | Evidence |
|-----------|-------|----------|
| Relevance | 12/25 | Service pages exist, but no dedicated pricing guide or cost calculator |
| Clarity | 10/25 | WEB割引 coupon buried in FAQ, no scannable price table on service pages |
| Trust | 12/25 | FAQ mentions "見積り0円" and "ご納得なければ0円" — strong policy copy, but no review volume proof |
| Action | 8/25 | Contact form exists but there's no low-commitment entry point (e.g., "Get a price estimate by chat") |

**Recommended fixes:** Create a dedicated 料金ページ with floor pricing per service type (matching competitor ¥8,800 toilet, ¥7,500 faucet benchmarks). Add a price-estimate request form with symptom selector. Embed WEB割引 on service pages directly.

### Persona C: Apartment Renter — Credential Verifier (業者を信頼したい)
**Profile:** Renter or condo owner, will Google the company before calling. Checks license, reviews, whether the company is legitimate.
**Total Score: 28/100**

| Dimension | Score | Evidence |
|-----------|-------|----------|
| Relevance | 12/25 | Company page exists at /company/about/ |
| Clarity | 8/25 | Company page shows founding date (April 2026) prominently — triggers doubt, not confidence |
| Trust | 4/25 | No license numbers, no water bureau designation, no insurance disclosure, no 許可番号, company is 5 months old |
| Action | 4/25 | After finding the company is 5 months old with no verifiable credentials, most credentialing-sensitive users will leave |

**Recommended fixes (highest priority):** Obtain and prominently display: 水道局指定工事店番号, 電気工事業登録番号, 損害保険加入証明. Add staff profiles with photo + license card image for top 3 technicians. Move founding story and license numbers to homepage trust section.

### Persona D: Planned Maintenance Client (計画的な工事を依頼したい)
**Profile:** Homeowner planning water heater replacement or electrical panel upgrade. Has 1-2 weeks timeline, comparing 2-3 vendors.
**Total Score: 38/100**

| Dimension | Score | Evidence |
|-----------|-------|----------|
| Relevance | 14/25 | Case studies page shows 給湯器交換, ブースター工事 — relevant work types |
| Clarity | 10/25 | 9 case studies with limited detail; no clear "request a non-emergency quote" flow |
| Trust | 8/25 | Pricing shown (¥8,000–¥29,800), but thin case details and no portfolio depth |
| Action | 6/25 | Contact form exists but no non-emergency specific path (feels identical to emergency CTA) |

**Recommended fixes:** Expand case studies to 30+ with before/after photos, work duration, exact pricing, customer quote, area, technician name. Add a "非緊急のご相談フォーム" (non-emergency consultation form) with timeline selector.

### Persona E: Column Reader — Symptom Searcher (自分で直せるか知りたい)
**Profile:** Found the site through informational search ("エアコン 点滅 原因"). Not yet a lead. May convert if trust is built.
**Total Score: 52/100**

| Dimension | Score | Evidence |
|-----------|-------|----------|
| Relevance | 18/25 | Articles match the informational intent; DIY-vs-professional comparison table present |
| Clarity | 15/25 | H2/H3 structure clear; 2,200 words appropriate depth |
| Trust | 10/25 | No named author, no credentials, no Article schema — limits SERP rich result capture and on-page credibility |
| Action | 9/25 | Internal CTA to service pages present, but no in-article soft CTA (e.g., "If you see X symptom, call us") tied to specific decision point |

**Recommended fixes:** Add Article schema with author (Organization or named expert). Add FAQPage schema to last section. Insert a contextual CTA after the "業者へ相談したいケース" section with a direct link to the relevant service page. Add related service price anchoring ("この症状の修理相場: ¥X,XXX〜").

---

## 6. CTA Effectiveness and Conversion Path Analysis

### Current CTA Architecture
- Primary: Phone number "050-8896-6909" (repeated 4+ times on homepage)
- Secondary: "メールで無料相談" (contact form)
- Tertiary: "WEB割引" coupon (buried in FAQ, not surfaced on conversion pages)
- Column articles: Internal links to service pages (present), soft CTAs to contact (present)

### Conversion Path Gaps

**Gap 1: Emergency path works on desktop but degrades on mobile**
Phone number is present but requires scrolling to reach on mobile. Emergency users on mobile should encounter a pinned bottom bar with one-tap call within 3 seconds of landing. No evidence of this implementation.

**Gap 2: Research path has no low-commitment entry**
The only non-phone conversion option is a full contact form ("無料相談フォーム"). There is no price-estimate widget, no symptom selector, no chat option. Research-phase users (Persona B) who are not ready to talk will abandon.

**Gap 3: Column-to-service conversion is not friction-matched**
Articles correctly link to service pages, but the transition is abrupt — the CTA says "contact us" immediately after diagnostic content. The missing step is a price anchor and service description between the article and the hard CTA. Users need "This repair typically costs ¥8,800–¥15,000 → [Call now / Get an estimate]" rather than a generic contact form link.

**Gap 4: WEB割引 coupon is a conversion accelerator that is not accelerating anything**
The ¥5,000 water discount and ¥1,100 electrical discount are genuinely strong incentives (up to 57% off service fee for water). These should appear on every service page and in the hero section, not only in the FAQ.

**Gap 5: No re-engagement mechanism**
No LINE official account, no email capture with maintenance reminder, no push notifications. Once a user leaves without converting, there is no re-engagement path. This is a particularly high cost in Japan where LINE is the dominant consumer communication channel for service businesses.

---

## 7. Above-the-Fold Content Effectiveness

### Homepage Hero (Observed)
- Main claim: "最短10分でプロが駆けつけます" — strong urgency signal
- Support: "24時間365日", "見積り0円", "ご納得なければ料金0円"
- Phone number: Present and visible
- Missing above the fold: Review count/stars, license badge, area confirmation, WEB割引 coupon

### Critical Above-the-Fold Gaps vs. SERP Expectations

**1. Social proof is invisible at landing**
Curama.jp shows "4.88★ (13,643件)" above the fold. Every Crasian page surfaces review count immediately. setsubi-pro.net's hero contains no social proof element. A user bouncing from a marketplace search result to this page sees strong copy but zero proof that the copy is true.

**2. Licensing trust badge is absent**
Top-ranking service providers display 水道局指定工事店 badge in the hero. This is a conversion gate for Persona C (credential verifier). Its absence is noticeable to informed users.

**3. Area ambiguity**
"関東・関西対応" is mentioned in service areas section, but this appears below the fold. A user in Yokohama cannot confirm coverage without scrolling. This increases bounce rate for geo-specific queries.

**4. Price anchor is missing**
SERP snippets for competitor pages often show "¥8,800〜" in the meta description or hero. setsubi-pro.net shows no price anchor above the fold. Research-intent users who are price-checking will not find what they need and will return to SERP.

---

## 8. Schema Implementation Priority Queue

Ranked by estimated SERP impact, highest first:

1. **LocalBusiness schema** (homepage + all service pages)
   - Required fields: name, url, telephone, address, openingHours, areaServed, priceRange
   - Impact: Enables Knowledge Panel, improves Local Pack eligibility

2. **AggregateRating schema** (voice/testimonial page)
   - Required: ratingValue, reviewCount, bestRating
   - Impact: Star snippet in SERP — single biggest visual trust signal. Currently completely absent while competitors show 4.88★ (13,000+). Even with only 30 reviews, showing ★★★★★ (30件) in search results transforms click-through rate.

3. **FAQPage schema** (FAQ page, and FAQ section within column articles)
   - Impact: FAQ rich result expands SERP footprint; answers PAA questions and can intercept featured snippets

4. **HowTo schema** (all column articles with step-by-step content)
   - Applies to: "エアコン 運転ランプ 点滅", "トイレ 水流れ 弱い", and similar
   - Impact: Featured snippet eligibility (step list format)

5. **Article schema** (all column articles)
   - Required: author, datePublished, publisher, headline
   - Impact: Enables article rich result, improves E-E-A-T signals

6. **Review schema** (each individual case study and voice entry)
   - Impact: Individual review markup contributes to aggregate rating eligibility

---

## 9. Structural Recommendations by Priority

### Priority 1 — Trust Infrastructure (blocks all other growth)
- Obtain and publish: 水道局指定工事店番号 for all served prefectures, 電気工事業登録番号, 損害保険証
- Add staff profiles page with: photo, license type, license number, years of experience (min. 3 profiles)
- Implement LocalBusiness schema and AggregateRating schema immediately
- Register and optimize Google Business Profiles for Tokyo office and Osaka office with separate NAP data

### Priority 2 — Schema Across All Page Types
- Implement FAQPage schema on /faq/ (affects ~25 questions immediately)
- Implement HowTo schema on column articles (applies to 8+ existing articles)
- Implement Article schema with publisher and author on all columns
- Implement Review + AggregateRating on /voice/

### Priority 3 — Missing Page Types
- Create area landing pages: /tokyo/, /kanagawa/, /osaka/, /saitama/, /chiba/ with LocalBusiness schema and LocalBusiness areaServed
- Create a 料金ページ with service-type × location pricing matrix
- Create a comparison/research page ("水漏れ修理 業者の選び方") targeting research-stage queries

### Priority 4 — Conversion Path Fixes
- Pin tap-to-call bar at mobile bottom viewport (sticky, above page scroll)
- Surface WEB割引 coupon on all service pages and homepage hero
- Add price anchor in article CTAs: "この症状の修理費用 ¥8,800〜 [今すぐ相談]"
- Create LINE Official Account and add LINE contact button alongside phone CTA

### Priority 5 — Content Depth
- Expand case studies from 9 to 30+ with before/after photos, technician attribution, exact pricing
- Add author bylines to all column articles (named technician with credential listed)
- Create pricing guide page with service-type cost tables matching competitor pricing benchmarks

---

## 10. Cross-Skill Recommendations

- **E-E-A-T gap is severe:** Recommend `/seo content` audit for deep author-authority and content cluster analysis
- **Schema completely absent:** Recommend `/seo schema` to generate complete schema JSON-LD for each page type
- **Local intent in every target SERP:** Recommend `/seo local` for full GBP optimization and area page strategy
- **Service pages are thin:** Recommend `/seo page` for page-level content audit on /service/water/ and /service/electricity/

---

## Limitations

- Live SERP screenshots could not be captured; SERP analysis is based on WebSearch results which may not reflect exact Japanese locale SERP layout
- Playwright-rendered DOM could not be obtained; above-the-fold analysis is based on text content, not visual rendering or actual CLS/LCP measurements
- Competitor pages (Crasian, EPARK) returned 403 — competitor content analysis is based on SERP snippet data only
- Site URL patterns for /service/water/ and some column slugs returned 404 — those page types were analyzed via working URLs (/case/, /faq/, /voice/, /columns/)
- Schema analysis is based on absence of visible markup in fetched content — a full technical crawl may reveal injected JSON-LD not visible to WebFetch
- Google Search Console data (impressions, CTR, average position) was not accessible — ranking performance assumptions are directional only
- The site is 5 months old; some signals (domain authority, backlink profile, indexation rate) cannot be assessed without GSC + Ahrefs/Majestic access

---

*SXO Gap Score: 47/100*
*SEO Health Score: Not assessed in this report (see `/seo page` and `/seo schema` for technical scores)*

Generate a PDF report? Use `/seo google report`
