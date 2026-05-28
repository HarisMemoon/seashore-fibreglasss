/**
 * Seashore Fiberglass LLC — website copy
 * Source: Website Content & SEO Implementation Brief (54-page)
 */

export const SITE_NAME = "Seashore Fiberglass LLC";
export const TAGLINE =
  "Fiberglass Deck Experts — Ocean City NJ & South Jersey Shore";

/** Home page — meta from Website Brief / root layout */
export const HOME_META = {
  title:
    "Fiberglass Decks Ocean City NJ | Repair, Reglass & Installation Experts",
  description:
    "Family-owned fiberglass deck contractors in Ocean City NJ & South Jersey Shore. Expert repair, reglass restoration, resurfacing & recolor maintenance. 50+ 5-star reviews. Free inspections — call (609) 338-4505!",
} as const;

export const SERVICES_INDEX_META = {
  title:
    "Fiberglass Deck Services | Repair, Reglass & Installation — Ocean City NJ — Seashore Fiberglass",
  description:
    "Expert fiberglass deck repair, reglass restoration, recolor, new construction, composite decking & vinyl railing across Ocean City NJ & the South Jersey Shore. 50+ 5-star reviews — free inspections (609) 338-4505.",
} as const;

export const SERVICE_AREAS_INDEX_META = {
  title:
    "Service Areas | South Jersey Shore Fiberglass Deck Contractors — Seashore Fiberglass",
  description:
    "Fiberglass deck repair & installation in Ocean City, LBI, Brigantine, Margate, Avalon, Cape May & towns across the Jersey Shore. Local coastal expertise — free inspections (609) 338-4505.",
} as const;

export const HERO_HEADING =
  "Fiberglass Decks Built for the Jersey Shore — Ocean City NJ & Beyond";

export const HERO_SUBHEADING =
  "Founded in 2020 — built on 10+ years of fiberglass experience installing, reglassing, and repairing fiberglass decks that stand up to salt air, UV exposure, high humidity, and winter freeze-thaw cycles. Waterproof. Non-slip. Built to last.";

export const HERO_PRIMARY_CTA = "Get Your FREE Inspection & Quote";
export const HERO_SECONDARY_CTA = "Call / Text (609) 338-4505";

export const TRUST_BADGES = [
  "Licensed & Insured",
  "50+ 5-Star Google Reviews",
  "Family-Owned in Ocean City NJ",
  "Work Guaranteed",
] as const;

export const SHORE_SECTION_TITLE = "Built for the Jersey Shore";
export const SHORE_SECTION_BODY =
  "The South Jersey Shore is beautiful — but it is demanding on outdoor structures. Salt spray carried by ocean and bay winds accelerates corrosion of metal components and degrades materials not designed for coastal conditions. High humidity — often 80–90% in summer — keeps building materials damp and promotes moisture-related deterioration. Intense UV radiation gradually breaks down gelcoat surfaces. And winter freeze-thaw cycles expand small cracks into significant failures over time.";

/** Home page — “Why Fiberglass” hero (split headline + intro) */
export const SHORE_HOME_HEADLINE_PREFIX = "Built for the";
export const SHORE_HOME_HEADLINE_ACCENT = "Shore's Worst";
export const SHORE_HOME_INTRO =
  "Fiberglass decking is engineered as a seamless, pitched waterproof system — exactly what exposed shore decks need when the coast works against ordinary materials.";

/** Four challenge cards (2×2 grid) — titles + body copy */
export const SHORE_HOME_STRESSORS = [
  {
    title: "Salt spray",
    body: "Ocean and bay winds drive salt into fasteners, flashings, and finishes — year-round.",
  },
  {
    title: "Coastal humidity",
    body: "80–90% summer humidity keeps assemblies damp and vulnerable to rot and mold.",
  },
  {
    title: "UV intensity",
    body: "Sustained sun breaks down gelcoat and accelerates surface aging without protection.",
  },
  {
    title: "Freeze–thaw",
    body: "Winter cycles expand hairline defects into active leaks and structural damage.",
  },
] as const;

/** Long “why fiberglass” narrative card on the home page */
export const SHORE_HOME_WHY_PARAGRAPHS = [
  "Unlike wood or ordinary composite boards, a properly built fiberglass deck behaves as one continuous waterproof membrane — no open joints between boards, no grain wicking salt water, and no ring-shank-only details that loosen as the Shore cycles seasons.",
  "That membrane only protects you if the structure underneath drains: correct framing establishes a minimum 1/4″ per foot slope so water heads to edges and drains instead of pooling where it can creep toward living space.",
  "Our baseline spec includes 12″ wall flashings and 6″ fiberglass post wraps wherever rails and framing pierce the deck plane — exactly where wind-driven rain tries to cheat the system.",
  "Installed to those standards, a fiberglass assembly is a long-lasting deck with recolor maintenance every 3–5 years depending on coastal exposure — not a patch-and-pray treadmill.",
] as const;

export const SHORE_HOME_BUILT_DIFFERENT_TITLE = "Built different — by spec";
export const SHORE_HOME_BUILT_DIFFERENT_SUB =
  "Every layer has a minimum. Tap a system to see how the specs stack together on every job we do.";

export const SHORE_SPECS = [
  '3/4″ CDX + 1/2″ ACX dual-layer plywood substrate',
  "2-oz fiberglass mat with resin — seamless membrane",
  'Wall flashings minimum 12″ up vertical surfaces',
  'Post flashings minimum 6″ vertical wrap',
  '1/4″ per foot drainage pitch',
  "PVC/Azek drip edges — rot-proof perimeter",
] as const;

export const SERVICES = [
  {
    slug: "fiberglass-deck-repair",
    title: "Fiberglass Deck Repair",
    description:
      "Diagnose and permanently fix puddling, soft spots, structural rot, missing flashings, improper door transitions, and deteriorated drip edges. Every repair begins with a full structural inspection.",
  },
  {
    slug: "fiberglass-deck-new-constructions",
    title: "Fiberglass Deck New Construction",
    description:
      "For newly built structures where the deck has been framed with the correct drainage slope and the first layer of plywood is already in place. We install the second plywood layer and complete the full fiberglass system — PVC drip edges, wall and post flashings, fiberglass membrane, and gelcoat finish.",
  },
  {
    slug: "fiberglass-deck-resurfacing",
    title: "Fiberglass Deck Resurfacing (Reglass)",
    description:
      "A full membrane renewal. We re-secure the plywood substrate, correct drip edges and flashings, install a new 2-oz fiberglass layer, and finish with fresh textured gelcoat.",
  },
  {
    slug: "fiberglass-deck-recolor",
    title: "Fiberglass Deck Recolor (Re-Gelcoating)",
    description:
      "Surface maintenance for structurally sound decks. Grind, repair minor cracks, clean with acetone, and apply new textured gelcoat. Recommended every 3–5 years depending on coastal exposure.",
  },
  {
    slug: "composite-decks",
    title: "Composite Decks & Deck Steps",
    description:
      "Wolf decking and Azek PVC fascias — proven in high-humidity, salt-spray environments. A premium low-maintenance option for coastal homes.",
  },
  {
    slug: "vinyl-railing",
    title: "Vinyl Railing",
    description:
      "Vinyl railing won't corrode, warp, or degrade in salt air and high humidity — the top coastal choice for low-maintenance safety. New installs, repairs, and upgrades.",
  },
] as const;

export const GBP_URL = "https://share.google/onLnkKrF7sB4hui1e";
export const REVIEWS_FOOTER_TEXT = "See all our reviews on Google ★★★★★";

export const REVIEWS = [
  {
    name: "Anne Marie Holloran",
    city: "Ocean City, NJ",
    stars: 5,
    reviewDate: "September 2025",
    photoCount: 13,
    images: [
      "/reviews/r11.webp",
      "/reviews/r12.webp",
      "/reviews/r13.webp",
      "/reviews/r14.webp",
      "/reviews/r15.webp",
      "/reviews/r16.webp",
      "/reviews/r17.webp",
      "/reviews/r18.webp",
      "/reviews/r19.webp",
      "/reviews/r110.webp",
      "/reviews/r111.webp",
      "/reviews/r112.webp",
      "/reviews/r113.webp",
    ] as readonly string[],
    quote:
      "Francisco and his team completed work on our front deck, back deck and our roof deck, including the steps. Not only were they capable of re-fiberglassing the decks, but they were able to replace and repair damaged plywood, replace a column that had been built with non-pressurized wood that was rotting that we did not know until it was opened up and correctly built a water ledge under our outside door to prevent water splashing under and causing rot. He was wonderful to communicate with when we were not there and sent texts and pictures with updates of the job as it was going along. Seashore Fiberglass is a reliable and excellent company to work with. He also replaced the front deck ledges that were rotting with the correct edging. They know what they are doing. Highly recommend!",
  },
  {
    name: "Brad Zacharia",
    city: "Ocean City, NJ",
    stars: 5,
    reviewDate: "October 2025",
    photoCount: 0,
    images: [] as readonly string[],
    quote:
      "We have 14 decks in our condo association that are 20 years old and have been re-done several times but we always got leaks at posts because no one ever flared up the posts. Seashore came out and showed me how the posts were only attached to the floor with a bracket. Now we have new posts that are attached to the sides of the beams. One owner already commented that he had never seen the posts that solid. All the times we had these decks done no contractor ever pointed out these issues that Seashore and I know are not good. I am glad we found them. Good work can be priceless.",
  },
  {
    name: "eric butter",
    city: "South Jersey Shore",
    stars: 5,
    reviewDate: "September 2025",
    photoCount: 1,
    images: ["/reviews/r21.webp"] as readonly string[],
    quote:
      "Amazing amazing amazing is all I can say. Still stunned at the end result of the finish product of the deck and steps. Francisco was great to work with!! Him and his team were very professional and super meticulous. If you need your step's replaced or your deck refiberglassed look no further!!!",
  },
  {
    name: "Bob Seltzer",
    city: "Ocean City, NJ",
    stars: 5,
    reviewDate: "February 2026",
    photoCount: 0,
    images: [] as readonly string[],
    quote:
      "Francisco and his team are amazing. From the detailed quote to completion of the job — they do not stop — often working sun up to sun down. Their pricing is most competitive. Their craftsmanship is great, with attention to detail during every phase of the job. We were very pleased in selecting them as our contractors for our decks and stairs.",
  },
  {
    name: "Glenn McKinski",
    city: "Ocean City, NJ",
    stars: 5,
    reviewDate: "January 2026",
    photoCount: 0,
    images: [] as readonly string[],
    quote:
      "I couldn't be happier with the work by Francisco and his team. Our new decks and railings look beautiful! Francisco and his crew are good workers. The job was finished in a little over a week, boy did the crew work hard. We waited several months to get started but it was worth the wait. Francesco went above and beyond. I would 100% recommend Seashore Fiberglass if you need decks or railings.",
  },
  {
    name: "JLex",
    city: "South Jersey Shore",
    stars: 5,
    reviewDate: "October 2025",
    photoCount: 1,
    images: ["/reviews/r41.webp"] as readonly string[],
    quote:
      "You need this company!!! I'm a Union Contractor and I will only use top rated people. Francisco and his crew are a true dream team. Total pros!!! I will absolutely give him business in the future for my clients!!!",
  },
] as const;

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

export const FINAL_CTA_TITLE = "Ready to Get Your Deck Shore-Ready?";
export const FINAL_CTA_BODY =
  "Whether you need a repair, reglass restoration, recolor maintenance, or a brand-new fiberglass deck — we provide free inspections and honest assessments. No pressure, just clear technical answers.";

export const PHONE = "(609) 338-4505";
export const EMAIL = "info@seashorefiberglass.com";

export const ADDRESS = {
  street: "406 Asbury Ave",
  city: "Ocean City",
  state: "NJ",
  zip: "08226",
};

export * from "./about";
export * from "./faq";
export * from "./contact";
export * from "./gallery";
export * from "./blog";
export * from "./services-detail";
export * from "./service-areas-detail";
export * from "./service-area-map";
