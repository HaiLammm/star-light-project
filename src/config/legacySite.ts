import { SITE_CONFIG as IDENTITY } from '@config/site';
export interface PhoneConfig { display: string; digits: string; href: string; ariaLabel: string; }
export interface OfficeAddress { streetAddress?: string; addressLocality?: string; addressRegion: string; postalCode?: string; addressCountry: 'JP'; }
export interface RegionalOffice { key: string; name: string; shortName: string; address: OfficeAddress; formattedAddress: string; phone: PhoneConfig; areaServed: string[]; prefecturesServed: string[]; }
const phone: PhoneConfig = { display: '050-8896-6909', digits: '05088966909', href: 'tel:05088966909', ariaLabel: '無料電話 050-8896-6909' };
export const SITE_CONFIG = { ...IDENTITY, companyName: IDENTITY.siteName, companyNameKana: IDENTITY.siteNameKana, companyNameEn: IDENTITY.siteName, legalName: IDENTITY.siteName, phone, email: { display: '', href: '', ariaLabel: '' }, businessHours: '24時間365日' };
export const REGIONAL_OFFICES: RegionalOffice[] = [{ key: 'legacy', name: '設備プロ（互換表示）', shortName: '互換表示', address: { addressRegion: '東京都', addressCountry: 'JP' }, formattedAddress: '東京都（旧ページ互換用）', phone, areaServed: ['東京都'], prefecturesServed: ['東京都'] }];
