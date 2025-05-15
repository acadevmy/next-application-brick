import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { RootProps } from "@/appTypes/RootProps";
import Toaster from "@/components/UI/Atoms/Sonner";
import { geistMono, inter } from "@/fonts";
import I18nProvider from "@/i18n/I18nProvider";
import ReactQueryProvider from "@/reactQuery/ReactQueryProvider";
import { getGlobalMetadata } from "@/utils/seoMetadata";
import { DEFAULT_EMPTY_STRING } from "@/utils/utilityConstants";

export const generateMetadata = async (): Promise<Metadata | null> => {
  return getGlobalMetadata(DEFAULT_EMPTY_STRING);
};

const RootLayout = async ({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
}> &
  RootProps) => {
  const paramsData = await params;
  const { locale } = paramsData;

  return (
    <html lang={locale}>
      <body className={`${inter.className} ${geistMono.variable} antialiased`}>
        <NextTopLoader color="#000" showSpinner={false} />

        <I18nProvider locale={locale}>
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
