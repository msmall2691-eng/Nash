import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/components/JsonLd";
import { ProtectedImage } from "@/components/ProtectedImage";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { FOUNDED_YEAR, serviceAreas, site, yearsInBusiness } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Residential Construction, Nashua NH",
  description:
    "Home additions, garages, porches and whole-room remodels across southern NH and northern MA — built by a commercial contractor, for homeowners.",
  path: "/residential",
  image: "/projects/timber-frame-screened-porch.jpg",
  keywords: [
    "residential contractor Nashua NH",
    "home addition builder southern New Hampshire",
    "garage builder Nashua NH",
    "home remodeling contractor NH",
    "screened porch builder New Hampshire",
  ],
});

const capabilities = [
  {
    title: "Additions & Dormers",
    body: "New wings, second storeys and dormers tied into the existing roofline, siding exposure and window rhythm so the join does not announce itself.",
  },
  {
    title: "Garages & Outbuildings",
    body: "Detached and attached garages from footing to finish — framing, roofing, siding, doors and the site work around them.",
  },
  {
    title: "Porches & Outdoor Living",
    body: "Screened porches, timber framing, decks and the foundation and stonework that carry them.",
  },
  {
    title: "Remodels & Renovations",
    body: "Kitchens, baths and whole-room reworks, including the structural changes and mechanical updates behind the finishes.",
  },
];

const reasons = [
  {
    heading: "Commercial discipline, on a house",
    body: `Scheduling, written scopes and someone accountable on site are ordinary on a commercial job and rare on a residential one. After ${yearsInBusiness} years of the former, we bring the same habits to the latter.`,
  },
  {
    heading: "One contractor, every trade",
    body: "Framing, mechanical, electrical, roofing and finish work are carried under one contract, so the hand-offs between them stop being your problem.",
  },
  {
    heading: "We live here",
    body: `Based on Temple Street in Nashua, building in these towns since ${FOUNDED_YEAR}. Close enough that a question gets answered the same day, not next week.`,
  },
];

export default function ResidentialPage() {
  return (
    <>
      <JsonLd
        schema={[
          serviceSchema({
            id: "/residential#service",
            name: "Residential Construction",
            serviceType: "Residential Construction",
            description:
              "Home additions, garages, porches, and remodels and renovations across southern New Hampshire and northern Massachusetts.",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Residential Construction", path: "/residential" },
          ]),
        ]}
      />

      <section className="relative -mt-20 flex min-h-[70svh] items-end overflow-hidden bg-granite-950 pt-20">
        <ProtectedImage
          src="/projects/timber-frame-screened-porch.jpg"
          alt="Timber-frame screened porch addition built by Nash Construction in southern New Hampshire"
          fill
          sizes="100vw"
          priority
          className="object-cover opacity-65"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-granite-950 via-granite-950/75 to-granite-950/40" />
        <div className="container-page relative pb-16 pt-28">
          <p className="animate-fade-up text-xs font-medium uppercase tracking-[0.24em] text-granite-300">
            Residential Construction
          </p>
          <h1 className="animate-fade-up mt-5 max-w-3xl font-display text-[clamp(2.25rem,5.5vw,4rem)] font-semibold leading-[1.04] text-granite-50 [animation-delay:80ms]">
            The crew that builds commercial buildings, working on your house.
          </h1>
          <p className="animate-fade-up mt-7 max-w-2xl text-lg leading-relaxed text-granite-300 [animation-delay:160ms]">
            Additions, garages, porches and remodels across southern New Hampshire and northern
            Massachusetts — scoped, scheduled and supervised the way a commercial project is.
          </p>
        </div>
      </section>

      <section className="container-page py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="font-display text-3xl font-semibold text-granite-900">What we take on</h2>
            <p className="mt-5 text-[15px] leading-relaxed text-granite-600">
              Work that needs structure, permits and trades coordinated — rather than a handyman
              afternoon.
            </p>
            <Link
              href="/projects?market=residential"
              className="mt-8 inline-block rounded-full border border-granite-300 px-6 py-3 text-sm font-medium text-granite-700 transition-colors hover:border-granite-900 hover:text-granite-900"
            >
              See residential projects
            </Link>
          </div>

          <div className="grid gap-px self-start overflow-hidden rounded-xl bg-granite-200 sm:grid-cols-2 lg:col-span-7">
            {capabilities.map((item) => (
              <div key={item.title} className="bg-white p-7">
                <h3 className="font-display text-lg font-semibold text-granite-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-granite-600">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container-page">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-700">Why us</p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold text-granite-900">
            Why a commercial contractor is worth having on a home.
          </h2>
          <div className="mt-12 grid gap-px overflow-hidden rounded-xl bg-granite-200 md:grid-cols-3">
            {reasons.map((item) => (
              <div key={item.heading} className="bg-white p-8">
                <h3 className="font-display text-lg font-semibold text-granite-900">{item.heading}</h3>
                <p className="mt-3 text-sm leading-relaxed text-granite-600">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-24">
        <div className="rounded-2xl bg-granite-950 px-8 py-16 sm:px-14">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <h2 className="font-display text-3xl font-semibold text-granite-50">
                Planning an addition, garage or remodel?
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-granite-400">
                We&rsquo;ll walk the house, tell you honestly what the scope involves, and put a
                budget in writing. Working across {serviceAreas.map((area) => area.region).join(", ")}.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
              <Link
                href="/contact"
                className="rounded-full bg-brand-700 px-8 py-4 text-center text-sm font-medium text-white transition-colors hover:bg-brand-600"
              >
                Request a Consultation
              </Link>
              <a
                href={`tel:${site.phone}`}
                className="rounded-full border border-granite-700 px-8 py-4 text-center text-sm font-medium text-granite-200 transition-colors hover:border-granite-400"
              >
                {site.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
