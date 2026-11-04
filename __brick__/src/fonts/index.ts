import { Geist, Geist_Mono } from "next/font/google";

/**
 * Geist, as in create-next-app: a neutral sans for text and headings, with its
 * mono for code. next/font downloads them at build time and serves them from
 * the app, so no request reaches Google at runtime. `theme.css` maps
 * `--font-sans`, `--font-heading` and `--font-body` to the sans: give headings
 * their own family by adding a font here and pointing `--font-heading` at it.
 */
export const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

// `preload: false`: nothing renders in mono on a typical page, so the file is
// fetched only when something actually uses the family.
export const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
  preload: false,
});
