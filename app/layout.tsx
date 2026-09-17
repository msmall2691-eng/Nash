import type { Metadata, Viewport } from "next";
import { Inter, Roboto_Slab } from "next/font/google";

import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { Navbar } from "@/components/Navbar";
import { localBusinessSchema, websiteSchema } from "@/lib/schema";
import { FOUNDED_YEAR, localKeywords, site, siteUrl } from "@/lib/site";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

/**
 * Display face.
 *
 * A slab serif rather than the previous high-contrast display serif: the old
 * face read elegant and soft at heading sizes, which is the wrong register for
 * a commercial and industrial contractor. Slab keeps weight and structure —
 * sturdy and industrial without being aggressive — and it shares a serif
 * skeleton with the wordmark in the logo.
 */
const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-display-slab",
});

/**
 * Site-wide metadata.
 *
 * `title.template` means every route only supplies its own leaf title, and the
 * locality-rich keyword set is generated from `lib/site.ts` rather than typed by
 * hand — add a town there and it propagates to every page.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  // Google truncates around 60 characters, so the suffix stays short and each
  // route supplies a leaf title that fits inside the remainder.
  title: {
    default: `${site.name} | Commercial & Industrial Contractor`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: localKeywords,
  authors: [{ name: site.legalName, url: siteUrl }],
  creator: site.legalName,
  publisher: site.legalName,
  category: "Construction",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: site.name,
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    images: [{ url: "/projects/marzen-group.jpg", width: 1000, height: 748, alt: site.tagline }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    images: ["/projects/marzen-group.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  formatDetection: { telephone: true, address: true, email: true },
  // Local-pack signals that have no first-class field in the Metadata API.
  other: {
    "geo.region": `US-${site.address.region}`,
    "geo.placename": `${site.address.city}, ${site.address.regionName}`,
    "geo.position": `${site.geo.latitude};${site.geo.longitude}`,
    ICBM: `${site.geo.latitude}, ${site.geo.longitude}`,
    "business:contact_data:locality": site.address.city,
    "business:contact_data:region": site.address.regionName,
    "business:contact_data:phone_number": site.phone,
    "business:contact_data:street_address": site.address.street,
    "business:contact_data:postal_code": site.address.postalCode,
    foundingDate: String(FOUNDED_YEAR),
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f7f6" },
    { media: "(prefers-color-scheme: dark)", color: "#111110" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className={`${inter.variable} ${robotoSlab.variable}`}>
      <head>
        {/* Hoisted into <head> during SSR, so crawlers see the graph in the first byte. */}
        <JsonLd schema={[localBusinessSchema(), websiteSchema()]} />
      </head>
      <body className="flex min-h-dvh flex-col bg-granite-50 antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-granite-900 focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-granite-50"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
