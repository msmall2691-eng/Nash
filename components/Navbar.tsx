"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { fullNavigation, navigation, site } from "@/lib/site";

/** Routes whose hero is a full-bleed dark image the transparent navbar sits on. */
const DARK_HERO_ROUTES = new Set(["/", "/commercial", "/industrial", "/about"]);

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Swap to the solid treatment once the hero is behind us.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // A route change should never leave the mobile sheet hanging open. Adjusting
  // during render rather than in an effect avoids a cascading second render —
  // React restarts this render immediately instead of committing the stale UI.
  const [renderedPath, setRenderedPath] = useState(pathname);
  if (renderedPath !== pathname) {
    setRenderedPath(pathname);
    setOpen(false);
  }

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  /**
   * While we're transparent over a dark hero the default dark-on-light palette
   * drops below readable contrast, so the whole bar inverts until we scroll.
   */
  const onDark = DARK_HERO_ROUTES.has(pathname) && !scrolled && !open;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-granite-200 bg-granite-50/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav aria-label="Primary" className="container-page flex h-20 items-center justify-between gap-6">
        <Link href="/" className="group flex items-center gap-3" aria-label={`${site.name} home`}>
          <span
            className={`grid size-10 place-items-center rounded-sm transition-colors duration-300 ${
              onDark ? "bg-granite-50 group-hover:bg-brass-400" : "bg-granite-900 group-hover:bg-brass-500"
            }`}
          >
            <span
              className={`font-display text-lg font-bold leading-none ${
                onDark ? "text-granite-950" : "text-granite-50"
              }`}
            >
              N
            </span>
          </span>
          <span className="flex flex-col leading-none">
            <span
              className={`font-display text-lg font-semibold tracking-tight transition-colors duration-300 ${
                onDark ? "text-granite-50" : "text-granite-900"
              }`}
            >
              {site.name}
            </span>
            <span
              className={`mt-1 text-[11px] uppercase tracking-[0.18em] transition-colors duration-300 ${
                onDark ? "text-granite-300" : "text-granite-500"
              }`}
            >
              Nashua, New Hampshire
            </span>
          </span>
        </Link>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {navigation.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative rounded-full px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    onDark
                      ? active
                        ? "text-granite-50"
                        : "text-granite-300 hover:text-granite-50"
                      : active
                        ? "text-granite-900"
                        : "text-granite-500 hover:text-granite-900"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute inset-x-3 -bottom-0.5 h-px origin-left transition-transform duration-300 ${
                      onDark ? "bg-brass-400" : "bg-brass-500"
                    } ${active ? "scale-x-100" : "scale-x-0"}`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${site.phone}`}
            className={`text-sm font-medium transition-colors duration-300 ${
              onDark ? "text-granite-200 hover:text-brass-400" : "text-granite-600 hover:text-brass-600"
            }`}
          >
            {site.phoneDisplay}
          </a>
          <Link
            href="/contact"
            className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
              onDark
                ? "bg-granite-50 text-granite-950 hover:bg-brass-400"
                : "bg-granite-900 text-granite-50 hover:bg-brass-500 hover:shadow-lg hover:shadow-brass-500/20"
            }`}
          >
            Request a Consultation
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className={`grid size-10 place-items-center rounded-full transition-colors lg:hidden ${
            onDark ? "text-granite-50 hover:bg-granite-50/10" : "text-granite-800 hover:bg-granite-100"
          }`}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M3.5 7h17M3.5 12h17M3.5 17h17" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-granite-200 bg-granite-50 lg:hidden"
      >
        <ul className="container-page flex flex-col py-3">
          {fullNavigation.map((item, index) => (
            <li key={item.href} className="animate-fade-up" style={{ animationDelay: `${index * 40}ms` }}>
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`block border-b border-granite-100 py-3.5 text-base font-medium ${
                  isActive(item.href) ? "text-brass-600" : "text-granite-800"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="flex flex-col gap-3 pt-4">
            <a href={`tel:${site.phone}`} className="text-center text-sm font-medium text-granite-600">
              {site.phoneDisplay}
            </a>
            <Link
              href="/contact"
              className="block rounded-full bg-granite-900 px-5 py-3 text-center text-sm font-medium text-granite-50"
            >
              Request a Consultation
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
