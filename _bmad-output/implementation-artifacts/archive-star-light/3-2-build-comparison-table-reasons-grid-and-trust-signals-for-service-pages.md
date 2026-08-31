# Story 3.2: Build Comparison Table, Reasons Grid, and Trust Signals for Service Pages

**Status:** review
**Story ID:** 3.2
**Epic:** Epic 3 - Service Pages (Water, Electrical, Pest Control)
**Created:** 2026-05-14

---

## User Story

**As a** visitor
**I want to** compare this service against competitors and see credentials,
**So that** I feel confident this is the best choice for my repair needs.

---

## Acceptance Criteria

1. **Given** a visitor scrolls to the comparison section on a service detail page
   **When** ComparisonTable renders
   **Then** it displays a 3-column table (当社 vs A社 vs B社) with ○/×/△ feature indicators
   **And** table uses proper `<table>` with `<thead>`, `<th scope="col">`, and `<caption>`
   **And** ○/× indicators have `aria-label="対応"` and `aria-label="非対応"` for screen readers (UX-DR8)
   **And** on mobile (< 768px), table has horizontal scroll with sticky first column

2. **When** ReasonsGrid renders on service detail page
   **Then** it displays 4 reasons with trust indicators including: licensed technicians, certifications (第1種/第2種電気工事士), years of experience
   **And** it accepts an optional `reasons` prop to allow service-specific content (defaults to existing hardcoded data)

3. **When** satisfaction guarantee messaging is present on the service detail page
   **Then** "no charge if unsatisfied" messaging is visible (FR16) — implemented as a callout section

---

## Tasks / Subtasks

- [x] Task 1: Create `ComparisonTable.astro` component (AC: #1)
  - [x] 1.1 Define TypeScript `Props` interface with `rows`, optional `title`
  - [x] 1.2 Migrate inline comparison table HTML from `[service].astro` to component
  - [x] 1.3 Add `<caption>` element to table (visually hidden is OK)
  - [x] 1.4 Move header row into proper `<thead>` with `<th scope="col">`
  - [x] 1.5 Add `aria-label="対応"` to all ○ cells and `aria-label="非対応"` to all × cells
  - [x] 1.6 Ensure sticky first column still works: `sticky left-0 z-[3]`
  - [x] 1.7 Replace inline table in `[service].astro` with `<ComparisonTable rows={comparisonData} />`

- [x] Task 2: Update `ReasonsGrid.astro` to accept optional props (AC: #2)
  - [x] 2.1 Add optional `reasons?: Reason[]` prop to interface
  - [x] 2.2 Default to existing hardcoded data if prop not provided (backwards-compatible)
  - [x] 2.3 Update `[service].astro` to pass service-specific reasons with certifications explicitly mentioned

- [x] Task 3: Add satisfaction guarantee callout section (AC: #3)
  - [x] 3.1 Add a guarantee callout near the ReasonsGrid section in `[service].astro`
  - [x] 3.2 Reference the original site for exact design pattern

---

## Dev Notes

### CRITICAL: Comparison Table Already Exists Inline — DO NOT Rebuild From Scratch

The comparison table is **already fully implemented as inline HTML** in `src/pages/services/[service].astro` (lines 261–329). **Your job is to EXTRACT it into a component**, not create it from scratch.

Current inline code structure to migrate:
```html
<section id="compare" class="py-12 md:py-16 lg:py-20">
  <div class="max-w-[1200px] mx-auto px-3 sm:px-4">
    <div class="border-[6px] border-[#e5e5e5] rounded-[...]">
      <h2>他社サービスと比較しました</h2>
      <div class="overflow-x-auto">
        <table ...>
          <tbody>
            <tr> <!-- HEADER ROW — needs to move to <thead> -->
              <th ...></th>  <!-- feature label column -->
              <th ...>設備人 logo</th>
              <th ...>A社</th>
              <th ...>B社</th>
            </tr>
            <!-- data rows -->
          </tbody>
        </table>
      </div>
    </div>
  </div>
</section>
```

**Accessibility fixes needed during extraction:**
1. Move the header `<tr>` from `<tbody>` to `<thead>`
2. Add `scope="col"` to all `<th>` in the header row
3. Add `<caption class="sr-only">設備人と他社サービスの比較</caption>` inside `<table>`
4. The last row has ○/× cells — add `aria-label="対応"` to ○ and `aria-label="非対応"` to × spans

### ReasonsGrid Current State

`src/components/ReasonsGrid.astro` has **hardcoded** reasons data. The component needs to accept optional `reasons` prop:

```typescript
interface Reason {
  icon: string;
  number: string;
  heading: string;
  headingHighlight: string;
  description: string;
}

interface Props {
  reasons?: Reason[];  // ADD THIS — defaults to hardcoded reasons
}

const { reasons: customReasons } = Astro.props;
const reasons = customReasons ?? defaultReasons;
```

**In `[service].astro`**, update the ReasonsGrid call to pass service-specific reasons that explicitly include certifications:
```astro
<ReasonsGrid reasons={serviceReasons} />
```

where `serviceReasons` includes a reason card explicitly mentioning 第1種/第2種電気工事士.

### Staff Qualifications Section (Already Inline — Leave As-Is)

The certifications block is already inline in `[service].astro` (lines 239–258). This shows 第1種/第2種電気工事士 with badge styling. **Do not remove or change it** — it satisfies part of AC #2 already. The `ReasonsGrid` reasons update just needs to reference qualifications in the description text.

### ComparisonTable Component Interface

Define the following TypeScript interface for `ComparisonTable.astro`:

```typescript
type CellValue =
  | { type: 'price'; amount: number }        // renders "X,XXX円[税込]〜"
  | { type: 'price-zero' }                   // renders "0円"
  | { type: 'circle' }                       // renders 〇 with aria-label="対応"
  | { type: 'cross' }                        // renders × with aria-label="非対応"
  | { type: 'triangle' }                     // renders △ with aria-label="要確認"
  | { type: 'text'; value: string };         // renders plain text

interface ComparisonRow {
  label: string;           // e.g. "作業料金", "出張料金"
  our: CellValue;
  competitorA: CellValue;
  competitorB: CellValue;
}

interface Props {
  rows: ComparisonRow[];
  title?: string;          // defaults to "他社サービスと比較しました"
  caption?: string;        // table caption (screen-reader, defaults to "設備人と他社サービスの比較")
}
```

**Existing comparison data from `[service].astro` to use as default stub data:**
```typescript
const comparisonData: ComparisonRow[] = [
  { label: '作業料金', our: { type: 'price', amount: 4000 }, competitorA: { type: 'price', amount: 4000 }, competitorB: { type: 'price', amount: 4000 } },
  { label: '基本料金', our: { type: 'price-zero' }, competitorA: { type: 'price-zero' }, competitorB: { type: 'price-zero' } },
  { label: '出張料金', our: { type: 'price-zero' }, competitorA: { type: 'price-zero' }, competitorB: { type: 'price-zero' } },
  { label: '早朝深夜料金', our: { type: 'price-zero' }, competitorA: { type: 'price-zero' }, competitorB: { type: 'text', value: '別途必要' } },
  { label: '年間対応実績', our: { type: 'text', value: '15,000件' }, competitorA: { type: 'text', value: '100,000件' }, competitorB: { type: 'text', value: '30,000件' } },
  { label: '即日対応', our: { type: 'circle' }, competitorA: { type: 'cross' }, competitorB: { type: 'circle' } },
];
```

### Rendering Patterns from Existing Inline Code

**Header styling** (preserve exactly):
```html
<thead>
  <tr>
    <th scope="col" class="bg-[#1c1c1c] text-white text-[11px] sm:text-[14px] md:text-[18px] font-bold p-2 sm:p-3 md:p-4 rounded-tl-lg"></th>
    <th scope="col" class="bg-[#1c1c1c] text-white p-2 sm:p-3 md:p-4">
      <img src="/images/site_logo.svg" alt="設備人" class="w-[60px] sm:w-[80px] md:w-[100px] mx-auto" />
    </th>
    <th scope="col" class="bg-[#1c1c1c] text-white text-[11px] sm:text-[14px] md:text-[18px] font-bold p-2 sm:p-3 md:p-4">A社</th>
    <th scope="col" class="bg-[#1c1c1c] text-white text-[11px] sm:text-[14px] md:text-[18px] font-bold p-2 sm:p-3 md:p-4 rounded-tr-lg">B社</th>
  </tr>
</thead>
```

**"Our" column cell highlighting** (yellow background):
- Even rows (白): `bg-[#ffffdb]` for "our" cell
- Odd rows (灰): `bg-[#f5f5c4]` for "our" cell

**Price rendering for "our" column:**
```html
<span class="font-[Roboto] text-[20px] sm:text-[28px] md:text-[40px] font-black text-[#ff4176]">
  4,000<span class="text-[10px] sm:text-[12px] md:text-[14px] font-semibold">円[税込]〜</span>
</span>
```

**Price rendering for competitor columns:**
```html
<span class="font-[Roboto] text-[16px] sm:text-[22px] md:text-[32px] font-medium text-[#3e3e3e]">
  4,000<span class="text-[10px] sm:text-[12px] md:text-[14px] font-semibold">円[税込]〜</span>
</span>
```

**Circle/Cross rendering (with aria-label):**
```html
<!-- ○ -->
<span class="font-[Roboto] text-[24px] sm:text-[32px] md:text-[40px] font-bold text-[#ff4176]"
      aria-label="対応">〇</span>
<!-- × -->
<span class="font-[Roboto] text-[24px] sm:text-[32px] md:text-[48px] font-light text-[#3e3e3e]"
      aria-label="非対応">×</span>
```

### File Structure

**New Files:**
- `src/components/ComparisonTable.astro` — NEW component

**Modified Files:**
- `src/components/ReasonsGrid.astro` — Add optional `reasons` prop (backward-compatible)
- `src/pages/services/[service].astro` — Use `<ComparisonTable>` component; pass service-specific reasons

### Satisfaction Guarantee (FR16)

Add a callout section after the ReasonsGrid section. Reference star-light15.net for exact styling. Minimal implementation: a styled `<div>` with text like「ご満足いただけない場合は料金をいただきません」inside a yellow/guarantee-styled box. Keep it simple — one paragraph with bold text and appropriate background color.

---

## Previous Story Intelligence

### From Story 3.1 Implementation

**Dev notes from story 3.1:**
- Build passed with stub `getStaticPaths()` returning `[{ params: { service: 'breaker' } }]`
- Service page uses section IDs: `price`, `reason`, `compare`, `area`, `flow`, `case`, `voice`, `faq`
- Note: anchor menu uses `compare` NOT `comparison` as the section ID — **do NOT change it**
- The comparison table section is `<section id="compare">` in `[service].astro`
- ReasonsGrid section is wrapped `<div id="reason">` in `[service].astro`
- `scroll-margin-top: 100px` is already set in `global.css` for all anchor IDs

**Color tokens from story 3.1 (use exactly):**
- Navy: `#0044f2`
- Yellow accent: `#fbc102`
- Red/pink: `#ff4176`
- Dark bg: `#1c1c1c`
- Highlight bg: `#ffffdb` / `#f5f5c4` (alternating yellow)
- Gray row: `#f0f0f0`
- Icon gray: `#b3b3b3` (background watermark text)

**Heading pattern (copy from ReasonsGrid or existing sections):**
```astro
<h2 class="text-[18px] sm:text-[22px] md:text-[42px] font-bold relative flex flex-col items-center text-center pt-8 sm:pt-10 md:pt-12 mb-6 sm:mb-8 md:mb-12">
  <span class="block w-[2px] h-[25px] sm:h-[40px] md:h-[70px] bg-[#fbc102]"></span>
  <span class="absolute top-[...] left-1/2 -translate-x-1/2 opacity-30 font-[Roboto] text-[40px] sm:text-[70px] md:text-[180px] font-bold text-[#b3b3b3] whitespace-nowrap -z-[1] pointer-events-none">Compare</span>
  他社サービスと比較しました
</h2>
```

**ReasonsGrid existing pattern:**
```astro
const { reasons: customReasons } = Astro.props;
const reasons = customReasons ?? defaultReasons;
```

### Mobile Responsive Patterns (From Recent Commits)

Recent commits (ea207a6 through 2a9c560) show consistent pattern for mobile fixes:
- Use `text-[Xpx] sm:text-[Ypx] md:text-[Zpx]` for progressive font scaling
- Add `max-w-[calc(100vw-XXpx)]` constraints on flex children to prevent overflow
- `overflow-x-auto` on table container for horizontal scroll
- `break-words max-w-full` on text containers

**Comparison table mobile fix:** The existing implementation already has `overflow-x-auto` on the container and `sticky left-0 z-[3]` on first-column `<th>` cells. Preserve these exactly.

---

## Technical Requirements

### Architecture Compliance

- Astro 6.x static components (no React needed — pure HTML table)
- Tailwind CSS v4 styling — mobile-first responsive classes
- TypeScript strict mode — define proper interfaces for Props
- No JavaScript islands required for this story

### Accessibility (WCAG 2.1 AA — Critical for This Story)

| Requirement | Implementation |
|-------------|---------------|
| Table caption | `<caption class="sr-only">設備人と他社サービスの比較</caption>` |
| Column headers | `<th scope="col">` in `<thead>` |
| Row headers | `<th scope="row">` or keep existing sticky `<th>` pattern |
| ○ aria-label | `aria-label="対応"` |
| × aria-label | `aria-label="非対応"` |
| △ aria-label | `aria-label="要確認"` |

### Important: Section IDs Must NOT Change

The anchor menu in `[service].astro` uses these IDs:
```
price → reason → compare → area → flow → case → faq
```
**Do not rename** `id="compare"` or `id="reason"`. The anchor menu links to these.

### File Location

- `src/components/ComparisonTable.astro` — follows component naming convention (PascalCase)
- Do NOT create `src/components/comparison-table.astro` (wrong naming)

---

## Project Context Reference

### Memory Notes

1. **Reference original site for UI** — Before finalizing ComparisonTable styles, fetch star-light15.net service detail page to verify exact comparison table design, row order, and cell formatting.

2. **Mobile Responsive Optimization** — Test on 320px viewport. Table must have horizontal scroll without breaking layout. The sticky first column pattern (`sticky left-0`) is already proven in the existing inline code.

### Success Definition for Story 3.2

✅ **ComparisonTable.astro created:**
- Extracted from inline HTML in `[service].astro`
- Proper `<thead>`, `<caption>`, `<th scope="col">`
- `aria-label` on all ○/× cells
- Mobile horizontal scroll with sticky first column preserved
- All existing visual styling preserved exactly

✅ **ReasonsGrid.astro updated:**
- Accepts optional `reasons` prop
- Backward-compatible (defaults to existing hardcoded data)
- Service page passes reasons mentioning certifications

✅ **Satisfaction guarantee visible:**
- "ご満足いただけない場合は料金をいただきません" messaging visible on service page

✅ **`[service].astro` updated:**
- Uses `<ComparisonTable rows={comparisonData} />` instead of inline HTML
- `<ReasonsGrid reasons={serviceReasons} />` with certification-mentioning reasons

✅ **`astro build` passes with no errors**

---

## Implementation Checklist

**Before Starting:**
- [ ] Read `src/pages/services/[service].astro` lines 239–329 (existing comparison table and staff section)
- [ ] Read `src/components/ReasonsGrid.astro` (understand current interface)
- [ ] Fetch star-light15.net service detail page comparison section for visual reference

**Building ComparisonTable.astro:**
- [ ] Create `src/components/ComparisonTable.astro`
- [ ] Define `CellValue` union type and `ComparisonRow` interface
- [ ] Add `<caption class="sr-only">` inside `<table>`
- [ ] Move header row to `<thead>` with `scope="col"` on each `<th>`
- [ ] Add `aria-label` to all ○ (対応) and × (非対応) spans
- [ ] Preserve `sticky left-0 z-[3]` on row label cells
- [ ] Preserve alternating row colors (white/gray + yellow highlight for "our" column)
- [ ] Import and replace inline table in `[service].astro`

**Updating ReasonsGrid.astro:**
- [ ] Add optional `reasons?: Reason[]` prop to interface
- [ ] Use `const reasons = customReasons ?? defaultReasons`
- [ ] Update `[service].astro` to define `serviceReasons` with certification info and pass as prop

**Adding Satisfaction Guarantee:**
- [ ] Add guarantee callout after ReasonsGrid section in `[service].astro`
- [ ] Reference star-light15.net for styling

**QA:**
- [ ] `astro build` passes with no errors
- [ ] Test on 320px — comparison table scrolls horizontally, first column sticks
- [ ] Verify section IDs unchanged: `compare`, `reason`
- [ ] Inspect accessibility with DevTools — table has caption, thead, scope="col"
- [ ] Verify aria-label on ○/× cells using accessibility inspector

---

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-6

### Debug Log References

_None_

### Completion Notes List

- Task 1: Tạo `ComparisonTable.astro` với đầy đủ TypeScript interface (`CellValue` union type, `ComparisonRow`, `Props`). Extract từ inline HTML của `[service].astro`, thêm `<caption class="sr-only">`, chuyển header row vào `<thead>` với `scope="col"`, thêm `aria-label` cho ○/× cells, giữ nguyên `sticky left-0 z-[3]` và alternating row colors.
- Task 2: Cập nhật `ReasonsGrid.astro` thêm `interface Props { reasons?: Reason[] }`, dùng `customReasons ?? defaultReasons` để backward-compatible. Cập nhật `[service].astro` truyền `serviceReasons` với đề cập rõ 第1種/第2種電気工事士.
- Task 3: Thêm satisfaction guarantee callout với text「ご満足いただけない場合は料金をいただきません」dùng yellow border box sau ReasonsGrid section.
- `astro build` pass không có lỗi.

### File List

#### New Files
- `src/components/ComparisonTable.astro`

#### Modified Files
- `src/components/ReasonsGrid.astro` — Add optional `reasons` prop
- `src/pages/services/[service].astro` — Use ComparisonTable component, add satisfaction guarantee
