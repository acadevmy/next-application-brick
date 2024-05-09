import { env } from "@dotenv-run/core";

const { raw } = env({
  root: "../..",
  verbose: true,
  prefix: "(^FRONTEND_|^NEXT_PUBLIC_FRONTEND_)",
  nodeEnv: false,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: raw,
};

export default nextConfig;
