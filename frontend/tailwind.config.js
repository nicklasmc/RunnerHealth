/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'goldenrod': '#daa520 ',
        'runnerblue': '#003594',
      },
      screens: {
        'mobile': {'max': '800px'},
        'medium': {'max': '1151px'},
      },
      minWidth: {
        '150': '150px',
      },
      minHeight: {
        '20':'20px',
        '30':'30px',
        '50':'50px',
        '150':'150px',
        '300':'300px',
        '400':'400px',
        '500':'500px',
      },
    },
  },
  plugins: [],
};
