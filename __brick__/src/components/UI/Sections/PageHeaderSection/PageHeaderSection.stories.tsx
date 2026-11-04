import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "@/components/UI/Atoms/Button";
import { Icon } from "@/components/UI/Atoms/Icon";
import { Icons } from "@/components/UI/Atoms/Icon/icons";
import { PageHeader } from "@/components/UI/Molecules/PageHeader";

import { PageHeaderSection } from "./PageHeaderSection";

const meta: Meta<typeof PageHeaderSection> = {
  title: "UI/Sections/PageHeaderSection",
  component: PageHeaderSection,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "The band a page opens with: a title beside its toolbar, then the copy that introduces the page. Actions passed as `PageHeader.Action` swap to their compact twin below `lg`.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/** Same structure, first content: actions that collapse to their icon. */
export const WithCollapsingActions: Story = {
  args: {
    pretitle: "Pretitle",
    title: "A page title",
    children:
      "The copy that introduces the page sits under the title row, at a body size.",
    actions: (
      <>
        <PageHeader.Action
          compact={
            <Button size="lg" variant="link" aria-label="Get in touch">
              <Icon icon={Icons.Email} />
            </Button>
          }
        >
          <Button size="lg">Get in touch</Button>
        </PageHeader.Action>
        <PageHeader.Action
          compact={
            <Button size="lg" variant="link" aria-label="Open the map">
              <Icon icon={Icons.Location} />
            </Button>
          }
        >
          <Button size="lg" variant="secondary">
            <Icon icon={Icons.Location} />
            Open the map
          </Button>
        </PageHeader.Action>
      </>
    ),
  },
};

/** Same structure, second content: a title alone, and one action that never collapses. */
export const WithAnActionThatKeepsItsLabel: Story = {
  args: {
    title: "A page title on its own",
    actions: (
      <PageHeader.Action>
        <Button size="lg">An action with no icon</Button>
      </PageHeader.Action>
    ),
  },
};

export const TitleOnly: Story = {
  args: { title: "Nothing beside it" },
};
