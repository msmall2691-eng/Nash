import type { Metadata } from "next";

import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, businessId } from "@/lib/schema";
import { serviceGroups } from "@/lib/services";
import { FOUNDED_YEAR, serviceAreas, site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Request a Consultation",
  description: `Request a commercial or industrial construction consultation from Nash Construction in Nashua, NH. Call ${site.phoneDisplay} or send project details — we reply within one business day.`,
  path: "/contact",
  keywords: [
    "Nashua NH contractor consultation",
    "commercial construction quote New Hampshire",
    "contact commercial general contractor NH",
    "industrial contractor Nashua NH contact",
  ],
});

function contactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact ${site.name}`,
    mainEntity: {
      "@type": "ContactPoint",
      contactType: "Sales",
      telephone: site.phone,
      email: site.email,
      areaServed: "US-NH",
      availableLanguage: "English",
    },
    about: { "@id": businessId },
  };
}

export default function ContactPage() {
  return (
    <>
      <JsonLd
        schema={[
          contactPageSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ]}
      />

      <section className="container-page pt-20 pb-12">
        <p className="animate-fade-up text-xs font-medium uppercase tracking-[0.2em] text-brass-600">
          Contact
        </p>
        <h1 className="animate-fade-up mt-5 max-w-3xl font-display text-[clamp(2.25rem,5vw,3.5rem)] font-semibold leading-[1.05] text-granite-900 [animation-delay:80ms]">
          Request a consultation.
        </h1>
        <p className="animate-fade-up mt-7 max-w-2xl text-lg leading-relaxed text-granite-600 [animation-delay:160ms]">
          Tell us what the building needs. A project manager reads every submission — not a queue, not
          a chatbot. If it&rsquo;s faster to talk, call{" "}
          <a
            href={`tel:${site.phone}`}
            className="font-medium text-granite-900 underline decoration-brass-500 underline-offset-4"
          >
            {site.phoneDisplay}
          </a>
          .
        </p>
      </section>

      <section className="container-page grid gap-12 pb-24 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <ContactForm />
        </div>

        <aside className="lg:col-span-5">
          <div className="sticky top-28 space-y-8">
            <div className="rounded-2xl border border-granite-200 bg-white p-8">
              <h2 className="font-display text-lg font-semibold text-granite-900">Office</h2>
              <address className="mt-4 text-sm not-italic leading-relaxed text-granite-600">
                {site.address.street}
                <br />
                {site.address.city}, {site.address.region} {site.address.postalCode}
              </address>
              <dl className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between gap-4 border-t border-granite-100 pt-3">
                  <dt className="text-granite-500">Phone</dt>
                  <dd>
                    <a href={`tel:${site.phone}`} className="font-medium text-granite-900 hover:text-brass-600">
                      {site.phoneDisplay}
                    </a>
                  </dd>
                </div>
                <div className="flex justify-between gap-4 border-t border-granite-100 pt-3">
                  <dt className="text-granite-500">Email</dt>
                  <dd>
                    <a href={`mailto:${site.email}`} className="font-medium text-granite-900 hover:text-brass-600">
                      {site.email}
                    </a>
                  </dd>
                </div>
                <div className="flex justify-between gap-4 border-t border-granite-100 pt-3">
                  <dt className="text-granite-500">Established</dt>
                  <dd className="font-medium text-granite-900">{FOUNDED_YEAR}</dd>
                </div>
                <div className="flex justify-between gap-4 border-t border-granite-100 pt-3">
                  <dt className="text-granite-500">{site.accreditation.body}</dt>
                  <dd className="font-medium text-granite-900">
                    {site.accreditation.rating} · since {site.accreditation.accreditedSince}
                  </dd>
                </div>
              </dl>
              <ul className="mt-6 space-y-1.5 border-t border-granite-100 pt-4 text-sm text-granite-600">
                {site.hours.map((block) => (
                  <li key={block.days[0]} className="flex justify-between gap-4">
                    <span className="text-granite-500">
                      {block.days.length > 1
                        ? `${block.days[0]?.slice(0, 3)}–${block.days[block.days.length - 1]?.slice(0, 3)}`
                        : block.days[0]}
                    </span>
                    <span className="tabular-nums">
                      {block.opens} – {block.closes}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-t border-granite-100 pt-4 text-xs leading-relaxed text-granite-500">
                Emergency repair work is triaged the day it comes in — call rather than email if
                something has failed.
              </p>
            </div>

            <div className="rounded-2xl bg-granite-100 p-8">
              <h2 className="font-display text-lg font-semibold text-granite-900">What we can help with</h2>
              <ul className="mt-4 space-y-2 text-sm text-granite-600">
                {serviceGroups.map((group) => (
                  <li key={group.slug} className="flex gap-2.5">
                    <span aria-hidden="true" className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brass-500" />
                    {group.title}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-granite-200 bg-white p-8">
              <h2 className="font-display text-lg font-semibold text-granite-900">Service area</h2>
              <ul className="mt-4 space-y-3 text-sm">
                {serviceAreas.map((area) => (
                  <li key={area.region}>
                    <span className="font-medium text-granite-800">{area.region}</span>
                    <span className="mt-0.5 block text-xs leading-relaxed text-granite-500">
                      {area.towns.join(" · ")}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </section>
    </>
  );
}
