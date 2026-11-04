import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";

import { ZodLocaleProvider } from "@/lib/zod/ZodLocaleProvider";

type I18nProviderProps = {
  children: ReactNode;
};

/**
 * Locale and messages come from `src/i18n/request.ts`: `NextIntlClientProvider`
 * rendered by a Server Component inherits both, as in the next-intl starter.
 */
const I18nProvider = ({ children }: I18nProviderProps) => (
  <NextIntlClientProvider>
    <ZodLocaleProvider>{children}</ZodLocaleProvider>
  </NextIntlClientProvider>
);

export default I18nProvider;
