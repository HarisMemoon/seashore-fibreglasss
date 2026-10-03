import { NextRequest, NextResponse } from "next/server";
import { bookAppointment } from "@/lib/calendar/book";
import { postContact } from "@/lib/postContact";

function extractVapiToolCall(body: any) {
  return body?.message?.toolCalls?.[0] ?? body?.message?.toolCallList?.[0];
}

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

  const vapiToolCall = extractVapiToolCall(body);
  let payload: any;
  let toolCallId: string | undefined;

  if (vapiToolCall) {
    toolCallId = vapiToolCall.id;
    try {
      payload =
        typeof vapiToolCall.function?.arguments === "string"
          ? JSON.parse(vapiToolCall.function.arguments)
          : (vapiToolCall.function?.arguments ?? {});
    } catch {
      return NextResponse.json(
        { results: [{ toolCallId, error: "Could not parse tool arguments." }] },
        { status: 200 },
      );
    }
  } else {
    payload = body;
  }
  console.log("[voice/book] payload received:", JSON.stringify(payload));
  const errors: string[] = [];
  if (!payload.name?.trim()) errors.push("name is required");
  if (!payload.phone?.trim()) errors.push("phone is required");
  if (!payload.address?.trim()) errors.push("address is required");
  if (!payload.city?.trim()) errors.push("city is required");
  if (!payload.preferredTime?.trim()) errors.push("preferredTime is required");

  if (errors.length > 0) {
    const msg = errors.join(", ");
    if (toolCallId) {
      return NextResponse.json(
        { results: [{ toolCallId, error: msg }] },
        { status: 200 },
      );
    }
    return NextResponse.json({ ok: false, error: msg }, { status: 400 });
  }

  const result = await bookAppointment({
    name: payload.name.trim(),
    phone: payload.phone.trim(),
    email: payload.email?.trim() || undefined,
    address: payload.address.trim(),
    preferredTime: payload.preferredTime,
    city: payload.city.trim(),
    source: "voice",
  });

  if (!result.ok) {
    if (toolCallId) {
      return NextResponse.json(
        { results: [{ toolCallId, error: result.error }] },
        { status: 200 },
      );
    }
    return NextResponse.json(
      { ok: false, error: result.error, conflict: result.conflict },
      { status: result.status },
    );
  }

  try {
    await postContact({
      name: payload.name.trim(),
      phone: payload.phone.trim(),
      email: payload.email?.trim() || undefined,
      address: payload.address.trim(),
      city: payload.city.trim(),
      message: `Booked via voice AI agent for ${result.start}.`,
      wantsFreeInspection: true,
      source: "voice",
    });
  } catch (e) {
    console.error(
      "[voice/book] postContact failed after successful booking:",
      e,
    );
  }

  const spokenTime = new Date(result.start).toLocaleString("en-US", {
    timeZone: "America/New_York",
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  if (toolCallId) {
    return NextResponse.json(
      {
        results: [
          {
            toolCallId,
            result: `Booked for ${spokenTime}.`,
          },
        ],
      },
      { status: 200 },
    );
  }

  return NextResponse.json({
    ok: true,
    eventId: result.eventId,
    start: result.start,
    message: `Booked for ${spokenTime}.`,
  });
}
