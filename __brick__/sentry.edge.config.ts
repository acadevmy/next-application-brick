// This file configures the initialization of Sentry for edge features (edge route handlers and pages).
// `src/proxy.ts` runs on Node.js from Next 16, so it is covered by sentry.server.config.ts.
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

import {
  SENTRY_DATA_COLLECTION,
  SENTRY_DSN,
  SENTRY_ENABLED,
  SENTRY_TRACES_SAMPLE_RATE,
} from "@/lib/sentry/config";

Sentry.init({
  enabled: SENTRY_ENABLED,
  dsn: SENTRY_DSN,

  // See SENTRY_TRACES_SAMPLE_RATE; use `tracesSampler` for per-route control.
  tracesSampleRate: SENTRY_TRACES_SAMPLE_RATE,

  // No personal data by default: see SENTRY_DATA_COLLECTION.
  dataCollection: SENTRY_DATA_COLLECTION,
});
