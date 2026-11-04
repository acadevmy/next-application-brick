import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "@/components/UI/Atoms/Button";

import { SectionHeading } from "./SectionHeading";

const meta: Meta<typeof SectionHeading> = {
  title: "UI/Molecules/SectionHeading",
  component: SectionHeading,
  parameters: {
    docs: {
      description: {
        component:
          "The heading a section opens with: pretitle, title, copy and calls to action. Renders nothing when all four are empty, so callers do not have to guard it.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const actions = (
  <>
    <Button size="lg" width="responsive">
      Primary action
    </Button>
    <Button size="lg" width="responsive" variant="secondary">
      Secondary action
    </Button>
  </>
);

export const Default: Story = {
  args: {
    pretitle: "Pretitle",
    title: "A title that opens the section",
    children:
      "The supporting copy sits under the title at a body size, and takes the full measure its container allows.",
    actions,
  },
};

export const TitleOnly: Story = {
  args: { title: "A title on its own" },
};

export const Centered: Story = {
  args: {
    align: "center",
    pretitle: "Pretitle",
    title: "A centred heading",
    children: "Both the column and the calls to action line up on the centre.",
    actions,
  },
};

export const CopyWithoutTitle: Story = {
  args: {
    children:
      "A section can open with copy alone: no title, no pretitle, and the type scale still holds.",
    actions,
  },
};

export const Empty: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Nothing filled in: the component renders nothing.",
      },
    },
  },
};
