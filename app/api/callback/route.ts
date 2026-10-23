import { timingSafeEqual } from "node:crypto";

import { NextResponse } from "next/server";

import { handshakePage, oauthConfigError, OAUTH_STATE_COOKIE } from "@/lib/oauth";

/**
 * Step two of the GitHub sign-in behind /admin.
 *
 * GitHub sends the editor back here with a short-lived code; we trade it for an
 * access token server-side (which is the whole point of the flow — the client
 * secret never reaches the browser) and hand the token to the Decap window
 * that opened this one.
 */
export const dynamic = "force-dynamic";

/** Constant-time compare that tolerates differing lengths without throwing. */
function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

function fail(message: string, status = 400) {
  return new NextResponse(message, {
    status,
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}

export async function GET(request: Request) {
  const configError = oauthConfigError();
  if (configError) return fail(configError, 500);

  const url = new URL(request.url);
  const origin = url.origin;

  // GitHub reports a refusal in-band rather than by status code.
  const oauthError = url.searchParams.get("error");
  if (oauthError) {
    const description = url.searchParams.get("error_description") ?? oauthError;
    return fail(`GitHub declined the sign-in: ${description}`);
  }

  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  if (!code || !state) return fail("This link is missing its sign-in code. Start again from /admin.");

  const expected = request.headers
    .get("cookie")
    ?.split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${OAUTH_STATE_COOKIE}=`))
    ?.slice(OAUTH_STATE_COOKIE.length + 1);

  // No cookie, or one that does not match, means this callback did not come
  // from a sign-in this site started.
  if (!expected || !safeEqual(state, expected)) {
    return fail(
      "This sign-in could not be verified — it may have expired, or it was not " +
        "started from this site. Close this window and try again from /admin.",
    );
  }

  let token: string | undefined;
  let tokenError: string | undefined;
  try {
    const response = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: { "content-type": "application/json", accept: "application/json" },
      body: JSON.stringify({
        client_id: process.env.GITHUB_OAUTH_CLIENT_ID,
        client_secret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
        code,
        redirect_uri: `${origin}/api/callback`,
      }),
    });

    // GitHub answers 200 with an `error` field for a bad or reused code.
    const body = (await response.json()) as {
      access_token?: string;
      error?: string;
      error_description?: string;
    };

    if (body.access_token) token = body.access_token;
    else tokenError = body.error_description ?? body.error ?? `GitHub returned ${response.status}`;
  } catch {
    tokenError = "Could not reach GitHub to complete the sign-in.";
  }

  const payload = token
    ? `authorization:github:success:${JSON.stringify({ token, provider: "github" })}`
    : `authorization:github:error:${JSON.stringify({ message: tokenError })}`;

  const page = new NextResponse(handshakePage(payload, origin), {
    status: token ? 200 : 401,
    headers: {
      "content-type": "text/html; charset=utf-8",
      // The token is in this document. Keep it out of every cache.
      "cache-control": "no-store, max-age=0",
      "referrer-policy": "no-referrer",
    },
  });

  // Single-use: the state has done its job either way.
  page.cookies.set(OAUTH_STATE_COOKIE, "", { path: "/api", maxAge: 0 });

  return page;
}
