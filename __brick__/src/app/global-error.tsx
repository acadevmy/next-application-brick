"use client";

import "./globals.css";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

// Replaces the root layout when it fails, so it can't rely on its providers:
// no translations, no theme. Kept bilingual and plain on purpose.
const GlobalError = ({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) => {
  useEffect(() => {
    // Server errors (with a `digest`) are already reported by `onRequestError`.
    if (!error.digest) Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="it">
      <head>
        <title>Errore · Error</title>
      </head>
      <body className="grid min-h-dvh place-items-center p-6 text-center antialiased">
        <main className="flex flex-col items-center gap-4">
          <h1 className="text-2xl font-semibold">
            Qualcosa è andato storto · Something went wrong
          </h1>
          <button
            type="button"
            onClick={() => retry()}
            className="rounded-md border px-4 py-2"
          >
            Riprova · Try again
          </button>
        </main>
      </body>
    </html>
  );
};

export default GlobalError;
