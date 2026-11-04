import createMiddleware from "next-intl/middleware";

import { routing } from "./i18n/routing";

/**
 * next-intl middleware (`localePrefix: "always"`): it redirects an unprefixed
 * URL to the visitor's locale (cookie, then `Accept-Language`) and, with more
 * than one locale, sends the hreflang alternates in a `Link` header. Add auth
 * or redirect logic by wrapping this export in a function that returns early
 * before delegating here.
 */
export default createMiddleware(routing);

export const config = {
  // next-intl's standard matcher: skip API routes, Next internals and any path
  // with a dot (static files, robots.txt, sitemap.xml). A skipped path that
  // isn't a real file reaches `[locale]` with an invalid locale and 404s there.
  // A page whose path contains a dot needs its own entry here.
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
