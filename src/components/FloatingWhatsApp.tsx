"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CONTACT, whatsappLink } from "@/data/constants";
import { WhatsAppIcon } from "./Icons";

/** A persistent WhatsApp affordance that fades in once the visitor scrolls. */
export default function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 380);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Link
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat with us on WhatsApp at ${CONTACT.phoneDisplay}`}
      className={`fixed bottom-5 right-5 z-40 flex items-center gap-2.5 rounded-full bg-[#25D366] px-4 py-3.5 text-bark-900 shadow-[0_14px_38px_-12px_rgba(37,211,102,0.95)] transition-all duration-500 sm:bottom-7 sm:right-7 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-6 opacity-0"
      } hover:scale-105`}
    >
      <WhatsAppIcon className="h-6 w-6" aria-hidden="true" />
      <span className="hidden text-sm font-medium sm:inline">WhatsApp Us</span>
    </Link>
  );
}
