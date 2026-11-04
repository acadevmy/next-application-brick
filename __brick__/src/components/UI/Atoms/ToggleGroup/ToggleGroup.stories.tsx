import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Icon, Icons } from "@/components/UI/Atoms/Icon";

import { ToggleGroup, ToggleGroupItem } from "./ToggleGroup";

const meta: Meta<typeof ToggleGroup> = {
  title: "UI/Atoms/ToggleGroup",
  component: ToggleGroup,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          'Radix toggle group: one (`type="single"`) or several (`type="multiple"`) toggles on in one track. Arrow keys move between items. For a plain value switcher with options as data, use **Molecules / SegmentedControl**.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ToggleGroup>;

export const Single: Story = {
  render: () => (
    <ToggleGroup type="single" defaultValue="week" aria-label="Period">
      <ToggleGroupItem value="day">Day</ToggleGroupItem>
      <ToggleGroupItem value="week">Week</ToggleGroupItem>
      <ToggleGroupItem value="month">Month</ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const IconOnly: Story = {
  render: () => (
    <ToggleGroup type="single" defaultValue="grid" aria-label="Layout">
      <ToggleGroupItem value="list" aria-label="List">
        <Icon icon={Icons.List} size="xs" aria-hidden />
      </ToggleGroupItem>
      <ToggleGroupItem value="grid" aria-label="Grid">
        <Icon icon={Icons.Grid} size="xs" aria-hidden />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Multiple: Story = {
  render: () => (
    <ToggleGroup type="multiple" defaultValue={["new"]} aria-label="Filters">
      <ToggleGroupItem value="new">New</ToggleGroupItem>
      <ToggleGroupItem value="popular">Popular</ToggleGroupItem>
      <ToggleGroupItem value="archived" disabled>
        Archived
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};
