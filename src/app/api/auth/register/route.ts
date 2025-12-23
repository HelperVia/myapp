import { ApiException } from "@shared/lib/exception/api.exception";
import { ApiResponse } from "@shared/lib/api/response/api.response.server";
import { NextRequest } from "next/server";
import { registerUserDomain } from "@/domain/user/register";
import { RegisterRequestSchema } from "@schemas/zod/api/auth/register.request.schema";
import { toError } from "@shared/lib/error/error.normalize";
async function handler(req: NextRequest) {
  const request = await req.json();

  const parsed = RegisterRequestSchema.safeParse(request);

  if (!parsed?.success) {
    return ApiResponse(toError(parsed.error));
  }

  const response = await registerUserDomain(parsed.data);

  return ApiResponse(response);
}

export const POST = ApiException(handler);
