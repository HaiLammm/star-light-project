export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        navy: '#1B2A4A',
        orange: '#FF6B00',
        red: '#E53935',
        'section-gray': '#F5F5F5',
        'text-primary': '#333333',
        'text-secondary': '#666666',
        'border-light': '#E0E0E0',
      },
      fontFamily: {
        sans: ['"Noto Sans JP"', '"Hiragino Kaku Gothic ProN"', '"Yu Gothic"', '"Meiryo"', 'sans-serif'],
      },
    },
  },
};
