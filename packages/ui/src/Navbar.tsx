'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function Navbar() {
  const [offsetY, setOffsetY] = useState(16);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const next = Math.min(64, 16 + window.scrollY * 0.07);
      setOffsetY(next);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about-us', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/service-areas', label: 'Areas' },
    { href: '/faqs', label: 'FAQs' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header
      style={{ transform: `translateY(${offsetY}px)`, transition: 'transform 220ms ease-out' }}
      className="fixed inset-x-0 top-0 z-50 px-4 md:px-6"
    >
      <nav
        className="pointer-events-auto mx-auto max-w-7xl rounded-2xl border border-white/25 bg-gradient-to-r from-[#0D7989]/60 via-[#2A7DA6]/55 to-[#0D7989]/60 px-4 py-3 shadow-[0_14px_45px_rgba(13,121,137,0.34)] backdrop-blur-2xl"
      >
        <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logoo.png"
            alt="Seashore Fiberglass logo"
            width={250}
            height={70}
            className="h-11 w-auto object-contain md:h-14"
            priority
          />
        </Link>

          <div className="hidden flex-1 items-center justify-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-white/90 transition-all duration-300 hover:bg-white/15 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            type="button"
            className="rounded-lg p-2 text-white transition hover:bg-white/15 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            {isMobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="mt-3 space-y-1 rounded-xl border border-white/20 bg-[#0D7989]/80 p-2 backdrop-blur-xl md:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-lg px-3 py-2 text-sm font-medium text-white/90 transition hover:bg-white/15 hover:text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
