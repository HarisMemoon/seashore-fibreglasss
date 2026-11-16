"use client";

import { useState } from "react";
import {
  BEST_TIME_OPTIONS,
  CONTACT_FORM_MESSAGE_PLACEHOLDER,
  PHONE,
  SERVICE_AREA_FORM_OPTIONS,
  SERVICE_INQUIRY_OPTIONS,
} from "@seashore/content";
import { postContact, type PostContactError } from "@/lib/postContact";
import { StyledSelect } from "@/components/StyledSelect";

/**
 * Shared lead/contact form — ONE implementation used in both places:
 *  - Home page final-CTA section  → variant="dark",  source="home"
 *  - Contact page                 → variant="light", source="contact"
 *
 * Field rules match the server schema (@/lib/contactValidation):
 * name, phone (10–15 digits), address and city are required;
 * email, service, best time and message are optional.
 *
 * On success the Send button is removed and the success message is
 * shown in the same boxed format as error messages.
 */
type SharedContactFormProps = {
  variant: "dark" | "light";
  source: "home" | "contact";
  /** Element-id prefix, keeps ids unique per page ("lead" / "contact"). */
  idPrefix: string;
  heading: string;
  subheading: string;
  /** Optional form element id (the contact page is linked as #contact-form). */
  formId?: string;
};

export function SharedContactForm({
  variant,
  source,
  idPrefix,
  heading,
  subheading,
  formId,
}: SharedContactFormProps) {
  const dark = variant === "dark";
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [city, setCity] = useState("");
  const [service, setService] = useState("");
  const [bestTime, setBestTime] = useState("Anytime");

  const inputClass = (hasError: boolean) =>
    `w-full rounded-xl px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 transition focus:outline-none focus:ring-2 ${
      hasError
        ? "border border-red-400 bg-red-50/70 focus:border-red-400 focus:ring-red-200"
        : "border border-slate-200 bg-slate-50/85 focus:border-turquoise/50 focus:bg-white focus:ring-turquoise/20"
    }`;
  const labelClass = dark
    ? "mb-1.5 block text-sm font-medium text-slate-200"
    : "mb-1.5 block text-sm font-medium text-slate-700";
  const errorClass = dark
    ? "mt-1.5 inline-flex items-center rounded-lg border border-red-500/40 bg-red-500/15 px-2.5 py-1 text-xs font-semibold text-red-200"
    : "mt-1.5 inline-flex items-center rounded-lg border border-red-200 bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700";
  // Status messages (success / general error) use the SAME boxed format
  // as the per-field errors above — border + tinted background + padding —
  // in green for success and red for errors.
  const statusBoxClass = (kind: "success" | "error") =>
    kind === "success"
      ? dark
        ? "rounded-lg border border-emerald-500/40 bg-emerald-500/15 px-3 py-2.5 text-sm font-semibold text-emerald-200"
        : "rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-sm font-semibold text-emerald-700"
      : dark
        ? "rounded-lg border border-red-500/40 bg-red-500/15 px-3 py-2.5 text-sm font-semibold text-red-200"
        : "rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm font-semibold text-red-700";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage(null);
    setFieldErrors({});
    const form = e.currentTarget;
    const fd = new FormData(form);
    try {
      await postContact({
        name: String(fd.get("name") ?? "").trim(),
        phone: String(fd.get("phone") ?? "").trim(),
        email: String(fd.get("email") ?? "").trim() || undefined,
        address: String(fd.get("address") ?? "").trim(),
        city,
        service: service || undefined,
        bestTime: bestTime || undefined,
        message: String(fd.get("message") ?? "").trim() || undefined,
        wantsFreeInspection: fd.get("wantsFreeInspection") === "on",
        source,
      });
      setStatus("success");
      form.reset();
      setCity("");
      setService("");
      setBestTime("Anytime");
    } catch (err) {
      setStatus("error");
      const fe = (err as PostContactError).fieldErrors;
      if (fe) setFieldErrors(fe);
      setErrorMessage(
        err instanceof Error && err.message
          ? err.message
          : `Something went wrong. Please call ${PHONE} or try again.`,
      );
    }
  }

  function sendAnother() {
    setStatus("idle");
    setErrorMessage(null);
    setFieldErrors({});
  }

  const Heading = dark ? "h3" : "h2";

  return (
    <form
      id={formId}
      onSubmit={handleSubmit}
      className={
        dark
          ? "relative overflow-hidden rounded-3xl border border-slate-700/80 bg-slate-900/90 p-8 shadow-2xl shadow-black/45 ring-1 ring-slate-700/60"
          : "relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-8 shadow-lg shadow-slate-200/40"
      }
      noValidate
    >
      {dark && (
        <div
          className="absolute -right-16 -top-16 h-48 w-48 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(42,125,166,0.1) 0%, rgba(42,125,166,0) 70%)",
          }}
        />
      )}

      <Heading
        className={
          dark
            ? "relative font-heading text-xl font-bold text-white"
            : "font-heading text-xl font-bold text-navy"
        }
      >
        {heading}
      </Heading>
      <p
        className={
          dark
            ? "relative mt-1.5 text-sm text-slate-300"
            : "mt-1 text-sm text-slate-500"
        }
      >
        {subheading}
      </p>

      <div className={dark ? "relative mt-7 space-y-4" : "mt-8 space-y-5"}>
        <div>
          <label htmlFor={`${idPrefix}-name`} className={labelClass}>
            Full name <span className="text-orange">*</span>
          </label>
          <input
            id={`${idPrefix}-name`}
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder={dark ? "Your full name" : undefined}
            aria-invalid={fieldErrors.name ? true : undefined}
            className={inputClass(Boolean(fieldErrors.name))}
          />
          {fieldErrors.name && <p className={errorClass}>{fieldErrors.name}</p>}
        </div>
        <div>
          <label htmlFor={`${idPrefix}-phone`} className={labelClass}>
            Phone number <span className="text-orange">*</span>
          </label>
          <input
            id={`${idPrefix}-phone`}
            name="phone"
            type="tel"
            required
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
          <label htmlFor={`${idPrefix}-email`} className={labelClass}>
            Email address
          </label>
          <input
            id={`${idPrefix}-email`}
            name="email"
            type="email"
            autoComplete="email"
            placeholder={dark ? "you@example.com" : undefined}
            aria-invalid={fieldErrors.email ? true : undefined}
            className={inputClass(Boolean(fieldErrors.email))}
          />
          {fieldErrors.email && (
            <p className={errorClass}>{fieldErrors.email}</p>
          )}
        </div>
        <div>
          <label htmlFor={`${idPrefix}-address`} className={labelClass}>
            Project address <span className="text-orange">*</span>
          </label>
          <input
            id={`${idPrefix}-address`}
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
          <label htmlFor={`${idPrefix}-city`} className={labelClass}>
            City / area <span className="text-orange">*</span>
          </label>
          <StyledSelect
            id={`${idPrefix}-city`}
            name="city"
            value={city}
            options={SERVICE_AREA_FORM_OPTIONS}
            onChange={setCity}
            placeholder="Select your town"
            required
            invalid={Boolean(fieldErrors.city)}
            theme={dark ? "dark" : "light"}
          />
          {fieldErrors.city && <p className={errorClass}>{fieldErrors.city}</p>}
        </div>
        <div>
          <label htmlFor={`${idPrefix}-service`} className={labelClass}>
            Service you need
          </label>
          <StyledSelect
            id={`${idPrefix}-service`}
            name="service"
            value={service}
            options={SERVICE_INQUIRY_OPTIONS}
            onChange={setService}
            placeholder="Select a service"
            invalid={Boolean(fieldErrors.service)}
            theme={dark ? "dark" : "light"}
          />
          {fieldErrors.service && (
            <p className={errorClass}>{fieldErrors.service}</p>
          )}
        </div>
        <div>
          <label htmlFor={`${idPrefix}-best`} className={labelClass}>
            Best time to contact
          </label>
          <StyledSelect
            id={`${idPrefix}-best`}
            name="bestTime"
            value={bestTime}
            options={BEST_TIME_OPTIONS}
            onChange={setBestTime}
            invalid={Boolean(fieldErrors.bestTime)}
            theme={dark ? "dark" : "light"}
          />
          {fieldErrors.bestTime && (
            <p className={errorClass}>{fieldErrors.bestTime}</p>
          )}
        </div>
        <div>
          <label htmlFor={`${idPrefix}-message`} className={labelClass}>
            Message / project details
          </label>
          <textarea
            id={`${idPrefix}-message`}
            name="message"
            rows={dark ? 4 : 5}
            placeholder={CONTACT_FORM_MESSAGE_PLACEHOLDER}
            aria-invalid={fieldErrors.message ? true : undefined}
            className={inputClass(Boolean(fieldErrors.message))}
          />
          {fieldErrors.message && (
            <p className={errorClass}>{fieldErrors.message}</p>
          )}
        </div>
        <label
          className={
            dark
              ? "group flex cursor-pointer items-start gap-3 rounded-xl border border-slate-300 bg-gradient-to-b from-slate-100 to-slate-200 px-4 py-3 transition hover:border-turquoise/40 hover:from-white hover:to-slate-100"
              : "group flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 transition hover:border-turquoise/40 hover:bg-white"
          }
        >
          <input
            name="wantsFreeInspection"
            type="checkbox"
            defaultChecked
            className={
              dark
                ? "mt-0.5 h-5 w-5 rounded-md border-slate-400 text-turquoise shadow-sm focus:ring-2 focus:ring-turquoise/40"
                : "mt-0.5 h-5 w-5 rounded-md border-slate-300 text-turquoise shadow-sm focus:ring-2 focus:ring-turquoise/40"
            }
          />
          <span className="text-sm font-medium text-slate-700 transition group-hover:text-slate-900">
            Yes — I&apos;d like a free inspection &amp; quote
          </span>
        </label>

        {status === "error" &&
          errorMessage &&
          Object.keys(fieldErrors).length === 0 && (
            <p className={statusBoxClass("error")} role="alert">
              {errorMessage}
            </p>
          )}
        {status === "success" && (
          <>
            <p className={statusBoxClass("success")} role="status">
              Thanks — we received your request and will reach out shortly.
            </p>
            <button
              type="button"
              onClick={sendAnother}
              className={
                dark
                  ? "text-sm font-semibold text-slate-300 underline underline-offset-4 transition hover:text-white"
                  : "text-sm font-semibold text-slate-500 underline underline-offset-4 transition hover:text-navy"
              }
            >
              Send another message
            </button>
          </>
        )}

        {status !== "success" && (
          <button
            type="submit"
            disabled={status === "loading"}
            className="group flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-orange to-orange-light px-6 py-4 font-bold text-white shadow-lg shadow-orange/25 transition enabled:hover:shadow-glow-orange enabled:active:shadow-glow-orange disabled:opacity-60"
          >
            {status === "loading"
              ? "Sending…"
              : "Send Message & Get My Free Quote"}
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden
            >
              <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
            </svg>
          </button>
        )}
      </div>
    </form>
  );
}
