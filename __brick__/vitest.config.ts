import { fileURLToPath } from "node:url";

import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";

const dirname = fileURLToPath(new URL(".", import.meta.url));

/**
 * Two projects, one `pnpm test`:
 * - `storybook`: every *.stories.tsx becomes a test that renders the story in
 *   a real browser and runs its play function plus the a11y checks configured
 *   in .storybook/preview.tsx (a violation fails the test);
 * - `eslint-rules`: the design-system ESLint rules in eslint/, on Node;
 * - `unit`: application logic (`*.test.ts` files under src/), on Node.
 */
export default defineConfig({
  test: {
    projects: [
      {
        plugins: [storybookTest({ configDir: `${dirname}.storybook` })],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [{ browser: "chromium" }],
          },
        },
      },
      {
        test: {
          name: "eslint-rules",
          environment: "node",
          include: ["eslint/**/*.test.mjs"],
        },
      },
      {
        resolve: { alias: { "@": `${dirname}src` } },
        test: {
          name: "unit",
          environment: "node",
          include: ["src/**/*.test.ts"],
        },
      },
    ],
  },
});
