import type { Meta, StoryObj } from "@storybook/react";

import Badge from "@/components/UI/Atoms/Badge";

const meta: Meta<typeof Badge> = {
  title: "Atoms/Badge",
  component: Badge,
  args: {
    children: "Badge",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
  },
};
export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};
export const Important: Story = {
  args: {
    variant: "important",
  },
};
