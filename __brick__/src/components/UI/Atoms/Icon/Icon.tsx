"use client";

import * as React from "react";

import { cn } from "@/components/UI/Foundations/style";

/** Icon sizes in px: XS 16, S 20, M 24, L 28, XL 32, 2XL 40, 3XL 56 */
export const ICON_SIZES = {
  xs: 16,
  s: 20,
  m: 24,
  l: 28,
  xl: 32,
  "2xl": 40,
  "3xl": 56,
} as const;

export type IconSize = keyof typeof ICON_SIZES;

/**
 * Any icon component from the project set: lucide icons and the brand marks in
 * Icon/brand share this shape.
 */
export type IconComponent = React.ComponentType<
  { size?: string | number } & React.SVGProps<SVGSVGElement>
>;

export interface IconProps extends Omit<
  React.SVGProps<SVGSVGElement>,
  "ref" | "color"
> {
  /** Icon from the project set, e.g. `Icons.Search`. */
  icon: IconComponent;
  /** Size from the icon scale. @default m (24px) */
  size?: IconSize;
  className?: string;
}

const Icon = ({
  icon: IconComponent,
  size = "m",
  className,
  ...props
}: IconProps) => (
  <IconComponent
    size={ICON_SIZES[size]}
    className={cn("shrink-0", className)}
    data-slot="icon"
    data-size={size}
    {...props}
  />
);

export { Icon };
