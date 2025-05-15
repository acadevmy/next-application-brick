import type { Preview } from "@storybook/react";
import "../src/app/globals.css";
import nextIntl from "./next-intl";
import { inter, geistMono } from "../src/fonts";

import { NuqsAdapter } from "nuqs/adapters/react";
import React from "react";

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
