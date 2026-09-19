import { FAQS } from "@/data/constants";
import Reveal from "./Reveal";

export default function FaqAccordion({
  items = FAQS,
}: {
  items?: readonly { question: string; answer: string }[];
}) {
  return (
    <div className="mx-auto max-w-3xl space-y-3">
      {items.map((faq, i) => (
        <Reveal key={faq.question} delay={i * 60}>
          <details className="group rounded-xl border border-line bg-white px-5 py-4 shadow-soft transition-colors open:border-timber-200 sm:px-6">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[1rem] font-medium text-bark-800 marker:hidden [&::-webkit-details-marker]:hidden">
              {faq.question}
              <span
                aria-hidden="true"
                className="relative h-5 w-5 shrink-0 text-timber-500"
              >
                <span className="absolute left-0 top-1/2 h-px w-5 -translate-y-1/2 bg-current" />
                <span className="absolute left-1/2 top-0 h-5 w-px -translate-x-1/2 bg-current transition-transform duration-300 group-open:rotate-90 group-open:opacity-0" />
              </span>
            </summary>
            <p className="mt-3.5 text-[0.94rem] leading-relaxed text-muted">
              {faq.answer}
            </p>
          </details>
        </Reveal>
      ))}
    </div>
  );
}
