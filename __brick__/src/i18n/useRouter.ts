"use client";

import { useLocale } from "next-intl";
import { createNavigation } from "next-intl/navigation";
import { useTopLoader } from "nextjs-toploader";
import { useMemo } from "react";

import { routing } from "./routing";

const { useRouter: useIntlRouter, usePathname } = createNavigation(routing);

type IntlRouter = ReturnType<typeof useIntlRouter>;
type Href = Parameters<IntlRouter["push"]>[0];
type NavigateOptions = Parameters<IntlRouter["push"]>[1];

/** The URL an href points at, as far as "is this the page we're on?" goes. */
const targetOf = (href: Href) =>
  typeof href === "string"
    ? href
    : href.query && Object.keys(href.query).length > 0
      ? null // a query change is always a navigation
      : href.pathname;

/**
 * next-intl's locale-aware router, with the top loading bar.
 *
 * `NextTopLoader` (root layout) starts the bar on `<Link>` clicks by itself,
 * but knows nothing of `router.push` / `router.replace`. This wrapper starts it
 * there too; the loader finishes it on its own when the navigation updates the
 * history. Navigating to the page already shown (same path, same locale) does
 * not update the history, so it does not start the bar either — it would never
 * finish.
 */
export const useRouter = (): IntlRouter => {
  const router = useIntlRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const loader = useTopLoader();

  return useMemo(() => {
    const startIfLeaving = (href: Href, options?: NavigateOptions) => {
      const changesLocale =
        options?.locale != null && options.locale !== locale;
      if (changesLocale || targetOf(href) !== pathname) loader.start();
    };

    return {
      ...router,
      push: (href, options) => {
        startIfLeaving(href, options);
        router.push(href, options);
      },
      replace: (href, options) => {
        startIfLeaving(href, options);
        router.replace(href, options);
      },
    };
    // `loader` is a fresh object of stateless wrappers on every render: leaving
    // it out keeps the router identity stable across renders.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, pathname, locale]);
};
