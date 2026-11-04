import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Typography } from "@/components/UI/Atoms/Typography";
import { Surface } from "@/components/UI/Layout/Surface";

import { ThemeToggle } from "./ThemeToggle";

const meta: Meta<typeof ThemeToggle> = {
  title: "UI/Molecules/ThemeToggle",
  component: ThemeToggle,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Cambia il tema scrivendo `data-theme` su `<html>`: i token di `theme.css` e tutte le utility `dark:` seguono da sole, senza stato React. Icona ed etichetta accessibile della variante nascosta le sceglie il CSS, non il render, così il server non deve indovinare il tema del visitatore. Premendolo qui cambia davvero il tema di questa pagina di Storybook.",
      },
    },
  },
  args: {
    toDarkLabel: "Passa al tema scuro",
    toLightLabel: "Passa al tema chiaro",
  },
};

export default meta;

type Story = StoryObj<typeof ThemeToggle>;

export const Default: Story = {};

/** Come sta nell'header: accanto a una superficie che reagisce al cambio. */
export const OnASurface: Story = {
  render: (args) => (
    <Surface tone="neutral" radius="card" padding="md">
      <div className="flex items-center gap-4">
        <Typography variant="body-2">Tema</Typography>
        <ThemeToggle {...args} />
      </div>
    </Surface>
  ),
};
