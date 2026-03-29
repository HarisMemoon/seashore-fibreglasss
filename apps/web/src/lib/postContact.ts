import type { ContactSubmission } from "@seashore/types";
import { contactSubmissionSchema, fieldErrorsFromZod } from "./contactValidation";

export type PostContactError = Error & { fieldErrors?: Record<string, string> };

export async function postContact(payload: ContactSubmission): Promise<{ ok: boolean }> {
  const parsed = contactSubmissionSchema.safeParse(payload);
  if (!parsed.success) {
    const err = new Error(
      parsed.error.issues[0]?.message ?? "Please check the form and try again."
    ) as PostContactError;
    err.fieldErrors = fieldErrorsFromZod(parsed.error);
    throw err;
  }

  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(parsed.data),
  });

  const data = (await res.json().catch(() => ({}))) as {
    ok?: boolean;
    error?: string;
    fieldErrors?: Record<string, string>;
  };

  if (!res.ok) {
    const err = new Error(data.error ?? "Request failed") as PostContactError;
    if (data.fieldErrors) err.fieldErrors = data.fieldErrors;
    throw err;
  }

  return { ok: data.ok === true };
}
