import {
  useQuery as useTanstackQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { useEffect } from "react";

import { useNotify } from "@/notify";

type UseQueryProps<TQueryFnData, TError, TData> = UseQueryOptions<
  TQueryFnData,
  TError,
  TData
> & {
  tKey?: string;
};

const useQuery = <
  TQueryFnData = unknown,
  TError extends Error = Error,
  TData = TQueryFnData,
>({
  tKey,
  ...tanstackQueryOptions
}: UseQueryProps<TQueryFnData, TError, TData>) => {
  const notify = useNotify();

  const queryResult = useTanstackQuery({
    ...tanstackQueryOptions,
    retry: false,
  });

  useEffect(() => {
    if (queryResult.isError && queryResult.error) {
      notify.error(tKey, queryResult.error);
    }
  }, [notify, queryResult.error, queryResult.isError, tKey]);

  return queryResult;
};

export default useQuery;
