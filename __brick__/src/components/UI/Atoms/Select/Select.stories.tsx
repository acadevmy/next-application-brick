import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./Select";

const meta: Meta<typeof Select> = {
  title: "UI/Atoms/Select",
  component: Select,
  parameters: {
    docs: {
      description: {
        component:
          "Select (dropdown) con trigger, content e item. Stile theme (rounded-lg, border, focus). Usato nei form per scelte da elenco.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[200px]" aria-label="Opzione">
        <SelectValue placeholder="Seleziona..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="a">Opzione A</SelectItem>
        <SelectItem value="b">Opzione B</SelectItem>
        <SelectItem value="c">Opzione C</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const WithValue: Story = {
  render: () => (
    <Select defaultValue="b">
      <SelectTrigger className="w-[200px]" aria-label="Opzione">
        <SelectValue placeholder="Seleziona..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="a">Opzione A</SelectItem>
        <SelectItem value="b">Opzione B</SelectItem>
        <SelectItem value="c">Opzione C</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const LongList: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[240px]" aria-label="Opzione">
        <SelectValue placeholder="Scegli una regione" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="lombardia">Lombardia</SelectItem>
        <SelectItem value="lazio">Lazio</SelectItem>
        <SelectItem value="campania">Campania</SelectItem>
        <SelectItem value="sicilia">Sicilia</SelectItem>
        <SelectItem value="veneto">Veneto</SelectItem>
        <SelectItem value="piemonte">Piemonte</SelectItem>
        <SelectItem value="emilia">Emilia-Romagna</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Select disabled>
      <SelectTrigger className="w-[200px]" aria-label="Opzione">
        <SelectValue placeholder="Disabilitato" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="a">Opzione A</SelectItem>
        <SelectItem value="b">Opzione B</SelectItem>
      </SelectContent>
    </Select>
  ),
};
