import { Metadata } from "next";
import Image from "next/image";

import {
  StaticDataPageParamsRoute,
  StaticDataPageProps,
} from "@/appTypes/PageProps";
import { fetchExampleData } from "@/data";
import { Link } from "@/i18n/routing";
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

export const generateStaticParams = async () => {
  return [] satisfies StaticDataPageParamsRoute[];
};

const StaticDataPage = async ({ params }: StaticDataPageProps) => {
  const { locale } = await params;
  const exampleData = await fetchExampleData("test");

  return (
    <main className="flex flex-col justify-center items-center min-h-screen">
      <Image
        src="https://devmy.it/assets/svg/logo.svg"
        alt="Next.js logo"
        width={180}
        height={38}
        priority
      />
      <p className="font-mono">fetch-static-data</p>
      <p className="mt-4 mb-10">
        <span className="font-bold">{exampleData.message}</span>
      </p>
      <Link
        className=" bg-orange-500 text-white px-4 py-2 rounded-md"
        href={`/api/revalidate?path=/${locale}/static-data`}
        prefetch={false}
      >
        revalidate
      </Link>
    </main>
  );
};

export default StaticDataPage;
