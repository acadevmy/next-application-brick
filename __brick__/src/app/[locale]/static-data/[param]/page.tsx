import { Metadata } from "next";
import Image from "next/image";

import {
  DynamicParamPageParamsRoute,
  DynamicParamPageProps,
} from "@/appTypes/PageProps";
import { fetchExampleData } from "@/data";
import { Link } from "@/i18n/routing";
import { generateCanonicalUrl, getSeoMetadata } from "@/utils/seoMetadata";

export const generateMetadata = async ({
  params,
}: DynamicParamPageProps): Promise<Metadata | null> => {
  const paramsData = await params;
  const { param } = paramsData;
  if (param) return null;
  const defaultCanonicalUrl = generateCanonicalUrl({
    type: "params",
    params: { ...paramsData, type: "dynamic_param" },
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
  return [] satisfies DynamicParamPageParamsRoute[];
};

const DynamicParamPage = async ({ params }: DynamicParamPageProps) => {
  const { locale, param } = await params;

  const exampleData = await fetchExampleData(param);

  return (
    <main className="flex flex-col justify-center items-center min-h-screen">
      <Image
        src="https://devmy.it/assets/svg/logo.svg"
        alt="Next.js logo"
        width={180}
        height={38}
        priority
      />
      <p className="text-xl mt-2 font-mono">fetch-static-data</p>
      <p className="mt-4 mb-10">{exampleData.message}</p>
      <Link
        className=" bg-orange-500 text-white px-4 py-2 rounded-md"
        href={`/api/revalidate?path=/${locale}/static-data/${param}`}
        prefetch={false}
      >
        revalidate
      </Link>
    </main>
  );
};

export default DynamicParamPage;
