/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      
      },
    },
    extend: {
      colors: {
        'primary-500': '#58CAF1', // Light blue accent (changed from #239AD5)
        'primary-600': '#239AD5', // Ocean blue (moved from primary-500)
        'primary-700': '#158ACB', // Deeper ocean blue (moved from primary-600)
        'secondary-500': '#39AFE2', // Bright sky blue
        'secondary-600': '#19A2B0', // Teal accent
        'accent-1': '#58CAF1', // Light blue accent
        'accent-2': '#88EDFC', // Bright aqua
        'ocean-blue': '#239AD5', // Main ocean blue
        'ocean-teal': '#61D0CA', // Ocean teal
        'aqua-light': '#88EDFC', // Light aqua
        'aqua-dark': '#19A2B0', // Dark aqua
        'gray-ocean': '#9EA092', // Ocean gray
        'gray-light': '#C1CAC7', // Light gray
        'sage': '#E7E2D5', // Sage/beige
        'slate-blue': '#4C97A3', // Slate blue
        'steel-blue': '#6A8589', // Steel blue
        'powder-blue': '#88C0C4', // Powder blue
        'charcoal': '#304C52', // Dark charcoal
        'off-white': '#F0F4FF',
        'red': '#FF5A5A',
        'dark-1': '#FFFFFF', // Pure white background
        'dark-2': '#61D0CA', // Ocean teal - for cards and secondary elements
        'dark-3': '#88EDFC', // Bright aqua - for interactive elements
        'dark-4': '#19A2B0', // Dark aqua - for borders and accents
        'light-1': '#FFFFFF',
        'light-2': '#F6F6FF', // Slight purple tint
        'light-3': '#9F9FBB', // More vibrant light purple
        'light-4': '#7E7E99', // Deeper light purple
        'gold-1': '#FFD700', // Premium gold
      },
      screens: {
        'xs': '480px',
      
      },
      width: {
        '420': '420px',
        '465': '465px',
      },
      scale: {
        '102': '1.02',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'slide-in-left': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.8 },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(5deg)' },
        },
        'float-medium': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(-5deg)' },
        },
        'float-fast': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-8px) rotate(3deg)' },
        },
        'glow': {
          '0%, 100%': { boxShadow: '0 0 5px rgba(157, 110, 249, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(157, 110, 249, 0.8)' },
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-in-right': 'slide-in-right 0.3s ease-out',
        'slide-in-left': 'slide-in-left 0.3s ease-out',
        'pulse-subtle': 'pulse-subtle 3s infinite ease-in-out',
        'float': 'float 6s infinite ease-in-out',
        'float-slow': 'float-slow 8s infinite ease-in-out',
        'float-medium': 'float-medium 6s infinite ease-in-out',
        'float-fast': 'float-fast 4s infinite ease-in-out',
        'glow': 'glow 2s infinite ease-in-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
