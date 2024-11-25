import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { fetchTimeApiData } from "@/data";
import { generateCanonicalUrl, getSeoMetadata } from "@/utils/seoMetadata";

export const generateMetadata = async (): Promise<Metadata | null> => {
  const defaultCanonicalUrl = generateCanonicalUrl({
    type: "href",
    href: "/static-data",
    baseUrl: process.env.{{applicationName.constantCase()}}_DOMAIN as string,
  });

  return getSeoMetadata({
    seoObj: {},
    defaultSeoObj: {
      canonicalUrl: defaultCanonicalUrl,
    },
  });
};

const StaticDataPage = async () => {
  const timeApiData = await fetchTimeApiData();

  return (
    <main className="flex flex-col justify-center items-center min-h-screen">
      <Image
        src="https://devmy.it/assets/svg/logo_white.svg"
        alt="Next.js logo"
        width={180}
        height={38}
        priority
      />
      <p className="font-mono">fetch-static-data</p>
      <p className="mt-4 mb-10">
        last update: <span className="font-bold">{timeApiData.dateTime}</span>
      </p>
      <Link
        className=" bg-orange-500 text-white px-4 py-2 rounded-md"
        href="/api/revalidate?tag=static-data"
        prefetch={false}
      >
        revalidate
      </Link>
    </main>
  );
};

export default StaticDataPage;
