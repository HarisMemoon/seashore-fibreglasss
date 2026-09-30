import { NextRequest, NextResponse } from "next/server";
import {
  bookAppointment,
  type BookAppointmentInput,
} from "@/lib/calendar/book";

export async function POST(request: NextRequest) {
  let body: BookAppointmentInput;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const result = await bookAppointment(body);

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: result.error, conflict: result.conflict },
      { status: result.status },
    );
  }

  return NextResponse.json({
    ok: true,
    eventId: result.eventId,
    eventLink: result.eventLink,
    start: result.start,
  });
}
