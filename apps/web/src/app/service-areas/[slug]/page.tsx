import Link from "next/link";
import { notFound } from "next/navigation";
import { SERVICE_AREAS } from "@seashore/content";

const toSlug = (town: string) => town.toLowerCase().replace(/\s+/g, "-");

export function generateStaticParams() {
  return SERVICE_AREAS.map((town) => ({ slug: toSlug(town) }));
}

export default function ServiceAreaDetailPage({ params }: { params: { slug: string } }) {
  const town = SERVICE_AREAS.find((item) => toSlug(item) === params.slug);

  if (!town) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <Link href="/areas" className="text-sm font-semibold text-turquoise">
        ← Back to service areas
      </Link>
      <h1 className="font-heading mt-4 text-4xl font-bold text-navy">{town}</h1>
      <p className="mt-4 text-slate-600">
        We provide fiberglass repair and restoration services in {town}. Full localized page
        content will be added in the next phase.
      </p>
    </main>
  );
}
