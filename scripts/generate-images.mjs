/**
 * Generates the product and gallery imagery as self-contained SVG files.
 *
 * Every image is drawn procedurally — wood grain is produced with fractal
 * turbulence and displacement, so the results stay sharp at any resolution,
 * weigh a few kilobytes each and contain no photographed people.
 *
 * Run with:  node scripts/generate-images.mjs
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const W = 1200;
const H = 900;

/* ----------------------------- small helpers ----------------------------- */

const rand = (seed) => {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
};

const lerp = (a, b, t) => a + (b - a) * t;

const mix = (hexA, hexB, t) => {
  const p = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const [r1, g1, b1] = p(hexA);
  const [r2, g2, b2] = p(hexB);
  const c = (a, b) => Math.round(lerp(a, b, t)).toString(16).padStart(2, "0");
  return `#${c(r1, r2)}${c(g1, g2)}${c(b1, b2)}`;
};

/** Wavy horizontal grain lines, displaced by fractal noise. */
const grainLines = ({ id, x, y, w, h, dark, count = 46, seed = 3, opacity = 0.5 }) => {
  const r = rand(seed);
  let out = `<g filter="url(#${id})" opacity="${opacity}">`;
  for (let i = 0; i < count; i += 1) {
    const ly = y + (h / count) * i + r() * 4;
    const thickness = 0.6 + r() * 2.6;
    const alpha = (0.26 + r() * 0.58).toFixed(2);
    out += `<rect x="${x - 40}" y="${ly.toFixed(1)}" width="${w + 80}" height="${thickness.toFixed(
      1,
    )}" fill="${dark}" opacity="${alpha}"/>`;
  }
  out += "</g>";
  return out;
};

/** Filter definitions reused across the images. */
const defs = () => `
  <filter id="grainA" x="-15%" y="-15%" width="130%" height="130%">
    <feTurbulence type="fractalNoise" baseFrequency="0.0035 0.075" numOctaves="4" seed="11" result="n"/>
    <feDisplacementMap in="SourceGraphic" in2="n" scale="34" xChannelSelector="R" yChannelSelector="G"/>
  </filter>
  <filter id="grainB" x="-15%" y="-15%" width="130%" height="130%">
    <feTurbulence type="fractalNoise" baseFrequency="0.006 0.05" numOctaves="5" seed="29" result="n"/>
    <feDisplacementMap in="SourceGraphic" in2="n" scale="52" xChannelSelector="R" yChannelSelector="G"/>
  </filter>
  <filter id="grainC" x="-15%" y="-15%" width="130%" height="130%">
    <feTurbulence type="fractalNoise" baseFrequency="0.002 0.11" numOctaves="3" seed="47" result="n"/>
    <feDisplacementMap in="SourceGraphic" in2="n" scale="18" xChannelSelector="R" yChannelSelector="G"/>
  </filter>
  <filter id="fibre" x="0%" y="0%" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="5" result="n"/>
    <feColorMatrix in="n" type="saturate" values="0"/>
    <feComponentTransfer><feFuncA type="linear" slope="0.14"/></feComponentTransfer>
  </filter>
  <filter id="chips" x="0%" y="0%" width="100%" height="100%">
    <feTurbulence type="turbulence" baseFrequency="0.045 0.06" numOctaves="2" seed="17" result="n"/>
    <feColorMatrix in="n" type="saturate" values="0.15"/>
    <feComponentTransfer><feFuncA type="linear" slope="0.5"/></feComponentTransfer>
  </filter>
  <filter id="soften" x="-10%" y="-10%" width="120%" height="120%">
    <feGaussianBlur stdDeviation="9"/>
  </filter>
  <linearGradient id="light" x1="0" y1="0" x2="0.85" y2="1">
    <stop offset="0" stop-color="#ffffff" stop-opacity="0.34"/>
    <stop offset="0.45" stop-color="#ffffff" stop-opacity="0.06"/>
    <stop offset="1" stop-color="#2c2219" stop-opacity="0.2"/>
  </linearGradient>
  <radialGradient id="vignette" cx="0.42" cy="0.32" r="0.95">
    <stop offset="0.45" stop-color="#000000" stop-opacity="0"/>
    <stop offset="1" stop-color="#2c2219" stop-opacity="0.3"/>
  </radialGradient>`;

const wrap = (body, title) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${title}">
<title>${title}</title>
<defs>${defs()}</defs>
${body}
<rect width="${W}" height="${H}" fill="url(#vignette)"/>
</svg>
`;

/* ------------------------------- the images ------------------------------ */

/** A wide grain field — the base for veneer and laminate style shots. */
const grainField = ({ base, dark, highlight, filter = "grainA", seed = 3, lines = 60 }) => `
  <rect width="${W}" height="${H}" fill="${base}"/>
  <rect width="${W}" height="${H}" fill="${highlight}" opacity="0.22"/>
  ${grainLines({ id: filter, x: 0, y: -20, w: W, h: H + 40, dark, count: lines, seed })}
  <rect width="${W}" height="${H}" filter="url(#fibre)" opacity="0.7"/>
  <rect width="${W}" height="${H}" fill="url(#light)"/>`;

/**
 * Sheets seen in isometric: a thick slab per sheet, stacked so every front
 * edge stays visible. `plies` controls the striped core — plywood shows its
 * layers, MDF and particle board read as a solid core.
 */
const slabStack = ({
  face,
  edge,
  core,
  coreAlt,
  plies = 7,
  sheets = 8,
  label,
  seed = 97,
}) => {
  const r = rand(seed);
  const T = 30; // sheet thickness on screen
  const dx = 132; // depth vector — back edge sits up and to the right
  const dy = -84;
  const w = 720;
  const baseX = 190;
  const baseY = 700;

  let body = `<rect width="${W}" height="${H}" fill="#f7f1e7"/>
    <rect y="${H * 0.5}" width="${W}" height="${H * 0.5}" fill="#ece0ce"/>
    <ellipse cx="${baseX + w / 2 + dx / 2}" cy="${baseY + T + 26}" rx="${w * 0.62}" ry="34" fill="#2c2219" opacity="0.16" filter="url(#soften)"/>`;

  for (let i = 0; i < sheets; i += 1) {
    const jitter = (r() - 0.5) * 26;
    const x = baseX + jitter;
    const y = baseY - i * T;

    // top face — only fully visible on the uppermost sheet
    body += `<g>
      <path d="M${x} ${y} L${x + w} ${y} L${x + w + dx} ${y + dy} L${x + dx} ${y + dy} Z" fill="${face}"/>
      ${grainLines({
        id: "grainC",
        x: x + dx * 0.1,
        y: y + dy,
        w: w + dx,
        h: -dy,
        dark: edge,
        count: 16,
        seed: 13 + i * 7,
        opacity: 0.32,
      })}
      <path d="M${x} ${y} L${x + w} ${y} L${x + w + dx} ${y + dy} L${x + dx} ${y + dy} Z" fill="url(#light)" opacity="0.45"/>

      <path d="M${x + w} ${y} L${x + w + dx} ${y + dy} L${x + w + dx} ${y + dy + T} L${x + w} ${y + T} Z" fill="${edge}"/>
      <path d="M${x + w} ${y} L${x + w + dx} ${y + dy} L${x + w + dx} ${y + dy + T} L${x + w} ${y + T} Z" fill="#2c2219" opacity="0.18"/>

      <rect x="${x}" y="${y}" width="${w}" height="${T}" fill="${edge}"/>`;

    // striped core on the front edge
    for (let p = 0; p < plies; p += 1) {
      const lh = T / plies;
      body += `<rect x="${x}" y="${(y + lh * p).toFixed(1)}" width="${w}" height="${(
        lh * 0.55
      ).toFixed(1)}" fill="${p % 2 ? coreAlt : core}" opacity="${plies > 1 ? 0.9 : 0.35}"/>`;
    }

    body += `<rect x="${x}" y="${y}" width="${w}" height="${T}" fill="url(#light)" opacity="0.35"/>
      <rect x="${x}" y="${y}" width="${w}" height="0.9" fill="#4a3320" opacity="0.35"/>
    </g>`;
  }

  body += `<rect width="${W}" height="${H}" filter="url(#fibre)" opacity="0.45"/>`;
  return wrap(body, label);
};

/* 1 — Calibrated plywood -------------------------------------------------- */
const calibratedPlywood = slabStack({
  face: "#dcb589",
  edge: "#c99f70",
  core: "#eed4b0",
  coreAlt: "#b07f50",
  plies: 7,
  sheets: 8,
  seed: 97,
  label: "Stacked calibrated plywood sheets with visible core layers",
});

/* 2 — MDF ----------------------------------------------------------------- */
const mdf = slabStack({
  face: "#c99055",
  edge: "#a9713c",
  core: "#b5804a",
  coreAlt: "#b5804a",
  plies: 1,
  sheets: 7,
  seed: 151,
  label: "Smooth MDF panels stacked, showing their solid even core",
});

/* 3 — Laminates ----------------------------------------------------------- */
const laminates = (() => {
  const shades = [
    ["#e9d9c2", "#c9ae8c"],
    ["#b8865a", "#8c6038"],
    ["#f2ece4", "#d3cabd"],
    ["#5f4b3a", "#3f3025"],
    ["#d7c4a8", "#b09472"],
    ["#8f9c8e", "#6b7a6b"],
    ["#c96f4a", "#a4512f"],
    ["#e7e2d8", "#c4bcae"],
  ];
  let body = `<rect width="${W}" height="${H}" fill="#f7f1e8"/>`;
  const cx = W * 0.5;
  const cy = H * 1.02;
  shades.forEach(([light, dark], i) => {
    const angle = -62 + i * 17.5;
    const rad = (angle * Math.PI) / 180;
    body += `<g transform="translate(${cx} ${cy}) rotate(${angle})">
      <rect x="-86" y="-700" width="172" height="700" rx="10" fill="${light}"/>
      ${grainLines({
        id: i % 2 ? "grainC" : "grainA",
        x: -86,
        y: -700,
        w: 172,
        h: 700,
        dark,
        count: 26,
        seed: 7 + i * 11,
        opacity: i % 3 === 2 ? 0.16 : 0.45,
      })}
      <rect x="-86" y="-700" width="172" height="700" rx="10" fill="url(#light)" opacity="0.55"/>
      <rect x="-86" y="-700" width="172" height="700" rx="10" fill="none" stroke="${dark}" stroke-opacity="0.35"/>
    </g>`;
    void rad;
  });
  body += `<rect width="${W}" height="${H}" filter="url(#fibre)" opacity="0.4"/>`;
  return wrap(body, "Decorative laminate sample swatches fanned out");
})();

/* 4 — Veneer -------------------------------------------------------------- */
const veneers = (() => {
  /** Cathedral figure — the arched grain you get from a crown cut. */
  const cathedral = (ox, tone) => {
    let g = `<g filter="url(#grainB)" opacity="0.85">`;
    for (let i = 0; i < 26; i += 1) {
      const spread = 18 + i * 13;
      const top = 120 - i * 16;
      g += `<path d="M${ox - spread} ${H + 40} C ${ox - spread * 0.65} ${
        H * 0.45
      }, ${ox - spread * 0.3} ${top + 130}, ${ox} ${top} C ${ox + spread * 0.3} ${
        top + 130
      }, ${ox + spread * 0.65} ${H * 0.45}, ${ox + spread} ${H + 40}"
        fill="none" stroke="${tone}" stroke-width="${(2.6 - i * 0.05).toFixed(
        2,
      )}" stroke-opacity="${(0.55 - i * 0.012).toFixed(2)}"/>`;
    }
    g += `</g>`;
    return g;
  };

  const straight = (x0, x1, tone) =>
    `<g filter="url(#grainB)" opacity="0.7">` +
    Array.from({ length: 30 }, (_, i) => {
      const x = x0 + ((x1 - x0) / 30) * i;
      return `<rect x="${x.toFixed(1)}" y="-40" width="${(1 + (i % 3) * 0.9).toFixed(
        1,
      )}" height="${H + 80}" fill="${tone}" opacity="${(0.2 + (i % 5) * 0.08).toFixed(2)}"/>`;
    }).join("") +
    `</g>`;

  const body = `
    <rect width="${W}" height="${H}" fill="#c68a4c"/>
    <rect width="${W}" height="${H}" fill="#e0a865" opacity="0.45"/>
    ${straight(0, 300, "#7c4c1e")}
    ${straight(900, 1200, "#7c4c1e")}
    ${cathedral(430, "#6f4118")}
    ${cathedral(770, "#6f4118")}
    <rect x="${W / 2 - 2}" width="4" height="${H}" fill="#5d3612" opacity="0.4"/>
    <rect width="${W}" height="${H}" filter="url(#fibre)" opacity="0.75"/>
    <rect width="${W}" height="${H}" fill="url(#light)"/>`;
  return wrap(body, "Book-matched natural veneer showing real timber grain");
})();

/* 5 — Timber -------------------------------------------------------------- */
const timber = (() => {
  const r = rand(131);
  let body = `<rect width="${W}" height="${H}" fill="#f3ece1"/>
    <rect y="${H * 0.46}" width="${W}" height="${H * 0.54}" fill="#e6dac7"/>`;
  const cols = 5;
  const rows = 4;
  const bw = 196;
  const bh = 150;
  const startX = (W - cols * bw) / 2 + 12;
  const startY = 158;
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const offset = row % 2 ? 34 : 0;
      const x = startX + col * bw + offset;
      const y = startY + row * (bh + 8);
      if (x + bw - 14 > W) continue;
      const tone = mix("#dcb98c", "#bd9161", r());
      const ringTone = mix("#a4713c", "#7d4f22", r());
      body += `<g>
        <rect x="${x}" y="${y}" width="${bw - 16}" height="${bh - 12}" rx="6" fill="${tone}"/>
        <g fill="none" stroke="${ringTone}" stroke-opacity="0.55">`;
      const ecx = x + (bw - 16) * (0.35 + r() * 0.3);
      const ecy = y + (bh - 12) * (0.4 + r() * 0.25);
      for (let k = 1; k <= 6; k += 1) {
        body += `<ellipse cx="${ecx.toFixed(1)}" cy="${ecy.toFixed(1)}" rx="${(k * 13).toFixed(
          1,
        )}" ry="${(k * 10.5).toFixed(1)}" stroke-width="${(2.4 - k * 0.2).toFixed(1)}"/>`;
      }
      body += `</g>
        <ellipse cx="${ecx.toFixed(1)}" cy="${ecy.toFixed(1)}" rx="5" ry="4" fill="${ringTone}" opacity="0.7"/>
        <rect x="${x}" y="${y}" width="${bw - 16}" height="${bh - 12}" rx="6" fill="url(#light)" opacity="0.6"/>
        <rect x="${x}" y="${y}" width="${bw - 16}" height="${bh - 12}" rx="6" fill="none" stroke="#6d4b28" stroke-opacity="0.3"/>
      </g>`;
    }
  }
  body += `<rect width="${W}" height="${H}" filter="url(#fibre)" opacity="0.5"/>`;
  return wrap(body, "Stacked seasoned timber sections seen end-on");
})();

/* 6 — Pre-laminated particle board ---------------------------------------- */
const prelam = (() => {
  const tones = [
    ["#d9c3a4", "#b39a78"],
    ["#8a6f55", "#6b5440"],
    ["#e4ded2", "#c3bcaa"],
    ["#c08b55", "#96683a"],
  ];
  let body = `<rect width="${W}" height="${H}" fill="#f5efe5"/>`;
  tones.forEach(([light, dark], i) => {
    const y = 60 + i * 200;
    body += `<g transform="translate(${i % 2 ? 40 : 90} ${y}) rotate(${i % 2 ? -1.6 : 1.2})">
      <rect width="${W - 190}" height="168" rx="8" fill="${light}"/>
      ${grainLines({
        id: "grainC",
        x: 0,
        y: 0,
        w: W - 190,
        h: 168,
        dark,
        count: 20,
        seed: 31 + i * 9,
        opacity: 0.4,
      })}
      <rect y="150" width="${W - 190}" height="18" fill="${dark}" opacity="0.85"/>
      <rect width="${W - 190}" height="168" rx="8" fill="url(#light)" opacity="0.45"/>
      <rect width="${W - 190}" height="168" rx="8" fill="none" stroke="${dark}" stroke-opacity="0.4"/>
    </g>`;
  });
  body += `<rect width="${W}" height="${H}" filter="url(#chips)" opacity="0.14"/>`;
  return wrap(body, "Pre-laminated particle boards in woodgrain finishes");
})();

/* ------------------------------ gallery set ------------------------------ */

const warehouse = (() => {
  let body = `<rect width="${W}" height="${H}" fill="#f4efe6"/>
    <rect width="${W}" height="${H * 0.16}" fill="#ece3d5"/>`;
  const r = rand(211);
  for (let shelf = 0; shelf < 3; shelf += 1) {
    const y = 150 + shelf * 250;
    body += `<rect x="60" y="${y + 196}" width="${W - 120}" height="18" rx="4" fill="#8b6f52"/>`;
    let x = 78;
    while (x < W - 130) {
      const w = 26 + r() * 30;
      const h = 120 + r() * 74;
      const tone = mix("#dcbd95", "#9c7245", r());
      body += `<g>
        <rect x="${x.toFixed(1)}" y="${(y + 196 - h).toFixed(1)}" width="${w.toFixed(
          1,
        )}" height="${h.toFixed(1)}" fill="${tone}"/>
        <rect x="${x.toFixed(1)}" y="${(y + 196 - h).toFixed(1)}" width="${w.toFixed(
          1,
        )}" height="${h.toFixed(1)}" fill="url(#light)" opacity="0.5"/>
        <rect x="${x.toFixed(1)}" y="${(y + 196 - h).toFixed(1)}" width="${w.toFixed(
          1,
        )}" height="${h.toFixed(1)}" fill="none" stroke="#6d4b28" stroke-opacity="0.28"/>
      </g>`;
      x += w + 6;
    }
  }
  body += `<rect width="${W}" height="${H}" filter="url(#fibre)" opacity="0.45"/>`;
  return wrap(body, "Panel storage racks inside the warehouse");
})();

const edgeDetail = (() => {
  let body = `<rect width="${W}" height="${H}" fill="#e8d9c2"/>`;
  const plies = 9;
  const ph = H / plies;
  for (let i = 0; i < plies; i += 1) {
    const tone = i % 2 ? "#c08b55" : "#e7c99e";
    body += `<rect y="${(i * ph).toFixed(1)}" width="${W}" height="${ph.toFixed(1)}" fill="${tone}"/>
      ${grainLines({
        id: "grainC",
        x: 0,
        y: i * ph,
        w: W,
        h: ph,
        dark: i % 2 ? "#7c4c22" : "#b38350",
        count: 7,
        seed: 3 + i * 13,
        opacity: 0.45,
      })}
      <rect y="${(i * ph).toFixed(1)}" width="${W}" height="2" fill="#6d411c" opacity="0.35"/>`;
  }
  body += `<rect width="${W}" height="${H}" fill="url(#light)"/>
    <rect width="${W}" height="${H}" filter="url(#fibre)" opacity="0.6"/>`;
  return wrap(body, "Close-up of a plywood edge showing its core layers");
})();

const veneerGrain = wrap(
  grainField({
    base: "#b9773c",
    dark: "#5d3612",
    highlight: "#e8b878",
    filter: "grainB",
    lines: 96,
  }),
  "Close view of natural veneer grain and figure",
);

const laminateSwatches = (() => {
  const shades = [
    "#e9d9c2",
    "#b8865a",
    "#f2ece4",
    "#5f4b3a",
    "#d7c4a8",
    "#8f9c8e",
    "#c96f4a",
    "#e7e2d8",
    "#9c7b57",
    "#cfd3cb",
    "#7d5f45",
    "#ead9bd",
  ];
  let body = `<rect width="${W}" height="${H}" fill="#f7f2ea"/>`;
  shades.forEach((shade, i) => {
    const col = i % 4;
    const row = Math.floor(i / 4);
    const x = 84 + col * 266;
    const y = 76 + row * 262;
    body += `<g transform="translate(${x} ${y}) rotate(${(i % 3) - 1})">
      <rect width="230" height="222" rx="12" fill="${shade}"/>
      ${grainLines({
        id: "grainC",
        x: 0,
        y: 0,
        w: 230,
        h: 222,
        dark: mix(shade, "#3a2a1c", 0.55),
        count: 14,
        seed: 5 + i * 7,
        opacity: i % 3 === 0 ? 0.4 : 0.14,
      })}
      <rect width="230" height="222" rx="12" fill="url(#light)" opacity="0.5"/>
      <rect width="230" height="222" rx="12" fill="none" stroke="#6d4b28" stroke-opacity="0.22"/>
    </g>`;
  });
  return wrap(body, "Decorative laminate sample swatches in assorted shades");
})();

/* -------------------------------- write out ------------------------------ */

const files = {
  "public/images/products/calibrated-plywood.svg": calibratedPlywood,
  "public/images/products/mdf-boards.svg": mdf,
  "public/images/products/laminates.svg": laminates,
  "public/images/products/veneers.svg": veneers,
  "public/images/products/wood-timber.svg": timber,
  "public/images/products/pre-laminated-particle-board.svg": prelam,
  "public/images/gallery/plywood-stack.svg": calibratedPlywood,
  "public/images/gallery/laminate-swatches.svg": laminateSwatches,
  "public/images/gallery/veneer-grain.svg": veneerGrain,
  "public/images/gallery/mdf-panels.svg": mdf,
  "public/images/gallery/timber-sections.svg": timber,
  "public/images/gallery/prelam-boards.svg": prelam,
  "public/images/gallery/warehouse.svg": warehouse,
  "public/images/gallery/edge-detail.svg": edgeDetail,
  "public/images/hero-texture.svg": veneerGrain,
  "public/images/about-workshop.svg": warehouse,
  "public/images/cta-texture.svg": edgeDetail,
};

for (const [path, content] of Object.entries(files)) {
  const full = resolve(ROOT, path);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, content, "utf8");
  console.log(`wrote ${path}`);
}
