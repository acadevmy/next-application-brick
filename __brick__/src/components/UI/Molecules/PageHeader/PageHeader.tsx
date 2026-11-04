import * as React from "react";

import { Separator } from "@/components/UI/Atoms/Separator";
import { Typography } from "@/components/UI/Atoms/Typography";
import { cn } from "@/components/UI/Foundations/style";

function getSlotByType(
  children: React.ReactNode,
  slotType: React.ElementType,
): React.ReactElement | null {
  let found: React.ReactElement | null = null;
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.type === slotType) {
      found = child as React.ReactElement;
    }
  });
  return found;
}

const ROW_FROM_CLASSES = {
  mobile: "flex-row flex-wrap items-start justify-between",
  md: "md:flex-row md:items-center md:justify-between",
  lg: "lg:flex-row lg:items-start lg:justify-between",
} as const;

/**
 * The top of a page: its title and, beside it, the page's own actions.
 * Slot composition: `PageHeader.Title`, `PageHeader.Toolbar`,
 * `PageHeader.Action`.
 */
export interface PageHeaderProps extends Omit<
  React.ComponentProps<"header">,
  "title"
> {
  /** Slot composition: PageHeader.Title, .Toolbar. */
  children?: React.ReactNode;
  /** Breakpoint at which title and toolbar switch to row layout. @default "lg" */
  rowFrom?: keyof typeof ROW_FROM_CLASSES;
  /** Show a rule under the title row. @default false */
  separator?: boolean;
}

const PageHeaderRoot = ({
  className,
  children,
  rowFrom = "lg",
  separator = false,
  ...props
}: PageHeaderProps) => {
  const titleContent = getSlotByType(children, PageHeaderTitle);
  const toolbarContent = getSlotByType(children, PageHeaderToolbar);

  return (
    <header
      data-slot="page-header"
      className={cn("flex flex-col gap-4", className)}
      {...props}
    >
      {titleContent && toolbarContent ? (
        <div className={cn("flex flex-col gap-4", ROW_FROM_CLASSES[rowFrom])}>
          {titleContent}
          {toolbarContent}
        </div>
      ) : (
        titleContent
      )}
      {separator ? <Separator /> : null}
    </header>
  );
};

/** Page title. Control heading level via `as` (default h1). */
export interface PageHeaderTitleProps extends React.ComponentProps<"div"> {
  /** Override the rendered heading tag for SEO/semantics (e.g. as="h2" for section title). Default: h1. */
  as?: React.ElementType;
  /** Optional subtitle rendered below the title. */
  subtitle?: React.ReactNode;
}

const PageHeaderTitle = ({
  className,
  as = "h1",
  children,
  subtitle,
  ...props
}: PageHeaderTitleProps) => {
  const title = (
    <Typography
      variant="heading-2"
      weight="semibold"
      tone="default"
      as={as}
      className={cn("shrink-0", !subtitle && "flex-1", className)}
      data-slot="page-header-title"
      {...props}
    >
      {children}
    </Typography>
  );

  if (subtitle == null) {
    return title;
  }

  return (
    <div
      className="flex flex-1 flex-col gap-2"
      data-slot="page-header-title-group"
    >
      {title}
      <Typography variant="body-1" tone="muted" as="p">
        {subtitle}
      </Typography>
    </div>
  );
};

/** Toolbar slot: the page's actions (buttons, a search field). */
const PageHeaderToolbar = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => (
  <div
    className={cn("flex shrink-0 flex-wrap items-center gap-2", className)}
    data-slot="page-header-toolbar"
    {...props}
  >
    {children}
  </div>
);

export interface PageHeaderActionProps extends React.ComponentProps<"div"> {
  /** The narrow-screen twin of the same action, usually without its label. */
  compact?: React.ReactNode;
}

/**
 * One toolbar action, in its two shapes.
 *
 * The toolbar has no room for labels on a narrow screen, so an action given a
 * `compact` twin swaps to it below `lg`. An action without one keeps its full
 * shape at every width: swapping it for nothing would leave a blank tap target
 * where the action used to be.
 */
const PageHeaderAction = ({
  compact,
  className,
  children,
  ...props
}: PageHeaderActionProps) => (
  <div
    data-slot="page-header-action"
    className={cn("contents", className)}
    {...props}
  >
    {compact ? (
      <>
        <span className="hidden lg:contents">{children}</span>
        <span className="contents lg:hidden">{compact}</span>
      </>
    ) : (
      children
    )}
  </div>
);

const PageHeader = Object.assign(PageHeaderRoot, {
  Title: PageHeaderTitle,
  Toolbar: PageHeaderToolbar,
  Action: PageHeaderAction,
});

export { PageHeader };
