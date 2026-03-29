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
  "Over 10 years of family-owned expertise installing, reglassing, and repairing fiberglass decks that stand up to salt air, UV exposure, high humidity, and winter freeze-thaw cycles. Waterproof. Non-slip. Built to last.";

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
      "For builders and homeowners starting fresh — fully engineered fiberglass systems with correct pitch, PVC perimeter edges, and proper flashing from the first day.",
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
      "Surface maintenance for structurally sound decks. Grind, repair minor cracks, clean with acetone, and apply new textured gelcoat. Recommended every 5 years.",
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
      "Rust-free, low-maintenance safety systems engineered for salty coastal air. New installs, repairs, and upgrades.",
  },
] as const;

export const REVIEWS = [
  {
    name: "Michael K.",
    city: "Ocean City NJ",
    stars: 5,
    quote:
      "Francisco and his crew replaced our rotted structural posts, re-secured the entire plywood substrate, and reglassed the deck in four days. Professional from start to finish.",
  },
  {
    name: "Resident",
    city: "Brigantine NJ",
    stars: 5,
    quote:
      "We had soft spots and nail pops everywhere. Seashore fixed the root cause — not just the surface. The deck is completely solid now. Highly recommend.",
  },
  {
    name: "Homeowner",
    city: "Margate City NJ",
    stars: 5,
    quote:
      "Honest quote, clean work, on time. They fixed our puddling issue by correcting the pitch properly. No more standing water.",
  },
  {
    name: "Client",
    city: "Avalon NJ",
    stars: 5,
    quote:
      "They did an exceptional job. Identified missing flashings we didn't even know were the problem. No more leaks.",
  },
  {
    name: "Resident",
    city: "Ventnor City NJ",
    stars: 5,
    quote:
      "Francisco explained the whole process clearly — why the deck was failing, exactly what they would do, and why. Our deck is perfect for summer now.",
  },
  {
    name: "Homeowner",
    city: "Cape May NJ",
    stars: 5,
    quote:
      "Upgraded our old drip edge to PVC and sealed everything properly. Everything they do is technically correct and built to last.",
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
