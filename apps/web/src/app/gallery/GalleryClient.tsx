"use client";

import type { GalleryItem } from "@seashore/types";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useId, useRef, useState } from "react";

function BeforeAfterVisual({
  variant,
  label,
  imageAlt,
}: {
  variant: "before" | "after";
  label: string;
  imageAlt: string;
}) {
  const isBefore = variant === "before";
  return (
    <div
      role="img"
      aria-label={imageAlt}
      className={`relative aspect-[4/3] w-full overflow-hidden rounded-xl shadow-inner ${
        isBefore
          ? "bg-gradient-to-br from-slate-700 via-slate-800 to-slate-950"
          : "bg-gradient-to-br from-teal via-turquoise to-navy"
      }`}
    >
      <div
        className={`absolute inset-0 opacity-30 ${
          isBefore
            ? "bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.12),transparent_50%)]"
            : "bg-[radial-gradient(ellipse_at_70%_30%,rgba(255,255,255,0.18),transparent_55%)]"
        }`}
      />
      <div className="absolute bottom-3 left-3 rounded-full bg-black/35 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
        {label}
      </div>
    </div>
  );
}

function GalleryCard({
  item,
  onOpen,
}: {
  item: GalleryItem;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group w-full text-left transition"
    >
      <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-card transition group-hover:border-turquoise/25 group-hover:shadow-card-hover">
        <div className="grid grid-cols-2 gap-1 p-1">
          <BeforeAfterVisual variant="before" label="Before" imageAlt={item.beforeImageAlt} />
          <BeforeAfterVisual variant="after" label="After" imageAlt={item.afterImageAlt} />
        </div>
        <div className="px-4 pb-4 pt-3">
          <span className="inline-block rounded-full bg-turquoise/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-turquoise-dark">
            {item.category}
          </span>
          <h2 className="font-heading mt-2 text-lg font-bold leading-snug text-navy group-hover:text-turquoise-dark">
            {item.title}
          </h2>
          <p className="mt-2 line-clamp-2 text-sm text-slate-600">
            <span className="font-medium text-slate-800">Before:</span> {item.beforeDescription}
          </p>
        </div>
      </div>
    </button>
  );
}

export function GalleryClient({ items }: { items: readonly GalleryItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  const close = useCallback(() => setOpenIndex(null), []);
  const openAt = useCallback((i: number) => setOpenIndex(i), []);

  const goPrev = useCallback(() => {
    setOpenIndex((i) => {
      if (i === null || i <= 0) return i;
      return i - 1;
    });
  }, []);

  const goNext = useCallback(() => {
    setOpenIndex((i) => {
      if (i === null || i >= items.length - 1) return i;
      return i + 1;
    });
  }, [items.length]);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex, close, goPrev, goNext]);

  useEffect(() => {
    if (openIndex !== null) {
      closeRef.current?.focus();
    }
  }, [openIndex]);

  const active = openIndex !== null ? items[openIndex] : null;

  return (
    <>
      {/* Desktop + tablet: grid */}
      <div className="hidden gap-8 md:grid md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <GalleryCard key={item.id} item={item} onOpen={() => openAt(i)} />
        ))}
      </div>

      {/* Mobile: horizontal snap carousel */}
      <div className="md:hidden">
        <p className="mb-4 text-center text-sm text-slate-500">Swipe sideways to browse projects</p>
        <div className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4">
          {items.map((item, i) => (
            <div key={item.id} className="w-[min(92vw,420px)] shrink-0 snap-center">
              <GalleryCard item={item} onOpen={() => openAt(i)} />
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && openIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-navy/80 backdrop-blur-sm"
              aria-label="Close gallery"
              onClick={close}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              className="relative z-[101] flex max-h-[min(92vh,900px)] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/20 bg-white shadow-hero"
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ type: "spring", damping: 26, stiffness: 320 }}
            >
              <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-4 md:px-6">
                <div className="min-w-0">
                  <span className="text-[11px] font-bold uppercase tracking-wide text-turquoise">
                    {active.category} · {openIndex + 1} / {items.length}
                  </span>
                  <h2 id={titleId} className="font-heading mt-1 text-xl font-bold text-navy md:text-2xl">
                    {active.title}
                  </h2>
                </div>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={close}
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-50 hover:text-navy"
                  aria-label="Close"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 md:px-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <figure className="m-0">
                    <BeforeAfterVisual variant="before" label="Before" imageAlt={active.beforeImageAlt} />
                    <figcaption className="mt-3 text-sm leading-relaxed text-slate-600">
                      <span className="font-semibold text-navy">Before — </span>
                      {active.beforeDescription}
                    </figcaption>
                  </figure>
                  <figure className="m-0">
                    <BeforeAfterVisual variant="after" label="After" imageAlt={active.afterImageAlt} />
                    <figcaption className="mt-3 text-sm leading-relaxed text-slate-600">
                      <span className="font-semibold text-navy">After — </span>
                      {active.afterDescription}
                    </figcaption>
                  </figure>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 border-t border-slate-100 px-5 py-4 md:px-6">
                <button
                  type="button"
                  onClick={goPrev}
                  disabled={openIndex <= 0}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-navy transition enabled:hover:border-turquoise/40 enabled:hover:bg-turquoise/5 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  disabled={openIndex >= items.length - 1}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-navy transition enabled:hover:border-turquoise/40 enabled:hover:bg-turquoise/5 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
