import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import WhatsAppButton from "@/components/WhatsAppButton";
import FaqAccordion from "@/components/FaqAccordion";
import Reveal from "@/components/Reveal";
import {
  ClockIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "@/components/Icons";
import { COMPANY, CONTACT, PRODUCTS } from "@/data/constants";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with ${COMPANY.name} on WhatsApp at ${CONTACT.phoneDisplay} for plywood, MDF, laminates, veneers and timber enquiries.`,
};

export default function ContactPage() {
  const hasAddress = CONTACT.addressLines.length > 0;

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="One message is all it takes"
        description="No enquiry forms and no waiting for a reply that never comes. Send us a WhatsApp message and you will be talking to the person who knows the stock."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      {/* Primary WhatsApp panel */}
      <section className="container-page py-16 sm:py-20">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr] lg:gap-8">
          <Reveal className="relative overflow-hidden rounded-[1.5rem] border border-timber-200 bg-gradient-to-br from-timber-50 via-sand-50 to-white p-8 shadow-soft sm:p-10 lg:p-12">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-timber-200/30 blur-3xl"
            />
            <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#25D366]/15 text-[#128C4B]">
              <WhatsAppIcon className="h-7 w-7" />
            </span>

            <h2 className="relative mt-6 text-[1.7rem] leading-tight text-bark-800 sm:text-[2.1rem]">
              Message us on WhatsApp
            </h2>
            <p className="relative mt-4 max-w-lg text-[1rem] leading-relaxed text-muted">
              Send the product, thickness and quantity you need — along with where
              it is going — and we will come back with availability, rates and a
              dispatch date. Samples and shade options can be shared over chat too.
            </p>

            <div className="relative mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <WhatsAppButton size="lg" label="WhatsApp Us" />
              <a
                href={`tel:${CONTACT.phoneHref}`}
                className="inline-flex items-center justify-center gap-2.5 rounded-full border border-bark-700/20 bg-white px-8 py-4 text-base font-medium text-bark-800 transition-all duration-300 hover:-translate-y-0.5 hover:border-timber-300"
              >
                <PhoneIcon className="h-5 w-5" aria-hidden="true" />
                Call {CONTACT.phoneDisplay}
              </a>
            </div>

            <p className="relative mt-6 text-[0.85rem] text-muted">
              Available {CONTACT.businessHours[0].days} ·{" "}
              {CONTACT.businessHours[0].hours}
            </p>
          </Reveal>

          {/* Details */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            <Reveal
              delay={80}
              className="rounded-2xl border border-line bg-white p-7 shadow-soft"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-timber-50 text-timber-600">
                <PhoneIcon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-[1.05rem] text-bark-800">Phone</h3>
              <a
                href={`tel:${CONTACT.phoneHref}`}
                className="mt-1.5 block text-[0.95rem] text-muted transition-colors hover:text-timber-700"
              >
                {CONTACT.phoneDisplay}
              </a>
            </Reveal>

            <Reveal
              delay={140}
              className="rounded-2xl border border-line bg-white p-7 shadow-soft"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-timber-50 text-timber-600">
                <MailIcon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-[1.05rem] text-bark-800">Email</h3>
              <a
                href={`mailto:${CONTACT.email}`}
                className="mt-1.5 block break-all text-[0.95rem] text-muted transition-colors hover:text-timber-700"
              >
                {CONTACT.email}
              </a>
            </Reveal>

            <Reveal
              delay={200}
              className="rounded-2xl border border-line bg-white p-7 shadow-soft"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-timber-50 text-timber-600">
                <ClockIcon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-[1.05rem] text-bark-800">Business hours</h3>
              <dl className="mt-2.5 space-y-1.5 text-[0.92rem] text-muted">
                {CONTACT.businessHours.map((slot) => (
                  <div key={slot.days} className="flex justify-between gap-4">
                    <dt>{slot.days}</dt>
                    <dd className="text-bark-700">{slot.hours}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            {hasAddress && (
              <Reveal
                delay={260}
                className="rounded-2xl border border-line bg-white p-7 shadow-soft"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-timber-50 text-timber-600">
                  <MapPinIcon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-[1.05rem] text-bark-800">Visit us</h3>
                <address className="mt-1.5 text-[0.95rem] not-italic leading-relaxed text-muted">
                  {CONTACT.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* Quick product enquiries */}
      <section className="border-y border-line bg-sand-50 py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Quick enquiry"
            title="Know what you need already?"
            description="Tap a product below and your WhatsApp message will be pre-filled for you."
          />

          <div className="mt-11 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((product, i) => (
              <Reveal key={product.slug} delay={(i % 3) * 80}>
                <WhatsAppButton
                  variant="outline"
                  size="md"
                  className="w-full justify-start"
                  label={product.name}
                  message={`Hello Dishi Marketing, I would like to enquire about ${product.name}.`}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Map, only if one has been configured */}
      {CONTACT.mapEmbedUrl && (
        <section className="container-page py-16 sm:py-20">
          <div className="overflow-hidden rounded-[1.5rem] border border-line shadow-soft">
            <iframe
              src={CONTACT.mapEmbedUrl}
              title={`${COMPANY.name} location`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[24rem] w-full border-0"
            />
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="container-page py-16 sm:py-20">
        <SectionHeading eyebrow="Before you message" title="Common questions" />
        <div className="mt-12">
          <FaqAccordion />
        </div>
      </section>
    </>
  );
}
