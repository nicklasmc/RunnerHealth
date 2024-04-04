/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      borderColor: {
        'goldenrod': '#daa520 ',
        'runnerblue': '#003594',
      },
      colors: {
        'goldenrod': '#daa520 ',
        'runnerblue': '#003594',
      },
      screens: {
        'mobile': {'max': '800px'},
        'medium': {'max': '1151px'},
      },
      minWidth: {
        '25%': '25%',
        '33%': '33%',
        '50%': '50%',
        '755%': '75%',
        '90%': '90%',
        '50': '50px',
        '100': '100px',
        '150': '150px',
        '300': '300px',
        '400': '400px',
      },
      minHeight: {
        '50%': '50%',
        '20':'20px',
        '30':'30px',
        '50':'50px',
        '150':'150px',
        '300':'300px',
        '400':'400px',
        '500':'500px',
      },
      maxWidth: {
        '50%': '50%',
        '25%': '25%',
        '50': '50px',
        '100': '100px',
        '150': '150px',
      },
    },
  },
  plugins: [],
};
