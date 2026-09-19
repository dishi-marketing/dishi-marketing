import Link from "next/link";
import { CONTACT, whatsappLink } from "@/data/constants";
import { WhatsAppIcon } from "./Icons";

type Props = {
  /** Optional context specific message pre-filled in WhatsApp. */
  message?: string;
  label?: string;
  variant?: "primary" | "outline" | "light";
  size?: "sm" | "md" | "lg";
  className?: string;
  showNumber?: boolean;
};

const sizes = {
  sm: "px-4 py-2.5 text-sm gap-2",
  md: "px-6 py-3.5 text-[0.95rem] gap-2.5",
  lg: "px-8 py-4 text-base gap-3",
};

const variants = {
  primary:
    "bg-[#25D366] text-bark-900 hover:bg-[#1fbe5a] shadow-[0_10px_30px_-12px_rgba(37,211,102,0.9)]",
  outline:
    "border border-bark-700/25 bg-white/70 text-bark-800 hover:border-bark-700/50 hover:bg-white",
  light: "bg-white text-bark-800 hover:bg-sand-100",
};

export default function WhatsAppButton({
  message,
  label = "WhatsApp Us",
  variant = "primary",
  size = "md",
  className = "",
  showNumber = false,
}: Props) {
  return (
    <Link
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 ${sizes[size]} ${variants[variant]} ${className}`}
    >
      <WhatsAppIcon className="h-5 w-5 shrink-0" aria-hidden="true" />
      <span>{label}</span>
      {showNumber && (
        <span className="hidden font-normal opacity-75 sm:inline">
          · {CONTACT.phoneDisplay}
        </span>
      )}
    </Link>
  );
}
