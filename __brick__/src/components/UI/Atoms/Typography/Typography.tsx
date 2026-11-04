"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import type React from "react";

import { cn } from "@/components/UI/Foundations/style";

const typographyVariants = cva("", {
  variants: {
    variant: {
      "title-1": "title-1",
      "title-2": "title-2",
      "title-3": "title-3",
      "heading-1": "heading-1",
      "heading-2": "heading-2",
      "heading-3": "heading-3",
      "heading-4": "heading-4",
      "heading-5": "heading-5",
      "heading-6": "heading-6",
      "body-1": "body-1",
      "body-2": "body-2",
      "body-3": "body-3",
      "body-4": "body-4",
      "caption-1": "caption-1",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    tone: {
      /** Inherits the surface foreground. */
      default: "",
      /** Secondary text on the same surface. */
      muted: "text-muted-foreground",
      /** The primary colour, for eyebrows and emphasised titles. */
      accent: "text-primary",
      /** Explicitly the inverted surface foreground, outside a Surface. */
      inverted: "text-inverted-foreground",
      /** Takes whatever colour the parent element already set. */
      current: "text-current",
    },
  },
  defaultVariants: {
    weight: undefined,
    tone: "default",
  },
});

export type TypographyVariant = NonNullable<
  VariantProps<typeof typographyVariants>["variant"]
>;
export type TypographyTone = NonNullable<
  VariantProps<typeof typographyVariants>["tone"]
>;

const defaultTag: Record<TypographyVariant, React.ElementType> = {
  "title-1": "div",
  "title-2": "div",
  "title-3": "div",
  "heading-1": "h1",
  "heading-2": "h2",
  "heading-3": "h3",
  "heading-4": "h4",
  "heading-5": "h5",
  "heading-6": "h6",
  "body-1": "p",
  "body-2": "p",
  "body-3": "p",
  "body-4": "p",
  "caption-1": "span",
};

export interface TypographyProps
  extends
    Omit<VariantProps<typeof typographyVariants>, "variant">,
    Omit<React.HTMLAttributes<HTMLElement>, "color"> {
  variant: NonNullable<VariantProps<typeof typographyVariants>["variant"]>;
  /** Override the rendered HTML tag for SEO/semantics while keeping the variant style (e.g. variant="heading-4" as="h1"). */
  as?: React.ElementType;
  asChild?: boolean;
}

const Typography = ({
  variant,
  weight,
  tone,
  className,
  as,
  asChild = false,
  ...props
}: TypographyProps) => {
  const Comp: React.ElementType = asChild
    ? Slot.Root
    : (as ?? defaultTag[variant]);
  return (
    <Comp
      className={cn(typographyVariants({ variant, weight, tone }), className)}
      {...props}
    />
  );
};

Typography.displayName = "Typography";

export { Typography, typographyVariants };
