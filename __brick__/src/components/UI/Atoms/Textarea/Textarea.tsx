import * as React from "react";

import Label from "@/components/UI/Atoms/Label";
import {
  TextareaProps,
  textareaVariants,
} from "@/components/UI/Atoms/Textarea";
import { cn } from "@/utils/style";

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <>
        {label && (
          <Label className="mb-2" htmlFor={props.id}>
            {label}
          </Label>
        )}
        <textarea
          className={cn(textareaVariants(), className)}
          ref={ref}
          {...props}
        />
      </>
    );
  },
);
Textarea.displayName = "Textarea";

export default Textarea;
