# Story 4.4: Build Process Flow, FAQ, Privacy, Sitemap, and 404 Pages

Status: done

## Story

As a visitor,
I want dedicated pages for process flow, FAQ, privacy policy, sitemap, and a helpful 404 page,
so that I can find detailed information and navigate even when landing on a broken link.

## Acceptance Criteria

1. **Process Flow Page (`/flow`):** ProcessFlow component displays the full 5-step process (ご相談→ご訪問→お見積り→作業→お支払) with detailed descriptions and CTABlock sections between/after steps.
2. **FAQ Page (`/faq`):** FAQAccordion displays all FAQ entries from `content/faq/` collection organized by category tabs/sections, using native `<details>/<summary>` with zero JavaScript.
3. **Privacy Policy Page (`/privacy`):** Privacy policy content displays with proper heading structure (10 articles matching original site).
4. **HTML Sitemap Page (`/sitemap`):** All pages organized by category with links.
5. **404 Page:** Simple message + link to homepage + phone number CTA. No elaborate illustrations — functional and conversion-focused.
6. All pages include Breadcrumb, CTABlock sections, and proper heading hierarchy.
7. All pages follow the KV banner pattern established in company pages (blue `#0044f2` bg, h1, decorative Roboto text).

## Tasks / Subtasks

- [x] Task 1: Create `/flow` page (AC: #1, #6, #7)
  - [x] Create `src/pages/flow.astro` with KV banner ("作業の流れ" / "Flow")
  - [x] Add Step 5 "お支払" to the flow (currently only 4 steps in ProcessFlow component)
  - [x] Either extend ProcessFlow.astro with a `steps` prop or create a dedicated full-page version
  - [x] Add payment methods section after steps
  - [x] Add CTABlock between/after steps
  - [x] Fetch and match layout from star-light15.net/flow
- [x] Task 2: Create `/faq` page (AC: #2, #6, #7)
  - [x] Create `src/pages/faq.astro` with KV banner ("よくある質問" / "Question")
  - [x] Add more FAQ entries to `src/content/faq/` (original site has 30+ entries across 6 categories)
  - [x] Display FAQ entries grouped by category with category headings
  - [x] Reuse existing `FAQAccordion.astro` component
- [x] Task 3: Create `/privacy` page (AC: #3, #6, #7)
  - [x] Create `src/pages/privacy.astro` with KV banner ("プライバシーポリシー" / "Privacy")
  - [x] Add full 10-article privacy policy content (hardcoded or data file)
- [x] Task 4: Create `/sitemap` page (AC: #4, #6, #7)
  - [x] Create `src/pages/sitemap.astro` with KV banner ("サイトマップ" / "Sitemap")
  - [x] List all pages organized by service category, company, and utility pages
  - [x] Dynamically generate links from NAVIGATION + content collections
- [x] Task 5: Create 404 page (AC: #5)
  - [x] Create `src/pages/404.astro`
  - [x] Show message, homepage link, and phone CTA using `SITE_CONFIG.phone`
  - [x] Keep minimal — no heavy layout needed

## Dev Notes

### CRITICAL: Fetch Original Site Before Implementing

Per project convention, **always fetch CSS/HTML from star-light15.net** before implementing any page. Check these URLs:
- `https://star-light15.net/flow` — 5-step process with payment section
- `https://star-light15.net/question` — FAQ page (note: URL is `/question` on original, we use `/faq`)
- `https://star-light15.net/privacy` — 10-article privacy policy
- `https://star-light15.net/sitemap` — hierarchical sitemap with geographic breakdown

### Existing Components to Reuse

| Component | Path | Notes |
|-----------|------|-------|
| `ProcessFlow.astro` | `src/components/ProcessFlow.astro` | Currently has 4 steps. Add Step 5 (お支払/Payment) or accept steps as prop |
| `FAQAccordion.astro` | `src/components/FAQAccordion.astro` | Takes `items: {question, answer}[]`. Zero JS, `<details>/<summary>` |
| `BaseLayout.astro` | `src/layouts/BaseLayout.astro` | Standard page wrapper with Header/Footer |
| `Breadcrumb.astro` | `src/components/Breadcrumb.astro` | Standard breadcrumb, `items: {label, href}[]` |
| `CTABlock.astro` | `src/components/CTABlock.astro` | CTA block for phone/contact |

### KV Banner Pattern (from company pages)

```astro
<section class="bg-[#0044f2] h-[240px] relative flex items-center overflow-hidden">
  <div class="max-w-[1200px] mx-auto px-4 w-full relative">
    <h1 class="text-[48px] font-black text-white ml-[45px]">PAGE_TITLE</h1>
    <p class="font-[Roboto] text-[120px] font-bold text-white opacity-20 absolute top-1/2 left-[20px] -translate-y-1/2 capitalize">ENGLISH_WORD</p>
  </div>
</section>
```

### Navigation Already Configured

In `src/utils/siteConfig.ts` (line 309-327): `/flow` → "作業の流れ", `/faq` → "よくある質問" are already present. No nav changes needed.

### ProcessFlow Step 5 Details (from original site)

The existing `ProcessFlow.astro` has 4 steps. Original site has 5 steps. Add Step 5:
```
Step 5: お支払 (Payment)
Title: お支払
Heading: 作業完了後、お支払いとなります
Description: Multiple payment methods available (cash, credit/debit, bank transfer)
Image: /images/process/flow_05.jpg (need to verify if image exists)
```

### FAQ Content Structure

Current state: 5 FAQ entries in `src/content/faq/` (faq-001 to faq-005). Original site has 30+ entries across 6 categories:
- 電気トラブル (Electricity) — ~12 entries
- 水まわりトラブル (Plumbing) — ~12 entries
- 会社について (Company) — 3 entries
- 作業について (Work) — 3 entries
- お支払いについて (Payment) — 3 entries
- その他 (Other) — 2 entries

Schema already supports categories: `'general' | 'electricity' | 'water' | 'pest-control' | 'pricing' | 'process'`.

**Category mapping consideration:** Original site uses different category names. Map appropriately:
- 会社について → `general`
- 作業について → `process`
- お支払いについて → `pricing`
- その他 → `general`

For MVP: At minimum add enough entries to have 2+ per category. Fetch actual Q&A text from original site.

### Privacy Policy Content

Full 10-article privacy policy from original site (合同会社スターライト). Content is standard Japanese privacy policy. Hardcode in page file or create a data file. Articles:
1. 個人情報 (Personal Information definition)
2. 個人情報の収集方法 (Collection methods)
3. 個人情報を収集・利用する目的 (Collection/use purposes)
4. 利用目的の変更 (Purpose changes)
5. 個人情報の第三者提供 (Third-party disclosure)
6. 個人情報の開示 (Disclosure)
7. 個人情報の訂正および削除 (Correction/deletion)
8. 個人情報の利用停止等 (Usage suspension)
9. プライバシーポリシーの変更 (Policy changes)
10. お問い合わせ窓口 (Contact: info@star-light15.net)

### Sitemap Page

Generate dynamically from available data:
- Service categories from `CATEGORY_CONFIGS` in siteConfig
- Individual services from content collections
- Company pages (会社案内, 企業理念, 拠点案内)
- Utility pages (作業の流れ, よくある質問, プライバシーポリシー, お問い合わせ)
- Do NOT include geographic breakdown (that's for SEO, not MVP)

### 404 Page

Keep simple and conversion-focused:
- Short message: "お探しのページが見つかりません"
- Link to homepage
- Phone number CTA using `SITE_CONFIG.phone`
- Use BaseLayout but no KV banner needed
- No elaborate illustrations

### File Structure

```
src/pages/
├── flow.astro          # NEW
├── faq.astro           # NEW
├── privacy.astro       # NEW
├── sitemap.astro       # NEW
├── 404.astro           # NEW
src/content/faq/
├── faq-001.json        # EXISTS
├── ...
├── faq-006.json+       # NEW (add more entries)
src/components/
├── ProcessFlow.astro   # UPDATE (add Step 5 or accept steps prop)
```

### Testing

- `astro build` — no errors
- Verify all 5 new pages generate HTML
- Check each page has correct Breadcrumb, KV banner, CTABlock
- Verify FAQ accordion expands/collapses (zero JS, native details/summary)
- Verify 404 page renders for non-existent URLs
- Test mobile responsiveness on all pages
- Verify all internal links work

### Previous Story (4-3) Learnings

- KV banner pattern is consistent: bg-[#0044f2], h-[240px], h1 text-[48px] font-black, decorative Roboto text-[120px] opacity-20
- Use `max-w-[1200px] mx-auto px-4` for content containers
- Section padding: `py-[80px] md:py-[120px]`
- Always use `SITE_CONFIG.phone` for phone numbers (never hardcode)
- Breadcrumb: 2-level for top pages (TOP > Page), 3-level for sub-pages
- Company pages data approach: used `src/data/companyData.ts` for static content — consider similar pattern for privacy policy content

### References

- [Source: _bmad-output/planning-artifacts/epics.md — Epic 4, Story 4.4]
- [Source: _bmad-output/planning-artifacts/architecture.md — Pages structure, FAQ pattern, Error handling]
- [Source: src/components/ProcessFlow.astro — Current 4-step implementation]
- [Source: src/components/FAQAccordion.astro — Existing FAQ accordion component]
- [Source: src/content.config.ts — FAQ schema with categories]
- [Source: src/utils/siteConfig.ts:285-332 — NAVIGATION config]
- [Source: src/pages/company/index.astro — KV banner pattern reference]
- [Source: Original site star-light15.net/flow, /question, /privacy, /sitemap]

## Dev Agent Record

### Agent Model Used
Claude Opus 4.6 (1M context)

### Debug Log References
- Fixed CATEGORY_CONFIGS import → SERVICE_CATEGORIES in sitemap.astro

### Completion Notes List
- Task 1: Created /flow page with KV banner, 5-step ProcessFlow (added Step 5 お支払), cost breakdown section, CTABlock. Extended ProcessFlow.astro with `steps` prop and `showPayment` prop for flexibility.
- Task 2: Created /faq page with 35 FAQ entries across 5 categories (electricity: 12, water: 12, general: 5, process: 2, pricing: 4). Category navigation with anchor links, grouped display using FAQAccordion component.
- Task 3: Created /privacy page with full 10-article privacy policy matching original site content.
- Task 4: Created /sitemap page dynamically generating links from SERVICE_CATEGORIES and content collections.
- Task 5: Created 404 page with message, homepage link, and phone CTA.
- All pages include Breadcrumb, KV banner (blue #0044f2), proper heading hierarchy.
- Build passes with zero errors. All pages return HTTP 200.

### File List
- src/pages/flow.astro (NEW)
- src/pages/faq.astro (NEW)
- src/pages/privacy.astro (NEW)
- src/pages/sitemap.astro (NEW)
- src/pages/404.astro (NEW)
- src/components/ProcessFlow.astro (MODIFIED — added Step 5, steps prop, showPayment prop)
- src/content/faq/faq-006.json through faq-035.json (NEW — 30 FAQ entries)

### Review Findings

- [x] [Review][Decision] `showPayment=false` vẫn render Step 5 payment → Fixed: filter Step 5 khi showPayment=false
- [x] [Review][Decision] 404 page thiếu Breadcrumb, CTABlock, KV banner → Fixed: thêm đủ components
- [x] [Review][Decision] Privacy page dùng max-w-[800px] → Fixed: đổi sang max-w-[1200px]
- [x] [Review][Patch] Step 5 heading và description trùng text → Fixed: description distinct
- [x] [Review][Patch] FAQ page thiếu category `pest-control` → Fixed: thêm vào categories array
- [x] [Review][Patch] `showPayment` conditional dùng Boolean cast → Fixed
- [x] [Review][Patch] 404 page thiếu canonicalUrl → Fixed
- [x] [Review][Patch] Sitemap hardcodes non-existent pages → Fixed: removed about/recruit
- [x] [Review][Patch] FAQ section padding sai → Fixed: py-[80px] md:py-[120px]
- [x] [Review][Patch] Sitemap page thiếu CTABlock → Fixed
- [x] [Review][Patch] Sitemap empty category filter → Fixed
- [x] [Review][Defer] Privacy page hardcoded content thay vì data file — deferred, design choice consistency
- [x] [Review][Defer] KV banner text overflow trên mobile — deferred, pre-existing pattern từ company pages
- [x] [Review][Defer] ProcessFlow padding không match spec values — deferred, pre-existing (homepage)
- [x] [Review][Defer] FAQ sortOrder default 0 gây unstable sort — deferred, pre-existing schema
