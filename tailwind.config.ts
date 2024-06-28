import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  plugins: [],
  theme: {
    fontSize: {
      "title-large": [
        "6.75rem",
        {
          fontWeight: "400",
          letterSpacing: "-0.09375rem",
          lineHeight: "6.75rem",
        },
      ],
      title: [
        "3.375rem",
        {
          fontWeight: "500",
          letterSpacing: "0rem",
          lineHeight: "3.375rem",
        },
      ],
      "title-small": [
        "2.375rem",
        {
          fontWeight: "600",
          letterSpacing: "0rem",
          lineHeight: "2.375rem",
        },
      ],
      "subtitle-large": [
        "1.75rem",
        {
          fontWeight: "500",
          letterSpacing: "0rem",
          lineHeight: "1.75rem",
        },
      ],
      subtitle: [
        "1.375rem",
        {
          fontWeight: "500",
          letterSpacing: "0.009375rem",
          lineHeight: "1.375rem",
        },
      ],
      "body-large": [
        "1.625rem",
        {
          fontWeight: "500",
          letterSpacing: "0rem",
          lineHeight: "1.625rem",
        },
      ],
      body: [
        "1.25rem",
        {
          fontWeight: "500",
          letterSpacing: "0.009375rem",
          lineHeight: "1.25rem",
        },
      ],
      "body-small": [
        "1rem",
        {
          fontWeight: "500",
          letterSpacing: "0.009375rem",
          lineHeight: "1rem",
        },
      ],
    },
  },
};

export default config;
