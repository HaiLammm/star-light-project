# Danh sách thay đổi — Đại tu cấu trúc & SEO (2026-05-28)

Nguồn: `_bmad-output/planning-artifacts/sprint-change-proposal-2026-05-28.md`

## Đợt 1 (quick wins, ít phụ thuộc)

- **#10 — Xóa 2 thẻ H1 thừa** (logo → a/div) · File: `Header.astro`
- **#1 — Nền off-white `#FAF8EF`** · File: `tailwind.config.mjs`, tokens
- **#5 — Sửa nút CTA bị xén góc phải laptop** · File: `Header.astro`

## Đợt 2 (tái cấu trúc nav — thay đổi lớn nhất)

- **#4a — Gộp 電気/水道 → "サービス" megamenu 2 cột** (điện vàng / nước xanh) · File: `siteConfig.ts`, `MegaMenu.astro`, `MobileMenu.tsx`
- **#4b — Bỏ 施工事例 khỏi nav, đưa vào trang dịch vụ** · File: `siteConfig.ts`
- **#4c — Bỏ よくある質問 khỏi nav, gộp với お問い合わせ** · File: `siteConfig.ts`, `/contact`
- **#9 — Breadcrumb đồng bộ nav + tăng cỡ chữ** · File: `Breadcrumb.astro`

## Đợt 3 (footer + form)

- **#2 — Bỏ banner CTA gần footer ở blog & contact** (giữ ở home + dịch vụ) · File: `CTABlock.astro`, layout trang
- **#3 — Footer thêm địa chỉ + sđt** · File: `Footer.astro`
- **#6 — Contact: bắt buộc tên+sđt; địa chỉ+email không bắt buộc** · File: `ContactForm.tsx`
- **#7 — Thu nhỏ khung Privacy + checkbox đồng ý** (to, dễ tick) · File: `ContactForm.tsx`
- **#8 — Bỏ hẳn link カスタマーフォーム** · File: `ContactForm*` / trang chủ

## Đợt 4 (numbering heading)

- **#13 — Đánh số thứ tự heading bài viết (H2/H3)** · File: render markdown columns/blog

## Hoãn

- **#11 — Bổ sung alt ảnh** · File: nhiều (ưu tiên thấp, làm sau)
- **#12 — Sửa canonical** · File: `astro.config.mjs`, `siteConfig.ts` (user tự nghiên cứu; phải xác minh web có phải bản thay thế hợp pháp web gốc trước khi đổi site URL)
