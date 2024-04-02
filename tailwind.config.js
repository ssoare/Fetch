/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        'soare': '10px 5px 5px rgba(0, 0, 0, 1)',
        'soare2': [
            '10px 5px 5px red',
        ]
      }
    },
  },
  plugins: [],
}