"use client";

import * as React from "react";

import { Icon, type IconProps } from "@/components/UI/Atoms/Icon";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/UI/Atoms/ToggleGroup";

/** One option of a SegmentedControl. */
export interface SegmentedControlOption<T extends string> {
  value: T;
  label: string;
  /** Optional icon identifier; when iconOnly is true, only the icon is shown (label used for aria-label). */
  icon?: IconProps["icon"];
}

export interface SegmentedControlProps<T extends string> extends Omit<
  React.ComponentProps<"div">,
  "onChange"
> {
  options: SegmentedControlOption<T>[];
  value: T;
  onChange: (value: T) => void;
  /** Accessible name for the group. */
  "aria-label": string;
  /** When true, render only option.icon (option.label used as aria-label per item). */
  iconOnly?: boolean;
}

/**
 * Picks one value out of a few, with the options given as data: a view switch
 * (list / grid), a period (day / week / month). Built on the ToggleGroup atom;
 * reach for that directly when the items need custom content.
 */
const SegmentedControlInner = <T extends string>({
  className,
  options,
  value,
  onChange,
  "aria-label": ariaLabel,
  iconOnly = false,
}: SegmentedControlProps<T>) => {
  return (
    <ToggleGroup
      type="single"
      value={value}
      onValueChange={(v) => v && onChange(v as T)}
      aria-label={ariaLabel}
      className={className}
      data-slot="segmented-control"
    >
      {options.map((opt) => (
        <ToggleGroupItem
          key={opt.value}
          value={opt.value}
          aria-label={iconOnly && opt.icon != null ? opt.label : undefined}
        >
          {iconOnly && opt.icon != null ? (
            <Icon icon={opt.icon} size="xs" aria-hidden />
          ) : (
            opt.label
          )}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};

const SegmentedControl = SegmentedControlInner as <T extends string>(
  props: SegmentedControlProps<T>,
) => React.ReactElement;

export { SegmentedControl };
