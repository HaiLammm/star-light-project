export const CASE_FILTER_CATEGORIES = [
  {
    key: 'electricity',
    label: '電気まわり全般',
    subcategories: [
      { key: 'breaker', label: 'ブレーカー' },
      { key: 'outlet', label: 'コンセント' },
      { key: 'lighting', label: '照明' },
      { key: 'antenna', label: 'アンテナ工事' },
      { key: 'water-heater', label: '給湯器交換' },
    ],
  },
  {
    key: 'water',
    label: '水まわり全般',
    subcategories: [
      { key: 'toilet', label: 'トイレ' },
      { key: 'kitchen', label: 'キッチン' },
      { key: 'bath', label: 'お風呂' },
      { key: 'washroom', label: '洗面所' },
    ],
  },
] as const;

export const VOICE_FILTER_CATEGORIES = [
  {
    key: 'electricity',
    label: '電気まわり全般',
    subcategories: [
      { key: 'breaker', label: 'ブレーカー' },
      { key: 'outlet', label: 'コンセント' },
      { key: 'lighting', label: '照明' },
      { key: 'antenna', label: 'アンテナ工事' },
      { key: 'water-heater', label: '給湯器交換' },
    ],
  },
  {
    key: 'water',
    label: '水まわり全般',
    subcategories: [
      { key: 'toilet', label: 'トイレ' },
      { key: 'kitchen', label: 'キッチン' },
      { key: 'bath', label: 'お風呂' },
      { key: 'washroom', label: '洗面所' },
    ],
  },
] as const;

export const CASE_SLUG_LABEL_MAP: Record<string, string> = {
  toilet: 'トイレ',
  kitchen: 'キッチン',
  bath: 'お風呂',
  washroom: '洗面所',
  breaker: 'ブレーカー',
  outlet: 'コンセント',
  lighting: '照明',
  antenna: 'アンテナ工事',
  'water-heater': '給湯器交換',
};

export const VOICE_CATEGORY_LABEL_MAP: Record<string, string> = {
  electricity: '電気まわり全般',
  water: '水まわり全般',
};

export function getCaseImageSrc(caseId: string): string {
  const num = caseId.replace('case-', '').replace(/^0+/, '');
  const padded = num.padStart(2, '0');
  return `/images/cases/case_${padded}.jpg`;
}

export function getTestimonialImageSrc(_id: string, serviceCategory: string): string {
  const categoryImageMap: Record<string, string> = {
    water: '/images/cases/case_01.jpg',
    electricity: '/images/cases/case_04.jpg',
  };
  return categoryImageMap[serviceCategory] ?? '/images/cases/case_01.jpg';
}

export const CATEGORY_LABEL_MAP: Record<string, string> = {
  electricity: '電気まわり',
  water: '水まわり',
};
