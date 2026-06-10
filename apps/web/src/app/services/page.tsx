import type { Metadata } from "next";
import Link from "next/link";
import {
  HERO_PRIMARY_CTA,
  PHONE,
  SERVICES,
  SERVICES_INDEX_META,
} from "@seashore/content";
import BreadcrumbJsonLd from "../BreadcrumbJsonLd";

const SERVICE_HIGHLIGHTS = [
  "Correct diagnosis before any recommendation",
  "Repair, reglass, recolor, and new construction",
  "Built for salt air, UV, humidity, and freeze-thaw",
] as const;

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
  title: SERVICES_INDEX_META.title,
  description: SERVICES_INDEX_META.description,
};

export default function ServicesPage() {
  return (
    <main className="overflow-hidden bg-white text-slate-800">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ]}
      />

      <section className="relative overflow-hidden bg-navy-dark px-6 pb-20 pt-28 md:pb-28 md:pt-32">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1B3A5C] via-[#0d3a5c] to-[#060e18]" />
        <div className="absolute -right-24 -top-20 h-[360px] w-[360px] rounded-full bg-turquoise/15 blur-[90px]" />
        <div className="absolute -left-16 bottom-0 h-[220px] w-[220px] rounded-full bg-orange/10 blur-[70px]" />
        <NoiseOverlay />
        <div className="relative mx-auto max-w-7xl">
          <SectionLabel>Services overview</SectionLabel>
          <h1 className="font-heading mt-5 max-w-4xl text-[clamp(2rem,4vw,3.5rem)] font-extrabold leading-[1.08] text-white">
            Fiberglass Deck Services Engineered for Shore Conditions
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/70">
            Every service we provide starts with the same priorities: correct
            diagnosis, the right repair path, and execution that solves the root
            cause rather than covering over symptoms.
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {SERVICE_HIGHLIGHTS.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-4 backdrop-blur-md"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-turquoise/15 text-turquoise">
                    <svg
                      className="h-3.5 w-3.5"
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
                  </span>
                  <p className="text-sm font-medium leading-relaxed text-white/80">
                    {item}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionLabel>Our core services</SectionLabel>
              <h2 className="font-heading mt-4 text-3xl font-bold text-navy md:text-4xl">
                Choose the right path for your deck
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:flex">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-center shadow-sm">
                <p className="font-heading text-2xl font-extrabold text-navy">
                  6
                </p>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Services
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-center shadow-sm">
                <p className="font-heading text-2xl font-extrabold text-navy">
                  2020
                </p>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Family-owned since
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {SERVICES.map((service, index) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-br from-white via-white to-slate-50 p-7 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-turquoise/35 hover:shadow-xl"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-turquoise via-turquoise-light to-orange opacity-0 transition duration-300 group-hover:opacity-100" />
                <div className="flex items-start justify-between gap-4">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-navy/[0.05] text-navy transition duration-300 group-hover:bg-turquoise group-hover:text-white">
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden
                    >
                      <path d="M10 2.5a.75.75 0 01.75.75v5h5a.75.75 0 010 1.5h-5v5a.75.75 0 01-1.5 0v-5h-5a.75.75 0 010-1.5h5v-5A.75.75 0 0110 2.5z" />
                    </svg>
                  </span>
                  <span className="font-heading text-4xl font-black leading-none text-slate-100">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h2 className="font-heading mt-6 text-xl font-bold text-navy transition group-hover:text-turquoise">
                  {service.title}
                </h2>
                <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-slate-600">
                  {service.description}
                </p>
                <div className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-turquoise">
                  Explore service
                  <svg
                    className="h-3.5 w-3.5 transition group-hover:translate-x-1"
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
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-slate-50 px-6 py-16 md:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-heading text-2xl font-bold text-navy md:text-3xl">
            Not sure which service you need? We&rsquo;ll inspect your deck for
            free and give you an honest recommendation — no pressure, no
            upselling.
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-orange to-orange-light px-8 py-4 font-bold text-white shadow-lg shadow-orange/25 transition hover:shadow-glow-orange"
            >
              Get My Free Inspection
            </Link>
            <a
              href={`tel:${PHONE.replace(/\D/g, "")}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-navy/15 bg-white px-8 py-4 font-semibold text-navy transition hover:border-navy/30"
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
            <a
              href={`sms:+1${PHONE.replace(/\D/g, "")}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-navy/15 bg-white px-8 py-4 font-semibold text-navy transition hover:border-navy/30"
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
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
              Text us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
