"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { Dialog as DialogPrimitive } from "radix-ui";
import * as React from "react";

import { Button } from "@/components/UI/Atoms/Button";
import { cn } from "@/components/UI/Foundations/style";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      // Above the site header so the scrim dims it too (see --z-* in theme.css).
      "fixed inset-0 z-(--z-dialog) flex flex-col items-center overflow-y-auto bg-inverted/50 p-0 md:p-4 data-[state=open]:animate-in data-[state=closed]:animate-out",
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const dialogContentVariants = cva(
  [
    "relative z-50 bg-background text-foreground shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out",
    "flex min-h-full w-full shrink-0 flex-col border-0 p-6 pt-10 md:my-auto md:min-h-0 md:border md:border-border",
    "md:rounded-dialog md:p-8",
  ],
  {
    variants: {
      size: {
        /** Standard modal. */
        default: "md:max-w-(--width-dialog-max)",
        /** Wide modal, for forms and settings. */
        lg: "md:max-w-5xl",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

const DialogContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> &
    VariantProps<typeof dialogContentVariants> & {
      /** Accessible name of the close button, in the page's language. */
      closeLabel: string;
    }
>(({ className, children, size, closeLabel, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay>
      <DialogPrimitive.Content
        ref={ref}
        className={cn(dialogContentVariants({ size }), className)}
        {...props}
      >
        {children}
        <DialogClose asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon-lg"
            className="absolute right-4 top-4"
            aria-label={closeLabel}
          >
            <X className="size-5" />
          </Button>
        </DialogClose>
      </DialogPrimitive.Content>
    </DialogOverlay>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div className={cn("mb-6 flex flex-col gap-2", className)} {...props} />
);

const DialogFooter = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div
    className={cn(
      "mt-auto flex flex-col gap-6 sticky bottom-0 -mx-6 -mb-6 bg-background px-6 py-4 md:static md:mx-0 md:mb-0 md:mt-6 md:bg-transparent md:p-0 md:flex-row md:justify-end",
      className,
    )}
    {...props}
  />
);

const DialogTitle = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("heading-4 font-medium text-foreground", className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const dialogDescriptionVariants = cva("text-foreground font-medium", {
  variants: {
    size: { default: "body-2", lg: "body-1" },
  },
  defaultVariants: { size: "default" },
});

const DialogDescription = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description> &
    VariantProps<typeof dialogDescriptionVariants>
>(({ className, size, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn(dialogDescriptionVariants({ size }), className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
};
