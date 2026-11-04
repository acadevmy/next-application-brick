/** Absolute site origin (e.g. https://www.example.com). Used for canonicals, robots, sitemap. */
export const SITE_DOMAIN = process.env.{{applicationName.constantCase()}}_DOMAIN;

/**
 * The site origin where it can't be missing (sitemap, robots): an absolute URL
 * or a clear build error, never `undefined/sitemap.xml` shipped to crawlers.
 */
export const requireSiteDomain = (): string => {
  if (!SITE_DOMAIN || !URL.canParse(SITE_DOMAIN)) {
    throw new Error(
      "{{applicationName.constantCase()}}_DOMAIN must be an absolute URL (e.g. https://www.example.com)",
    );
  }
  return SITE_DOMAIN.replace(/\/+$/, "");
};

const siteName = process.env.{{applicationName.constantCase()}}_SITE_NAME;

if (!siteName && process.env.NODE_ENV !== "production") {
  console.warn(
    "[config] {{applicationName.constantCase()}}_SITE_NAME is not set — metadata titles and the logo fallback will read “Site”.",
  );
}

/**
 * Site name used in metadata titles and as the text logo. Every other
 * user-facing string lives in `messages/<locale>.json`.
 */
export const SITE_NAME = siteName ?? "Site";
