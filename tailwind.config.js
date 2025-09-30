/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'google-sans-code': ['Source Code Pro', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
        'zakartra-sans': ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
      },
      colors: {
        ocean: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        aqua: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
        },
        // Deep blue only for accents, not backgrounds
        deepBlue: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        coral: {
          50: '#fef7f0',
          100: '#fdeee0',
          200: '#fbd5c0',
          300: '#f8b896',
          400: '#f4926a',
          500: '#ff6f61',
          600: '#e25a2b',
          700: '#c04621',
          800: '#9a3a20',
          900: '#7c321f',
        },
        fishOrange: {
          50: '#fff8f0',
          100: '#ffeee0',
          200: '#ffd9b8',
          300: '#ffbe85',
          400: '#ff9a4f',
          500: '#ff7b1a',
          600: '#f05d00',
          700: '#c74700',
          800: '#9e3800',
          900: '#7f2e00',
        },
        seaweed: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        sand: {
          50: '#fffdfb',
          100: '#fff9f0', // soft light sand
          200: '#fff3e0',
          300: '#fce7c5',
          400: '#f8dca5',
          500: '#f4cf85',
          600: '#e2b96a',
          700: '#c99a52',
          800: '#a1783d',
          900: '#7c5a2d',
        },
        // Glow / Interaction accent colors
        bioluminescent: '#00F5D4',
        jellyfish: '#FF9FF3',
        reefYellow: '#F9C74F',
        pearl: '#F9FAFB',
        charcoal: '#1F2937',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'pulse-soft': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.glass': {
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        },
        '.glass-dark': {
          background: 'rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
        '.glass-ocean': {
          background: 'rgba(14, 165, 233, 0.08)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(14, 165, 233, 0.15)',
        },
        '.glass-aqua': {
          background: 'rgba(6, 182, 212, 0.08)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(6, 182, 212, 0.15)',
        },
        '.glass-coral': {
          background: 'rgba(240, 113, 66, 0.08)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(240, 113, 66, 0.15)',
        },
        '.glass-seaweed': {
          background: 'rgba(34, 197, 94, 0.08)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(34, 197, 94, 0.15)',
        },
        '.glass-sand': {
          background: 'rgba(255, 249, 240, 0.12)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 249, 240, 0.2)',
        },
        '.glow-soft': {
          boxShadow: '0 0 20px rgba(14, 165, 233, 0.2), 0 0 40px rgba(240, 113, 66, 0.1)',
        },
        '.glow-hover': {
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 0 20px rgba(56, 189, 248, 0.6), 0 0 40px rgba(56, 189, 248, 0.3)',
            transform: 'translateY(-2px)',
          }
        },
        '.glow-coral': {
          boxShadow: '0 0 20px rgba(240, 113, 66, 0.3)',
        },
        '.glow-seaweed': {
          boxShadow: '0 0 20px rgba(34, 197, 94, 0.3)',
        },
        '.glow-fishOrange': {
          boxShadow: '0 0 20px rgba(255, 123, 26, 0.3)',
        }
      }
      addUtilities(newUtilities)
    }
  ],
};
