import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ThemeToggle } from "@/components/UI/Molecules/ThemeToggle";

import { Header } from "./Header";

const meta: Meta<typeof Header> = {
  title: "UI/Molecules/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Site header: logo, main navigation and site actions, sticky at the top. Below `md` the navigation folds into a disclosure panel. The active link comes from `pathname`, injected by the app; internal links render through `linkComponent`.",
      },
    },
  },
  args: {
    logo: (
      <a href="#" className="font-semibold text-foreground no-underline">
        Site name
      </a>
    ),
    links: [
      { label: "Home", href: "/" },
      { label: "Blog", href: "/blog" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
    pathname: "/blog/first-post",
    actions: (
      <ThemeToggle
        toDarkLabel="Switch to dark"
        toLightLabel="Switch to light"
      />
    ),
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {};

export const LogoOnly: Story = {
  args: { links: [], actions: undefined },
};

/** Below `md`: resize the canvas (or pick a mobile viewport) to see the menu button. */
export const Narrow: Story = {
  globals: { viewport: { value: "mobile1", isRotated: false } },
};
