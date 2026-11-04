import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Icon, Icons } from "@/components/UI/Atoms/Icon";

import { Alert, AlertDescription, AlertTitle } from "./Alert";

const meta: Meta<typeof Alert> = {
  title: "UI/Atoms/Alert",
  component: Alert,
  parameters: {
    docs: {
      description: {
        component:
          "Inline alert (shadcn). Compose with `AlertTitle` and `AlertDescription`. Optional leading icon via the project `Icon` atom. Variants: default, destructive, success, warning, info.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "success", "warning", "info"],
    },
  },
  decorators: [
    (Story) => (
      <div className="w-md">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Alert {...args}>
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the CLI.
      </AlertDescription>
    </Alert>
  ),
};

export const WithIcon: Story = {
  render: (args) => (
    <Alert {...args}>
      <Icon icon={Icons.Info} size="xs" />
      <AlertTitle>Information</AlertTitle>
      <AlertDescription>
        This alert renders a leading icon from the project Icon atom.
      </AlertDescription>
    </Alert>
  ),
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
  },
  render: (args) => (
    <Alert {...args}>
      <Icon icon={Icons.Info} size="xs" />
      <AlertTitle>Something went wrong</AlertTitle>
      <AlertDescription>
        Please verify your input and try again. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
        et dolore magna aliqua.
      </AlertDescription>
    </Alert>
  ),
};

export const Success: Story = {
  args: {
    variant: "success",
  },
  render: (args) => (
    <Alert {...args}>
      <Icon icon={Icons.CheckCircle} size="xs" />
      <AlertTitle>Saved successfully</AlertTitle>
      <AlertDescription>
        Your changes have been saved. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit.
      </AlertDescription>
    </Alert>
  ),
};

export const DefaultMinimal: Story = {
  render: (args) => (
    <Alert {...args}>
      <AlertDescription>
        You can add components to your app using the CLI.
      </AlertDescription>
    </Alert>
  ),
};

export const SuccessMinimal: Story = {
  args: {
    variant: "success",
  },
  render: (args) => (
    <Alert {...args}>
      <AlertDescription>
        Your changes have been saved. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit.
      </AlertDescription>
    </Alert>
  ),
};

export const DestructiveMinimal: Story = {
  args: {
    variant: "destructive",
  },
  render: (args) => (
    <Alert {...args}>
      <AlertDescription>
        Please verify your input and try again. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
        et dolore magna aliqua.
      </AlertDescription>
    </Alert>
  ),
};

export const TitleOnly: Story = {
  render: (args) => (
    <Alert {...args}>
      <AlertTitle>Saved successfully.</AlertTitle>
    </Alert>
  ),
};
