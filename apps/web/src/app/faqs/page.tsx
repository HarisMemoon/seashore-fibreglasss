import type { Metadata } from "next";
import Link from "next/link";
import { FAQ_CATEGORIES, FAQ_H1, FAQ_META, HERO_PRIMARY_CTA, PHONE } from "@seashore/content";
import { FaqJsonLd } from "./FaqJsonLd";

export const metadata: Metadata = {
  title: FAQ_META.title,
  description: FAQ_META.description,
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

export default function FaqsPage() {
  return (
    <main className="overflow-hidden bg-white text-slate-800">
      <FaqJsonLd />

      <section className="relative overflow-hidden bg-navy-dark px-6 pb-20 pt-28 md:pb-28 md:pt-32">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1B3A5C] via-[#0d3a5c] to-[#060e18]" />
        <div className="absolute -right-24 -top-20 h-[360px] w-[360px] rounded-full bg-turquoise/15 blur-[90px]" />
        <div className="absolute -left-16 bottom-0 h-[220px] w-[220px] rounded-full bg-orange/10 blur-[70px]" />
        <NoiseOverlay />
        <div className="relative mx-auto max-w-7xl">
          <SectionLabel>Help center</SectionLabel>
          <h1 className="font-heading mt-5 max-w-4xl text-[clamp(2rem,4vw,3.5rem)] font-extrabold leading-[1.08] text-white">
            {FAQ_H1}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/70">
            Straight answers about fiberglass decks, repairs, and working with our team. Still have questions?{" "}
            <a className="font-medium text-turquoise hover:underline" href={`tel:${PHONE.replace(/\D/g, "")}`}>
              Call {PHONE}
            </a>
          </p>
        </div>
      </section>

      <section className="px-6 pb-16 md:pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="mt-14 space-y-16">
            {FAQ_CATEGORIES.map((category) => (
              <section key={category.id} aria-labelledby={`faq-heading-${category.id}`}>
                <h2 id={`faq-heading-${category.id}`} className="font-heading text-2xl font-bold text-navy">
                  {category.label}
                </h2>
                <div className="mt-6 space-y-4">
                  {category.items.map((item) => (
                    <details
                      key={item.question}
                      className="group rounded-2xl border border-slate-200/90 bg-white p-0 shadow-sm transition [&_summary::-webkit-details-marker]:hidden"
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-4 font-medium text-navy transition hover:bg-slate-50/80">
                        <span className="pr-6">{item.question}</span>
                        <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-500 transition group-open:rotate-180 group-open:border-turquoise/30 group-open:bg-turquoise/5">
                          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                            <path
                              fillRule="evenodd"
                              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.72a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.5-4.5a.75.75 0 01.02-1.06z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </summary>
                      <div className="border-t border-slate-100 px-5 pb-5 pt-0 leading-relaxed text-slate-600">
                        <p className="pt-4">{item.answer}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            ))}
          </div>

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