import { NextRequest } from "next/server";

import { fetchTimeApiDataByTimeZone } from "@/data";
import { Locale } from "@/i18n/i18nConfig";
import { handleRequest } from "@/utils/helper/routeHandler";

type TimeApiParams = {
  params: Promise<{
    time_zone: string;
    locale: Locale;
  }>;
};

export const GET = async (request: NextRequest, { params }: TimeApiParams) =>
  await handleRequest(async () => {
    const { time_zone } = await params;

    return await fetchTimeApiDataByTimeZone(time_zone);
  }, request);
