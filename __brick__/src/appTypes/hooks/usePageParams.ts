import { useParams } from "next/navigation";
import { useMemo } from "react";

import { DynamicParamPageParamsRoute, PagesParams } from "@/appTypes/PageProps";
import { instanceOf } from "@/utils/typeCheck";

const usePageParams = () => {
  const params = useParams();
  return useMemo<PagesParams | undefined>(() => {
    switch (true) {
      case instanceOf<DynamicParamPageParamsRoute>(params, "param"):
        return { ...params, type: "dynamic_param" };
    }
  }, [params]);
};

export default usePageParams;
