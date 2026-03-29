import { NextResponse } from "next/server";
import type { ContactSubmission } from "@seashore/types";
import { contactSubmissionSchema, fieldErrorsFromZod } from "@/lib/contactValidation";
import { isEmailDeliveryConfigured, sendContactEmail } from "@/lib/sendContactEmail";

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = contactSubmissionSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: parsed.error.issues[0]?.message ?? "Invalid form data",
        fieldErrors: fieldErrorsFromZod(parsed.error),
      },
      { status: 400 }
    );
  }

  const submission: ContactSubmission = parsed.data;

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (webhook) {
    try {
      const whRes = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submission),
      });
      if (!whRes.ok) {
        console.error("[contact] Webhook returned", whRes.status);
      }
    } catch (e) {
      console.error("[contact] Webhook error", e);
    }
  }

  if (isEmailDeliveryConfigured()) {
    try {
      await sendContactEmail(submission);
    } catch (e) {
      console.error("[contact] Email send failed", e);
      return NextResponse.json(
        { ok: false, error: "We could not send your message. Please call us or try again shortly." },
        { status: 502 }
      );
    }
  } else {
    console.info("[contact] Lead submission (no email transport)", JSON.stringify(submission));
  }

  return NextResponse.json({ ok: true });
}
