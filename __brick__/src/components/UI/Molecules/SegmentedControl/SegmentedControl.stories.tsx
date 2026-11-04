import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";

import { Icons } from "@/components/UI/Atoms/Icon";

import { SegmentedControl } from "./SegmentedControl";

const meta: Meta<typeof SegmentedControl> = {
  title: "UI/Molecules/SegmentedControl",
  component: SegmentedControl,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Picks one value out of a few, with the options given as data. Built on **Atoms / ToggleGroup**. With `iconOnly`, each option shows its icon and uses its label as accessible name.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

type Period = "day" | "week" | "month";
type Layout = "list" | "grid";

export const Default: Story = {
  render: function Render() {
    const [value, setValue] = useState<Period>("week");
    return (
      <SegmentedControl<Period>
        aria-label="Period"
        options={[
          { value: "day", label: "Day" },
          { value: "week", label: "Week" },
          { value: "month", label: "Month" },
        ]}
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const IconOnly: Story = {
  render: function Render() {
    const [value, setValue] = useState<Layout>("list");
    return (
      <SegmentedControl<Layout>
        aria-label="Layout"
        iconOnly
        options={[
          { value: "list", label: "List", icon: Icons.List },
          { value: "grid", label: "Grid", icon: Icons.Grid },
        ]}
        value={value}
        onChange={setValue}
      />
    );
  },
};
