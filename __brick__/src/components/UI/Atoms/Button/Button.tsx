"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import * as React from "react";

import { Spinner } from "@/components/UI/Atoms/Spinner";
import { cn } from "@/components/UI/Foundations/style";

/** Button: shadcn's, with the project's sizes, `width` and `loading`. Colours come from the semantic roles in theme.css. */
const buttonVariants = cva(
  "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-(length:--ring-width) aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        outline:
          "border border-border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        "link-destructive":
          "text-destructive underline-offset-4 hover:underline",
        "link-muted":
          "text-muted-foreground underline-offset-4 hover:text-foreground hover:underline",
      },
      /**
       * Horizontal sizing. `responsive` is the common "full width until there
       * is room" case, which used to be written four different ways across
       * the app (`md:w-fit`, `lg:w-fit`, `lg:w-auto`).
       */
      width: {
        auto: "",
        full: "w-full",
        responsive: "w-full md:w-fit",
      },
      size: {
        default: "text-sm font-medium h-9 py-2 px-4 has-[>svg]:px-3",
        xs: "text-sm font-medium h-6 gap-1 rounded-lg py-1.5 px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "text-sm font-medium h-8 rounded-lg gap-1.5 py-2 px-3 has-[>svg]:px-2.5",
        lg: "text-base font-medium h-10 py-2 px-6 has-[>svg]:px-4",
        xl: "text-sm font-medium h-12 rounded-xl py-3 px-8 text-base has-[>svg]:px-5 [&_svg:not([class*='size-'])]:size-5",
        icon: "size-9 rounded-lg p-2",
        "icon-xs":
          "size-6 rounded-lg p-1.5 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8 rounded-lg p-2",
        "icon-lg": "size-10 rounded-lg p-2.5",
        "icon-xl":
          "size-12 rounded-xl p-3 [&_svg:not([class*='size-'])]:size-5",
        "icon-2xl":
          "size-14 rounded-xl p-4 [&_svg:not([class*='size-'])]:size-6",
      },
    },
    compoundVariants: [
      {
        // Text button: Body-1 Medium, icon 24, no padding.
        variant: ["link", "link-destructive", "link-muted"],
        size: "lg",
        class:
          "body-1 font-medium h-auto p-0 rounded-none [&_svg:not([class*='size-'])]:size-6",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
      width: "auto",
    },
  },
);

const Button = ({
  className,
  variant = "default",
  size = "default",
  width = "auto",
  asChild = false,
  loading = false,
  noPadding = false,
  children,
  disabled,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    /** When true, shows spinner and disables the button; label stays for layout (invisible). */
    loading?: boolean;
    /** When true, removes padding from the button (useful for icon-only buttons in tight spaces). */
    noPadding?: boolean;
  }) => {
  const Comp = asChild ? Slot.Root : "button";
  const isDisabled = disabled ?? loading;

  const content =
    loading && !asChild ? (
      <>
        <span className="invisible" aria-hidden>
          {children}
        </span>
        <span className="sr-only">{children}</span>
        <span className="absolute inset-0 flex items-center justify-center">
          <Spinner size="s" tone="current" aria-hidden />
        </span>
      </>
    ) : (
      children
    );

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      data-width={width}
      data-loading={loading || undefined}
      className={cn(
        buttonVariants({ variant, size, width, className }),
        loading && "relative",
        noPadding && "p-0 size-auto",
      )}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      {...props}
    >
      {content}
    </Comp>
  );
};

export { Button, buttonVariants };
