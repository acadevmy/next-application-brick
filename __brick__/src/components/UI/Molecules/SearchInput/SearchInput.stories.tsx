import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SearchInput } from "./SearchInput";

const meta: Meta<typeof SearchInput> = {
  title: "UI/Molecules/SearchInput",
  component: SearchInput,
  argTypes: {
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    "aria-label": "Search",
    placeholder: "Search…",
  },
};

export const WithValue: Story = {
  args: {
    "aria-label": "Search",
    placeholder: "Search…",
    defaultValue: "Adidas",
  },
};

export const Disabled: Story = {
  args: {
    "aria-label": "Search",
    placeholder: "Search…",
    disabled: true,
  },
};
