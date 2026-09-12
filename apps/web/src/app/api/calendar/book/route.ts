import { NextRequest, NextResponse } from "next/server";
import {
  getCalendarClient,
  CALENDAR_ID,
  BUSINESS_TIMEZONE,
} from "@/lib/googleCalendar";

type BookRequestBody = {
  name?: string;
  address?: string;
  phone?: string;
  email?: string;
  preferredTime?: string; // ISO 8601 start time, must match a slot from /availability
  notes?: string;
  source?: string; // "chatbot" | "voice" | "social" — for tagging, not required
};

const REQUIRED_FIELDS: (keyof BookRequestBody)[] = [
  "name",
  "phone",
  "preferredTime",
];
const SLOT_DURATION_MINUTES = 60; // keep in sync with lib/googleCalendar.ts

function validate(body: BookRequestBody): string[] {
  const errors: string[] = [];
  for (const field of REQUIRED_FIELDS) {
    if (!body[field] || String(body[field]).trim() === "") {
      errors.push(`Missing required field: ${field}`);
    }
  }
  if (body.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    errors.push("Invalid email format.");
  }
  if (body.preferredTime && Number.isNaN(Date.parse(body.preferredTime))) {
    errors.push("Invalid preferredTime — must be a valid ISO 8601 timestamp.");
  }
  return errors;
}

export async function POST(request: NextRequest) {
  let body: BookRequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const errors = validate(body);
  if (errors.length > 0) {
    return NextResponse.json(
      { ok: false, error: errors.join(" ") },
      { status: 400 },
    );
  }

  const startTime = new Date(body.preferredTime as string);
  if (startTime.getTime() < Date.now()) {
    return NextResponse.json(
      {
        ok: false,
        error: "That time has already passed. Please choose another slot.",
      },
      { status: 400 },
    );
  }
  const endTime = new Date(
    startTime.getTime() + SLOT_DURATION_MINUTES * 60 * 1000,
  );

  const descriptionLines = [
    `Phone: ${body.phone}`,
    body.email ? `Email: ${body.email}` : null,
    body.address ? `Address: ${body.address}` : null,
    body.notes ? `Notes: ${body.notes}` : null,
    `Source: ${body.source ?? "unknown"}`,
  ].filter(Boolean);

  try {
    const calendar = getCalendarClient();

    // Guard against a double-booking race: re-check this exact slot is still free
    // immediately before writing (covers the gap between availability fetch and booking).
    const conflictCheck = await calendar.freebusy.query({
      requestBody: {
        timeMin: startTime.toISOString(),
        timeMax: endTime.toISOString(),
        timeZone: BUSINESS_TIMEZONE,
        items: [{ id: CALENDAR_ID }],
      },
    });
    const stillBusy =
      (conflictCheck.data.calendars?.[CALENDAR_ID]?.busy ?? []).length > 0;
    if (stillBusy) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "That slot was just booked by someone else. Please pick another time.",
          conflict: true,
        },
        { status: 409 },
      );
    }

    const event = await calendar.events.insert({
      calendarId: CALENDAR_ID,
      requestBody: {
        summary: `Appointment: ${body.name}`,
        description: descriptionLines.join("\n"),
        start: {
          dateTime: startTime.toISOString(),
          timeZone: BUSINESS_TIMEZONE,
        },
        end: { dateTime: endTime.toISOString(), timeZone: BUSINESS_TIMEZONE },
        // Only add as an attendee if you want Google to email them directly —
        // service accounts can't send invite emails without Domain-Wide Delegation,
        // so omit `attendees` unless that's set up, or the insert call will fail.
        location: body.address || undefined,
      },
    });

    return NextResponse.json({
      ok: true,
      eventId: event.data.id,
      eventLink: event.data.htmlLink,
      start: startTime.toISOString(),
    });
  } catch (error) {
    console.error("Calendar booking failed:", error);
    return NextResponse.json(
      {
        ok: false,
        error: "Could not book the appointment. Please try again shortly.",
      },
      { status: 502 },
    );
  }
}
