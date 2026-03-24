'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function Navbar() {
  const [offsetY, setOffsetY] = useState(16);
  const [isPastHero, setIsPastHero] = useState(false);
  const [isManuallyExpanded, setIsManuallyExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const next = Math.min(64, 16 + window.scrollY * 0.07);
      setOffsetY(next);
      const pastHero = window.scrollY > 620;
      setIsPastHero(pastHero);
      if (!pastHero) {
        setIsManuallyExpanded(false);
      }
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (isPastHero && !isManuallyExpanded) {
      setIsMobileMenuOpen(false);
    }
  }, [isPastHero, isManuallyExpanded]);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/areas', label: 'Areas' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  const isCollapsed = isPastHero && !isManuallyExpanded;

  return (
    <header
      style={{ transform: `translateY(${offsetY}px)`, transition: 'transform 220ms ease-out' }}
      className={`fixed top-0 z-50 ${
        isCollapsed ? 'left-4 md:left-6' : 'inset-x-0 px-4 md:px-6'
      }`}
    >
      <nav
        className={`pointer-events-auto rounded-2xl border border-white/25 bg-gradient-to-r from-[#0D7989]/60 via-[#2A7DA6]/55 to-[#0D7989]/60 px-4 py-3 shadow-[0_14px_45px_rgba(13,121,137,0.34)] backdrop-blur-2xl ${
          isCollapsed ? 'inline-flex w-auto' : 'mx-auto max-w-7xl'
        }`}
      >
        <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Seashore Fiberglass logo"
            width={180}
            height={48}
            className="h-9 w-auto object-contain md:h-10"
            priority
          />
        </Link>

        {!isCollapsed && (
          <>
            <div className="hidden items-center gap-1 md:flex">
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
          </>
        )}

        {isCollapsed && (
          <button
            type="button"
            className="rounded-full border border-white/25 bg-white/10 p-2 text-white transition hover:bg-white/20"
            onClick={() => setIsManuallyExpanded(true)}
            aria-label="Expand navigation"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        {isPastHero && !isCollapsed && (
          <button
            type="button"
            className="ml-2 hidden rounded-full border border-white/20 bg-white/10 p-2 text-white transition hover:bg-white/20 md:inline-flex"
            onClick={() => {
              setIsManuallyExpanded(false);
              setIsMobileMenuOpen(false);
            }}
            aria-label="Collapse navigation"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        </div>

        {!isCollapsed && isMobileMenuOpen && (
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
