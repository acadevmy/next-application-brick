import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Badge } from "@/components/UI/Atoms/Badge";
import { Button } from "@/components/UI/Atoms/Button";
import { Typography } from "@/components/UI/Atoms/Typography";
import { Stack } from "@/components/UI/Layout/Stack";

import { Surface, SURFACE_TONES } from "./Surface";

const meta: Meta<typeof Surface> = {
  title: "UI/Layout/Surface",
  component: Surface,
  parameters: {
    docs: {
      description: {
        component:
          "Re-points the semantic colour roles for its subtree. Children are written once against `bg-background` / `text-foreground` and follow the tone on their own — Button included, because each tone also re-points `--primary-*` so the default action stays legible. This is what removed the colour props from Card, Typography and the sections.",
      },
    },
  },
  argTypes: {
    tone: { control: "select", options: SURFACE_TONES },
    radius: {
      control: "select",
      options: ["none", "card", "info-card", "panel", "full"],
    },
    padding: { control: "select", options: ["none", "sm", "md", "lg", "xl"] },
    elevation: { control: "radio", options: ["none", "raised"] },
  },
};

export default meta;

type Story = StoryObj<typeof Surface>;

const Sample = () => (
  <Stack gap="sm" align="start">
    <Typography variant="heading-5" weight="semibold">
      Inherited colour
    </Typography>
    <Typography variant="body-2" tone="muted">
      Nothing here carries a colour prop.
    </Typography>
    <Button>Action</Button>
  </Stack>
);

export const Default: Story = {
  args: { tone: "accent", radius: "card", padding: "md" },
  render: (args) => (
    <Surface {...args}>
      <Sample />
    </Surface>
  ),
};

/** Every tone with the same children: the children never change. */
export const Tones: Story = {
  render: () => (
    <Stack gap="md">
      {SURFACE_TONES.map((tone) => (
        <Surface key={tone} tone={tone} radius="card" padding="md">
          <Stack gap="xs" align="start">
            <Badge size="xs">{tone}</Badge>
            <Sample />
          </Stack>
        </Surface>
      ))}
    </Stack>
  ),
};

/** Tones nest: the inner surface re-points the roles again for its own subtree. */
export const Nested: Story = {
  render: () => (
    <Surface tone="inverted" radius="card" padding="lg">
      <Stack gap="md" align="start">
        <Typography variant="heading-5" weight="semibold">
          Inverted outside
        </Typography>
        <Surface tone="warning" radius="card" padding="md">
          <Typography variant="body-2">Warning inside</Typography>
        </Surface>
      </Stack>
    </Surface>
  ),
};
