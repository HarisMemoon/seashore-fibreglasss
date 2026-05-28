"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ABOUT_COMMITMENT_LEAD,
  ABOUT_COMMITMENT_TITLE,
  ABOUT_DIFFERENTIATORS,
  ABOUT_FOUNDED_BADGE,
  ABOUT_GBP_LINK_TEXT,
  ABOUT_H1,
  ABOUT_INTRO,
  ABOUT_STORY_BODY,
  ABOUT_STORY_TITLE,
  GBP_URL,
  HERO_PRIMARY_CTA,
  PHONE,
} from "@seashore/content";

/* ─── Static data (not in content package, not approved-copy) ─── */
const SERVICE_AREA_DETAILS = [
  { town: "Ocean City NJ", slug: "ocean-city-nj", challenge: "Boardwalk winds, bay humidity, and intense summer UV." },
  { town: "Long Beach Island", slug: "long-beach-island", challenge: "Barrier-island salt spray and frequent coastal wind exposure." },
  { town: "Brigantine NJ", slug: "brigantine-nj", challenge: "Bayfront humidity plus salt from both ocean and bay sides." },
  { town: "Atlantic City NJ", slug: "atlantic-city-nj", challenge: "Boardwalk-adjacent wear and heavy turnover in rental properties." },
  { town: "Ventnor City NJ", slug: "ventnor-city-nj", challenge: "Year-round occupancy with boardwalk-area weather exposure." },
  { town: "Margate City NJ", slug: "margate-city-nj", challenge: "Beachfront conditions with high expectations for finish quality." },
  { town: "Longport NJ", slug: "longport-nj", challenge: "Elevated waterfront decks that demand premium waterproofing detail." },
  { town: "Strathmere NJ", slug: "strathmere-nj", challenge: "Wind-driven salt exposure in a low-density dune environment." },
  { town: "Sea Isle City NJ", slug: "sea-isle-city-nj", challenge: "Heavy seasonal use from vacation-rental traffic." },
  { town: "Avalon NJ", slug: "avalon-nj", challenge: "Upscale oceanfront conditions and strong UV load." },
  { town: "Stone Harbor NJ", slug: "stone-harbor-nj", challenge: "Seasonal family-home usage cycles and coastal moisture shifts." },
  { town: "Wildwood NJ", slug: "wildwood-nj", challenge: "High tourist traffic, boardwalk exposure, and rental durability needs." },
  { town: "Cape May NJ", slug: "cape-may-nj", challenge: "Historic housing stock with ocean/bay salt convergence." },
] as const;

const SHORE_SYSTEM_STANDARDS = [
  { label: "Drainage pitch", value: "1/4 inch per foot minimum to prevent standing water." },
  { label: "Substrate build", value: "Dual-layer plywood: 3/4 inch CDX plus 1/2 inch ACX, glued and fastened." },
  { label: "Wall flashing coverage", value: "Minimum 12 inches up all required vertical transitions." },
  { label: "Post flashing coverage", value: "Minimum 6 inches vertically around railing/post penetrations." },
] as const;

const HERO_STATS = [
  { value: "2020", label: "Founded" },
  { value: "50+", label: "5-Star Reviews" },
  { value: "10yr", label: "Warranty" },
  { value: "Free", label: "Inspections" },
] as const;

/* ─── Per-differentiator icons ─── */
const DIFF_ICONS = [
  /* Local, Not Corporate — location pin */
  <svg key="local" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden><path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" /></svg>,
  /* Licensed & Insured — shield */
  <svg key="shield" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden><path fillRule="evenodd" d="M9.661 2.237a.531.531 0 01.678 0 11.947 11.947 0 007.078 2.749.5.5 0 01.479.425c.069.52.104 1.05.104 1.589 0 5.162-3.26 9.563-7.834 11.256a.48.48 0 01-.332 0C5.26 16.563 2 12.162 2 7c0-.539.035-1.069.104-1.589a.5.5 0 01.48-.425 11.947 11.947 0 007.077-2.749zm4.196 5.954a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>,
  /* 50+ Reviews — star */
  <svg key="star" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden><path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" /></svg>,
  /* No High-Pressure — thumbs up */
  <svg key="thumb" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden><path d="M1 8.25a1.25 1.25 0 112.5 0v7.5a1.25 1.25 0 11-2.5 0v-7.5zM11 3V1.7c0-.268.14-.526.395-.607A2 2 0 0114 3c0 .995-.182 1.948-.514 2.826-.204.54.166 1.174.744 1.174h2.52c1.243 0 2.261 1.01 2.146 2.247a23.864 23.864 0 01-1.341 5.974C17.153 16.323 16.072 17 14.9 17H8.053c-1.013 0-1.853-.776-1.853-1.789V8.997c0-.806.445-1.527 1.097-2.01L11 3z" /></svg>,
  /* Technical Precision — wrench */
  <svg key="wrench" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden><path fillRule="evenodd" d="M19 5.5a4.5 4.5 0 01-4.791 4.49c-.873-.055-1.808.128-2.368.8l-6.024 7.23a2.724 2.724 0 11-3.837-3.837L9.21 8.16c.672-.56.855-1.495.8-2.368a4.5 4.5 0 015.873-4.575c.324.105.39.51.15.735L13.34 4.64a.75.75 0 00-.16 1.21l.812.812a.75.75 0 001.21-.16l2.688-2.683c.225-.24.63-.174.735.15.14.436.215.9.215 1.38v.001z" clipRule="evenodd" /></svg>,
  /* Clean Job Sites — sparkles */
  <svg key="sparkles" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden><path d="M15.98 1.804a1 1 0 00-1.96 0l-.24 1.192a1 1 0 01-.784.785l-1.192.238a1 1 0 000 1.962l1.192.238a1 1 0 01.785.785l.238 1.192a1 1 0 001.962 0l.238-1.192a1 1 0 01.785-.785l1.192-.238a1 1 0 000-1.962l-1.192-.238a1 1 0 01-.785-.785l-.238-1.192zM6.949 5.684a1 1 0 00-1.898 0l-.683 2.051a1 1 0 01-.633.633l-2.051.683a1 1 0 000 1.898l2.051.684a1 1 0 01.633.632l.683 2.051a1 1 0 001.898 0l.683-2.051a1 1 0 01.633-.633l2.051-.683a1 1 0 000-1.897l-2.051-.684a1 1 0 01-.633-.633L6.95 5.684zM13.949 13.684a1 1 0 00-1.898 0l-.184.551a1 1 0 01-.632.633l-.551.183a1 1 0 000 1.898l.551.183a1 1 0 01.633.633l.183.551a1 1 0 001.898 0l.184-.551a1 1 0 01.632-.633l.551-.183a1 1 0 000-1.898l-.551-.184a1 1 0 01-.633-.632l-.183-.551z" /></svg>,
];

/* ─── Framer variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};
const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};
const slideLeft = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

/* ─── Shared UI helpers ─── */
function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.2em] ${light ? "text-turquoise-light" : "text-turquoise"}`}>
      <span className={`h-px w-10 bg-gradient-to-r ${light ? "from-turquoise-light to-turquoise-light/0" : "from-turquoise to-turquoise/0"}`} />
      {children}
    </span>
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

/* ════════════════════════════════════════════════════════════════
   MAIN CLIENT COMPONENT
════════════════════════════════════════════════════════════════ */
export default function AboutUsClient() {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [areaSearch, setAreaSearch] = useState("");

  const filteredAreas = SERVICE_AREA_DETAILS.filter((a) =>
    a.town.toLowerCase().includes(areaSearch.toLowerCase())
  );

  return (
    <main className="overflow-hidden bg-white text-slate-800">

      {/* ══════════════════ HERO ══════════════════ */}
      <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-navy-dark px-6 pb-20 pt-28 md:pb-28 md:pt-32">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1B3A5C] via-[#0d3a5c] to-[#060e18]" />

        {/* Geometric grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)`,
            backgroundSize: "72px 72px",
          }}
        />

        {/* Glow orbs */}
        <div className="animate-float absolute -right-24 -top-24 h-[460px] w-[460px] rounded-full bg-turquoise/14 blur-[100px]" />
        <div className="absolute -left-16 bottom-0 h-[300px] w-[300px] rounded-full bg-orange/8 blur-[80px]" style={{ animation: "float 9s ease-in-out infinite 1.5s" }} />
        <div className="absolute left-1/2 top-1/3 h-[200px] w-[200px] -translate-x-1/2 rounded-full bg-turquoise/8 blur-[70px]" style={{ animation: "float 7s ease-in-out infinite 3s" }} />
        <NoiseOverlay />

        {/* Content */}
        <div className="relative mx-auto w-full max-w-7xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl"
          >
            <motion.div variants={fadeUp}>
              <SectionLabel light>{ABOUT_FOUNDED_BADGE}</SectionLabel>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-heading mt-5 max-w-4xl text-[clamp(2rem,4vw,3.25rem)] font-extrabold leading-[1.1] text-white"
            >
              {ABOUT_H1}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-3xl text-lg leading-relaxed text-white/70"
            >
              {ABOUT_INTRO}
            </motion.p>

            {/* Stats strip */}
            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
              {HERO_STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.06] px-6 py-4 text-center backdrop-blur-md"
                >
                  <p className="font-heading text-2xl font-extrabold text-white">{stat.value}</p>
                  <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50">{stat.label}</p>
                </div>
              ))}
            </motion.div>

            {/* Hero CTAs */}
            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange to-orange-light px-8 py-4 font-bold text-white shadow-lg shadow-orange/25 transition hover:shadow-glow-orange"
              >
                {HERO_PRIMARY_CTA}
              </Link>
              <a
                href={`tel:${PHONE.replace(/\D/g, "")}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-md transition hover:border-white/30 hover:bg-white/10"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call {PHONE}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════ OUR STORY ══════════════════ */}
      <section className="border-b border-slate-100 bg-slate-50 px-6 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Left — text */}
            <div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={slideLeft}
              >
                <SectionLabel>Our story</SectionLabel>
                <h2 className="font-heading mt-4 text-3xl font-bold text-navy md:text-4xl">{ABOUT_STORY_TITLE}</h2>
              </motion.div>

              <div className="mt-8 space-y-0">
                {ABOUT_STORY_BODY.map((paragraph, i) => (
                  <motion.div
                    key={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-40px" }}
                    variants={fadeUp}
                    className="relative pl-8 pb-8 last:pb-0"
                  >
                    {/* Timeline line */}
                    {i < ABOUT_STORY_BODY.length - 1 && (
                      <div className="absolute left-[11px] top-8 h-full w-px bg-gradient-to-b from-turquoise/40 to-turquoise/0" />
                    )}
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-1.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-turquoise/30 bg-white shadow-sm">
                      <div className="h-2 w-2 rounded-full bg-turquoise" />
                    </div>
                    <p className="text-lg leading-relaxed text-slate-600">{paragraph}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right — founder card */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="self-center"
            >
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1B3A5C] via-[#0d3a5c] to-[#060e18] p-8 shadow-xl">
                <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-turquoise/15 blur-[60px]" />
                <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-orange/10 blur-[50px]" />
                <NoiseOverlay />
                <div className="relative">
                  {/* Quote mark */}
                  <div className="font-heading text-6xl font-black leading-none text-turquoise/20">&ldquo;</div>
                  <p className="mt-2 text-lg font-medium leading-relaxed text-white/80 italic">
                    We stay because homeowners on the Shore deserve contractors who treat every deck like it protects real living space underneath — because it does.
                  </p>
                  <div className="mt-6 flex items-center gap-4 border-t border-white/10 pt-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-turquoise/20 text-turquoise">
                      <svg className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                        <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-heading font-bold text-white">Francisco Ruiz</p>
                      <p className="text-sm text-white/55">Founder, Seashore Fiberglass</p>
                    </div>
                  </div>
                  {/* Trust badges */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {["Founded 2020", "Licensed & Insured", "Ocean City NJ"].map((badge) => (
                      <span key={badge} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/60">
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════ DIFFERENTIATORS ══════════════════ */}
      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <SectionLabel>Why homeowners choose us</SectionLabel>
            <h2 className="font-heading mt-4 text-3xl font-bold text-navy md:text-4xl">What Makes Us Different</h2>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-600">
              We stay focused on technical correctness, transparent communication, and consistent job-site professionalism.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
          >
            {ABOUT_DIFFERENTIATORS.map((item, i) => {
              const isGbp = item.title === ABOUT_GBP_LINK_TEXT;
              const isActive = activeCard === i;

              const cardClasses = `group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border p-6 shadow-sm transition-all duration-300 ${
                isActive
                  ? "border-turquoise/60 bg-gradient-to-br from-turquoise/5 to-white shadow-glow-turquoise"
                  : "border-slate-200/80 bg-gradient-to-br from-white to-slate-50 hover:-translate-y-1 hover:border-turquoise/40 hover:shadow-lg"
              }`;

              const inner = (
                <>
                  {/* Top color bar */}
                  <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-turquoise via-turquoise-light to-orange transition duration-300 ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} />

                  {/* Number watermark */}
                  <div className={`absolute right-4 top-4 font-heading text-5xl font-black leading-none transition duration-300 ${isActive ? "text-turquoise/20" : "text-turquoise/10"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  {/* Icon */}
                  <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl transition duration-300 ${isActive ? "bg-turquoise text-white" : "bg-turquoise/10 text-turquoise group-hover:bg-turquoise group-hover:text-white"}`}>
                    {DIFF_ICONS[i]}
                  </div>

                  <h3 className={`font-heading mt-4 text-xl font-bold transition duration-300 ${isActive ? "text-turquoise" : "text-navy group-hover:text-turquoise"}`}>
                    {item.title}
                    {isGbp && (
                      <svg className="ml-1.5 inline-block h-4 w-4 -translate-y-0.5 text-turquoise" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    )}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{item.description}</p>
                </>
              );

              return (
                <motion.div key={item.title} variants={cardVariant} className="h-full">
                  {isGbp ? (
                    <a
                      href={GBP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cardClasses}
                      onClick={() => setActiveCard(isActive ? null : i)}
                    >
                      {inner}
                    </a>
                  ) : (
                    <div
                      className={cardClasses}
                      onClick={() => setActiveCard(isActive ? null : i)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === "Enter" && setActiveCard(isActive ? null : i)}
                      aria-pressed={isActive}
                    >
                      {inner}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════ SHORE STANDARDS ══════════════════ */}
      <section className="border-y border-slate-100 bg-slate-50 px-6 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <SectionLabel>Built for shore conditions</SectionLabel>
            <h2 className="font-heading mt-4 text-3xl font-bold text-navy md:text-4xl">How We Engineer for Coastal Exposure</h2>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-600">
              Our system standards are designed for salt air, high humidity, intense UV, and freeze-thaw cycles seen across the South Jersey Shore.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={staggerContainer}
            className="mt-10 grid gap-5 sm:grid-cols-2"
          >
            {SHORE_SYSTEM_STANDARDS.map((item) => (
              <motion.div
                key={item.label}
                variants={cardVariant}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-turquoise/40 hover:shadow-lg"
              >
                {/* Animated top bar */}
                <motion.div
                  className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-turquoise to-turquoise-light"
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                />
                <div className="flex items-start justify-between gap-4">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-turquoise">{item.label}</p>
                  <div className="rounded-full bg-turquoise/10 px-2 py-0.5 text-[10px] font-bold text-turquoise">
                    Standard
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.value}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════ SERVICE AREAS ══════════════════ */}
      <section className="bg-white px-6 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <SectionLabel>Service region</SectionLabel>
            <h2 className="font-heading mt-4 text-3xl font-bold text-navy md:text-4xl">{ABOUT_COMMITMENT_TITLE}</h2>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">{ABOUT_COMMITMENT_LEAD}</p>
          </motion.div>

          {/* Search filter */}
          <div className="mt-8 flex items-center gap-3">
            <div className="relative flex-1 max-w-xs">
              <svg className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="search"
                placeholder="Filter by town…"
                value={areaSearch}
                onChange={(e) => setAreaSearch(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/80 py-3 pl-10 pr-4 text-sm text-slate-900 transition focus:border-turquoise/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-turquoise/20"
              />
            </div>
            <span className="text-sm font-semibold text-slate-500">
              {filteredAreas.length} {filteredAreas.length === 1 ? "town" : "towns"}
            </span>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={staggerContainer}
            className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
          >
            {filteredAreas.length === 0 ? (
              <p className="col-span-full py-8 text-center text-slate-400">No towns match &ldquo;{areaSearch}&rdquo;</p>
            ) : (
              filteredAreas.map((area) => (
                <motion.article
                  key={area.slug}
                  variants={cardVariant}
                  className="group rounded-2xl border border-slate-200/80 bg-slate-50/60 p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-turquoise/40 hover:bg-white hover:shadow-lg"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-heading text-lg font-bold text-navy transition duration-300 group-hover:text-turquoise">{area.town}</h3>
                    <span className="shrink-0 rounded-full bg-turquoise/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-turquoise">
                      Local focus
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{area.challenge}</p>
                  <Link
                    href={`/service-areas/${area.slug}`}
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-turquoise transition duration-300 hover:gap-2.5 hover:text-turquoise-dark"
                  >
                    View area page
                    <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                      <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </motion.article>
              ))
            )}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════ CTA ══════════════════ */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative overflow-hidden border-t border-slate-100 bg-navy px-6 py-16 md:py-20"
      >
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-turquoise/10 blur-[80px] animate-float" />
        <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-orange/8 blur-[70px]" style={{ animation: "float 8s ease-in-out infinite 2s" }} />
        <NoiseOverlay />
        <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-heading text-2xl font-bold text-white md:text-3xl">Ready for an honest deck assessment?</h2>
            <p className="mt-3 max-w-xl text-white/65">
              Free inspections, clear technical answers, and no pressure — the way we have built our reputation since 2020.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Link
              href="/contact"
              className="inline-flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-orange to-orange-light px-8 py-4 font-bold text-white shadow-lg shadow-orange/25 transition hover:shadow-glow-orange"
            >
              {HERO_PRIMARY_CTA}
            </Link>
            <a
              href={`tel:${PHONE.replace(/\D/g, "")}`}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-4 font-semibold text-white backdrop-blur-md transition hover:border-white/30 hover:bg-white/10"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call {PHONE}
            </a>
            <a
              href={`sms:+1${PHONE.replace(/\D/g, "")}`}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-4 font-semibold text-white backdrop-blur-md transition hover:border-white/30 hover:bg-white/10"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              Text us
            </a>
          </motion.div>
        </div>
      </motion.section>

    </main>
  );
}
