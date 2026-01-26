import { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";

import { ReactQueryPageProps } from "@/appTypes/PageProps";
import ExampleReactRouter from "@/components/ExampleReactRouter/ExampleReactRouter";
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

const ReactQueryPage = async ({}: ReactQueryPageProps) => {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen">
      <Image
        src="https://devmy.it/assets/svg/logo.svg"
        alt="Next.js logo"
        width={180}
        height={38}
        priority
      />
      <p className="text-xl mt-2 font-mono">react-router</p>

      <Suspense>
        <ExampleReactRouter />
      </Suspense>
    </main>
  );
};

export default ReactQueryPage;
