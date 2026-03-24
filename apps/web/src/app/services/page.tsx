import Link from "next/link";
import { SERVICES } from "@seashore/content";

export default function ServicesPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <h1 className="font-heading text-4xl font-bold text-navy">Services</h1>
      <p className="mt-4 text-slate-600">Explore our fiberglass and restoration services.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {SERVICES.map((service) => (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            className="rounded-xl border border-slate-200 p-5 transition hover:border-turquoise"
          >
            <h2 className="font-heading text-xl font-semibold text-navy">{service.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{service.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
