import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Badge } from "@/components/UI/Atoms/Badge";
import { Typography } from "@/components/UI/Atoms/Typography";
import { Stack } from "@/components/UI/Layout/Stack";

import { Inline } from "./Inline";

const meta: Meta<typeof Inline> = {
  title: "UI/Layout/Inline",
  component: Inline,
  parameters: {
    docs: {
      description: {
        component:
          "Horizontal flow with a token-sized gap: the other half of the layout pair with Stack. Wraps by default.",
      },
    },
  },
  argTypes: {
    gap: {
      control: "select",
      options: ["none", "xs", "sm", "md", "lg", "xl", "2xl"],
    },
    align: {
      control: "select",
      options: ["start", "center", "end", "stretch"],
    },
    justify: {
      control: "select",
      options: ["start", "center", "end", "between"],
    },
    wrap: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof Inline>;

export const Default: Story = {
  args: { gap: "md" },
  render: (args) => (
    <Inline {...args}>
      <Badge>One</Badge>
      <Badge tone="accent">Two</Badge>
      <Badge tone="success">Three</Badge>
    </Inline>
  ),
};

/** With `wrap` off the row stays on one line and overflows instead. */
export const Wrapping: Story = {
  render: () => (
    <Stack gap="lg">
      <Stack gap="xs">
        <Typography variant="caption-1" tone="muted">
          wrap (default)
        </Typography>
        <Inline gap="sm" className="max-w-64">
          {Array.from({ length: 8 }, (_, i) => (
            <Badge key={i}>Item {i + 1}</Badge>
          ))}
        </Inline>
      </Stack>
      <Stack gap="xs">
        <Typography variant="caption-1" tone="muted">
          wrap={"{false}"}
        </Typography>
        {/* A scrollable region must be reachable by keyboard to be scrolled. */}
        <Inline
          gap="sm"
          wrap={false}
          className="max-w-64 overflow-x-auto"
          tabIndex={0}
          role="region"
          aria-label="Riga scorrevole"
        >
          {Array.from({ length: 8 }, (_, i) => (
            <Badge key={i}>Item {i + 1}</Badge>
          ))}
        </Inline>
      </Stack>
    </Stack>
  ),
};
