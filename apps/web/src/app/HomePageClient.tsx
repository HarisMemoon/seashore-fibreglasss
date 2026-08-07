"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BEST_TIME_OPTIONS,
  CONTACT_FORM_MESSAGE_PLACEHOLDER,
  SERVICE_INQUIRY_OPTIONS,
  FINAL_CTA_BODY,
  FINAL_CTA_TITLE,
  GALLERY_ITEMS,
  getHomeCoverageGridCaption,
  HERO_HEADING,
  HERO_PRIMARY_CTA,
  HERO_SECONDARY_CTA,
  HERO_SUBHEADING,
  HOME_COVERAGE_STATS_LABELS,
  HOME_COVERAGE_SUBHEAD,
  GBP_URL,
  PHONE,
  REVIEWS,
  REVIEWS_FOOTER_TEXT,
  SERVICES,
  SERVICE_AREA_FORM_OPTIONS,
  SERVICE_AREA_DETAILS,
  SHORE_HOME_BUILT_DIFFERENT_SUB,
  SHORE_HOME_BUILT_DIFFERENT_TITLE,
  SHORE_HOME_HEADLINE_ACCENT,
  SHORE_HOME_HEADLINE_PREFIX,
  SHORE_HOME_INTRO,
  SHORE_HOME_STRESSORS,
  SHORE_HOME_WHY_PARAGRAPHS,
  SHORE_SPECS,
  SITE_NAME,
  TRUST_BADGES,
} from "@seashore/content";
import { BBBSeal } from "@seashore/ui";
import { postContact, type PostContactError } from "@/lib/postContact";
import { StyledSelect } from "@/components/StyledSelect";

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0 },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const staggerQuick = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.065, delayChildren: 0.05 } },
};
const scaleUp = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

function InView({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-turquoise">
      <span className="h-px w-10 bg-gradient-to-r from-turquoise to-turquoise/0" />
      {children}
    </span>
  );
}

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          className="h-4 w-4 fill-orange drop-shadow-sm"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function AnimatedCounter({
  target,
  suffix = "",
}: {
  target: string;
  suffix?: string;
}) {
  const num = parseInt(target.replace(/\D/g, ""), 10) || 0;
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry && entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(el);

    // Fallback: if element is already visible on mount, start immediately
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setStarted(true);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started || num <= 0) return;
    let current = 0;
    const totalSteps = 40;
    const step = Math.max(1, Math.floor(num / totalSteps));
    const interval = setInterval(() => {
      current += step;
      if (current >= num) {
        setCount(num);
        clearInterval(interval);
      } else {
        setCount(current);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [started, num]);

  const hasPlus = target.includes("+");

  return (
    <div ref={ref}>
      <span className="tabular-nums">
        {started ? count : num}
        {hasPlus ? "+" : ""}
        {suffix}
      </span>
    </div>
  );
}

function NoiseOverlay() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
      }}
    />
  );
}

type LiveGoogleReview = {
  name: string;
  quote: string;
  city: string;
  stars: number;
  reviewDate?: string;
  photoCount?: number;
  images?: readonly string[];
};

const serviceIcons: Record<string, React.ReactNode> = {
  repair: (
    <svg
      className="h-7 w-7"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
    >
      <path
        strokeLinecap="round"
        d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
      />
    </svg>
  ),
  construction: (
    <svg
      className="h-7 w-7"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
    >
      <path
        strokeLinecap="round"
        d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
      />
    </svg>
  ),
  resurfacing: (
    <svg
      className="h-7 w-7"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
    >
      <path
        strokeLinecap="round"
        d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
      />
    </svg>
  ),
  gelcoat: (
    <svg
      className="h-7 w-7"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
    >
      <path
        strokeLinecap="round"
        d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
      />
    </svg>
  ),
  composite: (
    <svg
      className="h-7 w-7"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
    >
      <path
        strokeLinecap="round"
        d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
      />
    </svg>
  ),
  railing: (
    <svg
      className="h-7 w-7"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
    >
      <path
        strokeLinecap="round"
        d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 3v18m6-18v18M3.75 9h16.5M3.75 15h16.5"
      />
    </svg>
  ),
};

/** Short 2-3 sentence summaries for the homepage service cards */
const SERVICE_CARD_SUMMARIES: Record<string, string> = {
  "fiberglass-deck-repair":
    "We diagnose and permanently fix puddling, soft spots, structural rot, missing flashings, and deteriorated drip edges. Every repair starts with a full structural inspection — so we fix the cause, not just the symptom.",
  "fiberglass-deck-new-constructions":
    "For newly framed homes, we install the plywood overlay and complete the full fiberglass waterproofing system — drip edges, wall and post flashings, fiberglass membrane, and gelcoat finish. Built to be watertight from day one.",
  "fiberglass-deck-resurfacing":
    "Full membrane renewal for structurally sound decks. We re-secure the existing plywood, correct drip edges and flashings, apply a new fiberglass layer, and finish with fresh textured gelcoat for a like-new, watertight surface.",
  "fiberglass-deck-recolor":
    "Surface maintenance for structurally sound decks — we grind, repair minor cracks, and apply a fresh textured gelcoat. Recommended every 3–5 years to keep your deck protected against coastal exposure.",
  "composite-decks":
    "Wolf decking and Azek PVC fascias built to handle high humidity and salt spray. A premium, low-maintenance decking option designed for coastal homes.",
  "vinyl-railing":
    "Vinyl railing won't corrode, warp, or degrade in salt air and humidity — the top low-maintenance choice for coastal safety. We handle new installs, repairs, and upgrades.",
};

function ServicesSection() {
  const iconKeys = Object.keys(serviceIcons);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f8fafc] to-white px-6 py-28">
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(to right,#0d2d4a 1px,transparent 1px),linear-gradient(to bottom,#0d2d4a 1px,transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="pointer-events-none absolute -right-32 top-0 h-[400px] w-[400px] rounded-full bg-turquoise/8 blur-[120px] max-sm:hidden" />
      <div className="pointer-events-none absolute -left-24 bottom-1/3 h-[320px] w-[320px] rounded-full bg-orange/[0.05] blur-[100px] max-sm:hidden" />

      <div className="relative mx-auto max-w-7xl">
        <InView className="text-center">
          <SectionLabel>What We Do</SectionLabel>
          <h2 className="font-heading mt-5 text-[clamp(2rem,3.8vw,3rem)] font-extrabold text-navy">
            Our Core Services
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[1.05rem] leading-relaxed text-slate-500">
            Every service is engineered for South Jersey Shore conditions —
            salt, humidity, UV, freeze-thaw.
          </p>
        </InView>

        {/* Service cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => {
            const iconKey = iconKeys[i] ?? "repair";
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200/70 bg-white p-8 shadow-[0_8px_48px_rgba(13,45,74,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:border-turquoise/40 hover:shadow-[0_20px_64px_rgba(13,45,74,0.14)]"
              >
                <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-turquoise via-turquoise-light to-orange transition-transform duration-300 group-hover:scale-x-100" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-turquoise/[0.04] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-navy to-[#0d4a5c] text-turquoise shadow-lg shadow-navy/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:scale-110 group-hover:from-turquoise group-hover:to-orange group-hover:text-white group-hover:shadow-turquoise/30">
                  <span className="[&_svg]:size-6">{serviceIcons[iconKey]}</span>
                </div>
                <h3 className="relative font-heading text-xl font-extrabold leading-tight text-navy transition-colors duration-300 group-hover:text-turquoise-dark">
                  {service.title}
                </h3>
                <p className="relative mt-3 flex-1 text-[0.95rem] leading-[1.7] text-slate-500">
                  {SERVICE_CARD_SUMMARIES[service.slug] ?? service.description}
                </p>
                <Link
                  href={`/services/${service.slug}`}
                  className="group/link relative mt-6 inline-flex w-fit items-center gap-2 text-sm font-bold text-navy transition-colors hover:text-turquoise-dark"
                >
                  Learn more
                  <svg
                    className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* All services link */}
        <InView className="mt-10 flex justify-center">
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-navy"
          >
            Browse all services
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden
            >
              <path
                fillRule="evenodd"
                d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </InView>
      </div>
    </section>
  );
}

const SHORE_STANDARD_LABELS = [
  "Substrate",
  "Membrane",
  "Wall flashings",
  "Post flashings",
  "Drainage slope",
  "Drip edges",
] as const;

const shoreStressorIconEls = [
  <svg
    className="h-6 w-6"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 14c2.25-3.25 5.25-3.25 7.5 0s5.25 3.25 7.5 0 5.25-3.25 7.5 0M3 18.25c2.25-3.25 5.25-3.25 7.5 0s5.25 3.25 7.5 0 5.25-3.25 7.5 0"
    />
  </svg>,
  <svg
    className="h-6 w-6"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3.75c-1.25 3-4.5 5.9-4.5 9.65a4.5 4.5 0 109 0c0-3.75-3.25-6.65-4.5-9.65z"
    />
  </svg>,
  <svg
    className="h-6 w-6"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      d="M12 3v2.25M12 18.75V21M4.219 4.219l1.591 1.591M18.19 18.191l1.591 1.591M3 12h2.25M18.75 12H21M4.219 19.781l1.591-1.591M18.19 5.809l1.591-1.591"
    />
    <circle cx="12" cy="12" r="3.75" />
  </svg>,
  <svg
    className="h-6 w-6"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3v4.5m0 9V21m-6-7.5h4.5M13.5 10.5H18M9 10.125L7.875 12 9 13.875M15 10.125 16.125 12 15 13.875M12 12h.008v.008H12z"
    />
  </svg>,
] as const;

type ShoreStandardsFilterKey = "all" | "base" | "flashing" | "drain_perim";

const SHORE_STANDARD_FILTERS: readonly {
  key: ShoreStandardsFilterKey;
  label: string;
  description: string;
  indices: readonly number[];
  customContent?: { sections: { heading: string; items: string[] }[] };
}[] = [
  {
    key: "all",
    label: "Full system",
    description:
      "The complete shoreline assembly — how substrate, fiberglass, flashing, drainage, and perimeter detailing stack together on every job.",
    indices: [0, 1, 2, 3, 5],
  },
  {
    key: "base",
    label: "Base & fiberglass",
    description:
      "Substrate scope adapts to the project type — paired with a resin-saturated fiberglass skin that creates a seamless waterproof membrane before gelcoat ever goes down.",
    indices: [0, 1],
    customContent: {
      sections: [
        {
          heading: "Standard reglass projects:",
          items: [
            "Existing plywood remains in place.",
            "Plywood is re-secured to framing with screws at proper spacing (typically every 6″ along joists).",
            "New 2-oz fiberglass mat with resin is installed over the existing substrate.",
            "Marine-grade textured gelcoat finish.",
          ],
        },
        {
          heading: "Full deck rebuilds:",
          items: [
            "New 3/4″ CDX subfloor + new 1/2″ ACX overlay.",
            "New continuous fiberglass membrane.",
            "All flashings, drip edges, and transitions corrected as part of the rebuild.",
          ],
        },
      ],
    },
  },
  {
    key: "flashing",
    label: "Wall & posts",
    description:
      "Where decking meets siding and posts — shore wind‑driven rain looks for shortcuts first; minimum heights keep water routed out, not inward.",
    indices: [2, 3],
  },
  {
    key: "drain_perim",
    label: "Pitch & perimeter",
    description:
      "Drainage slope is established at the joist level during framing — scope and responsibility vary by project type. PVC/Azek drip edges seal the deck perimeter against salt splash and rot.",
    indices: [4, 5],
    customContent: {
      sections: [
        {
          heading: "Drainage slope:",
          items: [
            "New construction: Slope is built into the framing by the builder BEFORE Seashore arrives. Seashore verifies the slope is correct, then proceeds with the waterproofing system.",
            "Pitch Correction (only when needed): When a deck was originally built with the slope going the wrong direction (toward the house), we perform a Pitch Correction repair — complete plywood demolition, sister joists installed alongside each existing joist, and a new drainage plane built at 1/4″ per foot.",
            "Standard reglass / recolor: We work on top of the existing slope. We do NOT modify pitch as part of routine resurfacing or recolor work.",
          ],
        },
        {
          heading: "Perimeter:",
          items: [
            "PVC / Azek drip edges (never wood — wood drip edges rot and fail).",
            "Wall flashings: minimum 12″ up vertical surfaces.",
            "Post flashings: minimum 6″ vertical wrap around every penetration.",
          ],
        },
      ],
    },
  },
];

/** Order matches SHORE_STANDARD_FILTERS — sizing matches Core Services tabs */
const shoreStandardTabIcons: React.ReactNode[] = [
  <svg
    className="h-7 w-7"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.6}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 7.5l-9-5.25L3 7.5l9 5.25 9-5.25zM3 15.75l9 5.25 9-5.25M3 11.625l9 5.25 9-5.25"
    />
  </svg>,
  <svg
    className="h-7 w-7"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.6}
  >
    <path
      strokeLinecap="round"
      d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
    />
  </svg>,
  <svg
    className="h-7 w-7"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.6}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 21h19.5M4.5 3h15M5.25 3v18m4.5-18v9m4.5-9v18M3.75 9h16.5M3.75 15h16.5"
    />
  </svg>,
  <svg
    className="h-7 w-7"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.6}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 16.5l6-6 4 4 7-7.5M3 16.5V21h4.5M21 7.5L16.5 3M16.5 3H12v4.5"
    />
  </svg>,
];

const SHORE_WORK_COMMITMENTS: readonly { text: string; sub: string }[] = [
  { text: "Work guaranteed", sub: "Done right, or we make it right" },
  { text: "10-year warranty", sub: "Workmanship on our installs" },
  { text: "Licensed & insured", sub: "NJ contractor — ask for docs" },
];

function ShoreFiberglassSection() {
  const [standardFilter, setStandardFilter] =
    useState<ShoreStandardsFilterKey>("all");
  const activeFilter =
    SHORE_STANDARD_FILTERS.find((f) => f.key === standardFilter) ??
    SHORE_STANDARD_FILTERS[0];
  const activeStandardTabIndex = Math.max(
    0,
    SHORE_STANDARD_FILTERS.findIndex((t) => t.key === standardFilter),
  );
  const activeStandardIcon =
    shoreStandardTabIcons[activeStandardTabIndex] ?? shoreStandardTabIcons[0];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#fdf8f0] via-[#f8fafc] to-white px-6 py-28">
      {/* Top transition from sandy amber strip */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/60 to-transparent" />

      {/* Grid background — same as hero */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(to right,#0d2d4a 1px,transparent 1px),linear-gradient(to bottom,#0d2d4a 1px,transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Ambient orbs — turquoise + orange, same as hero */}
      <div className="pointer-events-none absolute -right-32 top-0 h-[480px] w-[480px] rounded-full bg-turquoise/[0.07] blur-[120px] max-sm:hidden" />
      <div className="pointer-events-none absolute -left-24 bottom-1/3 h-[320px] w-[320px] rounded-full bg-orange/[0.05] blur-[100px] max-sm:hidden" />
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-[200px] w-[200px] -translate-x-1/2 rounded-full bg-turquoise/[0.04] blur-[80px] max-sm:hidden" />

      <div className="relative mx-auto max-w-7xl">
        {/* ── HEADER ─────────────────────────────────────── */}
        <motion.div
          className="mx-auto max-w-3xl text-center"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-turquoise/25 bg-white/90 px-5 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-turquoise shadow-sm backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-turquoise opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-turquoise" />
              </span>
              Why fiberglass
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="font-heading mt-6 text-[clamp(2rem,3.8vw,3rem)] font-extrabold leading-[1.08] tracking-tight text-navy"
          >
            {SHORE_HOME_HEADLINE_PREFIX}{" "}
            <span className="italic text-turquoise">
              {SHORE_HOME_HEADLINE_ACCENT}
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-5 text-[1.05rem] leading-relaxed text-slate-500"
          >
            {SHORE_HOME_INTRO}
          </motion.p>
        </motion.div>

        {/* ── SHORE CHALLENGES (left) + NARRATIVE (right) ── */}
        <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-14">
          <motion.div
            variants={staggerQuick}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            className="flex flex-col gap-4"
          >
            {SHORE_HOME_STRESSORS.map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
                }}
                className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_14px_48px_-22px_rgba(13,45,74,0.18)] ring-1 ring-white transition-all duration-300 hover:border-turquoise/30 hover:shadow-[0_20px_56px_-20px_rgba(13,121,137,0.22)]"
              >
                <div
                  className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-turquoise via-turquoise-light to-navy/40 transition-transform duration-500 group-hover:scale-x-100"
                  aria-hidden
                />

                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-turquoise/[0.07] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden
                />

                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-turquoise/12 to-navy/[0.04] text-turquoise ring-1 ring-turquoise/15 transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-turquoise group-hover:to-[#0d4a5c] group-hover:text-white group-hover:shadow-md group-hover:shadow-turquoise/25 group-hover:ring-transparent">
                    {shoreStressorIconEls[i]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-heading text-lg font-bold text-navy">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500">
                      {item.body}
                    </p>
                  </div>
                </div>

                <span className="pointer-events-none absolute bottom-3 right-4 font-heading text-[2rem] font-extrabold leading-none text-slate-100 select-none transition-colors duration-300 group-hover:text-turquoise/10 sm:bottom-4 sm:right-5 sm:text-[2.5rem]">
                  {i + 1}
                </span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={staggerQuick}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            className="relative overflow-hidden rounded-3xl border border-slate-200/75 bg-white/85 px-8 py-10 shadow-[0_18px_60px_-28px_rgba(13,45,74,0.16)] backdrop-blur-sm sm:px-11 sm:py-12 lg:sticky lg:top-28"
          >
            <motion.div
              variants={fadeUp}
              aria-hidden
              className="absolute left-0 top-0 hidden h-full w-1 bg-gradient-to-b from-turquoise via-turquoise-light to-navy/20 sm:block"
            />

            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 top-8 h-48 w-48 rounded-full bg-turquoise/[0.06] blur-[72px] max-sm:hidden"
            />

            <div className="relative space-y-5 sm:pl-6">
              {SHORE_HOME_WHY_PARAGRAPHS.map((paragraph, i) => (
                <motion.p
                  key={paragraph.slice(0, 52)}
                  variants={fadeUp}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className={`text-[1.05rem] leading-[1.9] text-slate-600 ${i > 0 ? "border-t border-slate-100 pt-5" : ""}`}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── BUILT DIFFERENT — Core Services pattern ── */}
        <div className="mt-24">
          <InView className="text-center">
            <SectionLabel>Our standard</SectionLabel>
            <h2 className="font-heading mt-5 text-[clamp(2rem,3.8vw,3rem)] font-extrabold text-navy">
              {SHORE_HOME_BUILT_DIFFERENT_TITLE}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[1.05rem] leading-relaxed text-slate-500">
              {SHORE_HOME_BUILT_DIFFERENT_SUB}
            </p>
          </InView>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-12 flex flex-wrap justify-center gap-3"
            role="tablist"
            aria-label="Deck assembly layers"
          >
            {SHORE_STANDARD_FILTERS.map((tab, i) => {
              const isActive = tab.key === standardFilter;
              return (
                <button
                  key={tab.key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setStandardFilter(tab.key)}
                  className={`group relative inline-flex min-h-[2.75rem] items-center justify-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise/60 ${
                    isActive
                      ? "border-turquoise bg-navy text-white shadow-lg shadow-navy/30"
                      : "border-slate-200 bg-white text-slate-600 hover:border-turquoise/50 hover:bg-navy/5 hover:text-navy"
                  }`}
                >
                  <span
                    className={`inline-flex size-5 shrink-0 items-center justify-center [&_svg]:block [&_svg]:size-5 [&_svg]:shrink-0 ${
                      isActive
                        ? "text-turquoise"
                        : "text-slate-400 group-hover:text-turquoise"
                    }`}
                    aria-hidden
                  >
                    {shoreStandardTabIcons[i]}
                  </span>
                  <span className="leading-snug">{tab.label}</span>
                  {isActive ? (
                    <motion.span
                      layoutId="shore-standard-tab-dot"
                      className="inline-flex size-1.5 shrink-0 items-center justify-center rounded-full bg-turquoise"
                    />
                  ) : null}
                </button>
              );
            })}
          </motion.div>

          <div className="mt-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={standardFilter}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-[0_8px_48px_rgba(13,45,74,0.09)]"
                role="tabpanel"
              >
                <div className="h-1.5 w-full bg-gradient-to-r from-turquoise via-turquoise-light to-navy" />

                <div className="grid gap-0 lg:grid-cols-[1fr_1.1fr]">
                  <div className="flex flex-col justify-between gap-8 p-8 sm:p-10">
                    <div>
                      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-navy to-[#0d4a5c] text-white shadow-lg shadow-navy/30">
                        <span
                          style={{
                            width: 28,
                            height: 28,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {activeStandardIcon}
                        </span>
                      </div>
                      <h3 className="font-heading text-2xl font-extrabold leading-tight text-navy sm:text-3xl">
                        {activeFilter.label}
                      </h3>
                      <p className="mt-4 text-[1rem] leading-[1.8] text-slate-500">
                        {activeFilter.description}
                      </p>
                    </div>

                    <Link
                      href={`/services/${SERVICES[0].slug}`}
                      className="group inline-flex w-fit items-center gap-2.5 rounded-full bg-navy px-7 py-3.5 text-sm font-bold text-white shadow-md shadow-navy/30 transition-all duration-300 hover:bg-turquoise-dark hover:shadow-turquoise/20"
                    >
                      Full service details
                      <svg
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Link>
                  </div>

                  <div className="flex flex-col justify-center gap-5 border-t border-slate-100 bg-gradient-to-br from-slate-50 to-[#f0f7fb] p-8 sm:p-10 lg:border-l lg:border-t-0">
                    <p className="text-[0.7rem] font-bold uppercase tracking-[0.15em] text-slate-400">
                      What&apos;s included
                    </p>
                    {activeFilter.customContent ? (
                      <div className="space-y-5">
                        {activeFilter.customContent.sections.map(
                          (section, si) => (
                            <motion.div
                              key={section.heading}
                              initial={{ opacity: 0, x: 16 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: si * 0.08, duration: 0.3 }}
                            >
                              <span className="mb-2 block text-[0.65rem] font-bold uppercase tracking-[0.12em] text-turquoise">
                                {section.heading}
                              </span>
                              <ul className="space-y-2">
                                {section.items.map((item) => (
                                  <li
                                    key={item}
                                    className="flex items-start gap-3"
                                  >
                                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-turquoise/15 text-turquoise">
                                      <svg
                                        className="h-3 w-3"
                                        viewBox="0 0 12 12"
                                        fill="currentColor"
                                        aria-hidden
                                      >
                                        <path d="M10.28 2.28a.75.75 0 00-1.06 0L4.5 7 2.78 5.28a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.06 0l5.25-5.25a.75.75 0 000-1.06z" />
                                      </svg>
                                    </span>
                                    <span className="text-[0.9rem] leading-relaxed text-slate-700">
                                      {item}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          ),
                        )}
                      </div>
                    ) : (
                      <ul className="space-y-4">
                        {activeFilter.indices.map((specIndex, i) => {
                          const spec = SHORE_SPECS[specIndex];
                          const label =
                            SHORE_STANDARD_LABELS[specIndex] ?? "Standard";
                          const specKey =
                            typeof spec === "string" ? spec : spec.summary;
                          return (
                            <motion.li
                              key={specKey}
                              initial={{ opacity: 0, x: 16 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.07, duration: 0.3 }}
                              className="flex items-start gap-3"
                            >
                              <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-turquoise/15 text-turquoise">
                                <svg
                                  className="h-3 w-3"
                                  viewBox="0 0 12 12"
                                  fill="currentColor"
                                  aria-hidden
                                >
                                  <path d="M10.28 2.28a.75.75 0 00-1.06 0L4.5 7 2.78 5.28a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.06 0l5.25-5.25a.75.75 0 000-1.06z" />
                                </svg>
                              </span>
                              <span className="min-w-0">
                                <span className="block text-[0.65rem] font-bold uppercase tracking-[0.12em] text-turquoise">
                                  {label}
                                </span>
                                {typeof spec === "string" ? (
                                  <span className="text-[0.95rem] leading-[1.65] text-slate-700">
                                    {spec}
                                  </span>
                                ) : (
                                  <div>
                                    <span className="block text-[0.9rem] font-medium leading-snug text-slate-600">
                                      {spec.summary}
                                    </span>
                                    <div className="mt-2 space-y-2">
                                      {spec.scopes.map((scope) => (
                                        <div key={scope.label}>
                                          <span className="text-[0.85rem] font-semibold text-navy">
                                            {scope.label}:{" "}
                                          </span>
                                          <span className="text-[0.85rem] leading-relaxed text-slate-600">
                                            {scope.detail}
                                          </span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </span>
                            </motion.li>
                          );
                        })}
                      </ul>
                    )}

                    <div className="mt-4 grid grid-cols-3 divide-x divide-slate-200 rounded-2xl border border-slate-200 bg-white">
                      {[
                        {
                          label: "Shore-rated",
                          value: "100%",
                          sub: "salt + UV",
                        },
                        {
                          label: "Warranty",
                          value: "10 yr",
                          sub: "workmanship",
                        },
                        { label: "Timeline", value: "2-7d", sub: "typical" },
                      ].map(({ label, value, sub }) => (
                        <div
                          key={label}
                          className="flex flex-col items-center gap-0.5 p-4 text-center"
                        >
                          <span className="font-heading text-lg font-extrabold text-navy">
                            {value}
                          </span>
                          <span className="text-[0.7rem] font-bold uppercase tracking-wider text-turquoise">
                            {label}
                          </span>
                          <span className="text-[0.68rem] text-slate-400">
                            {sub}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <InView className="mt-10 text-center">
            <div className="flex justify-center">
              <SectionLabel>How we work</SectionLabel>
            </div>
            <p className="mx-auto mt-4 max-w-2xl text-[1.05rem] leading-relaxed text-slate-500">
              Shore-rated assemblies, documented standards, and workmanship you
              can stand on.
            </p>
            <div className="mx-auto mt-6 grid max-w-3xl grid-cols-3 divide-x divide-slate-200 rounded-2xl border border-slate-200 bg-white">
              {SHORE_WORK_COMMITMENTS.map(({ text, sub }) => (
                <div
                  key={text}
                  className="flex flex-col items-center gap-1 p-4 text-center sm:p-5"
                >
                  <span className="font-heading text-sm font-extrabold leading-tight text-navy sm:text-base">
                    {text}
                  </span>
                  <span className="text-[0.68rem] leading-snug text-slate-400">
                    {sub}
                  </span>
                </div>
              ))}
            </div>
          </InView>

          <InView className="mt-10 flex justify-center">
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-navy"
            >
              Browse all services
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden
              >
                <path
                  fillRule="evenodd"
                  d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </InView>
        </div>
      </div>
    </section>
  );
}
function ServiceCoverageSection() {
  const areaCount = SERVICE_AREA_DETAILS.length;
  const [selectedSlug, setSelectedSlug] = useState(
    SERVICE_AREA_DETAILS[0]?.slug ?? "",
  );
  const selected =
    SERVICE_AREA_DETAILS.find((a) => a.slug === selectedSlug) ??
    SERVICE_AREA_DETAILS[0];
  const telHref = `tel:${PHONE.replace(/\D/g, "")}`;

  if (!selected) return null;

  return (
    <section className="relative overflow-hidden bg-white px-6 py-28">
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right,#94a3b8 1px,transparent 1px),linear-gradient(to bottom,#94a3b8 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="pointer-events-none absolute -right-24 top-16 h-[320px] w-[320px] rounded-full bg-turquoise/[0.08] blur-[90px] max-sm:hidden" />

      <div className="relative mx-auto max-w-7xl">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-turquoise/35 bg-turquoise/10 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-turquoise-dark">
            <span
              className="h-1.5 w-1.5 rounded-full bg-turquoise"
              aria-hidden
            />
            Coverage
          </span>
          <h2 className="font-heading mt-6 text-[clamp(2rem,3.8vw,3.25rem)] font-extrabold leading-[1.12] text-navy">
            We Serve the{" "}
            <span className="italic text-turquoise">
              Entire South Jersey Shore
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[1.05rem] leading-relaxed text-slate-600">
            {HOME_COVERAGE_SUBHEAD}
          </p>
        </div>

        <p className="mt-14 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
          {getHomeCoverageGridCaption(areaCount)}
        </p>

        <div
          className="mt-5 grid grid-cols-2 gap-3 sm:gap-3.5 md:grid-cols-3 lg:grid-cols-4"
          role="listbox"
          aria-label="Service areas"
        >
          {SERVICE_AREA_DETAILS.map((area) => {
            const isActive = area.slug === selectedSlug;
            return (
              <button
                key={area.slug}
                type="button"
                role="option"
                aria-selected={isActive}
                onClick={() => setSelectedSlug(area.slug)}
                className={`relative flex flex-col rounded-2xl border px-4 py-3.5 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise/55 sm:px-4 sm:py-4 ${
                  isActive
                    ? "border-navy bg-navy text-white shadow-lg shadow-navy/25"
                    : "border-slate-200 bg-white text-navy shadow-sm hover:border-turquoise/45 hover:shadow-md"
                }`}
              >
                {isActive && (
                  <span
                    className="absolute right-3 top-3 h-2 w-2 rounded-full bg-turquoise shadow-[0_0_0_3px_rgba(42,125,166,0.28)]"
                    aria-hidden
                  />
                )}
                <span
                  className={`font-heading text-[0.95rem] font-bold leading-snug sm:text-base ${isActive ? "pr-6" : ""}`}
                >
                  {area.townName}
                </span>
                <span
                  className={`mt-1.5 text-[10px] font-semibold uppercase leading-tight tracking-[0.12em] ${
                    isActive ? "text-white/70" : "text-slate-500"
                  }`}
                >
                  {area.homepageCoverage.gridTagline}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-10">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={selected.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-[0_20px_70px_-28px_rgba(13,45,74,0.18)]"
            >
              <div className="relative overflow-hidden bg-gradient-to-br from-navy via-[#152c45] to-navy-dark px-8 pb-10 pt-9 sm:px-10 sm:pb-11 sm:pt-10">
                <div
                  className="pointer-events-none absolute -right-8 top-1/2 h-[200px] w-[200px] -translate-y-1/2 rounded-full bg-white/[0.04] blur-2xl"
                  aria-hidden
                />
                <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-turquoise-light/90">
                  — Service area
                </p>
                <h3 className="font-heading mt-3 text-3xl font-bold text-white sm:text-4xl">
                  {selected.townName}
                </h3>
                <p className="relative mt-3 max-w-2xl text-[1.02rem] leading-relaxed text-white/85">
                  {selected.homepageCoverage.cardLead}
                </p>
              </div>

              <div className="border-t border-slate-100 bg-white px-8 py-9 sm:px-10 sm:py-10">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-turquoise">
                  Common services in this area
                </p>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {selected.homepageCoverage.commonServices.map((line) => (
                    <li
                      key={line.slice(0, 40)}
                      className="flex gap-3 text-[0.95rem] leading-snug text-slate-700"
                    >
                      <span
                        className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md bg-turquoise/10 text-turquoise"
                        aria-hidden
                      >
                        <svg
                          className="h-3 w-3"
                          viewBox="0 0 12 12"
                          fill="currentColor"
                        >
                          <path d="M9.78 3.22a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-2-2A.75.75 0 114.83 6.41l1.69 1.69 3.22-3.22a.75.75 0 011.04 0z" />
                        </svg>
                      </span>
                      {line}
                    </li>
                  ))}
                </ul>

                <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link
                    href={`/service-areas/${selected.slug}`}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-navy to-[#1e4a70] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-navy/30 transition hover:from-turquoise-dark hover:to-turquoise sm:flex-none sm:min-w-[12rem]"
                  >
                    <span
                      className="inline-flex h-5 w-5 items-center justify-center rounded bg-white/15"
                      aria-hidden
                    >
                      <svg
                        className="h-3 w-3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </span>
                    View area page
                  </Link>
                  <a
                    href={telHref}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-7 py-3.5 text-sm font-bold text-navy shadow-sm transition hover:border-turquoise/50 hover:bg-slate-50 sm:flex-none sm:min-w-[12rem]"
                  >
                    <svg
                      className="h-4 w-4 text-turquoise"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden
                    >
                      <path
                        fillRule="evenodd"
                        d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Call us
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-3 divide-x divide-slate-200 border-t border-slate-200 bg-slate-50/95">
                <div className="py-7 text-center">
                  <p className="font-heading text-2xl font-extrabold text-navy sm:text-3xl">
                    {areaCount}
                  </p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                    {HOME_COVERAGE_STATS_LABELS.towns}
                  </p>
                </div>
                <div className="py-7 text-center">
                  <p className="font-heading text-2xl font-extrabold text-navy sm:text-3xl">
                    10+
                  </p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                    {HOME_COVERAGE_STATS_LABELS.years}
                  </p>
                </div>
                <div className="py-7 text-center">
                  <p className="font-heading text-2xl font-extrabold leading-tight text-navy sm:text-3xl">
                    1&nbsp;
                    <span className="text-lg font-bold sm:text-xl">day</span>
                  </p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                    {HOME_COVERAGE_STATS_LABELS.response}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── *
 *  GALLERY PREVIEW SECTION                                                    *
 * ─────────────────────────────────────────────────────────────────────────── */
function ReviewPhotoSlideshow({
  images,
  name,
}: {
  images: readonly string[];
  name: string;
}) {
  const [slide, setSlide] = useState(0);
  const total = images.length;
  const prev = () => setSlide((s) => (s - 1 + total) % total);
  const next = () => setSlide((s) => (s + 1) % total);

  const src = images[slide];
  if (!src) return null;

  return (
    <div className="select-none">
      {/* Main slide */}
      <div className="relative overflow-hidden rounded-xl bg-slate-900 aspect-[4/3]">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={src}
              alt={`${name} review photo ${slide + 1} of ${total}`}
              fill
              sizes="(max-width: 768px) 90vw, 640px"
              className="object-cover"
              priority={slide === 0}
            />
          </motion.div>
        </AnimatePresence>
        {/* Prev / Next */}
        <button
          type="button"
          onClick={prev}
          aria-label="Previous photo"
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition hover:bg-black/70"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next photo"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition hover:bg-black/70"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
        {/* Counter */}
        <span className="absolute bottom-2 right-3 rounded-full bg-black/50 px-2.5 py-0.5 text-[11px] font-semibold text-white backdrop-blur-sm">
          {slide + 1} / {total}
        </span>
      </div>
      {/* Thumbnail strip */}
      <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
        {images.map((thumb, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setSlide(i)}
            className={`relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg transition-all duration-200 ${
              i === slide
                ? "ring-2 ring-turquoise ring-offset-1 ring-offset-[#0d1f30]"
                : "opacity-50 hover:opacity-80"
            }`}
          >
            <Image
              src={thumb}
              alt={`Thumbnail ${i + 1}`}
              fill
              sizes="56px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

const PREVIEW_COUNT = 6;

function GalleryPreviewSection() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const active = activeIdx !== null ? GALLERY_ITEMS[activeIdx] : null;

  const close = () => setActiveIdx(null);
  const prev = () =>
    setActiveIdx((i) =>
      i === null ? 0 : (i - 1 + PREVIEW_COUNT) % PREVIEW_COUNT,
    );
  const next = () =>
    setActiveIdx((i) => (i === null ? 0 : (i + 1) % PREVIEW_COUNT));

  // close on Escape
  useEffect(() => {
    if (activeIdx === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activeIdx]);

  // lock scroll when modal open
  useEffect(() => {
    document.body.style.overflow = activeIdx !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeIdx]);

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-navy-dark via-[#0d2137] to-navy-dark px-4 py-20 md:py-28 sm:px-6">
        <NoiseOverlay />
        <div className="pointer-events-none absolute -left-24 top-1/4 h-80 w-80 rounded-full bg-turquoise/15 blur-[110px] max-sm:hidden" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-orange/10 blur-[90px] max-sm:hidden" />

        <div className="relative mx-auto max-w-7xl">
          {/* Header */}
          <InView className="text-center">
            <SectionLabel>Portfolio</SectionLabel>
            <h2 className="font-heading mt-5 text-[clamp(2rem,3.8vw,3rem)] font-extrabold leading-tight text-white">
              Real projects, shore-built
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[1.05rem] leading-relaxed text-white/65">
              Before-and-after fiberglass deck work from Ocean City to Cape May.
              Tap any project to see the full story.
            </p>
          </InView>

          {/* Cards grid */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {GALLERY_ITEMS.slice(0, PREVIEW_COUNT).map((item, i) => (
              <motion.div key={item.id} variants={fadeUp} custom={i}>
                <button
                  type="button"
                  onClick={() => setActiveIdx(i)}
                  className="group w-full text-left"
                >
                  <div className="overflow-hidden rounded-2xl bg-slate-900 ring-1 ring-white/10 shadow-xl shadow-black/40 transition duration-300 group-hover:ring-turquoise/40 group-hover:shadow-turquoise/10">
                    {/* Before / After image pair */}
                    <div className="grid grid-cols-2 gap-0.5">
                      {/* Before */}
                      <div className="relative aspect-[4/3] overflow-hidden bg-slate-800">
                        {item.beforeImage ? (
                          <Image
                            src={item.beforeImage}
                            alt={item.beforeImageAlt}
                            fill
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 17vw"
                            className="object-cover transition duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900" />
                        )}
                        <span className="absolute bottom-2 left-2 rounded-full bg-black/50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white/90 backdrop-blur-sm">
                          Before
                        </span>
                      </div>
                      {/* After */}
                      <div className="relative aspect-[4/3] overflow-hidden bg-slate-800">
                        {item.afterImage ? (
                          <Image
                            src={item.afterImage}
                            alt={item.afterImageAlt}
                            fill
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 17vw"
                            className="object-cover transition duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-teal/60 to-navy-dark" />
                        )}
                        <span className="absolute bottom-2 right-2 rounded-full bg-turquoise/70 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                          After
                        </span>
                      </div>
                    </div>

                    {/* Card footer */}
                    <div className="px-4 pb-4 pt-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-block rounded-full bg-turquoise/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-turquoise">
                          {item.category}
                        </span>
                        <span className="text-[11px] text-white/40">
                          {item.location}
                        </span>
                      </div>
                      <p className="mt-2 font-heading text-sm font-bold leading-snug text-white/90 line-clamp-1">
                        {item.title}
                      </p>
                      <p className="mt-2 text-xs font-semibold text-turquoise/70 group-hover:text-turquoise transition-colors">
                        Tap for full story →
                      </p>
                    </div>
                  </div>
                </button>
              </motion.div>
            ))}
          </motion.div>

          {/* View full gallery CTA */}
          <InView className="mt-12 flex justify-center">
            <Link
              href="/gallery"
              className="group inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.06] px-7 py-3.5 text-sm font-bold text-white backdrop-blur-md transition hover:border-turquoise/50 hover:bg-white/10"
            >
              View full gallery — all 10 projects
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden
              >
                <path
                  fillRule="evenodd"
                  d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </InView>
        </div>
      </section>

      {/* ── PROJECT MODAL ── */}
      <AnimatePresence>
        {active && activeIdx !== null && (
          <motion.div
            key="gallery-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={close}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-[#0d1f30] shadow-2xl ring-1 ring-white/10 max-h-[90vh]"
            >
              {/* Modal header */}
              <div className="flex items-start justify-between gap-4 px-5 py-4 border-b border-white/10 md:px-6">
                <div className="min-w-0">
                  <span className="inline-block rounded-full bg-turquoise/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-turquoise">
                    {active.category}
                  </span>
                  <h3 className="mt-1.5 font-heading text-base font-bold leading-snug text-white md:text-lg line-clamp-2">
                    {active.title}
                  </h3>
                  <p className="mt-0.5 text-xs text-white/50">
                    {active.location}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close"
                  className="flex-shrink-0 rounded-full p-2 text-white/50 transition hover:bg-white/10 hover:text-white"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Modal body */}
              <div className="flex-1 overflow-y-auto px-5 py-5 md:px-6">
                <div className="grid gap-4 md:grid-cols-2">
                  {/* Before */}
                  <figure className="m-0">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-800">
                      {active.beforeImage ? (
                        <Image
                          src={active.beforeImage}
                          alt={active.beforeImageAlt}
                          fill
                          sizes="(max-width: 768px) 90vw, 44vw"
                          className="object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900" />
                      )}
                      <span className="absolute bottom-3 left-3 rounded-full bg-black/50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                        Before
                      </span>
                    </div>
                    <figcaption className="mt-3 text-sm leading-relaxed text-white/65">
                      {active.beforeDescription.split("\n\n").map((para, i) => (
                        <p key={i} className={i > 0 ? "mt-2" : ""}>
                          {i === 0 && (
                            <span className="font-semibold text-white/90">
                              Before —{" "}
                            </span>
                          )}
                          {para}
                        </p>
                      ))}
                    </figcaption>
                  </figure>

                  {/* After */}
                  <figure className="m-0">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-800">
                      {active.afterImage ? (
                        <Image
                          src={active.afterImage}
                          alt={active.afterImageAlt}
                          fill
                          sizes="(max-width: 768px) 90vw, 44vw"
                          className="object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-teal/60 to-navy-dark" />
                      )}
                      <span className="absolute bottom-3 right-3 rounded-full bg-turquoise/70 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                        After
                      </span>
                    </div>
                    <figcaption className="mt-3 text-sm leading-relaxed text-white/65">
                      {active.afterDescription.split("\n\n").map((para, i) => (
                        <p key={i} className={i > 0 ? "mt-2" : ""}>
                          {i === 0 && (
                            <span className="font-semibold text-white/90">
                              After —{" "}
                            </span>
                          )}
                          {para}
                        </p>
                      ))}
                    </figcaption>
                  </figure>
                </div>
              </div>

              {/* Modal footer — nav + gallery link */}
              <div className="flex items-center justify-between gap-3 border-t border-white/10 px-5 py-4 md:px-6">
                {/* Prev / Next */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={prev}
                    className="flex items-center gap-1.5 rounded-full border border-white/15 px-3.5 py-2 text-xs font-semibold text-white/70 transition hover:border-white/30 hover:text-white"
                  >
                    <svg
                      className="h-3.5 w-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    Prev
                  </button>
                  <span className="text-xs text-white/30">
                    {activeIdx + 1} / {PREVIEW_COUNT}
                  </span>
                  <button
                    type="button"
                    onClick={next}
                    className="flex items-center gap-1.5 rounded-full border border-white/15 px-3.5 py-2 text-xs font-semibold text-white/70 transition hover:border-white/30 hover:text-white"
                  >
                    Next
                    <svg
                      className="h-3.5 w-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>

                {/* View full gallery */}
                <Link
                  href="/gallery"
                  onClick={close}
                  className="inline-flex items-center gap-1.5 rounded-full bg-turquoise px-4 py-2 text-xs font-bold text-navy-dark transition hover:bg-turquoise-dark"
                >
                  See all 10 projects
                  <svg
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function HomePageClient() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const [leadFormStatus, setLeadFormStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [leadFieldErrors, setLeadFieldErrors] = useState<
    Record<string, string>
  >({});
  const [leadCity, setLeadCity] = useState("");
  const [leadService, setLeadService] = useState("");
  const [leadBestTime, setLeadBestTime] = useState("Anytime");
  const [displayReviews, setDisplayReviews] = useState<LiveGoogleReview[]>([
    ...REVIEWS,
  ]);
  const [googleRating, setGoogleRating] = useState(5);
  const [googleReviewTotal, setGoogleReviewTotal] = useState(50);
  const [activeReviewIdx, setActiveReviewIdx] = useState<number | null>(null);
  const activeReview =
    activeReviewIdx !== null ? displayReviews[activeReviewIdx] : null;
  const leadInputClass = (hasError: boolean) =>
    `w-full rounded-xl px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 transition focus:outline-none focus:ring-2 ${
      hasError
        ? "border border-red-400 bg-red-50/70 focus:border-red-400 focus:ring-red-200"
        : "border border-slate-200 bg-slate-50/85 focus:border-turquoise/50 focus:bg-white focus:ring-turquoise/20"
    }`;
  const leadErrorClass =
    "mt-1.5 inline-flex items-center rounded-lg border border-red-500/40 bg-red-500/15 px-2.5 py-1 text-xs font-semibold text-red-200";

  // Restore scroll position + hero video playback position when returning to
  // the home page within the same tab session (Next.js remounts this page on
  // every navigation, which otherwise resets both to the top/start).
  useEffect(() => {
    const savedScrollY = sessionStorage.getItem("seashore-home-scroll");
    const savedVideoTime = sessionStorage.getItem("seashore-home-video-time");
    const video = heroVideoRef.current;

    if (savedVideoTime && video) {
      const restoreTime = () => {
        video.currentTime = parseFloat(savedVideoTime);
      };
      if (video.readyState >= 1) {
        restoreTime();
      } else {
        video.addEventListener("loadedmetadata", restoreTime, { once: true });
      }
    }

    if (savedScrollY) {
      // Double rAF ensures this runs after Next.js's own scroll-to-top
      // behavior on route transitions.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          window.scrollTo(0, parseInt(savedScrollY, 10));
        });
      });
    }

    return () => {
      sessionStorage.setItem("seashore-home-scroll", String(window.scrollY));
      if (video) {
        sessionStorage.setItem(
          "seashore-home-video-time",
          String(video.currentTime)
        );
      }
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    async function loadGoogleReviews() {
      try {
        const res = await fetch("/api/google-reviews", { cache: "no-store" });
        if (!res.ok) return;

        const data = (await res.json()) as {
          ok?: boolean;
          rating?: number;
          total?: number;
          reviews?: LiveGoogleReview[];
        };

        if (!mounted || !data?.ok) return;

        if (typeof data.rating === "number") setGoogleRating(data.rating);
        if (typeof data.total === "number") setGoogleReviewTotal(data.total);
        if (Array.isArray(data.reviews) && data.reviews.length > 0)
          setDisplayReviews(data.reviews);
      } catch {
        // Keep static fallback reviews when Google API is unavailable.
      }
    }

    void loadGoogleReviews();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (activeReviewIdx === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveReviewIdx(null);
      if (e.key === "ArrowLeft")
        setActiveReviewIdx((i) =>
          i === null
            ? 0
            : (i - 1 + displayReviews.length) % displayReviews.length,
        );
      if (e.key === "ArrowRight")
        setActiveReviewIdx((i) =>
          i === null ? 0 : (i + 1) % displayReviews.length,
        );
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activeReviewIdx, displayReviews.length]);

  useEffect(() => {
    document.body.style.overflow = activeReviewIdx !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeReviewIdx]);

  async function onLeadSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLeadFormStatus("loading");
    setLeadFieldErrors({});
    const form = e.currentTarget;
    const fd = new FormData(form);
    try {
      const wantsFreeInspection = fd.get("wantsFreeInspection") === "on";
      await postContact({
        name: String(fd.get("name") ?? "").trim(),
        phone: String(fd.get("phone") ?? "").trim(),
        email: String(fd.get("email") ?? "").trim() || undefined,
        address: String(fd.get("address") ?? "").trim(),
        city: leadCity,
        service: leadService || undefined,
        bestTime: leadBestTime || undefined,
        message: String(fd.get("message") ?? "").trim() || undefined,
        wantsFreeInspection,
        source: "home",
      });
      setLeadFormStatus("success");
      form.reset();
      setLeadCity("");
      setLeadService("");
      setLeadBestTime("Anytime");
    } catch (err) {
      setLeadFormStatus("error");
      const fe = (err as PostContactError).fieldErrors;
      if (fe) setLeadFieldErrors(fe);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <main className="overflow-hidden bg-white text-slate-800">
        {/* Section */}
        <section
          ref={heroRef}
          className="relative flex min-h-[100vh] items-center overflow-hidden"
        >
          <div className="absolute inset-0">
            {/* Fallback gradient shown while video loads or on unsupported browsers */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1B3A5C] via-[#0d3a5c] to-[#060e18]" />

            {/* ── Hero video background ──────────────────────────────────────────
                Drop a compressed MP4 (<15 MB) at /public/bgVideo/hero.mp4
                Poster: extract one frame as /public/bgVideo/hero-poster.jpg
            ─────────────────────────────────────────────────────────────────── */}
            <video
              ref={heroVideoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster="/bgVideo/hero-poster.jpg"
              className="absolute inset-0 h-full w-full object-cover object-center"
              style={{ transform: "scale(1)" }}
              aria-hidden
            >
              <source src="/bgVideo/hero.mp4" type="video/mp4" />
            </video>

            {/* Solid dark base — primary layer for text legibility */}
            <div className="absolute inset-0 bg-navy-dark/65" />
            {/* Directional gradient — left side heavier where headline sits */}
            <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/55 via-navy-dark/15 to-transparent" />
            {/* Top + bottom vignette */}
            <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/40 via-transparent to-navy-dark/80" />

            {/* Depth glow orbs — softened over real footage */}
            <div className="animate-float-slow absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-turquoise/10 blur-[90px] max-sm:hidden" />
            <div className="animate-float-slower absolute -bottom-20 left-1/4 h-[320px] w-[320px] rounded-full bg-orange/8 blur-[75px] max-sm:hidden" />

            {/* Very subtle grid texture */}
            <div
              className="absolute inset-0 opacity-[0.025]"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                                  linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
                backgroundSize: "80px 80px",
              }}
            />

            <NoiseOverlay />
          </div>

          {/* Floating decorative elements */}
          {/* <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
              animate={{ y: [-20, 20, -20], rotate: [0, 5, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute right-[15%] top-[20%] flex h-36 w-36 items-center justify-center rounded-2xl border border-turquoise/30 bg-white/10 p-1.5 shadow-[0_0_35px_rgba(42,125,166,0.25)] backdrop-blur-md"
            >
              <Image
                src="/logoo.png"
                alt="Seashore Fiberglass"
                width={270}
                height={82}
                className="h-auto w-full object-contain"
                priority={false}
              />
            </motion.div>
            <motion.div
              animate={{ y: [10, -15, 10] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute right-[28%] top-[65%] h-3 w-3 rounded-full bg-turquoise/40"
            />
          </div> */}

          <motion.div className="relative mx-auto w-full max-w-7xl px-6 py-32">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="max-w-3xl"
            >
              <motion.div variants={fadeUp} className="mb-8">
                <span className="inline-flex items-center gap-2.5 rounded-full border border-turquoise/25 bg-turquoise/8 px-5 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-turquoise backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-turquoise opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-turquoise" />
                  </span>
                  Ocean City NJ · South Jersey Shore
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="font-heading text-[clamp(2.6rem,6vw,4.5rem)] font-extrabold leading-[1.05] tracking-tight text-white"
              >
                {HERO_HEADING}
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-7 max-w-xl text-[1.1rem] leading-[1.8] text-white/70"
              >
                {HERO_SUBHEADING}
              </motion.p>

              {/*
              <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-orange to-orange-light px-8 py-4 font-bold text-white shadow-lg shadow-orange/25 transition-all duration-400 hover:shadow-glow-orange hover:shadow-2xl"
                >
                  <span className="relative z-10 flex items-center gap-2.5">
                    {HERO_PRIMARY_CTA}
                    <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-orange-dark to-orange transition-transform duration-500 group-hover:translate-x-0" />
                </Link>
                <a
                  href={`tel:${PHONE.replace(/\D/g, "")}`}
                  className="group flex items-center gap-2.5 rounded-xl border border-white/15 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-white/10 hover:shadow-glow-white"
                >
                  <svg className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  {HERO_SECONDARY_CTA}
                </a>
              </motion.div>
              */}

              {/* Animated stat counters */}
              <motion.div
                variants={stagger}
                className="mt-16 flex flex-wrap gap-4"
              >
                {[
                  { num: "10+", label: "Years on the Shore" },
                  { num: "50+", label: "5-Star Reviews" },
                  { num: "13", label: "Shore Towns Served" },
                  { num: "20+", label: "Year Deck Lifespan" },
                ].map((stat) => (
                  <motion.div
                    key={stat.label}
                    variants={fadeUp}
                    className="group rounded-2xl border border-white/8 bg-white/[0.03] px-6 py-4 backdrop-blur-md transition-all duration-300 hover:border-turquoise/25 hover:bg-white/[0.06]"
                  >
                    <p className="font-heading text-2xl font-extrabold text-white">
                      <AnimatedCounter target={stat.num} />
                    </p>
                    <p className="mt-0.5 text-[11px] font-medium tracking-wide text-white/45">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Animated seashore */}
          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0"
            style={{ height: 170 }}
          >
            <motion.div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "200%",
              }}
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            >
              <svg
                viewBox="0 0 2880 120"
                preserveAspectRatio="none"
                style={{ display: "block", width: "100%", height: 120 }}
              >
                <path
                  fill="rgba(11,50,90,0.85)"
                  d="M0,50 C360,8 1080,95 1440,50 C1800,8 2520,95 2880,50 L2880,120 L0,120 Z"
                />
              </svg>
            </motion.div>
            <motion.div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "200%",
              }}
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 11, repeat: Infinity, ease: "linear" }}
            >
              <div className="flex" style={{ width: "200%", height: 90 }}>
                <svg
                  viewBox="0 0 2880 120"
                  preserveAspectRatio="none"
                  style={{ display: "block", width: "50%", height: "100%" }}
                >
                  <path
                    fill="rgba(13,121,137,0.65)"
                    d="M0,60 C360,28 1080,88 1440,60 C1800,28 2520,88 2880,60 L2880,120 L0,120 Z"
                  />
                </svg>
                <svg
                  viewBox="0 0 2880 120"
                  preserveAspectRatio="none"
                  style={{ display: "block", width: "50%", height: "100%" }}
                >
                  <path
                    fill="rgba(13,121,137,0.65)"
                    d="M0,60 C360,28 1080,88 1440,60 C1800,28 2520,88 2880,60 L2880,120 L0,120 Z"
                  />
                </svg>
              </div>
            </motion.div>
            <motion.div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "200%",
              }}
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: "linear" }}
            >
              <div className="flex" style={{ width: "200%", height: 55 }}>
                <svg
                  viewBox="0 0 2880 120"
                  preserveAspectRatio="none"
                  style={{ display: "block", width: "50%", height: "100%" }}
                >
                  <path
                    fill="rgba(200,242,250,0.55)"
                    d="M0,72 C360,52 1080,88 1440,72 C1800,52 2520,88 2880,72 L2880,120 L0,120 Z"
                  />
                </svg>
                <svg
                  viewBox="0 0 2880 120"
                  preserveAspectRatio="none"
                  style={{ display: "block", width: "50%", height: "100%" }}
                >
                  <path
                    fill="rgba(200,242,250,0.55)"
                    d="M0,72 C360,52 1080,88 1440,72 C1800,52 2520,88 2880,72 L2880,120 L0,120 Z"
                  />
                </svg>
              </div>
            </motion.div>
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 28,
                background:
                  "linear-gradient(to top,#d2a85a,#c89a42 55%,transparent)",
              }}
            />
          </div>
        </section>

        {/* trust-badges-sandy */}
        <section
          className="relative -mt-1 overflow-hidden py-16"
          style={{
            background:
              "linear-gradient(to bottom,#c89840 0%,#d4a850 28%,#debc72 62%,#eedba8 100%)",
          }}
        >
          <div
            className="absolute inset-0 opacity-[0.16]"
            style={{
              backgroundImage:
                "radial-gradient(circle,rgba(120,70,10,0.7) 1px,transparent 1px)",
              backgroundSize: "5px 5px",
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.055]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg,transparent,transparent 16px,rgba(100,60,10,0.6) 16px,rgba(100,60,10,0.6) 17px)",
            }}
          />
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
              animate={{ x: ["-8%", "108%"] }}
              transition={{
                duration: 26,
                repeat: Infinity,
                ease: "linear",
                delay: 0,
              }}
              style={{ position: "absolute", top: "18%" }}
            >
              <svg
                viewBox="0 0 40 20"
                style={{ height: 15, width: 30, opacity: 0.48 }}
                fill="none"
              >
                <path
                  d="M0,10 Q10,2 20,10 Q30,2 40,10"
                  stroke="#6b4423"
                  strokeWidth="2.3"
                  strokeLinecap="round"
                />
              </svg>
            </motion.div>
            <motion.div
              animate={{ x: ["110%", "-10%"] }}
              transition={{
                duration: 34,
                repeat: Infinity,
                ease: "linear",
                delay: 5,
              }}
              style={{ position: "absolute", top: "52%" }}
            >
              <svg
                viewBox="0 0 30 15"
                style={{ height: 11, width: 22, opacity: 0.34 }}
                fill="none"
              >
                <path
                  d="M0,8 Q7,1 15,8 Q22,1 30,8"
                  stroke="#6b4423"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                />
              </svg>
            </motion.div>
            <motion.div
              animate={{ x: ["-5%", "112%"] }}
              transition={{
                duration: 42,
                repeat: Infinity,
                ease: "linear",
                delay: 16,
              }}
              style={{ position: "absolute", top: "72%" }}
            >
              <svg
                viewBox="0 0 24 12"
                style={{ height: 9, width: 17, opacity: 0.22 }}
                fill="none"
              >
                <path
                  d="M0,6 Q6,0.5 12,6 Q18,0.5 24,6"
                  stroke="#6b4423"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </motion.div>
          </div>
          <InView>
            <div className="relative mx-auto max-w-7xl px-6">
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
              >
                {TRUST_BADGES.map((badge, i) => {
                  const badgeIcons = [
                    <svg
                      key="lic"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.8}
                    >
                      <path
                        strokeLinecap="round"
                        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                      />
                    </svg>,
                    <svg
                      key="rev"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.8}
                    >
                      <path
                        strokeLinecap="round"
                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                      />
                    </svg>,
                    <svg
                      key="fam"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.8}
                    >
                      <path
                        strokeLinecap="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                      />
                    </svg>,
                    <svg
                      key="gua"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.8}
                    >
                      <path
                        strokeLinecap="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                      />
                    </svg>,
                  ];
                  return (
                    <motion.div
                      key={badge}
                      variants={scaleUp}
                      custom={i}
                      className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-amber-200/55 bg-white/80 px-6 py-5 shadow-lg shadow-amber-900/14 sm:backdrop-blur-sm transition-all duration-300 hover:bg-white/94 hover:shadow-xl"
                    >
                      <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#0D7989] to-[#1B3A5C] text-white shadow-sm">
                        {badgeIcons[i]}
                      </div>
                      <span className="text-sm font-bold text-amber-950">
                        {badge}
                      </span>
                      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-amber-100/40 to-transparent opacity-0 transition-all duration-700 group-hover:translate-x-full group-hover:opacity-100" />
                    </motion.div>
                  );
                })}
                <motion.div
                  variants={scaleUp}
                  custom={TRUST_BADGES.length}
                  className="group relative col-span-2 flex items-center justify-center overflow-hidden rounded-2xl border border-amber-200/55 bg-white/80 px-6 py-5 shadow-lg shadow-amber-900/14 sm:order-first sm:col-span-1 sm:backdrop-blur-sm transition-all duration-300 hover:bg-white/94 hover:shadow-xl"
                >
                  <BBBSeal />
                </motion.div>
              </motion.div>
            </div>
          </InView>
        </section>

        <ShoreFiberglassSection />

        {/* GALLERY PREVIEW */}
        <GalleryPreviewSection />

        {/* SERVICES */}
        <ServicesSection />

        {/* Section */}
        <section className="relative overflow-hidden bg-navy-dark px-6 py-28">
          <NoiseOverlay />
          <div className="animate-float-slow absolute -left-24 top-1/2 h-[360px] w-[360px] -translate-y-1/2 rounded-full bg-turquoise/8 blur-[80px] max-sm:hidden" />
          <div className="animate-float-slower absolute -right-16 bottom-0 h-[240px] w-[240px] rounded-full bg-orange/6 blur-[60px] max-sm:hidden" />

          <div className="relative mx-auto max-w-7xl">
            <InView className="flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <SectionLabel>Social Proof</SectionLabel>
                <h2 className="font-heading mt-5 text-[clamp(2rem,3.8vw,3rem)] font-extrabold text-white">
                  What Our Neighbors Say
                </h2>
              </div>
              <div className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-3.5 backdrop-blur-md">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <svg
                      key={n}
                      className="h-4 w-4 fill-orange drop-shadow-sm"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm font-bold text-white">
                  {googleRating.toFixed(1)}
                </span>
                <span className="text-xs text-white/40">
                  · {googleReviewTotal}+ Google Reviews
                </span>
              </div>
            </InView>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.08 }}
              className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {displayReviews.map((review, idx) => (
                <motion.div
                  key={`${review.name}-${idx}`}
                  variants={fadeUp}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] p-7 sm:backdrop-blur-md transition-all duration-400 hover:border-turquoise/20 hover:bg-white/[0.07]"
                >
                  {/* Stretched link — covers whole card, sits behind interactive elements */}
                  <a
                    href={GBP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 z-0"
                    aria-label={`Read ${review.name}'s full review on Google`}
                  />
                  <div className="absolute -right-2 -top-4 font-heading text-[5rem] font-black leading-none text-white/[0.03] select-none">
                    &ldquo;
                  </div>
                  {/* Quote area — grows to fill row height */}
                  <div className="relative z-10 flex-1">
                    <Stars count={review.stars} />
                    <p className="relative mt-5 line-clamp-4 text-[0.95rem] leading-[1.8] text-white/70">
                      &ldquo;{review.quote}&rdquo;
                    </p>
                    <button
                      type="button"
                      onClick={() => setActiveReviewIdx(idx)}
                      className="mt-2.5 text-[0.8rem] font-semibold text-turquoise/70 transition hover:text-turquoise"
                    >
                      Show more →
                    </button>
                  </div>
                  {/* Reviewer footer — always at bottom */}
                  <div className="relative z-10 mt-6 flex items-center gap-3 border-t border-white/[0.06] pt-5">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-turquoise/25 to-turquoise/10 text-sm font-bold text-turquoise">
                      {review.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-white">
                        {review.name}
                      </p>
                      <p className="text-xs text-white/40">
                        {review.city}
                        {review.reviewDate ? ` · ${review.reviewDate}` : ""}
                      </p>
                    </div>
                    {review.photoCount != null && review.photoCount > 0 && (
                      <button
                        type="button"
                        onClick={() => setActiveReviewIdx(idx)}
                        className="flex-shrink-0 flex items-center gap-1.5 rounded-full bg-white/[0.06] px-3 py-1.5 text-[11px] font-semibold text-white/60 transition hover:bg-white/[0.12] hover:text-white"
                      >
                        <svg
                          className="h-3.5 w-3.5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden
                        >
                          <path
                            fillRule="evenodd"
                            d="M1 8a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 018.07 3h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0016.07 6H17a2 2 0 012 2v7a2 2 0 01-2 2H3a2 2 0 01-2-2V8zm13.5 3a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM10 14a3 3 0 100-6 3 3 0 000 6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {review.photoCount}{" "}
                        {review.photoCount === 1 ? "photo" : "photos"}
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <div className="mt-8 text-center">
              <a
                href={GBP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-white/30 hover:text-white"
              >
                {REVIEWS_FOOTER_TEXT}
              </a>
            </div>
          </div>
        </section>

        {/* REVIEW MODAL — full text + photos */}
        <AnimatePresence>
          {activeReview && activeReviewIdx !== null && (
            <motion.div
              key="review-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
              onClick={() => setActiveReviewIdx(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 16 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="relative flex w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-[#0d1f30] shadow-2xl ring-1 ring-white/10 max-h-[90vh]"
              >
                {/* Header */}
                <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4 md:px-6">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-turquoise/25 to-turquoise/10 text-sm font-bold text-turquoise">
                      {activeReview.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-white">
                        {activeReview.name}
                      </p>
                      <div className="flex items-center gap-1.5">
                        <Stars count={activeReview.stars} />
                        <span className="text-[11px] text-white/40">
                          {activeReview.city}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveReviewIdx(null)}
                    aria-label="Close"
                    className="flex-shrink-0 rounded-full p-2 text-white/50 transition hover:bg-white/10 hover:text-white"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                {/* Full review text + photo slideshow */}
                <div className="flex-1 overflow-y-auto px-5 py-5 md:px-6 space-y-5">
                  <p className="text-[0.95rem] leading-[1.9] text-white/80">
                    &ldquo;{activeReview.quote}&rdquo;
                  </p>
                  {activeReview.images && activeReview.images.length > 0 && (
                    <ReviewPhotoSlideshow
                      images={activeReview.images}
                      name={activeReview.name}
                    />
                  )}
                </div>
                {/* Footer */}
                <div className="flex items-center justify-between gap-3 border-t border-white/10 px-5 py-4 md:px-6">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveReviewIdx((i) =>
                          i === null
                            ? 0
                            : (i - 1 + displayReviews.length) %
                              displayReviews.length,
                        )
                      }
                      className="rounded-full border border-white/15 p-2 text-white/60 transition hover:border-white/30 hover:text-white"
                      aria-label="Previous review"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveReviewIdx((i) =>
                          i === null ? 0 : (i + 1) % displayReviews.length,
                        )
                      }
                      className="rounded-full border border-white/15 p-2 text-white/60 transition hover:border-white/30 hover:text-white"
                      aria-label="Next review"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                  <a
                    href={GBP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-turquoise transition hover:text-white"
                  >
                    See all reviews on Google →
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <ServiceCoverageSection />

        {/* Section */}
        <section className="relative overflow-hidden bg-navy-dark px-6 py-28">
          <NoiseOverlay />
          <div className="animate-float-slow absolute -right-20 -top-20 h-[340px] w-[340px] rounded-full bg-turquoise/12 blur-[85px] max-sm:hidden" />
          <div className="animate-float-slower absolute -left-16 bottom-0 h-[220px] w-[220px] rounded-full bg-orange/8 blur-[65px] max-sm:hidden" />
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: `repeating-linear-gradient(-45deg,transparent,transparent 50px,rgba(42,125,166,0.6) 50px,rgba(42,125,166,0.6) 51px)`,
            }}
          />

          <div className="relative mx-auto max-w-7xl">
            <div className="grid items-start gap-14 lg:grid-cols-2">
              <InView>
                <SectionLabel>Get Started</SectionLabel>
                <h2 className="font-heading mt-5 text-[clamp(2rem,3.8vw,3rem)] font-extrabold leading-[1.1] text-white">
                  {FINAL_CTA_TITLE}
                </h2>
                <p className="mt-6 max-w-md text-[1.05rem] leading-[1.85] text-white/60">
                  {FINAL_CTA_BODY}
                </p>

                <div className="mt-10 space-y-4">
                  {[
                    "Free inspection - honest assessment, no pressure",
                    "Same-day or next-morning response",
                    "Licensed & insured, family-owned since 2020",
                  ].map((point) => (
                    <div
                      key={point}
                      className="flex items-center gap-3.5 text-[0.95rem] text-white/65"
                    >
                      <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-turquoise/15">
                        <svg
                          className="h-3.5 w-3.5 text-turquoise"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      {point}
                    </div>
                  ))}
                </div>
              </InView>

              <InView delay={0.15}>
                <form
                  onSubmit={onLeadSubmit}
                  className="relative overflow-hidden rounded-3xl border border-slate-700/80 bg-slate-900/90 p-8 shadow-2xl shadow-black/45 ring-1 ring-slate-700/60"
                  noValidate
                >
                  <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-turquoise/10 blur-3xl" />

                  <h3 className="relative font-heading text-xl font-bold text-white">
                    Request a Free Inspection
                  </h3>
                  <p className="relative mt-1.5 text-sm text-slate-300">
                    Free inspections available — we typically respond same day
                    or next morning.
                  </p>

                  <div className="relative mt-7 space-y-4">
                    {[
                      {
                        id: "lead-name",
                        label: "Full name *",
                        type: "text",
                        placeholder: "Your full name",
                        required: true,
                      },
                      {
                        id: "lead-phone",
                        label: "Phone",
                        type: "tel",
                        placeholder: "(609) 338-4505",
                        required: false,
                      },
                      {
                        id: "lead-email",
                        label: "Email *",
                        type: "email",
                        placeholder: "you@example.com",
                        required: true,
                      },
                    ].map((field) => {
                      const nameKey = field.id.replace("lead-", "");
                      return (
                        <div key={field.id}>
                          <label
                            htmlFor={field.id}
                            className="mb-1.5 block text-sm font-medium text-slate-200"
                          >
                            {field.label}
                          </label>
                          <input
                            id={field.id}
                            type={field.type}
                            name={nameKey}
                            placeholder={field.placeholder}
                            required={field.required}
                            autoComplete={
                              field.type === "tel"
                                ? "tel"
                                : field.type === "email"
                                  ? "email"
                                  : "name"
                            }
                            aria-invalid={
                              leadFieldErrors[nameKey] ? true : undefined
                            }
                            className={leadInputClass(
                              Boolean(leadFieldErrors[nameKey]),
                            )}
                          />
                          {leadFieldErrors[nameKey] && (
                            <p className={leadErrorClass}>
                              {leadFieldErrors[nameKey]}
                            </p>
                          )}
                        </div>
                      );
                    })}
                    <div>
                      <label
                        htmlFor="lead-address"
                        className="mb-1.5 block text-sm font-medium text-slate-200"
                      >
                        Project address <span className="text-orange">*</span>
                      </label>
                      <input
                        id="lead-address"
                        name="address"
                        type="text"
                        required
                        autoComplete="street-address"
                        placeholder="Street address"
                        aria-invalid={
                          leadFieldErrors.address ? true : undefined
                        }
                        className={leadInputClass(
                          Boolean(leadFieldErrors.address),
                        )}
                      />
                      {leadFieldErrors.address && (
                        <p className={leadErrorClass}>
                          {leadFieldErrors.address}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="lead-city"
                        className="mb-1.5 block text-sm font-medium text-slate-200"
                      >
                        City / area <span className="text-orange">*</span>
                      </label>
                      <StyledSelect
                        id="lead-city"
                        name="city"
                        value={leadCity}
                        options={SERVICE_AREA_FORM_OPTIONS}
                        onChange={setLeadCity}
                        placeholder="Select your town"
                        required
                        invalid={Boolean(leadFieldErrors.city)}
                        theme="dark"
                      />
                      {leadFieldErrors.city && (
                        <p className={leadErrorClass}>{leadFieldErrors.city}</p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="lead-service"
                        className="mb-1.5 block text-sm font-medium text-slate-200"
                      >
                        Service you need
                      </label>
                      <StyledSelect
                        id="lead-service"
                        name="service"
                        value={leadService}
                        options={SERVICE_INQUIRY_OPTIONS}
                        onChange={setLeadService}
                        placeholder="Select a service"
                        invalid={Boolean(leadFieldErrors.service)}
                        theme="dark"
                      />
                      {leadFieldErrors.service && (
                        <p className={leadErrorClass}>
                          {leadFieldErrors.service}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="lead-best"
                        className="mb-1.5 block text-sm font-medium text-slate-200"
                      >
                        Best time to contact
                      </label>
                      <StyledSelect
                        id="lead-best"
                        name="bestTime"
                        value={leadBestTime}
                        options={BEST_TIME_OPTIONS}
                        onChange={setLeadBestTime}
                        invalid={Boolean(leadFieldErrors.bestTime)}
                        theme="dark"
                      />
                      {leadFieldErrors.bestTime && (
                        <p className={leadErrorClass}>
                          {leadFieldErrors.bestTime}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="lead-message"
                        className="mb-1.5 block text-sm font-medium text-slate-200"
                      >
                        Message / project details
                      </label>
                      <textarea
                        id="lead-message"
                        name="message"
                        rows={4}
                        placeholder={CONTACT_FORM_MESSAGE_PLACEHOLDER}
                        aria-invalid={
                          leadFieldErrors.message ? true : undefined
                        }
                        className={leadInputClass(
                          Boolean(leadFieldErrors.message),
                        )}
                      />
                      {leadFieldErrors.message && (
                        <p className={leadErrorClass}>
                          {leadFieldErrors.message}
                        </p>
                      )}
                    </div>
                    <label className="group flex cursor-pointer items-start gap-3 rounded-xl border border-slate-300 bg-gradient-to-b from-slate-100 to-slate-200 px-4 py-3 transition hover:border-turquoise/40 hover:from-white hover:to-slate-100">
                      <input
                        name="wantsFreeInspection"
                        type="checkbox"
                        defaultChecked
                        className="mt-0.5 h-5 w-5 rounded-md border-slate-400 text-turquoise shadow-sm focus:ring-2 focus:ring-turquoise/40"
                      />
                      <span className="text-sm font-medium text-slate-700 transition group-hover:text-slate-900">
                        Yes - I&apos;d like a free inspection &amp; quote
                      </span>
                    </label>
                    {leadFormStatus === "success" && (
                      <p
                        className="text-sm font-medium text-emerald-700"
                        role="status"
                      >
                        Thanks - we received your request and will reach out
                        shortly.
                      </p>
                    )}
                    {leadFormStatus === "error" &&
                      Object.keys(leadFieldErrors).length === 0 && (
                        <p
                          className="text-sm font-medium text-red-600"
                          role="alert"
                        >
                          Something went wrong. Please call {PHONE} or try
                          again.
                        </p>
                      )}
                    <button
                      type="submit"
                      disabled={leadFormStatus === "loading"}
                      className="group flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-orange to-orange-light px-6 py-4 font-bold text-white shadow-lg shadow-orange/25 transition-all duration-400 hover:shadow-glow-orange hover:shadow-2xl disabled:opacity-60"
                    >
                      {leadFormStatus === "loading"
                        ? "Sending..."
                        : "Send Message & Get My Free Quote"}
                      <svg
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
                      </svg>
                    </button>
                  </div>
                </form>
              </InView>
            </div>
          </div>
        </section>
      </main>
    </motion.div>
  );
}
