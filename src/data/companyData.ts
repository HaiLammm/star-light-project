export interface CompanyCard {
  title: string;
  href: string;
  image: string;
  imageAlt: string;
}

export const COMPANY_OVERVIEW = {
  title: '設備人について',
  body: '設備人は、水まわり・電気まわりのトラブルに24時間365日対応する生活インフラサービス会社です。東京・名古屋・大阪・兵庫の4拠点から、お客様の不安を1分でも早く取り除くため、迅速な対応と丁寧な接客をお約束します。',
  philosophySummary: '私たちは「お客様の不安を1分でも早く取り除く」ことを企業理念に掲げ、優れた技術と心温まる接客で安心を提供することを使命としています。',
};

export const COMPANY_CARDS: CompanyCard[] = [
  {
    title: '会社概要',
    href: '/company/about',
    image: '/images/company/company_card_01.jpg',
    imageAlt: '会社概要',
  },
  {
    title: '企業理念',
    href: '/company/philosophy',
    image: '/images/company/company_card_02.jpg',
    imageAlt: '企業理念',
  },
  {
    title: '採用情報',
    href: '/company/recruit',
    image: '/images/company/company_card_03.jpg',
    imageAlt: '採用情報',
  },
  {
    title: '対応可能エリア',
    href: '/company/office',
    image: '/images/company/company_card_04.jpg',
    imageAlt: '対応可能エリア',
  },
];

