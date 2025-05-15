import { useLocale } from "@/i18n/routing";
import useQuery from "@/reactQuery/hooks/useQuery";
import { DEFAULT_EMPTY_STRING } from "@/utils/utilityConstants";

import { getTimeQueryKeys } from "../keys";
import { getTimeQuery } from "../queries";

type UseTimeProps = {
  timeZoneParam: string | null;
};

const useTime = ({ timeZoneParam }: UseTimeProps) => {
  const locale = useLocale();

  const {
    data: time,
    isLoading,
    isFetching,
  } = useQuery({
    tKey: "getTime",
    queryKey: getTimeQueryKeys({
      locale,
      timeZoneParam: timeZoneParam || DEFAULT_EMPTY_STRING,
    }),
    queryFn: () => getTimeQuery({ locale, timeZone: timeZoneParam }),
    enabled: !!timeZoneParam,
  });

  return {
    time,
    isLoading,
    isFetching,
  };
};

export default useTime;
