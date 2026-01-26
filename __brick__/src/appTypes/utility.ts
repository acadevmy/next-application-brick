import { Locale } from "@/i18n/i18nConfig";

export const parseLocale = (value: string): Locale => {
  if (value === "it" || value === "en") {
    return value;
  }

  throw new Error(`Unsupported locale: ${value}`);
};
