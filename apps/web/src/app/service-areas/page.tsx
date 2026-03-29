import type { Metadata } from "next";
import Link from "next/link";
import { SERVICE_AREA_DETAILS, SERVICE_AREAS_INDEX_META } from "@seashore/content";
import BreadcrumbJsonLd from "../BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: SERVICE_AREAS_INDEX_META.title,
  description: SERVICE_AREAS_INDEX_META.description,
};

export default function ServiceAreasIndexPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Service areas", path: "/service-areas" },
        ]}
      />
      <h1 className="font-heading text-4xl font-bold text-navy">Service Areas</h1>
      <p className="mt-4 text-slate-600">We serve towns across the Jersey Shore.</p>
      <div className="mt-8 flex flex-wrap gap-2">
        {SERVICE_AREA_DETAILS.map((area) => (
          <Link
            key={area.slug}
            href={`/service-areas/${area.slug}`}
            className="rounded-full border border-slate-300 px-4 py-2 text-sm transition hover:border-turquoise hover:text-turquoise"
          >
            {area.townName}
          </Link>
        ))}
      </div>
    </main>
  );
}
