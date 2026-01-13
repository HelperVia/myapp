import { NextRequest, NextResponse } from "next/server";
import { runMiddlewares } from "@/middleware";

export async function proxy(request: NextRequest) {
  return await runMiddlewares(request);
}

export const config = {
  matcher: ["/((?!api|_next|favicon\\.ico|public|.*\\..+).*)"],
};
