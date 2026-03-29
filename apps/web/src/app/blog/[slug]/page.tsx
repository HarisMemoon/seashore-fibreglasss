import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllBlogSlugs,
  getBlogPost,
  getBlogPostsSorted,
  HERO_PRIMARY_CTA,
  PHONE,
  SERVICES,
} from "@seashore/content";
import type { BlogPost } from "@seashore/types";
import { BlogArticleBlocks } from "../BlogArticleBlocks";
import BlogPostJsonLd from "./BlogPostJsonLd";

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getBlogPost(params.slug);
  if (!post) {
    return { title: "Blog" };
  }
  return {
    title: post.metaTitle,
    description: post.metaDescription,
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

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso + "T12:00:00"));
}

function serviceTitle(slug: string) {
  return SERVICES.find((s) => s.slug === slug)?.title ?? slug;
}

function RelatedPosts({ currentSlug }: { currentSlug: string }) {
  const others = getBlogPostsSorted()
    .filter((p) => p.slug !== currentSlug)
    .slice(0, 3);

  if (others.length === 0) return null;

  return (
    <section className="mt-16 border-t border-slate-200 pt-10">
      <h2 className="font-heading text-2xl font-bold text-navy">More articles</h2>
      <ul className="mt-6 space-y-4">
        {others.map((p) => (
          <li key={p.slug}>
            <Link href={`/blog/${p.slug}`} className="group block rounded-xl border border-slate-200/90 bg-slate-50/50 p-4 transition hover:border-turquoise/30 hover:bg-white">
              <span className="text-xs font-semibold uppercase tracking-wider text-turquoise">{formatDate(p.publishedAt)}</span>
              <span className="mt-1 block font-heading text-lg font-bold text-navy group-hover:text-turquoise">{p.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ArticleBody({ post }: { post: BlogPost }) {
  const path = `/blog/${post.slug}`;

  return (
    <>
      <BlogPostJsonLd post={post} path={path} />

      <article className="relative">
        <header className="border-b border-slate-200 pb-10">
          <nav aria-label="Breadcrumb" className="text-sm font-semibold text-turquoise">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="transition hover:text-navy">
                  Home
                </Link>
              </li>
              <li aria-hidden className="text-slate-400">
                /
              </li>
              <li>
                <Link href="/blog" className="transition hover:text-navy">
                  Blog
                </Link>
              </li>
              <li aria-hidden className="text-slate-400">
                /
              </li>
              <li className="max-w-[min(100%,42rem)] text-slate-600">{post.title}</li>
            </ol>
          </nav>

          <SectionLabel>Article</SectionLabel>
          <h1 className="font-heading mt-5 text-[clamp(1.75rem,3.5vw,2.75rem)] font-extrabold leading-[1.15] text-navy">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-slate-600">{post.excerpt}</p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-500">
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            <span aria-hidden>·</span>
            <span>{post.readTimeMinutes} min read</span>
          </div>
        </header>

        <div className="mt-10 max-w-3xl">
          <BlogArticleBlocks blocks={post.blocks} />
        </div>

        {post.relatedServiceSlugs && post.relatedServiceSlugs.length > 0 ? (
          <section className="mt-14 rounded-2xl border border-turquoise/20 bg-gradient-to-br from-slate-50 to-white p-6 md:p-8">
            <h2 className="font-heading text-xl font-bold text-navy">Related services</h2>
            <ul className="mt-4 flex flex-wrap gap-3">
              {post.relatedServiceSlugs.map((slug) => (
                <li key={slug}>
                  <Link
                    href={`/services/${slug}`}
                    className="inline-flex items-center rounded-xl border border-navy/10 bg-white px-4 py-2 text-sm font-semibold text-navy shadow-sm transition hover:border-turquoise/40 hover:text-turquoise"
                  >
                    {serviceTitle(slug)}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <RelatedPosts currentSlug={post.slug} />

        <div className="mt-14 flex flex-wrap gap-4 border-t border-slate-200 pt-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-semibold text-turquoise hover:underline"
          >
            ← Back to blog
          </Link>
          <a
            href={`tel:${PHONE.replace(/\D/g, "")}`}
            className="inline-flex items-center justify-center rounded-xl border border-navy/15 px-5 py-2.5 text-sm font-semibold text-navy transition hover:border-turquoise/40"
          >
            Call {PHONE}
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-orange to-orange-light px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-orange/20"
          >
            {HERO_PRIMARY_CTA}
          </Link>
        </div>
      </article>
    </>
  );
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-4xl px-6 pb-16 pt-28 md:pt-32">
      <ArticleBody post={post} />
    </main>
  );
}
