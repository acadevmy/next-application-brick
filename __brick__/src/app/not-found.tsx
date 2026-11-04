import "./globals.css";

import type { Metadata } from "next";
import Link from "next/link";

// Renders when the locale is unknown (e.g. a request for `/missing.png`):
// `src/i18n/request.ts` rejects it before any translation is loaded, so this
// page stays plain and bilingual. `[locale]/layout.tsx` is the root layout
// (for `next/root-params`) and there is none above it, so this page brings
// its own `<html>`, as in the next-intl starter. Unmatched paths with a valid
// locale get the localized `[locale]/not-found.tsx` instead.

export const metadata: Metadata = {
  title: "404",
  robots: { index: false },
};

const RootNotFound = () => (
  <html lang="it">
    <body className="grid min-h-dvh place-items-center p-6 text-center antialiased">
      <main className="flex flex-col items-center gap-2">
        <h1 className="text-2xl font-semibold">404</h1>
        <p>Pagina non trovata · Page not found</p>
        <Link href="/" className="underline">
          Home
        </Link>
      </main>
    </body>
  </html>
);

export default RootNotFound;
