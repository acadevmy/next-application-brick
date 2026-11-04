import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Typography } from "@/components/UI/Atoms/Typography";
import { Surface } from "@/components/UI/Layout/Surface";

import { Stack } from "./Stack";

const GAPS = ["none", "xs", "sm", "md", "lg", "xl", "2xl"] as const;

const meta: Meta<typeof Stack> = {
  title: "UI/Layout/Stack",
  component: Stack,
  parameters: {
    docs: {
      description: {
        component:
          "Vertical flow with a token-sized gap. Use it instead of writing `flex flex-col gap-4`: the gap comes from the spacing scale, so rhythm stays consistent across the app.",
      },
    },
  },
  argTypes: {
    gap: { control: "select", options: GAPS },
    align: {
      control: "select",
      options: ["start", "center", "end", "stretch"],
    },
    justify: {
      control: "select",
      options: ["start", "center", "end", "between"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Stack>;

const Box = ({ children }: { children: React.ReactNode }) => (
  <Surface tone="info" radius="card" padding="sm">
    <Typography variant="body-2">{children}</Typography>
  </Surface>
);

export const Default: Story = {
  args: { gap: "md" },
  render: (args) => (
    <Stack {...args}>
      <Box>First</Box>
      <Box>Second</Box>
      <Box>Third</Box>
    </Stack>
  ),
};

/** Every step of the gap scale, so the rhythm is comparable at a glance. */
export const Gaps: Story = {
  render: () => (
    <Stack gap="xl">
      {GAPS.map((gap) => (
        <Stack key={gap} gap="xs">
          <Typography variant="caption-1" tone="muted">
            gap={gap}
          </Typography>
          <Stack gap={gap}>
            <Box>One</Box>
            <Box>Two</Box>
          </Stack>
        </Stack>
      ))}
    </Stack>
  ),
};

/** `asChild` puts the layout on the child, so a form stays a form. */
export const AsChild: Story = {
  render: () => (
    <Stack asChild gap="md">
      <form>
        <Box>A form element, not a wrapper div</Box>
        <Box>Second field</Box>
      </form>
    </Stack>
  ),
};
