import Link from "next/link";
import { HERO_PRIMARY_CTA, PHONE } from "@seashore/content";

type CtaBannerProps = {
  heading?: string;
  subtext?: string;
  primaryLabel?: string;
  primaryHref?: string;
  showTextButton?: boolean;
};

/**
 * Shared bottom-of-page CTA banner ("Ready for an honest deck assessment?").
 *
 * Why this exists: the old hand-rolled version (About page) put three
 * fixed-width, non-wrapping buttons in a single row next to the text.
 * Around tablet width (~768–1100px) the row was wider than the space
 * left for it, so the rightmost button ran past the section edge and
 * its text got clipped by the page's overflow-hidden.
 *
 * This component is built so that cannot happen at any width:
 *   - below lg, the text and the buttons stack vertically;
 *   - buttons are full-width on phones, auto-width from sm up, and the
 *     button row is allowed to WRAP — a button moves to the next line
 *     whole instead of being cut;
 *   - button labels never wrap mid-text (whitespace-nowrap) and never
 *     shrink (shrink-0 on the row items via flex-wrap layout);
 *   - side-by-side layout only starts at lg, where there is provably
 *     room for text + all three buttons.
 *
 * Drop it at the bottom of any page: <CtaBanner />
 * Override heading/subtext/labels via props when a page needs its own copy.
 */
export function CtaBanner({
  heading = "Ready for an honest deck assessment?",
  subtext = "Free inspections, clear technical answers, and no pressure — the way we have built our reputation since 2020.",
  primaryLabel = HERO_PRIMARY_CTA,
  primaryHref = "/contact",
  showTextButton = true,
}: CtaBannerProps) {
  const phoneDigits = PHONE.replace(/\D/g, "");

  const ghostButton =
    "inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-white/15 bg-white/5 px-6 py-4 font-semibold text-white backdrop-blur-md transition hover:border-white/30 hover:bg-white/10 sm:w-auto";

  return (
    <section className="relative overflow-hidden bg-navy px-6 py-16 md:py-20">
      {/* Ambient glows (kept inside the section, cannot affect layout) */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-turquoise/10 blur-[80px]" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-orange/10 blur-[70px]" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0 max-w-2xl">
          <h2 className="font-heading text-2xl font-bold text-white md:text-3xl">
            {heading}
          </h2>
          <p className="mt-3 max-w-xl text-white/65">{subtext}</p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center lg:w-auto lg:shrink-0">
          <Link
            href={primaryHref}
            className="inline-flex w-full items-center justify-center whitespace-nowrap rounded-xl bg-gradient-to-r from-orange to-orange-light px-6 py-4 font-bold text-white shadow-lg shadow-orange/25 transition hover:shadow-glow-orange sm:w-auto xl:px-8"
          >
            {primaryLabel}
          </Link>

          <a href={`tel:${phoneDigits}`} className={ghostButton}>
            <svg
              className="h-4 w-4 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            Call {PHONE}
          </a>

          {showTextButton && (
            <a href={`sms:+1${phoneDigits}`} className={ghostButton}>
              <svg
                className="h-4 w-4 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
              Text us
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
