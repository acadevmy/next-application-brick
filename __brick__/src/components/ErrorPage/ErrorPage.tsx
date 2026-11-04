"use client";

import * as Sentry from "@sentry/nextjs";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

import Button from "@/components/UI/Atoms/Button";

import { ErrorPageLayout } from "./ErrorPageLayout";
import { ErrorPageProps } from "./ErrorPageProps";

const ErrorPage = ({ error, retry }: ErrorPageProps) => {
  const t = useTranslations();

  useEffect(() => {
    // An error with a `digest` was thrown on the server: `onRequestError`
    // (src/instrumentation.ts) already reported it with the full stack, and
    // the client only sees a redacted copy. Report the client-side ones here.
    if (!error.digest) Sentry.captureException(error);
  }, [error]);

  return (
    <ErrorPageLayout
      pretitle={t("genericError")}
      title={t("genericErrorTitle")}
      actions={
        <Button variant="default" onClick={() => retry()}>
          {t("genericErrorButton")}
        </Button>
      }
    />
  );
};

export default ErrorPage;
