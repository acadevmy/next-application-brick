import type { Meta, StoryObj } from "@storybook/react";

import Separator from "@/components/UI/Atoms/Separator";

const meta: Meta<typeof Separator> = {
  title: "Atoms/Separator",
  component: Separator,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Vertical: Story = {
  render: () => (
    <div className="h-20">
      <Separator orientation="vertical" />
    </div>
  ),
};
