# Story 1.1: Initialize Astro Project with Design Tokens

Status: review

## Story

As a developer,
I want a fully configured Astro project with Tailwind CSS v4, TypeScript strict mode, and design tokens matching the original site,
So that all subsequent development has a consistent foundation.

## Acceptance Criteria

1. **Given** a fresh project directory **When** initialization commands are run **Then** Astro project is created with minimal template, TypeScript strict, and integrations (tailwind, sitemap, react) installed
2. **And** Embla Carousel and @formspree/react dependencies are installed
3. **And** `tailwind.config.mjs` contains design tokens (colors: navy #1B2A4A, orange #FF6B00, red #E53935, section gray #F5F5F5, text #333333/#666666)
4. **And** `src/styles/global.css` contains Tailwind imports + Japanese typography baseline (word-break: keep-all, line-break: strict, Noto Sans JP font stack)
5. **And** `astro.config.mjs` is set to `output: 'static'`
6. **And** `.env.example` contains PUBLIC_FORMSPREE_ID placeholder
7. **And** `astro dev` starts successfully with no errors

## Tasks / Subtasks

- [x] Task 1: Initialize Astro project (AC: #1)
  - [x] Run `npm create astro@latest star-light -- --template minimal --typescript strict`
  - [x] Run `npx astro add tailwind sitemap react`
- [x] Task 2: Install additional dependencies (AC: #2)
  - [x] Run `npm install embla-carousel-react @formspree/react`
- [x] Task 3: Configure Tailwind design tokens (AC: #3)
  - [x] Create/update `tailwind.config.mjs` with color tokens
- [x] Task 4: Create global CSS with Japanese typography (AC: #4)
  - [x] Create `src/styles/global.css` with Tailwind imports and JP baseline
- [x] Task 5: Configure Astro for static output (AC: #5)
  - [x] Set `output: 'static'` in `astro.config.mjs`
- [x] Task 6: Create environment template (AC: #6)
  - [x] Create `.env.example` with `PUBLIC_FORMSPREE_ID=your_formspree_id_here`
- [x] Task 7: Verify dev server (AC: #7)
  - [x] Run `astro dev` and confirm no errors

## Dev Notes

### Exact Initialization Commands

```bash
npm create astro@latest star-light -- --template minimal --typescript strict
cd star-light
npx astro add tailwind sitemap react
npm install embla-carousel-react @formspree/react
```

### Tailwind CSS v4 — CRITICAL

Tailwind CSS v4 uses `@tailwindcss/vite` plugin, NOT the legacy `@astrojs/tailwind` integration. When `npx astro add tailwind` runs, verify it installs the v4-compatible approach. If it installs the legacy integration, manually configure:

```js
// astro.config.mjs
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'static',
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [sitemap(), react()]
});
```

### tailwind.config.mjs — Exact Design Tokens

```js
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        navy: '#1B2A4A',
        orange: '#FF6B00',
        red: '#E53935',
        'section-gray': '#F5F5F5',
        'text-primary': '#333333',
        'text-secondary': '#666666',
        'border-light': '#E0E0E0',
      },
      fontFamily: {
        sans: ['"Noto Sans JP"', '"Hiragino Kaku Gothic ProN"', '"Yu Gothic"', '"Meiryo"', 'sans-serif'],
      },
    },
  },
};
```

### src/styles/global.css — Exact Content

```css
@import "tailwindcss";

html {
  font-family: "Noto Sans JP", "Hiragino Kaku Gothic ProN", "Yu Gothic", "Meiryo", sans-serif;
  word-break: keep-all;
  line-break: strict;
  -webkit-text-size-adjust: 100%;
}

input, select, textarea {
  font-size: 16px;
}
```

Note: The `@import "tailwindcss"` syntax is the Tailwind v4 way. Do NOT use the legacy `@tailwind base/components/utilities` directives.

### .env.example — Exact Content

```
PUBLIC_FORMSPREE_ID=your_formspree_id_here
```

### Architecture Compliance

- **Output mode:** Must be `output: 'static'` — Cloudflare Pages static deployment
- **No custom CSS classes** — Tailwind utilities only (exception: global.css JP typography)
- **No `@apply`** — inline Tailwind classes in templates
- **Naming:** PascalCase for components, kebab-case for pages/content, camelCase for utilities
- **Directory structure:** Follow the architecture spec exactly (src/layouts/, src/components/, src/pages/, src/content/, src/utils/, src/styles/, public/)

### Anti-Patterns — DO NOT

- Do NOT use `@astrojs/tailwind` legacy integration — use `@tailwindcss/vite` for v4
- Do NOT use `@tailwind base; @tailwind components; @tailwind utilities;` — use `@import "tailwindcss"` (v4 syntax)
- Do NOT add any components or pages beyond what AC requires — this is foundation only
- Do NOT hardcode phone numbers or company data anywhere
- Do NOT add testing frameworks yet — post-MVP per architecture spec

### Performance Foundation

These targets inform configuration choices:
- Lighthouse Performance >= 95
- Total JS budget: ~12KB gzip (3 islands only: MobileMenu, HeroCarousel, ContactForm)
- Font loading: `display=swap` + `preconnect` to Google Fonts (implement in BaseLayout later, not this story)

### Project Structure Notes

This story creates only the project skeleton. The full directory structure (layouts/, components/, pages/, content/, utils/) will be built in subsequent stories. Only create files required by the acceptance criteria:
- `astro.config.mjs`
- `tailwind.config.mjs`
- `tsconfig.json` (auto-generated)
- `src/styles/global.css`
- `.env.example`
- `package.json` (auto-generated)

### References

- [Source: _bmad-output/planning-artifacts/architecture.md — Tech Stack, Directory Structure, Naming Conventions, CSS Conventions]
- [Source: _bmad-output/planning-artifacts/epics.md — Epic 1, Story 1.1]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md — Design Tokens, Typography System, Japanese CSS Baseline]
- [Source: _bmad-output/planning-artifacts/prd.md — NFR6, NFR8, Performance Targets]

## Dev Agent Record

### Agent Model Used

OpenAI `gpt-5.4`

### Debug Log References

- Node.js v20.20.2 is out-of-date for Astro v6+, downgraded to Astro v5.18.1
- Tailwind v4 correctly installed via `@tailwindcss/vite` plugin (not legacy `@astrojs/tailwind`)
- Root `vite` was pinned to v6.4.2 so Astro 5, React integration, and Tailwind Vite plugin use the same major version
- `npm run build` succeeds, but `@astrojs/sitemap` skips sitemap generation until a real `site` URL is added to `astro.config.mjs`

### Completion Notes List

1. Astro project initialized with minimal template and TypeScript strict mode
2. All dependencies installed: @astrojs/react, @astrojs/sitemap, @tailwindcss/vite, tailwindcss, react, react-dom, @types/react, @types/react-dom, embla-carousel-react, @formspree/react
3. tailwind.config.mjs created with exact design tokens (navy, orange, red, section-gray, text-primary, text-secondary, border-light) and Noto Sans JP font stack
4. src/styles/global.css created with Tailwind v4 import and Japanese typography baseline
5. astro.config.mjs configured with `output: 'static'` and `@tailwindcss/vite` plugin
6. .env.example created with `PUBLIC_FORMSPREE_ID=your_formspree_id_here`
7. Root `vite` was pinned to `^6.4.2` and `@astrojs/react` was aligned to `^4.4.2` to avoid Astro 5 / Vite 7 type mismatches
8. `src/pages/index.astro` now imports `src/styles/global.css` so the Tailwind v4 baseline and Japanese typography rules are active immediately
9. Dev server starts successfully with no errors (verified via `timeout 15s npm run dev`)
10. Production build succeeds (verified via `npm run build`); sitemap generation remains pending until a real site URL is defined
11. package.json name fixed from `star-light-temp` to `star-light`, removed unsupported engines constraint

### File List

- `.gitignore` - Template ignore rules for Astro output, dependencies, and env files
- `.env.example` - Formspree placeholder
- `README.md` - Minimal Astro starter documentation generated by project init
- `astro.config.mjs` - Astro configuration with static output, Tailwind v4, sitemap, react
- `package.json` - Project dependencies and scripts
- `package-lock.json` - Locked dependency tree after installation and version alignment
- `public/favicon.ico` - Starter favicon asset from Astro minimal template
- `public/favicon.svg` - Starter favicon asset from Astro minimal template
- `src/pages/index.astro` - Starter page updated to import the global stylesheet
- `src/styles/global.css` - Tailwind v4 import + Japanese typography baseline
- `tailwind.config.mjs` - Design tokens (colors, font family)
- `tsconfig.json` - TypeScript strict config with JSX support

## Change Log

- 2026-05-08: Initialized the Astro foundation, installed required integrations and dependencies, added Tailwind v4 design tokens, configured static output, and verified dev/build startup.
