import type { Metadata } from "next";
import Link from "next/link";

import { Amp } from "@/components/Amp";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { serviceGroups } from "@/lib/services";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Commercial & Industrial Construction Services",
  description:
    "General contracting, renovations and fit-ups, mechanical and electrical, exterior and site work, and building maintenance and emergency repair across southern New Hampshire.",
  path: "/services",
  keywords: [
    "commercial general contracting NH",
    "tenant fit-up contractor Nashua",
    "commercial HVAC plumbing electrical New Hampshire",
    "commercial site work contractor NH",
    "emergency building repair Nashua NH",
  ],
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        schema={[
          ...serviceGroups.map((group) =>
            serviceSchema({
              id: `/services#${group.slug}`,
              name: group.title,
              description: group.detail,
            }),
          ),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
        ]}
      />

      <section className="container-page pt-20 pb-16">
        <p className="animate-fade-up text-xs font-medium uppercase tracking-[0.2em] text-brass-600">
          Services
        </p>
        <h1 className="animate-fade-up mt-5 max-w-3xl font-display text-[clamp(2.25rem,5vw,3.5rem)] font-semibold leading-[1.05] text-granite-900 [animation-delay:80ms]">
          Everything a building needs, under one contract.
        </h1>
        <p className="animate-fade-up mt-7 max-w-2xl text-lg leading-relaxed text-granite-600 [animation-delay:160ms]">
          Our capabilities are grouped into five areas. Most projects draw on more than one — and
          carrying them together is exactly why the hand-offs between trades stop being your problem.
        </p>
      </section>

      <section className="container-page pb-24">
        <div className="grid gap-px overflow-hidden rounded-xl bg-granite-200">
          {serviceGroups.map((group, index) => (
            <article
              key={group.slug}
              id={group.slug}
              className="grid scroll-mt-28 gap-8 bg-granite-50 p-8 transition-colors duration-300 hover:bg-white sm:p-12 lg:grid-cols-12"
            >
              <div className="lg:col-span-1">
                <span className="font-display text-sm font-semibold text-brass-600">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="lg:col-span-5">
                <h2 className="font-display text-2xl font-semibold text-granite-900">
                  <Amp>{group.title}</Amp>
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-granite-600">{group.summary}</p>
              </div>
              <div className="lg:col-span-6">
                <p className="text-[15px] leading-relaxed text-granite-600">{group.detail}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {group.trades.map((trade) => (
                    <li
                      key={trade}
                      className="rounded-full border border-granite-200 bg-white px-3.5 py-1.5 text-xs font-medium text-granite-600"
                    >
                      {trade}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container-page pb-24">
        <div className="flex flex-col items-start justify-between gap-8 rounded-2xl border border-granite-200 bg-white p-10 sm:flex-row sm:items-center sm:p-14">
          <div className="max-w-xl">
            <h2 className="font-display text-2xl font-semibold text-granite-900">
              Need something that isn&rsquo;t listed?
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-granite-600">
              After {new Date().getFullYear() - 1976} years there is not much in a commercial building
              we have not had to deal with. Ask — and if it is genuinely not our work, we will tell you
              who does it well.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-full bg-granite-900 px-8 py-4 text-center text-sm font-medium text-granite-50 transition-all duration-300 hover:bg-brass-500"
            >
              Request a Consultation
            </Link>
            <a
              href={`tel:${site.phone}`}
              className="rounded-full border border-granite-300 px-8 py-4 text-center text-sm font-medium text-granite-700 transition-colors hover:border-granite-900"
            >
              {site.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
