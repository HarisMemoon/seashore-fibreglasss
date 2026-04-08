import { z } from "zod";

export const chatbotLeadDraftSchema = z
  .object({
    issueType: z.string().trim().min(1).max(120).optional(),
    serviceSlug: z.string().trim().min(1).max(120).optional(),
    city: z.string().trim().min(1).max(120).optional(),
    urgency: z.string().trim().min(1).max(120).optional(),
    preferredContactMethod: z.enum(["Call", "Text", "Email"]).optional(),
    summary: z.string().trim().max(1000).optional(),
  })
  .strict();

export const chatbotRequestSchema = z
  .object({
    message: z.string().trim().min(1).max(2000),
    history: z
      .array(
        z.object({
          role: z.enum(["user", "assistant"]),
          content: z.string().trim().min(1).max(2000),
        })
      )
      .max(12)
      .optional(),
    pagePath: z.string().trim().max(200).optional(),
    leadDraft: chatbotLeadDraftSchema.optional(),
  })
  .strict();

export const chatbotAnalyticsSchema = z
  .object({
    event: z.enum([
      "open",
      "first_message",
      "message_sent",
      "response_received",
      "routed_click",
      "quote_started",
      "quote_submitted",
      "handoff_to_call",
    ]),
    pagePath: z.string().trim().max(200).optional(),
    label: z.string().trim().max(200).optional(),
    meta: z.record(z.string(), z.string()).optional(),
  })
  .strict();
