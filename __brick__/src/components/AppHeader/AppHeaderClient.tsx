"use client";

import type { HeaderProps } from "@/components/UI/Molecules/Header";
import { Header } from "@/components/UI/Molecules/Header";
import { Link, usePathname } from "@/i18n/navigation";

export type AppHeaderClientProps = Omit<
  HeaderProps,
  "pathname" | "linkComponent"
>;

/**
 * Client boundary: injects pathname and Link, so component references never
 * cross the server/client boundary.
 */
export const AppHeaderClient = (props: AppHeaderClientProps) => {
  const pathname = usePathname();
  return <Header {...props} pathname={pathname} linkComponent={Link} />;
};
