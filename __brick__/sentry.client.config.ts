// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  enabled: Boolean(Number(process.env.NEXT_PUBLIC_{{applicationName.constantCase()}}_SENTRY_ENABLED)),
  dsn: process.env.NEXT_PUBLIC_{{applicationName.constantCase()}}_SENTRY_DSN,
  integrations: [Sentry.replayIntegration()],

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: process.env.NODE_ENV === "development",

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1,

  // Capture Replay for 10% of all sessions,
  // plus for 100% of sessions with an error
  replaysOnErrorSampleRate: 1.0,
  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.1,
});
