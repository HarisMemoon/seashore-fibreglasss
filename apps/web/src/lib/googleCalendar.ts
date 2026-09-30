import { google } from "googleapis";

const REQUIRED_ENV_VARS = [
  "GOOGLE_SERVICE_ACCOUNT_EMAIL",
  "GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY",
  "GOOGLE_CALENDAR_ID",
] as const;

function assertEnv() {
  const missing = REQUIRED_ENV_VARS.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(`Missing required env vars: ${missing.join(", ")}`);
  }
}

// Private keys stored in env vars usually have literal "\n" instead of real newlines.
function normalizePrivateKey(key: string): string {
  return key.includes("\\n") ? key.replace(/\\n/g, "\n") : key;
}

let cachedAuth: InstanceType<typeof google.auth.JWT> | null = null;

export function getCalendarAuth() {
  assertEnv();
  if (cachedAuth) return cachedAuth;

  cachedAuth = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: normalizePrivateKey(
      process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY as string,
    ),
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });

  return cachedAuth;
}

export function getCalendarClient() {
  return google.calendar({ version: "v3", auth: getCalendarAuth() });
}

export const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID as string;

// --- Business hours config ---
// Confirmed with client: Monday–Saturday 8:00 AM–5:00 PM, Sunday by appointment only
// (Sunday is intentionally excluded from self-serve availability/booking below —
// the phone/voice channel remains open any time, this only governs calendar slots.)
export const BUSINESS_TIMEZONE = "America/New_York";

type DayHours = { startHour: number; endHour: number } | null; // null = closed to self-serve booking

// 0 = Sunday, 1 = Monday ... 6 = Saturday
export const BUSINESS_HOURS_BY_DAY: Record<number, DayHours> = {
  0: null, // Sunday — by appointment only
  1: { startHour: 8, endHour: 17 },
  2: { startHour: 8, endHour: 17 },
  3: { startHour: 8, endHour: 17 },
  4: { startHour: 8, endHour: 17 },
  5: { startHour: 8, endHour: 17 },
  6: { startHour: 8, endHour: 17 },
};

export const SLOT_DURATION_MINUTES = 60;
export const BOOKING_LEAD_TIME_HOURS = 2;

// A dateStr is a plain "YYYY-MM-DD" calendar date, independent of timezone —
// its weekday doesn't change based on how it's parsed, so UTC parsing is safe here.
export function getBusinessHoursForDate(dateStr: string): DayHours {
  const weekday = new Date(`${dateStr}T00:00:00Z`).getUTCDay();
  return BUSINESS_HOURS_BY_DAY[weekday] ?? null;
}

// Returns whether a specific instant falls inside business hours on its own
// local calendar day (in BUSINESS_TIMEZONE). Used to validate bookings coming
// from any channel — not just ones that went through the availability route.
export function isWithinBusinessHours(instant: Date): boolean {
  const localDateStr = new Intl.DateTimeFormat("en-CA", {
    timeZone: BUSINESS_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(instant); // en-CA gives YYYY-MM-DD directly

  const hours = getBusinessHoursForDate(localDateStr);
  if (!hours) return false;

  const localHour = Number(
    new Intl.DateTimeFormat("en-US", {
      timeZone: BUSINESS_TIMEZONE,
      hour: "numeric",
      hour12: false,
    }).format(instant),
  );

  return localHour >= hours.startHour && localHour < hours.endHour;
} // no same-hour bookings
