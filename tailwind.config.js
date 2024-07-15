/** @type {import("tailwindcss").Config} */
export default {
    content: [
        "./index.html", "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "primary": "var(--primary)",
                "secondary": "var(--secondary)",
                "tertiary": "var(--tertiary)",
                "border": "var(--border)",
                "accent": "var(--accent)",
                "accent-hover": "var(--accent-hover)",
                "text-primary": "var(--text-primary)",
                "text-secondary": "var(--text-secondary)",
            },
        },
    },
    plugins: [
        require("@tailwindcss/typography"),
    ],
};
