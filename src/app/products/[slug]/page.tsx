import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ProductCard from "@/components/ProductCard";
import CTASection from "@/components/CTASection";
import WhatsAppButton from "@/components/WhatsAppButton";
import Reveal from "@/components/Reveal";
import { ArrowRight, CheckIcon } from "@/components/Icons";
import { PRODUCTS } from "@/data/constants";

type Params = { slug: string };

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) return { title: "Product not found" };

  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} | Dishi Marketing`,
      description: product.shortDescription,
      images: [product.image],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) notFound();

  const related = PRODUCTS.filter((p) => p.slug !== product.slug).slice(0, 3);
  const enquiry = `Hello Dishi Marketing, I would like to enquire about ${product.name}.`;

  return (
    <>
      <PageHero
        eyebrow="Product"
        title={product.name}
        description={product.shortDescription}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: product.name },
        ]}
      />

      <section className="container-page py-14 sm:py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          {/* Visual */}
          <Reveal>
            <div className="sticky top-28">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-line shadow-lift">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
                {product.specs.map((spec) => (
                  <div key={spec.label} className="bg-white px-5 py-4">
                    <dt className="text-[0.72rem] font-medium uppercase tracking-[0.14em] text-muted">
                      {spec.label}
                    </dt>
                    <dd className="mt-1.5 text-[0.95rem] text-bark-800">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          {/* Detail */}
          <div>
            <Reveal>
              <h2 className="text-[1.6rem] text-bark-800 sm:text-[1.85rem]">
                About this product
              </h2>
              <p className="mt-5 text-[1rem] leading-relaxed text-muted">
                {product.description}
              </p>
            </Reveal>

            <Reveal className="mt-10">
              <h3 className="text-[1.2rem] text-bark-800">Key features</h3>
              <ul className="mt-5 space-y-3.5">
                {product.features.map((feature) => (
                  <li key={feature} className="flex gap-3.5">
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-timber-100 text-timber-600">
                      <CheckIcon className="h-3 w-3" />
                    </span>
                    <span className="text-[0.96rem] leading-relaxed text-bark-700">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="mt-10">
              <h3 className="text-[1.2rem] text-bark-800">Typical applications</h3>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {product.applications.map((application) => (
                  <span
                    key={application}
                    className="rounded-full border border-line bg-white px-4 py-2 text-[0.88rem] text-bark-700 shadow-soft"
                  >
                    {application}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal className="mt-10 rounded-2xl border border-timber-200 bg-timber-50 p-7">
              <h3 className="text-[1.15rem] text-bark-800">
                Ask about {product.name}
              </h3>
              <p className="mt-2.5 text-[0.94rem] leading-relaxed text-muted">
                Send us the thickness, quantity and where it is going. We will confirm
                availability and rates on WhatsApp — no forms to fill in.
              </p>
              <WhatsAppButton
                size="md"
                className="mt-6"
                message={enquiry}
                label={`Enquire about ${product.name}`}
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="border-t border-line bg-sand-50 py-16 sm:py-20">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-[1.6rem] text-bark-800 sm:text-[2rem]">
              Other products
            </h2>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-[0.92rem] font-medium text-timber-600 transition-colors hover:text-timber-700"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item, i) => (
              <Reveal key={item.slug} delay={i * 90} className="h-full">
                <ProductCard product={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection message={enquiry} />
    </>
  );
}
