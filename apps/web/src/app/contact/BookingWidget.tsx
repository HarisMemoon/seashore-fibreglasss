"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { SERVICE_AREA_FORM_OPTIONS } from "@seashore/content";

type Slot = {
  start: string;
  end: string;
  label: string;
};

const PHONE_DISPLAY = "(609) 338-4505";
const PHONE_TEL = "tel:+16093384505";

// Fetch with a hard timeout so a slow/hung calendar API can never leave
// the widget spinning forever — it fails into the error state instead.
async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeoutMs: number,
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

// ── Date helpers (business timezone: America/New_York) ──────────────────────

function etTodayStr(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function addDays(dateStr: string, n: number): string {
  const d = new Date(`${dateStr}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

function addMonths(dateStr: string, n: number): string {
  const d = new Date(`${dateStr}T12:00:00Z`);
  d.setUTCMonth(d.getUTCMonth() + n);
  return d.toISOString().slice(0, 10);
}

function dayMeta(dateStr: string) {
  const d = new Date(`${dateStr}T12:00:00Z`);
  return {
    weekday: new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      timeZone: "UTC",
    }).format(d),
    dayNum: d.getUTCDate(),
    month: new Intl.DateTimeFormat("en-US", {
      month: "short",
      timeZone: "UTC",
    }).format(d),
    isSunday: d.getUTCDay() === 0,
  };
}

function prettyDate(dateStr: string): string {
  const d = new Date(`${dateStr}T12:00:00Z`);
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(d);
}

// BookingWidget v3 (Nov 7) — v2 flow kept; fixes: town dropdown matches the
// server-side list, real phone validation, stale-response guard, fetch
// timeouts, full reset, and the confirm button scrolls into view on mobile.
// ── Component ────────────────────────────────────────────────────────────────

export function BookingWidget() {
  const today = useMemo(() => etTodayStr(), []);
  const maxDate = useMemo(() => addMonths(today, 3), [today]);

  const weekDays = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => {
        const date = addDays(today, i);
        return { date, ...dayMeta(date) };
      }),
    [today],
  );

  const firstOpenDay =
    weekDays.find((d) => !d.isSunday)?.date ?? weekDays[0].date;

  // Step 1 — details
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  // Step 2 — day: chosen (pending) vs confirmed. Times load ONLY after the
  // visitor confirms the day with the button in this section.
  const [pendingDate, setPendingDate] = useState<string>(firstOpenDay);
  const [confirmedDate, setConfirmedDate] = useState<string | null>(null);
  const pendingIsSunday = dayMeta(pendingDate).isSunday;

  // Step 3 — time
  const [slots, setSlots] = useState<Slot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsError, setSlotsError] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  // Monotonic request id: if the visitor confirms a second day while the
  // first day's slots are still loading, the stale response is ignored.
  const loadSeq = useRef(0);
  const confirmRef = useRef<HTMLDivElement>(null);

  // Confirm
  const [submitting, setSubmitting] = useState(false);
  const [bookError, setBookError] = useState<string | null>(null);
  const [savedFallback, setSavedFallback] = useState(false);
  const [bookedLabel, setBookedLabel] = useState<string | null>(null);

  async function loadSlots(date: string) {
    const seq = ++loadSeq.current;
    setSlotsLoading(true);
    setSlotsError(null);
    setSelectedSlot(null);
    try {
      const response = await fetchWithTimeout(
        "/api/calendar/availability",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ dates: [date] }),
        },
        12000,
      );
      const data = await response.json().catch(() => null);
      if (seq !== loadSeq.current) return; // a newer day was confirmed
      if (!response.ok || !data?.ok) {
        throw new Error(data?.error || "Could not load available times.");
      }
      setSlots(data.slots ?? []);
    } catch (error) {
      if (seq !== loadSeq.current) return;
      setSlots([]);
      setSlotsError(
        error instanceof Error && error.name === "AbortError"
          ? "Loading times took too long — please try again."
          : error instanceof Error
            ? error.message
            : "Could not load available times.",
      );
    } finally {
      if (seq === loadSeq.current) setSlotsLoading(false);
    }
  }

  function confirmDay() {
    if (pendingIsSunday) return;
    setConfirmedDate(pendingDate);
    setBookedLabel(null);
    setBookError(null);
    setSavedFallback(false);
    void loadSlots(pendingDate);
  }

  // Server-side the phone must be 10–15 digits — validate the same way
  // here so the visitor hears it from the form, not from a failed booking.
  const phoneDigits = phone.replace(/\D/g, "");
  const detailsValid =
    name.trim() !== "" &&
    phoneDigits.length >= 10 &&
    phoneDigits.length <= 15 &&
    city.trim() !== "";

  async function confirmBooking() {
    if (!selectedSlot || !detailsValid) return;
    setSubmitting(true);
    setBookError(null);
    setSavedFallback(false);
    try {
      const response = await fetchWithTimeout(
        "/api/calendar/book",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim() || undefined,
          city: city.trim(),
          address: address.trim() || undefined,
          notes: notes.trim() || undefined,
          preferredTime: selectedSlot.start,
            source: "website",
          }),
        },
        15000,
      );
      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.ok) {
        if (data?.conflict) {
          setBookError("That slot was just taken — pick another time below.");
          if (confirmedDate) void loadSlots(confirmedDate);
          return;
        }
        // Calendar unreachable (502): the server emails the full request to
        // the office as a safety net (see lib/calendar/book.ts), so the lead
        // is NOT lost — the team calls back to confirm manually.
        if (response.status === 502) {
          setSavedFallback(true);
          return;
        }
        throw new Error(
          data?.error || "Could not book that time. Please try another.",
        );
      }
      setBookedLabel(selectedSlot.label);
    } catch (error) {
      setBookError(
        error instanceof Error && error.name === "AbortError"
          ? "Booking took too long to confirm — please try again. If it keeps happening, call us and we will book you in by phone."
          : error instanceof Error
            ? error.message
            : "Could not book that time. Please try another.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  function resetAll() {
    setBookedLabel(null);
    setBookError(null);
    setSavedFallback(false);
    setSelectedSlot(null);
    setSlots([]);
    setSlotsError(null);
    setConfirmedDate(null);
    setPendingDate(firstOpenDay);
  }

  // When a time is picked, bring the confirm button into view — on mobile
  // it can sit just below the fold and visitors thought nothing happened.
  useEffect(() => {
    if (selectedSlot) {
      confirmRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedSlot]);

  const inputClass =
    "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-turquoise focus:outline-none focus:ring-2 focus:ring-turquoise/30";
  const labelClass =
    "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500";

  // ── Success: booked ────────────────────────────────────────────────────────
  if (bookedLabel) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm md:p-12">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-turquoise/15 text-2xl">
          ✓
        </div>
        <h2 className="font-heading mt-5 text-2xl font-bold text-navy md:text-3xl">
          You&apos;re booked!
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-slate-600">
          Your free inspection is set for <strong>{bookedLabel}</strong>.
          It&apos;s on our calendar — we&apos;ll see you then. If anything
          changes, call us at {PHONE_DISPLAY}.
        </p>
        <button
          type="button"
          onClick={resetAll}
          className="mt-6 rounded-xl border border-turquoise/30 bg-turquoise/10 px-6 py-3 font-semibold text-turquoise transition hover:bg-turquoise/15"
        >
          Book another inspection
        </button>
      </div>
    );
  }

  // ── Success: calendar down, request saved by email ─────────────────────────
  if (savedFallback) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm md:p-12">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-2xl">
          ✓
        </div>
        <h2 className="font-heading mt-5 text-2xl font-bold text-navy md:text-3xl">
          Request received — we&apos;ll confirm by phone
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-slate-600">
          Our online calendar couldn&apos;t be reached just now, but your
          request is <strong>saved</strong> — our team has your details and
          your preferred time, and will call you shortly to confirm your free
          inspection. Nothing is lost. Need it faster? Call us at{" "}
          <a href={PHONE_TEL} className="font-semibold text-turquoise">
            {PHONE_DISPLAY}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={resetAll}
          className="mt-6 rounded-xl border border-turquoise/30 bg-turquoise/10 px-6 py-3 font-semibold text-turquoise transition hover:bg-turquoise/15"
        >
          Try the calendar again
        </button>
      </div>
    );
  }

  // ── Booking form ───────────────────────────────────────────────────────────
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
      <h2 className="font-heading text-2xl font-bold text-navy md:text-3xl">
        Book Your Free Inspection Online
      </h2>
      <p className="mt-2 max-w-2xl text-slate-600">
        Pick a day and time that suits you — your inspection goes straight onto
        our calendar. Monday to Saturday, 8:00 AM–5:00 PM. Sundays are by
        appointment only — please call us to arrange one.
      </p>

      {/* Step 1 — details */}
      <div className="mt-8">
        <h3 className="font-heading text-base font-bold text-navy">
          1. Your details
        </h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="bk-name">
              Full name *
            </label>
            <input
              id="bk-name"
              className={inputClass}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              autoComplete="name"
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="bk-phone">
              Phone *
            </label>
            <input
              id="bk-phone"
              className={inputClass}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(609) 555-0123"
              autoComplete="tel"
              inputMode="tel"
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="bk-city">
              Town / City *
            </label>
            <select
              id="bk-city"
              className={inputClass}
              value={city}
              onChange={(e) => setCity(e.target.value)}
              autoComplete="address-level2"
            >
              <option value="" disabled>
                Select your town
              </option>
              {SERVICE_AREA_FORM_OPTIONS.map((town) => (
                <option key={town} value={town}>
                  {town}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass} htmlFor="bk-email">
              Email (optional)
            </label>
            <input
              id="bk-email"
              className={inputClass}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              inputMode="email"
            />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="bk-address">
              Property address (optional)
            </label>
            <input
              id="bk-address"
              className={inputClass}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Street address of the property"
              autoComplete="street-address"
            />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="bk-notes">
              Anything we should know? (optional)
            </label>
            <textarea
              id="bk-notes"
              className={inputClass}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Deck damage, dock repair, timeline…"
              rows={3}
            />
          </div>
        </div>
      </div>

      {/* Step 2 — day (chips for this week + any date up to 3 months) */}
      <div className="mt-8">
        <h3 className="font-heading text-base font-bold text-navy">
          2. Pick a day
        </h3>
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
          {weekDays.map((d) => {
            const active = d.date === pendingDate;
            return (
              <button
                key={d.date}
                type="button"
                disabled={d.isSunday}
                onClick={() => setPendingDate(d.date)}
                className={
                  d.isSunday
                    ? "min-w-[64px] cursor-not-allowed rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-center text-slate-400"
                    : active
                      ? "min-w-[64px] rounded-xl border border-turquoise bg-turquoise px-3 py-2.5 text-center font-semibold text-white"
                      : "min-w-[64px] rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-center text-slate-700 transition hover:border-turquoise/50 hover:bg-turquoise/5"
                }
              >
                <span className="block text-[11px] font-semibold uppercase tracking-wide">
                  {d.weekday}
                </span>
                <span className="block text-lg font-bold leading-tight">
                  {d.dayNum}
                </span>
                <span className="block text-[11px]">
                  {d.isSunday ? "Closed" : d.month}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-3 flex flex-wrap items-end gap-3">
          <div>
            <label className={labelClass} htmlFor="bk-date">
              Or choose any date (up to 3 months ahead)
            </label>
            <input
              id="bk-date"
              type="date"
              className={`${inputClass} sm:w-64`}
              min={today}
              max={maxDate}
              value={pendingDate}
              onChange={(e) => {
                if (e.target.value) setPendingDate(e.target.value);
              }}
            />
          </div>
          <button
            type="button"
            onClick={confirmDay}
            disabled={pendingIsSunday}
            className="rounded-xl bg-gradient-to-r from-orange to-orange-light px-6 py-3 font-bold text-white shadow-md shadow-orange/20 transition hover:shadow-glow-orange disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
          >
            {confirmedDate && confirmedDate !== pendingDate
              ? "Update — show times for this day"
              : "Show available times"}
          </button>
        </div>

        {pendingIsSunday ? (
          <p className="mt-3 text-sm text-slate-500">
            Sundays are by appointment only — please call us at{" "}
            {PHONE_DISPLAY} to arrange one.
          </p>
        ) : (
          confirmedDate !== pendingDate && (
            <p className="mt-3 text-sm text-slate-500">
              Times for <strong>{prettyDate(pendingDate)}</strong> will load
              when you press the button.
            </p>
          )
        )}
      </div>

      {/* Step 3 — time (appears only after the day is confirmed) */}
      {confirmedDate && (
        <div className="mt-8">
          <h3 className="font-heading text-base font-bold text-navy">
            3. Pick a time — {prettyDate(confirmedDate)}
          </h3>

          {slotsLoading && (
            <div className="mt-4 flex items-center gap-3 text-slate-500">
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-turquoise/30 border-t-turquoise" />
              <span>Fetching available times…</span>
            </div>
          )}

          {!slotsLoading && slotsError && (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              <p>{slotsError}</p>
              <p className="mt-1">
                You can try again in a moment, call us at{" "}
                <a href={PHONE_TEL} className="font-semibold underline">
                  {PHONE_DISPLAY}
                </a>
                , or send the form below instead — your inspection request
                will still reach us.
              </p>
            </div>
          )}

          {!slotsLoading && !slotsError && slots.length === 0 && (
            <p className="mt-4 text-slate-500">
              No times left on this day — please pick another day above and
              press “Show available times”.
            </p>
          )}

          {!slotsLoading && slots.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {slots.map((slot) => {
                const active = selectedSlot?.start === slot.start;
                return (
                  <button
                    key={slot.start}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={
                      active
                        ? "rounded-xl bg-gradient-to-r from-orange to-orange-light px-4 py-2.5 font-semibold text-white shadow-md shadow-orange/20"
                        : "rounded-xl border border-turquoise/30 bg-turquoise/10 px-4 py-2.5 font-semibold text-turquoise transition hover:bg-turquoise/15"
                    }
                  >
                    {slot.label}
                  </button>
                );
              })}
            </div>
          )}

          {/* Confirm booking */}
          <div ref={confirmRef}>
            {bookError && (
              <p className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {bookError}
              </p>
            )}
            <button
              type="button"
              onClick={confirmBooking}
              disabled={!selectedSlot || !detailsValid || submitting}
              className="mt-6 w-full rounded-xl bg-gradient-to-r from-orange to-orange-light px-6 py-4 font-bold text-white shadow-md shadow-orange/20 transition hover:shadow-glow-orange disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none sm:w-auto sm:px-10"
            >
              {submitting
                ? "Booking…"
                : selectedSlot
                  ? `Confirm — ${selectedSlot.label}`
                  : "Select a time to confirm"}
            </button>
            {!detailsValid && (
              <p className="mt-3 text-sm text-slate-500">
                Name, a valid phone number and town are required so we can
                reach you about your inspection.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
