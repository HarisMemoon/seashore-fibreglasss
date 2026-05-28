import { ADDRESS, EMAIL, PHONE, SERVICE_AREA_DETAILS, SITE_NAME, TRUST_BADGES } from "@seashore/content";

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            {/* Logo — same file as navbar */}
            <a href="/" aria-label={SITE_NAME} className="mb-4 inline-block">
              <img
                src="/logoo.png"
                alt={`${SITE_NAME} logo`}
                width={200}
                height={60}
                className="h-12 w-auto object-contain"
              />
            </a>
            <h3 className="font-heading mb-2 text-lg font-bold">{SITE_NAME}</h3>
            <p className="text-sm opacity-90">
              {ADDRESS.street}, {ADDRESS.city}, {ADDRESS.state} {ADDRESS.zip}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
              <a
                href={`tel:${PHONE.replace(/\D/g, "")}`}
                className="inline-flex items-center gap-1 text-turquoise hover:underline text-sm"
                aria-label={`Call ${PHONE}`}
              >
                <svg className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call {PHONE}
              </a>
              <span className="text-white/30 text-xs">·</span>
              <a
                href={`sms:+1${PHONE.replace(/\D/g, "")}`}
                className="inline-flex items-center gap-1 text-turquoise hover:underline text-sm"
                aria-label={`Text ${PHONE}`}
              >
                <svg className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                Text us
              </a>
            </div>
            <a
              href={`mailto:${EMAIL}`}
              className="mt-1 block text-turquoise hover:underline text-sm"
            >
              {EMAIL}
            </a>
          </div>
          <div>
            <h4 className="font-heading mb-4 font-semibold">Service Areas</h4>
            <ul className="space-y-1.5 text-sm">
              {SERVICE_AREA_DETAILS.slice(0, 6).map((area) => (
                <li key={area.slug}>
                  <a
                    href={`/service-areas/${area.slug}`}
                    className="opacity-80 transition hover:opacity-100 hover:text-turquoise"
                  >
                    {area.townName}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/service-areas"
                  className="mt-1 inline-flex items-center gap-1 text-turquoise text-xs font-semibold hover:underline"
                >
                  + {SERVICE_AREA_DETAILS.length - 6} more towns
                  <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                  </svg>
                </a>
              </li>
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
