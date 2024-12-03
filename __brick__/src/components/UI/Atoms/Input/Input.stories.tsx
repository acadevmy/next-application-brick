import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Search } from "lucide-react";

import Input from "@/components/UI/Atoms/Input";

const meta: Meta<typeof Input> = {
  title: "Atoms/Input",
  component: Input,
  args: { onChange: fn(), placeholder: "Placeholder" },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const InputWithLabel: Story = {
  name: "Input / With Label",
  args: {
    label: "Label",
  },
};

export const InputWithIcon: Story = {
  name: "Input / With Icon",
  args: {
    Icon: <Search />,
  },
};
