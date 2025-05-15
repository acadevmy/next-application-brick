import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Info } from "lucide-react";

import Button, { ButtonProps } from "@/components/UI/Atoms/Button";

const meta: Meta<typeof Button> = {
  title: "Atoms/Button",
  component: Button,
  args: { size: "regular", onClick: fn(), children: "Button" },
  argTypes: {
    size: {
      options: [
        "xs",
        "sm",
        "regular",
        "lg",
        "icon",
      ] satisfies ButtonProps["size"][],
      control: { type: "radio" },
    },
  },
  parameters: {
    controls: { exclude: ["asChild", "variant"] },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    size: "regular",
  },
};

export const PrimaryTextRightIcon: Story = {
  name: "Primary / Text Right Icon",
  args: {
    size: "sm",
    variant: "primary",
    children: (
      <>
        Button <Info />
      </>
    ),
  },
};
export const PrimaryIcon: Story = {
  name: "Primary / Icon",
  args: {
    variant: "primary",
    children: <Info />,
    size: "icon",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    size: "regular",
  },
};

export const SecondaryIcon: Story = {
  name: "Secondary / Icon",
  args: {
    variant: "secondary",
    children: <Info />,
    size: "icon",
  },
};

export const SecondaryTextIcon: Story = {
  name: "Secondary / Text Right Icon",
  args: {
    variant: "secondary",
    size: "sm",
    children: (
      <>
        Button <Info />
      </>
    ),
  },
};

export const SecondaryIconVariant: Story = {
  name: "SecondaryIcon",
  args: {
    variant: "secondaryIcon",
    children: <Info />,
    size: "icon",
  },
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    size: "regular",
  },
};

export const OutlineIcon: Story = {
  name: "Outline / Icon",
  args: {
    variant: "outline",
    children: <Info />,
    size: "icon",
  },
};

export const OutlineSuccess: Story = {
  name: "Outline / Success",
  args: {
    variant: "outline",
    size: "regular",
    colorTheme: "success",
  },
};
export const OutlineTextRightIcon: Story = {
  name: "Outline / Text Right Icon",
  args: {
    variant: "outline",
    size: "sm",
    children: (
      <>
        Button <Info />
      </>
    ),
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    size: "regular",
  },
};
export const GhostIcon: Story = {
  name: "Ghost / Icon",
  args: {
    variant: "ghost",
    children: <Info />,
    size: "icon",
  },
};
export const GhostPrimary: Story = {
  name: "Ghost / Primary",
  args: {
    variant: "ghost",
    colorTheme: "primary",
    size: "regular",
  },
};
export const GhostSuccess: Story = {
  name: "Ghost / Success",
  args: {
    variant: "ghost",
    colorTheme: "success",
    size: "regular",
  },
};
export const GhostBackground: Story = {
  name: "Ghost / Background",
  args: {
    variant: "ghost",
    colorTheme: "background",
    size: "regular",
  },
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};
export const GhostTextRightIcon: Story = {
  name: "Ghost / Text Right Icon",
  args: {
    variant: "ghost",
    size: "sm",
    children: (
      <>
        Button <Info />
      </>
    ),
  },
};

export const Link: Story = {
  args: {
    variant: "link",
    size: "regular",
  },
};
export const LinkIcon: Story = {
  name: "Link / Icon",
  args: {
    variant: "link",
    children: <Info />,
    size: "icon",
  },
};
export const LinkPrimary: Story = {
  name: "Link / Primary",
  args: {
    variant: "link",
    size: "regular",
    colorTheme: "primary",
  },
};
export const LinkTextLeftIcon: Story = {
  name: "Link / Text Left Icon",
  args: {
    variant: "link",
    size: "sm",
    children: (
      <>
        <Info /> Button
      </>
    ),
  },
};
