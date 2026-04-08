import { NextResponse } from "next/server";
import { chatbotAnalyticsSchema } from "@/lib/chatbot/schema";

export async function POST(request: Request) {
  let json: unknown;

  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = chatbotAnalyticsSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid analytics event." },
      { status: 400 }
    );
  }

  const event = {
    ...parsed.data,
    at: new Date().toISOString(),
  };

  const webhook = process.env.CHATBOT_EVENT_WEBHOOK_URL?.trim();
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(event),
      });
    } catch (error) {
      console.error("[chatbot] analytics webhook failed", error);
    }
  } else {
    console.info("[chatbot] analytics", JSON.stringify(event));
  }

  return NextResponse.json({ ok: true });
}
