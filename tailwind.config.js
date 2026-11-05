/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          950: '#032a1f',
          900: '#064E3B',
          800: '#065F46',
          700: '#047857',
          600: '#059669',
          500: '#10B981',
          400: '#34D399',
          200: '#A7F3D0',
          100: '#D1FAE5',
          50: '#ECFDF5',
        },
        gold: {
          300: '#FDE68A',
          400: '#FCD34D',
          500: '#D4AF37',
          600: '#B8860B',
          700: '#926A06',
        },
      },
      fontFamily: {
        heading: ["'Sukhumvit Set'", "'Sukhumvit Tadmai'", 'var(--font-prompt)', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        body: ["'Sukhumvit Set'", "'Sukhumvit Tadmai'", 'var(--font-sarabun)', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      boxShadow: {
        'clean': '0 4px 20px -2px rgba(6, 78, 59, 0.06), 0 2px 6px -1px rgba(6, 78, 59, 0.04)',
        'clean-hover': '0 12px 30px -4px rgba(6, 78, 59, 0.12), 0 4px 8px -2px rgba(6, 78, 59, 0.06)',
        'emerald-glow': '0 0 25px rgba(4, 120, 87, 0.25)',
      },
    },
  },
  plugins: [],
};
