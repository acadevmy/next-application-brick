import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Label } from "@/components/UI/Atoms/Label";

import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "UI/Atoms/Checkbox",
  component: Checkbox,
  parameters: {
    docs: {
      description: {
        component:
          "Checkbox con stile theme (border, focus ring, stati checked/disabled). Usare sempre con Label; senza label è l'eccezione.",
      },
    },
  },
  argTypes: {
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accetto i termini e condizioni</Label>
    </div>
  ),
};

export const Checked: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="checked" defaultChecked />
      <Label htmlFor="checked">Opzione selezionata</Label>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="disabled" disabled />
      <Label htmlFor="disabled" className="peer-disabled:opacity-70">
        Disabilitato
      </Label>
    </div>
  ),
};

export const DisabledChecked: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="disabled-checked" defaultChecked disabled />
      <Label htmlFor="disabled-checked" className="peer-disabled:opacity-70">
        Disabilitato e selezionato
      </Label>
    </div>
  ),
};

export const Invalid: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="invalid" aria-invalid />
      <Label htmlFor="invalid">Campo con errore (aria-invalid)</Label>
    </div>
  ),
};

export const WithoutLabel: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Eccezione: checkbox senza label (es. in tabelle con header). Preferire sempre Label per accessibilità.",
      },
    },
  },
  render: () => <Checkbox aria-label="Seleziona riga" />,
};
