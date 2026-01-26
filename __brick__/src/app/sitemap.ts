import { MetadataRoute } from "next";

import generatePageSitemap from "@/utils/sitemap/page-sitemap";

export const generateSitemaps = () => {
  return [{ id: "product" }, { id: "page" }];
};

const sitemap = async ({
  id,
}: {
  id: string;
}): Promise<MetadataRoute.Sitemap> => {
  if (id === "page") return await generatePageSitemap();

  return [];
};

export default sitemap;
