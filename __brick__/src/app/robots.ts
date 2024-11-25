import { MetadataRoute } from "next";

const robots = (): MetadataRoute.Robots => {
  return {
    rules: {
      userAgent: "*",
      disallow: ["/*?*"],
      allow: ["/", "/_next/image/"],
    },
    sitemap: `http://localhost:4000/sitemap-index.xml`,
  };
};

export default robots;
