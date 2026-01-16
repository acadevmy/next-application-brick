import "../src/app/globals.css";

import type { Preview } from "@storybook/nextjs-vite";
import { NuqsAdapter } from "nuqs/adapters/react";
import React from "react";

import { geistMono, inter } from "../src/fonts";
import nextIntl from "./next-intl";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "fullscreen",
    nextIntl,
    nextjs: { appDirectory: true },
  },
  tags: ["autodocs"],
  initialGlobals: {
    locale: "it",
    locales: {
      it: "Italiano",
      en: "English",
    },
  },
  decorators: [
    (Story) => (
      <main className={`${inter.className} ${geistMono.variable} antialiased`}>
        <NuqsAdapter>
          <Story />
        </NuqsAdapter>
      </main>
    ),
  ],
};

export default preview;
