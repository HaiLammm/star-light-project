export interface NavigationItem { label: string; href: string; }
export const PILLAR_NAVIGATION: readonly NavigationItem[] = Object.freeze([
  { label: '初心者向け', href: '/guide/' }, { label: 'レース分析', href: '/races/' },
  { label: 'ウマ娘×競馬', href: '/uma-musume/' }, { label: '用語集', href: '/glossary/' },
  // { label: '予想', href: '/yosou/' }, // Phase 2
]);
export const TRUST_MENU: readonly NavigationItem[] = Object.freeze([
  { label: '運営者情報', href: '/about/' }, { label: '編集方針', href: '/editorial-policy/' },
  { label: '責任あるギャンブル', href: '/responsible-gambling/' }, { label: 'プライバシーポリシー', href: '/privacy/' },
]);
export interface FooterNavSection { label: string; children: readonly NavigationItem[]; }
export const FOOTER_NAV: readonly FooterNavSection[] = Object.freeze([
  { label: '読む', children: PILLAR_NAVIGATION }, { label: '信頼について', children: TRUST_MENU },
  { label: '公式チャンネル', children: [{ label: 'X', href: '#' }, { label: 'LINE', href: '#' }] },
  { label: 'コンプライアンス', children: [{ label: '責任あるギャンブル', href: '/responsible-gambling/' }, { label: 'プライバシーポリシー', href: '/privacy/' }] },
]);
/** 既存シェル用。新しいリンクはまだ描画しない。 */
export const NAVIGATION: readonly NavigationItem[] = Object.freeze([]);
