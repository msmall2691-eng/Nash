"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { GalleryFilter, type FilterOption } from "@/components/GalleryFilter";
import {
  PROJECT_CATEGORIES,
  PROJECT_REGIONS,
  projects,
  type Project,
  type ProjectCategory,
  type ProjectRegion,
} from "@/lib/projects";

type CategoryFilter = ProjectCategory | "All";
type RegionFilter = ProjectRegion | "All";

function matches(project: Project, category: CategoryFilter, region: RegionFilter): boolean {
  return (
    (category === "All" || project.category === category) &&
    (region === "All" || project.region === region)
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article
      className="animate-fade-up group relative overflow-hidden rounded-xl bg-granite-900 shadow-sm ring-1 ring-granite-200 transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-granite-900/20"
      // Stagger the entrance so a filter change cascades instead of snapping.
      style={{ animationDelay: `${Math.min(index, 7) * 65}ms` }}
    >
      <div className="relative aspect-4/3 overflow-hidden">
        <Image
          src={project.image}
          alt={`${project.title} — ${project.category.toLowerCase()} in ${project.town}, New Hampshire`}
          fill
          // Three-up on desktop, two-up on tablet, full-bleed on phones.
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          // Only the first row is above the fold; the rest stay lazy.
          priority={index < 3}
          loading={index < 3 ? "eager" : "lazy"}
          placeholder="blur"
          blurDataURL={project.blurDataURL}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-granite-950 via-granite-950/25 to-transparent opacity-85 transition-opacity duration-500 group-hover:opacity-95"
        />
        <span className="absolute left-4 top-4 rounded-full bg-granite-50/90 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-granite-800 backdrop-blur-sm">
          {project.category}
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-5">
        <h3 className="font-display text-lg font-semibold text-granite-50">{project.title}</h3>
        <p className="mt-1 text-xs uppercase tracking-[0.14em] text-brass-300">
          {project.town} · {project.region}
        </p>
        <p className="mt-3 max-h-0 overflow-hidden text-sm leading-relaxed text-granite-200 opacity-0 transition-all duration-500 ease-out group-hover:max-h-40 group-hover:opacity-100">
          {project.summary}
        </p>
        <p className="mt-3 text-[11px] uppercase tracking-[0.14em] text-granite-400">
          {project.year} · {project.squareFeet.toLocaleString("en-US")} sq ft
        </p>
      </div>
    </article>
  );
}

export function GalleryGrid() {
  const [category, setCategory] = useState<CategoryFilter>("All");
  const [region, setRegion] = useState<RegionFilter>("All");

  const visible = useMemo(
    () => projects.filter((project) => matches(project, category, region)),
    [category, region],
  );

  // Counts reflect the *other* active filter, so a pill never promises zero results.
  const categoryOptions: FilterOption<ProjectCategory>[] = useMemo(
    () => [
      { value: "All", label: "All work", count: projects.filter((p) => matches(p, "All", region)).length },
      ...PROJECT_CATEGORIES.map((option) => ({
        value: option,
        label: option,
        count: projects.filter((p) => matches(p, option, region)).length,
      })),
    ],
    [region],
  );

  const regionOptions: FilterOption<ProjectRegion>[] = useMemo(
    () => [
      { value: "All", label: "All of NH", count: projects.filter((p) => matches(p, category, "All")).length },
      ...PROJECT_REGIONS.map((option) => ({
        value: option,
        label: option,
        count: projects.filter((p) => matches(p, category, option)).length,
      })),
    ],
    [category],
  );

  const filtersActive = category !== "All" || region !== "All";
  // Part of each card's key, so a filter change remounts the grid and replays
  // the staggered entrance rather than swapping content in place.
  const generation = `${category}|${region}`;

  return (
    <div>
      <div className="flex flex-col gap-6 border-b border-granite-200 pb-8 md:flex-row md:gap-12">
        <GalleryFilter label="Project type" options={categoryOptions} value={category} onChange={setCategory} />
        <GalleryFilter label="Region" options={regionOptions} value={region} onChange={setRegion} />
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <p aria-live="polite" className="text-sm text-granite-500">
          Showing <span className="font-medium tabular-nums text-granite-900">{visible.length}</span> of{" "}
          {projects.length} projects
        </p>
        {filtersActive && (
          <button
            type="button"
            onClick={() => {
              setCategory("All");
              setRegion("All");
            }}
            className="animate-fade-in text-sm font-medium text-granite-500 underline-offset-4 transition-colors hover:text-brass-600 hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {visible.length > 0 ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((project, index) => (
            <ProjectCard key={`${generation}-${project.slug}`} project={project} index={index} />
          ))}
        </div>
      ) : (
        <div className="animate-fade-up mt-8 rounded-xl border border-dashed border-granite-300 bg-white px-8 py-20 text-center">
          <p className="font-display text-xl text-granite-800">No projects match that pairing yet.</p>
          <p className="mx-auto mt-2 max-w-sm text-sm text-granite-500">
            We build across the whole state — clear a filter, or tell us about your site and we&rsquo;ll
            walk you through comparable work.
          </p>
        </div>
      )}
    </div>
  );
}
