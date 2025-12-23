import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "./auth.middleware";
import { companyMiddleware } from "./company.middleware";

export async function runMiddlewares(req: NextRequest) {
  const token = await authMiddleware(req);

  if (token instanceof NextResponse) {
    return token;
  }

  if (token) {
    return await companyMiddleware(req, token);
  }

  return null;
}
