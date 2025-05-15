import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";

import styles from "@/components/UI/Atoms/Alert/Alert.module.scss";

export type AlertProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof alertVariants>;

export type AlertTitleProps = React.HTMLAttributes<HTMLHeadingElement>;
export type AlertDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

export const alertVariants = cva(styles.alert, {
  variants: {
    variant: {
      default: styles.default,
      destructive: styles.destructive,
    },
    size: {
      lg: styles.lg,
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
