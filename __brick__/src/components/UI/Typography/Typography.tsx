import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

import {
  TypographyProps,
  typographyVariants,
  variantElementMap,
} from "@/components/UI/Typography";
import { cn } from "@/utils/style";

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant, weight, as, asChild, ...props }, ref) => {
    const Comp = asChild
      ? Slot
      : as ?? (variant ? variantElementMap[variant] : undefined) ?? "div";
    return (
      <Comp
        className={cn(typographyVariants({ variant, weight, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Typography.displayName = "Typography";

export default Typography;
