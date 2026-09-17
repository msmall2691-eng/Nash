# Nash Construction, LLC — Nashua, NH

Marketing site for a commercial and industrial general contractor serving
southern New Hampshire since 1976. Next.js 16 (App Router), React 19,
TypeScript (strict), Tailwind CSS v4.

## ⚠️ Before this goes live

**One project still needs a photograph:** Girls Inc. Photoless projects render
a branded "Photography coming soon" panel rather than filler imagery, and are
excluded from the image sitemap. Drop a photo into `photos-inbox/girls-inc.jpg`,
run `npm run photos`, and set `hasPhoto: true` on that entry.

**Confirm these conflicts.** Public sources disagree with each other:

| Item | Their website | Google / Yelp / directories | Using |
| --- | --- | --- | --- |
| Phone | 603-943-7593 | (603) 882-2702 | Website number |
| Founded | — | "1974" (directories) | 1976 (per BBB) |

Office hours are deliberately not published anywhere on the site, per the
owner's request.

**Local SEO — the biggest single win available.** The Google Business Profile is
**unclaimed** ("Own this business?") and is filed under *Nash Group* with a phone
number that does not match the website. Yelp is unclaimed too. Google's local
pack ranks heavily on NAP (name/address/phone) consistency across citations, so
claiming both listings and making the name and number match this site will do
more for local visibility than anything in this codebase.

Also confirm:

- `site.geo` — approximate downtown Nashua coordinates; check against the Google
  Business Profile pin so the marker lands on 40 Temple Street.
- `NEXT_PUBLIC_SITE_URL` — canonical URLs, sitemaps and the JSON-LD `@id` derive
  from it.
- **Positioning:** the site markets commercial + industrial, but three of the
  supplied photos are residential (garages, a screened porch) and directories
  list residential remodeling. A `Residential` sector now exists. Decide whether
  to market it or drop those projects.
- **Do not link the "Nash Construction & Remodeling" Facebook page** — that is a
  different Nashua contractor. No Facebook page was found for this business.

## Getting started

```bash
npm install
cp .env.example .env.local   # optional — the site runs without it
npm run dev
```

The consultation form works with **no configuration**: without a `RESEND_API_KEY`
the email step logs the lead to the server console instead of sending, so the
full submit → validate → success flow is exercisable locally.

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server on :3000 |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (flat config, `eslint-config-next`) |
| `npm run typecheck` | `tsc --noEmit` |

## Layout

```
app/
  layout.tsx          Root layout — metadata + LocalBusiness JSON-LD
  page.tsx            Home: hero → credibility → markets → services
                      → featured projects → service area → CTA
  commercial/         Commercial Construction (SEO landing page)
  industrial/         Industrial Construction (SEO landing page)
  services/           The five capability groups
  projects/           Filterable portfolio
  about/              History, leadership, process
  contact/            Request a Consultation
  actions/contact.ts  Server Action behind the form
  sitemap.ts robots.ts icon.svg not-found.tsx
components/
  Navbar  Footer  JsonLd  FormField  Amp
  ContactForm         useActionState + useFormStatus, animated success state
  GalleryGrid         Stateful sector-filtered project grid
  GalleryFilter       Pill-shaped filter menu
lib/
  site.ts             Brand, NAP, leadership, service areas — SEO source of truth
  services.ts         The five service groups and their trades
  projects.ts         Portfolio data (see "Adding projects" below)
  metadata.ts         Per-page Metadata factory
  schema.ts           Schema.org builders
  validation.ts       Zod schemas + shared form-state types
  email.ts            Resend integration (degrades to logging)
  rate-limit.ts       In-memory submission throttle
```

## Hero image

`public/hero/nashua-downtown.jpg` is downtown Nashua — Main Street at West
Pearl, looking at the Masonic building. Source: Wikimedia Commons,
"Main_at_West_Pearl_St_Nashua.jpg" by MarkBuckawicki, released under **CC0 1.0**
(public domain dedication — no attribution required, commercial use permitted).

It is processed to 1920x990, desaturated, and rendered at 45% opacity under a
heavy gradient. It is deliberately a *sense-of-place backdrop*, not a project
photo — swap it for real site photography when there is a strong wide shot.

## Photos

Real photography never goes in the repo by hand. Put originals in
`photos-inbox/`, named after the project slug, then:

```bash
npm run photos                  # import
npm run photos -- --watermark   # import with a burned-in credit
```

The script fixes EXIF rotation, resizes to 2000px, **strips all metadata
including GPS** (job-site photos routinely carry client coordinates), writes an
optimized progressive JPEG to `public/projects/`, and regenerates
`lib/blur-placeholders.json`. Then set `hasPhoto: true` on that project in
`lib/projects.ts` so it enters the image sitemap and gets `ImageObject` data.

### Image protection — what it does and doesn't do

`components/ProtectedImage.tsx` blocks the three one-gesture saves: right-click
→ Save image as, drag-to-desktop, and iOS/Android long-press. A transparent
shield sits over the bitmap so the context menu never targets the `<img>`.

It is **deterrence, not protection.** Screenshots, DevTools, the network panel,
or disabling JavaScript all still get the file. Any image a browser renders, a
determined person can keep. The only measure that survives a screenshot is a
visible watermark — hence the `--watermark` flag.

None of this costs SEO: crawlers read `src` and `alt` from the HTML and never
fire these handlers, so Google Images indexes normally.

### Image SEO

- Alt text is generated from each project record (`altFor` in `GalleryGrid`), so
  it can never drift from the caption on screen.
- `/image-sitemap.xml` lists photographed projects with titles and captions, and
  is referenced from `robots.txt`.
- Each photographed project emits an `ImageObject` node with `creditText`,
  `copyrightNotice` and an `acquireLicensePage` pointing at `/contact` — which
  is also how you assert ownership of the image to Google.
- Only projects with `hasPhoto: true` are submitted. Placeholders are excluded
  deliberately; submitting filler wastes crawl budget.

## External profiles

`socialProfiles` in `lib/site.ts` drives the footer links, the contact page, and
the JSON-LD `sameAs` array in one place. An entry with `url: null` is skipped
rather than rendered as a dead link, so adding a Facebook page later is a
one-line change that updates every surface at once.

Currently linked: BBB, Google Business Profile, Yelp, Houzz, Procore.

## Adding projects

`lib/projects.ts` carries the five clients from the previous site. Their scope
details are deliberately left blank rather than guessed — these are real
businesses, and invented specifics would put unverifiable claims on the site.

Every field except `slug`, `title` and `sector` is optional and renders only when
present, so a name-and-sector entry looks finished today and gets richer as Karen
or Steve confirm details. To add a project:

1. Drop a photo at `public/projects/<slug>.jpg`
2. Add a blur placeholder for that slug to `lib/blur-placeholders.json`
3. Append an entry to `seeds` in `lib/projects.ts`

A new `sector` value automatically appears as a filter pill once a project uses
it — the Industrial and Municipal pills are already wired up and will light up
as soon as work is added under them.

## SEO

`lib/site.ts` is the single source of truth. Add a town to `serviceAreas` and it
propagates automatically to the keyword set, the JSON-LD `areaServed` graph, the
footer, and the form's town selector. Routes call `pageMetadata()` rather than
hand-rolling OpenGraph/canonical blocks, and `sitemap.ts` derives from the nav.

Structured data shipped in the initial HTML: `LocalBusiness` (as
`GeneralContractor`) carrying the 1976 founding date, leadership, BBB
accreditation and 31 trades; plus `WebSite`, per-group `Service` nodes,
dedicated `Service` nodes for the Commercial and Industrial pages, a portfolio
`ItemList`, `ContactPage`, and `BreadcrumbList`.

The headline year count is computed from `FOUNDED_YEAR`, so "50 Years" stays
accurate without an annual copy edit.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical origin for metadata + JSON-LD |
| `RESEND_API_KEY` | For live email | Resend API key |
| `CONTACT_FROM_EMAIL` | For live email | Verified sender on your Resend domain |
| `CONTACT_TO_EMAIL` | For live email | Where consultation requests are delivered |

## Deployment

The app builds to fully static routes plus one Server Action endpoint, so it runs
on any Node host.

**Vercel** — import the repo, framework auto-detects as Next.js, no build config
needed. Add the environment variables above under Settings → Environment
Variables. Every push to the production branch deploys; every PR gets a preview.

**Railway** — create a service from the repo. No start-command override is
needed: `npm run start` binds `$PORT` when the platform injects one and falls
back to 3000 locally. Add the same environment variables.

## Brand

The logo in `public/logo/` is traced from the supplied CorelDRAW EPS at 1200 dpi
— true vector, sharp at any size. `nash-mark.svg` is the tile, `nash-lockup.svg`
the full lockup with the address block, and `nash-mark-currentcolor.svg` a
knockout variant that takes its colour from CSS. `components/NashMark.tsx`
inlines the mark so the header paints with no extra request.

The accent palette is the brand's own colour: the EPS declares **PANTONE 216 C**
as CMYK 0.12 0.96 0.26 0.50, which converts to **#7e0843**. That is
`--color-brand-600` in `app/globals.css` and the Pantone itself.

The lighter steps are not decoration — #7e0843 is too dark to read on the
near-black sections, so `brand-300` carries accents there. Every pairing in use
clears WCAG AA:

| Pairing | Ratio |
| --- | --- |
| White on brand-700 (buttons) | 13.6:1 |
| White on brand-600 (hover) | 10.5:1 |
| brand-700 on granite-50 (eyebrows) | 12.7:1 |
| granite-300 on granite-950 (dark labels) | 9.3:1 |

Two rules hold the palette together. Solid fills take **brand-700**, the deeper
step: the Pantone itself reads magenta at button size. And burgundy never
appears as a tint on the dark sections — lightening it enough to read there
turns it pink, so those surfaces use warm neutrals and burgundy stays in solid
fills where it is unmistakably burgundy.

## Note on typography

The display face is **Roboto Slab**. A slab serif keeps weight and structure at
heading sizes — sturdy and industrial without being aggressive — and shares a
serif skeleton with the wordmark in the logo. It replaced a high-contrast
display serif that read soft and elegant, which was the wrong register for a
commercial and industrial contractor.

That swap also retired a workaround: the previous face's only ampersand was a
decorative swash that read as a registered-trademark mark, so a component
substituted the glyph. Roboto Slab draws a conventional ampersand, so the
component is gone.
