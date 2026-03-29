import nodemailer from "nodemailer";
import type { ContactSubmission } from "@seashore/types";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatSubmissionHtml(s: ContactSubmission): string {
  const rows: [string, string][] = [
    ["Name", s.name],
    ["Phone", s.phone],
    ["Email", s.email ?? "—"],
    ["City / area", s.city ?? "—"],
    ["Best time", s.bestTime ?? "—"],
    ["Message", s.message ?? "—"],
    [
      "Free inspection",
      s.wantsFreeInspection === true ? "Yes" : s.wantsFreeInspection === false ? "No" : "—",
    ],
    ["Source", s.source],
  ];
  return `<table style="border-collapse:collapse;font-family:system-ui,sans-serif;font-size:14px;max-width:560px;">
${rows
  .map(
    ([k, v]) =>
      `<tr><td style="padding:8px 12px 8px 0;border-bottom:1px solid #e5e7eb;font-weight:600;vertical-align:top;">${escapeHtml(k)}</td><td style="padding:8px 0;border-bottom:1px solid #e5e7eb;">${escapeHtml(v)}</td></tr>`
  )
  .join("")}
</table>`;
}

/** True when outbound email can be attempted (recipient + transport). */
export function isEmailDeliveryConfigured(): boolean {
  const to = process.env.CONTACT_EMAIL_TO?.trim();
  if (!to) return false;
  if (process.env.RESEND_API_KEY?.trim()) return true;
  const host = process.env.SMTP_HOST?.trim();
  const from = process.env.CONTACT_EMAIL_FROM?.trim();
  return Boolean(host && from);
}

export async function sendContactEmail(submission: ContactSubmission): Promise<void> {
  const to = process.env.CONTACT_EMAIL_TO?.trim();
  if (!to) {
    throw new Error("CONTACT_EMAIL_TO is missing");
  }

  const subject = `[Seashore Fiberglass] Lead (${submission.source}) — ${submission.name}`;
  const html = formatSubmissionHtml(submission);

  const resendKey = process.env.RESEND_API_KEY?.trim();
  if (resendKey) {
    const from =
      process.env.CONTACT_EMAIL_FROM?.trim() ?? "Seashore Fiberglass <onboarding@resend.dev>";
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        html,
      }),
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Resend error ${res.status}: ${text}`);
    }
    return;
  }

  const host = process.env.SMTP_HOST?.trim();
  const from = process.env.CONTACT_EMAIL_FROM?.trim();
  if (host && from) {
    const port = Number(process.env.SMTP_PORT ?? "587");
    const secure = process.env.SMTP_SECURE === "true";
    const user = process.env.SMTP_USER?.trim();
    const pass = process.env.SMTP_PASS;
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: user && pass ? { user, pass } : undefined,
    });
    await transporter.sendMail({ from, to, subject, html });
    return;
  }

  throw new Error("Email transport is not configured");
}
