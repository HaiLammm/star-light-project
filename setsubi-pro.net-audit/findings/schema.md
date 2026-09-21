# Schema / Structured Data Audit — setsubi-pro.net

**Audit date:** 2026-09-08
**Auditor:** Claude (Schema.org specialist)
**Pages audited:** 7 (homepage + 6 inner pages)

---

## Pages Audited

| Page | URL | Blocks found |
|---|---|---|
| Homepage | https://www.setsubi-pro.net/ | 3 |
| Article (column) | https://www.setsubi-pro.net/columns/toilet-clogged-causes-solutions/ | 3 |
| Water service (category) | https://www.setsubi-pro.net/water/ | 6 |
| Water/Toilet service | https://www.setsubi-pro.net/water/toilet/ | 4 |
| Company/About | https://www.setsubi-pro.net/company/about/ | 2 |
| FAQ | https://www.setsubi-pro.net/faq/ | 3 |
| Case studies | https://www.setsubi-pro.net/case/ | 2 |

Note: The originally specified URLs `/columns/toilet-flush-weak/` and `/service/water/` returned HTTP 404. Correct paths found via sitemap are `/columns/toilet-clogged-causes-solutions/` and `/water/`.

---

## 1. Detection Summary

### Format
All structured data uses **JSON-LD** exclusively. No Microdata detected on any page. RDFa detection triggered on all pages is a false positive from Open Graph `<meta property="...">` tags.

### Schema types in use (site-wide)

| @type | Pages |
|---|---|
| Organization | All pages (sitewide header block) |
| WebSite | All pages (sitewide header block) |
| LocalBusiness | Homepage, /water/ (x3 offices) |
| FAQPage | Homepage, /water/, /water/toilet/, /faq/ |
| Article | /columns/toilet-clogged-causes-solutions/ |
| Service | /water/toilet/ |
| BreadcrumbList | All inner pages (not homepage) |

---

## 2. Validation Results by Page

### 2.1 Homepage (https://www.setsubi-pro.net/)

#### Block 1 — Organization + WebSite (array)

Both entities are wrapped in a single JSON array, which is valid JSON-LD.

**Organization**

| Check | Result | Notes |
|---|---|---|
| @context "https://schema.org" | PASS | |
| @type valid | PASS | |
| @id present | PASS | `#organization` fragment ID |
| name | PASS | 設備プロ |
| url | PASS | Absolute URL with trailing slash |
| logo ImageObject | PASS | |
| logo width/height | FAIL (minor) | ImageObject has no `width` or `height`; Google recommends these |
| telephone | PASS | |
| sameAs | MISSING | No social profile or official registry links |
| description | MISSING | Recommended for rich Knowledge Panel |
| foundingDate / address | MISSING | Optional but useful for KP |

**WebSite**

| Check | Result | Notes |
|---|---|---|
| @context "https://schema.org" | PASS | |
| @type valid | PASS | |
| @id | MISSING | No `@id` on WebSite entity; makes cross-referencing harder |
| name, url, inLanguage | PASS | |
| publisher cross-reference | PASS | Points to `#organization` |
| potentialAction (SearchAction) | MISSING | Optional sitelinks searchbox; low priority for small site |

#### Block 2 — LocalBusiness (関東営業所)

| Check | Result | Notes |
|---|---|---|
| @context "https://schema.org" | PASS | |
| @type | WARN | Plain `LocalBusiness` is valid but a more specific type (e.g., `Plumber`, `HomeAndConstructionBusiness`) would improve semantic precision |
| @id | MISSING | No fragment ID; cannot be cross-referenced |
| name | PASS | |
| url | WARN | `https://www.setsubi-pro.net` — no trailing slash; inconsistent with canonical |
| telephone | PASS | |
| address (PostalAddress) | PASS | |
| areaServed | PASS | 5 prefectures listed |
| openingHours | PASS | `Mo-Su 00:00-23:59` |
| image | PASS | Logo image present |
| Kansai offices | MISSING | Only Kanto office appears on homepage; Osaka and Hyogo are only on /water/ |
| priceRange | MISSING | Recommended for LocalBusiness |

#### Block 3 — FAQPage

| Check | Result | Notes |
|---|---|---|
| @context | PASS | |
| @type | INFO | FAQPage rich results retired by Google on May 7, 2026. No SERP feature will be shown. Structurally valid JSON-LD, but produces zero Google rich result benefit. |
| mainEntity present | PASS | 34 Question entities |
| All questions have acceptedAnswer | PASS | |
| Answer text non-empty | PASS | |
| Google SERP benefit | NONE | FAQPage rich results fully retired; no enforcement path remains |

---

### 2.2 Article page (/columns/toilet-clogged-causes-solutions/)

#### Block 1 — Organization + WebSite
Same as homepage. Same minor issues (no `@id` on WebSite, no `sameAs`).

#### Block 2 — Article

| Check | Result | Notes |
|---|---|---|
| @context | PASS | |
| @type "Article" | PASS | Valid. `BlogPosting` would be more semantically precise for a column post |
| headline | PASS | |
| description | PASS | |
| datePublished (ISO 8601) | PASS | `2026-07-14T00:00:00.000Z` |
| dateModified (ISO 8601) | PASS | `2026-08-09T00:00:00.000Z` |
| author | PASS | Organization type |
| author @id | MISSING | Should reference `https://www.setsubi-pro.net/#organization` instead of duplicating the entity |
| publisher | PASS | Organization with logo |
| publisher @id | MISSING | Same — should cross-reference |
| publisher.url trailing slash | WARN | `https://www.setsubi-pro.net` — inconsistent |
| image | PASS | Absolute URL to webp image |
| mainEntityOfPage | PASS | |
| inLanguage | PASS | |
| @id for article | MISSING | No fragment identifier for the Article entity |
| keywords | MISSING | Optional but useful |

Google required properties for Article rich results: `author.name`, `datePublished`, `headline`, `image` — all present. This article **qualifies for Google Article rich results**.

#### Block 3 — BreadcrumbList

| Check | Result | Notes |
|---|---|---|
| @context | PASS | |
| @type | PASS | |
| 3 levels present | PASS | TOP > コラム > Article |
| All item URLs absolute | PASS | |
| All item URLs valid | PASS | |
| name values descriptive | PASS | |

---

### 2.3 Water service page (/water/)

#### Blocks 2–4 — LocalBusiness (3 offices)

| Office | @id | postalCode | streetAddress | image |
|---|---|---|---|---|
| 関東営業所 | MISSING | PASS | PASS | MISSING (present on homepage version) |
| 大阪営業所 | MISSING | MISSING | PASS | MISSING |
| 兵庫営業所 | MISSING | MISSING | MISSING | MISSING |

The 兵庫 office has no `streetAddress` or `postalCode`. Google requires `streetAddress` for LocalBusiness to qualify for Local Business rich results. This office will not qualify.

#### Block 5 — FAQPage
Same INFO status as homepage. 20 questions (water-specific subset). Structurally valid.

#### Block 6 — BreadcrumbList

| Check | Result | Notes |
|---|---|---|
| item[1] URL | PASS | `https://www.setsubi-pro.net/` |
| item[2] URL | **CRITICAL FAIL** | `https://www.setsubi-pro.net#` — the `#` fragment with no path is an invalid URL that points to the homepage anchor, not a breadcrumb category. This will cause Google Rich Results Test to report a breadcrumb error. |

---

### 2.4 Water/Toilet service page (/water/toilet/)

#### Block 2 — Service

| Check | Result | Notes |
|---|---|---|
| @context | PASS | |
| @type "Service" | PASS | |
| name, description, serviceType | PASS | |
| provider (LocalBusiness) | PASS | Has name, url, telephone |
| provider address | MISSING | Provider LocalBusiness has no address |
| areaServed | WARN | Lists only Kansai prefectures (大阪, 京都, 奈良, 和歌山) — does not represent full service area (Kanto + Kansai) |
| offers.price | WARN | `"5000"` is a string; should be a number `5000` per JSON-LD best practice |
| offers.priceCurrency | PASS | JPY |
| offers.url | WARN | Missing trailing slash: `https://www.setsubi-pro.net/water/toilet` |
| offers.availability | PASS | InStock |
| @id | MISSING | |

Service schema is not a Google rich result type by itself (it enables other tooling), so these are quality/consistency issues rather than rich result eligibility failures.

#### Block 3 — FAQPage
Same INFO status. 4 questions (toilet-specific). Structurally valid.

#### Block 4 — BreadcrumbList

| Check | Result | Notes |
|---|---|---|
| item[1] URL | PASS | |
| item[2] URL | WARN | `https://www.setsubi-pro.net/water` — missing trailing slash |
| item[3] URL | **CRITICAL FAIL** | `https://www.setsubi-pro.net#` — same broken anchor bug as /water/ page. This will cause a validation error in Google Rich Results Test. |

---

### 2.5 Company/About page (/company/about/)

#### Block 2 — BreadcrumbList

| Check | Result | Notes |
|---|---|---|
| 3 levels | PASS | TOP > 会社案内 > 会社概要 |
| item[2] URL | WARN | `https://www.setsubi-pro.net/company` — missing trailing slash |
| item[3] URL | WARN | `https://www.setsubi-pro.net/company/about` — missing trailing slash |
| item URLs valid (not broken) | PASS | Not the `#` bug |

Missing: No `AboutPage` WebPage type schema. No enhanced `Organization` schema (e.g., `foundingDate`, `numberOfEmployees`, `address`, `areaServed`) despite this being the about page where such data lives.

---

### 2.6 FAQ page (/faq/)

#### Block 2 — FAQPage
INFO: Same as homepage. 34 questions. Structurally valid JSON-LD. No Google SERP benefit since May 7, 2026.

#### Block 3 — BreadcrumbList

| Check | Result | Notes |
|---|---|---|
| item[2] URL | WARN | `https://www.setsubi-pro.net/faq` — missing trailing slash |

---

### 2.7 Case studies page (/case/)

#### Block 2 — BreadcrumbList

| Check | Result | Notes |
|---|---|---|
| item[2] URL | PASS | `https://www.setsubi-pro.net/case/` — trailing slash present |

Missing: No `ItemList` schema for the case study listing. Individual cases have no Article or structured markup.

---

## 3. Issues Summary by Priority

### Critical (will fail Google Rich Results Test)

**C-1: Broken breadcrumb item URL on /water/ and /water/toilet/**
- Both service pages have `"item": "https://www.setsubi-pro.net#"` as a BreadcrumbList item
- This is an invalid URL (just the homepage + a bare `#` fragment) and will fail validation
- Fix: replace with the correct absolute URL including path, e.g. `"https://www.setsubi-pro.net/water/"` and `"https://www.setsubi-pro.net/water/toilet/"`

### High (causes loss of rich result eligibility or significant misrepresentation)

**H-1: 兵庫 LocalBusiness missing streetAddress**
- `/water/` page Block 4 has no `streetAddress` — required for Local Business panel

**H-2: FAQPage on all service/FAQ pages — no SERP benefit**
- Google retired FAQPage rich results on May 7, 2026 (see system rules)
- These blocks waste crawl-time but cause no harm; removal is optional
- Priority: Info (not high) — flag for awareness only

### Moderate (quality, consistency, missed opportunities)

**M-1: Trailing slash inconsistency in schema URLs**
- Multiple blocks use `https://www.setsubi-pro.net` (no slash) while canonical is `https://www.setsubi-pro.net/`
- Affects: LocalBusiness `url`, Article `publisher.url`/`author.url`, BreadcrumbList items

**M-2: WebSite entity missing `@id`**
- Prevents clean cross-referencing between the WebSite node and other entities

**M-3: LocalBusiness blocks have no `@id`**
- Three separate LocalBusiness entities for Kanto, Osaka, Hyogo cannot be referenced from other schema blocks

**M-4: Organization missing `sameAs`**
- No links to social media profiles, Google Business Profile, or official registry — reduces Knowledge Panel richness

**M-5: Article author/publisher not using @id cross-reference**
- Article block duplicates Organization data instead of referencing `#organization` entity

**M-6: Service block — areaServed only covers Kansai**
- `/water/toilet/` Service schema lists only 大阪/京都/奈良/和歌山 despite the site serving Kanto too

**M-7: LocalBusiness missing priceRange**
- Recommended property for local business panels; absent across all LocalBusiness blocks

### Minor (cosmetic / best-practice)

**N-1: logo ImageObject has no width/height**
- Google recommends specifying these

**N-2: Service offers.price is a string, not number**
- `"price": "5000"` should be `"price": 5000`

**N-3: BreadcrumbList trailing slashes**
- company/about, /faq/ breadcrumb items omit trailing slashes

---

## 4. Missing Schema Opportunities

### 4.1 SiteLinksSearchBox (WebSite potentialAction)
- Low priority for small sites, but easy to add if an internal search exists
- Add `potentialAction` with `SearchAction` to the WebSite block

### 4.2 Organization enrichment on /company/about/
- The about page is the natural home for a rich Organization block with:
  - `foundingDate`
  - `numberOfEmployees`
  - `address` (registered address)
  - `contactPoint` with `contactType: "customer service"` and 24h `hoursAvailable`
  - `sameAs` (social profiles, Google Business Profile)
  - `areaServed` for both Kanto and Kansai

### 4.3 Service schema on /water/ (category page)
- The /water/ page has 3 LocalBusiness blocks but no `Service` block
- A `Service` entity with `serviceType: "水まわり修理"`, `areaServed`, and `provider` cross-referencing the Organization would be appropriate
- The sub-pages (/water/toilet/, etc.) already have Service schema, but the parent category is missing it

### 4.4 ItemList on /case/ (case study listing)
- The case studies page lists multiple cases without any ItemList schema
- Recommended schema (provides no direct rich result but aids entity understanding):

```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "施工事例",
  "url": "https://www.setsubi-pro.net/case/",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "url": "https://www.setsubi-pro.net/case/example-1/"
    }
  ]
}
```

### 4.5 Individual case study pages — Article or CreativeWork
- If individual case pages exist, they should carry `Article` or at minimum `WebPage` schema with `datePublished`

### 4.6 AggregateRating / Review
- If the site collects or displays customer reviews (visible on service pages), `AggregateRating` inside LocalBusiness would unlock Google star ratings in local pack results
- This is a high-value opportunity if reviews exist on-site

### 4.7 WebPage type on static pages
- Company/About, FAQ, and Case pages each lack a `WebPage` typed block
- Minimal addition: `AboutPage` on /company/about/, `WebPage` on /faq/ and /case/

---

## 5. Generated JSON-LD Recommendations

### Fix C-1: Correct BreadcrumbList on /water/ page

Replace the broken Block 6 with:

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "TOP",
      "item": "https://www.setsubi-pro.net/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "水まわりサービス",
      "item": "https://www.setsubi-pro.net/water/"
    }
  ]
}
```

### Fix C-1: Correct BreadcrumbList on /water/toilet/ page

Replace the broken Block 4 with:

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "TOP",
      "item": "https://www.setsubi-pro.net/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "水まわりサービス",
      "item": "https://www.setsubi-pro.net/water/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "トイレサービス",
      "item": "https://www.setsubi-pro.net/water/toilet/"
    }
  ]
}
```

### Improved Organization block (sitewide)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.setsubi-pro.net/#organization",
  "name": "設備プロ",
  "alternateName": "セツビプロ",
  "legalName": "株式会社Hoaloha",
  "url": "https://www.setsubi-pro.net/",
  "logo": {
    "@type": "ImageObject",
    "url": "https://www.setsubi-pro.net/images/site_logo_no-mark.jpeg",
    "width": 512,
    "height": 512
  },
  "image": "https://www.setsubi-pro.net/images/site_logo_no-mark.jpeg",
  "telephone": "050-8896-6909",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "050-8896-6909",
    "contactType": "customer service",
    "availableLanguage": "Japanese",
    "hoursAvailable": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
      "opens": "00:00",
      "closes": "23:59"
    }
  },
  "areaServed": ["東京都","神奈川県","埼玉県","千葉県","茨城県","大阪府","兵庫県","京都府","奈良県","和歌山県"],
  "sameAs": []
}
```
(Populate `sameAs` with actual social/GMB profile URLs when available.)

### Improved Article block for column pages

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "@id": "https://www.setsubi-pro.net/columns/toilet-clogged-causes-solutions/#article",
  "headline": "トイレが詰まった！原因別の対処法と業者を呼ぶべきケース",
  "description": "トイレが詰まったときは、紙の使いすぎや異物の流入が原因になっていることがあります。よくある原因や自分で試せる対処法、無理せず業者へ相談したほうがよいケースを解説します。",
  "datePublished": "2026-07-14T00:00:00.000Z",
  "dateModified": "2026-08-09T00:00:00.000Z",
  "author": {
    "@type": "Organization",
    "@id": "https://www.setsubi-pro.net/#organization",
    "name": "設備プロ"
  },
  "publisher": {
    "@id": "https://www.setsubi-pro.net/#organization"
  },
  "inLanguage": "ja",
  "isPartOf": {
    "@type": "WebSite",
    "@id": "https://www.setsubi-pro.net/#website",
    "name": "設備プロ",
    "url": "https://www.setsubi-pro.net/"
  },
  "mainEntityOfPage": "https://www.setsubi-pro.net/columns/toilet-clogged-causes-solutions/",
  "image": [
    "https://www.setsubi-pro.net/_astro/toilet-clog-causes-solutions.DohapKXc_ZubDka.webp"
  ]
}
```

### Service schema for /water/ (category page)

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "水まわり修理サービス",
  "description": "水漏れ・つまり・排水トラブルなど水まわりのトラブルに年中無休・24時間即対応。関東・関西エリア対応。",
  "serviceType": "水まわり修理",
  "provider": {
    "@id": "https://www.setsubi-pro.net/#organization"
  },
  "areaServed": [
    "東京都","神奈川県","埼玉県","千葉県","茨城県",
    "大阪府","兵庫県","京都府","奈良県","和歌山県"
  ],
  "url": "https://www.setsubi-pro.net/water/"
}
```

### Fix H-1: 兵庫 LocalBusiness — add required address fields

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "設備プロ 兵庫営業所",
  "url": "https://www.setsubi-pro.net/",
  "telephone": "050-8896-6909",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "JP",
    "streetAddress": "（実際の住所を入力）",
    "addressLocality": "神戸市",
    "addressRegion": "兵庫県",
    "postalCode": "（郵便番号を入力）"
  },
  "areaServed": ["神戸市","姫路市","西宮市","尼崎市"],
  "openingHours": ["Mo-Su 00:00-23:59"]
}
```

### AboutPage schema for /company/about/

```json
{
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": "https://www.setsubi-pro.net/company/about/#webpage",
  "name": "会社概要",
  "url": "https://www.setsubi-pro.net/company/about/",
  "inLanguage": "ja",
  "isPartOf": {
    "@id": "https://www.setsubi-pro.net/#website"
  },
  "about": {
    "@id": "https://www.setsubi-pro.net/#organization"
  }
}
```

---

## 6. Schema Conflicts

No direct type conflicts (e.g., same entity declared with contradictory @type). However, there are entity duplication issues:

- **LocalBusiness and Organization are separate entities** but both describe the same business. This is acceptable practice (Organization = legal entity, LocalBusiness = physical service location). However, the LocalBusiness blocks do not link back to the Organization `@id`, so the graph is fragmented.
- **Three LocalBusiness blocks** (Kanto, Osaka, Hyogo) on /water/ are structurally independent with no parent Organization reference. Adding `"parentOrganization": {"@id": "https://www.setsubi-pro.net/#organization"}` to each would unify the graph.

---

## 7. Prioritized Action List

| Priority | Issue | Fix |
|---|---|---|
| Critical | Broken breadcrumb `#` URL on /water/ | Replace item[2].item with `https://www.setsubi-pro.net/water/` |
| Critical | Broken breadcrumb `#` URL on /water/toilet/ | Replace item[3].item with `https://www.setsubi-pro.net/water/toilet/` |
| High | 兵庫 LocalBusiness no streetAddress/postalCode | Add real address fields |
| Moderate | Trailing slash inconsistency in schema URLs | Standardize all schema URLs to match canonical (with trailing slash) |
| Moderate | Organization missing sameAs | Add GMB, social profile URLs |
| Moderate | Service areaServed on /water/toilet/ incomplete | Add Kanto prefectures |
| Moderate | Article author/publisher using @id reference | Refactor to reference `#organization` |
| Moderate | Add Service schema to /water/ category page | New block per recommendation above |
| Low | FAQPage blocks on all pages | Info-only: no Google SERP benefit; can retain or remove |
| Low | logo ImageObject missing width/height | Add dimensions |
| Low | AboutPage schema on /company/about/ | New block per recommendation above |
| Low | AggregateRating if reviews exist on site | Evaluate; high value if review data is available |
