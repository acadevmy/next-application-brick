import * as React from "react";

import { Typography } from "@/components/UI/Atoms/Typography";
import { Section } from "@/components/UI/Layout/Section";
import { Stack } from "@/components/UI/Layout/Stack";
import { PageHeader } from "@/components/UI/Molecules/PageHeader";

export interface PageHeaderSectionProps extends Omit<
  React.ComponentProps<"section">,
  "title"
> {
  /** The title, beside its toolbar. */
  title: React.ReactNode;
  /** Heading tag for the title; the level is the page's decision, not this one. */
  titleAs?: React.ElementType;
  /** The toolbar beside the title — usually `PageHeader.Action` items. */
  actions?: React.ReactNode;
  /** Small line under the title row. */
  pretitle?: React.ReactNode;
  /** Supporting copy under the title row. */
  children?: React.ReactNode;
}

/**
 * The band a page opens with: a title with its toolbar, then whatever the page
 * has to say before its first section.
 *
 * Title and toolbar share a row from the smallest width up — this is a header,
 * so the actions belong beside the title rather than under it.
 */
const PageHeaderSection = ({
  title,
  titleAs,
  actions,
  pretitle,
  children,
  ...props
}: PageHeaderSectionProps) => (
  <Section data-slot="page-header-section" spacing="top" {...props}>
    <PageHeader rowFrom="mobile">
      <PageHeader.Title as={titleAs}>{title}</PageHeader.Title>
      {actions ? <PageHeader.Toolbar>{actions}</PageHeader.Toolbar> : null}
    </PageHeader>
    {pretitle || children ? (
      <Stack gap="sm" className="mt-4">
        {pretitle ? (
          <Typography variant="heading-5" weight="semibold" tone="muted">
            {pretitle}
          </Typography>
        ) : null}
        {children ? (
          <Typography variant="body-1" weight="medium" asChild>
            <div>{children}</div>
          </Typography>
        ) : null}
      </Stack>
    ) : null}
  </Section>
);

export { PageHeaderSection };
