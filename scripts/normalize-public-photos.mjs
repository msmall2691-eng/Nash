#!/usr/bin/env node
/**
 * Normalizes photographs already sitting in `public/projects/`.
 *
 * `import-photos.mjs` is the front door: originals go into `photos-inbox/` and
 * come out stripped, rotated and resized. A photo uploaded through the /admin
 * editor skips that entirely — Decap commits the file straight to the
 * repository through the GitHub API — so this is the same treatment applied
 * after the fact, run by .github/workflows/normalize-photos.yml.
 *
 * It is deliberately idempotent: a file that is already normalized is detected
 * and left alone, so the workflow does not rewrite every photo on every push
 * and does not fight its own commit.
 */

import { readdir, readFile, writeFile, stat } from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const DIR = "public/projects";
const BLURS = "lib/blur-placeholders.json";
const MAX_WIDTH = 2000;
const IMAGE_RE = /\.(jpe?g|png|webp|avif|heic|tiff?)$/i;

/**
 * Metadata that must never ship. `sharp` drops everything by default, so the
 * test for "already clean" is the absence of these blocks plus a sane width.
 */
function carriesMetadata(meta) {
  return Boolean(meta.exif || meta.icc || meta.iptc || meta.xmp);
}

async function main() {
  let files;
  try {
    files = (await readdir(DIR)).filter((f) => IMAGE_RE.test(f));
  } catch {
    console.log(`No ${DIR}/ directory — nothing to do.`);
    return;
  }

  let blurs = {};
  try {
    blurs = JSON.parse(await readFile(BLURS, "utf8"));
  } catch {
    // Missing or unreadable: rebuilt below from whatever we process.
  }

  let changed = 0;
  let skipped = 0;

  for (const file of files) {
    const source = path.join(DIR, file);
    const slug = path.basename(file, path.extname(file));
    const meta = await sharp(source).metadata();

    const needsStrip = carriesMetadata(meta);
    const needsResize = (meta.width ?? 0) > MAX_WIDTH;
    const needsJpeg = meta.format !== "jpeg";
    const missingBlur = !blurs[slug];

    if (!needsStrip && !needsResize && !needsJpeg && !missingBlur) {
      skipped++;
      continue;
    }

    const before = (await stat(source)).size;

    // Read into a buffer first: writing to the path we are reading from
    // truncates the source mid-pipeline.
    const input = await readFile(source);
    const output = await sharp(input)
      // No argument applies the EXIF orientation before metadata is dropped,
      // so a phone photo does not end up sideways once its EXIF is gone.
      .rotate()
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true, progressive: true })
      .toBuffer();

    const target = path.join(DIR, `${slug}.jpg`);
    await writeFile(target, output);

    const tiny = await sharp(input)
      .rotate()
      .resize(16, 12, { fit: "cover" })
      .jpeg({ quality: 45 })
      .toBuffer();
    blurs[slug] = `data:image/jpeg;base64,${tiny.toString("base64")}`;

    const reasons = [
      needsStrip && "metadata",
      needsResize && "oversized",
      needsJpeg && `was ${meta.format}`,
      missingBlur && "no blur",
    ].filter(Boolean);

    console.log(
      `✓ ${slug.padEnd(30)} ${(before / 1024).toFixed(0)} KB → ${(output.length / 1024).toFixed(0)} KB  (${reasons.join(", ")})`,
    );
    changed++;
  }

  if (changed > 0) {
    await writeFile(BLURS, JSON.stringify(blurs, null, 2) + "\n");
  }

  console.log(`\n${changed} normalized, ${skipped} already clean.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
