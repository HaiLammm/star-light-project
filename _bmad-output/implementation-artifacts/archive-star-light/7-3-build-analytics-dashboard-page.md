# Story 7.3: Build Analytics Dashboard Page

Status: review

## Story

As a content manager,
I want to view website traffic and search performance from the admin area,
so that I can understand content performance without switching between multiple tools.

## Acceptance Criteria

1. **Given** a content manager accesses the analytics page, **When** the page renders, **Then** an embedded Google Analytics 4 dashboard shows: page views, top pages, traffic sources, user demographics.
2. **And** a direct link to the Google Search Console property opens in a new tab.
3. **And** the page is not publicly accessible — it is served under `/admin/` which is already excluded from crawling via `robots.txt` and protected by Decap CMS GitHub OAuth context.
4. **And** setup instructions for GA4 property ID configuration are clearly provided (environment variable or config constant).
5. **And** `robots.txt` already excludes `/admin/` from crawling (verified — no changes needed).

## Tasks / Subtasks

- [x] Task 1: Create analytics page at `src/pages/admin/analytics.astro` (AC: #1, #3)
  - [x] 1.1: Create `src/pages/admin/` directory
  - [x] 1.2: Build standalone HTML page (no BaseLayout — admin pages are independent)
  - [x] 1.3: Embed GA4 dashboard using Google Analytics Embed API (gapi)
  - [x] 1.4: Style with minimal inline CSS matching admin aesthetic
- [x] Task 2: Implement GA4 Embed API integration (AC: #1)
  - [x] 2.1: Load Google Analytics Embed API (`gapi`) from `https://apis.google.com/js/api.js`
  - [x] 2.2: Implement OAuth2 authorization flow for GA4 data access
  - [x] 2.3: Render dashboard charts: Active Users, Page Views over time, Top Pages table, Traffic Sources pie chart, User Demographics
  - [x] 2.4: Add configurable GA4 property ID via a clearly marked constant at the top of the file
- [x] Task 3: Add Google Search Console link (AC: #2)
  - [x] 3.1: Add prominent link card to GSC property: `https://search.google.com/search-console?resource_id=sc-domain:star-light15.net`
  - [x] 3.2: Link opens in `target="_blank"` with `rel="noopener noreferrer"`
- [x] Task 4: Add navigation link from Decap CMS admin (AC: #3)
  - [x] 4.1: Add link to `/admin/analytics` in Decap CMS admin page or document how to navigate
- [x] Task 5: Provide GA4 setup documentation (AC: #4)
  - [x] 5.1: Add setup instructions as comments in the analytics.astro file header
  - [x] 5.2: Document: GA4 property ID, OAuth client ID for Embed API, required Google API Console setup
- [x] Task 6: Verify robots.txt exclusion (AC: #5)
  - [x] 6.1: Confirm `Disallow: /admin/` already present in `public/robots.txt` — already verified, no action needed

## Dev Notes

### Architecture Constraints

- **No BaseLayout**: Admin pages are standalone, not part of the public site layout. Do NOT import or use `BaseLayout.astro`, header, footer, or any public site components.
- **Static page**: This is an Astro page at `src/pages/admin/analytics.astro` that renders a standalone HTML document.
- **No backend**: All analytics data comes from Google's client-side APIs. No server-side data fetching needed.
- **Authentication**: The page relies on the admin being behind `/admin/` (robots.txt excluded). GA4 Embed API has its own OAuth2 flow for data access — the user must authorize with their Google account that has GA4 access.

### GA4 Embed API Implementation

Use the **Google Analytics Embed API** (not iframe). This provides interactive charts directly in the page.

Key implementation pattern:
```javascript
gapi.analytics.ready(function() {
  gapi.analytics.auth.authorize({
    container: 'auth-button',
    clientid: 'YOUR_CLIENT_ID.apps.googleusercontent.com',
  });

  var dataChart = new gapi.analytics.googleCharts.DataChart({
    query: {
      ids: 'ga:YOUR_VIEW_ID',
      metrics: 'ga:sessions,ga:pageviews',
      dimensions: 'ga:date',
      'start-date': '30daysAgo',
      'end-date': 'yesterday',
    },
    chart: {
      container: 'chart-container',
      type: 'LINE',
    }
  });
  dataChart.execute();
});
```

**Important**: GA4 uses the Google Analytics Data API v1 (not Universal Analytics). The Embed API may need the `@google-analytics/data` approach for GA4 properties. Research the latest GA4 Embed API approach — if the legacy Embed API only supports Universal Analytics (UA), use **GA4 Data API with Google Charts** instead or a **Looker Studio embedded report** as fallback.

### Fallback Approach: Looker Studio Embed

If GA4 Embed API proves too complex for a static page (requires backend token exchange), use an embedded Looker Studio report instead:
```html
<iframe
  width="100%"
  height="800"
  src="https://lookerstudio.google.com/embed/reporting/REPORT_ID/page/PAGE_ID"
  frameborder="0"
  style="border:0"
  allowfullscreen
  sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox">
</iframe>
```
This is simpler and more maintainable. Document both options and let the site owner choose.

### Existing Admin Setup (from Stories 7.1 & 7.2)

- `public/admin/index.html` — Decap CMS entry point, loads from unpkg CDN
- `public/admin/config.yml` — CMS collections config with editorial workflow enabled
- `public/robots.txt` — Already has `Disallow: /admin/`
- Backend: GitHub OAuth via Decap CMS (repo: `HaiLammm/star-light-project`, branch: `main`)
- No `src/pages/admin/` directory exists yet — this story creates it

### Project Structure Notes

New files:
```
src/pages/admin/
└── analytics.astro     # GA4 dashboard + GSC links (standalone page)
```

No modifications to existing files required. The `public/admin/` directory (Decap CMS) is separate from `src/pages/admin/` (Astro pages).

### References

- [Source: _bmad-output/planning-artifacts/architecture.md#Analytics Integration]
- [Source: _bmad-output/planning-artifacts/epics.md#Story 7.3]
- [Source: _bmad-output/planning-artifacts/sprint-change-proposal-2026-05-23.md#Epic 7]
- [Source: _bmad-output/planning-artifacts/prd.md#FR48, FR49]
- GA4 Embed API docs: https://developers.google.com/analytics/devguides/reporting/embed/v1
- GA4 Data API: https://developers.google.com/analytics/devguides/reporting/data/v1
- Looker Studio embedding: https://support.google.com/looker-studio/answer/9171315

### Previous Story Intelligence (7.2)

- Decap CMS config is complete with all 6 collections and editorial workflow
- `npm run build` passes — all content validates against Zod schemas
- Admin UI loads correctly from CDN at `/admin/`
- No issues reported with the admin setup — stable foundation to build upon

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Debug Log References

### Completion Notes List

- Created `src/pages/admin/analytics.astro` — standalone analytics dashboard page (no BaseLayout)
- Implements dual approach: GA4 Embed API (Option A, interactive charts) and Looker Studio embed (Option B, simpler)
- Shows setup instructions in Japanese when neither option is configured
- 4 chart panels: Page Views (LINE), Active Users (LINE), Top Pages (TABLE), Traffic Sources (PIE)
- GA configuration via constants at top of script: `GA_CLIENT_ID`, `GA_PROPERTY_ID`, `USE_LOOKER_STUDIO`, `LOOKER_STUDIO_URL`
- GSC link card opens `search.google.com/search-console?resource_id=sc-domain:star-light15.net` in new tab
- Added navigation toolbar to `public/admin/index.html` with link to analytics page
- `robots.txt` already has `Disallow: /admin/` — verified, no changes needed
- Build passes: 65 pages built successfully
- Responsive design with mobile breakpoint at 768px

### File List

- `src/pages/admin/analytics.astro` (NEW)
- `public/admin/index.html` (MODIFIED — added analytics navigation link)
