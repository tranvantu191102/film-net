/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-bg': 'rgb(28 ,28, 30)',
        'second-bg': '#fff',
        'primary': '#fff',
        'second': '#000',
        'gray-text': '#7C7D7D',
        'gray-bg': 'rgb(51,51,53)',
        'border': 'rgb(58,57,57)',
        'blue': 'rgb(81,121,255)',
        'red-text': '#FF9494',
        'green': '#008000'
      },
      fontSize: {
        sm: '12px',
        lg: '14px',
        base: '16px',
        '2lg': '18px',
        xl: '20px',
        '2xl': '26px',
        '3xl': '32px',

      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
    // ...
  ]
}