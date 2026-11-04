"use server";

import * as Sentry from "@sentry/nextjs";

import { contactSchema, type FormContactValues } from "./contactSchema";

export type SubmitContactFormResult =
  { ok: true } | { ok: false; error: "validation" | "unavailable" };

/**
 * Server side of the contact form. The client validates with the same schema,
 * but a server action is a public endpoint: never trust its input.
 *
 * Delivery is not wired yet: plug it in where marked (email provider, CRM,
 * queue…). Until then the form says so in production instead of reporting
 * a message as sent while it is thrown away.
 */
export async function submitContactForm(
  values: FormContactValues,
): Promise<SubmitContactFormResult> {
  const parsed = contactSchema.safeParse(values);
  if (!parsed.success) return { ok: false, error: "validation" };

  // Honeypot filled in: a bot. Answer like a success so it learns nothing.
  if (parsed.data.website !== "") return { ok: true };

  // TODO: deliver `parsed.data` (without `website`) to its destination and
  // return `{ ok: true }` once it succeeds. Don't log it: it is personal data
  // (name, email, phone) and logs end up in third-party tools.
  if (process.env.NODE_ENV === "production") {
    Sentry.captureMessage(
      "submitContactForm: delivery not implemented",
      "error",
    );
    return { ok: false, error: "unavailable" };
  }
  return { ok: true };
}
