import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./Tooltip";

const meta: Meta<typeof Tooltip> = {
  title: "UI/Atoms/Tooltip",
  component: Tooltip,
  parameters: {
    docs: {
      description: {
        component:
          "Tooltip su hover. Usa TooltipProvider, Tooltip, TooltipTrigger e TooltipContent. Stile theme (rounded-lg, border, bg-card).",
      },
    },
  },
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          className="rounded-lg border border-input px-3 py-2 text-sm"
        >
          Passa il mouse
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Testo del tooltip</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const OnIcon: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          className="inline-flex size-8 items-center justify-center rounded-lg border border-input"
          aria-label="Aiuto"
        >
          <span className="text-sm">?</span>
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Spiegazione aggiuntiva per questo campo</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const SideRight: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          className="rounded-lg border border-input px-3 py-2 text-sm"
        >
          Tooltip a destra
        </button>
      </TooltipTrigger>
      <TooltipContent side="right">
        <p>Contenuto a destra del trigger</p>
      </TooltipContent>
    </Tooltip>
  ),
};
