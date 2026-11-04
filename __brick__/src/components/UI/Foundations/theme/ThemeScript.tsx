import { themeInitScript } from "./theme";{{=<% %>=}}

/**
 * Applies the theme before the page paints.
 *
 * Render it as the first thing inside `<body>`: it is a blocking inline script,
 * so the attribute is on `<html>` before anything is drawn and the page never
 * flashes the wrong theme. It also has to stay *outside* React's rendering —
 * the server has no way to know which theme this visitor picked, so any markup
 * that depended on it would hydrate wrong. Nothing here is user input: the
 * script is a constant built from the design system's own token names.
 */
const ThemeScript = () => (
  <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
);

export { ThemeScript };
