import Image from "next/image";
import Link from "next/link";

import { projects } from "@/lib/projects";
import { services } from "@/lib/services";
import { serviceAreas, site } from "@/lib/site";

const featured = projects.slice(0, 3);

const proofPoints = [
  { value: "20+", label: "Years building in NH" },
  { value: "140+", label: "Homes & remodels delivered" },
  { value: "0.9", label: "ACH50 on our tightest build" },
  { value: "2 yr", label: "Written workmanship warranty" },
];

export default function HomePage() {
  return (
    <>
      {/* ------------------------------- Hero ------------------------------- */}
      <section className="relative -mt-20 flex min-h-[92svh] items-end overflow-hidden bg-granite-950 pt-20">
        <Image
          src={projects[0]?.image ?? "/projects/winnipesaukee-lakehouse.jpg"}
          alt="A Nash Construction custom lakehouse on Meredith Bay, New Hampshire"
          fill
          sizes="100vw"
          priority
          placeholder="blur"
          blurDataURL={projects[0]?.blurDataURL}
          className="object-cover opacity-70"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-granite-950 via-granite-950/70 to-granite-950/30"
        />

        <div className="container-page relative pb-20 pt-32">
          <p className="animate-fade-up text-xs font-medium uppercase tracking-[0.24em] text-brass-400">
            {site.address.regionName} · Est. {site.founded}
          </p>
          <h1 className="animate-fade-up mt-6 max-w-4xl font-display text-[clamp(2.5rem,6.5vw,4.75rem)] font-semibold leading-[1.02] text-granite-50 [animation-delay:100ms]">
            Custom homes and fine remodeling, built for the Granite State.
          </h1>
          <p className="animate-fade-up mt-7 max-w-xl text-lg leading-relaxed text-granite-300 [animation-delay:200ms]">
            From lakefront builds on Winnipesaukee to Federal restorations in Portsmouth — one
            superintendent on your site, a budget you can read, and work that holds up to a NH winter.
          </p>
          <div className="animate-fade-up mt-10 flex flex-col gap-3 sm:flex-row [animation-delay:300ms]">
            <Link
              href="/contact"
              className="rounded-full bg-brass-500 px-8 py-4 text-center text-sm font-medium text-granite-950 transition-all duration-300 hover:bg-brass-400 hover:shadow-xl hover:shadow-brass-500/30"
            >
              Get an estimate
            </Link>
            <Link
              href="/gallery"
              className="rounded-full border border-granite-600 px-8 py-4 text-center text-sm font-medium text-granite-100 transition-all duration-300 hover:border-granite-300 hover:bg-granite-50/5"
            >
              See our NH projects
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------------------- Proof points --------------------------- */}
      <section className="border-b border-granite-200 bg-white">
        <div className="container-page grid grid-cols-2 gap-8 py-12 lg:grid-cols-4">
          {proofPoints.map((point) => (
            <div key={point.label}>
              <p className="font-display text-3xl font-semibold text-granite-900">{point.value}</p>
              <p className="mt-1.5 text-sm leading-snug text-granite-500">{point.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------ Services ----------------------------- */}
      <section className="container-page py-24">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-brass-600">What we build</p>
          <h2 className="mt-4 font-display text-4xl font-semibold text-granite-900">
            Six things we do, and nothing we don&rsquo;t.
          </h2>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-xl bg-granite-200 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services#${service.slug}`}
              className="group bg-granite-50 p-8 transition-colors duration-300 hover:bg-white"
            >
              <h3 className="font-display text-xl font-semibold text-granite-900">{service.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-granite-600">{service.summary}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brass-600">
                Learn more
                <svg viewBox="0 0 20 20" className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path d="M4 10h12M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ------------------------------ Featured ----------------------------- */}
      <section className="bg-white py-24">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-brass-600">Recent work</p>
              <h2 className="mt-4 font-display text-4xl font-semibold text-granite-900">
                Built across New Hampshire.
              </h2>
            </div>
            <Link
              href="/gallery"
              className="rounded-full border border-granite-300 px-6 py-3 text-sm font-medium text-granite-700 transition-colors hover:border-granite-900 hover:text-granite-900"
            >
              View full gallery
            </Link>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {featured.map((project, index) => (
              <Link
                key={project.slug}
                href="/gallery"
                className="group relative overflow-hidden rounded-xl bg-granite-900"
              >
                <div className="relative aspect-4/5">
                  <Image
                    src={project.image}
                    alt={`${project.title} in ${project.town}, New Hampshire`}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    priority={index === 0}
                    placeholder="blur"
                    blurDataURL={project.blurDataURL}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-granite-950 to-transparent opacity-80" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-display text-lg font-semibold text-granite-50">{project.title}</h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.14em] text-brass-300">
                    {project.town} · {project.region}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------- Service areas --------------------------- */}
      <section className="container-page py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-brass-600">Where we work</p>
            <h2 className="mt-4 font-display text-4xl font-semibold text-granite-900">
              A two-hour radius of Meredith.
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed text-granite-600">
              We keep our footprint tight on purpose. If a superintendent can&rsquo;t reach your site
              before the crew does, we&rsquo;re not the right builder for it — and we&rsquo;ll tell you
              who is.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-block rounded-full bg-granite-900 px-7 py-3.5 text-sm font-medium text-granite-50 transition-all duration-300 hover:bg-brass-500"
            >
              Check your town
            </Link>
          </div>

          <ul className="grid gap-px self-start overflow-hidden rounded-xl bg-granite-200 sm:grid-cols-2 lg:col-span-7">
            {serviceAreas.map((area) => (
              <li key={area.region} className="bg-granite-50 p-6">
                <h3 className="font-display text-base font-semibold text-granite-900">{area.region}</h3>
                <p className="mt-2 text-sm leading-relaxed text-granite-500">{area.towns.join(" · ")}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
