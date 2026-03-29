import { z } from "zod";
import { BEST_TIME_OPTIONS, SERVICE_AREA_FORM_OPTIONS } from "@seashore/content";
const cityEnum = z.enum([...SERVICE_AREA_FORM_OPTIONS] as [string, ...string[]]);
const bestTimeEnum = z.enum([...BEST_TIME_OPTIONS] as [string, ...string[]]);

export const contactSubmissionSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters.")
      .max(120, "Name is too long."),
    phone: z
      .string()
      .trim()
      .refine((v) => {
        const digits = v.replace(/\D/g, "");
        return digits.length >= 10 && digits.length <= 15;
      }, "Enter a valid phone number with at least 10 digits."),
    email: z.preprocess(
      (v) => (v === undefined || v === null ? "" : String(v).trim()),
      z
        .union([z.literal(""), z.string().email("Enter a valid email address.")])
        .transform((v) => (v === "" ? undefined : v))
    ),
    city: z.preprocess(
      (v) => (v === undefined || v === null || v === "" ? undefined : String(v).trim()),
      cityEnum.optional()
    ),
    bestTime: z.preprocess(
      (v) => (v === undefined || v === null || v === "" ? undefined : String(v).trim()),
      bestTimeEnum.optional()
    ),
    message: z.preprocess(
      (v) => (v === undefined || v === null ? "" : String(v).trim()),
      z
        .string()
        .max(5000, "Message is too long (max 5000 characters).")
        .transform((v) => (v === "" ? undefined : v))
    ),
    wantsFreeInspection: z.preprocess(
      (v) => (v === true ? true : v === false ? false : undefined),
      z.boolean().optional()
    ),
    source: z.enum(["home", "contact"]),
  })
  .strict();

export type ParsedContactSubmission = z.infer<typeof contactSubmissionSchema>;

export function fieldErrorsFromZod(err: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of err.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && out[key] === undefined) {
      out[key] = issue.message;
    }
  }
  return out;
}
