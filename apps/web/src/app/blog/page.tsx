import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_H1, BLOG_INDEX_META, getBlogPostsSorted, HERO_PRIMARY_CTA, PHONE } from "@seashore/content";
import { BlogIndexClient } from "./BlogIndexClient";
import BreadcrumbJsonLd from "../BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: BLOG_INDEX_META.title,
  description: BLOG_INDEX_META.description,
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-turquoise">
      <span className="h-px w-10 bg-gradient-to-r from-turquoise to-turquoise/0" />
      {children}
    </span>
  );
}

export default function BlogPage() {
  const posts = getBlogPostsSorted();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ]}
      />
    <main className="mx-auto max-w-7xl px-6 pb-20 pt-28 md:pt-32">
      <header className="max-w-3xl">
        <SectionLabel>Resources</SectionLabel>
        <h1 className="font-heading mt-5 text-[clamp(2rem,3.8vw,3rem)] font-extrabold leading-[1.1] text-navy">
          {BLOG_H1}
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Practical guidance on fiberglass systems, coastal maintenance, and waterproofing — from our crew in Ocean City NJ. Questions?{" "}
          <a className="font-medium text-turquoise hover:underline" href={`tel:${PHONE.replace(/\D/g, "")}`}>
            Call {PHONE}
          </a>
        </p>
      </header>

      <BlogIndexClient posts={posts} />

      <div className="mt-16 rounded-2xl border border-turquoise/20 bg-gradient-to-br from-slate-50 to-white p-8 md:flex md:items-center md:justify-between md:gap-8">
        <div>
          <p className="font-heading text-2xl font-bold text-navy">Ready for an on-site inspection?</p>
          <p className="mt-2 text-slate-600">We&apos;ll assess your deck and recommend the right scope — repair, reglass, recolor, or new construction.</p>
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
            View services
          </Link>
        </div>
      </div>
    </main>
    </>
  );
}
