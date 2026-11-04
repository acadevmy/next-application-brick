import * as React from "react";

import { Prose } from "@/components/UI/Layout/Prose";
import { Section, type SectionProps } from "@/components/UI/Layout/Section";
import { type LayoutGap, Stack } from "@/components/UI/Layout/Stack";

export interface ContentSectionProps extends React.ComponentProps<"section"> {
  /** Drawn above the children — usually a `SectionHeading`. */
  heading?: React.ReactNode;
  /** Vertical rhythm of the band. @default "section" */
  spacing?: SectionProps["spacing"];
  /** Space between the heading and the children. @default "xl" */
  gap?: LayoutGap;
  /** Cap the column to a reading measure. Omit to use the full band width. */
  width?: "narrow" | "default" | "wide";
  /** Text alignment inside the measure. Has no effect without `width`. @default "left" */
  align?: "left" | "center";
}

/**
 * A band of the page: a heading, then whatever the section is about.
 *
 * This is the shape most sections take, and writing it out at each call site is
 * how four sections end up with four different gaps between the heading and the
 * content. Pass `width` when the section is a column of text rather than a
 * full-width arrangement.
 */
const ContentSection = ({
  heading,
  spacing = "section",
  gap = "xl",
  width,
  align = "left",
  children,
  ...props
}: ContentSectionProps) => {
  const column = (
    <Stack gap={gap}>
      {heading}
      {children}
    </Stack>
  );

  return (
    <Section data-slot="content-section" spacing={spacing} {...props}>
      {width ? (
        <Prose width={width} align={align} typography={false}>
          {column}
        </Prose>
      ) : (
        column
      )}
    </Section>
  );
};

export { ContentSection };
