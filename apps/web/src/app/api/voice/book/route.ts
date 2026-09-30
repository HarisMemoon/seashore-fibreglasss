import { NextRequest, NextResponse } from "next/server";
import { bookAppointment } from "@/lib/calendar/book";
import { postContact } from "@/lib/postContact";

type VapiBookPayload = {
  name?: string;
  address?: string;
  phone?: string;
  email?: string;
  city?: string;
  preferredTime?: string;
};

function validatePayload(body: VapiBookPayload): string[] {
  const errors: string[] = [];
  if (!body.name?.trim()) errors.push("name is required");
  if (!body.phone?.trim()) errors.push("phone is required");
  if (!body.address?.trim()) errors.push("address is required");
  if (!body.city?.trim()) errors.push("city is required");
  if (!body.preferredTime?.trim()) errors.push("preferredTime is required");
  return errors;
}

export async function POST(request: NextRequest) {
  let body: VapiBookPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const errors = validatePayload(body);
  if (errors.length > 0) {
    return NextResponse.json(
      { ok: false, error: errors.join(", ") },
      { status: 400 },
    );
  }

  const result = await bookAppointment({
    name: body.name!.trim(),
    phone: body.phone!.trim(),
    email: body.email?.trim() || undefined,
    address: body.address!.trim(),
    city: body.city!.trim(),
    preferredTime: body.preferredTime!,
    source: "voice",
  });

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: result.error, conflict: result.conflict },
      { status: result.status },
    );
  }

  // Best-effort lead log — booking already succeeded, so a postContact failure
  // here should not fail the whole voice call back to the caller.
  try {
    await postContact({
      name: body.name!.trim(),
      phone: body.phone!.trim(),
      email: body.email?.trim() || undefined,
      address: body.address!.trim(),
      city: body.city!.trim(),
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

  return NextResponse.json({
    ok: true,
    eventId: result.eventId,
    start: result.start,
    message: `Booked for ${new Date(result.start).toLocaleString("en-US", {
      timeZone: "America/New_York",
    })}.`,
  });
}
