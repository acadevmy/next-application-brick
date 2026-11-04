"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import * as React from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/UI/Atoms/Button";
import { Form } from "@/components/UI/Atoms/Form";
import { FormRow } from "@/components/UI/Layout/FormRow";
import { Stack } from "@/components/UI/Layout/Stack";
import {
  FormFieldCheckbox,
  FormFieldInput,
  FormFieldTextarea,
  FormStatus,
} from "@/components/UI/Molecules/FormFields";

import {
  CONTACT_ISSUE,
  contactSchema,
  type FormContactValues,
} from "./contactSchema";
import { submitContactForm } from "./submitContactForm";

const defaultValues: FormContactValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  message: "",
  consent: false as boolean,
  website: "",
};

export interface FormContactProps {
  className?: string;
  onSuccess?: () => void;
}

/**
 * Contact request form. Every field has a visible label: a placeholder alone
 * disappears while typing and is not a reliable accessible name.
 *
 * The layout is declarative: the design system owns the field ladder, the row
 * rhythm and the status block, so this file is only the schema, the fields and
 * the submit.
 */
export const FormContact = ({ className, onSuccess }: FormContactProps) => {
  const t = useTranslations();
  const [successMessage, setSuccessMessage] = React.useState("");
  const form = useForm<FormContactValues>({
    // Other built-in rules keep zod's localized messages; the schema's two custom
    // rules get this form's own copy.
    resolver: zodResolver(contactSchema, {
      error: (issue) => {
        // An empty required field reads "required", not zod's ">=1 characters".
        if (
          issue.code === "too_small" &&
          issue.origin === "string" &&
          issue.minimum === 1
        )
          return t("formFieldRequired");
        if (issue.code !== "custom") return undefined;
        const reason = (issue.params as { reason?: string } | undefined)
          ?.reason;
        if (reason === CONTACT_ISSUE.emailOrPhone)
          return t("formContactEmailOrPhone");
        if (reason === CONTACT_ISSUE.consent)
          return t("formContactConsentRequired");
        return undefined;
      },
    }),
    defaultValues,
  });
  const { control } = form;

  const onSubmit = async (values: FormContactValues) => {
    form.clearErrors("root");
    setSuccessMessage("");
    const result = await submitContactForm(values);
    if (!result.ok) {
      form.setError("root", { message: t("formContactError") });
      return;
    }
    setSuccessMessage(t("formContactSuccess"));
    form.reset();
    onSuccess?.();
  };

  return (
    <Form {...form}>
      <Stack asChild gap="md" className={className}>
        <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
          <FormRow>
            <FormFieldInput
              control={control}
              name="firstName"
              label={t("formContactFirstNameLabel")}
              autoComplete="given-name"
            />
            <FormFieldInput
              control={control}
              name="lastName"
              label={t("formContactLastNameLabel")}
              autoComplete="family-name"
            />
          </FormRow>

          <FormRow>
            <FormFieldInput
              control={control}
              name="email"
              type="email"
              label={t("formContactEmailLabel")}
              autoComplete="email"
            />
            <FormFieldInput
              control={control}
              name="phone"
              type="tel"
              label={t("formContactPhoneLabel")}
              autoComplete="tel"
            />
          </FormRow>

          <FormFieldTextarea
            control={control}
            name="message"
            label={t("formContactMessageLabel")}
          />

          <FormFieldCheckbox
            control={control}
            name="consent"
            label={t("formContactConsent")}
          />

          {/* Honeypot: off-screen, out of the tab order and hidden from
              assistive technology, so only bots fill it in. */}
          <input
            {...form.register("website")}
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
            className="sr-only"
          />

          <FormStatus
            error={form.formState.errors.root?.message}
            success={successMessage || undefined}
          />

          <Button
            type="submit"
            size="lg"
            width="responsive"
            loading={form.formState.isSubmitting}
          >
            {t("formContactSubmit")}
          </Button>
        </form>
      </Stack>
    </Form>
  );
};
