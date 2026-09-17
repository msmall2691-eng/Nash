import type { Metadata } from "next";
import Link from "next/link";

import { ProtectedImage } from "@/components/ProtectedImage";

import { JsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { process } from "@/lib/services";
import { FOUNDED_YEAR, markets, serviceAreas, site, yearsInBusiness } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "About Our Nashua Contractors",
  description: `A Nashua commercial and industrial general contractor building in southern NH since ${FOUNDED_YEAR}. BBB accredited, ${site.accreditation.rating} rated.`,
  path: "/about",
  keywords: [
    "about Nash Construction Nashua NH",
    "New Hampshire commercial contractor history",
    "BBB accredited contractor Nashua",
    "Mark Nash Construction New Hampshire",
  ],
});

const milestones = [
  { year: FOUNDED_YEAR, label: "Mark Nash starts working in construction and founds the business." },
  { year: 1999, label: "The business is incorporated as Nash Construction, LLC." },
  { year: 2009, label: `${site.accreditation.body} accreditation, held with an ${site.accreditation.rating} rating.` },
  { year: new Date().getFullYear(), label: `${yearsInBusiness} years of continuous operation in southern New Hampshire.` },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />

      <section className="relative -mt-20 flex min-h-[62svh] items-end overflow-hidden bg-granite-950 pt-20">
        <ProtectedImage
          src="/projects/timber-frame-screened-porch.jpg"
          alt="Timber-frame screened porch built by Nash Construction, a Nashua New Hampshire general contractor"
          fill
          sizes="100vw"
          priority
          className="object-cover opacity-60"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-granite-950 via-granite-950/75 to-granite-950/40" />
        <div className="container-page relative pb-16 pt-28">
          <p className="animate-fade-up text-xs font-medium uppercase tracking-[0.24em] text-brand-400">
            About Nash
          </p>
          <h1 className="animate-fade-up mt-5 max-w-3xl font-display text-[clamp(2.25rem,5.5vw,4rem)] font-semibold leading-[1.04] text-granite-50 [animation-delay:80ms]">
            {yearsInBusiness} years, one state, the same standard.
          </h1>
          <p className="animate-fade-up mt-7 max-w-2xl text-lg leading-relaxed text-granite-300 [animation-delay:160ms]">
            Nash Construction, LLC is a Nashua general contractor working on commercial and industrial
            projects throughout southern New Hampshire — from the first consultation through project
            management and completion.
          </p>
        </div>
      </section>

      {/* ----------------------------- Credentials ---------------------------- */}
      <section className="border-b border-granite-200 bg-white">
        <div className="container-page grid grid-cols-2 gap-8 py-12 lg:grid-cols-4">
          {[
            { value: `Since ${FOUNDED_YEAR}`, label: "In continuous operation" },
            { value: site.accreditation.rating, label: `${site.accreditation.body} rating` },
            { value: `Accredited ${site.accreditation.accreditedSince}`, label: "BBB accredited business" },
            { value: "Nashua, NH", label: site.address.street },
          ].map((item) => (
            <div key={item.label}>
              <p className="font-display text-2xl font-semibold leading-tight text-granite-900">
                {item.value}
              </p>
              <p className="mt-1.5 text-sm leading-snug text-granite-500">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* -------------------------------- Story ------------------------------- */}
      <section className="container-page grid gap-12 py-24 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 className="font-display text-3xl font-semibold text-granite-900">
            A contractor measured in decades, not projects
          </h2>
        </div>
        <div className="space-y-6 text-[15px] leading-relaxed text-granite-600 lg:col-span-7">
          <p>
            Mark Nash has worked in construction since {FOUNDED_YEAR}. The business he started was
            incorporated as Nash Construction, LLC in {site.incorporated}, and it has been operating in
            and around Nashua ever since — long enough that a lot of our work now comes from clients
            we first did something small for years ago.
          </p>
          <p>
            We stayed deliberately focused: {markets.join(", ").toLowerCase()} work, in southern New
            Hampshire. We are not trying to be a regional builder. We are trying to be the contractor
            a facilities manager in Nashua or Manchester calls first, and keeps calling.
          </p>
          <p>
            That is also why the same two people stay involved from the consultation through the punch
            list. There is no hand-off to a team you have not met.
          </p>
        </div>
      </section>

      {/* ------------------------------ Leadership ---------------------------- */}
      <section className="bg-white py-24">
        <div className="container-page">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-600">Leadership</p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold text-granite-900">
            Who you&rsquo;ll actually be working with.
          </h2>
          <div className="mt-12 grid gap-px overflow-hidden rounded-xl bg-granite-200 sm:grid-cols-2">
            {site.leadership.map((person) => (
              <div key={person.name} className="bg-white p-8 sm:p-10">
                <h3 className="font-display text-2xl font-semibold text-granite-900">{person.name}</h3>
                <p className="mt-1.5 text-xs uppercase tracking-[0.16em] text-brand-600">{person.role}</p>
                <p className="mt-5 text-[15px] leading-relaxed text-granite-600">{person.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------ Timeline ------------------------------ */}
      <section className="container-page py-24">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-600">History</p>
        <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold text-granite-900">
          The short version.
        </h2>
        <ol className="mt-12 grid gap-px overflow-hidden rounded-xl bg-granite-200 md:grid-cols-4">
          {milestones.map((milestone) => (
            <li key={milestone.year} className="bg-granite-50 p-8">
              <span className="font-display text-2xl font-semibold text-brand-600">{milestone.year}</span>
              <p className="mt-3 text-sm leading-relaxed text-granite-600">{milestone.label}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ------------------------------- Process ------------------------------ */}
      <section className="bg-white py-24">
        <div className="container-page">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-600">How we work</p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold text-granite-900">
            Four phases, no surprises in between.
          </h2>
          <ol className="mt-12 grid gap-px overflow-hidden rounded-xl bg-granite-200 md:grid-cols-4">
            {process.map((phase) => (
              <li key={phase.step} className="bg-white p-8">
                <span className="font-display text-sm font-semibold text-brand-600">{phase.step}</span>
                <h3 className="mt-4 font-display text-xl font-semibold text-granite-900">{phase.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-granite-600">{phase.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-page py-24">
        <div className="rounded-2xl bg-granite-950 px-8 py-16 text-center sm:px-16">
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold text-granite-50">
            Working across {serviceAreas.length} regions of southern New Hampshire.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-granite-400">
            {site.address.street}, {site.address.city}, {site.address.region}{" "}
            {site.address.postalCode} · {site.accreditation.body} accredited since{" "}
            {site.accreditation.accreditedSince}
          </p>
          <Link
            href="/contact"
            className="mt-10 inline-block rounded-full bg-brand-500 px-8 py-4 text-sm font-medium text-white transition-all duration-300 hover:bg-brand-500"
          >
            Request a Consultation
          </Link>
        </div>
      </section>
    </>
  );
}
