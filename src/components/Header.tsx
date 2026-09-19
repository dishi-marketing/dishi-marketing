"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CONTACT, NAV_LINKS } from "@/data/constants";
import Logo from "./Logo";
import WhatsAppButton from "./WhatsAppButton";
import { CloseIcon, MenuIcon, PhoneIcon } from "./Icons";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* Utility strip */}
      <div className="hidden bg-bark-800 text-sand-200 md:block">
        <div className="container-page flex h-9 items-center justify-between text-[0.78rem]">
          <p className="tracking-wide">
            Plywood · MDF · Laminates · Veneers · Timber — serving since 2008
          </p>
          <div className="flex items-center gap-5">
            <a
              href={`tel:${CONTACT.phoneHref}`}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-timber-200"
            >
              <PhoneIcon className="h-3.5 w-3.5" aria-hidden="true" />
              {CONTACT.phoneDisplay}
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="transition-colors hover:text-timber-200"
            >
              {CONTACT.email}
            </a>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? "border-line bg-cream/90 shadow-soft backdrop-blur-lg"
            : "border-transparent bg-cream/70 backdrop-blur-sm"
        }`}
      >
        <div className="container-page flex h-[4.5rem] items-center justify-between gap-4 lg:h-20">
          <Logo />

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-full px-4 py-2 text-[0.92rem] font-medium transition-colors ${
                  isActive(link.href)
                    ? "text-timber-700"
                    : "text-bark-600 hover:text-timber-700"
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute inset-x-4 -bottom-0.5 h-px bg-timber-500" />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Wrapped rather than given a `hidden` className: the button sets
                `inline-flex` in its own base classes, and that utility is
                emitted after `hidden` in the stylesheet, so it would win. */}
            <span className="hidden md:inline-flex">
              <WhatsAppButton size="sm" className="whitespace-nowrap" />
            </span>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white/70 text-bark-700 transition-colors hover:border-timber-300 lg:hidden"
            >
              {open ? (
                <CloseIcon className="h-5 w-5" />
              ) : (
                <MenuIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden ${open ? "" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-bark-900/40 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <nav
          aria-label="Mobile"
          className={`absolute inset-x-0 top-0 mt-[4.5rem] max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-b border-line bg-cream px-5 pb-8 pt-4 shadow-lift transition-all duration-300 ${
            open ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
          }`}
        >
          <ul className="divide-y divide-line">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between py-4 text-lg ${
                    isActive(link.href) ? "text-timber-700" : "text-bark-700"
                  }`}
                >
                  {link.label}
                  <span className="text-timber-400">→</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col gap-3">
            <WhatsAppButton size="md" className="w-full" showNumber />
            <a
              href={`tel:${CONTACT.phoneHref}`}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-line bg-white px-6 py-3.5 text-[0.95rem] font-medium text-bark-700"
            >
              <PhoneIcon className="h-4.5 w-4.5" aria-hidden="true" />
              {CONTACT.phoneDisplay}
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
