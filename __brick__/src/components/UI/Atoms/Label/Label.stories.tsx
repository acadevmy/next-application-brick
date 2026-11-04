import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Label } from "./Label";

const meta: Meta<typeof Label> = {
  title: "UI/Atoms/Label",
  component: Label,
  parameters: {
    docs: {
      description: {
        component:
          "Etichetta per campi form. Usa Radix Label; stile theme (text-sm, font-medium). Associare a input con htmlFor.",
      },
    },
  },
  argTypes: {
    htmlFor: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Nome e cognome",
  },
};

export const ForInput: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="email">Email</Label>
      <input
        id="email"
        type="email"
        placeholder="email@esempio.it"
        className="h-9 w-full rounded-lg border border-input px-3 py-2 text-sm"
      />
    </div>
  ),
};

export const WithRequired: Story = {
  args: {
    children: (
      <>
        Indirizzo <span className="text-destructive">*</span>
      </>
    ),
  },
};
