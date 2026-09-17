import type { Metadata } from "next";
import Link from "next/link";

import { ProtectedImage } from "@/components/ProtectedImage";

import { Amp } from "@/components/Amp";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { serviceAreas, site, yearsInBusiness } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Industrial Construction",
  description:
    "Industrial general contracting in southern New Hampshire — manufacturing and warehouse construction, mechanical and electrical scopes, fire suppression, demolition and site work.",
  path: "/industrial",
  keywords: [
    "industrial construction New Hampshire",
    "industrial general contractor Nashua NH",
    "warehouse construction southern NH",
    "manufacturing facility contractor New Hampshire",
    "industrial fit-up NH",
  ],
});

const capabilities = [
  {
    title: "Manufacturing & Warehouse",
    body: "New industrial space and expansions, plus the interior reconfiguration that follows a line change or a new tenant.",
  },
  {
    title: "Mechanical & Electrical",
    body: "HVAC, plumbing, power and controls coordinated against each other before anything gets installed.",
  },
  {
    title: "Fire Protection & Suppression",
    body: "Sprinkler and suppression systems, including the coordination with ceilings, racking and mechanical that usually gets missed.",
  },
  {
    title: "Demolition & Site Work",
    body: "Selective demolition, concrete, paving and exterior work — scheduled around frost dates rather than into them.",
  },
];

const considerations = [
  {
    heading: "We work around production",
    body: "Industrial clients rarely get to stop. We phase scopes into shutdown windows, weekends and off-shifts, and we plan the noisy and dusty work against your operation rather than our convenience.",
  },
  {
    heading: "One contract across the trades",
    body: "Mechanical, electrical and fire protection are where industrial projects come apart, because nobody owns the hand-offs. Carrying them together is the point.",
  },
  {
    heading: "Local means responsive",
    body: `Being in Nashua means a project manager can be standing in your building the same day. Over ${yearsInBusiness} years that has mattered more than anything we could put in a brochure.`,
  },
];

export default function IndustrialPage() {
  return (
    <>
      <JsonLd
        schema={[
          serviceSchema({
            id: "/industrial#service",
            name: "Industrial Construction",
            serviceType: "Industrial Construction",
            description:
              "Industrial general contracting, manufacturing and warehouse construction, mechanical, electrical and fire suppression scopes, demolition and site work across southern New Hampshire.",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Industrial Construction", path: "/industrial" },
          ]),
        ]}
      />

      <section className="relative -mt-20 flex min-h-[70svh] items-end overflow-hidden bg-granite-950 pt-20">
        <ProtectedImage
          src="/projects/hero-industrial.jpg"
          alt="Industrial construction project in southern New Hampshire"
          fill
          wrapperClassName="absolute inset-0"
          sizes="100vw"
          priority
          className="object-cover opacity-65"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-granite-950 via-granite-950/75 to-granite-950/40" />
        <div className="container-page relative pb-16 pt-28">
          <p className="animate-fade-up text-xs font-medium uppercase tracking-[0.24em] text-brass-400">
            Industrial Construction
          </p>
          <h1 className="animate-fade-up mt-5 max-w-3xl font-display text-[clamp(2.25rem,5.5vw,4rem)] font-semibold leading-[1.04] text-granite-50 [animation-delay:80ms]">
            Industrial work that fits into a plant&rsquo;s schedule, not the other way around.
          </h1>
          <p className="animate-fade-up mt-7 max-w-2xl text-lg leading-relaxed text-granite-300 [animation-delay:160ms]">
            Manufacturing and warehouse space, mechanical and electrical scopes, fire suppression, and
            the demolition and site work that supports them — delivered by a contractor who is twenty
            minutes away when something needs a decision.
          </p>
        </div>
      </section>

      <section className="container-page py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="font-display text-3xl font-semibold text-granite-900">What we take on</h2>
            <p className="mt-5 text-[15px] leading-relaxed text-granite-600">
              Whole buildings, single systems, or the reconfiguration that a new process demands.
            </p>
            <Link
              href="/services"
              className="mt-8 inline-block rounded-full border border-granite-300 px-6 py-3 text-sm font-medium text-granite-700 transition-colors hover:border-granite-900 hover:text-granite-900"
            >
              See all capabilities
            </Link>
          </div>

          <div className="grid gap-px self-start overflow-hidden rounded-xl bg-granite-200 sm:grid-cols-2 lg:col-span-7">
            {capabilities.map((item) => (
              <div key={item.title} className="bg-white p-7">
                <h3 className="font-display text-lg font-semibold text-granite-900">
                  <Amp>{item.title}</Amp>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-granite-600">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container-page">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-brass-600">How we approach it</p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold text-granite-900">
            Three things industrial clients tell us matter most.
          </h2>
          <div className="mt-12 grid gap-px overflow-hidden rounded-xl bg-granite-200 md:grid-cols-3">
            {considerations.map((item) => (
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
                Planning an industrial project?
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-granite-400">
                We&rsquo;ll walk the facility, work out what has to happen during a shutdown versus
                what can run alongside production, and put it in writing. Working across{" "}
                {serviceAreas.map((a) => a.region).join(", ")}.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
              <Link
                href="/contact"
                className="rounded-full bg-brass-500 px-8 py-4 text-center text-sm font-medium text-granite-950 transition-colors hover:bg-brass-400"
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
