"use client";

import * as React from "react";

import { cn } from "@/components/UI/Foundations/style";

/** Measure: how wide a column of text is allowed to get. */
const WIDTH_CLASSES = {
  narrow: "max-w-(--measure-narrow)",
  default: "max-w-(--measure-default)",
  wide: "max-w-(--measure-wide)",
  full: "",
} as const;

const ALIGN_CLASSES = {
  left: "text-left",
  center: "text-center",
} as const;

export interface ProseProps extends React.ComponentProps<"div"> {
  /** Reading measure. @default "default" */
  width?: keyof typeof WIDTH_CLASSES;
  /** Text alignment. @default "left" */
  align?: keyof typeof ALIGN_CLASSES;
  /** Centre the column in its container. @default true */
  centered?: boolean;
  /** Apply the `.prose` typography rules to raw HTML children. @default true */
  typography?: boolean;
}

/**
 * A column of readable text.
 *
 * Replaces the hand-written `mx-auto max-w-[600px]` / `max-w-[640px]` pairs:
 * the measure is a token choice, not a magic number at the call site.
 */
const Prose = ({
  width = "default",
  align = "left",
  centered = true,
  typography = true,
  className,
  children,
  ...props
}: ProseProps) => (
  <div
    data-slot="prose"
    className={cn(
      typography && "prose",
      WIDTH_CLASSES[width],
      ALIGN_CLASSES[align],
      centered && "mx-auto",
      className,
    )}
    {...props}
  >
    {children}
  </div>
);

export { Prose };
