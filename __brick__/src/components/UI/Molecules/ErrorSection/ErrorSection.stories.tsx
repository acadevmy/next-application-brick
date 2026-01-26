import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import ErrorSection from "@/components/UI/Molecules/ErrorSection";

import Button from "../../Atoms/Button";

const meta: Meta<typeof ErrorSection> = {
  title: "UI/Molecules/ErrorSection",
  component: ErrorSection,
  args: {
    pretitle: "ERROR 404",
    title: "Page not found",
    Buttons: (
      <div className="flex gap-2">
        <Button variant="secondary">Retry</Button>
        <Button>Go To Home</Button>
      </div>
    ),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
