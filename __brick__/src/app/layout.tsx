import "./globals.css";

import type { Metadata } from "next";

import { geistMono, inter } from "@/fonts";
import { getGlobalMetadata } from "@/utils/metadata";
import { DEFAULT_EMPTY_STRING } from "@/utils/utilityConstants";

export const generateMetadata = async (): Promise<Metadata | null> => {
  return getGlobalMetadata(DEFAULT_EMPTY_STRING);
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={`${inter.className} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
