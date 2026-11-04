import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const TYPE_SCALE = [
  "title-1",
  "title-2",
  "title-3",
  "heading-1",
  "heading-2",
  "heading-3",
  "heading-4",
  "heading-5",
  "heading-6",
  "body-1",
  "body-2",
  "body-3",
  "body-4",
  "caption-1",
];

const twMerge = extendTailwindMerge<"typography">({
  extend: {
    // `text-body-3` is a font size: without this, tailwind-merge reads it as a
    // text color and drops it next to `text-destructive`.
    theme: { text: TYPE_SCALE },
    classGroups: { typography: TYPE_SCALE },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
