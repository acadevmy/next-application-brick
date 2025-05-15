"use client";

import ErrorPage from "@/components/ErrorPage";

const Error = ({ error }: { error: Error & { digest?: string } }) => {
  return <ErrorPage error={error} />;
};

export default Error;
