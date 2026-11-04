import { Metadata } from "next";

import { SITE_NAME } from "@/lib/site/config";

import { createMetaDescription } from "./createMetaDescription";
import { GetSeoMetaDataProps } from "./types";

// Facebook's recommended OG size (1.91:1). Serve an image already cropped to
// this size and declare its dimensions: scrapers then render it on the first
// pass, while an arbitrary ratio/size without dimensions may be dropped as
// "corrupted or invalid format".
const OG_IMAGE_WIDTH = 1200;
const OG_IMAGE_HEIGHT = 630;
const OG_IMAGE_TYPE = "image/jpeg";

const serializeSeoMetadata = ({
  seoObj,
  defaultSeoObj,
}: GetSeoMetaDataProps) => {
  return {
    ...seoObj,
    title: seoObj?.title ?? defaultSeoObj.title,
    // Cleaned whatever its source: a CMS override is the one most likely to
    // carry HTML, entities or a 400-character abstract.
    description: createMetaDescription(
      seoObj?.description ?? defaultSeoObj?.description ?? "",
    ),
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

  const ogImageUrl = ogImage ?? undefined;

  return {
    title,
    description,
    // canonicalUrl is the page's own path (or a CMS override), resolved against
    // the global metadataBase set in getGlobalMetadata.
    alternates: canonicalUrl ? { canonical: canonicalUrl } : undefined,
    openGraph: {
      type: "website",
      url: canonicalUrl ?? undefined,
      title: title ?? undefined,
      description: description ?? undefined,
      images: ogImageUrl
        ? {
            url: ogImageUrl,
            width: OG_IMAGE_WIDTH,
            height: OG_IMAGE_HEIGHT,
            type: OG_IMAGE_TYPE,
            alt: title || SITE_NAME,
          }
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: title ?? undefined,
      description: description ?? undefined,
      images: ogImageUrl ? [ogImageUrl] : undefined,
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
