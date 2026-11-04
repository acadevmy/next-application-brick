import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "@/components/UI/Atoms/Button";
import { Icon, Icons } from "@/components/UI/Atoms/Icon";
import { SearchInput } from "@/components/UI/Molecules/SearchInput";

import { PageHeader } from "./PageHeader";

const meta: Meta<typeof PageHeader> = {
  title: "UI/Molecules/PageHeader",
  component: PageHeader,
  parameters: {
    docs: {
      description: {
        component:
          "The top of a page: its title and, beside it, the page's own actions. Compose with `PageHeader.Title`, `PageHeader.Toolbar` and `PageHeader.Action`.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const TitleOnly: Story = {
  render: () => (
    <PageHeader>
      <PageHeader.Title>Articles</PageHeader.Title>
    </PageHeader>
  ),
};

export const WithSubtitle: Story = {
  render: () => (
    <PageHeader separator>
      <PageHeader.Title subtitle="Everything published in the last year.">
        Articles
      </PageHeader.Title>
    </PageHeader>
  ),
};

export const WithToolbar: Story = {
  render: () => (
    <PageHeader>
      <PageHeader.Title>Articles</PageHeader.Title>
      <PageHeader.Toolbar>
        <SearchInput aria-label="Search articles" placeholder="Search…" />
        <PageHeader.Action
          compact={
            <Button size="icon" aria-label="New article">
              <Icon icon={Icons.Plus} size="xs" aria-hidden />
            </Button>
          }
        >
          <Button>
            <Icon icon={Icons.Plus} size="xs" aria-hidden />
            New article
          </Button>
        </PageHeader.Action>
      </PageHeader.Toolbar>
    </PageHeader>
  ),
};
