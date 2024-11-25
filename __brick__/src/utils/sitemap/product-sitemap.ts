import { MetadataRoute } from "next";

const generateProductSitemap = async () => {
  const lastModified = new Date();

  const productsSitemap: MetadataRoute.Sitemap = [
    {
      url: `http://localhost:4000/product/1`,
      lastModified,
      priority: 1,
      changeFrequency: "monthly",
    },
  ];

  return productsSitemap;
};

export default generateProductSitemap;
