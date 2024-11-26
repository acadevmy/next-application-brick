import { Metadata } from "next";

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
