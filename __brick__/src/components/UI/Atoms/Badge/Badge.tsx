import * as React from "react";

import { BadgeProps, badgeVariants } from "@/components/UI/Atoms/Badge";
import { cn } from "@/utils/style";

const Badge = ({ className, variant, ...props }: BadgeProps) => {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
};

export default Badge;
