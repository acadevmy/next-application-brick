import { Metadata } from "next";

import { GetSeoMetaDataProps } from "@/utils/seoMetadata/types";
import { DEFAULT_EMPTY_STRING } from "@/utils/utilityConstants";
import { createMetaDescription } from "@/utils/utilityFunction";

const serializeSeoMetadata = ({
  seoObj,
  defaultSeoObj,
}: GetSeoMetaDataProps) => {
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

export const getSeoMetadata = ({
  defaultSeoObj,
  seoObj,
}: GetSeoMetaDataProps): Metadata | null => {
  const { ogImage, title, description, canonicalUrl } = serializeSeoMetadata({
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
