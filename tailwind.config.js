/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            animation: {
                'spin-slow': 'spin 2s linear infinite',
            },
            clipPath: {
                'triangle': 'polygon(50% 0%, 0% 100%, 100% 100%)',
            }
        },
    },
    plugins: [],
} 