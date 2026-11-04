"use client";

import { Slot } from "radix-ui";
import * as React from "react";

import { cn } from "@/components/UI/Foundations/style";
import {
  ALIGN_CLASSES,
  GAP_CLASSES,
  JUSTIFY_CLASSES,
  type LayoutGap,
} from "@/components/UI/Layout/Stack/Stack";

export interface InlineProps extends React.ComponentProps<"div"> {
  /** Render the layout on the child element instead of a wrapper div. */
  asChild?: boolean;
  /** Space between children, from the spacing scale. @default "md" */
  gap?: LayoutGap;
  /** Cross-axis alignment. @default "center" */
  align?: keyof typeof ALIGN_CLASSES;
  /** Main-axis distribution. */
  justify?: keyof typeof JUSTIFY_CLASSES;
  /** Let children flow onto more lines when they do not fit. @default true */
  wrap?: boolean;
}

/** Horizontal flow with a token-sized gap. The horizontal half of the layout pair. */
const Inline = ({
  gap = "md",
  align = "center",
  justify,
  wrap = true,
  asChild = false,
  className,
  children,
  ...props
}: InlineProps) => {
  const Comp = asChild ? Slot.Root : "div";
  return (
    <Comp
      data-slot="inline"
      className={cn(
        "flex flex-row",
        wrap && "flex-wrap",
        GAP_CLASSES[gap],
        ALIGN_CLASSES[align],
        justify && JUSTIFY_CLASSES[justify],
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  );
};

export { Inline };
