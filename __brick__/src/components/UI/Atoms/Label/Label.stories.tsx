import type { Meta, StoryObj } from "@storybook/react";

import Label from "@/components/UI/Atoms/Label";

const meta: Meta<typeof Label> = {
  title: "Atoms/Label",
  component: Label,
  args: {
    children: "Label",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
