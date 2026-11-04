"use client";

import * as React from "react";

import { NavItem } from "@/components/UI/Atoms/NavItem";
import { Typography } from "@/components/UI/Atoms/Typography";

/** Single link in a footer column. */
export interface FooterLink {
  label: string;
  href: string;
}

/** A column of links, with an optional heading. */
export interface FooterLinkColumn {
  title?: string;
  links: FooterLink[];
}

/** Component for internal navigation (e.g. Next.js Link). Omitted = `<a>` (Storybook, static). */
export type FooterLinkComponent = React.ComponentType<{
  href: string;
  children: React.ReactNode;
  className?: string;
}>;

export interface FooterProps extends React.ComponentProps<"footer"> {
  /** Brand logo or site name, in the first column. */
  logo: React.ReactNode;
  /** Short line under the logo (a tagline, an address). */
  description?: React.ReactNode;
  /** Columns of links. */
  linkColumns?: FooterLinkColumn[];
  /** Bottom row, start (e.g. copyright). */
  bottomLeft?: React.ReactNode;
  /** Bottom row, end (e.g. legal links, social icons). */
  bottomRight?: React.ReactNode;
  /** Link component for internal hrefs. */
  linkComponent?: FooterLinkComponent;
  /** Accessible name of the navigation landmark. @default "Footer navigation" */
  navLabel?: string;
}

const isExternalHref = (href: string) => /^https?:\/\//.test(href);

/**
 * Site footer: logo and description, columns of links, and a bottom row for
 * copyright and legal links. Sits on the muted surface, separated by a rule.
 */
const Footer = ({
  logo,
  description,
  linkColumns = [],
  bottomLeft,
  bottomRight,
  linkComponent: LinkComponent,
  navLabel = "Footer navigation",
  ...props
}: FooterProps) => {
  const hasLinks = linkColumns.some((column) => column.links.length > 0);

  return (
    <footer
      data-slot="footer"
      className="border-t border-border bg-muted text-foreground"
      {...props}
    >
      <div className="mx-auto w-full max-w-container px-container-inline py-section">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div className="flex min-w-0 flex-col gap-3">
            <div>{logo}</div>
            {description ? (
              <Typography variant="body-3" tone="muted" asChild>
                <div>{description}</div>
              </Typography>
            ) : null}
          </div>

          {hasLinks ? (
            <nav
              aria-label={navLabel}
              className="grid grid-cols-2 gap-8 sm:grid-cols-3"
            >
              {linkColumns.map((column, i) => (
                <div
                  key={column.title ?? i}
                  className="flex min-w-0 flex-col gap-3"
                >
                  {column.title ? (
                    <Typography variant="body-3" weight="semibold" as="p">
                      {column.title}
                    </Typography>
                  ) : null}
                  <ul className="m-0 flex list-none flex-col gap-2 p-0">
                    {column.links.map((link) => (
                      <li key={`${link.href}-${link.label}`}>
                        {!LinkComponent || isExternalHref(link.href) ? (
                          <NavItem variant="footer" href={link.href}>
                            {link.label}
                          </NavItem>
                        ) : (
                          <NavItem variant="footer" asChild>
                            <LinkComponent href={link.href}>
                              {link.label}
                            </LinkComponent>
                          </NavItem>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          ) : null}
        </div>

        {bottomLeft != null || bottomRight != null ? (
          <Typography variant="body-4" tone="muted" asChild>
            <div className="mt-10 flex flex-col gap-4 border-t border-border pt-6 md:flex-row md:items-center md:justify-between">
              {bottomLeft != null ? <div>{bottomLeft}</div> : null}
              {bottomRight != null ? <div>{bottomRight}</div> : null}
            </div>
          </Typography>
        ) : null}
      </div>
    </footer>
  );
};

export { Footer };
