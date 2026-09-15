# Nash Construction, LLC — Nashua, NH

Marketing site for a commercial and industrial general contractor serving
southern New Hampshire since 1976. Next.js 16 (App Router), React 19,
TypeScript (strict), Tailwind CSS v4.

## ⚠️ Before this goes live

Two values in `lib/site.ts` are **placeholders, not real contact details**:

| Field | Current placeholder | Needs |
| --- | --- | --- |
| `site.phone` / `phoneDisplay` | `(603) 555-0100` | The real office number |
| `site.email` | `info@nashconstructionllc.com` | The real inbox |

Also confirm before launch:

- `site.geo` — approximate downtown Nashua coordinates; check against the Google
  Business Profile pin so the map marker lands on 40 Temple Street.
- `NEXT_PUBLIC_SITE_URL` — canonical URLs, the sitemap and the JSON-LD `@id` all
  derive from it.
- `public/projects/*.jpg` are generated abstract placeholders, not photography.

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

**Railway** — create a service from the repo. Railway's Node detection runs
`npm run build`; set the start command to `npm run start -- -p $PORT` so it binds
Railway's injected port. Add the same environment variables.

## Note on typography

`components/Amp.tsx` renders ampersands in the sans face inside display type.
Fraunces' only ampersand is a decorative swash that reads as a registered-
trademark mark at heading sizes, and no stylistic set replaces it — so the glyph
is swapped rather than the copy rewritten.
