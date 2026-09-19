import Image from "next/image";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import Reveal from "@/components/Reveal";
import { CheckIcon, SERVICE_ICONS } from "@/components/Icons";
import {
  CUSTOMER_TYPES,
  PROCESS_STEPS,
  SERVICES,
  WHY_CHOOSE_US,
} from "@/data/constants";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Bulk and project supply, dealer supply, material consultation, sourcing on request, quality checked stock and prompt dispatch from Dishi Marketing.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What we do"
        title="Supply is the easy part"
        description="Anyone can sell a sheet of plywood. What keeps a project moving is the advice before the order, the consistency across repeat orders, and material that arrives when it was promised."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />

      {/* Services grid */}
      <section className="container-page py-16 sm:py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => {
            const Icon = SERVICE_ICONS[service.icon];
            return (
              <Reveal
                key={service.title}
                delay={(i % 3) * 100}
                className="group h-full rounded-2xl border border-line bg-white p-7 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-timber-200 hover:shadow-lift"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-timber-50 text-timber-600 transition-colors group-hover:bg-timber-100">
                  <Icon className="h-6 w-6" />
                </span>
                <h2 className="mt-5 text-[1.15rem] text-bark-800">{service.title}</h2>
                <p className="mt-2.5 text-[0.93rem] leading-relaxed text-muted">
                  {service.description}
                </p>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Process */}
      <section className="border-y border-line bg-sand-50 py-16 sm:py-20 lg:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="How ordering works"
            title="From enquiry to delivery in four steps"
            description="There is no enquiry form on this website on purpose. A message on WhatsApp gets you a real answer faster than any form ever will."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((step, i) => (
              <Reveal
                key={step.step}
                delay={i * 100}
                className="relative rounded-2xl border border-line bg-white p-7 shadow-soft"
              >
                <span className="font-display text-[2.4rem] leading-none text-timber-200">
                  {step.step}
                </span>
                <h3 className="mt-3 text-[1.08rem] text-bark-800">{step.title}</h3>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-muted">
                  {step.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="container-page py-16 sm:py-20 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Why customers stay"
              title="Seventeen years of getting it right the first time"
              description="A bad sheet costs a carpenter a day of work and a customer's confidence. That is why we check stock before it leaves us, not after it comes back."
            />

            <div className="mt-8 space-y-5">
              {WHY_CHOOSE_US.map((item, i) => (
                <Reveal key={item.title} delay={i * 80} className="flex gap-4">
                  <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-timber-100 text-timber-600">
                    <CheckIcon className="h-3.5 w-3.5" />
                  </span>
                  <div>
                    <h3 className="text-[1.02rem] text-bark-800">{item.title}</h3>
                    <p className="mt-1 text-[0.93rem] leading-relaxed text-muted">
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-line shadow-lift">
              <Image
                src="/images/gallery/warehouse.svg"
                alt="Panel storage racks holding stock across the full range"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Served */}
      <section className="border-t border-line bg-sand-50 py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading eyebrow="Who we supply" title="Built for the trade" />
          <Reveal className="mt-10 flex flex-wrap justify-center gap-3">
            {CUSTOMER_TYPES.map((type) => (
              <span
                key={type}
                className="rounded-full border border-line bg-white px-5 py-2.5 text-[0.9rem] text-bark-700 shadow-soft"
              >
                {type}
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      <CTASection
        title="Have a project coming up?"
        description="Share the scope and timeline on WhatsApp. We will plan the material with you so nothing holds up the site."
        message="Hello Dishi Marketing, I have a project coming up and would like to discuss material supply."
      />
    </>
  );
}
