# Story 2.4: Build Featured Case Studies, Testimonials, and FAQ on Homepage

Status: ready-for-dev

## Story

As a visitor,
I want to see real case studies, customer reviews, and common questions on the homepage,
So that I trust the service based on proof and can get quick answers to concerns.

## Acceptance Criteria

1. **Given** a visitor scrolls to the social proof sections **When** case studies section renders **Then** CaseStudyCard displays featured cases with photo, service category tag, location, duration, and cost
2. Cards link to the full case studies page
3. **When** testimonials section renders **Then** TestimonialCard displays featured testimonials with service type, cost, and customer message
4. Uses `<blockquote>` with `<cite>` for semantic markup
5. Cards link to the full testimonials page
6. **When** FAQ section renders **Then** FAQAccordion displays FAQ entries using native `<details>/<summary>` — zero JavaScript (UX-DR10)
7. CSS-only expand/collapse with `[open]` selector, no animation
8. Full header bar is clickable (44x44px minimum touch target)

## Tasks / Subtasks

- [ ] Task 1: Fetch reference from star-light15.net (AC: all)
  - [ ] Fetch case studies section HTML/CSS from production site — extract layout, card structure, image sizes
  - [ ] Fetch testimonials/voice section — extract card structure, blockquote styling, metadata layout
  - [ ] Fetch FAQ accordion section — extract details/summary styling, spacing, expand behavior
  - [ ] Download any case study sample images to `public/images/cases/`
- [ ] Task 2: Create CaseStudyCard.astro component (AC: #1, #2)
  - [ ] Define Props interface: title, serviceCategory, location, duration, cost, imageAlt, slug (for link)
  - [ ] Render card: image (photo) + category tag + location + duration + cost metadata
  - [ ] Card links to `/case` (full case studies listing page — detail pages not yet built)
  - [ ] Use `<img>` with explicit width/height/alt for public/ images (same pattern as Story 2.2/2.3)
  - [ ] Card hover: subtle shadow increase, `transition: box-shadow 0.2s ease`, no transform/scale (UX-DR11)
  - [ ] Format cost via `formatPrice()` from `src/utils/formatters.ts`
- [ ] Task 3: Create TestimonialCard.astro component (AC: #3, #4, #5)
  - [ ] Define Props interface: serviceType, cost, message, authorInitial, location (optional)
  - [ ] Use `<blockquote>` wrapping message text with `<cite>` for author
  - [ ] Display service type + cost metadata
  - [ ] Card links to `/voice` (full testimonials listing page)
  - [ ] Hover shadow effect same as CaseStudyCard (UX-DR11)
- [ ] Task 4: Create FAQAccordion.astro component (AC: #6, #7, #8)
  - [ ] Define Props interface: items array of `{ question: string; answer: string }`
  - [ ] Use native `<details>/<summary>` — zero JavaScript
  - [ ] CSS-only expand/collapse via `[open]` selector
  - [ ] Full summary bar clickable with min 44x44px touch target
  - [ ] No animation on expand/collapse (matches UX-DR16 zero-decoration)
- [ ] Task 5: Create homepage sections with content collection queries (AC: all)
  - [ ] In index.astro, import and query content collections: `getCollection('cases')`, `getCollection('testimonials')`, `getCollection('faq')`
  - [ ] Featured case studies: display first 3-4 cases (sorted by publishedDate desc)
  - [ ] Featured testimonials: display first 3-4 testimonials
  - [ ] FAQ: display all FAQ entries (sorted by sortOrder)
  - [ ] Add section headings with proper H2 hierarchy
  - [ ] Place sections after AreaMap: CaseStudies → Testimonials → FAQ
  - [ ] Add CTABlock (variant="compact") between sections
  - [ ] Section spacing: 60-80px vertical padding (py-16 md:py-20), content max-w-[1200px] mx-auto px-4
  - [ ] Alternating section backgrounds (white / #F5F5F5) continuing pattern from previous sections
- [ ] Task 6: Add more sample content data (AC: all)
  - [ ] Create at least 3 case study entries in `src/content/cases/` (case-001.md already exists)
  - [ ] Create at least 3 testimonial entries in `src/content/testimonials/` (testimonial-001.json already exists)
  - [ ] Create at least 4 FAQ entries in `src/content/faq/` (faq-001.json already exists)
  - [ ] Ensure all content validates against Zod schemas in content.config.ts
- [ ] Task 7: Visual QA against star-light15.net (AC: all)
  - [ ] Compare case study cards layout and styling
  - [ ] Compare testimonial cards layout and blockquote styling
  - [ ] Compare FAQ accordion behavior and styling
  - [ ] Verify section order and spacing

## Dev Notes

### Architecture Compliance

- **Component type:** Astro `.astro` (server-rendered, zero JS) — NOT React islands
- **Data source:** Content collections via `getCollection()` from `astro:content` — cases (Markdown), testimonials (JSON), faq (JSON)
- **Styling:** Tailwind utilities only, no `@apply`, no scoped `<style>` blocks
- **Images:** Use `<img>` with explicit `width`, `height`, `alt` for public/ assets (Astro `<Image>` cannot optimize public/ dir images — established pattern from Story 2.2/2.3)
- **Phone number:** CTABlock imports from `SITE_CONFIG.phone` — never hardcode
- **Section backgrounds:** Alternating white / `#F5F5F5` for visual rhythm

### Content Collection Schemas (from src/content.config.ts)

**Cases collection** (Markdown with frontmatter):
```
title: string, serviceCategory: 'electricity'|'water'|'pest-control',
serviceSlug: string, location: string, duration: string,
cost: number, imageAlt: string, publishedDate: Date
```
Body: Markdown description text.

**Testimonials collection** (JSON):
```
serviceType: string, serviceCategory: 'electricity'|'water'|'pest-control',
cost: number, message: string, authorInitial: string,
location?: string, rating?: number (1-5)
```

**FAQ collection** (JSON):
```
question: string, answer: string,
category: 'general'|'electricity'|'water'|'pest-control'|'pricing'|'process',
sortOrder: number (int, default 0)
```

### Querying Content Collections

Use Astro's content collection API:
```typescript
import { getCollection } from 'astro:content';

const allCases = await getCollection('cases');
const allTestimonials = await getCollection('testimonials');
const allFaq = await getCollection('faq');
```

- Cases: `entry.data` for frontmatter fields, `entry.body` for Markdown content
- Testimonials/FAQ: `entry.data` for all fields
- Sort cases by `publishedDate` descending, FAQ by `sortOrder` ascending
- For homepage: slice to 3-4 featured items (cases, testimonials); show all FAQ

### Component Reusability

These components are reused across the site (not just homepage):
- `CaseStudyCard` — homepage + service detail pages + `/case` listing page
- `TestimonialCard` — homepage + service detail pages + `/voice` listing page
- `FAQAccordion` — homepage + service detail pages + `/faq` page

Design props for reuse. Accept data via props, not internal collection queries. The parent page queries content collections and passes data to components.

### Production Site Reference (star-light15.net)

**IMPORTANT:** Fetch actual CSS/layout from star-light15.net before implementing — do not guess from spec.

**Case Studies section:** Cards with photo thumbnail, category badge/tag, location + duration + cost metadata. Likely a responsive grid (1→2→3 columns).

**Testimonials section:** Cards with customer quote text, service type label, cost, and author initial. Uses blockquote-style design. Likely a responsive grid.

**FAQ section:** Accordion with question as summary, answer as expandable detail. Native `<details>/<summary>` pattern (zero JS). Light border or background separation between items.

### Anti-Patterns (DO NOT)

- No `will-change: transform` (breaks iOS Safari z-index — from Story 1.6)
- No `@apply` or scoped styles
- No transform/scale on hover (UX-DR11 — shadow only)
- No scroll animations or parallax (UX-DR16)
- No JavaScript for FAQ accordion — use native `<details>/<summary>` only
- No hardcoded phone numbers
- No client-side JS — these are pure Astro server components
- No animation on FAQ expand/collapse
- Do NOT query content collections inside components — pass data via props

### Section Spacing (UX-DR17)

- 60-80px vertical padding between sections (`py-16` or `py-20`)
- 24-32px heading-to-content gap (`mb-6` or `mb-8`)
- Content max-width 1100-1200px centered (`max-w-[1200px] mx-auto px-4`)

### Previous Story Intelligence (Story 2.3)

- Images in `public/` dir use raw `<img>` tags — follow same pattern
- `decoding="auto"` preferred over `"sync"` for images
- Responsive grid pattern: `grid-cols-1 md:grid-cols-2 lg:grid-cols-N`
- Commit message pattern: `feat: build [component] (story X.Y)`
- All components are pure Astro (zero JS), Tailwind-only
- Story 2.3 had multiple layout rewrites to match production — fetch from star-light15.net FIRST to avoid rework
- Section integration in index.astro: import components, add below existing sections, preserve all existing content
- CTABlock exists with 3 variants: 'full-width', 'compact', 'sticky' — use 'compact' between sections

### Git Intelligence

Recent commits:
- `feat: build hero carousel with blurred background and responsive images (story 2.1)`
- `fix: match header layout to production site star-light15.net`
- `feat: build mobile menu and sticky CTA bar (story 1.6)`

Pattern: components in `src/components/`, pages in `src/pages/`.
Commit format: `feat: build [description] (story X.Y)`

### Project Structure

```
src/components/CaseStudyCard.astro    # NEW — case study card with photo + metadata
src/components/TestimonialCard.astro  # NEW — testimonial with blockquote + metadata
src/components/FAQAccordion.astro     # NEW — native details/summary accordion
src/pages/index.astro                 # UPDATE — add 3 new sections + CTABlocks + content queries
src/content/cases/case-002.md         # NEW — additional sample content
src/content/cases/case-003.md         # NEW — additional sample content
src/content/testimonials/testimonial-002.json  # NEW — additional sample content
src/content/testimonials/testimonial-003.json  # NEW — additional sample content
src/content/faq/faq-002.json          # NEW — additional sample content
src/content/faq/faq-003.json          # NEW — additional sample content
src/content/faq/faq-004.json          # NEW — additional sample content
public/images/cases/                  # NEW — case study photos
```

### Existing Files Being Modified

**src/pages/index.astro** — Currently contains: BaseLayout + HeroCarousel + 3x ServiceSlider (electricity, water, pest-control) + ReasonsGrid + ProcessFlow + AreaMap. This story adds CaseStudyCard grid, TestimonialCard grid, FAQAccordion, and CTABlock sections after AreaMap. Must preserve all existing content and imports. Will also add content collection imports (`getCollection`) in the frontmatter.

### Existing Content Data (1 sample each — need 3+ for homepage display)

**case-001.md** frontmatter: title, serviceCategory: "water", serviceSlug: "toilet", location: "大阪市北区", duration: "約2時間", cost: 8800, imageAlt, publishedDate

**testimonial-001.json**: serviceType: "トイレ修理", serviceCategory: "water", cost: 8800, message (customer text), authorInitial: "T.K.様", location: "大阪市北区", rating: 5

**faq-001.json**: question: "見積りだけでも依頼できますか？", answer (text), category: "pricing", sortOrder: 1

### Deferred Items (from previous reviews)

- Raw `<img>` instead of Astro `<Image>` for public/ dir assets — accepted pattern, not fixable until images moved to src/
- `generateFAQ([])` produces empty schema — guard against empty input when implementing FAQ Schema.org in Epic 6

### References

- [Source: epics.md#Story 2.4] — acceptance criteria and user story
- [Source: architecture.md] — component boundary rules, flat src/components/, Tailwind-only styling
- [Source: architecture.md] — CaseStudyCard, TestimonialCard, FAQAccordion component specs
- [Source: architecture.md] — content collection organization and querying pattern
- [Source: ux-design-specification.md] — UX-DR10 (FAQ details/summary), UX-DR11 (card hover shadow only), UX-DR16 (no animations)
- [Source: ux-design-specification.md] — blockquote/cite for testimonials, card-based case studies
- [Source: content.config.ts] — Zod schemas for cases, testimonials, faq collections
- [Source: siteConfig.ts] — SITE_CONFIG.phone for CTABlock
- [Source: formatters.ts] — formatPrice() for cost display

## Dev Agent Record

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

### Change Log

### File List
