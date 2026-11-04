import { describe, expect, it } from "vitest";

import { getLanguageAlternates, localizePath } from "../paths";
import { routing } from "../routing";

const locale = routing.defaultLocale;

describe("localizePath", () => {
  it("prefixes paths with the locale", () => {
    for (const l of routing.locales) {
      expect(localizePath("/contact", l)).toBe(`/${l}/contact`);
    }
    expect(localizePath("/a/b", locale)).toBe(`/${locale}/a/b`);
  });

  it("maps the root to the bare locale, with no trailing slash", () => {
    expect(localizePath("/", locale)).toBe(`/${locale}`);
  });
});

describe("getLanguageAlternates", () => {
  it("lists one path per locale plus the unprefixed x-default", () => {
    expect(getLanguageAlternates("/contact")).toEqual({
      ...Object.fromEntries(routing.locales.map((l) => [l, `/${l}/contact`])),
      "x-default": "/contact",
    });
    expect(getLanguageAlternates("/")).toMatchObject({
      [locale]: `/${locale}`,
      "x-default": "/",
    });
  });
});
