import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        p: ['Pretendard', ...defaultTheme.fontFamily.sans],
        h: ['Hahmlet', ...defaultTheme.fontFamily.serif],
      },
      fontSize: {
        'px16-300': [
          '1rem',
          {
            fontWeight: 300,
            lineHeight: 'auto',
          },
        ],
        'px16-400': [
          '1rem',
          {
            fontWeight: 400,
            lineHeight: 'auto',
          },
        ],
        'px16-500': [
          '1rem',
          {
            fontWeight: 500,
            lineHeight: 'auto',
          },
        ],
        'px14-300': [
          '0.875rem',
          {
            fontWeight: 300,
            lineHeight: 'auto',
          },
        ],
        'px14-400': [
          '0.875rem',
          {
            fontWeight: 400,
            lineHeight: 'auto',
          },
        ],
        'px14-500': [
          '0.875rem',
          {
            fontWeight: 500,
            lineHeight: 'auto',
          },
        ],
        'px12-300': [
          '0.75rem',
          {
            fontWeight: 300,
            lineHeight: 'auto',
          },
        ],
        'px12-400': [
          '0.75rem',
          {
            fontWeight: 400,
            lineHeight: 'auto',
          },
        ],
        'px12-500': [
          '0.75rem',
          {
            fontWeight: 500,
            lineHeight: 'auto',
          },
        ],
        // 나중에 불편하면 추가하기
        /* 예시들 https://tailwindcss.com/docs/font-size
        https://velog.io/@rrrrrrrrrrrocky/Next.js-13-tailwindcss-%EC%B4%88%EA%B8%B0%EC%84%B8%ED%8C%85%ED%95%98%EA%B8%B0
        */
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.6s cubic-bezier(0.65, 0, 0.35, 1)',
        'accordion-up': 'accordion-up 0.6s cubic-bezier(0.61, 1, 0.88, 1)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
