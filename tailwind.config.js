/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#f2f7f1',
                    100: '#e1efe0',
                    200: '#c5e0c2',
                    300: '#9bca97',
                    400: '#75b06f',
                    500: '#55944f',
                    600: '#40753a',
                    700: '#345d31',
                    800: '#2b4a29',
                    900: '#243e23',
                    950: '#112210',
                },
                secondary: {
                    400: '#f87171',
                    500: '#ef4444',
                    600: '#dc2626',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Outfit', 'Inter', 'sans-serif'],
            },
            boxShadow: {
                'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
                'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            },
            borderRadius: {
                '2xl': '1rem',
                '3xl': '1.5rem',
            },
            backdropBlur: {
                xs: '2px',
            },
            animation: {
                'shake': 'shake 0.5s',
                'spin': 'spin 1s linear infinite',
            },
            keyframes: {
                shake: {
                    '0%, 100%': { transform: 'translateX(0)' },
                    '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
                    '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
                },
            },
        },
    },
    plugins: [],
}
