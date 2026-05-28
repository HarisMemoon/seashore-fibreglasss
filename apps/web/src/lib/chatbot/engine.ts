// ============================================================
// Ask Seashore — Chat Engine
// Uses Document 3 knowledge base from content.ts
// ============================================================

import type {
  ChatbotConfidence,
  ChatbotLink,
  ChatbotRequest,
  ChatbotResponse,
} from "@seashore/types";
import {
  CHATBOT_PHONE_DIGITS,
  CHATBOT_SCOPE_NOTE,
  CHATBOT_STARTER_PROMPTS,
  CHATBOT_WELCOME_MESSAGE_ES,
  COMPANY_INFO,
  OUT_OF_AREA_RESPONSE,
  QA_PAIRS,
  SERVICE_AREA_SLUGS,
  SERVICE_AREAS,
  SERVICE_DETAILS_KB,
  LEAD_CAPTURE,
  type QAPair,
  type ServiceDetail,
} from "./content";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function normalize(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(value: string): string[] {
  return normalize(value)
    .split(" ")
    .filter((t) => t.length > 2);
}

function includesPhrase(haystack: string, phrase: string): boolean {
  return haystack.includes(normalize(phrase));
}

function isSpanish(message: string): boolean {
  // Detect Spanish based on common Spanish words / diacritics
  const spanishMarkers =
    /\b(hola|como|qué|que|está|esta|deck|cuánto|cuanto|tienes|tienen|trabajan|trabaja|área|zona|ciudad|inspección|inspeccion|libre|gratis|precio|costo|reparar|reparación|necesito|puedo|ayuda|filtración|agua|mantenimiento|garantía|años|lunes|martes|miércoles|jueves|viernes|sábado|domingo)\b/i;
  const hasDiacritics = /[áéíóúüñ¿¡]/i.test(message);
  return hasDiacritics || spanishMarkers.test(message);
}

function uniqueLinks(links: ChatbotLink[]): ChatbotLink[] {
  const seen = new Set<string>();
  return links.filter((link) => {
    if (seen.has(link.href)) return false;
    seen.add(link.href);
    return true;
  });
}

function classifyConfidence(score: number): ChatbotConfidence {
  if (score >= 8) return "high";
  if (score >= 3) return "medium";
  return "low";
}

// ---------------------------------------------------------------------------
// Core matching functions
// ---------------------------------------------------------------------------

/**
 * Score a message against a Q&A pair.
 * Returns a numeric score — higher = better match.
 */
function scoreQA(message: string, qa: QAPair): number {
  const normalized = normalize(message);
  let score = 0;

  for (const trigger of qa.questions) {
    if (includesPhrase(normalized, trigger)) {
      // Longer phrase matches score higher
      score += trigger.split(" ").length * 3;
    }
  }

  // Token overlap bonus
  const msgTokens = tokenize(message);
  const allTriggerText = qa.questions.join(" ");
  const triggerTokens = new Set(tokenize(allTriggerText));
  for (const t of msgTokens) {
    if (triggerTokens.has(t)) score += 1;
  }

  return score;
}

/**
 * Find the best-matching Q&A pair for a message.
 */
function matchQA(message: string): { qa: QAPair; score: number } | undefined {
  let best: { qa: QAPair; score: number } | undefined;

  for (const qa of QA_PAIRS) {
    const score = scoreQA(message, qa);
    if (score > 0 && (!best || score > best.score)) {
      best = { qa, score };
    }
  }

  return best && best.score >= 3 ? best : undefined;
}

/**
 * Find the best-matching service from SERVICE_DETAILS_KB.
 */
function matchService(message: string): { service: ServiceDetail; score: number } | undefined {
  const normalized = normalize(message);
  let best: { service: ServiceDetail; score: number } | undefined;

  for (const service of SERVICE_DETAILS_KB) {
    let score = 0;
    for (const kw of service.keywords) {
      if (includesPhrase(normalized, kw)) {
        score += kw.split(" ").length * 2;
      }
    }
    // Token overlap
    const msgTokens = tokenize(message);
    const serviceTokens = new Set(tokenize(`${service.name} ${service.summary}`));
    for (const t of msgTokens) {
      if (serviceTokens.has(t)) score += 1;
    }

    if (score > 0 && (!best || score > best.score)) {
      best = { service, score };
    }
  }

  return best && best.score >= 2 ? best : undefined;
}

/**
 * Find the mentioned service area in a message.
 * Returns { townName, slug, href } or undefined.
 */
function matchArea(message: string): { townName: string; slug: string; href: string } | undefined {
  const normalized = normalize(message);

  for (const [slug, synonyms] of Object.entries(SERVICE_AREA_SLUGS)) {
    for (const synonym of synonyms) {
      if (includesPhrase(normalized, synonym)) {
        const townIndex = Object.keys(SERVICE_AREA_SLUGS).indexOf(slug);
        const townName = SERVICE_AREAS[townIndex] ?? slug;
        return { townName, slug, href: `/service-areas/${slug}` };
      }
    }
  }
  return undefined;
}

function wantsQuote(message: string): boolean {
  return /\b(quote|estimate|inspection|book|schedule|pricing|price|cost|get started|start|free inspection|sign up|set up)\b/i.test(
    message
  );
}

function wantsAreaLookup(message: string): boolean {
  return /\b(do you serve|service area|serve my|your area|what towns|which towns|areas you|near me|cover)\b/i.test(
    message
  );
}

function wantsServiceRecommendation(message: string): boolean {
  return /\b(what service|which service|need|recommend|best option|what should i|help me figure|not sure)\b/i.test(
    message
  );
}

function wantsHuman(message: string): boolean {
  return /\b(call|text|email|contact|human|person|someone|speak to|talk to|francisco)\b/i.test(
    message
  );
}

function isOutOfScope(message: string): boolean {
  return /\b(boat|marine hull|roofing shingles|pool|window replacement|siding|kitchen|bathroom|tile|hardwood|carpet)\b/i.test(
    message
  );
}

// ---------------------------------------------------------------------------
// AI polishing (optional — only if OPENAI_API_KEY is set)
// ---------------------------------------------------------------------------

async function maybePolishWithOpenAI(input: {
  question: string;
  draftAnswer: string;
  contextSnippets: readonly string[];
}): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey || input.contextSnippets.length === 0) {
    return input.draftAnswer;
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_CHAT_MODEL?.trim() || "gpt-4.1-mini",
        temperature: 0.15,
        messages: [
          {
            role: "system",
            content: [
              "You are Ask Seashore, the assistant for Seashore Fiberglass LLC (Ocean City, NJ).",
              "RULES YOU MUST FOLLOW WITHOUT EXCEPTION:",
              "- Never give a price quote or cost estimate — always direct to free inspection",
              "- Never say the company was founded before 2020",
              "- Never say 'rust-free' for vinyl railing — say it won't corrode, warp, or degrade",
              "- Never say 'recolor every 5 years' — say 'every 3-5 years depending on exposure'",
              "- Never say 'reglass every 10 years' — timeline depends on membrane condition",
              "- Never recommend a specific service without first confirming symptoms",
              "- Never say Seashore does not do framing",
              "- Always guide toward free inspection as the correct next step",
              "Rewrite the draft answer to be warm, clear, and direct — like Francisco himself would say it.",
              "Keep it to 2–4 sentences. End with a practical next step when appropriate.",
              "Use ONLY the provided context — do not invent information.",
            ].join("\n"),
          },
          {
            role: "user",
            content: [
              `Customer question: ${input.question}`,
              `Draft answer: ${input.draftAnswer}`,
              "Allowed context:",
              ...input.contextSnippets.map((s, i) => `${i + 1}. ${s}`),
            ].join("\n"),
          },
        ],
      }),
    });

    if (!response.ok) return input.draftAnswer;

    const json = (await response.json()) as {
      choices?: Array<{ message?: { content?: string | null } }>;
    };
    const content = json.choices?.[0]?.message?.content?.trim();
    return content || input.draftAnswer;
  } catch {
    return input.draftAnswer;
  }
}

// ---------------------------------------------------------------------------
// Main response builder
// ---------------------------------------------------------------------------

export async function createChatbotResponse(request: ChatbotRequest): Promise<ChatbotResponse> {
  const message = request.message.trim();
  const spanish = isSpanish(message);

  // Empty message — show welcome
  if (!message) {
    return {
      answer: spanish ? CHATBOT_WELCOME_MESSAGE_ES : "Ask me about services, your town, deck problems, or starting a free inspection.",
      intent: "general",
      confidence: "high",
      recommendedLinks: [{ label: "Contact us", href: "/contact", kind: "contact" }],
      quickReplies: CHATBOT_STARTER_PROMPTS,
    };
  }

  const links: ChatbotLink[] = [];
  const contextSnippets: string[] = [];
  let answer = "";
  let intent: ChatbotResponse["intent"] = "general";
  let confidence: ChatbotConfidence = "medium";
  let requiresHumanFollowup = false;
  let leadCapture: ChatbotResponse["leadCapture"];

  const normalized = normalize(message);

  // ── Out of scope ────────────────────────────────────────────────────────
  if (isOutOfScope(message)) {
    intent = "fallback";
    confidence = "low";
    requiresHumanFollowup = true;
    answer = spanish
      ? "Me especializo en decks de fibra de vidrio, decks de composite y barandas de vinyl para Seashore Fiberglass. Para otros proyectos, el equipo puede confirmarlo por teléfono."
      : `I'm focused on fiberglass decks, composite decks, vinyl railing, and related questions for Seashore Fiberglass. ${CHATBOT_SCOPE_NOTE} If your project is outside that scope, the team can confirm by phone.`;
    links.push(
      { label: "Call (609) 338-4505", href: `tel:+1${CHATBOT_PHONE_DIGITS}`, kind: "phone" },
      { label: "Contact page", href: "/contact", kind: "contact" }
    );
    return buildResponse({ answer, intent, confidence, links, contextSnippets, requiresHumanFollowup, leadCapture, message, spanish });
  }

  // ── Direct contact / human handoff ─────────────────────────────────────
  if (wantsHuman(message) && !wantsQuote(message)) {
    intent = "contact-handoff";
    confidence = "high";
    requiresHumanFollowup = true;
    answer = spanish
      ? `La forma más rápida es llamar o escribirle a Francisco al ${COMPANY_INFO.phone}. También puedes usar el formulario de contacto y te responderemos el mismo día o a la mañana siguiente.`
      : `The fastest next step is to call or text Francisco directly at ${COMPANY_INFO.phone}. You can also fill out the contact form and we'll respond same day or next morning — Monday–Saturday 8:00 AM–5:00 PM.`;
    links.push(
      { label: `Call ${COMPANY_INFO.phone}`, href: `tel:+1${CHATBOT_PHONE_DIGITS}`, kind: "phone" },
      { label: "Contact form", href: "/contact", kind: "contact" }
    );
    return buildResponse({ answer, intent, confidence, links, contextSnippets, requiresHumanFollowup, leadCapture, message, spanish });
  }

  // ── Service area lookup ─────────────────────────────────────────────────
  const matchedArea = matchArea(message);

  if (wantsAreaLookup(message) || matchedArea) {
    if (matchedArea) {
      intent = "service-area-routing";
      confidence = "high";
      answer = spanish
        ? `Sí, Seashore Fiberglass trabaja en ${matchedArea.townName}. ¿Te gustaría que coordinemos una inspección gratuita?`
        : `Yes, Seashore Fiberglass serves ${matchedArea.townName}. We're familiar with the local coastal conditions there. Would you like to set up a free inspection?`;
      contextSnippets.push(`Service area: ${matchedArea.townName}`);
      links.push(
        { label: matchedArea.townName, href: matchedArea.href, kind: "service-area" },
        { label: "All service areas", href: "/service-areas", kind: "service-area" },
        { label: "Free inspection", href: "/contact", kind: "contact" }
      );
    } else if (wantsAreaLookup(message)) {
      intent = "service-area-routing";
      confidence = "medium";
      answer = spanish
        ? `Trabajamos en 13 ciudades de la costa de Jersey Shore: Ocean City, Long Beach Island, Brigantine, Atlantic City, Ventnor City, Margate City, Longport, Strathmere, Sea Isle City, Avalon, Stone Harbor, Wildwood y Cape May. ¿En cuál ciudad está tu propiedad?`
        : `We serve 13 shore towns: Ocean City, Long Beach Island, Brigantine, Atlantic City, Ventnor City, Margate City, Longport, Strathmere, Sea Isle City, Avalon, Stone Harbor, Wildwood, and Cape May. What town is your property in?`;
      links.push(
        { label: "All service areas", href: "/service-areas", kind: "service-area" },
        { label: "Contact us", href: "/contact", kind: "contact" }
      );
    } else {
      // Town mentioned but not in our list
      intent = "service-area-routing";
      confidence = "medium";
      answer = spanish ? OUT_OF_AREA_RESPONSE.replace("give us a call", "llámanos") : OUT_OF_AREA_RESPONSE;
      links.push(
        { label: `Call ${COMPANY_INFO.phone}`, href: `tel:+1${CHATBOT_PHONE_DIGITS}`, kind: "phone" },
        { label: "Service areas", href: "/service-areas", kind: "service-area" }
      );
    }
    return buildResponse({ answer, intent, confidence, links, contextSnippets, requiresHumanFollowup, leadCapture, message, spanish });
  }

  // ── Q&A exact match (highest priority after location) ───────────────────
  // NOTE: re-call matchArea/matchService inline below to avoid TypeScript control-flow narrowing
  // that occurs after the early-return area-routing block above.
  const qaMatch = matchQA(message);

  if (qaMatch && qaMatch.score >= 4) {
    const { qa } = qaMatch;
    intent = qa.intent as ChatbotResponse["intent"] ?? "faq";
    confidence = classifyConfidence(qaMatch.score);

    // Use Spanish answer if available and user is writing in Spanish
    answer = (spanish && qa.answerEs) ? qa.answerEs : qa.answer;
    contextSnippets.push(qa.questions[0] ?? "", qa.answer);

    // Add relevant links based on intent
    if (qa.intent === "inspection" || qa.intent === "schedule" || wantsQuote(message)) {
      links.push({ label: "Free inspection", href: "/contact", kind: "contact" });
      links.push({ label: `Call ${COMPANY_INFO.phone}`, href: `tel:+1${CHATBOT_PHONE_DIGITS}`, kind: "phone" });
      leadCapture = {
        prompt: LEAD_CAPTURE.step1,
        suggestedServiceSlug: matchService(message)?.service.slug,
        suggestedCity: matchArea(message)?.townName,
      };
    } else if (qa.intent === "pricing" || qa.intent === "urgent") {
      links.push({ label: `Call ${COMPANY_INFO.phone}`, href: `tel:+1${CHATBOT_PHONE_DIGITS}`, kind: "phone" });
      links.push({ label: "Contact form", href: "/contact", kind: "contact" });
    } else if (qa.intent === "repair" || qa.intent === "pitch-correction") {
      links.push({ label: "Deck Repair", href: "/services/fiberglass-deck-repair", kind: "service" });
      links.push({ label: "Free inspection", href: "/contact", kind: "contact" });
    } else if (qa.intent === "new-construction") {
      links.push({ label: "New Construction", href: "/services/fiberglass-deck-new-constructions", kind: "service" });
      links.push({ label: "Free inspection", href: "/contact", kind: "contact" });
    } else if (qa.intent === "warranty" || qa.intent === "trust" || qa.intent === "about") {
      links.push({ label: "About Seashore", href: "/about", kind: "service" });
      links.push({ label: "Free inspection", href: "/contact", kind: "contact" });
    } else if (qa.intent === "faq" || qa.intent === "maintenance" || qa.intent === "timeline" || qa.intent === "technical") {
      links.push({ label: "FAQs", href: "/faqs", kind: "faq" });
      links.push({ label: "Free inspection", href: "/contact", kind: "contact" });
    } else {
      links.push({ label: "Free inspection", href: "/contact", kind: "contact" });
      links.push({ label: `Call ${COMPANY_INFO.phone}`, href: `tel:+1${CHATBOT_PHONE_DIGITS}`, kind: "phone" });
    }

    return buildResponse({ answer, intent, confidence, links, contextSnippets, requiresHumanFollowup, leadCapture, message, spanish });
  }

  // ── Service match ────────────────────────────────────────────────────────
  const serviceMatch = matchService(message);

  if (serviceMatch) {
    intent = "service-routing";
    confidence = classifyConfidence(serviceMatch.score);
    const svc = serviceMatch.service;
    answer = spanish
      ? `Parece que lo que describes encaja con nuestro servicio de ${svc.name}. ${svc.summary} Te recomendamos empezar con una inspección gratuita para confirmarlo — no tiene costo y no hay compromiso.`
      : `Based on what you're describing, ${svc.name} sounds like the right fit. ${svc.summary} The best next step is a free inspection — we come out, walk the full deck, and give you an honest assessment at no cost.`;
    contextSnippets.push(svc.summary, svc.timeline);
    links.push({ label: svc.name, href: svc.href, kind: "service" });
    const areaForService = matchArea(message);
    if (areaForService) {
      links.push({ label: areaForService.townName, href: areaForService.href, kind: "service-area" });
    }
    links.push({ label: "Free inspection", href: "/contact", kind: "contact" });
    leadCapture = {
      prompt: LEAD_CAPTURE.step1,
      suggestedServiceSlug: svc.slug,
      suggestedCity: areaForService?.townName,
    };
    return buildResponse({ answer, intent, confidence, links, contextSnippets, requiresHumanFollowup, leadCapture, message, spanish });
  }

  // ── Service recommendation (user isn't sure what they need) ─────────────
  if (wantsServiceRecommendation(message)) {
    intent = "service-routing";
    confidence = "medium";
    answer = spanish
      ? "Cuéntame qué estás viendo en el deck — zonas blandas, filtraciones, agua estancada, pintura o gelcoat descolorido — y te indico qué servicio aplica."
      : "Tell me what you're seeing — soft spots, leaks, standing water, fading gelcoat, or railing issues — and I'll point you to the right service. Or if you prefer, a free inspection is always the surest path.";
    links.push(
      { label: "All services", href: "/services", kind: "service" },
      { label: "Free inspection", href: "/contact", kind: "contact" }
    );
    return buildResponse({ answer, intent, confidence, links, contextSnippets, requiresHumanFollowup, leadCapture, message, spanish });
  }

  // ── Quote / inspection intent ────────────────────────────────────────────
  if (wantsQuote(message)) {
    intent = "quote-request";
    confidence = "high";
    requiresHumanFollowup = false;
    answer = spanish
      ? LEAD_CAPTURE.step1Es
      : LEAD_CAPTURE.step1;
    links.push(
      { label: "Contact form", href: "/contact", kind: "contact" },
      { label: `Call ${COMPANY_INFO.phone}`, href: `tel:+1${CHATBOT_PHONE_DIGITS}`, kind: "phone" }
    );
    leadCapture = {
      prompt: LEAD_CAPTURE.step1,
      suggestedServiceSlug: matchService(message)?.service.slug,
      suggestedCity: matchArea(message)?.townName,
    };
    return buildResponse({ answer, intent, confidence, links, contextSnippets, requiresHumanFollowup, leadCapture, message, spanish });
  }

  // ── Weak Q&A match (score 2–3) ───────────────────────────────────────────
  if (qaMatch && qaMatch.score >= 2) {
    const { qa } = qaMatch;
    intent = qa.intent as ChatbotResponse["intent"] ?? "faq";
    confidence = "low";
    answer = (spanish && qa.answerEs) ? qa.answerEs : qa.answer;
    contextSnippets.push(qa.answer);
    links.push(
      { label: "FAQs", href: "/faqs", kind: "faq" },
      { label: "Free inspection", href: "/contact", kind: "contact" }
    );
    return buildResponse({ answer, intent, confidence, links, contextSnippets, requiresHumanFollowup, leadCapture, message, spanish });
  }

  // ── Fallback ─────────────────────────────────────────────────────────────
  intent = "fallback";
  confidence = "low";
  requiresHumanFollowup = true;
  answer = spanish
    ? `Puedo ayudarte con preguntas sobre reparación de decks, servicios, áreas de cobertura e inspecciones gratuitas. ¿Puedes contarme qué está pasando con tu deck?`
    : `I can help with deck repair questions, service comparisons, South Jersey Shore coverage, and free inspection requests. Could you tell me a bit more about what's going on with your deck?`;
  links.push(
    { label: "Services", href: "/services", kind: "service" },
    { label: "Service areas", href: "/service-areas", kind: "service-area" },
    { label: "Contact us", href: "/contact", kind: "contact" }
  );

  return buildResponse({ answer, intent, confidence, links, contextSnippets, requiresHumanFollowup, leadCapture, message, spanish });
}

// ---------------------------------------------------------------------------
// Build final response (with optional AI polish)
// ---------------------------------------------------------------------------

interface BuildParams {
  answer: string;
  intent: ChatbotResponse["intent"];
  confidence: ChatbotConfidence;
  links: ChatbotLink[];
  contextSnippets: string[];
  requiresHumanFollowup: boolean;
  leadCapture?: ChatbotResponse["leadCapture"];
  message: string;
  spanish: boolean;
}

async function buildResponse(params: BuildParams): Promise<ChatbotResponse> {
  const { answer, intent, confidence, links, contextSnippets, requiresHumanFollowup, leadCapture, message, spanish } = params;

  const polishedAnswer = await maybePolishWithOpenAI({
    question: message,
    draftAnswer: answer,
    contextSnippets,
  });

  const quickReplies: readonly string[] =
    intent === "quote-request"
      ? ["Schedule a free inspection", "What service do I need?", "Do you serve my town?"]
      : intent === "service-routing"
        ? ["Schedule a free inspection", "Do you serve my town?", "What is the difference between recolor and reglass?"]
        : intent === "service-area-routing"
          ? ["Schedule a free inspection", "What service do I need?", "What is the difference between recolor and reglass?"]
          : CHATBOT_STARTER_PROMPTS;

  return {
    answer: polishedAnswer,
    intent,
    confidence,
    recommendedLinks: uniqueLinks(links).slice(0, 3),
    quickReplies,
    leadCapture,
    requiresHumanFollowup,
  };
}
