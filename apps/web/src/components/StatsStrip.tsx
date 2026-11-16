import type { ReactNode } from "react";

export type StatItem = {
  value: ReactNode;
  label: string;
};

type StatsStripProps = {
  items: StatItem[];
  /** "dark" = glass boxes on navy heroes (default). "light" = boxes on white sections. */
  variant?: "dark" | "light";
  className?: string;
};

/**
 * Shared stats strip — the row of stat boxes shown under page titles
 * (About, Services, Service Areas, …).
 *
 * Why this exists: every page used to hand-roll its own boxes with
 * `flex flex-wrap`, so each box sized itself to its own text — on mobile
 * the boxes came out all different widths/heights and the row looked
 * broken. This component uses an equal-column grid instead:
 *   mobile  → 2 equal columns (3 items → 3, 2 items → 2)
 *   sm+     → one row, every box the same width and height
 * Long labels wrap inside their own box; the box never grows wider
 * than its siblings.
 */
export function StatsStrip({
  items,
  variant = "dark",
  className = "",
}: StatsStripProps) {
  const colsMobile =
    items.length <= 2
      ? "grid-cols-2"
      : items.length === 3
        ? "grid-cols-3"
        : "grid-cols-2";
  const colsUp =
    items.length <= 2
      ? "sm:grid-cols-2"
      : items.length === 3
        ? "sm:grid-cols-3"
        : "sm:grid-cols-4";

  const boxClasses =
    variant === "dark"
      ? "border-white/10 bg-white/[0.06] backdrop-blur-md"
      : "border-slate-200 bg-slate-50 shadow-sm";
  const valueColor = variant === "dark" ? "text-white" : "text-navy";
  const labelColor = variant === "dark" ? "text-white/55" : "text-slate-500";

  return (
    <div
      className={`grid w-full gap-3 sm:gap-4 ${colsMobile} ${colsUp} ${className}`}
    >
      {items.map((item) => (
        <div
          key={item.label}
          className={`flex min-w-0 flex-col items-center justify-center rounded-2xl border px-3 py-4 text-center sm:px-5 ${boxClasses}`}
        >
          <p
            className={`font-heading whitespace-nowrap text-xl font-extrabold leading-none sm:text-2xl ${valueColor}`}
          >
            {item.value}
          </p>
          <p
            className={`mt-1.5 text-[10px] font-semibold uppercase leading-tight tracking-[0.14em] sm:text-[11px] sm:tracking-[0.16em] ${labelColor}`}
          >
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}
