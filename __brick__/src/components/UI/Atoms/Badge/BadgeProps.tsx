import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";

import styles from "@/components/UI/Atoms/Badge/Badge.module.scss";

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export const badgeVariants = cva(styles.badge, {
  variants: {
    variant: {
      primary: styles.primary,
      secondary: styles.secondary,
      important: styles.important,
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});
