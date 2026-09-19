import Link from "next/link";
import {
  COMPANY,
  CONTACT,
  NAV_LINKS,
  PRODUCTS,
  SOCIAL_LINKS,
} from "@/data/constants";
import Logo from "./Logo";
import WhatsAppButton from "./WhatsAppButton";
import { MailIcon, PhoneIcon, SOCIAL_ICONS, MapPinIcon } from "./Icons";

export default function Footer() {
  const year = new Date().getFullYear();
  const socials = SOCIAL_LINKS.filter((s) => s.url);

  return (
    <footer className="mt-auto border-t border-bark-700/30 bg-bark-800 text-sand-200">
      <div className="container-page py-14 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-12">
          {/* Brand */}
          <div>
            <Logo inverted />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-sand-200/70">
              {COMPANY.description}
            </p>
            {socials.length > 0 && (
              <div className="mt-6 flex gap-3">
                {socials.map((social) => {
                  const Icon = SOCIAL_ICONS[social.icon as keyof typeof SOCIAL_ICONS];
                  return (
                    <a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-sand-200/20 text-sand-200 transition-colors hover:border-timber-300 hover:text-timber-200"
                    >
                      <Icon className="h-4.5 w-4.5" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-display text-base text-sand-50">Explore</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sand-200/70 transition-colors hover:text-timber-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-display text-base text-sand-50">Products</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {PRODUCTS.map((product) => (
                <li key={product.slug}>
                  <Link
                    href={`/products/${product.slug}`}
                    className="text-sand-200/70 transition-colors hover:text-timber-200"
                  >
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-base text-sand-50">Get in touch</h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li>
                <a
                  href={`tel:${CONTACT.phoneHref}`}
                  className="flex items-start gap-3 text-sand-200/70 transition-colors hover:text-timber-200"
                >
                  <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-timber-300" />
                  {CONTACT.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-start gap-3 break-all text-sand-200/70 transition-colors hover:text-timber-200"
                >
                  <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-timber-300" />
                  {CONTACT.email}
                </a>
              </li>
              {CONTACT.addressLines.length > 0 && (
                <li className="flex items-start gap-3 text-sand-200/70">
                  <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-timber-300" />
                  <span>
                    {CONTACT.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </span>
                </li>
              )}
            </ul>
            <WhatsAppButton size="sm" className="mt-6" />
          </div>
        </div>
      </div>

      <div className="border-t border-sand-200/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-[0.8rem] text-sand-200/55 sm:flex-row">
          <p>
            © {year} {COMPANY.legalName}. All rights reserved.
          </p>
          <p>
            Serving the trade since {COMPANY.foundedYear} · {COMPANY.customersServed}{" "}
            customers
          </p>
        </div>
      </div>
    </footer>
  );
}
