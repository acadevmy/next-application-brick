import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

import {
  ButtonProps,
  buttonVariants,
} from "@/components/UI/Atoms/Button/ButtonProps";
import { cn } from "@/utils/style";

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export default Button;
