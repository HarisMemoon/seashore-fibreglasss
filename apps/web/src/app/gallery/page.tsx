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

export default function GalleryPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Gallery", path: "/gallery" },
        ]}
      />
    <main className="mx-auto max-w-7xl px-6 pb-20 pt-28 md:pt-32">
      <header className="max-w-3xl">
        <SectionLabel>Portfolio</SectionLabel>
        <h1 className="font-heading mt-5 text-[clamp(2rem,3.8vw,3rem)] font-extrabold leading-[1.1] text-navy">
          {GALLERY_H1}
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Before-and-after highlights from reglass, recolor, new construction, composite, and railing projects
          across the South Jersey Shore. Tap a project to open the full view. Questions?{" "}
          <a className="font-medium text-turquoise hover:underline" href={`tel:${PHONE.replace(/\D/g, "")}`}>
            Call {PHONE}
          </a>
        </p>
      </header>

      <div className="mt-14">
        <GalleryClient items={GALLERY_ITEMS} />
      </div>

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
    </main>
    </>
  );
}
