# AI Search Readiness Audit: setsubi-pro.net
**Audit Date:** 2026-09-08
**Site:** https://www.setsubi-pro.net/
**Type:** Japanese home repair service (plumbing + electrical), Kanto/Kansai
**Stack:** Astro static site, 97 URLs in sitemap

---

## GEO Readiness Score: 41 / 100

| Dimension | Raw Score | Weight | Weighted |
|-----------|-----------|--------|----------|
| Citability | 38 / 100 | 25% | 9.5 |
| Structural Readability | 45 / 100 | 20% | 9.0 |
| Multi-Modal Content | 35 / 100 | 15% | 5.25 |
| Authority & Brand Signals | 25 / 100 | 20% | 5.0 |
| Technical Accessibility | 62 / 100 | 20% | 12.4 |
| **Total** | | | **41.15** |

---

## 1. AI Crawler Access Status

**Source:** `https://www.setsubi-pro.net/robots.txt`

```
User-agent: *
Allow: /
Disallow: /admin/
Sitemap: https://www.setsubi-pro.net/sitemap-index.xml
```

| Crawler | Status | Note |
|---------|--------|------|
| GPTBot (ChatGPT search) | ALLOWED | Inherited from wildcard Allow: / |
| OAI-SearchBot (ChatGPT citations) | ALLOWED | Inherited from wildcard |
| ClaudeBot | ALLOWED | Inherited from wildcard |
| PerplexityBot | ALLOWED | Inherited from wildcard |
| CCBot (training data) | ALLOWED | No training-only block |
| anthropic-ai (training data) | ALLOWED | No training-only block |
| cohere-ai (training data) | ALLOWED | No training-only block |

**Assessment:** No AI crawlers are explicitly named in robots.txt. All inherit the blanket `Allow: /` rule. This is acceptable for search visibility but the site has not opted into the emerging best practice of explicit per-bot rules.

The training-only bots (CCBot, anthropic-ai, cohere-ai) are also allowed. If the site owner prefers to allow AI search/citation use but block training scrapes, explicit Disallow rules for those three should be added.

---

## 2. llms.txt Status

**URL checked:** `https://www.setsubi-pro.net/llms.txt`
**HTTP Status:** 404 Not Found
**Assessment:** MISSING

The `/llms.txt` standard (analogous to `robots.txt` for LLM context windows) is not present. This is a missed opportunity to give AI assistants a curated, machine-readable summary of the site's content, service areas, and key topics. For a 97-URL informational site with distinct topical clusters (plumbing vs. electrical), an `llms.txt` could meaningfully improve the accuracy of AI-generated answers that reference this domain.

---

## 3. Passage-Level Citability

Pages sampled:
- `/columns/air-conditioner-operation-light-blinking/`
- `/columns/air-conditioner-suddenly-stop-working/`
- `/columns/toilet-water-wont-stop-tank-causes/`
- `/columns/kitchen-drain-bad-smell/`
- `/faq/`

### 3a. Direct Answer Positioning

AI systems (especially Perplexity and Google AIO) prefer pages where the core answer appears within the **first 40-60 words** of each section. Of the four articles sampled:

- `air-conditioner-suddenly-stop-working`: PASS. First two sentences state the answer directly: "エアコンが自動で止まるのは、設定温度への到達やタイマー、暖房時の霜取り運転など、正常な制御による場合があります。一方、フィルターの目詰まりや室外機の放熱不良、センサーなどの不具合が隠れていることもあるため、停止時の状態を分けて確認することが大切です。"
- `air-conditioner-operation-light-blinking`: PARTIAL. Opening paragraph describes the user's anxiety before stating the direct answer. The key sentence ("必ずしも故障を意味するわけではありません") appears after a sympathy setup.
- `toilet-water-wont-stop-tank-causes`: PARTIAL. Opening describes symptoms and then gives the first action ("最初に止水栓を閉めてください") but the "why" answer is deferred.
- `kitchen-drain-bad-smell`: FAIL. Opening two sentences are purely descriptive of the problem, with no answer content.

**Score note:** 1 of 4 articles pass direct-answer positioning. This is the single highest-leverage fix for Google AIO and Perplexity extraction.

### 3b. Passage Length vs. Optimal Citation Window

Optimal AI citation passage length is 134-167 words. Article sections currently run approximately 200-400 words each, which is too long for direct extraction without chunking. FAQ answers run 30-100 words, which is close to optimal.

The FAQ page has the best passage-level citability on the site. Answers like "一般的にトイレ本体は10〜15年、タンク内部品は約10年、配管やパッキンは15〜20年が目安です" are self-contained, specific, and extractable without context.

### 3c. Question-Based Headings

All sampled articles use question-based H2/H3 headings (e.g., "点滅が止まらないときに考えられる原因", "修理を相談したいケース"). This is good practice and aligns with how AI engines parse topical structure. Headings could be strengthened by making them full natural-language questions matching actual search queries (e.g., "エアコンの運転ランプが点滅し続けるのはなぜですか？").

### 3d. Statistics and External Citations

No external citations, no statistics with source attribution found on any sampled page. One page (`toilet-water-wont-stop-tank-causes`) references "東京ガスの住まいに関する案内" without a URL or specific claim. AI engines weight specific, sourced statistics heavily for citation decisions.

### 3e. Meta Descriptions

No meta description was found on any of the four sampled article pages. Meta descriptions serve as the default passage AI engines read first when deciding whether to cite a page. Their absence is a significant citability gap.

---

## 4. Structural Readability

### 4a. Heading Hierarchy

Consistent H1 > H2 > H3 structure across all articles. The three-section article template (steps to take / root causes / when to call a pro) is well-suited to AI extraction once direct answers are moved earlier in each section.

### 4b. Schema Markup

**No structured data markup found on any sampled page.** This is the most impactful technical gap in the audit.

Missing schema types and their impact:

| Schema Type | Pages Needed | AI Search Impact |
|-------------|-------------|-----------------|
| `FAQPage` | `/faq/` and any column with Q&A sections | HIGH - enables rich results and direct AIO extraction |
| `Article` with `author`, `datePublished`, `dateModified` | All `/columns/*` pages | HIGH - required for Google AIO E-E-A-T scoring |
| `LocalBusiness` / `HomeAndConstructionBusiness` | Homepage, `/about/` | HIGH - enables AI to answer "who is setsubi-pro" queries |
| `BreadcrumbList` | All pages | MEDIUM - helps AI understand site hierarchy |
| `HowTo` | Step-by-step columns | MEDIUM - enables structured extraction of procedural content |

### 4c. Table of Contents

No in-page table of contents detected. For 2,000-word articles with 10+ H3 sections, a linked TOC near the top helps AI engines identify the article's scope and jump to the most relevant section.

---

## 5. Brand Mention Signals

These signals correlate with AI citation frequency independent of SEO ranking.

| Signal | Status | Impact |
|--------|--------|--------|
| YouTube channel | Not detected | ~0.737 correlation with AI citations - highest possible impact |
| Wikipedia entity (設備プロ) | Not found | High impact for brand recognition in AI responses |
| Reddit / Japanese forum presence (知恵袋, 教えて!goo) | Not verified | High for Japanese AI engines |
| LinkedIn company page | Not verified | Medium |
| Press/media mentions | None detected on-site | Medium |
| Google Business Profile | Not verified from audit data | High for local AI results |

The absence of a YouTube channel is the largest missed opportunity given the 0.737 citation correlation. Home repair topics ("how to fix toilet," "aircon error codes") perform strongly on YouTube, and a channel with even 10-20 how-to videos would significantly lift AI search visibility for the brand.

The site currently has no Wikipedia presence. For a local Japanese business brand this is expected, but entity establishment via structured data (LocalBusiness schema with sameAs links to social profiles) is the practical alternative.

---

## 6. Authority Signals for AI Citation

### 6a. E-E-A-T Signals Present

- **Experience:** Testimonial section ("お客様の声") exists on homepage - POSITIVE
- **Expertise:** "有資格の職人" mentioned in homepage copy but no specific qualifications named
- **Authoritativeness:** No named authors on any article
- **Trust:** Privacy policy linked; "満足保証" (satisfaction guarantee) mentioned

### 6b. E-E-A-T Signals Missing

- Named authors with credentials on every article
- Author schema with `knowsAbout` properties
- Specific license/qualification numbers (e.g., 第一種電気工事士 registration)
- External links to authoritative sources (Ministry of Land, Infrastructure, Transport; Tokyo Gas; METI)
- "Last reviewed by" or "Updated" timestamps with named reviewer

AI engines increasingly model credibility by checking whether article authors match the claimed expertise domain. Unnamed articles on a service site are classified as commercial content, which is weighted lower than content with named expert authors.

### 6c. Publication Dates

Publication dates are present in the format `YYYY.M.D` (e.g., 2026.9.6). These need to also be expressed in machine-readable ISO 8601 format inside `<time datetime="2026-09-06">` tags or inside Article schema `datePublished` property. The human-readable dot-separated format is not reliably parsed by all AI crawlers.

---

## 7. Technical Accessibility for AI Crawlers

### 7a. Rendering

Astro static site with server-side rendering. All page content is present in the initial HTML response - no JavaScript execution required. This is the strongest possible configuration for AI crawler accessibility. Perplexity, ClaudeBot, and GPTBot all index SSR content reliably.

### 7b. Sitemap

- `sitemap-index.xml`: Present, references `sitemap-0.xml`
- `sitemap-0.xml`: Contains 97 URLs organized across columns, services, cases, FAQ, and company sections
- Format appears standard XML - no issues detected
- No `lastmod` date verification was possible from this audit

### 7c. Canonical URLs

Not confirmed from audit data. Astro should generate canonical tags by default but this should be verified, particularly for paginated column pages (`/columns/page/2/` etc.) to avoid AI crawlers indexing duplicate content.

---

## 8. Platform-Specific Scores

| Platform | Score | Key Gap |
|----------|-------|---------|
| Google AI Overviews | 35 / 100 | No Article schema, no named authors, no meta descriptions |
| ChatGPT Search | 30 / 100 | No brand presence in YouTube/Wikipedia ecosystem; no OAI-SearchBot explicit allow |
| Perplexity | 45 / 100 | Good SSR + sitemap; limited by no citations or statistics |
| Bing Copilot | 40 / 100 | Sitemap and structure are adequate; schema absence limits rich extraction |

Only 11% of domains are cited by both ChatGPT and Google AIO. At current configuration, setsubi-pro.net is unlikely to appear in either without the schema and authority improvements listed below.

---

## 9. Top 5 Highest-Impact Changes

### Priority 1 - Add FAQPage schema to /faq/
**Impact:** HIGH | **Effort:** LOW (2-4 hours)

The FAQ page has 30+ self-contained Q&A pairs that are already well-structured for extraction. Adding `FAQPage` JSON-LD schema is a single template change in Astro and immediately enables Google AIO rich results and improved Perplexity extraction.

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "漏電とはどんな状態のことですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "本来は電気が流れない場所に電流が漏れている状態です。感電や火災のリスクがあります。"
      }
    }
  ]
}
```

### Priority 2 - Add Article + BreadcrumbList schema to all column pages
**Impact:** HIGH | **Effort:** LOW (1 day, Astro template change)

Every article under `/columns/` needs `Article` schema with `datePublished`, `dateModified`, `author` (even an organization author is better than none), and `publisher`. This is the primary signal Google AIO uses to evaluate content recency and authority.

Without Article schema, Google cannot reliably surface these pages in AI Overviews even when the content is topically relevant.

### Priority 3 - Add meta description to all article and FAQ pages
**Impact:** HIGH | **Effort:** LOW (content work + 1 Astro template fix)

No meta descriptions were found on any sampled page. Meta descriptions are the first passage AI engines read to assess page relevance and extractability. Each article needs a 140-160 character description that directly states the answer to the article's title question.

Example for `air-conditioner-operation-light-blinking`:
> エアコンの運転ランプが点滅する原因は故障だけでなく、霜取り運転やフィルター詰まりの場合もあります。色・エラーコードの確認手順と対処法を解説。

### Priority 4 - Create /llms.txt
**Impact:** MEDIUM | **Effort:** LOW (2 hours)

A minimal `llms.txt` at the domain root gives AI assistants a curated entry point. Suggested structure:

```
# 設備プロ (Setsubi-Pro)
> 水まわり・電気設備の修理専門業者。関東・関西エリア対応。24時間365日受付。

## サービス
- [水まわり修理](/services/water/): トイレ、キッチン、浴室、洗面所の水漏れ・つまり
- [電気修理](/services/electricity/): ブレーカー、照明、漏電、アンテナ、給湯器

## コンテンツ
- [お役立ちコラム](/columns/): 水まわり・電気トラブルの原因と対処法（48記事）
- [よくある質問](/faq/): 30件以上のQ&A

## 対応エリア
東京都、神奈川県、千葉県、埼玉県（関東）、大阪府、兵庫県、京都府（関西）
```

### Priority 5 - Add direct answers in the first 40-60 words of each article
**Impact:** HIGH | **Effort:** MEDIUM (content rewrite, ongoing)

Restructure article introductions so the answer to the title question appears in the first two sentences, before any empathy/problem-description setup. This is the single most impactful content change for Google AIO and Perplexity snippet extraction.

Template:
1. Sentence 1: State the core answer directly (what causes X / what to do about X)
2. Sentence 2: Qualify with the most important condition or caveat
3. Sentences 3-4: Acknowledge the user's situation
4. Transition to the structured guide

The `air-conditioner-suddenly-stop-working` article already does this correctly and should serve as the internal template.

---

## 10. Additional Observations

**RSL 1.0 Licensing:** No RSL 1.0 or equivalent AI content licensing declaration found. Not currently a ranking factor but increasingly relevant as AI engine licensing frameworks mature.

**Robots.txt training-data opt-out:** If the site owner does not want content used for AI training (distinct from AI search citations), add:
```
User-agent: CCBot
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: cohere-ai
Disallow: /
```
This does not affect ClaudeBot (search/citation use) or GPTBot.

**HowTo schema opportunity:** The step-by-step sections in articles (e.g., "順番に確認したいこと" sections with numbered steps) are strong candidates for `HowTo` schema. This enables Perplexity and Bing Copilot to render structured step lists directly in AI answers.

**Google Business Profile:** Not audited here but essential for local AI results. AI engines answering "水漏れ修理 東京" queries pull from Google Business Profile data. A complete, verified GBP with service areas, photos, and review responses is the highest-ROI local AI visibility action outside of on-page changes.

---

*Audit performed by Claude Code GEO Specialist | setsubi-pro.net | 2026-09-08*
