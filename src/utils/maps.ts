import type { RegionalOffice } from '@config/site';

type MappableOffice = Pick<RegionalOffice, 'geo' | 'googleBusinessProfileUrl'>;

/**
 * Link "Googleマップで見る". Ưu tiên GBP (sau khi xác minh) để người dùng rơi vào đúng
 * listing có đánh giá/ảnh; chưa có thì mở theo tọa độ. Không có cả hai → null.
 */
export function officeMapUrl(office: MappableOffice): string | null {
  if (office.googleBusinessProfileUrl) return office.googleBusinessProfileUrl;
  if (!office.geo) return null;
  const { latitude, longitude } = office.geo;
  return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
}

/**
 * URL iframe bản đồ, không cần API key. Host phải khớp `frame-src` trong CSP (vercel.json).
 */
export function officeMapEmbedUrl(office: MappableOffice): string | null {
  if (!office.geo) return null;
  const { latitude, longitude } = office.geo;
  return `https://www.google.com/maps?q=${latitude},${longitude}&z=16&hl=ja&output=embed`;
}
