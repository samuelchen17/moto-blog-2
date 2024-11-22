const flowbite = require("flowbite-react/tailwind");
const typography = require("@tailwindcss/typography");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      colors: { background: " #121212" },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            "--tw-prose-bullets": theme("colors.pink[400]"),
            li: {
              p: {
                margin: 0,
              },
            },
          },
        },
      }),
    },
  },
  plugins: [flowbite.plugin(), typography],
};
