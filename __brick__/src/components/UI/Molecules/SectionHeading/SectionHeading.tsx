import * as React from "react";

import { Typography } from "@/components/UI/Atoms/Typography";
import { ButtonGroup } from "@/components/UI/Layout/ButtonGroup";
import { Stack } from "@/components/UI/Layout/Stack";

export interface SectionHeadingProps extends Omit<
  React.ComponentProps<"div">,
  "title"
> {
  /** Small line above the title. */
  pretitle?: React.ReactNode;
  /** The title itself. */
  title?: React.ReactNode;
  /** Heading tag for the title; the level is the page's decision, not this one. */
  titleAs?: React.ElementType;
  /** Supporting copy under the title. */
  children?: React.ReactNode;
  /** Calls to action: a row that stacks below `lg`. */
  actions?: React.ReactNode;
  /** Centres the column. @default "start" */
  align?: "start" | "center";
}

/**
 * Pretitle, title, copy and calls to action — the heading a section opens with.
 *
 * It exists so the four parts always relate to each other the same way: the
 * type scale, the weights and the tones are decided once here instead of being
 * re-picked at every call site, which is how the same title ends up looking
 * like a page title in one section and a section title in the next.
 *
 * Filling none of the four renders nothing at all, so a caller never has to
 * guard it.
 */
const SectionHeading = ({
  pretitle,
  title,
  titleAs,
  children,
  actions,
  align = "start",
  ...props
}: SectionHeadingProps) => {
  if (!pretitle && !title && !children && !actions) return null;

  return (
    <Stack
      data-slot="section-heading"
      gap="md"
      align={align === "center" ? "center" : undefined}
      {...props}
    >
      {pretitle ? (
        <Typography variant="heading-5" weight="semibold" tone="muted">
          {pretitle}
        </Typography>
      ) : null}
      {title ? (
        <Typography
          variant="heading-3"
          weight="semibold"
          tone="accent"
          as={titleAs}
        >
          {title}
        </Typography>
      ) : null}
      {children ? (
        <Typography variant="body-1" weight="medium" asChild>
          <div>{children}</div>
        </Typography>
      ) : null}
      {actions ? (
        <ButtonGroup
          rowFrom="lg"
          justify={align === "center" ? "center" : "start"}
          className="mt-4"
        >
          {actions}
        </ButtonGroup>
      ) : null}
    </Stack>
  );
};

export { SectionHeading };
