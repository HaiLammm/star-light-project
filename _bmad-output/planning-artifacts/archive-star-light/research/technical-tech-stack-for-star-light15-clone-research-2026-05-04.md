---
stepsCompleted: [1, 2, 3]
inputDocuments: []
workflowType: 'research'
lastStep: 3
research_type: 'technical'
research_topic: 'Tech stack for star-light15.net clone'
research_goals: 'Determine optimal tech stack to recreate star-light15.net as a 100% clone'
user_name: 'Luonghailam'
date: '2026-05-04'
web_research_enabled: true
source_verification: true
---

# Research Report: technical

**Date:** 2026-05-04
**Author:** Luonghailam
**Research Type:** technical

---

## Research Overview

This report analyzes the optimal technology stack for creating a 100% clone of star-light15.net, a Japanese home repair service website (設備人/Setsubit). The site features ~13 pages, image carousels, contact forms, FAQ sections, blog/columns, case studies, and customer testimonials. It is primarily a content-focused, multi-page business website with minimal dynamic interactivity.

---

## Technical Research Scope Confirmation

**Research Topic:** Tech stack for star-light15.net clone
**Research Goals:** Determine optimal tech stack to recreate star-light15.net as a 100% clone

**Technical Research Scope:**

- Architecture Analysis - design patterns, frameworks, system architecture
- Implementation Approaches - development methodologies, coding patterns
- Technology Stack - languages, frameworks, tools, platforms
- Integration Patterns - APIs, protocols, interoperability
- Performance Considerations - scalability, optimization, patterns

**Research Methodology:**

- Current web data with rigorous source verification
- Multi-source validation for critical technical claims
- Confidence level framework for uncertain information
- Comprehensive technical coverage with architecture-specific insights

**Scope Confirmed:** 2026-05-04

---

## Technology Stack Analysis

### Programming Languages

**TypeScript/JavaScript** is the recommended language for this project.

- TypeScript provides type safety, better IDE support, and is the standard for modern web development in 2026
- The site is content-focused with minimal backend logic, so a full-stack JS/TS approach is optimal
- Japanese text (UTF-8) is natively supported across all modern JS frameworks

_Confidence: HIGH_

### Development Frameworks and Libraries

**Recommended: Astro** (Primary recommendation)

Astro is the optimal framework for this project because:

- **Zero JS by default**: Ships no JavaScript unless explicitly needed — ideal for a content-focused business site
- **Performance**: Static sites load in under 500ms, with LCP metrics 40-70% lower than SSG-optimized Next.js pages
- **SEO**: Core Web Vitals scores start in the 90s out of the box — critical for a Japanese business site
- **Islands Architecture**: Only hydrates interactive components (carousel, form), keeping the rest static
- **Multi-framework support**: Can use React/Vue/Svelte components where needed

_Source: [Astro vs Next.js 2026 - Pagepro](https://pagepro.co/blog/astro-nextjs/), [Framework Comparison - nunuqs](https://www.nunuqs.com/blog/nuxt-vs-next-js-vs-astro-vs-sveltekit-2026-frontend-framework-showdown)_

**Alternative: Next.js** (If dynamic features needed later)

- Better if future requirements include CMS dashboard, authentication, or real-time features
- Overkill for a static business website clone
- Higher bundle size and complexity

_Source: [Best Next.js Alternatives - Naturaily](https://naturaily.com/blog/best-nextjs-alternatives)_

**Component-level**: React or Preact for interactive islands (carousel, contact form)

### Database and Storage Technologies

**No database required** for a static clone.

- Content can be managed as Markdown/MDX files or JSON data files within the project
- Images stored as static assets, optimized at build time
- If a CMS is needed later: headless CMS (Contentful, Strapi, or Decap CMS for Git-based)
- Contact form submissions: external service (Formspree, Netlify Forms, or custom API)

_Confidence: HIGH_

### Development Tools and Platforms

- **Package Manager**: pnpm (fast, disk-efficient) or npm
- **Build Tool**: Vite (built into Astro)
- **CSS Framework**: Tailwind CSS v4
  - Industry standard in 2026 with 31.1M weekly downloads
  - Production bundles under 10KB after purging
  - Utility-first approach perfect for pixel-perfect clone work
  - Full CJK (Chinese/Japanese/Korean) text support
- **Image Optimization**: Astro's built-in `<Image>` component with Sharp
- **Linting**: ESLint + Prettier
- **Version Control**: Git

_Source: [CSS Frameworks 2026 - QuartzDevs](https://quartzdevs.com/resources/best-css-frameworks-2026-top-styling-tools-every-frontend-developer-should-know), [Tailwind CSS](https://tailwindcss.com/)_

### Cloud Infrastructure and Deployment

**Recommended: Cloudflare Pages** (Best for Japan-targeted site)

- 300+ edge locations globally with strong Asia-Pacific presence
- Unlimited bandwidth on free tier
- Automatic HTTPS, DDoS protection
- Fast builds and deployments from Git

_Alternative options:_
- **Vercel**: Excellent DX, great for Astro/Next.js, but bandwidth limited on free tier
- **Netlify**: Good Git workflow, built-in form handling (useful for contact form)

_Source: [Static Hosting Comparison 2026 - DanubeData](https://danubedata.ro/blog/cloudflare-pages-vs-netlify-vs-vercel-static-hosting-2026)_

### Technology Adoption Trends

- Astro adoption growing rapidly for content-focused sites, now a top-5 SSG in 2026
- Tailwind CSS dominates CSS framework space at 37% developer adoption
- Static-first architecture trending over SPA for business/marketing sites
- Edge deployment becoming standard for global performance

_Source: [Best Static Site Generators 2026 - TheSoftwareScout](https://thesoftwarescout.com/best-static-site-generators-2026-astro-next-js-hugo-more/), [Hygraph SSG Report](https://hygraph.com/blog/top-12-ssgs)_

---

## Integration Patterns Analysis

### Contact Form Integration

For the star-light15.net clone, the contact form (name, address, phone, email, service category) needs a backend-less solution since the site is static.

**Recommended: Formspree**
- Drop-in `<form>` tag integration — works with plain HTML in Astro out of the box
- Can use `@formspree/react` for enhanced UX in a React island (validation, loading states)
- Works on any hosting platform (Cloudflare Pages, Vercel, Netlify)
- Free tier: 50 submissions/month

**Alternative: Astro Server Actions**
- Built-in Astro feature for lightweight server-side form handling
- Requires SSR mode for the form page (hybrid rendering)
- Can send emails via Resend or similar service

**Not recommended: Netlify Forms**
- Only works on Netlify — locks you to one hosting provider

_Confidence: HIGH_
_Source: [Formspree Astro Guide](https://formspree.io/guides/astro/), [Astro Contact Form Guide](https://formgrid.dev/blog/how-to-add-a-contact-form-to-your-astro-site-without-a-backend), [Astro Server Actions + Resend](https://contentisland.net/en/blog/astro-contact-form-server-actions-resend/)_

### Image Carousel / Slider

The hero section uses a rotating banner carousel with 3+ images.

**Recommended: Embla Carousel**
- Lightweight, minimal bundle (~800K weekly downloads)
- No imposed styling — full control for pixel-perfect clone
- Supports autoplay, loop, touch/swipe
- Works as React island in Astro

**Alternative: Swiper.js**
- More feature-rich, heavier bundle
- Has a dedicated [astro-swiper](https://github.com/pascal-brand38/astro-swiper) component
- Better for complex slider needs (parallax, 3D effects)

_Confidence: HIGH_
_Source: [Embla Carousel](https://www.embla-carousel.com/), [Astro Swiper](https://github.com/pascal-brand38/astro-swiper), [React Carousel Comparison 2026](https://enstacked.com/react-carousel-component-libraries/)_

### SEO and Internationalization (i18n)

The site is Japanese-only, but proper SEO structure is critical for a business site.

**SEO Strategy:**
- Astro built-in `<head>` management for meta tags, Open Graph, structured data
- `@astrojs/sitemap` for automatic sitemap.xml generation
- Proper `<html lang="ja">` and charset UTF-8
- Schema.org LocalBusiness structured data for the 3 office locations
- hreflang tags if future multilingual support needed

**i18n (if needed later):**
- Astro 4.0+ has built-in i18n routing — configure locales in `astro.config.mjs`
- Organize content in `/[locale]/` folders
- Automatic language-specific sitemap generation

_Confidence: HIGH_
_Source: [Astro i18n 2026 Guide](https://www.maviklabs.com/blog/internationalization-astro-2026/), [Astro i18n Docs](https://docs.astro.build/en/guides/internationalization/)_

### Image Optimization

The site is image-heavy (case study photos, service thumbnails, hero banners).

**Astro Built-in `<Image />` Component:**
- Automatic compression, WebP/AVIF format conversion
- Responsive image generation (multiple sizes at build time)
- Automatic width/height to prevent layout shift (CLS = 0)
- Lazy loading for below-fold images
- Sharp library for processing (built-in)
- Real-world results: 50%+ load time reduction, Lighthouse 95+

_Confidence: HIGH_
_Source: [Astro Image Optimization Guide](https://eastondev.com/blog/en/posts/dev/20251203-astro-image-optimization-guide/), [Astro Images Docs](https://docs.astro.build/en/guides/images/)_

### Phone Call Integration (Click-to-Call)

The site prominently features phone number 0120-219-695 as a CTA.

- Simple `<a href="tel:0120219695">` link
- Mobile-responsive: opens dialer on mobile, shows number on desktop
- No external service needed

_Confidence: HIGH_

### Google Maps Integration

Service area map showing Kansai region coverage.

**Options:**
- Static map image (simplest, no JS, no API key needed)
- Google Maps Embed API (free, iframe-based)
- Interactive map via Google Maps JavaScript API (requires API key, adds JS)

**Recommended:** Google Maps Embed for the service area display — free, no API key billing, minimal JS.

_Confidence: HIGH_

---

<!-- Content will be appended sequentially through research workflow steps -->
