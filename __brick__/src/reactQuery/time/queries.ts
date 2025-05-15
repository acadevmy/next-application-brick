import { Locale } from "@/i18n/i18nConfig";
import { fetchRouteHandler } from "@/utils/helper/routeHandler";

import { TimeApiData } from "./types";

export const getTimeQuery = async ({
  timeZone,
}: {
  locale: Locale;
  timeZone: string | null;
}) => {
  if (!timeZone) return null;

  const response = await fetchRouteHandler<TimeApiData>(
    `/api/timeApi/${encodeURIComponent(timeZone)}`,
  );

  return response.data;
};
