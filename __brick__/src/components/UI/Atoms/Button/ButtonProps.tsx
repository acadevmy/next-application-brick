import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";

import styles from "@/components/UI/Atoms/Button/Button.module.scss";

interface ButtonPropsDef
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export type ButtonProps = Omit<ButtonPropsDef, "className">;

export const buttonVariants = cva(styles.button, {
  variants: {
    variant: {
      default: styles.default,
      destructive: styles.destructive,
      outline: styles.outline,
      secondary: styles.secondary,
      ghost: styles.ghost,
      link: styles.link,
    },
    size: {
      sm: styles.sm,
      md: styles.md,
      lg: styles.lg,
      icon: styles.icon,
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});
