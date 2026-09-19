import Link from "next/link";
import { LogoMark } from "@/components/Logo";
import WhatsAppButton from "@/components/WhatsAppButton";
import { ArrowRight } from "@/components/Icons";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <LogoMark className="h-16 w-16 opacity-80" />
      <p className="mt-8 font-display text-[3.5rem] leading-none text-timber-300">404</p>
      <h1 className="mt-4 text-[1.8rem] text-bark-800 sm:text-[2.2rem]">
        This page is out of stock
      </h1>
      <p className="mt-4 max-w-md text-[1rem] leading-relaxed text-muted">
        The page you were looking for does not exist. The products, however, very
        much do.
      </p>
      <div className="mt-9 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2.5 rounded-full bg-bark-800 px-8 py-4 text-base font-medium text-sand-50 transition-all duration-300 hover:-translate-y-0.5 hover:bg-bark-700"
        >
          Back to home
          <ArrowRight className="h-4.5 w-4.5" />
        </Link>
        <WhatsAppButton size="lg" variant="outline" />
      </div>
    </section>
  );
}
