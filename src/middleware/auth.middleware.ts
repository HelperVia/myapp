import { NextRequest, NextResponse } from "next/server";
import { getAuthToken } from "@/shared/utils/next-auth/auth";

export async function authMiddleware(req: NextRequest) {
  const token = await getAuthToken(
    req,
    process.env.NEXT_PUBLIC_APP_PREFIX + "-token"
  );

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
    return NextResponse.redirect(loginUrl);
  }

  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL("/my", req.url));
  }

  return token;
}
