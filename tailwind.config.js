/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'background': '#222831',
        'text': '#EEEEEE',
        'input': '#393E46',
        'button': '#00ADB5',
      },
      fontFamily: {
        'reddit-mono': ['Reddit Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}

