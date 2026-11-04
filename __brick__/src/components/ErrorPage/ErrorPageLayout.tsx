"use client";

import * as React from "react";

import { Typography } from "@/components/UI/Atoms/Typography";
import { Container } from "@/components/UI/Layout/Container";
import { Prose } from "@/components/UI/Layout/Prose";
import { Section } from "@/components/UI/Layout/Section";
import { Stack } from "@/components/UI/Layout/Stack";
import { Surface } from "@/components/UI/Layout/Surface";

export interface ErrorPageLayoutProps {
  /** Error code or category, e.g. "ERRORE 404". */
  pretitle: React.ReactNode;
  title: React.ReactNode;
  /** Recovery action, e.g. a link back home. */
  actions?: React.ReactNode;
}

/**
 * Shared layout of the error and not-found pages.
 *
 * This is an application recipe, not a design system component: it is
 * `Section` + `Surface` + `Typography` with no behaviour of its own, and it
 * lives next to the two pages that use it.
 */
export const ErrorPageLayout = ({
  pretitle,
  title,
  actions,
}: ErrorPageLayoutProps) => (
  <Section contentInset={false}>
    <Container>
      <Surface tone="muted" radius="card" padding="xl">
        <Prose width="full" align="center" typography={false}>
          <Stack gap="xl" align="center">
            <Typography
              variant="caption-1"
              weight="medium"
              tone="accent"
              className="uppercase tracking-wide"
            >
              {pretitle}
            </Typography>
            <Typography variant="heading-2" weight="bold" as="h1">
              {title}
            </Typography>
            {actions}
          </Stack>
        </Prose>
      </Surface>
    </Container>
  </Section>
);
