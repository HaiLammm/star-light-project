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

export interface EmailConfig {
  display: string;
  href: string;
  ariaLabel: string;
}

export interface SiteConfig {
  companyName: string;
  /** Cách đọc katakana — dùng làm `alternateName` để Google nhận diện tên site. */
  companyNameKana: string;
  companyNameEn: string;
  legalName: string;
  siteUrl: string;
  /** Đường dẫn tương đối tới logo dùng cho structured data (Organization/publisher). */
  logoPath: string;
  phone: PhoneConfig;
  email: EmailConfig;
  businessHours: string;
  /** Meta description mặc định cho trang không có mô tả riêng. */
  defaultDescription: string;
  /** Ảnh OG mặc định (đường dẫn tương đối) khi trang không truyền `ogImage`. */
  defaultOgImage: string;
  /** Tiêu đề RSS feed (thẻ `<link rel="alternate">` và `rss.xml`). */
  rssTitle: string;
  /** URL mạng xã hội chính thức (schema.org `sameAs`). Hiện chưa có kênh nào. */
  socialLinks: string[];
}

const SITE_PHONE: PhoneConfig = {
  display: '050-8896-6909',
  digits: '05088966909',
  href: 'tel:05088966909',
  ariaLabel: '無料電話 050-8896-6909',
};

export const SITE_CONFIG: SiteConfig = {
  companyName: '設備プロ',
  companyNameKana: 'セツビプロ',
  companyNameEn: 'Setsubit',
  legalName: '株式会社Hoaloha',
  siteUrl: 'https://www.setsubi-pro.net',
  logoPath: '/images/site_logo_no-mark.jpeg',
  phone: SITE_PHONE,
  email: {
    display: 'abcxyz@gmail.com',
    href: 'mailto:abcxyz@gmail.com',
    ariaLabel: 'メールでお問い合わせ abcxyz@gmail.com',
  },
  businessHours: '24時間365日',
  defaultDescription:
    '水漏れ・つまり・停電などの設備トラブルなら設備プロ（セツビプロ）。関東・関西エリアに24時間365日対応し、最短10分で駆けつけます。お見積り・出張費・キャンセル料はすべて無料です。',
  defaultOgImage: '/images/staff_bg.jpg',
  rssTitle: '設備プロ｜お役立ちコラム',
  socialLinks: [],
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
