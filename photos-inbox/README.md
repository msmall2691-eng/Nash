# Photo inbox

Drop original project photos here, then run:

```bash
npm run photos              # import
npm run photos -- --watermark   # import with a burned-in credit
```

**Name each file after its project slug.** The slug is the `slug` field in
`lib/projects.ts` — e.g. `maza-mediterranean-grill.jpg`, `girls-inc.jpg`.

The script fixes rotation, resizes, **strips EXIF including GPS coordinates**,
writes an optimized JPEG into `public/projects/`, and regenerates
`lib/blur-placeholders.json`.

Originals in this folder are not published — only the processed output in
`public/projects/` ships. Keep the originals somewhere safe regardless.
