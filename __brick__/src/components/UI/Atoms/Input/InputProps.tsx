import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";

import styles from "@/components/UI/Atoms/Input/Input.module.scss";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  label?: string;
  withSelect?: boolean;
  Icon?: React.ReactNode;
}

export const inputVariants = cva(styles.input);
