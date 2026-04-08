'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about-us', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/service-areas', label: 'Areas' },
  { href: '/faqs', label: 'FAQs' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/blog', label: 'Blog' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-5">
      <nav
        className={`relative mx-auto max-w-7xl overflow-hidden rounded-2xl border backdrop-blur-2xl transition-all duration-300 ${
          scrolled
            ? 'border-[#7fd7e1]/15 bg-[rgba(8,18,30,0.65)] shadow-[0_8px_30px_rgba(0,0,0,0.4),0_0_0_1px_rgba(127,215,225,0.06)] py-0 px-4 md:px-5'
            : 'border-[#7fd7e1]/20 bg-[rgba(8,18,30,0.45)] shadow-[0_10px_40px_rgba(0,0,0,0.3),0_0_0_1px_rgba(127,215,225,0.08)] py-0 px-4 md:px-5'
        }`}
      >
        {/* Futuristic glow line at top */}
        <div className="absolute inset-x-[8%] top-0 h-px bg-gradient-to-r from-transparent via-[#7fd7e1]/70 to-transparent" />

        <div className="flex h-[72px] items-center justify-between gap-4">
          {/* Logo — no box, just a soft glow */}
          <Link
            href="/"
            className="flex-shrink-0 rounded-xl px-2 py-2 [filter:drop-shadow(0_0_18px_rgba(127,215,225,0.55))] transition-all hover:[filter:drop-shadow(0_0_26px_rgba(127,215,225,0.8))]"
          >
          <Image
  src="/logoo.png"
  alt="Seashore Fiberglass logo"
  width={340}
  height={100}
  className="h-20 w-auto object-contain md:h-24"
  priority
/>
          </Link>

          <div className="hidden flex-1 items-center justify-center gap-0.5 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3.5 py-2 text-[13px] font-medium tracking-wide text-white/70 transition-all duration-200 hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-shrink-0 items-center gap-2">
            <Link
              href="/contact"
              className="hidden items-center rounded-xl bg-gradient-to-r from-[#E87C2B] to-[#f0963e] px-4 py-2 text-[12.5px] font-bold tracking-wide text-white shadow-[0_0_18px_rgba(232,124,43,0.3)] transition hover:shadow-[0_0_24px_rgba(232,124,43,0.45)] md:inline-flex"
            >
              Contact Us
            </Link>

            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-xl text-white/85 transition hover:bg-white/10 hover:text-white md:hidden"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((v) => !v)}
            >
              {isMobileMenuOpen ? (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="overflow-hidden border-t border-[#7fd7e1]/15 bg-[rgba(8,18,30,0.70)] backdrop-blur-xl md:hidden">
            <div className="space-y-0.5 p-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block rounded-lg px-4 py-2.5 text-sm font-medium tracking-wide text-white/80 transition hover:bg-white/[0.08] hover:text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="border-t border-[#7fd7e1]/15 p-3">
              <Link
                href="/contact"
                className="flex items-center justify-center rounded-xl bg-gradient-to-r from-[#E87C2B] to-[#f0963e] py-3 text-sm font-bold text-white shadow-[0_0_18px_rgba(232,124,43,0.25)] transition hover:opacity-90"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get Your Free Inspection &amp; Quote
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}