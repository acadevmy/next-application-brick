import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ExpandableText } from "./ExpandableText";

const SHORT = "A line that fits well within the limit, so no toggle appears.";
const LONG = Array.from(
  { length: 6 },
  () =>
    "This paragraph runs past the collapsed height, which is what makes the toggle appear. ",
).join("");

const meta: Meta<typeof ExpandableText> = {
  title: "UI/Atoms/ExpandableText",
  component: ExpandableText,
  parameters: {
    docs: {
      description: {
        component:
          "Truncates long copy and offers a toggle. Text that already fits renders without a toggle, so short content never grows a control it does not need.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ExpandableText>;

export const Long: Story = {
  render: () => (
    <div className="max-w-md">
      <ExpandableText showMoreLabel="Show more" showLessLabel="Show less">
        {LONG}
      </ExpandableText>
    </div>
  ),
};

/** Short enough to fit: no toggle. */
export const Short: Story = {
  render: () => (
    <div className="max-w-md">
      <ExpandableText showMoreLabel="Show more" showLessLabel="Show less">
        {SHORT}
      </ExpandableText>
    </div>
  ),
};
