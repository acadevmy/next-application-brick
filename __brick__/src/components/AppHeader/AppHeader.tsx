import { getTranslations } from "next-intl/server";

import { ThemeToggle } from "@/components/UI/Molecules/ThemeToggle";
import { Link } from "@/i18n/navigation";
import { SITE_NAME } from "@/lib/site/config";
import { HOMEPAGE_PATH, SITE_ROUTES } from "@/lib/site/routes";

import { AppHeaderClient } from "./AppHeaderClient";

/**
 * The site header: logo, navigation from `SITE_ROUTES`, theme toggle.
 * Server component — it resolves the copy and hands plain props to the client
 * boundary, which injects pathname and Link.
 */
export const AppHeader = async () => {
  const t = await getTranslations();

  const logo = (
    <Link
      href={HOMEPAGE_PATH}
      className="font-heading text-base font-semibold text-foreground no-underline hover:opacity-80"
      aria-label={SITE_NAME}
    >
      {SITE_NAME}
    </Link>
  );

  return (
    <AppHeaderClient
      logo={logo}
      navLabel={t("navMainLabel")}
      menuLabel={t("navMenuLabel")}
      links={SITE_ROUTES.map(({ path, labelKey }) => ({
        href: path,
        label: t(labelKey),
      }))}
      actions={
        <ThemeToggle
          toDarkLabel={t("themeSwitchToDark")}
          toLightLabel={t("themeSwitchToLight")}
        />
      }
    />
  );
};
