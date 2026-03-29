import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getServiceAreaDetail,
  HERO_PRIMARY_CTA,
  HERO_SECONDARY_CTA,
  PHONE,
  SERVICE_AREA_DETAILS,
  SERVICES,
} from "@seashore/content";
import type { ServiceAreaDetail } from "@seashore/types";
import ServiceAreaJsonLd from "./ServiceAreaJsonLd";

export function generateStaticParams() {
  return SERVICE_AREA_DETAILS.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const area = getServiceAreaDetail(params.slug);
  if (!area) {
    return { title: "Service area" };
  }
  return {
    title: area.metaTitle,
    description: area.metaDescription,
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

function AreaCta({ townName }: { townName: string }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#1B3A5C] via-[#0d3a5c] to-[#060e18] px-6 py-16 md:py-20">
      <div className="absolute -right-20 top-0 h-72 w-72 rounded-full bg-turquoise/15 blur-[80px]" />
      <div className="relative mx-auto max-w-4xl text-center">
        <h2 className="font-heading text-2xl font-bold text-white md:text-3xl">
          Ready for a free inspection in {townName}?
        </h2>
        <p className="mt-4 text-lg text-white/75">
          We will diagnose your deck honestly and give you a clear scope — no pressure.
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
            {HERO_SECONDARY_CTA}
          </a>
        </div>
      </div>
    </section>
  );
}

function AreaBody({ area }: { area: ServiceAreaDetail }) {
  const path = `/service-areas/${area.slug}`;

  return (
    <>
      <ServiceAreaJsonLd area={area} path={path} />

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
                <Link href="/service-areas" className="transition hover:text-white">
                  Service areas
                </Link>
              </li>
              <li aria-hidden className="text-white/40">
                /
              </li>
              <li className="text-white/70">{area.townName}</li>
            </ol>
          </nav>
          <h1 className="font-heading mt-6 max-w-4xl text-[clamp(1.75rem,3.5vw,2.75rem)] font-extrabold leading-[1.12] text-white">
            {area.h1}
          </h1>
          <div className="mt-8 max-w-3xl space-y-5 text-lg leading-relaxed text-white/75">
            {area.intro.map((p, i) => (
              <p key={i}>{p}</p>
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

      <section className="border-b border-slate-100 bg-white px-6 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>Local conditions</SectionLabel>
          <h2 className="font-heading mt-4 text-3xl font-bold text-navy md:text-4xl">
            {area.localChallengeTitle}
          </h2>
          <div className="mt-10 max-w-3xl space-y-5 text-slate-600">
            {area.localChallengeBody.map((p, i) => (
              <p key={i} className="leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-100 bg-slate-50 px-6 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>Services</SectionLabel>
          <h2 className="font-heading mt-4 text-3xl font-bold text-navy md:text-4xl">
            What we offer in {area.townName}
          </h2>
          <p className="mt-4 max-w-2xl text-slate-600">
            Full fiberglass deck and coastal railing services — click through for details on each line of work.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:border-turquoise/40 hover:shadow-md"
              >
                <h3 className="font-heading text-lg font-bold text-navy group-hover:text-turquoise">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{service.description}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-turquoise">
                  Learn more →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <AreaCta townName={area.townName} />
    </>
  );
}

export default function ServiceAreaDetailPage({ params }: { params: { slug: string } }) {
  const area = getServiceAreaDetail(params.slug);

  if (!area) {
    notFound();
  }

  return (
    <main className="overflow-hidden bg-white text-slate-800">
      <AreaBody area={area} />
    </main>
  );
}
