import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as React from "react";

export type DialogOverlayProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Overlay
>;

export type DialogContentProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Content
> & {
  isFullScreen?: boolean;
};

export type DialogHeaderProps = React.HTMLAttributes<HTMLDivElement>;

export type DialogFooterProps = React.HTMLAttributes<HTMLDivElement>;

export type DialogTitleProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Title
>;

export type DialogDescriptionProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Description
>;
