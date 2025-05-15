// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
//
// This file should remain minimal, to maintain a clean separation
// of concerns, avoid adding providers or layout logic here; instead,
// implement them in more specific layouts (e.g., `[locale]/layout.tsx`).

import "./globals.css";

import { ReactNode } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return children;
};

export default RootLayout;
