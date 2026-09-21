# Content Quality Audit: setsubi-pro.net
**Audit date:** 2026-09-08
**Auditor skill:** Content Quality (Google Sept 2025 QRG)
**Scope:** 10 live pages sampled + 42 blog articles analyzed from local source

---

## Summary Scores

| Dimension | Score | Notes |
|---|---|---|
| **Overall Content Quality** | **52 / 100** | Solid article content; severe E-E-A-T structural gaps |
| E-E-A-T (composite) | 44 / 100 | No author attribution anywhere |
| AI Citation Readiness | 61 / 100 | FAQPage schema strong; articles lack HowTo schema |
| Title Tag Quality | 55 / 100 | Articles good; index pages consistently short |
| Meta Description Quality | 48 / 100 | Non-article pages under-utilize available length |
| Thin Content Risk | Low | All 42 articles clear the minimum threshold |
| Heading Structure | 68 / 100 | Articles well-structured; listing pages skip H2 |

---

## 1. E-E-A-T Signals

### 1a. Experience — 45/100

**What is present:**
- Testimonials page (お客様の声) has 10+ real customer accounts with specific job type, location (city/ward), work duration, and price paid. These are detailed enough to be credible (e.g., "追いだき付き給湯器交換 180分 ¥29,800 大阪市港区").
- Case studies page (施工事例) exists and lists job categories with before/after context.

**What is missing:**
- No technician field notes, photo evidence of completed work, or real job-site commentary anywhere in column articles. All 42 articles are written from a neutral third-party voice with no signal that the writer has personally performed or witnessed the work described.
- No "how we handled a case like this" anecdotes linking column content to real service history.

### 1b. Expertise — 40/100

**What is present:**
- FAQ page states technicians hold national qualifications (国家資格) for water, electrical, and gas work — but no license numbers, certificate names (第二種電気工事士 etc.), or technician profiles are published anywhere.
- Column articles are technically accurate; the aircon article correctly distinguishes霜取り運転 (defrost cycle) from genuine fault states and references Mitsubishi Electric's official support page as an external source.

**What is missing — critical gap:**
- **Zero author bylines on any of the 42 column articles.** Under Google's Sept 2025 QRG, content about home repair (a YMYL-adjacent category affecting safety and financial decisions) requires clear demonstration of the author's real-world competence. Anonymous technical articles on electrical and plumbing topics fail this standard regardless of content accuracy.
- No "About the author" or "Supervised by" (監修) sections. No staff profiles. No LinkedIn or credential links anywhere on the site.

### 1c. Authoritativeness — 35/100

**What is present:**
- Legal company name (株式会社Hoaloha) disclosed on company page and in Organization schema.
- Two physical office addresses listed (Osaka main, Ibaraki Kanto branch).
- Brand name "設備プロ" consistent across all pages.

**What is missing:**
- Company incorporated **令和8年4月9日 (April 9, 2026)** — the site is approximately 5 months old at audit date. This is a verifiable authority signal and Google's systems will treat it as a new, unproven entity.
- No press mentions, no external site citations, no industry body memberships referenced.
- Column articles cite no external authoritative sources except one Mitsubishi link in the aircon article. A 42-article library with only one outbound authority citation is a weak trust signal.
- The brand name "設備プロ" is a generic descriptor ("equipment pro"), not a distinctive brand. It competes with numerous similarly-named services.

### 1d. Trustworthiness — 58/100

**What is present (positive signals):**
- HTTPS enforced; canonical URLs correctly set.
- Phone number (050-8896-6909) prominently displayed in header, footer, and schema.
- Organization, LocalBusiness, FAQPage, and BreadcrumbList schema all implemented correctly.
- Privacy policy page exists.
- FAQ clearly states: "お見積り・出張費・キャンセル料は0円" — transparent pricing policy.
- Pre-work estimate process explained.

**Concerns:**
- The LocalBusiness schema on the homepage declares the Kanto (Ibaraki) address as the primary business address, but the company/about page text identifies Osaka as the main office. This address inconsistency is a direct trust signal conflict that Google's local algorithm and human quality raters will flag.
- No aggregate rating or Review schema anywhere on the site despite 10+ detailed testimonials on the voice page. This leaves structured trust signals unused.
- No Google Business Profile link or third-party review platform references (Kakaku, Mynavi etc.).
- Establishment date (April 2026) is not surfaced anywhere in content. It appears only in the company page table.

---

## 2. Thin Content Detection

Pages were scored by Japanese character count extracted from rendered HTML (nav/footer excluded where detectable). For Japanese, 1,500+ JP chars is the practical floor for a service-sector blog post; 500+ for utility pages.

| Page | URL Status | JP Chars | Assessment |
|---|---|---|---|
| Homepage | 200 | 9,627 | Pass — good topical coverage |
| Columns index | 200 | 1,569 | Pass — acceptable for listing page |
| Company About | 200 | 817 | Borderline thin — company story underdeveloped |
| Voice / Testimonials | 200 | 2,178 | Pass |
| FAQ | 200 | 3,531 | Pass — comprehensive Q&A |
| Case Studies | 200 | 1,639 | Pass — listing page only |
| Article: Aircon lamp blinking | 200 | 5,356 | Strong — well-developed |
| Article: Toilet clogged | 200 | 3,356 | Pass |
| /service/water/ | **404** | — | Broken URL — see Section 6 |
| /service/electricity/ | **404** | — | Broken URL — see Section 6 |

**Blog article corpus (42 articles, source-level analysis):**

| Metric | Value |
|---|---|
| Average JP chars per article | 3,455 |
| Minimum (toilet-clogged-causes-solutions.md) | 2,046 |
| Maximum (air-conditioner-cleaning-guide.md) | 5,100 |
| Articles below 1,500 JP chars | 0 |

No individual article is technically thin. The distribution is healthy. However, the bottom quartile (articles around 2,000-2,400 JP chars) covers complex repair scenarios in fewer characters than they likely warrant. Articles like `waterheater-not-working.md` (2,337 chars) and `air-conditioner-noisy.md` (2,481 chars) address multi-cause diagnostic scenarios and could support deeper content.

**Company About page is the most under-developed existing page.** With 817 JP chars it contains little more than a company table (name, address, CEO, founding date, business lines) plus two short boilerplate paragraphs. A company page for a YMYL-adjacent service business should include company mission, team structure, licensing details, and service history to build E-E-A-T.

---

## 3. Content Readability

**Japanese text quality is acceptable across all sampled pages.** No machine-translation artifacts, grammatical errors, or vocabulary inconsistencies were detected in manual reading of the aircon article, toilet article, FAQ, and testimonials.

**Sentence structure:** Articles use a consistent short-sentence style with ～します/～ください sentence endings appropriate for consumer-facing service content. Readability is appropriate for a general adult audience (not overly technical, not dumbed down).

**Structural readability (article pages):**
- Both audited articles use bullet lists and numbered steps correctly.
- Section lengths are appropriate — no walls of text.
- The aircon article uses a "confirm in this order" framework that guides anxious users through diagnosis systematically. This is the right content pattern for emergency service queries.

**Structural readability (index/utility pages):**
- The FAQ page presents all Q&A as flat text with Q/A labels. On mobile, this is harder to scan than a standard accordion. This is a UX-readability issue, not a text-quality issue.
- The Voice page mixes short testimonials (1-2 sentences) with long ones (4-6 sentences) without visual differentiation. Longer reviews are more credible but the page does not leverage them structurally.

**Potential AI content markers (Sept 2025 QRG):**
The column articles show several patterns common to AI-assisted generation:
- All articles follow an identical three-part structure: situational context intro → H2 diagnostic sections → H2 escalation/contact CTA.
- Introductory paragraphs use a formulaic empathy opener ("このような状態になると、不安になるものです") that repeats across multiple articles.
- No first-person voice, no specific named case, no regional detail despite the service being geographically restricted to Kanto/Kansai.
- These patterns are not disqualifying under the Sept 2025 QRG if the content is accurate and helpful — which it is — but the absence of any first-hand signal means the content relies entirely on topical accuracy to pass quality evaluation. Author attribution would add the missing human signal.

---

## 4. Duplicate Content Issues

No duplicate page titles were detected across the 10 sampled pages that returned 200 status codes.

**Canonical tags:** All 200-status pages carry correct self-referencing canonical tags. The 404 pages canonicalize to `/404/`, which is correct behavior.

**One structural inconsistency flagged:**
The LocalBusiness schema (LD+JSON block 2 on homepage) declares:
```
"name": "設備プロ 関東営業所"
"addressLocality": "鉾田市"
"addressRegion": "茨城県"
```
But the company/about page text states the main office is in `大阪府大阪市北区曽根崎新地`. Google interprets LocalBusiness schema as the canonical NAP (Name/Address/Phone). Having the schema point to the Kanto branch while the company page identifies Osaka as headquarters creates a conflicting entity signal. A second LocalBusiness block for the Kansai office should be added, and the primary schema should match the legal registered address.

**Testimonials duplication risk:** Two testimonials on the voice page share nearly identical content (給湯器交換 大阪市阿倍野区, same job description, same price ¥19,800, same duration 120分, different initials: Y.T.様 vs T.N.様). This appears to be either a data entry error or a near-duplicate seeded testimonial. Either case reduces credibility.

---

## 5. AI Citation Readiness

| Signal | Status | Detail |
|---|---|---|
| FAQPage schema | Present | Homepage + FAQ page; 5 questions per block on homepage |
| BreadcrumbList schema | Present | All interior pages |
| Article/BlogPosting schema | Present | Column articles carry 3 LD+JSON blocks |
| HowTo schema | Absent | Column articles contain clear step-by-step diagnostic procedures but no HowTo markup |
| Review/AggregateRating schema | Absent | 10+ testimonials exist but carry no structured markup |
| H2/H3 hierarchy in articles | Good | 4 H2 + 15 H3 on aircon article; 5 H2 + 11 H3 on toilet article |
| Quotable fact density | Low | Articles contain procedural guidance but few citable statistics or verifiable data points |
| External authority citations | Very low | One outbound expert link detected across 42 articles |

**Assessment:** The site is well-positioned for FAQ-type AI citations (featured snippets, SGE answer boxes) due to the FAQPage schema and structured Q&A. The column articles are well-organized for position-zero capture on "why does X happen" queries given their clear H2 diagnostic structure.

The primary gap for AI citation is the **absence of HowTo schema** on step-by-step articles. The aircon lamp article in particular walks through a clear multi-step diagnostic process that maps directly to HowTo markup. Adding this schema would significantly improve citation eligibility in AI overview panels.

The absence of statistics, research citations, or cost data ranges in article body text limits how often Google AI overviews will pull from this content for factual queries (e.g., "how much does toilet repair cost in Japan").

---

## 6. Content Freshness and URL Integrity

**Article publication dates (from local source frontmatter):**
- All sampled articles carry `publishedDate` and `updatedDate` in 2026.
- The aircon article: published 2026-09-06 (2 days before audit).
- The toilet article: published 2026-07-14, updated 2026-08-09.
- Dates are rendered in HTML for article pages (detected: `2026-09-06`, `2026-07-14`, `2026-08-09`).

**Freshness signal on utility pages:** Homepage, FAQ, company, testimonials, and case study pages carry **no visible date signals** in rendered HTML. Google cannot determine when these pages were last updated from the page content alone.

**Broken URL patterns (critical — 5 URLs returning 404):**

| Audited URL | HTTP Status | Likely Correct Pattern |
|---|---|---|
| /service/water/ | 404 | /water/ or /[category]/[service] |
| /service/electricity/ | 404 | /electricity/ or /[category]/[service] |
| /services/ | 404 | No service index page exists |
| /columns/toilet-flush-weak/ | 404 | /columns/toilet-clogged-causes-solutions/ |
| /columns/aircon-lamp-blinking/ | 404 | /columns/air-conditioner-operation-light-blinking/ |

The service pages at `/service/water/` and `/service/electricity/` appear to have never existed under those paths. The actual URL routing is `[category]/[service].astro`, producing paths like `/water/toilet/` etc. If these URLs were shared in any external context (directory listings, ads, social posts), they are silently dead. Check GSC Coverage report for 404 spikes.

The two column article 404s suggest the slug naming convention changed after external links or references were created using the short-form slugs (`aircon-lamp-blinking`, `toilet-flush-weak`). Redirect rules should be added in `vercel.json` for both.

---

## 7. Title Tag Quality

| Page | Title | Chars | Assessment |
|---|---|---|---|
| Homepage | 設備プロ（セツビプロ）\|水漏れ・電気修理\|24時間対応 | 21 | Good — brand + service category + USP |
| FAQ | よくある質問\|設備プロ | 11 | Too short — no topical keywords |
| Columns index | お役立ち情報\|設備プロ | 11 | Too short — category/topic signals absent |
| Company About | 会社概要\|設備プロ | 9 | Standard; acceptable |
| Voice | お客様の声\|設備プロ | 10 | Standard; acceptable |
| Case Studies | 施工事例\|設備プロ | 9 | Standard; acceptable |
| Aircon lamp article | エアコンの運転ランプが点滅する原因は？止まらないときの確認方法と対処法\|設備プロ | 40 | Excellent — question format, keyword + action |
| Toilet clogged article | トイレが詰まった！原因別の対処法と業者を呼ぶべきケース\|設備プロ | 32 | Good |

**Pattern:** Article titles are well-crafted (question format, high keyword specificity). Utility page titles are generic brand anchors. The FAQ title in particular wastes an opportunity — a page with 30+ specific questions could carry a title like "よくある質問（水道・電気トラブル）\|設備プロ" to capture more query surface.

**Note on character count:** Japanese title character counts behave differently from English — a 21-char Japanese title is equivalent to roughly 42-50 characters in pixel width. All sampled titles fall within Google's ~580px display width limit.

---

## 8. Heading Structure Consistency

| Page | H1 | H2 | H3 | Assessment |
|---|---|---|---|---|
| Homepage | 1 | 10 | 8+ | Good hierarchy |
| Aircon article | 1 | 4 | 15 | Well-structured for long-form |
| Toilet article | 1 | 5 | 11 | Well-structured |
| FAQ | 1 | 5 | 0 | FAQ items likely in details/dl elements, not H3 |
| Columns index | 1 | 0 | 10 | **H2 layer missing** — jumps H1 > H3 |
| Voice / Testimonials | 1 | 1 | 10 | Thin — single H2 "一覧" over 10 H3 cards |
| Case Studies | 1 | 1 | 9 | Same pattern as Voice |
| Company About | 1 | 1 | 0 | Acceptable for short page |

**Issue on Columns index:** The page skips the H2 heading level entirely, going directly from H1 (お役立ち情報) to H3 elements for article cards. This is a heading hierarchy violation. If the page has category sections (electricity, water), those should be H2 elements. If it is a flat list, the article card headings should be H3 only if a parent H2 ("記事一覧" or category label) is present.

**Listing page pattern (Voice, Case):** Both listing pages use a single H2 "一覧" that covers all items. This is structurally correct but adds no categorical context for crawlers or screen readers. If both pages support category filtering (which the route structure `/voice/category/[filter]` suggests), the H2 on the main listing page could reflect the primary service split (水まわり / 電気まわり) to improve topical signal.

---

## Priority Recommendations

**P1 — Immediate impact on E-E-A-T and Sept 2025 QRG compliance:**

1. **Add author attribution to all 42 column articles.** Even a minimal "この記事は設備プロの電気・水まわり担当スタッフが監修しています" footer with a link to a staff/qualification page is significantly better than anonymous. Ideally: named technician, license type, years of experience.
2. **Create a staff/credentials page** listing qualifications held (第二種電気工事士, 給水装置工事主任技術者 etc.) with license registration numbers if publishable. Link from all column articles.
3. **Fix the LocalBusiness schema conflict**: align the primary schema address with the legal registered address (Osaka). Add a second LocalBusiness block for the Kanto branch.
4. **Add redirect rules** in `vercel.json` for the two dead column slug patterns: `/columns/aircon-lamp-blinking/` → `/columns/air-conditioner-operation-light-blinking/` and `/columns/toilet-flush-weak/` → `/columns/toilet-clogged-causes-solutions/`.

**P2 — Structured data and AI citation improvements:**

5. **Add HowTo schema** to column articles that contain numbered diagnostic steps (aircon lamp, breaker trip, toilet clog etc.). This is the highest-ROI schema addition for AI overview eligibility.
6. **Add Review/AggregateRating schema** to the testimonials page and consider adding an aggregated rating to the homepage LocalBusiness block.
7. **Remove or reconcile the near-duplicate testimonial** (給湯器交換 大阪市阿倍野区, ¥19,800, 120分 — appears under both Y.T.様 and T.N.様 with nearly identical body text).

**P3 — Title and meta description quality:**

8. **Expand meta descriptions on all non-article pages** to 120-150 characters. The homepage (76 chars) and most utility pages leave roughly 60-80 characters of available SERP real estate unused.
9. **Improve FAQ title** to include topic keywords: e.g., "よくある質問（水道・電気トラブル）\|設備プロ".
10. **Fix Columns index heading structure**: introduce H2 category headers before H3 article cards.

**P4 — Freshness signals:**

11. **Surface last-updated dates on utility pages** (FAQ, case studies, voice). These pages are updated implicitly when new items are added but carry no date signal for crawlers or users. Add a visible "最終更新: YYYY年MM月" notice or use schema `dateModified`.
12. **Expand the Company About page** with company history/story content and licensing information. At 817 JP chars it is the thinnest substantive page on the site.

---

## Appendix: Pages Returning 404 During Audit

The following URLs were included in the audit brief but returned HTTP 404:

- `https://www.setsubi-pro.net/service/water/`
- `https://www.setsubi-pro.net/service/electricity/`
- `https://www.setsubi-pro.net/services/`
- `https://www.setsubi-pro.net/columns/toilet-flush-weak/`
- `https://www.setsubi-pro.net/columns/aircon-lamp-blinking/`

The 404 page itself is correctly configured (canonical → `/404/`, relevant internal links provided). These are not soft-404s. Check Google Search Console (sc-domain:setsubi-pro.net) Coverage > Not Found report to determine whether Googlebot has attempted to crawl these URLs from external links or sitemaps.
