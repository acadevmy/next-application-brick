import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Textarea } from "./Textarea";

const meta: Meta<typeof Textarea> = {
  title: "UI/Atoms/Textarea",
  component: Textarea,
  parameters: {
    docs: {
      description: {
        component:
          "Area di testo multiriga con stile theme (rounded-lg, border, focus ring). Usato nei form per messaggi o descrizioni.",
      },
    },
  },
  argTypes: {
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    rows: { control: "number" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Scrivi qui...",
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: "Testo già inserito",
    placeholder: "Placeholder",
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

export const Rows: Story = {
  args: {
    rows: 5,
    placeholder: "Area più alta (5 righe)",
  },
};
