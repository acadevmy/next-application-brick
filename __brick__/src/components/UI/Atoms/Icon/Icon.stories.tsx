import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Typography } from "@/components/UI/Atoms/Typography";

import { Icon, ICON_SIZES } from "./Icon";
import { Icons } from "./icons";

const meta: Meta<typeof Icon> = {
  title: "UI/Atoms/Icon",
  component: Icon,
  argTypes: {
    size: {
      control: "select",
      options: Object.keys(ICON_SIZES),
    },
  },
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const Search: Story = {
  args: {
    icon: Icons.Search,
    size: "m",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-6">
      {(Object.keys(ICON_SIZES) as Array<keyof typeof ICON_SIZES>).map(
        (size) => (
          <div key={size} className="flex flex-col items-center gap-2">
            <Icon icon={Icons.Search} size={size} />
            <Typography variant="caption-1" tone="muted">
              {size} ({ICON_SIZES[size]}px)
            </Typography>
          </div>
        ),
      )}
    </div>
  ),
};

export const ProjectIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6">
      <div className="flex flex-col items-center gap-2">
        <Icon icon={Icons.Search} size="l" />
        <Typography variant="caption-1">Search</Typography>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={Icons.User} size="l" />
        <Typography variant="caption-1">User</Typography>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={Icons.Facebook} size="l" />
        <Typography variant="caption-1">Facebook</Typography>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={Icons.Instagram} size="l" />
        <Typography variant="caption-1">Instagram</Typography>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={Icons.Twitter} size="l" />
        <Typography variant="caption-1">Twitter</Typography>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={Icons.YouTube} size="l" />
        <Typography variant="caption-1">Youtube</Typography>
      </div>
    </div>
  ),
};
