import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function companyMiddleware(req: NextRequest, token: any) {
  const pathname = req.nextUrl.pathname;
  const companyChooseRoute = ["/choose-company"];
  const isCompanyChoosePage = companyChooseRoute.some((r) =>
    pathname.startsWith(r)
  );
  if (!token?.licenseNumber && !isCompanyChoosePage) {
    return NextResponse.redirect(new URL("/choose-company", req.url));
  }

  return null;
}
