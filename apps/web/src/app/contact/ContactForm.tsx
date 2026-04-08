"use client";

import { useState } from "react";
import {
  BEST_TIME_OPTIONS,
  CONTACT_FORM_MESSAGE_PLACEHOLDER,
  SERVICE_AREA_FORM_OPTIONS,
} from "@seashore/content";
import { postContact, type PostContactError } from "@/lib/postContact";
import { StyledSelect } from "@/components/StyledSelect";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [city, setCity] = useState("");
  const [bestTime, setBestTime] = useState("Anytime");
  const inputClass = (hasError: boolean) =>
    `w-full rounded-xl px-4 py-3.5 text-sm text-slate-900 transition focus:outline-none focus:ring-2 ${
      hasError
        ? "border border-red-400 bg-red-50/60 focus:border-red-400 focus:ring-red-200"
        : "border border-slate-200 bg-slate-50/80 focus:border-turquoise/50 focus:bg-white focus:ring-turquoise/20"
    }`;
  const errorClass =
    "mt-1.5 inline-flex items-center rounded-lg border border-red-200 bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage(null);
    setFieldErrors({});
    const form = e.currentTarget;
    const fd = new FormData(form);

    const wantsFreeInspection = fd.get("wantsFreeInspection") === "on";

    try {
      await postContact({
        name: String(fd.get("name") ?? "").trim(),
        phone: String(fd.get("phone") ?? "").trim() || undefined,
        email: String(fd.get("email") ?? "").trim(),
        address: String(fd.get("address") ?? "").trim(),
        city,
        bestTime: bestTime || undefined,
        message: String(fd.get("message") ?? "").trim() || undefined,
        wantsFreeInspection,
        source: "contact",
      });
      setStatus("success");
      form.reset();
      setCity("");
      setBestTime("Anytime");
    } catch (err) {
      setStatus("error");
      const fe = (err as PostContactError).fieldErrors;
      if (fe) setFieldErrors(fe);
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <form
      id="contact-form"
      onSubmit={handleSubmit}
      className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-8 shadow-lg shadow-slate-200/40"
      noValidate
    >
      <h2 className="font-heading text-xl font-bold text-navy">Send a message</h2>
      <p className="mt-1 text-sm text-slate-500">We reply the same day or next morning.</p>

      <div className="mt-8 space-y-5">
        <div>
          <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-slate-700">
            Full name <span className="text-orange">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            aria-invalid={fieldErrors.name ? true : undefined}
            className={inputClass(Boolean(fieldErrors.name))}
          />
          {fieldErrors.name && (
            <p className={errorClass}>{fieldErrors.name}</p>
          )}
        </div>
        <div>
          <label htmlFor="contact-phone" className="mb-1.5 block text-sm font-medium text-slate-700">
            Phone number
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="(609) 338-4505"
            aria-invalid={fieldErrors.phone ? true : undefined}
            className={inputClass(Boolean(fieldErrors.phone))}
          />
          {fieldErrors.phone && (
            <p className={errorClass}>{fieldErrors.phone}</p>
          )}
        </div>
        <div>
          <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-slate-700">
            Email address <span className="text-orange">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            aria-invalid={fieldErrors.email ? true : undefined}
            className={inputClass(Boolean(fieldErrors.email))}
          />
          {fieldErrors.email && (
            <p className={errorClass}>{fieldErrors.email}</p>
          )}
        </div>
        <div>
          <label htmlFor="contact-address" className="mb-1.5 block text-sm font-medium text-slate-700">
            Project address <span className="text-orange">*</span>
          </label>
          <input
            id="contact-address"
            name="address"
            type="text"
            required
            autoComplete="street-address"
            placeholder="Street address"
            aria-invalid={fieldErrors.address ? true : undefined}
            className={inputClass(Boolean(fieldErrors.address))}
          />
          {fieldErrors.address && (
            <p className={errorClass}>{fieldErrors.address}</p>
          )}
        </div>
        <div>
          <label htmlFor="contact-city" className="mb-1.5 block text-sm font-medium text-slate-700">
            City / area <span className="text-orange">*</span>
          </label>
          <StyledSelect
            id="contact-city"
            name="city"
            value={city}
            options={SERVICE_AREA_FORM_OPTIONS}
            onChange={setCity}
            placeholder="Select your town"
            required
            invalid={Boolean(fieldErrors.city)}
          />
          {fieldErrors.city && (
            <p className={errorClass}>{fieldErrors.city}</p>
          )}
        </div>
        <div>
          <label htmlFor="contact-best" className="mb-1.5 block text-sm font-medium text-slate-700">
            Best time to contact
          </label>
          <StyledSelect
            id="contact-best"
            name="bestTime"
            value={bestTime}
            options={BEST_TIME_OPTIONS}
            onChange={setBestTime}
            invalid={Boolean(fieldErrors.bestTime)}
          />
          {fieldErrors.bestTime && (
            <p className={errorClass}>{fieldErrors.bestTime}</p>
          )}
        </div>
        <div>
          <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-slate-700">
            Message / project details
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            placeholder={CONTACT_FORM_MESSAGE_PLACEHOLDER}
            aria-invalid={fieldErrors.message ? true : undefined}
            className={inputClass(Boolean(fieldErrors.message))}
          />
          {fieldErrors.message && (
            <p className={errorClass}>{fieldErrors.message}</p>
          )}
        </div>
        <label className="group flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 transition hover:border-turquoise/40 hover:bg-white">
          <input
            name="wantsFreeInspection"
            type="checkbox"
            defaultChecked
            className="mt-0.5 h-5 w-5 rounded-md border-slate-300 text-turquoise shadow-sm focus:ring-2 focus:ring-turquoise/40"
          />
          <span className="text-sm font-medium text-slate-700 transition group-hover:text-slate-900">
            Yes — I&apos;d like a free inspection &amp; quote
          </span>
        </label>

        {status === "error" && errorMessage && Object.keys(fieldErrors).length === 0 && (
          <p className="text-sm font-medium text-red-600" role="alert">
            {errorMessage}
          </p>
        )}
        {status === "success" && (
          <p className="text-sm font-medium text-emerald-700" role="status">
            Thanks — your message was sent. We&apos;ll be in touch shortly.
          </p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="group flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-orange to-orange-light px-6 py-4 font-bold text-white shadow-lg shadow-orange/25 transition enabled:hover:shadow-glow-orange disabled:opacity-60"
        >
          {status === "loading" ? "Sending…" : "Send Message & Get My Free Quote"}
          <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
            <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
          </svg>
        </button>
      </div>
    </form>
  );
}
