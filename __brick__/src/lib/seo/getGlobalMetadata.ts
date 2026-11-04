import { Metadata } from "next";

import { SITE_DOMAIN } from "@/lib/site/config";

export const getGlobalMetadata = (title: string): Metadata => {
  return {
    // Global base so relative canonical/OG URLs in child pages resolve to absolute.
    // Guard against a malformed/relative
    // {{applicationName.constantCase()}}_DOMAIN so a bad env can't throw and crash metadata for every page.
    metadataBase:
      SITE_DOMAIN && URL.canParse(SITE_DOMAIN)
        ? new URL(SITE_DOMAIN)
        : undefined,
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    openGraph: {
      title: title,
    },
    // No `icons`: `src/app/favicon.ico` is a file-based metadata icon, which
    // Next serves and links on its own and which wins over this object anyway.
  };
};
