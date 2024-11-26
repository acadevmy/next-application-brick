import { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";

import TimeApiReactRouter from "@/components/TimeApiReactRouter/TimeApiReactRouter";
import { generateCanonicalUrl, getSeoMetadata } from "@/utils/seoMetadata";

export const generateMetadata = async (): Promise<Metadata | null> => {
  const defaultCanonicalUrl = generateCanonicalUrl({
    type: "href",
    href: "/react-query",
    baseUrl: process.env.{{applicationName.constantCase()}}_DOMAIN as string,
  });

  return getSeoMetadata({
    seoObj: {},
    defaultSeoObj: {
      canonicalUrl: defaultCanonicalUrl,
    },
  });
};

const ReactQueryPage = async () => {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen">
      <Image
        src="https://devmy.it/assets/svg/logo_white.svg"
        alt="Next.js logo"
        width={180}
        height={38}
        priority
      />
      <p className="text-xl mt-2 font-mono">react-router</p>

      <Suspense>
        <TimeApiReactRouter />
      </Suspense>
    </main>
  );
};

export default ReactQueryPage;
