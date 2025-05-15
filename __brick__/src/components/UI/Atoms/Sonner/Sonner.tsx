"use client";

import { Toaster as Sonner } from "sonner";

import { ToasterProps } from "./SonnerProps";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      offset={{
        right: 80,
      }}
      theme="light"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "list-none group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border-medium group-[.toaster]:shadow-lg rounded-lg",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export default Toaster;
