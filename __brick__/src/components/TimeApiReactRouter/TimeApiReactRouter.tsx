"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

import { TimeApiData } from "@/data/types";
import { RouteHandlerResponseType } from "@/utils/helper/types";

const query = async (timeZone: string | null) => {
  if (!timeZone) return;

  const response = await fetch(`/api/timeApi/${encodeURIComponent(timeZone)}`);

  const payloadData =
    (await response.json()) as RouteHandlerResponseType<TimeApiData>;

  return payloadData.data;
};

const TimeApiReactRouter = () => {
  const searchParams = useSearchParams();
  const timeZoneParam = useMemo(
    () => searchParams.get("time_zone"),
    [searchParams],
  );

  const { data } = useQuery({
    queryKey: [`time-zone-${timeZoneParam}`],
    queryFn: () => query(timeZoneParam),
    enabled: !!timeZoneParam,
  });

  return (
    <>
      <p className="mt-4 mb-10">
        last update: <span className="font-bold">{data?.dateTime}</span>
      </p>
    </>
  );
};

export default TimeApiReactRouter;
