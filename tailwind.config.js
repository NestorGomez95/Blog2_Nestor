module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './styles/**/*.{css}', 
  ],
  theme: {
    extend: {
      colors: {
        neonGreen: '#39FF14',
        neonBlue: '#1F51FF',
        neonPink: '#FF1493',
        neonPurple: '#8A2BE2',
        darkBg: '#1A1A1D',
        darkSurface: '#2E2E3A',
      },
    },
  },
  plugins: [],
}

