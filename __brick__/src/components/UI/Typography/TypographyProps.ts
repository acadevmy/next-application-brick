import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";

import styles from "@/components/UI/Typography/Typography.module.scss";

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  asChild?: boolean;
  as?: string;
}

export const typographyVariants = cva(styles.typography, {
  variants: {
    variant: {
      h1: styles.h1,
      h2: styles.h2,
      h3: styles.h3,
      h4: styles.h4,
      h5: styles.h5,
      largeText: styles.largeText,
      p: styles.p,
      span: styles.span,
      blockquote: styles.blockquote,
      tableTitle: styles.tableTitle,
      table: styles.table,
      list: styles.list,
      smallText: styles.smallText,
      xsmallText: styles.xsmallText,
    },
    weight: {
      normal: styles.normal,
      medium: styles.medium,
      bold: styles.bold,
    },
  },
  defaultVariants: {
    variant: "p",
  },
});

type VariantPropType = VariantProps<typeof typographyVariants>;
export const variantElementMap: Record<
  NonNullable<VariantPropType["variant"]>,
  string
> = {
  h1: "div",
  h2: "div",
  h3: "div",
  h4: "div",
  h5: "div",
  largeText: "p",
  p: "p",
  span: "span",
  blockquote: "blockquote",
  tableTitle: "p",
  table: "p",
  list: "p",
  smallText: "small",
  xsmallText: "small",
};

export type TypographyHeading = "h1" | "h2" | "h3" | "h4" | "h5";
