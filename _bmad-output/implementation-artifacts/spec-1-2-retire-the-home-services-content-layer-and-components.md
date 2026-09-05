---
title: 'Story 1.2: Retire the Home-Services Content Layer & Components'
type: 'feature'
created: '2026-09-05'
status: 'review'
baseline_commit: '14f2ac388bc1e8c7793ee084b300abdeb3110635'
baseline_revision: '14f2ac388bc1e8c7793ee084b300abdeb3110635'
review_loop_iteration: 0
followup_review_recommended: false
context:
  - '_bmad-output/project-context.md'
  - '_bmad-output/implementation-artifacts/epic-1-context.md'
  - '_bmad-output/implementation-artifacts/spec-1-1-keiba-identity-configuration-and-design-tokens.md'
warnings: []
deferred: []
---

<intent-contract>

## Intent

**Problem:** The repository still ships the retired home-services product: routes, content collections, service data, components, images, and dependencies remain reachable or build-discoverable after the identity pivot.

**Approach:** Remove the complete legacy content and presentation surface, leave only minimal branded route placeholders needed for a green static build, and preserve the generic Astro shell/SEO helpers that later keiba stories will extend.

## Boundaries & Constraints

**Always:** Keep Astro static output and TypeScript strict; retain React and `@astrojs/react` for future islands but ship no island now; use `SITE_CONFIG`/`navigation.ts` as the only identity/navigation sources; keep placeholder routes and assets deterministic; run `npm run build`; never write or revert `sprint-status.yaml`.

**Block If:** A retained route or shared component requires a physical-business contract that cannot be removed without a decision about a future keiba replacement; or the static build cannot be made green without restoring a retired home-services dependency.

**Never:** Migrate or preserve old home-services content, retain Formspree/carousel packages, emit dead home-services links, add new dependencies, weaken security/performance conventions, edit `sprint-status.yaml`, or implement later-epic keiba article/schema routes.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Clean build | Retired collections/routes/components removed | `npm run build` completes with only placeholder/static routes | Fix import/schema failures; do not loosen schemas |
| Empty content layer | `src/content.config.ts` has no legacy collections and no content directories | Astro content discovery succeeds with an empty collection map | Remove every stale `getCollection` consumer |
| Legacy identifier scan | Search `src/` for setsubi, formspree, and electricity/water service identifiers | No functional home-services references remain | Delete or adapt the offending module |

</intent-contract>

## Code Map

- `src/pages/index.astro`, `src/pages/404.astro`, `src/pages/privacy.astro` -- replace legacy page implementations with minimal branded placeholders; all other legacy route trees are deletion targets.
- `src/pages/[category]/`, `case/`, `voice/`, `company/`, `columns/`, `admin/`, plus `contact.astro`, `faq.astro`, `flow.astro`, `sitemap.astro`, `rss.xml.js` -- home-services routes and old feed/admin surfaces to remove.
- `src/content.config.ts` and `src/content/{services,cases,testimonials,faq,blog,company}/` -- live Content Layer definitions/data; replace config with an empty map and remove directories.
- `src/content/config.ts` -- legacy duplicate schema; delete rather than maintain two contracts.
- `src/components/{PriceBar,PricingTier,AreaMap,ContactFormSection,ProcessFlow,ServiceKV,ServiceCard,ServiceCategorySection,ComparisonTable,TestimonialCard,CaseStudyCard,CtaFeatures,ReasonsGrid,HeroSection,MegaMenu,FilterNav,CategorySidebar,BlogCategorySidebar,AnchorMenu}.astro`, `ServiceSlider.tsx`, and unused `BlogCard.astro`/`RelatedPosts.astro` -- remove home-services-only presentation and data consumers.
- `src/components/{Header,Footer,MobileMenu,Breadcrumb}.astro`, `src/layouts/BaseLayout.astro` -- mechanically detach legacy phone/contact/logo contracts while retaining a placeholder shell for Story 1.4.
- `src/config/{legacySite,legacyNavigation,legacyHomeServices}.ts`, `src/data/*.ts`, `src/utils/schema.ts`, `package.json` -- remove compatibility/data contracts, prune LocalBusiness/Service/Review/AggregateRating generators, and prune four unused dependencies; retain generic Article/Breadcrumb/FAQ/WebSite/Organization helpers.
- `src/assets/images/`, `public/images/` legacy trees, `docs/admin-guide.md` -- delete home-services imagery/build artifacts/admin documentation; retain only Story 1.1 placeholder SVGs and unrelated site metadata.
- `_bmad-output/implementation-artifacts/sprint-status.yaml` -- orchestrator-owned read-only file; do not modify.

## Tasks & Acceptance

**Execution:**
- [x] `src/pages/**` -- delete every home-services/admin route and replace index, 404, and privacy with branded placeholders -- remove crawlable legacy URLs while keeping the shell buildable.
- [x] `src/content.config.ts`, `src/content/config.ts`, `src/content/*` -- remove six legacy collections/data directories and expose an empty Content Layer map -- prevent stale collection discovery and schema validation.
- [x] `src/components/**`, `src/config/legacy*.ts`, `src/data/**` -- delete named retired components, slider, compatibility configs, and data modules; adapt retained shell imports -- leave no physical-business runtime references.
- [x] `src/layouts/BaseLayout.astro`, retained shell components, `src/utils/schema.ts` -- use new identity fields, remove sticky contact/analytics legacy wiring, and retain only generic schema generators -- preserve future keiba extension points without dead contracts.
- [x] `src/assets/images/**`, `public/images/**`, `docs/admin-guide.md` -- remove legacy image sets/artifacts and admin guide while retaining placeholder SVGs -- eliminate obsolete payload and CMS instructions.
- [x] `package.json` and lockfile -- set package name to `umanomikata` and remove Formspree/Embla/Swiper packages with no additions -- align dependencies with the retired surface.

**Acceptance Criteria:**
- Given the route tree, when the retirement pass completes, then no home-services route, `/admin` page, old feed, contact flow, or crawlable service URL remains; index, 404, and privacy render minimal Japanese branded placeholders.
- Given the content layer, when Astro loads `src/content.config.ts`, then the six legacy collections, their directories, and the legacy duplicate config are absent and no `getCollection` call references them.
- Given the component/config inventory, when the repository is scanned, then all 19 named components plus `ServiceSlider.tsx`, legacy data/config modules, and admin documentation are absent; retained shell components compile from the placeholder shell only.
- Given SEO helpers, when `src/utils/schema.ts` is inspected, then LocalBusiness, Service, Review, and AggregateRating types/generators are removed while serializeJsonLd, absoluteUrl, generateBreadcrumb, generateFAQ, generateWebSite, and generateOrganization remain and use `SITE_CONFIG`.
- Given `package.json`, when dependencies are installed, then `name` is `umanomikata`, Formspree/Embla/Swiper are absent, React integration remains, and no dependency is added.
- Given the completed patch, when `npm run build` and the legacy-identifier scan run, then both pass with no TypeScript/render errors and no functional setsubi, Formspree, or electricity/water service references in `src/`.

## Design Notes

The pre-Story-1.4 shell intentionally renders an empty navigation array so newly defined keiba/trust URLs are not emitted before their routes exist. Placeholder pages use `BaseLayout` and the Story 1.1 logo/OG assets; full navigation, footer IA, and trust copy remain Story 1.4 work.

## Verification

**Commands:**
- `npm run build` -- expected: Astro static build exits zero.
- `rg -n -i 'setsubi|formspree|electricity|water|service categories' src` -- expected: no functional home-services references (generic prose is absent from the retired surface).
- `test ! -e src/content/config.ts && test ! -e src/config/services.ts && test ! -e public/admin/config.yml && test ! -e docs/admin-guide.md && test -f public/images/logo-placeholder.svg && test -f public/images/og-default-placeholder.svg && test -f public/images/author-placeholder.svg` -- expected: legacy duplicate/module/admin docs absent and placeholders retained.
- `git diff -- _bmad-output/implementation-artifacts/sprint-status.yaml` -- expected: empty.

## Auto Run Result

Status: done

summary: Removed the retired home-services routes, content layer, components, data modules, CMS/admin docs, and legacy dependency surface; replaced the surviving root, 404, and privacy pages with minimal branded placeholders; and left the repo building cleanly as a static site.

verification_results:
  - `npm run build` — passed.
  - Live-source retirement scan — passed; no functional home-services references remain in `src/`.
  - Legacy artifact removal check — passed; retired content/config/admin files are absent and placeholder SVGs remain.

notes:
  - `sprint-status.yaml` was not modified.
  - The placeholder shell intentionally stays minimal for the next story's branded navigation/footer work.

## Dev Agent Record

### Agent Model Used

Codex (GPT-5)

### Implementation Plan

- Treat the existing retirement patch as the implementation under verification because every execution task was already checked.
- Re-run the repository's available test suite and production static build.
- Verify the route tree, empty content layer, dependency removals, retained generic schema helpers, placeholder assets, and legacy-identifier scan against the acceptance criteria.
- Record the pre-existing sprint-status diff without changing the orchestrator-owned file.

### Debug Log References

- `uv run _bmad/scripts/resolve_customization.py --skill /home/luonghailam/Projects/racing-horse/.agents/skills/bmad-dev-story --key workflow` could not acquire the uv cache lock because the cache filesystem is read-only. The default workflow was resolved manually from `customize.toml`; team and user overrides were absent.
- `npm test` passed: 1 test file, 1 test passed.
- `npm run build` passed: Astro static output generated `/`, `/404.html`, and `/privacy/` with no TypeScript, rendering, or content-layer errors.
- `rg -n -i 'setsubi|formspree|electricity|water|service categories' src` returned no matches.
- Legacy artifact checks passed: the duplicate content config, legacy service config, Decap admin config, and admin guide are absent; all three placeholder SVG assets remain.
- `git diff -- _bmad-output/implementation-artifacts/sprint-status.yaml` is non-empty from pre-existing workspace changes. Per the story boundary, the sprint-status file was preserved and not edited in this run.

### Completion Notes List

- ✅ Retired home-services routes, content collections/data, components, compatibility configs, CMS/admin surfaces, and legacy imagery remain removed.
- ✅ Root, 404, and privacy pages render minimal Japanese branded placeholders through the retained Astro shell.
- ✅ `src/content.config.ts` exposes an empty collection map and `src/utils/schema.ts` retains only generic future-facing generators backed by `SITE_CONFIG`.
- ✅ `package.json` and `package-lock.json` use `umanomikata` and no longer include Formspree, Embla, or Swiper packages; React integration remains available.
- ✅ Full regression test and production build verification completed successfully.

## File List

### Modified

- `astro.config.mjs`
- `package.json`
- `package-lock.json`
- `src/components/Breadcrumb.astro`
- `src/components/FAQAccordion.astro`
- `src/components/Footer.astro`
- `src/components/Header.astro`
- `src/components/MobileMenu.astro`
- `src/components/Pagination.astro`
- `src/content.config.ts`
- `src/layouts/BaseLayout.astro`
- `src/pages/404.astro`
- `src/pages/index.astro`
- `src/pages/privacy.astro`
- `src/styles/global.css`
- `src/utils/schema.ts`
- `vercel.json`

### Deleted legacy source and documentation

- `docs/admin-guide.md`
- `docs/seo-01-aircon-atatakaku-naranai.md`
- `docs/seo-02-toilet-tsumari.md`
- `docs/seo-03-kyutoki-ugokanai.md`
- `docs/seo-04-kagi-o-nakushita.md`
- `docs/seo-05-toilet-mizu-tomaranai.md`
- `public/admin/config.yml`
- `public/admin/index.html`
- `src/config/legacyHomeServices.ts`
- `src/config/legacyNavigation.ts`
- `src/config/legacySite.ts`
- `src/data/blogData.ts`
- `src/data/caseVoiceData.ts`
- `src/data/companyData.ts`
- `src/content/config.ts`
- `src/content/blog/**` (all retired blog entries)
- `src/content/cases/**` (all retired case entries)
- `src/content/company/**` (all retired company entries)
- `src/content/faq/**` (all retired FAQ entries)
- `src/content/services/**` (all retired service entries)
- `src/content/testimonials/**` (all retired testimonial entries)
- `src/components/AnchorMenu.astro`
- `src/components/AreaMap.astro`
- `src/components/BlogCard.astro`
- `src/components/BlogCategorySidebar.astro`
- `src/components/CTABlock.astro`
- `src/components/CaseStudyCard.astro`
- `src/components/CategorySidebar.astro`
- `src/components/ComparisonTable.astro`
- `src/components/ContactFormSection.astro`
- `src/components/CtaFeatures.astro`
- `src/components/FilterNav.astro`
- `src/components/HeroSection.astro`
- `src/components/MegaMenu.astro`
- `src/components/PriceBar.astro`
- `src/components/PricingTier.astro`
- `src/components/ProcessFlow.astro`
- `src/components/ReasonsGrid.astro`
- `src/components/RelatedPosts.astro`
- `src/components/ServiceCard.astro`
- `src/components/ServiceCategorySection.astro`
- `src/components/ServiceKV.astro`
- `src/components/ServiceSlider.tsx`
- `src/components/TestimonialCard.astro`
- `src/pages/[category]/**`
- `src/pages/admin/**`
- `src/pages/case/**`
- `src/pages/columns/**`
- `src/pages/company/**`
- `src/pages/contact.astro`
- `src/pages/faq.astro`
- `src/pages/flow.astro`
- `src/pages/rss.xml.js`
- `src/pages/sitemap.astro`
- `src/pages/voice/**`

### Deleted legacy image payload

- `public/images/SEO/**`
- `public/images/cases/**`
- `public/images/column/**`
- `public/images/company/**`
- `public/images/cta/**`
- `public/images/hero/**`
- `public/images/icons/**`
- `public/images/map/**`
- `public/images/process/**`
- `public/images/services/**`
- `public/images/site_logo.svg`
- `public/images/site_logo_no-mark.jpeg`
- `public/images/site_logo_no-mark.svg`
- `public/images/staff_bg.jpg`
- `src/assets/images/SEO/**`
- `src/assets/images/cases/**`
- `src/assets/images/column/**`
- `src/assets/images/company/**`
- `src/assets/images/cta/**`
- `src/assets/images/hero/**`
- `src/assets/images/icons/**`
- `src/assets/images/process/**`
- `src/assets/images/services/**`
- `src/assets/images/area_2026.png`
- `src/assets/images/site_logo_no-mark.jpeg`
- `src/assets/images/staff_bg.jpg`

The three Story 1.1 placeholder assets under `public/images/` (`logo-placeholder.svg`, `og-default-placeholder.svg`, and `author-placeholder.svg`) were retained.

## Change Log

- 2026-09-06: Revalidated Story 1.2 retirement implementation with the full test suite, static build, legacy scan, and artifact checks; documented the verified patch and set status to `review`.

## Status

review
