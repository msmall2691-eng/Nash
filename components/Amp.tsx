import { Fragment } from "react";

/**
 * Renders an ampersand in the sans face inside display type.
 *
 * Fraunces' only ampersand is a decorative swash that reads as a registered-
 * trademark mark at heading sizes ("Mechanical ® Electrical"), and no stylistic
 * set replaces it. Rather than rewriting the copy to "and", we swap the font for
 * that one glyph and leave the text exactly as written.
 */
export function Amp({ children }: { children: string }) {
  if (!children.includes("&")) return <>{children}</>;

  const parts = children.split("&");

  return (
    <>
      {parts.map((part, index) => (
        <Fragment key={index}>
          {part}
          {index < parts.length - 1 && (
            <span className="font-sans font-normal">&amp;</span>
          )}
        </Fragment>
      ))}
    </>
  );
}
