import { NextRequest } from "next/server";

import { fetchTimeApiDataByTimeZone } from "@/data";
import { handleRequest } from "@/utils/helper/routeHandler";

type TimeApiParams = {
  params: Promise<{
    time_zone: string;
  }>;
};

export const GET = async (request: NextRequest, { params }: TimeApiParams) =>
  await handleRequest(
    async () => await fetchTimeApiDataByTimeZone((await params).time_zone),
    request,
  );
