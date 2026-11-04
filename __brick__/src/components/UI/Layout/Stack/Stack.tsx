"use client";

import { Slot } from "radix-ui";
import * as React from "react";

import { cn } from "@/components/UI/Foundations/style";

const GAP_CLASSES = {
  none: "",
  xs: "gap-1",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
  "2xl": "gap-10",
} as const;

export type LayoutGap = keyof typeof GAP_CLASSES;

const ALIGN_CLASSES = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
} as const;

const JUSTIFY_CLASSES = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
} as const;

export interface StackProps extends React.ComponentProps<"div"> {
  /** Render the layout on the child element instead of a wrapper div. */
  asChild?: boolean;
  /** Space between children, from the spacing scale. @default "md" */
  gap?: LayoutGap;
  /** Cross-axis alignment. */
  align?: keyof typeof ALIGN_CLASSES;
  /** Main-axis distribution. */
  justify?: keyof typeof JUSTIFY_CLASSES;
}

/** Vertical flow with a token-sized gap. The vertical half of the layout pair. */
const Stack = ({
  gap = "md",
  align,
  justify,
  asChild = false,
  className,
  children,
  ...props
}: StackProps) => {
  const Comp = asChild ? Slot.Root : "div";
  return (
    <Comp
      data-slot="stack"
      className={cn(
        "flex flex-col",
        GAP_CLASSES[gap],
        align && ALIGN_CLASSES[align],
        justify && JUSTIFY_CLASSES[justify],
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  );
};

export { ALIGN_CLASSES, GAP_CLASSES, JUSTIFY_CLASSES, Stack };
