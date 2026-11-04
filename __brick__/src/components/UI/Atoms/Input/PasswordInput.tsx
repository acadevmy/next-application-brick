"use client";

import { type VariantProps } from "class-variance-authority";
import * as React from "react";

import { Button } from "@/components/UI/Atoms/Button";
import { Icon } from "@/components/UI/Atoms/Icon";
import { Icons } from "@/components/UI/Atoms/Icon/icons";
import { cn } from "@/components/UI/Foundations/style";

import { Input, inputVariants } from "./Input";

interface PasswordInputProps
  extends
    Omit<React.ComponentProps<"input">, "type">,
    VariantProps<typeof inputVariants> {
  /** Accessible label for the show-password toggle, in the page's language. */
  showLabel: string;
  /** Accessible label for the hide-password toggle, in the page's language. */
  hideLabel: string;
}

const PasswordInput = ({
  className,
  showLabel,
  hideLabel,
  ...props
}: PasswordInputProps) => {
  const [visible, setVisible] = React.useState(false);

  return (
    <div className="relative">
      <Input
        type={visible ? "text" : "password"}
        className={cn("pr-12", className)}
        {...props}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute top-1/2 right-2 -translate-y-1/2"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? hideLabel : showLabel}
        aria-pressed={visible}
      >
        <Icon icon={visible ? Icons.ViewOff : Icons.View} size="m" />
      </Button>
    </div>
  );
};

export { PasswordInput };
