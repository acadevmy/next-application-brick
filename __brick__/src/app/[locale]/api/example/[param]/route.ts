import { NextRequest } from "next/server";

import { fetchExampleData } from "@/data";
import { handleRequest } from "@/utils/helper/routeHandler";

export const GET = async (
  request: NextRequest,
  { params }: RouteContext<"/[locale]/api/example/[param]">,
) => {
  const { param } = await params;
  return await handleRequest(async () => {
    return await fetchExampleData(param);
  }, request);
};
