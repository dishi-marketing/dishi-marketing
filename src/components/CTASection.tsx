import { CONTACT } from "@/data/constants";
import WhatsAppButton from "./WhatsAppButton";
import Reveal from "./Reveal";
import { PhoneIcon } from "./Icons";

type Props = {
  title?: string;
  description?: string;
  message?: string;
};

export default function CTASection({
  title = "Tell us what your project needs",
  description = "Send your requirement on WhatsApp — product, thickness and quantity — and we will come back with availability and rates. No forms, no waiting on email.",
  message,
}: Props) {
  return (
    <section className="relative overflow-hidden bg-bark-800 py-16 sm:py-20 lg:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage: "url(/images/cta-texture.svg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-timber-500/20 blur-3xl"
      />

      <div className="container-page relative z-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-[1.9rem] leading-tight text-sand-50 sm:text-4xl lg:text-[2.75rem]">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[1.02rem] leading-relaxed text-sand-200/75">
            {description}
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <WhatsAppButton size="lg" message={message} showNumber />
            <a
              href={`tel:${CONTACT.phoneHref}`}
              className="inline-flex items-center justify-center gap-2.5 rounded-full border border-sand-200/25 px-8 py-4 text-base font-medium text-sand-100 transition-all duration-300 hover:-translate-y-0.5 hover:border-timber-300 hover:text-timber-200"
            >
              <PhoneIcon className="h-5 w-5" aria-hidden="true" />
              {CONTACT.phoneDisplay}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
