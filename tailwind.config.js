/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'cardo': ['Cardo', 'serif'],
        'inter': ['Inter', 'sans-serif'],
        'jost': ['Jost', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'larsseit': ['Larsseit', 'sans'] 
      },
      zIndex: {
        '20': '20',
        '10':'10',
        '60':'60',
        '30':'30'
      },
      borderOpacity: {
        '50': '0.5',
        '30': '0.3',
      },
    },
  },
  plugins: [],
}