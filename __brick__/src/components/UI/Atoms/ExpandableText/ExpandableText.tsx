"use client";

import * as React from "react";

import { cn } from "@/components/UI/Foundations/style";

import { Button } from "../Button";

export interface ExpandableTextProps extends React.ComponentProps<"div"> {
  /** Number of lines to clamp when collapsed. Default 3. */
  lines?: number;
  /** Label for the "show more" button. */
  showMoreLabel: string;
  /** Label for the "show less" button. */
  showLessLabel: string;
}

/**
 * Clamps long copy to a number of lines and offers a show more / show less
 * toggle. The toggle appears only when the text actually overflows, and it
 * re-checks on resize, so short content never grows a control it does not need.
 */
const ExpandableText = ({
  lines = 3,
  showMoreLabel,
  showLessLabel,
  className,
  children,
  ...props
}: ExpandableTextProps) => {
  const [expanded, setExpanded] = React.useState(false);
  const [clamped, setClamped] = React.useState(false);
  const textRef = React.useRef<HTMLDivElement>(null);
  const textId = React.useId();

  React.useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const check = () => setClamped(el.scrollHeight > el.clientHeight);

    check();

    const observer = new ResizeObserver(check);
    observer.observe(el);
    return () => observer.disconnect();
  }, [children]);

  return (
    <div
      data-slot="expandable-text"
      className={cn("flex flex-col", className)}
      {...props}
    >
      <div
        ref={textRef}
        id={textId}
        className={expanded ? undefined : "overflow-hidden"}
        style={
          expanded
            ? undefined
            : {
                display: "-webkit-box",
                WebkitLineClamp: lines,
                WebkitBoxOrient: "vertical",
              }
        }
      >
        {children}
      </div>
      {(clamped || expanded) && (
        <Button
          variant="link"
          size="sm"
          className="self-start"
          aria-expanded={expanded}
          aria-controls={textId}
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? showLessLabel : showMoreLabel}
        </Button>
      )}
    </div>
  );
};

export { ExpandableText };
