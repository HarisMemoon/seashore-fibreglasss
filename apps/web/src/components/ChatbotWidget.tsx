"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Dispatch, SetStateAction } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  BEST_TIME_OPTIONS,
  SERVICE_AREA_FORM_OPTIONS,
} from "@seashore/content";
import type {
  ChatbotConfidence,
  ChatbotLeadCapturePrompt,
  ChatbotLeadDraft,
  ChatbotLink,
  ChatbotMessage,
  ChatbotResponse,
} from "@seashore/types";
import { StyledSelect } from "@/components/StyledSelect";
import { postContact, type PostContactError } from "@/lib/postContact";
import { trackChatbotEvent } from "@/lib/chatbot/analytics";
import {
  CHATBOT_CONTACT_METHOD_OPTIONS,
  CHATBOT_NAME,
  CHATBOT_PHONE_DIGITS,
  CHATBOT_QUOTE_ISSUE_TYPES,
  CHATBOT_STARTER_PROMPTS,
  CHATBOT_URGENCY_OPTIONS,
  CHATBOT_WELCOME_MESSAGE,
} from "@/lib/chatbot/content";

type UiMessage = ChatbotMessage & {
  id: string;
  confidence?: ChatbotConfidence;
  recommendedLinks?: readonly ChatbotLink[];
  quickReplies?: readonly string[];
  leadCapture?: ChatbotLeadCapturePrompt;
  requiresHumanFollowup?: boolean;
};

function cleanBrokenEncoding(input: string): string {
  return input
    // Common mojibake fragments seen from mixed UTF-8/Windows-1252 decoding
    .replace(/â€”/g, "-")
    .replace(/â€“/g, "-")
    .replace(/â€˜|â€™/g, "'")
    .replace(/â€œ|â€/g, '"')
    .replace(/Â·/g, "·")
    .replace(/Â/g, "")
    // Normalize fancy punctuation to ASCII for consistency
    .replace(/[—–]/g, "-")
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\s{2,}/g, " ")
    .trim();
}

type QuoteFormState = {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  bestTime: string;
  issueType: string;
  urgency: string;
  preferredContactMethod: "Call" | "Text" | "Email";
  summary: string;
};

const INITIAL_QUOTE_FORM: QuoteFormState = {
  name: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  bestTime: "Anytime",
  issueType: "",
  urgency: "Within 2 weeks",
  preferredContactMethod: "Call",
  summary: "",
};

const WELCOME_MESSAGE: UiMessage = {
  id: "welcome",
  role: "assistant",
  content: CHATBOT_WELCOME_MESSAGE,
  confidence: "high",
  quickReplies: CHATBOT_STARTER_PROMPTS,
};

function nextMessageId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function seedQuoteForm(
  current: QuoteFormState,
  draft: ChatbotLeadDraft | undefined,
  prompt: ChatbotLeadCapturePrompt | undefined
): QuoteFormState {
  const next = { ...current };
  if (!next.city && (draft?.city || prompt?.suggestedCity)) {
    next.city = draft?.city || prompt?.suggestedCity || "";
  }
  if (!next.issueType && (draft?.issueType || prompt?.suggestedIssueType)) {
    next.issueType = draft?.issueType || prompt?.suggestedIssueType || "";
  }
  if (!next.summary && draft?.summary) {
    next.summary = draft.summary;
  }
  if (!next.preferredContactMethod && draft?.preferredContactMethod) {
    next.preferredContactMethod = draft.preferredContactMethod;
  }
  return next;
}

function QuotePill({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-2 text-xs font-semibold transition ${
        active
          ? "border-turquoise bg-turquoise/20 text-white"
          : "border-white/10 bg-white/[0.04] text-white/70 hover:border-white/20 hover:text-white"
      }`}
    >
      {label}
    </button>
  );
}

function QuoteRequestCard({
  form,
  setForm,
  submitting,
  submitError,
  fieldErrors,
  onSubmit,
  onCancel,
}: {
  form: QuoteFormState;
  setForm: Dispatch<SetStateAction<QuoteFormState>>;
  submitting: boolean;
  submitError: string | null;
  fieldErrors: Record<string, string>;
  onSubmit: () => void;
  onCancel: () => void;
}) {
  const inputClass = (hasError: boolean) =>
    `w-full rounded-xl border px-3.5 py-3 text-sm text-white placeholder:text-white/35 transition focus:outline-none focus:ring-2 ${
      hasError
        ? "border-red-400 bg-red-500/10 focus:ring-red-300/30"
        : "border-white/10 bg-white/[0.04] focus:border-turquoise/60 focus:ring-turquoise/20"
    }`;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-2xl shadow-black/20 backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-heading text-sm font-bold text-white">Free quote request</h3>
          <p className="mt-1 text-xs leading-relaxed text-white/60">
            Guided for speed: tell us the issue, town, and best contact details.
          </p>
        </div>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] font-semibold text-white/55 transition hover:text-white"
        >
          Hide
        </button>
      </div>

      <div className="mt-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-turquoise/90">
          Issue type
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {CHATBOT_QUOTE_ISSUE_TYPES.map((issue) => (
            <QuotePill
              key={issue}
              label={issue}
              active={form.issueType === issue}
              onClick={() => setForm((current) => ({ ...current, issueType: issue }))}
            />
          ))}
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/55">
            Full name
          </label>
          <input
            value={form.name}
            onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
            className={inputClass(Boolean(fieldErrors.name))}
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/55">
            Phone
          </label>
          <input
            value={form.phone}
            onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
            className={inputClass(Boolean(fieldErrors.phone))}
            placeholder="(609) 338-4505"
          />
        </div>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/55">
            Email
          </label>
          <input
            value={form.email}
            onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
            className={inputClass(Boolean(fieldErrors.email))}
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/55">
            Project address
          </label>
          <input
            value={form.address}
            onChange={(event) => setForm((current) => ({ ...current, address: event.target.value }))}
            className={inputClass(Boolean(fieldErrors.address))}
            placeholder="Street address"
          />
        </div>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/55">
            City / area
          </label>
          <StyledSelect
            id="chatbot-city"
            name="chatbotCity"
            value={form.city}
            options={SERVICE_AREA_FORM_OPTIONS}
            onChange={(value) => setForm((current) => ({ ...current, city: value }))}
            placeholder="Select your town"
            required
            invalid={Boolean(fieldErrors.city)}
            theme="dark"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/55">
            Best time
          </label>
          <StyledSelect
            id="chatbot-best-time"
            name="chatbotBestTime"
            value={form.bestTime}
            options={BEST_TIME_OPTIONS}
            onChange={(value) => setForm((current) => ({ ...current, bestTime: value }))}
            invalid={Boolean(fieldErrors.bestTime)}
            theme="dark"
          />
        </div>
      </div>

      <div className="mt-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-turquoise/90">
          Preferred contact method
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {CHATBOT_CONTACT_METHOD_OPTIONS.map((method) => (
            <QuotePill
              key={method}
              label={method}
              active={form.preferredContactMethod === method}
              onClick={() =>
                setForm((current) => ({
                  ...current,
                  preferredContactMethod: method,
                }))
              }
            />
          ))}
        </div>
      </div>

      <div className="mt-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-turquoise/90">
          Timeline
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {CHATBOT_URGENCY_OPTIONS.map((option) => (
            <QuotePill
              key={option}
              label={option}
              active={form.urgency === option}
              onClick={() => setForm((current) => ({ ...current, urgency: option }))}
            />
          ))}
        </div>
      </div>

      <div className="mt-4">
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/55">
          Project notes
        </label>
        <textarea
          rows={4}
          value={form.summary}
          onChange={(event) => setForm((current) => ({ ...current, summary: event.target.value }))}
          className={inputClass(Boolean(fieldErrors.message))}
          placeholder="Tell us what is happening with the deck, where the problem shows up, and anything time-sensitive."
        />
      </div>

      {submitError && (
        <p className="mt-3 rounded-xl border border-red-400/30 bg-red-500/10 px-3 py-2 text-xs font-medium text-red-100">
          {submitError}
        </p>
      )}

      <button
        type="button"
        onClick={onSubmit}
        disabled={submitting}
        className="mt-4 flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-orange to-orange-light px-4 py-3 font-semibold text-white shadow-lg shadow-orange/20 transition enabled:hover:shadow-glow-orange disabled:opacity-60"
      >
        {submitting ? "Sending quote request..." : "Send Free Quote Request"}
      </button>
    </div>
  );
}

export function ChatbotWidget() {
  const pathname = usePathname();
  const scrollRef = useRef<HTMLDivElement>(null);
  const firstUserMessageRef = useRef(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hasTrackedOpen, setHasTrackedOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteSubmitting, setQuoteSubmitting] = useState(false);
  const [quoteSubmitError, setQuoteSubmitError] = useState<string | null>(null);
  const [quoteFieldErrors, setQuoteFieldErrors] = useState<Record<string, string>>({});
  const [quoteForm, setQuoteForm] = useState<QuoteFormState>(INITIAL_QUOTE_FORM);
  const [leadDraft, setLeadDraft] = useState<ChatbotLeadDraft>({});
  const [messages, setMessages] = useState<UiMessage[]>([WELCOME_MESSAGE]);

  useEffect(() => {
    if (!isOpen || hasTrackedOpen) return;
    trackChatbotEvent("open", { pagePath: pathname });
    setHasTrackedOpen(true);
  }, [hasTrackedOpen, isOpen, pathname]);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;
    element.scrollTop = element.scrollHeight;
  }, [messages, quoteOpen]);

  const latestAssistantMessage = useMemo(
    () => [...messages].reverse().find((message) => message.role === "assistant"),
    [messages]
  );

  async function requestAssistantReply(message: string, openQuoteOnReply = false) {
    const trimmedMessage = message.trim();
    if (!trimmedMessage || isSending) return;

    const userMessage: UiMessage = {
      id: nextMessageId(),
      role: "user",
      content: trimmedMessage,
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setIsSending(true);
    trackChatbotEvent("message_sent", { pagePath: pathname, label: trimmedMessage });

    if (!firstUserMessageRef.current) {
      firstUserMessageRef.current = true;
      trackChatbotEvent("first_message", { pagePath: pathname });
    }

    try {
      const history = [...messages, userMessage]
        .map(({ role, content }) => ({ role, content }))
        .slice(-12);
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmedMessage,
          history,
          pagePath: pathname,
          leadDraft,
        }),
      });

      const data = (await response.json().catch(() => null)) as
        | { ok?: boolean; error?: string; reply?: ChatbotResponse }
        | null;

      if (!response.ok || !data?.ok || !data.reply) {
        throw new Error(data?.error || "Chatbot request failed.");
      }

      const reply = data.reply;

      const assistantMessage: UiMessage = {
        id: nextMessageId(),
        role: "assistant",
        content: cleanBrokenEncoding(reply.answer),
        confidence: reply.confidence,
        recommendedLinks: reply.recommendedLinks,
        quickReplies: reply.quickReplies,
        leadCapture: reply.leadCapture,
        requiresHumanFollowup: reply.requiresHumanFollowup,
      };

      setMessages((current) => [...current, assistantMessage]);
      trackChatbotEvent("response_received", {
        pagePath: pathname,
        label: reply.intent,
        meta: {
          confidence: reply.confidence,
        },
      });

      if (reply.leadCapture) {
        setLeadDraft((current) => ({
          ...current,
          issueType: current.issueType || reply.leadCapture?.suggestedIssueType,
          serviceSlug: current.serviceSlug || reply.leadCapture?.suggestedServiceSlug,
          city: current.city || reply.leadCapture?.suggestedCity,
        }));
        setQuoteForm((current) => seedQuoteForm(current, leadDraft, reply.leadCapture));
      }

      if (openQuoteOnReply || reply.intent === "quote-request") {
        setQuoteOpen(true);
        setQuoteForm((current) => seedQuoteForm(current, leadDraft, reply.leadCapture));
      }
    } catch (error) {
      const messageText =
        error instanceof Error
          ? error.message
          : "I had trouble answering that. Please try again or use the contact page.";

      setMessages((current) => [
        ...current,
        {
          id: nextMessageId(),
          role: "assistant",
          content: cleanBrokenEncoding(messageText),
          confidence: "low",
          recommendedLinks: [{ label: "Contact page", href: "/contact", kind: "contact" }],
          quickReplies: CHATBOT_STARTER_PROMPTS,
          requiresHumanFollowup: true,
        },
      ]);
    } finally {
      setIsSending(false);
    }
  }

  async function submitQuoteRequest() {
    setQuoteSubmitting(true);
    setQuoteSubmitError(null);
    setQuoteFieldErrors({});

    const messageParts = [
      quoteForm.issueType ? `Issue type: ${quoteForm.issueType}` : undefined,
      quoteForm.urgency ? `Timeline: ${quoteForm.urgency}` : undefined,
      quoteForm.preferredContactMethod
        ? `Preferred contact method: ${quoteForm.preferredContactMethod}`
        : undefined,
      quoteForm.summary ? `Project notes: ${quoteForm.summary}` : undefined,
    ].filter(Boolean);

    try {
      await postContact({
        name: quoteForm.name.trim(),
        phone: quoteForm.phone.trim() || undefined,
        email: quoteForm.email.trim(),
        address: quoteForm.address.trim(),
        city: quoteForm.city,
        bestTime: quoteForm.bestTime || undefined,
        message: messageParts.join("\n"),
        wantsFreeInspection: true,
        source: "chatbot",
      });

      trackChatbotEvent("quote_submitted", {
        pagePath: pathname,
        label: quoteForm.issueType || "unknown",
        meta: {
          city: quoteForm.city || "unknown",
          method: quoteForm.preferredContactMethod,
        },
      });

      setQuoteOpen(false);
      setLeadDraft({
        issueType: quoteForm.issueType,
        city: quoteForm.city,
        urgency: quoteForm.urgency,
        preferredContactMethod: quoteForm.preferredContactMethod,
        summary: quoteForm.summary,
      });
      setQuoteForm(INITIAL_QUOTE_FORM);
      setMessages((current) => [
        ...current,
        {
          id: nextMessageId(),
          role: "assistant",
          content: cleanBrokenEncoding(
            "Your quote request is in. The team will follow up shortly, usually the same day or next morning."
          ),
          confidence: "high",
          recommendedLinks: [{ label: "Contact page", href: "/contact", kind: "contact" }],
          quickReplies: ["What service do I need?", "Do you serve my town?"],
        },
      ]);
    } catch (error) {
      const typedError = error as PostContactError;
      if (typedError.fieldErrors) {
        setQuoteFieldErrors(typedError.fieldErrors);
      }
      setQuoteSubmitError(
        error instanceof Error
          ? error.message
          : "We could not send your quote request. Please try again shortly."
      );
    } finally {
      setQuoteSubmitting(false);
    }
  }

  function onQuickReplyClick(prompt: string) {
    if (prompt === "Start my free quote") {
      if (!quoteOpen) {
        trackChatbotEvent("quote_started", { pagePath: pathname, label: "quick-reply" });
      }
      void requestAssistantReply(prompt, true);
      return;
    }
    void requestAssistantReply(prompt);
  }

  function onLinkClick(link: ChatbotLink) {
    if (link.kind === "phone") {
      trackChatbotEvent("handoff_to_call", { pagePath: pathname, label: link.label });
      return;
    }
    trackChatbotEvent("routed_click", {
      pagePath: pathname,
      label: link.href,
      meta: { kind: link.kind },
    });
  }

  return (
    <div
      className="fixed bottom-2 right-4 z-[9999] flex flex-col items-end gap-3 sm:bottom-4 sm:right-6"
      style={{ zIndex: 2147483000 }}
    >
      {isOpen && (
        <div className="flex h-[min(42rem,calc(100dvh-6rem))] max-h-[calc(100dvh-6rem)] w-[min(26rem,calc(100vw-1rem))] flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[#071321]/95 shadow-2xl shadow-black/50 backdrop-blur-2xl">
          <div className="relative overflow-hidden border-b border-white/10 px-5 pb-4 pt-5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(42,125,166,0.3),_transparent_42%),linear-gradient(135deg,_rgba(27,58,92,0.96),_rgba(7,19,33,0.92))]" />
            <div className="absolute -right-10 top-0 h-28 w-28 rounded-full bg-orange/20 blur-3xl" />
            <div className="relative flex items-start justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-turquoise/20 bg-turquoise/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-turquoise">
                  Guided Assistant
                </div>
                <h2 className="font-heading mt-3 text-lg font-bold text-white">{CHATBOT_NAME}</h2>
                <p className="mt-1 max-w-xs text-sm leading-relaxed text-white/65">
                  Ask about services, towns, leak symptoms, or start a free quote.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full border border-white/10 bg-white/5 p-2 text-white/60 transition hover:text-white"
                aria-label="Close chatbot"
              >
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                  <path
                    fillRule="evenodd"
                    d="M4.22 4.22a.75.75 0 011.06 0L10 8.94l4.72-4.72a.75.75 0 111.06 1.06L11.06 10l4.72 4.72a.75.75 0 11-1.06 1.06L10 11.06l-4.72 4.72a.75.75 0 01-1.06-1.06L8.94 10 4.22 5.28a.75.75 0 010-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
            <div className="space-y-3">
              {messages.map((message) => {
                const isAssistant = message.role === "assistant";
                return (
                  <div
                    key={message.id}
                    className={`flex ${isAssistant ? "justify-start" : "justify-end"}`}
                  >
                    <div
                      className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-lg ${
                        isAssistant
                          ? "border border-white/10 bg-white/[0.05] text-white"
                          : "bg-gradient-to-r from-turquoise to-[#3a9dc6] text-white"
                      }`}
                    >
                      {isAssistant && message.confidence && (
                        <div className="mb-2 inline-flex rounded-full border border-white/10 bg-white/[0.04] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/45">
                          {message.confidence} confidence
                        </div>
                      )}
                      <p>{message.content}</p>

                      {message.recommendedLinks && message.recommendedLinks.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {message.recommendedLinks.map((link) =>
                            link.href.startsWith("tel:") ? (
                              <a
                                key={`${message.id}-${link.href}`}
                                href={link.href}
                                onClick={() => onLinkClick(link)}
                                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-white/85 transition hover:border-turquoise/40 hover:text-white"
                              >
                                {link.label}
                              </a>
                            ) : (
                              <Link
                                key={`${message.id}-${link.href}`}
                                href={link.href}
                                onClick={() => onLinkClick(link)}
                                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-white/85 transition hover:border-turquoise/40 hover:text-white"
                              >
                                {link.label}
                              </Link>
                            )
                          )}
                        </div>
                      )}

                      {message.requiresHumanFollowup && (
                        <p className="mt-3 text-xs text-white/55">
                          Need a direct handoff? Call or text{" "}
                          <a
                            href={`tel:+1${CHATBOT_PHONE_DIGITS}`}
                            onClick={() =>
                              trackChatbotEvent("handoff_to_call", {
                                pagePath: pathname,
                                label: "assistant-inline",
                              })
                            }
                            className="font-semibold text-turquoise"
                          >
                            (609) 338-4505
                          </a>
                          .
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}

              {quoteOpen && (
                <QuoteRequestCard
                  form={quoteForm}
                  setForm={setQuoteForm}
                  submitting={quoteSubmitting}
                  submitError={quoteSubmitError}
                  fieldErrors={quoteFieldErrors}
                  onSubmit={submitQuoteRequest}
                  onCancel={() => setQuoteOpen(false)}
                />
              )}

              {isSending && (
                <div className="flex justify-start">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white/65">
                    Thinking...
                  </div>
                </div>
              )}
            </div>
          </div>

          {latestAssistantMessage?.quickReplies && latestAssistantMessage.quickReplies.length > 0 && (
            <div className="border-t border-white/10 px-4 py-3">
              <div className="flex flex-wrap gap-2">
                {latestAssistantMessage.quickReplies.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => onQuickReplyClick(prompt)}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-white/80 transition hover:border-turquoise/40 hover:text-white"
                  >
                    {prompt}
                  </button>
                ))}
                {!quoteOpen && latestAssistantMessage.leadCapture && (
                  <button
                    type="button"
                    onClick={() => {
                      trackChatbotEvent("quote_started", {
                        pagePath: pathname,
                        label: "assistant-cta",
                      });
                      setQuoteOpen(true);
                      setQuoteSubmitError(null);
                      setQuoteFieldErrors({});
                      setQuoteForm((current) =>
                        seedQuoteForm(current, leadDraft, latestAssistantMessage.leadCapture)
                      );
                    }}
                    className="rounded-full bg-gradient-to-r from-orange to-orange-light px-3 py-1.5 text-xs font-semibold text-white"
                  >
                    Start my free quote
                  </button>
                )}
              </div>
            </div>
          )}

          <form
            onSubmit={(event) => {
              event.preventDefault();
              void requestAssistantReply(input);
            }}
            className="border-t border-white/10 px-4 py-4"
          >
            <div className="flex items-end gap-2">
              <div className="flex-1 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2 focus-within:border-turquoise/50">
                <label htmlFor="chatbot-input" className="sr-only">
                  Ask the chatbot
                </label>
                <textarea
                  id="chatbot-input"
                  rows={1}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask about service, town, or quote..."
                  className="max-h-28 min-h-[28px] w-full resize-none overflow-hidden bg-transparent text-sm text-white placeholder:text-white/35 focus:outline-none"
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      void requestAssistantReply(input);
                    }
                  }}
                />
              </div>
              <button
                type="submit"
                disabled={isSending || !input.trim()}
                className="rounded-2xl bg-gradient-to-r from-turquoise to-[#3a9dc6] px-4 py-3 font-semibold text-white shadow-lg shadow-turquoise/20 transition disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="group relative flex items-center gap-3 rounded-full border border-turquoise/20 bg-[#071321]/90 px-4 py-3 text-white shadow-2xl shadow-black/40 backdrop-blur-xl transition hover:border-turquoise/40"
        aria-label={isOpen ? "Hide chatbot" : "Open chatbot"}
      >
        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-turquoise/20 to-orange/10 opacity-0 transition group-hover:opacity-100" />
        <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border border-[#071321] bg-orange shadow-sm shadow-orange/60" />
        <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-turquoise to-[#1b3a5c] shadow-lg shadow-turquoise/20">
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
            <path d="M3 4.75A2.75 2.75 0 015.75 2h8.5A2.75 2.75 0 0117 4.75v5.5A2.75 2.75 0 0114.25 13H9.372L5.33 16.11A.75.75 0 014.125 15.5V13H5.75A2.75 2.75 0 013 10.25v-5.5z" />
          </svg>
        </span>
        <span className="relative text-left">
          <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-turquoise/90">
            Live guidance
          </span>
          <span className="font-heading block text-sm font-bold">Ask {CHATBOT_NAME}</span>
        </span>
      </button>
    </div>
  );
}
