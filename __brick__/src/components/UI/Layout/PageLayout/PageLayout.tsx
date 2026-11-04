import * as React from "react";

import { cn } from "@/components/UI/Foundations/style";

export interface PageLayoutProps extends React.ComponentProps<"div"> {
  /** Header slot (e.g. the site Header). */
  header: React.ReactNode;
  /** Main content. */
  children: React.ReactNode;
  /** Optional footer slot (e.g. site footer). */
  footer?: React.ReactNode;
}

/**
 * Page shell: header + main + footer, with the footer pushed to the bottom of
 * short pages. Use from the app layout.
 */
const PageLayout = ({
  header,
  children,
  footer,
  className,
  ...props
}: PageLayoutProps) => (
  <div
    data-slot="page-layout"
    className={cn("flex min-h-dvh flex-col", className)}
    {...props}
  >
    {header}
    <main className="flex flex-1 flex-col" data-slot="page-layout-main">
      {children}
    </main>
    {footer != null ? footer : null}
  </div>
);

export { PageLayout };
