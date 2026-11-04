import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { Typography } from "@/components/UI/Atoms/Typography";
import { cn } from "@/components/UI/Foundations/style";

const alertVariants = cva(
  "relative grid w-full grid-cols-[0_1fr] items-start gap-y-2 rounded-lg border px-4 py-3 text-sm has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] has-[>svg]:gap-x-4 [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        destructive:
          "border-destructive/30 bg-destructive/10 text-destructive *:data-[slot=alert-description]:text-destructive/90",
        success:
          "border-transparent bg-success text-success-foreground *:data-[slot=alert-description]:text-success-foreground/90",
        warning:
          "border-transparent bg-warning text-warning-foreground *:data-[slot=alert-description]:text-warning-foreground/90",
        info: "border-transparent bg-info text-info-foreground *:data-[slot=alert-description]:text-info-foreground/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const Alert = ({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) => (
  <div
    data-slot="alert"
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
);

const AlertTitle = ({ className, ...props }: React.ComponentProps<"div">) => (
  <Typography
    as="div"
    variant="heading-6"
    weight="semibold"
    data-slot="alert-title"
    className={cn("col-start-2 tracking-tight", className)}
    {...props}
  />
);

const AlertDescription = ({
  className,
  ...props
}: React.ComponentProps<"div">) => (
  <Typography
    as="div"
    variant="heading-6"
    weight="semibold"
    data-slot="alert-description"
    className={cn(
      "col-start-2 grid justify-items-start gap-1 [&_p]:leading-relaxed",
      className,
    )}
    {...props}
  />
);

export { Alert, AlertDescription, AlertTitle, alertVariants };
