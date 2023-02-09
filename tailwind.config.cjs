/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			keyframes: {
				animateIn: {
					'0%': { opacity: 0 },
					'100%': { opacity: 1 },
				},
				animateOut: {
					'0%': { opacity: 1 },
					'100%': { opacity: 0 },
				},
			},
		},
	},
	plugins: [],
}
