import { useQueryState } from "nuqs";
import { useCallback, useEffect } from "react";

type UseDialogWithParamsProps = {
  dialogOpenId: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const OPENED_STATUS = "1" as const;
const CLOSE_STATUS = null;

export const useDialogWithParams = ({
  dialogOpenId,
  onOpenChange,
  open,
}: UseDialogWithParamsProps) => {
  const [dialogOpenIdQueryState, setDialogOpenIdQueryState] = useQueryState(
    dialogOpenId,
    {
      history: "push",
    },
  );

  useEffect(() => {
    if (!open) setDialogOpenIdQueryState(CLOSE_STATUS);
  }, [open, setDialogOpenIdQueryState]);

  useEffect(() => {
    onOpenChange?.(dialogOpenIdQueryState === OPENED_STATUS);
  }, [dialogOpenIdQueryState, onOpenChange]);

  const onOpenChangeHandler = useCallback(
    (isOpen: boolean) => {
      if (isOpen) {
        setDialogOpenIdQueryState(OPENED_STATUS);
      } else {
        setDialogOpenIdQueryState(CLOSE_STATUS);
      }
    },
    [setDialogOpenIdQueryState],
  );

  return {
    onOpenDialogChange: onOpenChangeHandler,
    isOpenDialog: dialogOpenIdQueryState === OPENED_STATUS,
  };
};
