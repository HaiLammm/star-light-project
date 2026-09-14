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

## 5. Những gì KHÔNG kiểm soát được bằng code

- **Thời điểm Google hiện favicon/thumbnail** phụ thuộc lịch recrawl. Sau deploy, dùng Search Console → URL Inspection → *Request indexing* cho vài bài đại diện.
- Google **không đảm bảo** hiện thumbnail cho mọi kết quả; markup đúng chỉ là điều kiện cần.
- Tên site (`設備プロ` thay cho `www.setsubi-pro.net`) Google áp ở cấp domain và cần thời gian xác nhận.

---

## 6. Checklist trước khi deploy

```bash
# 0. Build + quét URL nội bộ thiếu "/" và mọi "//" (R15, R16).
#    Phải in "OK — không có URL nội bộ nào thiếu trailing slash."
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
| `public/robots.txt` | Allow all, chặn `/admin/`, trỏ sitemap |

---

# PageSpeed Insights — setsubi-pro.net (Mobile)

Báo cáo ngày: 22/08/2026

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

