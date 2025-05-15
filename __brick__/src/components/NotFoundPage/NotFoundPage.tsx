"use client";

import { useTranslations } from "next-intl";

import Button from "@/components/UI/Atoms/Button";
import ErrorSection from "@/components/UI/Molecules/ErrorSection";
import { Link } from "@/i18n/routing";
import { HOMEPAGE_PATH } from "@/utils/utilityConstants";

const NotFoundPage = () => {
  const t = useTranslations();

  return (
    <ErrorSection
      pretitle={t("errorNotFound")}
      title={t("errorNotFoundTitle")}
      Buttons={
        <>
          <Button asChild>
            <Link href={HOMEPAGE_PATH}>{t("goToHome")}</Link>
          </Button>
        </>
      }
    />
  );
};

export default NotFoundPage;
