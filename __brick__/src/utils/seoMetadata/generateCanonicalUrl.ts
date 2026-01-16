import { getHref } from "@/utils/navigation";
import { GenerateCanonicalUrlProps } from "@/utils/seoMetadata/types";

export const generateCanonicalUrl = (props: GenerateCanonicalUrlProps) => {
  if (props.type === "href") {
    return `${props.baseUrl}${props.href}`;
  }

  const { params, rewriteUrl, baseUrl } = props;

  switch (params?.type) {
    case "dynamic_param":
      return `${baseUrl}/${getHref({
        slug: params.param,
        rewriteUrl,
      })}`;

    default:
      return `${baseUrl}`;
  }
};
