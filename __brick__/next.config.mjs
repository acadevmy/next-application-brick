import { withSentryConfig } from "@sentry/nextjs";
import { DotenvRunPlugin } from "@dotenv-run/webpack";

const isProd = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: isProd ? "dist" : ".next",
  sentry: {
    hideSourceMaps: true,
  },
  webpack: (config) => {
    config.plugins = config.plugins || [];
    const regex = /^(?!NODE_ENV$)(?!NEXT_DEPLOYMENT_ID$)(?!NEXT_PRIVATE_WORKER$)(?!NEXT_RUNTIME$)(?!__NEXT_PRIVATE_ORIGIN$)({{applicationName.constantCase()}}_.*)(NEXT_PUBLIC_{{applicationName.constantCase()}}_.*)$/;
    config.plugins.push(
        new DotenvRunPlugin(
            { prefix: regex, root: "../..", verbose: false, },
            true,
        ),
    );

    return config
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
