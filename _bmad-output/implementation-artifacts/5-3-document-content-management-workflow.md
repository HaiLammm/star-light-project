# Story 5.3: Document Content Management Workflow

Status: review

## Story

As a content manager,
I want clear documentation on how to add, edit, and deploy content,
so that I can maintain the site without developer assistance.

## Acceptance Criteria

1. **Case Study CRUD**: Content manager can add a new case study by creating a Markdown file in `content/cases/` following existing template; Zod schema validates required fields (title, serviceCategory, serviceSlug, location, duration, cost, imageAlt, publishedDate) at build time (FR40)
2. **Build Validation**: `astro build` fails with descriptive error message if any required field is missing or invalid
3. **FAQ CRUD**: Content manager can update FAQ entries by editing JSON files in `content/faq/`; changes validated against Zod schema at build time (FR42)
4. **Testimonial CRUD**: Content manager can add a testimonial by creating a new JSON file in `content/testimonials/`; it validates and appears on the voice page and relevant service detail pages (FR41)
5. **Blog/Column CRUD**: Content manager can publish new blog articles by creating Markdown files in `content/blog/` with required frontmatter (FR43)
6. **Service Data Updates**: Content manager can update service pricing, descriptions, and FAQ via JSON files in `content/services/` (FR39)
7. **Local Preview**: Content manager can run `astro dev` to preview all changes with hot reload (FR44)
8. **Deployment**: Content manager pushes changes to main branch; Cloudflare Pages auto-builds and deploys within ~2 minutes (FR45); Zod validation prevents invalid content from reaching production
9. **Documentation File**: A comprehensive `CONTENT_GUIDE.md` exists in the project root with step-by-step instructions for all content operations

## BDD Scenarios

### Scenario 1: Add new case study
```
Given a content manager wants to add a new case study
When they create a new .md file in src/content/cases/ following the template
Then Zod schema validates all required fields at build time
And astro build fails with descriptive error if any field is missing/invalid
And the case appears on /case/ listing and relevant category filter pages
```

### Scenario 2: Update FAQ entries
```
Given a content manager wants to update FAQ entries
When they edit JSON files in src/content/faq/
Then changes are validated against Zod schema at build time
And updated FAQ appears on the FAQ page and relevant service detail pages
```

### Scenario 3: Add testimonial
```
Given a content manager wants to add a testimonial
When they create a new JSON file in src/content/testimonials/
Then it validates against schema and appears on /voice/ and relevant service pages
```

### Scenario 4: Local preview
```
Given a content manager wants to preview changes
When they run astro dev
Then local dev server shows all changes with hot reload
```

### Scenario 5: Deploy content
```
Given a content manager pushes changes to main branch
When Cloudflare Pages receives the push
Then automatic build runs and deploys within ~2 minutes
And Zod validation prevents invalid content from reaching production
```

## Tasks / Subtasks

- [x] Task 1: Create CONTENT_GUIDE.md documentation (AC: #9)
  - [x] 1.1 Create `CONTENT_GUIDE.md` in project root
  - [x] 1.2 Write overview section: project structure, content locations, tech stack basics for non-developers
  - [x] 1.3 Document case study workflow: file naming (`case-NNN.md`), frontmatter template with all required/optional fields, body content (Markdown), image placement (`public/images/cases/case_NN.jpg`), image naming convention
  - [x] 1.4 Document testimonial workflow: file naming (`testimonial-NNN.json`), complete JSON template with all fields, required vs optional fields
  - [x] 1.5 Document FAQ workflow: file naming (`faq-NNN.json`), JSON template, category enum values (`general`, `electricity`, `water`, `pest-control`, `pricing`, `process`), sortOrder usage
  - [x] 1.6 Document blog/column workflow: file naming convention, frontmatter template (title, description, excerpt, publishedDate, category, subcategory, image, imageAlt), Markdown body writing guide
  - [x] 1.7 Document service data updates: JSON structure in `content/services/`, pricing tiers, FAQ entries within service files
  - [x] 1.8 Document company data updates: JSON files in `content/company/`
  - [x] 1.9 Write local preview section: install prerequisites (Node.js), `npm install`, `npm run dev`, how to check changes
  - [x] 1.10 Write deployment section: git add/commit/push workflow, Cloudflare Pages auto-build, how to verify deployment
  - [x] 1.11 Write troubleshooting section: common Zod validation errors with examples and fixes, build failure debugging

- [x] Task 2: Create content templates directory (AC: #1, #3, #4, #5)
  - [x] 2.1 Create `_templates/` directory in project root
  - [x] 2.2 Create `_templates/case-study.md` — complete case study template with placeholder values and inline comments explaining each field
  - [x] 2.3 Create `_templates/testimonial.json` — complete testimonial template
  - [x] 2.4 Create `_templates/faq.json` — complete FAQ template
  - [x] 2.5 Create `_templates/blog-post.md` — complete blog post template with frontmatter and body structure

- [x] Task 3: Validate Zod schemas provide clear error messages (AC: #2)
  - [x] 3.1 Test each content collection with intentionally invalid data (missing required field, wrong type, invalid enum)
  - [x] 3.2 Verify `astro build` output shows which file and which field failed validation
  - [x] 3.3 Document common error patterns and fixes in CONTENT_GUIDE.md troubleshooting section

- [x] Task 4: Verify end-to-end content workflow (AC: #1-#8)
  - [x] 4.1 Add a test case study file, run `astro build`, verify it appears in generated output
  - [x] 4.2 Add a test testimonial, verify it appears on /voice/
  - [x] 4.3 Add a test FAQ entry, verify it appears on FAQ page
  - [x] 4.4 Remove test content after verification
  - [x] 4.5 Document any edge cases or gotchas discovered during testing

## Dev Notes

### Critical Architecture Patterns

- **Tech Stack**: Astro 6.x, TypeScript strict, Tailwind CSS v4, static output mode
- **Content Collections**: Zod schemas defined in `src/content.config.ts`; cases use `.md`, testimonials/FAQ/services/company use `.json`, blog uses `.md`
- **Build Validation**: Zod schemas run at build time — invalid content causes build failure with error details
- **Zero JS**: Static site — no runtime JavaScript for content rendering
- **Deployment**: Cloudflare Pages with auto-build on git push to main

### Content Collection Schemas (Current State)

**Cases** (`src/content/cases/*.md`):
- Required: `title` (string), `serviceCategory` (enum: electricity|water|pest-control), `serviceSlug` (string), `location` (string), `duration` (string), `cost` (number), `imageAlt` (string), `publishedDate` (date)
- Body: Markdown content describing the case
- Images: `public/images/cases/case_NN.jpg` — naming must match file ID pattern

**Testimonials** (`src/content/testimonials/*.json`):
- Required: `serviceType` (string), `serviceCategory` (enum: electricity|water|pest-control), `cost` (number), `message` (string), `authorInitial` (string)
- Optional: `title` (string), `duration` (string), `location` (string), `rating` (number 1-5)

**FAQ** (`src/content/faq/*.json`):
- Required: `question` (string), `answer` (string), `category` (enum: general|electricity|water|pest-control|pricing|process)
- Optional: `sortOrder` (integer, default 0)

**Blog** (`src/content/blog/*.md`):
- Required: `title` (string), `description` (string), `excerpt` (string), `publishedDate` (date), `category` (enum: electricity|water), `subcategory` (string), `image` (string), `imageAlt` (string)
- Body: Full Markdown article content

**Services** (`src/content/services/*.json`):
- Required: `serviceName`, `serviceNameShort`, `category` (enum), `slug`, `description`, `startingPrice` (positive number), `serviceArea` (string[]), `imageAlt`, `pricingTiers` (min 1), `faqEntries` (min 1)
- Optional: `introText`, `originalPrice`, `webDiscountAmount`, `isEmergency` (default false), `hasFreeEstimate` (default true), `kvImageDesktop`, `kvImageMobile`

**Company** (`src/content/company/*.json`):
- Required: `type` (enum: office|philosophy|history)
- Optional: `officeName`, `address`, `region`, `areaServed`, `heroSubheading`, `sectionTitle`, `sectionBody`, `promises`

### File Naming Conventions

- Cases: `case-NNN.md` (e.g., `case-001.md`, `case-010.md`)
- Testimonials: `testimonial-NNN.json` (e.g., `testimonial-001.json`)
- FAQ: `faq-NNN.json` (e.g., `faq-001.json`)
- Blog: Descriptive kebab-case slug (e.g., `aircon-gas-leak-repair.md`)
- Services: Service slug name (e.g., `toilet.json`, `lighting.json`)

### Documentation Style Requirements

- CONTENT_GUIDE.md must be written for **non-developer content managers** (assume basic git knowledge, no TypeScript/Astro knowledge)
- Use Japanese examples throughout since all content is in Japanese
- Include copy-pasteable templates with clear placeholder markers
- Keep technical jargon minimal; explain any developer terms used

### Anti-Patterns to Avoid

- Do NOT create a CMS or admin interface — this is documentation only
- Do NOT modify any existing source code or schemas — document what exists
- Do NOT create migration scripts or automation tools — keep it simple
- Do NOT write documentation in Japanese — document output language is English per project config, but examples/templates contain Japanese content
- Do NOT put templates inside `src/content/` — use a separate `_templates/` directory to avoid Astro processing them

### Previous Story (5.2) Intelligence

- Story 5.2 established case/voice listing pages with FilterNav, Pagination
- Content collections are fully functional with all schemas in `src/content.config.ts`
- Case images follow pattern: `case-001.md` → `public/images/cases/case_01.jpg`
- Testimonials have no dedicated images (use placeholder)
- Blog listing at `/columns/`, category filters at `/columns/category/`
- All Zod schemas validated at build time — this is the key mechanism for content validation

### Existing File Inventory (for documentation reference)

```
src/content/
├── cases/          (9 files: case-001.md through case-009.md)
├── testimonials/   (7 files: testimonial-001.json through testimonial-007.json)
├── faq/            (18 files: faq-001.json through faq-018.json)
├── blog/           (11 files: various .md files)
├── services/       (9 files: various .json files)
├── company/        (1 file: philosophy.json)
└── config.ts       (Zod schema definitions — re-exports from content.config.ts)
```

### Project Structure Notes

New files to create:
```
CONTENT_GUIDE.md                          (NEW - project root)
_templates/case-study.md                  (NEW)
_templates/testimonial.json               (NEW)
_templates/faq.json                       (NEW)
_templates/blog-post.md                   (NEW)
```

No existing files need modification.

### References

- [Source: _bmad-output/planning-artifacts/epics.md - Epic 5, Story 5.3]
- [Source: _bmad-output/planning-artifacts/prd.md - FR39-FR45 Content Management]
- [Source: src/content.config.ts - All Zod schema definitions]
- [Source: Story 5.2 - Content collection patterns, file naming, image mapping]
- [Source: Story 5.1 - Blog listing pattern, category filters]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (1M context)

### Debug Log References

- Tested invalid case study (missing serviceSlug, wrong serviceCategory enum, string cost) — Zod error messages clearly identify file, field, and expected type
- Clean build verified: 56 pages, 0 errors after removing test content

### Completion Notes List

- Created comprehensive CONTENT_GUIDE.md (project root) covering all 6 content types with field references, templates, and troubleshooting
- Created `_templates/` directory with 4 copy-pasteable templates: case-study.md, testimonial.json, faq.json, blog-post.md
- Validated Zod schema error messages are descriptive (shows file path, field name, expected vs received type)
- Verified end-to-end build validation works — invalid content fails build, valid content passes
- Documentation written in English (per project config) with Japanese content examples throughout

### Change Log

- 2026-05-22: Story 5.3 implementation complete — documentation and templates created

### File List

- CONTENT_GUIDE.md (NEW)
- _templates/case-study.md (NEW)
- _templates/testimonial.json (NEW)
- _templates/faq.json (NEW)
- _templates/blog-post.md (NEW)
