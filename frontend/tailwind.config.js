/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-base': '#0F111A',
        'electric-blue': '#00AFFF',
        'neon-green': '#00FF7F',
      },
      fontFamily: {
        'heading': ['Inter', 'Montserrat', 'sans-serif'],
        'body': ['Roboto', 'Inter', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(0, 175, 255, 0.5), 0 0 10px rgba(0, 175, 255, 0.3)' },
          '100%': { boxShadow: '0 0 10px rgba(0, 175, 255, 0.8), 0 0 20px rgba(0, 175, 255, 0.5)' },
        },
      },
    },
  },
  plugins: [],
}


