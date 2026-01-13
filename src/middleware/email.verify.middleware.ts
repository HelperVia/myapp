import { NO, YES } from "@/shared/constants/YesNo";
import { NextRequest, NextResponse } from "next/server";

export async function emailVerifyMiddleware(req: NextRequest, token: any) {
  const pathname = req.nextUrl.pathname;
  const companyChooseRoute = ["/email-verification"];
  const isVerifyEmailPage = companyChooseRoute.some((r) =>
    pathname.startsWith(r)
  );

  if ((!token?.emailVerify || token?.emailVerify == NO) && !isVerifyEmailPage) {
    return {
      stop: true,
      res: NextResponse.redirect(new URL("/email-verification", req.url)),
    };
  }

  if (token?.emailVerify == YES && isVerifyEmailPage) {
    return {
      stop: true,
      res: NextResponse.redirect(new URL("/my", req.url)),
    };
  }

  return {
    stop: false,
    res: NextResponse.next(),
  };
}
