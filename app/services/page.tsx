import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { services } from "@/lib/services";
import { serviceAreas, siteUrl } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Construction Services Across New Hampshire",
  description:
    "Custom homes, whole-home remodels, kitchens and baths, additions, lakefront construction and light commercial work throughout New Hampshire.",
  path: "/services",
  keywords: [
    "NH custom home builder services",
    "New Hampshire kitchen remodel contractor",
    "lakefront construction New Hampshire",
    "NH home addition contractor",
  ],
});

/** Each service also gets its own `Service` node so it can surface independently. */
function servicesSchema() {
  return services.map((service) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteUrl}/services#${service.slug}`,
    name: service.title,
    serviceType: service.title,
    description: service.detail,
    provider: { "@id": `${siteUrl}/#localbusiness` },
    areaServed: serviceAreas.map((area) => ({ "@type": "AdministrativeArea", name: `${area.region}, NH` })),
  }));
}

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        schema={[
          ...servicesSchema(),
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
          Everything from the first stake to the final punch list.
        </h1>
        <p className="animate-fade-up mt-7 max-w-2xl text-lg leading-relaxed text-granite-600 [animation-delay:160ms]">
          We self-perform framing, trim and tile, and we hold our subs to the same standard. That is
          why the finish work looks like one hand made it.
        </p>
      </section>

      <section className="container-page pb-24">
        <div className="grid gap-px overflow-hidden rounded-xl bg-granite-200">
          {services.map((service, index) => (
            <article
              key={service.slug}
              id={service.slug}
              className="grid gap-8 bg-granite-50 p-8 transition-colors duration-300 hover:bg-white sm:p-12 lg:grid-cols-12 scroll-mt-28"
            >
              <div className="lg:col-span-1">
                <span className="font-display text-sm font-semibold text-brass-600">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="lg:col-span-5">
                <h2 className="font-display text-2xl font-semibold text-granite-900">{service.title}</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-granite-600">{service.summary}</p>
              </div>
              <div className="lg:col-span-6">
                <p className="text-[15px] leading-relaxed text-granite-600">{service.detail}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {service.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="rounded-full border border-granite-200 bg-white px-3.5 py-1.5 text-xs font-medium text-granite-600"
                    >
                      {bullet}
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
              Not sure which of these your project is?
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-granite-600">
              Most aren&rsquo;t just one. Tell us what you&rsquo;re picturing and we&rsquo;ll scope it
              honestly — including when the answer is &ldquo;you don&rsquo;t need us for that.&rdquo;
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 rounded-full bg-granite-900 px-8 py-4 text-sm font-medium text-granite-50 transition-all duration-300 hover:bg-brass-500"
          >
            Get an estimate
          </Link>
        </div>
      </section>
    </>
  );
}
