export interface NavigationChild { slug: string; label: string; href: string; }
export interface NavigationColumn { key: string; label: string; href: string; accent: 'electric' | 'water'; children: NavigationChild[]; }
export interface NavigationItem { label: string; href: string; icon?: string; children?: NavigationChild[]; columns?: NavigationColumn[]; }
/** Temporary compile-time seam for retained home-services shell. */
export const NAVIGATION: NavigationItem[] = [];
export const FOOTER_NAV = [] as Array<{ label: string; href?: string; children: Array<{ label: string; href: string }> }>;
