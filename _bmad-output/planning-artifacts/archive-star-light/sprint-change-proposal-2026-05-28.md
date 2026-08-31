# Sprint Change Proposal — Đại tu cấu trúc & SEO

- **Ngày:** 2026-05-28
- **Người yêu cầu:** Luonghailam
- **Nguồn đặc tả:** `Review SEO-2.pdf` (12 mục) + bổ sung trong hội thoại (#13)
- **Chế độ duyệt:** Incremental
- **Phân loại phạm vi:** Moderate (tái cấu trúc nav + nhiều component; không thay đổi mục tiêu MVP)

## 1. Tóm tắt vấn đề

Website là bản rebuild Astro của `setsubi-pro.net` / `star-light15.net`. SEOQuake báo nhiều lỗi: canonical trỏ về web gốc (nghi duplicate), lặp 2 thẻ H1, 10 ảnh thiếu alt, tỷ lệ text/HTML thấp (11.99%). Đồng thời cần tách khác biệt với web gốc về cấu trúc, màu sắc, bố cục và tinh gọn để tối ưu SEO.

## 2. Quyết định nền tảng (đã chốt)

- **Nền trang:** off-white `#FAF8EF` thay `#FFFFFF`.
- **Accent thương hiệu:** xanh nước biển `#0277BD` = NƯỚC (水道); vàng `#FBC02D` = ĐIỆN (電気).
- **Canonical (#12):** HOÃN — user tự nghiên cứu; phải xác minh web có phải bản thay thế hợp pháp web gốc trước khi đổi site URL.
- **Alt ảnh (#11):** ưu tiên thấp, làm sau.

## 3. Danh sách thay đổi

| # | Hạng mục | File chính | Trạng thái |
|---|---|---|---|
| 10 | Xóa 2 thẻ H1 thừa (logo → a/div) | `Header.astro` | Đợt 1 |
| 1 | Nền off-white `#FAF8EF` | `tailwind.config.mjs`, tokens | Đợt 1 |
| 5 | Sửa nút CTA bị xén góc phải laptop | `Header.astro` | Đợt 1 |
| 4a | Gộp 電気/水道 → "サービス" megamenu 2 cột (điện vàng / nước xanh) | `siteConfig.ts`, `MegaMenu.astro`, `MobileMenu.tsx` | Đợt 2 |
| 4b | Bỏ 施工事例 khỏi nav, đưa vào trang dịch vụ | `siteConfig.ts` | Đợt 2 |
| 4c | Bỏ よくある質問 khỏi nav, gộp với お問い合わせ | `siteConfig.ts`, `/contact` | Đợt 2 |
| 9 | Breadcrumb đồng bộ nav + tăng cỡ chữ | `Breadcrumb.astro` | Đợt 2 |
| 2 | Bỏ banner CTA gần footer ở blog & contact (giữ ở home + dịch vụ) | `CTABlock.astro`, layout trang | Đợt 3 |
| 3 | Footer thêm địa chỉ + sđt | `Footer.astro` | Đợt 3 |
| 6 | Contact: bắt buộc tên+sđt; địa chỉ+email không bắt buộc | `ContactForm.tsx` | Đợt 3 |
| 7 | Thu nhỏ khung Privacy + checkbox đồng ý (to, dễ tick) | `ContactForm.tsx` | Đợt 3 |
| 8 | Bỏ hẳn link カスタマーフォーム | `ContactForm*` / trang chủ | Đợt 3 |
| 13 | Đánh số thứ tự heading bài viết (H2/H3) | render markdown columns/blog | Đợt 4 |
| 11 | Bổ sung alt ảnh | nhiều | Hoãn |
| 12 | Sửa canonical | `astro.config.mjs`, `siteConfig.ts` | Hoãn |

## 4. Đánh giá impact

- **Epic:** Chủ yếu chạm Epic 1 (navigation/layout), Epic 3 (service pages), Epic 4 (contact form), Epic 5 (blog/columns). Không phát sinh epic mới; là điều chỉnh trong cấu trúc hiện có.
- **PRD:** MVP không đổi mục tiêu. FR liên quan navigation (FR2, FR11-13) cần cập nhật mô tả: dịch vụ gộp 1 mục, 2 nhánh điện/nước.
- **Architecture:** Không đổi tech stack. Chỉ đổi design token + cấu trúc dữ liệu NAVIGATION.
- **UX:** Megamenu chuyển từ flat list sang 2 cột; cần cập nhật ux-design-specification phần navigation.

## 5. Hướng đi & thứ tự thực thi (Incremental)

Đi từ nhanh & ít rủi ro → phức tạp:
1. **Đợt 1:** #10, #1, #5 (quick wins, ít phụ thuộc)
2. **Đợt 2:** #4a/#4b/#4c, #9 (tái cấu trúc nav — thay đổi lớn nhất)
3. **Đợt 3:** #2, #3, #6, #7, #8 (footer + form)
4. **Đợt 4:** #13 (numbering heading)
5. **Hoãn:** #11, #12

## 6. Handoff

- **Scope:** Moderate → thực thi trực tiếp bởi Developer (incremental), duyệt từng đợt với user.
- **Verify:** sau mỗi đợt build/chạy dev server và kiểm tra trực quan; SEOQuake recheck H1/heading sau đợt liên quan.
