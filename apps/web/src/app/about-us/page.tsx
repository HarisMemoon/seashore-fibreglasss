import type { Metadata } from "next";
import Link from "next/link";
import {
  ABOUT_COMMITMENT_LEAD,
  ABOUT_COMMITMENT_TITLE,
  ABOUT_DIFFERENTIATORS,
  ABOUT_H1,
  ABOUT_INTRO,
  ABOUT_META,
  ABOUT_STORY_BODY,
  ABOUT_STORY_TITLE,
  HERO_PRIMARY_CTA,
  PHONE,
  SERVICE_AREAS,
} from "@seashore/content";
import BreadcrumbJsonLd from "../BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: ABOUT_META.title,
  description: ABOUT_META.description,
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-turquoise">
      <span className="h-px w-10 bg-gradient-to-r from-turquoise to-turquoise/0" />
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

export default function AboutUsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "About us", path: "/about-us" },
        ]}
      />
    <main className="overflow-hidden bg-white text-slate-800">
      <section className="relative overflow-hidden bg-navy-dark px-6 pb-20 pt-28 md:pb-28 md:pt-32">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1B3A5C] via-[#0d3a5c] to-[#060e18]" />
        <div className="animate-float-slow absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-turquoise/16 blur-[90px]" />
        <NoiseOverlay />
        <div className="relative mx-auto max-w-7xl">
          <SectionLabel>Family-owned since 2014</SectionLabel>
          <h1 className="font-heading mt-5 max-w-4xl text-[clamp(2rem,4vw,3.25rem)] font-extrabold leading-[1.1] text-white">
            {ABOUT_H1}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/70">{ABOUT_INTRO}</p>
          <div className="mt-10 flex flex-wrap gap-4">
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
              Call {PHONE}
            </a>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-100 bg-slate-50 px-6 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>Our story</SectionLabel>
          <h2 className="font-heading mt-4 text-3xl font-bold text-navy md:text-4xl">{ABOUT_STORY_TITLE}</h2>
          <div className="mt-8 max-w-3xl space-y-6 text-lg leading-relaxed text-slate-600">
            {ABOUT_STORY_BODY.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>Why homeowners choose us</SectionLabel>
          <h2 className="font-heading mt-4 text-3xl font-bold text-navy md:text-4xl">What Makes Us Different</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ABOUT_DIFFERENTIATORS.map((item, i) => (
              <div
                key={item.title}
                className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:border-turquoise/30 hover:shadow-md"
              >
                <div className="font-heading text-4xl font-extrabold text-turquoise/25">{String(i + 1).padStart(2, "0")}</div>
                <h3 className="font-heading mt-5 text-xl font-bold text-navy">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-slate-50 px-6 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>Service region</SectionLabel>
          <h2 className="font-heading mt-4 text-3xl font-bold text-navy md:text-4xl">{ABOUT_COMMITMENT_TITLE}</h2>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">{ABOUT_COMMITMENT_LEAD}</p>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICE_AREAS.map((town) => (
              <li
                key={town}
                className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white px-4 py-3 text-slate-700 shadow-sm"
              >
                <span className="h-2 w-2 flex-shrink-0 rounded-full bg-turquoise" />
                {town}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-navy px-6 py-16 md:py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <h2 className="font-heading text-2xl font-bold text-white md:text-3xl">Ready for an honest deck assessment?</h2>
            <p className="mt-3 max-w-xl text-white/65">
              Free inspections, clear technical answers, and no pressure — just the way we have worked since 2014.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-orange to-orange-light px-8 py-4 font-bold text-white shadow-lg shadow-orange/25 transition hover:shadow-glow-orange"
          >
            {HERO_PRIMARY_CTA}
          </Link>
        </div>
      </section>
    </main>
    </>
  );
}
