import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ADDRESS,
  HERO_PRIMARY_CTA,
  PHONE,
  SERVICE_AREA_DETAILS,
  SERVICE_AREAS_INDEX_META,
} from "@seashore/content";
import BreadcrumbJsonLd from "../BreadcrumbJsonLd";
import { ServiceAreasMapWidget } from "@/components/ServiceAreasMapWidget";

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

export const metadata: Metadata = {
  title: SERVICE_AREAS_INDEX_META.title,
  description: SERVICE_AREAS_INDEX_META.description,
};

export default function ServiceAreasIndexPage() {
  return (
    <main className="overflow-hidden bg-white text-slate-800">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Service areas", path: "/service-areas" },
        ]}
      />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-navy-dark px-6 pb-20 pt-28 md:pb-28 md:pt-32">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1B3A5C] via-[#0d3a5c] to-[#060e18]" />
        <div className="absolute -right-24 -top-20 h-[400px] w-[400px] rounded-full bg-turquoise/15 blur-[90px] animate-float" />
        <div className="absolute left-0 top-1/2 h-[260px] w-[260px] -translate-y-1/2 rounded-full bg-orange/10 blur-[75px]" />
        <NoiseOverlay />
        <div className="relative mx-auto max-w-7xl">
          <SectionLabel>Service region</SectionLabel>
          <h1 className="font-heading mt-5 max-w-4xl text-[clamp(2rem,4vw,3.5rem)] font-extrabold leading-[1.08] text-white animate-fade-up">
            South Jersey Shore Coverage with Local Coastal Awareness
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/70 animate-fade-up [animation-delay:120ms]">
            We serve 13 shore towns, each with its own weather exposure, housing
            patterns, and waterproofing demands. Every area page shows exactly
            how we approach those local conditions — and which services we bring
            to your town.
          </p>

          {/* Stats row */}
          <div className="mt-10 flex flex-wrap gap-4 animate-fade-up [animation-delay:200ms]">
            {[
              { value: "13", label: "Shore towns" },
              { value: "6", label: "Services per town" },
              { value: "Free", label: "Deck inspections" },
              { value: "2020", label: "Family-owned since" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-white/[0.06] px-6 py-4 backdrop-blur-md text-center"
              >
                <p className="font-heading text-2xl font-extrabold text-white">
                  {stat.value}
                </p>
                <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ── Coverage map ── */}
      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-14">
            <div>
              <SectionLabel>Where we work</SectionLabel>
              <h2 className="font-heading mt-4 text-3xl font-bold text-navy md:text-4xl">
                All 13 Shore Towns, One Coverage Map
              </h2>
              <p className="mt-4 max-w-lg text-slate-600">
                Tap a pin to jump straight to that town&apos;s page. We meet
                homeowners on-site for every inspection — we don&apos;t operate
                a walk-in storefront.
              </p>
              <div className="mt-6 inline-flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-turquoise/15 text-turquoise">
                  <svg
                    className="h-4.5 w-4.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.6}
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.6}
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                </span>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
                    Mailing address
                  </p>
                  <p className="mt-0.5 font-semibold text-navy">
                    {ADDRESS.street}, {ADDRESS.city}, {ADDRESS.state}{" "}
                    {ADDRESS.zip}
                  </p>
                </div>
              </div>
            </div>
            <ServiceAreasMapWidget className="h-[340px] md:h-[440px]" />
          </div>
        </div>
      </section>
      {/* ── Town cards grid ── */}
      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionLabel>Town pages</SectionLabel>
              <h2 className="font-heading mt-4 text-3xl font-bold text-navy md:text-4xl">
                Explore the shore town you live in
              </h2>
              <p className="mt-3 max-w-2xl text-slate-600">
                Click any town to see local coastal conditions, what services we
                bring there, and how we approach that town's specific exposure
                challenges.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {SERVICE_AREA_DETAILS.map((area, index) => (
              <Link
                key={area.slug}
                href={`/service-areas/${area.slug}`}
                className="group relative overflow-hidden rounded-3xl shadow-card transition-all duration-300 hover:-translate-y-2 hover:shadow-card-hover"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                {/* Card header — town cover photo */}
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Image
                    src={`/serviceAreas/${area.slug}.png`}
                    alt={`${area.townName} fiberglass deck service area`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(min-width:1280px) 33vw, (min-width:768px) 50vw, 100vw"
                  />
                  {/* Dark gradient overlay for text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-navy-dark/15 to-transparent" />
                  {/* Animated glow blob */}
                  <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-turquoise/20 blur-[50px] transition duration-500 group-hover:bg-turquoise/35" />
                  <div className="absolute -bottom-4 -left-4 h-28 w-28 rounded-full bg-orange/10 blur-[40px]" />
                  <NoiseOverlay />
                  {/* Tagline pill + town name */}
                  <div className="absolute bottom-5 left-5 right-5">
                    <span className="inline-block rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm">
                      {area.homepageCoverage?.gridTagline ?? "Shore town"}
                    </span>
                    <h2 className="font-heading mt-2 text-xl font-extrabold leading-tight text-white transition duration-300 group-hover:text-turquoise-light">
                      {area.townName}
                    </h2>
                    <div className="mt-1.5 h-px w-10 bg-gradient-to-r from-turquoise to-turquoise/0 transition-all duration-300 group-hover:w-24" />
                  </div>
                  {/* Top-right color stripe */}
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-turquoise via-turquoise-light to-orange opacity-0 transition duration-300 group-hover:opacity-100" />
                </div>

                {/* Card body */}
                <div className="border border-t-0 border-slate-200/80 rounded-b-3xl bg-white p-6">
                  {/* Challenge lead */}
                  <p className="text-sm font-semibold text-navy leading-snug">
                    {area.localChallengeTitle}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    {area.homepageCoverage?.cardLead}
                  </p>

                  {/* Top 3 services */}
                  <ul className="mt-4 space-y-1.5">
                    {(area.homepageCoverage?.commonServices ?? [])
                      .slice(0, 3)
                      .map((svc) => (
                        <li
                          key={svc}
                          className="flex items-start gap-2 text-xs text-slate-600"
                        >
                          <svg
                            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-turquoise"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.704 5.29a.75.75 0 010 1.06l-8 8a.75.75 0 01-1.06 0l-4-4a.75.75 0 011.06-1.06l3.47 3.47 7.47-7.47a.75.75 0 011.06 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {svc}
                        </li>
                      ))}
                  </ul>

                  {/* Footer */}
                  <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                      6 services available
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-turquoise transition-all duration-300 group-hover:gap-2.5">
                      View area
                      <svg
                        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="border-t border-slate-100 bg-slate-50 px-6 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl border border-turquoise/20 bg-gradient-to-br from-white to-slate-50 p-8 md:flex md:items-center md:justify-between md:gap-8 shadow-sm">
            <div>
              <p className="font-heading text-2xl font-bold text-navy">
                Not sure which service your deck needs?
              </p>
              <p className="mt-2 max-w-lg text-slate-600">
                We walk the deck, check transitions, drainage, flashings, and
                overall structure — and give you an honest assessment. Free
                inspections, same day or next morning response.
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row md:mt-0 md:shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-orange to-orange-light px-7 py-4 font-bold text-white shadow-lg shadow-orange/25 transition hover:shadow-glow-orange"
              >
                {HERO_PRIMARY_CTA}
              </Link>
              <a
                href={`tel:${PHONE.replace(/\D/g, "")}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-navy/15 bg-white px-7 py-4 font-semibold text-navy transition hover:border-navy/30"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                Call {PHONE}
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
