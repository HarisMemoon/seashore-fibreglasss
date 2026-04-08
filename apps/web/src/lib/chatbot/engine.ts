import type {
  ChatbotConfidence,
  ChatbotLink,
  ChatbotRequest,
  ChatbotResponse,
} from "@seashore/types";
import {
  CHATBOT_FAQ_INDEX,
  CHATBOT_PHONE_DIGITS,
  CHATBOT_SCOPE_NOTE,
  CHATBOT_SERVICE_AREA_LINKS,
  CHATBOT_SERVICE_DETAIL_INDEX,
  CHATBOT_SERVICE_KEYWORDS,
  CHATBOT_SERVICE_LINKS,
  CHATBOT_STARTER_PROMPTS,
  CHATBOT_TOWN_SYNONYMS,
} from "./content";

type ScoredMatch<T> = T & { score: number };

function normalize(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

function tokenize(value: string): string[] {
  return normalize(value)
    .split(" ")
    .filter((token) => token.length > 2);
}

function includesPhrase(haystack: string, phrase: string): boolean {
  return haystack.includes(normalize(phrase));
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
  if (score >= 4) return "medium";
  return "low";
}

function scoreTextMatch(message: string, content: string): number {
  const messageTokens = tokenize(message);
  const contentTokens = new Set(tokenize(content));
  let score = 0;

  for (const token of messageTokens) {
    if (contentTokens.has(token)) score += 1;
  }

  return score;
}

function matchService(message: string): ScoredMatch<(typeof CHATBOT_SERVICE_LINKS)[number]> | undefined {
  const normalized = normalize(message);
  const matches = CHATBOT_SERVICE_LINKS.map((service) => {
    const titleScore = scoreTextMatch(message, `${service.title} ${service.description}`);
    const keywordScore = (CHATBOT_SERVICE_KEYWORDS[service.slug] ?? []).reduce((sum, keyword) => {
      return sum + (includesPhrase(normalized, keyword) ? 3 : 0);
    }, 0);
    return { ...service, score: titleScore + keywordScore };
  }).sort((a, b) => b.score - a.score);

  return matches[0]?.score > 0 ? matches[0] : undefined;
}

function matchArea(message: string): ScoredMatch<(typeof CHATBOT_SERVICE_AREA_LINKS)[number]> | undefined {
  const normalized = normalize(message);
  const matches = CHATBOT_SERVICE_AREA_LINKS.map((area) => {
    const townScore = scoreTextMatch(message, `${area.townName} ${area.intro} ${area.challenge}`);
    const synonymScore = (CHATBOT_TOWN_SYNONYMS[area.slug] ?? []).reduce((sum, synonym) => {
      return sum + (includesPhrase(normalized, synonym) ? 4 : 0);
    }, 0);
    return { ...area, score: townScore + synonymScore };
  }).sort((a, b) => b.score - a.score);

  return matches[0]?.score > 0 ? matches[0] : undefined;
}

function matchFaq(message: string): ScoredMatch<(typeof CHATBOT_FAQ_INDEX)[number]> | undefined {
  const normalized = normalize(message);
  const matches = CHATBOT_FAQ_INDEX.map((faq) => {
    const baseScore = scoreTextMatch(message, `${faq.question} ${faq.answer}`);
    const questionBonus = includesPhrase(normalized, faq.question) ? 6 : 0;
    const faqIntentBonus =
      /\b(difference|vs|compare|how long|timeline|licensed|insured|maintenance|reglass|recolor|soft spot|leak)\b/i.test(
        message
      ) && scoreTextMatch(message, faq.question) >= 2
        ? 3
        : 0;

    return {
      ...faq,
      score: baseScore + questionBonus + faqIntentBonus,
    };
  }).sort((a, b) => b.score - a.score);

  return matches[0]?.score > 1 ? matches[0] : undefined;
}

function wantsQuote(message: string): boolean {
  return /\b(quote|estimate|inspection|book|schedule|pricing|price|cost|get started|start)\b/i.test(
    message
  );
}

function wantsAreaLookup(message: string): boolean {
  return /\b(do you serve|service area|serve my town|town|city|area|near me)\b/i.test(message);
}

function wantsServiceRecommendation(message: string): boolean {
  return /\b(what service|which service|need|recommend|best option|what should i do)\b/i.test(message);
}

function wantsHuman(message: string): boolean {
  return /\b(call|text|email|contact|human|person|someone)\b/i.test(message);
}

function isOutOfScope(message: string): boolean {
  return /\b(boat|marine hull|roofing|pool|window|siding|kitchen|bathroom)\b/i.test(message);
}

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
        temperature: 0.2,
        messages: [
          {
            role: "system",
            content:
              "You are a professional website assistant for Seashore Fiberglass. Rewrite answers so they feel modern, concise, and helpful. Use only the provided context. Never invent pricing, guarantees, or services. Keep the answer to 2-4 sentences and end with one practical next step when helpful.",
          },
          {
            role: "user",
            content: [
              `Question: ${input.question}`,
              `Draft answer: ${input.draftAnswer}`,
              "Allowed context:",
              ...input.contextSnippets.map((snippet, index) => `${index + 1}. ${snippet}`),
            ].join("\n"),
          },
        ],
      }),
    });

    if (!response.ok) {
      return input.draftAnswer;
    }

    const json = (await response.json()) as {
      choices?: Array<{ message?: { content?: string | null } }>;
    };
    const content = json.choices?.[0]?.message?.content?.trim();
    return content || input.draftAnswer;
  } catch {
    return input.draftAnswer;
  }
}

export async function createChatbotResponse(request: ChatbotRequest): Promise<ChatbotResponse> {
  const message = request.message.trim();
  if (!message) {
    return {
      answer: "Ask me about services, your town, deck problems, or starting a free quote.",
      intent: "general",
      confidence: "high",
      recommendedLinks: [{ label: "Contact us", href: "/contact", kind: "contact" }],
      quickReplies: CHATBOT_STARTER_PROMPTS,
    };
  }

  const matchedService = matchService(message);
  const matchedArea = matchArea(message);
  const matchedFaq = matchFaq(message);
  const quoteIntent = wantsQuote(message);
  const humanIntent = wantsHuman(message);
  const areaLookupIntent = wantsAreaLookup(message);
  const serviceRecommendationIntent = wantsServiceRecommendation(message);
  const outOfScope = isOutOfScope(message);
  const links: ChatbotLink[] = [];
  const contextSnippets: string[] = [];

  let answer = "";
  let intent: ChatbotResponse["intent"] = "general";
  let confidence: ChatbotConfidence = "medium";
  let requiresHumanFollowup = false;
  let leadCapture: ChatbotResponse["leadCapture"];

  if (outOfScope) {
    intent = "fallback";
    confidence = "low";
    requiresHumanFollowup = true;
    answer = `I’m focused on fiberglass decks, composite decks, vinyl railing, and related quote questions for Seashore Fiberglass. ${CHATBOT_SCOPE_NOTE} If your project is different, the team can still confirm by phone or through the contact form.`;
    links.push(
      { label: "Call now", href: `tel:+1${CHATBOT_PHONE_DIGITS}`, kind: "phone" },
      { label: "Contact page", href: "/contact", kind: "contact" }
    );
  } else if (quoteIntent) {
    intent = humanIntent ? "contact-handoff" : "quote-request";
    confidence = matchedService ? "high" : "medium";
    leadCapture = {
      prompt:
        "I can help you start a free quote. Share your issue type, town, and best way to reach you, and I’ll package it for the team.",
      suggestedIssueType: matchedService?.title,
      suggestedServiceSlug: matchedService?.slug,
      suggestedCity: matchedArea?.townName,
    };

    if (matchedService && matchedArea) {
      answer = `Based on what you described, ${matchedService.title} looks like the right starting point for your ${matchedArea.townName} project. I can help you start a free quote now, or you can review the service and town pages first.`;
      contextSnippets.push(matchedService.description, matchedArea.challenge);
      links.push(
        { label: matchedService.title, href: matchedService.href, kind: "service" },
        { label: matchedArea.townName, href: matchedArea.href, kind: "service-area" }
      );
    } else if (matchedService) {
      answer = `It sounds like ${matchedService.title} is the best fit. I can help you start a free quote now, or you can review that service page for the process and what to expect.`;
      contextSnippets.push(matchedService.description);
      links.push({ label: matchedService.title, href: matchedService.href, kind: "service" });
    } else {
      answer =
        "I can help you start a free quote. If you are not sure which service fits, that is completely normal. Share the symptoms or choose an issue type, and the team can confirm the right path after inspection.";
    }

    links.push(
      { label: "Contact page", href: "/contact", kind: "contact" },
      { label: "Call now", href: `tel:+1${CHATBOT_PHONE_DIGITS}`, kind: "phone" }
    );
  } else if (areaLookupIntent && matchedArea) {
    intent = "service-area-routing";
    confidence = "high";
    answer = `Yes, Seashore Fiberglass serves ${matchedArea.townName}. ${matchedArea.intro}`;
    contextSnippets.push(matchedArea.intro, matchedArea.challenge);
    links.push(
      { label: matchedArea.townName, href: matchedArea.href, kind: "service-area" },
      { label: "Services", href: "/services", kind: "service" },
      { label: "Start a free quote", href: "/contact", kind: "contact" }
    );
  } else if (
    matchedFaq &&
    (!matchedService || matchedFaq.score >= matchedService.score || /(\bwhat is\b|\bfaq\b|\bhow\b|\bwhy\b)/i.test(message))
  ) {
    intent = "faq";
    confidence = classifyConfidence(matchedFaq.score);
    answer = matchedFaq.answer;
    contextSnippets.push(matchedFaq.question, matchedFaq.answer);
    links.push({ label: "Browse FAQs", href: matchedFaq.href, kind: "faq" });

    if (matchedService) {
      links.push({ label: matchedService.title, href: matchedService.href, kind: "service" });
    }
    if (matchedArea) {
      links.push({ label: matchedArea.townName, href: matchedArea.href, kind: "service-area" });
    }
  } else if (matchedService || serviceRecommendationIntent) {
    if (!matchedService) {
      intent = "general";
      confidence = "medium";
      answer =
        "I can narrow this down quickly. Tell me the symptom you see most (soft spots, leaks, puddling, fading gelcoat, or railing issues), and I’ll recommend the exact service.";
      links.push(
        { label: "Services", href: "/services", kind: "service" },
        { label: "Start a free quote", href: "/contact", kind: "contact" }
      );
    } else {
    intent = "service-routing";
    confidence = classifyConfidence(matchedService.score);
    const detail = CHATBOT_SERVICE_DETAIL_INDEX.find((service) => service.slug === matchedService.slug);
    answer = `The best fit looks like ${matchedService.title}. ${matchedService.description}`;
    if (detail?.timeline) {
      answer += ` ${detail.timeline}`;
      contextSnippets.push(detail.timeline);
    }
    contextSnippets.push(matchedService.description);
    links.push({ label: matchedService.title, href: matchedService.href, kind: "service" });

    if (matchedArea) {
      answer += ` Since your project is in ${matchedArea.townName}, I’d also look at the local service-area page for shore-specific conditions.`;
      contextSnippets.push(matchedArea.challenge);
      links.push({ label: matchedArea.townName, href: matchedArea.href, kind: "service-area" });
    }
    }
  } else if (matchedArea) {
    intent = "service-area-routing";
    confidence = classifyConfidence(matchedArea.score);
    answer = `Yes, Seashore Fiberglass serves ${matchedArea.townName}. ${matchedArea.intro}`;
    contextSnippets.push(matchedArea.intro, matchedArea.challenge);
    links.push(
      { label: matchedArea.townName, href: matchedArea.href, kind: "service-area" },
      { label: "Services", href: "/services", kind: "service" }
    );
  } else if (humanIntent) {
    intent = "contact-handoff";
    confidence = "medium";
    requiresHumanFollowup = true;
    answer =
      "The fastest next step is to call, text, or send a quick quote request. If you want, I can also help narrow down the right service before you contact the team.";
    links.push(
      { label: "Call now", href: `tel:+1${CHATBOT_PHONE_DIGITS}`, kind: "phone" },
      { label: "Contact page", href: "/contact", kind: "contact" }
    );
  } else {
    intent = "fallback";
    confidence = "low";
    requiresHumanFollowup = true;
    answer =
      "I can help with deck repair questions, service comparisons, South Jersey Shore service areas, and free quote requests. If you tell me the deck problem or the town, I can point you to the best next step.";
    links.push(
      { label: "Services", href: "/services", kind: "service" },
      { label: "Service areas", href: "/service-areas", kind: "service-area" },
      { label: "Contact us", href: "/contact", kind: "contact" }
    );
  }

  const polishedAnswer = await maybePolishWithOpenAI({
    question: message,
    draftAnswer: answer,
    contextSnippets,
  });

  return {
    answer: polishedAnswer,
    intent,
    confidence,
    recommendedLinks: uniqueLinks(links).slice(0, 3),
    quickReplies:
      intent === "quote-request"
        ? ["Start my free quote", "What service do I need?", "Do you serve my town?"]
        : intent === "service-routing"
          ? ["Start my free quote", "Do you serve my town?", "What is reglass?"]
          : CHATBOT_STARTER_PROMPTS,
    leadCapture,
    requiresHumanFollowup,
  };
}
