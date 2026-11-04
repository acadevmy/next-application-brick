import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Typography } from "@/components/UI/Atoms/Typography";
import { Stack } from "@/components/UI/Layout/Stack";

import { Prose } from "./Prose";

const TEXT =
  "A measure is how wide a column of text is allowed to get before it becomes tiring to read. Setting it once as a token beats writing max-w-[600px] in one place and max-w-[640px] in another, which is exactly what this replaced.";

const meta: Meta<typeof Prose> = {
  title: "UI/Layout/Prose",
  component: Prose,
  parameters: {
    docs: {
      description: {
        component:
          "A column of readable text. `width` is the measure, `typography` applies the `.prose` rules to raw HTML coming from a CMS.",
      },
    },
  },
  argTypes: {
    width: { control: "radio", options: ["narrow", "default", "wide", "full"] },
    align: { control: "radio", options: ["left", "center"] },
    centered: { control: "boolean" },
    typography: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof Prose>;

export const Default: Story = {
  args: { width: "default", typography: false },
  render: (args) => (
    <Prose {...args}>
      <Typography variant="body-1">{TEXT}</Typography>
    </Prose>
  ),
};

/** The three measures side by side, on the same paragraph. */
export const Widths: Story = {
  render: () => (
    <Stack gap="xl">
      {(["narrow", "default", "wide"] as const).map((width) => (
        <Stack key={width} gap="xs">
          <Typography variant="caption-1" tone="muted">
            width={width}
          </Typography>
          <Prose width={width} typography={false} centered={false}>
            <Typography variant="body-1">{TEXT}</Typography>
          </Prose>
        </Stack>
      ))}
    </Stack>
  ),
};

/** With `typography`, raw HTML gets the design system's type scale. */
export const RawHtml: Story = {
  render: () => (
    <Prose width="narrow">
      <h2>A heading from raw HTML</h2>
      <p>
        The `.prose` rules give CMS markup the same typography as the rest of
        the interface, without the editor having to know about it.
      </p>
    </Prose>
  ),
};
