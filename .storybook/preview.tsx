import type { Preview } from "@storybook/react";
import { Dosis } from "next/font/google";
import React from "react";
import "../src/app/globals.css";

const dosis = Dosis({ subsets: ["latin"], weight: ["300", "400", "500", "600", "800"] });

const preview: Preview = {
  decorators: [
    (Story) => (
      <div className={dosis.className}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  tags: ["autodocs"],
};

export default preview;
