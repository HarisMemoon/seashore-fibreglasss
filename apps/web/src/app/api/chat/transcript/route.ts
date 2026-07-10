import { NextResponse } from "next/server";
import { chatTranscriptSchema } from "@/lib/chatbot/schema";
import { isEmailDeliveryConfigured } from "@/lib/sendContactEmail";
import { sendChatTranscriptEmail } from "@/lib/sendChatTranscriptEmail";

export async function POST(request: Request) {
  let json: unknown;

  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = chatTranscriptSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid transcript." },
      { status: 400 }
    );
  }

  const userMessageCount = parsed.data.messages.filter((m) => m.role === "user").length;
  if (userMessageCount < 2) {
    return NextResponse.json({ ok: true });
  }

  if (!isEmailDeliveryConfigured()) {
    console.info("[chatbot] Transcript (no email transport)", JSON.stringify(parsed.data));
    return NextResponse.json({ ok: true });
  }

  try {
    await sendChatTranscriptEmail(parsed.data);
  } catch (error) {
    console.error("[chatbot] Transcript email failed", error);
    return NextResponse.json(
      { ok: false, error: "Could not send transcript." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
