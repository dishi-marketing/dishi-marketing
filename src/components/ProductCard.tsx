import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/constants";
import { ArrowRight } from "./Icons";

export default function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-timber-200 hover:shadow-lift"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-sand-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bark-900/25 via-transparent to-transparent" />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-[1.2rem] text-bark-800 transition-colors group-hover:text-timber-700">
          {product.name}
        </h3>
        <p className="mt-2.5 flex-1 text-[0.92rem] leading-relaxed text-muted">
          {product.shortDescription}
        </p>
        <span className="mt-5 inline-flex items-center gap-2 text-[0.88rem] font-medium text-timber-600">
          View details
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
