/**{{=<% %>=}}
 * ESLint plugin: design-system – rule no-visual-overrides
 * Isolated from eslint.config.mjs for maintainability.
 * @see docs/component-style-governance.md
 */

/** Paint: never an override, wherever the component is used. */
const VISUAL_PATTERNS = [
  /^text-/,
  /^bg-/,
  /^font-/,
  /^p[xytblr]?-/,
  /^rounded/,
  /^border/,
  /^shadow/,
];

/**
 * Size and rhythm. Inside the design system these are legitimate composition —
 * a section sizes the carousel it wraps. From outside they are a call site
 * reaching in, which is what the `strict` mode forbids.
 */
const LAYOUT_PATTERNS = [/^w-/, /^max-w-/, /^min-w-/, /^grid-cols-/, /^gap-/];

const normalizeClassToken = (token) => {
  const unprefixed = token.split(":").pop() ?? token;
  return unprefixed.startsWith("!") ? unprefixed.slice(1) : unprefixed;
};

const extractStaticClassStrings = (node) => {
  if (!node) return [];

  if (node.type === "Literal" && typeof node.value === "string") {
    return [node.value];
  }

  // `p-4 ${x}`: the static parts are checked as written (joined by spaces so
  // a class is never glued to an interpolation), and the interpolated
  // expressions are walked like any other value.
  if (node.type === "TemplateLiteral") {
    return [
      node.quasis.map((q) => q.value.cooked ?? "").join(" "),
      ...node.expressions.flatMap((expression) =>
        extractStaticClassStrings(expression),
      ),
    ];
  }

  if (node.type === "JSXExpressionContainer") {
    return extractStaticClassStrings(node.expression);
  }

  if (node.type === "CallExpression") {
    return node.arguments.flatMap((arg) => extractStaticClassStrings(arg));
  }

  if (node.type === "ArrayExpression") {
    return node.elements.flatMap((element) =>
      extractStaticClassStrings(element),
    );
  }

  if (node.type === "ConditionalExpression") {
    return [
      ...extractStaticClassStrings(node.consequent),
      ...extractStaticClassStrings(node.alternate),
    ];
  }

  if (node.type === "LogicalExpression") {
    return extractStaticClassStrings(node.right);
  }

  return [];
};

const designSystemNoVisualOverridesRule = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow visual style overrides on design-system components via className",
    },
    schema: [
      {
        type: "object",
        properties: {
          components: {
            type: "array",
            items: { type: "string" },
          },
          includeImportedFrom: {
            type: "array",
            items: { type: "string" },
          },
          ignoreComponents: {
            type: "array",
            items: { type: "string" },
          },
          strict: { type: "boolean" },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      noVisualOverride:
        "Avoid visual override '{{token}}' on '{{component}}'. Use component variants/props; keep className for layout/placement edge cases only.",
    },
  },
  create(context) {
    const options = context.options[0] ?? {};
    const configuredComponents = options.components;
    const includeImportedFrom = options.includeImportedFrom ?? [];
    const ignoreComponents = new Set(options.ignoreComponents ?? []);
    const patterns = options.strict
      ? [...VISUAL_PATTERNS, ...LAYOUT_PATTERNS]
      : VISUAL_PATTERNS;
    const components = new Set(
      configuredComponents?.length ? configuredComponents : ["Badge"],
    );
    const importedUiComponents = new Set();
    const importedUiNamespaces = new Set();

    return {
      ImportDeclaration(node) {
        const source = node.source.value;
        if (typeof source !== "string") return;
        if (
          includeImportedFrom.length > 0 &&
          !includeImportedFrom.some((prefix) => source.startsWith(prefix))
        ) {
          return;
        }

        node.specifiers.forEach((specifier) => {
          if (
            specifier.type === "ImportSpecifier" ||
            specifier.type === "ImportDefaultSpecifier"
          ) {
            importedUiComponents.add(specifier.local.name);
            return;
          }

          if (specifier.type === "ImportNamespaceSpecifier") {
            importedUiNamespaces.add(specifier.local.name);
          }
        });
      },
      JSXOpeningElement(node) {
        let componentName = "";
        let isImportedUiComponent = false;

        if (node.name.type === "JSXIdentifier") {
          componentName = node.name.name;
          isImportedUiComponent = importedUiComponents.has(componentName);
        } else if (
          node.name.type === "JSXMemberExpression" &&
          node.name.object.type === "JSXIdentifier" &&
          node.name.property.type === "JSXIdentifier" &&
          // `UI.Button` (namespace import) or `Card.Media` (a compound
          // component's part, reached through its imported root).
          (importedUiNamespaces.has(node.name.object.name) ||
            importedUiComponents.has(node.name.object.name))
        ) {
          componentName = node.name.property.name;
          isImportedUiComponent = true;
        } else {
          return;
        }

        const shouldCheckByImport =
          includeImportedFrom.length > 0 && isImportedUiComponent;
        const shouldCheckByName = components.has(componentName);
        if (!shouldCheckByImport && !shouldCheckByName) return;
        if (ignoreComponents.has(componentName)) return;

        // `className` as a plain attribute, plus any `className` nested in an
        // object passed as a prop — `buttonProps={{ className: "w-full" }}`
        // used to walk straight past this rule.
        const classSources = [];
        for (const attr of node.attributes) {
          if (attr.type !== "JSXAttribute" || !attr.value) continue;
          if (
            attr.name.type === "JSXIdentifier" &&
            attr.name.name === "className"
          ) {
            classSources.push(attr.value);
            continue;
          }
          if (
            attr.value.type === "JSXExpressionContainer" &&
            attr.value.expression.type === "ObjectExpression"
          ) {
            for (const prop of attr.value.expression.properties) {
              if (
                prop.type === "Property" &&
                ((prop.key.type === "Identifier" &&
                  prop.key.name === "className") ||
                  (prop.key.type === "Literal" &&
                    prop.key.value === "className"))
              ) {
                classSources.push(prop.value);
              }
            }
          }
        }

        if (classSources.length === 0) return;

        const classStrings = classSources.flatMap((source) =>
          extractStaticClassStrings(source),
        );
        if (classStrings.length === 0) return;

        const reportTarget = classSources[0];

        classStrings
          .flatMap((value) => value.split(/\s+/))
          .map((token) => token.trim())
          .filter(Boolean)
          .forEach((token) => {
            const normalized = normalizeClassToken(token);
            const isVisualOverride = patterns.some((pattern) =>
              pattern.test(normalized),
            );

            if (!isVisualOverride) return;

            context.report({
              node: reportTarget,
              messageId: "noVisualOverride",
              data: { token: normalized, component: componentName },
            });
          });
      },
    };
  },
};

/** Plugin object for ESLint flat config: use as plugins["design-system"] */
const designSystemPlugin = {
  rules: {
    "no-visual-overrides": designSystemNoVisualOverridesRule,
  },
};

export default designSystemPlugin;
