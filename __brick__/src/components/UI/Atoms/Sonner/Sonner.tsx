"use client";

import { useSyncExternalStore } from "react";
import { Toaster as SonnerToaster, type ToasterProps } from "sonner";

import {
  getTheme,
  type Theme,
  THEME_ATTRIBUTE,
} from "@/components/UI/Foundations/theme";

/** Re-renders when anything (ThemeScript, ThemeToggle, the OS) flips the theme. */
const subscribe = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: [THEME_ATTRIBUTE],
  });
  return () => observer.disconnect();
};

const getServerTheme = (): Theme => "light";

/**
 * Sonner's Toaster on the design system's theme. Sonner defaults to `light`
 * and knows nothing of `data-theme`, so toasts stayed light on a dark page.
 */
const Toaster = (props: Omit<ToasterProps, "theme">) => {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme);
  return <SonnerToaster theme={theme} {...props} />;
};

export default Toaster;
