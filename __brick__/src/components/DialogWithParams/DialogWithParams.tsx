"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

import { DialogWithParamsProps } from "@/components/DialogWithParams/DialogWithParamsProps";
import Dialog from "@/components/UI/Molecules/Dialog";

const DialogWithParams = ({
  children,
  dialogOpenId,
  ...restProps
}: DialogWithParamsProps) => {
  const { push } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = useMemo(
    () => new URLSearchParams(searchParams.toString()),
    [searchParams],
  );

  const isParamOpen = useMemo(
    () => params.get(dialogOpenId),
    [dialogOpenId, params],
  );

  const onOpenChange = useCallback(
    (isOpen: boolean) => {
      if (isOpen) {
        params.set(dialogOpenId, "1");
      } else {
        params.delete(dialogOpenId);
      }
      push(`${pathname}?${params.toString()}`, {
        scroll: false,
      });
    },
    [dialogOpenId, params, pathname, push],
  );

  return (
    <Dialog {...restProps} open={!!isParamOpen} onOpenChange={onOpenChange}>
      {children}
    </Dialog>
  );
};

export default DialogWithParams;
