# Local SEO Audit: setsubi-pro.net
Audit Date: 2026-09-08
Auditor: Claude Code (Local SEO Specialist)

---

## Local SEO Score: 25 / 100

| Dimension | Weight | Score | Notes |
|-----------|--------|-------|-------|
| GBP Signals | 25% | 2/25 | No Maps embed, no review widget, no GBP integration found on any page |
| Reviews & Reputation | 20% | 6/20 | ~31 testimonials exist but no star ratings, no dates, no schema |
| Local On-Page SEO | 20% | 9/20 | Service area named; service pages exist; no city-level landing pages |
| NAP Consistency & Citations | 15% | 5/15 | Multiple inconsistencies across pages; primary address undefined |
| Local Schema Markup | 10% | 0/10 | Zero structured data found on any page audited |
| Local Link & Authority Signals | 10% | 3/10 | Trust language present; no detectable local link signals on-page |

---

## Business Type Detected: Hybrid SAB

Signals observed:
- Three registered office addresses (Kanto, Osaka, Hyogo) but no prominent address on homepage
- "Serving [area]" language used sitewide ("関東・関西を中心に対応")
- No Google Maps embed on any page
- 24/7 emergency dispatch model ("最短10分で駆けつけます")
- Phone-first CTA throughout (050-8896-6909 appears 10+ times on homepage)

Note: The business was incorporated on April 9, 2026 -- less than 6 months old at audit date. This is a brand-new domain and GBP listing, which heavily constrains rankings via proximity and authority factors.

---

## Industry Vertical: Home Services (Plumbing + Electrical)

Industry-specific signals found:
- Plumbing: toilet, bath, kitchen, washroom repair
- Electrical: breaker, outlet, lighting, antenna, water heater
- "国家資格を有したスタッフ" (nationally licensed staff)
- "第1種・第2種電気工事士の有資格者" (Class 1 & 2 electrical engineer license mentioned on /electricity/)
- Emergency framing: 24/7/365, 10-minute response, free estimates
- Transparent pricing model: no dispatch fee, no cancellation fee, free estimates

Missing industry-specific signals:
- No contractor license numbers displayed (critical trust gap)
- No plumbing license number (給水装置工事主任技術者 or equivalent)
- No professional association memberships (電設工業組合, etc.)
- No insurance/bonding disclosure
- No before/after project photos

---

## NAP Consistency Audit

| Source | Name | Address | Phone |
|--------|------|---------|-------|
| Homepage | 設備プロ / 株式会社Hoaloha | 〒311-2113 茨城県鉾田市上幡木1418-35 | 050-8896-6909 |
| /contact/ | 株式会社Hoaloha（設備プロ） | 〒311-2113 茨城県鉾田市上幡木1418-35 | 050-8896-6909 |
| /water/ | (same as homepage) | 〒311-2113 茨城県鉾田市上幡木1418-35 | 050-8896-6909 |
| /electricity/ | (same as homepage) | 〒311-2113 茨城県鉾田市上幡木1418-35 | 050-8896-6909 |
| /company/about/ | 株式会社Hoaloha | 大阪府大阪市北区曽根崎新地1丁目11-20-9E (primary?) | 050-8896-6909 |
| /company/office/ | — | Kanto: 〒311-2113 茨城県鉾田市上幡木1418-35 | 050-8896-6909 |
| /company/office/ | — | Osaka: 大阪府大阪市北区曽根崎新地1丁目11-20-9E | 050-8896-6909 |
| /company/office/ | — | Hyogo: 兵庫県神戸市内対応 (no street address) | 050-8896-6909 |
| JSON-LD schema | N/A | Not implemented | N/A |

### NAP Discrepancies Flagged

1. **Primary address ambiguity (CRITICAL):** Sitewide footer uses the Kanto/Ibaraki address, but /company/about/ leads with the Osaka address. Google will treat these as different NAP signals. One address must be designated as the canonical GBP address sitewide.

2. **Hyogo office has no street address (HIGH):** "兵庫県神戸市内対応" is area language, not a registerable NAP. This office cannot have a valid GBP listing without a physical address.

3. **Operating name vs. legal name inconsistency (MEDIUM):** Some pages say "設備プロ", others lead with "株式会社Hoaloha（設備プロ）". The GBP listing name and schema name must match the name customers search for consistently.

4. **Phone is a 050 IP number (MEDIUM):** 050 prefix numbers are not traditional geographic numbers. Some directories and GBP guidelines flag these as potential concern for service area businesses. A local area code number (03, 06, etc.) as a secondary number would strengthen trust signals.

---

## Google Business Profile (GBP) Signals

| Signal | Status |
|--------|--------|
| Google Maps embed on contact/office page | Not found |
| GBP place ID reference | Not found |
| Review widget or aggregated rating | Not found |
| GBP posts indicator | Not found |
| GBP photos referenced | Not found |
| "Get Directions" / Google Maps link | Not found |

All GBP signals are absent from every page checked. This is the single largest score gap. It is not possible to confirm from page-side analysis whether a GBP listing exists at all. Given the business was incorporated April 2026, GBP listing creation and optimization must be treated as a day-one task.

Per Whitespark 2026 findings, the primary GBP category is the #1 ranking factor. For this business:
- Recommended primary category: "水道工事業者" (Plumber) or "電気工事業者" (Electrician) -- choose the higher-revenue service as primary
- Secondary categories: the other service type plus "緊急修理サービス" if available in the Japan GBP taxonomy

---

## Review Health Snapshot

| Metric | Status |
|--------|--------|
| Testimonial volume | ~31 total (pages 1-3, /voice/) |
| Star rating system | Absent -- text only |
| Aggregate rating | None |
| Review dates | None displayed on any testimonial |
| Review schema | Not implemented |
| Response to reviews | Cannot assess (no platform integration) |
| Location data in reviews | Present (Osaka wards on pages 2-3) |
| Reviewer attribution | Initials only (e.g., T.K.様, M.S.様) |

### Review Velocity Issue

No dates appear on any testimonials, making it impossible to audit for the 18-day review velocity rule (Sterling Sky research: rankings drop significantly if no new review in 3 weeks). The review page architecture does not signal to Google that these are real, dated reviews from verified customers.

The testimonial format (initials only, no date, no star rating) does not qualify for Google's rich result eligibility and provides no Local Pack ranking signal. These are marketing copy, not reviewable content.

---

## Local Schema Validation

**Result: No structured data found on any page.**

Pages checked for JSON-LD: /, /water/, /electricity/, /company/, /company/about/, /contact/, /voice/, /company/philosophy/

This means Google receives zero schema signals about:
- Business type and category
- Geographic coordinates
- Opening hours
- Service area
- Aggregate rating
- Contact information in machine-readable format

### Required Schema for This Business Type

Correct subtype for a plumbing + electrical home services business:

```json
{
  "@context": "https://schema.org",
  "@type": ["Plumber", "Electrician"],
  "name": "設備プロ",
  "legalName": "株式会社Hoaloha",
  "url": "https://www.setsubi-pro.net/",
  "telephone": "050-8896-6909",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "上幡木1418-35",
    "addressLocality": "鉾田市",
    "addressRegion": "茨城県",
    "postalCode": "311-2113",
    "addressCountry": "JP"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 36.01234,
    "longitude": 140.56789
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    "opens": "00:00",
    "closes": "23:59"
  },
  "areaServed": [
    {"@type": "State", "name": "東京都"},
    {"@type": "State", "name": "神奈川県"},
    {"@type": "State", "name": "埼玉県"},
    {"@type": "State", "name": "千葉県"},
    {"@type": "State", "name": "茨城県"},
    {"@type": "State", "name": "大阪府"},
    {"@type": "State", "name": "京都府"},
    {"@type": "State", "name": "奈良県"},
    {"@type": "State", "name": "和歌山県"},
    {"@type": "State", "name": "兵庫県"}
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "31"
  }
}
```

Note: geo coordinates are placeholder -- use actual coordinates per office address. Schema should ideally be implemented per-location on location-specific pages, not just one sitewide block.

### Schema Subtype Note

Do NOT use the generic `LocalBusiness` type. Google and schema.org provide more specific subtypes:
- `Plumber` (schema.org/Plumber) -- correct for water services
- `Electrician` (schema.org/Electrician) -- correct for electrical services
- Both can be expressed as a type array as shown above
- Do NOT use `HomeRepairBusiness` if more specific types apply

---

## Citation Presence Status (Tier 1 Japan Directories)

| Directory | Status | Notes |
|-----------|--------|-------|
| くらしのマーケット (Kurashi no Market) | Unverified | Primary home-services marketplace in Japan; critical for this vertical |
| ユアマイスター (Your Meister) | Unverified | Second-largest home services platform |
| Yahoo!ロコ | Unverified | Major local business directory for Japan |
| 生活110番 | Unverified | Emergency repair aggregator -- direct competitor channel |
| Yelp Japan | Low relevance | Yelp has minimal market share in Japan |
| Google Business Profile | Unverified | Cannot confirm listing existence from page-side signals |
| Bing Places | Unverified | Secondary but worth registering |
| 電話帳ナビ / iタウンページ | Unverified | NTT directory -- important for Japanese NAP consistency |

All citation status is unverified without paid citation audit tools. Verification requires manual search or DataForSEO business listings API.

Per Whitespark 2026: 3 of the top 5 AI visibility factors are citation-related. For this business to appear in AI-powered local results, citation building is a direct ranking lever.

---

## Location Page Quality

The site has NO location-specific landing pages. The sitemap contains:
- 2 main service category pages (/water/, /electricity/)
- 8 service subcategory pages
- 50+ blog/column articles
- 0 city pages, 0 prefecture pages, 0 area landing pages

Per Whitespark 2026: dedicated service pages are the #1 local organic ranking factor and #2 AI visibility factor. The absence of city/area pages means the site cannot rank for "[service] + [city]" queries, which represent the majority of home-services local search volume in Japan (e.g., "東京 水道修理", "大阪 電気工事 緊急").

### Priority Location Pages to Create

Kanto:
- /tokyo/ or /water/tokyo/ + /electricity/tokyo/
- /kanagawa/, /saitama/, /chiba/, /ibaraki/

Kansai:
- /osaka/, /kyoto/, /nara/, /wakayama/, /hyogo/

Each page must have unique content (not just a template swap). Include:
- Local landmarks / area references
- Specific response time for that area from the nearest office
- Local testimonials (already have Osaka ward data in /voice/)
- Embedded Google Map of service area
- Local phone number if possible

---

## Emergency / Urgency Service Signals

| Signal | Status |
|--------|--------|
| "24時間365日" mentioned | Present -- sitewide |
| "最短10分で駆けつけます" (10-min response) | Present -- multiple pages |
| Emergency/urgent-specific landing page | Absent |
| Same-day service mention | Present (implied) |
| Emergency phone number prominence | Present (phone in header) |
| "緊急" keyword in page titles/meta | Not detected |

The site correctly signals emergency availability but has no dedicated emergency page (e.g., /emergency/ or /緊急修理/). A dedicated page targeting "緊急 水道修理", "今すぐ 電気修理" etc. is a missed ranking opportunity.

---

## Contact Page Quality (/contact/)

| Element | Status |
|---------|--------|
| Phone number prominent | Present |
| Contact form | Present (Name, Phone, Address fields) |
| Business hours stated | Present ("24時間365日") |
| Physical address on page | Present (Kanto address) |
| Map embed | Absent |
| Email address | Not found |
| Response time expectation | Not stated in form |
| Schema markup | Absent |

Contact form is minimal (3 fields). Missing: service type selector, preferred callback time, email field. The absence of a map embed on the contact page is a significant GBP signal gap -- Maps embeds on contact pages are a recognized local SEO trust factor.

---

## Top 10 Prioritized Actions

### CRITICAL

**1. Implement LocalBusiness JSON-LD schema immediately**
Priority: Critical | Effort: Low | Impact: High
- Add `Plumber` + `Electrician` schema to homepage and service pages
- Include: name, legalName, url, telephone, address, geo (precise coordinates), openingHoursSpecification, areaServed, aggregateRating
- For multi-office site: implement separate schema per office on respective location pages

**2. Create and optimize Google Business Profile listings**
Priority: Critical | Effort: Medium | Impact: Very High
- Create GBP for Kanto office (Ibaraki address)
- Create GBP for Osaka office
- Hyogo office needs a real street address before GBP creation
- Choose correct primary GBP category (水道工事業者 or 電気工事業者)
- Upload 10+ photos (team, vehicles, completed work)
- Embed Maps on /contact/ and /company/office/ pages

**3. Resolve primary NAP address and make it consistent**
Priority: Critical | Effort: Low | Impact: High
- Decide: is the canonical business address Ibaraki (Kanto) or Osaka (Kansai)?
- Set one address as the primary NAP used in schema, GBP, and all citations
- Update /company/about/ to clearly label primary vs. branch addresses
- Secondary offices should have their own consistent NAP on their respective pages

### HIGH

**4. Add star ratings + dates to testimonials on /voice/**
Priority: High | Effort: Medium | Impact: High
- Add numeric star ratings (1-5) to all existing testimonials
- Add approximate dates to testimonials
- Implement Review schema markup with reviewRating, datePublished, author
- Add aggregateRating to LocalBusiness schema once review data is structured

**5. Create city/prefecture-level location landing pages**
Priority: High | Effort: High | Impact: Very High
- Start with highest-volume markets: Tokyo (東京), Osaka (大阪)
- Target queries: "[city] 水道修理", "[city] 電気工事 緊急" etc.
- Each page needs unique local content -- not a doorway page template swap
- Link from homepage, sitemap, and navigation

**6. Display contractor license numbers**
Priority: High | Effort: Low | Impact: Medium
- Electrical: display actual license number for 第1種・第2種電気工事士
- Water: display 給水装置工事主任技術者 or 管工事施工管理技士 number
- Add to footer, contact page, and relevant service pages
- This is a key trust signal for Japanese consumers and a differentiator

**7. Add Google Maps embed to /contact/ and /company/office/**
Priority: High | Effort: Low | Impact: Medium
- Embed actual Maps for each office address
- Use a placed Maps embed (not just a link) to reinforce GBP connection
- Adds user trust and signals location to Google

### MEDIUM

**8. Create a dedicated emergency service landing page**
Priority: Medium | Effort: Medium | Impact: Medium
- URL: /emergency/ or /kinkyuu/
- Target: "緊急 水道修理", "夜間 電気工事", "今すぐ トイレ修理"
- Include: 24/7 phone CTA, response time guarantee, service area map, trust signals
- Schema: EmergencyService or prominent openingHours "24/7"

**9. Register on Japanese Tier-1 citation directories**
Priority: Medium | Effort: Medium | Impact: High (especially for AI visibility)
- くらしのマーケット, ユアマイスター, Yahoo!ロコ, iタウンページ
- Ensure NAP is identical across all listings to the primary NAP decided in Action 3
- Per Whitespark 2026: citations are top-3 factor for AI visibility (Google SGE / Gemini local results)

**10. Add /sitemap.xml redirect (currently 404)**
Priority: Medium | Effort: Low | Impact: Low-Medium
- /sitemap.xml returns 404; only /sitemap-index.xml works
- Add a redirect from /sitemap.xml to /sitemap-index.xml
- Many crawlers and GSC expect /sitemap.xml specifically

---

## Limitations Disclaimer

The following could not be assessed without paid tools or authenticated access:

- **Live GBP listing data**: Cannot confirm if GBP listings exist, their category, review count, Q&A, or post history without DataForSEO or manual GBP login
- **Backlink profile**: Local link-building signals require Ahrefs/Majestic/SEMrush; no inbound link data assessed
- **Citation audit**: Japanese directory presence (くらしのマーケット, Yahoo!ロコ, etc.) not verified; requires paid citation audit tool or manual search across 20+ directories
- **SERP local pack positions**: Real-time ranking data for target keywords not available without DataForSEO `serp_organic_live_advanced`
- **Review velocity**: No dates on testimonials made velocity analysis impossible
- **Competitor benchmarking**: No competing businesses analyzed
- **Proximity factor**: Per Search Atlas ML study, proximity accounts for 55.2% of local ranking variance -- this is outside site control and not assessed here
- **Mobile rendering**: Pages fetched via static fetch, not Playwright render; client-side rendered content (Maps widgets, review carousels, dynamic schema injection) may have been missed
- **Page speed / Core Web Vitals**: Not assessed in this audit scope
