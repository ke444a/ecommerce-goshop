/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        container: {
            center: true
        },
        extend: {
            screens: {
                xs: "500px"
            },
            colors: {
                dark: "#1E293B",
                secondary: "#64748B",
                primary: "#1B46C2",
            },
            fontFamily: {
                "sans": ["Noto Sans", "sans-serif"],
            },
            dropShadow: {
                "custom": "0px 1px 2px 0px rgba(51, 65, 86, 0.08)"
            },
            backgroundImage: {
                "customGradient": "linear-gradient(180deg, rgba(255, 255, 255, 0.08) 16.33%, rgba(0, 0, 0, 0.40) 100%)",
                "auth": "url('/src/assets/images/Auth/auth-bg.webp')",
                "showcase": "url('/src/assets/images/Home/showcase.webp')",
                "newArrivals": "url('/src/assets/images/Home/new-arrivals-section.webp')",
                "discounts": "url('/src/assets/images/Home/discounts-section.webp')"
            },
            backgroundColor: {
                "black-cover": "rgba(10, 10, 10, 0.65)",
                "main-gray": "#F9FAFB" 
            },
            boxShadow: {
                "blur": "0px 12px 16px -4px rgba(12, 26, 36, 0.04)"
            },
            keyframes: {
                "dropdownScale": {
                    "0%": { transform: "scale(0)" },
                    "100%": { transform: "scale(1)" }
                },
                "fadeIn": {
                    "0%": { opacity: 0.2 },
                    "25%": { opacity: 0.4 },
                    "50%": { opacity: 0.6 },
                    "75%": { opacity: 0.8 },
                    "100%": { opacity: 1.0 },
                }
            },
            animation: {
                dropdown: "dropdownScale .2s",
                fadeIn: "fadeIn .2s ease-in-out",
            }
        },
    },
    plugins: [],
};

