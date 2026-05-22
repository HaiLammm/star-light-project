export const BLOG_CATEGORY_COLOR_MAP: Record<string, string> = {
  electricity: 'bg-[#fbc101]',
  water: 'bg-[#3ea6ff]',
};

export const BLOG_CATEGORY_LABEL_MAP: Record<string, string> = {
  electricity: '電気まわり全般',
  water: '水まわり全般',
};

export const BLOG_CATEGORIES = [
  {
    key: 'electricity',
    label: '電気まわり全般',
    subcategories: ['エアコン', 'アンテナ工事', 'コンセント', 'ブレーカー', '照明', '給湯器交換'],
  },
  {
    key: 'water',
    label: '水まわり全般',
    subcategories: ['お風呂', 'キッチン', 'トイレ', '洗面所'],
  },
] as const;

export const BLOG_SUBCATEGORY_MAP: Record<string, string[]> = {
  electricity: ['エアコン', 'アンテナ工事', 'コンセント', 'ブレーカー', '照明', '給湯器交換'],
  water: ['お風呂', 'キッチン', 'トイレ', '洗面所'],
};
