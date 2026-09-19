import Image from "next/image";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import StatsStrip from "@/components/StatsStrip";
import CTASection from "@/components/CTASection";
import Reveal from "@/components/Reveal";
import { CheckIcon } from "@/components/Icons";
import {
  COMPANY,
  CUSTOMER_TYPES,
  MILESTONES,
  PARTNERS,
  WHY_CHOOSE_US,
} from "@/data/constants";

export const metadata: Metadata = {
  title: "About Us",
  description: `${COMPANY.name} has supplied plywood, MDF, laminates and veneers since ${COMPANY.foundedYear}. Seventeen years in the trade and more than a thousand customers served.`,
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={`Established ${COMPANY.foundedYear}`}
        title="A wood business built on repeat customers"
        description="Dishi Marketing has spent seventeen years supplying the material behind kitchens, wardrobes, offices and shopfronts — and most of that work still comes from people who bought from us the first time."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      {/* Story */}
      <section className="container-page py-16 sm:py-20 lg:py-24">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-line shadow-lift">
              <Image
                src="/images/gallery/edge-detail.svg"
                alt="Close-up of a plywood edge showing its core layers"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div>
            <SectionHeading
              align="left"
              eyebrow="Our story"
              title="Started in 2008 with one promise"
            />
            <div className="mt-7 space-y-5 text-[1rem] leading-relaxed text-muted">
              <p>
                Dishi Marketing opened in {COMPANY.foundedYear} supplying plywood and
                boards to local carpenters and furniture workshops. The trade back
                then had a familiar problem: material that looked right in the
                showroom but behaved differently on site. Sheets that varied in
                thickness. Cores with voids. Batches that never quite matched.
              </p>
              <p>
                Our answer was unglamorous but effective — know the material, check
                every lot, and tell customers honestly what a job actually needs. If
                the cheaper board will do the work, we say so. That habit is the
                reason carpenters who bought a single sheet in our first year are
                still ordering from us seventeen years later.
              </p>
              <p>
                The range grew as our customers&apos; work grew. Laminates and veneers
                came in so that a project could be finished without a second supplier.
                MDF and pre-laminated board followed as modular furniture took hold.
                Today we cover six categories — enough to fit out a complete interior
                from a single point of contact.
              </p>
              <p>
                {COMPANY.customersServed} customers later, the promise has not changed.
                Consistent material, fair rates, and a straight answer when you ask a
                question.
              </p>
            </div>

            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              {WHY_CHOOSE_US.slice(0, 4).map((item, i) => (
                <Reveal
                  key={item.title}
                  delay={i * 80}
                  className="rounded-xl border border-line bg-white p-5 shadow-soft"
                >
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-timber-50 text-timber-600">
                    <CheckIcon className="h-4 w-4" />
                  </span>
                  <h3 className="mt-3 text-[0.98rem] text-bark-800">{item.title}</h3>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container-page pb-6">
        <StatsStrip />
      </section>

      {/* Timeline */}
      <section className="border-y border-line bg-sand-50 py-16 sm:py-20 lg:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Milestones"
            title="How the range grew"
            description="Each addition came from customers asking for it — not from a catalogue we wanted to fill."
          />

          <div className="relative mt-14">
            <div
              aria-hidden="true"
              className="absolute left-[0.6875rem] top-2 h-[calc(100%-1rem)] w-px bg-line lg:left-1/2 lg:-translate-x-1/2"
            />
            <ol className="space-y-10 lg:space-y-14">
              {MILESTONES.map((milestone, i) => (
                <Reveal
                  key={milestone.year}
                  delay={i * 90}
                  as="li"
                  className="relative pl-10 lg:grid lg:grid-cols-2 lg:gap-14 lg:pl-0"
                >
                  <span
                    className={`absolute left-0 top-1.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-timber-300 bg-cream lg:left-1/2 lg:-translate-x-1/2 ${
                      i === MILESTONES.length - 1 ? "border-timber-500" : ""
                    }`}
                  >
                    <span className="h-2 w-2 rounded-full bg-timber-500" />
                  </span>

                  <div
                    className={
                      i % 2 === 0
                        ? "lg:col-start-1 lg:pr-4 lg:text-right"
                        : "lg:col-start-2 lg:pl-4"
                    }
                  >
                    <span className="font-display text-[1.6rem] text-timber-600">
                      {milestone.year}
                    </span>
                    <h3 className="mt-1 text-[1.15rem] text-bark-800">
                      {milestone.title}
                    </h3>
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
                      {milestone.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="container-page py-16 sm:py-20 lg:py-24">
        <SectionHeading
          eyebrow="The people"
          title="Who you will be dealing with"
          description="A small operation, which is exactly why the person who takes your call is the person who knows the stock."
        />

        <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-1">
          {PARTNERS.map((partner, i) => (
            <Reveal
              key={partner.name}
              delay={i * 90}
              className="flex flex-col items-start gap-6 rounded-2xl border border-line bg-white p-7 shadow-soft sm:flex-row sm:items-center sm:p-9"
            >
              <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-timber-50 font-display text-2xl text-timber-600">
                {partner.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
              <div>
                <h3 className="text-[1.25rem] text-bark-800">{partner.name}</h3>
                <p className="mt-0.5 text-[0.82rem] font-medium uppercase tracking-[0.16em] text-timber-600">
                  {partner.role}
                </p>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
                  {partner.bio}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Who we serve */}
      <section className="border-t border-line bg-sand-50 py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading eyebrow="Our customers" title="Who buys from us" />
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
        title="Come and see the material for yourself"
        description="Message us on WhatsApp and we will walk you through what is in stock, what suits your application, and what it costs."
      />
    </>
  );
}
