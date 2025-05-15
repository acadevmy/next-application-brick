import { useTranslations } from "next-intl";
import { ReactElement, useCallback, useState } from "react";
import { toast } from "sonner";

// import { ApplicationError } from "@/lib/applicationError";

const useNotify = () => {
  const t = useTranslations();

  const [toastLoadingId, setToastLoadingId] = useState<string | number>();

  const dismissLoadingToast = useCallback(() => {
    if (toastLoadingId) {
      toast.dismiss(toastLoadingId);
    }
  }, [toastLoadingId]);

  const mapNotifyTranslation = useCallback(
    (translationPath: string, tKey: string | undefined): string => {
      let title = t(`${translationPath}/generic`);
      if (tKey) {
        const notifyTKey = `${translationPath}/${tKey}`;
        if (t.has(notifyTKey)) title = t(notifyTKey);
      }

      return title;
    },
    [t],
  );

  const notifyLoading = useCallback(
    (tKey?: string) => {
      const toastLoadingId = toast.loading(
        mapNotifyTranslation("notify-loading", tKey),
      );
      setToastLoadingId(toastLoadingId);
    },
    [mapNotifyTranslation],
  );

  const notifySuccess = useCallback(
    (tKey?: string) => {
      toast.success(mapNotifyTranslation("notify-success", tKey), {
        closeButton: true,
      });
    },
    [mapNotifyTranslation],
  );

  const notifyCustom = useCallback(
    (content: (toastId: string | number) => ReactElement) => {
      toast.custom(content, {
        unstyled: true,
      });
    },
    [],
  );

  const notifyError = useCallback(
    (tKey: string | undefined, error: Error) => {
      toast.error(
        // TODO: handle ApplicationError
        // error instanceof ApplicationError
        error instanceof Error
          ? mapNotifyTranslation("error-code", "")
          : t("error-code/generic"),
        {
          description: mapNotifyTranslation("notify-error", tKey),
          closeButton: true,
        },
      );
    },
    [mapNotifyTranslation, t],
  );

  return {
    loading: notifyLoading,
    success: notifySuccess,
    error: notifyError,
    dismissLoading: dismissLoadingToast,
    notifyCustom,
  };
};

export default useNotify;
