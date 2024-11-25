import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import {
  DynamicTimeZonePageParamsRoute,
  DynamicTimeZonePageProps,
} from "@/appTypes/PageProps";
import { fetchAvailableTimezones, fetchTimeApiDataByTimeZone } from "@/data";
import { getMetadata } from "@/utils/metadata";

export const generateMetadata = async ({
  params,
}: DynamicTimeZonePageProps): Promise<Metadata | null> => {
  const paramsData = await params;
  const time_zone = paramsData.time_zone;
  if (time_zone) return null;

  return getMetadata();
};

export const generateStaticParams = async () => {
  const availableTimezones = await fetchAvailableTimezones();

  return availableTimezones.map((item) => ({
    time_zone: item,
  })) satisfies DynamicTimeZonePageParamsRoute[];
};

const StaticDataTimeZonePage = async ({ params }: DynamicTimeZonePageProps) => {
  const time_zone = (await params).time_zone;

  const timeApiData = await fetchTimeApiDataByTimeZone(time_zone);

  return (
    <main className="flex flex-col justify-center items-center min-h-screen">
      <Image
        src="https://devmy.it/assets/svg/logo_white.svg"
        alt="Next.js logo"
        width={180}
        height={38}
        priority
      />
      <p className="text-xl mt-2 font-mono">fetch-static-data</p>
      <p className="mt-4 mb-10">
        last update {timeApiData.timeZone}:{" "}
        <span className="font-bold">{timeApiData.dateTime}</span>
      </p>
      <Link
        className=" bg-orange-500 text-white px-4 py-2 rounded-md"
        href={`/api/revalidate?tag=static-data-${timeApiData.timeZone}`}
        prefetch={false}
      >
        revalidate
      </Link>
    </main>
  );
};

export default StaticDataTimeZonePage;
