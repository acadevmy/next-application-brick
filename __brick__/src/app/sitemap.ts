import { MetadataRoute } from "next";

import generatePageSitemap from "@/utils/sitemap/page-sitemap";
import generateProductSitemap from "@/utils/sitemap/product-sitemap";

export const generateSitemaps = () => {
  return [{ id: "product" }, { id: "page" }];
};

const sitemap = async ({
  id,
}: {
  id: string;
}): Promise<MetadataRoute.Sitemap> => {
  if (id === "product") return await generateProductSitemap();

  if (id === "page") return await generatePageSitemap();

  return [];
};

export default sitemap;
