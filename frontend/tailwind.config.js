// const defaultTheme = require("tailwindcss/defaultTheme");

// module.exports = {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {
//       fontFamily: {
//         sans: ["Inter var", ...defaultTheme.fontFamily.sans],
//       },
//       colors: {
//         primary: {
//           50: "#f0f9ff",
//           100: "#e0f2fe",
//           200: "#bae6fd",
//           300: "#7dd3fc",
//           400: "#38bdf8",
//           500: "#0ea5e9",
//           600: "#0284c7",
//           700: "#0369a1",
//           800: "#075985",
//           900: "#0c4a6e",
//         },
//       },
//       animation: {
//         "spin-slow": "spin 3s linear infinite",
//       },
//     },
//   },
//   plugins: [require("@tailwindcss/forms")],
// };
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f8fafc",
          100: "#f1f5f9",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
        },
      },
    },
  },
  plugins: [],
};
