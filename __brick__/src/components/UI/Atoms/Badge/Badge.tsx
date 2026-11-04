import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import * as React from "react";

import { cn } from "@/components/UI/Foundations/style";

/**
 * Badge: a semantic `tone` says what it means, an `appearance` says how loud it
 * is, and `size` is a plain scale. Colours come from the semantic roles in
 * theme.css, so rebranding the palette restyles every badge.
 */
const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border border-transparent font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-5 gap-2 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-(length:--ring-width) focus-visible:ring-offset-2 outline-none transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      tone: {
        neutral: "",
        accent: "",
        success: "",
        critical: "",
        warning: "",
        info: "",
        muted: "",
      },
      appearance: {
        solid: "",
        soft: "",
        outline: "border-current bg-transparent",
        ghost: "bg-transparent",
      },
      size: {
        xs: "py-1 px-2 caption-1",
        sm: "py-1.5 px-3 body-4",
        md: "py-2 px-4 body-2",
        lg: "py-3 px-6 body-1",
      },
    },
    compoundVariants: [
      /* solid: full-strength background */
      {
        tone: "neutral",
        appearance: "solid",
        class: "bg-primary text-primary-foreground",
      },
      {
        tone: "accent",
        appearance: "solid",
        class: "bg-accent-foreground text-accent",
      },
      {
        tone: "critical",
        appearance: "solid",
        class: "bg-destructive text-destructive-foreground",
      },
      {
        tone: "info",
        appearance: "solid",
        class: "bg-info-foreground text-info",
      },
      {
        tone: "success",
        appearance: "solid",
        class: "bg-success-foreground text-success",
      },
      {
        tone: "warning",
        appearance: "solid",
        class: "bg-warning-foreground text-warning",
      },
      {
        tone: "muted",
        appearance: "solid",
        class: "bg-muted text-foreground",
      },
      /* soft: tinted background, same meaning at lower volume */
      {
        tone: "neutral",
        appearance: "soft",
        class: "bg-secondary text-secondary-foreground",
      },
      {
        tone: "accent",
        appearance: "soft",
        class: "bg-accent text-accent-foreground",
      },
      {
        tone: "critical",
        appearance: "soft",
        class: "bg-destructive/10 text-destructive",
      },
      {
        tone: "info",
        appearance: "soft",
        class: "bg-info text-info-foreground",
      },
      {
        tone: "success",
        appearance: "soft",
        class: "bg-success text-success-foreground",
      },
      {
        tone: "warning",
        appearance: "soft",
        class: "bg-warning text-warning-foreground",
      },
      {
        tone: "muted",
        appearance: "soft",
        class: "bg-muted text-muted-foreground",
      },
      /* outline and ghost take their colour from the tone's text */
      {
        tone: "neutral",
        appearance: ["outline", "ghost"],
        class: "text-foreground",
      },
      {
        tone: "accent",
        appearance: ["outline", "ghost"],
        class: "text-accent-foreground",
      },
      {
        tone: "critical",
        appearance: ["outline", "ghost"],
        class: "text-destructive",
      },
      {
        tone: "info",
        appearance: ["outline", "ghost"],
        class: "text-info-foreground",
      },
      {
        tone: "success",
        appearance: ["outline", "ghost"],
        class: "text-success-foreground",
      },
      {
        tone: "warning",
        appearance: ["outline", "ghost"],
        class: "text-warning-foreground",
      },
      {
        tone: "muted",
        appearance: ["outline", "ghost"],
        class: "text-muted-foreground",
      },
    ],
    defaultVariants: {
      tone: "neutral",
      appearance: "solid",
      size: "md",
    },
  },
);

const Badge = ({
  className,
  tone = "neutral",
  appearance = "solid",
  size = "md",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) => {
  const Comp = asChild ? Slot.Root : "span";

  return (
    <Comp
      data-slot="badge"
      data-tone={tone}
      data-appearance={appearance}
      data-size={size}
      className={cn(badgeVariants({ tone, appearance, size }), className)}
      {...props}
    />
  );
};

export { Badge, badgeVariants };
