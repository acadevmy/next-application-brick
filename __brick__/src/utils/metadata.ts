import { Metadata } from "next";

import { PagesParams } from "@/appTypes/PageProps";
import { getHref } from "@/utils/navigation";
import { instanceOf } from "@/utils/typeCheck";
import { DEFAULT_EMPTY_STRING } from "@/utils/utilityConstants";
import { createMetaDescription } from "@/utils/utilityFunction";

type GenerateCanonicalProps =
  | {
      params: PagesParams;
      rewriteUrl?: string | null;
    }
  | {
      href: string;
    };

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

type DefaultSeo = Pick<
  Seo,
  "title" | "description" | "ogImage" | "canonicalUrl"
>;

interface GetMetaData {
  seoObj?: Seo | null;
  defaultSeoObj: DefaultSeo;
}

const serializeSeo = ({ seoObj, defaultSeoObj }: GetMetaData) => {
  return {
    ...seoObj,
    title: seoObj?.title ?? defaultSeoObj.title,
    description:
      seoObj?.description ??
      createMetaDescription(defaultSeoObj?.description ?? DEFAULT_EMPTY_STRING),
    ogImage: seoObj?.ogImage ?? defaultSeoObj.ogImage,
    canonicalUrl: seoObj?.canonicalUrl ?? defaultSeoObj.canonicalUrl,
  };
};

export const getMetadata = ({
  defaultSeoObj,
  seoObj,
}: GetMetaData): Metadata | null => {
  const { ogImage, title, description, canonicalUrl } = serializeSeo({
    seoObj,
    defaultSeoObj,
  });

  return {
    title,
    description,
    metadataBase: canonicalUrl ? new URL(canonicalUrl) : undefined,
    alternates: canonicalUrl
      ? {
          canonical: "/",
        }
      : undefined,
    openGraph: {
      title: title ?? undefined,
      description: description ?? undefined,
      images: ogImage
        ? {
            url: ogImage.url,
            alt: ogImage.url,
          }
        : undefined,
    },
    robots: {
      index: !seoObj?.noIndex,
      follow: !seoObj?.noFollow,
      googleBot: {
        index: !seoObj?.noIndex,
        follow: !seoObj?.noFollow,
      },
    },
  };
};

export const getGlobalMetadata = (
  title: string,
  faviconUrl?: string | null,
): Metadata => {
  return {
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    openGraph: {
      title: title,
    },
    ...(faviconUrl
      ? {
          icons: {
            icon: { url: faviconUrl },
          },
        }
      : {}),
  };
};

export const generateCanonicalUrl = (props?: GenerateCanonicalProps) => {
  const baseUrl = "http://localhost:4000";
  if (!props) return `${baseUrl}/`;

  if (instanceOf(props, "href")) {
    return `${baseUrl}${props.href}`;
  }

  const { params, rewriteUrl } = props;

  switch (params?.type) {
    case "dynamic_time_zone":
      return `${baseUrl}/${getHref({
        slug: params.time_zone,
        rewriteUrl,
      })}`;

    default:
      return `${baseUrl}`;
  }
};
