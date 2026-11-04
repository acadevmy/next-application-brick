import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { SITE_NAME } from "@/lib/site/config";
import { HOMEPAGE_PATH, SITE_ROUTES } from "@/lib/site/routes";

import { AppFooterClient } from "./AppFooterClient";
import { CurrentYear } from "./CurrentYear";

/** The site footer: text logo, one column of links from `SITE_ROUTES`, copyright. */
export const AppFooter = async () => {
  const t = await getTranslations();

  return (
    <AppFooterClient
      logo={
        <Link
          href={HOMEPAGE_PATH}
          className="font-heading text-base font-semibold text-foreground no-underline hover:opacity-80"
          aria-label={SITE_NAME}
        >
          {SITE_NAME}
        </Link>
      }
      navLabel={t("navFooterLabel")}
      linkColumns={[
        {
          links: SITE_ROUTES.map(({ path, labelKey }) => ({
            href: path,
            label: t(labelKey),
          })),
        },
      ]}
      bottomLeft={
        <>
          © <CurrentYear /> {SITE_NAME}
        </>
      }
    />
  );
};
