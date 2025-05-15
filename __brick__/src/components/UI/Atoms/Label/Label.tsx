"use client";

import * as LabelPrimitive from "@radix-ui/react-label";
import * as React from "react";

import { LabelProps, labelVariants } from "@/components/UI/Atoms/Label";
import { cn } from "@/utils/style";

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export default Label;
