"use client";

import { useCallback, useEffect, useRef } from "react";

import { ProtectedImage } from "@/components/ProtectedImage";
import { altFor } from "@/components/GalleryGrid";
import type { Project } from "@/lib/projects";

type Props = {
  projects: Project[];
  /** Index into `projects`, or null when closed. */
  index: number | null;
  onClose: () => void;
  onNavigate: (delta: number) => void;
};

/**
 * Enlarged view of a project photograph.
 *
 * Built on the native <dialog> element, which supplies the focus trap, the
 * inert background and Escape-to-close for free — all things a hand-rolled
 * overlay tends to get wrong. The image is `fill` + `object-contain` inside a
 * viewport-capped box, so any aspect ratio is shown whole and undistorted
 * without needing each file's intrinsic dimensions.
 */
export function ProjectLightbox({ projects, index, onClose, onNavigate }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const open = index !== null;
  const current = index === null ? null : (projects[index] ?? null);

  // Drive the native dialog from React state rather than the other way around.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // The page behind a modal should not scroll with it.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") onNavigate(1);
      if (event.key === "ArrowLeft") onNavigate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onNavigate]);

  // Clicking the backdrop lands on the <dialog> itself, never on its contents.
  const onBackdropClick = useCallback(
    (event: React.MouseEvent<HTMLDialogElement>) => {
      if (event.target === dialogRef.current) onClose();
    },
    [onClose],
  );

  const meta = current
    ? [current.town, current.year ? String(current.year) : null].filter(Boolean).join(" · ")
    : "";

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={onBackdropClick}
      aria-label={current ? `${current.title}, enlarged` : "Project photograph"}
      className="max-h-none max-w-none bg-transparent p-0 backdrop:bg-granite-950/90 backdrop:backdrop-blur-sm"
    >
      {current !== null && index !== null && (
        <div className="flex h-svh w-screen flex-col items-center justify-center p-4 sm:p-8">
          <figure className="animate-scale-in flex w-full max-w-5xl flex-col overflow-hidden rounded-xl bg-granite-900 shadow-2xl">
            <div className="relative h-[52svh] w-full bg-granite-950 sm:h-[62svh]">
              <ProtectedImage
                src={current.image}
                alt={altFor(current)}
                fill
                sizes="(min-width: 1024px) 1024px, 100vw"
                placeholder="blur"
                blurDataURL={current.blurDataURL}
                className="object-contain"
              />
            </div>

            <figcaption className="flex flex-col gap-3 border-t border-granite-800 p-6 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
              <div className="min-w-0">
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-granite-400">
                  {current.sector}
                  {meta && ` · ${meta}`}
                </p>
                <h2 className="mt-1.5 font-display text-xl font-semibold text-granite-50">
                  {current.title}
                </h2>
                {current.summary && (
                  <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-granite-300">
                    {current.summary}
                  </p>
                )}
              </div>
              <p className="shrink-0 text-xs tabular-nums text-granite-500">
                {index + 1} / {projects.length}
              </p>
            </figcaption>
          </figure>

          {/* Controls sit outside the figure so they never overlap the photograph. */}
          <div className="mt-4 flex items-center gap-2">
            <button
              type="button"
              onClick={() => onNavigate(-1)}
              className="grid size-11 place-items-center rounded-full border border-granite-700 text-granite-200 transition-colors hover:border-granite-400 hover:text-white"
            >
              <span className="sr-only">Previous project</span>
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
                <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-granite-700 px-5 py-2.5 text-sm font-medium text-granite-200 transition-colors hover:border-granite-400 hover:text-white"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => onNavigate(1)}
              className="grid size-11 place-items-center rounded-full border border-granite-700 text-granite-200 transition-colors hover:border-granite-400 hover:text-white"
            >
              <span className="sr-only">Next project</span>
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
                <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </dialog>
  );
}
