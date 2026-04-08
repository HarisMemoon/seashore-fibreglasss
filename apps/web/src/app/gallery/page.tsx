import type { Metadata } from "next";
import Link from "next/link";
import { GALLERY_H1, GALLERY_ITEMS, GALLERY_META, HERO_PRIMARY_CTA, PHONE } from "@seashore/content";
import { GalleryClient } from "./GalleryClient";
import BreadcrumbJsonLd from "../BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: GALLERY_META.title,
  description: GALLERY_META.description,
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

export default function GalleryPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Gallery", path: "/gallery" },
        ]}
      />
      <main className="overflow-hidden bg-white text-slate-800">
        <section className="relative overflow-hidden bg-navy-dark px-6 pb-20 pt-28 md:pb-28 md:pt-32">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1B3A5C] via-[#0d3a5c] to-[#060e18]" />
          <div className="absolute -right-24 -top-20 h-[360px] w-[360px] rounded-full bg-turquoise/15 blur-[90px]" />
          <div className="absolute -left-16 bottom-0 h-[220px] w-[220px] rounded-full bg-orange/10 blur-[70px]" />
          <NoiseOverlay />
          <div className="relative mx-auto max-w-7xl">
            <SectionLabel>Portfolio</SectionLabel>
            <h1 className="font-heading mt-5 max-w-4xl text-[clamp(2rem,4vw,3.5rem)] font-extrabold leading-[1.08] text-white">
              {GALLERY_H1}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/70">
              Before-and-after highlights from reglass, recolor, new construction, composite, and railing projects
              across the South Jersey Shore. Tap a project to open the full view. Questions?{" "}
              <a className="font-medium text-turquoise hover:underline" href={`tel:${PHONE.replace(/\D/g, "")}`}>
                Call {PHONE}
              </a>
            </p>
          </div>
        </section>

        <section className="px-6 pb-20">
          <div className="mx-auto mt-14 max-w-7xl">
            <GalleryClient items={GALLERY_ITEMS} />

            <div className="mt-16 rounded-2xl border border-turquoise/20 bg-gradient-to-br from-slate-50 to-white p-8 md:flex md:items-center md:justify-between md:gap-8">
              <div>
                <p className="font-heading text-2xl font-bold text-navy">Want results like these?</p>
                <p className="mt-2 text-slate-600">Schedule a free inspection — we&apos;ll assess your deck in person.</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3 md:mt-0">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-orange to-orange-light px-6 py-3.5 font-bold text-white shadow-md shadow-orange/20"
                >
                  {HERO_PRIMARY_CTA}
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center rounded-xl border-2 border-navy/15 px-6 py-3.5 font-bold text-navy transition hover:border-turquoise/40 hover:bg-turquoise/5"
                >
                  Our services
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}