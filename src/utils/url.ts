import { SITE_CONFIG } from '@config/site';

/** Href không phải đường dẫn trang — không bao giờ thêm "/" vào. */
const NOT_A_PAGE = /^(?:#|mailto:|tel:|javascript:|data:)/;

/** Đuôi file: path có đuôi là asset (`/rss.xml`, `/images/a.png`), không phải trang. */
const HAS_EXTENSION = /\.[a-zA-Z0-9]{2,5}$/;

/**
 * Thêm đúng một "/" vào cuối đường dẫn của một href.
 *
 * Mỗi trang chỉ được phục vụ tại một URL canonical duy nhất — dạng có "/" cuối,
 * do `trailingSlash: true` trong vercel.json. Link tới dạng thiếu "/" vẫn tới
 * đúng trang nhưng qua một hop 308, và chính sự tồn tại song song của hai dạng
 * đã khiến Google xếp một loạt trang vào "Alternate page with proper canonical".
 *
 * Idempotent: gọi bao nhiêu lần cũng ra cùng kết quả. `?query` và `#hash` được
 * giữ nguyên ở sau dấu "/".
 */
export function withTrailingSlash(href: string): string {
  if (!href || NOT_A_PAGE.test(href)) return href;

  // URL tuyệt đối phải xét qua `pathname`: kiểm tra đuôi file trên chuỗi thô sẽ
  // khớp ".net" trong "https://www.setsubi-pro.net" và bỏ qua nhầm.
  if (/^https?:\/\//.test(href)) {
    const url = new URL(href);
    if (HAS_EXTENSION.test(url.pathname)) return href;
    if (!url.pathname.endsWith('/')) url.pathname += '/';
    return url.href;
  }

  const [, path, suffix] = href.match(/^([^?#]*)(.*)$/) as RegExpMatchArray;
  if (!path || path.endsWith('/') || HAS_EXTENSION.test(path)) return href;
  return `${path}/${suffix}`;
}

/**
 * Ghép các segment thành một đường dẫn nội bộ đã chuẩn hoá.
 *
 * Bỏ qua segment rỗng/undefined và gộp mọi "/" thừa, nên gọi được với segment
 * có hay không có "/" đều cho cùng kết quả — nhờ vậy đổi dữ liệu nguồn (ví dụ
 * `services.ts` từ `/water` sang `/water/`) không thể sinh ra `//`.
 */
export function joinPath(...segments: (string | number | null | undefined)[]): string {
  const path = segments
    .filter((s) => s !== null && s !== undefined && s !== '')
    .join('/')
    .replace(/\/{2,}/g, '/');
  return withTrailingSlash(path.startsWith('/') ? path : `/${path}`);
}

/**
 * Đường dẫn tương đối → URL tuyệt đối đã chuẩn "/" cuối.
 *
 * Structured data của Google bỏ qua giá trị tương đối, khác với thẻ og:image do
 * trình duyệt tự resolve — nên mọi URL đi vào JSON-LD phải qua đây.
 */
export function absoluteUrl(path: string): string {
  return withTrailingSlash(new URL(path, SITE_CONFIG.siteUrl).href);
}
