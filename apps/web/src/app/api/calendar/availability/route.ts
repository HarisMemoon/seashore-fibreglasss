import { NextRequest, NextResponse } from "next/server";
import { getAvailableSlots } from "@/lib/calendar/availability";

export async function POST(request: NextRequest) {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  // Vapi sends a different envelope: { message: { toolCalls: [{ id, function: { arguments } }] } }
  const vapiToolCall =
    body?.message?.toolCalls?.[0] ?? body?.message?.toolCallList?.[0];

  if (vapiToolCall) {
    const toolCallId: string = vapiToolCall.id;
    let args: any = {};
    try {
      args =
        typeof vapiToolCall.function?.arguments === "string"
          ? JSON.parse(vapiToolCall.function.arguments)
          : (vapiToolCall.function?.arguments ?? {});
    } catch {
      return NextResponse.json(
        { results: [{ toolCallId, error: "Could not parse tool arguments." }] },
        { status: 200 },
      );
    }

    const result = await getAvailableSlots({ dates: args.dates });

    if (!result.ok) {
      return NextResponse.json(
        { results: [{ toolCallId, error: result.error }] },
        { status: 200 }, // Vapi requires 200 even on logical errors
      );
    }

    // Vapi's `result` field must be a single-line string — give it a
    // human-readable summary the model can speak directly, plus the raw
    // slots as JSON text in case it wants to reference exact values.
    const readableSummary =
      result.slots.length > 0
        ? `Available times: ${result.slots.map((s) => s.label).join(", ")}.`
        : "No available times found for that date.";

    return NextResponse.json(
      {
        results: [
          {
            toolCallId,
            result: JSON.stringify({
              ok: true,
              summary: readableSummary,
              slots: result.slots,
            }),
          },
        ],
      },
      { status: 200 },
    );
  }

  // Normal path — your chatbot widget and any direct API callers, unchanged.
  const result = await getAvailableSlots(body);
  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: result.error },
      { status: result.status },
    );
  }
  return NextResponse.json({ ok: true, slots: result.slots });
}
