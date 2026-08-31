---
title: 'Remove pest-control service category — electricity and water only'
type: 'refactor'
created: '2026-05-22'
status: 'done'
baseline_commit: 'no-vcs-dirty'
context: []
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** The website currently shows three service categories (electricity, water, pest-control) but the business only provides electrical and water repair services. All pest-control references must be removed.

**Approach:** Delete pest-control content files, remove pest-control from all TypeScript types/enums, service configs, navigation, routes, page templates, and component color maps. Preserve all electricity and water functionality unchanged.

## Boundaries & Constraints

**Always:** Keep all electricity and water services, content, and routes intact. Build must pass with zero errors after changes.

**Ask First:** If any shared component breaks due to pest-control removal (e.g., a grid layout that assumed 3 categories).

**Never:** Do not modify any electricity or water service data, pricing, or content. Do not change site structure or URLs for the remaining two categories.

</frozen-after-approval>

## Code Map

- `src/content/services/pest-control/` -- 4 JSON files to delete (cockroach, termite, rodent, general-pest)
- `src/utils/siteConfig.ts` -- PEST_CONTROL_SERVICES constant, ServiceCategory type, SERVICE_CATEGORIES, NAVIGATION arrays
- `src/content.config.ts` -- serviceCategoryValues enum includes 'pest-control'
- `src/content/config.ts` -- duplicate schema with 'pest-control' in enums
- `src/pages/index.astro` -- pest-control ServiceSlider, label/image/alt maps
- `src/pages/[category]/index.astro` -- pest-control static path, KV/pricing/intro/color/service maps
- `src/pages/[category]/[service].astro` -- PEST_CONTROL_SERVICES import, pest-control map entries
- `src/components/CaseStudyCard.astro` -- 'pest-control' in type union and color map
- `src/components/TestimonialCard.astro` -- 'pest-control' in type union and color map
- `src/components/CTABlock.astro` -- pest-control CTA button if present
- `src/data/caseVoiceData.ts` -- pest-control entries in image/label maps
- `src/pages/faq.astro` -- pest-control FAQ tab
- `src/pages/contact.astro` -- 害虫駆除 in meta description

## Tasks & Acceptance

**Execution:**
- [x] `src/content/services/pest-control/` -- DELETE directory -- remove all pest-control service content
- [x] `src/utils/siteConfig.ts` -- remove 'pest-control' from ServiceCategory type, delete PEST_CONTROL_SERVICES constant, remove pest-control entries from SERVICE_CATEGORIES and NAVIGATION arrays
- [x] `src/content.config.ts` -- remove 'pest-control' from serviceCategoryValues and faqCategoryValues
- [x] `src/content/config.ts` -- remove 'pest-control' from z.enum() calls
- [x] `src/pages/index.astro` -- remove pest-control ServiceSlider, remove pest-control from label/image/alt maps
- [x] `src/pages/[category]/index.astro` -- remove pest-control static path and all pest-control map entries
- [x] `src/pages/[category]/[service].astro` -- remove PEST_CONTROL_SERVICES import and all pest-control map entries
- [x] `src/components/CaseStudyCard.astro` -- remove 'pest-control' from Props type union and categoryColorMap
- [x] `src/components/TestimonialCard.astro` -- remove 'pest-control' from Props type union and categoryColorMap
- [x] `src/data/caseVoiceData.ts` -- remove pest-control entries from image and label maps
- [x] `src/pages/faq.astro` -- remove pest-control FAQ tab entry
- [x] `src/pages/contact.astro` -- remove 害虫駆除 from meta description

**Acceptance Criteria:**
- Given the site is built, when navigating to any page, then no pest-control text, links, or images appear
- Given `astro build` is run, then it completes with zero errors and 0 pest-control routes generated
- Given the homepage loads, then only electricity and water ServiceSliders are rendered
- Given the navigation menu renders, then no pest-control menu items appear

## Verification

**Commands:**
- `npm run build` -- expected: zero errors, no pest-control routes in output
- `grep -r "pest-control" src/ --include="*.{ts,tsx,astro,json}" | wc -l` -- expected: 0

## Suggested Review Order

**Service config & types**

- Type union and constants — pest-control removed from ServiceCategoryKey and all arrays
  [`siteConfig.ts:29`](../../src/utils/siteConfig.ts#L29)

- Content schema enum updated to electricity|water only
  [`content.config.ts:5`](../../src/content.config.ts#L5)

**Page templates**

- Homepage — pest-control slider and meta removed
  [`index.astro:31`](../../src/pages/index.astro#L31)

- Category hub — pest-control static path and all maps removed
  [`[category]/index.astro:12`](../../src/pages/[category]/index.astro#L12)

- Service detail — pest-control imports and map entries removed
  [`[category]/[service].astro:18`](../../src/pages/[category]/[service].astro#L18)

**Components**

- CaseStudyCard type union narrowed to electricity|water
  [`CaseStudyCard.astro:8`](../../src/components/CaseStudyCard.astro#L8)

- TestimonialCard type union narrowed to electricity|water
  [`TestimonialCard.astro:8`](../../src/components/TestimonialCard.astro#L8)

**Data & supporting pages**

- Case/voice data maps cleaned
  [`caseVoiceData.ts`](../../src/data/caseVoiceData.ts)

- FAQ tab removed, contact meta updated
  [`faq.astro`](../../src/pages/faq.astro)
