import Link from "next/link";
import { notFound } from "next/navigation";
import { SERVICES } from "@seashore/content";

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = SERVICES.find((item) => item.slug === params.slug);

  if (!service) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <Link href="/services" className="text-sm font-semibold text-turquoise">
        ← Back to services
      </Link>
      <h1 className="font-heading mt-4 text-4xl font-bold text-navy">{service.title}</h1>
      <p className="mt-4 text-slate-600">{service.description}</p>
      <p className="mt-8 text-sm text-slate-500">
        Full service detail content is coming in the next phase.
      </p>
    </main>
  );
}
