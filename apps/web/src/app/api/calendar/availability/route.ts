import { NextRequest, NextResponse } from "next/server";
import {
  getCalendarClient,
  CALENDAR_ID,
  BUSINESS_TIMEZONE,
  BUSINESS_HOURS,
  SLOT_DURATION_MINUTES,
  BOOKING_LEAD_TIME_HOURS,
} from "@/lib/googleCalendar";

type AvailabilityRequestBody = {
  date?: string; // "YYYY-MM-DD", defaults to today
  daysAhead?: number; // how many days forward to scan, defaults to 5, max 14
};

type Slot = {
  start: string; // ISO 8601
  end: string; // ISO 8601
  label: string; // human-readable, e.g. "Tue, Sep 15 · 2:00 PM"
};

function buildDayWindowUtc(dateStr: string): { dayStart: Date; dayEnd: Date } {
  // Business hours are defined in BUSINESS_TIMEZONE; this constructs UTC
  // instants for that local day using Intl to resolve the offset correctly
  // (handles DST without a manual offset table).
  const probe = new Date(`${dateStr}T12:00:00Z`);
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: BUSINESS_TIMEZONE,
    timeZoneName: "shortOffset",
  }).formatToParts(probe);
  const offsetPart =
    parts.find((p) => p.type === "timeZoneName")?.value ?? "GMT+0";
  const offsetMatch = offsetPart.match(/GMT([+-]\d+)(?::(\d+))?/);
  const offsetHours = offsetMatch ? parseInt(offsetMatch[1], 10) : 0;
  const offsetMinutes = offsetMatch?.[2] ? parseInt(offsetMatch[2], 10) : 0;
  const totalOffsetMs =
    (offsetHours * 60 + Math.sign(offsetHours || 1) * offsetMinutes) * 60_000;

  const dayStart = new Date(
    Date.parse(
      `${dateStr}T${String(BUSINESS_HOURS.startHour).padStart(2, "0")}:00:00Z`,
    ) - totalOffsetMs,
  );
  const dayEnd = new Date(
    Date.parse(
      `${dateStr}T${String(BUSINESS_HOURS.endHour).padStart(2, "0")}:00:00Z`,
    ) - totalOffsetMs,
  );
  return { dayStart, dayEnd };
}

function formatDateStr(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export async function POST(request: NextRequest) {
  let body: AvailabilityRequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const daysAhead = Math.min(Math.max(body.daysAhead ?? 5, 1), 14);
  const startDateStr = body.date ?? formatDateStr(new Date());

  const scanStart = new Date(`${startDateStr}T00:00:00Z`);
  const scanEnd = new Date(scanStart);
  scanEnd.setUTCDate(scanEnd.getUTCDate() + daysAhead);

  let freeBusy;
  try {
    const calendar = getCalendarClient();
    const response = await calendar.freebusy.query({
      requestBody: {
        timeMin: scanStart.toISOString(),
        timeMax: scanEnd.toISOString(),
        timeZone: BUSINESS_TIMEZONE,
        items: [{ id: CALENDAR_ID }],
      },
    });
    freeBusy = response.data.calendars?.[CALENDAR_ID]?.busy ?? [];
  } catch (error) {
    console.error("Calendar availability lookup failed:", error);
    return NextResponse.json(
      {
        ok: false,
        error: "Could not reach the calendar. Please try again shortly.",
      },
      { status: 502 },
    );
  }

  const busyRanges = freeBusy.map((b) => ({
    start: new Date(b.start as string).getTime(),
    end: new Date(b.end as string).getTime(),
  }));

  const earliestBookable =
    Date.now() + BOOKING_LEAD_TIME_HOURS * 60 * 60 * 1000;
  const slots: Slot[] = [];
  const slotMs = SLOT_DURATION_MINUTES * 60 * 1000;

  for (let dayOffset = 0; dayOffset < daysAhead; dayOffset++) {
    const dayDate = new Date(scanStart);
    dayDate.setUTCDate(dayDate.getUTCDate() + dayOffset);
    const dayStr = formatDateStr(dayDate);
    const { dayStart, dayEnd } = buildDayWindowUtc(dayStr);

    for (
      let slotStart = dayStart.getTime();
      slotStart + slotMs <= dayEnd.getTime();
      slotStart += slotMs
    ) {
      const slotEnd = slotStart + slotMs;
      if (slotStart < earliestBookable) continue;

      const overlapsBusy = busyRanges.some(
        (b) => slotStart < b.end && slotEnd > b.start,
      );
      if (overlapsBusy) continue;

      const slotStartDate = new Date(slotStart);
      slots.push({
        start: slotStartDate.toISOString(),
        end: new Date(slotEnd).toISOString(),
        label: new Intl.DateTimeFormat("en-US", {
          timeZone: BUSINESS_TIMEZONE,
          weekday: "short",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
        }).format(slotStartDate),
      });
    }
  }

  // Cap the response — no channel needs more than a handful of options at once.
  return NextResponse.json({ ok: true, slots: slots.slice(0, 20) });
}
