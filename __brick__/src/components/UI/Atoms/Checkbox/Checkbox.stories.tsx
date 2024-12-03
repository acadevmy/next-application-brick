import type { Meta, StoryObj } from "@storybook/react";

import Checkbox from "@/components/UI/Atoms/Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Atoms/Checkbox",
  component: Checkbox,
  args: {
    children: "Checkbox",
    name: "terms",
    id: "terms",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithLabel: Story = {
  name: "Checkbox / With Label",
  args: {
    label: "Checkbox label",
  },
};
