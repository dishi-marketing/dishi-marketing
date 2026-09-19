import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import ProductCard from "@/components/ProductCard";
import StatsStrip from "@/components/StatsStrip";
import CTASection from "@/components/CTASection";
import FaqAccordion from "@/components/FaqAccordion";
import WhatsAppButton from "@/components/WhatsAppButton";
import Reveal from "@/components/Reveal";
import { ArrowRight, CheckIcon, SERVICE_ICONS } from "@/components/Icons";
import {
  COMPANY,
  CUSTOMER_TYPES,
  PROCESS_STEPS,
  PRODUCTS,
  SERVICES,
  WHY_CHOOSE_US,
} from "@/data/constants";

export const metadata: Metadata = {
  title: "Plywood, MDF, Laminates & Veneers Since 2008",
  description:
    "Dishi Marketing supplies calibrated plywood, MDF, laminates, natural veneers, timber and pre-laminated particle board to carpenters, contractors and designers. Over 1000 customers served since 2008.",
};

export default function HomePage() {
  return (
    <>
      {/* ------------------------------ HERO ------------------------------ */}
      <section className="grain-overlay relative overflow-hidden border-b border-line bg-sand-50">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-40 h-[30rem] w-[30rem] rounded-full bg-timber-200/25 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-48 -left-32 h-96 w-96 rounded-full bg-sand-300/25 blur-3xl"
        />

        <div className="container-page relative z-10 py-16 sm:py-20 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_1fr] lg:gap-16">
            <div className="animate-fade-up">
              <span className="inline-flex items-center gap-2 rounded-full border border-timber-200 bg-white/70 px-3.5 py-1.5 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-timber-700">
                <span className="h-1.5 w-1.5 rounded-full bg-timber-500" />
                Serving the trade since {COMPANY.foundedYear}
              </span>

              <h1 className="mt-6 text-[2.3rem] leading-[1.08] text-bark-800 sm:text-5xl lg:text-[3.6rem]">
                Good interiors start with{" "}
                <span className="relative whitespace-nowrap text-timber-600">
                  good material
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 300 12"
                    className="absolute -bottom-1.5 left-0 h-2.5 w-full text-timber-300"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M2 8c60-5 120-6 180-4s90 4 116 2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>

              <p className="mt-7 max-w-xl text-[1.05rem] leading-relaxed text-muted sm:text-[1.12rem]">
                {COMPANY.shortPitch} Seventeen years, more than a thousand
                customers, and one supplier for the whole job.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <WhatsAppButton
                  size="lg"
                  label="Enquire on WhatsApp"
                  message="Hello Dishi Marketing, I would like to enquire about your products."
                />
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full border border-bark-700/20 bg-white/60 px-8 py-4 text-base font-medium text-bark-800 transition-all duration-300 hover:-translate-y-0.5 hover:border-timber-300 hover:bg-white"
                >
                  Browse products
                  <ArrowRight className="h-4.5 w-4.5" />
                </Link>
              </div>

              <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-[0.88rem] text-bark-600">
                {[
                  "6 product categories",
                  "Retail & bulk supply",
                  "Quality checked stock",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckIcon className="h-4 w-4 text-timber-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Hero collage */}
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-line bg-sand-100 shadow-lift sm:aspect-[5/5]">
                <Image
                  src="/images/products/veneers.svg"
                  alt="Book-matched natural veneer showing real timber grain"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
              </div>

              <div className="absolute -bottom-6 -left-4 hidden w-44 overflow-hidden rounded-2xl border border-line bg-white shadow-lift sm:block lg:-left-10 lg:w-52">
                <div className="relative aspect-[4/3]">
                  <Image
                    src="/images/products/laminates.svg"
                    alt="Decorative laminate swatches"
                    fill
                    sizes="14rem"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="absolute -right-3 -top-6 hidden rounded-2xl border border-line bg-white px-5 py-4 shadow-lift sm:block lg:-right-8">
                <p className="font-display text-[1.8rem] leading-none text-timber-600">
                  {COMPANY.customersServed}
                </p>
                <p className="mt-1.5 text-[0.72rem] uppercase tracking-[0.16em] text-muted">
                  Customers served
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------ STATS ----------------------------- */}
      <section className="container-page -mt-px py-14 sm:py-16">
        <StatsStrip />
      </section>

      {/* ---------------------------- PRODUCTS ---------------------------- */}
      <section className="container-page py-6 sm:py-10 lg:py-14">
        <SectionHeading
          eyebrow="What we supply"
          title="A complete range, from substrate to surface"
          description="Six categories that cover an interior end to end — the board underneath, the finish on top, and the timber that holds it all together."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product, i) => (
            <Reveal key={product.slug} delay={(i % 3) * 100} className="h-full">
              <ProductCard product={product} priority={i < 3} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 flex justify-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2.5 rounded-full border border-bark-700/20 bg-white px-7 py-3.5 text-[0.95rem] font-medium text-bark-800 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-timber-300"
          >
            See the full range
            <ArrowRight className="h-4.5 w-4.5" />
          </Link>
        </Reveal>
      </section>

      {/* ----------------------------- ABOUT ------------------------------ */}
      <section className="border-y border-line bg-sand-50 py-16 sm:py-20 lg:py-24">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="relative aspect-[5/4] overflow-hidden rounded-[1.75rem] border border-line shadow-lift">
              <Image
                src="/images/about-workshop.svg"
                alt="Panel storage racks holding stock across the full range"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div>
            <SectionHeading
              align="left"
              eyebrow="Who we are"
              title="Seventeen years of getting the material right"
              description="Dishi Marketing opened in 2008 with a simple idea — that a carpenter should be able to trust what arrives on the truck. Everything since has followed from that."
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

            <Reveal className="mt-9">
              <Link
                href="/about"
                className="inline-flex items-center gap-2.5 text-[0.95rem] font-medium text-timber-600 transition-colors hover:text-timber-700"
              >
                More about the company
                <ArrowRight className="h-4.5 w-4.5" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------------------- SERVICES ---------------------------- */}
      <section className="container-page py-16 sm:py-20 lg:py-24">
        <SectionHeading
          eyebrow="How we work"
          title="More than a counter to buy boards from"
          description="Supply is the easy part. What customers stay for is the advice, the consistency and the fact that the material turns up when it was promised."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                <h3 className="mt-5 text-[1.12rem] text-bark-800">{service.title}</h3>
                <p className="mt-2.5 text-[0.93rem] leading-relaxed text-muted">
                  {service.description}
                </p>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ----------------------------- PROCESS ---------------------------- */}
      <section className="border-y border-line bg-sand-50 py-16 sm:py-20 lg:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Ordering"
            title="Four steps, no paperwork"
            description="No enquiry forms, no waiting for an email reply. A message on WhatsApp is all it takes to get moving."
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

      {/* -------------------------- WHO WE SERVE -------------------------- */}
      <section className="container-page py-16 sm:py-20">
        <SectionHeading
          eyebrow="Who we serve"
          title="From a single sheet to a full site"
          description="Whether it is one board for a repair or a phased supply across a project, the same material and the same rates apply."
        />
        <Reveal className="mt-10 flex flex-wrap justify-center gap-3">
          {CUSTOMER_TYPES.map((type) => (
            <span
              key={type}
              className="rounded-full border border-line bg-white px-5 py-2.5 text-[0.9rem] text-bark-700 shadow-soft transition-colors hover:border-timber-300 hover:text-timber-700"
            >
              {type}
            </span>
          ))}
        </Reveal>
      </section>

      {/* ------------------------------- FAQ ------------------------------ */}
      <section className="border-t border-line bg-sand-50 py-16 sm:py-20 lg:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Questions"
            title="The things customers usually ask"
          />
          <div className="mt-12">
            <FaqAccordion />
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
