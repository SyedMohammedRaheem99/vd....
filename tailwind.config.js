/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./pages/*.html",
    "./assets/js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0F1A2A',
        accent: '#C9A227',
        bg: '#F4F1EA',
        text: '#2E2E2E',
        muted: '#7A7A7A',
        'primary-dark': '#0a1220',
        'accent-light': '#d4b035',
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Poppins', 'sans-serif'],
        display: ['Marcellus', 'serif'],
        serif: ['Cormorant Garamond', 'serif'],
      },
      container: {
        center: true,
        padding: '1.5rem',
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1400px',
        },
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      letterSpacing: {
        'tighter': '-0.05em',
        'tight': '-0.025em',
        'normal': '0',
        'wide': '0.025em',
        'wider': '0.05em',
        'widest': '0.1em',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'slide-up-delay': 'slideUp 0.8s ease-out 0.2s forwards',
        'slide-up-delay-2': 'slideUp 0.8s ease-out 0.4s forwards',
        'typing': 'typing 2s steps(40, end) forwards',
        'blink': 'blink 0.75s step-end infinite',
        'counter': 'counter 2s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        typing: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        blink: {
          '0%, 100%': { borderColor: 'transparent' },
          '50%': { borderColor: '#C9A227' },
        },
        counter: {
          '0%': { opacity: '1' },
          '100%': { opacity: '1' },
        },
      },
      boxShadow: {
        'gold': '0 4px 14px 0 rgba(201, 162, 39, 0.3)',
        'gold-lg': '0 10px 40px 0 rgba(201, 162, 39, 0.4)',
        'card': '0 4px 20px rgba(15, 26, 42, 0.08)',
        'card-hover': '0 20px 50px rgba(15, 26, 42, 0.15)',
      },
    },
  },
  plugins: [],
}
