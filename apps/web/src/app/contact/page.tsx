import type { Metadata } from "next";
import {
  ADDRESS,
  CONTACT_H1,
  CONTACT_HOURS,
  CONTACT_META,
  EMAIL,
  GOOGLE_MAPS_EMBED_SRC,
  HOW_WE_WORK_STEPS,
  PHONE,
} from "@seashore/content";
import { ContactForm } from "./ContactForm";
import BreadcrumbJsonLd from "../BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: CONTACT_META.title,
  description: CONTACT_META.description,
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-turquoise">
      <span className="h-px w-10 bg-gradient-to-r from-turquoise to-turquoise/0" />
      {children}
    </span>
  );
}

const phoneDigits = PHONE.replace(/\D/g, "");
const smsHref = `sms:+1${phoneDigits}`;

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />
    <main className="bg-white pt-28 text-slate-800 md:pt-32">
      <section className="border-b border-slate-100 bg-gradient-to-br from-slate-50 to-white px-6 pb-14 pt-0 md:pb-20">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>Get in touch</SectionLabel>
          <h1 className="font-heading mt-4 text-[clamp(2rem,3.8vw,3rem)] font-extrabold leading-[1.1] text-navy">
            {CONTACT_H1}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-600">
            Phone {PHONE} — 7 days a week · {CONTACT_HOURS}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`tel:${phoneDigits}`}
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-orange to-orange-light px-6 py-3.5 font-bold text-white shadow-md shadow-orange/20 transition hover:shadow-glow-orange"
            >
              Call Now
            </a>
            <a
              href={smsHref}
              className="inline-flex items-center justify-center rounded-xl border border-navy/15 bg-white px-6 py-3.5 font-semibold text-navy transition hover:border-turquoise/40 hover:bg-slate-50"
            >
              Text Us
            </a>
            <a
              href="#contact-form"
              className="inline-flex items-center justify-center rounded-xl border border-turquoise/30 bg-turquoise/5 px-6 py-3.5 font-semibold text-turquoise transition hover:bg-turquoise/10"
            >
              Schedule Free Inspection Online
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 md:py-20">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-slate-200/90 bg-slate-50/80 p-8">
              <h2 className="font-heading text-lg font-bold text-navy">Contact info</h2>
              <dl className="mt-6 space-y-4 text-slate-700">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Phone</dt>
                  <dd className="mt-1">
                    <a className="font-medium text-turquoise hover:underline" href={`tel:${phoneDigits}`}>
                      {PHONE}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Email</dt>
                  <dd className="mt-1">
                    <a className="font-medium text-turquoise hover:underline" href={`mailto:${EMAIL}`}>
                      {EMAIL}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Address</dt>
                  <dd className="mt-1">
                    {ADDRESS.street}, {ADDRESS.city}, {ADDRESS.state} {ADDRESS.zip}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Hours</dt>
                  <dd className="mt-1">{CONTACT_HOURS}</dd>
                </div>
              </dl>
            </div>
          </div>
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-slate-50/80 px-6 py-14 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>Our process</SectionLabel>
          <h2 className="font-heading mt-4 text-2xl font-bold text-navy md:text-3xl">How We Work</h2>
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {HOW_WE_WORK_STEPS.map((step, i) => (
              <li
                key={step.title}
                className="relative rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm"
              >
                <span className="font-heading text-3xl font-extrabold text-turquoise/30">{i + 1}</span>
                <h3 className="font-heading mt-3 text-lg font-bold text-navy">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-6 pb-20 pt-4">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-heading text-xl font-bold text-navy">Find us</h2>
          <p className="mt-2 text-slate-600">
            {ADDRESS.street}, {ADDRESS.city}, {ADDRESS.state} {ADDRESS.zip}
          </p>
          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 shadow-md">
            <iframe
              title="Seashore Fiberglass — Ocean City NJ map"
              src={GOOGLE_MAPS_EMBED_SRC}
              width="100%"
              height="420"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </main>
    </>
  );
}
