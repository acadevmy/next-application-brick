"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import * as React from "react";

import {
  CheckboxProps,
  checkboxVariants,
} from "@/components/UI/Atoms/Checkbox";
import styles from "@/components/UI/Atoms/Checkbox/Checkbox.module.scss";
import Label from "@/components/UI/Atoms/Label";
import { cn } from "@/utils/style";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, label, ...props }, ref) => (
  <div className="flex items-center">
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(checkboxVariants(), className)}
      {...props}
    >
      <CheckboxPrimitive.Indicator className={cn(styles.indicator)}>
        <Check className="h-4 w-4" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
    {label && (
      <Label className={styles.label} htmlFor={props.id}>
        {label}
      </Label>
    )}
  </div>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export default Checkbox;
