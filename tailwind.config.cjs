module.exports = {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: { extend: {
    colors: {
      cinematic: {
        50: '#f7fbff',
        100: '#eef7ff',
        500: '#2563eb'
      }
    },
    boxShadow: {
      'xl-soft': '0 10px 30px rgba(2,6,23,0.12)',
    }
  } },
  plugins: [],
}
