import {
  ELECTRICITY_SERVICES,
  WATER_SERVICES,
  type ServiceCategoryKey,
  type ServiceItem,
} from './services';

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

const toNavigationChildren = (services: ServiceItem[]): NavigationChild[] => {
  return services.map(({ slug, label, href }) => ({ slug, label, href }));
};

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

export interface FooterNavSection {
  label: string;
  href?: string;
  children: { label: string; href: string }[];
}

/** Footer nav giữ nhãn/nhóm biên tập riêng (khác NAVIGATION) — không derive. */
export const FOOTER_NAV: FooterNavSection[] = [
  {
    label: '水まわりサービス',
    href: '/water',
    children: [
      { label: 'トイレサービス', href: '/water/toilet' },
      { label: 'キッチンサービス', href: '/water/kitchen' },
      { label: 'お風呂サービス', href: '/water/bath' },
      { label: '洗面所サービス', href: '/water/washroom' },
    ],
  },
  {
    label: '電気まわりサービス',
    href: '/electricity',
    children: [
      { label: 'ブレーカーサービス', href: '/electricity/breaker' },
      { label: 'コンセントサービス', href: '/electricity/outlet' },
      { label: '照明サービス', href: '/electricity/lighting' },
      { label: 'アンテナ工事サービス', href: '/electricity/antenna' },
      { label: '給湯器交換サービス', href: '/electricity/water-heater' },
    ],
  },
  {
    label: '会社案内',
    href: '/company',
    children: [
      { label: '会社概要', href: '/company/about' },
      { label: '企業理念', href: '/company/philosophy' },
      { label: '採用ページ', href: '/company/recruit' },
      { label: '対応エリア', href: '/company/office' },
    ],
  },
  {
    label: 'はじめてご利用の方へ',
    children: [
      { label: '作業の流れ', href: '/flow' },
      { label: '施工事例', href: '/case' },
      { label: 'お客さまの声', href: '/voice' },
      { label: 'コラム', href: '/columns' },
      { label: 'よくある質問', href: '/faq' },
    ],
  },
  {
    label: 'サイト情報',
    children: [
      { label: '無料相談フォーム', href: '/contact' },
      { label: 'プライバシーポリシー', href: '/privacy' },
      { label: 'サイトマップ', href: '/sitemap' },
    ],
  },
];
