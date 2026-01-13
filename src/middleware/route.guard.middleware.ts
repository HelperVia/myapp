import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function routeGuardMiddleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/") {
    return {
      stop: true,
      res: NextResponse.redirect(new URL("/login", req.url)),
    };
  }

  return {
    stop: false,
    res: NextResponse.next(),
  };
}

export const config = {
  matcher: ["/"],
};
