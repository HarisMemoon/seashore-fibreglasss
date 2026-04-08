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

} from "@seashore/content";
import BreadcrumbJsonLd from "../BreadcrumbJsonLd";

const SERVICE_AREA_DETAILS = [
  {
    town: "Ocean City NJ",
    slug: "ocean-city-nj",
    challenge: "Boardwalk winds, bay humidity, and intense summer UV.",
  },
  {
    town: "Long Beach Island",
    slug: "long-beach-island",
    challenge: "Barrier-island salt spray and frequent coastal wind exposure.",
  },
  {
    town: "Brigantine NJ",
    slug: "brigantine-nj",
    challenge: "Bayfront humidity plus salt from both ocean and bay sides.",
  },
  {
    town: "Atlantic City NJ",
    slug: "atlantic-city-nj",
    challenge: "Boardwalk-adjacent wear and heavy turnover in rental properties.",
  },
  {
    town: "Ventnor City NJ",
    slug: "ventnor-city-nj",
    challenge: "Year-round occupancy with boardwalk-area weather exposure.",
  },
  {
    town: "Margate City NJ",
    slug: "margate-city-nj",
    challenge: "Beachfront conditions with high expectations for finish quality.",
  },
  {
    town: "Longport NJ",
    slug: "longport-nj",
    challenge: "Elevated waterfront decks that demand premium waterproofing detail.",
  },
  {
    town: "Strathmere NJ",
    slug: "strathmere-nj",
    challenge: "Wind-driven salt exposure in a low-density dune environment.",
  },
  {
    town: "Sea Isle City NJ",
    slug: "sea-isle-city-nj",
    challenge: "Heavy seasonal use from vacation-rental traffic.",
  },
  {
    town: "Avalon NJ",
    slug: "avalon-nj",
    challenge: "Upscale oceanfront conditions and strong UV load.",
  },
  {
    town: "Stone Harbor NJ",
    slug: "stone-harbor-nj",
    challenge: "Seasonal family-home usage cycles and coastal moisture shifts.",
  },
  {
    town: "Wildwood NJ",
    slug: "wildwood-nj",
    challenge: "High tourist traffic, boardwalk exposure, and rental durability needs.",
  },
  {
    town: "Cape May NJ",
    slug: "cape-may-nj",
    challenge: "Historic housing stock with ocean/bay salt convergence.",
  },
] as const;

const SHORE_SYSTEM_STANDARDS = [
  {
    label: "Drainage pitch",
    value: "1/4 inch per foot minimum to prevent standing water.",
  },
  {
    label: "Substrate build",
    value: "Dual-layer plywood: 3/4 inch CDX plus 1/2 inch ACX, glued and fastened.",
  },
  {
    label: "Wall flashing coverage",
    value: "Minimum 12 inches up all required vertical transitions.",
  },
  {
    label: "Post flashing coverage",
    value: "Minimum 6 inches vertically around railing/post penetrations.",
  },
] as const;

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
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/70">{ABOUT_INTRO}</p>\n          </div>
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
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-600">
              We stay focused on technical correctness, transparent communication, and consistent job-site professionalism.
            </p>
            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {ABOUT_DIFFERENTIATORS.map((item, i) => (
                <article
                  key={item.title}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br from-white to-slate-50 p-6 shadow-sm transition hover:-translate-y-1 hover:border-turquoise/40 hover:shadow-lg"
                >
                  <div className="absolute right-4 top-4 text-5xl font-black leading-none text-turquoise/15">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-turquoise/10 text-turquoise">
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                      <path
                        fillRule="evenodd"
                        d="M16.704 5.29a.75.75 0 010 1.06l-8 8a.75.75 0 01-1.06 0l-4-4a.75.75 0 011.06-1.06l3.47 3.47 7.47-7.47a.75.75 0 011.06 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h3 className="font-heading mt-4 text-xl font-bold text-navy">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-slate-100 bg-slate-50 px-6 py-16 md:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionLabel>Built for shore conditions</SectionLabel>
            <h2 className="font-heading mt-4 text-3xl font-bold text-navy md:text-4xl">How We Engineer for Coastal Exposure</h2>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-600">
              Our system standards are designed for salt air, high humidity, intense UV, and freeze-thaw cycles seen across the South Jersey Shore.
            </p>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {SHORE_SYSTEM_STANDARDS.map((item) => (
                <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-turquoise">{item.label}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-6 py-16 md:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionLabel>Service region</SectionLabel>
            <h2 className="font-heading mt-4 text-3xl font-bold text-navy md:text-4xl">{ABOUT_COMMITMENT_TITLE}</h2>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">{ABOUT_COMMITMENT_LEAD}</p>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {SERVICE_AREA_DETAILS.map((area) => (
                <article
                  key={area.slug}
                  className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-5 shadow-sm transition hover:border-turquoise/40 hover:bg-white hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-heading text-lg font-bold text-navy">{area.town}</h3>
                    <span className="rounded-full bg-turquoise/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-turquoise">
                      Local focus
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{area.challenge}</p>
                  <Link
                    href={`/service-areas/${area.slug}`}
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-turquoise transition hover:text-turquoise-dark"
                  >
                    View area page
                    <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                      <path
                        fillRule="evenodd"
                        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-slate-100 bg-navy px-6 py-16 md:py-20">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <h2 className="font-heading text-2xl font-bold text-white md:text-3xl">Ready for an honest deck assessment?</h2>
              <p className="mt-3 max-w-xl text-white/65">
                Free inspections, clear technical answers, and no pressure - just the way we have worked since 2014.
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
