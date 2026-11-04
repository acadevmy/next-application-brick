import type { Locale } from "next-intl";

import { routing } from "./routing";

/**
 * The public path of an app route in a locale, for the places that build URLs
 * by hand — canonicals and the sitemap. (`<Link>` and the router from
 * `navigation.ts` add the prefix on their own.)
 *
 * `/contact` → `/it/contact`; the root `/` → `/it`, no trailing slash.
 */
export const localizePath = (path: string, locale: Locale): string =>
  `/${locale}${path === "/" ? "" : path}`;

/**
 * The hreflang alternates of an app route: one path per locale plus
 * `x-default`, the unprefixed path the middleware redirects by language. Same
 * set the next-intl middleware sends in its `Link` header.
 */
export const getLanguageAlternates = (
  path: string,
): Record<string, string> => ({
  ...Object.fromEntries(
    routing.locales.map((locale) => [locale, localizePath(path, locale)]),
  ),
  "x-default": path,
});
