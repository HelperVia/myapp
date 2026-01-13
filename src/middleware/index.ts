import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "./auth.middleware";
import { companyMiddleware } from "./company.middleware";
import { emailVerifyMiddleware } from "./email.verify.middleware";
import { loopDetector } from "./loop.detector.middleware";
import { routeGuardMiddleware } from "./route.guard.middleware";
export async function runMiddlewares(req: NextRequest) {
  const guard = await routeGuardMiddleware(req);
  if (guard.stop) {
    return loopDetector(req, guard.res);
  }
  const token = await authMiddleware(req);
  if (token.stop) {
    return loopDetector(req, token.res);
  }

  if (token?.token) {
    let result = await emailVerifyMiddleware(req, token?.token);
    if (result.stop) {
      return loopDetector(req, result.res);
    }

    result = await companyMiddleware(req, token?.token);
    if (result.stop) {
      return loopDetector(req, result.res);
    }
  }

  return token.res;
}
