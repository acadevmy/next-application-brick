// Accepts `true` or `1`: `.env.example` documents `true`/`false`, and a plain
// `Boolean(Number(...))` would silently read `true` as disabled.
export const SENTRY_ENABLED = ["true", "1"].includes(
  process.env.NEXT_PUBLIC_{{applicationName.constantCase()}}_SENTRY_ENABLED?.trim().toLowerCase() ?? "",
);

export const SENTRY_DSN = process.env.NEXT_PUBLIC_{{applicationName.constantCase()}}_SENTRY_DSN;

/**
 * Share of server/edge requests traced. 100% in development to see every
 * span; a sampled 10% in production keeps quota and overhead predictable.
 */
export const SENTRY_TRACES_SAMPLE_RATE =
  process.env.NODE_ENV === "production" ? 0.1 : 1;

/**
 * What error events may carry, shared by the client, server and edge SDKs.
 *
 * SDK v11 collects by default user info, cookies, every header and the HTTP
 * bodies: a failing contact-form submission would ship name, email and phone
 * to Sentry. This starter opts out of personal data and keeps only what helps
 * debugging. Widen it per project, on purpose and with the privacy policy in
 * step. https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/
 */
export const SENTRY_DATA_COLLECTION = {
  userInfo: false,
  cookies: false,
  httpBodies: [],
  httpHeaders: {
    request: { allow: ["user-agent", "referer", "accept-language"] },
    response: false,
  },
  databaseQueryData: false,
  queues: false,
} satisfies NonNullable<
  NonNullable<
    Parameters<typeof import("@sentry/nextjs").init>[0]
  >["dataCollection"]
>;
