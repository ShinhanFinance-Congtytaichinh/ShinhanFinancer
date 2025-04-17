/** @type {import('tailwindcss').Config} */
     module.exports = {
       content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
       theme: {
         extend: {
           colors: {
             'blue-900': '#004080',
             'blue-300': '#60A5FA',
           },
           fontFamily: {
             roboto: ['Roboto', 'sans-serif'],
           },
         },
       },
       plugins: [],
     };