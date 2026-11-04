import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Input } from "@/components/UI/Atoms/Input";
import { Typography } from "@/components/UI/Atoms/Typography";
import { Stack } from "@/components/UI/Layout/Stack";

import { FormRow } from "./FormRow";

const meta: Meta<typeof FormRow> = {
  title: "UI/Layout/FormRow",
  component: FormRow,
  parameters: {
    docs: {
      description: {
        component:
          "A row of form fields: stacked below md, side by side above. The horizontal gap is tighter than the vertical one, so fields on the same row read as a group while rows stay separated.",
      },
    },
  },
  argTypes: { columns: { control: "radio", options: [1, 2, 3] } },
};

export default meta;

type Story = StoryObj<typeof FormRow>;

export const TwoColumns: Story = {
  args: { columns: 2 },
  render: (args) => (
    <FormRow {...args}>
      <Input radius="pill" placeholder="First name" />
      <Input radius="pill" placeholder="Last name" />
    </FormRow>
  ),
};

export const ThreeColumns: Story = {
  args: { columns: 3 },
  render: (args) => (
    <FormRow {...args}>
      <Input radius="pill" placeholder="Province" />
      <Input radius="pill" placeholder="City" />
      <Input radius="pill" placeholder="Postcode" />
    </FormRow>
  ),
};

/** Rows of different widths stacked: the rhythm the component exists for. */
export const Stacked: Story = {
  render: () => (
    <Stack gap="md">
      <Typography variant="caption-1" tone="muted">
        Two rows of two, then one of three
      </Typography>
      <FormRow>
        <Input radius="pill" placeholder="First name" />
        <Input radius="pill" placeholder="Last name" />
      </FormRow>
      <FormRow>
        <Input radius="pill" placeholder="Email" />
        <Input radius="pill" placeholder="Phone" />
      </FormRow>
      <FormRow columns={3}>
        <Input radius="pill" placeholder="Province" />
        <Input radius="pill" placeholder="City" />
        <Input radius="pill" placeholder="Postcode" />
      </FormRow>
    </Stack>
  ),
};
