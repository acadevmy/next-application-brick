import "../globals.css";

import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import NextTopLoader from "nextjs-toploader";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import Toaster from "@/components/UI/Atoms/Sonner";
import { ThemeScript } from "@/components/UI/Foundations/theme";
import { geistMono, geistSans } from "@/fonts";
import I18nProvider from "@/i18n/I18nProvider";
import { routing } from "@/i18n/routing";
import { getGlobalMetadata } from "@/lib/seo";
import { SITE_NAME } from "@/lib/site/config";
import ReactQueryProvider from "@/reactQuery/ReactQueryProvider";

export const generateStaticParams = () =>
  routing.locales.map((locale) => ({ locale }));

export const generateMetadata = (): Metadata => getGlobalMetadata(SITE_NAME);

// Root layout: `[locale]` is a root param, so next-intl reads it through
// `next/root-params` anywhere below, without `params` or `setRequestLocale`.
const RootLayout = async ({ children }: LayoutProps<"/[locale]">) => {
  // Every URL reaches this segment — paths the middleware skips (e.g.
  // `/missing.png`, `/old.php/x`) land here with the first segment as
  // `locale`. Cache Components doesn't support `dynamicParams = false`, so
  // `src/i18n/request.ts` rejects an unknown locale with `notFound()`: it is
  // the single gate for the param.
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable}`}
      // `ThemeScript` writes `data-theme` on this element before React
      // hydrates: the attribute is always "missing" in the server markup, and
      // that difference is the point, not a bug to report.
      suppressHydrationWarning
    >
      <body className="antialiased">
        {/* First thing in the body: the theme applies before anything paints. */}
        <ThemeScript />
        {/* Route-change bar in the primary colour: <Link> clicks start it on
            their own, `useRouter` from @/i18n/navigation starts it for
            router.push and router.replace. */}
        <NextTopLoader color="var(--primary)" showSpinner={false} />

        <I18nProvider>
          <NuqsAdapter>
            <ReactQueryProvider>
              <Toaster richColors position="top-right" />
              {children}
            </ReactQueryProvider>
          </NuqsAdapter>
        </I18nProvider>
      </body>
    </html>
  );
};

export default RootLayout;
