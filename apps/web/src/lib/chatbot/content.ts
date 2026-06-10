// ============================================================
// Ask Seashore — Full Knowledge Base (Document 3)
// ALL CONTENT IS CLIENT-APPROVED. DO NOT PARAPHRASE OR EDIT.
// ============================================================

import { PHONE } from "@seashore/content";

// ---------------------------------------------------------------------------
// SECTION 1 — IDENTITY
// ---------------------------------------------------------------------------

export const CHATBOT_NAME = "Seashore";
export const CHATBOT_DISPLAY_NAME = "Ask Seashore";
export const CHATBOT_TAGLINE =
  "Ask about your deck, our services, or schedule a free inspection.";

export const CHATBOT_WELCOME_MESSAGE =
  "Hi! I'm the Seashore Fiberglass assistant. I can help you figure out what your deck needs, confirm we serve your area, or get you set up for a free inspection. What's going on with your deck?";

export const CHATBOT_WELCOME_MESSAGE_ES =
  "¡Hola! Soy el asistente de Seashore Fiberglass. Puedo ayudarte a entender qué necesita tu deck, confirmar si trabajamos en tu área y conectarte con nuestro equipo para una inspección gratuita. ¿Qué está pasando con tu deck?";

export const CHATBOT_STARTER_PROMPTS = [
  "What service do I need?",
  "Do you serve my town?",
  "What is the difference between recolor and reglass?",
  "Schedule a free inspection",
] as const;

export const CHATBOT_PHONE_DIGITS = PHONE.replace(/\D/g, "");

// ---------------------------------------------------------------------------
// SECTION 2 — COMPANY INFORMATION
// ---------------------------------------------------------------------------

export const COMPANY_INFO = {
  legalName: "Seashore Fiberglass LLC",
  owner: "Francisco Ruiz",
  founded: 2020,
  experience:
    "10+ years of hands-on fiberglass experience along the Jersey Shore",
  njLicense: "Home Improvement Contractor License #13VH11005900",
  insurance: "General liability + workers' compensation — fully insured",
  rating: "5.0 stars · 50+ Google reviews",
  bbb: "Listed since March 2025",
  phone: "(609) 338-4505",
  email: "seashorefiberglass@gmail.com",
  address: "406 Asbury Ave, Ocean City, NJ 08226",
  website: "seashorefiberglass.com",
  hours: "Monday–Saturday 8:00 AM – 5:00 PM · Sunday by appointment",
  hoursEs: "Lunes a sábado de 8:00 AM a 5:00 PM · Domingos con cita previa",
  responseTime: "Same day or next morning",
  warranty:
    "10-year workmanship warranty on all installations and full reglass restorations",
} as const;

// ---------------------------------------------------------------------------
// SECTION 3 — SERVICE AREAS
// ---------------------------------------------------------------------------

export const SERVICE_AREAS = [
  "Ocean City NJ",
  "Long Beach Island",
  "Brigantine NJ",
  "Atlantic City NJ",
  "Ventnor City NJ",
  "Margate City NJ",
  "Longport NJ",
  "Strathmere NJ",
  "Sea Isle City NJ",
  "Avalon NJ",
  "Stone Harbor NJ",
  "Wildwood NJ",
  "Cape May NJ",
] as const;

export const SERVICE_AREA_SLUGS: Record<string, readonly string[]> = {
  "ocean-city-nj": ["ocean city", "ocean city nj"],
  "long-beach-island": ["lbi", "long beach island", "long beach island nj"],
  "brigantine-nj": ["brigantine", "brigantine nj"],
  "atlantic-city-nj": ["atlantic city", "atlantic city nj"],
  "ventnor-city-nj": ["ventnor", "ventnor city", "ventnor nj"],
  "margate-city-nj": ["margate", "margate city", "margate nj"],
  "longport-nj": ["longport", "longport nj"],
  "strathmere-nj": ["strathmere", "strathmere nj"],
  "sea-isle-city-nj": ["sea isle", "sea isle city", "sea isle nj"],
  "avalon-nj": ["avalon", "avalon nj"],
  "stone-harbor-nj": ["stone harbor", "stone harbor nj"],
  "wildwood-nj": ["wildwood", "wildwood nj"],
  "cape-may-nj": ["cape may", "cape may nj"],
};

export const CHATBOT_TOWN_SYNONYMS = SERVICE_AREA_SLUGS;

export const OUT_OF_AREA_RESPONSE =
  "We currently serve 13 shore towns from Long Beach Island down to Cape May. If your town isn't listed, give us a call at (609) 338-4505 and we'll let you know if we can help — sometimes we can make it work.";

// ---------------------------------------------------------------------------
// SECTION 4 — SERVICES IN DETAIL
// ---------------------------------------------------------------------------

export interface ServiceDetail {
  slug: string;
  name: string;
  href: string;
  summary: string;
  fullDescription: string;
  keywords: readonly string[];
  timeline: string;
}

export const SERVICE_DETAILS_KB: readonly ServiceDetail[] = [
  {
    slug: "fiberglass-deck-repair",
    name: "Fiberglass Deck Repair",
    href: "/services/fiberglass-deck-repair",
    summary:
      "Diagnosis and permanent repair of fiberglass deck failures — addressing root causes, not surface symptoms.",
    fullDescription:
      'Problems we repair include: soft spots and spongy areas (plywood substrate compromised by moisture), standing water or puddling (drainage issues), missing or short wall flashings (must be minimum 12" up vertical surfaces), failed door transitions, railing post leaks, structural posts inside columns, deteriorated wood drip edges, and nail pops. Water travels beneath the membrane following the deck slope — damage may appear far from where water entered. We inspect the full system, not just the visible symptom.',
    keywords: [
      "repair",
      "leak",
      "leaks",
      "leaking",
      "soft spot",
      "soft spots",
      "spongy",
      "puddling",
      "standing water",
      "pooling",
      "flashings",
      "flashing",
      "door transition",
      "door pan",
      "drip edge",
      "structural rot",
      "rot",
      "nail pops",
      "water inside",
      "ceiling stain",
      "interior leak",
      "water intrusion",
    ],
    timeline:
      "Typical timeline: 2–5 days for targeted repairs · 4–7 days for full reglass-level work",
  },
  {
    slug: "fiberglass-deck-new-constructions",
    name: "Fiberglass Deck New Construction",
    href: "/services/fiberglass-deck-new-constructions",
    summary:
      "Complete fiberglass waterproofing system for newly built decks where framing is in place and first plywood layer is set.",
    fullDescription:
      'This service is for newly built homes where the deck has already been framed with the correct drainage slope built into each joist, and the first layer of plywood is in place. Seashore installs the second plywood layer (1/2" ACX over 3/4" CDX), sets PVC drip edges, integrates wall flashings (minimum 12" height), integrates post flashings (minimum 6" vertical wrap), installs door transition systems, applies 2-oz fiberglass mat with resin as a continuous membrane, and finishes with marine-grade textured gelcoat. Note: Seashore is also capable of full deck framing when needed.',
    keywords: [
      "new construction",
      "new deck",
      "new build",
      "brand new",
      "newly built",
      "installation",
      "install",
      "build",
      "builder",
      "from scratch",
      "just framed",
      "framing done",
      "first plywood",
    ],
    timeline: "Timeline varies by project size — discussed at inspection.",
  },
  {
    slug: "fiberglass-deck-resurfacing",
    name: "Fiberglass Deck Resurfacing (Reglass)",
    href: "/services/fiberglass-deck-resurfacing",
    summary:
      "Full membrane renewal — the complete fiberglass layer is replaced when it is beyond patch repair.",
    fullDescription:
      'Reglass is needed when: widespread cracking or crazing across the field, multiple failing previous patch repairs indicating membrane age, nail pops and visible plywood seams throughout, failed or missing flashings requiring membrane integration, or deck membrane has reached end of serviceable life. Includes: full structural inspection, plywood re-securing with screws at proper spacing, drip edge replacement (PVC/Azek), flashing correction (12" wall, 6" post, door transitions), new 2-oz fiberglass mat fully saturated with resin, post-cure grinding and acetone prep, and marine-grade textured gelcoat finish.',
    keywords: [
      "reglass",
      "resurfacing",
      "resurface",
      "membrane renewal",
      "widespread cracking",
      "crazing",
      "failed patches",
      "old fiberglass",
      "membrane",
      "replace fiberglass",
      "full reglass",
      "entire deck",
      "whole deck",
    ],
    timeline: "Typical timeline: 4–7 days",
  },
  {
    slug: "fiberglass-deck-recolor",
    name: "Fiberglass Deck Recolor (Re-Gelcoating)",
    href: "/services/fiberglass-deck-recolor",
    summary:
      "Surface maintenance — new gelcoat applied over existing intact membrane. Recommended every 3–5 years depending on coastal exposure.",
    fullDescription:
      "Recolor is appropriate when: deck is structurally sound with no soft spots or active leaks, gelcoat showing UV fade, chalking, or minor surface crazing only, no widespread nail pops or seam movement, and last recolor was 3–5 years ago. Recolor is NOT appropriate if soft spots or leaks exist (need repair or reglass first). Includes: suitability confirmation, mechanical grinding, minor crack repair, acetone cleaning, and UV-resistant pumice-infused textured gelcoat application.",
    keywords: [
      "recolor",
      "re-gelcoat",
      "regelcoat",
      "gelcoat",
      "faded",
      "chalky",
      "chalking",
      "uv wear",
      "uv fade",
      "cosmetic",
      "surface worn",
      "color fading",
      "appearance",
      "dull",
      "worn out",
    ],
    timeline: "Typical timeline: 1–2 days",
  },
  {
    slug: "composite-decks",
    name: "Composite Decks & Deck Steps",
    href: "/services/composite-decks",
    summary:
      "Premium composite decking installation using Wolf PVC decking and Azek PVC fascias for open-air decks and steps.",
    fullDescription:
      "Best applications: open-air decks where water passes through to ground below, deck steps and stair systems, homeowners wanting a wood-look surface with minimal maintenance, renovation projects pairing composite with fiberglass or vinyl systems. NOT appropriate for elevated decks over living space requiring a waterproof membrane — fiberglass is the correct system for those. Products: Wolf PVC decking (100% PVC, no wood fibers, 25–30 year residential warranty) paired with Azek PVC fascias.",
    keywords: [
      "composite",
      "wolf decking",
      "wolf deck",
      "steps",
      "deck steps",
      "azek",
      "low maintenance decking",
      "pvc decking",
      "wood look",
      "composite deck",
    ],
    timeline: "Timeline varies by project size — discussed at inspection.",
  },
  {
    slug: "vinyl-railing",
    name: "Vinyl Railing",
    href: "/services/vinyl-railing",
    summary:
      "Installation, repair, and upgrade of vinyl railing systems — won't corrode, warp, or degrade in salt air and high humidity.",
    fullDescription:
      "Vinyl railing is the top choice for coastal homes. Won't corrode, warp, or degrade in salt air and high humidity. Unlike wood or metal alternatives, delivers a clean, low-maintenance finish that lasts season after season. Code-compliant heights and spacing for residential safety requirements. Wind and impact resistant. Critical waterproofing detail: every railing post penetrates the deck surface — each penetration requires minimum 6\" vertical fiberglass flashing integrated with the deck membrane.",
    keywords: [
      "vinyl railing",
      "railing",
      "railings",
      "guardrail",
      "handrail",
      "rail",
      "balusters",
      "posts",
      "railing system",
      "deck railing",
    ],
    timeline: "Timeline varies — discussed at inspection.",
  },
];

// ---------------------------------------------------------------------------
// SECTION 5 — TECHNICAL KNOWLEDGE
// ---------------------------------------------------------------------------

export const TECHNICAL_KNOWLEDGE = {
  failureCauses:
    'Most common causes of fiberglass deck failure: (1) Short or missing wall flashings — must be minimum 12" up vertical surfaces; (2) Failed door transitions — door pans not properly integrated with membrane; (3) Unflashed railing posts — each penetration needs minimum 6" vertical fiberglass wrap; (4) Rotted wood drip edges — Seashore uses PVC/Azek only; (5) Nail pops — nails-only fastening allows plywood movement; (6) Standing water/puddling — from drainage slope issues or blocked drains; (7) UV gelcoat degradation — coastal UV breaks down gelcoat over time; (8) Incorrect original pitch — some decks were built with drainage going toward the house.',

  drainageSlope:
    'Correct drainage slope: 1/4" per foot minimum, sloping away from the structure. For new construction: slope is established at the joist level during framing by the general contractor before Seashore arrives — Seashore verifies it. For existing decks with incorrect slope: Seashore performs Pitch Correction (complete plywood demolition and sister joist installation). Seashore does NOT modify slope as part of routine reglass or recolor services.',

  plywoodStandard:
    'All Seashore builds and rebuilds use a double layer of plywood: Layer 1: 3/4" CDX — glued and nailed to framing. Layer 2: 1/2" ACX — glued and screwed to Layer 1. This creates a stable, monolithic substrate that resists movement and moisture cycling. Single-layer substrates are a common source of nail pops and membrane failure.',

  fibglassMembrane:
    "2-oz fiberglass mat fully saturated with resin. Applied as a continuous field — no seams in the middle of the deck. Flashings integrated at all walls, posts, and door transitions. Finished with marine-grade UV-resistant textured gelcoat with pumice for slip resistance.",

  warranty:
    "10-year workmanship warranty on all fiberglass installations and full reglass restorations. Covers: flashings, membrane, drip edges, and all details Seashore executed. If a covered failure occurs, Seashore returns and fixes it at no cost. Recolor maintenance warranty terms provided in writing at time of quote.",

  waterTravel:
    "Water does not always appear where it entered the deck system. It travels beneath the membrane along the slope — sometimes feet or yards from the original breach. A wall flashing defect may appear as a ceiling stain on the opposite side of a room. This is why Seashore inspects the full perimeter and all transitions — not only where the client sees damage.",

  pitchCorrection:
    "Pitch Correction sub-repair: Applies when an existing deck was built with drainage slope going the wrong direction — usually toward the house. Signs: chronic puddling near door or house wall, active interior leaks that other repairs haven't resolved. Process: complete plywood demolition → sister joist installation alongside each existing joist → correct drainage plane at 1/4\" per foot → full double-layer plywood → complete fiberglass system. Sister joists preferred over sleepers because they correct for natural joist sagging. Permanently eliminates chronic pooling.",

  cricketDrainage:
    "Cricket drainage systems: Used on enclosed rooftop decks and applications where traditional drains are not appropriate. Seamless cricket systems direct water toward scuppers at regular intervals — typically every 48–56 inches. Seashore has designed and installed cricket systems on rooftop decks across the Shore.",
} as const;

// ---------------------------------------------------------------------------
// SECTION 6 — COMPLETE Q&A REFERENCE (30+ pairs verbatim)
// ---------------------------------------------------------------------------

export interface QAPair {
  questions: readonly string[]; // keywords/phrases that trigger this answer
  answer: string;
  answerEs?: string;
  intent: string;
}

export const QA_PAIRS: readonly QAPair[] = [
  {
    questions: [
      "how much",
      "cost",
      "price",
      "pricing",
      "estimate",
      "quote",
      "how much does",
    ],
    intent: "pricing",
    answer:
      "Every deck is different — size, condition, scope, and what we find on inspection all determine pricing. We never give estimates without seeing the deck. The inspection is completely free and there's no obligation. We give you a clear, honest scope and price after we assess your deck in person. I can collect your info right now and get you on the schedule — want to do that?",
    answerEs:
      "Cada deck es diferente — el tamaño, la condición y lo que encontremos en la inspección determinan el precio. Nunca damos estimados sin ver el deck primero. La inspección es completamente gratis y sin compromiso. Puedo tomar tus datos ahora mismo para coordinar — ¿quieres que lo hagamos?",
  },
  {
    questions: [
      "reviews",
      "rated",
      "rating",
      "stars",
      "google reviews",
      "how many reviews",
    ],
    intent: "reviews",
    answer:
      "Seashore Fiberglass has 50+ five-star Google reviews with a perfect 5.0 rating. You can read them directly on our Google Business Profile — every review is from a real Shore homeowner. The link is on our website at seashorefiberglass.com.",
    answerEs:
      "Seashore Fiberglass tiene más de 50 reseñas de cinco estrellas en Google con una calificación perfecta de 5.0. Puedes leerlas directamente en nuestro perfil de Google Business. El enlace está disponible en nuestro sitio web seashorefiberglass.com.",
  },
  {
    questions: [
      "urgent",
      "actively leaking",
      "emergency",
      "water coming in now",
      "flooding",
    ],
    intent: "urgent",
    answer:
      "For urgent situations, call or text Francisco directly at (609) 338-4505 — that's the fastest way to reach us. We respond same day or next morning on all inquiries and prioritize active leak situations.",
    answerEs:
      "Para situaciones urgentes, llama o escríbele directamente a Francisco al (609) 338-4505 — es la forma más rápida de contactarnos.",
  },
  {
    questions: [
      "how long does a fiberglass deck last",
      "lifespan",
      "how long will it last",
      "deck last",
    ],
    intent: "faq",
    answer:
      "With correct installation, a fiberglass deck can last for decades. The key is maintenance — recolor every 3–5 years depending on sun and salt exposure keeps the membrane protected. The right time to recolor is when you see the topcoat starting to fade or chalk — acting early prevents deeper problems. A full reglass is needed when the membrane itself has been compromised. Seashore backs all installations and full reglass work with a 10-year workmanship warranty.",
  },
  {
    questions: [
      "how long does it take",
      "how long",
      "timeline",
      "how many days",
      "duration",
    ],
    intent: "timeline",
    answer:
      "It depends on scope. Recolor maintenance: 1–2 days. Targeted repairs: 2–5 days. Full reglass restoration: 4–7 days. Structural reconstruction or pitch correction: 7–14 days depending on scope. We give you a written timeline after inspection.",
  },
  {
    questions: [
      "warranty",
      "guarantee",
      "do you offer a warranty",
      "how long is the warranty",
    ],
    intent: "warranty",
    answer:
      "Yes — 10-year workmanship warranty on all installations and full reglass restorations. If something fails because of our work, we come back and fix it at no cost. Recolor warranty terms are provided in writing at the time of quote.",
  },
  {
    questions: [
      "do you serve",
      "service area",
      "my town",
      "serve my area",
      "what towns",
      "which towns",
      "areas you cover",
    ],
    intent: "service-area",
    answer:
      "We serve 13 shore towns — Ocean City, Long Beach Island, Brigantine, Atlantic City, Ventnor City, Margate City, Longport, Strathmere, Sea Isle City, Avalon, Stone Harbor, Wildwood, and Cape May. Tell me your town and I'll confirm right away.",
  },
  {
    questions: [
      "standing water",
      "water after rain",
      "puddles",
      "water pools",
      "pooling water",
      "water sits",
    ],
    intent: "repair",
    answer:
      "Standing water means the drainage slope isn't moving water off the deck as intended. It could be from substrate settlement, blocked drains, or the deck was originally built with the slope going the wrong direction. Standing water accelerates wear and finds membrane weaknesses. We diagnose the exact cause during a free inspection.",
  },
  {
    questions: [
      "pools toward house",
      "water toward house",
      "pools toward door",
      "water toward door",
      "drainage wrong direction",
      "reversed drainage",
      "pitch correction",
      "slope wrong",
    ],
    intent: "pitch-correction",
    answer:
      "Yes — that's a Pitch Correction repair. The deck was built with the drainage slope going the wrong way. We demolish the existing plywood, install sister joists alongside each existing joist to establish the correct slope at 1/4\" per foot, and rebuild the full fiberglass system from scratch. It permanently eliminates the problem. Free inspection first so we can confirm that's what's happening.",
  },
  {
    questions: [
      "soft spot",
      "soft spots",
      "spongy deck",
      "soft area",
      "deck feels soft",
    ],
    intent: "repair",
    answer:
      "Yes, almost always serious. Soft spots mean the plywood beneath the fiberglass has been compromised by moisture — even if the surface looks intact. The damage can be extensive and it spreads over time. The sooner it's inspected the better. We assess at no cost.",
  },
  {
    questions: [
      "deck is leaking",
      "leaking inside",
      "ceiling leak",
      "water inside",
      "interior leak",
      "ceiling stain",
    ],
    intent: "repair",
    answer:
      "Interior leaks mean water has found a path through the waterproofing — usually at a wall flashing, door transition, or post penetration. Water travels far beneath the membrane before showing up inside, so the entry point may be nowhere near the visible stain. Don't patch the ceiling — fix the deck first. We'll find the source with a full system inspection. For urgent situations, call or text (609) 338-4505 directly.",
  },
  {
    questions: [
      "difference between recolor and reglass",
      "recolor vs reglass",
      "recolor or reglass",
      "reglass vs recolor",
      "what is recolor",
      "what is reglass",
    ],
    intent: "faq",
    answer:
      "Recolor is surface maintenance — for decks whose gelcoat has faded or worn but whose fiberglass membrane is still structurally sound. It's a 1–2 day job. Reglass is a full membrane renewal — we replace the fiberglass layer itself, correct all flashings, and re-secure the substrate. It's needed when the waterproofing system is compromised. The right service is determined by a free inspection.",
  },
  {
    questions: [
      "what service do i need",
      "which service",
      "what do i need",
      "not sure what i need",
      "help me figure out",
    ],
    intent: "service-recommendation",
    answer:
      "Here's a general guide: faded or chalky surface with no soft spots or leaks → likely recolor. Soft spots, nail pops, or failing patches → likely reglass or repair. Active interior leak or rot → repair or reglass, possibly structural. New deck needing fiberglass → New Construction service. We always confirm with a free inspection before recommending anything.",
  },
  {
    questions: [
      "brand new deck",
      "new construction",
      "can you work on new",
      "newly built",
      "just built",
    ],
    intent: "new-construction",
    answer:
      "Yes. Our New Construction service is for newly built homes where the deck frame is complete with the correct drainage slope built in and the first plywood layer in place. We take it from there — second plywood layer, PVC drip edges, wall and post flashings, fiberglass membrane, and marine-grade gelcoat. Getting it right from day one prevents the failures we're called in to fix later.",
  },
  {
    questions: [
      "do you do framing",
      "deck framing",
      "can you frame",
      "do you frame",
    ],
    intent: "faq",
    answer:
      'Yes, Seashore is capable of full deck framing. Our "New Construction" fiberglass service refers to projects where framing is already complete — but we can handle full scope when needed.',
  },
  {
    questions: [
      "licensed",
      "insured",
      "license",
      "insurance",
      "are you licensed",
      "are you insured",
    ],
    intent: "trust",
    answer:
      "Yes. Seashore Fiberglass LLC holds NJ Home Improvement Contractor License #13VH11005900 and carries full general liability and workers' compensation insurance. We're happy to provide documentation.",
  },
  {
    questions: [
      "free inspection",
      "do you do free",
      "inspection cost",
      "is the inspection free",
    ],
    intent: "inspection",
    answer:
      "Yes — free inspections, no obligation. We come out, walk the full deck, check all transitions and flashings, and give you a clear honest assessment of what we find and what we recommend. No pressure to commit.",
  },
  {
    questions: [
      "how soon",
      "availability",
      "when can you come",
      "schedule",
      "book",
      "book inspection",
    ],
    intent: "schedule",
    answer:
      "We typically respond the same day or next morning. Reach us at (609) 338-4505 or through the contact form and we'll get you on the schedule.",
  },
  {
    questions: [
      "can i recolor if soft spot",
      "recolor over soft spot",
      "just recolor",
    ],
    intent: "faq",
    answer:
      "No — a soft spot means structural damage beneath the surface. Applying gelcoat over a compromised substrate hides the problem until it gets worse and more expensive. We need to address the substrate first. A free inspection tells us the correct path.",
  },
  {
    questions: [
      "how often",
      "maintenance",
      "how often should i",
      "when to recolor",
      "maintenance schedule",
    ],
    intent: "maintenance",
    answer:
      "Recolor maintenance every 3–5 years depending on your deck's exposure to sun, salt, and weather. Don't wait for a fixed 5-year calendar — the right time is when you see the topcoat starting to fade or chalk. Spring inspection after winter is a good practice for all Shore homeowners.",
  },
  {
    questions: [
      "best time of year",
      "time of year",
      "when to do work",
      "season",
      "spring",
      "fall",
      "summer",
    ],
    intent: "faq",
    answer:
      "Spring and fall are ideal — mild temperatures allow proper resin and gelcoat curing. Summer work is possible but heat can affect cure times. Many Shore homeowners schedule off-season to be ready for summer. We discuss timing as part of the inspection.",
  },
  {
    questions: [
      "deck over living space",
      "above living space",
      "roof deck",
      "over the house",
      "deck above room",
    ],
    intent: "faq",
    answer:
      "Yes — it makes proper waterproofing critical. A leak over living space causes interior damage fast. Fiberglass with correct flashings is the right system. We pay extra attention to transitions and drainage on decks over habitable space.",
  },
  {
    questions: [
      "difference between fiberglass and composite",
      "fiberglass vs composite",
      "composite vs fiberglass",
      "which is better fiberglass or composite",
    ],
    intent: "faq",
    answer:
      "Fiberglass creates a continuous waterproof membrane — essential for decks over living space. Composite boards are excellent for open-frame decks where water drains through to the ground. We install both and recommend the right system for your situation honestly.",
  },
  {
    questions: [
      "permits",
      "do you handle permits",
      "permit",
      "building permit",
    ],
    intent: "faq",
    answer:
      "Permit requirements vary by town and scope. We discuss permit needs as part of the inspection and quote process.",
  },
  {
    questions: [
      "rental property",
      "rental",
      "investment property",
      "property manager",
    ],
    intent: "faq",
    answer:
      "Yes — we work with both homeowners and property managers. We understand timing matters for rental income and communicate realistic schedules for work between rental seasons.",
  },
  {
    questions: [
      "insurance claim",
      "homeowner insurance",
      "file a claim",
      "storm damage",
    ],
    intent: "faq",
    answer:
      "We can document conditions and provide detailed scopes that may support an insurance claim. We recommend a free inspection first so we can assess what's there and discuss your options.",
  },
  {
    questions: [
      "colors",
      "what colors",
      "gelcoat colors",
      "color options",
      "color choices",
    ],
    intent: "faq",
    answer:
      "Marine-grade gelcoat comes in a range of colors. Light grays and tans are most common for Shore decks as they minimize heat buildup in summer. We discuss color options during the inspection and quote process.",
  },
  {
    questions: [
      "prepare",
      "what should i do",
      "how to prepare",
      "before you come",
    ],
    intent: "faq",
    answer:
      "Just make sure we can access the deck — move furniture if possible. That's it. We handle everything else.",
  },
  {
    questions: [
      "cricket",
      "cricket drainage",
      "cricket system",
      "cricket drain",
    ],
    intent: "technical",
    answer:
      "Yes — on enclosed rooftop decks and applications where traditional drains aren't appropriate, we design and install seamless cricket systems that direct water toward scuppers. We've completed rooftop cricket drainage projects across the Shore.",
  },
  {
    questions: ["scupper", "what is a scupper", "scuppers"],
    intent: "technical",
    answer:
      "A scupper is an opening in the perimeter wall or edge of a deck that allows water to drain off the surface instead of pooling. We design cricket systems to direct water toward scuppers positioned at regular intervals — typically every 48–56 inches — for complete drainage on enclosed decks.",
  },
  {
    questions: ["sister joist", "what is a sister joist", "sistering joists"],
    intent: "technical",
    answer:
      'A sister joist is a new joist installed directly alongside an existing joist. In Pitch Correction repairs, we install sister joists along each original joist to create a new, true structural reference plane with the correct 1/4" per foot drainage slope — overriding any sag or incorrect pitch from the original framing. This is more effective than sleepers, which simply follow the imperfections of the existing joists.',
  },
  {
    questions: ["door pan", "what is a door pan", "door transition"],
    intent: "technical",
    answer:
      "A door pan is a custom-fabricated fiberglass transition system installed beneath and around the door threshold. It routes water from the door area to the deck surface and prevents infiltration beneath the door frame into the wall assembly. Missing or improperly installed door pans are one of the most common causes of interior leaks in homes with fiberglass decks.",
  },
  {
    questions: [
      "flashings",
      "what are flashings",
      "flashing height",
      "how high should flashings be",
    ],
    intent: "technical",
    answer:
      "Wall flashings should extend a minimum of 12 inches up all vertical surfaces above the deck. Post flashings should wrap a minimum of 6 inches vertically around each railing post and structural post penetration. During a free inspection we measure and assess every transition — flashings that are short, loose, or covered incorrectly are among the most common sources of hidden deck failures.",
  },
  {
    questions: [
      "hours",
      "business hours",
      "when are you open",
      "what time",
      "open saturday",
      "open sunday",
    ],
    intent: "hours",
    answer:
      "Monday through Saturday, 8:00 AM to 5:00 PM. Sundays by appointment. We typically respond to all inquiries the same day or next morning.",
    answerEs:
      "Trabajamos de lunes a sábado de 8:00 AM a 5:00 PM. Los domingos atendemos con cita previa. Normalmente respondemos el mismo día o a la mañana siguiente.",
  },
  {
    questions: [
      "who are you",
      "about you",
      "tell me about",
      "about seashore",
      "about the company",
    ],
    intent: "about",
    answer:
      "Seashore Fiberglass LLC is a family-owned business founded in 2020 by Francisco Ruiz in Ocean City, NJ — built on 10+ years of hands-on fiberglass experience along the Jersey Shore. We hold NJ Home Improvement Contractor License #13VH11005900, carry full general liability and workers' compensation insurance, and have 50+ five-star Google reviews with a perfect 5.0 rating. Francisco is personally involved in every project.",
  },
  {
    questions: [
      "contact",
      "phone number",
      "how to reach",
      "how do i contact",
      "call you",
    ],
    intent: "contact",
    answer:
      "Call or text us at (609) 338-4505, email seashorefiberglass@gmail.com, or fill out the contact form at seashorefiberglass.com/contact. We're at 406 Asbury Ave, Ocean City, NJ. Monday–Saturday 8:00 AM–5:00 PM, Sunday by appointment. We respond same day or next morning.",
  },
  // Section 5.9 — Real completed project examples
  {
    questions: [
      "past projects",
      "project examples",
      "examples of your work",
      "portfolio",
      "have you done",
      "projects you completed",
      "work you have done",
    ],
    intent: "faq",
    answer:
      "Here are some of our completed projects: Wildwood NJ — structural restoration after discovering severe framing rot from unflashed railing posts, full reglass after structural rebuild. Sea Isle City NJ — full reglass on severely aged, cracked, leaking deck, complete membrane renewal. Avalon NJ — recolor maintenance on a structurally sound deck with UV fade from oceanfront exposure. Wildwood NJ (new construction) — enclosed upper deck with cricket drainage into scuppers every 48–56 inches. Stone Harbor NJ — door pan leak repair, severe moisture damage from missing fiberglass door pan. Margate NJ — structural column post with no flashing caused extensive rot, full structural and flashing repair. Strathmere NJ — rooftop deck drainage converted from traditional drains to scupper system with cricket drainage. Cape May NJ — Pitch Correction on deck with reversed drainage, sister joists and complete rebuild. Long Beach Island — full composite deck and stair installation. Ocean City NJ — vinyl T-railing system integrated with fiberglass deck systems. You can see the full gallery at seashorefiberglass.com/gallery.",
  },
];

// ---------------------------------------------------------------------------
// SECTION 7 — LEAD CAPTURE SCRIPT
// ---------------------------------------------------------------------------

export const LEAD_CAPTURE = {
  step1:
    "It sounds like your deck could use an inspection. Our free inspections are completely no-pressure — we come out, walk the full system, and give you an honest assessment and scope. Want to get that set up?",
  step2: "Great! To get you on the schedule I'll need a few things:",
  step2Questions: [
    "What's your full name?",
    "What's the best phone number to reach you?",
    "What town is the property in?",
    "Can you briefly describe what you're seeing — soft spots, leaks, fading, pooling, or something else?",
  ],
  step3:
    "Perfect. You can submit all of this through our contact form and Francisco or his team will reach out same day or next morning to confirm your inspection time. Here's the link: seashorefiberglass.com/contact",
  step4:
    "You're in good hands — Seashore has been taking care of Shore decks for over 10 years and every inspection is completely free. Is there anything else I can help you with before you fill out the form?",
  step1Es:
    "¡Perfecto! Para coordinar tu inspección necesito algunos datos: ¿Cuál es tu nombre completo? ¿Cuál es el mejor número para contactarte? ¿En qué ciudad está la propiedad? ¿Puedes describirme brevemente qué está pasando con el deck — zonas blandas, filtraciones, agua estancada, decoloración, o algo más?",
  step3Es:
    "Puedes enviar toda esta información a través de nuestro formulario de contacto y Francisco o su equipo te contactará el mismo día o a la mañana siguiente para confirmar tu inspección. Aquí está el enlace: seashorefiberglass.com/contact",
  step4Es:
    "Estás en buenas manos — Seashore lleva más de 10 años cuidando decks en la costa de Jersey Shore y cada inspección es completamente gratis y sin compromiso.",
} as const;

// ---------------------------------------------------------------------------
// SECTION 8 — NEVER SAY LIST (engine enforcement)
// ---------------------------------------------------------------------------

export const NEVER_SAY_RULES = [
  "Never give a price quote or cost estimate",
  "Never say founded before 2020",
  "Never say Seashore establishes pitch as part of routine work — only Pitch Correction sub-repair",
  "Never say Seashore does not do framing",
  "Never say recolor every 5 years as a fixed rule — always 3-5 years depending on exposure",
  "Never say reglass every 10 years as a fixed rule — depends on membrane condition",
  "Never say rust-free for vinyl railing — say won't corrode, warp, or degrade",
  "Never recommend a specific service without asking about symptoms first",
  "Never guarantee insurance claim outcomes",
  "Never make negative comments about competitors",
  "Never say we work 7 days a week — Mon-Sat 8am-5pm, Sunday by appointment",
] as const;

// ---------------------------------------------------------------------------
// SECTION 9 — SPANISH LANGUAGE RESPONSES (key phrases)
// ---------------------------------------------------------------------------

export const SPANISH_RESPONSES = {
  welcome:
    "¡Hola! Soy el asistente de Seashore Fiberglass. Puedo ayudarte a entender qué necesita tu deck, confirmar si trabajamos en tu área y conectarte con nuestro equipo para una inspección gratuita. ¿Qué está pasando con tu deck?",
  collectingInfo:
    "¡Perfecto! Para coordinar tu inspección necesito algunos datos: ¿Cuál es tu nombre completo? ¿Cuál es el mejor número para contactarte? ¿En qué ciudad está la propiedad? ¿Puedes describirme brevemente qué está pasando con el deck — zonas blandas, filtraciones, agua estancada, decoloración, o algo más?",
  formLink:
    "Puedes enviar toda esta información a través de nuestro formulario de contacto y Francisco o su equipo te contactará el mismo día o a la mañana siguiente para confirmar tu inspección. Aquí está el enlace: seashorefiberglass.com/contact",
  reassurance:
    "Estás en buenas manos — Seashore lleva más de 10 años cuidando decks en la costa de Jersey Shore y cada inspección es completamente gratis y sin compromiso.",
  pricing:
    "Cada deck es diferente — el tamaño, la condición y lo que encontremos en la inspección determinan el precio. Nunca damos estimados sin ver el deck primero. La inspección es completamente gratis y sin compromiso. Puedo tomar tus datos ahora mismo para coordinar — ¿quieres que lo hagamos?",
  hours:
    "Trabajamos de lunes a sábado de 8:00 AM a 5:00 PM. Los domingos atendemos con cita previa. Normalmente respondemos el mismo día o a la mañana siguiente.",
  reviews:
    "Seashore Fiberglass tiene más de 50 reseñas de cinco estrellas en Google con una calificación perfecta de 5.0. Puedes leerlas directamente en nuestro perfil de Google Business. El enlace está disponible en nuestro sitio web seashorefiberglass.com.",
  urgent:
    "Para situaciones urgentes, llama o escríbele directamente a Francisco al (609) 338-4505 — es la forma más rápida de contactarnos.",
} as const;

// ---------------------------------------------------------------------------
// CHATBOT FORM ENUMS (used by widget UI)
// ---------------------------------------------------------------------------

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

export const CHATBOT_CONTACT_METHOD_OPTIONS = [
  "Call",
  "Text",
  "Email",
] as const;

export const CHATBOT_SCOPE_NOTE =
  "Seashore Fiberglass handles fiberglass deck repair, new construction, reglass restoration, recolor maintenance, composite decks, and vinyl railing across the South Jersey Shore.";
