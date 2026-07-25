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

/** Japanese subcategory → latin URL slug (falls back to the raw value if unmapped). */
export function subcategorySlug(sub: string): string {
  return BLOG_SUBCATEGORY_SLUG_MAP[sub] ?? sub;
}
