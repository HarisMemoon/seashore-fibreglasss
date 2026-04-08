import type { Metadata } from "next";
import Link from "next/link";
import { HERO_PRIMARY_CTA, PHONE, SERVICE_AREA_DETAILS, SERVICE_AREAS_INDEX_META } from "@seashore/content";
import BreadcrumbJsonLd from "../BreadcrumbJsonLd";

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

      <section className="relative overflow-hidden bg-navy-dark px-6 pb-20 pt-28 md:pb-28 md:pt-32">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1B3A5C] via-[#0d3a5c] to-[#060e18]" />
        <div className="absolute -right-24 -top-20 h-[360px] w-[360px] rounded-full bg-turquoise/15 blur-[90px]" />
        <div className="absolute left-0 top-1/2 h-[260px] w-[260px] -translate-y-1/2 rounded-full bg-orange/10 blur-[75px]" />
        <NoiseOverlay />
        <div className="relative mx-auto max-w-7xl">
          <SectionLabel>Service region</SectionLabel>
          <h1 className="font-heading mt-5 max-w-4xl text-[clamp(2rem,4vw,3.5rem)] font-extrabold leading-[1.08] text-white">
            South Jersey Shore Coverage with Local Coastal Awareness
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/70">
            We serve 13 shore towns, each with its own weather exposure, housing patterns, and waterproofing demands.
            Explore your town to see how we approach those local conditions.
          </p>\n        </div>
      </section>

      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionLabel>Town pages</SectionLabel>
              <h2 className="font-heading mt-4 text-3xl font-bold text-navy md:text-4xl">Explore the shore town you live in</h2>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-center shadow-sm">
              <p className="font-heading text-2xl font-extrabold text-navy">13</p>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Shore towns served</p>
            </div>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {SERVICE_AREA_DETAILS.map((area) => (
              <Link
                key={area.slug}
                href={`/service-areas/${area.slug}`}
                className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-br from-white to-slate-50 p-7 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-turquoise/35 hover:shadow-xl"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-turquoise via-turquoise-light to-orange opacity-0 transition duration-300 group-hover:opacity-100" />
                <div className="inline-flex items-center rounded-full bg-turquoise/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-turquoise">
                  Local challenge
                </div>
                <h2 className="font-heading mt-5 text-xl font-bold text-navy transition group-hover:text-turquoise">
                  {area.townName}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{area.localChallengeTitle}</p>
                <div className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-turquoise">
                  View town page
                  <svg className="h-3.5 w-3.5 transition group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                    <path
                      fillRule="evenodd"
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
       
      </section>

      <section className="px-6 pb-16 md:pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="mt-16 rounded-2xl border border-turquoise/20 bg-gradient-to-br from-slate-50 to-white p-8 md:flex md:items-center md:justify-between md:gap-8">
            <div>
              <p className="font-heading text-2xl font-bold text-navy">Need a free inspection?</p>
              <p className="mt-2 text-slate-600">We respond the same day or next morning.</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3 md:mt-0">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-orange to-orange-light px-6 py-3.5 font-bold text-white shadow-md shadow-orange/20"
              >
                {HERO_PRIMARY_CTA}
              </Link>
              <a
                href={`tel:${PHONE.replace(/\D/g, "")}`}
                className="inline-flex items-center justify-center rounded-xl border border-navy/15 bg-white px-6 py-3.5 font-semibold text-navy"
              >
                Call {PHONE}
              </a>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
