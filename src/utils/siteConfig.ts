export interface PhoneConfig {
  display: string;
  digits: string;
  href: string;
  ariaLabel: string;
}

export interface OfficeAddress {
  streetAddress?: string;
  addressLocality?: string;
  addressRegion: string;
  postalCode?: string;
  addressCountry: 'JP';
}

export type OfficeKey = 'kanto' | 'nagoya' | 'osaka' | 'hyogo';

export interface RegionalOffice {
  key: OfficeKey;
  name: string;
  shortName: string;
  address: OfficeAddress;
  formattedAddress: string;
  phone: PhoneConfig;
  areaServed: string[];
  prefecturesServed: string[];
}

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

export interface NavigationChild {
  slug: string;
  label: string;
  href: string;
}

export type NavAccent = 'electric' | 'water';

export interface NavigationColumn {
  key: ServiceCategoryKey;
  label: string;
  href: string;
  accent: NavAccent;
  children: NavigationChild[];
}

export interface NavigationItem {
  label: string;
  href: string;
  icon?: string;
  children?: NavigationChild[];
  columns?: NavigationColumn[];
}

export interface EmailConfig {
  display: string;
  href: string;
  ariaLabel: string;
}

export interface SiteConfig {
  companyName: string;
  companyNameEn: string;
  legalName: string;
  siteUrl: string;
  phone: PhoneConfig;
  email: EmailConfig;
  businessHours: string;
}

const SITE_PHONE: PhoneConfig = {
  display: '050-8896-6909',
  digits: '05088966909',
  href: 'tel:05088966909',
  ariaLabel: '無料電話 050-8896-6909',
};

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

const toNavigationChildren = (services: ServiceItem[]): NavigationChild[] => {
  return services.map(({ slug, label, href }) => ({ slug, label, href }));
};

export const SITE_CONFIG: SiteConfig = {
  companyName: '設備プロ',
  companyNameEn: 'Setsubit',
  legalName: '株式会社Hoaloha',
  siteUrl: 'https://www.setsubi-pro.net',
  phone: SITE_PHONE,
  email: {
    display: 'abcxyz@gmail.com',
    href: 'mailto:abcxyz@gmail.com',
    ariaLabel: 'メールでお問い合わせ abcxyz@gmail.com',
  },
  businessHours: '24時間365日',
};

export const REGIONAL_OFFICES: RegionalOffice[] = [
  {
    key: 'kanto',
    name: '設備プロ 関東営業所',
    shortName: '関東営業所',
    address: {
      streetAddress: '上幡木1418-35',
      addressLocality: '鉾田市',
      addressRegion: '茨城県',
      postalCode: '311-2113',
      addressCountry: 'JP',
    },
    formattedAddress: '〒311-2113 茨城県鉾田市上幡木1418-35',
    phone: SITE_PHONE,
    areaServed: ['東京都', '神奈川県', '埼玉県', '千葉県', '茨城県'],
    prefecturesServed: ['東京都', '神奈川県', '埼玉県', '千葉県', '茨城県'],
  },
  {
    key: 'osaka',
    name: '設備プロ 大阪営業所',
    shortName: '大阪営業所',
    address: {
      streetAddress: '曽根崎新地1丁目11-20-9E',
      addressLocality: '大阪市北区',
      addressRegion: '大阪府',
      addressCountry: 'JP',
    },
    formattedAddress: '大阪府大阪市北区曽根崎新地1丁目11-20-9E',
    phone: SITE_PHONE,
    areaServed: ['大阪市', '豊中市', '吹田市', '堺市'],
    prefecturesServed: ['大阪府', '京都府', '奈良県', '和歌山県'],
  },
  {
    key: 'hyogo',
    name: '設備プロ 兵庫営業所',
    shortName: '兵庫営業所',
    address: {
      addressLocality: '神戸市',
      addressRegion: '兵庫県',
      addressCountry: 'JP',
    },
    formattedAddress: '兵庫県神戸市内対応',
    phone: SITE_PHONE,
    areaServed: ['神戸市', '姫路市', '西宮市', '尼崎市'],
    prefecturesServed: ['兵庫県'],
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

export const NAVIGATION: NavigationItem[] = [
  {
    label: 'サービス',
    href: '/water',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    columns: [
      {
        key: 'water',
        label: '水道工事',
        href: '/water',
        accent: 'water',
        children: [
          ...toNavigationChildren(WATER_SERVICES),
          { slug: 'water-case', label: '施工事例', href: '/case' },
        ],
      },
      {
        key: 'electricity',
        label: '電気工事',
        href: '/electricity',
        accent: 'electric',
        children: [
          ...toNavigationChildren(ELECTRICITY_SERVICES),
          { slug: 'electricity-case', label: '施工事例', href: '/case' },
        ],
      },
    ],
  },
  {
    label: '会社案内',
    href: '/company',
  },
  {
    label: '作業の流れ',
    href: '/flow',
  },
  {
    label: 'お客さまの声',
    href: '/voice',
  },
  {
    label: 'コラム',
    href: '/columns',
  },
  {
    label: 'お問い合わせ',
    href: '/contact',
  },
];
