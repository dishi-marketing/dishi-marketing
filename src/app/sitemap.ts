import type { MetadataRoute } from "next";
import { NAV_LINKS, PRODUCTS, SEO } from "@/data/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages = NAV_LINKS.map((link) => ({
    url: `${SEO.siteUrl}${link.href === "/" ? "" : link.href}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: link.href === "/" ? 1 : 0.8,
  }));

  const products = PRODUCTS.map((product) => ({
    url: `${SEO.siteUrl}/products/${product.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...pages, ...products];
}
