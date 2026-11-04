"use client";

import * as React from "react";

import { Icon, Icons } from "@/components/UI/Atoms/Icon";
import { Input } from "@/components/UI/Atoms/Input";
import { cn } from "@/components/UI/Foundations/style";

/** Search field with a leading icon. */
export interface SearchInputProps extends Omit<
  React.ComponentProps<"input">,
  "type"
> {
  /** Accessible label for the input. */
  "aria-label": string;
  /** Optional wrapper className. */
  className?: string;
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, "aria-label": ariaLabel, ...props }, ref) => {
    return (
      <div
        data-slot="search-input"
        className={cn(
          "relative flex items-center w-full rounded-lg border border-input bg-transparent dark:bg-input/30 text-foreground shadow-xs",
          "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-(length:--ring-width)",
          "transition-[color,box-shadow]",
          className,
        )}
      >
        <span
          className="pointer-events-none absolute left-6 flex items-center text-muted-foreground"
          aria-hidden
        >
          <Icon icon={Icons.Search} size="m" />
        </span>
        <Input
          radius="pill"
          ref={ref}
          type="search"
          aria-label={ariaLabel}
          surface="plain"
          focus="none"
          // The leading icon belongs to this component, so it owns the room it needs.
          // eslint-disable-next-line design-system/no-visual-overrides
          className="w-full pl-14 pr-6"
          {...props}
        />
      </div>
    );
  },
);

SearchInput.displayName = "SearchInput";

export { SearchInput };
