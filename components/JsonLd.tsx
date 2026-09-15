/**
 * Injects a Schema.org graph into the document head.
 *
 * Next hoists `<script>` elements rendered by a Server Component into `<head>`,
 * so the payload ships with the initial HTML — no client JS involved.
 */
export function JsonLd({ schema }: { schema: object | object[] }) {
  const payload = Array.isArray(schema) ? schema : [schema];

  return (
    <>
      {payload.map((entry, index) => (
        <script
          key={index}
          type="application/ld+json"
          // Schema objects are built server-side from `lib/site.ts`, never from user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(entry).replace(/</g, "\\u003c") }}
        />
      ))}
    </>
  );
}
