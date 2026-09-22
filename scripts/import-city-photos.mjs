#!/usr/bin/env node
/**
 * City-photo import pipeline — the sibling of `import-photos.mjs` for
 * Nashua photographs that aren't a specific Nash project (the home hero, the
 * "photos of the city" marquee).
 *
 *   1. Drop originals into `city-photos-inbox/`, named after the slug the
 *      photo should be served under (e.g. `main-street-courthouse.jpg`).
 *   2. Run `npm run city-photos`.
 *
 * Same treatment as project photos and for the same reasons: EXIF rotation
 * fixed, resized, all metadata (GPS included) stripped, written as an
 * optimized progressive JPEG, and a blur placeholder generated. Output goes
 * to `public/city/` and the shared `lib/blur-placeholders.json` — city photos
 * and project photos share that map since their slugs live in different
 * directories and can never collide.
 *
 * These are licensed photographs of the city, not Nash's own project work —
 * `--watermark` does not apply here, and unlike `import-photos.mjs`, there is
 * no `--watermark` flag. Record each photo's source and license in the
 * README right beside the others when you add one.
 */

import { readdir, mkdir, writeFile, readFile } from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const INBOX = "city-photos-inbox";
const OUT = "public/city";
const BLURS = "lib/blur-placeholders.json";
const MAX_WIDTH = 1600;

const IMAGE_RE = /\.(jpe?g|png|webp|avif|heic|tiff?)$/i;

async function main() {
  await mkdir(OUT, { recursive: true });
  await mkdir(INBOX, { recursive: true });

  const entries = (await readdir(INBOX)).filter((f) => IMAGE_RE.test(f));

  if (entries.length === 0) {
    console.log(
      `No images in ${INBOX}/.\n` +
        `Drop photos there named after the slug they should be served under, then re-run.`,
    );
    return;
  }

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
    const pipeline = sharp(source).rotate().resize({
      width: MAX_WIDTH,
      withoutEnlargement: true,
    });

    const out = path.join(OUT, `${slug}.jpg`);
    const { width, height, size } = await pipeline
      .jpeg({ quality: 82, mozjpeg: true, progressive: true })
      .toFile(out);

    const tiny = await sharp(source).rotate().resize(16, 12, { fit: "cover" }).jpeg({ quality: 45 }).toBuffer();
    blurs[slug] = `data:image/jpeg;base64,${tiny.toString("base64")}`;

    console.log(`✓ ${slug.padEnd(30)} ${String(width).padStart(4)}×${String(height).padEnd(4)}  ${(size / 1024).toFixed(0)} KB`);
  }

  await writeFile(BLURS, JSON.stringify(blurs, null, 2) + "\n");
  console.log(`\nUpdated ${BLURS}. Add the matching entries to the city photo list in app/page.tsx.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
