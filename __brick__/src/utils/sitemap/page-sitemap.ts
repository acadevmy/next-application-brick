import { MetadataRoute } from "next";

const generatePageSitemap = async () => {
  const lastModified = new Date();
  const pagesSitemap: MetadataRoute.Sitemap = [
    {
      url: `http://localhost:4000`,
      lastModified,
      priority: 2,
      changeFrequency: "weekly",
    },
  ];
  const otherPagesSitemap: MetadataRoute.Sitemap = [];

  return [...pagesSitemap, ...otherPagesSitemap];
};

export default generatePageSitemap;
