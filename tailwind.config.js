/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './features/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontSize: {
        title: [
          "32px",
          {
            lineHeight: "46px",
            fontWeight: "700",
          },
        ],
        h1: [
          "24px",
          {
            lineHeight: "35px",
            fontWeight: "700",
          },
        ],
        h2: [
          "20px",
          {
            lineHeight: "29px",
            fontWeight: "700",
          },
        ],
        h3: [
          "18px",
          {
            lineHeight: "26px",
            fontWeight: "700",
          },
        ],
        h4: [
          "16px",
          {
            lineHeight: "23px",
            fontWeight: "700",
          },
        ],
        h5: [
          "14px",
          {
            lineHeight: "20px",
            fontWeight: "700",
          },
        ],
        body: [
          "14px",
          {
            lineHeight: "20px",
            fontWeight: "500",
          },
        ],
        body_pc: [
          "16px",
          {
            lineHeight: "24px",
            fontWeight: "400",
          },
        ],
        body_sp: [
          "14px",
          {
            lineHeight: "21px",
            fontWeight: "400",
          },
        ],
        small: [
          "12px",
          {
            lineHeight: "17px",
            fontWeight: "700",
          },
        ],
        timestamp: [
          "12px",
          {
            lineHeight: "18px",
            fontWeight: "400",
          },
        ],
        mini: [
          "10px",
          {
            lineHeight: "15px",
            fontWeight: "400",
          },
        ],
        mini_b: [
          "10px",
          {
            lineHeight: "14px",
            fontWeight: "700",
          },
        ],
      },
      colors: {
        gray: {
          white: "#FDFDFD",
          gray_lighter: "#F5F6F8",
          gray_light: "#EFEFEF",
          gray: "#D8D8D8",
          gray_dark: "#AFAFAF",
          black: "#3D3D3D",
          black_clear: "#3D3D3DCC",
        },
        core: {
          blue_dark: "#005B91",
          blue: "#307DC1",
          sky: "#55B9F8",
          green: "#BDED9A",
          yellow: "#FFE8A3",
          red: "#EB4E4D",
        },
        light: {
          blue_light: "#E5F4FF",
          green_light: "#E9FFD9",
          yellow_light: "#FDF8E9",
          red_light: "#FFE9E9",
        },
        tools: {
          gray: "#8A99A8",
          blue_light: "#DBEDFF",
          blue: "#439DF9",
          green_light: "#D0F6EE",
          green: "#3BD6B3",
          yellow_light: "#F6EDCF",
          yellow: "#EBC33D",
          orange_light: "#F6E4CF",
          orange: "#FFAE73",
          purple_light: "#F0DEF9",
          purple: "#9747FF",
        },
      },
      dropShadow: {
        drop_wide: "6px 0px 18px rgba(0, 0, 0, 0.06)",
      },
      screens: {
        pc: "800px",
        sp: "300px",
      },
      fontFamily: {
        'fantasy': ['Fantasy', 'serif'],
        'times': ['Times New Roman', 'serif'],
      }
    },
  },
  plugins: [
    require('preline/plugin'),
  ],
}
