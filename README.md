# Nash Construction, LLC — Nashua, NH

Marketing site for a commercial and industrial general contractor serving
southern New Hampshire since 1976. Next.js 16 (App Router), React 19,
TypeScript (strict), Tailwind CSS v4.

**Non-technical summary:** [WEBSITE-GUIDE.md](./WEBSITE-GUIDE.md) — what the site
does and how quickly it can be changed, written for the client rather than for a
developer.

## ⚠️ Before this goes live

**One project still needs a photograph:** Girls Inc. Photoless projects render
a branded "Photography coming soon" panel rather than filler imagery, and are
excluded from the image sitemap. Drop a photo into `photos-inbox/girls-inc.jpg`,
run `npm run photos`, and set `hasPhoto: true` on that entry.

**Officers (settled, Sept 2026).** Stephen Boilard is President. Mark Nash
founded the business and is retired, so he is recorded as `founder` in
`lib/site.ts` and credited in the 1976 milestone, but is deliberately absent
from `leadership` and from the JSON-LD `employee` list — both describe who runs
the business now. The About page's leadership grid adapts to the count, so
adding a second officer needs no layout change.

**Three service promises need the client's sign-off.** These are commitments the
business has to honour, and nobody has confirmed them — they were written as
plausible marketing and left in place deliberately rather than deleted, because
narrowing what the site offers is the client's call:

- "a number that gets answered when something fails after hours" (home, /services)
- "Emergency work gets triaged the day it comes in" (/services, /contact)
- "We reply to every request within one business day" (/contact, and the form's
  success panel)

Note the mild tension with the owner's request to publish no office hours.

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
- **Positioning:** resolved — residential is marketed openly. It has its own
  landing page at `/residential`, its own market filter, and five projects.
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
  Navbar  Footer  JsonLd  FormField  NashMark  BbbBadge  SocialLinks
  ContactForm         useActionState + useFormStatus, animated success state
  GalleryGrid         Project grid, filtered from the URL (see "Deep links")
  GalleryFilter       Pill-shaped filter menu
  ProjectLightbox     Native <dialog> enlargement, arrow-key navigation
  ProtectedImage      Next <Image> plus download deterrents
  ServiceAreaCheck    "Do we work in your town?" widget
  NashuaConditions    One quiet line of live Nashua weather in the footer
lib/
  site.ts             Brand, NAP, leadership, service areas — SEO source of truth
  services.ts         The five service groups and their trades
  projects.ts         Portfolio data (see "Adding projects" below)
  service-area.ts     Town lookup behind ServiceAreaCheck
  weather.ts          Open-Meteo current conditions (no API key)
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

## Deep links into the portfolio

`/projects` reads its filters from the query string rather than from component
state, so any filtered view is a real, linkable URL:

| URL | Shows |
| --- | --- |
| `/projects` | Everything |
| `/projects?market=commercial` | Commercial only |
| `/projects?market=industrial` | Industrial only |
| `/projects?market=residential` | Residential only |
| `/projects?sector=Restaurant` | One sector across all markets |

The Commercial, Industrial and Residential pages and the home page's featured
cards all link to the matching filtered view, so "see more of this work" lands
on that work rather than on the full grid. An unrecognised value falls back to
"All" instead of erroring, and clicking a pill rewrites the URL with
`router.replace(..., { scroll: false })` — the back button still works and the
page does not jump.

`market` is derived from `sector`, never stored on a project, so a project can
never be filed under a market that contradicts its type. The Type row is hidden
when the selected market only contains one type, where a second row would just
repeat the first.

## Live weather

`lib/weather.ts` reads current conditions for the office coordinates from
**Open-Meteo** and `components/NashuaConditions.tsx` renders them as a single
line in the footer: *"Nashua right now · 70°F, clear"*. When conditions would
actually stop exterior work — freezing, snow, heavy rain, thunderstorms — it
adds *"— a day we plan around"* and marks the dot in the brand colour.

Why Open-Meteo: no API key, no account, no billing relationship, and free for
commercial use. There is nothing to add to the host's environment variables and
nothing anyone has to rotate. NOAA's `api.weather.gov` is the other keyless
option and is a reasonable swap if the source ever needs to change.

It is cached for 30 minutes (`next: { revalidate: 1800 }`), so traffic volume
does not change the number of upstream calls, and it carries a 4-second timeout.
**Every failure path returns `null` and the line simply does not render.** A
weather outage must never be able to break a contractor's website — the
`<Suspense fallback={null}>` around it in the footer means it cannot block the
page either.

This is why the build reports a 30-minute revalidate on every route. The pages
are still prerendered; they just refresh in the background on that interval.

## Service-area checker

`components/ServiceAreaCheck.tsx` sits in the home page's "Where we work"
section and answers the first question most visitors have. Type a town, get an
immediate answer:

- **A town we serve** → "Yes — Bedford, NH is in our Manchester Area service
  area," plus a link to `/contact?town=Bedford` that arrives with the town
  already selected in the form.
- **Anything else** → an honest "not on our published list — but the list is
  where we work most, not a boundary," with the phone number.

Everything it knows comes from `serviceAreas` in `lib/site.ts`, so it cannot
promise coverage the business has not claimed, and adding a town there teaches
the checker about it with no second list to maintain. `lib/service-area.ts`
folds away case and punctuation, strips a trailing state ("Nashua NH"), offers
suggestions from two characters on, and carries a short alias map for the
spellings locals actually use (Tyngsboro, Mt Vernon).

The `?town=` parameter is validated against the select's own options before it
is applied, so it cannot inject a value the form does not contain.

Deliberately **not** an estimator. Quoting construction work from a web form
requires numbers this business has not published, and inventing them would put
a price in a customer's head that no project manager agreed to.

## External profiles

`socialProfiles` in `lib/site.ts` drives the footer links, the contact page, and
the JSON-LD `sameAs` array in one place. An entry with `url: null` is skipped
rather than rendered as a dead link, so adding a Facebook page later is a
one-line change that updates every surface at once.

Currently linked: BBB, Houzz, Yelp, Procore. The Google entry is present but
`null` — see the note in `lib/site.ts` about why.

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

## Email delivery

`lib/email.ts` wraps Resend behind a narrow interface, and with no
`RESEND_API_KEY` present it degrades to a logged no-op rather than throwing — so
local dev, CI and preview builds exercise the full submit → validate → success
path without credentials. **That is the current production state: the form
confirms but nothing is delivered.**

Resend rather than the client's own Google Workspace, deliberately:

| | Gmail App Password (`smtp.gmail.com`) | Resend API key |
| --- | --- | --- |
| Cost | Free | Free — 3,000/mo, 100/day, 3 domains |
| Limit | 2,000/day | 100/day |
| DNS changes | None | 3 records on a subdomain |
| What a leaked credential grants | Send as that mailbox, to anyone | Send from one verified domain, nothing else |
| Revocation | Touches their Google account | One click, invisible to Google |

Google's SMTP relay (`smtp-relay.gmail.com`, 10,000/day, free with Workspace) is
the option Google itself recommends and does not fit here: it authenticates by
source IP, and Vercel's functions have no stable one to allowlist.

If the client would rather not touch DNS, swapping in nodemailer against
`smtp.gmail.com` is a change confined to `sendEstimateNotification` — the server
action, the validation and the UI are all provider-agnostic already.

**The rule that outlives the provider choice:** `from` must be an address on a
domain we control and `replyTo` carries the visitor's address. Sending `from`
the visitor's own address fails SPF and DMARC at the receiving end, because we
are not authorised to send as gmail.com. `lib/email.ts` is already built this
way; keep it that way.

Verify the DNS records on a subdomain (`send.nashconstructionnh.com`) so the
root SPF and MX records that Google Workspace owns are never touched — their
mail keeps flowing throughout, and it can be set up while the Wix site is still
live on the apex.

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

**Vercel** — currently deployed here, as project `nash` under
`msmall2691-engs-projects`, linked to this repo. Framework auto-detects as
Next.js, no build config needed. Add the environment variables above under
Settings → Environment Variables. Every push to `main` deploys; every branch
gets a preview.

Review URL: https://nash-alpha.vercel.app — deployment protection is off, so it
is shareable.

**Indexing is gated on the domain, not on a flag.** While the project's
production domain is still a `*.vercel.app` host, every page emits
`noindex, nofollow`; attach nashconstructionnh.com and the same build emits
`index, follow`. `isCanonicalDeployment` in `lib/site.ts` derives this from
Vercel's `VERCEL_PROJECT_PRODUCTION_URL`, so it flips itself when the domain is
connected — there is nothing to remember and nothing to unset.

A canonical tag alone would not have been enough: Google treats it as a hint and
is free to index the vercel.app copy anyway, which is precisely the duplicate
that would compete with the real domain for the business's own name. Note the
deliberate choice of `noindex` over a `robots.txt` disallow — a disallowed page
cannot be crawled, so the `noindex` would never be read, and URLs discovered
elsewhere can still be indexed.

Verified across all three states: production URL unset → `index, follow`;
`nash-alpha.vercel.app` → `noindex, nofollow`; `www.nashconstructionnh.com` →
`index, follow`.

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
