"use client";

import * as React from "react";

import { cn } from "@/components/UI/Foundations/style";

const COLUMN_CLASSES = {
  1: "",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
} as const;

export interface FormRowProps extends React.ComponentProps<"div"> {
  /** Fields side by side from md up; always stacked below. @default 2 */
  columns?: keyof typeof COLUMN_CLASSES;
}

/**
 * A row of form fields. Tighter horizontal gap than vertical, so fields on the
 * same row read as a group while rows stay separated.
 */
const FormRow = ({
  columns = 2,
  className,
  children,
  ...props
}: FormRowProps) => (
  <div
    data-slot="form-row"
    className={cn(
      "grid grid-cols-1 gap-x-2 gap-y-4",
      COLUMN_CLASSES[columns],
      className,
    )}
    {...props}
  >
    {children}
  </div>
);

export { FormRow };
