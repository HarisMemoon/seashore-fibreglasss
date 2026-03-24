import { SITE_NAME } from "@seashore/content";

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <h1 className="font-heading text-4xl font-bold text-navy">About {SITE_NAME}</h1>
      <p className="mt-4 max-w-3xl text-slate-600">
        We are a family-owned fiberglass repair company serving the Jersey Shore with
        reliable craftsmanship and coastal-grade materials.
      </p>
    </main>
  );
}
