# Story 7.4: Admin Deployment and Documentation

Status: review

## Story

As a content manager,
I want clear documentation on using the admin dashboard,
so that I can onboard quickly and manage content independently.

## Acceptance Criteria

1. **Given** a new content manager needs to start using the admin, **When** they read the admin guide, **Then** it covers: admin URL, GitHub OAuth login steps, content editing walkthrough per type, image upload guidelines, publishing workflow, and analytics access.
2. **And** a troubleshooting section addresses: login failures, build errors after publish, image size limits.
3. **And** Cloudflare Pages environment variables for CMS backend are documented.
4. **And** a content workflow diagram is included: Edit in CMS → Auto-commit → Auto-deploy (~2 min).

## Tasks / Subtasks

- [x] Task 1: Create admin guide documentation page (AC: #1)
  - [x] 1.1: Create `docs/admin-guide.md` at project root — a Markdown document, NOT an Astro page
  - [x] 1.2: Write section: Admin URL and access (`https://star-light15.net/admin/`)
  - [x] 1.3: Write section: GitHub OAuth login steps (click sign-in → authorize GitHub App → redirected to CMS dashboard)
  - [x] 1.4: Write section: Content editing walkthrough for each of the 6 types (services, cases, testimonials, FAQ, blog, company)
  - [x] 1.5: Write section: Image upload guidelines (supported formats, recommended sizes, folder structure `public/images/`)
  - [x] 1.6: Write section: Publishing workflow (editorial workflow: draft → review → ready → publish)
  - [x] 1.7: Write section: Analytics access (link to `/admin/analytics`, GA4 setup, GSC link)

- [x] Task 2: Write troubleshooting section (AC: #2)
  - [x] 2.1: Login failures — GitHub OAuth errors, permission issues, clearing browser cache
  - [x] 2.2: Build errors after publish — Zod schema validation failures, how to check Cloudflare Pages build logs
  - [x] 2.3: Image size limits — recommended max file size, WebP/AVIF optimization tips

- [x] Task 3: Document Cloudflare Pages environment variables (AC: #3)
  - [x] 3.1: Document current CMS backend config: `base_url` in `public/admin/config.yml` pointing to `https://cms-auth.luonghaimal.workers.dev`
  - [x] 3.2: Document GitHub App setup for PKCE auth flow (current approach per commit `9f4b213`)
  - [x] 3.3: Document any required Cloudflare Pages env vars for build/deploy

- [x] Task 4: Create content workflow diagram (AC: #4)
  - [x] 4.1: Create ASCII diagram showing: Content Manager → Edit in Sveltia CMS → Auto-commit to GitHub → Cloudflare Pages auto-build → Live in ~2 min
  - [x] 4.2: Include in admin guide document

- [x] Task 5: Add admin guide link from CMS admin page
  - [x] 5.1: Add a help/documentation link in `public/admin/index.html` toolbar (alongside existing analytics link)

## Dev Notes

### Architecture Constraints

- **Documentation format**: Plain Markdown file at project root (`docs/admin-guide.md`). This is NOT a public-facing Astro page — it's a reference document for content managers.
- **Language**: Write in Japanese (日本語) — the target audience is Japanese content managers matching the site's language.
- **No new dependencies**: This story only creates documentation files and minor HTML modifications.
- **CMS is Sveltia CMS** (NOT Decap CMS): Per commit `9f4b213`, the project switched from Decap CMS to Sveltia CMS for native PKCE GitHub auth. The admin `index.html` loads `@sveltia/cms` from unpkg. All documentation must reference Sveltia CMS, not Decap CMS.

### Current Admin Setup (from Stories 7.1, 7.2, 7.3)

**Admin entry point**: `public/admin/index.html`
- Loads Sveltia CMS from `https://unpkg.com/@sveltia/cms/dist/sveltia-cms.js`
- Has toolbar with analytics link (`/admin/analytics`)
- `<meta name="robots" content="noindex" />`

**CMS config**: `public/admin/config.yml`
- Backend: GitHub, repo `HaiLammm/star-light-project`, branch `main`
- Auth proxy: `https://cms-auth.luonghaimal.workers.dev`
- Editorial workflow enabled
- Media folder: `public/images` → public path `/images`
- 6 collections configured: services (JSON), cases (MD), testimonials (JSON), faq (JSON), blog (MD), company (files)

**Analytics page**: `src/pages/admin/analytics.astro`
- Standalone page (no BaseLayout)
- Dual approach: GA4 Embed API or Looker Studio embed
- GSC link to `search.google.com/search-console?resource_id=sc-domain:star-light15.net`
- Config constants: `GA_CLIENT_ID`, `GA_PROPERTY_ID`, `USE_LOOKER_STUDIO`, `LOOKER_STUDIO_URL`

**robots.txt**: Already has `Disallow: /admin/`

### Content Types Quick Reference (for walkthrough section)

| Type | Format | Folder | Key Fields |
|------|--------|--------|------------|
| Services | JSON | `src/content/services/` | serviceName, category (electricity/water), startingPrice, pricingTiers, faqEntries |
| Cases | Markdown | `src/content/cases/` | photo, category, location, duration, cost, description |
| Testimonials | JSON | `src/content/testimonials/` | serviceType, cost, customerMessage |
| FAQ | JSON | `src/content/faq/` | question, answer, category, sortOrder |
| Blog | Markdown | `src/content/blog/` | title, date, excerpt, category, body, featured image |
| Company | Files | `src/content/company/` | offices.json, philosophy.json |

### Auth Flow Documentation Notes

The project went through several auth iterations (visible in git history):
1. Initial: Decap CMS with external OAuth proxy
2. Then: PKCE flow (no proxy needed) — commit `e508e9f`
3. Then: GitHub App Client ID for PKCE — commit `ddb241b`
4. Final: Sveltia CMS with native PKCE — commit `9f4b213`

Document the CURRENT state only (Sveltia CMS + PKCE). The `base_url` in config.yml (`cms-auth.luonghaimal.workers.dev`) may still be present but PKCE flow should handle auth natively.

### Project Structure Notes

New files:
```
docs/
└── admin-guide.md          # Admin documentation for content managers
```

Modified files:
```
public/admin/index.html     # Add help/docs link to toolbar
```

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 7.4]
- [Source: _bmad-output/planning-artifacts/sprint-change-proposal-2026-05-23.md#Story 7.4]
- [Source: public/admin/config.yml — current CMS collection config]
- [Source: public/admin/index.html — current admin entry point with Sveltia CMS]
- [Source: src/pages/admin/analytics.astro — analytics dashboard implementation]

### Previous Story Intelligence (7.3)

- Analytics dashboard created at `src/pages/admin/analytics.astro` — standalone page, no BaseLayout
- Dual GA4 approach (Embed API vs Looker Studio) — document both options for content managers
- Admin toolbar in `index.html` already has analytics link — add docs link in same pattern
- Build verified passing with 65 pages
- `public/admin/` (static CMS files) is separate from `src/pages/admin/` (Astro-generated pages)

### Git Intelligence

Recent commits show the CMS auth went through 3 iterations before settling on Sveltia CMS with PKCE. Key insight: do NOT document the old Decap CMS or OAuth proxy approaches — only document Sveltia CMS current state.

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Debug Log References

None

### Completion Notes List

- Created comprehensive admin guide at `docs/admin-guide.md` in Japanese (日本語)
- Guide covers all 8 sections: access, login, content editing (6 types with field tables), image guidelines, publishing workflow, analytics (GA4 + GSC), troubleshooting, and environment/deploy config
- ASCII workflow diagram included: CMS edit → GitHub auto-commit → Cloudflare Pages auto-build → live in ~2 min
- Troubleshooting covers: login failures (4 scenarios), build errors (Zod validation with specific error patterns), image issues
- Cloudflare Pages env vars and CMS backend config (`config.yml`) documented
- PKCE auth flow with Sveltia CMS documented (not legacy Decap CMS)
- Added guide link (📖 ガイド) to `public/admin/index.html` toolbar — links to GitHub repo file for easy access
- Build verified: all pages build successfully with no errors

### File List

- `docs/admin-guide.md` (NEW)
- `public/admin/index.html` (MODIFIED — added guide link to toolbar)
