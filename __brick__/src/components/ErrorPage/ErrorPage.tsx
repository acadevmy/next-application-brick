"use client";

import { useTranslations } from "next-intl";
import { useEffect } from "react";

import Button from "@/components/UI/Atoms/Button";
import ErrorSection from "@/components/UI/Molecules/ErrorSection";

import { ErrorPageProps } from "./ErrorPageProps";

const ErrorPage = ({ error }: ErrorPageProps) => {
  const t = useTranslations();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error.message);
  }, [error]);

  return (
    <ErrorSection
      pretitle={t("genericError")}
      title={t("genericErrorTitle")}
      Buttons={<Button variant="primary">{t("contactUs")}</Button>}
    />
  );
};

export default ErrorPage;
