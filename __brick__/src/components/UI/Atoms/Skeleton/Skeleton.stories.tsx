import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Stack } from "@/components/UI/Layout/Stack";

import { Skeleton } from "./Skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "UI/Atoms/Skeleton",
  component: Skeleton,
  parameters: {
    docs: {
      description: {
        component:
          "Placeholder for content that has not arrived yet. Give it the shape of what will replace it, so the layout does not jump when it does.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  render: () => <Skeleton className="h-6 w-48" />,
};

/** Shaped like the card it stands in for. */
export const CardPlaceholder: Story = {
  render: () => (
    <Stack gap="md" className="w-72">
      <Skeleton className="aspect-video w-full" />
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
    </Stack>
  ),
};
