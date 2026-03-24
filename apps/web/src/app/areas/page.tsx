import Link from "next/link";
import { SERVICE_AREAS } from "@seashore/content";

export default function AreasPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <h1 className="font-heading text-4xl font-bold text-navy">Service Areas</h1>
      <p className="mt-4 text-slate-600">We serve towns across the Jersey Shore.</p>
      <div className="mt-8 flex flex-wrap gap-2">
        {SERVICE_AREAS.map((town) => {
          const slug = town.toLowerCase().replace(/\s+/g, "-");
          return (
            <Link
              key={town}
              href={`/service-areas/${slug}`}
              className="rounded-full border border-slate-300 px-4 py-2 text-sm transition hover:border-turquoise hover:text-turquoise"
            >
              {town}
            </Link>
          );
        })}
      </div>
    </main>
  );
}
