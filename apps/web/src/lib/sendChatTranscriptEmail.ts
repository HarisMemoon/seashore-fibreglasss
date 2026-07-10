import type { z } from "zod";
import type { chatTranscriptSchema } from "@/lib/chatbot/schema";
import { escapeHtml, sendEmail } from "./sendContactEmail";

type ChatTranscript = z.infer<typeof chatTranscriptSchema>;

function formatTranscriptHtml(transcript: ChatTranscript): string {
  const messagesHtml = transcript.messages
    .map((m) => {
      const isUser = m.role === "user";
      return `<div style="margin:0 0 10px;padding:10px 12px;border-radius:10px;max-width:520px;background:${
        isUser ? "#eef4fb" : "#f4f4f5"
      };">
<div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:#64748b;margin-bottom:4px;">${
        isUser ? "Visitor" : "Assistant"
      }</div>
<div style="font-size:14px;line-height:1.5;color:#111827;white-space:pre-wrap;">${escapeHtml(m.content)}</div>
</div>`;
    })
    .join("");

  const pageLine = transcript.pagePath
    ? `<p style="font-size:13px;color:#64748b;margin:0 0 14px;">Page: ${escapeHtml(transcript.pagePath)}</p>`
    : "";

  return `<div style="font-family:system-ui,sans-serif;max-width:560px;">
${pageLine}
${messagesHtml}
</div>`;
}

export async function sendChatTranscriptEmail(transcript: ChatTranscript): Promise<void> {
  const subject = `[Seashore Fiberglass] Chatbot conversation${
    transcript.pagePath ? ` — ${transcript.pagePath}` : ""
  }`;
  const html = formatTranscriptHtml(transcript);
  await sendEmail(subject, html);
}
