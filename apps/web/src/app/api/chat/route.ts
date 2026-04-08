import { NextResponse } from "next/server";
import { createChatbotResponse } from "@/lib/chatbot/engine";
import { chatbotRequestSchema } from "@/lib/chatbot/schema";

export async function POST(request: Request) {
  let json: unknown;

  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = chatbotRequestSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: parsed.error.issues[0]?.message ?? "Invalid chatbot request.",
      },
      { status: 400 }
    );
  }

  try {
    const reply = await createChatbotResponse(parsed.data);
    return NextResponse.json({ ok: true, reply });
  } catch (error) {
    console.error("[chatbot] Reply generation failed", error);
    return NextResponse.json(
      {
        ok: false,
        error: "The assistant is having trouble right now. Please call, text, or try again in a moment.",
      },
      { status: 500 }
    );
  }
}
