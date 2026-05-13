# Story 4.1: Build Contact Form Page

Status: done

## Story

As a visitor,
I want to submit a contact request with my details and service needs,
so that I can request a consultation without making a phone call.

## Acceptance Criteria

1. **Given** a visitor navigates to `/contact`
   **When** the page renders
   **Then** the page displays Breadcrumb (TOP > 無料相談), section heading "修理相談" with English subtitle "Contact", and a ContactForm React island

2. **Given** the ContactForm renders
   **When** the visitor sees the form
   **Then** it displays a single-column form with 5 fields in order: お名前 (name), ご住所 (address), 電話番号 (phone), メールアドレス (email), 修理・交換の内容 (service category dropdown)

3. **Given** the service category dropdown
   **When** the visitor opens it
   **Then** it uses native `<select>` with `<optgroup>` groups:
   - 電気まわりのトラブル: ブレーカートラブル, コンセントトラブル, 照明トラブル, アンテナ工事, 給湯器交換
   - 水まわりのトラブル: トイレトラブル, キッチントラブル, お風呂トラブル, 洗面所トラブル

4. **Given** required fields
   **When** the form renders
   **Then** all 5 fields are marked with 「必須」 red badge next to label (not asterisk), every `<input>/<select>` has a visible `<label>`, input font-size is minimum 16px

5. **Given** form validation
   **When** a visitor exits a required field empty (blur) or submits with missing fields
   **Then** error messages display in Japanese below field: 「[フィールド名]を入力してください」 with red border, `aria-describedby` links errors to fields, `aria-required="true"` on required fields

6. **Given** IME composition
   **When** a visitor is typing Japanese via IME (compositionstart → compositionend)
   **Then** form submission is suppressed during composition to prevent premature submit

7. **Given** the page layout below the form
   **When** the visitor scrolls past the form
   **Then** a pricing trust section displays with heading "ご相談無料！必ず事前にお見積り" and text explaining: 作業費+材料費+処分費 only, no hidden fees (見積り費, 出張費, 早朝・深夜料金, キャンセル料 are all zero)

8. **Given** the full page structure
   **When** the page renders completely
   **Then** CTABlock variant="full-width" appears below the trust section, before footer

9. **Given** accessibility requirements
   **When** a keyboard user navigates the form
   **Then** all form elements are focusable via Tab with visible focus ring (2px navy outline, 2px offset), all labels are associated with inputs

## Tasks / Subtasks

- [x] Task 1: Create `src/pages/contact.astro` page (AC: #1, #7, #8)
  - [x] Import BaseLayout, Breadcrumb, CTABlock, ContactForm
  - [x] Set page title: "無料相談｜設備人" and meta description
  - [x] Add Breadcrumb with items: [{label: "TOP", href: "/"}, {label: "無料相談", href: "/contact"}]
  - [x] Add section heading matching site pattern (vertical gold line + English watermark "Contact" + Japanese "修理相談")
  - [x] Mount ContactForm as React island with `client:load`
  - [x] Add pricing trust section below form (ご相談無料！必ず事前にお見積り)
  - [x] Add CTABlock variant="full-width" at bottom

- [x] Task 2: Create `src/components/ContactForm.tsx` React island (AC: #2, #3, #4, #5, #6, #9)
  - [x] Build single-column form with 5 fields: name, address, phone, email, service-category
  - [x] Implement `<select>` with `<optgroup>` for service categories (electricity 5 + water 4 — NO pest control in original)
  - [x] Add 「必須」 red badge on all field labels
  - [x] Implement validation on blur + submit with Japanese error messages
  - [x] Handle IME composition events (compositionstart/compositionend)
  - [x] Add aria attributes: `aria-required`, `aria-describedby` for errors
  - [x] Add privacy policy link/text near submit area
  - [x] Style submit button matching site design patterns

## Dev Notes

### CRITICAL: Original Site Differences from Epics/PRD

The original site's contact form at star-light15.net/contact has key differences from the epics specification:

1. **Only 5 fields, NO textarea** — The original form does NOT have a free-text description textarea. Fields are: name, address, phone, email, service-category dropdown. The epics mention "description textarea" but the original site omits it. **Follow the original site** since this is a pixel-perfect clone.

2. **No pest control in dropdown** — The original dropdown only has 2 optgroups: 電気まわりのトラブル (5 items) and 水まわりのトラブル (4 items). No pest control category. **Follow the original site**.

3. **Privacy policy section** — The original has a privacy policy reference near the form (not a checkbox, more of an implicit agreement statement).

4. **Below-form trust section** — The original has a "ご相談無料！必ず事前にお見積り" pricing reassurance section BELOW the form, not above it.

### Section Heading Pattern

The project uses a consistent section heading pattern across the homepage. Replicate exactly:

```html
<h2 class="text-[24px] md:text-[42px] font-bold relative flex flex-col items-center text-center">
  <span class="block w-[2px] h-[40px] md:h-[70px] bg-[#fbc102]"></span>
  <span class="absolute top-[40px] md:top-[45px] left-1/2 -translate-x-1/2 opacity-30 font-[Roboto] text-[70px] md:text-[180px] font-bold text-[#b3b3b3] whitespace-nowrap -z-[1] pointer-events-none">Contact</span>
  修理相談
</h2>
```

### ContactForm.tsx Implementation

- **React island** — Use `client:load` directive since form needs immediate interactivity
- **@formspree/react** — Already installed in package.json. Use `useForm` hook from `@formspree/react`
- **Formspree ID** — Read from `import.meta.env.PUBLIC_FORMSPREE_ID`
- **Honeypot field** — Formspree provides built-in honeypot. Include a hidden `_gotcha` field for spam protection
- **Total JS budget** — Target ~8KB gzip for this island

### Form Field Specifications

| Field | Label | Type | HTML Element | Required |
|-------|-------|------|-------------|----------|
| name | お名前 | text | `<input type="text">` | Yes (必須) |
| address | ご住所 | text | `<input type="text">` | Yes (必須) |
| phone | 電話番号 | tel | `<input type="tel">` | Yes (必須) |
| email | メールアドレス | email | `<input type="email">` | Yes (必須) |
| service | 修理・交換の内容 | select | `<select>` with `<optgroup>` | Yes (必須) |

### Service Category Dropdown Options

```tsx
<select>
  <option value="">選択してください</option>
  <optgroup label="電気まわりのトラブル">
    <option value="breaker">ブレーカートラブル</option>
    <option value="outlet">コンセントトラブル</option>
    <option value="lighting">照明トラブル</option>
    <option value="antenna">アンテナ工事</option>
    <option value="water-heater">給湯器交換</option>
  </optgroup>
  <optgroup label="水まわりのトラブル">
    <option value="toilet">トイレトラブル</option>
    <option value="kitchen">キッチントラブル</option>
    <option value="bath">お風呂トラブル</option>
    <option value="washroom">洗面所トラブル</option>
  </optgroup>
</select>
```

### Validation Rules

- All fields required — show 「[フィールド名]を入力してください」on empty
- Email — additionally validate format: 「正しいメールアドレスを入力してください」
- Phone — validate digits/hyphens: 「正しい電話番号を入力してください」
- Validate on blur (field exit) AND on submit
- Show red border (#E53935) + error text below field on error
- Clear error when user starts typing in the field

### IME Composition Handling

```tsx
const [isComposing, setIsComposing] = useState(false);

const handleSubmit = (e: React.FormEvent) => {
  if (isComposing) {
    e.preventDefault();
    return;
  }
  // ... validation and submission
};

// On each input:
<input
  onCompositionStart={() => setIsComposing(true)}
  onCompositionEnd={() => setIsComposing(false)}
/>
```

### Required Badge Pattern

```tsx
<label>
  お名前
  <span className="inline-block ml-2 px-2 py-0.5 bg-[#E53935] text-white text-[11px] font-bold rounded">
    必須
  </span>
</label>
```

### Form Styling Guidelines

- Single-column layout, full-width fields
- Labels above fields, always visible (never placeholder-only)
- Input styling: border, rounded corners, padding, min-height 44px for touch targets
- Input font-size: 16px minimum (prevents iOS zoom on focus — already set in global.css)
- Field spacing: 16-24px between fields
- Form max-width: match content container (~800px within the 1200px page container)
- Background: white or light section

### Page Layout Structure (Top to Bottom)

1. Breadcrumb: TOP > 無料相談
2. Section heading: "修理相談" with "Contact" English watermark
3. ContactForm React island (5 fields + submit)
4. Privacy policy reference text
5. Trust section: "ご相談無料！必ず事前にお見積り" with fee explanation
6. CTABlock variant="full-width"
7. Footer (via BaseLayout)

### Architecture Compliance

- **Import phone/company data from siteConfig.ts** — never hardcode phone numbers
- **Use Astro `<Image>` for any images** — never raw `<img>` (though this page is mostly form, minimal images)
- **Props interface** on ContactForm.tsx — even if minimal, define the interface
- **Tailwind utilities only** — no custom CSS classes
- **React island boundary** — ContactForm.tsx is the ONLY JS on this page
- **Data flow** — Page-level data (like section headings, trust text) stays in contact.astro. Form logic lives in ContactForm.tsx.

### Existing Component Reuse

- `BaseLayout.astro` — page shell (header, footer, sticky CTA bar already included)
- `Breadcrumb.astro` — generates BreadcrumbList Schema.org + visual breadcrumb
- `CTABlock.astro` variant="full-width" — phone + email CTA block with service buttons
- `CTABlock.astro` variant="sticky" — already rendered by BaseLayout (mobile bottom bar)

### Files to Create

| File | Type | Action |
|------|------|--------|
| `src/pages/contact.astro` | Astro page | NEW |
| `src/components/ContactForm.tsx` | React island | NEW |

### Files to Reference (Read-Only)

| File | Why |
|------|-----|
| `src/layouts/BaseLayout.astro` | Page shell pattern |
| `src/components/Breadcrumb.astro` | Breadcrumb API (items prop) |
| `src/components/CTABlock.astro` | CTA block variants |
| `src/utils/siteConfig.ts` | Service categories, phone config |
| `src/styles/global.css` | Design tokens, form input base styles |
| `src/pages/index.astro` | Section heading pattern, spacing conventions |
| `.env.example` | PUBLIC_FORMSPREE_ID variable |

### Testing Checklist

- [ ] Form renders with all 5 fields and labels
- [ ] 必須 badges visible on all fields
- [ ] Service dropdown shows 2 optgroups with correct options
- [ ] Blur validation shows Japanese error messages
- [ ] Submit with empty fields shows all errors
- [ ] Email format validation works
- [ ] Phone number validation works
- [ ] IME composition doesn't trigger premature submit
- [ ] Tab navigation works through all form elements
- [ ] Focus ring visible on keyboard navigation
- [ ] Trust section visible below form
- [ ] CTABlock renders at page bottom
- [ ] Breadcrumb shows correct path
- [ ] Page responsive: mobile (320px) to desktop (1440px)
- [ ] Input fields don't zoom on iOS focus (font-size >= 16px)
- [ ] `astro build` succeeds with no errors

### References

- [Source: epics.md#Story 4.1] — Story requirements and acceptance criteria
- [Source: architecture.md#Frontend Architecture] — React island pattern, JS budget
- [Source: architecture.md#Implementation Patterns] — Form validation, error handling patterns
- [Source: ux-design-specification.md#Form Patterns] — Contact form field order, layout, IME handling
- [Source: ux-design-specification.md#UX Consistency Patterns] — Button hierarchy, feedback patterns, required badge
- [Source: prd.md#FR8, FR9] — Contact form functional requirements
- [Source: original site star-light15.net/contact] — Actual form layout reference (5 fields, no textarea)

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (1M context)

### Debug Log References

- Build verified: `astro build` succeeds with no errors
- ContactForm.tsx bundle: 6.02KB raw / 2.76KB gzip (well under 8KB budget)
- Contact page generates at `/contact/index.html`
- BreadcrumbList Schema.org JSON-LD present in output
- All key content elements verified in rendered HTML

### Completion Notes List

- Created `src/pages/contact.astro` with Breadcrumb, section heading (gold line + "Contact" watermark pattern), ContactForm React island, trust section, and CTABlock
- Created `src/components/ContactForm.tsx` React island with:
  - 5 form fields (name, address, phone, email, service dropdown) matching original site
  - `<optgroup>` for electrical (5 options) and plumbing (4 options) — no pest control per original site
  - 必須 red badges on all labels
  - Blur + submit validation with Japanese error messages
  - IME composition handling via useRef to prevent premature submit
  - ARIA attributes: `aria-required`, `aria-invalid`, `aria-describedby`
  - Formspree integration with honeypot spam protection
  - Submit states: idle → submitting (spinner + 送信中...) → success (green banner) → error (red banner + phone fallback)
  - Privacy policy link before submit button
  - Pink rounded submit button matching site CTA patterns
- No textarea field (matches original site, differs from epics spec)
- Canonical URL, meta description, OG tags all configured

### Code Review Fixes (2026-05-13)

- P1: Pass `formspreeId` prop explicitly from Astro page (removed `import.meta as any` cast)
- P2: Pass `phoneDisplay`/`phoneHref` props from siteConfig (removed hardcoded phone number)
- P3+P4: Phone validation: strip separators/spaces first, require at least 3 digits
- P5: Replace `outline-none` with `focus-visible:outline` (2px navy, 2px offset) on all inputs and submit button
- P6: Reset `isComposing` on blur as fallback for stuck composition state
- P7: Add `isSubmitting` ref-based lock to prevent double-submit race condition
- P8: Select error message uses "選択してください" instead of "入力してください"
- P9: Focus first error field on submit for screen reader accessibility
- D1: Service dropdown sends Japanese labels instead of English codes for Formspree email readability
- Canonical URL, meta description, OG tags all configured

### Change Log

- 2026-05-13: Story 4.1 implementation complete — contact form page with React island

### File List

- `src/pages/contact.astro` (NEW)
- `src/components/ContactForm.tsx` (NEW)
