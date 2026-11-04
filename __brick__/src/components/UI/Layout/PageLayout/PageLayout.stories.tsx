import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Typography } from "@/components/UI/Atoms/Typography";

import { PageLayout } from "./PageLayout";

const meta: Meta<typeof PageLayout> = {
  title: "UI/Layout/PageLayout",
  component: PageLayout,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Page shell: header + main + footer. The footer stays at the bottom of short pages. Use from the app layout.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof PageLayout>;

const placeholderHeader = (
  <header className="w-full border-b border-border bg-background px-container-inline py-4">
    <Typography variant="body-2" weight="medium">
      Header slot
    </Typography>
  </header>
);

const placeholderFooter = (
  <footer className="w-full border-t border-border bg-muted px-container-inline py-6">
    <Typography variant="body-3" tone="muted">
      Footer slot
    </Typography>
  </footer>
);

export const WithHeaderAndFooter: Story = {
  args: {
    header: placeholderHeader,
    footer: placeholderFooter,
    children: (
      <div className="px-container-inline py-8">
        <Typography variant="body-2" tone="muted">
          Main content. Use the site Header as header slot and the Footer as
          footer slot.
        </Typography>
      </div>
    ),
  },
};

export const HeaderOnly: Story = {
  args: {
    header: placeholderHeader,
    children: (
      <div className="px-container-inline py-8">
        <Typography variant="body-2">Main content only.</Typography>
      </div>
    ),
  },
};
