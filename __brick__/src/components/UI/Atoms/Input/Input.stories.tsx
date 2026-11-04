import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "UI/Atoms/Input",
  component: Input,
  parameters: {
    docs: {
      description: {
        component:
          "Campo di testo con stile theme (border, radius, focus ring). Usato in SearchInput, form subscribe, ecc.",
      },
    },
  },
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "search"],
    },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Placeholder",
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: "Testo inserito",
    placeholder: "Placeholder",
  },
};

export const Email: Story = {
  args: {
    type: "email",
    placeholder: "email@esempio.it",
  },
};

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Password",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Disabled",
  },
};

export const Invalid: Story = {
  args: {
    "aria-invalid": true,
    defaultValue: "Valore non valido",
    placeholder: "Campo con errore",
  },
};
