import { ADDRESS, EMAIL, PHONE, SERVICE_AREAS, SITE_NAME, TRUST_BADGES } from "@seashore/content";

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="font-heading mb-4 text-lg font-bold">{SITE_NAME}</h3>
            <p className="text-sm opacity-90">
              {ADDRESS.street}, {ADDRESS.city}, {ADDRESS.state} {ADDRESS.zip}
            </p>
            <a
              href={`tel:${PHONE.replace(/\D/g, "")}`}
              className="mt-2 block text-turquoise hover:underline"
            >
              {PHONE}
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="mt-1 block text-turquoise hover:underline"
            >
              {EMAIL}
            </a>
          </div>
          <div>
            <h4 className="font-heading mb-4 font-semibold">Service Areas</h4>
            <ul className="space-y-1 text-sm opacity-90">
              {SERVICE_AREAS.slice(0, 4).map((town) => (
                <li key={town}>{town}</li>
              ))}
              <li>+{SERVICE_AREAS.length - 4} more towns</li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading mb-4 font-semibold">Trusted Service</h4>
            <p className="text-sm opacity-90">
              {TRUST_BADGES.join(" · ")}
            </p>
          </div>
        </div>
        <div className="mt-8 border-t border-white/20 pt-8 text-center text-sm opacity-75">
          © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
