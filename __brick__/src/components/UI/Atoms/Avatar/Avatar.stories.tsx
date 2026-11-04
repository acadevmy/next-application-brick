import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Avatar } from "./Avatar";

const meta: Meta<typeof Avatar> = {
  component: Avatar,
  title: "UI/Atoms/Avatar",
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const WithImage: Story = {
  args: {
    name: "Simone",
    imageUrl: "https://api.dicebear.com/9.x/avataaars/svg?seed=Simone",
    size: "s",
  },
};

export const FallbackInitial: Story = {
  args: {
    name: "Simone",
    size: "s",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-4">
      <Avatar name="S" size="xs" />
      <Avatar name="Simone" size="s" />
      <Avatar name="Simone" size="m" />
      <Avatar name="Simone" size="l" />
    </div>
  ),
};
