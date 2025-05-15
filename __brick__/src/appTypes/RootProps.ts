import { Locale } from "@/i18n/i18nConfig";

export type SearchParams = Record<string, string> | undefined;

// params
export type RootParams = {
  locale: Locale;
};

// props
export type RootProps = {
  params: Promise<RootParams>;
};
