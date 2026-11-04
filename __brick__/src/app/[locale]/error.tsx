"use client";

import ErrorPage from "@/components/ErrorPage";
import type { ErrorPageProps } from "@/components/ErrorPage/ErrorPageProps";

const Error = ({ error, retry }: ErrorPageProps) => (
  <ErrorPage error={error} retry={retry} />
);

export default Error;
