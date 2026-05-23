---
stepsCompleted: [step-01, step-02, step-03, step-04]
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/architecture.md
  - _bmad-output/planning-artifacts/ux-design-specification.md
---

# star-light - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for star-light, decomposing the requirements from the PRD, UX Design, and Architecture into implementable stories.

## Requirements Inventory

### Functional Requirements

FR1: Visitor can navigate to any page within 3 clicks from homepage
FR2: Visitor can access primary navigation menu on all pages (desktop and mobile)
FR3: Visitor can view breadcrumb trail showing current location on all pages
FR4: Visitor can access footer navigation with complete site links on all pages
FR5: Mobile visitor can open/close a hamburger navigation menu
FR6: Visitor can initiate a phone call with one tap on mobile devices from any page
FR7: Visitor can see the emergency phone number prominently displayed on every page
FR8: Visitor can submit a contact request via form with name, address, phone, email, service category, and description
FR9: Visitor can select service category (water, electrical, pest control) in the contact form
FR10: Visitor can see 24/7 availability messaging on all service pages
FR11: Visitor can browse water repair services with sub-categories (toilet, kitchen, bath, washroom)
FR12: Visitor can browse electrical repair services with sub-categories (breaker, outlet, lighting, antenna, water heater)
FR13: Visitor can browse pest control services with sub-categories
FR14: Visitor can view starting prices for each service category
FR15: Visitor can view the 5-step service process flow (consultation → dispatch → estimate → work → payment)
FR16: Visitor can view the satisfaction guarantee policy ("no charge if unsatisfied")
FR17: Visitor can view service coverage areas (Tokyo, Nagoya, Osaka, Hyogo)
FR18: Visitor can view office locations and contact details for each region
FR19: Visitor can view a visual map of service areas
FR20: Visitor can view customer testimonials with service details
FR21: Visitor can view case studies with photos, location, duration, and cost
FR22: Visitor can see trust indicators (licensed technicians, years of experience, certifications)
FR23: Visitor can see the "reasons to choose us" section with key differentiators
FR24: Visitor can browse blog/column articles listing
FR25: Visitor can read individual blog/column articles
FR26: Visitor can view FAQ with common questions and answers
FR27: Visitor can view company overview (about, philosophy)
FR28: Visitor can view office information for each regional location
FR29: Visitor can view privacy policy
FR30: Visitor can view a hero carousel with rotating service banners
FR31: Visitor can see service category overview cards on homepage
FR32: Visitor can view featured case studies on homepage
FR33: Visitor can view featured customer testimonials on homepage
FR34: Visitor can view FAQ highlights on homepage
FR35: Search engine can crawl and index all pages via sitemap.xml
FR36: Search engine can read structured data (LocalBusiness, Service, FAQ, Review, Breadcrumb) on relevant pages
FR37: Search engine can determine page language and region via hreflang and lang attributes
FR38: Search engine can resolve canonical URLs for each page
FR39: Content manager can update service information, pricing, and descriptions via data files
FR40: Content manager can add/edit/remove case studies with photos
FR41: Content manager can add/edit/remove customer testimonials
FR42: Content manager can add/edit/remove FAQ entries
FR43: Content manager can publish new blog/column articles
FR44: Content manager can preview changes locally before deployment
FR45: Content manager can deploy content updates with automatic build and publish

### NonFunctional Requirements

NFR1: Page load time < 1 second on 4G mobile networks in Japan
NFR2: Lighthouse Performance score ≥ 95 on all pages
NFR3: LCP < 1.5s, INP < 100ms, CLS < 0.05 on all pages
NFR4: TTFB < 200ms (Cloudflare Pages edge delivery)
NFR5: Total page weight < 500KB per page
NFR6: JavaScript payload < 50KB (carousel + form islands only)
NFR7: All images served in WebP/AVIF with responsive srcset
NFR8: Font loading does not block first paint (font-display: swap)
NFR9: All pages served over HTTPS (Cloudflare automatic SSL)
NFR10: Contact form submissions protected against spam (Formspree built-in honeypot + reCAPTCHA option)
NFR11: No sensitive data stored on the website (stateless static site)
NFR12: Content-Security-Policy headers configured to prevent XSS
NFR13: Static site handles unlimited concurrent visitors (no server bottleneck)
NFR14: Build time < 60 seconds for full site rebuild
NFR15: Color contrast ratio ≥ 4.5:1 for normal text, ≥ 3:1 for large text
NFR16: All interactive elements keyboard-navigable with visible focus indicators
NFR17: Semantic HTML structure with proper heading hierarchy
NFR18: ARIA labels on interactive components (carousel controls, mobile menu, form inputs)
NFR19: Skip navigation link for screen reader users
NFR20: Form inputs with associated labels and accessible error messages
NFR21: prefers-reduced-motion media query disables carousel autoplay
NFR22: Image alt text in Japanese on all images
NFR23: Formspree: Contact form submissions delivered to client email within 5 minutes
NFR24: Google Maps Embed: Service area map loads without blocking page render
NFR25: Schema.org JSON-LD: Valid structured data on all pages (zero errors in Google Rich Results Test)
NFR26: sitemap.xml: Auto-generated, includes all pages with correct lastmod dates
NFR27: Google Search Console: Site verification and sitemap submission at launch

### Additional Requirements

- Starter template: `create astro` with minimal template — project initialization as first implementation story
- Tailwind CSS v4 via `@tailwindcss/vite` plugin (not legacy `@astrojs/tailwind`)
- Content collections with Zod schema validation at build time for 6 content types (services, cases, testimonials, faq, blog, company)
- 3 JS islands only: HeroCarousel (Embla ~3KB), ContactForm (React ~8KB), MobileMenu (~1KB) — total JS budget ~12KB gzip
- Static output mode (`output: 'static'`) for Cloudflare Pages deployment
- CSP headers via Astro 6 CSP API (whitelist Google Fonts, Maps, Formspree)
- Formspree honeypot spam protection (no reCAPTCHA for MVP)
- Form error handling with phone number fallback message
- Site config centralized in `src/utils/siteConfig.ts` — never hardcode phone numbers or company data
- Schema.org JSON-LD generated via `src/utils/schema.ts` utility functions — never inline in pages
- All images via Astro `<Image>` component with explicit width/height for CLS prevention
- Dynamic routes via `getStaticPaths()` for service detail pages and blog posts
- Cloudflare Pages auto-build on git push to main branch
- Pest control pages: `pages/pest-control/` with index.astro + [service].astro + content collection entries
- Pagination pattern for case studies and testimonials via getStaticPaths() with page parameter

### UX Design Requirements

UX-DR1: Pixel-perfect replication of star-light15.net color system — white bg, navy accents (#1B2A4A), orange CTAs (#FF6B00), red discount badges (#E53935), light gray sections (#F5F5F5)
UX-DR2: Noto Sans JP font loading with Google Fonts + preconnect + display=swap, fallback stack (Hiragino Kaku Gothic ProN, Yu Gothic, Meiryo)
UX-DR3: Sticky header on all pages — logo (left), mega-menu nav (center, desktop), phone CTA (right), shadow on scroll
UX-DR4: Mobile sticky bottom CTA bar with phone number — always visible on mobile viewports
UX-DR5: WEB割引 (web discount) badge on CTA blocks and service cards — red/orange bg, white text, rotated ~-5deg
UX-DR6: Service detail page canonical 13-section layout: breadcrumb → hero + WEB badge → anchor menu → pricing → reasons → comparison → area map → process flow → cases → testimonials → FAQ → related services → CTA + footer
UX-DR7: Anchor menu (AnchorMenu.astro) — horizontal icon-based section jump nav with scroll-margin-top accounting for sticky header + anchor menu combined height
UX-DR8: Competitor comparison table (ComparisonTable.astro) — 3-column (当社 vs A社 vs B社) with ○/×/△ indicators, horizontal scroll on mobile with sticky first column
UX-DR9: Contact form with Japanese UX conventions — 「必須」 red badge for required fields (not asterisk), validation on blur + submit, IME composition event handling (compositionstart/compositionend), error messages in Japanese
UX-DR10: FAQ accordion using native `<details>/<summary>` — zero JavaScript, CSS-only with [open] selector
UX-DR11: Card hover states — subtle shadow increase only, transition 0.2s ease, no transform/scale effects
UX-DR12: Japanese typography CSS baseline — word-break: keep-all, line-break: strict, -webkit-text-size-adjust: 100%, input font-size 16px minimum (prevent iOS zoom)
UX-DR13: Button hierarchy — Primary orange (phone CTA only), Secondary navy (form/nav), Tertiary white+border (filters), Ghost (text links)
UX-DR14: Mobile-first responsive breakpoints: 320px (default) → 768px (md:) → 1024px (lg:) → 1440px (xl:) with specific layout shifts per component
UX-DR15: Accessibility — visible focus ring (2px navy outline, 2px offset), skip-nav link, min 44x44px touch targets, aria-roledescription on carousel, aria-label on ○/× in comparison table
UX-DR16: No scroll-triggered animations, no parallax, no modals/popups, no chatbot, no back-to-top button, no image lightbox — matches original site's zero-decoration simplicity
UX-DR17: Section spacing pattern — 60-80px vertical padding between sections, 24-32px heading to content, 16-24px within-section gaps, content max-width 1100-1200px centered
UX-DR18: Form feedback pattern — field error (red border + inline text), submitting (disabled + spinner + 送信中...), success (green banner + thank you), server error (red banner + phone fallback)

### FR Coverage Map

FR1: Epic 1 - Navigate within 3 clicks
FR2: Epic 1 - Primary navigation menu
FR3: Epic 1 - Breadcrumb trail
FR4: Epic 1 - Footer navigation
FR5: Epic 1 - Mobile hamburger menu
FR6: Epic 1 - Click-to-call one tap
FR7: Epic 1 - Phone number on every page
FR8: Epic 4 - Contact form submission
FR9: Epic 4 - Service category in form
FR10: Epic 2 - 24/7 availability messaging
FR11: Epic 3 - Water repair services
FR12: Epic 3 - Electrical repair services
FR13: Epic 3 - Pest control services
FR14: Epic 2, 3 - Starting prices
FR15: Epic 2, 4 - 5-step process flow
FR16: Epic 3 - Satisfaction guarantee
FR17: Epic 3 - Service coverage areas
FR18: Epic 3 - Office locations per region
FR19: Epic 3 - Visual service area map
FR20: Epic 3 - Customer testimonials
FR21: Epic 3 - Case studies
FR22: Epic 3 - Trust indicators
FR23: Epic 2 - Reasons to choose us
FR24: Epic 5 - Blog listing
FR25: Epic 5 - Individual blog articles
FR26: Epic 3, 4 - FAQ
FR27: Epic 4 - Company overview
FR28: Epic 4 - Office information
FR29: Epic 4 - Privacy policy
FR30: Epic 2 - Hero carousel
FR31: Epic 2 - Service category cards
FR32: Epic 2 - Featured case studies
FR33: Epic 2 - Featured testimonials
FR34: Epic 2 - FAQ highlights
FR35: Epic 6 - sitemap.xml crawlable
FR36: Epic 6 - Schema.org structured data
FR37: Epic 6 - hreflang and lang
FR38: Epic 6 - Canonical URLs
FR39: Epic 5 - Update service info via files
FR40: Epic 5 - Add/edit case studies
FR41: Epic 5 - Add/edit testimonials
FR42: Epic 5 - Add/edit FAQ entries
FR43: Epic 5 - Publish blog articles
FR44: Epic 5 - Preview changes locally
FR45: Epic 5 - Deploy with auto build
FR46: Epic 7 - Admin dashboard access with GitHub OAuth
FR47: Epic 7 - CMS interface for all content types
FR48: Epic 7 - Embedded GA4 analytics dashboard
FR49: Epic 7 - Google Search Console links

## Epic List

### Epic 1: Project Foundation & Shared Shell
Thiết lập project Astro, design tokens, content schemas, và shared layout (Header, Footer, Navigation, CTABlock) — nền tảng cho mọi trang. Sau epic này, visitor có thể thấy site shell hoàn chỉnh với navigation, phone CTA, và breadcrumb trên mọi trang.
**FRs covered:** FR1, FR2, FR3, FR4, FR5, FR6, FR7

### Epic 2: Homepage Experience
Visitor có thể xem trang chủ hoàn chỉnh với hero carousel, service overview cards, reasons to choose us, process flow, area map, case studies, testimonials, và FAQ highlights — trang landing chính cho conversion.
**FRs covered:** FR10, FR14, FR15, FR23, FR30, FR31, FR32, FR33, FR34

### Epic 3: Service Pages (Water, Electrical, Pest Control)
Visitor có thể browse tất cả dịch vụ qua hub pages và detail pages với đầy đủ 13-section canonical layout — pricing tiers, competitor comparison, area map, process flow, case studies, testimonials, FAQ, và trust signals.
**FRs covered:** FR11, FR12, FR13, FR14, FR16, FR17, FR18, FR19, FR20, FR21, FR22, FR26

### Epic 4: Contact, Company & Supporting Pages
Visitor có thể liên hệ qua contact form với service category selection, xem thông tin công ty (about, philosophy, offices), privacy policy, process flow page, FAQ page, sitemap page, và 404 page.
**FRs covered:** FR8, FR9, FR15, FR26, FR27, FR28, FR29

### Epic 5: Blog/Column & Content Management
Visitor có thể browse blog/column articles. Content manager có thể thêm/sửa/xóa nội dung (services, cases, testimonials, FAQ, blog) qua data files, preview locally, và deploy với automatic build.
**FRs covered:** FR24, FR25, FR39, FR40, FR41, FR42, FR43, FR44, FR45

### Epic 6: SEO, Performance & Accessibility Polish
Search engines có thể crawl, index, và đọc structured data (Schema.org JSON-LD). Site đạt Lighthouse ≥ 95, WCAG 2.1 AA compliance, Core Web Vitals pass, CSP headers, và Cloudflare Pages production deployment.
**FRs covered:** FR35, FR36, FR37, FR38

### Epic 7: Admin Dashboard & CMS Integration
Content manager có thể quản lý toàn bộ nội dung website qua web UI (Decap CMS) và xem thống kê truy cập qua embedded Google Analytics dashboard. Không cần biết Git hoặc code. Authentication qua GitHub OAuth.
**FRs covered:** FR46, FR47, FR48, FR49

## Epic 1: Project Foundation & Shared Shell

Thiết lập project Astro, design tokens, content schemas, và shared layout (Header, Footer, Navigation, CTABlock) — nền tảng cho mọi trang. Sau epic này, visitor có thể thấy site shell hoàn chỉnh với navigation, phone CTA, và breadcrumb trên mọi trang.

### Story 1.1: Initialize Astro Project with Design Tokens

As a developer,
I want a fully configured Astro project with Tailwind CSS v4, TypeScript strict mode, and design tokens matching the original site,
So that all subsequent development has a consistent foundation.

**Acceptance Criteria:**

**Given** a fresh project directory
**When** the initialization commands are run
**Then** Astro project is created with minimal template, TypeScript strict, and integrations (tailwind, sitemap, react) installed
**And** Embla Carousel and @formspree/react dependencies are installed
**And** `tailwind.config.mjs` contains design tokens (colors: navy #1B2A4A, orange #FF6B00, red #E53935, section gray #F5F5F5, text #333333/#666666)
**And** `src/styles/global.css` contains Tailwind imports + Japanese typography baseline (word-break: keep-all, line-break: strict, Noto Sans JP font stack)
**And** `astro.config.mjs` is set to `output: 'static'`
**And** `.env.example` contains PUBLIC_FORMSPREE_ID placeholder
**And** `astro dev` starts successfully with no errors

### Story 1.2: Create Site Configuration and Utility Modules

As a developer,
I want centralized site configuration and utility functions,
So that phone numbers, company data, and formatters are never hardcoded across components.

**Acceptance Criteria:**

**Given** the initialized project
**When** siteConfig.ts is created
**Then** it exports phone number (0120-219-695), company name, regional office addresses (Tokyo, Nagoya, Osaka, Hyogo), navigation structure, and service categories
**And** `src/utils/formatters.ts` exports price formatting (¥1,100) and Japanese date formatting functions
**And** `src/utils/schema.ts` exports Schema.org JSON-LD generator functions (generateLocalBusiness, generateService, generateFAQ, generateReview, generateBreadcrumb, generateArticle)
**And** all functions are typed with TypeScript strict mode

### Story 1.3: Define Content Collection Schemas

As a content manager,
I want validated content schemas for all 6 content types,
So that invalid content is caught at build time before reaching production.

**Acceptance Criteria:**

**Given** the project with utilities configured
**When** `src/content/config.ts` is created
**Then** Zod schemas are defined for: services (with serviceName, startingPrice, serviceArea, imageAlt, isEmergency fields), cases, testimonials, faq, blog, and company collections
**And** sample content files exist for each collection (at least 1 per type) with valid data
**And** `astro build` validates content against schemas and fails on invalid data
**And** content collection directory structure matches architecture spec (services/electricity/, services/water/, cases/, testimonials/, faq/, blog/, company/)

### Story 1.4: Build BaseLayout with Header and Footer

As a visitor,
I want a consistent page shell with navigation and contact information on every page,
So that I can navigate the site and find the phone number from any page.

**Acceptance Criteria:**

**Given** a visitor loads any page
**When** the page renders
**Then** BaseLayout includes `<html lang="ja">`, UTF-8 charset, skip-nav link, Noto Sans JP preconnect, and semantic landmarks (header, main, footer)
**And** Header is sticky (position: sticky, top: 0, z-index: 50) with logo (left), navigation links (center on desktop), and phone CTA 0120-219-695 (right)
**And** Header phone number is imported from siteConfig.ts, not hardcoded
**And** Header shows subtle box-shadow on scroll
**And** Footer contains full sitemap navigation, phone/email CTA, company info, and copyright
**And** visible focus ring (2px navy outline, 2px offset) is applied on all interactive elements via keyboard navigation
**And** skip-nav link is the first focusable element and jumps to `<main>`

### Story 1.5: Build Desktop MegaMenu Navigation

As a desktop visitor,
I want dropdown navigation showing all service sub-categories,
So that I can navigate directly to any service page in one click.

**Acceptance Criteria:**

**Given** a desktop visitor hovers over a service nav item
**When** the mega-menu opens
**Then** it displays 2 service groups: 電気工事 (5 services) and 水道工事 (4 services) with icons and labels
**And** mega-menu opens with 150ms delay and closes with 150ms delay to prevent accidental dismiss
**And** keyboard navigation works: arrow keys to move between items, Escape to close
**And** ARIA attributes are correct: `aria-expanded`, `aria-haspopup`, `role="menu"`
**And** visitor can navigate to any page within 3 clicks from homepage (FR1)

### Story 1.6: Build Mobile Menu and Sticky CTA Bar

As a mobile visitor,
I want a hamburger menu and a sticky phone CTA bar,
So that I can navigate the site and call immediately from any scroll position.

**Acceptance Criteria:**

**Given** a mobile visitor (viewport < 768px)
**When** the page loads
**Then** hamburger icon is visible in the header (top-right)
**And** tapping hamburger opens a slide-from-right full-screen menu with same links as mega-menu + phone CTA
**And** mobile menu has focus trap when open, `aria-modal="true"`, Escape to close, body scroll lock
**And** a sticky bottom CTA bar with phone number is visible at all times on mobile (UX-DR4)
**And** phone number links use `tel:0120219695` for one-tap calling (FR6)
**And** all touch targets are minimum 44x44px

### Story 1.7: Build Breadcrumb and CTABlock Components

As a visitor,
I want breadcrumb navigation and prominent CTA blocks throughout the site,
So that I know where I am and can always contact the service easily.

**Acceptance Criteria:**

**Given** a visitor is on any sub-page
**When** the page renders
**Then** Breadcrumb shows `TOP > [Category] > [Service Name]` with `>` separator, current page bold and not linked
**And** Breadcrumb generates BreadcrumbList Schema.org markup
**And** CTABlock component supports 3 variants: full-width, compact, and sticky (via string enum `variant` prop)
**And** CTABlock displays phone number (from siteConfig), "通話無料", WEB割引 badge (rotated ~-5deg, red/orange bg), and secondary email button
**And** CTABlock phone link has `aria-label="無料電話 0120-219-695"` and 44x44px minimum touch target
**And** button hierarchy follows UX-DR13: primary orange for phone, secondary navy for form/nav

## Epic 2: Homepage Experience

Visitor có thể xem trang chủ hoàn chỉnh với hero carousel, service overview cards, reasons to choose us, process flow, area map, case studies, testimonials, và FAQ highlights — trang landing chính cho conversion.

### Story 2.1: Build Hero Carousel

As a visitor,
I want a rotating hero banner showcasing services,
So that I immediately see the main service offerings and promotional messages on landing.

**Acceptance Criteria:**

**Given** a visitor loads the homepage
**When** the page renders
**Then** HeroCarousel displays 3 slides with service promotion images, overlay text, and CTA buttons
**And** slides auto-rotate every 5 seconds with dot navigation indicators
**And** slide 1 uses `fetchpriority="high"` and `loading="eager"` for LCP optimization
**And** remaining slides use `loading="lazy"`
**And** carousel pauses on hover and focus
**And** `prefers-reduced-motion: reduce` disables auto-rotate and transitions (UX-DR16, NFR21)
**And** ARIA: `aria-roledescription="carousel"`, `aria-label` per slide, dots as `<button>` with `aria-current`
**And** touch/swipe navigation works on mobile
**And** total JS island size is ~3KB gzip (Embla)

### Story 2.2: Build Service Category Cards Grid

As a visitor,
I want to see all service categories on the homepage,
So that I can quickly identify and navigate to the service I need.

**Acceptance Criteria:**

**Given** a visitor scrolls to the service overview section
**When** the section renders
**Then** ServiceCard components display all service categories (water 4 + electrical 5 + pest control) with photo, name, starting price (¥X,XXX~), and WEB割引 badge
**And** cards link to respective service detail pages
**And** card grid is responsive: 1 column (mobile) → 2 columns (tablet) → 3-5 columns (desktop)
**And** cards show subtle shadow increase on hover with `transition: box-shadow 0.2s ease`, no transform/scale (UX-DR11)
**And** each card image uses Astro `<Image>` with explicit width/height and Japanese alt text
**And** prices are formatted via formatters.ts (¥1,100~)

### Story 2.3: Build Reasons, Process Flow, and Area Map Sections

As a visitor,
I want to see why I should choose this service, how the process works, and which areas are covered,
So that I feel confident about the service quality, know what to expect, and can verify my area is served.

**Acceptance Criteria:**

**Given** a visitor scrolls through the homepage
**When** the reasons section renders
**Then** ReasonsGrid displays 4 columns (desktop) / 2 (tablet) / 1 (mobile) with SVG icon + heading + description per cell (speed, free estimates, 24/7, qualified staff)
**And** SVG icons have `aria-hidden="true"`, meaning conveyed by text only
**And** 24/7 availability messaging (「24時間365日対応」) is visible (FR10)

**When** the process flow section renders
**Then** ProcessFlow displays 5 numbered steps (相談→訪問→見積→作業→支払) with illustrations and descriptions
**And** layout is horizontal on desktop, vertical on mobile
**And** uses `<ol>` with step numbers in text for accessibility

**When** the area map section renders
**Then** AreaMap displays static map image + prefecture/city lists for Tokyo, Nagoya, Osaka, Hyogo
**And** map image has detailed Japanese alt text describing service coverage
**And** Google Maps embed (if used) loads without blocking page render (NFR24)

### Story 2.4: Build Featured Case Studies, Testimonials, and FAQ on Homepage

As a visitor,
I want to see real case studies, customer reviews, and common questions on the homepage,
So that I trust the service based on proof and can get quick answers to concerns.

**Acceptance Criteria:**

**Given** a visitor scrolls to the social proof sections
**When** case studies section renders
**Then** CaseStudyCard displays featured cases with photo, service category tag, location, duration, and cost
**And** cards link to the full case studies page

**When** testimonials section renders
**Then** TestimonialCard displays featured testimonials with service type, cost, and customer message
**And** uses `<blockquote>` with `<cite>` for semantic markup
**And** cards link to the full testimonials page

**When** FAQ section renders
**Then** FAQAccordion displays FAQ entries using native `<details>/<summary>` — zero JavaScript (UX-DR10)
**And** CSS-only expand/collapse with `[open]` selector, no animation
**And** full header bar is clickable (44x44px minimum touch target)

### Story 2.5: Assemble Complete Homepage

As a visitor,
I want the homepage to present all sections in the correct order with proper spacing,
So that I experience the full conversion funnel from landing to action.

**Acceptance Criteria:**

**Given** a visitor loads the homepage (`/`)
**When** the page fully renders
**Then** sections appear in order: Hero Carousel → Service Cards → Reasons Grid → Process Flow → Area Map → Case Studies → Testimonials → FAQ → CTA Block
**And** CTABlock components are placed between major sections (3-5 instances per page)
**And** section spacing follows UX-DR17: 60-80px vertical padding, 24-32px heading-to-content, content max-width 1100-1200px centered
**And** alternating section backgrounds (white / #F5F5F5) for visual rhythm
**And** page title tag is unique with keyword + region (例: 「設備人｜水漏れ・電気修理・害虫駆除｜24時間対応」)
**And** single H1, sequential H2/H3 heading hierarchy
**And** page weight < 500KB, Lighthouse Performance ≥ 90 (final 95+ target in Epic 6)

## Epic 3: Service Pages (Water, Electrical, Pest Control)

Visitor có thể browse tất cả dịch vụ qua hub pages và detail pages với đầy đủ 13-section canonical layout — pricing tiers, competitor comparison, area map, process flow, case studies, testimonials, FAQ, và trust signals.

### Story 3.1: Build Service Detail Page Template with Anchor Menu and Pricing

As a visitor,
I want to view detailed service information with pricing and easy section navigation,
So that I can quickly find pricing for my specific problem and jump to sections I care about.

**Acceptance Criteria:**

**Given** a visitor navigates to a service detail page (e.g., `/electricity/breaker`)
**When** the page renders
**Then** the 13-section canonical layout begins with: Breadcrumb → Hero image + WEB割引 badge (¥1,500 discount) → Anchor menu → Pricing tiers
**And** AnchorMenu displays horizontal icon-based jump nav (料金, 選ばれる理由, 比較, エリア, フロー, 施工事例, お客様の声, FAQ) with horizontal scroll on mobile
**And** `scroll-margin-top` on target sections accounts for sticky header + anchor menu combined height (UX-DR7)
**And** smooth scroll via `scroll-behavior: smooth`, disabled when `prefers-reduced-motion`
**And** PricingTier cards display service photo, tier name, and price with 税込 notation
**And** prices are formatted via formatters.ts and sourced from content collections
**And** starting prices are visible for each service (FR14)
**And** WEB割引 badge appears at page top (UX-DR5)

### Story 3.2: Build Comparison Table, Reasons Grid, and Trust Signals for Service Pages

As a visitor,
I want to compare this service against competitors and see credentials,
So that I feel confident this is the best choice for my repair needs.

**Acceptance Criteria:**

**Given** a visitor scrolls to the comparison section on a service detail page
**When** ComparisonTable renders
**Then** it displays a 3-column table (当社 vs A社 vs B社) with ○/×/△ feature indicators
**And** table uses proper `<table>` with `<th scope="col">`, `<caption>`
**And** ○/× indicators have `aria-label="対応"/"非対応"` for screen readers (UX-DR8)
**And** on mobile (< 768px), table has horizontal scroll with sticky first column

**When** ReasonsGrid renders on service detail page
**Then** it displays 4-column grid with trust indicators: licensed technicians, certifications (第1種/第2種電気工事士), years of experience (FR22)
**And** satisfaction guarantee messaging ("no charge if unsatisfied") is visible (FR16)

### Story 3.3: Build Service Area, Process Flow, Case Studies, Testimonials, and FAQ Sections for Service Pages

As a visitor,
I want to verify service coverage, understand the process, and see proof of quality on every service page,
So that I can confirm my area is served and trust the service before calling.

**Acceptance Criteria:**

**Given** a visitor scrolls through a service detail page
**When** Area Map section renders
**Then** it displays service coverage for Tokyo, Nagoya, Osaka, Hyogo with prefecture/city lists (FR17, FR19)
**And** office locations and contact details are shown per region (FR18)

**When** Process Flow section renders
**Then** 5-step flow (相談→訪問→見積→作業→支払) displays with numbered illustrations (FR15)

**When** Case Studies section renders
**Then** CaseStudyCard components display with photo, category tag, location, duration, and cost (FR21)

**When** Testimonials section renders
**Then** TestimonialCard components display with service type, cost, and customer message (FR20)

**When** FAQ section renders
**Then** FAQAccordion displays service-specific Q&A using native `<details>/<summary>` (FR26)

**And** Related services cards appear after FAQ linking to other services in same category
**And** CTA Block + Footer complete the page
**And** CTABlock appears 3-5 times throughout the page between major sections

### Story 3.4: Create Service Content Data and Dynamic Route Generation

As a content manager,
I want all service data defined in content collections with dynamic page generation,
So that adding or updating a service only requires editing a JSON file.

**Acceptance Criteria:**

**Given** content collection files exist for all services
**When** `astro build` runs
**Then** `[service].astro` uses `getStaticPaths()` to generate pages for all electricity services (breaker, outlet, lighting, antenna, water-heater) from `content/services/electricity/`
**And** `[service].astro` generates pages for all water services (toilet, kitchen, bath, washroom) from `content/services/water/`
**And** pest control `[service].astro` generates pages for cockroach, termite, rodent, general-pest from `content/services/pest-control/` (FR13)
**And** each generated page follows the identical 13-section template with data from content collections
**And** Zod schema validation catches missing or invalid fields at build time
**And** all service JSON files contain: serviceName, startingPrice, serviceArea, imageAlt, pricing tiers, FAQ entries, related services

### Story 3.5: Build Service Hub Pages

As a visitor,
I want hub pages for each service category showing all available sub-services,
So that I can browse and compare options within water, electrical, or pest control categories.

**Acceptance Criteria:**

**Given** a visitor navigates to `/electricity`
**When** the hub page renders
**Then** it displays all 5 electrical services as ServiceCard grid with photo, name, starting price, and WEB割引 badge
**And** cards link to respective detail pages (`/electricity/breaker`, etc.)

**Given** a visitor navigates to `/water`
**When** the hub page renders
**Then** it displays all 4 water services as ServiceCard grid (FR11)

**Given** a visitor navigates to `/pest-control`
**When** the hub page renders
**Then** it displays all pest control services as ServiceCard grid (FR13)

**And** all hub pages include Breadcrumb, CTABlock sections, and Footer
**And** card grid responsive: 1 col (mobile) → 2 col (tablet) → 3-4 col (desktop)
**And** each hub page has unique title tag with keyword + region for SEO
**And** 24/7 availability messaging visible on all service pages (FR10)

## Epic 4: Contact, Company & Supporting Pages

Visitor có thể liên hệ qua contact form với service category selection, xem thông tin công ty (about, philosophy, offices), privacy policy, process flow page, FAQ page, sitemap page, và 404 page.

### Story 4.1: Build Contact Form Page

As a visitor,
I want to submit a contact request with my details and service needs,
So that I can request a consultation without making a phone call.

**Acceptance Criteria:**

**Given** a visitor navigates to `/contact`
**When** the page renders
**Then** ContactForm (React island) displays single-column form with fields: name, address, phone, email, service category dropdown, description textarea
**And** service category dropdown uses native `<select>` with grouped options: 電気工事 (5 services) / 水道工事 (4 services) / 害虫駆除 (sub-types) (FR9)
**And** required fields marked with 「必須」 red badge next to label (not asterisk) (UX-DR9)
**And** every `<input>` has a visible `<label>` — never placeholder-only
**And** input font-size is minimum 16px to prevent iOS zoom on focus
**And** form validates on blur (field exit) + on submit
**And** error messages display in Japanese below field: 「[フィールド名]を入力してください」 with red border
**And** IME composition events handled: form submission suppressed during `compositionstart`→`compositionend` (UX-DR9)
**And** `aria-describedby` links errors to fields, `aria-required="true"` on required fields

### Story 4.2: Implement Contact Form Submission and Feedback

As a visitor,
I want clear feedback when I submit the contact form,
So that I know my request was received or can take alternative action if it fails.

**Acceptance Criteria:**

**Given** a visitor fills all required fields correctly and clicks 「送信する」
**When** form submits to Formspree endpoint (`import.meta.env.PUBLIC_FORMSPREE_ID`)
**Then** submit button shows disabled state + spinner + 「送信中...」 to prevent double submission
**And** on success: green banner displays 「お問い合わせありがとうございます。担当者より連絡いたします。」 and form fields clear (UX-DR18)
**And** on server error: red banner displays 「送信に失敗しました。お電話でもお問い合わせいただけます。」 with phone number fallback, form data preserved
**And** Formspree honeypot field is included for spam protection (no reCAPTCHA for MVP)
**And** submission feedback uses `aria-live="polite"` for screen reader announcement
**And** total ContactForm island JS size ~8KB gzip

### Story 4.3: Build Company Pages

As a visitor,
I want to view company information, philosophy, and office locations,
So that I can verify the company is legitimate and find my nearest office.

**Acceptance Criteria:**

**Given** a visitor navigates to `/company`
**When** the page renders
**Then** company overview page displays about information and philosophy summary (FR27)
**And** links to sub-pages: philosophy and office

**Given** a visitor navigates to `/company/philosophy`
**When** the page renders
**Then** company philosophy content displays from `content/company/philosophy.json`

**Given** a visitor navigates to `/company/office`
**When** the page renders
**Then** office information displays for all 4 regional locations (Tokyo, Nagoya, Osaka, Hyogo) with addresses, phone numbers, and contact details (FR28)
**And** office data sourced from `content/company/offices.json`
**And** all pages include Breadcrumb, CTABlock sections, and proper heading hierarchy

### Story 4.4: Build Process Flow, FAQ, Privacy, Sitemap, and 404 Pages

As a visitor,
I want dedicated pages for process flow, FAQ, privacy policy, sitemap, and a helpful 404 page,
So that I can find detailed information and navigate even when landing on a broken link.

**Acceptance Criteria:**

**Given** a visitor navigates to `/flow`
**When** the page renders
**Then** ProcessFlow component displays the full 5-step process with detailed descriptions (FR15)
**And** CTABlock sections appear between/after steps

**Given** a visitor navigates to `/faq`
**When** the page renders
**Then** FAQAccordion displays all 6+ FAQ entries from `content/faq/` collection (FR26)
**And** uses native `<details>/<summary>`, zero JavaScript

**Given** a visitor navigates to `/privacy`
**When** the page renders
**Then** privacy policy content displays with proper heading structure (FR29)

**Given** a visitor navigates to `/sitemap`
**When** the page renders
**Then** HTML sitemap displays all pages organized by category with links

**Given** a visitor navigates to a non-existent URL
**When** the 404 page renders
**Then** it displays a simple message + link to homepage + phone number CTA
**And** no elaborate illustrations — functional and conversion-focused

## Epic 5: Blog/Column & Content Management

Visitor có thể browse blog/column articles. Content manager có thể thêm/sửa/xóa nội dung (services, cases, testimonials, FAQ, blog) qua data files, preview locally, và deploy với automatic build.

### Story 5.1: Build Blog/Column Listing and Detail Pages

As a visitor,
I want to browse blog articles and read individual posts,
So that I can learn about home repair topics and seasonal tips.

**Acceptance Criteria:**

**Given** a visitor navigates to `/column`
**When** the page renders
**Then** blog listing displays articles from `content/blog/` collection with title, date, excerpt, and category tag
**And** FilterNav component allows filtering by category (all, electricity, water, pest control)
**And** Pagination component enables navigation between pages (1-2-3) generated via `getStaticPaths()` with page parameter
**And** `aria-current="page"` on active filter and current page number

**Given** a visitor clicks a blog article
**When** `/column/[slug]` renders
**Then** full article content displays from Markdown with proper heading hierarchy
**And** Breadcrumb shows TOP > コラム > [Article Title]
**And** CTABlock sections appear after article content
**And** page has unique title tag and meta description for SEO

### Story 5.2: Build Paginated Case Studies and Testimonials Listing Pages

As a visitor,
I want to browse all case studies and testimonials with pagination and filtering,
So that I can find relevant examples for my specific service need.

**Acceptance Criteria:**

**Given** a visitor navigates to `/case`
**When** the page renders
**Then** CaseStudyCard components display all case studies from `content/cases/` with photo, category, location, duration, and cost (FR40)
**And** FilterNav allows filtering by service category
**And** Pagination navigates between pages generated via `getStaticPaths()` with page parameter
**And** cards link are styled with hover shadow effect (UX-DR11)

**Given** a visitor navigates to `/voice`
**When** the page renders
**Then** TestimonialCard components display all testimonials from `content/testimonials/` with service type, cost, and message (FR41)
**And** FilterNav and Pagination work identically to case studies page
**And** `<blockquote>` with `<cite>` used for semantic markup

### Story 5.3: Document Content Management Workflow

As a content manager,
I want clear documentation on how to add, edit, and deploy content,
So that I can maintain the site without developer assistance.

**Acceptance Criteria:**

**Given** a content manager wants to add a new case study
**When** they create a new Markdown file in `content/cases/` following the existing template
**Then** Zod schema validates required fields (photo, category, location, duration, cost) at build time (FR40)
**And** `astro build` fails with descriptive error message if any required field is missing or invalid

**Given** a content manager wants to update FAQ entries
**When** they edit JSON files in `content/faq/`
**Then** changes are validated against Zod schema at build time (FR42)

**Given** a content manager wants to add a testimonial
**When** they create a new JSON file in `content/testimonials/`
**Then** it validates and appears on the voice page and relevant service detail pages (FR41)

**Given** a content manager wants to preview changes
**When** they run `astro dev`
**Then** local dev server shows all changes with hot reload (FR44)

**Given** a content manager pushes changes to main branch
**When** Cloudflare Pages receives the push
**Then** automatic build runs and deploys within ~2 minutes (FR45)
**And** Zod validation prevents invalid content from reaching production

## Epic 6: SEO, Performance & Accessibility Polish

Search engines có thể crawl, index, và đọc structured data. Site đạt Lighthouse ≥ 95, WCAG 2.1 AA, Core Web Vitals pass. Production deployment on Cloudflare Pages.

### Story 6.1: Implement Schema.org Structured Data on All Pages

As a search engine,
I want valid Schema.org JSON-LD structured data on every page,
So that rich snippets appear in Google Japan search results.

**Acceptance Criteria:**

**Given** any page on the site
**When** Google Rich Results Test validates the page
**Then** zero errors are reported (NFR25)

**Given** the homepage or company pages render
**Then** `generateLocalBusiness()` outputs valid LocalBusiness JSON-LD for all 4 regional offices (Tokyo, Nagoya, Osaka, Hyogo) with NAP consistency

**Given** a service detail page renders
**Then** `generateService()` outputs valid Service JSON-LD with pricing, area served
**And** `generateFAQ()` outputs valid FAQPage JSON-LD from page FAQ entries
**And** `generateBreadcrumb()` outputs valid BreadcrumbList JSON-LD

**Given** the voice/testimonials page renders
**Then** `generateReview()` outputs valid Review/AggregateRating JSON-LD

**Given** a blog post renders
**Then** `generateArticle()` outputs valid Article JSON-LD with publishedDate

**And** all structured data generated via `src/utils/schema.ts` functions — never inline JSON-LD in page templates (FR36)

### Story 6.2: Implement Technical SEO (Sitemap, Robots, Meta Tags, Canonical URLs)

As a search engine,
I want a complete sitemap, robots.txt, canonical URLs, and proper language/region tags,
So that all pages are discoverable and correctly indexed for Google Japan.

**Acceptance Criteria:**

**Given** the site is built
**When** `sitemap.xml` is generated via `@astrojs/sitemap`
**Then** it includes all pages with correct lastmod dates (FR35, NFR26)

**Given** `robots.txt` exists in `public/`
**Then** it contains proper crawler directives allowing full site indexing

**Given** any page renders
**Then** `<link rel="canonical">` points to the correct URL (FR38)
**And** `<html lang="ja">` with UTF-8 charset is set (FR37)
**And** `hreflang` tag for Japanese content is present (FR37)
**And** unique `<title>` tag with keyword + region (例: 「東京の水漏れ修理｜24時間対応」)
**And** `<meta name="description">` under 120 characters with CTA
**And** single `<h1>` per page with sequential heading hierarchy
**And** clean URL structure: `/electricity/breaker`, `/pest-control/cockroach`
**And** `<link rel="preconnect">` for Google Fonts and Maps

### Story 6.3: Performance Optimization and Core Web Vitals

As a visitor,
I want every page to load in under 1 second on mobile,
So that I can access emergency service information instantly.

**Acceptance Criteria:**

**Given** any page on the site
**When** tested with Lighthouse on mobile
**Then** Performance score ≥ 95 (NFR2)
**And** LCP < 1.5s (NFR3)
**And** INP < 100ms (NFR3)
**And** CLS < 0.05 (NFR3)

**Given** any page
**When** page weight is measured
**Then** total page weight < 500KB (NFR5)
**And** total JavaScript payload < 50KB (NFR6)
**And** font loading uses `font-display: swap` and does not block first paint (NFR8)

**Given** all images on the site
**Then** they use Astro `<Image>` with WebP/AVIF output, responsive srcset, and explicit width/height for CLS prevention (NFR7)
**And** hero slide 1 uses `fetchpriority="high"` + `loading="eager"`, all others `loading="lazy"`

**Given** Cloudflare Pages serves the site
**Then** TTFB < 200ms from edge locations (NFR4)
**And** build time < 60 seconds for full site rebuild (NFR14)

### Story 6.4: Security Headers and Cloudflare Pages Production Deployment

As a site owner,
I want the site deployed to production with proper security headers,
So that the site is live, secure, and serving visitors from Cloudflare's edge network.

**Acceptance Criteria:**

**Given** the site is deployed to Cloudflare Pages
**When** any page is requested
**Then** HTTPS is enforced via Cloudflare automatic SSL (NFR9)
**And** Content-Security-Policy headers are configured via Astro 6 CSP API whitelisting: `fonts.googleapis.com`, `fonts.gstatic.com`, `maps.googleapis.com`, `formspree.io` (NFR12)
**And** no sensitive data is stored on the website (NFR11)

**Given** the Git repository main branch
**When** a push is made
**Then** Cloudflare Pages auto-builds and deploys within ~2 minutes
**And** branch previews generate automatic preview URLs for PRs

**Given** `.env` configuration
**Then** `PUBLIC_FORMSPREE_ID` and any Maps embed key are set as environment variables
**And** `.env.example` documents all required variables

### Story 6.5: WCAG 2.1 AA Accessibility Audit and Fixes

As a visitor with disabilities,
I want the site to be fully accessible via keyboard, screen reader, and assistive technologies,
So that I can access emergency repair services regardless of my abilities.

**Acceptance Criteria:**

**Given** the entire site
**When** tested with Lighthouse Accessibility audit
**Then** score ≥ 95

**Given** all text on the site
**Then** color contrast ratio ≥ 4.5:1 for normal text, ≥ 3:1 for large text (NFR15)
**And** orange CTA text verified and darkened if needed for WCAG AA compliance

**Given** a keyboard-only user navigates the site
**Then** all interactive elements are focusable via Tab with visible focus ring (2px navy outline, 2px offset) (NFR16)
**And** skip-nav link is functional as first focusable element (NFR19)
**And** mega-menu navigable with arrow keys and Escape
**And** mobile menu has focus trap and Escape to close

**Given** a screen reader user
**Then** semantic HTML landmarks are present: `<header>`, `<nav>`, `<main>`, `<footer>` (NFR17)
**And** ARIA labels on carousel controls, mobile menu, and form inputs (NFR18)
**And** all images have Japanese alt text, decorative SVGs have `aria-hidden="true"` (NFR22)
**And** form errors announced via `aria-describedby` and `aria-live="polite"` (NFR20)

**Given** a user with motion sensitivity
**Then** `prefers-reduced-motion` disables carousel autoplay and smooth scroll transitions (NFR21)

## Epic 7: Admin Dashboard & CMS Integration

Content manager có thể quản lý toàn bộ nội dung website qua web UI (Decap CMS) và xem thống kê truy cập qua embedded Google Analytics dashboard. Không cần biết Git hoặc code. Authentication qua GitHub OAuth.

### Story 7.1: Setup Decap CMS with GitHub Authentication

As a content manager,
I want to access a web-based admin interface at /admin,
So that I can manage website content without using Git or code editors.

**Acceptance Criteria:**

**Given** a content manager navigates to `/admin`
**When** the page loads
**Then** Decap CMS login page renders with GitHub sign-in button
**And** after GitHub OAuth, CMS dashboard shows all 6 content types in sidebar navigation
**And** `public/admin/index.html` loads Decap CMS from CDN
**And** `public/admin/config.yml` defines backend (github), repo, branch, and media folder settings
**And** GitHub OAuth application is configured with correct callback URL

### Story 7.2: Configure CMS Collections for All Content Types

As a content manager,
I want form-based editors for all content types,
So that I can add/edit/remove services, cases, testimonials, FAQ, blog, and company info via UI.

**Acceptance Criteria:**

**Given** a content manager is logged into CMS
**When** they select a content type from the sidebar
**Then** the editor displays appropriate form fields:
- **Services:** serviceName, startingPrice, pricing tiers (list widget), FAQ entries, imageAlt, isEmergency, serviceArea
- **Cases:** photo (image widget), category (select), location, duration, cost, description (Markdown editor)
- **Testimonials:** service type (select), cost, customer message (text)
- **FAQ:** question, answer (Markdown), category (select)
- **Blog:** title, date, excerpt, category, body (Markdown editor), featured image
- **Company:** office data (list widget), philosophy content (Markdown)
**And** image uploads save to `public/images/` in correct subdirectories
**And** CMS editorial workflow is enabled (draft → review → ready → publish)
**And** content saved by CMS passes Zod schema validation at build time

### Story 7.3: Build Analytics Dashboard Page

As a content manager,
I want to view website traffic and search performance from the admin area,
So that I can understand content performance without switching between multiple tools.

**Acceptance Criteria:**

**Given** a content manager accesses the analytics page
**When** the page renders
**Then** embedded Google Analytics 4 dashboard shows: page views, top pages, traffic sources, user demographics
**And** direct link to Google Search Console property opens in new tab
**And** page is not publicly accessible (requires authentication or is listed in CMS custom pages)
**And** setup instructions for GA4 property ID configuration are provided
**And** `robots.txt` excludes `/admin/` from crawling

### Story 7.4: Admin Deployment and Documentation

As a content manager,
I want clear documentation on using the admin dashboard,
So that I can onboard quickly and manage content independently.

**Acceptance Criteria:**

**Given** a new content manager needs to start using the admin
**When** they read the admin guide
**Then** it covers: admin URL, GitHub OAuth login steps, content editing walkthrough per type, image upload guidelines, publishing workflow, and analytics access
**And** troubleshooting section addresses: login failures, build errors after publish, image size limits
**And** Cloudflare Pages environment variables for Decap CMS backend are documented
**And** content workflow diagram is included: Edit in CMS → Auto-commit → Auto-deploy (~2 min)
