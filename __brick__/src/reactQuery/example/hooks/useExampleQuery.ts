import { useLocale } from "@/i18n/routing";
import useQuery from "@/reactQuery/hooks/useQuery";
import { DEFAULT_EMPTY_STRING } from "@/utils/utilityConstants";

import { getExampleQueryKeys } from "../keys";
import { getExampleQuery } from "../queries";

type UseExampleQueryProps = {
  param: string | null;
};

const useExampleQuery = ({ param }: UseExampleQueryProps) => {
  const locale = useLocale();

  const {
    data: example,
    isLoading,
    isFetching,
  } = useQuery({
    tKey: "getExample",
    queryKey: getExampleQueryKeys({
      locale,
      param: param || DEFAULT_EMPTY_STRING,
    }),
    queryFn: () => getExampleQuery({ param, locale }),
    enabled: !!param,
  });

  return {
    example,
    isLoading,
    isFetching,
  };
};

export default useExampleQuery;
