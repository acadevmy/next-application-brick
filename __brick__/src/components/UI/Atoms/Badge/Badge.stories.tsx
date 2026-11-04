import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Badge } from "./Badge";

const TONES = [
  "neutral",
  "accent",
  "success",
  "critical",
  "warning",
  "info",
  "muted",
] as const;

const APPEARANCES = ["solid", "soft", "outline", "ghost"] as const;
const SIZES = ["xs", "sm", "md", "lg"] as const;

const meta: Meta<typeof Badge> = {
  title: "UI/Atoms/Badge",
  component: Badge,
  parameters: {
    docs: {
      description: {
        component:
          "A `tone` says what the badge means, an `appearance` says how loud it is, and `size` is a plain scale. Colour is never passed literally.",
      },
    },
  },
  argTypes: {
    tone: { control: "select", options: TONES },
    appearance: { control: "select", options: APPEARANCES },
    size: { control: "select", options: SIZES },
  },
  args: { children: "Badge" },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {};

/** Every tone in every appearance: the grid is the whole API. */
export const ToneAndAppearance: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3">
      {APPEARANCES.map((appearance) => (
        <div key={appearance} className="flex flex-wrap items-center gap-2">
          {TONES.map((tone) => (
            <Badge key={tone} {...args} tone={tone} appearance={appearance}>
              {tone}
            </Badge>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-2">
      {SIZES.map((size) => (
        <Badge key={size} {...args} size={size}>
          {size}
        </Badge>
      ))}
    </div>
  ),
};

/** `asChild` turns the badge into a real button for filter chips. */
export const AsButton: Story = {
  render: (args) => (
    <Badge {...args} tone="accent" appearance="soft" asChild>
      <button type="button">Clickable</button>
    </Badge>
  ),
};
