"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

import useTime from "@/reactQuery/time/hooks/useTime";

const TimeApiReactRouter = () => {
  const searchParams = useSearchParams();
  const timeZoneParam = useMemo(
    () => searchParams.get("time_zone"),
    [searchParams],
  );

  const { time } = useTime({
    timeZoneParam: timeZoneParam,
  });

  return (
    <>
      <p className="mt-4 mb-10">
        last update: <span className="font-bold">{time?.dateTime}</span>
      </p>
    </>
  );
};

export default TimeApiReactRouter;
