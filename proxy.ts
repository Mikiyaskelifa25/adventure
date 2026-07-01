import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const hostname = request.headers.get("host") || "";

  if (hostname.startsWith("fr.")) {
    const response = NextResponse.next();
    response.cookies.set("lang", "fr", {
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365,
    });
    return response;
  }

  if (hostname.startsWith("ru.")) {
    const response = NextResponse.next();
    response.cookies.set("lang", "ru", {
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365,
    });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico|logo.ico).*)"],
};
