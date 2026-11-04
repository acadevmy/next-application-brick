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

/** Column counts per breakpoint. One entry per step of the project scale. */
const COLUMN_CLASSES = {
  1: "grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-2 lg:grid-cols-4",
} as const;

export type GridColumns = keyof typeof COLUMN_CLASSES;

const SPAN_CLASSES = {
  1: "",
  2: "md:col-span-2",
  full: "col-span-full",
} as const;

export interface GridProps extends React.ComponentProps<"div"> {
  /** How many columns at full width; narrower screens step down. @default 2 */
  columns?: GridColumns;
  /** Space between cells. @default "md" */
  gap?: LayoutGap;
}

/** Responsive grid whose column count is a token, not a class string. */
const GridRoot = ({
  columns = 2,
  gap = "md",
  className,
  children,
  ...props
}: GridProps) => (
  <div
    data-slot="grid"
    className={cn("grid", COLUMN_CLASSES[columns], GAP_CLASSES[gap], className)}
    {...props}
  >
    {children}
  </div>
);

export interface GridItemProps extends React.ComponentProps<"div"> {
  /** How many columns this cell takes. @default 1 */
  span?: keyof typeof SPAN_CLASSES;
}

/** A cell that can take more than one column — e.g. a featured card. */
const GridItem = ({
  span = 1,
  className,
  children,
  ...props
}: GridItemProps) => (
  <div
    data-slot="grid-item"
    className={cn(SPAN_CLASSES[span], className)}
    {...props}
  >
    {children}
  </div>
);

const Grid = Object.assign(GridRoot, { Item: GridItem });

/**
 * No `"use client"` here, on purpose: `Grid.Item` is a property, and across the
 * server/client boundary only exports survive. As a client module a server
 * caller would get `undefined` for `Grid.Item`. There is nothing interactive to
 * justify it either — should that change, export the parts by name the way
 * `MediaSplit` does.
 */
export { Grid };
