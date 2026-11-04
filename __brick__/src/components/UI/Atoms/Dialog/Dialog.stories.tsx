import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "@/components/UI/Atoms/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/UI/Atoms/Dialog";

const meta: Meta = {
  title: "UI/Atoms/Dialog",
  parameters: {
    docs: {
      description: {
        component:
          "Dialog primitives based on Radix Dialog. Use the exported slots (Trigger/Content/Header/Footer/Title/Description) to compose consistent modal dialogs.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button">Open dialog</Button>
      </DialogTrigger>
      <DialogContent
        closeLabel="Chiudi"
        aria-describedby="dialog-default-description"
      >
        <DialogHeader>
          <DialogTitle>Dialog title</DialogTitle>
          <DialogDescription id="dialog-default-description">
            Short description that explains what this dialog is about.
          </DialogDescription>
        </DialogHeader>
        <div className="body-3 text-foreground">
          Content goes here. The close button is provided by `DialogContent`.
        </div>
        <DialogFooter>
          <Button type="button" variant="outline">
            Secondary
          </Button>
          <Button type="button">Primary</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const DefaultOpen: Story = {
  render: () => (
    <Dialog defaultOpen>
      <DialogTrigger asChild>
        <Button type="button">Open dialog</Button>
      </DialogTrigger>
      <DialogContent
        closeLabel="Chiudi"
        aria-describedby="dialog-open-description"
      >
        <DialogHeader>
          <DialogTitle>Default open</DialogTitle>
          <DialogDescription id="dialog-open-description">
            This story renders the dialog open by default.
          </DialogDescription>
        </DialogHeader>
        <div className="body-3 text-foreground">
          Useful for quickly validating layout, spacing, and typography.
        </div>
      </DialogContent>
    </Dialog>
  ),
};
