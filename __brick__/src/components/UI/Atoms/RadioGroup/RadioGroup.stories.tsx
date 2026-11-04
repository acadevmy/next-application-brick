import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { RadioGroup, RadioGroupItem } from "./RadioGroup";

const meta: Meta<typeof RadioGroup> = {
  title: "UI/Atoms/RadioGroup",
  component: RadioGroup,
  parameters: {
    docs: {
      description: {
        component:
          "Gruppo di radio button (scelta singola). Usa Radix RadioGroup; stile theme (border, focus ring).",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="a">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="a" id="r-a" />
        <label htmlFor="r-a" className="text-sm cursor-pointer">
          Opzione A
        </label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="b" id="r-b" />
        <label htmlFor="r-b" className="text-sm cursor-pointer">
          Opzione B
        </label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="c" id="r-c" />
        <label htmlFor="r-c" className="text-sm cursor-pointer">
          Opzione C
        </label>
      </div>
    </RadioGroup>
  ),
};

export const ThreeOptions: Story = {
  render: () => (
    <RadioGroup defaultValue="monthly">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="monthly" id="plan-monthly" />
        <label htmlFor="plan-monthly" className="text-sm cursor-pointer">
          Mensile
        </label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="yearly" id="plan-yearly" />
        <label htmlFor="plan-yearly" className="text-sm cursor-pointer">
          Annuale
        </label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="lifetime" id="plan-lifetime" />
        <label htmlFor="plan-lifetime" className="text-sm cursor-pointer">
          Una tantum
        </label>
      </div>
    </RadioGroup>
  ),
};

export const DisabledItem: Story = {
  render: () => (
    <RadioGroup defaultValue="yes">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="yes" id="d-yes" />
        <label htmlFor="d-yes" className="text-sm cursor-pointer">
          Sì
        </label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="no" id="d-no" disabled />
        <label htmlFor="d-no" className="text-sm cursor-pointer opacity-70">
          No (disabilitato)
        </label>
      </div>
    </RadioGroup>
  ),
};
