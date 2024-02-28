/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'goldenrod': '#daa520 ',
        'runnerblue': '#061237',
      },
      screens: {
        'mobile': {'max': '800px'},
        'medium': {'max': '1151px'},
      },
      minWidth: {
        '150': '150px',
      },
      minHeight: {
        '150':'150px',
        '300':'300px',
        '400':'400px',
        '500':'500px',
      },
    },
  },
  plugins: [],
};
