import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { JsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { projects } from "@/lib/projects";
import { process } from "@/lib/services";
import { breadcrumbSchema } from "@/lib/schema";
import { serviceAreas, site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "About Our New Hampshire Builders",
  description: `Nash Construction has built custom homes and remodels across New Hampshire since ${site.founded}. Meet the crew, our process, and the standards we hold ourselves to.`,
  path: "/about",
  keywords: ["about Nash Construction", "New Hampshire builder reputation", "NH construction company Meredith"],
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />

      <section className="container-page pt-20 pb-16">
        <p className="animate-fade-up text-xs font-medium uppercase tracking-[0.2em] text-brass-600">
          About us
        </p>
        <h1 className="animate-fade-up mt-5 max-w-3xl font-display text-[clamp(2.25rem,5vw,3.5rem)] font-semibold leading-[1.05] text-granite-900 [animation-delay:80ms]">
          We build in one state, and we know it cold.
        </h1>
        <p className="animate-fade-up mt-7 max-w-2xl text-lg leading-relaxed text-granite-600 [animation-delay:160ms]">
          Nash Construction started in {site.founded} with one truck and a framing crew in Meredith.
          Twenty years on, we&rsquo;re still a superintendent-on-site company — because that is the
          only way we know to build a house that behaves the way the drawings promised.
        </p>
      </section>

      <section className="relative h-[46svh] min-h-80 w-full overflow-hidden">
        <Image
          src={projects[6]?.image ?? "/projects/hanover-timber-frame.jpg"}
          alt="A timber frame raised by the Nash Construction crew in Hanover, New Hampshire"
          fill
          sizes="100vw"
          placeholder="blur"
          blurDataURL={projects[6]?.blurDataURL}
          className="object-cover"
        />
      </section>

      <section className="container-page grid gap-12 py-24 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 className="font-display text-3xl font-semibold text-granite-900">
            What twenty New Hampshire winters teach you
          </h2>
        </div>
        <div className="space-y-6 text-[15px] leading-relaxed text-granite-600 lg:col-span-7">
          <p>
            Ledge shows up where the soils report said loam. Mud season eats three weeks if you let
            it. A shoreland permit takes longer than the foundation. None of that is bad luck —
            it&rsquo;s just building here, and it belongs in the schedule from day one rather than in
            an apologetic email in April.
          </p>
          <p>
            So we price honestly, we sequence around the weather, and we put every allowance in
            writing before a permit is pulled. When something does move, you hear it from your
            superintendent the same week — not from the invoice.
          </p>
          <p>
            We cap the number of projects we run at once. That is a deliberate ceiling on how fast we
            grow, and the reason our clients get a phone number that a person answers.
          </p>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container-page">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-brass-600">How we work</p>
          <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold text-granite-900">
            Four phases, no surprises in between.
          </h2>

          <ol className="mt-14 grid gap-px overflow-hidden rounded-xl bg-granite-200 md:grid-cols-4">
            {process.map((phase) => (
              <li key={phase.step} className="bg-white p-8">
                <span className="font-display text-sm font-semibold text-brass-600">{phase.step}</span>
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
            Licensed, insured, and accountable in {serviceAreas.length} New Hampshire regions.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-granite-400">
            {site.license} · Fully insured · Two-year written workmanship warranty on every project we
            deliver.
          </p>
          <Link
            href="/contact"
            className="mt-10 inline-block rounded-full bg-brass-500 px-8 py-4 text-sm font-medium text-granite-950 transition-all duration-300 hover:bg-brass-400 hover:shadow-xl hover:shadow-brass-500/30"
          >
            Start a conversation
          </Link>
        </div>
      </section>
    </>
  );
}
