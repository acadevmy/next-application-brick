"use client";

import { type Locale, useLocale } from "next-intl";
import { ReactNode, useEffect } from "react";
import { z } from "zod";
import { en, it } from "zod/locales";

/** Zod's native locales, one per supported locale (only these get bundled). */
const zodLocales: Record<Locale, typeof it> = { it, en };

/**
 * Validation messages in the user's language through zod's native locales.
 * `z.config` is global: fine in the browser, where a page has one locale. The
 * server never reads the messages (`submitContactForm` returns only an error
 * code), so it keeps zod's default English.
 */
const ZodLocaleProvider = ({ children }: { children: ReactNode }) => {
  const locale = useLocale();

  useEffect(() => {
    z.config(zodLocales[locale]());
  }, [locale]);

  return children;
};

export { ZodLocaleProvider };
