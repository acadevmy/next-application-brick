import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/components/UI/Foundations/style";

const inputVariants = cva(
  "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground w-full min-w-0 border text-base md:text-sm transition-[color,box-shadow] outline-none file:inline-flex file:border-0 file:bg-transparent file:py-2 file:px-3 file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      surface: {
        default: "border-input bg-transparent dark:bg-input/30",
        card: "border-border bg-card",
        plain: "border-0 bg-transparent",
      },
      radius: {
        default: "rounded-input",
        pill: "rounded-full",
      },
      padding: {
        default: "h-10 px-3 py-2",
        compact: "h-8 px-2.5 py-1",
      },
      focus: {
        default:
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-(length:--ring-width) focus-visible:ring-inset",
        none: "focus-visible:border-transparent focus-visible:ring-0 focus-visible:ring-offset-0",
      },
    },
    defaultVariants: {
      surface: "default",
      radius: "default",
      padding: "default",
      focus: "default",
    },
  },
);

/** Input: based on shadcn. Defaults to `rounded-input`; opt into `radius="pill"` for searchbars and labelless inputs. */
const Input = ({
  className,
  type,
  surface,
  radius,
  padding,
  focus,
  ...props
}: React.ComponentProps<"input"> & VariantProps<typeof inputVariants>) => {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        inputVariants({ surface, radius, padding, focus }),
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className,
      )}
      {...props}
    />
  );
};

export { Input, inputVariants };
