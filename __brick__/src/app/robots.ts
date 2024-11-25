import { MetadataRoute } from "next";

const robots = (): MetadataRoute.Robots => {
  return {
    rules: {
      userAgent: "*",
      disallow: ["/*?*"],
      allow: ["/", "/_next/image/"],
    },
    sitemap: `${process.env.{{applicationName.constantCase()}}_DOMAIN}/sitemap-index.xml`,
  };
};

export default robots;
