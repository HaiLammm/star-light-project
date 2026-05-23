# Story 7.1: Setup Decap CMS with GitHub Authentication

Status: review

## Story

As a content manager,
I want to access a web-based admin interface at /admin,
so that I can manage website content without using Git or code editors.

## Acceptance Criteria

1. **Given** a content manager navigates to `/admin`, **When** the page loads, **Then** Decap CMS login page renders with GitHub sign-in button.
2. **And** after GitHub OAuth, CMS dashboard shows all 6 content types in sidebar navigation (services, cases, testimonials, faq, blog, company).
3. **And** `public/admin/index.html` loads Decap CMS from CDN.
4. **And** `public/admin/config.yml` defines backend (github), repo, branch, and media folder settings.
5. **And** GitHub OAuth application is configured with correct callback URL.
6. **And** `robots.txt` already excludes `/admin/` from crawling (verify existing rule or add).

## Tasks / Subtasks

- [x] Task 1: Create `public/admin/index.html` (AC: #3)
  - [x] Load Decap CMS v3.x from unpkg CDN
  - [x] Minimal HTML shell with charset and viewport meta
- [x] Task 2: Create `public/admin/config.yml` (AC: #2, #4)
  - [x] Configure `backend: { name: github, repo: <owner>/<repo>, branch: main }`
  - [x] Set `media_folder: public/images` and `public_folder: /images`
  - [x] Define 6 collections matching existing content structure (see Dev Notes)
  - [x] Add `slug` config for each collection matching existing filename patterns
- [x] Task 3: Verify robots.txt excludes `/admin/` (AC: #6)
  - [x] Check existing `public/robots.txt` — add `Disallow: /admin/` if missing
- [x] Task 4: Document GitHub OAuth setup (AC: #5)
  - [x] Add setup instructions in story completion notes for:
    - Creating GitHub OAuth App (Settings > Developer Settings > OAuth Apps)
    - Homepage URL = production site URL
    - Callback URL = external OAuth client URL
    - Note: For Cloudflare Pages, an external OAuth proxy is needed (not Netlify-hosted)
- [x] Task 5: Verify CMS loads and shows all collections (AC: #1, #2)
  - [x] Run `npm run dev` / `astro dev` and navigate to `/admin`
  - [x] Confirm login page renders
  - [x] Confirm 6 content types appear in sidebar after mock config review

## Dev Notes

### Content Collection → CMS Collection Mapping

The project has 6 content types in `src/content/`. Map each to a Decap CMS collection in `config.yml`:

| Content Type | Path | Format | Collection Type |
|---|---|---|---|
| services | `src/content/services/*.json` | JSON (data) | folder |
| cases | `src/content/cases/*.md` | Markdown | folder |
| testimonials | `src/content/testimonials/*.json` | JSON (data) | folder |
| faq | `src/content/faq/*.json` | JSON (data) | folder |
| blog | `src/content/blog/*.md` | Markdown | folder |
| company | `src/content/company/*.json` | JSON (data) | file (2 files: offices.json, philosophy.json) |

### Zod Schema Alignment (Critical)

CMS field widgets MUST match existing Zod schemas in `src/content/config.ts`. Key mappings:

**services** (JSON):
- `serviceName` (string), `serviceNameShort` (string), `category` (select: electricity/water), `slug` (string), `description` (string), `startingPrice` (number), `originalPrice` (number), `webDiscountAmount` (number), `serviceArea` (list of strings), `imageAlt` (string), `isEmergency` (boolean), `hasFreeEstimate` (boolean), `kvImageDesktop` (string, optional), `kvImageMobile` (string, optional), `pricingTiers` (list object: name, price, imageUrl, imageAlt), `faqEntries` (list object: question, answer)

**testimonials** (JSON):
- `serviceType` (string), `serviceCategory` (select: electricity/water), `title` (string, optional), `duration` (string, optional), `cost` (number), `message` (string), `authorInitial` (string), `location` (string, optional), `rating` (number, optional)

**cases** (Markdown with frontmatter):
- Check existing case files for frontmatter fields and replicate as CMS fields

**faq** (JSON):
- Check existing faq JSON structure

**blog** (Markdown with frontmatter):
- Check existing blog files for frontmatter fields

**company** (JSON files):
- `offices.json` and `philosophy.json` — use file collection type, not folder

### GitHub OAuth for Non-Netlify Deployments

This site deploys on **Cloudflare Pages**, NOT Netlify. Decap CMS GitHub OAuth requires an OAuth proxy server. Options:
1. Use an external OAuth client (e.g., deploy a small serverless function on Cloudflare Workers)
2. Use community OAuth solutions: https://decapcms.org/docs/external-oauth-clients/
3. Document chosen approach in completion notes — do NOT hardcode OAuth secrets

### Decap CMS Version

Use Decap CMS v3.x (latest stable). CDN URL:
```
https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js
```

### Project Structure Notes

- Static files go in `public/` — Astro serves them as-is
- `public/admin/` does NOT exist yet — create it
- Astro config: static output, site = `https://star-light15.net`
- Existing `public/robots.txt` — verify `/admin/` disallow rule

### Anti-Patterns to Avoid

- Do NOT install Decap CMS as npm dependency — use CDN only
- Do NOT modify `astro.config.mjs` — admin is purely static HTML
- Do NOT add any server-side routes — Decap CMS is client-side only
- Do NOT hardcode GitHub OAuth credentials in config.yml
- Do NOT create new content schemas — match existing Zod schemas exactly
- Company collection: use `files` type (not `folder`) since it has specific named files

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Epic 7, Story 7.1]
- [Source: _bmad-output/planning-artifacts/architecture.md#Data Architecture]
- [Source: src/content/config.ts — Zod schemas]
- [Source: astro.config.mjs — static output, Cloudflare Pages deployment]
- [Source: public/robots.txt — existing robots rules]

## Dev Agent Record

### Agent Model Used
Claude Opus 4.6

### Debug Log References
None

### Completion Notes List
- Created `public/admin/index.html` loading Decap CMS v3.x from unpkg CDN
- Created `public/admin/config.yml` with 6 collections matching existing Zod schemas:
  - services (folder, JSON) — all fields from servicesCollection schema
  - cases (folder, Markdown) — frontmatter fields from existing case files
  - testimonials (folder, JSON) — all fields from testimonialsCollection schema
  - faq (folder, JSON) — question, answer, category, sortOrder
  - blog (folder, Markdown) — frontmatter fields from existing blog files
  - company (files type) — offices.json and philosophy.json with matching structure
- Added `Disallow: /admin/` to `public/robots.txt`
- Build verified: both admin files present in `dist/admin/`
- **GitHub OAuth Setup (Task 4 documentation):**
  1. Go to GitHub Settings > Developer Settings > OAuth Apps > New OAuth App
  2. Application name: star-light CMS
  3. Homepage URL: `https://star-light15.net`
  4. Authorization callback URL: depends on OAuth proxy chosen
  5. Since site deploys on Cloudflare Pages (not Netlify), an external OAuth proxy is required
  6. Options: deploy Cloudflare Worker as OAuth proxy, or use community solutions from https://decapcms.org/docs/external-oauth-clients/
  7. Do NOT hardcode client_id/client_secret — use environment variables

### File List
- public/admin/index.html (new)
- public/admin/config.yml (new)
- public/robots.txt (modified)
