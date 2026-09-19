import Link from "next/link";

/**
 * The visible counterpart to `breadcrumbSchema`.
 *
 * Every secondary page already emits a `BreadcrumbList` for Google, but
 * nothing on the page itself showed one — search engines are cautious about
 * rich results (like the breadcrumb trail shown under a search listing) that
 * don't match what a visitor actually sees, so an invisible-only breadcrumb is
 * a soft SEO risk as well as a missed navigation aid.
 *
 * Callers pass the exact same `trail` array to this component and to
 * `breadcrumbSchema`, so the visible trail and the structured data can never
 * drift apart — there is one list per page, not two.
 */
export function Breadcrumbs({
  trail,
  tone = "light",
}: {
  trail: ReadonlyArray<{ name: string; path: string }>;
  tone?: "dark" | "light";
}) {
  const textClass =
    tone === "dark"
      ? "text-granite-300 [&_a:hover]:text-granite-50"
      : "text-granite-500 [&_a:hover]:text-granite-900";

  return (
    <nav aria-label="Breadcrumb" className={`mb-5 text-xs ${textClass}`}>
      <ol className="flex flex-wrap items-center gap-1.5">
        {trail.map((crumb, index) => {
          const isLast = index === trail.length - 1;
          return (
            <li key={crumb.path} className="flex items-center gap-1.5">
              {index > 0 && (
                <span aria-hidden="true" className="text-current opacity-50">
                  /
                </span>
              )}
              {isLast ? (
                <span aria-current="page" className="font-medium">
                  {crumb.name}
                </span>
              ) : (
                <Link href={crumb.path} className="underline-offset-2 transition-colors hover:underline">
                  {crumb.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
