"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import * as React from "react";

import { cn } from "@/components/UI/Foundations/style";

/** Navigation link for the header (horizontal row) and footer (column lists). Text + optional icon. */
const navItemVariants = cva(
  "inline-flex items-center gap-2 no-underline outline-none transition-colors focus-visible:ring-ring/50 focus-visible:ring-(length:--ring-width) rounded-md [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        /** Header: horizontal nav link, muted until hovered or current. */
        header:
          "body-3 font-medium text-muted-foreground hover:text-foreground",
        /** Footer: link in a column list. */
        footer:
          "body-3 text-muted-foreground hover:text-foreground hover:underline underline-offset-4",
        /** Default: generic inline link. */
        default: "body-2 text-primary hover:underline underline-offset-4",
      },
      active: {
        true: "text-foreground",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      active: false,
    },
  },
);

export interface NavItemProps
  extends
    Omit<React.ComponentProps<"a">, "href">,
    VariantProps<typeof navItemVariants> {
  asChild?: boolean;
  href?: string;
}

const NavItem = ({
  className,
  variant = "default",
  active = false,
  asChild = false,
  children,
  ...props
}: NavItemProps) => {
  const Comp = asChild ? Slot.Root : "a";

  return (
    <Comp
      data-slot="nav-item"
      data-variant={variant}
      data-active={active || undefined}
      aria-current={active ? "page" : undefined}
      className={cn(navItemVariants({ variant, active }), className)}
      {...props}
    >
      {children}
    </Comp>
  );
};

export { NavItem, navItemVariants };
