import { MetadataRoute } from "next";

import { getLanguageAlternates, localizePath } from "@/i18n/paths";
import { routing } from "@/i18n/routing";
import { requireSiteDomain } from "@/lib/site/config";
import { SITE_ROUTES } from "@/lib/site/routes";

/**
 * Sitemap of the app's static pages (`SITE_ROUTES`): every page once per
 * locale, each entry listing its language alternates (hreflang).
 *
 * Static pages carry no `lastModified`: the only date available is the build
 * time, and stamping it on every URL at every deploy teaches search engines
 * to ignore the field. When the project adds dynamic content (articles,
 * products, …), fetch its published items here and append the entries, with
 * `lastModified` taken from the source's own dates.
 */
const sitemap = (): MetadataRoute.Sitemap => {
  const domain = requireSiteDomain();
  // The bare domain for the root (no trailing slash), to match its canonical.
  const toUrl = (path: string) => (path === "/" ? domain : `${domain}${path}`);

  return SITE_ROUTES.flatMap(({ path, priority }) => {
    const languages = Object.fromEntries(
      Object.entries(getLanguageAlternates(path)).map(([lang, href]) => [
        lang,
        toUrl(href),
      ]),
    );

    return routing.locales.map((locale) => ({
      url: toUrl(localizePath(path, locale)),
      changeFrequency: "weekly" as const,
      priority,
      alternates: { languages },
    }));
  });
};

export default sitemap;
