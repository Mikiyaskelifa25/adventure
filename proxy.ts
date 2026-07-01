import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const match = hostname.match(/^(fr|ru)\./);

  if (!match) {
    return NextResponse.next();
  }

  const lang = match[1];

  // Set lang cookie on the request so downstream handlers (layout, etc.)
  // can read it via cookies() even on the first visit
  const requestHeaders = new Headers(request.headers);
  const cookieHeader = requestHeaders.get("Cookie") || "";
  const cookiePairs = cookieHeader
    .split(";")
    .map((c) => c.trim())
    .filter(Boolean)
    .filter((c) => !c.startsWith("lang="));
  cookiePairs.push(`lang=${lang}`);
  requestHeaders.set("Cookie", cookiePairs.join("; "));

  // Set lang cookie on response so subsequent requests also work
  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.cookies.set("lang", lang, {
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
  });

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico|logo.ico).*)"],
};
