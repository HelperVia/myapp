import { NextRequest, NextResponse } from "next/server";
import { getAuthToken } from "@/shared/utils/next-auth/auth";
import { getSessionCookieName } from "@/shared/utils/next-auth/auth";
import { authOptions } from "@lib/next-auth/authOptions";
export async function authMiddleware(req: NextRequest) {
  const token = await getAuthToken(req, getSessionCookieName(authOptions));

  const pathname = req.nextUrl.pathname;
  const protectedRoutes = [
    "/my",
    "/choose-company",
    "/email-verification",
    "/user-settings",
  ];
  const authRoutes = ["/login", "/signup"];
  const isProtected = protectedRoutes.some((r) => pathname.startsWith(r));
  const isAuthRoute = authRoutes.some((r) => pathname.startsWith(r));
  if (!token && isProtected) {
    const loginUrl = new URL("/login", req.url);
    return {
      token: token,
      res: NextResponse.redirect(loginUrl),
      stop: true,
    };
  }

  if (token && isAuthRoute) {
    return {
      token: token,
      res: NextResponse.redirect(new URL("/my", req.url)),
      stop: true,
    };
  }

  return {
    token: token,
    res: NextResponse.next(),
    stop: false,
  };
}
