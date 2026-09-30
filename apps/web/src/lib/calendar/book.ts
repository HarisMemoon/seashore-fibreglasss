import {
  getCalendarClient,
  CALENDAR_ID,
  BUSINESS_TIMEZONE,
  isWithinBusinessHours,
} from "@/lib/googleCalendar";

export type BookAppointmentInput = {
  name: string;
  address?: string;
  phone: string;
  email?: string;
  city: string;
  preferredTime: string; // ISO 8601
  notes?: string;
  source?: string;
};

export type BookAppointmentResult =
  | { ok: true; eventId: string; eventLink?: string | null; start: string }
  | { ok: false; error: string; status: number; conflict?: boolean };

const SLOT_DURATION_MINUTES = 60; // keep in sync with lib/googleCalendar.ts

function validate(input: BookAppointmentInput): string[] {
  const errors: string[] = [];
  if (!input.name || input.name.trim() === "")
    errors.push("Missing required field: name");
  if (!input.phone || input.phone.trim() === "")
    errors.push("Missing required field: phone");
  if (!input.preferredTime || input.preferredTime.trim() === "")
    errors.push("Missing required field: preferredTime");
  if (input.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
    errors.push("Invalid email format.");
  }
  if (input.preferredTime && Number.isNaN(Date.parse(input.preferredTime))) {
    errors.push("Invalid preferredTime — must be a valid ISO 8601 timestamp.");
  }
  return errors;
}

export async function bookAppointment(
  input: BookAppointmentInput,
): Promise<BookAppointmentResult> {
  const errors = validate(input);
  if (errors.length > 0) {
    return { ok: false, error: errors.join(" "), status: 400 };
  }

  const startTime = new Date(input.preferredTime);
  if (startTime.getTime() < Date.now()) {
    return {
      ok: false,
      error: "That time has already passed. Please choose another slot.",
      status: 400,
    };
  }
  if (!isWithinBusinessHours(startTime)) {
    return {
      ok: false,
      error:
        "That time is outside our booking hours (Monday–Saturday, 8:00 AM–5:00 PM). Sunday is by appointment only — please call us directly to arrange one.",
      status: 400,
    };
  }
  const endTime = new Date(
    startTime.getTime() + SLOT_DURATION_MINUTES * 60 * 1000,
  );

  const descriptionLines = [
    `Phone: ${input.phone}`,
    input.email ? `Email: ${input.email}` : null,
    input.address ? `Address: ${input.address}` : null,
    input.notes ? `Notes: ${input.notes}` : null,
    `City: ${input.city}`,
    `Source: ${input.source ?? "unknown"}`,
  ].filter(Boolean);

  try {
    const calendar = getCalendarClient();

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
      return {
        ok: false,
        error:
          "That slot was just booked by someone else. Please pick another time.",
        status: 409,
        conflict: true,
      };
    }

    const event = await calendar.events.insert({
      calendarId: CALENDAR_ID,
      requestBody: {
        summary: `Appointment: ${input.name}`,
        description: descriptionLines.join("\n"),
        start: {
          dateTime: startTime.toISOString(),
          timeZone: BUSINESS_TIMEZONE,
        },
        end: { dateTime: endTime.toISOString(), timeZone: BUSINESS_TIMEZONE },
        location: input.address || undefined,
      },
    });

    return {
      ok: true,
      eventId: event.data.id as string,
      eventLink: event.data.htmlLink,
      start: startTime.toISOString(),
    };
  } catch (error) {
    console.error("Calendar booking failed:", error);
    return {
      ok: false,
      error: "Could not book the appointment. Please try again shortly.",
      status: 502,
    };
  }
}
