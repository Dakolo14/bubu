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
          purple: '#33058D',
          ink: '#2E2E2E',
          muted: '#6B6B6B',
          bg: '#F2F2F2',
          line: '#E5E5E5',
          green: '#00A86B',
          orange: '#FF8A00',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      maxWidth: {
        site: '1200px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.08)',
        lift: '0 6px 18px rgba(0,0,0,0.12)',
      },
    },
  },
  plugins: [],
};
