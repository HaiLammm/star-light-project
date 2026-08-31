# Sprint Change Proposal — Admin Dashboard & CMS Integration

**Date:** 2026-05-23
**Author:** Luonghailam (via Correct Course workflow)
**Status:** Approved

---

## Section 1: Issue Summary

**Problem Statement:**
The current project architecture designs content management as a file-based workflow (edit JSON/Markdown files → git push → auto-deploy). The stakeholder requests a web-based admin dashboard that enables non-technical content managers to:
1. Manage all website content (blog, cases, services, testimonials, FAQ) via a graphical UI
2. View website traffic statistics and search performance

**Discovery Context:**
This is a new requirement from the project owner, not a bug or implementation issue. The PRD's "Growth Features" section already anticipated "Blog CMS integration (headless CMS for content updates)" as a post-MVP feature. This request expands that scope to cover all content types and adds analytics visibility.

**Selected Approach:** Hybrid — Headless CMS (Decap CMS, Git-based) for content management + embedded Google Analytics/Search Console for statistics. This preserves the static site architecture entirely.

---

## Section 2: Impact Analysis

### Epic Impact

| Epic | Impact Level | Description |
|------|-------------|-------------|
| Epic 1 (Foundation) | Low | May need admin route awareness in BaseLayout |
| Epic 2 (Homepage) | None | No changes |
| Epic 3 (Service Pages) | None | No changes |
| Epic 4 (Contact/Company) | None | No changes |
| Epic 5 (Blog/Content Mgmt) | Medium | CMS replaces manual file editing for Dan's workflow |
| Epic 6 (SEO/Performance) | Low | Admin pages need noindex meta tags |
| **Epic 7 (NEW)** | **New Epic** | Admin Dashboard & CMS Integration |

### Artifact Conflicts

| Artifact | Conflict | Resolution |
|----------|----------|------------|
| PRD | Missing FRs for admin UI, analytics, CMS auth | Add FR46-FR49 |
| PRD | Journey 4 describes file-based workflow | Update to CMS-based workflow |
| PRD | CMS listed as Growth Feature | Move to MVP scope |
| Architecture | "No authentication" statement | Decap CMS brings its own auth (GitHub OAuth) |
| Architecture | No CMS in project structure | Add `public/admin/` directory |
| UX Design | Journey 4 flow outdated | Update Dan's flow to use admin UI |
| Epics | No admin stories exist | Add Epic 7 with 4 stories |

### Technical Impact

- **Architecture change:** Minimal — Decap CMS is a static frontend app at `/admin/`, no backend needed
- **Database:** Not required — CMS reads/writes Git repo directly
- **Authentication:** GitHub OAuth via Decap CMS backend gateway
- **Build process:** Unchanged — CMS commits trigger existing auto-build pipeline
- **Performance:** Zero impact on public-facing pages
- **Security:** Admin access controlled by GitHub repo permissions

---

## Section 3: Recommended Approach

**Selected:** Option 1 — Direct Adjustment

**Rationale:**
1. Decap CMS is a plug-and-play solution for Astro content collections — no architectural rewrite needed
2. Git-based CMS means no new infrastructure (no database, no API server, no hosting changes)
3. Content files remain in the same format (JSON/Markdown) — CMS just provides a UI layer
4. Google Analytics embedding is a simple iframe/API integration
5. Effort estimate: **Low** (2-3 days for experienced developer)
6. Risk level: **Low** (public site completely unaffected)
7. Timeline impact: +2-3 days if added to current sprint

**Alternatives Considered:**
- Full Admin + Database: Rejected — overkill, would require backend/API/auth system
- Custom CMS: Rejected — unnecessary when mature solutions exist
- Keystatic: Viable alternative to Decap, but Decap has larger community and more documentation

---

## Section 4: Detailed Change Proposals

### 4.1 PRD Changes

#### Add Functional Requirements (after FR45)

```
FR46: Content manager can access admin dashboard via /admin URL with GitHub OAuth authentication
FR47: Content manager can add/edit/remove all content types (services, cases, testimonials, FAQ, blog, company) via web-based CMS interface (Decap CMS)
FR48: Content manager can view website traffic statistics via embedded Google Analytics 4 dashboard
FR49: Content manager can view search indexing status via Google Search Console links
```

#### Update Product Scope > Growth Features

```
OLD:
- Blog CMS integration (headless CMS for content updates)

NEW:
- [MOVED TO MVP] Full CMS integration (Decap CMS) for all 6 content types with GitHub OAuth
- [MOVED TO MVP] Embedded analytics dashboard (Google Analytics 4 + Google Search Console links)
```

#### Update User Journey 4 (Dan — Content Manager)

```
OLD Flow:
Dan → Git repo → edit Markdown/JSON files → run local preview → git push → auto-deploy

NEW Flow:
Dan → /admin URL → GitHub OAuth login → CMS dashboard →
select content type → edit via form UI → click Publish →
Decap CMS auto-commits to Git → Cloudflare Pages auto-builds →
live in ~2 minutes. For analytics: click Analytics tab → view embedded GA4 dashboard.
```

### 4.2 Architecture Changes

#### Add New Section: CMS Integration

```
### CMS Integration (Decap CMS)

- **Tool:** Decap CMS (formerly Netlify CMS) — open source, Git-based headless CMS
- **Hosting:** Self-hosted admin UI at `/admin/index.html` (static files in `public/admin/`)
- **Authentication:** GitHub OAuth via Decap CMS backend gateway
- **Content workflow:** Admin edits → Decap auto-commits to Git → Cloudflare Pages auto-rebuild
- **Content types configured:** services (electricity + water), cases, testimonials, faq, blog, company
- **No database needed** — reads/writes directly to content collection files in Git repo
- **No custom API needed** — Decap CMS uses GitHub API for content operations

### Analytics Integration

- **Google Analytics 4:** Embedded GA dashboard in admin page via GA Embed API or iframe
- **Google Search Console:** Direct links to GSC property dashboard
- **No custom analytics backend** — leverage Google's existing tools

### Updated Project Structure (additions only)

public/admin/
├── index.html          # Decap CMS entry point (loads CMS app)
└── config.yml          # Decap CMS collection definitions (maps to content/)

src/pages/admin/
└── analytics.astro     # Embedded GA4 + GSC links (authentication required)
```

### 4.3 Epics Changes

#### Add Epic 7: Admin Dashboard & CMS Integration

**Description:** Content manager có thể quản lý toàn bộ nội dung website qua web UI (Decap CMS) và xem thống kê truy cập qua embedded Google Analytics dashboard. Không cần biết Git hoặc code. Authentication qua GitHub OAuth.

**FRs covered:** FR46, FR47, FR48, FR49

**Stories:**

##### Story 7.1: Setup Decap CMS with GitHub Authentication

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

##### Story 7.2: Configure CMS Collections for All Content Types

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

##### Story 7.3: Build Analytics Dashboard Page

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

##### Story 7.4: Admin Deployment and Documentation

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

### 4.4 UX Design Changes

#### Update Journey 4 flow diagram

Replace the content manager flow with CMS-based workflow (Dan no longer needs Git knowledge).

---

## Section 5: Implementation Handoff

### Change Scope Classification: **Minor**

This change can be implemented directly by the Developer agent without requiring PM/Architect involvement because:
- No fundamental architecture changes
- Decap CMS is a well-documented, plug-and-play integration
- All 4 stories are self-contained within new Epic 7
- Zero impact on existing Epic 1-6 implementations

### Handoff Plan

| Role | Responsibility |
|------|---------------|
| **Developer agent** | Implement Epic 7 stories (CMS setup, collection config, analytics page, docs) |
| **Project owner** | Configure GitHub OAuth app, set up GA4 property, verify CMS access |

### Implementation Order

1. Story 7.1 — Decap CMS setup + GitHub OAuth (blocks all other stories)
2. Story 7.2 — Collection configuration (depends on 7.1)
3. Story 7.3 — Analytics page (independent of 7.2)
4. Story 7.4 — Documentation (depends on 7.1-7.3 completion)

### Success Criteria

- [ ] Content manager can login at `/admin` via GitHub OAuth
- [ ] All 6 content types editable via CMS forms
- [ ] Content changes via CMS trigger successful auto-build on Cloudflare Pages
- [ ] Zod validation passes for CMS-generated content
- [ ] GA4 dashboard embedded and accessible from admin area
- [ ] Admin pages excluded from sitemap and search indexing
- [ ] Documentation complete for content manager onboarding

### Effort Estimate

- Story 7.1: 0.5 day
- Story 7.2: 1 day (6 collection configs with field mappings)
- Story 7.3: 0.5 day
- Story 7.4: 0.5 day
- **Total: ~2.5 days**

---

## Appendix: Artifacts Modified

| Artifact | Sections Modified |
|----------|------------------|
| PRD | Functional Requirements (FR46-49), Growth Features, Journey 4, Project Classification |
| Architecture | New sections: CMS Integration, Analytics Integration, Updated Project Structure |
| Epics | New Epic 7 with Stories 7.1-7.4, FR Coverage Map update |
| UX Design | Journey 4 flow update |
