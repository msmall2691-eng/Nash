import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProtectedImage } from "@/components/ProtectedImage";

import { JsonLd } from "@/components/JsonLd";
import { formatList } from "@/lib/format";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { FOUNDED_YEAR, serviceAreas, site, yearsInBusiness } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Commercial Construction, Nashua NH",
  description:
    "Commercial general contracting in Nashua and southern NH: new construction, tenant fit-ups, renovations and building maintenance. Since 1976.",
  path: "/commercial",
  keywords: [
    "commercial construction Nashua NH",
    "commercial general contractor southern New Hampshire",
    "retail fit-up contractor NH",
    "restaurant build out New Hampshire",
    "office renovation contractor Nashua",
  ],
});

const capabilities = [
  {
    title: "Tenant Fit-Ups",
    body: "Taking a shell or a former tenant’s space and turning it into somewhere your business can open — on the schedule your lease commits you to.",
  },
  {
    title: "New Commercial Construction",
    body: "Ground-up builds managed from consultation through closeout, with one contractor accountable for the whole thing.",
  },
  {
    title: "Renovations & Alterations",
    body: "Reworking space that is already occupied, phased so the rest of the building keeps operating around us.",
  },
  {
    title: "Building Maintenance",
    body: "Ongoing upkeep and emergency repair for clients who would rather call one number than manage six trades.",
  },
];

const sectors = [
  "Retail",
  "Restaurant & food service",
  "Office & professional",
  "Nonprofit & community",
  "Institutional",
  "Municipal & public",
];

const trail = [
  { name: "Home", path: "/" },
  { name: "Commercial Construction", path: "/commercial" },
];

export default function CommercialPage() {
  return (
    <>
      <JsonLd
        schema={[
          serviceSchema({
            id: "/commercial#service",
            name: "Commercial Construction",
            serviceType: "Commercial Construction",
            description:
              "Commercial general contracting, tenant fit-ups, renovations and building maintenance throughout Nashua and southern New Hampshire.",
          }),
          breadcrumbSchema(trail),
        ]}
      />

      <section className="relative -mt-20 flex min-h-[70svh] items-end overflow-hidden bg-granite-950 pt-20">
        <ProtectedImage
          src="/projects/marzen-group.jpg"
          alt="Märzen Group commercial office building, constructed by Nash Construction in southern New Hampshire"
          fill
          sizes="100vw"
          priority
          className="object-cover opacity-65"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-granite-950 via-granite-950/75 to-granite-950/40" />
        <div className="container-page relative pb-16 pt-28">
          <Breadcrumbs trail={trail} tone="dark" />
          <p className="animate-fade-up text-xs font-medium uppercase tracking-[0.24em] text-granite-300">
            Commercial Construction
          </p>
          <h1 className="animate-fade-up mt-5 max-w-3xl font-display text-[clamp(2.25rem,5.5vw,4rem)] font-semibold leading-[1.04] text-granite-50 [animation-delay:80ms]">
            Commercial space, built around a business that has to keep running.
          </h1>
          <p className="animate-fade-up mt-7 max-w-2xl text-lg leading-relaxed text-granite-300 [animation-delay:160ms]">
            Most of our commercial work happens in buildings that are already occupied, next to
            tenants who are already trading. Sequencing that properly is the job — and after{" "}
            {yearsInBusiness} years in southern New Hampshire, it is the part we are best at.
          </p>
        </div>
      </section>

      <section className="container-page py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="font-display text-3xl font-semibold text-granite-900">
              What we take on
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-granite-600">
              From a single storefront fit-up to a full building renovation, carried under one
              contract so the trades coordinate with each other rather than with you.
            </p>
            <Link
              href="/projects?market=commercial"
              className="mt-8 inline-block rounded-full border border-granite-300 px-6 py-3 text-sm font-medium text-granite-700 transition-colors hover:border-granite-900 hover:text-granite-900"
            >
              See commercial projects
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
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-700">Who we build for</p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-granite-900">
              Sectors we work in
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed text-granite-600">
              We have worked for retail chains, independent restaurants, nonprofits and public clients
              — including the City of Nashua. The common thread is a client who needs the space open
              on a date they have already committed to.
            </p>
          </div>
          <ul className="flex flex-wrap content-start gap-2.5 lg:col-span-7">
            {sectors.map((sector) => (
              <li
                key={sector}
                className="rounded-full border border-granite-200 bg-granite-50 px-5 py-2.5 text-sm font-medium text-granite-700"
              >
                {sector}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-page py-24">
        <div className="rounded-2xl bg-granite-950 px-8 py-16 sm:px-14">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <h2 className="font-display text-3xl font-semibold text-granite-50">
                Building commercially in southern New Hampshire since {FOUNDED_YEAR}.
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-granite-400">
                Based in Nashua, working across {formatList(serviceAreas.map((a) => a.region))}.
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
