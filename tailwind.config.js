/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        heartbeat: 'heartbeat 1s ease-in-out infinite', // Pulse animation
      },
      keyframes: {
        heartbeat: {
          '0%': { transform: 'scaleX(1)' },
          '50%': { transform: 'scaleX(1.1)' },
          '100%': { transform: 'scaleX(1)' },
        },
      },
    },
  },
  plugins: [],
}

