import type { routing } from "@/i18n/routing";

import type messages from "./messages/it.json";

/**
 * Types next-intl, as in its starter: `Locale` is `"it" | "en"` everywhere
 * (`useLocale`, `getLocale`, `hasLocale`…) and `t("key")` only accepts keys of
 * `messages/it.json`, the default locale — the other files must mirror it.
 * See https://next-intl.dev/docs/workflows/typescript
 */
declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
  }
}
