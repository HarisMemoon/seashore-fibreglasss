"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import type { BlogPost } from "@seashore/types";

const CATEGORY_FILTERS = [
  "All",
  "Maintenance",
  "Repair",
  "Materials",
  "Coastal Tips",
  "New Construction",
] as const;

type CategoryFilter = (typeof CATEGORY_FILTERS)[number];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso + "T12:00:00"));
}

const CATEGORY_GRADIENTS: Record<string, string> = {
  Repair: "from-slate-700 via-slate-800 to-slate-950",
  Reglass: "from-[#0d4a5c] via-navy to-navy-dark",
  Recolor: "from-turquoise/60 via-[#0d4a5c] to-navy-dark",
  Maintenance: "from-orange/40 via-[#6b3d1a]/50 to-navy-dark",
  Materials: "from-[#1a3a5c] via-navy to-slate-900",
  "Coastal Tips": "from-turquoise/40 via-[#0a3a50] to-navy-dark",
  "New Construction": "from-navy via-[#0d2137] to-slate-900",
};

function BlogCoverImage({ post }: { post: BlogPost }) {
  const gradient =
    CATEGORY_GRADIENTS[post.category ?? ""] ?? "from-navy via-[#0d2137] to-slate-900";

  return (
    <div className={`relative aspect-[16/9] w-full overflow-hidden bg-gradient-to-br ${gradient}`}>
      {post.image ? (
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
      ) : (
        <>
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_30%_30%,rgba(255,255,255,0.2),transparent_60%)]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/30">
              {post.category ?? "Article"}
            </span>
          </div>
        </>
      )}
      {post.category && (
        <span className="absolute bottom-3 left-3 rounded-full bg-black/40 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
          {post.category}
        </span>
      )}
    </div>
  );
}

export function BlogIndexClient({ posts }: { posts: readonly BlogPost[] }) {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All");

  const filteredPosts =
    activeCategory === "All"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Category filter bar */}
      <div className="flex flex-wrap gap-2">
        {CATEGORY_FILTERS.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
              activeCategory === cat
                ? "border-turquoise bg-turquoise text-white shadow-sm"
                : "border-slate-200 bg-white text-slate-700 hover:border-turquoise/40 hover:text-turquoise"
            }`}
          >
            {cat}
          </button>
        ))}
        {filteredPosts.length < posts.length && (
          <span className="ml-2 self-center text-xs text-slate-500">
            {filteredPosts.length} article{filteredPosts.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {filteredPosts.length === 0 && (
        <p className="py-12 text-center text-slate-500">No articles in this category yet.</p>
      )}

      <motion.div
        key={activeCategory}
        className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        {filteredPosts.map((post) => (
          <motion.article
            key={post.slug}
            variants={fadeUp}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm transition hover:border-turquoise/25 hover:shadow-md"
          >
            <Link
              href={`/blog/${post.slug}`}
              className="flex flex-1 flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-turquoise focus-visible:ring-offset-2"
            >
              {/* Cover image */}
              <BlogCoverImage post={post} />

              {/* Card body */}
              <div className="flex flex-1 flex-col p-6">
                <time
                  className="text-xs font-semibold uppercase tracking-wider text-turquoise"
                  dateTime={post.publishedAt}
                >
                  {formatDate(post.publishedAt)}
                  <span className="ml-2 text-slate-400">· {post.readTimeMinutes} min read</span>
                </time>
                <h2 className="font-heading mt-3 text-xl font-bold leading-snug text-navy transition group-hover:text-turquoise md:text-[1.35rem]">
                  {post.title}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{post.excerpt}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-orange">
                  Read article
                  <svg
                    className="h-4 w-4 transition group-hover:translate-x-0.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </div>
            </Link>
          </motion.article>
        ))}
      </motion.div>
    </>
  );
}
