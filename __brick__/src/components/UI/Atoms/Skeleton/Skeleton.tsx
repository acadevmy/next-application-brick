import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/components/UI/Foundations/style";

const skeletonVariants = cva("animate-pulse bg-muted", {
  variants: {
    radius: {
      md: "rounded-md",
      card: "rounded-card",
    },
  },
  defaultVariants: {
    radius: "md",
  },
});

/**
 * Lightweight skeleton placeholder aligned with shadcn pattern.
 */
const Skeleton = ({
  className,
  radius,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof skeletonVariants>) => {
  return (
    <div
      data-slot="skeleton"
      className={cn(skeletonVariants({ radius }), className)}
      {...props}
    />
  );
};

export { Skeleton };
