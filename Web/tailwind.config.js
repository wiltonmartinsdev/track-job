/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [ "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
    theme: {
        extend: {fontFamily: {
			"roboto-flex": ["Roboto Flex", "sans-serif"],
			roboto: ["Roboto", "sans-serif"],
		},},
    },
  plugins: [require("tailwindcss-animate")],
}

