// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
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
