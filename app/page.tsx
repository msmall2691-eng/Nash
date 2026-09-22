import Link from "next/link";

import { BbbBadge } from "@/components/BbbBadge";
import type { CityPhoto } from "@/components/CityMarquee";
import { HeroCarousel, type HeroPhoto } from "@/components/HeroCarousel";
import { PhotoCredits } from "@/components/PhotoCredits";
import { ProtectedImage } from "@/components/ProtectedImage";
import { ServiceAreaCheck } from "@/components/ServiceAreaCheck";
import { SocialLinks } from "@/components/SocialLinks";
import blurPlaceholders from "@/lib/blur-placeholders.json";
import { featuredProjects } from "@/lib/projects";
import { serviceGroups } from "@/lib/services";
import { FOUNDED_YEAR, serviceAreas, site, testimonials, yearsInBusiness } from "@/lib/site";

const heroBlur = (blurPlaceholders as Record<string, string>)["nashua-downtown"];

const CC_BY_SA = { label: "CC BY-SA", url: "https://creativecommons.org/licenses/by-sa/2.0" };
const CC_BY_SA_4 = { label: "CC BY-SA 4.0", url: "https://creativecommons.org/licenses/by-sa/4.0" };

/**
 * More of the city than one hero photo can hold — a scrolling strip on the
 * home page. Sourced from Wikimedia Commons, the same standard the hero photo
 * was held to: real photographs of Nashua, provenance and license recorded
 * here and credited on the page itself (`CityMarquee`'s "Photo credits").
 */
const cityPhotos: CityPhoto[] = [
  {
    src: "/city/deschenes-oval.jpg",
    alt: "Deschenes Oval and the World War II Memorial at Railroad Square, Nashua, New Hampshire",
    blurDataURL: (blurPlaceholders as Record<string, string>)["deschenes-oval"],
    credit: {
      name: "Sluglife6826",
      url: "https://commons.wikimedia.org/wiki/File:Deschenes_Oval,_World_War_II_Memorial_-_Railroad_Square_-_Nashua,_New_Hampshire.jpg",
    },
  },
  {
    src: "/city/mill-canal-falls.jpg",
    alt: "The mill canal and falls behind the former train repair facility in downtown Nashua, New Hampshire",
    blurDataURL: (blurPlaceholders as Record<string, string>)["mill-canal-falls"],
    credit: {
      name: "Jane023",
      url: "https://commons.wikimedia.org/wiki/File:Former_train_repair_facility,_downtown_Nashua,_NH_01.jpg",
      license: CC_BY_SA_4,
    },
  },
  {
    src: "/city/main-street-deco-building.jpg",
    alt: "A commercial building on Main Street, Nashua, New Hampshire",
    blurDataURL: (blurPlaceholders as Record<string, string>)["main-street-deco-building"],
    credit: {
      name: "Dougtone",
      url: "https://commons.wikimedia.org/wiki/File:Nashua,_New_Hampshire_-_8225898859.jpg",
      license: CC_BY_SA,
    },
  },
  {
    src: "/city/canal-reflection.jpg",
    alt: "The Nashua River canal running behind downtown Nashua, New Hampshire",
    blurDataURL: (blurPlaceholders as Record<string, string>)["canal-reflection"],
    credit: {
      name: "Jane023",
      url: "https://commons.wikimedia.org/wiki/File:Former_train_repair_facility,_downtown_Nashua,_NH_02.jpg",
      license: CC_BY_SA_4,
    },
  },
  {
    src: "/city/main-street-storefronts.jpg",
    alt: "Storefronts along Main Street, Nashua, New Hampshire",
    blurDataURL: (blurPlaceholders as Record<string, string>)["main-street-storefronts"],
    credit: {
      name: "Dougtone",
      url: "https://commons.wikimedia.org/wiki/File:Nashua,_New_Hampshire_-_8225899003.jpg",
      license: CC_BY_SA,
    },
  },
  {
    src: "/city/main-street-bank-building.jpg",
    alt: "A former bank building on Main Street, Nashua, New Hampshire",
    blurDataURL: (blurPlaceholders as Record<string, string>)["main-street-bank-building"],
    credit: {
      name: "Dougtone",
      url: "https://commons.wikimedia.org/wiki/File:Nashua,_New_Hampshire_-_8225899181.jpg",
      license: CC_BY_SA,
    },
  },
];

/**
 * The rotating hero: the same brightened downtown photo Steve first saw,
 * followed by the same licensed Nashua photos the scrolling strip used —
 * here read as "movement and images of Nashua" belonging in the header
 * itself, the alternate to that separate strip lower on the page.
 */
const heroPhotos: HeroPhoto[] = [
  { src: "/hero/nashua-downtown.jpg", alt: "Downtown Nashua, New Hampshire, where Nash Construction has built since 1976", blurDataURL: heroBlur },
  ...cityPhotos.map(({ src, alt, blurDataURL }) => ({ src, alt, blurDataURL })),
];

/**
 * Facts worth stating plainly, immediately under the hero.
 *
 * Each one is checkable — a duration, an accreditation, a footprint — rather
 * than a slogan. They sit beside the BBB seal and the profile links, because a
 * trust signal buried in the footer is a trust signal nobody reads.
 */
const credibility = [
  { value: `${yearsInBusiness} Years`, label: `Building in New Hampshire since ${FOUNDED_YEAR}` },
  { value: "Three Markets", label: "Commercial, industrial and residential" },
  { value: "Southern NH & Northern MA", label: `Based at ${site.address.street}, ${site.address.city}` },
];

export default function HomePage() {
  return (
    <>
      {/* ------------------------------- Hero ------------------------------- */}
      <section className="relative -mt-20 flex min-h-[92svh] items-end overflow-hidden bg-granite-950 pt-20">
        {/*
          Rotating hero — see HeroCarousel. Steve asked for the downtown
          photo brighter and, reviewing it, wondered if he'd actually meant
          movement and more images of Nashua in the header itself rather
          than a separate strip lower on the page. This is that alternate:
          the same photos, crossfading here instead. The overlay below stays
          strong only right at the bottom, behind the headline and
          paragraph, and eases off well before the top so each photo reads
          clearly; the navbar keeps a light scrim behind it so its
          transparent white logo and links stay legible at the very top.
        */}
        <HeroCarousel photos={heroPhotos} />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-granite-950/95 via-granite-950/35 to-granite-950/15"
        />

        <div className="hero-fade container-page relative pb-20 pt-32">
          <p className="hero-text-shadow animate-fade-up text-xs font-medium uppercase tracking-[0.24em] text-granite-300">
            Nashua, New Hampshire · Est. {FOUNDED_YEAR}
          </p>
          <h1 className="hero-text-shadow animate-fade-up mt-6 max-w-4xl font-display text-[clamp(2.5rem,6.5vw,4.75rem)] font-semibold leading-[1.02] text-granite-50 [animation-delay:100ms]">
            Built on {yearsInBusiness} Years of Experience.
          </h1>
          <p className="hero-text-shadow animate-fade-up mt-5 max-w-3xl font-display text-xl text-granite-300 [animation-delay:150ms] sm:text-2xl">
            {site.tagline}
          </p>
          <p className="hero-text-shadow animate-fade-up mt-7 max-w-2xl text-lg leading-relaxed text-granite-300 [animation-delay:220ms]">
            Since {FOUNDED_YEAR}, Nash Construction has helped businesses and organizations bring
            construction projects from concept to completion. From commercial fit-ups and renovations
            to industrial construction, site work and ongoing facility maintenance, our team delivers
            practical solutions built around your schedule, budget and operation.
          </p>
          <div className="animate-fade-up mt-10 flex flex-col gap-3 sm:flex-row [animation-delay:300ms]">
            <Link
              href="/contact"
              className="rounded-full bg-brand-700 px-8 py-4 text-center text-sm font-medium text-white transition-all duration-300 hover:bg-brand-600 hover:shadow-xl hover:shadow-brand-700/30"
            >
              Request a Consultation
            </Link>
            <Link
              href="/projects"
              className="rounded-full border border-granite-600 px-8 py-4 text-center text-sm font-medium text-granite-100 transition-all duration-300 hover:border-granite-300 hover:bg-granite-50/5"
            >
              See our work
            </Link>
          </div>
        </div>
      </section>

      {/* --------------------------- Credibility ---------------------------- */}
      <section className="border-b border-granite-200 bg-white">
        <div className="container-page flex flex-col gap-8 py-10 xl:flex-row xl:items-center xl:gap-10">
          {/* Accreditation leads: it is the one claim a stranger can verify in a click. */}
          <div className="shrink-0">
            <BbbBadge tone="light" />
          </div>

          <dl className="grid flex-1 gap-6 sm:grid-cols-3 xl:border-l xl:border-granite-200 xl:pl-10">
            {credibility.map((item) => (
              <div key={item.value}>
                <dt className="font-display text-lg font-semibold leading-tight text-granite-900">
                  {item.value}
                </dt>
                <dd className="mt-1.5 text-sm leading-snug text-granite-500">{item.label}</dd>
              </div>
            ))}
          </dl>

          <div className="shrink-0 xl:border-l xl:border-granite-200 xl:pl-10">
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-granite-500">
              Find us on
            </p>
            <SocialLinks tone="light" exclude={["bbb"]} />
          </div>
        </div>
      </section>

      {/*
        The licensed city photos are the header rotation now, not a separate
        strip — but the CC BY-SA ones among them still need visible credit,
        so that requirement moves here rather than disappearing with the strip.
      */}
      <div className="bg-granite-950 px-4 py-3">
        <div className="container-page">
          <PhotoCredits credits={cityPhotos.map((photo) => photo.credit)} />
        </div>
      </div>

      {/* ---------------------- Commercial / Industrial ---------------------- */}
      <section className="container-page py-24">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-700">What we build</p>
          <h2 className="mt-4 font-display text-4xl font-semibold text-granite-900">
            Three markets, one contractor.
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-granite-600">
            Commercial and industrial work is the core of the business, and we build for homeowners
            across the same towns.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              href: "/commercial",
              image: "/projects/galeria-retail-block.jpg",
              title: "Commercial Construction",
              body: "Retail, restaurant, office and institutional work — new construction, tenant fit-ups and renovations, phased so the business next door keeps trading.",
            },
            {
              href: "/industrial",
              image: "/projects/manufacturing-facility.jpg",
              title: "Industrial Construction",
              body: "Manufacturing and warehouse space, mechanical and electrical scopes, fire suppression and the site work that supports them.",
            },
            {
              href: "/residential",
              image: "/projects/timber-frame-screened-porch.jpg",
              title: "Residential Construction",
              body: "Additions, garages, porches and remodels — scoped, scheduled and supervised the way a commercial project is.",
            },
          ].map((card, index) => (
            <Link
              key={card.href}
              href={card.href}
              className="group relative overflow-hidden rounded-xl bg-granite-900"
            >
              <div className="relative aspect-4/3">
                <ProtectedImage
                  src={card.image}
                  alt={`${card.title} in southern New Hampshire`}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  priority={index === 0}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-granite-950 via-granite-950/75 to-granite-950/20" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-7">
                <h3 className="font-display text-2xl font-semibold text-granite-50">{card.title}</h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-granite-300">{card.body}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-granite-300">
                  Explore
                  <svg viewBox="0 0 20 20" className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path d="M4 10h12M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ---------------------------- Core services --------------------------- */}
      <section className="bg-white py-24">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-700">Capabilities</p>
              <h2 className="mt-4 font-display text-4xl font-semibold text-granite-900">
                Five groups, one contract.
              </h2>
            </div>
            <Link
              href="/services"
              className="rounded-full border border-granite-300 px-6 py-3 text-sm font-medium text-granite-700 transition-colors hover:border-granite-900 hover:text-granite-900"
            >
              All services
            </Link>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-xl bg-granite-200 sm:grid-cols-2 lg:grid-cols-3">
            {serviceGroups.map((group) => (
              <Link
                key={group.slug}
                href={`/services#${group.slug}`}
                className="group bg-white p-8 transition-colors duration-300 hover:bg-granite-50"
              >
                <h3 className="font-display text-xl font-semibold text-granite-900">{group.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-granite-600">{group.summary}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand-700">
                  What&rsquo;s included
                  <svg viewBox="0 0 20 20" className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path d="M4 10h12M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            ))}
            <div className="flex flex-col justify-center bg-granite-950 p-8">
              <p className="font-display text-lg font-semibold text-granite-50">
                Not sure which one your project is?
              </p>
              <p className="mt-3 text-sm leading-relaxed text-granite-400">
                Most are more than one. Tell us what the building needs and we&rsquo;ll scope it.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-block self-start rounded-full bg-brand-700 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-600"
              >
                Request a Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------- Featured projects ------------------------ */}
      <section className="container-page py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-700">Selected work</p>
            <h2 className="mt-4 font-display text-4xl font-semibold text-granite-900">
              Businesses that trusted us with their space.
            </h2>
          </div>
          <Link
            href="/projects"
            className="rounded-full border border-granite-300 px-6 py-3 text-sm font-medium text-granite-700 transition-colors hover:border-granite-900 hover:text-granite-900"
          >
            All projects
          </Link>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <Link
              key={project.slug}
              href={`/projects?market=${project.market}`}
              className="group relative overflow-hidden rounded-xl bg-granite-900"
            >
              <div className="relative aspect-4/3">
                <ProtectedImage
                  src={project.image}
                  alt={`${project.title} — ${project.sector.toLowerCase()} project by Nash Construction`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  priority={index === 0}
                  placeholder="blur"
                  blurDataURL={project.blurDataURL}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-granite-950 via-granite-950/30 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-display text-lg font-semibold text-granite-50">{project.title}</h3>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-granite-300">{project.sector}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ---------------------------- Testimonials ---------------------------- */}
      <section className="bg-white py-24">
        <div className="container-page">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-700">In their words</p>
          <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold text-granite-900">
            What clients say afterwards.
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {testimonials.map((item) => (
              <figure
                key={item.attribution}
                className="flex flex-col rounded-xl border border-granite-200 bg-granite-50 p-8 sm:p-10"
              >
                <blockquote className="flex-1 text-[15px] leading-relaxed text-granite-700">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 border-t border-granite-200 pt-5 text-sm font-medium text-granite-900">
                  {item.attribution}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------- Service area ---------------------------- */}
      <section className="py-24">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-700">Where we work</p>
            <h2 className="mt-4 font-display text-4xl font-semibold text-granite-900">
              Nashua, and the towns around it.
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed text-granite-600">
              We are based on Temple Street in Nashua and work throughout southern New Hampshire. Being
              close matters more on commercial work than people expect — it is the difference between a
              site visit this afternoon and one next week.
            </p>
            <div className="mt-8">
              <ServiceAreaCheck />
            </div>
          </div>

          <ul className="grid gap-px self-start overflow-hidden rounded-xl bg-granite-200 sm:grid-cols-2 sm:[&>li:last-child]:col-span-2 lg:col-span-7">
            {serviceAreas.map((area) => (
              <li key={area.region} className="bg-white p-6">
                <h3 className="font-display text-base font-semibold text-granite-900">{area.region}</h3>
                <p className="mt-2 text-sm leading-relaxed text-granite-500">{area.towns.join(" · ")}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------- CTA --------------------------------- */}
      <section className="container-page py-24">
        <div className="rounded-2xl bg-granite-950 px-8 py-16 text-center sm:px-16">
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold text-granite-50 sm:text-4xl">
            Let&rsquo;s talk about your project.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-granite-400">
            Tell us what you&rsquo;re planning and we&rsquo;ll walk the space, scope it honestly, and
            put a budget in writing before anyone pulls a permit.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-full bg-brand-700 px-8 py-4 text-sm font-medium text-white transition-all duration-300 hover:bg-brand-600"
            >
              Request a Consultation
            </Link>
            <a
              href={`tel:${site.phone}`}
              className="rounded-full border border-granite-700 px-8 py-4 text-sm font-medium text-granite-200 transition-colors hover:border-granite-400"
            >
              Call {site.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
