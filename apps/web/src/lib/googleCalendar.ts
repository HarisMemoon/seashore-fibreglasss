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

// --- Business hours config — adjust to the client's actual hours ---
export const BUSINESS_TIMEZONE = "America/New_York";
export const BUSINESS_HOURS = { startHour: 8, endHour: 17 }; // 8am–5pm local
export const SLOT_DURATION_MINUTES = 60;
export const BOOKING_LEAD_TIME_HOURS = 2; // no same-hour bookings
