import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1B3A5C',
          dark: '#0d2137',
          light: '#2a5580',
        },
        turquoise: {
          DEFAULT: '#2A7DA6',
          light: '#5ab8d8',
          dark: '#1a5d80',
        },
        orange: {
          DEFAULT: '#E87C2B',
          light: '#f5a64c',
          dark: '#c4601a',
        },
        teal: '#0D7989',
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
      },
      spacing: {
        '4.5': '1.125rem',
      },
      animation: {
        'fade-up': 'fadeUp 0.55s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in': 'fadeIn 0.6s ease-out both',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both',
        'slide-left': 'slideLeft 0.6s ease-out both',
        'slide-right': 'slideRight 0.6s ease-out both',
        'float': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
      boxShadow: {
        'glow-orange': '0 0 40px rgba(232,124,43,0.35)',
        'glow-turquoise': '0 0 40px rgba(42,125,166,0.35)',
        'glow-white': '0 0 60px rgba(255,255,255,0.1)',
        'card': '0 4px 24px rgba(0,0,0,0.06)',
        'card-hover': '0 12px 40px rgba(0,0,0,0.12)',
        'hero': '0 25px 60px rgba(0,0,0,0.3)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'mesh-gradient': 'linear-gradient(135deg, #1B3A5C 0%, #0d3a5c 50%, #0a1e30 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
