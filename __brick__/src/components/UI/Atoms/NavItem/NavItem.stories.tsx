import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Icon, Icons } from "@/components/UI/Atoms/Icon";

import { NavItem } from "./NavItem";

const meta: Meta<typeof NavItem> = {
  title: "UI/Atoms/NavItem",
  component: NavItem,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "header", "footer"],
    },
    active: { control: "boolean" },
    asChild: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof NavItem>;

export const Default: Story = {
  args: {
    href: "#",
    children: "Link",
  },
};

export const Header: Story = {
  args: {
    variant: "header",
    href: "#",
    children: "Stores",
  },
};

export const HeaderActive: Story = {
  args: {
    variant: "header",
    active: true,
    href: "#",
    children: "Home",
  },
};

export const Footer: Story = {
  args: {
    variant: "footer",
    href: "#",
    children: "Privacy policy",
  },
};

export const WithIcon: Story = {
  render: (args) => (
    <NavItem href="#" variant="header" {...args}>
      <Icon icon={Icons.Search} size="xs" aria-hidden />
      Search
    </NavItem>
  ),
};

export const HeaderRow: Story = {
  render: () => (
    <nav className="flex flex-wrap items-center gap-6" aria-label="Main">
      <NavItem variant="header" href="#" active>
        Home
      </NavItem>
      <NavItem variant="header" href="#">
        Stores
      </NavItem>
      <NavItem variant="header" href="#">
        Flyers
      </NavItem>
      <NavItem variant="header" href="#">
        Events
      </NavItem>
    </nav>
  ),
};

export const FooterColumn: Story = {
  render: () => (
    <ul className="flex flex-col gap-2 list-none p-0 m-0">
      <li>
        <NavItem variant="footer" href="#">
          Privacy policy
        </NavItem>
      </li>
      <li>
        <NavItem variant="footer" href="#">
          Terms of use
        </NavItem>
      </li>
      <li>
        <NavItem variant="footer" href="#">
          Contact
        </NavItem>
      </li>
    </ul>
  ),
};
