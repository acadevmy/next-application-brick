import { env } from "@dotenv-run/core";
import { withSentryConfig } from "@sentry/nextjs";
import { NextConfig } from "next";

const { raw } = env({
  root: "../..",
  verbose: true,
  prefix:
    "(^{{applicationName.constantCase()}}_|^NEXT_PUBLIC_{{applicationName.constantCase()}}_)",
  nodeEnv: false,
});

const nextConfig: NextConfig = {
  env: raw,
  sentry: {
    hideSourceMaps: true,
  },
};

const sentryWebpackPluginOptions = {
  org: process.env.{{applicationName.constantCase()}}_SENTRY_ORG,
  project: process.env.{{applicationName.constantCase()}}_SENTRY_PROJECT,
  authToken: process.env.{{applicationName.constantCase()}}_SENTRY_AUTH_TOKEN,
  silent: true, // Suppresses all logs

  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

export default withSentryConfig(nextConfig, sentryWebpackPluginOptions);
