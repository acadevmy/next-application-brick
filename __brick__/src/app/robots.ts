import { MetadataRoute } from "next";

import { requireSiteDomain } from "@/lib/site/config";

const robots = (): MetadataRoute.Robots => {
  return {
    rules: {
      userAgent: "*",
      // Keep private/utility routes out of the index; everything else is allowed.
      // Don't block query strings wholesale (it would hide UTM/paginated URLs).
      disallow: ["/api/"],
    },
    sitemap: `${requireSiteDomain()}/sitemap.xml`,
  };
};

export default robots;
