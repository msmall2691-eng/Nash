#!/usr/bin/env node
/**
 * Photo import pipeline.
 *
 *   1. Drop original photos into `photos-inbox/`, named after the project slug
 *      they belong to (e.g. `maza-mediterranean-grill.jpg`).
 *   2. Run `npm run photos`.
 *
 * For each file this: fixes EXIF rotation, resizes to a sensible max, strips
 * metadata (GPS included — job-site photos often carry client coordinates),
 * writes an optimized JPEG to `public/projects/`, and regenerates the shared
 * blur placeholder map so every card gets a smooth load-in.
 *
 * Pass --watermark to burn a corner credit into the output. That is the only
 * measure here that survives a screenshot; the runtime deterrents in
 * components/ProtectedImage.tsx do not.
 */

import { readdir, mkdir, writeFile, readFile } from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const INBOX = "photos-inbox";
const OUT = "public/projects";
const BLURS = "lib/blur-placeholders.json";
const MAX_WIDTH = 2000;
const WATERMARK = process.argv.includes("--watermark");
const CREDIT = "Nash Construction, LLC";

const IMAGE_RE = /\.(jpe?g|png|webp|avif|heic|tiff?)$/i;

function watermarkSvg(width, height) {
  const size = Math.max(16, Math.round(width * 0.018));
  const pad = Math.round(size * 1.2);
  return Buffer.from(
    `<svg width="${width}" height="${height}">
       <text x="${width - pad}" y="${height - pad}"
             text-anchor="end" font-family="Helvetica, Arial, sans-serif"
             font-size="${size}" fill="#ffffff" fill-opacity="0.62"
             stroke="#000000" stroke-opacity="0.22" stroke-width="0.6"
             paint-order="stroke">${CREDIT}</text>
     </svg>`,
  );
}

async function main() {
  await mkdir(OUT, { recursive: true });
  await mkdir(INBOX, { recursive: true });

  const entries = (await readdir(INBOX)).filter((f) => IMAGE_RE.test(f));

  if (entries.length === 0) {
    console.log(
      `No images in ${INBOX}/.\n` +
        `Drop photos there named after their project slug (e.g. maza-mediterranean-grill.jpg), then re-run.`,
    );
    return;
  }

  // Start from the existing map so a partial import never drops placeholders.
  let blurs = {};
  try {
    blurs = JSON.parse(await readFile(BLURS, "utf8"));
  } catch {
    // First run, or the file was removed — rebuild from scratch.
  }

  for (const file of entries) {
    const slug = path
      .basename(file, path.extname(file))
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const source = path.join(INBOX, file);
    // `rotate()` with no argument applies the EXIF orientation, then we drop
    // metadata entirely so nothing about the job site ships with the photo.
    let pipeline = sharp(source).rotate().resize({
      width: MAX_WIDTH,
      withoutEnlargement: true,
    });

    if (WATERMARK) {
      const { width, height } = await pipeline.clone().toBuffer({ resolveWithObject: true })
        .then(({ info }) => info);
      pipeline = pipeline.composite([{ input: watermarkSvg(width, height), top: 0, left: 0 }]);
    }

    const out = path.join(OUT, `${slug}.jpg`);
    const { width, height, size } = await pipeline
      .jpeg({ quality: 82, mozjpeg: true, progressive: true })
      .toFile(out);

    const tiny = await sharp(source).rotate().resize(16, 12, { fit: "cover" }).jpeg({ quality: 45 }).toBuffer();
    blurs[slug] = `data:image/jpeg;base64,${tiny.toString("base64")}`;

    console.log(
      `✓ ${slug.padEnd(30)} ${String(width).padStart(4)}×${String(height).padEnd(4)}  ${(size / 1024).toFixed(0)} KB${WATERMARK ? "  [watermarked]" : ""}`,
    );
  }

  await writeFile(BLURS, JSON.stringify(blurs, null, 2) + "\n");
  console.log(`\nUpdated ${BLURS}. Add or update the matching entries in lib/projects.ts.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
