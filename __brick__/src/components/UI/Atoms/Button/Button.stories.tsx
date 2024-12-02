import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Info } from "lucide-react";

import Button from "@/components/UI/Atoms/Button";

const meta: Meta<typeof Button> = {
  title: "Atoms/Button",
  component: Button,
  args: { onClick: fn(), children: "Button" },
  // argTypes: {
  //   size: {
  //     options: [
  //       "xs",
  //       "sm",
  //       "regular",
  //       "lg",
  //       "icon",
  //     ] satisfies ButtonProps["size"][],
  //     control: { type: "radio" },
  //   },
  // },
  parameters: {
    controls: { exclude: ["asChild", "variant"] },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DefaultWithRightIcon: Story = {
  name: "Default / With Right Icon",
  args: {
    children: (
      <>
        Button <Info />
      </>
    ),
  },
};

export const DefaultIcon: Story = {
  name: "Default / Icon",
  args: {
    children: <Info />,
    size: "icon",
  },
};

export const DefaultSm: Story = {
  name: "Default / Small",
  args: {
    size: "sm",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};
export const Outline: Story = {
  args: {
    variant: "outline",
  },
};
export const Ghost: Story = {
  args: {
    variant: "ghost",
  },
};
export const Link: Story = {
  args: {
    variant: "link",
  },
};
export const Destructive: Story = {
  args: {
    variant: "destructive",
  },
};
