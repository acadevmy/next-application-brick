import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

import { env } from "@dotenv-run/core";
import { SentryBuildOptions, withSentryConfig } from "@sentry/nextjs";
import { NextConfig } from "next";

const { raw } = env({
  root: "../..",
  verbose: true,
  prefix:
    "(^{{applicationName.constantCase()}}_|^NEXT_PUBLIC_{{applicationName.constantCase()}}_)",
  nodeEnv: false,
  files: [".env.vault", ".env"],
});

const nextConfig: NextConfig = {
  env: raw,
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        hostname: "devmy.it",
      },
    ],
  },
  sassOptions: {
    silenceDeprecations: ["legacy-js-api"],
  },
};

type NewType = SentryBuildOptions;

const sentryBuildOptions: NewType = {
  org: process.env.{{applicationName.constantCase()}}_SENTRY_ORG,
  project: process.env.{{applicationName.constantCase()}}_SENTRY_PROJECT,
  authToken: process.env.{{applicationName.constantCase()}}_SENTRY_AUTH_TOKEN,
  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  // tunnelRoute: "/monitoring",

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
};

export default withSentryConfig(withNextIntl(nextConfig), sentryBuildOptions);
