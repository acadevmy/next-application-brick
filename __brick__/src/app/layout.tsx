import "./globals.css";

import type { Metadata } from "next";

import { inter } from "@/fonts";
import { getGlobalMetadata } from "@/utils/metadata";

export const generateMetadata = async (): Promise<Metadata | null> => {
  return getGlobalMetadata("");
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
