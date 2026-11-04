"use client";{{=<% %>=}}

import {
  ColorItem,
  ColorPalette,
  Unstyled,
} from "@storybook/addon-docs/blocks";
import { useMemo } from "react";

import { Typography } from "@/components/UI/Atoms/Typography";

/** Colour roles defined in :root by theme.css, grouped by what they are for. */
const COLOR_GROUPS: Record<string, string[]> = {
  surfaces: [
    "background",
    "foreground",
    "card",
    "card-foreground",
    "popover",
    "popover-foreground",
    "muted",
    "muted-foreground",
    "inverted",
    "inverted-foreground",
  ],
  actions: [
    "primary",
    "primary-foreground",
    "secondary",
    "secondary-foreground",
    "accent",
    "accent-foreground",
    "destructive",
    "destructive-foreground",
  ],
  status: [
    "success",
    "success-foreground",
    "warning",
    "warning-foreground",
    "info",
    "info-foreground",
  ],
  controls: ["border", "input", "ring"],
  chart: ["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"],
  sidebar: [
    "sidebar",
    "sidebar-foreground",
    "sidebar-primary",
    "sidebar-primary-foreground",
    "sidebar-accent",
    "sidebar-accent-foreground",
    "sidebar-border",
    "sidebar-ring",
  ],
};

function readColorVar(name: string): string {
  if (typeof document === "undefined") return "";
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(`--${name}`)
    .trim();
  return value || "";
}

function readColorsSnapshot(): Record<string, Record<string, string>> | null {
  if (typeof document === "undefined") return null;
  const next: Record<string, Record<string, string>> = {};
  for (const [group, vars] of Object.entries(COLOR_GROUPS)) {
    next[group] = {};
    for (const v of vars) {
      const value = readColorVar(v);
      if (value) next[group][v] = value;
    }
  }
  return Object.keys(next).length > 0 ? next : null;
}

export const ThemeColorsDoc = () => {
  const colors = useMemo(() => readColorsSnapshot(), []);

  if (!colors) {
    return (
      <Unstyled>
        <Typography variant="body-3" tone="muted">
          Caricamento colori da CSS…
        </Typography>
      </Unstyled>
    );
  }

  return (
    <Unstyled>
      <ColorPalette>
        <div className="flex flex-col gap-8 mb-20">
          {Object.entries(colors).map(([groupName, groupColors]) => (
            <div key={groupName}>
              <Typography variant="body-1" weight="bold" className="mb-2">
                {groupName}
              </Typography>
              <div className="border border-border rounded-2xl p-8">
                {Object.entries(groupColors).map(([varName, value]) => (
                  <ColorItem
                    key={varName}
                    title={varName}
                    colors={{ [varName]: value }}
                    subtitle={varName}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </ColorPalette>
    </Unstyled>
  );
};
