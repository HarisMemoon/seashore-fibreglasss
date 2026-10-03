import {
  getCalendarClient,
  CALENDAR_ID,
  BUSINESS_TIMEZONE,
  getBusinessHoursForDate,
  SLOT_DURATION_MINUTES,
  BOOKING_LEAD_TIME_HOURS,
} from "@/lib/googleCalendar";

export type Slot = {
  start: string;
  end: string;
  label: string;
};

export type AvailabilityResult =
  | { ok: true; slots: Slot[] }
  | { ok: false; error: string; status: number };

function buildDayWindowUtc(
  dateStr: string,
): { dayStart: Date; dayEnd: Date } | null {
  const hours = getBusinessHoursForDate(dateStr);
  if (!hours) return null;

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
      `${dateStr}T${String(hours.startHour).padStart(2, "0")}:00:00Z`,
    ) - totalOffsetMs,
  );
  const dayEnd = new Date(
    Date.parse(`${dateStr}T${String(hours.endHour).padStart(2, "0")}:00:00Z`) -
      totalOffsetMs,
  );
  return { dayStart, dayEnd };
}

function formatDateStr(date: Date): string {
  return date.toISOString().slice(0, 10);
}

const DATE_STR_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export async function getAvailableSlots(input: {
  date?: string;
  daysAhead?: number;
  dates?: string[];
}): Promise<AvailabilityResult> {
  console.log("[getAvailableSlots] input received:", JSON.stringify(input));
  const explicitDates = Array.isArray(input.dates)
    ? input.dates.filter((d) => DATE_STR_PATTERN.test(d)).slice(0, 2)
    : null;

  if (input.dates && explicitDates?.length === 0) {
    return { ok: false, error: "No valid dates provided.", status: 400 };
  }

  const dayStrsToScan: string[] = explicitDates
    ? [...explicitDates].sort()
    : (() => {
        const daysAhead = Math.min(Math.max(input.daysAhead ?? 5, 1), 14);
        const startDateStr = input.date ?? formatDateStr(new Date());
        const scanStart = new Date(`${startDateStr}T00:00:00Z`);
        return Array.from({ length: daysAhead }, (_, i) => {
          const d = new Date(scanStart);
          d.setUTCDate(d.getUTCDate() + i);
          return formatDateStr(d);
        });
      })();

  const scanStart = new Date(`${dayStrsToScan[0]}T00:00:00Z`);
  const scanEnd = new Date(
    `${dayStrsToScan[dayStrsToScan.length - 1]}T00:00:00Z`,
  );
  scanEnd.setUTCDate(scanEnd.getUTCDate() + 1);

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
    return {
      ok: false,
      error: "Could not reach the calendar. Please try again shortly.",
      status: 502,
    };
  }

  const busyRanges = freeBusy.map((b) => ({
    start: new Date(b.start as string).getTime(),
    end: new Date(b.end as string).getTime(),
  }));

  const earliestBookable =
    Date.now() + BOOKING_LEAD_TIME_HOURS * 60 * 60 * 1000;
  const slots: Slot[] = [];
  const slotMs = SLOT_DURATION_MINUTES * 60 * 1000;

  for (const dayStr of dayStrsToScan) {
    const window = buildDayWindowUtc(dayStr);
    if (!window) continue;
    const { dayStart, dayEnd } = window;

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

  return { ok: true, slots: slots.slice(0, 20) };
}
