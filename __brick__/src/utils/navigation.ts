import { isString } from "@/utils/typeCheck";

type GetHrefProps = {
  slug: string | string[];
  queryParams?: Record<string, string>;
  rewriteUrl?: string | null;
};

export const getHref = ({ slug, queryParams, rewriteUrl }: GetHrefProps) => {
  if (rewriteUrl) return `/${rewriteUrl}/`;

  const params = new URLSearchParams(queryParams);

  return `/${isString(slug) ? slug : slug.join("/")}${params.toString() ? `?${params.toString()}` : "/"}`;
};
