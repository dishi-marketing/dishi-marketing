import Link from "next/link";
import { COMPANY } from "@/data/constants";

type LogoMarkProps = {
  className?: string;
  /** Renders the mark in a single tone — used on dark backgrounds. */
  mono?: boolean;
};

/**
 * A log cross-section: rugged bark ring on the outside, growth rings inside,
 * with an off-centre pith. Drawn entirely as vectors so it stays crisp at any
 * size, from a 16px favicon to a full-width hero.
 */
export function LogoMark({ className = "h-10 w-10", mono = false }: LogoMarkProps) {
  const bark = mono ? "currentColor" : "#453427";
  const barkInner = mono ? "currentColor" : "#6b5342";
  const wood = mono ? "none" : "#f3e4d3";
  const ring = mono ? "currentColor" : "#d4a679";
  const ringSoft = mono ? "currentColor" : "#e6c7a8";
  const core = mono ? "currentColor" : "#a9703c";

  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label={`${COMPANY.name} logo`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Bark — an irregular outer edge rather than a perfect circle */}
      <path
        d="M32 1.6c4.1 0 6.6 2.4 10.4 3.4 3.8 1 7.3-.4 10 2.3 2.7 2.7 1.4 6.3 2.4 10.1 1 3.8 3.5 6.3 3.5 10.4 0 4.1-2.5 6.6-3.5 10.4-1 3.8.3 7.4-2.4 10.1-2.7 2.7-6.2 1.3-10 2.3-3.8 1-6.3 3.4-10.4 3.4-4.1 0-6.6-2.4-10.4-3.4-3.8-1-7.3.4-10-2.3-2.7-2.7-1.4-6.3-2.4-10.1C8.2 34.4 5.7 31.9 5.7 27.8c0-4.1 2.5-6.6 3.5-10.4 1-3.8-.3-7.4 2.4-10.1 2.7-2.7 6.2-1.3 10-2.3C25.4 4 27.9 1.6 32 1.6Z"
        fill={bark}
        transform="translate(0 4.2)"
      />
      <circle cx="32" cy="32" r="25.4" fill={barkInner} opacity={mono ? 0.55 : 1} />
      <circle cx="32" cy="32" r="23.6" fill={wood} />

      {/* Growth rings — offset slightly so they read as natural, not concentric */}
      <g stroke={ring} strokeWidth="1.5" fill="none" opacity="0.9">
        <ellipse cx="32.6" cy="31.4" rx="19.4" ry="19.8" />
        <ellipse cx="33.2" cy="30.6" rx="14.6" ry="15.4" />
        <ellipse cx="33.8" cy="29.8" rx="9.8" ry="10.8" />
      </g>
      <g stroke={ringSoft} strokeWidth="1.1" fill="none">
        <ellipse cx="32.3" cy="31.8" rx="21.6" ry="21.8" />
        <ellipse cx="32.9" cy="31" rx="17" ry="17.6" />
        <ellipse cx="33.5" cy="30.2" rx="12.2" ry="13.1" />
        <ellipse cx="34.1" cy="29.4" rx="6.6" ry="7.6" />
      </g>

      {/* Pith */}
      <ellipse cx="34.4" cy="29" rx="2.6" ry="3.1" fill={core} />

      {/* A radial season crack, the way a real log splits */}
      <path
        d="M34.4 29 40.6 16.8M34.4 29l9.4 8.4"
        stroke={core}
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}

type LogoProps = {
  /** Inverted wordmark for dark backgrounds. */
  inverted?: boolean;
  className?: string;
  /** Wraps the logo in a link to the homepage. */
  asLink?: boolean;
};

export default function Logo({
  inverted = false,
  className = "",
  asLink = true,
}: LogoProps) {
  const content = (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-10 w-10 shrink-0 sm:h-11 sm:w-11" />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[1.32rem] font-semibold tracking-tight sm:text-[1.45rem] ${
            inverted ? "text-sand-50" : "text-bark-800"
          }`}
        >
          Dishi
        </span>
        <span
          className={`mt-1 text-[0.58rem] font-medium uppercase tracking-[0.34em] ${
            inverted ? "text-timber-200" : "text-timber-600"
          }`}
        >
          Marketing
        </span>
      </span>
    </span>
  );

  if (!asLink) return content;

  return (
    <Link href="/" aria-label={`${COMPANY.name} — home`} className="inline-flex">
      {content}
    </Link>
  );
}
