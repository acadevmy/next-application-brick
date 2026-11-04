"use client";

import * as React from "react";

import { Alert, AlertDescription } from "@/components/UI/Atoms/Alert";

export interface FormStatusProps {
  /** Submission error, e.g. `form.formState.errors.root?.message`. */
  error?: React.ReactNode;
  /** Confirmation shown after a successful submit. */
  success?: React.ReactNode;
}

/**
 * The error/confirmation pair every form ends with. Announced politely so a
 * screen reader picks up the outcome without stealing focus.
 */
const FormStatus = ({ error, success }: FormStatusProps) => {
  if (!error && !success) return null;
  return (
    <div role="status" aria-live="polite" data-slot="form-status">
      {error ? (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}
      {success ? (
        <Alert variant="success">
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      ) : null}
    </div>
  );
};

export { FormStatus };
