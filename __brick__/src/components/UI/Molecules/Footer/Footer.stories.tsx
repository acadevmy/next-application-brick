import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Icon, Icons } from "@/components/UI/Atoms/Icon";

import { Footer } from "./Footer";

const meta: Meta<typeof Footer> = {
  title: "UI/Molecules/Footer",
  component: Footer,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Site footer: logo and description, columns of links, and a bottom row for copyright and legal links. Internal links render through `linkComponent`.",
      },
    },
  },
  args: {
    logo: <span className="font-semibold">Site name</span>,
    description: "A short line about the site.",
    linkColumns: [
      {
        title: "Product",
        links: [
          { label: "Features", href: "#features" },
          { label: "Pricing", href: "#pricing" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About", href: "#about" },
          { label: "Contact", href: "#contact" },
        ],
      },
      {
        title: "Legal",
        links: [
          { label: "Privacy", href: "#privacy" },
          { label: "Cookies", href: "#cookies" },
        ],
      },
    ],
    bottomLeft: "© 2026 Site name",
  },
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {};

export const WithSocialLinks: Story = {
  args: {
    bottomRight: (
      <ul className="m-0 flex list-none gap-4 p-0">
        <li>
          <a href="#" aria-label="GitHub" className="hover:text-foreground">
            <Icon icon={Icons.GitHub} size="s" aria-hidden />
          </a>
        </li>
        <li>
          <a href="#" aria-label="LinkedIn" className="hover:text-foreground">
            <Icon icon={Icons.LinkedIn} size="s" aria-hidden />
          </a>
        </li>
      </ul>
    ),
  },
};

export const Minimal: Story = {
  args: { description: undefined, linkColumns: [] },
};
