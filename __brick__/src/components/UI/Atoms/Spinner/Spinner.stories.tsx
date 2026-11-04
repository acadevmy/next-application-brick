import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ICON_SIZES } from "@/components/UI/Atoms/Icon";

import { Spinner } from "./Spinner";

const meta: Meta<typeof Spinner> = {
  title: "UI/Atoms/Spinner",
  component: Spinner,
  parameters: {
    docs: {
      description: {
        component:
          "Loading spinner using the design-system Icon (Huge Icons Loading02) with animate-spin. Use for async or loading states.",
      },
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: Object.keys(ICON_SIZES),
    },
  },
};

export default meta;

type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: {
    size: "m",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-8">
      {(Object.keys(ICON_SIZES) as Array<keyof typeof ICON_SIZES>).map(
        (size) => (
          <div key={size} className="flex flex-col items-center gap-2">
            <Spinner size={size} />
            <span className="text-body-3 text-muted-foreground">{size}</span>
          </div>
        ),
      )}
    </div>
  ),
};

export const OnBackground: Story = {
  render: () => (
    <div className="flex gap-6 p-6">
      <div className="flex size-16 items-center justify-center rounded-lg bg-muted">
        <Spinner size="l" className="text-muted-foreground" />
      </div>
      <div className="flex size-16 items-center justify-center rounded-lg bg-primary">
        <Spinner size="l" className="text-primary-foreground" />
      </div>
    </div>
  ),
};
