import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Typography } from "@/components/UI/Atoms/Typography";

import { Container } from "./Container";

const meta: Meta<typeof Container> = {
  title: "UI/Layout/Container",
  component: Container,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Contenitore centrato: `max-w-container`, `px-container-inline`. Prop `as`: div (default), main, section, entry. Base per layout di pagina.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Container>;

export const Default: Story = {
  args: {
    children: (
      <Typography variant="body-2" tone="muted">
        Page content is centred with max-width and horizontal padding. Resize
        the viewport to see the container constrain width.
      </Typography>
    ),
  },
};

export const AsMain: Story = {
  args: {
    as: "main",
    children: (
      <Typography variant="body-2">
        Rendered as <code>&lt;main&gt;</code> for semantic layout.
      </Typography>
    ),
  },
};

export const WithSections: Story = {
  render: () => (
    <Container as="main">
      <Typography
        variant="heading-4"
        weight="semibold"
        className="mb-4"
        asChild
      >
        <h2>Section one</h2>
      </Typography>
      <Typography variant="body-2" tone="muted" className="mb-8">
        Content inside a single Container. Use Section for vertical spacing
        between blocks.
      </Typography>
      <Typography
        variant="heading-4"
        weight="semibold"
        className="mb-4"
        asChild
      >
        <h2>Section two</h2>
      </Typography>
      <Typography variant="body-2" tone="muted">
        Another block of content.
      </Typography>
    </Container>
  ),
};
