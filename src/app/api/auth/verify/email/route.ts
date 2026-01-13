import { ApiResponse } from "@shared/lib/api/response/api.response.server";
import { ApiException } from "@shared/lib/exception/api.exception";

import { NextRequest } from "next/server";
import { VerifyEmailCodeSchema } from "@/schemas/zod/api/auth/verify.email.schema";
import { toError } from "@/shared/lib/error/error.normalize";
import { VerifyEmailCodeDomain } from "@/domain/user/verify.email.domain";

async function handler(req: NextRequest) {
  const request = await req.json();

  const parsed = VerifyEmailCodeSchema.safeParse(request);

  if (!parsed.success) {
    return ApiResponse(toError(parsed?.error));
  }
  const code = request.code ?? "";
  const response = await VerifyEmailCodeDomain(code);

  return ApiResponse(response);
}
export const POST = ApiException(handler);
