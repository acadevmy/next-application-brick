import { PagesParams } from "@/appTypes/PageProps";

export type GenerateCanonicalUrlProps = (
  | GenerateCanonicalUrlPropsParams
  | GenerateCanonicalUrlPropsHref
) & {
  type: "params" | "href";
  baseUrl: string;
};

type GenerateCanonicalUrlPropsParams = {
  type: "params";
  params: PagesParams;
  rewriteUrl?: string | null;
};

type GenerateCanonicalUrlPropsHref = {
  type: "href";
  href: string;
};

export type SeoMetadata = {
  title?: string | null;
  description?: string | null;
  noIndex?: boolean | null;
  noFollow?: boolean | null;
  ogImage?: {
    url: string;
    title: string;
  } | null;
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
