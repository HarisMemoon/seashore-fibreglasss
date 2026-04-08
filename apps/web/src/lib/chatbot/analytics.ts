"use client";

type ChatbotAnalyticsEvent =
  | "open"
  | "first_message"
  | "message_sent"
  | "response_received"
  | "routed_click"
  | "quote_started"
  | "quote_submitted"
  | "handoff_to_call";

export function trackChatbotEvent(event: ChatbotAnalyticsEvent, payload?: {
  pagePath?: string;
  label?: string;
  meta?: Record<string, string>;
}) {
  const body = JSON.stringify({
    event,
    pagePath: payload?.pagePath,
    label: payload?.label,
    meta: payload?.meta,
  });

  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: "application/json" });
      navigator.sendBeacon("/api/chat/analytics", blob);
      return;
    }
  } catch {
    // Fall through to fetch.
  }

  void fetch("/api/chat/analytics", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {
    // Analytics failures should not block the UI.
  });
}
