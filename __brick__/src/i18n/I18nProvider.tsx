import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { ReactNode } from "react";

import { Locale } from "./i18nConfig";
import { routing } from "./routing";

type I18nProviderProps = {
  locale: Locale;
  children: ReactNode;
  staticPages?: boolean;
};

const I18nProvider = async ({
  locale,
  children,
  staticPages,
}: I18nProviderProps) => {
  // Ensure that the incoming `locale` is valid
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  if (staticPages) {
    // Enable static rendering
    setRequestLocale(locale);
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
};

export default I18nProvider;
