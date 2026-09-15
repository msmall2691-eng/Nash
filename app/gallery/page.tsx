import type { Metadata } from "next";

import { GalleryGrid } from "@/components/GalleryGrid";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { projects } from "@/lib/projects";
import { breadcrumbSchema } from "@/lib/schema";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Project Gallery",
  description:
    "Custom homes, remodels and commercial builds by Nash Construction across the Lakes Region, Seacoast, Merrimack Valley, Dartmouth–Sunapee and White Mountains of New Hampshire.",
  path: "/gallery",
  keywords: [
    "New Hampshire custom home photos",
    "NH remodel portfolio",
    "Lakes Region construction gallery",
    "Seacoast NH builder projects",
  ],
});

function galleryListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Nash Construction New Hampshire project gallery",
    numberOfItems: projects.length,
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: project.title,
        description: project.summary,
        image: `${siteUrl}${project.image}`,
        dateCreated: String(project.year),
        locationCreated: { "@type": "Place", name: `${project.town}, NH` },
      },
    })),
  };
}

export default function GalleryPage() {
  return (
    <>
      <JsonLd
        schema={[
          galleryListSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Gallery", path: "/gallery" },
          ]),
        ]}
      />

      <section className="container-page pt-20 pb-12">
        <p className="animate-fade-up text-xs font-medium uppercase tracking-[0.2em] text-brass-600">
          Gallery
        </p>
        <h1 className="animate-fade-up mt-5 max-w-3xl font-display text-[clamp(2.25rem,5vw,3.5rem)] font-semibold leading-[1.05] text-granite-900 [animation-delay:80ms]">
          Work you can drive past.
        </h1>
        <p className="animate-fade-up mt-7 max-w-2xl text-lg leading-relaxed text-granite-600 [animation-delay:160ms]">
          Filter by what we built and where. Every one of these has an owner who will take your call —
          ask us and we&rsquo;ll connect you.
        </p>
      </section>

      <section className="container-page pb-24">
        <GalleryGrid />
      </section>
    </>
  );
}
