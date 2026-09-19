/**
 * ---------------------------------------------------------------------------
 * DISHI MARKETING — SINGLE SOURCE OF TRUTH
 * ---------------------------------------------------------------------------
 * Every piece of copy, contact detail, product, statistic and image path used
 * anywhere on the website lives in this file. To update the website, edit the
 * values below — no component code needs to change.
 * ---------------------------------------------------------------------------
 */

/* -------------------------------------------------------------------------- */
/* COMPANY                                                                     */
/* -------------------------------------------------------------------------- */

export const COMPANY = {
  name: "Dishi Marketing",
  legalName: "Dishi Marketing",
  tagline: "Plywood, MDF, Laminates & Veneers",
  shortPitch:
    "A trusted name in wood-based panel products since 2008 — supplying calibrated plywood, MDF, laminates, veneers, timber and pre-laminated particle board.",
  foundedYear: 2008,
  yearsOfExperience: 17,
  customersServed: "1000+",
  /** Shown under the logo in the footer. */
  description:
    "Dishi Marketing has been supplying quality wood-based panel products to carpenters, contractors, interior designers, furniture makers and dealers since 2008. Seventeen years on, more than a thousand customers rely on us for consistent material, fair pricing and dependable supply.",
} as const;

/* -------------------------------------------------------------------------- */
/* CONTACT                                                                     */
/* -------------------------------------------------------------------------- */

export const CONTACT = {
  /** Digits only, with country code — used to build the wa.me link. */
  whatsappNumber: "919723945099",
  /** Human readable version shown on screen. */
  phoneDisplay: "+91 97239 45099",
  /** Used for tel: links. */
  phoneHref: "+919723945099",
  email: "rajathakkar@gmail.com",
  /** Leave as an empty string to hide the address block sitewide. */
  addressLines: [] as string[],
  /** Leave as an empty string to hide the map. */
  mapEmbedUrl: "",
  businessHours: [
    { days: "Monday – Saturday", hours: "9:30 AM – 7:30 PM" },
    { days: "Sunday", hours: "Closed" },
  ],
  /** Pre-filled message when someone taps a WhatsApp button. */
  whatsappMessage:
    "Hello Dishi Marketing, I would like to enquire about your products.",
} as const;

/** Builds a wa.me link, optionally with a context specific message. */
export function whatsappLink(message: string = CONTACT.whatsappMessage): string {
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/* -------------------------------------------------------------------------- */
/* SOCIAL — leave a url empty to hide that icon everywhere                      */
/* -------------------------------------------------------------------------- */

export const SOCIAL_LINKS = [
  { label: "Instagram", url: "", icon: "instagram" },
  { label: "Facebook", url: "", icon: "facebook" },
] as const;

/* -------------------------------------------------------------------------- */
/* PEOPLE                                                                      */
/* -------------------------------------------------------------------------- */

export const PARTNERS = [
  {
    name: "Raja Thakkar",
    role: "Partner",
    bio: "Leads sourcing and customer relationships at Dishi Marketing, and has personally handled material supply for more than a thousand customers since 2008.",
  },
] as const;

/* -------------------------------------------------------------------------- */
/* NAVIGATION                                                                  */
/* -------------------------------------------------------------------------- */

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
] as const;

/* -------------------------------------------------------------------------- */
/* STATS                                                                       */
/* -------------------------------------------------------------------------- */

export const STATS = [
  { value: "2008", label: "Serving since", detail: "Established in 2008" },
  { value: "17+", label: "Years of experience", detail: "In the panel trade" },
  { value: "1000+", label: "Customers served", detail: "Across the region" },
  { value: "6", label: "Product categories", detail: "Under one roof" },
] as const;

/* -------------------------------------------------------------------------- */
/* PRODUCTS                                                                    */
/* -------------------------------------------------------------------------- */

export type Product = {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  image: string;
  features: string[];
  applications: string[];
  specs: { label: string; value: string }[];
};

export const PRODUCTS: Product[] = [
  {
    slug: "calibrated-plywood",
    name: "Calibrated Plywood",
    shortDescription:
      "Precision-sanded plywood with a uniform thickness across the full sheet — the dependable base for laminating and veneering.",
    description:
      "Calibrated plywood is sanded on both faces to a consistent, tightly controlled thickness, which makes it the preferred substrate wherever laminates or veneers are pressed on. The even surface means no telegraphing, no glue-line gaps and a clean finish straight off the press. We stock calibrated plywood in the thicknesses and grades that furniture makers and interior contractors ask for most.",
    image: "/images/products/calibrated-plywood.svg",
    features: [
      "Uniform thickness across the entire sheet",
      "Double-side sanded, ready for lamination",
      "Stable core with minimal warping",
      "Consistent batch-to-batch quality",
      "Available in commercial and moisture-resistant grades",
    ],
    applications: [
      "Modular kitchens and wardrobes",
      "Office and retail interiors",
      "Furniture manufacturing",
      "Panelling and partitions",
    ],
    specs: [
      { label: "Standard sheet size", value: "8 ft × 4 ft" },
      { label: "Thickness range", value: "4 mm – 25 mm" },
      { label: "Grades", value: "MR & BWR" },
      { label: "Finish", value: "Calibrated, double-side sanded" },
    ],
  },
  {
    slug: "mdf-boards",
    name: "MDF Boards",
    shortDescription:
      "Dense, perfectly smooth engineered panels that machine cleanly — ideal for routed shutters, mouldings and painted finishes.",
    description:
      "Medium Density Fibreboard offers a grain-free, homogeneous panel that cuts, routs and moulds without chipping. Its smooth surface takes paint, PU and membrane finishes beautifully, which is why designers reach for MDF on carved shutters, profile doors and decorative panelling. We supply plain MDF along with the thickness range commonly used in furniture and interior fit-out work.",
    image: "/images/products/mdf-boards.svg",
    features: [
      "Extremely smooth, knot-free surface",
      "Uniform density through the panel",
      "Excellent for routing, carving and CNC work",
      "Takes paint, PU and membrane finishes evenly",
      "No grain, no voids, no natural defects",
    ],
    applications: [
      "Membrane and PU-painted shutters",
      "CNC-cut jaali and decorative panels",
      "Mouldings, skirting and beading",
      "Display units and exhibition work",
    ],
    specs: [
      { label: "Standard sheet size", value: "8 ft × 4 ft" },
      { label: "Thickness range", value: "3 mm – 25 mm" },
      { label: "Types", value: "Plain & moisture resistant" },
      { label: "Finish", value: "Sanded both sides" },
    ],
  },
  {
    slug: "laminates",
    name: "Laminates",
    shortDescription:
      "Hard-wearing decorative surfaces in a wide spread of woodgrains, solids, textures and high-gloss finishes.",
    description:
      "Decorative laminates give a surface its character while doing the hard work of resisting scratches, stains, heat and everyday abuse. We carry a broad selection of shades and textures — from warm natural woodgrains to clean solid colours, matte suede finishes and mirror-gloss sheets — so a full interior can be specified from one supplier. Sample chips are available for shortlisting on site.",
    image: "/images/products/laminates.svg",
    features: [
      "Scratch, stain and heat resistant surface",
      "Woodgrain, solid, textured and high-gloss ranges",
      "Colour-consistent across sheets of the same batch",
      "Easy to clean and maintain",
      "Suited to both vertical and horizontal surfaces",
    ],
    applications: [
      "Kitchen and wardrobe shutters",
      "Table tops and counters",
      "Wall panelling and cladding",
      "Retail and office furniture",
    ],
    specs: [
      { label: "Standard sheet size", value: "8 ft × 4 ft" },
      { label: "Thickness", value: "0.8 mm & 1 mm" },
      { label: "Finishes", value: "Matte, suede, textured, high-gloss" },
      { label: "Range", value: "Woodgrains, solids, fabrics, stones" },
    ],
  },
  {
    slug: "veneers",
    name: "Natural Veneers",
    shortDescription:
      "Real wood sheets with genuine grain and depth, for interiors that need the warmth only natural timber gives.",
    description:
      "Natural veneer is a thin slice of real timber pressed onto a stable substrate — the honest way to bring genuine grain, figure and tonal depth into an interior. Because every log is different, veneer carries variation that printed surfaces simply cannot imitate. We help customers match leaves across a run so that a wall, a wardrobe and a headboard read as one continuous piece of wood.",
    image: "/images/products/veneers.svg",
    features: [
      "Genuine timber grain and natural figure",
      "Leaves matched for continuity across a run",
      "Can be polished to matte, satin or gloss",
      "Warm, premium finish for feature surfaces",
      "Wide choice of species and cuts",
    ],
    applications: [
      "Feature walls and headboards",
      "Executive furniture and conference tables",
      "Wardrobe and door shutters",
      "Reception and lobby panelling",
    ],
    specs: [
      { label: "Standard sheet size", value: "8 ft × 4 ft" },
      { label: "Substrate", value: "MDF or plywood backed" },
      { label: "Cuts", value: "Crown, quarter and rotary" },
      { label: "Finish", value: "Raw — polished on site" },
    ],
  },
  {
    slug: "wood-timber",
    name: "Wood & Timber",
    shortDescription:
      "Seasoned solid wood and sections for framing, beading and the structural work behind every good interior.",
    description:
      "Behind every clean interior there is honest solid wood doing the structural work — frames, battens, beading and edge members. We supply seasoned timber and sections chosen for straightness and stability, so that carpenters get material that stays true after installation instead of twisting a season later.",
    image: "/images/products/wood-timber.svg",
    features: [
      "Seasoned to reduce warping and shrinkage",
      "Straight, workable sections",
      "Suitable for framing and support work",
      "Cut sizes available on request",
      "Consistent supply for ongoing projects",
    ],
    applications: [
      "Door and window frames",
      "Furniture framing and battens",
      "Beading, moulding and edge members",
      "False ceiling and partition support",
    ],
    specs: [
      { label: "Form", value: "Planks, sections & battens" },
      { label: "Condition", value: "Seasoned" },
      { label: "Sizing", value: "Cut to requirement" },
      { label: "Supply", value: "Retail & bulk quantities" },
    ],
  },
  {
    slug: "pre-laminated-particle-board",
    name: "Pre-Laminated Particle Board",
    shortDescription:
      "Factory-finished boards that arrive ready to cut and assemble — the fast, economical choice for volume furniture.",
    description:
      "Pre-laminated particle board comes with the decorative surface already bonded at the factory on both faces, which removes an entire pressing stage from the workshop. For office furniture, storage units and cost-sensitive volume work it is hard to beat: the finish is even, the boards are ready the moment they arrive, and the price per square foot works out significantly lower than laminating on site.",
    image: "/images/products/pre-laminated-particle-board.svg",
    features: [
      "Decorative surface pre-bonded on both faces",
      "No on-site lamination required",
      "Even, factory-controlled finish",
      "Economical for high-volume work",
      "Wide selection of shades and woodgrains",
    ],
    applications: [
      "Office workstations and storage",
      "Budget modular furniture",
      "Shelving and back panels",
      "Institutional and hostel furniture",
    ],
    specs: [
      { label: "Standard sheet size", value: "8 ft × 4 ft" },
      { label: "Thickness range", value: "9 mm – 25 mm" },
      { label: "Surface", value: "Pre-laminated both sides" },
      { label: "Range", value: "Solids & woodgrains" },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* SERVICES                                                                    */
/* -------------------------------------------------------------------------- */

export type Service = {
  title: string;
  description: string;
  icon: "supply" | "advice" | "sourcing" | "quality" | "delivery" | "pricing";
};

export const SERVICES: Service[] = [
  {
    title: "Bulk & Project Supply",
    description:
      "Material planned and released in phases to match a site schedule, so contractors are never stuck waiting for sheets or holding stock they cannot store.",
    icon: "supply",
  },
  {
    title: "Dealer & Retail Supply",
    description:
      "Steady, repeatable supply for dealers, carpenters and furniture workshops — the same grades, the same finishes, order after order.",
    icon: "pricing",
  },
  {
    title: "Material Consultation",
    description:
      "Seventeen years of knowing what works where. Tell us the application and we will point you to the right board, grade and thickness for it.",
    icon: "advice",
  },
  {
    title: "Sourcing on Request",
    description:
      "Looking for a specific shade, species or specification we do not have on the shelf? We source it through our supplier network and keep you posted.",
    icon: "sourcing",
  },
  {
    title: "Quality Checked Stock",
    description:
      "Every lot is checked before it reaches you — thickness, finish and batch consistency — because a bad sheet costs a carpenter far more than it costs us.",
    icon: "quality",
  },
  {
    title: "Prompt Dispatch",
    description:
      "Orders confirmed on WhatsApp and dispatched without the usual back and forth, so your work keeps moving.",
    icon: "delivery",
  },
];

/* -------------------------------------------------------------------------- */
/* WHY CHOOSE US                                                               */
/* -------------------------------------------------------------------------- */

export const WHY_CHOOSE_US = [
  {
    title: "Seventeen years in the trade",
    description:
      "Trading since 2008 — long enough to know which material holds up on site and which one only looks good in a catalogue.",
  },
  {
    title: "Everything under one roof",
    description:
      "Plywood, MDF, laminates, veneers, timber and pre-laminated board from a single supplier. One call, one delivery, one point of contact.",
  },
  {
    title: "Over a thousand customers",
    description:
      "Carpenters, contractors, designers, furniture makers and dealers who keep coming back — which is the only recommendation that really counts.",
  },
  {
    title: "Straight answers, fair pricing",
    description:
      "Clear rates, honest advice about what a job actually needs, and no pressure to upgrade when the cheaper board will do the work.",
  },
];

/* -------------------------------------------------------------------------- */
/* PROCESS                                                                     */
/* -------------------------------------------------------------------------- */

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Tell us what you need",
    description:
      "Send your requirement on WhatsApp — the product, thickness, quantity, and where it is going.",
  },
  {
    step: "02",
    title: "Get a recommendation",
    description:
      "We suggest the right grade and finish for the application, and share available options and shades.",
  },
  {
    step: "03",
    title: "Confirm your order",
    description:
      "Quantities and rates are confirmed up front. No hidden additions once the material is loaded.",
  },
  {
    step: "04",
    title: "Material reaches you",
    description:
      "Stock is checked, packed and dispatched so it reaches your site or workshop when you need it.",
  },
];

/* -------------------------------------------------------------------------- */
/* MILESTONES                                                                  */
/* -------------------------------------------------------------------------- */

export const MILESTONES = [
  {
    year: "2008",
    title: "The beginning",
    description:
      "Dishi Marketing opens its doors, supplying plywood and boards to local carpenters and furniture workshops.",
  },
  {
    year: "2012",
    title: "The range widens",
    description:
      "Laminates and natural veneers are added, so customers can finish a project without going to a second supplier.",
  },
  {
    year: "2017",
    title: "Engineered panels",
    description:
      "MDF and pre-laminated particle board join the catalogue as modular furniture takes hold across the region.",
  },
  {
    year: "2025",
    title: "Seventeen years on",
    description:
      "More than a thousand customers served, and a six-category range that covers a complete interior fit-out.",
  },
];

/* -------------------------------------------------------------------------- */
/* WHO WE SERVE                                                                */
/* -------------------------------------------------------------------------- */

export const CUSTOMER_TYPES = [
  "Carpenters",
  "Interior contractors",
  "Architects & designers",
  "Furniture manufacturers",
  "Modular kitchen studios",
  "Builders & developers",
  "Retail dealers",
  "Home owners",
];

/* -------------------------------------------------------------------------- */
/* GALLERY                                                                     */
/* -------------------------------------------------------------------------- */

export type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
  category: string;
};

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    src: "/images/gallery/plywood-stack.svg",
    alt: "Stacked calibrated plywood sheets showing clean edge layers",
    caption: "Calibrated plywood, stacked and ready",
    category: "Stock",
  },
  {
    src: "/images/gallery/laminate-swatches.svg",
    alt: "Decorative laminate sample swatches in assorted shades",
    caption: "Laminate shades from the sample library",
    category: "Laminates",
  },
  {
    src: "/images/gallery/veneer-grain.svg",
    alt: "Close view of natural veneer grain and figure",
    caption: "Natural veneer — grain you cannot print",
    category: "Veneers",
  },
  {
    src: "/images/gallery/mdf-panels.svg",
    alt: "Smooth MDF panels stored on edge",
    caption: "Plain MDF, smooth on both faces",
    category: "Panels",
  },
  {
    src: "/images/gallery/timber-sections.svg",
    alt: "Seasoned timber sections and battens",
    caption: "Seasoned timber sections",
    category: "Timber",
  },
  {
    src: "/images/gallery/prelam-boards.svg",
    alt: "Pre-laminated particle boards in woodgrain finishes",
    caption: "Pre-laminated boards, factory finished",
    category: "Panels",
  },
  {
    src: "/images/gallery/warehouse.svg",
    alt: "Panel storage racks inside the warehouse",
    caption: "Stock held across the full range",
    category: "Warehouse",
  },
  {
    src: "/images/gallery/edge-detail.svg",
    alt: "Close-up of a plywood edge showing its core layers",
    caption: "Edge detail — an even, void-free core",
    category: "Detail",
  },
];

/* -------------------------------------------------------------------------- */
/* FAQ                                                                         */
/* -------------------------------------------------------------------------- */

export const FAQS = [
  {
    question: "What products does Dishi Marketing supply?",
    answer:
      "We supply calibrated plywood, MDF boards, decorative laminates, natural veneers, seasoned wood and timber, and pre-laminated particle board — everything needed for a complete interior fit-out from one supplier.",
  },
  {
    question: "How long have you been in business?",
    answer:
      "Dishi Marketing has been trading since 2008, which puts us at over 17 years in the wood and panel business, with more than a thousand customers served in that time.",
  },
  {
    question: "Do you supply in bulk for projects?",
    answer:
      "Yes. We handle both retail quantities and bulk project supply, and can phase deliveries to match a site schedule so you are not storing material you cannot use yet.",
  },
  {
    question: "Can I see samples before ordering?",
    answer:
      "Certainly. Laminate and veneer samples are available for shortlisting. Message us on WhatsApp with what you are looking for and we will arrange the relevant sample chips.",
  },
  {
    question: "How do I place an order?",
    answer:
      "The quickest way is WhatsApp. Send us your requirement — product, thickness, quantity and where it is going — and we will confirm availability, rates and dispatch with you directly.",
  },
  {
    question: "Which grade of plywood should I choose?",
    answer:
      "It depends on where it is going. MR grade is fine for dry interiors such as wardrobes and wall units, while BWR grade is the sensible choice for kitchens, bathrooms and anywhere moisture is expected. Tell us the application and we will recommend the right one.",
  },
];

/* -------------------------------------------------------------------------- */
/* SEO                                                                         */
/* -------------------------------------------------------------------------- */

export const SEO = {
  siteUrl: "https://dishimarketing.com",
  defaultTitle: "Dishi Marketing — Plywood, MDF, Laminates & Veneers Since 2008",
  titleTemplate: "%s | Dishi Marketing",
  defaultDescription:
    "Dishi Marketing supplies calibrated plywood, MDF, laminates, natural veneers, timber and pre-laminated particle board. Trusted by over 1000 customers since 2008.",
  keywords: [
    "plywood supplier",
    "calibrated plywood",
    "MDF boards",
    "decorative laminates",
    "natural veneers",
    "pre-laminated particle board",
    "timber supplier",
    "Dishi Marketing",
  ],
} as const;
