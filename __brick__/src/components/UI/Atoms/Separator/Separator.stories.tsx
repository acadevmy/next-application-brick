import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Separator } from "./Separator";

const meta: Meta<typeof Separator> = {
  title: "UI/Atoms/Separator",
  component: Separator,
  parameters: {
    docs: {
      description: {
        component:
          "Horizontal or vertical divider using theme border color. Used in the page header between the title row and what follows it. Decorative by default for visual separation.",
      },
    },
  },
  argTypes: {
    orientation: {
      control: "radio",
      options: ["horizontal", "vertical"],
    },
    decorative: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  args: {
    orientation: "horizontal",
    decorative: true,
  },
  render: (args) => (
    <div className="w-full max-w-md space-y-4">
      <p className="text-body-2">Content above</p>
      <Separator {...args} />
      <p className="text-body-2">Content below</p>
    </div>
  ),
};

export const Vertical: Story = {
  args: {
    orientation: "vertical",
    decorative: true,
  },
  render: (args) => (
    <div className="flex h-24 items-center gap-4">
      <span className="text-body-2">Left</span>
      <Separator {...args} className="h-full" />
      <span className="text-body-2">Right</span>
    </div>
  ),
};

export const WithSpacing: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Typical usage: 16px gap above and below (e.g. between page title and filter chips).",
      },
    },
  },
  render: () => (
    <div className="w-full max-w-md">
      <p className="text-body-2">Title and search row</p>
      <div className="py-4">
        <Separator />
      </div>
      <p className="text-body-2">Filter badges row</p>
    </div>
  ),
};
