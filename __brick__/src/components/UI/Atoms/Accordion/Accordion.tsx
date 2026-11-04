"use client";

import { Accordion as AccordionPrimitive } from "radix-ui";
import * as React from "react";

import { Icon, Icons } from "@/components/UI/Atoms/Icon";
import { cn } from "@/components/UI/Foundations/style";

/**
 * Accordion: shadcn's, on Radix. A stack of sections whose content expands
 * under its trigger; `type="single"` keeps one open at a time (add
 * `collapsible` to allow closing it), `type="multiple"` lets several stay
 * open. Radix owns `aria-expanded`, `aria-controls` and the arrow keys.
 */
const Accordion = (
  props: React.ComponentProps<typeof AccordionPrimitive.Root>,
) => <AccordionPrimitive.Root data-slot="accordion" {...props} />;

const AccordionItem = ({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) => (
  <AccordionPrimitive.Item
    data-slot="accordion-item"
    className={cn("border-b border-border last:border-b-0", className)}
    {...props}
  />
);

const AccordionTrigger = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      data-slot="accordion-trigger"
      className={cn(
        "flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left body-2 font-medium transition-all outline-none hover:underline focus-visible:ring-ring/50 focus-visible:ring-(length:--ring-width) disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>[data-slot=accordion-chevron]]:rotate-180",
        className,
      )}
      {...props}
    >
      {children}
      <span
        className="pointer-events-none shrink-0 translate-y-0.5 text-muted-foreground transition-transform duration-200"
        data-slot="accordion-chevron"
      >
        <Icon icon={Icons.ChevronDown} size="xs" aria-hidden />
      </span>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
);

const AccordionContent = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) => (
  <AccordionPrimitive.Content
    data-slot="accordion-content"
    className="overflow-hidden body-3 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pt-0 pb-4", className)}>{children}</div>
  </AccordionPrimitive.Content>
);

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
