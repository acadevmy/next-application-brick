import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";

import styles from "@/components/UI/Atoms/Button/Button.module.scss";

interface ButtonPropsDef
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isActive?: boolean;
}

export type ButtonProps = Omit<ButtonPropsDef, "className">;

export const buttonVariants = cva(styles.button, {
  variants: {
    variant: {
      primary: styles.primary,
      outline: styles.outline,
      secondary: styles.secondary,
      ghost: styles.ghost,
      link: styles.link,
      secondaryIcon: styles.secondaryIcon,
      activeLink: styles.activeLink,
    },
    size: {
      xs: styles.xs,
      sm: styles.sm,
      regular: styles.regular,
      lg: styles.lg,
      icon: styles.icon,
    },
    colorTheme: {
      primary: styles.primaryColorTheme,
      success: styles.successColorTheme,
      background: styles.backgroundColorTheme,
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "regular",
  },
});
