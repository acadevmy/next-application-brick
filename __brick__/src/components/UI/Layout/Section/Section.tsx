"use client";

import * as React from "react";

import { Surface } from "@/components/UI/Layout/Surface";

/**
 * A band of the page: vertical rhythm between sections, plus the horizontal
 * gutter the header and footer also use.
 *
 * Section is deliberately **not** where colour goes. It used to accept a tone
 * and a second one for its content wrapper, and neither was ever used: a
 * coloured band reads better as `<Section><Surface tone="accent">`, which says
 * which component is doing what. Section owns rhythm, Surface owns material.
 *
 * It is also full width by design — that is the difference from `Container`,
 * which caps the width and centres.
 */
export interface SectionProps extends React.ComponentProps<"section"> {
  /** Vertical padding: full section rhythm, only the top, or none. @default "section" */
  spacing?: "section" | "top" | "none";
  /**
   * When true (default), wrap children so the content lines up with the header
   * and footer. Set to false for full-bleed sections (e.g. Showcase).
   */
  contentInset?: boolean;
}

const Section = ({
  className,
  spacing = "section",
  contentInset = true,
  children,
  ...props
}: SectionProps) => (
  <Surface
    as="section"
    data-slot="section"
    data-spacing={spacing}
    data-content-inset={contentInset}
    spacing={spacing}
    className={className}
    {...props}
  >
    {contentInset ? (
      <div className="px-container-inline">{children}</div>
    ) : (
      children
    )}
  </Surface>
);

export { Section };
