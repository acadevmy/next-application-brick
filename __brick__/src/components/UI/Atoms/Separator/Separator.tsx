"use client";

import * as SeparatorPrimitive from "@radix-ui/react-separator";
import * as React from "react";

import { SeparatorProps } from "@/components/UI/Atoms/Separator";
import styles from "@/components/UI/Atoms/Separator/Separator.module.scss";
import { cn } from "@/utils/style";

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref,
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        styles.separator,
        orientation === "horizontal" ? styles.separatorH : styles.separatorV,
        className,
      )}
      {...props}
    />
  ),
);

Separator.displayName = SeparatorPrimitive.Root.displayName;

export default Separator;
