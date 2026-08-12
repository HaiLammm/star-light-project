export const BLOG_CATEGORY_COLOR_MAP: Record<string, string> = {
  electricity: 'bg-electric',
  water: 'bg-water',
};

export const BLOG_CATEGORY_LABEL_MAP: Record<string, string> = {
  electricity: '電気まわり全般',
  water: '水まわり全般',
};

export const BLOG_CATEGORIES = [
  {
    key: 'water',
    label: '水まわり全般',
    subcategories: ['お風呂', 'キッチン', 'トイレ', '洗面所'],
  },
  {
    key: 'electricity',
    label: '電気まわり全般',
    subcategories: ['エアコン', 'アンテナ工事', 'コンセント', 'ブレーカー', '照明', '給湯器交換'],
  },
] as const;

export const BLOG_SUBCATEGORY_MAP: Record<string, string[]> = {
  electricity: ['エアコン', 'アンテナ工事', 'コンセント', 'ブレーカー', '照明', '給湯器交換'],
  water: ['お風呂', 'キッチン', 'トイレ', '洗面所'],
};

/**
 * Latin URL slug for each Japanese blog subcategory. The Japanese string stays
 * the DISPLAY label and the frontmatter `subcategory` value; only the URL path
 * segment becomes ASCII (e.g. /columns/category/water/お風呂/ → /…/water/bath/).
 */
export const BLOG_SUBCATEGORY_SLUG_MAP: Record<string, string> = {
  'エアコン': 'aircon',
  'アンテナ工事': 'antenna',
  'コンセント': 'outlet',
  'ブレーカー': 'breaker',
  '照明': 'lighting',
  '給湯器交換': 'water-heater',
  'お風呂': 'bath',
  'キッチン': 'kitchen',
  'トイレ': 'toilet',
  '洗面所': 'washroom',
};

/**
 * Một số bài dùng nhãn rút gọn khác với danh sách chuyên mục chuẩn ở trên.
 * Gộp về nhãn chuẩn để bài không bị rơi khỏi trang chuyên mục và khỏi các
 * khối liên kết nội bộ.
 */
const BLOG_SUBCATEGORY_ALIAS_MAP: Record<string, string> = {
  '給湯器': '給湯器交換',
};

/** Nhãn chuyên mục con đã chuẩn hoá (dùng để so khớp, không phải để hiển thị thô). */
export function normalizeSubcategory(sub: string): string {
  return BLOG_SUBCATEGORY_ALIAS_MAP[sub] ?? sub;
}

const SUBCATEGORY_TO_CATEGORY = new Map(
  Object.entries(BLOG_SUBCATEGORY_MAP).flatMap(([cat, subs]) => subs.map((sub) => [sub, cat] as const)),
);

/**
 * Chuyên mục lớn suy ra từ chuyên mục con. Một số bài có `category` không khớp
 * với chuyên mục con (ví dụ 給湯器 được gắn `water` trong khi điều hướng xếp
 * 給湯器交換 vào 電気まわり); lấy chuyên mục con làm chuẩn để bài không biến mất
 * khỏi trang chuyên mục.
 */
export function postCategory(post: { category: string; subcategory: string }): string {
  return SUBCATEGORY_TO_CATEGORY.get(normalizeSubcategory(post.subcategory)) ?? post.category;
}

/** Japanese subcategory → latin URL slug (falls back to the raw value if unmapped). */
export function subcategorySlug(sub: string): string {
  const normalized = normalizeSubcategory(sub);
  return BLOG_SUBCATEGORY_SLUG_MAP[normalized] ?? normalized;
}
