import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[60svh] flex-col items-center justify-center py-24 text-center">
      <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-brass-600">404</p>
      <h1 className="mt-5 max-w-xl font-display text-4xl font-semibold text-granite-900">
        That page isn&rsquo;t on the plans.
      </h1>
      <p className="mt-5 max-w-md text-[15px] leading-relaxed text-granite-600">
        The link may be old, or the page moved. Our work, services and contact details are all a click
        away.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="rounded-full bg-granite-900 px-7 py-3.5 text-sm font-medium text-granite-50 transition-colors hover:bg-brass-500"
        >
          Back home
        </Link>
        <Link
          href="/gallery"
          className="rounded-full border border-granite-300 px-7 py-3.5 text-sm font-medium text-granite-700 transition-colors hover:border-granite-900 hover:text-granite-900"
        >
          See our projects
        </Link>
      </div>
    </section>
  );
}
