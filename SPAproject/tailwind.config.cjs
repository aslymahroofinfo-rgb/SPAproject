/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,ts}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Public Sans"', 'sans-serif']
      },
      colors: {
        brand: {
          50: '#eefef6',
          100: '#d7fce9',
          200: '#b3f8d5',
          300: '#7defb7',
          400: '#41dd95',
          500: '#18c778',
          600: '#0da561',
          700: '#0f8450',
          800: '#106842',
          900: '#0f5638'
        },
        ember: {
          500: '#ff7a46',
          600: '#ec5e2d',
          700: '#bd4520'
        }
      },
      boxShadow: {
        lift: '0 22px 55px -30px rgba(6, 28, 20, 0.65)',
        halo: '0 0 0 1px rgba(24, 199, 120, 0.25), 0 20px 45px -30px rgba(7, 64, 42, 0.9)'
      },
      borderRadius: {
        xxl: '1.25rem'
      }
    }
  },
  plugins: []
};

