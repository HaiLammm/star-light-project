export type ServiceCategoryKey = 'electricity' | 'water';

export interface ServiceItem {
  slug: string;
  label: string;
  href: string;
  description: string;
  startingPrice: number;
}

export interface ServiceCategory {
  slug: ServiceCategoryKey;
  label: string;
  href: string;
  description: string;
  subServices: ServiceItem[];
}

export const ELECTRICITY_SERVICES: ServiceItem[] = [
  {
    slug: 'breaker',
    label: 'ブレーカー',
    href: '/electricity/breaker',
    description: '修理・交換・漏電調査等',
    startingPrice: 1300,
  },
  {
    slug: 'outlet',
    label: 'コンセント',
    href: '/electricity/outlet',
    description: '修理・交換・増設等',
    startingPrice: 1300,
  },
  {
    slug: 'lighting',
    label: '照明',
    href: '/electricity/lighting',
    description: '電気がつかない・交換対応等',
    startingPrice: 1300,
  },
  {
    slug: 'antenna',
    label: 'アンテナ工事',
    href: '/electricity/antenna',
    description: '設置・交換・修理',
    startingPrice: 1300,
  },
  {
    slug: 'water-heater',
    label: '給湯器交換',
    href: '/electricity/water-heater',
    description: 'お湯が出ない・異臭がする等',
    startingPrice: 1300,
  },
];

export const WATER_SERVICES: ServiceItem[] = [
  {
    slug: 'toilet',
    label: 'トイレ',
    href: '/water/toilet',
    description: 'つまり・水漏れ・パーツ交換等',
    startingPrice: 5000,
  },
  {
    slug: 'kitchen',
    label: 'キッチン',
    href: '/water/kitchen',
    description: 'つまり・水漏れ・パーツ交換等',
    startingPrice: 5000,
  },
  {
    slug: 'bath',
    label: 'お風呂',
    href: '/water/bath',
    description: 'つまり・水漏れ・パーツ交換等',
    startingPrice: 5000,
  },
  {
    slug: 'washroom',
    label: '洗面所',
    href: '/water/washroom',
    description: 'つまり・水漏れ・パーツ交換等',
    startingPrice: 5000,
  },
];

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    slug: 'water',
    label: '水道工事',
    href: '/water',
    description: 'トイレ・キッチン・お風呂・洗面所の水まわりトラブルに対応します。',
    subServices: WATER_SERVICES,
  },
  {
    slug: 'electricity',
    label: '電気工事',
    href: '/electricity',
    description: 'ブレーカー・コンセント・照明などの電気まわりトラブルに対応します。',
    subServices: ELECTRICITY_SERVICES,
  },
];
