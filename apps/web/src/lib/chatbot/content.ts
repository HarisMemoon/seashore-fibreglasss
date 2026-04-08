import {
  FAQ_CATEGORIES,
  PHONE,
  SERVICE_AREA_DETAILS,
  SERVICE_DETAILS,
  SERVICES,
  SITE_NAME,
} from "@seashore/content";

export const CHATBOT_NAME = "Deck Guide";

export const CHATBOT_WELCOME_MESSAGE = `Hi, I’m ${CHATBOT_NAME}. I can help you compare services, check whether we serve your town, and start your free quote.`;

export const CHATBOT_STARTER_PROMPTS = [
  "What service do I need?",
  "Do you serve my town?",
  "What is the difference between recolor and reglass?",
  "Start my free quote",
] as const;

export const CHATBOT_QUOTE_ISSUE_TYPES = [
  "Repair a leak or soft spot",
  "Reglass / resurfacing",
  "Recolor / re-gelcoat",
  "New fiberglass deck",
  "Composite deck or steps",
  "Vinyl railing",
  "Not sure yet",
] as const;

export const CHATBOT_URGENCY_OPTIONS = [
  "ASAP",
  "Within 2 weeks",
  "This month",
  "Planning ahead",
] as const;

export const CHATBOT_CONTACT_METHOD_OPTIONS = ["Call", "Text", "Email"] as const;

export const CHATBOT_PHONE_DIGITS = PHONE.replace(/\D/g, "");

export const CHATBOT_SCOPE_NOTE = `${SITE_NAME} handles fiberglass deck repair, new construction, reglass restoration, recolor maintenance, composite decks, and vinyl railing across the South Jersey Shore.`;

export const CHATBOT_SERVICE_KEYWORDS: Record<string, readonly string[]> = {
  "fiberglass-deck-repair": [
    "repair",
    "leak",
    "leaks",
    "soft spot",
    "soft spots",
    "puddling",
    "standing water",
    "flashings",
    "door transition",
    "drip edge",
    "structural rot",
    "nail pops",
  ],
  "fiberglass-deck-new-constructions": [
    "new construction",
    "new deck",
    "installation",
    "install",
    "build",
    "builder",
    "from scratch",
    "engineered system",
  ],
  "fiberglass-deck-resurfacing": [
    "reglass",
    "resurfacing",
    "resurface",
    "membrane renewal",
    "widespread cracking",
    "failed patches",
    "old fiberglass",
  ],
  "fiberglass-deck-recolor": [
    "recolor",
    "re-gelcoat",
    "regelcoat",
    "gelcoat",
    "faded",
    "chalky",
    "uv wear",
    "cosmetic wear",
  ],
  "composite-decks": [
    "composite",
    "wolf decking",
    "wolf deck",
    "steps",
    "azek",
    "low maintenance",
    "pvc decking",
  ],
  "vinyl-railing": ["vinyl railing", "railing", "railings", "guardrail", "handrail"],
};

export const CHATBOT_TOWN_SYNONYMS: Record<string, readonly string[]> = {
  "long-beach-island": ["lbi", "long beach island"],
  "ocean-city-nj": ["ocean city", "ocean city nj"],
  "brigantine-nj": ["brigantine", "brigantine nj"],
  "atlantic-city-nj": ["atlantic city", "atlantic city nj"],
  "ventnor-city-nj": ["ventnor", "ventnor city", "ventnor city nj"],
  "margate-city-nj": ["margate", "margate city", "margate city nj"],
  "longport-nj": ["longport", "longport nj"],
  "strathmere-nj": ["strathmere", "strathmere nj"],
  "sea-isle-city-nj": ["sea isle", "sea isle city", "sea isle city nj"],
  "avalon-nj": ["avalon", "avalon nj"],
  "stone-harbor-nj": ["stone harbor", "stone harbor nj"],
  "wildwood-nj": ["wildwood", "wildwood nj"],
  "cape-may-nj": ["cape may", "cape may nj"],
};

export const CHATBOT_SERVICE_LINKS = SERVICES.map((service) => ({
  slug: service.slug,
  title: service.title,
  description: service.description,
  href: `/services/${service.slug}`,
}));

export const CHATBOT_SERVICE_AREA_LINKS = SERVICE_AREA_DETAILS.map((area) => ({
  slug: area.slug,
  townName: area.townName,
  href: `/service-areas/${area.slug}`,
  intro: area.intro.join(" "),
  challenge: area.localChallengeBody.join(" "),
}));

export const CHATBOT_FAQ_INDEX = FAQ_CATEGORIES.flatMap((category) =>
  category.items.map((item) => ({
    category: category.label,
    question: item.question,
    answer: item.answer,
    href: "/faqs",
  }))
);

export const CHATBOT_SERVICE_DETAIL_INDEX = SERVICE_DETAILS.map((detail) => ({
  slug: detail.slug,
  title: detail.h1,
  href: `/services/${detail.slug}`,
  summary: detail.intro.join(" "),
  timeline: detail.timeline ?? "",
}));
