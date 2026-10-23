/**
 * Shared bits of the GitHub OAuth flow that backs /admin.
 *
 * Kept out of the route handlers so the two halves of the flow cannot drift on
 * the cookie name, and so the "is this configured?" check reads the same way in
 * both places.
 */

export const OAUTH_STATE_COOKIE = "nash_oauth_state";

/**
 * Returns a message to show when the OAuth app has not been set up yet, or null
 * when it has.
 *
 * The editor is a convenience bolted onto a site that works without it, so a
 * missing credential must never be able to break anything. Both routes fail
 * with a readable sentence instead of a stack trace, and the rest of the site
 * does not import this module at all.
 */
export function oauthConfigError(): string | null {
  const hasId = Boolean(process.env.GITHUB_OAUTH_CLIENT_ID?.trim());
  const hasSecret = Boolean(process.env.GITHUB_OAUTH_CLIENT_SECRET?.trim());

  if (hasId && hasSecret) return null;

  const missing = [
    !hasId && "GITHUB_OAUTH_CLIENT_ID",
    !hasSecret && "GITHUB_OAUTH_CLIENT_SECRET",
  ].filter(Boolean);

  return (
    `The website editor is not configured yet: ${missing.join(" and ")} ` +
    `${missing.length > 1 ? "are" : "is"} missing from this deployment's ` +
    `environment variables. See "Setting up the editor" in README.md. ` +
    `The website itself is unaffected.`
  );
}

/**
 * The HTML the popup becomes once GitHub has sent us back.
 *
 * Decap's handshake: the popup announces itself to whatever opened it, the
 * opener answers, and only then does the popup hand over the token. Waiting for
 * that answer is what lets us address the token message to one specific origin
 * instead of broadcasting it with "*" — a wildcard here would hand a repository
 * write token to any page that managed to get a handle on this window.
 */
export function handshakePage(payload: string, allowedOrigin: string): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="robots" content="noindex, nofollow" />
    <title>Signing in…</title>
  </head>
  <body>
    <p style="font-family: system-ui, sans-serif; margin: 2rem;">
      Signing in… you can close this window if it does not close itself.
    </p>
    <script>
      (function () {
        var payload = ${JSON.stringify(payload)};
        var allowedOrigin = ${JSON.stringify(allowedOrigin)};

        if (!window.opener) {
          document.body.textContent =
            "This page has to be opened from the editor at /admin.";
          return;
        }

        function handle(event) {
          // Only ever answer our own origin. The token is in the payload.
          if (event.origin !== allowedOrigin) return;
          window.removeEventListener("message", handle, false);
          window.opener.postMessage(payload, allowedOrigin);
          window.close();
        }

        window.addEventListener("message", handle, false);
        window.opener.postMessage("authorizing:github", allowedOrigin);
      })();
    </script>
  </body>
</html>`;
}
