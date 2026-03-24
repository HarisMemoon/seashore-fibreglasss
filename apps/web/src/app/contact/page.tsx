import { EMAIL, PHONE } from "@seashore/content";

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="font-heading text-4xl font-bold text-navy">Contact</h1>
      <p className="mt-4 text-slate-600">Reach out for estimates, scheduling, or questions.</p>
      <div className="mt-6 space-y-2 text-slate-700">
        <p>
          Phone:{" "}
          <a className="text-turquoise hover:underline" href={`tel:${PHONE.replace(/\D/g, "")}`}>
            {PHONE}
          </a>
        </p>
        <p>
          Email:{" "}
          <a className="text-turquoise hover:underline" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
        </p>
      </div>
    </main>
  );
}
