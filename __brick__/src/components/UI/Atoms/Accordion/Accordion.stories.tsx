import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./Accordion";

const meta: Meta<typeof Accordion> = {
  title: "UI/Atoms/Accordion",
  component: Accordion,
  parameters: {
    docs: {
      description: {
        component:
          'shadcn\'s accordion, on Radix. `type="single"` keeps one section open at a time (`collapsible` allows closing it); `type="multiple"` lets several stay open. Arrow keys move between triggers.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

const sections = [
  {
    value: "one",
    title: "What is included?",
    body: "Everything listed on the plan page, with no add-ons required.",
  },
  {
    value: "two",
    title: "Can I change it later?",
    body: "Yes. Changes apply from the next billing period.",
  },
  {
    value: "three",
    title: "Who do I contact for help?",
    body: "Write to us from the contact page: we answer within a working day.",
  },
];

export const Single: Story = {
  render: () => (
    <div className="max-w-xl">
      <Accordion type="single" collapsible defaultValue="one">
        {sections.map((section) => (
          <AccordionItem key={section.value} value={section.value}>
            <AccordionTrigger>{section.title}</AccordionTrigger>
            <AccordionContent>{section.body}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  ),
};

export const Multiple: Story = {
  render: () => (
    <div className="max-w-xl">
      <Accordion type="multiple" defaultValue={["one", "two"]}>
        {sections.map((section) => (
          <AccordionItem key={section.value} value={section.value}>
            <AccordionTrigger>{section.title}</AccordionTrigger>
            <AccordionContent>{section.body}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  ),
};
