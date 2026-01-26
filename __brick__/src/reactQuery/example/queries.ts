import { fetchRouteHandler } from "@/utils/helper/routeHandler";

import { ExampleData } from "./types";

export const getExampleQuery = async ({
  param,
  locale,
}: {
  param: string | null;
  locale: string;
}) => {
  if (!param) return null;

  const response = await fetchRouteHandler<ExampleData>(
    `/${locale}/api/example/${encodeURIComponent(param)}`,
  );

  return response.data;
};
