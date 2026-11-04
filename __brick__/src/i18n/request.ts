import { notFound } from "next/navigation";
import * as rootParams from "next/root-params";
import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";

import { routing } from "@/i18n/routing";

export default getRequestConfig(async ({ locale: explicitLocale }) => {
  // An explicit `getTranslations({ locale })` wins; otherwise the locale is the
  // `[locale]` root param, readable from any Server Component without
  // `setRequestLocale`. Route Handlers and Server Actions can't read root
  // params: pass the locale explicitly there.
  const locale = explicitLocale ?? (await rootParams.locale());

  // Paths the middleware skips (e.g. `/missing.png`) reach `[locale]` with the
  // first segment as the locale: reject them.
  if (!hasLocale(routing.locales, locale)) notFound();

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
