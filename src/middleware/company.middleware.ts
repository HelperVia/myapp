import { YES } from "@/shared/constants/YesNo";
import { NextRequest, NextResponse } from "next/server";

export async function companyMiddleware(req: NextRequest, token: any) {
  const pathname = req.nextUrl.pathname;
  const companyChooseRoute = ["/choose-company"];
  const isCompanyChoosePage = companyChooseRoute.some((r) =>
    pathname.startsWith(r)
  );
  if (
    !token?.licenseNumber &&
    !isCompanyChoosePage &&
    token?.emailVerify == YES
  ) {
    return {
      stop: true,
      res: NextResponse.redirect(new URL("/choose-company", req.url)),
    };
  }

  return {
    stop: false,
    res: NextResponse.next(),
  };
}
