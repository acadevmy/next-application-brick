"use client";

import * as React from "react";

import { cn } from "@/components/UI/Foundations/style";

/**
 * Semantic surface tones. A tone says what the area *means*, not which colour
 * paints it: the palette can change without touching a single call site.
 */
export const SURFACE_TONES = [
  "neutral",
  "muted",
  "info",
  "accent",
  "success",
  "warning",
  "critical",
  "inverted",
] as const;

export type SurfaceTone = (typeof SURFACE_TONES)[number];

/** Component-level radius tokens a surface can take. */
const RADIUS_CLASSES = {
  none: "",
  card: "rounded-card",
  "info-card": "rounded-info-card",
  panel: "rounded-xl",
  full: "rounded-full",
} as const;

/** Elevation tokens a surface can take. */
const ELEVATION_CLASSES = {
  none: "",
  raised: "shadow-sm",
} as const;

export type SurfaceElevation = keyof typeof ELEVATION_CLASSES;

export type SurfaceRadius = keyof typeof RADIUS_CLASSES;

/** Vertical rhythm tokens a surface can take. */
const SPACING_CLASSES = {
  none: "",
  section: "py-section",
  top: "pt-section",
} as const;

export type SurfaceSpacing = keyof typeof SPACING_CLASSES;

/** Inner padding tokens a surface can take. */
const PADDING_CLASSES = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "px-6 py-10 md:px-10 md:py-14",
  xl: "px-6 py-14 md:px-10 md:py-20",
} as const;

export type SurfacePadding = keyof typeof PADDING_CLASSES;

export interface SurfaceProps extends Omit<React.ComponentProps<"div">, "ref"> {
  ref?: React.Ref<HTMLElement>;
  /** When omitted the surface inherits whatever tone its ancestor set. */
  tone?: SurfaceTone;
  /** Corner radius, from the component token scale. @default "none" */
  radius?: SurfaceRadius;
  /** Vertical padding, from the spacing token scale. @default "none" */
  spacing?: SurfaceSpacing;
  /** Shadow, from the elevation token scale. @default "none" */
  elevation?: SurfaceElevation;
  /** Inner padding, from the spacing token scale. @default "none" */
  padding?: SurfacePadding;
  /** Semantic element to render. @default "div" */
  as?: "div" | "section" | "article" | "aside" | "header" | "footer";
}

/**
 * Re-points the semantic colour roles for its subtree.
 *
 * Children are written once against `bg-background` / `text-foreground` and
 * follow the tone automatically — including Button, whose default variant
 * reads `--primary-*`, which each tone re-points to stay legible.
 */
const Surface = ({
  tone,
  radius = "none",
  spacing = "none",
  elevation = "none",
  padding = "none",
  as: Comp = "div",
  className,
  children,
  ref,
  ...props
}: SurfaceProps) => (
  <Comp
    // `as` widens the rendered element, so the ref type is widened to match.
    ref={ref as React.Ref<HTMLDivElement>}
    data-slot="surface"
    data-surface-tone={tone}
    className={cn(
      tone && "bg-background text-foreground",
      RADIUS_CLASSES[radius],
      SPACING_CLASSES[spacing],
      ELEVATION_CLASSES[elevation],
      PADDING_CLASSES[padding],
      className,
    )}
    {...props}
  >
    {children}
  </Comp>
);

export { Surface };
