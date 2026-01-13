import { NextRequest, NextResponse } from "next/server";

const COOKIE = "X-Redirect-Count";
export async function detectRouteLoop(
  req: NextRequest,
  res: NextResponse,
  options: {
    cookieName?: string;
    maxRedirects?: number;
    maxAge?: number;
    redirectUrl?: string;
  } = {}
) {
  const {
    cookieName = COOKIE,
    maxRedirects = 3,
    maxAge = 3,
    redirectUrl = "/error/redirect",
  } = options;

  let redirectCount = Number(req.cookies.get(cookieName)?.value ?? 0);
  redirectCount++;

  const pathname = req.nextUrl.pathname;
  const errorRedirectRoute = [redirectUrl];
  const isErrorRedirectRoute = errorRedirectRoute.some((r) =>
    pathname.startsWith(r)
  );

  if (redirectCount > maxRedirects) {
    if (!isErrorRedirectRoute)
      return NextResponse.redirect(new URL(redirectUrl, req.url));

    return NextResponse.next();
  }

  res.cookies.set(cookieName, redirectCount.toString(), { maxAge: maxAge });

  return res;
}
