import Image from "next/image";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import Reveal from "@/components/Reveal";
import { GALLERY_ITEMS } from "@/data/constants";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "A look at the stock we hold — plywood, MDF, laminates, veneers, timber and pre-laminated boards from the Dishi Marketing range.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="A look at what we stock"
        description="Material, finishes and the racks they come off. If you would like to see something specific in person, message us and we will keep it aside."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
      />

      <section className="container-page py-16 sm:py-20">
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {GALLERY_ITEMS.map((item, i) => (
            <Reveal
              key={item.src}
              delay={(i % 3) * 90}
              className="group break-inside-avoid overflow-hidden rounded-2xl border border-line bg-white shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift"
            >
              <div
                className={`relative overflow-hidden bg-sand-100 ${
                  i % 5 === 0 ? "aspect-[4/5]" : i % 3 === 0 ? "aspect-square" : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  priority={i < 3}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.14em] text-bark-700 backdrop-blur">
                  {item.category}
                </span>
              </div>
              <p className="px-5 py-4 text-[0.92rem] text-bark-700">{item.caption}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection
        title="Want to see a sample?"
        description="Laminate and veneer samples are available for shortlisting. Tell us what you are looking for and we will arrange the relevant chips."
        message="Hello Dishi Marketing, I would like to see some samples."
      />
    </>
  );
}
