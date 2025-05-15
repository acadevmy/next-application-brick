import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import styles from "@/components/UI/Atoms/Checkbox/Checkbox.module.scss";

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof checkboxVariants> {
  label?: string;
}

export const checkboxVariants = cva(styles.checkbox);
