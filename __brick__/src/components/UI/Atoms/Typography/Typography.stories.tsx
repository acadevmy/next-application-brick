import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Typography } from "./Typography";

const meta: Meta<typeof Typography> = {
  title: "UI/Atoms/Typography",
  component: Typography,
  parameters: {
    docs: {
      description: {
        component:
          "Testo con varianti da theme: title-1..3, heading-1..6, body-1..4, caption-1. Weight: normal, medium, semibold, bold. Prop `as` per tag semantico diverso dallo stile (SEO). Prop `asChild` per radice custom.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "title-1",
        "title-2",
        "title-3",
        "heading-1",
        "heading-2",
        "heading-3",
        "heading-4",
        "heading-5",
        "heading-6",
        "body-1",
        "body-2",
        "body-3",
        "body-4",
        "caption-1",
      ],
    },
    weight: {
      control: "select",
      options: ["normal", "medium", "semibold", "bold"],
    },
    as: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "h5", "h6", "p", "span", "div"],
      description:
        "Override the rendered HTML tag for SEO (e.g. variant=heading-4, as=h1).",
    },
    asChild: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Title: Story = {
  args: {
    variant: "title-1",
    weight: "bold",
    children: "Title 1 – Hero principale",
  },
};

export const Heading: Story = {
  args: {
    variant: "heading-2",
    weight: "semibold",
    children: "Heading 2 – Sezione principale",
  },
};

export const Body: Story = {
  args: {
    variant: "body-2",
    weight: "normal",
    children:
      "Body 2 – Paragrafo standard per card e contenuti. La scala tipografica è definita in globals.css (Title, Heading, Body, Caption).",
  },
};

export const Caption: Story = {
  args: {
    variant: "caption-1",
    children: "Caption 1 – Label o metadata",
  },
};

/** SEO: H4 style but rendered as h1 so the page has a single semantic h1. */
export const SEOHeading: Story = {
  args: {
    variant: "heading-4",
    as: "h1",
    weight: "semibold",
    children: "Page title (renders as <h1> with heading-4 style)",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Use `as` to keep a semantic heading level (e.g. h1, h2) while applying a different typography variant for design (e.g. heading-4).",
      },
    },
  },
};

export const Scale: Story = {
  render: () => (
    <div className="space-y-6">
      <Typography variant="title-1" weight="bold">
        Title 1
      </Typography>
      <Typography variant="title-2" weight="medium">
        Title 2
      </Typography>
      <Typography variant="heading-1" weight="semibold">
        Heading 1
      </Typography>
      <Typography variant="heading-2" weight="semibold">
        Heading 2
      </Typography>
      <Typography variant="body-1" weight="normal">
        Body 1 – Lead e paragrafi principali
      </Typography>
      <Typography variant="body-2">Body 2 – Paragrafo standard</Typography>
      <Typography variant="caption-1">Caption 1</Typography>
    </div>
  ),
};
