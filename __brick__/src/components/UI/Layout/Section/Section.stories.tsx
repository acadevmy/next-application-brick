import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Typography } from "@/components/UI/Atoms/Typography";

import { Container } from "../Container";
import { Surface } from "../Surface";
import { Section } from "./Section";

const meta: Meta<typeof Section> = {
  title: "UI/Layout/Section",
  component: Section,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A band of the page: `spacing` sets the vertical rhythm, `contentInset` lines the content up with header and footer. Colour is not Section's job — compose it with `Surface`. Full width by design: that is the difference from `Container`, which caps the width and centres.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Section>;

export const Default: Story = {
  args: {
    contentInset: false,
    children: (
      <Container>
        <Typography variant="body-2" tone="muted">
          This section has vertical padding from --spacing-section (2rem).
        </Typography>
      </Container>
    ),
  },
};

export const WithHeading: Story = {
  render: () => (
    <Section contentInset={false}>
      <Container>
        <Typography
          variant="heading-3"
          weight="semibold"
          className="mb-4"
          asChild
        >
          <h2>Section title</h2>
        </Typography>
        <Typography variant="body-2" tone="muted">
          Constant vertical padding between main page sections (hero, promo
          cards, events, footer).
        </Typography>
      </Container>
    </Section>
  ),
};

export const NoSpacing: Story = {
  args: {
    spacing: "none",
    contentInset: false,
    children: (
      <Container>
        <Typography variant="body-2" tone="muted">
          Section with spacing=&quot;none&quot; for custom padding/margin.
        </Typography>
      </Container>
    ),
  },
};

/**
 * A coloured band: Section gives the rhythm and the gutter, Surface gives the
 * colour. Two components, one responsibility each.
 */
export const WithColouredBlock: Story = {
  args: {
    children: (
      <Surface tone="muted" radius="card" padding="lg">
        <Typography variant="body-2">
          Il blocco colorato sta dentro l’area con il gutter: Section non sa
          nulla del colore, Surface non sa nulla del ritmo di pagina.
        </Typography>
      </Surface>
    ),
  },
};

export const StackedSections: Story = {
  render: () => (
    <>
      <Section contentInset={false}>
        <Container>
          <Typography
            variant="heading-4"
            weight="semibold"
            className="mb-4"
            asChild
          >
            <h2>Hero / first block</h2>
          </Typography>
          <Typography variant="body-2" tone="muted">
            First section with default spacing.
          </Typography>
        </Container>
      </Section>
      <Section contentInset={false}>
        <Container>
          <Typography
            variant="heading-4"
            weight="semibold"
            className="mb-4"
            asChild
          >
            <h2>Second block</h2>
          </Typography>
          <Typography variant="body-2" tone="muted">
            Second section. Gap between sections comes from --spacing-section.
          </Typography>
        </Container>
      </Section>
    </>
  ),
};
