import { defineRouting } from "next-intl/routing";

/**
 * Routing definition only, as in the next-intl starter; the navigation APIs
 * live in `navigation.ts`. It is also the single list of supported locales:
 * `global.ts` derives the `Locale` type from it, and `hasLocale` from
 * next-intl validates against it.
 *
 * Every public URL carries its locale (`/it/contact`, `/en/contact`), with one
 * locale or many: each language has its own indexable address, and the
 * middleware redirects an unprefixed URL to the visitor's locale (cookie, then
 * `Accept-Language`).
 *
 * `src/proxy.ts` imports this file: anything reaching `next-intl/server` here
 * would pull `request.ts` (and with it `next/root-params`, App Directory only)
 * into the middleware bundle.
 */
export const routing = defineRouting({
  locales: ["it", "en"],
  defaultLocale: "it",
  localePrefix: "always",
});
