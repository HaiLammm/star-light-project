---
stepsCompleted: [step-01-init, step-02-discovery, step-02b-vision, step-02c-executive-summary, step-03-success, step-04-journeys, step-05-domain-skipped, step-06-innovation-skipped, step-07-project-type, step-08-scoping, step-09-functional, step-10-nonfunctional, step-11-polish]
releaseMode: single-release
inputDocuments:
  - _bmad-output/planning-artifacts/research/technical-tech-stack-for-star-light15-clone-research-2026-05-04.md
workflowType: 'prd'
documentCounts:
  briefs: 0
  research: 1
  brainstorming: 0
  projectDocs: 0
classification:
  projectType: web_app
  domain: general
  complexity: low
  projectContext: greenfield
---

# Product Requirements Document - star-light

**Author:** Luonghailam
**Date:** 2026-05-05

## Executive Summary

A competitive clone inspired by star-light15.net — a Japanese home repair service website (設備人/Setsubit) — expanded to serve four regions: Tokyo, Nagoya, Osaka, and Hyogo. The site provides water repair, electrical repair, and pest control services to homeowners and businesses. Built on a modern Astro SSG stack, this site delivers identical design quality while achieving superior Core Web Vitals scores, directly translating to higher Google Japan rankings and market share capture from the original competitor.

Target users: Japanese homeowners and businesses in Tokyo, Nagoya, Osaka, and Hyogo seeking emergency water repair, electrical repair, and pest control services. The site must communicate trust, speed (10-minute response), 24/7 availability, and transparent pricing — all in native Japanese.

### What Makes This Special

Same content, same design, superior technical foundation. By rebuilding star-light15.net on Astro (zero-JS static site generator), the clone achieves LCP under 500ms vs the original's slower load times, Core Web Vitals scores of 90+ out of the box, and comprehensive Schema.org structured data (LocalBusiness, Service, FAQ, Review) that the original likely lacks. Google's March 2026 core update increased the weight of performance signals — this technical advantage directly converts to ranking advantage. The clone doesn't just match the competitor; it outperforms them on every metric Google measures.

## Project Classification

- **Project Type:** Web application (Multi-Page static website)
- **Domain:** General — Home repair services
- **Complexity:** Low — Content-focused static site with minimal dynamic interactivity (carousel, contact form)
- **Project Context:** Greenfield — New build from scratch
- **Tech Stack:** Astro SSG + Tailwind CSS v4 + Embla Carousel + Formspree + Cloudflare Pages
- **Target Market:** Japan — Tokyo, Nagoya, Osaka, Hyogo

## Success Criteria

### User Success

- Users find the needed service (water/electrical/pest control) within 3 clicks from homepage
- Click-to-call works seamlessly on mobile — one tap to dial 0120-219-695
- Contact form submission completes in under 30 seconds
- Page loads under 1 second on Japanese mobile networks (4G/5G)
- All content readable and navigable on devices from 320px to 2560px width

### Business Success

- **1,000+ phone calls/month** generated from website within 3 months of launch
- Rank on Google Japan page 1 for all target keywords within 3 months:
  - Water: 「水漏れ 修理 大阪」「トイレ 修理 東京」「キッチン 水漏れ 名古屋」「風呂 修理 兵庫」「水まわり 修理 大阪」
  - Electrical: 「電気修理 東京」「電気工事 大阪」「ブレーカー 修理 名古屋」「コンセント 修理 大阪」「照明 取付 東京」「アンテナ工事 大阪」「給湯器 交換 兵庫」
  - Pest Control: 「ゴキブリ 駆除 東京」「害虫駆除 大阪」「シロアリ 駆除 名古屋」「ネズミ 駆除 兵庫」「害虫駆除 24時間」
  - General: 「設備修理 大阪」「24時間 修理 東京」「水道 電気 修理 名古屋」
- Outperform star-light15.net on Core Web Vitals and Lighthouse scores
- Contact form conversion rate > 3%

### Technical Success

- Lighthouse Performance score ≥ 95
- Core Web Vitals all "good": LCP < 1.5s, INP < 100ms, CLS < 0.05
- Google PageSpeed Insights mobile score ≥ 90
- All pages indexed by Google within 1 week of launch
- Schema.org structured data validated (zero errors in Rich Results Test)
- 100% mobile responsive — no horizontal scroll on any device

### Measurable Outcomes

| Metric | Target | Timeline |
|--------|--------|----------|
| Phone calls from website | 1,000+/month | 3 months post-launch |
| Google Japan page 1 ranking | All target keywords | 3 months post-launch |
| Lighthouse score | ≥ 95 | At launch |
| Core Web Vitals pass rate | 100% | At launch |
| Pages indexed | All pages | 1 week post-launch |

## Product Scope

### MVP — Full Site (2-week deadline)

1. Homepage with hero carousel, service overview, reasons to choose, process flow, service area map, case studies, testimonials, FAQ, contact CTA
2. Water repair services hub + 4 sub-pages (toilet, kitchen, bath, washroom)
3. Electricity services hub + 5 sub-pages (breaker, outlet, lighting, antenna, water heater)
4. Pest control services hub + sub-pages (cockroach, termite, rodent, general pest)
5. Process flow page
6. Case studies page (5 projects)
7. Customer reviews page (5 testimonials)
8. Blog/Columns listing page
9. FAQ page (6 questions)
10. Company info page (about, philosophy, offices)
11. Contact form page
12. Privacy policy page
13. Sitemap page
14. Full SEO implementation: Schema.org, sitemap.xml, robots.txt, meta tags, hreflang

### Growth Features (Post-MVP)

- Blog CMS integration (headless CMS for content updates)
- Google Business Profile optimization and linking
- Call tracking integration (measure phone call conversions)
- A/B testing for CTA placements
- Additional service area pages for SEO expansion

### Vision (Future)

- Multi-region expansion beyond current 4 regions
- Online booking/scheduling system
- Customer portal for service history
- Chat widget for instant inquiries
- Multi-language support (Vietnamese, English)

## User Journeys

### Journey 1: Tanaka-san — Emergency Water Leak at 2 AM

**Persona:** Tanaka Yuki, 42, homeowner in Osaka. Wakes up at 2 AM to find water flooding the kitchen from a burst pipe under the sink.

**Opening Scene:** Panicked, Tanaka grabs her phone and searches 「水漏れ 修理 大阪 24時間」. She needs someone NOW — water is spreading to the living room.

**Rising Action:** Our site appears in the top results. She taps through — the page loads instantly (<1s). She sees 「最短10分即日駆けつけ」(10-minute emergency response) and the prominent phone number. The pricing section shows transparent starting costs (¥5,500~). Trust signals — licensed technicians, customer reviews — reassure her this isn't a scam.

**Climax:** She taps the click-to-call button. One tap. The phone rings. A dispatcher answers within 3 rings and confirms a technician is on the way within 15 minutes.

**Resolution:** The leak is fixed by 3 AM. Tanaka leaves a positive review. She bookmarks the site for future emergencies and tells her neighbors about the service.

**Requirements revealed:** Click-to-call prominence, 24/7 messaging, fast page load, trust signals, transparent pricing, mobile-first design.

### Journey 2: Suzuki-san — Pest Problem Research

**Persona:** Suzuki Kenji, 35, apartment renter in Tokyo. Noticed cockroaches in the kitchen for the past week. Not an emergency, but increasingly uncomfortable.

**Opening Scene:** During lunch break, Suzuki searches 「ゴキブリ 駆除 東京」on his phone. He wants to compare options, read reviews, and understand pricing before committing.

**Rising Action:** He finds our site and browses the pest control service page. He reads 3 case studies of similar pest problems resolved. The FAQ section answers his questions: "Do I need to leave during treatment?" "Is it safe for my cat?" "How long does it take?" He checks the service area — Tokyo is covered.

**Climax:** Convinced by the reviews and transparent pricing, he fills out the contact form during his lunch break — selecting "pest control" as the service category, describing the issue, and requesting a weekday evening appointment.

**Resolution:** He receives a confirmation call within 2 hours. The pest control is scheduled for Thursday evening. Problem solved without disrupting his work schedule.

**Requirements revealed:** Detailed service pages for pest control, case studies with before/after, FAQ addressing common pest concerns, contact form with service category selection, service area verification.

### Journey 3: Yamamoto-san — Electrical Emergency in Nagoya Office

**Persona:** Yamamoto Takeshi, 55, small business owner running a ramen shop in Nagoya. The circuit breaker keeps tripping during peak lunch hours, killing the kitchen equipment.

**Opening Scene:** Between lunch rushes, Yamamoto searches 「ブレーカー 修理 名古屋 即日」— he's losing money every time the power goes out. He needs same-day service.

**Rising Action:** Our site loads fast on his old smartphone. The electricity services page clearly lists circuit breaker repair with starting price ¥1,100~. He sees the 5-step process flow (consultation → dispatch → estimate → work → payment) and feels confident about what to expect. The "no charge if unsatisfied" guarantee removes his last hesitation.

**Climax:** He calls the emergency number. The dispatcher confirms a licensed electrician can arrive by 3 PM — between lunch and dinner rush. Perfect.

**Resolution:** The electrician diagnoses an overloaded circuit, installs a dedicated line for the kitchen equipment, and the problem is permanently solved. Yamamoto's shop runs smoothly through dinner rush. He recommends the service to other shop owners in the area.

**Requirements revealed:** Business-friendly service hours, commercial service capability, same-day service messaging, clear process flow, satisfaction guarantee messaging, Nagoya service area coverage.

### Journey 4: Dan — Content Manager

**Persona:** Dan, the hired website manager. Responsible for keeping content fresh, updating case studies, and monitoring site performance.

**Opening Scene:** Dan receives login credentials and a brief onboarding guide. He needs to add a new case study from a recent pest control job in Tokyo and update the FAQ with a new question about termite treatment.

**Rising Action:** Dan accesses the content files (Markdown/JSON in the Git repository or headless CMS). He creates a new case study entry with photos, location, duration, and cost. He adds the new FAQ entry. He runs a local preview to verify the changes look correct.

**Climax:** Dan commits the changes and triggers a build. Cloudflare Pages deploys the update within 2 minutes. The new case study appears on the site with proper Schema.org structured data automatically applied.

**Resolution:** Dan checks Google Search Console — the new page is indexed within days. He monitors Core Web Vitals dashboard to ensure performance remains at 95+. Monthly, he adds 2-3 new blog posts targeting seasonal keywords (「夏 ゴキブリ 対策」in summer, 「冬 水道管 凍結」in winter).

**Requirements revealed:** Easy content update workflow, Markdown/CMS-based content management, automatic Schema.org generation, preview capability, fast deployment pipeline, Google Search Console integration guidance.

### Journey Requirements Summary

| Capability | Journeys | Priority |
|-----------|----------|----------|
| Click-to-call (prominent, mobile-optimized) | 1, 3 | Critical |
| Fast page load (<1s) | 1, 2, 3 | Critical |
| Service pages (water, electrical, pest control) | 1, 2, 3 | Critical |
| Contact form with service category | 2 | Critical |
| Case studies with photos | 2, 4 | High |
| FAQ section | 2 | High |
| Service area display (Tokyo, Nagoya, Osaka, Hyogo) | 2, 3 | Critical |
| Trust signals (reviews, licenses, guarantee) | 1, 3 | Critical |
| Transparent pricing | 1, 2, 3 | Critical |
| Content management workflow | 4 | High |
| Schema.org structured data | 4 | Critical |
| Blog/seasonal content | 4 | Medium |

## Web Application Specific Requirements

### Project-Type Overview

Multi-Page static website built with Astro SSG, optimized for SEO dominance on Google Japan. Three service categories (water repair, electrical repair, pest control) across four regions (Tokyo, Nagoya, Osaka, Hyogo). Zero client-side JavaScript by default — interactive islands only for carousel and contact form.

### Browser Support Matrix

| Browser | Minimum Version | Priority |
|---------|----------------|----------|
| Chrome | Latest 2 versions | Primary |
| Safari | Latest 2 versions | Primary (iOS dominant in Japan) |
| Edge | Latest 2 versions | Secondary |
| Internet Explorer 11 | IE11 | Legacy support — graceful degradation, not full feature parity |

**IE11 strategy:** Static content renders correctly. Interactive features (carousel, form validation) may use simplified fallbacks. No polyfills for modern CSS features — progressive enhancement approach.

### Responsive Design

- **Mobile-first**: Design starts at 320px, scales up
- **Breakpoints**: 320px (mobile) → 768px (tablet) → 1024px (desktop) → 1440px (wide)
- **Touch targets**: Minimum 44x44px for all interactive elements (click-to-call, form inputs, navigation)
- **No horizontal scroll** on any viewport width
- **Japanese text**: Proper line-breaking rules (word-break: keep-all for Japanese text)

### Performance Targets

See Non-Functional Requirements > Performance for full specification. Key targets: Lighthouse ≥ 95, LCP < 1.5s, INP < 100ms, CLS < 0.05, page weight < 500KB, JS < 50KB.

### SEO Strategy

**On-Page SEO:**
- Unique title tags per page with keyword + region (例: 「東京の水漏れ修理｜24時間対応」)
- Meta descriptions 120 characters with CTA
- Single H1 per page, structured H2/H3 hierarchy
- Clean URL structure: `/electricity/breaker`, `/pest-control/cockroach`
- Internal linking between related services
- Alt text on all images in Japanese

**Structured Data (Schema.org JSON-LD):**
- `LocalBusiness` — 4 regional offices (Tokyo, Nagoya, Osaka, Hyogo)
- `Service` — each service type with pricing, area served
- `FAQPage` — FAQ section for rich snippets
- `Review` / `AggregateRating` — customer testimonials
- `BreadcrumbList` — every page
- `Article` — blog/column posts

**Technical SEO:**
- Auto-generated `sitemap.xml` via `@astrojs/sitemap`
- `robots.txt` with proper crawler directives
- Canonical URLs on every page
- `<html lang="ja">` with UTF-8 charset
- `hreflang` tag for Japanese content
- Preconnect to external resources (Google Fonts, Maps)

**Local SEO:**
- NAP consistency (Name, Address, Phone) across all pages
- Region-specific landing pages for each service area
- Google Business Profile integration (4 locations)

### Accessibility

WCAG 2.1 AA compliance required. See Non-Functional Requirements > Accessibility for full specification.

### Implementation Considerations

- **Astro Islands**: Only carousel (Embla) and contact form (React) are hydrated — rest is pure HTML/CSS
- **Font loading**: Noto Sans JP with `font-display: swap`, preloaded
- **Image pipeline**: Astro `<Image />` component with Sharp — auto WebP/AVIF, responsive srcset, lazy loading
- **Build output**: Pure static HTML/CSS/JS deployed to Cloudflare Pages edge network
- **Content structure**: Markdown files for blog posts, JSON data files for services/case studies/FAQ

## Project Scoping

### Strategy & Philosophy

**Approach:** Single-release, all-or-nothing launch. All 13 pages ship simultaneously to maximize SEO impact from day 1 — Google rewards complete, interlinked site structures over incremental page additions. The 2-week timeline is tight but achievable with Astro SSG (static site = no backend complexity).

**Resource Requirements:** 1 developer (full-time, 2 weeks). Content (Japanese text, images) must be provided by client in parallel with development.

### Complete Feature Set

**Core User Journeys Supported:**
- Journey 1 (Tanaka — emergency water leak): Click-to-call, 24/7 messaging, trust signals
- Journey 2 (Suzuki — pest research): Service pages, case studies, FAQ, contact form
- Journey 3 (Yamamoto — electrical emergency): Process flow, pricing, satisfaction guarantee
- Journey 4 (Dan — content manager): Markdown/JSON content workflow, easy deployment

**Must-Have Capabilities:**
1. All 13 pages with responsive design (mobile-first)
2. Hero carousel with autoplay (Embla)
3. Contact form with service category selection (Formspree)
4. Click-to-call on all pages
5. Service area map (4 regions)
6. Schema.org structured data (LocalBusiness, Service, FAQ, Review, Breadcrumb)
7. sitemap.xml, robots.txt, canonical URLs, hreflang
8. Noto Sans JP font with optimized loading
9. Image optimization pipeline (WebP/AVIF)
10. Cloudflare Pages deployment

**Nice-to-Have Capabilities (ship if time permits):**
1. Blog/columns with 2-3 seed articles
2. Google Analytics / Search Console setup guide
3. Automated Lighthouse CI in build pipeline
4. Open Graph images for social sharing

### Risk Mitigation Strategy

**Technical Risks:**
- Risk: 2-week timeline is tight for 13 pages → Mitigation: Use Astro component reuse heavily — service pages share a template, only content differs. Estimate: 3-4 unique layouts, rest are variations.
- Risk: Japanese content not ready in time → Mitigation: Build with placeholder Japanese text first, swap real content as it arrives. Structure allows parallel content/dev work.

**Market Risks:**
- Risk: SEO ranking takes months, not immediate → Mitigation: Technical SEO excellence (Core Web Vitals, structured data) gives ranking advantage from day 1. Submit sitemap to Google Search Console immediately at launch.
- Risk: Competing with established star-light15.net → Mitigation: Superior technical performance + expanded service area (Tokyo, Nagoya) where competitor may be weaker.

**Resource Risks:**
- Risk: Single developer bottleneck → Mitigation: Astro SSG simplicity reduces complexity. No backend, no database, no authentication = fewer things to go wrong.
- Risk: Content manager (Dan) not technical → Mitigation: Provide clear documentation for Markdown content updates. Consider Decap CMS (Git-based, no server) as post-launch improvement.

## Functional Requirements

### Navigation & Site Structure

- FR1: Visitor can navigate to any page within 3 clicks from homepage
- FR2: Visitor can access primary navigation menu on all pages (desktop and mobile)
- FR3: Visitor can view breadcrumb trail showing current location on all pages
- FR4: Visitor can access footer navigation with complete site links on all pages
- FR5: Mobile visitor can open/close a hamburger navigation menu

### Emergency Contact & Communication

- FR6: Visitor can initiate a phone call with one tap on mobile devices from any page
- FR7: Visitor can see the emergency phone number prominently displayed on every page
- FR8: Visitor can submit a contact request via form with name, address, phone, email, service category, and description
- FR9: Visitor can select service category (water, electrical, pest control) in the contact form
- FR10: Visitor can see 24/7 availability messaging on all service pages

### Service Information

- FR11: Visitor can browse water repair services with sub-categories (toilet, kitchen, bath, washroom)
- FR12: Visitor can browse electrical repair services with sub-categories (breaker, outlet, lighting, antenna, water heater)
- FR13: Visitor can browse pest control services with sub-categories
- FR14: Visitor can view starting prices for each service category
- FR15: Visitor can view the 5-step service process flow (consultation → dispatch → estimate → work → payment)
- FR16: Visitor can view the satisfaction guarantee policy ("no charge if unsatisfied")

### Service Area & Location

- FR17: Visitor can view service coverage areas (Tokyo, Nagoya, Osaka, Hyogo)
- FR18: Visitor can view office locations and contact details for each region
- FR19: Visitor can view a visual map of service areas

### Trust & Social Proof

- FR20: Visitor can view customer testimonials with service details
- FR21: Visitor can view case studies with photos, location, duration, and cost
- FR22: Visitor can see trust indicators (licensed technicians, years of experience, certifications)
- FR23: Visitor can see the "reasons to choose us" section with key differentiators

### Content & Blog

- FR24: Visitor can browse blog/column articles listing
- FR25: Visitor can read individual blog/column articles
- FR26: Visitor can view FAQ with common questions and answers

### Company Information

- FR27: Visitor can view company overview (about, philosophy)
- FR28: Visitor can view office information for each regional location
- FR29: Visitor can view privacy policy

### Homepage Experience

- FR30: Visitor can view a hero carousel with rotating service banners
- FR31: Visitor can see service category overview cards on homepage
- FR32: Visitor can view featured case studies on homepage
- FR33: Visitor can view featured customer testimonials on homepage
- FR34: Visitor can view FAQ highlights on homepage

### SEO & Discoverability

- FR35: Search engine can crawl and index all pages via sitemap.xml
- FR36: Search engine can read structured data (LocalBusiness, Service, FAQ, Review, Breadcrumb) on relevant pages
- FR37: Search engine can determine page language and region via hreflang and lang attributes
- FR38: Search engine can resolve canonical URLs for each page

### Content Management

- FR39: Content manager can update service information, pricing, and descriptions via data files
- FR40: Content manager can add/edit/remove case studies with photos
- FR41: Content manager can add/edit/remove customer testimonials
- FR42: Content manager can add/edit/remove FAQ entries
- FR43: Content manager can publish new blog/column articles
- FR44: Content manager can preview changes locally before deployment
- FR45: Content manager can deploy content updates with automatic build and publish

## Non-Functional Requirements

### Performance

- Page load time < 1 second on 4G mobile networks in Japan
- Lighthouse Performance score ≥ 95 on all pages
- LCP < 1.5s, INP < 100ms, CLS < 0.05 on all pages
- TTFB < 200ms (Cloudflare Pages edge delivery)
- Total page weight < 500KB per page
- JavaScript payload < 50KB (carousel + form islands only)
- All images served in WebP/AVIF with responsive srcset
- Font loading does not block first paint (font-display: swap)

### Security

- All pages served over HTTPS (Cloudflare automatic SSL)
- Contact form submissions protected against spam (Formspree built-in honeypot + reCAPTCHA option)
- No sensitive data stored on the website (stateless static site)
- Content-Security-Policy headers configured to prevent XSS
- No third-party scripts except Google Analytics (if added)

### Scalability

- Static site handles unlimited concurrent visitors (no server bottleneck)
- Cloudflare CDN serves from 300+ edge locations — automatic traffic distribution
- No database or server to scale — build output is pure HTML/CSS/JS
- Build time < 60 seconds for full full site rebuild

### Accessibility (WCAG 2.1 AA)

- Color contrast ratio ≥ 4.5:1 for normal text, ≥ 3:1 for large text
- All interactive elements keyboard-navigable with visible focus indicators
- Semantic HTML structure with proper heading hierarchy
- ARIA labels on interactive components (carousel controls, mobile menu, form inputs)
- Skip navigation link for screen reader users
- Form inputs with associated labels and accessible error messages
- `prefers-reduced-motion` media query disables carousel autoplay
- Image alt text in Japanese on all images

### Integration

- Formspree: Contact form submissions delivered to client email within 5 minutes
- Google Maps Embed: Service area map loads without blocking page render
- Schema.org JSON-LD: Valid structured data on all pages (zero errors in Google Rich Results Test)
- sitemap.xml: Auto-generated, includes all pages with correct lastmod dates
- Google Search Console: Site verification and sitemap submission at launch
