import { projects } from "@/lib/projects";
import { site, siteUrl } from "@/lib/site";

/**
 * Google image sitemap.
 *
 * Next's `MetadataRoute.Sitemap` type has no `image:` namespace, so this is a
 * hand-built route. Only photographed projects are listed — submitting
 * generated placeholders would waste crawl budget and teach Google nothing.
 */
export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function GET(): Response {
  const photographed = projects.filter((project) => project.hasPhoto);

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${siteUrl}/projects</loc>
${photographed
  .map(
    (project) => `    <image:image>
      <image:loc>${siteUrl}${project.image}</image:loc>
      <image:title>${escapeXml(project.title)}</image:title>
      <image:caption>${escapeXml(
        project.summary ?? `${project.title} — ${project.sector} project by ${site.legalName}`,
      )}</image:caption>
    </image:image>`,
  )
  .join("\n")}
  </url>
</urlset>
`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
