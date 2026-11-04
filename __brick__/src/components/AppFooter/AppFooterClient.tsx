"use client";

import type { FooterProps } from "@/components/UI/Molecules/Footer";
import { Footer } from "@/components/UI/Molecules/Footer";
import { Link } from "@/i18n/navigation";

export type AppFooterClientProps = Omit<FooterProps, "linkComponent">;

/** Client boundary: injects Link for the footer navigation. */
export const AppFooterClient = (props: AppFooterClientProps) => {
  return <Footer {...props} linkComponent={Link} />;
};
