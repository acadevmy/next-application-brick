export type SeoMetadata = {
  title?: string | null;
  description?: string | null;
  noIndex?: boolean | null;
  noFollow?: boolean | null;
  ogImage?: string | null;
  canonicalUrl?: string | null;
};

export type DefaultSeo = Pick<
  SeoMetadata,
  "title" | "description" | "ogImage" | "canonicalUrl"
>;

export interface GetSeoMetaDataProps {
  seoObj?: SeoMetadata | null;
  defaultSeoObj: DefaultSeo;
}
