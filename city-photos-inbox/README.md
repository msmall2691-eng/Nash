# City photo inbox

Drop original Nashua city photos here (hero, marquee), then run:

```bash
npm run city-photos
```

**Name each file after the slug it should be served under** — e.g.
`main-street-courthouse.jpg`. That slug is what you reference from
`public/city/<slug>.jpg` in `app/page.tsx`.

The script fixes rotation, resizes, **strips EXIF including GPS
coordinates**, writes an optimized JPEG into `public/city/`, and regenerates
`lib/blur-placeholders.json`.

Unlike `photos-inbox/` (Nash's own project photography), these are
photographs *of the city* sourced from elsewhere — record each one's source
and license in the README when you add it. Originals in this folder are not
published — only the processed output in `public/city/` ships. Keep the
originals somewhere safe regardless.
