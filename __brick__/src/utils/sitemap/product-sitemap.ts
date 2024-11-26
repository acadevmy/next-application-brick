import { MetadataRoute } from "next";

const generateProductSitemap = async () => {
  const lastModified = new Date();

  const productsSitemap: MetadataRoute.Sitemap = [
    {
      url: `${process.env.{{applicationName.constantCase()}}_DOMAIN}/product/1`,
      lastModified,
      priority: 1,
      changeFrequency: "monthly",
    },
  ];

  return productsSitemap;
};

export default generateProductSitemap;
