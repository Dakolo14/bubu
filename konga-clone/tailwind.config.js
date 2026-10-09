/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        konga: {
          DEFAULT: '#ED017F',
          dark: '#C70069',
          light: '#FDE6F2',
          blush: '#FDE8EC',
          orange: '#F7941D',
          gold: '#FDB913',
          green: '#22A447',
          deal: '#1F9D55',
          trend: '#3F7E3B',
          purple: '#33058D',
          ink: '#333333',
          muted: '#8A8A8A',
          bg: '#F2F2F2',
          line: '#E8E8E8',
          skin: '#C9F2E2',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      maxWidth: {
        site: '1312px',
      },
      screens: {
        '3xl': '1640px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(0,0,0,0.06)',
        lift: '0 6px 18px rgba(0,0,0,0.12)',
      },
    },
  },
  plugins: [],
};
