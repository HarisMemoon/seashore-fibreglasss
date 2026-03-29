import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getServiceDetail,
  HERO_PRIMARY_CTA,
  HERO_SECONDARY_CTA,
  PHONE,
  SERVICES,
} from "@seashore/content";
import type { ServiceDetail } from "@seashore/types";
import ServiceDetailJsonLd from "./ServiceDetailJsonLd";

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const detail = getServiceDetail(params.slug);
  if (!detail) {
    return { title: "Service" };
  }
  return {
    title: detail.metaTitle,
    description: detail.metaDescription,
  };
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

function ServiceCta({
  heading = "Ready for a free inspection?",
  lead = "We will diagnose your deck honestly and give you a clear scope — no pressure.",
}: {
  heading?: string;
  lead?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#1B3A5C] via-[#0d3a5c] to-[#060e18] px-6 py-16 md:py-20">
      <div className="absolute -right-20 top-0 h-72 w-72 rounded-full bg-turquoise/15 blur-[80px]" />
      <div className="relative mx-auto max-w-4xl text-center">
        <h2 className="font-heading text-2xl font-bold text-white md:text-3xl">{heading}</h2>
        <p className="mt-4 text-lg text-white/75">{lead}</p>
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
            {HERO_SECONDARY_CTA}
          </a>
        </div>
      </div>
    </section>
  );
}

function DetailBody({ detail }: { detail: ServiceDetail }) {
  const path = `/services/${detail.slug}`;

  return (
    <>
      <ServiceDetailJsonLd detail={detail} path={path} />

      <section className="relative overflow-hidden bg-navy-dark px-6 pb-16 pt-24 md:pb-20 md:pt-28">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1B3A5C] via-[#0d3a5c] to-[#060e18]" />
        <div className="animate-float-slow absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-turquoise/16 blur-[90px]" />
        <NoiseOverlay />
        <div className="relative mx-auto max-w-7xl">
          <nav aria-label="Breadcrumb" className="text-sm font-semibold text-turquoise">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="transition hover:text-white">
                  Home
                </Link>
              </li>
              <li aria-hidden className="text-white/40">
                /
              </li>
              <li>
                <Link href="/services" className="transition hover:text-white">
                  Services
                </Link>
              </li>
              <li aria-hidden className="text-white/40">
                /
              </li>
              <li className="text-white/70">{detail.h1}</li>
            </ol>
          </nav>
          <h1 className="font-heading mt-6 max-w-4xl text-[clamp(1.75rem,3.5vw,2.75rem)] font-extrabold leading-[1.12] text-white">
            {detail.h1}
          </h1>
          <div className="mt-8 max-w-3xl space-y-5 text-lg leading-relaxed text-white/75">
            {detail.intro.map((p) => (
              <p key={p.slice(0, 48)}>{p}</p>
            ))}
          </div>
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

      {detail.commonProblems && detail.commonProblems.length > 0 ? (
        <section className="border-b border-slate-100 bg-white px-6 py-16 md:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionLabel>Diagnosis</SectionLabel>
            <h2 className="font-heading mt-4 text-3xl font-bold text-navy md:text-4xl">
              Common problems we diagnose and repair
            </h2>
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {detail.commonProblems.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-6 shadow-sm transition hover:border-turquoise/30 hover:shadow-md"
                >
                  <h3 className="font-heading text-lg font-bold text-navy">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {detail.diagnosticApproach && detail.diagnosticApproach.length > 0 ? (
        <section className="border-b border-slate-100 bg-slate-50 px-6 py-16 md:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionLabel>How we work</SectionLabel>
            <h2 className="font-heading mt-4 text-3xl font-bold text-navy md:text-4xl">Our diagnostic approach</h2>
            <ul className="mt-10 space-y-4">
              {detail.diagnosticApproach.map((line) => (
                <li
                  key={line.slice(0, 48)}
                  className="flex gap-4 rounded-xl border border-slate-200/80 bg-white px-5 py-4 text-slate-700 shadow-sm"
                >
                  <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-turquoise" />
                  <span className="leading-relaxed">{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {detail.repairLevels && detail.repairLevels.length > 0 ? (
        <section className="border-b border-slate-100 bg-white px-6 py-16 md:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionLabel>Service levels</SectionLabel>
            <h2 className="font-heading mt-4 text-3xl font-bold text-navy md:text-4xl">
              Three repair levels — match the fix to the failure
            </h2>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {detail.repairLevels.map((item) => (
                <div
                  key={item.title}
                  className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm"
                >
                  <div className="font-heading text-2xl font-extrabold text-turquoise/30">{item.title}</div>
                  <p className="mt-4 text-sm leading-relaxed text-slate-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {detail.constructionComponents && detail.constructionComponents.length > 0 ? (
        <section className="border-b border-slate-100 bg-slate-50 px-6 py-16 md:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionLabel>System</SectionLabel>
            <h2 className="font-heading mt-4 text-3xl font-bold text-navy md:text-4xl">
              Our new construction system — from framing to gelcoat
            </h2>
            <ol className="mt-12 space-y-4">
              {detail.constructionComponents.map((step, i) => (
                <li
                  key={step.title}
                  className="flex gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm md:gap-6"
                >
                  <span className="font-heading flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-navy text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-navy">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {detail.whenRight && detail.whenRight.length > 0 ? (
        <section className="border-b border-slate-100 bg-white px-6 py-16 md:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionLabel>
              {detail.slug === "fiberglass-deck-recolor" ? "Maintenance" : "Restoration"}
            </SectionLabel>
            <h2 className="font-heading mt-4 text-3xl font-bold text-navy md:text-4xl">
              {detail.slug === "fiberglass-deck-recolor"
                ? "When recolor is the right maintenance choice"
                : "When reglass is the right restoration"}
            </h2>
            <ul className="mt-10 space-y-3">
              {detail.whenRight.map((line) => (
                <li
                  key={line.slice(0, 48)}
                  className="flex gap-3 rounded-xl border border-slate-200/80 bg-slate-50/80 px-4 py-3 text-slate-700"
                >
                  <span className="text-turquoise">✓</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            {detail.distinctionNote && detail.distinctionNote.length > 0 ? (
              <div className="mt-10 max-w-3xl rounded-2xl border border-turquoise/25 bg-turquoise/5 p-6">
                {detail.distinctionNote.map((p) => (
                  <p key={p.slice(0, 48)} className="text-sm leading-relaxed text-slate-700">
                    {p}
                  </p>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {detail.processSteps && detail.processSteps.length > 0 ? (
        <section
          className={`border-b border-slate-100 px-6 py-16 md:py-24 ${
            detail.slug === "fiberglass-deck-repair" ? "bg-white" : "bg-slate-50"
          }`}
        >
          <div className="mx-auto max-w-7xl">
            <SectionLabel>Process</SectionLabel>
            <h2 className="font-heading mt-4 text-3xl font-bold text-navy md:text-4xl">
              {detail.slug === "fiberglass-deck-repair"
                ? "Standard repair process (reglass-level)"
                : detail.slug === "fiberglass-deck-recolor"
                  ? "Professional recolor process"
                  : "Professional reglass process"}
            </h2>
            <div className="mt-12 space-y-5">
              {detail.processSteps.map((step) => (
                <div
                  key={step.title}
                  className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm md:p-6"
                >
                  <h3 className="font-heading text-lg font-semibold text-navy">{step.title}</h3>
                  {step.description ? (
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.description}</p>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {detail.timeline ? (
        <section className="border-b border-slate-100 bg-slate-50 px-6 py-10 md:py-14">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-turquoise">Timeline</p>
            <p className="mt-3 text-lg text-slate-700">{detail.timeline}</p>
          </div>
        </section>
      ) : null}

      {detail.maintenanceIntervals && detail.maintenanceIntervals.length > 0 ? (
        <section className="border-b border-slate-100 bg-white px-6 py-12 md:py-16">
          <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-slate-50 px-6 py-8 text-center">
            <h3 className="font-heading text-lg font-bold text-navy">Maintenance intervals</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              {detail.maintenanceIntervals.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {detail.compositeSections && detail.compositeSections.length > 0 ? (
        <section className="border-b border-slate-100 bg-white px-6 py-16 md:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionLabel>Materials & fit</SectionLabel>
            <h2 className="font-heading mt-4 text-3xl font-bold text-navy md:text-4xl">
              Wolf, Azek & coastal performance
            </h2>
            <div className="mt-12 space-y-14">
              {detail.compositeSections.map((block) => (
                <div key={block.title}>
                  <h3 className="font-heading text-xl font-bold text-navy md:text-2xl">{block.title}</h3>
                  <div className="mt-4 max-w-3xl space-y-4 text-slate-600">
                    {block.body.map((p) => (
                      <p key={p.slice(0, 48)} className="leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {detail.vinylSections && detail.vinylSections.length > 0 ? (
        <section className="border-b border-slate-100 bg-slate-50 px-6 py-16 md:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionLabel>Railing & waterproofing</SectionLabel>
            <h2 className="font-heading mt-4 text-3xl font-bold text-navy md:text-4xl">
              Why vinyl — and how we keep posts dry
            </h2>
            <div className="mt-12 space-y-14">
              {detail.vinylSections.map((block) => (
                <div key={block.title}>
                  <h3 className="font-heading text-xl font-bold text-navy md:text-2xl">{block.title}</h3>
                  <div className="mt-4 max-w-3xl space-y-4 text-slate-600">
                    {block.body.map((p) => (
                      <p key={p.slice(0, 48)} className="leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <ServiceCta />
    </>
  );
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const detail = getServiceDetail(params.slug);

  if (!detail) {
    notFound();
  }

  return (
    <main className="overflow-hidden bg-white text-slate-800">
      <DetailBody detail={detail} />
    </main>
  );
}
