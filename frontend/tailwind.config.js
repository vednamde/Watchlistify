/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    "bg-gradient-to-b",
    "from-[#0f0f0f]",
    "via-[#141414]",
    "to-[#181818]",
    "shadow-red-700/40",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/line-clamp"),   // ⬅️ Tailwind plugin
  ],
};
