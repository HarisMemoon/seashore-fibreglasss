"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRef } from "react";
import {
  FINAL_CTA_BODY,
  FINAL_CTA_TITLE,
  HERO_HEADING,
  HERO_PRIMARY_CTA,
  HERO_SECONDARY_CTA,
  HERO_SUBHEADING,
  PHONE,
  REVIEWS,
  SERVICES,
  SERVICE_AREAS,
  SHORE_SECTION_BODY,
  SHORE_SECTION_TITLE,
  SHORE_SPECS,
  SITE_NAME,
  TRUST_BADGES,
} from "@seashore/content";
import { postContact, type PostContactError } from "@/lib/postContact";

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0 },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
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
        <svg key={i} className="h-4 w-4 fill-orange drop-shadow-sm" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function AnimatedCounter({ target, suffix = "" }: { target: string; suffix?: string }) {
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
      { threshold: 0.1 }
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
        {started ? count : num}{hasPlus ? "+" : ""}{suffix}
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

const serviceIcons: Record<string, React.ReactNode> = {
  repair: (
    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
      <path strokeLinecap="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
    </svg>
  ),
  construction: (
    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
      <path strokeLinecap="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
    </svg>
  ),
  resurfacing: (
    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
      <path strokeLinecap="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
    </svg>
  ),
  gelcoat: (
    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
      <path strokeLinecap="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    </svg>
  ),
  composite: (
    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
      <path strokeLinecap="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
  ),
  railing: (
    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
      <path strokeLinecap="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 3v18m6-18v18M3.75 9h16.5M3.75 15h16.5" />
    </svg>
  ),
};

export default function HomePageClient() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [leadFormStatus, setLeadFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [leadFieldErrors, setLeadFieldErrors] = useState<Record<string, string>>({});

  async function onLeadSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLeadFormStatus("loading");
    setLeadFieldErrors({});
    const form = e.currentTarget;
    const fd = new FormData(form);
    try {
      await postContact({
        name: String(fd.get("name") ?? "").trim(),
        phone: String(fd.get("phone") ?? "").trim(),
        email: String(fd.get("email") ?? "").trim() || undefined,
        city: String(fd.get("city") ?? "").trim() || undefined,
        message: String(fd.get("message") ?? "").trim() || undefined,
        wantsFreeInspection: true,
        source: "home",
      });
      setLeadFormStatus("success");
      form.reset();
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
        {/* ══════════════════════════ HERO ══════════════════════════ */}
        <section ref={heroRef} className="relative flex min-h-[100vh] items-center overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-navy-dark" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#1B3A5C] via-[#0d3a5c] to-[#060e18]" />

            {/* Animated gradient orbs */}
            <div className="animate-float-slow absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-turquoise/16 blur-[90px]" />
            <div className="animate-float-slower absolute -bottom-20 left-1/4 h-[320px] w-[320px] rounded-full bg-orange/10 blur-[75px]" />

            {/* Geometric grid */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                                  linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
                backgroundSize: "80px 80px",
              }}
            />

            {/* Diagonal accent */}
            <div
              className="absolute right-0 top-0 h-full w-[40%] opacity-[0.04]"
              style={{ background: "linear-gradient(135deg, transparent 35%, #2A7DA6 35%)" }}
            />

            <NoiseOverlay />
          </div>

          {/* Floating decorative elements */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
              animate={{ y: [-20, 20, -20], rotate: [0, 5, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute right-[15%] top-[20%] h-24 w-24 rounded-2xl border border-turquoise/20 bg-turquoise/5 backdrop-blur-sm"
            />
            <motion.div
              animate={{ y: [10, -15, 10] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute right-[28%] top-[65%] h-3 w-3 rounded-full bg-turquoise/40"
            />
          </div>

          <motion.div className="relative mx-auto w-full max-w-7xl px-6 py-32">
            <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-3xl">
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

              {/* Animated stat counters */}
              <motion.div variants={stagger} className="mt-16 flex flex-wrap gap-4">
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
                    <p className="mt-0.5 text-[11px] font-medium tracking-wide text-white/45">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Wave with gradient */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 80" className="block w-full" xmlns="http://www.w3.org/2000/svg">
              <path fill="#ffffff" d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,45 L1440,80 L0,80 Z" />
            </svg>
          </div>
        </section>

        {/* ══════════════════════════ TRUST BADGES — MARQUEE ══════════════════════════ */}
        <section className="relative -mt-1 overflow-hidden bg-white py-10">
          <InView>
            <div className="mx-auto max-w-7xl px-6">
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-4 lg:grid-cols-4"
              >
                {TRUST_BADGES.map((badge, i) => {
                  const badgeIcons = [
                    <svg key="lic" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>,
                    <svg key="rev" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>,
                    <svg key="fam" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>,
                    <svg key="gua" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" /></svg>,
                  ];
                  return (
                    <motion.div
                      key={badge}
                      variants={scaleUp}
                      custom={i}
                      className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-slate-100 bg-gradient-to-br from-white to-slate-50/80 px-6 py-5 shadow-card transition-all duration-400 hover:border-turquoise/30 hover:shadow-card-hover"
                    >
                      <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-turquoise/10 to-turquoise/5 text-turquoise transition-all duration-300 group-hover:from-turquoise group-hover:to-turquoise-dark group-hover:text-white group-hover:shadow-glow-turquoise">
                        {badgeIcons[i]}
                      </div>
                      <span className="text-sm font-bold text-navy">{badge}</span>
                      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-turquoise/5 to-transparent opacity-0 transition-all duration-700 group-hover:translate-x-full group-hover:opacity-100" />
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </InView>
        </section>

        {/* ══════════════════════════ SHORE SECTION ══════════════════════════ */}
        <section className="relative overflow-hidden bg-slate-50 px-6 py-28">
          <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
          <div
            className="absolute right-0 top-0 h-full w-1/2 opacity-[0.02]"
            style={{ background: "linear-gradient(135deg, transparent 30%, #1B3A5C 30%)" }}
          />
          <div className="mx-auto max-w-7xl">
            <div className="grid items-center gap-16 lg:grid-cols-2">
              <InView>
                <SectionLabel>Why Fiberglass</SectionLabel>
                <h2 className="font-heading mt-5 text-[clamp(2rem,3.8vw,3rem)] font-extrabold leading-[1.1] text-navy">
                  {SHORE_SECTION_TITLE}
                </h2>
                <p className="mt-6 text-[1.05rem] leading-[1.9] text-slate-600">{SHORE_SECTION_BODY}</p>
                <div className="mt-10 grid gap-3 sm:grid-cols-2">
                  {SHORE_SPECS.map((spec) => (
                    <div
                      key={spec}
                      className="group flex items-start gap-3 rounded-xl border border-slate-200/70 bg-white px-5 py-4 shadow-sm transition-all duration-300 hover:border-turquoise/30 hover:shadow-md"
                    >
                      <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg bg-turquoise/10 text-turquoise transition-colors duration-300 group-hover:bg-turquoise group-hover:text-white">
                        <svg className="h-3.5 w-3.5" viewBox="0 0 12 12" fill="currentColor">
                          <path d="M3.72 8.72L1.28 6.28a.75.75 0 010-1.06.75.75 0 011.06 0L4 6.88l5.66-5.66a.75.75 0 111.06 1.06L4.78 8.72a.75.75 0 01-1.06 0z" />
                        </svg>
                      </span>
                      <span className="text-sm font-semibold text-slate-700">{spec}</span>
                    </div>
                  ))}
                </div>
              </InView>

              <InView delay={0.2}>
                <div className="relative">
                  <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-turquoise/20 via-transparent to-orange/20 opacity-50 blur-2xl" />
                  <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy via-[#1e4a70] to-navy-dark p-9 shadow-hero">
                    <NoiseOverlay />
                    <div className="animate-float-slow absolute -right-20 -top-20 h-56 w-56 rounded-full bg-turquoise/15 blur-3xl" />
                    <div className="animate-float-slower absolute -bottom-14 left-1/3 h-40 w-40 rounded-full bg-orange/12 blur-2xl" />

                    <p className="relative text-[11px] font-bold uppercase tracking-[0.22em] text-turquoise/80">Our Standard</p>
                    <h3 className="relative mt-3 font-heading text-2xl font-bold text-white">Built Different</h3>

                    <div className="relative mt-8 space-y-5">
                      {[
                        { label: "Substrate", value: '3/4″ CDX + 1/2″ ACX dual-layer plywood' },
                        { label: "Wall Flashings", value: 'Minimum 12″ height' },
                        { label: "Post Flashings", value: 'Minimum 6″ height' },
                        { label: "Drainage Pitch", value: '1/4″ per foot minimum' },
                        { label: "Drip Edges", value: "PVC/Azek only — never wood" },
                      ].map((item) => (
                        <div key={item.label} className="flex items-start gap-3.5 border-b border-white/[0.06] pb-5 last:border-0 last:pb-0">
                          <span className="mt-1.5 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-gradient-to-br from-turquoise to-turquoise-light shadow-glow-turquoise" />
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/35">{item.label}</p>
                            <p className="mt-0.5 text-sm font-semibold text-white/90">{item.value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <motion.div
                    animate={{ y: [-4, 4, -4] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -bottom-5 -left-5 flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-orange to-orange-light px-6 py-3.5 shadow-glow-orange"
                  >
                    <svg className="h-5 w-5 fill-white" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-bold text-white">Work Guaranteed</span>
                  </motion.div>
                </div>
              </InView>
            </div>
          </div>
        </section>

        {/* ══════════════════════════ SERVICES ══════════════════════════ */}
        <section className="relative bg-white px-6 py-28">
          <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
          <div className="mx-auto max-w-7xl">
            <InView className="text-center">
              <SectionLabel>What We Do</SectionLabel>
              <h2 className="font-heading mt-5 text-[clamp(2rem,3.8vw,3rem)] font-extrabold text-navy">
                Our Core Services
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[1.05rem] leading-relaxed text-slate-500">
                Every service is engineered specifically for South Jersey Shore conditions — salt, humidity, UV, freeze-thaw.
              </p>
            </InView>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.08 }}
              className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
            >
              {SERVICES.map((service, i) => {
                const iconKey = Object.keys(serviceIcons)[i] ?? "repair";
                return (
                  <motion.div key={service.slug} variants={fadeUp}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="gradient-border group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-8 shadow-card transition-all duration-400 hover:-translate-y-2 hover:shadow-card-hover"
                    >
                      <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-turquoise via-turquoise-light to-navy opacity-0 transition-opacity duration-400 group-hover:opacity-100" />

                      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-navy/[0.06] to-navy/[0.02] text-navy transition-all duration-400 group-hover:bg-gradient-to-br group-hover:from-turquoise group-hover:to-turquoise-dark group-hover:text-white group-hover:shadow-glow-turquoise">
                        {serviceIcons[iconKey]}
                      </div>
                      <h3 className="font-heading text-xl font-bold text-navy">{service.title}</h3>
                      <p className="mt-3 flex-1 text-[0.95rem] leading-[1.75] text-slate-500">{service.description}</p>
                      <div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-turquoise transition-all duration-300 group-hover:gap-3">
                        Learn more
                        <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════ REVIEWS ══════════════════════════ */}
        <section className="relative overflow-hidden bg-navy-dark px-6 py-28">
          <NoiseOverlay />
          <div className="animate-float-slow absolute -left-24 top-1/2 h-[360px] w-[360px] -translate-y-1/2 rounded-full bg-turquoise/8 blur-[80px]" />
          <div className="animate-float-slower absolute -right-16 bottom-0 h-[240px] w-[240px] rounded-full bg-orange/6 blur-[60px]" />

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
                  {[1,2,3,4,5].map((n) => (
                    <svg key={n} className="h-4 w-4 fill-orange drop-shadow-sm" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm font-bold text-white">5.0</span>
                <span className="text-xs text-white/40">· 50+ Google Reviews</span>
              </div>
            </InView>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.08 }}
              className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {REVIEWS.map((review, idx) => (
                <motion.article
                  key={`${review.name}-${idx}`}
                  variants={fadeUp}
                  className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] p-7 backdrop-blur-md transition-all duration-400 hover:border-turquoise/20 hover:bg-white/[0.07]"
                >
                  <div className="absolute -right-2 -top-4 font-heading text-[5rem] font-black leading-none text-white/[0.03] select-none">
                    &ldquo;
                  </div>
                  <Stars count={review.stars} />
                  <p className="relative mt-5 text-[0.95rem] leading-[1.8] text-white/70">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                  <div className="mt-6 flex items-center gap-3.5 border-t border-white/[0.06] pt-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-turquoise/25 to-turquoise/10 text-sm font-bold text-turquoise">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{review.name}</p>
                      <p className="text-xs text-white/40">{review.city}</p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════ SERVICE AREAS ══════════════════════════ */}
        <section className="relative bg-white px-6 py-28">
          <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
          <div className="mx-auto max-w-7xl">
            <InView className="text-center">
              <SectionLabel>Coverage</SectionLabel>
              <h2 className="font-heading mt-5 text-[clamp(2rem,3.8vw,3rem)] font-extrabold text-navy">
                We Serve the Whole Shore
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-[1.05rem] text-slate-500">
                Based in Ocean City — same quality, same care in every town.
              </p>
            </InView>

            <div className="mt-14 grid items-start gap-12 lg:grid-cols-5">
              <InView className="lg:col-span-2">
                <motion.div
                  variants={stagger}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex flex-wrap gap-2.5"
                >
                  {SERVICE_AREAS.map((town, i) => (
                    <motion.div key={town} variants={fadeUp} custom={i}>
                      <Link
                        href={`/service-areas/${town.toLowerCase().replace(/\s+/g, "-")}`}
                        className="group flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:border-turquoise hover:bg-turquoise hover:text-white hover:shadow-glow-turquoise"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-slate-300 transition-colors group-hover:bg-white" />
                        {town}
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>

                <InView delay={0.2} className="mt-10 overflow-hidden rounded-2xl border border-orange/20 bg-gradient-to-br from-orange/5 to-orange/[0.02] p-6">
                  <p className="font-semibold text-slate-700">Not sure if we cover your area?</p>
                  <a
                    href={`tel:${PHONE.replace(/\D/g, "")}`}
                    className="mt-4 flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-orange to-orange-light px-6 py-3.5 font-bold text-white shadow-lg shadow-orange/20 transition-all duration-300 hover:shadow-glow-orange"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
                    </svg>
                    Call {PHONE}
                  </a>
                </InView>
              </InView>

              <InView delay={0.1} className="lg:col-span-3">
                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card-hover">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-6 py-5">
                    <div>
                      <h3 className="font-heading text-lg font-bold text-navy">Visit Our Ocean City Location</h3>
                      <p className="mt-0.5 text-sm text-slate-500">406 Asbury Ave, Ocean City, NJ 08226</p>
                    </div>
                    <a
                      href="https://maps.google.com/?q=406+Asbury+Ave+Ocean+City+NJ+08226"
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-lg bg-navy px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-light"
                    >
                      Open in Google Maps
                    </a>
                  </div>
                  <iframe
                    title="Seashore Fiberglass Service Area"
                    src="https://www.google.com/maps?q=406+Asbury+Ave,+Ocean+City,+NJ+08226&output=embed"
                    className="h-[420px] w-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </InView>
            </div>
          </div>
        </section>

        {/* ══════════════════════════ FINAL CTA ══════════════════════════ */}
        <section className="relative overflow-hidden bg-navy-dark px-6 py-28">
          <NoiseOverlay />
          <div className="animate-float-slow absolute -right-20 -top-20 h-[340px] w-[340px] rounded-full bg-turquoise/12 blur-[85px]" />
          <div className="animate-float-slower absolute -left-16 bottom-0 h-[220px] w-[220px] rounded-full bg-orange/8 blur-[65px]" />
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
                <p className="mt-6 max-w-md text-[1.05rem] leading-[1.85] text-white/60">{FINAL_CTA_BODY}</p>

                <div className="mt-10 space-y-4">
                  {[
                    "Free inspection — honest assessment, no pressure",
                    "Same-day or next-morning response",
                    "Licensed & insured, family-owned since 2014",
                  ].map((point) => (
                    <div key={point} className="flex items-center gap-3.5 text-[0.95rem] text-white/65">
                      <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-turquoise/15">
                        <svg className="h-3.5 w-3.5 text-turquoise" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
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
                  className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] p-9 backdrop-blur-xl"
                >
                  <NoiseOverlay />
                  <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-turquoise/10 blur-3xl" />

                  <h3 className="relative font-heading text-xl font-bold text-white">
                    Request a Free Inspection
                  </h3>
                  <p className="relative mt-1.5 text-sm text-white/45">
                    Limited slots this month — book yours today.
                  </p>

                  <div className="relative mt-7 space-y-4">
                    {[
                      { id: "lead-name", label: "Name", type: "text", placeholder: "Your full name", required: true },
                      { id: "lead-phone", label: "Phone", type: "tel", placeholder: "(609) 338-4505", required: true },
                      { id: "lead-email", label: "Email (optional)", type: "email", placeholder: "you@example.com", required: false },
                    ].map((field) => {
                      const nameKey = field.id.replace("lead-", "");
                      return (
                        <div key={field.id}>
                          <label htmlFor={field.id} className="mb-1.5 block text-sm font-medium text-white/75">
                            {field.label}
                          </label>
                          <input
                            id={field.id}
                            type={field.type}
                            name={nameKey}
                            placeholder={field.placeholder}
                            required={field.required}
                            aria-invalid={leadFieldErrors[nameKey] ? true : undefined}
                            className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3.5 text-sm text-white placeholder:text-white/30 transition-all duration-300 focus:border-turquoise/50 focus:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-turquoise/20"
                          />
                          {leadFieldErrors[nameKey] && (
                            <p className="mt-1 text-sm text-red-300">{leadFieldErrors[nameKey]}</p>
                          )}
                        </div>
                      );
                    })}
                    <div>
                      <label htmlFor="lead-city" className="mb-1.5 block text-sm font-medium text-white/75">
                        Service area town
                      </label>
                      <select
                        id="lead-city"
                        name="city"
                        aria-invalid={leadFieldErrors.city ? true : undefined}
                        className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3.5 text-sm text-white/60 transition-all duration-300 focus:border-turquoise/50 focus:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-turquoise/20"
                        style={{ colorScheme: "dark" }}
                      >
                        <option value="">Select your town</option>
                        {SERVICE_AREAS.map((town) => (
                          <option key={town} value={town}>{town}</option>
                        ))}
                      </select>
                      {leadFieldErrors.city && (
                        <p className="mt-1 text-sm text-red-300">{leadFieldErrors.city}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="lead-message" className="mb-1.5 block text-sm font-medium text-white/75">
                        Project details
                      </label>
                      <textarea
                        id="lead-message"
                        name="message"
                        rows={3}
                        placeholder="Tell us about the repair or restoration needed."
                        aria-invalid={leadFieldErrors.message ? true : undefined}
                        className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3.5 text-sm text-white placeholder:text-white/30 transition-all duration-300 focus:border-turquoise/50 focus:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-turquoise/20"
                      />
                      {leadFieldErrors.message && (
                        <p className="mt-1 text-sm text-red-300">{leadFieldErrors.message}</p>
                      )}
                    </div>
                    {leadFormStatus === "success" && (
                      <p className="text-sm font-medium text-emerald-300" role="status">
                        Thanks — we received your request and will reach out shortly.
                      </p>
                    )}
                    {leadFormStatus === "error" && Object.keys(leadFieldErrors).length === 0 && (
                      <p className="text-sm font-medium text-red-300" role="alert">
                        Something went wrong. Please call {PHONE} or try again.
                      </p>
                    )}
                    <button
                      type="submit"
                      disabled={leadFormStatus === "loading"}
                      className="group flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-orange to-orange-light px-6 py-4 font-bold text-white shadow-lg shadow-orange/25 transition-all duration-400 hover:shadow-glow-orange hover:shadow-2xl disabled:opacity-60"
                    >
                      {leadFormStatus === "loading" ? "Sending…" : "Send Free Quote Request"}
                      <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
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
