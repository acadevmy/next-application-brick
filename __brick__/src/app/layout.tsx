import "./globals.css";

import type { Metadata } from "next";

import { inter } from "@/fonts";
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
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default RootLayout;
