"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { Separator as SeparatorPrimitive } from "radix-ui";
import * as React from "react";

import { cn } from "@/components/UI/Foundations/style";

const separatorVariants = cva("shrink-0", {
  variants: {
    variant: {
      default: "bg-border",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

/**
 * Separator: a horizontal or vertical rule in the border colour.
 * Use decorative when the line is purely visual (e.g. between title and filter row).
 */
const Separator = React.forwardRef<
  React.ComponentRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> &
    VariantProps<typeof separatorVariants>
>(
  (
    {
      className,
      orientation = "horizontal",
      decorative = true,
      variant,
      ...props
    },
    ref,
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        separatorVariants({ variant }),
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className,
      )}
      {...props}
    />
  ),
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
