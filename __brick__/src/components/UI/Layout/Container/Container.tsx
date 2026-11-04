"use client";

import * as React from "react";

import { cn } from "@/components/UI/Foundations/style";

/** Centred page container: max-w-container, px-container-inline. */
export interface ContainerProps extends React.ComponentProps<"div"> {
  /** Optional semantic element (main, section, entry) instead of div */
  as?: "div" | "main" | "section" | "article";
}

const Container = ({
  className,
  as: Comp = "div",
  children,
  ...props
}: ContainerProps) => {
  return (
    <Comp
      data-slot="container"
      className={cn(
        "w-full max-w-container mx-auto px-container-inline",
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  );
};

export { Container };
