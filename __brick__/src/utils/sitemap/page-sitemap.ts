import { MetadataRoute } from "next";

const generatePageSitemap = async () => {
  const lastModified = new Date();
  const pagesSitemap: MetadataRoute.Sitemap = [
    {
      url: process.env.{{applicationName.constantCase()}}_DOMAIN as string,
      lastModified,
      priority: 2,
      changeFrequency: "weekly",
    },
  ];
  const otherPagesSitemap: MetadataRoute.Sitemap = [];

  return [...pagesSitemap, ...otherPagesSitemap];
};

export default generatePageSitemap;
