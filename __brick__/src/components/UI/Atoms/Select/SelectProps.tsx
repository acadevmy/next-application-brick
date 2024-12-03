import * as SelectPrimitive from "@radix-ui/react-select";
import * as React from "react";

export interface SelectTriggerProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> {
  label?: string;
}

export interface SelectScrollUpButtonProps
  extends React.ComponentPropsWithoutRef<
    typeof SelectPrimitive.ScrollUpButton
  > {}

export interface SelectScrollDownButtonProps
  extends React.ComponentPropsWithoutRef<
    typeof SelectPrimitive.ScrollDownButton
  > {}

export interface SelectContentProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> {}

export interface SelectLabelProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label> {}

export interface SelectItemProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> {}
export interface SelectSeparatorProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator> {}
