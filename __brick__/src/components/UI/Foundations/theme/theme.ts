/**
 * Which of the two themes is on, and how it gets switched.
 *
 * The contract is one attribute on `<html>`: `data-theme="light" | "dark"`.
 * `theme.css` defines the dark tokens under that attribute, and every `dark:`
 * utility compiles against it — so anything that changes the attribute changes
 * the whole page, with no React state to thread and no component re-render.
 *
 * The attribute is written twice: once by `themeInitScript` before the first
 * paint (no flash of the wrong theme, no hydration mismatch, because the
 * markup never mentions the theme), and then by `setTheme` when someone picks
 * one. The choice is remembered in `localStorage`; without a stored choice the
 * system preference decides, and keeps deciding while it changes.
 */

export type Theme = "light" | "dark";

export const THEMES: readonly Theme[] = ["light", "dark"];

/** The attribute `theme.css` reads. */
export const THEME_ATTRIBUTE = "data-theme";

/** Where an explicit choice is remembered. Absent = follow the system. */
export const THEME_STORAGE_KEY = "theme";

const DARK_QUERY = "(prefers-color-scheme: dark)";

const isTheme = (value: unknown): value is Theme =>
  value === "light" || value === "dark";

/**
 * Runs before the first paint, from `<ThemeScript />`.
 *
 * Kept as a string on purpose — it has to execute *before* React, not with it
 * — and built from the constants above so the script and the module can never
 * disagree about the attribute or the storage key.
 */
export const themeInitScript = `(function(){try{var s=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});var t=s==="light"||s==="dark"?s:(window.matchMedia(${JSON.stringify(
  DARK_QUERY,
)}).matches?"dark":"light");document.documentElement.setAttribute(${JSON.stringify(
  THEME_ATTRIBUTE,
)},t);}catch(e){document.documentElement.setAttribute(${JSON.stringify(
  THEME_ATTRIBUTE,
)},"light");}})();`;

/** The theme the system asks for. */
export function getSystemTheme(): Theme {
  return typeof window !== "undefined" && window.matchMedia(DARK_QUERY).matches
    ? "dark"
    : "light";
}

/** The explicit choice, or `null` when the system is still deciding. */
export function getStoredTheme(): Theme | null {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(stored) ? stored : null;
  } catch {
    // Private mode, storage disabled: no stored choice, and no crash either.
    return null;
  }
}

/** The theme on screen right now, read from the attribute the script wrote. */
export function getTheme(): Theme {
  if (typeof document === "undefined") return "light";
  const applied = document.documentElement.getAttribute(THEME_ATTRIBUTE);
  return isTheme(applied) ? applied : getSystemTheme();
}

/** Applies a theme and remembers it as the user's choice. */
export function setTheme(theme: Theme): void {
  document.documentElement.setAttribute(THEME_ATTRIBUTE, theme);
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // The theme still applies for this page; only the memory of it is lost.
  }
}

/** Switches to the other theme and returns the new one. */
export function toggleTheme(): Theme {
  const next: Theme = getTheme() === "dark" ? "light" : "dark";
  setTheme(next);
  return next;
}

/**
 * Keeps following the system while no one has chosen — someone switching their
 * OS to dark at sunset sees the site follow, until the day they pick a theme
 * here. Returns the unsubscribe function.
 */
export function followSystemTheme(): () => void {
  const media = window.matchMedia(DARK_QUERY);
  const onChange = () => {
    if (getStoredTheme() !== null) return;
    document.documentElement.setAttribute(
      THEME_ATTRIBUTE,
      media.matches ? "dark" : "light",
    );
  };

  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}
