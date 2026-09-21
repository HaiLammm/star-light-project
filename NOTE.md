# NOTE — Rules tối ưu SEO cho bài viết (コラム)

Mục tiêu: bài `/columns/<slug>/` hiển thị trên Google giống trang chủ — **favicon logo 設**, **tên site**, tiêu đề có brand, mô tả, và **thumbnail**.

Tài liệu này ghi lại các quy tắc **bắt buộc** phải giữ. Vi phạm bất kỳ mục nào trong phần "Rules" đều làm mất thumbnail hoặc rich result.

---

## 1. Rules — structured data

### R1. Mọi URL trong JSON-LD phải TUYỆT ĐỐI
Google **bỏ qua** đường dẫn tương đối trong structured data (khác với `og:image`, được trình duyệt tự resolve). Đây từng là lỗi khiến bài viết không có thumbnail.

- Dùng helper `absoluteUrl()` trong `src/utils/schema.ts`, hoặc `new URL(path, Astro.site).href` ở page.
- Áp dụng cho: `Article.image`, `publisher.logo.url`, `Organization.logo`, `LocalBusiness.image`.

```ts
// ĐÚNG
image: [absoluteUrl(post.image)]   // → https://www.setsubi-pro.net/_astro/xxx.webp
// SAI
image: post.image                  // → /images/SEO/xxx.jpg
```

### R2. `Article.image` là MẢNG, cạnh dài ≥ 1200px
Google khuyến nghị ≥1200px. Ảnh hero hiển thị trên trang giữ 800×450 cho LCP; riêng ảnh dùng cho OG + schema xuất bản 1200×675 (biến `shareImageSrc` trong `src/pages/columns/[...slug].astro`).

**Không phóng to quá kích thước gốc** — helper `sized()` trong file đó tự cắt xuống `min(target, heroMeta.width)`. Ép ảnh 670px lên 1200px chỉ làm file nặng hơn chứ không thêm chi tiết.

### R2b. Ảnh nguồn phải nằm trong `src/assets/images/`, KHÔNG chỉ trong `public/`
`resolveImage()` (`src/utils/imageImports.ts`) chỉ glob `/src/assets/images/**`. Ảnh chỉ có trong `public/` sẽ **không được tối ưu chút nào** — phục vụ nguyên JPEG gốc và JSON-LD trỏ tới file thô.

Quy ước: mỗi ảnh thumbnail tồn tại ở **cả hai** nơi, cùng đường dẫn:
```
public/images/SEO/<slug>/thumbnail.jpg      ← frontmatter trỏ vào đây
src/assets/images/SEO/<slug>/thumbnail.jpg  ← Astro dùng để tối ưu
```

### R2c. ⚠️ 18 bài đang có ảnh nguồn dưới 1200px
Đã tối ưu hết mức có thể, nhưng ảnh gốc quá nhỏ nên **không đạt chuẩn Google**. Cần thay ảnh nguồn ≥1200px (lý tưởng 1920×1080) ở **cả hai** thư mục:

| Rộng (px) | Bài |
|---|---|
| 485 | `waterheater-unsual-odor` |
| 569 | `waterheater-water-leak` |
| 577 | `breaker-keeps-tripping` |
| 578 | `breaker-trip-cannot-reset` |
| 579 | `light-noisy` |
| 580 | `waterheater-unsual-noise` |
| 596 | `power-outlet-no-power` |
| 618 | `power-outlet-spark` |
| 619 | `power-outlet-hot` |
| 664 | `light-dim-suddenly` |
| 670 | `bathtub-cracked-what-to-do` |
| 671 | `bathtub-water-leak`, `light-not-working` |
| 672 | `light-flickering` |
| 673 | `led-not-working`, `light-turn-off-suddenly`, `power-outlet-electrical-leakage` |
| 674 | `waterheater-turn-off-suddenly` |

13 bài còn lại đã đạt đủ 1200×675.

### R3. `publisher` phải có `logo` dạng `ImageObject`
Bắt buộc cho Article rich result. Đã xử lý trong `generateArticle()` qua `buildLogo()`.

### R4. Toàn site phải có `Organization` + `WebSite`
Phát ở `src/layouts/BaseLayout.astro` nên **mọi** trang đều có. Đây là tín hiệu Google dùng để hiện **tên site** thay vì domain trần, và để chọn logo/favicon.

- `Organization` mang `@id` cố định `https://www.setsubi-pro.net/#organization`.
- Bất kỳ node `Organization` nào khác nói về chính công ty (ví dụ `generateAggregateRating` ở `/voice`) **phải dùng lại đúng `@id` đó**, nếu không Google thấy hai thực thể trùng tên trên cùng trang.

### R5. Article phải có `inLanguage: 'ja'` và `isPartOf`
Làm rõ quan hệ bài viết ↔ site. Đã có trong `generateArticle()`.

### R6. Mỗi bài phải có `BreadcrumbList`
Do component `src/components/Breadcrumb.astro` tự phát. Đừng bỏ `<Breadcrumb>` khỏi trang bài.

---

## 2. Rules — thẻ `<head>`

### R7. `max-image-preview:large` là bắt buộc
```html
<meta name="robots" content="max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
```
Thiếu dòng này Google **chỉ được phép** hiện thumbnail cỡ nhỏ. Đặt ở `BaseLayout.astro`, áp dụng toàn site — không xoá.

### R8. Bộ favicon khai báo đủ 4 mức
`favicon.ico` (48+32) · `icon-192.png` · `icon-512.png` · `apple-touch-icon.png` (180). Favicon là thuộc tính **cấp domain**: đổi một lần là áp cho mọi trang, kể cả bài viết.

### R9. Separator tiêu đề dùng `｜` (全角), không dùng `|`
Thống nhất toàn site: `{tiêu đề}｜設備プロ`.

### R10. og:image dùng bản 1200×675, không dùng bản hero 800px
`ogImage={shareImageSrc}` chứ không phải `heroImageSrc`.

---

## 3. Rules — nội dung bài (frontmatter)

### R11. Độ dài tiêu đề
Google mobile JP cắt ở **~30–32 ký tự**. Tiêu đề bài nên **≤ 24 ký tự** để còn chỗ cho hậu tố `｜設備プロ` (5 ký tự).

> Hiện trạng: nhiều bài đang 24–37 ký tự → tổng 31–44, phần brand bị cắt. Sửa ở **nguồn sinh bài** `~/Projects/auto_workflow/seo-cockpit/generateWorker.ts`, **không vá từng file markdown**.

### R12. Độ dài mô tả
SERP tiếng Nhật hiển thị **~70–80 ký tự**. Đặt thông tin quan trọng nhất trong 70 ký tự đầu. Hiện nhiều bài 80–112 ký tự nên bị cắt đuôi.

### R13. Frontmatter bắt buộc
`title`, `description`, `publishedDate`, `updatedDate`, `category`, `subcategory`, `image`, `imageAlt`.
`image` phải trỏ tới file thật tồn tại ở **cả** `public/images/SEO/` **và** `src/assets/images/SEO/` (xem R2b), cạnh dài ≥1200px. Thiếu ảnh là mất thumbnail; thiếu bản trong `src/assets` là mất tối ưu.

### R14. `updatedDate` điều khiển `lastmod` trong sitemap
`astro.config.mjs` đọc trực tiếp frontmatter. Sửa bài thì cập nhật `updatedDate`, đừng để ngày giả.

**Đừng sửa tay `updatedDate` trong file `.md`** — mọi bài đều do pipeline `seo-cockpit` sinh ra, sửa tay sẽ bị ghi đè ở lần đăng sau. Pipeline tự quyết định ngày: chỉ đổi sang hôm nay khi nội dung thật sự khác lần đăng trước (xem §8.4). Trước đây nó dập ngày hôm nay lên **mọi** bài ở mỗi lần "Đăng lại tất cả", khiến cả 57 bài có cùng một `lastmod` và tín hiệu mất hết ý nghĩa.

---

## 4. Rules — URL

### R15. Mọi URL nội bộ phải có dấu `/` ở cuối
Mỗi trang chỉ được phục vụ tại **một** URL canonical, dạng có `/` cuối. Đây là lỗi đã khiến Google xếp 4 trang vào *"Alternate page with proper canonical tag"* (chi tiết §8.1).

Hai lớp bắt buộc, **cả hai đều cần**:

| Lớp | Khai báo | Tác dụng |
|---|---|---|
| Platform | `vercel.json` → `"trailingSlash": true` | Thứ **thực sự** phát 308 từ `/water/bath` → `/water/bath/` |
| Astro | `astro.config.mjs` → `trailingSlash: 'always'` | Ở build tĩnh **không** sinh redirect; chỉ làm dev server 404 đúng chỗ production 308 để link thiếu `/` lộ ra khi code |

⚠️ Gỡ key trong `vercel.json` thì lỗi GSC tái phát mà build vẫn xanh và checker không bắt được.

### R16. Nối chuỗi đường dẫn phải qua helper, không nối tay
`src/utils/url.ts` có 3 hàm **idempotent** — gọi bao nhiêu lần cũng ra cùng kết quả:

```ts
withTrailingSlash(href)  // thêm đúng 1 "/"; bỏ qua #, mailto:, tel:, và path có đuôi file
joinPath(...segments)    // joinPath('/water/', 'toilet') === '/water/toilet/'
absoluteUrl(path)        // path tương đối → URL tuyệt đối đã chuẩn "/"
```

Nhờ idempotent mà đổi dữ liệu nguồn (ví dụ `services.ts` từ `/water` sang `/water/`) không thể sinh ra `//`. Các điểm nối chuỗi bắt buộc dùng helper: `Pagination.astro`, `sitemap.astro`, `Breadcrumb.astro`, `schema.ts`.

> **Bẫy:** với URL tuyệt đối phải parse bằng `new URL` rồi chỉ xét `pathname`. Regex "có đuôi file" chạy trên chuỗi thô sẽ khớp `.net` trong `https://www.setsubi-pro.net` và bỏ qua nhầm.

### R17. `src/config/site.ts` giữ `siteUrl` KHÔNG có `/` cuối
Hàng chục chỗ đang ghép `${siteUrl}/path/`. Thêm `/` vào hằng số sẽ sinh `//` khắp nơi. `absoluteUrl()` xử lý việc này bằng `new URL`.

### R18. Không "tối ưu" bỏ biến thể redirect thiếu `/` trong `vercel.json`
Mỗi lần đổi slug, pipeline sinh **2 rule** — một có `/`, một không. Đo trên production: Vercel **normalize trailing slash TRƯỚC**, rồi mới chạy user redirects:

```
GET /columns/breaker-trip-first-steps
  → 308 /columns/breaker-trip-first-steps/
  → 301 /columns/breaker-tripping/          (2 hop)
```

Nên biến thể không-`/` hiện **không bao giờ khớp**. Vẫn giữ nó làm lưới an toàn nếu `trailingSlash` bị gỡ; nó không tốn gì lúc chạy. Chain 2 hop là bình thường, Google theo và giữ nguyên tín hiệu 301.

---

## 4b. Rules — bảo mật header

### R19. `script-src` KHÔNG có `'unsafe-inline'`
CSP site (`vercel.json`, source `/((?!admin).*)`) chỉ cho `'self'` + hash của đúng 2 inline script runtime `<astro-island>`. Hai điều kiện giữ nó đứng vững:

| Cơ chế | Chỗ | Tác dụng |
|---|---|---|
| `vite.build.assetsInlineLimit` trả `false` cho `.js` | `astro.config.mjs` | `<script>` trong component được tách ra `/_astro/*.js` thay vì inline (mặc định Astro inline file < 4KB) |
| `scripts/check-csp.mjs` | chạy trong `npm run build` | Hash mọi inline script thực thi được trong `dist/` (trừ `/admin/`), **fail build** nếu có cái nào không nằm trong `script-src` |

Checker nằm trong `build` chứ không chỉ `verify` vì Vercel chạy `npm run build`: nếu CSP lệch, menu/slider/form **chết im lặng** trên production — thà deploy fail còn hơn.

- **Nâng Astro** hoặc thêm island loại mới → runtime đổi → build fail và in hash mới. Thay hash trong `vercel.json`, không thêm lại `'unsafe-inline'`.
- **Không dùng `is:inline`** cho script thực thi trong trang public (JSON-LD `type="application/ld+json"` thì được — trình duyệt không thực thi nên CSP không áp).
- `style-src` **vẫn giữ** `'unsafe-inline'`: bản build có ~7.000 thuộc tính `style=""` trên 109 trang; hash không áp cho thuộc tính style (trừ khi thêm `'unsafe-hashes'` + hash từng giá trị). Rủi ro chính của `unsafe-inline` là thực thi script, còn style injection thấp hơn nhiều.
- Đã gỡ `fonts.googleapis.com` / `fonts.gstatic.com` khỏi CSP — site không còn webfont (§9.6).

---

## 5. Những gì KHÔNG kiểm soát được bằng code

- **Thời điểm Google hiện favicon/thumbnail** phụ thuộc lịch recrawl. Sau deploy, dùng Search Console → URL Inspection → *Request indexing* cho vài bài đại diện.
- Google **không đảm bảo** hiện thumbnail cho mọi kết quả; markup đúng chỉ là điều kiện cần.
- Tên site (`設備プロ` thay cho `www.setsubi-pro.net`) Google áp ở cấp domain và cần thời gian xác nhận.

---

## 6. Checklist trước khi deploy

```bash
# 0. Build + kiểm CSP (R19) + quét URL nội bộ thiếu "/" và mọi "//" (R15, R16).
#    Phải in "OK — … mọi inline script đều được CSP cho phép" và
#    "OK — không có URL nội bộ nào thiếu trailing slash."
npm run verify

# 0b. Sitemap không được hụt số: 108 <loc> / 57 <lastmod>.
#     lastmod tụt về 0 nghĩa là blogDateMap trong astro.config.mjs hết khớp URL.
grep -o '<lastmod>' dist/sitemap-0.xml | wc -l
grep -o '<loc>'     dist/sitemap-0.xml | wc -l

# 1. Article.image phải là URL tuyệt đối, dạng mảng
grep -o '"image":\[[^]]*\]' dist/columns/<slug>/index.html

# 2. Ảnh share đúng 1200×675
identify dist/_astro/<hash>.webp

# 3. Có meta robots
grep -o 'max-image-preview[^"]*' dist/columns/<slug>/index.html

# 4. Có đủ node JSON-LD: Organization, WebSite, Article, BreadcrumbList
node -e 'const h=require("fs").readFileSync(process.argv[1],"utf8");
[...h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
 .flatMap(b=>[].concat(JSON.parse(b[1].replace(/\\u003c/g,"<"))))
 .forEach(n=>console.log(n["@type"], n["@id"]||""))' dist/columns/<slug>/index.html
```

Sau deploy: kiểm tra URL bài bằng **Google Rich Results Test** và **Schema Markup Validator** — Article phải hợp lệ, không cảnh báo về `image` / `publisher.logo`.

---

## 7. File liên quan

| File | Vai trò |
|---|---|
| `src/layouts/BaseLayout.astro` | `<head>` toàn site: favicon, meta robots, OG/Twitter, JSON-LD `Organization`+`WebSite` |
| `src/utils/schema.ts` | Tất cả generator JSON-LD; `absoluteUrl()`, `buildLogo()`, `ORGANIZATION_ID` |
| `src/config/site.ts` | `companyName`, `companyNameKana`, `logoPath`, `siteUrl` (KHÔNG có `/` cuối — xem R17) |
| `src/utils/imageImports.ts` | `resolveImage()` — chỉ tìm trong `src/assets/images/**` |
| `src/pages/columns/[...slug].astro` | Trang bài: sinh ảnh 800px (hero) + 1200px (share), gọi `generateArticle` |
| `src/components/Breadcrumb.astro` | Breadcrumb hiển thị + `BreadcrumbList` JSON-LD |
| `src/utils/url.ts` | `withTrailingSlash()`, `joinPath()`, `absoluteUrl()` — mọi URL nội bộ đi qua đây (R16) |
| `scripts/check-trailing-slash.mjs` | Quét `dist/` tìm URL thiếu `/` và mọi `//` (`npm run check:slashes`) |
| `astro.config.mjs` | Sitemap + `lastmod` theo `updatedDate`; `trailingSlash: 'always'` |
| `vercel.json` | `"trailingSlash": true` (R15) + redirect 301 đổi slug (R18) + security headers |
| `public/robots.txt` | Allow all, chặn `/admin/`, trỏ sitemap, khai báo `Llms-txt` |
| `public/llms.txt` | Chỉ mục dịch vụ/khu vực/bài viết cho AI search (§9.7) |
| `src/utils/rehypeArticleImages.mjs` | Ảnh trong thân bài: `loading=lazy`, `decoding=async`, width/height thật đọc từ `public/` (§9.5) |
| `src/components/RelatedPosts.astro` | 4 bài liên quan cuối mỗi bài (§9.4) |
| `src/pages/rss.xml.js` | RSS feed + autodiscovery trong `BaseLayout` |
| `scripts/check-csp.mjs` | Fail build nếu inline script trong `dist/` không có hash trong CSP (R19) |
| `src/utils/articleSteps.ts` | Trích cụm `**手順N：…**` trong bài → `generateHowTo()` (§10.2) |
| `scripts/indexnow.mjs` + `.github/workflows/indexnow.yml` | Báo IndexNow bài đổi sau mỗi deploy Production (§10.1) |
| `public/<32 hex>.txt` | Key IndexNow — **public theo thiết kế**, đừng xoá/đổi tên |
| `setsubi-pro.net-audit/` | Báo cáo audit 8/9 (điểm 55/100) + `ACTION-PLAN.md` — xem §9.10 |

---

# PageSpeed Insights — setsubi-pro.net (Mobile)

Báo cáo ngày: 22/08/2026

> ✅ **Đã xử lý xong trong cùng ngày 22/8** — mobile Lighthouse **99–100**. Các số liệu dưới đây là trạng thái *trước khi sửa*; kết quả và cách làm xem §9.6.

## Điểm tổng quan

| Chỉ số | Điểm |
|---|---|
| **Hiệu suất (Performance)** | **58** |
| Hỗ trợ tiếp cận | 96 |
| Phương pháp hay nhất | 100 |
| SEO | 100 |

## Core Web Vitals (Mobile)

| Chỉ số | Giá trị |
|---|---|
| FCP (First Contentful Paint) | 7,4 giây |
| LCP (Largest Contentful Paint) | 8,4 giây |
| TBT (Total Blocking Time) | 0 ms |
| CLS (Cumulative Layout Shift) | 0 |
| Speed Index | 7,4 giây |

## Core Web Vitals (Desktop) — tham khảo

| Chỉ số | Giá trị |
|---|---|
| FCP | 1,0 giây |
| LCP | 1,2 giây |
| TBT | 0 ms |
| CLS | 0.001 |
| Speed Index | 1,0 giây |

## Các lỗi gây chậm (xếp theo mức ảnh hưởng)

### 1. Cây phần phụ thuộc mạng (Critical Request Chain)

- Độ trễ tối đa: **2.327 ms**
- Chuỗi tải nối tiếp:
  - `index.astro` → `autoplay.js` (923ms, 24KB) → **`ServiceSlider.js` (2.327ms, 11KB)** ← bottleneck chính
  - `MobileMenu.js` (778ms)
  - `jsx-runtime.js` (1.554ms)
  - `index.C5BVv2q5.js` (1.556ms)
  - `autoplay.css` (446ms)

### 2. Yêu cầu chặn hiển thị (Render-Blocking Resources)

- Tiết kiệm ước tính: **300ms**

### 3. Buộc chỉnh lại luồng (Forced Reflow)

- File `autoplay.0KwRtJk7.js` (Swiper autoplay):
  - Dòng 55621: **264ms** reflow
  - [chưa được phân bổ]: **230ms**
  - Dòng 4932: 36ms

### 4. Giảm CSS không dùng đến

- Tiết kiệm: **59 KiB** (chủ yếu từ Swiper CSS)

### 5. Giảm JavaScript không dùng đến

- Tiết kiệm: **27 KiB**

### 6. Cải thiện việc phân phối hình ảnh

- Tiết kiệm: **99 KiB** (nên dùng WebP/AVIF)

### 7. Rút gọn CSS

- Tiết kiệm: **6 KiB**

### 8. Hình ảnh thiếu width/height

- `CTABlock.astro:79` — `<img src="/images/site_logo_no-mark.jpeg">` không có w/h
- `ComparisonTable.astro:51` — tương tự

### 9. Tối ưu hoá kích thước DOM

- DOM lớn với nhiều phần tử lặp (reason cards)

### 10. Long tasks

- 2 long tasks trên main thread

### 11. Font loading

- Hàng chục file font Noto Sans JP (woff2, 17-19KB mỗi file) từ fonts.gstatic.com
- Load weight 400/700 nhưng code dùng cả font-extrabold (800) và font-black (900)

## Nguyên nhân gốc rễ (từ khảo sát codebase)

| Component | File | Vấn đề |
|---|---|---|
| MobileMenu | `Header.astro:79` | `client:load` → tải React+ReactDOM (~45KB) ngay lập tức trên mọi trang |
| ServiceSlider | `index.astro:209` | `client:idle` → 2327ms trên critical path |
| Swiper carousel | `index.astro:479-513` | Import eager, gây forced reflow 494ms |
| Duplicate libs | package.json | Cả Embla lẫn Swiper cùng tồn tại |
| Font weights | `BaseLayout.astro:55-58` | Thiếu weight 800/900 mà code dùng |

## Plan fix

Xem chi tiết tại: `.claude/plans/n-u-c-i-thi-n-c-abundant-perlis.md`

| Bước | Thay đổi | Ước tính | Rủi ro |
|------|----------|----------|--------|
| 1 | MobileMenu → vanilla Astro component | -800ms FCP | Thấp |
| 2 | ServiceSlider `client:idle` → `client:visible` | -1500ms FCP | Thấp |
| 3 | Lazy-load Swiper bằng IntersectionObserver | -500ms + bỏ reflow | Thấp |
| 4 | Thêm width/height cho ảnh | CLS fix | Trivial |
| 5 | Thay Swiper bằng Embla | -59KB CSS, -15KB JS | Trung bình |
| 6 | Font optimization | -200ms | Thấp |
| 7 | Scope article CSS | -5KB | Trivial |

---

# 8. Nhật ký: xử lý 70/108 trang không được index (2026-09-13 → 14)

Ghi lại nguyên nhân và cách triển khai, để lần sau gặp triệu chứng tương tự không phải điều tra lại từ đầu.

## 8.0 Triệu chứng

Google Search Console (`sc-domain:setsubi-pro.net`) báo **70 chưa index / 39 đã index** trên 108 URL trong sitemap, với 3 nhóm ghi *"Xác thực: Không thành công"*.

| Nguyên nhân | Trang | Xác thực | Kết luận sau điều tra |
|---|---|---|---|
| Đã phát hiện – chưa lập chỉ mục | 61 | Đã bắt đầu | Nút thắt crawl budget — §8.3 |
| Trang thay thế có thẻ chính tắc thích hợp | 4 | **Không thành công** | **Lỗi thật** — §8.1 |
| Trang có lệnh chuyển hướng | 3 | Không thành công | **Không phải lỗi** — bỏ qua |
| Đã thu thập – chưa lập chỉ mục | 1 | Không thành công | Chất lượng nội dung, không phải lỗi kỹ thuật |
| Không tìm thấy (404) | 1 | Đã bắt đầu | Đã tự khỏi (đã có 301 trong `vercel.json`) |

**3 URL nhóm "chuyển hướng" là `http://www.`, `http://`, `https://` non-www** — đã 301 đúng về `https://www.`. Xác thực nhóm này sẽ **mãi mãi fail** vì redirect chính là hành vi mong muốn. Đừng bấm xác thực lại.

## 8.1 Lỗi thật: trailing slash

4 URL fail: `/water/bath`, `/water/kitchen`, `/water/toilet`, `/company/office`.

```bash
curl -sIL -o /dev/null -w '%{url_effective} %{http_code}\n' https://www.setsubi-pro.net/water/bath
# → https://www.setsubi-pro.net/water/bath  200   ← KHÔNG redirect
curl -sL https://www.setsubi-pro.net/water/bath | grep canonical
# → <link rel="canonical" href="https://www.setsubi-pro.net/water/bath/">
```

Bản thiếu `/` trả **200 OK** kèm canonical trỏ về bản có `/` → Google xếp vào *"Alternate page with proper canonical tag"*.

**Nguyên nhân gốc — hai tầng cùng lúc:**

1. `astro.config.mjs` không set `trailingSlash`, `vercel.json` không set `trailingSlash` → Vercel phục vụ **cả hai** biến thể với 200.
2. Internal link trong source **trộn lẫn hai dạng**. Trên riêng trang chủ đã có đồng thời `/water/` và `/water/bath`, `/case`, `/columns`, `/company/office`, `/electricity/antenna`… → Google tự khám phá ra bộ URL trùng lặp thứ hai và đốt crawl budget vào đó.

Tổng cộng **7.294 href + 23 URL trong JSON-LD** thiếu `/` trên toàn bộ `dist/`.

## 8.2 Triển khai (star-light — commit `16efa52`, 32 file)

Nguyên tắc chống `//`: **làm mọi điểm nối chuỗi idempotent TRƯỚC, rồi mới đổi dữ liệu.** Sau bước 1 thì mọi trạng thái trung gian đều an toàn.

| Bước | Thay đổi |
|---|---|
| 1 | `src/utils/url.ts` (mới) + sửa 4 điểm nối chuỗi: `Pagination.astro`, `sitemap.astro:21`, `Breadcrumb.astro:13`, `schema.ts` |
| 2 | `astro.config.mjs`: `trailingSlash: 'always'` + `build.format: 'directory'` — bật sớm để dev server 404 làm công cụ dò link sót |
| 3 | 3 file config điều hướng: `services.ts` (11 href), `navigation.ts` (34), `companyData.ts` (4) |
| 4 | 22 href literal trong `.astro` + `public/admin/index.html` |
| 5 | 21 breadcrumb literal + 3 chỗ `Astro.url.pathname` |
| 6 | `vercel.json`: `"trailingSlash": true` |

**Hai phụ thuộc nguy hiểm phải sửa trước bước 3**, nếu không sẽ sinh `//`:
- `sitemap.astro:21` — `` `${cat.href}/${s.data.slug}` `` với `cat.href` từ `services.ts`
- `Pagination.astro` — `` `${baseUrl}/${page}/` `` với caller truyền `/case`, `/voice`, `/columns`

Cả hai chuyển sang `joinPath()`.

**Hai bug JSON-LD tiện thể phát hiện:**
- `Breadcrumb.astro:13` nối chuỗi trần `SITE_CONFIG.siteUrl + item.href` → mọi `item` trong `BreadcrumbList` thiếu `/`. Sửa 1 dòng là fix cho **mọi** trang.
- `generateAggregateRating` thiếu `ensureTrailingSlash` → sinh `https://www.setsubi-pro.net` trong khi `generateOrganization` cùng trang sinh `.../` — hai giá trị `url` khác nhau cho cùng một `@id`.

**Kết quả đo được:** 7.294 + 23 → **0**. `DOUBLE_SLASH` = 0 suốt mọi bước. Sitemap vẫn 108 `<loc>` / 57 `<lastmod>`, vẫn 110 trang build ra.

**Verify trên production sau deploy:**
```
308 → /water/bath/   ·  308 → /water/kitchen/  ·  308 → /water/toilet/
308 → /company/office/  ·  308 → /case/  ·  308 → /columns/  ·  308 → /admin/
/sitemap-index.xml · /sitemap-0.xml · /rss.xml · /robots.txt · /favicon.ico → 200 (không bị thêm "/")
apex setsubi-pro.net/water/bath/ → 1 hop tới www
```

## 8.3 Nút thắt thật sự: 61 trang "Đã phát hiện – chưa lập chỉ mục"

Chiếm 87% số trang chưa index. Google **biết** URL (qua sitemap) nhưng chưa crawl. Crawl Stats giải thích:

| Chỉ số | Giá trị | Ý nghĩa |
|---|---|---|
| Mục đích crawl | **Làm mới 96% / Khám phá 4%** | Gần như toàn bộ ngân sách dùng đọc lại trang cũ |
| Loại file | Ảnh 32%, JS 24%, JSON 10%, CSS 7%, **HTML chỉ 19%** | >70% budget đổ vào asset |
| Phản hồi | 163ms, "Không có vấn đề nào", 91% trả 200 | Máy chủ khoẻ, không phải lỗi hạ tầng |

Hai thứ đang đốt budget: (a) bộ URL trùng lặp do thiếu trailing slash — §8.2 đã xoá; (b) commit `0eb2169` chuyển thumbnail sang `src/assets` tạo hàng loạt URL ảnh mới buộc Google crawl lại toàn bộ ảnh.

Cấu trúc internal link **không** phải vấn đề: `/case/category/*` đã được link từ `/case/` qua `CategorySidebar` với trailing slash đầy đủ.

## 8.4 Pipeline `auto_workflow` — 3 lỗi ở nguồn sinh bài

Mọi bài `.md` đều do `~/Projects/auto_workflow/seo-cockpit` sinh và commit. **Vá trực tiếp file markdown sẽ bị ghi đè ở lần đăng sau** — phải sửa ở pipeline.

### (a) Link nội bộ thiếu `/` — commit `f33d977`

56 chỗ trong content có `](https://www.setsubi-pro.net/contact)` thiếu `/`, do model tự bịa (không có trong prompt hay pack nào).

**Sửa:** `sanitizeBodyForSite()` (`cockpit/lib/generation.ts`) nhận thêm `siteOrigin` và chạy `normalizeInternalLinks()` — thêm `/` cho mọi URL trỏ về chính site, trừ path trông như file và phần sau `?`/`#`. Vì hàm này chạy trên body DB **mỗi lần publish**, một lần đăng lại là sửa hết, và bài mới tự sạch.

### (b) Nguồn slug sai → link 404 — commit `303e8c1`

`runner/src/seo/pack.ts` đọc `slug de xuat` trong `wiki/outputs/*.md` rồi đưa vào pack dưới nhãn *"BÀI ĐÃ VIẾT — dùng slug để tạo internal link"*, còn prompt bảo model "COPY CHÍNH XÁC". Nhưng một trang `wiki/outputs` là **bản nháp**, slug ở đó mới là đề xuất:

```
7  OK    13 MISS   ← 13/20 slug không có bài nào đang chạy
```

Và danh sách chỉ 20 mục trong khi site đã đăng 57 bài — vừa sai vừa thiếu. Doc comment đầu `pack.ts` vốn đã viết *"titles-only list (avoid duplicate articles)"*; phần phát slug là drift khỏi ý định gốc.

**Sửa:** nguồn đúng là `Article.publishedSlug` — chỉ được ghi sau khi commit publish thành công.

| File | Thay đổi |
|---|---|
| `cockpit/lib/published-articles.ts` (mới) | `publishedArticleRefs(websiteId)` — bài PUBLISHED có `publishedSlug`, mới nhất trước, cap 80 |
| `cockpit/lib/n8n.ts` + 2 call site | Gửi kèm `publishedArticles` |
| `runner/src/routes/generate.ts` | Validate + chuyển tiếp |
| `runner/src/jobs/generateWorker.ts` | `renderPublishedArticles()` dựng section "BÀI ĐÃ ĐĂNG" |
| `runner/src/seo/pack.ts` | Thôi phát slug, đổi nhãn thành "CHỦ ĐỀ ĐÃ CÓ BẢN NHÁP"; bump `PACK_FORMAT` 8→9 để bust cache |

> **Quyết định thiết kế:** danh sách "BÀI ĐÃ ĐĂNG" đặt **ngoài** SEO pack. Pack cache theo hash mtime file wiki, còn danh sách này đổi sau mỗi lần publish — nhét vào pack thì hoặc phục vụ danh sách cũ, hoặc phải rebuild cả pack mỗi lần đăng bài.

Danh sách trống → prompt yêu cầu **không chèn internal link nào** thay vì để model tự bịa.

**Bug tiện thể:** `profileSchema` trong `routes/generate.ts` thiếu `internalLinkBlock` trong khi `GenerationProfile` có khai báo. Zod strip key lạ mặc định → override của mỗi Website bị âm thầm vứt đi, mọi job đều chạy bằng default Setsubi.

### (c) `updatedDate` bị dập hàng loạt — commit `72d9770`

`buildArticleCommit` ghi `updatedDate: todayHCM()` **vô điều kiện**. Mỗi lần "Đăng lại tất cả" chạy qua mọi bài PUBLISHED → cả 57 bài cùng `2026-09-12`, kéo theo toàn bộ `lastmod` trong sitemap về một mốc.

| File | Thay đổi |
|---|---|
| `prisma/schema.prisma` | `Article` thêm `publishedContentHash` + `publishedUpdatedDate` (2 cột nullable) |
| `cockpit/lib/publish-stamp.ts` (mới) | `articleContentHash()` + `publishStamp()` — hash khớp thì giữ ngày cũ, khác thì hôm nay |
| `cockpit/lib/publish-payload.ts` | Dùng `stamp.updatedDate`, trả `stamp` ra ngoài |
| `cockpit/lib/jobs.ts` | Ghi lại hash + ngày sau khi commit landed, cả nhánh đơn lẻ lẫn bulk |

> **Quyết định thiết kế 1:** hash dữ liệu thô trong DB, **không** hash file đã serialize. File chứa chính `updatedDate` (thành vòng lặp), và nó là output của `sanitizeBodyForSite` — một lần sửa quy tắc format trong code không phải là "bài được cập nhật" dưới mắt người đọc.
>
> **Quyết định thiết kế 2:** `publishStamp` là hàm thuần, gọi ở cả hai đầu — lúc gửi lệnh đăng (`buildArticleCommit`) và lúc đăng xong (`jobs.ts`). Hai phía đọc cùng row nên ra cùng kết quả; đúng giả định mà `publishedSlug` ngay bên trên đã dùng sẵn.

**Khôi phục ngày thật:** `cockpit/scripts/backfill-published-stamp.ts` đọc git history của content repo — với mỗi bài lấy commit `Publish:` riêng gần nhất (bỏ qua commit `Re-publish:` bulk), đọc `updatedDate`, hoặc `publishedDate` nếu revision đó có trước khi field `updatedDate` tồn tại (commit `22890e7` mới thêm field này — đây là lý do lần chạy đầu chỉ khôi phục được 30/57). Bài chưa từng có commit riêng thì lấy commit đầu tiên thêm file.

Kết quả: **57/57 bài, 37 ngày khác nhau, trải từ 2026-05-15 đến 2026-09-11.** Đã chạy `--apply` trên DB local.

Chỉ đụng bài `status=PUBLISHED`: bài `EDITED` có sửa đổi chưa đăng, băm nó sẽ nói dối rằng repo đã có nội dung đó.

## 8.5 Thao tác đã làm trên Search Console (14/9)

1. ✅ Xác thực lại nhóm *"Trang thay thế có thẻ chính tắc thích hợp"* — chuyển từ *Không thành công* → **Đã bắt đầu**, 4 URL đang chờ / 0 fail.
2. ✅ Resubmit `sitemap-index.xml` — Đã gửi 14/9, đọc lần cuối 14/9, **Thành công**, 108 trang. (Trước đó Google đọc lần cuối 7/9, chưa thấy đợt re-publish 12/9.)
3. ❌ **Không** đụng nhóm *"Trang có lệnh chuyển hướng"* — sẽ mãi fail, đó là hành vi đúng.

Google mất **vài ngày đến 2 tuần** để chạy xong một lần xác thực. Con số 70/39 không đổi ngay là bình thường.

## 8.6 Việc còn phải làm

- [x] ~~Deploy code mới cho cockpit + `db:push`~~ — xong 14/9, xem §8.7.
- [x] ~~"Đăng lại tất cả" để ghi 37 ngày thật vào repo + resubmit sitemap~~ — xong 14/9, xem §8.7.
- [ ] `/columns/light-flickering/` ("Đã thu thập – chưa index"): tín hiệu chất lượng nội dung. Nâng độ sâu bài rồi dùng Kiểm tra URL → Yêu cầu lập chỉ mục.
- [ ] Theo dõi 1–2 tuần: số "Đã phát hiện – chưa index" và tỉ lệ "Khám phá" trong Crawl Stats.
- [ ] Cân nhắc gắn `npm run check:slashes` vào CI — hiện nó là lớp bảo vệ **duy nhất** cho R15/R16, và repo không có test nào khác.

## 8.7 Triển khai lên production (14/9)

Stack cockpit chạy bằng docker compose trên máy nhà (xem `seo-cockpit/DEPLOY.md`), DB là container `seo-cockpit-db-1` ở `localhost:5435`. Trước khi làm, image đang chạy build từ **9/8 (runner) và 13/8 (cockpit)** — toàn bộ commit gần đây chưa từng được deploy. Đó là lý do commit `e3626dd` lúc 01:07 vẫn dập `2026-09-14`.

**1. `db:push`** — diff đúng 2 câu `ADD COLUMN` nullable, không mất dữ liệu.

**2. Rebuild lần 1 FAIL:**
```
Module build failed: UnhandledSchemeError: Reading from "node:crypto"
Import trace: node:crypto ← ./lib/publish-stamp.ts ← ./lib/jobs.ts
```
`instrumentation.ts` được Next build cho **cả** nodejs lẫn Edge. Guard cũ là early return (`if (NEXT_RUNTIME !== "nodejs") return;`) — chỉ chặn lúc chạy, webpack vẫn resolve dynamic import nằm sau `return` khi build bản Edge. Trước đây cây import của `lib/jobs` không có module `node:` nào nên lọt; `publish-stamp.ts` làm lộ lỗi tiềm ẩn này.

**Sửa (commit `bb0681b`):** đặt import **bên trong** `if (NEXT_RUNTIME === "nodejs")` — webpack constant-fold biến này và bỏ nhánh chết trước khi resolve import. Sửa ở gốc thay vì đổi `node:crypto` → `crypto`, để import Node-only nào thêm vào `lib/jobs` sau này cũng không vỡ build nữa. Verify bằng `next build` local trước khi rebuild Docker.

> ⚠️ Bài học: lần 1 background task báo "exit 0" dù build fail, vì lệnh kết thúc bằng `echo`. Khi chạy `docker compose up --build`, phải giữ nguyên exit code của compose (`code=$?; ...; exit $code`) và kiểm tra container thật sự được tạo lại (`docker ps` → "Up N seconds").

**3. Bug trong script CLI (commit `22d87c5`):** `scripts/republish-all.ts` tự đánh dấu Job DONE nên `lib/jobs` không bao giờ materialize job đó — nó chép logic cập nhật `publishedSlug` nhưng bỏ sót stamp. Sửa: giữ `parts.stamp` mà `buildArticleCommit` đã tính cho từng file, ghi cùng `publishedSlug` khi runner báo DONE.

**4. Mô phỏng trước khi đăng thật** (gọi `buildArticleCommit` cho cả 57 bài, không commit): 0 lỗi, 37 ngày khác nhau, 0 bài mang `2026-09-14`, 0 link `/contact` thiếu `/`.

**5. Rebuild lần 2 thành công** — cockpit + runner lên image mới, cockpit trả 307 (về trang đăng nhập) cả local lẫn `https://sesubi-pro.net`, log sạch.

**6. Đăng lại 57 bài** qua `npx tsx scripts/republish-all.ts setsubi-pro --apply` — DONE sau 235 giây, commit `675d1fc`.

**7. Kết quả đã verify:**

| Chỗ kiểm | Trước | Sau |
|---|---|---|
| `updatedDate` trong repo (57 bài) | 1 ngày (`2026-09-14`) | **37 ngày**, 2026-05-15 → 2026-09-11 |
| DB `publishedContentHash` / `publishedUpdatedDate` | — | 57/57 bài |
| `<lastmod>` trên sitemap live | 1 ngày | **37 ngày** (108 `<loc>`, 57 `<lastmod>`) |
| Link `/contact` thiếu `/` trong content | 56 | **0** |

**8. Resubmit `sitemap-index.xml` trên GSC** — "Đã gửi sơ đồ trang web thành công": Đã gửi 14/9, đọc lần cuối 14/9, **Thành công**, 108 trang. Google giờ đọc được 37 mốc `lastmod` thật thay vì một ngày duy nhất.


---

# 9. Nhật ký: các đợt cải thiện SEO trước §8 (2026-05-29 → 2026-09-12)

Tổng hợp lại từ git history của `star-light` và `~/Projects/auto_workflow/seo-cockpit`, theo thứ tự thời gian. Mỗi mục ghi **vấn đề → nguyên nhân → cách xử lý**, kèm commit để tra lại.

## 9.1 Nền móng SEO khi redesign (29/5)

| Vấn đề | Xử lý | Commit |
|---|---|---|
| Canonical/`site` vẫn trỏ `star-light15.net` (site cũ) → mọi canonical, sitemap, OG sai domain | Đổi `site` trong `astro.config.mjs` + `robots.txt` sang `https://www.setsubi-pro.net` | `61905e0` |
| Header dùng `<h1>` cho logo → mỗi trang 2 H1; trang chủ không có H1 thật | Logo đổi thành `<div>`, thêm H1 riêng cho trang chủ | `61905e0` |
| Bài viết không có mục lục, heading không đánh số | TOC sticky bên trái + heading đánh số | `61905e0` |
| Share lên mạng xã hội không có ảnh preview | `BaseLayout` phát `og:image` mặc định (URL tuyệt đối qua `Astro.site`) + đủ Twitter Card | `d8700cc` |
| Footer logo mất `alt` toàn site — code tham chiếu `SITE_CONFIG.siteName` không tồn tại, Astro âm thầm bỏ thuộc tính | Trỏ sang `companyName` | `d8700cc` |
| JSON-LD chèn thẳng chuỗi → nội dung chứa `</script>` có thể phá thẻ | `serializeJsonLd()` escape `<` cho cả 13 chỗ chèn | `2c31406` |
| Trang `/voice` phát nhiều node `Review` rời rạc | Gộp thành 1 node `Organization` mang `aggregateRating` + reviews lồng bên trong | `2c31406` |

## 9.2 Domain & sitemap (18/6)

- **non-www → www trả 307 (tạm thời)** → Google không chuyển tín hiệu. Thêm redirect `permanent` trong `vercel.json`. (`3b7940f`)
- **Mọi URL trong sitemap cùng `lastmod = new Date()`** (thời điểm build) → Google coi `lastmod` là nhiễu và bỏ qua. Sửa: bài blog lấy `publishedDate` từ frontmatter; trang tĩnh **bỏ hẳn** `lastmod` (Google thích thiếu hơn là ngày giả). (`3b7940f`) → sau đó nâng lên ưu tiên `updatedDate` (`ea83e03`, R14).

## 9.3 URL & tín hiệu bài viết (7/2026)

- **URL subcategory chứa chữ Nhật** (`/columns/category/water/お風呂/`) → URL percent-encode dài, dễ trùng lặp. Đổi đoạn path sang slug latin (`/water/bath/`), chữ Nhật chỉ còn là nhãn hiển thị. Thêm 301 cho **cả dạng thô lẫn dạng percent-encoded** để giữ trang đã index. (`e1190f7`)
- **Trang bài viết dùng `og:type=website` và og:image mặc định** → đổi sang `og:type=article` + og:image riêng của bài. (`0fa3874`)
- **Bài chỉ hiện 1 mốc ngày, `dateModified` trống khi thiếu `updatedDate`** → luôn hiện 公開日 + 更新日, `dateModified` cùng nguồn; backfill `updatedDate` cho 19 bài theo ngày commit gần nhất. (`22890e7`)
- Pipeline (`64fbd6a`) bắt đầu ghi `updatedDate = hôm nay` **mỗi lần đăng** — ⚠️ đây chính là gốc của lỗi dập ngày hàng loạt, sửa ở §8.4(c).
- Prompt sinh bài: internal link phải là URL đầy đủ `https://www.setsubi-pro.net/columns/<slug>/` thay vì `/blog/<slug>`. (`f85ba19`) — sau này phát hiện nguồn slug sai, sửa ở §8.4(b).

## 9.4 Đợt SEO 11–12/8

### (a) Bài đổi slug để lại bản trùng (seo-cockpit `82a578c`, `e1cfab4`)
Pipeline chỉ ghi file theo slug hiện tại → đổi slug là repo giữ **cả file cũ**: cùng một bài phục vụ ở 2 URL, bản cũ đóng băng nội dung sai (`anzen-breaker-tripped` vs `safety-breaker-tripped`, `water-heater-not-working` vs `waterheater-not-working`, `breaker-trip-first-steps` vs `breaker-tripping`).

**Sửa:** thêm `Article.publishedSlug`. Slug khác → publish **xoá file cũ và thêm 301 trong cùng một commit** (site không bao giờ build ở trạng thái URL cũ đã mất mà chưa có redirect). `mergeRedirects()` chèn rule mới lên **đầu** mảng — chèn cuối sẽ bị catch-all non-www nuốt. Redirect ghi `statusCode: 301` tường minh thay vì `permanent: true` (Vercel phát 308).

### (b) Bài đã xoá vẫn được index nhưng 404 (`ea83e03`)
3 bài gas điều hoà (`aircon-gas-refill`, `aircon-gas-leak-repair`, `aircon-gas-leak-symptoms`) → 301 về `air-conditioner-not-cooling`.

### (c) Internal linking yếu (`ea83e03`, `9ba2ff8`)
Lúc đó Google chỉ index **11/81 URL**.
- `RelatedPosts`: 4 bài cùng subcategory (bù bằng cùng category) cuối mỗi bài.
- Trang chủ thêm khối "お困りごと別コラム" link **toàn bộ** bài theo chuyên mục con + 10 trang chuyên mục (trước chỉ 6 bài mới nhất) → đường crawl trực tiếp từ trang mạnh nhất.
- **4 bài rơi khỏi mọi trang chuyên mục** vì gắn subcategory `給湯器` + category `water` không khớp cấu hình → thêm `normalizeSubcategory()` / `postCategory()` trong `blogData.ts`.
- Thêm `/rss.xml` + autodiscovery link.

### (d) Meta description (`33662bf` + seo-cockpit `41c3572`)
| Vấn đề | Xử lý |
|---|---|
| 5 bài dài 121–171 ký tự — prompt sinh bài yêu cầu **160–300** ký tự | Sửa prompt → 90–120 ký tự, keyword chính trong 40 ký tự đầu |
| Trang phân trang `/columns`, `/case`, `/voice` trang 2+ dùng **chung** một description | Thêm số trang |
| Trang category chỉ ~30 ký tự | Viết mô tả riêng theo chuyên mục |
| 11 trang tĩnh quá ngắn | Mở rộng |

Kết quả: 0/82 trang ngoài khoảng 70–120 ký tự, 0 description trùng. (R12 sau đó siết thêm: thông tin chính trong 70 ký tự đầu.)

### (e) Schema & brand (`33662bf`, `9ba2ff8`, `ff264b2`)
- **Article `author` là `Person` mang tên công ty** → sai thực thể, Google không quy uy tín cho Person không có thật. Đổi sang `Organization` + `url`.
- Thêm `Organization` + `WebSite` JSON-LD toàn site, meta `max-image-preview:large`, icon 512px (→ R3, R4, R7).
- **NAP/khu vực mâu thuẫn**: 4 nơi nói 4 kiểu (東海・中国 / 名古屋・広島 / 4拠点 / 栃木県). Thống nhất theo `REGIONAL_OFFICES` — cùng nguồn với `LocalBusiness` schema; `AreaMap` dẫn xuất từ config, bản đồ SVG tô lại đúng 10 tỉnh.
- Thống nhất separator tiêu đề sang `｜` (R9).

### (f) Favicon hiện logo Astro trên Google (`ff264b2`, `d448363`)
`favicon.ico` vẫn là file mặc định của framework → Search Console hiện chữ "A". Lần 1 (11/8) thay bằng mark logo + thêm `apple-touch-icon`/`icon-192`/`icon-512`, xoá `favicon.svg`; lần 2 (21/8) phải **tạo lại `favicon.ico`** vì Google vẫn nhận icon cũ (→ R8).

## 9.5 Ảnh không được tối ưu (`271e29c`, `9ba2ff8`, `0eb2169`)

| Vấn đề | Nguyên nhân | Xử lý |
|---|---|---|
| **Trang chủ nặng 34,6 MB** | Ảnh process trỏ `.png` trong khi asset trong `src/assets` là `.jpg` → `resolveImage()` không khớp, rơi về 5 PNG gốc 2656×1600 (~34MB) dù chỉ hiển thị 400×240 | `resolveImage()` dò cả đuôi khác → **0,5 MB** |
| 97 ảnh trong thân bài không có `loading`/width/height → CLS + tải sớm | Markdown sinh `<img>` trần | `rehypeArticleImages.mjs` thêm `loading=lazy`, `decoding=async`, kích thước thật |
| Thumbnail `/columns` là JPG gốc 50–80KB, hiện muộn như mất ảnh | Thumbnail chỉ nằm ở `public/` | Bổ sung bản `src/assets` cho 24 bài (12/8); 12/9 chuyển hẳn 16 thumbnail còn lại, xoá 31 bản `public/` trùng md5 + 3 PNG sót (−1,2MB). Thumbnail **71kB → 15kB** webp |

Pipeline sửa tương ứng (seo-cockpit `7b05b18`): ảnh `THUMBNAIL` commit thẳng vào `src/assets/images/SEO` qua `frontmatterMap.thumbnailFolder`; ảnh thân bài **giữ ở `public/`** vì markdown tham chiếu bằng URL `/images/SEO/...` và `rehypeArticleImages` đọc kích thước từ đó.

> ⚠️ Bug tiện thể: `upsertWebsite` ghi đè cả cột JSON `frontmatterMap` bằng 5 key của form → chỉ cần mở settings một Website rồi bấm Lưu là mất `requiredFields`, `categoryOptions`, `generation`, `redirectsFile`… Đã đổi sang merge.

> ⚠️ Mặt trái: đổi hàng loạt URL ảnh buộc Google crawl lại toàn bộ ảnh — một trong hai nguyên nhân đốt crawl budget ở §8.3.

## 9.6 Core Web Vitals mobile: 58 → 99–100 (21–22/8, story 6.3)

Xuất phát từ báo cáo PSI ở phần đầu file (Perf 58, FCP 7,4s, LCP 8,4s).

| Vòng | Thay đổi | Kết quả |
|---|---|---|
| 21/8 | Preload hero, logo header qua Astro `<Image>` (75KB JPEG → 2–4KB WebP), `HeroCarousel` React → Astro (0 JS), hoãn hydrate (`88a2a7a`, `c33f974`, `c6cadc9`) | — |
| 22/8 · 1 | `MobileMenu` React (`client:load`, ~58KB gz trên **mọi** trang) → Astro thuần; Swiper lazy qua `IntersectionObserver`; `ServiceSlider` → `client:visible`; width/height cho logo CTA (`9928fe0`) | Perf **86**, FCP 3,0s, LCP 3,4s |
| 22/8 · 2 | Font còn 400/700/900; hero mobile 29KB → 18,6KB; **Astro hoist `import('swiper/css')` thành `<link>` chặn render ở `<head>`** → đổi sang `swiper/css?url` và chèn stylesheet lúc lazy-init (`8e67e89`, `4fec4ec`) | Hết render-blocking; FCP 1,3s / LCP 1,5s |
| 22/8 · 3 | PSI của user thấy **CLS 0,191** do font swap trên hero → **bỏ hẳn Google Fonts**, dùng font hệ thống JP (Android có sẵn Noto Sans CJK); 4 logo raw còn lại → webp (`76fec02`, `3b9f86f`) | **Perf 99–100**, LCP 1,4–1,5s, CLS 0, **221KB / 27 request** (từ 1.268KB / 132) |

Bài học:
- `font-display: optional` cải thiện mobile nhưng làm tụt desktop → đã revert về `swap` (`1c6dcf7`) trước khi quyết định bỏ webfont.
- Điểm Lighthouse chạy local dao động 79–90 giữa các lần — kết luận phải dựa trên PSI hoặc nhiều lần chạy ổn định.

## 9.7 Audit toàn diện 8/9 → sửa ngay (`5044191`)

Chạy SEO audit (lưu ở `setsubi-pro.net-audit/`) — **điểm 55/100**: Technical 72, Content 52, On-Page 58, Schema 55, CWV 70, AI readiness 41, Local 25.

Đã sửa trong cùng đợt:

| Vấn đề audit | Xử lý |
|---|---|
| `BreadcrumbList` trên trang category/service có `item` = `#` → schema không hợp lệ | Thay bằng URL trang thật (`[category]/index.astro`, `[category]/[service].astro`) |
| **Trang 404 indexable** — có canonical, hreflang, breadcrumb schema | `noindex,follow`, gỡ canonical/hreflang/breadcrumb |
| `X-Frame-Options: SAMEORIGIN` mâu thuẫn CSP `frame-ancestors 'none'` | Đổi sang `DENY` |
| 5 testimonial trùng (008–012) | Xoá |
| Icon CTA thiếu width/height (CLS), không lazy | Thêm kích thước + `loading="lazy"` cho icon dưới màn hình đầu |
| URL trong schema lúc có lúc không `/` | `ensureTrailingSlash` cho mọi URL schema (sau này thay bằng helper ở §8.2) |
| Các node schema không liên kết | `@id` cho `Organization`/`WebSite`/`LocalBusiness`, `LocalBusiness.parentOrganization` |
| AggregateRating chỉ tính một phần review | `/voice` dùng **toàn bộ** testimonial; thêm AggregateRating ở trang chủ |
| Không có tín hiệu cho AI search | Tạo `/llms.txt` + khai báo trong `robots.txt` |

## 9.8 Đo lường

- Vercel Web Analytics đã bật trên project nhưng **chưa nhúng script** → 0 pageview. Thêm script insights vào `BaseLayout` (`3a68f2d`, 3/7).
- Kiểm tra index qua Google Search Console trong Chrome (`sc-domain:setsubi-pro.net`), không dùng `site:`.

## 9.9 Tổng kết theo nhóm lỗi

| Nhóm | Lỗi lặp lại | Quy tắc rút ra |
|---|---|---|
| Nguồn sinh bài | description quá dài, link sai slug, `updatedDate` giả, link thiếu `/` | Sửa ở `seo-cockpit`, **không vá markdown** (R11, R14, §8.4) |
| Ảnh | fallback về file gốc, thiếu kích thước, thumbnail ở `public/` | R2b, R13; `resolveImage` + `rehypeArticleImages` |
| URL | domain cũ, non-www 307, slug tiếng Nhật, slug đổi để lại trùng, trailing slash | Một URL canonical duy nhất; mọi thay đổi URL đi kèm 301 trong **cùng** commit (R15–R18) |
| Schema | URL tương đối, `#`, Person giả, node trùng không `@id` | R1–R6 |
| Tín hiệu giả | `lastmod` = ngày build, `updatedDate` dập hàng loạt | Thiếu còn hơn sai |

## 9.10 Việc còn tồn từ audit 8/9 (`setsubi-pro.net-audit/ACTION-PLAN.md`)

Chưa làm (kiểm tra source ngày 14/9):

- [ ] **E-E-A-T — ưu tiên cao nhất:** chưa có tác giả/người giám sát trên bài viết; chưa có trang chứng chỉ nhân viên; chưa hiện số giấy phép (電気工事士, 指定給水装置工事事業者…).
- [ ] **Local SEO (25/100):** (MEO phía site xong 21/9 — xem §11) chưa có Google Business Profile đã xác minh; chưa có landing page theo thành phố/tỉnh (Tokyo, Osaka…); chưa đăng ký くらしのマーケット / ユアマイスター / Yahoo!ロコ; ~~chưa nhúng Google Maps~~ (xong §11.1).
- [x] ~~Schema `HowTo`~~ — xong 14/9, xem §10.2.
- [x] ~~IndexNow~~ — xong 14/9, xem §10.1.
- [x] ~~Redirect 2 hop `http://setsubi-pro.net/`~~ — **không phải lỗi, không sửa được trên Vercel**, xem §10.3.
- [x] ~~CSP `unsafe-inline`~~ — gỡ khỏi `script-src` 14/9 (R19); `style-src` giữ có chủ đích.
- [ ] Viết lại mở bài theo kiểu trả lời trực tiếp; thêm trích dẫn nguồn ngoài (nhà sản xuất, số liệu).
- [ ] Mở rộng `/company/about/` (817 → 2.000+ ký tự).
- [ ] Bảo mật: HSTS chưa `preload`, CORS wildcard trên HTML.

---

# 10. Nhật ký: xử lý tồn đọng kỹ thuật từ audit (2026-09-14)

## 10.1 IndexNow

**Vấn đề:** bài mới/sửa chỉ được công cụ tìm kiếm biết qua sitemap, phải chờ tới lượt đọc sitemap kế tiếp.

**Phạm vi thật:** IndexNow được **Bing, Yandex, Naver, Seznam, Yep** dùng — **Google không dùng**. Phía Google vẫn là sitemap + GSC (§8.5). Lợi ích chính: Bing, và các dịch vụ AI dựa trên chỉ mục Bing.

**Thiết kế — vì sao không đặt trong pipeline `seo-cockpit`:** lúc pipeline commit xong, Vercel **chưa build**. Ping lúc đó khiến Bing crawl trúng nội dung cũ. Nên bám vào sự kiện `deployment_status` mà Vercel GitHub integration tạo cho mỗi lần deploy:

```
push → Vercel build → GitHub Deployment "Production" state=success
     → .github/workflows/indexnow.yml
     → tìm SHA của lần deploy Production thành công TRƯỚC đó (gh api)
     → scripts/indexnow.mjs <prevSha> <sha>
     → git diff src/content/blog → URL bài đổi (+ / và /columns/) → POST api.indexnow.org
```

- Diff theo **lần deploy thành công trước**, không phải `HEAD~1`: nhiều commit có thể gộp vào một lần deploy, và deploy fail không được làm mất URL.
- Commit không đụng bài (docs, CSS…) → script bỏ qua, không ping.
- Bài đổi slug (rename) → gửi cả URL cũ (giờ là 301) lẫn URL mới.
- Key nằm ở `public/<32 hex>.txt`; IndexNow tải file đó để xác minh quyền sở hữu domain. File `.txt` có đuôi nên không bị `trailingSlash` redirect.
- Thử tay: `node scripts/indexnow.mjs <base> <head> --dry-run`.

Sau deploy đầu tiên cần kiểm tra: tab Actions có run "IndexNow" chạy sau deploy, và `https://www.setsubi-pro.net/<key>.txt` trả 200.

## 10.2 HowTo schema

**Phát hiện khi khảo sát:** 57 bài phần lớn là dạng **chẩn đoán nguyên nhân** (原因は？), không phải thủ tục. 14 bài có heading chứa 手順/方法 nhưng **0 bài** dùng danh sách đánh số; chỉ **1 bài** (`breaker-tripping`) có cụm bước thật dạng `**手順1：…**`.

**Cách làm:** `extractStepGroups()` (`src/utils/articleSteps.ts`) chỉ nhận cụm `**手順N：…**` (cả `ステップ`/`STEP`) có **≥2 bước dưới cùng một heading**. Tên bước = chữ in đậm; `text` = các gạch đầu dòng ngay sau; tên HowTo = heading chứa cụm. Không suy "bước" từ văn xuôi — structured data không khớp nội dung hiển thị vi phạm guideline của Google.

**Kết quả:** 1 trang có HowTo (4 bước). Bài mới tự có HowTo nếu viết theo mẫu `**手順N：…**` — muốn tăng số bài thì sửa prompt ở `seo-cockpit`, không vá markdown.

> ⚠️ Google đã **ngừng hiện rich result HowTo từ 9/2023** (cả mobile lẫn desktop). Markup không mang lại hiển thị đặc biệt trên Google; giá trị còn lại là giúp Bing/AI search hiểu cấu trúc thủ tục. Đừng kỳ vọng thay đổi trong GSC.

## 10.3 Redirect 2 hop `http://setsubi-pro.net/` — không sửa, có lý do

Đo trên production:
```
http://setsubi-pro.net/   → 308 https://setsubi-pro.net/      (Vercel CDN ép HTTPS)
https://setsubi-pro.net/  → 308 https://www.setsubi-pro.net/  (domain redirect)
```

- **Không thể gộp thành 1 hop trên Vercel.** Việc nâng HTTP→HTTPS do CDN làm, "can't be disabled"; request HTTP không bao giờ tới `vercel.json`, domain settings hay middleware. (Rule `has: host` 301 cuối `vercel.json` cũng chỉ thấy request đã là HTTPS.)
- **2 hop là hành vi đúng chuẩn.** hstspreload.org yêu cầu *"Redirect from HTTP to HTTPS on the same host"* trước — nhảy thẳng `http://apex` → `https://www` sẽ trượt điều kiện preload vì trình duyệt không bao giờ nhận HSTS của apex.
- **Google không phạt:** Googlebot theo tới 10 hop, khuyến nghị ≤3. Chỉ cần mọi link nội bộ, canonical, sitemap đều là `https://www.` (đã đúng) để crawler không đi qua chuỗi này.

Giống nhóm "Trang có lệnh chuyển hướng" ở §8.0 — đây là redirect mong muốn, **đừng tốn công sửa lại**.

## 10.4 CSP bỏ `'unsafe-inline'` ở `script-src`

Chi tiết quy tắc ở **R19**. Ghi lại quá trình:

**Khảo sát `dist/` (112 trang):** 7 inline script khác nhau, 0 handler `on*=`, ~7.000 thuộc tính `style=""`.

| Inline script | Nguồn | Xử lý |
|---|---|---|
| Header, MegaMenu, MobileMenu (109 trang), form liên hệ, FAQ toggle | `<script>` trong component, Astro inline vì < 4KB | Tách ra file qua `assetsInlineLimit` |
| Runtime `<astro-island>` + directive `visible` (10 trang có React island) | Astro chèn trực tiếp, không cấu hình được | Cho phép bằng 2 hash |

**Vì sao không dùng `experimental.csp` của Astro 5:** nó phát CSP qua `<meta>` và hash cả style → khi `style-src` có hash, trình duyệt **bỏ qua** `'unsafe-inline'` → ~7.000 thuộc tính `style=""` bị chặn, vỡ giao diện. Ngoài ra `<meta>` không hỗ trợ `frame-ancestors`.

**Verify** (Playwright, mobile 390px, server tĩnh gắn đúng header CSP từ `vercel.json`, so với cùng trang không có CSP) trên `/`, `/water/toilet/`, `/electricity/`, `/columns/breaker-tripping/`, `/contact/`, `/faq/`:
- 0 vi phạm CSP, 0 lỗi JS.
- Kết quả hai chế độ **giống hệt**: island hydrate, Swiper 2/2 và 3/3, menu mobile mở, FAQ toggle, form liên hệ.
- Đối chứng ngược: một inline script không có hash **bị chặn** → header thật sự có hiệu lực.

---

# 11. MEO (Google マップ対策) — 2026-09-21

MEO = xuất hiện trong Local Pack / Google Maps khi tìm "水漏れ 修理 鉾田", "大阪 電気工事"… Thứ hạng do **Google Business Profile (GBP)** quyết định là chính; website chỉ là tín hiệu phụ (NAP khớp, schema, link từ GBP về site). Nên việc chia hai phần:

## 11.1 Phần trên website (đã làm)

| Hạng mục | Chi tiết |
|---|---|
| Schema LocalBusiness | `@type: ["Plumber","Electrician"]` (khớp 2 danh mục GBP), thêm `geo`, `hasMap`, `openingHoursSpecification` 00:00–23:59 cả tuần, `email`, `image` mặc định logo. `sameAs` → GBP khi có link. `src/utils/schema.ts` |
| Tọa độ | Geocode bằng API 国土地理院: 関東 36.080685,140.602325 · 大阪 34.698051,135.499222. Hyogo **không** có (chưa có số nhà). `src/config/site.ts` |
| Bản đồ | `OfficeMap.astro`: iframe Google Maps (không cần API key, `loading="lazy"`, giữ chỗ bằng aspect-ratio → không CLS) + link "Googleマップで見る" trên `/company/office/` (anchor `#kanto`, `#osaka`). CSP thêm `frame-src https://www.google.com` |
| NAP thống nhất | Footer và `/contact/` lấy địa chỉ từ `REGIONAL_OFFICES` (trước đây footer hard-code, chỉ có 関東). `/contact/` chỉ có link bản đồ, không iframe, để trang form nhẹ |

**Quy tắc:** tên/địa chỉ/điện thoại trên GBP phải **trùng từng ký tự** với `REGIONAL_OFFICES`. Sửa địa chỉ → sửa ở config, không sửa rải rác.

> **Hiện trạng 21/9:** đã có 1 GBP `設備プロ` đã xác minh (tài khoản luonghaimal@gmail.com), 非店舗型, khu vực 関西, danh mục 配管業者 (chính) / 電気工事業者 / エアコン修理, có mô tả, 24h. **CID 9764423267856902825** → gắn vào `googleBusinessProfileUrl` của 大阪営業所. Thiếu: ảnh (0), review (0), bài đăng. Chưa có GBP cho 関東.

## 11.2 Phần ngoài website (chủ doanh nghiệp phải làm — cần tài khoản Google + nhận mã xác minh)

1. **Tạo GBP** tại business.google.com cho **関東営業所** và **大阪営業所** (Hyogo chưa có địa chỉ thật → chưa tạo được; lập listing ảo/địa chỉ ảo vi phạm guideline, bị suspend).
   - Tên: `設備プロ` — **không** nhồi từ khóa ("設備プロ 水漏れ修理 24時間" là vi phạm, bị suspend).
   - Danh mục chính: `水道工事業者`; phụ: `電気工事業者`, (nếu có trong danh sách) `給湯器修理サービス`, `エアコン修理サービス`.
   - Loại hình: **非店舗型ビジネス (service-area business)** — khách không tới văn phòng → **ẩn địa chỉ**, khai khu vực phục vụ = `prefecturesServed` (tối đa 20 khu vực).
   - Giờ: 24時間営業. Điện thoại: 050-8896-6909.
   - Website: `https://www.setsubi-pro.net/?utm_source=google&utm_medium=organic&utm_campaign=gbp_kanto` (đổi `gbp_osaka` cho Osaka) để tách traffic từ Maps trong GA.
2. **Xác minh** (video/bưu thiếp/điện thoại tùy Google yêu cầu). Chưa xác minh = không hiện trên Maps.
3. **Sau khi xác minh:** lấy link chia sẻ (nút "共有" → `https://maps.app.goo.gl/...`) điền vào `googleBusinessProfileUrl` của office tương ứng trong `src/config/site.ts` → schema `sameAs`/`hasMap` và nút "Googleマップで見る" tự trỏ về GBP. Không cần sửa chỗ khác.
4. **Hoàn thiện hồ sơ:** mô tả 750 ký tự (dịch vụ + khu vực + 見積無料/出張費無料), ≥10 ảnh thật (xe, nhân viên, trước/sau thi công — không dùng ảnh stock), danh sách dịch vụ kèm giá "〜円から" khớp trang dịch vụ.
5. **Đánh giá (yếu tố xếp hạng lớn nhất sau khoảng cách):** sau mỗi ca làm, gửi khách link viết review (GBP → "クチコミを依頼"). Đều đặn, **không** mua/đổi quà lấy review. Trả lời mọi review trong vài ngày.
6. **Bài đăng (投稿):** 1 bài/tuần — có thể tái dùng bài cột mới (tóm tắt + link).
7. **Citation cùng NAP:** Yahoo!プレイス, Bing Places (import được từ GBP), Apple Business Connect, iタウンページ, くらしのマーケット.

## 11.3 Cố ý không làm

- **Không** đánh dấu `aggregateRating` cho LocalBusiness từ đánh giá tự đăng trên site: Google coi là *self-serving review*, không hiện sao và có thể bị manual action. Review cho MEO phải nằm trên GBP. (`generateAggregateRating` trên trang chủ đang gắn vào Organization — nên xem lại theo cùng lý do.)
- **Không** tạo landing page hàng loạt theo thành phố từ template (doorway page). Trang khu vực chỉ làm khi có nội dung riêng (ca thực tế, thời gian tới nơi…).
