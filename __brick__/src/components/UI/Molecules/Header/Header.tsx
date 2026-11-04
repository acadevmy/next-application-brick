"use client";

import * as React from "react";

import { Button } from "@/components/UI/Atoms/Button";
import { Icon, Icons } from "@/components/UI/Atoms/Icon";
import { NavItem } from "@/components/UI/Atoms/NavItem";

/** One entry of the main navigation. */
export interface HeaderLink {
  label: string;
  href: string;
}

/** Component for internal navigation (e.g. Next.js Link). Omitted = `<a>` (Storybook, static). */
export type HeaderLinkComponent = React.ComponentType<{
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}>;

export interface HeaderProps extends React.ComponentProps<"header"> {
  /** Brand logo or site name, at the start of the row. */
  logo: React.ReactNode;
  /** Main navigation. Inline from `md` up, in a disclosure panel below. */
  links?: HeaderLink[];
  /**
   * Current pathname, for the active link. Injected by the app (e.g.
   * `usePathname()`): the design system has no routing dependency.
   */
  pathname?: string | null;
  /**
   * Chrome that belongs to the site rather than to the content: the theme
   * toggle, a language switch. Sits at the end of the row at every width.
   */
  actions?: React.ReactNode;
  /** Link component for internal hrefs. */
  linkComponent?: HeaderLinkComponent;
  /** Accessible name of the navigation landmark. @default "Main navigation" */
  navLabel?: string;
  /** Accessible name of the menu button. @default "Menu" */
  menuLabel?: string;
}

const isExternalHref = (href: string) => /^https?:\/\//.test(href);

/** Current page or one of its children: `/blog` stays active on `/blog/post`. */
const isActiveHref = (href: string, pathname?: string | null) =>
  pathname != null &&
  (pathname === href || (href !== "/" && pathname.startsWith(`${href}/`)));

/**
 * Site header: logo, main navigation and site actions, sticky at the top.
 *
 * Below `md` the navigation folds into a panel under the bar, opened by a
 * disclosure button. The panel remembers the pathname it was opened on, so it
 * closes by itself when a link navigates — no effect, no router dependency.
 */
const Header = ({
  logo,
  links = [],
  pathname,
  actions,
  linkComponent: LinkComponent,
  navLabel = "Main navigation",
  menuLabel = "Menu",
  ...props
}: HeaderProps) => {
  const panelId = React.useId();
  const menuButtonRef = React.useRef<HTMLButtonElement>(null);
  const currentPath = pathname ?? "";
  const [openOn, setOpenOn] = React.useState<string | null>(null);
  const open = openOn === currentPath;

  const close = () => setOpenOn(null);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (open && event.key === "Escape") {
      close();
      menuButtonRef.current?.focus();
    }
  };

  const renderLink = (link: HeaderLink, onClick?: () => void) => {
    const active = isActiveHref(link.href, pathname);
    if (!LinkComponent || isExternalHref(link.href)) {
      return (
        <NavItem
          variant="header"
          active={active}
          href={link.href}
          onClick={onClick}
        >
          {link.label}
        </NavItem>
      );
    }
    return (
      <NavItem variant="header" active={active} asChild>
        <LinkComponent href={link.href} onClick={onClick}>
          {link.label}
        </LinkComponent>
      </NavItem>
    );
  };

  return (
    <header
      data-slot="header"
      className="sticky top-0 z-(--z-header) w-full border-b border-border bg-background/90 text-foreground backdrop-blur supports-backdrop-filter:bg-background/75"
      onKeyDown={onKeyDown}
      {...props}
    >
      <div className="mx-auto flex h-16 w-full max-w-container items-center justify-between gap-4 px-container-inline">
        <div className="min-w-0 shrink-0">{logo}</div>

        <div className="flex items-center gap-2 md:gap-6">
          {links.length > 0 ? (
            <nav aria-label={navLabel} className="hidden md:block">
              <ul className="m-0 flex list-none items-center gap-6 p-0">
                {links.map((link) => (
                  <li key={link.href}>{renderLink(link)}</li>
                ))}
              </ul>
            </nav>
          ) : null}

          {actions ? (
            <div className="flex shrink-0 items-center gap-1">{actions}</div>
          ) : null}

          {links.length > 0 ? (
            <Button
              ref={menuButtonRef}
              type="button"
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label={menuLabel}
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => (open ? close() : setOpenOn(currentPath))}
            >
              <Icon
                icon={open ? Icons.Close : Icons.Menu}
                size="s"
                aria-hidden
              />
            </Button>
          ) : null}
        </div>
      </div>

      {links.length > 0 ? (
        <nav
          id={panelId}
          aria-label={navLabel}
          hidden={!open}
          className="border-t border-border md:hidden"
        >
          <ul className="m-0 flex list-none flex-col gap-1 px-container-inline py-4">
            {links.map((link) => (
              <li key={link.href} className="py-2">
                {renderLink(link, close)}
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
};

export { Header };
