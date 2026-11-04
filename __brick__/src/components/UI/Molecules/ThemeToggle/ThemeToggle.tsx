"use client";

import * as React from "react";

import { Button } from "@/components/UI/Atoms/Button";
import { Icon, Icons } from "@/components/UI/Atoms/Icon";
import { cn } from "@/components/UI/Foundations/style";
import {
  followSystemTheme,
  toggleTheme,
} from "@/components/UI/Foundations/theme";

export interface ThemeToggleProps extends Omit<
  React.ComponentProps<"button">,
  "children" | "onClick"
> {
  /** Accessible name while the light theme is on — it switches to dark. */
  toDarkLabel: string;
  /** Accessible name while the dark theme is on — it switches to light. */
  toLightLabel: string;
}

/**
 * Switches between the two themes.
 *
 * Which icon and which label are showing is decided by CSS, from the
 * `data-theme` attribute, not by React state: the server cannot know the
 * visitor's theme, so anything rendered from it would hydrate wrong and flash.
 * Both versions are in the markup and only one is displayed — the hidden one
 * is `display: none`, so it stays out of the accessible name too.
 *
 * Without an explicit choice the button keeps following the system: that is
 * what `followSystemTheme` subscribes to, until the first click settles it.
 */
const ThemeToggle = ({
  toDarkLabel,
  toLightLabel,
  className,
  ...props
}: ThemeToggleProps) => {
  React.useEffect(() => followSystemTheme(), []);

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      data-slot="theme-toggle"
      className={cn("shrink-0", className)}
      onClick={() => toggleTheme()}
      {...props}
    >
      <span className="inline-flex items-center dark:hidden">
        <Icon icon={Icons.Moon} size="s" aria-hidden />
        <span className="sr-only">{toDarkLabel}</span>
      </span>
      <span className="hidden items-center dark:inline-flex">
        <Icon icon={Icons.Sun} size="s" aria-hidden />
        <span className="sr-only">{toLightLabel}</span>
      </span>
    </Button>
  );
};

export { ThemeToggle };
