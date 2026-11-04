import { RuleTester } from "eslint";{{=<% %>=}}
import { afterAll, describe, it } from "vitest";

import domainVocabulary from "../design-system-no-domain-vocabulary.mjs";
import visualOverrides from "../design-system-no-visual-overrides.mjs";

// RuleTester hooks into the test framework's globals; point it at vitest's.
RuleTester.describe = describe;
RuleTester.it = it;
RuleTester.afterAll = afterAll;

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    parserOptions: { ecmaFeatures: { jsx: true } },
  },
});

const UI = { includeImportedFrom: ["@/components/UI/"] };
const importButton = 'import { Button } from "@/components/UI/Atoms/Button";\n';
const importCard = 'import Card from "@/components/UI/Molecules/Card";\n';

ruleTester.run(
  "design-system/no-visual-overrides",
  visualOverrides.rules["no-visual-overrides"],
  {
    valid: [
      { code: `${importButton}<Button className="mt-4" />`, options: [UI] },
      { code: `${importButton}<Button variant="ghost" />`, options: [UI] },
      // Not a design-system component: out of scope.
      { code: `<div className="bg-red-500 p-4" />`, options: [UI] },
      // Layout classes are composition unless `strict`.
      { code: `${importButton}<Button className="w-full" />`, options: [UI] },
    ],
    invalid: [
      {
        code: `${importButton}<Button className="bg-red-500" />`,
        options: [UI],
        errors: [{ messageId: "noVisualOverride" }],
      },
      {
        // Static part of a template literal with an interpolation.
        code: `${importButton}<Button className={\`p-4 \${x}\`} />`,
        options: [UI],
        errors: [{ messageId: "noVisualOverride" }],
      },
      {
        // A compound component's part reached through its imported root.
        code: `${importCard}<Card.Media className="rounded-none" />`,
        options: [UI],
        errors: [{ messageId: "noVisualOverride" }],
      },
      {
        code: `${importButton}<Button buttonProps={{ className: "shadow-lg" }} />`,
        options: [UI],
        errors: [{ messageId: "noVisualOverride" }],
      },
      {
        code: `${importButton}<Button className="w-full" />`,
        options: [{ ...UI, strict: true }],
        errors: [{ messageId: "noVisualOverride" }],
      },
    ],
  },
);

ruleTester.run(
  "design-system-domain/no-domain-vocabulary",
  domainVocabulary.rules["no-domain-vocabulary"],
  {
    valid: [
      { code: "const items = [];" },
      // Hyphenated utility classes are not vocabulary.
      { code: 'const c = "newsletter-signup";' },
      { code: "const shopId = 1;", options: [{ allow: ["shop"] }] },
      { code: "const product = 1;" },
    ],
    invalid: [
      {
        code: "const shop = 1;",
        errors: [{ messageId: "domainWord", data: { word: "shop" } }],
      },
      {
        // Compound names are split before matching.
        code: "const shopId = 1;",
        errors: [{ messageId: "domainWord", data: { word: "shop" } }],
      },
      {
        code: "const news_items = [];",
        errors: [{ messageId: "domainWord", data: { word: "news" } }],
      },
      {
        code: "<Card cartTotal={1} />",
        languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
        errors: [{ messageId: "domainWord", data: { word: "cart" } }],
      },
      {
        code: "const product = 1;",
        options: [{ terms: ["product"] }],
        errors: [{ messageId: "domainWord", data: { word: "product" } }],
      },
    ],
  },
);
