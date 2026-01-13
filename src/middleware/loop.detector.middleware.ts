import { detectRouteLoop } from "@/shared/middleware/loopDetector";
import { NextRequest, NextResponse } from "next/server";

export async function loopDetector(req: NextRequest, res: NextResponse) {
  return await detectRouteLoop(req, res, {
    maxRedirects: 8,
  });
}
