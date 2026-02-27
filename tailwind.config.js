/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f8f7ff',
          100: '#f0edff',
          200: '#e0dbff',
          300: '#d1c9ff',
          400: '#b3a4ff',
          500: '#9580ff',
          600: '#7c5cff',
          700: '#6b4bde',
          800: '#563bb1',
          900: '#472c8a',
        },
        dark: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        lg: '12px',
      },
      boxShadow: {
        glow: '0 0 20px rgba(149, 128, 255, 0.5)',
        'glow-lg': '0 0 40px rgba(149, 128, 255, 0.7)',
      },
    },
  },
  plugins: [],
};
