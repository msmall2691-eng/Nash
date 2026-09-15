# Nash Construction — New Hampshire

Premium marketing site for a NH custom-home builder. Next.js 16 (App Router),
React 19, TypeScript (strict), Tailwind CSS v4.

## Getting started

```bash
npm install
cp .env.example .env.local   # optional — the site runs without it
npm run dev
```

The contact and estimator forms work with **no configuration**: without a
`RESEND_API_KEY` the email step logs the lead to the server console instead of
sending, so the full submit → validate → success flow is exercisable locally.

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
  page.tsx            Home
  about/ services/ gallery/ contact/
  actions/contact.ts  Server Action behind both forms
  sitemap.ts robots.ts icon.svg not-found.tsx
components/
  Navbar  Footer  JsonLd  FormField
  ContactForm         useActionState + useFormStatus, animated success state
  EstimatorForm       Live cost calculator that submits via the same action
  GalleryGrid         Stateful filtering grid
  GalleryFilter       Pill-shaped filter menu
lib/
  site.ts             Brand, NAP, service areas — the SEO source of truth
  metadata.ts         Per-page Metadata factory
  schema.ts           Schema.org builders
  validation.ts       Zod schemas + shared form-state types
  email.ts            Resend integration (degrades to logging)
  rate-limit.ts       In-memory submission throttle
  projects.ts services.ts
```

### SEO

`lib/site.ts` is the single source of truth. Add a town to `serviceAreas` and it
propagates automatically to the keyword set, the JSON-LD `areaServed` graph, the
footer, and the form's town selector. Routes call `pageMetadata()` rather than
hand-rolling OpenGraph/canonical blocks, and `sitemap.ts` derives from the nav.

Structured data shipped in the initial HTML: `LocalBusiness` (as
`GeneralContractor`), `WebSite`, per-service `Service` nodes, gallery `ItemList`,
`ContactPage`, and `BreadcrumbList`.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical origin for metadata + JSON-LD |
| `RESEND_API_KEY` | For live email | Resend API key |
| `CONTACT_FROM_EMAIL` | For live email | Verified sender on your Resend domain |
| `CONTACT_TO_EMAIL` | For live email | Where estimate requests are delivered |

## Deployment

The app builds to fully static routes plus one Server Action endpoint, so it runs
on any Node host.

**Vercel** — import the repo, framework auto-detects as Next.js, no build config
needed. Add the environment variables above under Settings → Environment
Variables. Every push to the production branch deploys; every PR gets its own
preview URL.

**Railway** — create a service from the repo. Railway's Node detection runs
`npm run build`, then set the start command to `npm run start -- -p $PORT` so it
binds Railway's injected port. Add the same environment variables.

Set `NEXT_PUBLIC_SITE_URL` to the real domain before launch — canonical URLs,
the sitemap and the JSON-LD `@id` all derive from it.

## Placeholder assets

`public/projects/*.jpg` are generated abstract placeholders, and the eight
projects in `lib/projects.ts` are illustrative. Swap both for real photography
and real job data before going live; keep the `blurDataURL` values in sync via
`lib/blur-placeholders.json`.
