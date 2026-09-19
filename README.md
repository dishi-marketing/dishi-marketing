# Dishi Marketing — Marketing Website

Marketing website for **Dishi Marketing**, a supplier of plywood, MDF, laminates,
veneers, timber and pre-laminated particle board, trading since 2008.

Built with **Next.js 16 (App Router)**, **TypeScript** and **Tailwind CSS v4**.

---

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
npm run lint
```

---

## Editing the content

**Everything on the website comes from one file:**

```
src/data/constants.ts
```

Company details, contact information, products, services, statistics, gallery
captions, FAQs and SEO metadata all live there. Change a value in that file and
it updates everywhere it appears — no component code needs touching.

A few things worth knowing:

| What you want to change | Where |
| --- | --- |
| WhatsApp number | `CONTACT.whatsappNumber` (digits only, with country code) and `CONTACT.phoneDisplay` |
| Email, business hours | `CONTACT` |
| Shop address | `CONTACT.addressLines` — leave the array empty and the address block is hidden sitewide |
| Google Maps embed | `CONTACT.mapEmbedUrl` — leave it empty and the map section is hidden |
| Instagram / Facebook | `SOCIAL_LINKS` — an empty `url` hides that icon |
| Products | `PRODUCTS` — each entry generates its own page at `/products/<slug>` automatically |
| Services, stats, FAQs, milestones | `SERVICES`, `STATS`, `FAQS`, `MILESTONES` |
| Site URL for SEO and sitemap | `SEO.siteUrl` |

### There is no contact form — by design

The contact page offers WhatsApp and phone only, as requested. Every "WhatsApp
Us" button opens a `wa.me` link to `CONTACT.whatsappNumber` with a pre-filled
message; product pages pre-fill the product name automatically.

---

## Pages

| Route | Page |
| --- | --- |
| `/` | Home — hero, stats, products, about, services, ordering process, FAQ |
| `/about` | Company story, milestones timeline, partner profile |
| `/products` | Full product range |
| `/products/[slug]` | Product detail — description, features, applications, specs |
| `/services` | Services, ordering process, why customers stay |
| `/gallery` | Stock and material gallery |
| `/contact` | WhatsApp, phone, email, hours, quick product enquiries |

`robots.txt` and `sitemap.xml` are generated from the same constants.

---

## Images

Product and gallery imagery is generated as vector artwork by:

```bash
node scripts/generate-images.mjs
```

The script writes SVG material textures — wood grain, ply edges, laminate
swatches, veneer figure — into `public/images/`. They are a few kilobytes each,
stay sharp on any display, and contain no photographed people.

### Swapping in photographs

Replace the `image` value of any product in `src/data/constants.ts`:

```ts
image: "/images/products/calibrated-plywood.jpg",   // a file in public/images/
image: "https://images.unsplash.com/photo-...",      // or a hosted image
```

`images.unsplash.com` and `images.pexels.com` are already whitelisted in
`next.config.ts`; add any other host to `images.remotePatterns` there. Gallery
images work the same way through `GALLERY_ITEMS`.

---

## Branding

- The logo is an original SVG — a log cross-section with growth rings — in
  `src/components/Logo.tsx` (React), `public/logo.svg` (standalone) and
  `src/app/icon.svg` (favicon, picked up automatically by Next.js).
- Colours, fonts, shadows and animations are defined as tokens at the top of
  `src/app/globals.css`. Change them there to re-skin the whole site.
- Type is Fraunces (headings) and Inter (body), loaded from Google Fonts in
  `src/app/layout.tsx`.

---

## Deploying

The site is fully static — every route is prerendered at build time. It deploys
to Vercel, Netlify or any Node host with no configuration. Set `SEO.siteUrl` to
the live domain before going live so the sitemap and metadata point at it.
