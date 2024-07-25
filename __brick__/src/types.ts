export type Seo = {
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
