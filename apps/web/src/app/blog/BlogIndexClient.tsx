"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { BlogPost } from "@seashore/types";

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

export function BlogIndexClient({ posts }: { posts: readonly BlogPost[] }) {
  return (
    <motion.div
      className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08 }}
      variants={stagger}
    >
      {posts.map((post) => (
        <motion.article
          key={post.slug}
          variants={fadeUp}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm transition hover:border-turquoise/25 hover:shadow-md"
        >
          <Link href={`/blog/${post.slug}`} className="flex flex-1 flex-col p-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-turquoise focus-visible:ring-offset-2">
            <time className="text-xs font-semibold uppercase tracking-wider text-turquoise" dateTime={post.publishedAt}>
              {formatDate(post.publishedAt)}
            </time>
            <h2 className="font-heading mt-3 text-xl font-bold leading-snug text-navy transition group-hover:text-turquoise md:text-[1.35rem]">
              {post.title}
            </h2>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{post.excerpt}</p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-orange">
              Read article
              <svg className="h-4 w-4 transition group-hover:translate-x-0.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                <path
                  fillRule="evenodd"
                  d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </Link>
        </motion.article>
      ))}
    </motion.div>
  );
}
