import { generateSitemaps } from "@/app/sitemap";
import { DEFAULT_EMPTY_STRING } from "@/utils/utilityConstants";

const generateSitemapLink = (url: string) =>
  `<sitemap><loc>${url}</loc></sitemap>`;

const getXmlFileName = (id: string) =>
  process.env.NODE_ENV === "development"
    ? `sitemap.xml/${id}`
    : `sitemap/${id}.xml`;

export async function GET() {
  /**
   * https://stackoverflow.com/questions/45812160/unexpected-comma-using-map
   * For the weird .join("")
   */
  const sitemapIndexXML = `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${generateSitemaps()
        .map(({ id }) =>
          generateSitemapLink(`${process.env.{{applicationName.constantCase()}}_DOMAIN}/${getXmlFileName(id)}`),
        )
        .join(DEFAULT_EMPTY_STRING)}
    </sitemapindex>`;

  return new Response(sitemapIndexXML, {
    headers: { "Content-Type": "text/xml" },
  });
}
