import { STATS } from "@/data/constants";
import Reveal from "./Reveal";

export default function StatsStrip({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4 ${
        compact ? "" : "shadow-soft"
      }`}
    >
      {STATS.map((stat, i) => (
        <Reveal
          key={stat.label}
          delay={i * 90}
          className="bg-white px-5 py-8 text-center sm:px-6 lg:py-10"
        >
          <p className="font-display text-[2.1rem] leading-none text-timber-600 sm:text-[2.6rem]">
            {stat.value}
          </p>
          <p className="mt-3 text-[0.82rem] font-medium uppercase tracking-[0.14em] text-bark-700">
            {stat.label}
          </p>
          <p className="mt-1.5 text-[0.82rem] text-muted">{stat.detail}</p>
        </Reveal>
      ))}
    </div>
  );
}
