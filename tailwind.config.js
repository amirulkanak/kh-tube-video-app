/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html', './assets/**/*.js'],
  theme: {
    extend: {
      // Custom media queries screen size
      screens: {
        tab: '834px',
        pc: '1170px',
      },
      // Custom font family
      fontFamily: {
        manrope: ['"Inter"', 'sans-serif'],
      },
      // Custom colors
      colors: {
        'clr-gray': '#171717',
      },
      backgroundImage: {
        'header-bg':
          'linear-gradient(0deg, #FFF 0%, rgba(255, 255, 255, 0.00) 100%)',
        'connect-bg':
          'linear-gradient(0deg, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.3) 50%), url("../images/contact-bg.jpg")',
      },
      // Grid template rows
      gridTemplateRows: {
        '4-h-14.2': '14.2rem 14.2rem 12.58rem 14.2rem',
        '2-h-14.2': '14.2rem 14.2rem',
        '2-h-22.3': '22.3125rem 22.3125rem',
      },
    },
  },
  plugins: [require('daisyui')],

  // Config for daisyUI
  daisyui: {
    themes: ['light'], // only 'light' theme available
    prefix: 'da-', // change prefix for all classes
  },
};
