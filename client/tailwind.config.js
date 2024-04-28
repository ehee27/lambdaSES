/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      serif: ['Madimi One'],
    },
    extend: {
      keyframes: {
        fadein: {
          from: {
            opacity: '0',
            // transform: 'translateY(-20px)',
          },
          to: {
            opacity: '1',
            // transform: 'translateY(0)',
          },
        },
        slidedown: {
          from: {
            opacity: '0',
            transform: 'translateY(-20px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        slideright: {
          from: {
            opacity: '0',
            transform: 'translateX(-40px)',
          },
          to: {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
      },
      animation: {
        fadin: 'fadein 1s ease 500ms',
        slidedown300: 'slidedown 1s ease 300ms forwards',
        slidedown500: 'slidedown 1s ease 500ms forwards',
        slidedown700: 'slidedown 1s ease 700ms forwards',
        //
        slideright300: 'slideright 1s ease 300ms forwards',
        slideright500: 'slideright 1s ease 500ms forwards',
        slideright700: 'slideright 1s ease 700ms forwards',
      },
    },
  },
  plugins: [],
}
