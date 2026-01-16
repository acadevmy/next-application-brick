import { Metadata } from "next";
import Image from "next/image";

import { HomePageProps } from "@/appTypes/PageProps";
import { generateCanonicalUrl, getSeoMetadata } from "@/utils/seoMetadata";

export const generateMetadata = async (): Promise<Metadata | null> => {
  const defaultCanonicalUrl = generateCanonicalUrl({
    type: "href",
    href: "/",
    baseUrl: process.env.{{applicationName.constantCase()}}_DOMAIN as string,
  });

  return getSeoMetadata({
    seoObj: {},
    defaultSeoObj: {
      canonicalUrl: defaultCanonicalUrl,
    },
  });
};

const HomePage = async ({}: HomePageProps) => {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen">
      <Image
        src="https://devmy.it/assets/svg/logo.svg"
        alt="Next.js logo"
        width={180}
        height={38}
        priority
      />
      <p className="font-mono mt-4">nextjs-brick</p>
      <p>{process.env.FRONTEND_VERCEL_ORG_ID}</p>
    </main>
  );
};

export default HomePage;
