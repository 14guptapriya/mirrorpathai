/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          hover: '#1D4ED8',
        },
        secondary: {
          DEFAULT: '#1D4ED8',
          hover: '#173EAB',
        },
        accent: {
          DEFAULT: '#60A5FA',
          light: '#93C5FD',
        },
        background: '#F8FAFC',
        surface: '#FFFFFF',
      },
      boxShadow: {
        'premium': '0 10px 30px -10px rgba(148, 163, 184, 0.12), 0 1px 3px rgba(148, 163, 184, 0.04)',
        'premium-hover': '0 20px 40px -15px rgba(37, 99, 235, 0.12), 0 1px 5px rgba(37, 99, 235, 0.05)',
        'soft': '0 8px 30px rgba(0, 0, 0, 0.03)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
      },
      animation: {
        'blob': 'blob 7s infinite',
        'shimmer': 'shimmer 2s infinite linear',
        'pulse-subtle': 'pulse-subtle 3s infinite ease-in-out',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.95)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: 0.6, transform: 'scale(1)' },
          '50%': { opacity: 0.9, transform: 'scale(1.05)' },
        }
      }
    },
  },
  plugins: [],
}
