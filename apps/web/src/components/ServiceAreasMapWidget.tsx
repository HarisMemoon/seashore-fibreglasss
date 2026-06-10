"use client";

import dynamic from "next/dynamic";

const ServiceAreasMapInner = dynamic(() => import("./ServiceAreasMapInner"), {
  ssr: false,
  loading: () => (
    <div
      className="flex h-[min(22rem,55vh)] min-h-[280px] w-full items-center justify-center bg-slate-100 text-sm text-slate-500"
      aria-hidden
    >
      Loading map…
    </div>
  ),
});

type ServiceAreasMapWidgetProps = {
  /** Height classes for the map, e.g. "h-[420px]" or "h-[min(22rem,55vh)]" */
  className?: string;
};

export function ServiceAreasMapWidget({ className }: ServiceAreasMapWidgetProps) {
  return (
    <div className="h-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className={`min-h-[280px] w-full ${className ?? "h-[min(22rem,55vh)]"}`}>
        <ServiceAreasMapInner />
      </div>
    </div>
  );
}
