import { NextRequest, NextResponse } from "next/server";
import API from "@shared/lib/api/api.server";
import { runMiddlewares } from "@/middleware";

const AUTH_ROUTES = ["/login", "/signup"];
const STARTER_STEPS = {
  settings: "/user-settings",
  email_verify: "/email-verification",
  companies: "/choose-company",
};

export async function proxy(request: NextRequest) {
  const result = await runMiddlewares(request);
  if (result) return result;

  return NextResponse.next();

  /*

  const { pathname } = request.nextUrl;
  const token = request.cookies.get(
    process.env.NEXT_PUBLIC_APP_PREFIX + "_token"
  )?.value;

  // No token - redirect to login (unless already on auth page)
  /*
  if (!token) {
    return isAuthRoute(pathname)
      ? NextResponse.next()
      : NextResponse.redirect(new URL("/login", request.url));
  }
*/
  // Set custom headers for downstream handlers
  /*
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);

  try {
    // Validate token with API
    const response = await API.post("initialize");

    // Has token but trying to access auth pages - redirect to dashboard
    if (isAuthRoute(pathname)) {
      return NextResponse.redirect(new URL("/my", request.url));
    }

    // Save response to cookie for client-side access (optional)
    const nextResponse = NextResponse.next({
      request: { headers: requestHeaders },
    });

    nextResponse.cookies.set(
      process.env.NEXT_PUBLIC_APP_PREFIX + "_rs",
      JSON.stringify(response.data)
    );

    return nextResponse;
  } catch (error) {
    // Debug logging in development mode
    const data = error?.data || [];
    const status = error?.status || 500;
    if (process.env.NEXT_PUBLIC_DEBUG === "true") {
      console.error("Middleware error:", {
        pathname,
        status: status,
        data: data,
      });
    }

    // 401 Unauthorized - Invalid or expired token
    if (status === 401) {
      const response = NextResponse.redirect(new URL("/login", request.url));
      // Delete invalid token
      response.cookies.delete(process.env.NEXT_PUBLIC_APP_PREFIX + "_token");
      return response;
    }

    // 403 Forbidden - User needs to complete starter setup
    if (status === 403) {
      const step = data?.step;

      if (step && STARTER_STEPS[step]) {
        // Redirect to correct step if user is on wrong page
        if (pathname !== STARTER_STEPS[step]) {
          return NextResponse.redirect(
            new URL(STARTER_STEPS[step], request.url)
          );
        }
        // User is on correct step page, allow access
        return NextResponse.next();
      }
    }

    // Other errors - redirect to login as fallback
    if (!isAuthRoute(pathname)) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  */
}

/**
 * Check if pathname is an authentication route
 * @param {string} pathname - Current URL pathname
 * @returns {boolean}
 */
function isAuthRoute(pathname) {
  return AUTH_ROUTES.some((route) => pathname.startsWith(route));
}

export const config = {
  // Match all routes except static files and API routes
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
};
