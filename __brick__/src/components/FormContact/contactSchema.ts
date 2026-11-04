import { z } from "zod";

/**
 * The template's form asks for the least a contact request needs. A project
 * that wants more adds the field here, in `submitContactForm` and in
 * `FormContact` — the three move together.
 *
 * No copy here: the schema runs on the server too. Built-in rules use zod's
 * native messages in the user's language (see `ZodLocaleProvider`); the two
 * custom rules carry a `reason` that `FormContact` turns into its own message.
 *
 * Every field has a ceiling: the server action is a public endpoint and
 * would otherwise accept anything up to the 1 MB body limit.
 */
export const CONTACT_ISSUE = {
  emailOrPhone: "emailOrPhone",
  consent: "consent",
} as const;

export const contactSchema = z
  .object({
    firstName: z.string().trim().min(1).max(100),
    lastName: z.string().trim().min(1).max(100),
    email: z.string().trim().max(254),
    phone: z.string().trim().max(30),
    message: z.string().trim().min(1).max(5000),
    consent: z.boolean().refine((v) => v === true, {
      params: { reason: CONTACT_ISSUE.consent },
    }),
    /** Honeypot: hidden from people, filled in by bots. See FormContact. */
    website: z.string().max(200),
  })
  .superRefine((data, ctx) => {
    if (data.email === "" && data.phone === "") {
      ctx.addIssue({
        code: "custom",
        path: ["email"],
        params: { reason: CONTACT_ISSUE.emailOrPhone },
      });
      return;
    }

    // Email is optional, but a filled-in one must be valid: the issue is
    // zod's own `invalid_format`, so its native message applies.
    if (data.email !== "" && !z.email().safeParse(data.email).success) {
      ctx.addIssue({
        code: "invalid_format",
        format: "email",
        input: data.email,
        path: ["email"],
      });
    }
  });

export type FormContactValues = z.input<typeof contactSchema>;
