import type { Metadata } from "next";
import Link from "next/link";

import { GalleryGrid } from "@/components/GalleryGrid";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { projects } from "@/lib/projects";
import { breadcrumbSchema, imageObjectSchema } from "@/lib/schema";
import { site, siteUrl } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Projects",
  description:
    "Commercial, industrial and residential projects by Nash Construction across Nashua and southern New Hampshire.",
  path: "/projects",
  keywords: [
    "Nashua NH commercial construction projects",
    "NH retail fit-up portfolio",
    "restaurant build out contractor New Hampshire",
  ],
});

function projectListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${site.name} project portfolio`,
    numberOfItems: projects.length,
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: project.title,
        image: `${siteUrl}${project.image}`,
        ...(project.hasPhoto
          ? { thumbnailUrl: `${siteUrl}${project.image}`, creator: { "@type": "Organization", name: site.legalName } }
          : {}),
        ...(project.summary ? { description: project.summary } : {}),
        ...(project.year ? { dateCreated: String(project.year) } : {}),
        ...(project.town
          ? { locationCreated: { "@type": "Place", name: `${project.town}, NH` } }
          : {}),
      },
    })),
  };
}

export default function ProjectsPage() {
  return (
    <>
      <JsonLd
        schema={[
          projectListSchema(),
          // Only photographed work gets an ImageObject — we do not ask Google to
          // index generated placeholders.
          ...projects
            .filter((project) => project.hasPhoto)
            .map((project) =>
              imageObjectSchema({
                url: project.image,
                name: project.title,
                caption: project.summary ?? `${project.title} — ${project.sector} project by ${site.legalName}`,
              }),
            ),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
          ]),
        ]}
      />

      <section className="container-page pt-20 pb-12">
        <p className="animate-fade-up text-xs font-medium uppercase tracking-[0.2em] text-brand-600">
          Projects
        </p>
        <h1 className="animate-fade-up mt-5 max-w-3xl font-display text-[clamp(2.25rem,5vw,3.5rem)] font-semibold leading-[1.05] text-granite-900 [animation-delay:80ms]">
          Work you can walk into.
        </h1>
        <p className="animate-fade-up mt-7 max-w-2xl text-lg leading-relaxed text-granite-600 [animation-delay:160ms]">
          Commercial fit-ups, industrial concrete work, and residential garages and additions across
          southern New Hampshire and northern Massachusetts. We have also worked for public and
          municipal clients, including the City of Nashua.
        </p>
      </section>

      <section className="container-page pb-16">
        <GalleryGrid />
      </section>

      <section className="container-page pb-24">
        <div className="flex flex-col items-start justify-between gap-8 rounded-2xl border border-dashed border-granite-300 bg-white p-10 sm:flex-row sm:items-center sm:p-12">
          <div className="max-w-xl">
            <h2 className="font-display text-xl font-semibold text-granite-900">
              More recent work is on its way.
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-granite-600">
              We&rsquo;re adding photography and details from current projects. If you&rsquo;d like to
              see work similar to what you&rsquo;re planning, ask — we can usually point you at
              something nearby you can go look at.
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 rounded-full bg-granite-900 px-8 py-4 text-sm font-medium text-granite-50 transition-all duration-300 hover:bg-brand-500"
          >
            Ask about similar work
          </Link>
        </div>
      </section>
    </>
  );
}
