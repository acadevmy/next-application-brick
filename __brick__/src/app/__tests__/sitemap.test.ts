import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { routing } from "@/i18n/routing";
import { SITE_ROUTES } from "@/lib/site/routes";

const DOMAIN = "https://www.example.com";

// `SITE_DOMAIN` is read when the config module loads: set the env first, then
// import a fresh copy of the sitemap.
const loadSitemap = async () => {
  vi.resetModules();
  return (await import("../sitemap")).default();
};

describe("sitemap", () => {
  beforeEach(() => vi.stubEnv("{{applicationName.constantCase()}}_DOMAIN", `${DOMAIN}/`));
  afterEach(() => vi.unstubAllEnvs());

  it("lists every route once per locale", async () => {
    const entries = await loadSitemap();

    expect(entries).toHaveLength(SITE_ROUTES.length * routing.locales.length);
  });

  it("uses localized absolute URLs with hreflang alternates", async () => {
    const entries = await loadSitemap();
    const [first] = routing.locales;
    const contact = entries.find((e) => e.url === `${DOMAIN}/${first}/contact`);

    expect(contact?.alternates?.languages).toEqual({
      ...Object.fromEntries(
        routing.locales.map((l) => [l, `${DOMAIN}/${l}/contact`]),
      ),
      "x-default": `${DOMAIN}/contact`,
    });
    // The root has no trailing slash, as its canonical.
    expect(entries.map((e) => e.url)).toContain(`${DOMAIN}/${first}`);
  });

  it("refuses to build without an absolute domain", async () => {
    vi.stubEnv("{{applicationName.constantCase()}}_DOMAIN", "/");

    await expect(loadSitemap()).rejects.toThrow(/{{applicationName.constantCase()}}_DOMAIN/);
  });
});
