import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getServiceAreaDetail,
  HERO_PRIMARY_CTA,
  HERO_SECONDARY_CTA,
  PHONE,
  SERVICE_AREA_DETAILS,
} from "@seashore/content";
import type { ServiceAreaDetail } from "@seashore/types";
import ServiceAreaJsonLd from "./ServiceAreaJsonLd";

export function generateStaticParams() {
  return SERVICE_AREA_DETAILS.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const area = getServiceAreaDetail(params.slug);
  if (!area) return { title: "Service area" };
  return { title: area.metaTitle, description: area.metaDescription };
}

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

/* ─── Why-us points — pulled from commonServices on each area ─── */
const WHY_ICONS = [
  // Inspect / magnify
  <svg key="inspect" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
    <path d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" />
  </svg>,
  // Shield / protection
  <svg key="shield" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
    <path fillRule="evenodd" d="M9.661 2.237a.531.531 0 01.678 0 11.947 11.947 0 007.078 2.749.5.5 0 01.479.425c.069.52.104 1.05.104 1.589 0 5.162-3.26 9.563-7.834 11.256a.48.48 0 01-.332 0C5.26 16.563 2 12.162 2 7c0-.539.035-1.069.104-1.589a.5.5 0 01.48-.425 11.947 11.947 0 007.077-2.749zm4.196 5.954a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
  </svg>,
  // Clock / schedule
  <svg key="clock" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" />
  </svg>,
];

/* ─── CTA footer ─── */
function AreaCta({ townName }: { townName: string }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#1B3A5C] via-[#0d3a5c] to-[#060e18] px-6 py-16 md:py-20">
      <div className="absolute -right-20 top-0 h-72 w-72 rounded-full bg-turquoise/15 blur-[80px] animate-float" />
      <div className="absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-orange/10 blur-[60px]" />
      <NoiseOverlay />
      <div className="relative mx-auto max-w-4xl text-center">
        <SectionLabel>Free inspection</SectionLabel>
        <h2 className="font-heading mt-5 text-2xl font-bold text-white md:text-3xl">
          Ready for a free deck inspection in {townName}?
        </h2>
        <p className="mt-4 text-lg text-white/75 max-w-2xl mx-auto">
          We diagnose your deck honestly and give you a clear scope — correct root cause, no pressure, same-day or next-morning response.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
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
            {HERO_SECONDARY_CTA}
          </a>
          <a
            href={`sms:+1${PHONE.replace(/\D/g, "")}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-md transition hover:border-white/30 hover:bg-white/10"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            Text us
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── Main page body ─── */
function AreaBody({ area }: { area: ServiceAreaDetail }) {
  const path = `/service-areas/${area.slug}`;
  const whyPoints = (area.homepageCoverage?.commonServices ?? []).slice(0, 3);

  return (
    <>
      <ServiceAreaJsonLd area={area} path={path} />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-navy-dark px-6 pb-16 pt-24 md:pb-20 md:pt-28">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1B3A5C] via-[#0d3a5c] to-[#060e18]" />
        <div className="animate-float absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-turquoise/16 blur-[90px]" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-orange/8 blur-[70px]" />
        <NoiseOverlay />
        <div className="relative mx-auto max-w-7xl">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 text-sm font-semibold text-turquoise">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="opacity-75 transition hover:opacity-100">Home</Link></li>
              <li aria-hidden className="text-white/30">/</li>
              <li><Link href="/service-areas" className="opacity-75 transition hover:opacity-100">Service areas</Link></li>
              <li aria-hidden className="text-white/30">/</li>
              <li className="text-white/60">{area.townName}</li>
            </ol>
          </nav>

          <SectionLabel>{area.homepageCoverage?.gridTagline ?? "Shore town"}</SectionLabel>
          <h1 className="font-heading mt-5 max-w-4xl text-[clamp(1.75rem,3.5vw,2.9rem)] font-extrabold leading-[1.1] text-white animate-fade-up">
            {area.h1}
          </h1>
          <div className="mt-8 max-w-3xl space-y-5 text-lg leading-relaxed text-white/75 animate-fade-up [animation-delay:100ms]">
            {area.intro.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* Trust pills */}
          <div className="mt-8 flex flex-wrap gap-3 animate-fade-up [animation-delay:180ms]">
            <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/75 backdrop-blur-md">
              6 services available
            </span>
            <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/75 backdrop-blur-md">
              Free inspections
            </span>
            <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/75 backdrop-blur-md">
              Family-owned since 2020
            </span>
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap gap-4 animate-fade-up [animation-delay:240ms]">
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

      {/* ── Local conditions ── */}
      <section className="border-b border-slate-100 bg-white px-6 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>Local coastal conditions</SectionLabel>
          <h2 className="font-heading mt-4 text-3xl font-bold text-navy md:text-4xl">
            {area.localChallengeTitle}
          </h2>
          <p className="mt-4 max-w-2xl text-slate-600">
            Every town along the Jersey Shore has its own mix of salt air, UV load, humidity, and seasonal use. Here is what we account for in {area.townName}.
          </p>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {area.localChallengeBody.map((p, i) => (
              <div
                key={i}
                className="group rounded-3xl border border-slate-200/80 bg-gradient-to-br from-white to-slate-50 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-turquoise/35 hover:shadow-lg"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-turquoise/10 text-turquoise transition duration-300 group-hover:bg-turquoise group-hover:text-white">
                  {i === 0 ? (
                    /* waves / environment icon */
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                      <path d="M3.5 6.5A.5.5 0 014 6h12a.5.5 0 010 1c-1.293 0-2 .5-2 1.5s.707 1.5 2 1.5a.5.5 0 010 1c-1.293 0-2 .5-2 1.5s.707 1.5 2 1.5a.5.5 0 010 1H4a.5.5 0 010-1c1.293 0 2-.5 2-1.5S5.293 11 4 11a.5.5 0 010-1c1.293 0 2-.5 2-1.5S5.293 7 4 7a.5.5 0 01-.5-.5z" />
                    </svg>
                  ) : (
                    /* sun / UV icon */
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                      <path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6zM15.657 5.404a.75.75 0 010 1.06l-1.06 1.06a.75.75 0 11-1.06-1.06l1.06-1.06a.75.75 0 011.06 0zm-9.193 9.193a.75.75 0 010 1.06l-1.06 1.06a.75.75 0 01-1.06-1.06l1.06-1.06a.75.75 0 011.06 0zM17.5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0117.5 10zM5 10a.75.75 0 01-.75.75H2.75a.75.75 0 010-1.5h1.5A.75.75 0 015 10z" />
                    </svg>
                  )}
                </div>
                <p className="mt-4 leading-relaxed text-slate-600">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Seashore in this town ── */}
      {whyPoints.length > 0 && (
        <section className="bg-slate-50 px-6 py-16 md:py-20">
          <div className="mx-auto max-w-7xl">
            <SectionLabel>What we bring to {area.townName}</SectionLabel>
            <h2 className="font-heading mt-4 text-3xl font-bold text-navy md:text-4xl">
              Local expertise. Correct execution.
            </h2>
            <p className="mt-4 max-w-2xl text-slate-600">
              We approach every {area.townName} project knowing the specific stresses coastal decks face here — not as a generic contractor, but as a team that has worked these conditions since 2020.
            </p>
            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {whyPoints.map((point, i) => (
                <div
                  key={i}
                  className="group rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-turquoise/40 hover:shadow-lg"
                >
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-turquoise/10 text-turquoise transition duration-300 group-hover:bg-turquoise group-hover:text-white">
                    {WHY_ICONS[i]}
                  </div>
                  <p className="mt-4 text-sm font-semibold leading-snug text-navy">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── City-specific service summaries ── */}
      {area.serviceSummaries && area.serviceSummaries.length > 0 && (
        <section className="border-b border-slate-100 bg-white px-6 py-16 md:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionLabel>In-depth by service</SectionLabel>
            <h2 className="font-heading mt-4 text-3xl font-bold text-navy md:text-4xl">
              Fiberglass Deck Services in {area.townName}
            </h2>
            <p className="mt-4 max-w-2xl text-slate-600">
              Each service is described specifically for {area.townName} — the local conditions, what we check, and how we approach the work here.
            </p>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {area.serviceSummaries.map((summary, i) => (
                <div
                  key={summary.serviceName}
                  className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-br from-white to-slate-50 p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-turquoise/35 hover:shadow-lg"
                >
                  <div className="absolute right-5 top-5 font-heading text-5xl font-black leading-none text-turquoise/[0.07]">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-turquoise/10 text-turquoise transition duration-300 group-hover:bg-turquoise group-hover:text-white">
                    <svg className="h-4.5 w-4.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                      <path fillRule="evenodd" d="M16.704 5.29a.75.75 0 010 1.06l-8 8a.75.75 0 01-1.06 0l-4-4a.75.75 0 011.06-1.06l3.47 3.47 7.47-7.47a.75.75 0 011.06 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="font-heading mt-4 text-lg font-bold text-navy transition group-hover:text-turquoise">
                    {summary.serviceName}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{summary.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <AreaCta townName={area.townName} />
    </>
  );
}

export default function ServiceAreaDetailPage({ params }: { params: { slug: string } }) {
  const area = getServiceAreaDetail(params.slug);
  if (!area) notFound();

  return (
    <main className="overflow-hidden bg-white text-slate-800">
      <AreaBody area={area!} />
    </main>
  );
}
