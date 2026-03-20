module.exports = {
  content: [
    "./app/**/*.{tsx,jsx,ts,js}",
    "./components/**/*.{tsx,jsx,ts,js}",
    "./hooks/**/*.{tsx,jsx,ts,js}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}