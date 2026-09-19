import Link from "next/link";

type Crumb = { label: string; href?: string };

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs?: Crumb[];
};

export default function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs = [],
}: Props) {
  return (
    <section className="grain-overlay relative overflow-hidden border-b border-line bg-sand-50">
      {/* soft wood wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-32 h-80 w-80 rounded-full bg-timber-200/30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-20 h-72 w-72 rounded-full bg-sand-300/30 blur-3xl"
      />

      <div className="container-page relative z-10 py-14 sm:py-16 lg:py-20">
        {breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-[0.8rem] text-muted">
              {breadcrumbs.map((crumb, i) => (
                <li key={crumb.label} className="flex items-center gap-2">
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="transition-colors hover:text-timber-700"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-bark-600">{crumb.label}</span>
                  )}
                  {i < breadcrumbs.length - 1 && (
                    <span className="text-timber-300">/</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {eyebrow && (
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-timber-200 bg-white/70 px-3.5 py-1.5 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-timber-700">
            <span className="h-1.5 w-1.5 rounded-full bg-timber-500" />
            {eyebrow}
          </span>
        )}

        <h1 className="max-w-4xl text-[2.1rem] leading-[1.1] text-bark-800 sm:text-5xl lg:text-[3.4rem]">
          {title}
        </h1>

        {description && (
          <p className="mt-5 max-w-2xl text-[1.05rem] leading-relaxed text-muted">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
