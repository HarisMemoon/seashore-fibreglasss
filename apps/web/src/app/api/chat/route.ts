import { NextResponse } from "next/server";
import {
  buildFriendlyFallbackReply,
  createChatbotResponse,
} from "@/lib/chatbot/engine";
import { chatbotRequestSchema } from "@/lib/chatbot/schema";

// Every failure path (unparseable body, validation error, engine exception)
// returns the friendly fallback reply as a normal 200 response, so raw
// internal error strings (e.g. zod validation messages) can never reach the
// chat UI. Failure details are logged server-side only.
export async function POST(request: Request) {
  let json: unknown;

  try {
    json = await request.json();
  } catch (error) {
    console.error("[chatbot] Invalid JSON body", error);
    return NextResponse.json({ ok: true, reply: buildFriendlyFallbackReply() });
  }

  const parsed = chatbotRequestSchema.safeParse(json);
  if (!parsed.success) {
    console.error("[chatbot] Request validation failed", parsed.error.issues);
    return NextResponse.json({ ok: true, reply: buildFriendlyFallbackReply() });
  }

  try {
    const reply = await createChatbotResponse(parsed.data);
    return NextResponse.json({ ok: true, reply });
  } catch (error) {
    console.error("[chatbot] Reply generation failed", error);
    return NextResponse.json({
      ok: true,
      reply: buildFriendlyFallbackReply(parsed.data.message),
    });
  }
}
