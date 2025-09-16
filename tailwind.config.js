/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          purple: '#5E21D1',
          'purple-dark': '#5C2AA4',
          green: '#3BD997',
          'green-dark': '#2BCD74',
        },
        neutral: {
          black: '#000000',
          'dark-gray': '#222222',
          'medium-gray': '#2B2B2B',
          gray: '#888888',
          'light-gray': '#979797',
          'very-light-gray': '#F0F0F0',
          'off-white': '#F4F5F8',
          white: '#FFFFFF',
        },
        accent: {
          blue: '#337AB7',
          cyan: '#1AD2DC',
          orange: '#FFB343',
          red: '#BF2600',
          'red-bright': '#EF4C47',
          pink: '#EE60FC',
        },
      },
      fontFamily: {
        sans: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'Roboto', 'Helvetica Neue', 'Segoe UI', 'sans-serif'],
      },
      fontSize: {
        xs: '11px',
        sm: '12px',
        base: '14px',
        md: '16px',
        lg: '18px',
        xl: '20px',
        '2xl': '34px',
        '3xl': '55px',
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '48px',
        '3xl': '64px',
      },
      borderRadius: {
        sm: '4px',
        md: '10px',
        lg: '20px',
        xl: '40px',
        full: '100px',
      },
      boxShadow: {
        sm: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        md: '0px 4px 10px rgba(0, 0, 0, 0.15)',
        lg: '0px 10px 30px rgba(0, 0, 0, 0.15)',
        xl: '0px 30px 70px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
}