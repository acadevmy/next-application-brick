import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Typography } from "@/components/UI/Atoms/Typography";
import { Stack } from "@/components/UI/Layout/Stack";
import { Surface } from "@/components/UI/Layout/Surface";

import { Grid } from "./Grid";

const meta: Meta<typeof Grid> = {
  title: "UI/Layout/Grid",
  component: Grid,
  parameters: {
    docs: {
      description: {
        component:
          "Responsive grid whose column count is a token, not a class string. `Grid.Item span` is how a cell takes more than one column — a featured card, for instance.",
      },
    },
  },
  argTypes: {
    columns: { control: "select", options: [1, 2, 3, 4] },
    gap: {
      control: "select",
      options: ["none", "xs", "sm", "md", "lg", "xl", "2xl"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Grid>;

const Cell = ({ children }: { children: React.ReactNode }) => (
  <Surface tone="muted" radius="card" padding="md">
    <Typography variant="body-2">{children}</Typography>
  </Surface>
);

export const Default: Story = {
  args: { columns: 2, gap: "md" },
  render: (args) => (
    <Grid {...args}>
      {Array.from({ length: 6 }, (_, i) => (
        <Cell key={i}>Cell {i + 1}</Cell>
      ))}
    </Grid>
  ),
};

/** A spanning cell: the grid decides the span, not the card inside it. */
export const WithSpan: Story = {
  render: () => (
    <Grid columns={2} gap="md">
      <Cell>One</Cell>
      <Cell>Two</Cell>
      <Grid.Item span={2}>
        <Surface tone="accent" radius="card" padding="md">
          <Typography variant="heading-5" weight="semibold">
            Spans both columns
          </Typography>
        </Surface>
      </Grid.Item>
      <Cell>Four</Cell>
      <Cell>Five</Cell>
    </Grid>
  ),
};

export const ColumnCounts: Story = {
  render: () => (
    <Stack gap="xl">
      {([1, 2, 3, 4] as const).map((columns) => (
        <Stack key={columns} gap="xs">
          <Typography variant="caption-1" tone="muted">
            columns={columns}
          </Typography>
          <Grid columns={columns} gap="sm">
            {Array.from({ length: columns * 2 }, (_, i) => (
              <Cell key={i}>{i + 1}</Cell>
            ))}
          </Grid>
        </Stack>
      ))}
    </Stack>
  ),
};
