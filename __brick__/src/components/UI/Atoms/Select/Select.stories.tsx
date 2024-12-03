import type { Meta, StoryObj } from "@storybook/react";

import Select, {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/Atoms/Select";

const meta: Meta<typeof Select> = {
  title: "Atoms/Select",
  component: Select,
  args: {
    children: "Select",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
    );
  },
};

export const WithLabel: Story = {
  name: "Select / With Label",
  render: () => {
    return (
      <Select>
        <SelectTrigger className="w-[180px]" label="Label">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
    );
  },
};
