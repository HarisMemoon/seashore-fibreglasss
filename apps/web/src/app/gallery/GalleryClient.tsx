"use client";

import Link from "next/link";
import Image from "next/image";
import type { GalleryItem } from "@seashore/types";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";

const FILTER_OPTIONS = [
  "All",
  "Repair",
  "Reglass",
  "Recolor",
  "New Construction",
  "Composite",
  "Vinyl Railing",
] as const;

type FilterOption = (typeof FILTER_OPTIONS)[number];

/** Display labels and filter keys for grouped "All" view */
const CATEGORY_GROUPS: { label: string; filter: Exclude<FilterOption, "All"> }[] = [
  { label: "Repair & Structural Work", filter: "Repair" },
  { label: "Reglass & Full Resurfacing", filter: "Reglass" },
  { label: "Recolor & Re-Gelcoating", filter: "Recolor" },
  { label: "New Construction", filter: "New Construction" },
  { label: "Composite Decking", filter: "Composite" },
  { label: "Vinyl Railing", filter: "Vinyl Railing" },
];

function matchesFilter(category: string, filter: FilterOption): boolean {
  if (filter === "All") return true;
  return category.toLowerCase().includes(filter.toLowerCase());
}

/** How often (in cards) an inline CTA appears among the results */
const CTA_INTERVAL = 4;

function BeforeAfterVisual({
  variant,
  label,
  imageAlt,
  src,
}: {
  variant: "before" | "after";
  label: string;
  imageAlt: string;
  src?: string;
}) {
  const isBefore = variant === "before";
  return (
    <div
      className={`relative aspect-[4/3] w-full overflow-hidden rounded-xl shadow-inner ${
        src
          ? "bg-slate-100"
          : isBefore
            ? "bg-gradient-to-br from-slate-700 via-slate-800 to-slate-950"
            : "bg-gradient-to-br from-teal via-turquoise to-navy"
      }`}
    >
      {src ? (
        <Image
          src={src}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className="object-cover"
          loading="lazy"
        />
      ) : (
        <div
          role="img"
          aria-label={imageAlt}
          className={`absolute inset-0 opacity-30 ${
            isBefore
              ? "bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.12),transparent_50%)]"
              : "bg-[radial-gradient(ellipse_at_70%_30%,rgba(255,255,255,0.18),transparent_55%)]"
          }`}
        />
      )}
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
          <BeforeAfterVisual variant="before" label="Before" imageAlt={item.beforeImageAlt} src={item.beforeImage} />
          <BeforeAfterVisual variant="after" label="After" imageAlt={item.afterImageAlt} src={item.afterImage} />
        </div>
        <div className="px-4 pb-4 pt-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-block rounded-full bg-turquoise/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-turquoise-dark">
              {item.category}
            </span>
            {item.location && (
              <span className="inline-block rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-500">
                {item.location}
              </span>
            )}
          </div>
          <h2 className="font-heading mt-2 text-lg font-bold leading-snug text-navy group-hover:text-turquoise-dark">
            {item.title}
          </h2>
          <p className="mt-2 line-clamp-2 text-sm text-slate-600">
            <span className="font-medium text-slate-800">Before:</span> {item.beforeDescription}
          </p>
          <p className="mt-1 text-xs font-semibold text-turquoise">Tap to see full before &amp; after →</p>
        </div>
      </div>
    </button>
  );
}

/** Rotating copy so repeated inline CTAs don't feel copy-pasted */
const CTA_VARIANTS: { heading: string; button: string }[] = [
  {
    heading: "Serving homeowners from Ocean City to Cape May — free inspections, no pressure.",
    button: "Get My Free Inspection",
  },
  {
    heading: "Every project starts with a free, honest inspection — no pressure, just clear answers.",
    button: "Schedule My Free Inspection",
  },
  {
    heading: "Ready to get your deck Shore-ready? Let's talk about your project.",
    button: "Get My Free Quote",
  },
];

function InlineCta({ variant = 0 }: { variant?: number }) {
  const { heading, button } = CTA_VARIANTS[variant % CTA_VARIANTS.length];
  return (
    <div className="col-span-full rounded-2xl border border-turquoise/20 bg-gradient-to-br from-slate-50 to-white p-8 text-center">
      <p className="font-heading text-xl font-bold text-navy">{heading}</p>
      <div className="mt-5">
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-orange to-orange-light px-8 py-4 font-bold text-white shadow-lg shadow-orange/25 transition hover:shadow-glow-orange"
        >
          {button}
        </Link>
      </div>
    </div>
  );
}

function CityFilterDropdown({
  cities,
  selected,
  onToggle,
  onClear,
}: {
  cities: string[];
  selected: Set<string>;
  onToggle: (city: string) => void;
  onClear: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const label =
    selected.size === 0
      ? "Filter by city"
      : selected.size === 1
        ? Array.from(selected)[0]
        : `${selected.size} cities selected`;

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
          selected.size > 0
            ? "border-turquoise bg-turquoise/10 text-turquoise-dark"
            : "border-slate-200 bg-white text-slate-700 hover:border-turquoise/40 hover:text-turquoise"
        }`}
      >
        <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span className="max-w-[12rem] truncate">{label}</span>
        <svg
          className={`h-3.5 w-3.5 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 top-full z-20 mt-2 w-64 rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
          <div className="max-h-72 overflow-y-auto">
            {cities.map((city) => (
              <label
                key={city}
                className="flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
              >
                <input
                  type="checkbox"
                  checked={selected.has(city)}
                  onChange={() => onToggle(city)}
                  className="h-4 w-4 rounded border-slate-300 text-turquoise focus:ring-2 focus:ring-turquoise/40"
                />
                {city}
              </label>
            ))}
          </div>
          {selected.size > 0 && (
            <button
              type="button"
              onClick={onClear}
              className="mt-1 w-full rounded-lg px-3 py-2 text-left text-xs font-semibold text-turquoise-dark transition hover:bg-turquoise/5"
            >
              Clear cities
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function CategoryDivider({ label, count }: { label: string; count: number }) {
  return (
    <div className="col-span-full mt-4 mb-1 flex items-center gap-4">
      <div className="flex items-baseline gap-3">
        <h2 className="font-heading text-xl font-extrabold text-navy">{label}</h2>
        <span className="rounded-full bg-turquoise/10 px-2.5 py-0.5 text-xs font-bold text-turquoise-dark">
          {count} {count === 1 ? "project" : "projects"}
        </span>
      </div>
      <div className="h-px flex-1 bg-slate-200" />
    </div>
  );
}

export function GalleryClient({ items }: { items: readonly GalleryItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterOption>("All");
  const [selectedCities, setSelectedCities] = useState<Set<string>>(new Set());
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  const cities = useMemo(
    () => Array.from(new Set(items.map((item) => item.location).filter(Boolean))).sort(),
    [items]
  );

  const onToggleCity = useCallback((city: string) => {
    setSelectedCities((prev) => {
      const next = new Set(prev);
      if (next.has(city)) next.delete(city);
      else next.add(city);
      return next;
    });
    setOpenIndex(null);
  }, []);

  const onClearCities = useCallback(() => {
    setSelectedCities(new Set());
    setOpenIndex(null);
  }, []);

  const filteredItems = items.filter(
    (item) =>
      matchesFilter(item.category, activeFilter) &&
      (selectedCities.size === 0 || selectedCities.has(item.location))
  );

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
      if (i === null || i >= filteredItems.length - 1) return i;
      return i + 1;
    });
  }, [filteredItems.length]);

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

  const active = openIndex !== null ? filteredItems[openIndex] : null;

  // Build the grid: grouped by type with category dividers when showing All,
  // single flat list when a specific filter is active.
  // An inline CTA is inserted every CTA_INTERVAL cards, plus a final one
  // if the last CTA didn't land on the final card.
  const gridNodes: React.ReactNode[] = [];
  let cardCount = 0;
  let ctaIndex = 0;

  const pushCard = (item: GalleryItem, idx: number) => {
    gridNodes.push(
      <GalleryCard key={item.id} item={item} onOpen={() => openAt(idx)} />
    );
    cardCount += 1;
    if (cardCount % CTA_INTERVAL === 0) {
      gridNodes.push(<InlineCta key={`cta-${cardCount}`} variant={ctaIndex} />);
      ctaIndex += 1;
    }
  };

  if (activeFilter === "All") {
    CATEGORY_GROUPS.forEach(({ label, filter }) => {
      const groupItems = filteredItems.filter((item) =>
        matchesFilter(item.category, filter)
      );
      if (groupItems.length === 0) return;
      gridNodes.push(
        <CategoryDivider key={`divider-${filter}`} label={label} count={groupItems.length} />
      );
      groupItems.forEach((item) => {
        pushCard(item, filteredItems.indexOf(item));
      });
    });
  } else {
    filteredItems.forEach((item, i) => {
      pushCard(item, i);
    });
  }

  // Always end with a CTA, unless one was just placed
  if (filteredItems.length > 0 && cardCount % CTA_INTERVAL !== 0) {
    gridNodes.push(<InlineCta key="cta-end" variant={ctaIndex} />);
  }

  return (
    <>
      {/* Filter bar */}
      <div className="mb-10 flex flex-wrap items-center gap-2">
        {FILTER_OPTIONS.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => {
              setActiveFilter(filter);
              setOpenIndex(null);
            }}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
              activeFilter === filter
                ? "border-turquoise bg-turquoise text-white shadow-sm"
                : "border-slate-200 bg-white text-slate-700 hover:border-turquoise/40 hover:text-turquoise"
            }`}
          >
            {filter}
          </button>
        ))}
        <span className="mx-1 hidden h-6 w-px bg-slate-200 sm:block" aria-hidden />
        <CityFilterDropdown
          cities={cities}
          selected={selectedCities}
          onToggle={onToggleCity}
          onClear={onClearCities}
        />
        {filteredItems.length < items.length && (
          <span className="ml-2 self-center text-xs text-slate-500">
            {filteredItems.length} project{filteredItems.length !== 1 ? "s" : ""} shown
          </span>
        )}
      </div>

      {filteredItems.length === 0 && (
        <p className="py-12 text-center text-slate-500">No projects match this filter.</p>
      )}

      {/* Desktop + tablet: grid */}
      <div className="hidden gap-8 md:grid md:grid-cols-2 lg:grid-cols-3">
        {gridNodes}
      </div>

      {/* Mobile: horizontal snap carousel */}
      <div className="md:hidden">
        <p className="mb-4 text-center text-sm text-slate-500">Swipe sideways to browse projects</p>
        <div className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4">
          {filteredItems.map((item, i) => (
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
                  <div className="flex flex-wrap gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wide text-turquoise">
                      {active.category}
                    </span>
                    {active.location && (
                      <span className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
                        · {active.location}
                      </span>
                    )}
                    <span className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
                      · {openIndex + 1} / {filteredItems.length}
                    </span>
                  </div>
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
                    <BeforeAfterVisual variant="before" label="Before" imageAlt={active.beforeImageAlt} src={active.beforeImage} />
                    <figcaption className="mt-3 text-sm leading-relaxed text-slate-600">
                      {active.beforeDescription.split("\n\n").map((para, i) => (
                        <p key={i} className={i > 0 ? "mt-2" : ""}>
                          {i === 0 && <span className="font-semibold text-navy">Before — </span>}
                          {para}
                        </p>
                      ))}
                    </figcaption>
                  </figure>
                  <figure className="m-0">
                    <BeforeAfterVisual variant="after" label="After" imageAlt={active.afterImageAlt} src={active.afterImage} />
                    <figcaption className="mt-3 text-sm leading-relaxed text-slate-600">
                      {active.afterDescription.split("\n\n").map((para, i) => (
                        <p key={i} className={i > 0 ? "mt-2" : ""}>
                          {i === 0 && <span className="font-semibold text-navy">After — </span>}
                          {para}
                        </p>
                      ))}
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
                  disabled={openIndex >= filteredItems.length - 1}
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
