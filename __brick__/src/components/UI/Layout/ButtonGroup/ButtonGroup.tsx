"use client";

import * as React from "react";

import { cn } from "@/components/UI/Foundations/style";
import { type LayoutGap } from "@/components/UI/Layout/Stack";

const GAP_CLASSES: Record<LayoutGap, string> = {
  none: "",
  xs: "gap-1",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
  "2xl": "gap-10",
};

/** Breakpoint at which the group stops stacking. */
const ROW_FROM_CLASSES = {
  never: "flex-col",
  md: "flex-col md:flex-row",
  lg: "flex-col lg:flex-row",
  always: "flex-row",
} as const;

const ALIGN_CLASSES = {
  start: "items-stretch md:items-start",
  center: "items-stretch md:items-center",
  end: "items-stretch md:items-end",
} as const;

const JUSTIFY_CLASSES = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
} as const;

export interface ButtonGroupProps extends React.ComponentProps<"div"> {
  /** Where the buttons stop stacking and sit on one row. @default "md" */
  rowFrom?: keyof typeof ROW_FROM_CLASSES;
  /** Space between buttons. @default "md" */
  gap?: LayoutGap;
  /** Cross-axis alignment once on a row. @default "center" */
  align?: keyof typeof ALIGN_CLASSES;
  /** Main-axis distribution once on a row. @default "start" */
  justify?: keyof typeof JUSTIFY_CLASSES;
}

/**
 * A row of calls to action that stacks on small screens.
 *
 * This pattern was written by hand in three places with three different
 * breakpoints; the group owns the decision now. Pair it with
 * `<Button width="responsive">` so the buttons fill the column while stacked.
 */
const ButtonGroup = ({
  rowFrom = "md",
  gap = "md",
  align = "center",
  justify = "start",
  className,
  children,
  ...props
}: ButtonGroupProps) => (
  <div
    data-slot="button-group"
    className={cn(
      "flex",
      ROW_FROM_CLASSES[rowFrom],
      GAP_CLASSES[gap],
      ALIGN_CLASSES[align],
      JUSTIFY_CLASSES[justify],
      className,
    )}
    {...props}
  >
    {children}
  </div>
);

export { ButtonGroup };
