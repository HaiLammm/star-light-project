/**
 * Design tokens dưới dạng tham chiếu CSS variable.
 *
 * Mã hex chỉ tồn tại ở đúng MỘT nơi: block `@theme` trong `src/styles/global.css`
 * (Tailwind v4 sinh utility `bg-navy`, `text-water`… từ đó). File này chỉ expose
 * chuỗi `var(--color-*)` / `var(--font-sans)` để dùng trong TS/JSX/inline style —
 * tuyệt đối không hardcode hex ở đây để tránh nguồn sự thật thứ hai.
 */
export const THEME = {
  navy: 'var(--color-navy)',
  orange: 'var(--color-orange)',
  red: 'var(--color-red)',
  sectionGray: 'var(--color-section-gray)',
  textPrimary: 'var(--color-text-primary)',
  textSecondary: 'var(--color-text-secondary)',
  borderLight: 'var(--color-border-light)',
  cream: 'var(--color-cream)',
  water: 'var(--color-water)',
  waterDeep: 'var(--color-water-deep)',
  waterTint: 'var(--color-water-tint)',
  electric: 'var(--color-electric)',
  electricDeep: 'var(--color-electric-deep)',
  electricTint: 'var(--color-electric-tint)',
  cta: 'var(--color-cta)',
  ctaDeep: 'var(--color-cta-deep)',
  borderWarm: 'var(--color-border-warm)',
} as const;

export const FONT_SANS = 'var(--font-sans)';
