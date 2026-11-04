/**{{=<% %>=}}
 * ESLint plugin: design-system – rule no-domain-vocabulary
 *
 * The design system may not know what the product sells. A word like "event",
 * "shop" or "newsletter" inside `components/UI` means a piece of this project's
 * domain has leaked into a layer meant to outlive it — usually as a prop name,
 * a magic string or an example in a JSDoc comment, none of which a type checker
 * would ever catch.
 *
 * @see docs/component-style-governance.md
 */

/**
 * A starting list of words that belong to a product, never to a UI library.
 * Each project replaces it with its own domain through the rule's `terms`
 * option in eslint.config.mjs (and widens it with `allow` when a word turns out
 * to have a UI meaning too).
 *
 * Deliberately excludes "event" and "article": in a UI library the first
 * belongs to the DOM (`addEventListener`, `pointer-events`) and the second is
 * an HTML element, so flagging them would cost more than it catches.
 */
const DEFAULT_TERMS = [
  "shop",
  "shops",
  "cart",
  "checkout",
  "customer",
  "customers",
  "news",
  "newsletter",
  "negozio",
  "negozi",
  "carrello",
  "cliente",
  "clienti",
];

/**
 * Only whole words, and never inside a hyphenated utility class: `news` is a
 * leak, `newsletter-signup` in a Tailwind class is not what this rule is for.
 */
const buildMatcher = (terms) =>
  new RegExp(`(?<![a-zA-Z-])(${terms.join("|")})(?![a-zA-Z-])`, "i");

const rule = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow product domain vocabulary inside the design system layer",
    },
    schema: [
      {
        type: "object",
        properties: {
          terms: { type: "array", items: { type: "string" } },
          allow: { type: "array", items: { type: "string" } },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      domainWord:
        "'{{word}}' is product vocabulary. The design system describes structure, not content — rename it, or move this to the application layer.",
    },
  },
  create(context) {
    const options = context.options[0] ?? {};
    const matcher = buildMatcher(options.terms ?? DEFAULT_TERMS);
    const allow = new Set((options.allow ?? []).map((w) => w.toLowerCase()));
    const source = context.sourceCode ?? context.getSourceCode();

    // `shopId`, `news_items`, `CartTotal` → separate words, so a domain term
    // inside a compound name is caught like a bare one.
    const splitWords = (name) =>
      name
        .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
        .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
        .replace(/_/g, " ");

    const report = (node, text) => {
      const match = matcher.exec(text);
      if (!match) return;
      if (allow.has(match[1].toLowerCase())) return;
      context.report({
        node,
        messageId: "domainWord",
        data: { word: match[1] },
      });
    };

    return {
      Program() {
        for (const comment of source.getAllComments()) {
          report(comment, comment.value);
        }
      },
      Identifier(node) {
        report(node, splitWords(node.name));
      },
      // Prop names in JSX (`<Card shopId={…}>`) are JSXIdentifiers.
      JSXIdentifier(node) {
        report(node, splitWords(node.name));
      },
      Literal(node) {
        if (typeof node.value === "string") report(node, node.value);
      },
      JSXText(node) {
        report(node, node.value);
      },
    };
  },
};

const plugin = { rules: { "no-domain-vocabulary": rule } };

export default plugin;
