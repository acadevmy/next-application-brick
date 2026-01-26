// TODO: check is this needed. Maybe we can use useLinkStatus from next 16 instead of NProgress
"use client";
import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
import * as NProgress from "nprogress";
import { useCallback, useEffect } from "react";

import { useNextIntlRouter, usePathname } from "@/i18n/routing";

const useI18nRouter = () => {
  const router = useNextIntlRouter();
  const pathname = usePathname();
  useEffect(() => {
    NProgress.done();
  }, [pathname]);
  const replace = useCallback(
    (
      href: string,
      options?: Partial<NavigateOptions> & { locale?: string },
    ) => {
      href !== pathname && NProgress.start();
      router.replace(href, options);
    },
    [router, pathname],
  );

  const push = useCallback(
    (
      href: string,
      options?: Partial<NavigateOptions> & { locale?: string },
    ) => {
      href !== pathname && NProgress.start();
      router.push(href, options);
    },
    [router, pathname],
  );

  return {
    ...router,
    replace,
    push,
  };
};

export default useI18nRouter;
