import "../src/app/globals.css";

import type { Preview } from "@storybook/nextjs-vite";
import React from "react";

import { THEME_ATTRIBUTE } from "../src/components/UI/Foundations/theme/theme";
import { geistMono, geistSans } from "../src/fonts";

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: ["Design System", "Foundations", "UI"],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      sort: "requiredFirst",
    },
    layout: "padded",
    nextjs: { appDirectory: true },
    docs: {
      toc: true,
      story: {
        inline: false,
        iframeHeight: 400,
      },
    },
    a11y: {
      // A violation fails the story test (`pnpm test`), not just the panel.
      test: "error",
      config: {},
      options: {
        runOnly: {
          type: "tag",
          values: ["wcag2a", "wcag2aa", "wcag21aa"],
        },
      },
    },
  },
  tags: ["autodocs"],
  /**
   * Il tema è un attributo su `<html>`, non una preferenza di sistema: in
   * Storybook lo mette questa voce della toolbar, così le due versioni di un
   * componente si guardano una accanto all'altra invece di dipendere da come è
   * impostato il Mac di chi apre la pagina.
   */
  globalTypes: {
    theme: {
      description: "Tema chiaro o scuro",
      toolbar: {
        icon: "sun",
        items: [
          { value: "light", title: "Chiaro" },
          { value: "dark", title: "Scuro" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "light",
  },
  decorators: [
    (Story, context) => {
      document.documentElement.setAttribute(
        THEME_ATTRIBUTE,
        context.globals.theme === "dark" ? "dark" : "light",
      );

      return (
        <main
          className={`${geistSans.className} ${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Story />
        </main>
      );
    },
  ],
};

export default preview;
