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
  /** e.g. h-[min(22rem,55vh)] or fixed height */
  className?: string;
};

export function ServiceAreasMapWidget({ className }: ServiceAreasMapWidgetProps) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm ${className ?? ""}`}>
      <div className="h-[min(22rem,55vh)] min-h-[280px] w-full">
        <ServiceAreasMapInner />
      </div>
    </div>
  );
}
