"use client";{{=<% %>=}}

import { Unstyled } from "@storybook/addon-docs/blocks";
import { useMemo } from "react";

import { Typography } from "@/components/UI/Atoms/Typography";

/** Radius tokens from theme.css: the base, the scale derived from it, the component radii. */
const RADIUS_VARS = [
  "radius",
  "radius-sm",
  "radius-md",
  "radius-lg",
  "radius-xl",
  "radius-2xl",
  "radius-3xl",
  "radius-4xl",
  "radius-card",
  "radius-input",
  "radius-dialog",
] as const;

function readRadiusVar(name: string): string {
  if (typeof document === "undefined") return "";
  return getComputedStyle(document.documentElement)
    .getPropertyValue(`--${name}`)
    .trim();
}

function readRadiusSnapshot(): Record<string, string> | null {
  if (typeof document === "undefined") return null;
  const next: Record<string, string> = {};
  for (const name of RADIUS_VARS) {
    const value = readRadiusVar(name);
    if (value) next[name] = value;
  }
  return Object.keys(next).length > 0 ? next : null;
}

export const ThemeRadiusDoc = () => {
  const values = useMemo(() => readRadiusSnapshot(), []);

  if (!values || Object.keys(values).length === 0) {
    return (
      <Unstyled>
        <Typography variant="body-3" tone="muted">
          Caricamento radius da CSS…
        </Typography>
      </Unstyled>
    );
  }

  return (
    <Unstyled>
      <div className="flex flex-col gap-8 mb-20">
        {Object.entries(values).map(([key, value]) => (
          <div key={key} className="flex gap-8 items-center">
            <div
              style={{ borderRadius: value }}
              className="bg-foreground w-20 h-20 flex justify-center items-center rounded-md p-4 shrink-0"
            />
            <div>
              <Typography variant="body-3" weight="bold">
                {key}
              </Typography>
              <Typography variant="caption-1" tone="muted" className="mb-4">
                {value}
              </Typography>
            </div>
          </div>
        ))}
      </div>
    </Unstyled>
  );
};
