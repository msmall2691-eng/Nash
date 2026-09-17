"use client";

import { useCallback, useMemo, useState } from "react";

import { GalleryFilter, type FilterOption } from "@/components/GalleryFilter";
import { ProjectLightbox } from "@/components/ProjectLightbox";
import { ProtectedImage } from "@/components/ProtectedImage";
import { PROJECT_SECTORS, projects, type Project, type ProjectSector } from "@/lib/projects";

type SectorFilter = ProjectSector | "All";

function matches(project: Project, sector: SectorFilter): boolean {
  return sector === "All" || project.sector === sector;
}

/**
 * Descriptive alt text, built from the detail we actually have.
 *
 * Alt text is the single biggest image-SEO lever: it is what Google Images
 * ranks on, and what a screen reader announces. Generating it from the project
 * record means it can never drift from the caption shown on screen.
 */
export function altFor(project: Project): string {
  const where = project.town ? ` in ${project.town}, NH` : " in southern New Hampshire";
  const what = project.scope?.length ? `${project.scope[0]} — ` : "";
  return `${what}${project.title}, a ${project.sector.toLowerCase()} project by Nash Construction${where}`;
}

/**
 * Optional detail renders only when it has been confirmed for that project, so
 * a name-and-sector entry still reads as finished rather than as a gap.
 */
function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  const meta = [project.town, project.year ? String(project.year) : null]
    .filter(Boolean)
    .join(" · ");

  return (
    <article
      className="animate-fade-up group relative overflow-hidden rounded-xl bg-granite-900 shadow-sm ring-1 ring-granite-200 transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-granite-900/20"
      // Stagger the entrance so a filter change cascades instead of snapping.
      style={{ animationDelay: `${Math.min(index, 7) * 65}ms` }}
    >
      <div className="relative aspect-4/3 overflow-hidden">
        {/*
          A project without a confirmed photograph gets a branded panel rather
          than filler imagery. Abstract generated art sitting among real site
          photos reads as a broken image, and inventing a photo is not an option.
        */}
        {!project.hasPhoto ? (
          <div className="absolute inset-0 grid place-items-center bg-granite-800">
            <span className="px-6 text-center font-display text-lg font-semibold text-granite-300/80">
              Photography coming soon
            </span>
          </div>
        ) : (
        <ProtectedImage
          src={project.image}
          alt={altFor(project)}
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
        )}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-granite-950 via-granite-950/65 to-granite-950/5 transition-opacity duration-500"
        />
        <span className="absolute left-4 top-4 z-20 rounded-full bg-granite-50/90 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-granite-800 backdrop-blur-sm">
          {project.sector}
        </span>
      </div>

      {project.hasPhoto && (
        <button
          type="button"
          onClick={onOpen}
          className="absolute inset-0 z-20 cursor-zoom-in focus-visible:outline-offset-[-3px]"
        >
          <span className="sr-only">{`View ${project.title} enlarged`}</span>
        </button>
      )}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5">
        <h3 className="font-display text-lg font-semibold text-granite-50">{project.title}</h3>
        {meta && <p className="mt-1 text-xs uppercase tracking-[0.14em] text-granite-300">{meta}</p>}
        {project.summary && (
          <p className="mt-3 max-h-0 overflow-hidden text-sm leading-relaxed text-granite-200 opacity-0 transition-all duration-500 ease-out group-hover:max-h-40 group-hover:opacity-100">
            {project.summary}
          </p>
        )}
        {project.scope && project.scope.length > 0 && (
          <p className="mt-3 text-[11px] uppercase tracking-[0.14em] text-granite-300">
            {project.scope.join(" · ")}
          </p>
        )}
        {project.squareFeet && (
          <p className="mt-2 text-[11px] uppercase tracking-[0.14em] text-granite-300">
            {project.squareFeet.toLocaleString("en-US")} sq ft
          </p>
        )}
      </div>
    </article>
  );
}

export function GalleryGrid() {
  const [sector, setSector] = useState<SectorFilter>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const visible = useMemo(() => projects.filter((project) => matches(project, sector)), [sector]);

  const sectorOptions: FilterOption<ProjectSector>[] = useMemo(
    () => [
      { value: "All", label: "All work", count: projects.length },
      ...PROJECT_SECTORS.map((option) => ({
        value: option,
        label: option,
        count: projects.filter((project) => project.sector === option).length,
      })),
    ],
    [],
  );

  // Only photographed projects can be enlarged, so the lightbox navigates that
  // subset — otherwise the arrows would step onto an empty frame.
  const viewable = useMemo(() => visible.filter((project) => project.hasPhoto), [visible]);

  const openLightbox = useCallback(
    (project: Project) => {
      const at = viewable.findIndex((candidate) => candidate.slug === project.slug);
      if (at >= 0) setLightboxIndex(at);
    },
    [viewable],
  );

  const navigate = useCallback(
    (delta: number) => {
      setLightboxIndex((current) => {
        if (current === null || viewable.length === 0) return current;
        return (current + delta + viewable.length) % viewable.length;
      });
    },
    [viewable.length],
  );

  // Part of each card's key, so a filter change remounts the grid and replays
  // the staggered entrance rather than swapping content in place.
  const generation = sector;

  return (
    <div>
      <div className="border-b border-granite-200 pb-8">
        <GalleryFilter label="Sector" options={sectorOptions} value={sector} onChange={setSector} />
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <p aria-live="polite" className="text-sm text-granite-500">
          Showing <span className="font-medium tabular-nums text-granite-900">{visible.length}</span> of{" "}
          {projects.length} projects
        </p>
        {sector !== "All" && (
          <button
            type="button"
            onClick={() => setSector("All")}
            className="animate-fade-in text-sm font-medium text-granite-500 underline-offset-4 transition-colors hover:text-brand-600 hover:underline"
          >
            Clear filter
          </button>
        )}
      </div>

      {visible.length > 0 ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((project, index) => (
            <ProjectCard
              key={`${generation}-${project.slug}`}
              project={project}
              index={index}
              onOpen={() => openLightbox(project)}
            />
          ))}
        </div>
      ) : (
        <div className="animate-fade-up mt-8 rounded-xl border border-dashed border-granite-300 bg-white px-8 py-20 text-center">
          <p className="font-display text-xl text-granite-800">Nothing published in that sector yet.</p>
          <p className="mx-auto mt-2 max-w-sm text-sm text-granite-500">
            We&rsquo;ve almost certainly built something comparable — ask us and we&rsquo;ll walk you
            through it.
          </p>
        </div>
      )}

      <ProjectLightbox
        projects={viewable}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={navigate}
      />
    </div>
  );
}
