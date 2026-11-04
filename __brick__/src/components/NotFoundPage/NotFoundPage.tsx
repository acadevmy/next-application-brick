"use client";

import { useTranslations } from "next-intl";

import { ErrorPageLayout } from "@/components/ErrorPage/ErrorPageLayout";
import Button from "@/components/UI/Atoms/Button";
import { Link } from "@/i18n/navigation";
import { HOMEPAGE_PATH } from "@/lib/site/routes";

const NotFoundPage = () => {
  const t = useTranslations();

  return (
    <ErrorPageLayout
      pretitle={t("errorNotFound")}
      title={t("errorNotFoundTitle")}
      actions={
        <Button asChild>
          <Link href={HOMEPAGE_PATH}>{t("goToHome")}</Link>
        </Button>
      }
    />
  );
};

export default NotFoundPage;
