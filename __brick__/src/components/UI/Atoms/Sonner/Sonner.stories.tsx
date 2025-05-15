import type { Meta, StoryObj } from "@storybook/react";
import { toast } from "sonner";

import Button from "../Button";
import Toaster from "./Sonner";

const meta: Meta<typeof Toaster> = {
  title: "UI/Atoms/Sonner",
  component: Toaster,
  decorators: [
    (Story) => (
      <div className="h-96">
        <Toaster richColors />
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="h-20 flex flex-col gap-2">
      <Button
        variant="ghost"
        onClick={() =>
          toast.info(
            "Enim mollit quis qui aute commodo mollit exercitation enim magna sunt ex laboris.",
          )
        }
      >
        Show Info Toast
      </Button>
      <Button
        variant="ghost"
        onClick={() =>
          toast.success("Duis Lorem minim culpa anim elit aliquip sint dolore.")
        }
      >
        Show Success Toast
      </Button>
      <Button
        variant="ghost"
        onClick={() =>
          toast.error("Fugiat anim nisi labore ullamco voluptate elit magna.")
        }
      >
        Show Error Toast
      </Button>
      <Button
        variant="ghost"
        onClick={() =>
          toast.warning("Fugiat anim nisi labore ullamco voluptate elit magna.")
        }
      >
        Show Warning Toast
      </Button>
    </div>
  ),
};
