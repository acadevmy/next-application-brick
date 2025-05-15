import type { Meta, StoryObj } from "@storybook/react";
import { Terminal } from "lucide-react";

import Alert, {
  AlertDescription,
  AlertTitle,
} from "@/components/UI/Atoms/Alert";

const meta: Meta<typeof Alert> = {
  title: "Atoms/Alert",
  component: Alert,
  args: {
    children: (
      <>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components to your app using the cli.
        </AlertDescription>
      </>
    ),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Destructive: Story = {
  args: {
    variant: "destructive",
  },
};

export const Big: Story = {
  args: {
    size: "lg",
    children: (
      <>
        <Terminal className="h-8 w-8" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components to your app using the cli.
        </AlertDescription>
      </>
    ),
  },
};
