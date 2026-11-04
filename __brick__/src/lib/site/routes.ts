// Fixed app routes: import these, never repeat the paths in components.
export const HOMEPAGE_PATH = "/" as const;
export const CONTACT_PATH = "/contact" as const;

/**
 * The app's public pages: the single list the navigation and the sitemap read.
 * `labelKey` is a key of `messages/<locale>.json`.
 */
export const SITE_ROUTES = [
  { path: HOMEPAGE_PATH, labelKey: "navHome", priority: 1 },
  { path: CONTACT_PATH, labelKey: "navContact", priority: 0.8 },
] as const;

export type SiteRoute = (typeof SITE_ROUTES)[number];
