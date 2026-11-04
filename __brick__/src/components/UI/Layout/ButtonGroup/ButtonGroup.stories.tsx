import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "@/components/UI/Atoms/Button";
import { Typography } from "@/components/UI/Atoms/Typography";
import { Stack } from "@/components/UI/Layout/Stack";

import { ButtonGroup } from "./ButtonGroup";

const meta: Meta<typeof ButtonGroup> = {
  title: "UI/Layout/ButtonGroup",
  component: ButtonGroup,
  parameters: {
    docs: {
      description: {
        component:
          'A row of calls to action that stacks on small screens. This pattern was written by hand in three places with three different breakpoints; the group owns that decision now. Pair it with `<Button width="responsive">` so the buttons fill the column while stacked.',
      },
    },
  },
  argTypes: {
    rowFrom: {
      control: "radio",
      options: ["never", "md", "lg", "always"],
    },
    gap: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    justify: { control: "radio", options: ["start", "center", "end"] },
  },
};

export default meta;

type Story = StoryObj<typeof ButtonGroup>;

export const Default: Story = {
  args: { rowFrom: "md", gap: "md", justify: "start" },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button size="lg" width="responsive">
        Primary
      </Button>
      <Button size="lg" variant="secondary" width="responsive">
        Secondary
      </Button>
    </ButtonGroup>
  ),
};

/** Where the group stops stacking. Narrow the viewport to see the difference. */
export const RowFrom: Story = {
  render: () => (
    <Stack gap="xl">
      {(["never", "md", "lg", "always"] as const).map((rowFrom) => (
        <Stack key={rowFrom} gap="xs">
          <Typography variant="caption-1" tone="muted">
            rowFrom={rowFrom}
          </Typography>
          <ButtonGroup rowFrom={rowFrom}>
            <Button size="lg" width="responsive">
              Primary
            </Button>
            <Button size="lg" variant="secondary" width="responsive">
              Secondary
            </Button>
          </ButtonGroup>
        </Stack>
      ))}
    </Stack>
  ),
};

/** Three actions, centred: the same group with different content. */
export const Centred: Story = {
  render: () => (
    <ButtonGroup justify="center">
      <Button size="lg">Save</Button>
      <Button size="lg" variant="secondary">
        Duplicate
      </Button>
      <Button size="lg" variant="ghost">
        Cancel
      </Button>
    </ButtonGroup>
  ),
};
