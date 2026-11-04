"use client";

import * as React from "react";

import { Icon, type IconSize } from "@/components/UI/Atoms/Icon";
import { Icons } from "@/components/UI/Atoms/Icon/icons";
import { cn } from "@/components/UI/Foundations/style";

const SPINNER_TONE_CLASSES = {
  default: "text-foreground",
  muted: "text-muted-foreground",
  /** Takes whatever colour the parent already set (e.g. inside Button). */
  current: "text-current",
} as const;

export interface SpinnerProps {
  /** Size from Icon scale. Default: m (24px). */
  size?: IconSize;
  /** Optional class for layout/placement only. */
  className?: string;
  /** Same vocabulary as Typography: default, muted, current. @default "default" */
  tone?: keyof typeof SPINNER_TONE_CLASSES;
  /**
   * Announced as a status, in the page's language. Omit it when the context
   * already says what is loading (e.g. inside a labelled Button): the spinner
   * is then decorative and hidden from assistive technology.
   */
  "aria-label"?: string;
}

/**
 * Loading spinner using the design-system Icon (Huge Icons Loading02) with animate-spin.
 * Use for async/loading states (buttons, sections).
 */
const Spinner = ({
  size = "m",
  className,
  tone = "default",
  "aria-label": ariaLabel,
  ...props
}: SpinnerProps) => {
  return (
    <Icon
      icon={Icons.Loading}
      size={size}
      className={cn(
        "animate-spin animation-duration-[1500ms]",
        SPINNER_TONE_CLASSES[tone],
        className,
      )}
      {...props}
      {...(ariaLabel
        ? { "aria-label": ariaLabel, role: "status" }
        : { "aria-hidden": true })}
    />
  );
};

export { Spinner };
