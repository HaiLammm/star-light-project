# Content Management Guide

This guide explains how to add, edit, and publish content on the Star Light website. It is written for content managers who have basic Git knowledge but do not need to understand the underlying code.

## Table of Contents

1. [Overview](#overview)
2. [Content Locations](#content-locations)
3. [Case Studies](#case-studies)
4. [Testimonials](#testimonials)
5. [FAQ Entries](#faq-entries)
6. [Blog / Column Articles](#blog--column-articles)
7. [Service Data](#service-data)
8. [Company Data](#company-data)
9. [Local Preview](#local-preview)
10. [Deployment](#deployment)
11. [Troubleshooting](#troubleshooting)

---

## Overview

The website is a static site built with [Astro](https://astro.build/). All content lives as Markdown (`.md`) or JSON (`.json`) files inside the `src/content/` directory. When the site builds, a schema validator (Zod) checks every content file for required fields and correct formats. If anything is wrong, the build fails with a clear error message — this prevents broken content from reaching the live site.

**Key principle:** To update the site, you edit files in `src/content/`, commit, and push. The site rebuilds automatically.

## Content Locations

```
src/content/
├── cases/          — Case study pages (Markdown files)
├── testimonials/   — Customer testimonials (JSON files)
├── faq/            — FAQ entries (JSON files)
├── blog/           — Blog / column articles (Markdown files)
├── services/       — Service information and pricing (JSON files)
│   ├── water/      — Water-related services
│   ├── electricity/— Electrical services
│   └── pest-control/
└── company/        — Company information (JSON files)
```

Images are stored in `public/images/` and organized by type:

```
public/images/
├── cases/          — Case study photos (case_01.jpg, case_02.jpg, ...)
├── column/         — Blog article images
├── services/       — Service pricing tier images
└── company/        — Company page images
```

---

## Case Studies

Case studies are Markdown files in `src/content/cases/`.

### File naming

Use the pattern `case-NNN.md` where NNN is a zero-padded number:
- `case-001.md`, `case-002.md`, ..., `case-010.md`, `case-011.md`

### Template

Create a new file and paste this template. Replace the placeholder values:

```markdown
---
title: トイレつまり修理事例｜大阪市北区の排水トラブル対応
serviceCategory: water
serviceSlug: toilet
location: 大阪市北区
duration: "120"
cost: 8800
imageAlt: トイレ排水の点検を行う作業スタッフ
publishedDate: 2026-06-01
---

Write the case study description here in Markdown.

Include details about the problem, the work performed, and the outcome.
```

### Field reference

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| `title` | Yes | Text | Page title for the case study |
| `serviceCategory` | Yes | One of: `electricity`, `water`, `pest-control` | Broad service category |
| `serviceSlug` | Yes | Text | Specific service identifier (e.g., `toilet`, `bath`, `lighting`, `breaker`, `outlet`, `antenna`, `water-heater`, `washbasin`, `kitchen`) |
| `location` | Yes | Text | Customer location (e.g., `大阪市北区`) |
| `duration` | Yes | Text (in quotes) | Work duration in minutes (e.g., `"120"`) |
| `cost` | Yes | Number | Cost in yen, no commas (e.g., `8800`) |
| `imageAlt` | Yes | Text | Description of the case study image for accessibility |
| `publishedDate` | Yes | Date | Publication date in `YYYY-MM-DD` format |

### Adding an image

1. Prepare a JPEG image for the case study
2. Name it following the pattern: `case_NN.jpg` (e.g., `case_10.jpg` for `case-010.md`)
3. Place it in `public/images/cases/`

**Note:** The image file uses underscores (`case_10.jpg`) while the content file uses dashes (`case-010.md`). The number in the image filename does not need zero-padding to 3 digits — `case_10.jpg` is correct for case 10.

---

## Testimonials

Testimonials are JSON files in `src/content/testimonials/`.

### File naming

Use the pattern `testimonial-NNN.json`:
- `testimonial-001.json`, `testimonial-008.json`, etc.

### Template

```json
{
  "serviceType": "トイレ修理",
  "serviceCategory": "water",
  "cost": 8800,
  "message": "夜間のトラブルにもすぐ来てくれて、作業前の説明も丁寧で安心してお願いできました。",
  "authorInitial": "T.K.様",
  "title": "トイレ修理をご依頼いただいたお客様の声",
  "duration": "30",
  "location": "大阪市北区",
  "rating": 5
}
```

### Field reference

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| `serviceType` | Yes | Text | Service name in Japanese (e.g., `トイレ修理`) |
| `serviceCategory` | Yes | One of: `electricity`, `water`, `pest-control` | Broad service category |
| `cost` | Yes | Number | Cost in yen, no commas |
| `message` | Yes | Text | Customer's testimonial message |
| `authorInitial` | Yes | Text | Customer initials (e.g., `T.K.様`) |
| `title` | No | Text | Optional title for the testimonial |
| `duration` | No | Text | Optional work duration in minutes |
| `location` | No | Text | Optional customer location |
| `rating` | No | Number 1-5 | Optional star rating |

---

## FAQ Entries

FAQ entries are JSON files in `src/content/faq/`.

### File naming

Use the pattern `faq-NNN.json`:
- `faq-001.json`, `faq-019.json`, etc.

### Template

```json
{
  "question": "見積りだけでも依頼できますか？",
  "answer": "はい。現地確認後に必ず事前見積りをご案内し、ご納得いただいた場合のみ作業を開始します。",
  "category": "pricing",
  "sortOrder": 1
}
```

### Field reference

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| `question` | Yes | Text | The FAQ question |
| `answer` | Yes | Text | The answer to the question |
| `category` | Yes | One of: `general`, `electricity`, `water`, `pest-control`, `pricing`, `process` | FAQ category for filtering |
| `sortOrder` | No | Integer | Display order within the category (default: 0). Lower numbers appear first. |

---

## Blog / Column Articles

Blog articles are Markdown files in `src/content/blog/`.

### File naming

Use a descriptive kebab-case slug as the filename:
- `aircon-gas-leak-repair.md`
- `toilet-repair-cost.md`

The filename becomes part of the URL: `/columns/aircon-gas-leak-repair`

### Template

```markdown
---
title: エアコンのガス漏れ修理｜原因・費用・対処法を完全解説
description: エアコンのガス漏れの原因、修理費用の相場、対処法をわかりやすく解説します。
excerpt: エアコンのガス漏れの原因、修理費用の相場、対処法をわかりやすく解説します。
publishedDate: 2026-06-01
category: electricity
subcategory: エアコン
image: /images/column/col_02.jpg
imageAlt: エアコンの室外機を点検する技術者
---

Write the full article here using Markdown.

## Section Heading

Article content...

## Another Section

More content...
```

### Field reference

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| `title` | Yes | Text | Article title (also used as page title) |
| `description` | Yes | Text | Meta description for search engines |
| `excerpt` | Yes | Text | Short summary shown in article listings |
| `publishedDate` | Yes | Date | Publication date in `YYYY-MM-DD` format |
| `category` | Yes | One of: `electricity`, `water` | Article category |
| `subcategory` | Yes | Text | Subcategory in Japanese (e.g., `エアコン`, `トイレ`) |
| `image` | Yes | Path | Image path relative to `public/` (e.g., `/images/column/col_01.jpg`) |
| `imageAlt` | Yes | Text | Image description for accessibility |

### Adding a blog image

1. Prepare a JPEG image
2. Place it in `public/images/column/`
3. Reference it in the `image` field as `/images/column/your-image.jpg`

---

## Service Data

Service data files are in `src/content/services/`, organized by category:

```
src/content/services/
├── water/           — toilet.json, bath.json, kitchen.json, washroom.json
├── electricity/     — breaker.json, outlet.json, lighting.json, antenna.json, water-heater.json
└── pest-control/    — (pest control service files)
```

### Updating service pricing

Open the service JSON file and edit the relevant fields:

- `startingPrice` — The displayed starting price (number, no commas)
- `originalPrice` — The original price before discount (optional)
- `webDiscountAmount` — Web discount amount (optional)
- `pricingTiers` — Array of pricing options, each with `name`, `price`, `imageUrl`, `imageAlt`

**Example — updating toilet starting price:**

Open `src/content/services/water/toilet.json` and change:
```json
"startingPrice": 5500,
```
to the new price.

### Updating service FAQ

Each service file has its own `faqEntries` array. Edit questions and answers directly:

```json
"faqEntries": [
  {
    "question": "夜間でもトイレ修理を依頼できますか？",
    "answer": "はい。年中無休で受付しており..."
  }
]
```

### Updating service descriptions

Edit the `description` or `introText` fields in the service JSON file.

---

## Company Data

Company data files are in `src/content/company/`.

Currently contains:
- `philosophy.json` — Company philosophy page content

Edit the JSON fields directly to update company information. The `type` field must be one of: `office`, `philosophy`, `history`.

---

## Local Preview

Before pushing changes to the live site, you can preview them locally.

### Prerequisites

- [Node.js](https://nodejs.org/) version 18 or later
- [Git](https://git-scm.com/)

### Steps

1. Open a terminal in the project directory

2. Install dependencies (first time only, or after pulling updates):
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open the URL shown in the terminal (usually `http://localhost:4321`)

5. Edit content files — the browser refreshes automatically when you save

6. Press `Ctrl+C` in the terminal to stop the server

### Verifying your changes

- **Case studies:** Visit `/case/` to see the listing
- **Testimonials:** Visit `/voice/` to see the listing
- **FAQ:** Visit `/faq/` to see all entries
- **Blog articles:** Visit `/columns/` to see the listing
- **Service pages:** Visit the specific service page (e.g., `/water/toilet/`)

---

## Deployment

The site deploys automatically when changes are pushed to the `main` branch.

### Steps

1. Stage your changed files:
   ```
   git add src/content/cases/case-010.md
   git add public/images/cases/case_10.jpg
   ```

2. Create a commit with a descriptive message:
   ```
   git commit -m "Add case study: トイレつまり修理事例 大阪市中央区"
   ```

3. Push to the main branch:
   ```
   git push origin main
   ```

4. Cloudflare Pages automatically detects the push, builds the site, and deploys it. This typically takes about 2 minutes.

5. Verify the live site to confirm your changes are visible.

### What happens during the build

1. Cloudflare Pages pulls the latest code
2. Astro builds the site, validating all content files against their schemas
3. If validation passes, the new static site is deployed to the edge network
4. If validation fails, the build stops and the previous version remains live

---

## Troubleshooting

### Build fails with schema validation error

**Symptom:** `astro build` or the Cloudflare Pages build fails with an error like:
```
[ERROR] Invalid content in "cases/case-010.md"
  - "cost": Expected number, received string
```

**Fix:** Open the file mentioned in the error and correct the field. Common issues:

| Error | Cause | Fix |
|-------|-------|-----|
| `Expected number, received string` | Number field has quotes around it | Remove quotes: `8800` not `"8800"` (exception: `duration` must be quoted) |
| `Required` | A required field is missing | Add the missing field from the template |
| `Invalid enum value` | Wrong category value | Use one of the exact allowed values listed in the field reference |
| `Expected string, received number` | Text field has a number without quotes | Add quotes around the value |
| `Invalid date` | Wrong date format | Use `YYYY-MM-DD` format (e.g., `2026-06-01`) |

### Content does not appear on the site

**Possible causes:**
1. File is not in the correct directory
2. File extension is wrong (`.md` vs `.json`)
3. Build succeeded but you are viewing a cached page — try a hard refresh (`Ctrl+Shift+R`)

### Image does not display

**Possible causes:**
1. Image file is not in the correct `public/images/` subdirectory
2. Image filename does not match the expected pattern
3. Image path in the content file is incorrect (should start with `/images/`)

### Local dev server shows errors

**Try:**
1. Stop the server (`Ctrl+C`)
2. Run `npm install` to ensure dependencies are up to date
3. Run `npm run dev` again
4. If the error persists, check the terminal output for the specific file causing the issue
