import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ProductCard from "@/components/ProductCard";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import FaqAccordion from "@/components/FaqAccordion";
import Reveal from "@/components/Reveal";
import { PRODUCTS, FAQS } from "@/data/constants";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Calibrated plywood, MDF boards, decorative laminates, natural veneers, seasoned timber and pre-laminated particle board — the complete Dishi Marketing range.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our range"
        title="Everything an interior needs, from one supplier"
        description="Six categories covering substrate, surface and structure. Tell us the application and we will point you to the right grade and thickness for it."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products" }]}
      />

      <section className="container-page py-16 sm:py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product, i) => (
            <Reveal key={product.slug} delay={(i % 3) * 100} className="h-full">
              <ProductCard product={product} priority={i < 3} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-sand-50 py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Good to know"
            title="Choosing the right board"
          />
          <div className="mt-12">
            <FaqAccordion items={FAQS.slice(2)} />
          </div>
        </div>
      </section>

      <CTASection
        title="Not sure which one you need?"
        description="Send us the application — a kitchen shutter, a shop counter, a door frame — and we will tell you the board, grade and thickness that suits it."
        message="Hello Dishi Marketing, I need help choosing the right material for my project."
      />
    </>
  );
}
