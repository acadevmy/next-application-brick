// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

import {
  SENTRY_DATA_COLLECTION,
  SENTRY_DSN,
  SENTRY_ENABLED,
} from "@/lib/sentry/config";

Sentry.init({
  enabled: SENTRY_ENABLED,
  dsn: SENTRY_DSN,

  // Session Replay is off: it is the heaviest part of the SDK and records the
  // user's screen, which needs its own privacy review. Add
  // `replayIntegration()` per project if you need it.

  // Browser tracing is off: `browserTracingIntegration` is in the defaults and
  // instruments every page load (PerformanceObservers, fetch/XHR/history
  // wrapping) whatever the sample rate, which costs main-thread time on
  // mobile. Errors are still reported; server and edge tracing are untouched.
  integrations: (defaults) =>
    defaults.filter(({ name }) => name !== "BrowserTracing"),

  // No personal data by default: see SENTRY_DATA_COLLECTION.
  dataCollection: SENTRY_DATA_COLLECTION,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
