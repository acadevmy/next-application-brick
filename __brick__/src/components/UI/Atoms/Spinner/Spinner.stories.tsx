import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import SpinnerComponent from "./index";

const meta: Meta<React.ComponentProps<typeof SpinnerComponent>> = {
  title: "Atoms/Spinner",
  component: SpinnerComponent,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Spinner: Story = {};
