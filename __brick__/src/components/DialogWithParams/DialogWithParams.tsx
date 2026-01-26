"use client";

import { DialogWithParamsProps } from "@/components/DialogWithParams/DialogWithParamsProps";
import Dialog from "@/components/UI/Molecules/Dialog";

import { useDialogWithParams } from "./hooks/useDialogWithParams";

const DialogWithParams = ({
  children,
  dialogOpenId,
  open,
  onOpenChange,
  ...restProps
}: DialogWithParamsProps) => {
  const { onOpenDialogChange, isOpenDialog } = useDialogWithParams({
    open,
    onOpenChange,
    dialogOpenId,
  });

  return (
    <Dialog
      open={isOpenDialog}
      onOpenChange={onOpenDialogChange}
      {...restProps}
    >
      {children}
    </Dialog>
  );
};

export default DialogWithParams;
