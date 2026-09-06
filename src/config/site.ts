export interface SocialLinks { x?: string; line?: string; }
export interface SiteConfig {
  siteName: string; siteNameKana: string; siteUrl: string; logoPath: string;
  description: string; defaultOgImage: string; rssTitle: string; rssPath?: string; socialLinks: SocialLinks;
}
/** 公開前の差し替えを一箇所で完了できるプレースホルダー設定。 */
export const SITE_CONFIG: SiteConfig = Object.freeze({
  siteName: 'ウマノミカタ', siteNameKana: 'ウマノミカタ', siteUrl: 'https://example.com',
  logoPath: '/images/logo-placeholder.svg',
  description: '競馬をもっと深く、もっと楽しく。ウマノミカタは競馬の学びと分析を届けるメディアです。',
  defaultOgImage: '/images/og-default-placeholder.svg', rssTitle: 'ウマノミカタ｜競馬の読みもの',
  socialLinks: Object.freeze({}),
});
