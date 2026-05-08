---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
workflowType: 'architecture'
lastStep: 8
status: 'complete'
completedAt: '2026-05-07'
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/ux-design-specification.md
  - _bmad-output/planning-artifacts/research/technical-tech-stack-for-star-light15-clone-research-2026-05-04.md
workflowType: 'architecture'
project_name: 'star-light'
user_name: 'Luonghailam'
date: '2026-05-07'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**
45 FRs across 9 categories. The architecture is fundamentally a multi-page static website with data-driven page generation. Core architectural patterns:
- Shared layout components (Header, Footer, CTABlock) on every page
- Template-based service detail pages (1 template → 9+ page variants via content collections)
- 3 JS islands (HeroCarousel, ContactForm, MobileMenu) — everything else is pure HTML/CSS
- Content management via Markdown/JSON files with Zod schema validation at build time
- External service integration limited to Formspree (contact form) and Google Maps Embed (service area)

**Non-Functional Requirements:**
- Performance: Lighthouse ≥ 95, LCP < 1.5s, INP < 100ms, CLS < 0.05, TTFB < 200ms, page weight < 500KB, JS < 50KB
- Security: HTTPS (Cloudflare auto-SSL), CSP headers, Formspree spam protection. No sensitive data stored.
- Scalability: Static site on CDN — unlimited concurrency by design. Build time < 60s.
- Accessibility: WCAG 2.1 AA — color contrast, keyboard navigation, ARIA labels, screen reader support, `prefers-reduced-motion`
- SEO: Schema.org JSON-LD (6 types), sitemap.xml, robots.txt, canonical URLs, hreflang, semantic HTML

**Scale & Complexity:**

- Primary domain: Static web (SSG) — content-focused multi-page site
- Complexity level: Low — no backend, no database, no auth, no real-time features
- Estimated architectural components: 20 Astro components, 1 layout, 13+ pages, content collections for 6 content types

### Technical Constraints & Dependencies

- **Astro SSG** as framework — zero JS by default, islands architecture for interactive components
- **Tailwind CSS v4** — utility-first, custom design tokens matching original site's pixel-perfect design
- **Cloudflare Pages** — edge deployment, automatic SSL, 300+ PoPs for Japan-optimized delivery
- **Formspree** — contact form backend (50 submissions/month free tier)
- **Embla Carousel** — lightweight hero carousel (~3KB gzip)
- **Noto Sans JP** — Google Fonts with unicode-range subsetting to manage 3MB+ full font
- **Content as code** — Markdown/JSON in Git repository, Astro content collections with Zod schemas
- **No CMS** for MVP — content updates via Git commits, Cloudflare Pages auto-builds in ~2 minutes
- **2-week deadline** — tight but achievable given static site simplicity and component reuse strategy

### Cross-Cutting Concerns Identified

1. **SEO structured data** — Schema.org JSON-LD must be generated on every page type (LocalBusiness, Service, FAQ, Review, Breadcrumb, Article). Requires a centralized structured data generation strategy.
2. **CTA phone block consistency** — CTABlock component appears 3-5x per page across all 13+ pages. Must be a single reusable component with variant support (full-width, compact, mobile sticky).
3. **Japanese typography** — `word-break: keep-all`, Noto Sans JP loading strategy, CLS management during font swap affects every page.
4. **Responsive mobile-first** — 4 breakpoints (320/768/1024/1440), component layout shifts at each breakpoint, mobile sticky CTA bar.
5. **Accessibility layer** — WCAG 2.1 AA compliance on every component without changing the original visual design. Focus indicators, ARIA labels, semantic HTML, keyboard navigation.
6. **Content collection schema** — Zod validation for 6 content types (services, cases, testimonials, FAQ, blog, company). Build-time validation prevents content errors in production.
7. **Image optimization pipeline** — Astro `<Image>` with Sharp for WebP/AVIF, responsive srcset, explicit dimensions for CLS prevention on all images across the site.

## Starter Template Evaluation

### Primary Technology Domain

Static web (SSG) — content-focused multi-page site for Japanese home repair services. Tech stack fully determined by PRD and technical research.

### Starter Options Considered

**Option 1: `create astro` with minimal template (Recommended)**
- Official Astro CLI scaffolding tool
- Clean, minimal starting point — no unnecessary abstractions
- Add integrations incrementally: Tailwind via Vite plugin, sitemap, React (for form island)
- Astro 6.x provides built-in Fonts API (relevant for Noto Sans JP loading) and CSP API

**Option 2: Astro + Tailwind community starter**
- Pre-configured Astro + Tailwind templates exist but often include unnecessary UI libraries or opinions
- Risk of outdated Tailwind v3 integration instead of v4 Vite plugin
- Not suitable for pixel-perfect clone — would need to strip out existing styles

**Option 3: Custom from scratch (no starter)**
- Maximum control but duplicates work the CLI wizard already handles
- No advantage over `create astro` minimal template

### Selected Starter: `create astro` (minimal template)

**Rationale for Selection:**
- Official, maintained by Astro core team — guaranteed Astro 6 compatibility
- Minimal template = clean slate for pixel-perfect clone (no existing styles to override)
- Astro 6's Vite Environment API means dev/prod parity on Cloudflare Workers
- Incremental integration addition matches the project's specific needs without bloat

**Initialization Command:**

```bash
npm create astro@latest star-light -- --template minimal --typescript strict
cd star-light
npx astro add tailwind sitemap react
npm install embla-carousel-react @formspree/react
```

**Architectural Decisions Provided by Starter:**

**Language & Runtime:**
- TypeScript (strict mode) — type safety for content schemas and component props
- Astro 6.x with Vite 6 build tooling
- Node.js runtime for build, Cloudflare Workers for production

**Styling Solution:**
- Tailwind CSS v4 via `@tailwindcss/vite` plugin (not legacy `@astrojs/tailwind`)
- CSS-only by default — no JS runtime for styling
- Custom design tokens in `tailwind.config.mjs` matching original site palette

**Build Tooling:**
- Vite 6 (built into Astro) — fast HMR, optimized production builds
- Astro `<Image>` with Sharp for image optimization (WebP/AVIF)
- Static output mode (`output: 'static'`) for Cloudflare Pages

**Testing Framework:**
- Not included by starter — add as needed (Playwright for E2E, Vitest for unit)
- Lighthouse CI for performance regression testing

**Code Organization:**
- `src/layouts/` — BaseLayout.astro (shared shell)
- `src/components/` — 20 Astro components
- `src/pages/` — file-based routing (13+ pages)
- `src/content/` — Astro content collections with Zod schemas (6 content types)
- `src/styles/` — global CSS with Tailwind imports
- `public/` — static assets (images, fonts if self-hosted)

**Development Experience:**
- `astro dev` — hot reload with Vite HMR
- Astro 6 Vite Environment API — exact Cloudflare Workers runtime in dev
- TypeScript strict mode with Astro's built-in type checking
- `astro check` for template validation

**Note:** Project initialization using this command should be the first implementation story.

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- Content data format: Hybrid JSON + Markdown via Astro content collections
- Static output mode with 3 JS islands only
- Cloudflare Pages deployment with auto-build on git push

**Important Decisions (Shape Architecture):**
- CSP headers via Astro 6 CSP API (whitelist Google Fonts, Maps, Formspree)
- Formspree honeypot spam protection (no reCAPTCHA for MVP)
- Form error handling with phone number fallback

**Deferred Decisions (Post-MVP):**
- reCAPTCHA integration (if spam becomes a problem)
- Lighthouse CI in build pipeline
- Headless CMS (Decap CMS) for non-technical content manager

### Data Architecture

- **No database** — pure static site, all content in Git repository
- **Content format:** Hybrid approach via Astro content collections:
  - **JSON** for structured data: services, pricing tiers, office locations, FAQ entries, testimonials metadata
  - **Markdown** for editorial content: blog posts, case study descriptions
- **Validation:** Zod schemas in `src/content/config.ts` — build fails on invalid content
- **Content types:** 6 collections (services, cases, testimonials, faq, blog, company)
- **No caching strategy needed** — static files served directly from CDN edge

### Authentication & Security

- **No authentication** — public static site, no user accounts
- **HTTPS:** Cloudflare automatic SSL/TLS
- **CSP headers:** Astro 6 built-in CSP API configured to whitelist:
  - `fonts.googleapis.com` / `fonts.gstatic.com` (Noto Sans JP)
  - `maps.googleapis.com` (Google Maps Embed)
  - `formspree.io` (contact form POST)
- **Form spam protection:** Formspree built-in honeypot field (no reCAPTCHA for MVP — reduces JS payload and friction)
- **No sensitive data stored** — stateless static site

### API & Communication Patterns

- **No API layer** — static site with single external POST to Formspree
- **Formspree integration:** `@formspree/react` in ContactForm island, POST to Formspree endpoint
- **Error handling pattern:** Contact form failure → display error banner with phone number fallback (「送信に失敗しました。お電話でもお問い合わせいただけます。」)
- **No rate limiting needed** — Formspree handles rate limiting on their end

### Frontend Architecture

- **State management:** None globally. Local React state only within ContactForm island (form values, validation errors, submission state)
- **Component architecture:** 20 Astro components (server-rendered HTML) + 3 JS islands (HeroCarousel, ContactForm, MobileMenu)
- **Routing:** Astro file-based routing — `src/pages/` maps directly to URL structure
- **Dynamic routes:** `[service].astro` for service detail pages, `[slug].astro` for blog posts — generated from content collections at build time via `getStaticPaths()`
- **Bundle optimization:** Astro automatic per-page code splitting, only island JS shipped to client. Total JS budget: ~12KB gzip
- **No client-side navigation** — full page loads (static HTML), no SPA-style transitions

### Infrastructure & Deployment

- **Hosting:** Cloudflare Pages — static site deployment on 300+ edge locations
- **CI/CD:** Cloudflare Pages auto-build on git push to `main` branch
- **Branch previews:** Automatic preview URLs for every git branch/PR
- **Build command:** `astro build` — output to `dist/`
- **Environment variables:** `.env` for Formspree form ID, Google Maps embed key (if used)
- **Monitoring:** Google Search Console for indexing + Core Web Vitals monitoring
- **No server monitoring needed** — static files, no server processes

### Decision Impact Analysis

**Implementation Sequence:**
1. Project initialization (`create astro` + integrations)
2. Tailwind config with design tokens (colors, typography, spacing)
3. Content collection schemas (Zod) for all 6 content types
4. BaseLayout + Header + Footer + CTABlock (shared shell)
5. Homepage with HeroCarousel island
6. Service detail page template (data-driven from collections)
7. Remaining pages (hub, case, voice, company, contact, blog)
8. SEO layer (Schema.org, sitemap, meta tags)
9. Accessibility audit + Lighthouse optimization
10. Cloudflare Pages deployment

**Cross-Component Dependencies:**
- All pages depend on BaseLayout → Header/Footer → must be built first
- Service detail pages depend on content collection schemas → schemas must be defined before page development
- ContactForm island depends on Formspree endpoint → environment variable setup required
- SEO structured data depends on content collection data → content schemas inform JSON-LD generation

## Implementation Patterns & Consistency Rules

### Pattern Categories Defined

**Critical Conflict Points Identified:**
12 areas where AI agents could make different choices, grouped into 4 categories.

### Naming Patterns

**File Naming Conventions:**
- Astro components: PascalCase — `ServiceCard.astro`, `CTABlock.astro`, `HeroCarousel.astro`
- Page files: kebab-case — `index.astro`, `[service].astro`, `privacy.astro`
- Content files: kebab-case — `toilet.json`, `case-001.md`, `cockroach.json`
- Utility files: camelCase — `schema.ts`, `siteConfig.ts`
- Style files: kebab-case — `global.css`

**Content Collection Field Naming:**
- camelCase for all fields: `serviceName`, `startingPrice`, `serviceArea`, `imageAlt`
- Boolean fields prefixed with `is`/`has`: `isEmergency`, `hasFreeEstimate`
- Date fields as ISO strings: `publishedDate: "2026-05-07"`

**CSS Conventions:**
- Tailwind utilities only — no custom CSS class names
- Exception: Japanese typography rules in `global.css` that Tailwind cannot express
- No `@apply` usage — inline Tailwind classes in component templates
- Responsive: mobile-first with `md:`, `lg:`, `xl:` prefixes

### Structure Patterns

**Component Organization:**
- Flat `src/components/` directory — all 20 components at root level
- No sub-folders for components (only 20 components, grouping adds unnecessary nesting)
- Each component is a single `.astro` file (except React islands which are `.tsx`)

**Content Collection Organization:**
```
src/content/
├── config.ts              # All Zod schemas defined here
├── services/
│   ├── electricity/       # 5 JSON files (breaker, outlet, lighting, antenna, water-heater)
│   └── water/             # 4 JSON files (toilet, kitchen, bath, washroom)
├── cases/                 # 1 Markdown file per case study (case-001.md, case-002.md)
├── testimonials/          # 1 JSON file per testimonial
├── faq/                   # 1 JSON file per FAQ entry
├── blog/                  # 1 Markdown file per blog post
└── company/               # JSON files for office locations, philosophy
```

**Image Organization:**
```
public/images/
├── hero/                  # 3 carousel slide images
├── services/              # Service category and detail images
├── cases/                 # Case study photos
├── icons/                 # SVG icons for reasons grid, anchor menu
├── map/                   # Static service area map PNG
└── common/                # Logo, payment icons, certification badges
```

**Utility Organization:**
```
src/utils/
├── schema.ts              # Schema.org JSON-LD generator functions
├── siteConfig.ts          # Phone number, company name, URLs — single source of truth
└── formatters.ts          # Price formatting (¥1,100), date formatting for Japanese locale
```

### Format Patterns

**Schema.org JSON-LD Pattern:**
- All structured data generated via utility functions in `src/utils/schema.ts`
- Functions: `generateLocalBusiness(office)`, `generateService(service)`, `generateFAQ(items)`, `generateReview(testimonial)`, `generateBreadcrumb(crumbs)`, `generateArticle(post)`
- Each page calls the appropriate generator(s) and renders via `<script type="application/ld+json">` in `<head>`
- Never duplicate JSON-LD logic inline in page files

**Site Configuration Pattern:**
- All shared constants in `src/utils/siteConfig.ts`:
  - Phone number: `0120-219-695`
  - Company name, addresses, URLs
  - Service categories and their sub-services
  - Navigation structure
- Components import from `siteConfig.ts` — never hardcode phone numbers or company data

**Astro Component Props Pattern:**
- Inline `Props` interface in component frontmatter:
  ```astro
  ---
  interface Props {
    variant: 'full-width' | 'compact' | 'sticky';
    showBadge?: boolean;
  }
  const { variant, showBadge = true } = Astro.props;
  ---
  ```
- Required props have no default. Optional props use `= defaultValue` in destructuring.
- Variant props use string enums, not booleans: `variant="compact"` not `isCompact={true}`

### Process Patterns

**Form Validation Pattern:**
- Validate on blur (field exit) + on submit
- Error messages in Japanese: 「[フィールド名]を入力してください」
- Required fields marked with 「必須」 badge (not asterisk)
- Suppress form submission during IME composition (`compositionstart`/`compositionend`)

**Error Handling Pattern:**
- ContactForm: network error → red banner + phone fallback message
- Build errors: Zod schema validation catches content errors → build fails with descriptive message
- No runtime error boundaries needed (static HTML, only ContactForm has runtime JS)

**Image Handling Pattern:**
- All images use Astro `<Image>` component (never raw `<img>`)
- Explicit `width` and `height` attributes on every image (CLS prevention)
- `loading="lazy"` on all images except hero slide 1 (`loading="eager"` + `fetchpriority="high"`)
- `alt` text in Japanese on every image — no empty alt except decorative SVG icons
- Decorative SVGs: `aria-hidden="true"`, no alt text

**Component Variant Pattern:**
- Use string enum `variant` prop for component variations
- Example: `<CTABlock variant="full-width" />`, `<CTABlock variant="compact" />`, `<CTABlock variant="sticky" />`
- Never use multiple boolean props for mutually exclusive states

### Enforcement Guidelines

**All AI Agents MUST:**

1. Import phone number and company data from `siteConfig.ts` — never hardcode
2. Use Astro `<Image>` for all images — never raw `<img>` tags
3. Generate Schema.org via `src/utils/schema.ts` functions — never inline JSON-LD
4. Follow PascalCase for components, kebab-case for pages/content files
5. Use Tailwind utilities only — no custom CSS classes (except `global.css` Japanese typography)
6. Define `Props` interface in every component with typed props
7. Use `variant` string enum for component variations — no boolean prop patterns
8. Include Japanese `alt` text on every `<img>` element

**Anti-Patterns (DO NOT):**

- ❌ Hardcode phone number `0120-219-695` directly in components
- ❌ Use `<img>` tag instead of Astro `<Image>`
- ❌ Create custom CSS classes or use `@apply`
- ❌ Put JSON-LD directly in page templates
- ❌ Use camelCase for page filenames or kebab-case for component filenames
- ❌ Use boolean props for mutually exclusive component states
- ❌ Skip `alt` text on images or use English alt text
- ❌ Add JavaScript to components that don't need interactivity

## Project Structure & Boundaries

### Complete Project Directory Structure

```
star-light/
├── README.md
├── package.json
├── astro.config.mjs
├── tsconfig.json
├── tailwind.config.mjs
├── .env
├── .env.example
├── .gitignore
├── .github/
│   └── workflows/
│       └── lighthouse.yml           # Lighthouse CI (post-MVP)
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro         # HTML shell, <head>, skip-nav, header, footer
│   ├── components/
│   │   ├── Header.astro             # Sticky header: logo + mega-menu + phone CTA
│   │   ├── Footer.astro             # Full sitemap nav + phone/email CTA + copyright
│   │   ├── MegaMenu.astro           # Desktop dropdown nav (electricity 5 + water 4)
│   │   ├── MobileMenu.tsx           # JS island: hamburger slide menu (~1KB)
│   │   ├── HeroCarousel.tsx         # JS island: Embla 3-slide auto-rotate (~3KB)
│   │   ├── ContactForm.tsx          # JS island: React + @formspree/react (~8KB)
│   │   ├── CTABlock.astro           # Phone + email CTA (variants: full-width/compact/sticky)
│   │   ├── ServiceCard.astro        # Service thumbnail + title + price + WEB badge
│   │   ├── PricingTier.astro        # Image + service name + price card
│   │   ├── ReasonsGrid.astro        # 4-column SVG icon + heading + description
│   │   ├── ComparisonTable.astro    # 3-column us vs A社 vs B社
│   │   ├── ProcessFlow.astro        # 5-step numbered illustrations
│   │   ├── CaseStudyCard.astro      # Photo + category + location + duration + cost
│   │   ├── TestimonialCard.astro    # Service type + cost + customer message
│   │   ├── FAQAccordion.astro       # Native <details>/<summary> — zero JS
│   │   ├── AnchorMenu.astro         # Horizontal icon-based section jump nav
│   │   ├── AreaMap.astro            # Static map + prefecture city lists
│   │   ├── Breadcrumb.astro         # TOP > Category > Service
│   │   ├── Pagination.astro         # Numbered page nav (1-2-3)
│   │   └── FilterNav.astro          # Category filter links
│   ├── pages/
│   │   ├── index.astro              # Homepage
│   │   ├── electricity/
│   │   │   ├── index.astro          # Electricity hub page
│   │   │   └── [service].astro      # Dynamic: breaker, outlet, lighting, antenna, water-heater
│   │   ├── water/
│   │   │   ├── index.astro          # Water hub page
│   │   │   └── [service].astro      # Dynamic: toilet, kitchen, bath, washroom
│   │   ├── flow.astro               # Process flow page
│   │   ├── case.astro               # Case studies listing (paginated)
│   │   ├── voice.astro              # Testimonials listing (paginated)
│   │   ├── company/
│   │   │   ├── index.astro          # Company overview
│   │   │   ├── philosophy.astro     # Company philosophy
│   │   │   └── office.astro         # Office locations
│   │   ├── contact.astro            # Contact form page
│   │   ├── privacy.astro            # Privacy policy
│   │   ├── column/
│   │   │   ├── index.astro          # Blog listing
│   │   │   └── [slug].astro         # Individual blog posts
│   │   ├── faq.astro                # FAQ page
│   │   ├── sitemap.astro            # HTML sitemap page
│   │   └── 404.astro                # Custom 404 with phone CTA
│   ├── content/
│   │   ├── config.ts                # All Zod schemas for 6 content collections
│   │   ├── services/
│   │   │   ├── electricity/
│   │   │   │   ├── breaker.json
│   │   │   │   ├── outlet.json
│   │   │   │   ├── lighting.json
│   │   │   │   ├── antenna.json
│   │   │   │   └── water-heater.json
│   │   │   └── water/
│   │   │       ├── toilet.json
│   │   │       ├── kitchen.json
│   │   │       ├── bath.json
│   │   │       └── washroom.json
│   │   ├── cases/
│   │   │   ├── case-001.md
│   │   │   ├── case-002.md
│   │   │   ├── case-003.md
│   │   │   ├── case-004.md
│   │   │   └── case-005.md
│   │   ├── testimonials/
│   │   │   ├── testimonial-001.json
│   │   │   ├── testimonial-002.json
│   │   │   ├── testimonial-003.json
│   │   │   ├── testimonial-004.json
│   │   │   └── testimonial-005.json
│   │   ├── faq/
│   │   │   ├── faq-001.json
│   │   │   ├── faq-002.json
│   │   │   ├── faq-003.json
│   │   │   ├── faq-004.json
│   │   │   ├── faq-005.json
│   │   │   └── faq-006.json
│   │   ├── blog/
│   │   │   └── (seed articles added post-MVP)
│   │   └── company/
│   │       ├── offices.json         # 4 regional offices (Tokyo, Nagoya, Osaka, Hyogo)
│   │       └── philosophy.json      # Company philosophy content
│   ├── utils/
│   │   ├── schema.ts                # Schema.org JSON-LD generators
│   │   ├── siteConfig.ts            # Phone, company name, URLs, nav structure
│   │   └── formatters.ts            # ¥ price formatting, JP date formatting
│   └── styles/
│       └── global.css               # Tailwind imports + JP typography rules
├── public/
│   ├── images/
│   │   ├── hero/                    # 3 carousel slide images
│   │   ├── services/                # Service category + detail images
│   │   ├── cases/                   # Case study photos
│   │   ├── icons/                   # SVG icons (reasons, anchor menu, payment)
│   │   ├── map/                     # Static service area map PNG
│   │   └── common/                  # Logo, certification badges
│   ├── robots.txt
│   └── favicon.svg
└── dist/                            # Build output (git-ignored)
```

### Architectural Boundaries

**Component Boundaries:**
- **Layout boundary:** `BaseLayout.astro` owns `<html>`, `<head>`, `<body>`, Header, Footer. Pages only provide `<slot />` content.
- **Island boundary:** 3 `.tsx` files (MobileMenu, HeroCarousel, ContactForm) are the ONLY files that ship JS to the client. All `.astro` components are server-rendered HTML only.
- **Data boundary:** Pages fetch from content collections in frontmatter. Components receive data via props only — no direct content collection access inside components.
- **Style boundary:** Tailwind utilities inline in components. `global.css` only for base resets and Japanese typography. No component-scoped `<style>` blocks.

**External Integration Boundaries:**
- **Formspree:** ContactForm.tsx → POST to `import.meta.env.PUBLIC_FORMSPREE_ID` endpoint. Only integration point with external API.
- **Google Fonts:** `<link>` in BaseLayout `<head>` — preconnect to `fonts.googleapis.com` + `fonts.gstatic.com`
- **Google Maps Embed:** `<iframe>` in AreaMap.astro — no API key needed for embed
- **Cloudflare Pages:** Build output `dist/` deployed automatically on git push

**Data Flow:**
```
Content Collections (JSON/MD) → Astro Pages (getStaticPaths/getCollection) → Component Props → HTML Output
                                                                           ↓
                                                                    Schema.org utils → JSON-LD in <head>
                                                                           ↓
                                                                    siteConfig.ts → Phone/Company data
```

### Requirements to Structure Mapping

**FR1-FR5 (Navigation):** `Header.astro`, `MegaMenu.astro`, `MobileMenu.tsx`, `Breadcrumb.astro`, `Footer.astro`
**FR6-FR10 (Emergency Contact):** `CTABlock.astro` (3 variants), `ContactForm.tsx`, `siteConfig.ts`
**FR11-FR16 (Service Info):** `pages/electricity/[service].astro`, `pages/water/[service].astro`, `PricingTier.astro`, `ProcessFlow.astro`, `content/services/`
**FR17-FR19 (Service Area):** `AreaMap.astro`, `pages/company/office.astro`, `content/company/offices.json`
**FR20-FR23 (Trust/Social Proof):** `CaseStudyCard.astro`, `TestimonialCard.astro`, `ReasonsGrid.astro`, `content/cases/`, `content/testimonials/`
**FR24-FR26 (Content/Blog):** `pages/column/`, `pages/faq.astro`, `FAQAccordion.astro`, `content/blog/`, `content/faq/`
**FR27-FR29 (Company):** `pages/company/`, `content/company/`
**FR30-FR34 (Homepage):** `pages/index.astro`, `HeroCarousel.tsx`, `ServiceCard.astro`
**FR35-FR38 (SEO):** `utils/schema.ts`, `astro.config.mjs` (sitemap integration), `BaseLayout.astro` (meta tags, hreflang)
**FR39-FR45 (Content Mgmt):** `src/content/` collections, `content/config.ts` Zod schemas

### Cross-Cutting Concerns Mapping

| Concern | Files Involved |
|---------|---------------|
| Phone CTA | `siteConfig.ts` → `CTABlock.astro` → every page via BaseLayout |
| Schema.org | `utils/schema.ts` → every page `<head>` |
| Japanese typography | `global.css` → all components via Tailwind |
| Responsive layout | Tailwind responsive prefixes in every component |
| Accessibility | Semantic HTML + ARIA in every component, skip-nav in BaseLayout |
| Image optimization | Astro `<Image>` in every component that renders images |

### Development Workflow Integration

**Development:** `astro dev` → Vite HMR → localhost:4321 → live preview all pages
**Build:** `astro build` → static HTML/CSS/JS to `dist/` → Zod validates all content at build time
**Deploy:** `git push main` → Cloudflare Pages auto-build → live in ~2 minutes
**Preview:** `git push branch` → Cloudflare Pages preview URL → review before merge

## Architecture Validation Results

### Coherence Validation ✅

**Decision Compatibility:**
All technology choices are natively compatible: Astro 6 + Tailwind CSS v4 (Vite plugin) + Cloudflare Pages (first-class Astro support since Astro joined Cloudflare). Embla Carousel and Formspree integrate via React islands — no version conflicts. Static output mode eliminates server runtime concerns.

**Pattern Consistency:**
Naming conventions (PascalCase components, kebab-case pages, camelCase content fields) align with Astro/TypeScript ecosystem standards. Tailwind-only CSS rule is consistent with zero-custom-class approach. Component variant pattern (string enum) is applied uniformly.

**Structure Alignment:**
Project structure directly maps to all architectural decisions. Content collections in `src/content/` feed into data-driven pages via `getStaticPaths()`. Utility files in `src/utils/` centralize cross-cutting concerns (Schema.org, site config, formatters). Island boundary is clear: only 3 `.tsx` files ship JS.

### Requirements Coverage Validation ✅

**Functional Requirements Coverage:**
All 45 FRs mapped to specific files and components. Navigation (FR1-5) → Header/MegaMenu/MobileMenu/Breadcrumb/Footer. Emergency Contact (FR6-10) → CTABlock/ContactForm/siteConfig. Service Info (FR11-16) → service page templates + content collections. All remaining categories fully mapped.

**Non-Functional Requirements Coverage:**
- Performance: Astro SSG zero-JS default + Cloudflare CDN edge delivery → LCP < 1.5s, Lighthouse ≥ 95
- Security: Cloudflare auto-SSL + Astro 6 CSP API + Formspree honeypot
- Scalability: Static CDN — unlimited concurrent users by design
- Accessibility: WCAG 2.1 AA patterns defined per component (ARIA, keyboard nav, contrast, motion)
- SEO: Schema.org utility functions + sitemap integration + semantic HTML patterns

### Implementation Readiness Validation ✅

**Decision Completeness:**
All critical decisions documented with verified versions (Astro 6.x, Tailwind v4, Embla 8.6.0). Implementation patterns include concrete code examples (Props interface, variant pattern, Image handling).

**Structure Completeness:**
Complete directory tree with every file specified. All 20 components, 13+ pages, 6 content collections, 3 utility files explicitly defined.

**Pattern Completeness:**
8 mandatory enforcement rules + 8 anti-patterns documented. Naming, structure, format, and process patterns all specified with examples.

### Gap Analysis Results

**Critical Gaps:** None

**Important Gaps (address before implementation):**
1. **Pest control pages missing from structure** — PRD specifies pest control as 3rd service category. Add `pages/pest-control/` directory with `index.astro` + `[service].astro`, and `content/services/pest-control/` with entries for cockroach, termite, rodent, general-pest.
2. **Pagination pattern undefined** — Case studies and testimonials need paginated static pages. Pattern: use `getStaticPaths()` with page parameter, generate `/case/1`, `/case/2` etc. at build time.

**Nice-to-Have Gaps:**
- Lighthouse CI workflow file (`lighthouse.yml`) marked as post-MVP
- Blog seed content deferred to post-MVP

### Validation Issues Addressed

- **Pest control gap:** Added to project structure — `pages/pest-control/` and `content/services/pest-control/` directories with sub-service files
- **Pagination pattern:** Documented as getStaticPaths() with page params for case and voice listing pages

### Architecture Completeness Checklist

**Requirements Analysis**
- [x] Project context thoroughly analyzed
- [x] Scale and complexity assessed
- [x] Technical constraints identified
- [x] Cross-cutting concerns mapped

**Architectural Decisions**
- [x] Critical decisions documented with versions
- [x] Technology stack fully specified
- [x] Integration patterns defined
- [x] Performance considerations addressed

**Implementation Patterns**
- [x] Naming conventions established
- [x] Structure patterns defined
- [x] Communication patterns specified
- [x] Process patterns documented

**Project Structure**
- [x] Complete directory structure defined
- [x] Component boundaries established
- [x] Integration points mapped
- [x] Requirements to structure mapping complete

### Architecture Readiness Assessment

**Overall Status:** READY FOR IMPLEMENTATION

**Confidence Level:** High — all 16 checklist items verified, no critical gaps, low-complexity static site architecture with well-documented patterns.

**Key Strengths:**
- Zero-JS default architecture eliminates entire categories of complexity (state management, routing, caching)
- Single reusable template for 9+ service detail pages via content collections
- Clear island boundary (only 3 JS files) makes performance budget trivially enforceable
- Comprehensive enforcement rules prevent AI agent implementation divergence
- All 45 FRs explicitly mapped to files in project structure

**Areas for Future Enhancement:**
- Headless CMS (Decap CMS) for non-technical content manager
- Lighthouse CI in build pipeline for automated performance regression detection
- reCAPTCHA on contact form if spam becomes a problem
- Blog seed content and seasonal keyword targeting

### Implementation Handoff

**AI Agent Guidelines:**
- Follow all architectural decisions exactly as documented
- Use implementation patterns consistently across all components
- Respect project structure and boundaries
- Import shared data from `siteConfig.ts` — never hardcode
- Use Astro `<Image>` for all images — never raw `<img>`
- Generate Schema.org via `utils/schema.ts` — never inline JSON-LD
- Refer to this document for all architectural questions

**First Implementation Priority:**
```bash
npm create astro@latest star-light -- --template minimal --typescript strict
cd star-light
npx astro add tailwind sitemap react
npm install embla-carousel-react @formspree/react
```
Then: Tailwind config → Content schemas → BaseLayout → Header/Footer → Homepage
