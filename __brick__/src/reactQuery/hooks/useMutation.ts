import {
  useMutation as useTanstackMutation,
  UseMutationOptions,
} from "@tanstack/react-query";

import { useNotify } from "@/notify";

type UseMutationProps<TData, TError, TVariables> = UseMutationOptions<
  TData,
  TError,
  TVariables
> & {
  tKey?: string;
  hideLoadingNotify?: boolean;
  hideErrorNotify?: boolean;
  hideSuccessNotify?: boolean;
  notifyLoading?: () => void;
  notifySuccess?: () => void;
  notifyError?: () => void;
};

const useMutation = <
  TData = unknown,
  TError extends Error = Error,
  TVariables = void,
>({
  tKey,
  hideLoadingNotify = false,
  hideSuccessNotify = false,
  hideErrorNotify = false,
  notifyLoading,
  notifySuccess,
  notifyError,
  ...tanstackMutationOptions
}: UseMutationProps<TData, TError, TVariables>) => {
  const notify = useNotify();

  const mutationResult = useTanstackMutation({
    ...tanstackMutationOptions,
    onMutate:
      !hideLoadingNotify || tanstackMutationOptions.onMutate
        ? (variables: TVariables) => {
            tanstackMutationOptions.onMutate?.(variables);
            if (!hideLoadingNotify) {
              if (notifyLoading) {
                notifyLoading();
              } else {
                notify.loading(tKey);
              }
            }
          }
        : undefined,
    onSuccess:
      !hideSuccessNotify || tanstackMutationOptions.onSuccess
        ? (data, variables, context) => {
            tanstackMutationOptions.onSuccess?.(data, variables, context);
            if (!hideSuccessNotify) {
              if (notifySuccess) {
                notifySuccess();
              } else {
                notify.success(tKey);
              }
            }
          }
        : undefined,
    onError:
      !hideErrorNotify || tanstackMutationOptions.onError
        ? (error, variables, context) => {
            tanstackMutationOptions.onError?.(error, variables, context);
            if (!hideErrorNotify) {
              if (notifyError) {
                notifyError();
              } else {
                notify.error(tKey, error);
              }
            }
          }
        : undefined,
    onSettled: () => {
      notify.dismissLoading();
    },
  });

  return mutationResult;
};

export default useMutation;
