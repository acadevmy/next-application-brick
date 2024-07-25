import { Metadata } from "next";

import { Seo } from "@/types";

export const getMetadata = (seoObj?: Seo): Metadata | null => {
  if (!seoObj) return null;

  const { ogImage, title, description, canonicalUrl, noIndex, noFollow } =
    seoObj;

  const cmsImage = ogImage
    ? {
        url: ogImage.url,
        alt: ogImage.title,
      }
    : undefined;

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
      images: cmsImage
        ? {
            url: cmsImage.url,
            alt: cmsImage.alt,
          }
        : undefined,
    },
    robots: {
      index: !noIndex,
      follow: !noFollow,
      googleBot: {
        index: !noIndex,
        follow: !noFollow,
      },
    },
  };
};

export const getGlobalMetadata = (title: string): Metadata => {
  return {
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    openGraph: {
      title: title,
    },
  };
};
