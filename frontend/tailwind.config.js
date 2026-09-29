/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ncct: {
          navy: '#0B2A4A',
          'navy-dark': '#071A2E',
          'navy-light': '#143C66',
          blue: '#1976D2',
          'blue-light': '#EAF5FB',
          cyan: '#19A7CE',
          'cyan-light': '#E1F6FB',
          orange: '#F28C28',
          'orange-light': '#FEF3E8',
          green: '#2E9D59',
          'green-light': '#EAF7EF',
          bg: '#F7FAFC',
          text: '#172033',
          muted: '#5A6A85',
          border: '#E2E8F0'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'card': '0 4px 6px -1px rgba(11, 42, 74, 0.05), 0 2px 4px -1px rgba(11, 42, 74, 0.03)',
        'card-hover': '0 10px 15px -3px rgba(11, 42, 74, 0.08), 0 4px 6px -2px rgba(11, 42, 74, 0.04)',
      }
    },
  },
  plugins: [],
}
