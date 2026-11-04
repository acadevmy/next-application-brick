import { env } from "@dotenv-run/core";
import { SentryBuildOptions, withSentryConfig } from "@sentry/nextjs/config";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin({
  experimental: {
    // Generates `messages/it.d.json.ts`, so `global.ts` types every message
    // with its ICU arguments, as in the next-intl starter.
    createMessagesDeclaration: "./messages/it.json",
  },
});

// Loads the monorepo's root `.env` into `process.env` for this process (build
// and `next start`). Server code reads its values from there at runtime —
// secrets included — and Next inlines `NEXT_PUBLIC_*` into the client bundle
// on its own. Nothing here is copied into `env` below: that option bakes values
// into every bundle that references them, which is no place for a secret.
env({
  root: "../..",
  verbose: true,
  prefix: "(^{{applicationName.constantCase()}}_|^NEXT_PUBLIC_{{applicationName.constantCase()}}_)",
  nodeEnv: false,
  files: [".env.vault", ".env"],
});

/**
 * Baseline security headers for every response. No Content-Security-Policy
 * beyond `frame-ancestors`: a script/style policy depends on the project's
 * third parties (analytics, CMS embeds, Sentry) and, with Cache Components,
 * on how nonces fit static pages — define it per project.
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Clickjacking: no one may frame the site. Both headers for old browsers.
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  // Ignored by browsers over plain http (local dev); enforced in production.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
];

const nextConfig: NextConfig = {
  // Don't advertise the framework and version to scanners.
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  env: {
    // Build timestamp, inlined at compile time. Cache Components rejects
    // `new Date()` while prerendering; reading the time here instead keeps
    // pages fully static, with no time-based regeneration. Used by the footer
    // year (src/components/AppFooter/CurrentYear.tsx).
    {{applicationName.constantCase()}}_BUILT_AT: new Date().toISOString(),
  },
  cacheComponents: true,
  // Paired with Cache Components, as Next asks from 16.4 (both become the
  // default in the next major): a `<Link>` prefetches the route's App Shell.
  // No `<Link prefetch>` in the code, so there's no legacy full prefetch to
  // migrate. See node_modules/next/dist/docs/01-app/02-guides/adopting-partial-prefetching.md
  partialPrefetching: true,
  turbopack: {
    rules: {
      // Tailwind v4 as a Turbopack loader, as in the create-next-app 16.4
      // starter: no postcss.config. Storybook and the story tests run on Vite
      // and get Tailwind from @tailwindcss/vite instead (.storybook/main.ts).
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    deviceSizes: [640, 1080, 1920, 3000],
    imageSizes: [32, 64, 96, 128, 256],
    // Add the hosts that serve remote images (CDN, CMS, …) here.
    remotePatterns: [],
  },
  async redirects() {
    // Permanent redirects that live in code. If they come from an external
    // source (CMS, spreadsheet…), fetch them here: this runs at build time.
    return [];
  },
};

const sentryBuildOptions: SentryBuildOptions = {
  org: process.env.{{applicationName.constantCase()}}_SENTRY_ORG,
  project: process.env.{{applicationName.constantCase()}}_SENTRY_PROJECT,
  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Source map upload. The plugin reads only `SENTRY_AUTH_TOKEN` by default;
  // this project namespaces it as `{{applicationName.constantCase()}}_SENTRY_AUTH_TOKEN`.
  authToken: process.env.{{applicationName.constantCase()}}_SENTRY_AUTH_TOKEN,

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,
};

const finalConfig = withSentryConfig(
  withNextIntl(nextConfig),
  sentryBuildOptions,
);

// `withSentryConfig` silently forces `experimental.clientTraceMetadata =
// ['baggage', 'sentry-trace', ...]`, which makes Next.js embed the live trace
// as <meta> tags in the rendered HTML. Those values (trace id, sample_rand)
// are random per render, so every ISR/SSG regeneration produces byte-different
// output — defeating Vercel's "no Write Units when the regenerated content is
// unchanged" optimization (every revalidation of every page gets billed). On a
// cached page the tags are wrong telemetry anyway: all visitors would share the
// single trace id frozen at regeneration time. Server-side tracing is untouched
// — only the propagation of these meta tags into the static markup is removed.
if (finalConfig.experimental?.clientTraceMetadata) {
  delete finalConfig.experimental.clientTraceMetadata;
}

export default finalConfig;
