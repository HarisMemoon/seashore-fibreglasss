/** FAQs — source: Website Brief / PROJECT_CONTEXT.md */

import type { FaqCategory } from "@seashore/types";

export const FAQ_META = {
  title: "Fiberglass Deck FAQs Ocean City NJ | Repair, Reglass & Maintenance Questions",
  description:
    "Frequently asked questions about fiberglass deck repair, reglass restoration, recolor maintenance & more in Ocean City NJ & South Jersey Shore. Expert answers — call (609) 338-4505",
} as const;

export const FAQ_H1 = "Frequently Asked Questions — Fiberglass Decks & Coastal Services";

export const FAQ_CATEGORIES: readonly FaqCategory[] = [
  {
    id: "general",
    label: "General",
    items: [
      {
        question: "What makes fiberglass decks better than wood or composite for coastal homes?",
        answer:
          "Fiberglass creates a continuous waterproof membrane over a properly built plywood substrate — ideal when your deck is over living space or you need true waterproofing. Wood rots; composite is excellent for walking surfaces but does not replace a fiberglass membrane when drainage and flashings must be bulletproof in salt air, humidity, and UV. We often pair composite walking surfaces with fiberglass waterproofing where the project demands both.",
      },
      {
        question: "How long does a fiberglass deck last?",
        answer:
          "With correct installation and maintenance, many fiberglass deck systems last decades. Surface maintenance (recolor) is typically recommended on a roughly five-year cycle for UV protection and appearance; a full reglass restoration may be closer to a ten-year interval depending on exposure and condition — we assess each deck individually.",
      },
      {
        question: "Do fiberglass decks need to be above living spaces to be worth the investment?",
        answer:
          "The greatest value is usually over living space — where leaks are costly and waterproofing is non-negotiable. That said, fiberglass is also used on elevated decks and walkouts where durability, slip resistance, and a sealed membrane are priorities. We will tell you honestly whether fiberglass, composite, or another approach fits your situation.",
      },
    ],
  },
  {
    id: "repair",
    label: "Repair & Maintenance",
    items: [
      {
        question: "How do I know if my deck needs repair?",
        answer:
          "Warning signs include standing water after rain, soft or bouncy areas underfoot, cracks or chalking in the gelcoat, visible gaps at flashings or door transitions, leaks inside, nail pops, or deterioration at drip edges. If you notice any of these, a professional inspection can identify whether you need maintenance (recolor), membrane renewal (reglass), or structural work.",
      },
      {
        question: "What is the difference between recolor maintenance and reglass restoration?",
        answer:
          "Recolor (re-gelcoating) is surface-level: for structurally sound decks with faded gelcoat or minor cosmetic wear — grind, repair hairline cracks, clean, and apply new textured gelcoat. Reglass is a full membrane renewal: re-secured plywood, corrected drip edges and flashings, new fiberglass layer, and gelcoat — for widespread cracking, failed patches, nail pops, or compromised waterproofing.",
      },
      {
        question: "What is structural reconstruction, and when is it needed?",
        answer:
          "Structural reconstruction addresses rotted joists, posts, or substrate failures — often after long-term leaks or improper detailing. It may include sistering or replacing joists, rebuilding posts and column details, and re-establishing pitch before new fiberglass. We only recommend it when inspection shows damage that surface work cannot safely ignore.",
      },
      {
        question: "How long do repairs typically take?",
        answer:
          "Typical ranges: recolor projects often run about 1–2 days; isolated soft spot repairs commonly about 2–4 days; full reglass restorations often about 4–7 days; larger structural reconstructions may run 7–14 days depending on scope. We give a written timeline after inspection.",
      },
    ],
  },
  {
    id: "technical",
    label: "Technical",
    items: [
      {
        question: "Why do leaks sometimes appear far from where the deck meets the wall?",
        answer:
          "Water travels along framing, flashings, and penetrations before it shows up inside — sometimes feet away from the entry point. That is why we inspect transitions, posts, door pans, and drip edges system-wide, not only the wall line.",
      },
      {
        question: "Why do structural posts inside columns cause so many problems?",
        answer:
          "Posts are penetrations through the waterproofing plane. If the post base is not flashed and integrated with the membrane, water follows the post or sleeve into the structure. We detail post flashings with adequate vertical wrap (minimum 6″) and compatible transitions so the column does not become a straw for water.",
      },
      {
        question: "Why is deck pitch so important?",
        answer:
          "Standing water accelerates membrane wear, adds load, and finds any weakness. Industry-standard slope is typically 1/4″ per foot toward drainage. Without it, even good fiberglass work can be undermined by ponding and freeze-thaw.",
      },
      {
        question: "Can fiberglass be applied over an existing deck?",
        answer:
          "Often yes — reglass and recolor projects work over existing plywood substrates when they are structurally sound, properly fastened, and prepared. If the substrate is rotted or moving, we repair or replace it first so the new membrane has a solid foundation.",
      },
    ],
  },
  {
    id: "working",
    label: "Working With Us",
    items: [
      {
        question: "Are you licensed and insured?",
        answer:
          "Yes. Seashore Fiberglass LLC is a licensed New Jersey contractor and carries liability and workers’ compensation insurance. We are happy to provide documentation for your records.",
      },
      {
        question: "Do you offer free inspections?",
        answer:
          "Yes. We provide free inspections and clear, written assessments so you understand what is failing, why, and what options fit your budget and timeline.",
      },
      {
        question: "How do we get started?",
        answer:
          "Call or text (609) 338-4505, email info@seashorefiberglass.com, or use the contact form on this site. We respond the same day or the next morning, schedule your inspection, then provide an honest quote — no pressure.",
      },
    ],
  },
] as const;
