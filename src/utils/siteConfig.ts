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

export type OfficeKey = 'tokyo' | 'nagoya' | 'osaka' | 'hyogo';

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

export type ServiceCategoryKey = 'electricity' | 'water' | 'pest-control';

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

export interface NavigationItem {
  label: string;
  href: string;
  icon?: string;
  children?: NavigationChild[];
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
  display: '0120-219-695',
  digits: '0120219695',
  href: 'tel:0120219695',
  ariaLabel: '無料電話 0120-219-695',
};

const ELECTRICITY_SERVICES: ServiceItem[] = [
  {
    slug: 'breaker',
    label: 'ブレーカー',
    href: '/electricity/breaker',
    description: '修理・交換・漏電調査等',
    startingPrice: 1100,
  },
  {
    slug: 'outlet',
    label: 'コンセント',
    href: '/electricity/outlet',
    description: '修理・交換・増設等',
    startingPrice: 1100,
  },
  {
    slug: 'lighting',
    label: '照明',
    href: '/electricity/lighting',
    description: '電気がつかない・交換対応等',
    startingPrice: 1100,
  },
  {
    slug: 'antenna',
    label: 'アンテナ工事',
    href: '/electricity/antenna',
    description: '設置・交換・修理',
    startingPrice: 1100,
  },
  {
    slug: 'water-heater',
    label: '給湯器交換',
    href: '/electricity/water-heater',
    description: 'お湯が出ない・異臭がする等',
    startingPrice: 1100,
  },
];

const WATER_SERVICES: ServiceItem[] = [
  {
    slug: 'toilet',
    label: 'トイレ',
    href: '/water/toilet',
    description: 'つまり・水漏れ・パーツ交換等',
    startingPrice: 5500,
  },
  {
    slug: 'kitchen',
    label: 'キッチン',
    href: '/water/kitchen',
    description: 'つまり・水漏れ・パーツ交換等',
    startingPrice: 5500,
  },
  {
    slug: 'bath',
    label: 'お風呂',
    href: '/water/bath',
    description: 'つまり・水漏れ・パーツ交換等',
    startingPrice: 5500,
  },
  {
    slug: 'washroom',
    label: '洗面所',
    href: '/water/washroom',
    description: 'つまり・水漏れ・パーツ交換等',
    startingPrice: 5500,
  },
];

const PEST_CONTROL_SERVICES: ServiceItem[] = [
  {
    slug: 'cockroach',
    label: 'ゴキブリ駆除',
    href: '/pest-control/cockroach',
    description: '室内の発生調査・駆除・再発防止対応',
    startingPrice: 5500,
  },
  {
    slug: 'termite',
    label: 'シロアリ駆除',
    href: '/pest-control/termite',
    description: '床下調査・薬剤処理・被害拡大防止対応',
    startingPrice: 5500,
  },
  {
    slug: 'rodent',
    label: 'ネズミ駆除',
    href: '/pest-control/rodent',
    description: '侵入口調査・捕獲・再侵入防止対応',
    startingPrice: 5500,
  },
  {
    slug: 'general-pest',
    label: '一般害虫駆除',
    href: '/pest-control/general-pest',
    description: '害虫の種類に応じた調査・駆除・予防施工',
    startingPrice: 5500,
  },
];

const toNavigationChildren = (services: ServiceItem[]): NavigationChild[] => {
  return services.map(({ slug, label, href }) => ({ slug, label, href }));
};

export const SITE_CONFIG: SiteConfig = {
  companyName: '設備人',
  companyNameEn: 'Setsubit',
  legalName: '合同会社スターライト',
  siteUrl: 'https://star-light15.net',
  phone: SITE_PHONE,
  email: {
    display: 'info@star-light15.net',
    href: 'mailto:info@star-light15.net',
    ariaLabel: 'メールでお問い合わせ info@star-light15.net',
  },
  businessHours: '24時間365日',
};

export const REGIONAL_OFFICES: RegionalOffice[] = [
  {
    key: 'tokyo',
    name: '設備人 東京営業所',
    shortName: '東京営業所',
    address: {
      addressRegion: '東京都',
      addressCountry: 'JP',
    },
    formattedAddress: '東京都内対応',
    phone: SITE_PHONE,
    areaServed: ['東京都', '神奈川県', '埼玉県', '千葉県'],
    prefecturesServed: ['東京都', '神奈川県', '埼玉県', '千葉県'],
  },
  {
    key: 'nagoya',
    name: '設備人 名古屋営業所',
    shortName: '名古屋営業所',
    address: {
      streetAddress: '井瀬木1068-205',
      addressLocality: '北名古屋市',
      addressRegion: '愛知県',
      addressCountry: 'JP',
    },
    formattedAddress: '愛知県北名古屋市井瀬木1068-205',
    phone: SITE_PHONE,
    areaServed: ['名古屋市', '北名古屋市', '一宮市', '春日井市'],
    prefecturesServed: ['愛知県', '岐阜県', '三重県'],
  },
  {
    key: 'osaka',
    name: '設備人 大阪営業所',
    shortName: '大阪営業所',
    address: {
      streetAddress: '東豊中町六丁目3番10号',
      addressLocality: '豊中市',
      addressRegion: '大阪府',
      addressCountry: 'JP',
    },
    formattedAddress: '大阪府豊中市東豊中町六丁目3番10号',
    phone: SITE_PHONE,
    areaServed: ['大阪市', '豊中市', '吹田市', '堺市'],
    prefecturesServed: ['大阪府', '京都府', '奈良県', '和歌山県'],
  },
  {
    key: 'hyogo',
    name: '設備人 兵庫営業所',
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
    slug: 'electricity',
    label: '電気工事',
    href: '/electricity',
    description: 'ブレーカー・コンセント・照明などの電気まわりトラブルに対応します。',
    subServices: ELECTRICITY_SERVICES,
  },
  {
    slug: 'water',
    label: '水道工事',
    href: '/water',
    description: 'トイレ・キッチン・お風呂・洗面所の水まわりトラブルに対応します。',
    subServices: WATER_SERVICES,
  },
  {
    slug: 'pest-control',
    label: '害虫駆除',
    href: '/pest-control',
    description: 'ゴキブリ・シロアリ・ネズミなどの害虫害獣トラブルに対応します。',
    subServices: PEST_CONTROL_SERVICES,
  },
];

export const NAVIGATION: NavigationItem[] = [
  {
    label: '電気工事',
    href: '/electricity',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    children: toNavigationChildren(ELECTRICITY_SERVICES),
  },
  {
    label: '水道工事',
    href: '/water',
    icon: 'M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2C20 10.48 17.33 6.55 12 2z',
    children: toNavigationChildren(WATER_SERVICES),
  },
  {
    label: '害虫駆除',
    href: '/pest-control',
    icon: 'M14 12h-4l-1.5-3H5v2h2.2l1.1 2.2L7 17H5v2h3l2-4 2 4h3v-2h-2l-1.3-3.8L13.2 11H15v-2h-2.5L14 12zM20 5h-3.2L15 2l-1.4 1.4L15.2 5H8.8l1.6-1.6L9 2 7.2 5H4v2h1.1l.9 1.8H4v2h3l.3-.6L8.5 12h7l1.2-1.8.3.6h3V9h-2l.9-1.8H20V5z',
    children: toNavigationChildren(PEST_CONTROL_SERVICES),
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
    label: '施工事例',
    href: '/case',
  },
  {
    label: 'お客さまの声',
    href: '/voice',
  },
  {
    label: 'コラム',
    href: '/column',
  },
  {
    label: 'よくある質問',
    href: '/faq',
  },
  {
    label: 'お問い合わせ',
    href: '/contact',
  },
];
