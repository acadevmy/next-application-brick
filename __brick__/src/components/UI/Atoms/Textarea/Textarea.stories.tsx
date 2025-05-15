import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import Textarea from "@/components/UI/Atoms/Textarea";

const meta: Meta<typeof Textarea> = {
  title: "Atoms/Textarea",
  component: Textarea,
  args: { onChange: fn(), placeholder: "Placeholder" },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const InputWithLabel: Story = {
  name: "Textarea / With Label",
  args: {
    label: "Label",
  },
};
