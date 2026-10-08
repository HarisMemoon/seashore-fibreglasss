import { NextResponse } from "next/server";
import { createChatbotResponse } from "@/lib/chatbot/engine";
import { chatbotRequestSchema } from "@/lib/chatbot/schema";

const CHANNEL_PAGE_PATHS: Record<string, string> = {
  facebook: "/facebook",
  instagram: "/instagram",
};

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const body = json as {
    message?: string;
    history?: { role: string; content: string }[];
    channel?: "facebook" | "instagram";
    leadDraft?: Record<string, unknown>;
  };

  const parsed = chatbotRequestSchema.safeParse({
    message: body.message ?? "",
    history: body.history ?? [],
    pagePath: CHANNEL_PAGE_PATHS[body.channel ?? "facebook"] ?? "/facebook",
    leadDraft: body.leadDraft ?? {},
  });

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: parsed.error.issues[0]?.message ?? "Invalid request.",
      },
      { status: 400 },
    );
  }

  try {
    const reply = await createChatbotResponse(parsed.data);

    // Flatten for ManyChat's field-mapping UI — quick replies and the
    // lead-capture flag each become their own top-level string/boolean,
    // instead of nested arrays ManyChat can't map directly into buttons.
    const quickReplies = reply.quickReplies ?? [];
    const primaryLink = reply.recommendedLinks?.[0];

    return NextResponse.json({
      ok: true,
      answer: reply.answer,
      intent: reply.intent,
      requiresHumanFollowup: reply.requiresHumanFollowup ?? false,
      leadCaptureActive: Boolean(reply.leadCapture),
      suggestedCity: reply.leadCapture?.suggestedCity ?? "",
      suggestedServiceSlug: reply.leadCapture?.suggestedServiceSlug ?? "",
      quickReply1: quickReplies[0] ?? "",
      quickReply2: quickReplies[1] ?? "",
      quickReply3: quickReplies[2] ?? "",
      linkLabel: primaryLink?.label ?? "",
      linkUrl: primaryLink?.href ?? "",
    });
  } catch (error) {
    console.error("[social/message] Reply generation failed", error);
    return NextResponse.json(
      {
        ok: false,
        answer:
          "The assistant is having trouble right now. Please call or text us, or try again in a moment.",
      },
      { status: 500 },
    );
  }
}
