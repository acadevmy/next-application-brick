import { useParams } from "next/navigation";
import { useMemo } from "react";

import {
  DynamicTimeZonePageParamsRoute,
  PagesParams,
} from "@/appTypes/PageProps";
import { instanceOf } from "@/utils/typeCheck";

const usePageParams = () => {
  const params = useParams();
  return useMemo<PagesParams | undefined>(() => {
    switch (true) {
      case instanceOf<DynamicTimeZonePageParamsRoute>(params, "time_zone"):
        return { ...params, type: "dynamic_time_zone" };
    }
  }, [params]);
};

export default usePageParams;
