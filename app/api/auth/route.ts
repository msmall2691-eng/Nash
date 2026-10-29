import { randomBytes } from "node:crypto";

import { NextResponse } from "next/server";

import { oauthConfigError, OAUTH_STATE_COOKIE } from "@/lib/oauth";

/**
 * Step one of the GitHub sign-in behind /admin.
 *
 * Decap opens this in a popup, we bounce the editor to GitHub, and
 * /api/callback finishes the exchange. Nothing here is Decap-specific beyond
 * the scope: this is the ordinary OAuth authorization-code flow.
 *
 * `repo` is the narrowest scope that works. Decap commits content through the
 * GitHub API as the signed-in person, so the token needs write access to this
 * repository — and GitHub will only issue one to an account that already has
 * push access, which is what makes the repository's collaborator list the
 * actual access-control list for the editor.
 */
export const dynamic = "force-dynamic";

export function GET(request: Request) {
  const configError = oauthConfigError();
  if (configError) {
    return new NextResponse(configError, {
      status: 500,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  }

  const origin = new URL(request.url).origin;

  // Signed-cookie CSRF guard: an attacker who can make the victim's browser hit
  // the callback cannot also forge a matching cookie, so a callback whose state
  // does not match a state we issued is rejected rather than exchanged.
  const state = randomBytes(32).toString("hex");

  const authorize = new URL("https://github.com/login/oauth/authorize");
  authorize.searchParams.set("client_id", process.env.GITHUB_OAUTH_CLIENT_ID!);
  authorize.searchParams.set("redirect_uri", `${origin}/api/callback`);
  authorize.searchParams.set("scope", "repo");
  authorize.searchParams.set("state", state);

  const response = NextResponse.redirect(authorize.toString());
  response.cookies.set(OAUTH_STATE_COOKIE, state, {
    httpOnly: true,
    secure: origin.startsWith("https://"),
    sameSite: "lax",
    path: "/api",
    maxAge: 10 * 60,
  });

  return response;
}
