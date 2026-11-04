import * as React from "react";

import { cn } from "@/components/UI/Foundations/style";

/** Textarea: rounded-lg, theme tokens, spacing scale. */
const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => (
  <textarea
    data-slot="textarea"
    className={cn(
      "flex min-h-20 w-full rounded-textarea border border-input bg-transparent dark:bg-input/30 px-3 py-2 text-base shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-(length:--ring-width) focus-visible:ring-ring/50 focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
      "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
      className,
    )}
    ref={ref}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export { Textarea };
